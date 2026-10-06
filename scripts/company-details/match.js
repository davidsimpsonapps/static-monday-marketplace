#!/usr/bin/env node
// Propose vendor <-> partner matches (companies that are both a marketplace
// vendor and a monday.com partner). Prints candidates for manual review;
// with --write, records confirmed links listed in a JSON file.
//
//   node scripts/company-details/match.js
//   node scripts/company-details/match.js --write confirmed.json
//     where confirmed.json is [{ "partnerId": "<uuid>", "vendorIds": [123, 456] }, ...]

const fs = require("fs");
const L = require("./lib");

const vendorsFile = L.readJSON(L.VENDOR_DETAILS);
const partnersFile = L.readJSON(L.PARTNER_DETAILS);

function write(confirmedPath) {
  const confirmed = JSON.parse(fs.readFileSync(confirmedPath, "utf-8"));
  const vById = new Map(vendorsFile.map((v) => [v.vendorId, v]));
  const pById = new Map(partnersFile.map((p) => [p.id, p]));
  for (const { partnerId, vendorIds } of confirmed) {
    const p = pById.get(partnerId);
    if (!p) throw new Error(`unknown partner ${partnerId}`);
    p.vendorIds = [...new Set([...(p.vendorIds || []), ...vendorIds])];
    for (const id of vendorIds) {
      const v = vById.get(id);
      if (!v) throw new Error(`vendor ${id} has no vendor-details.json entry`);
      v.partnerIds = [...new Set([...(v.partnerIds || []), partnerId])];
    }
  }
  L.writeJSON(L.VENDOR_DETAILS, vendorsFile);
  L.writeJSON(L.PARTNER_DETAILS, partnersFile);
  console.log(`linked ${confirmed.length} partners; run prettier and validate.js next`);
}

async function propose() {
  const [vapi, papi] = await Promise.all([L.fetchJSON(L.VENDORS_API), L.fetchJSON(L.PARTNERS_API)]);
  const vendors = vapi.marketplace_developers;
  const detailsById = new Map(vendorsFile.map((v) => [v.vendorId, v]));
  const partnerSites = new Map(partnersFile.map((p) => [p.id, p]));

  const vKeys = vendors.map((v) => {
    const d = detailsById.get(v.id);
    const domains = new Set(
      [v.website, (v.email || "").includes("@") ? v.email.split("@")[1] : null]
        .filter(Boolean)
        .map((u) => L.domainOf(u.trim())),
    );
    return { v, names: new Set([L.normName(v.name), d && L.normName(d.legalName)].filter((n) => n && n.length > 2)), domains };
  });

  for (const p of papi.partners) {
    const site = partnerSites.get(p.id);
    const pDomains = new Set(
      [site?.url, (site?.email || "").includes("@") ? site.email.split("@")[1] : null, p.websiteUrl]
        .filter((u) => u && !u.includes("example.com"))
        .map((u) => L.domainOf(u.trim()))
        .filter((d) => !["gmail.com", "outlook.com", "hotmail.com", "monday.com"].includes(d)),
    );
    const pNames = new Set([L.normName(p.name), L.normName(p.salesforceName), site && L.normName(site.legalName)].filter((n) => n && n.length > 2));
    const hits = [];
    for (const { v, names, domains } of vKeys) {
      const why = [];
      if ([...pDomains].some((d) => domains.has(d))) why.push("domain");
      if ([...pNames].some((n) => names.has(n))) why.push("name");
      else if ([...pNames].some((n) => [...names].some((m) => n.length > 4 && m.length > 4 && (n.includes(m) || m.includes(n))))) why.push("partial-name");
      if (why.length) hits.push(`${v.id} ${v.name} [${why.join("+")}] installs=${v.installs}`);
    }
    if (hits.length) {
      const linked = site?.vendorIds?.length ? ` (already linked: ${site.vendorIds.join(", ")})` : "";
      console.log(`${p.id} | ${p.name} | ${p.tier}${linked}`);
      hits.forEach((h) => console.log(`    ${h}`));
    }
  }
}

const wi = process.argv.indexOf("--write");
if (wi > -1) write(process.argv[wi + 1]);
else propose().catch((e) => (console.error(e), process.exit(1)));
