#!/usr/bin/env node
// Look up UK companies on Companies House (public website, no API key):
// registered office, status, active officers and persons with significant
// control, including each person's country of residence and nationality —
// the key evidence for spotting offshore companies behind UK addresses.
//
//   node scripts/company-details/companies-house.js 09819483 "SEPERI LTD" ...
//
// Also used as a module by registers.js (search, lookup).

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
  return m ? T(m[1] ?? m[2]) : null;
};

// [[companyNumber, name], ...]
async function search(q) {
  const html = await get(`${B}/search/companies?q=${encodeURIComponent(q)}`);
  return [...html.matchAll(/href="\/company\/([0-9A-Z]{8})"[^>]*>([\s\S]*?)<\/a>/g)].slice(0, 5).map((m) => [m[1], T(m[2])]);
}

// Structured company record.
async function lookup(n) {
  const page = await get(`${B}/company/${n}`);
  const record = {
    id: n,
    url: `${B}/company/${n}`,
    name: T((page.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]),
    status: T((page.match(/id="company-status"[^>]*>([\s\S]*?)</) || [])[1]),
    address: T((page.match(/Registered office address<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/) || [])[1]),
    officers: [],
    psc: [],
  };
  const officers = await get(`${B}/company/${n}/officers`);
  for (const blk of officers.split(/class="appointment-\d+"/).slice(1)) {
    const name = pick(blk, /officer-name-\d+">\s*<a[^>]*>([\s\S]*?)<\/a>/);
    const status = pick(blk, /officer-status-tag-\d+"[^>]*>([\s\S]*?)</);
    if (!name || (status && status.includes("Resigned"))) continue;
    record.officers.push({
      name,
      role: pick(blk, /officer-role-\d+"[^>]*>([\s\S]*?)</),
      residence: pick(blk, /officer-country-of-residence-\d+"[^>]*>([\s\S]*?)</),
      nationality: pick(blk, /officer-nationality-\d+"[^>]*>([\s\S]*?)</),
    });
  }
  const psc = await get(`${B}/company/${n}/persons-with-significant-control`);
  for (const blk of psc.split(/class="appointment-\d+"/).slice(1)) {
    record.psc.push({
      name: pick(blk, /<b>([\s\S]*?)<\/b>|psc-name-\d+"[^>]*>([\s\S]*?)</),
      residence: pick(blk, /psc-country-of-residence-\d+"[^>]*>([\s\S]*?)</),
      nationality: pick(blk, /psc-nationality-\d+"[^>]*>([\s\S]*?)</),
    });
  }
  return record;
}

function print(r) {
  console.log(`${r.id} ${r.name} | ${r.status} | ${r.address}\n  ${r.url}`);
  for (const o of r.officers) console.log(`   - ${o.name} [${o.role}] residence=${o.residence ?? "?"} nationality=${o.nationality ?? "?"}`);
  for (const p of r.psc) console.log(`   PSC ${p.name ?? "?"} residence=${p.residence ?? "?"} nationality=${p.nationality ?? "?"}`);
}

module.exports = { search, lookup };

if (require.main === module) {
  (async () => {
    for (const q of process.argv.slice(2)) {
      if (/^[0-9A-Z]{8}$/.test(q)) {
        print(await lookup(q));
        continue;
      }
      const hits = await search(q);
      console.log(`## search "${q}": ${hits.map(([n, t]) => `${n} ${t}`).join(" ; ") || "no results"}`);
      const norm = (s) => s.toUpperCase().replace(/LIMITED/g, "LTD").replace(/[.\s]+$/, "");
      const exact = hits.find(([, t]) => norm(t) === norm(q));
      if (exact) print(await lookup(exact[0]));
      else if (hits.length) console.log("  (no exact name match; pass a company number to inspect one)");
    }
  })();
}
