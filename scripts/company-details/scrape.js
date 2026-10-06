#!/usr/bin/env node
// Scrape company websites (homepage + imprint/legal/privacy/terms/about/contact
// pages) into .cache/company-details/<key>.json, then print a digest of
// legal-entity names, address-like lines, founder/CEO lines, phone country
// codes and country mentions, each with the page it came from.
//
//   node scripts/company-details/scrape.js https://example.com [more urls...]
//   node scripts/company-details/scrape.js --vendors 123,456      (urls from the vendors API)
//   node scripts/company-details/scrape.js --partners slug-a,slug-b (urls from partner-details.json)
//   node scripts/company-details/scrape.js --refresh ...          (ignore the cache)

const fs = require("fs");
const path = require("path");
const L = require("./lib");

const refresh = process.argv.includes("--refresh");
fs.mkdirSync(L.CACHE_DIR, { recursive: true });

const PAGE_RE = /imprint|impressum|legal|privacy|terms|about|contact|company|team|mentions|kontakt|datenschutz|who-we-are|leadership/i;
const GUESSES = ["/imprint", "/impressum", "/legal", "/privacy-policy", "/privacy", "/terms", "/about", "/about-us", "/contact", "/contact-us"];

async function get(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return [res.url, ""];
    return [res.url, (await res.text()).slice(0, 1_500_000)];
  } catch {
    return [url, ""];
  }
}

function text(html) {
  return html
    .replace(/<(script|style|noscript|svg)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|h\d|tr|td|span|a|address|footer)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l && l.length < 500);
}

async function scrapeSite(base) {
  const key = L.hostOf(base).replace(/[^a-z0-9.-]/g, "_");
  const file = path.join(L.CACHE_DIR, `${key}.json`);
  if (!refresh && fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf-8"));
  const [finalUrl, html] = await get(base);
  const pages = {};
  if (html) pages[finalUrl] = text(html);
  const host = L.hostOf(finalUrl);
  const links = new Set();
  for (const m of html.matchAll(/href=["']([^"'#]+)["']/g)) {
    try {
      const u = new URL(m[1], finalUrl);
      if (L.hostOf(u.href) === host && PAGE_RE.test(u.pathname) && !/\.(png|jpe?g|svg|css|js|pdf)$/i.test(u.pathname))
        links.add(`${u.origin}${u.pathname}`);
    } catch {
      /* ignore */
    }
  }
  const origin = new URL(finalUrl).origin;
  GUESSES.forEach((g) => links.add(origin + g));
  const ordered = [...links].sort((a, b) => a.length - b.length).slice(0, 16);
  const results = await Promise.all(ordered.map(get));
  for (const [u, h] of results) if (h && !pages[u]) pages[u] = text(h);
  const data = { base, finalUrl, fetchedAt: new Date().toISOString(), pages };
  fs.writeFileSync(file, JSON.stringify(data));
  return data;
}

const ENT = /[A-Z0-9][\w&.,'’ -]{1,60}?\b(Ltd\.?|Limited|LLC|L\.L\.C\.|Inc\.?|Corp\.?|Corporation|GmbH|AG|B\.V\.|BV|N\.V\.|OÜ|AB|AS|ApS|A\/S|Oy|Kft\.?|s\.r\.o\.|Sp\. z o\.o\.|S\.r\.l\.|SRL|SAS|SARL|S\.L\.|Pty\.? Ltd\.?|Pvt\.? Ltd\.?|Private Limited|LLP|Sdn\.? Bhd\.?|Pte\.? Ltd\.?|d\.o\.o\.|DOO|UG|FZCO|FZ-LLC|SA de CV|S\.A\.C\.)(?!\w)/g;
const ADDR = /(registered (office|address)|located at|head ?office|headquarter|address\s*:|anschrift|siège|\bsuite\b|\bfloor\b|\bstreet\b|\bstr(\.|aße|asse)\b|\broad\b|\bavenue\b|\bblvd\b|\bul\.|\bvia\b|\brue\b|\bP\.?O\.? Box\b|\b[A-Z]{1,2}\d{1,2}[A-Z]? ?\d[A-Z]{2}\b|\b\d{5}(-\d{4})?\b)/i;
const PPL = /\b(founder|co-founder|ceo|chief executive|managing director|geschäftsführer|owner|president|director|inhaber|vertreten durch|represented by)\b/i;
const BAD = /ip address|e-?mail address|cookie|browser|we collect|personal (data|information)|\byou\b|\byour\b|google|stripe|paypal|hubspot|salesforce|zapier|amazon web|monday\.com ltd|atlassian pty/i;
const COUNTRY = /\b(United States|USA|United Kingdom|England|Ireland|Germany|Austria|Switzerland|France|Netherlands|Belgium|Spain|Portugal|Italy|Poland|Czech|Slovakia|Hungary|Romania|Bulgaria|Serbia|Croatia|Greece|Sweden|Norway|Denmark|Finland|Estonia|Latvia|Lithuania|Ukraine|Turkey|Türkiye|Israel|UAE|Dubai|India|Pakistan|Sri Lanka|Bangladesh|Nepal|Singapore|Malaysia|Indonesia|Philippines|Vietnam|Thailand|China|Hong Kong|Taiwan|Japan|Korea|Australia|New Zealand|Canada|Mexico|Brazil|Argentina|Chile|Colombia|Peru|South Africa|Nigeria|Kenya|Egypt|Cyprus|Malta|Georgia)\b/g;

function digest(data) {
  const ents = new Map();
  const addrs = [];
  const ppl = [];
  const countries = {};
  const phones = {};
  for (const [url, lines] of Object.entries(data.pages)) {
    lines.forEach((l, i) => {
      if (BAD.test(l)) return;
      for (const m of l.matchAll(ENT)) {
        const s = m[0].trim();
        if (s.length > 3 && s.length < 70 && !ents.has(s)) ents.set(s, url);
      }
      if (ADDR.test(l) && /\d/.test(l) && l.length < 220) addrs.push(`${l}  <${url}>`);
      if (PPL.test(l) && l.length < 160)
        ppl.push(`${lines.slice(Math.max(0, i - 1), i + 2).filter((x) => x.length < 80).join(" / ")}  <${url}>`);
      for (const m of l.matchAll(COUNTRY)) countries[m[1]] = (countries[m[1]] || 0) + 1;
      for (const m of l.matchAll(/\+\s?(\d{1,3})[\s\-().]/g)) phones[`+${m[1]}`] = (phones[`+${m[1]}`] || 0) + 1;
    });
  }
  const uniq = (a, n) => [...new Set(a)].slice(0, n);
  console.log(`### ${data.base} -> ${data.finalUrl} (${Object.keys(data.pages).length} pages)`);
  [...ents].slice(0, 6).forEach(([e, u]) => console.log(`  ENT  ${e}  <${u}>`));
  uniq(addrs, 6).forEach((a) => console.log(`  ADR  ${a}`));
  uniq(ppl, 6).forEach((p) => console.log(`  PPL  ${p}`));
  const top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, v]) => `${k}:${v}`).join(" ");
  if (Object.keys(countries).length || Object.keys(phones).length) console.log(`  CTRY ${top(countries)}   PHONE ${top(phones)}`);
}

async function urlsFromArgs() {
  const args = process.argv.slice(2).filter((a) => a !== "--refresh");
  const vi = args.indexOf("--vendors");
  if (vi > -1) {
    const ids = args[vi + 1].split(",").map(Number);
    const vapi = await L.fetchJSON(L.VENDORS_API);
    return vapi.marketplace_developers.filter((v) => ids.includes(v.id) && v.website).map((v) => v.website.trim());
  }
  const pi = args.indexOf("--partners");
  if (pi > -1) {
    const slugs = args[pi + 1].split(",");
    return L.readJSON(L.PARTNER_DETAILS).filter((p) => slugs.includes(p.slug) && p.url).map((p) => p.url);
  }
  return args;
}

(async () => {
  const urls = (await urlsFromArgs()).map((u) => (u.startsWith("http") ? u : `https://${u}`));
  // a few sites at a time; each site fetches its own pages in parallel
  for (let i = 0; i < urls.length; i += 6) {
    const batch = await Promise.all(urls.slice(i, i + 6).map(scrapeSite));
    batch.forEach(digest);
  }
})();
