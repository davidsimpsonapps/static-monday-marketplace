#!/usr/bin/env node
// Fill `registrations` (and register sources/directors) in vendor-details.json
// and partner-details.json from official company registers.
//
//   node scripts/company-details/register-sync.js            # direct registers + next 10 via OpenCorporates
//   node scripts/company-details/register-sync.js --direct-only
//   node scripts/company-details/register-sync.js --oc-only --limit 10
//   node scripts/company-details/register-sync.js --dry      # print what would change
//   node scripts/company-details/register-sync.js --recheck-days 365
//
// Countries with their own scriptable register (registers.js ADAPTERS:
// GB FR IL EE NO CH AU BR) are all checked in one run. Every other country
// goes through OpenCorporates, which rate-limits anonymous use, so only the
// next --limit (default 10) unchecked entries are tried per run, biggest
// first (partners by tier, vendors by installs). Each processed entry gets
// `registrationsCheckedAt`, so the next run moves on to different companies.
// If OpenCorporates answers 429 the run stops and the remaining entries stay
// unchecked for next time.
//
// Ambiguous matches are skipped and listed at the end. Resolve them in
// scripts/company-details/register-overrides.json:
//   { "v:10000098": "<register id to use>", "p:some-slug": null /* none of them */ }

const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { lookup, ADAPTERS, OpenCorporatesRateLimited } = require("./registers");

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => (args.indexOf(f) > -1 ? args[args.indexOf(f) + 1] : d);
const DRY = flag("--dry");
const DIRECT = !flag("--oc-only");
const OC = !flag("--direct-only");
const LIMIT = Number(opt("--limit", 10));
const RECHECK_DAYS = Number(opt("--recheck-days", 365));
const TODAY = new Date().toISOString().slice(0, 10);
const OVERRIDES_FILE = path.join(__dirname, "register-overrides.json");
const OVERRIDES = fs.existsSync(OVERRIDES_FILE) ? JSON.parse(fs.readFileSync(OVERRIDES_FILE, "utf-8")) : {};

// Exact-name comparison that ignores only punctuation and legal-form words.
const LEGAL = /\b(ltd|limited|llc|l l c|inc|incorporated|corp|corporation|co|company|pty|pvt|private|gmbh|ag|sas|sarl|sa|s a|srl|s r l|sro|s r o|ou|ab|bv|b v|nv|as|aps|oy|kft|sp z o o|sp|zoo|llp|plc|lp|bhd|sdn|pte|ltda|eireli|me|kk|gk|the)\b/g;
const strict = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(LEGAL, " ")
    .replace(/\s+/g, "");
const tokens = (n) =>
  (n || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z ]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
const samePerson = (a, b) => {
  const ta = new Set(tokens(a));
  return tokens(b).filter((t) => ta.has(t)).length >= 2;
};
// "LEITNER, Bettina" -> "Bettina Leitner"
const personName = (n) => {
  const m = (n || "").match(/^([^,]+),\s*(.+)$/);
  const s = m ? `${m[2]} ${m[1]}` : n;
  return s.replace(/[A-ZÀ-Ý][A-ZÀ-Ý']+/g, (w) => w[0] + w.slice(1).toLowerCase()).trim();
};
const LEAD = /ceo|chief executive|managing director|geschäftsführer|daglig leder|président|presidente|directeur général|gerente|administrador|prezes|director|socio/i;
const TIER_WEIGHT = { Platinum: 1e7, Gold: 5e6, Silver: 1e6, Bronze: 2e5, Authorized: 1e5 };

function siteText(e) {
  const urls = [e.url, ...e.sources.filter((s) => ["website", "legal", "about", "contact", "imprint"].includes(s.type)).map((s) => s.url)].filter(Boolean);
  let t = "";
  for (const u of new Set(urls.map((u) => L.hostOf(u)))) {
    const f = path.join(L.CACHE_DIR, `${u.replace(/[^a-z0-9.-]/g, "_")}.json`);
    if (fs.existsSync(f)) t += Object.values(JSON.parse(fs.readFileSync(f, "utf-8")).pages).flat().join("\n");
  }
  return t;
}

const toRegistration = (r) => ({
  register: r.register,
  jurisdiction: r.jurisdictionName || r.register,
  kind: r.kind || "domestic",
  id: String(r.id),
  name: r.name,
  companyType: r.companyType || null,
  status: r.status || null,
  registeredAgent: r.agent || null,
  registeredAddress: r.address || null,
  url: r.url,
});

// Pick the registrations to record from register records. Returns
// { registrations, home, people, ambiguous }.
function choose(e, key, records, cc) {
  const ov = OVERRIDES[key];
  if (ov === null) return { registrations: [], ambiguous: null };
  const wanted = [e.legalName, e.name].filter(Boolean).map(strict).filter((x) => x.length > 1);
  let exact = records.filter((r) => r.how === "cnpj-from-site" || wanted.includes(strict(r.name)) || (r.tradeName && wanted.includes(strict(r.tradeName))));
  if (ov) exact = records.filter((r) => r.id === ov);
  if (!exact.length) return { registrations: [], ambiguous: records.length ? `no exact name match among ${records.map((r) => `${r.name} (${r.id})`).join(" ; ")}` : null };

  const domestic = exact.filter((r) => (r.kind || "domestic") === "domestic");
  const foreign = exact.filter((r) => r.kind === "foreign");
  let home = domestic.length === 1 ? domestic[0] : null;
  if (!home && domestic.length > 1) {
    const byLegal = e.legalName ? domestic.filter((r) => strict(r.name) === strict(e.legalName)) : [];
    const st = (e.address.region || "").toLowerCase();
    const byState = cc === "US" ? domestic.filter((r) => r.jurisdiction === `us_${st}`) : [];
    home = byLegal.length === 1 ? byLegal[0] : byState.length === 1 ? byState[0] : null;
    if (!home) return { registrations: [], ambiguous: `${domestic.length} same-name registrations: ${domestic.map((r) => `${r.jurisdiction || r.register}:${r.id}`).join(", ")}` };
  }
  // foreign registrations: keep those pointing at the chosen home company,
  // or all same-name ones when the home company isn't in OpenCorporates
  const branches = home ? foreign.filter((r) => !r.homeCompanyUrl || r.homeCompanyUrl === home.url) : foreign;
  if (!home && foreign.length > 1) {
    const homes = new Set(foreign.map((r) => r.homeCompanyUrl).filter(Boolean));
    if (homes.size > 1) return { registrations: [], ambiguous: `foreign registrations with ${homes.size} different home companies` };
  }
  const regs = [home, ...branches].filter(Boolean).map(toRegistration);
  return { registrations: regs, home: home || branches[0], people: home?.people || [] };
}

function apply(e, { registrations, home, people }) {
  const changes = [];
  if (!registrations.length) return changes;
  const urls = new Set(registrations.map((r) => r.url));
  e.registrations = [...(e.registrations || []).filter((r) => !urls.has(r.url)), ...registrations];
  changes.push(`${registrations.length} registration(s)`);

  // cite the home registration as a source
  const type = home.sourceType === "opencorporates" ? "opencorporates" : home.sourceType;
  const existing = e.sources.find((s) => (s.url && s.url === home.url) || (s.id && String(s.id).replace(/\s/g, "") === String(home.id).replace(/\s/g, "")));
  if (existing) {
    if (!existing.url) existing.url = home.url;
    if (!existing.id) existing.id = String(home.id);
  } else {
    const s = { type, url: home.url, id: String(home.id) };
    if (home.label && type !== "companies-house") s.label = home.label;
    e.sources.push(s);
    changes.push("source");
  }
  if (!e.legalName && home.name && !/[֐-׿]/.test(home.name)) {
    e.legalName = home.name.replace(/\s{2,}/g, " ").trim();
    changes.push("legalName");
  }
  if (!e.address.street && home.addressParts?.street) {
    e.address = { ...e.address, ...Object.fromEntries(Object.entries(home.addressParts).filter(([, v]) => v)) };
    changes.push("address");
  }
  // directors/board/partners only: company secretaries and corporate
  // officers (nominee companies) are not contacts
  const isPerson = (p) => p.name && !/\b(LTD|LIMITED|LLP|INC|SECRETARIES|NOMINEES)\b/.test(p.name) && !/secretary/i.test(p.role || "");
  for (const p of (people || []).filter(isPerson)) {
    const nm = personName(p.name);
    const known = [e.contactName, ...e.alternativeContacts.map((c) => c.contactName)].filter(Boolean);
    if (known.some((k) => samePerson(k, nm))) continue;
    if (!e.contactName && LEAD.test(p.role || "")) {
      e.contactName = nm;
      e.contactTitle = p.role || null;
    } else e.alternativeContacts.push({ contactName: nm, contactTitle: p.role ? `${p.role} (${home.register})` : `(${home.register})` });
    changes.push(`person ${nm}`);
  }
  e.lastVerified = TODAY;
  return changes;
}

(async () => {
  const files = [
    { file: L.VENDOR_DETAILS, kind: "v", data: L.readJSON(L.VENDOR_DETAILS), key: (e) => `v:${e.vendorId}` },
    { file: L.PARTNER_DETAILS, kind: "p", data: L.readJSON(L.PARTNER_DETAILS), key: (e) => `p:${e.slug}` },
  ];
  const vapi = OC ? (await L.fetchJSON(L.VENDORS_API)).marketplace_developers : [];
  const installs = new Map(vapi.map((v) => [v.id, v.installs || 0]));
  const cutoff = Date.now() - RECHECK_DAYS * 864e5;
  const due = (e) => !e.registrationsCheckedAt || Date.parse(e.registrationsCheckedAt) < cutoff;

  const all = files.flatMap((f) => f.data.map((e) => ({ f, e, key: f.key(e), cc: e.address?.countryCode })));
  const direct = all.filter((x) => x.cc && ADAPTERS[x.cc] && due(x.e));
  const oc = all
    .filter((x) => x.cc && !ADAPTERS[x.cc] && due(x.e))
    .map((x) => ({ ...x, size: x.f.kind === "p" ? TIER_WEIGHT[x.e.tier] || 0 : installs.get(x.e.vendorId) || 0 }))
    .sort((a, b) => b.size - a.size)
    .slice(0, LIMIT);
  const queue = [...(DIRECT ? direct : []), ...(OC ? oc : [])];
  console.log(`${DIRECT ? direct.length : 0} entries via direct registers, ${OC ? oc.length : 0} via OpenCorporates${DRY ? " (dry run)" : ""}`);

  const cache = new Map();
  const ambiguous = [];
  let stopped = false;
  for (const { e, key, cc } of queue) {
    try {
      let records = [];
      if (cc === "BR") {
        const m = siteText(e).match(/\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/);
        if (m) records = (await lookup("BR", null, { id: m[0] })).map((r) => ({ ...r, how: "cnpj-from-site" }));
      } else {
        for (const q of [...new Set([e.legalName, e.name].filter(Boolean))]) {
          const ck = `${cc}:${strict(q)}`;
          if (!cache.has(ck)) {
            const wanted = [e.legalName, e.name].filter(Boolean).map(strict);
            cache.set(ck, await lookup(cc, q, { onlyNames: (n) => wanted.includes(strict(n)) }));
          }
          records = cache.get(ck);
          if (records.some((r) => [e.legalName, e.name].filter(Boolean).map(strict).includes(strict(r.name)))) break;
        }
      }
      const picked = choose(e, key, records, cc);
      if (picked.ambiguous) ambiguous.push(`${key} ${e.name}: ${picked.ambiguous}`);
      const changes = DRY ? (picked.registrations.length ? [`would add ${picked.registrations.length} registration(s)`] : []) : apply(e, picked);
      if (!DRY) e.registrationsCheckedAt = TODAY;
      console.log(`${key} [${cc}] ${e.name}: ${changes.join(", ") || "no match"}`);
    } catch (err) {
      if (err instanceof OpenCorporatesRateLimited) {
        console.log(`OpenCorporates rate limit hit at ${key}; stopping. Remaining entries stay unchecked for the next run.`);
        stopped = true;
        break;
      }
      console.log(`${key} [${cc}] ${e.name}: ERROR ${err.message} (left unchecked)`);
    }
  }
  if (!DRY) for (const f of files) L.writeJSON(f.file, f.data);
  if (ambiguous.length) {
    console.log(`\n## Ambiguous, skipped (${ambiguous.length}); resolve in register-overrides.json`);
    ambiguous.forEach((a) => console.log(`  ${a}`));
  }
  if (!DRY) console.log("\nNext: npx prettier --write vendor-details.json partner-details.json && npm run validate:details");
  process.exit(stopped ? 2 : 0);
})();
