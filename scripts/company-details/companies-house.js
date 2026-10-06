#!/usr/bin/env node
// Look up UK companies on Companies House (public website, no API key):
// registered office, status, active officers and persons with significant
// control, including each person's country of residence and nationality —
// the key evidence for spotting offshore companies behind UK addresses.
//
//   node scripts/company-details/companies-house.js 09819483 "SEPERI LTD" ...

const B = "https://find-and-update.company-information.service.gov.uk";

const get = async (u) => (await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
const T = (s) =>
  (s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const pick = (blk, re) => {
  const m = blk.match(re);
  return m ? T(m[1]) : "?";
};

async function search(q) {
  const html = await get(`${B}/search/companies?q=${encodeURIComponent(q)}`);
  return [...html.matchAll(/href="\/company\/([0-9A-Z]{8})"[^>]*>([\s\S]*?)<\/a>/g)].slice(0, 5).map((m) => [m[1], T(m[2])]);
}

async function company(n) {
  const page = await get(`${B}/company/${n}`);
  const name = T((page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
  const office = T((page.match(/Registered office address<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/) || [])[1]);
  const status = T((page.match(/id="company-status"[^>]*>([\s\S]*?)</) || [])[1]);
  console.log(`${n} ${name} | ${status} | ${office}\n  ${B}/company/${n}`);
  const officers = await get(`${B}/company/${n}/officers`);
  for (const blk of officers.split(/class="appointment-\d+"/).slice(1)) {
    const who = pick(blk, /officer-name-\d+">\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const stat = pick(blk, /officer-status-tag-\d+"[^>]*>([\s\S]*?)</);
    if (who === "?" || stat.includes("Resigned")) continue;
    console.log(
      `   - ${who} [${pick(blk, /officer-role-\d+"[^>]*>([\s\S]*?)</)}] residence=${pick(blk, /officer-country-of-residence-\d+"[^>]*>([\s\S]*?)</)} nationality=${pick(blk, /officer-nationality-\d+"[^>]*>([\s\S]*?)</)}`,
    );
  }
  const psc = await get(`${B}/company/${n}/persons-with-significant-control`);
  for (const blk of psc.split(/class="appointment-\d+"/).slice(1)) {
    const who = pick(blk, /<b>([\s\S]*?)<\/b>|psc-name-\d+"[^>]*>([\s\S]*?)</);
    console.log(
      `   PSC ${who} residence=${pick(blk, /psc-country-of-residence-\d+"[^>]*>([\s\S]*?)</)} nationality=${pick(blk, /psc-nationality-\d+"[^>]*>([\s\S]*?)</)}`,
    );
  }
}

(async () => {
  for (const q of process.argv.slice(2)) {
    if (/^[0-9A-Z]{8}$/.test(q)) {
      await company(q);
      continue;
    }
    const hits = await search(q);
    console.log(`## search "${q}": ${hits.map(([n, t]) => `${n} ${t}`).join(" ; ") || "no results"}`);
    const norm = (s) => s.toUpperCase().replace(/LIMITED/g, "LTD").replace(/[.\s]+$/, "");
    const exact = hits.find(([, t]) => norm(t) === norm(q));
    if (exact) await company(exact[0]);
    else if (hits.length) console.log("  (no exact name match; pass a company number to inspect one)");
  }
})();
