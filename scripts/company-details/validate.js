#!/usr/bin/env node
// Validate vendor-details.json and partner-details.json.
// Structural problems are errors (exit 1); missing data is only a warning.
//
//   node scripts/company-details/validate.js [--quiet]

const L = require("./lib");

const quiet = process.argv.includes("--quiet");
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const ADDRESS_KEYS = ["street", "city", "region", "postalCode", "country", "countryCode"];
const isStrOrNull = (v) => v === null || typeof v === "string";

function checkAddress(where, a, { label = false } = {}) {
  if (!a || typeof a !== "object") return err(where, "address must be an object");
  for (const k of ADDRESS_KEYS) {
    if (!(k in a)) err(where, `address.${k} missing`);
    else if (!isStrOrNull(a[k])) err(where, `address.${k} must be a string or null`);
  }
  if (label && !isStrOrNull(a.label ?? null)) err(where, "address.label must be a string or null");
  if (a.countryCode && !L.isValidCountryCode(a.countryCode))
    err(where, `invalid countryCode ${JSON.stringify(a.countryCode)}`);
  if (a.country && !a.countryCode) warn(where, `country "${a.country}" has no countryCode`);
}

function checkEntry(where, e) {
  for (const k of ["legalName", "contactName", "contactTitle", "notes", "lastVerified"])
    if (k in e && !isStrOrNull(e[k])) err(where, `${k} must be a string or null`);
  if (e.lastVerified && !/^\d{4}-\d{2}-\d{2}$/.test(e.lastVerified))
    err(where, `lastVerified must be YYYY-MM-DD`);

  checkAddress(where, e.address);
  if (!Array.isArray(e.alternativeAddresses)) err(where, "alternativeAddresses must be an array");
  else e.alternativeAddresses.forEach((a, i) => checkAddress(`${where} alternativeAddresses[${i}]`, a, { label: true }));

  if (!Array.isArray(e.alternativeContacts)) err(where, "alternativeContacts must be an array");
  else
    e.alternativeContacts.forEach((c, i) => {
      if (typeof c?.contactName !== "string" || !c.contactName)
        err(where, `alternativeContacts[${i}].contactName required`);
      if (!isStrOrNull(c?.contactTitle ?? null)) err(where, `alternativeContacts[${i}].contactTitle must be a string or null`);
    });

  if (!Array.isArray(e.registrations)) err(where, "registrations must be an array");
  else
    e.registrations.forEach((r, i) => {
      const w = `${where} registrations[${i}]`;
      if (typeof r?.register !== "string") err(w, "register must be a string");
      if (r?.id != null && typeof r.id !== "string") err(w, "id must be a string or null");
      if (r?.kind != null && !["domestic", "foreign"].includes(r.kind)) err(w, `unknown kind ${JSON.stringify(r.kind)}`);
      if (r?.url && !/^https?:\/\//.test(r.url)) err(w, `url must be http(s): ${r.url}`);
      for (const k of ["jurisdiction", "name", "companyType", "status", "registeredAgent", "registeredAddress"])
        if (k in (r || {}) && !isStrOrNull(r[k])) err(w, `${k} must be a string or null`);
    });
  if (e.registrationsCheckedAt != null && !/^\d{4}-\d{2}-\d{2}$/.test(e.registrationsCheckedAt))
    err(where, "registrationsCheckedAt must be YYYY-MM-DD or null");

  if (!Array.isArray(e.sources)) err(where, "sources must be an array");
  else
    e.sources.forEach((s, i) => {
      const w = `${where} sources[${i}]`;
      if (typeof s !== "object" || s === null) return err(w, "must be an object {type, url, id?, label?}");
      if (!L.SOURCE_TYPES.includes(s.type)) err(w, `unknown type ${JSON.stringify(s.type)}`);
      if (!s.url && !s.id) err(w, "needs a url or an id");
      if (s.url && !/^https?:\/\//.test(s.url)) err(w, `url must be http(s): ${s.url}`);
    });

  if (e.locationFlag !== null && e.locationFlag !== undefined && !L.LOCATION_FLAGS.includes(e.locationFlag))
    err(where, `unknown locationFlag ${JSON.stringify(e.locationFlag)}`);
  const n = e.notes || "";
  if (/Offshore company with a (US|UK) address/.test(n) && e.locationFlag !== "offshore-moved")
    warn(where, `notes say offshore-moved but locationFlag is ${e.locationFlag}`);
  if (/Possibl[ey] offshore/i.test(n) && e.locationFlag !== "possible-offshore")
    warn(where, `notes say possible-offshore but locationFlag is ${e.locationFlag}`);

  if (!e.address?.countryCode) warn(where, "no country");
  if (!e.sources?.length) warn(where, "no sources");
}

// ---- vendor-details.json
const vendors = L.readJSON(L.VENDOR_DETAILS);
const partners = L.readJSON(L.PARTNER_DETAILS);
const vendorIds = new Set();
for (const v of vendors) {
  const where = `vendor ${v.vendorId} (${v.name})`;
  if (!Number.isInteger(v.vendorId)) err(where, "vendorId must be an integer");
  if (vendorIds.has(v.vendorId)) err(where, "duplicate vendorId");
  vendorIds.add(v.vendorId);
  if (!Array.isArray(v.partnerIds) || v.partnerIds.some((id) => typeof id !== "string"))
    err(where, "partnerIds must be an array of partner UUIDs");
  checkEntry(where, v);
}

// ---- partner-details.json
const partnerIds = new Set();
for (const p of partners) {
  const where = `partner ${p.slug}`;
  if (typeof p.id !== "string" || !/^[0-9a-f-]{36}$/.test(p.id)) err(where, "id must be a UUID");
  if (partnerIds.has(p.id)) err(where, "duplicate id");
  partnerIds.add(p.id);
  for (const k of ["slug", "name", "tier"]) if (typeof p[k] !== "string") err(where, `${k} must be a string`);
  if (!isStrOrNull(p.url) || !isStrOrNull(p.email)) err(where, "url/email must be strings or null");
  if (typeof p.isMicrosoftPartner !== "boolean") err(where, "isMicrosoftPartner must be a boolean");
  if (!Array.isArray(p.vendorIds) || p.vendorIds.some((id) => !Number.isInteger(id)))
    err(where, "vendorIds must be an array of integers");
  checkEntry(where, p);
}

// ---- reciprocal vendor <-> partner links
const vendorById = new Map(vendors.map((v) => [v.vendorId, v]));
const partnerById = new Map(partners.map((p) => [p.id, p]));
for (const v of vendors) {
  for (const pid of v.partnerIds || []) {
    const p = partnerById.get(pid);
    if (!p) err(`vendor ${v.vendorId}`, `partnerId ${pid} not found in partner-details.json`);
    else if (!p.vendorIds.includes(v.vendorId))
      err(`vendor ${v.vendorId}`, `partner ${p.slug} does not list it in vendorIds`);
  }
}
for (const p of partners) {
  for (const id of p.vendorIds || []) {
    const v = vendorById.get(id);
    if (!v) err(`partner ${p.slug}`, `vendorId ${id} not found in vendor-details.json`);
    else if (!(v.partnerIds || []).includes(p.id)) err(`partner ${p.slug}`, `vendor ${id} does not list it in partnerIds`);
  }
}

if (!quiet) for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
const noCountry = warnings.filter((w) => w.endsWith("no country")).length;
console.log(
  `\n${vendors.length} vendors, ${partners.length} partners: ${errors.length} errors, ${warnings.length} warnings (${noCountry} without a country)`,
);
process.exit(errors.length ? 1 : 0);
