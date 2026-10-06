#!/usr/bin/env node
// Coverage report for vendor-details.json and partner-details.json against
// the live monday.com APIs: what's missing, stale, changed or unresearched.
//
//   node scripts/company-details/report.js [--stale-days 180]

const L = require("./lib");

const TIERS = { 0: null, 1: "Bronze", 2: "Silver", 3: "Gold", 4: "Platinum" };
const MIN_INSTALLS = 100; // non-partner vendors are covered above this
const argDays = process.argv.indexOf("--stale-days");
const STALE_DAYS = argDays > -1 ? Number(process.argv[argDays + 1]) : 180;
const cap = (s) => (s ? s[0] + s.slice(1).toLowerCase() : s);

(async () => {
  const [vapi, papi] = await Promise.all([L.fetchJSON(L.VENDORS_API), L.fetchJSON(L.PARTNERS_API)]);
  const blocked = L.blockedVendorIds();
  const vendors = L.readJSON(L.VENDOR_DETAILS);
  const partners = L.readJSON(L.PARTNER_DETAILS);

  const section = (title, rows) => {
    console.log(`\n## ${title} (${rows.length})`);
    rows.forEach((r) => console.log(`  ${r}`));
  };

  // ---- vendors
  // in scope: partner-program vendors, vendors above MIN_INSTALLS, and any
  // vendor linked to a monday.com partner (partnerIds)
  const linked = new Set(vendors.filter((v) => v.partnerIds?.length).map((v) => v.vendorId));
  const inScope = new Map(
    vapi.marketplace_developers
      .filter((v) => !blocked.has(v.id) && (v.partners_program || (v.installs || 0) > MIN_INSTALLS || linked.has(v.id)))
      .map((v) => [v.id, v]),
  );
  const haveV = new Map(vendors.map((v) => [v.vendorId, v]));
  section(
    "Vendors missing from vendor-details.json",
    [...inScope.values()]
      .filter((v) => !haveV.has(v.id))
      .sort((a, b) => (b.installs || 0) - (a.installs || 0))
      .map((v) => `${v.id} | ${v.name} | ${TIERS[v.partners_program || 0] || "-"} | ${v.installs} installs | ${v.website} | ${v.email}`),
  );
  section(
    "Vendor entries no longer in scope (left the marketplace or dropped out of scope)",
    vendors.filter((v) => !inScope.has(v.vendorId)).map((v) => `${v.vendorId} | ${v.name}`),
  );
  section(
    "Vendor tier changes",
    vendors
      .filter((v) => inScope.has(v.vendorId) && TIERS[inScope.get(v.vendorId).partners_program || 0] !== v.tier)
      .map((v) => `${v.vendorId} | ${v.name} | ${v.tier} -> ${TIERS[inScope.get(v.vendorId).partners_program || 0]}`),
  );

  // ---- partners
  const apiP = new Map(papi.partners.map((p) => [p.id, p]));
  const haveP = new Map(partners.map((p) => [p.id, p]));
  section(
    "Partners missing from partner-details.json",
    papi.partners.filter((p) => !haveP.has(p.id)).map((p) => `${p.id} | ${p.slug} | ${p.name} | ${cap(p.tier)} | ${p.countryCode}`),
  );
  section(
    "Partner entries no longer in the API",
    partners.filter((p) => !apiP.has(p.id)).map((p) => `${p.id} | ${p.slug} | ${p.name}`),
  );
  section(
    "Partner tier changes",
    partners
      .filter((p) => apiP.has(p.id) && cap(apiP.get(p.id).tier) !== p.tier)
      .map((p) => `${p.slug} | ${p.tier} -> ${cap(apiP.get(p.id).tier)}`),
  );
  section(
    "Partners whose researched country differs from the API countryCode",
    partners
      .filter((p) => apiP.has(p.id) && p.address?.countryCode && p.address.countryCode !== apiP.get(p.id).countryCode)
      .map((p) => `${p.slug} | researched ${p.address.countryCode} vs API ${apiP.get(p.id).countryCode}`),
  );
  section(
    "Partners with no company details yet",
    partners.filter((p) => !p.legalName && !p.contactName && !p.address?.countryCode).map((p) => `${p.slug} | ${p.name}`),
  );

  // ---- shared
  const all = [
    ...vendors.map((v) => ({ key: `vendor ${v.vendorId}`, ...v })),
    ...partners.map((p) => ({ key: `partner ${p.slug}`, ...p })),
  ];
  section("Entries without a country", all.filter((e) => !e.address?.countryCode).map((e) => `${e.key} | ${e.name}`));
  const cutoff = Date.now() - STALE_DAYS * 864e5;
  section(
    `Entries not verified in the last ${STALE_DAYS} days`,
    all.filter((e) => !e.lastVerified || Date.parse(e.lastVerified) < cutoff).map((e) => `${e.key} | ${e.name} | ${e.lastVerified || "never"}`),
  );
  section(
    "Possible offshore companies (locationFlag possible-offshore)",
    all.filter((e) => e.locationFlag === "possible-offshore").map((e) => `${e.key} | ${e.name}`),
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
