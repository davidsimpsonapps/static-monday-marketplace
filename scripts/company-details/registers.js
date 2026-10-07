#!/usr/bin/env node
// Query a country's official company register (or OpenCorporates as a
// fallback) for a company: registered name and number, status, registered
// address and — where the register publishes them — directors.
//
//   node scripts/company-details/registers.js GB "Tower Apps Ltd"
//   node scripts/company-details/registers.js FR "Synolia"
//   node scripts/company-details/registers.js BR --id 19131243000197   (CNPJ)
//   node scripts/company-details/registers.js US "Polished Geek LLC"  (OpenCorporates, all states)
//
// Also used as a module: lookup(countryCode, name, { id }) -> [records],
// where a record is { register, id, name, status, url, address, people: [{name, role}] }.
//
// Registers with directors: GB (Companies House), FR (annuaire-entreprises),
// NO (Brønnøysund), BR (CNPJ via BrasilAPI, needs the CNPJ).
// Registers without directors: IL (Registrar of Companies, data.gov.il),
// EE (e-Äriregister), CH (Zefix), AU (ABN Lookup), and OpenCorporates for
// everything else (US states, IN, DE, NL, PL, CA, SG, ...; officers there
// need a login, but the registered agent is shown for US companies).
// Be gentle: OpenCorporates is rate-limited, so calls are spaced out.

const ch = require("./companies-house");

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const T = (s) =>
  (s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
// Some registers rate-limit with intermittent 403/429s, so retry with backoff.
async function get(url, opts = {}, attempt = 1) {
  const res = await fetch(url, { ...opts, headers: { "User-Agent": UA, ...(opts.headers || {}) }, signal: AbortSignal.timeout(30000) });
  if ((res.status === 403 || res.status === 429) && attempt < 4) {
    await sleep(3000 * attempt);
    return get(url, opts, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}
const titleCase = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/(^|[\s'-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());

// ---------- adapters ----------

async function gb(name) {
  const hits = await ch.search(name);
  const out = [];
  for (const [n] of hits.slice(0, 3)) {
    const r = await ch.lookup(n);
    out.push({
      register: "Companies House",
      sourceType: "companies-house",
      id: r.id,
      name: r.name,
      status: r.status,
      url: r.url,
      address: r.address,
      people: r.officers.map((o) => ({ name: o.name, role: o.role, residence: o.residence, nationality: o.nationality })),
    });
  }
  return out;
}

async function fr(name) {
  const d = await (await get(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(name)}&per_page=5`)).json();
  return (d.results || []).map((r) => ({
    register: "Annuaire des Entreprises (INSEE/RNE)",
    sourceType: "business-register",
    id: r.siren,
    label: `SIREN ${r.siren}`,
    name: r.nom_raison_sociale || r.nom_complet,
    status: r.etat_administratif === "A" ? "Active" : "Closed",
    url: `https://annuaire-entreprises.data.gouv.fr/entreprise/${r.siren}`,
    address: r.siege?.adresse,
    addressParts: r.siege && { street: [r.siege.numero_voie, r.siege.type_voie, r.siege.libelle_voie].filter(Boolean).join(" "), city: r.siege.libelle_commune, postalCode: r.siege.code_postal },
    people: (r.dirigeants || [])
      .filter((p) => p.type_dirigeant === "personne physique")
      .map((p) => ({ name: titleCase(`${(p.prenoms || "").split(" ")[0]} ${p.nom}`), role: p.qualite })),
  }));
}

const IL_RESOURCE = "f004176c-b85f-4542-8901-7b3176f9a054";
async function il(name) {
  const d = await (await get(`https://data.gov.il/api/3/action/datastore_search?resource_id=${IL_RESOURCE}&q=${encodeURIComponent(name)}&limit=5`)).json();
  return (d.result?.records || []).map((r) => {
    const n = r["מספר חברה"];
    return {
      register: "Israeli Registrar of Companies (data.gov.il)",
      sourceType: "business-register",
      id: String(n),
      label: `Israeli company no. ${n}`,
      name: r["שם באנגלית"] || r["שם חברה"],
      nameHe: r["שם חברה"],
      status: r["סטטוס חברה"],
      url: `https://data.gov.il/dataset/ica_companies/resource/${IL_RESOURCE}?filters=%7B%22%D7%9E%D7%A1%D7%A4%D7%A8%20%D7%97%D7%91%D7%A8%D7%94%22%3A%22${n}%22%7D`,
      address: [r["שם רחוב"], r["מספר בית"], r["שם עיר"], r["מיקוד"]].filter(Boolean).join(" "),
      people: [],
    };
  });
}

async function ee(name) {
  // the e-Äriregister API rejects browser-like user agents from scripts
  const d = await (await get(`https://ariregister.rik.ee/est/api/autocomplete?q=${encodeURIComponent(name)}`, { headers: { "User-Agent": "curl/8.7.1", Accept: "application/json" } })).json();
  return (d.data || []).slice(0, 5).map((r) => ({
    register: "Estonian e-Business Register",
    sourceType: "business-register",
    id: String(r.reg_code),
    label: `Estonian registry code ${r.reg_code}`,
    name: r.name,
    status: r.status === "R" ? "Registered" : r.status,
    url: `https://ariregister.rik.ee/eng/company/${r.reg_code}`,
    address: [r.legal_address, r.zip_code].filter(Boolean).join(", "),
    people: [],
  }));
}

async function no(name) {
  const d = await (await get(`https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(name)}&size=5`)).json();
  const out = [];
  for (const e of d._embedded?.enheter || []) {
    let people = [];
    try {
      const roles = await (await get(`https://data.brreg.no/enhetsregisteret/api/enheter/${e.organisasjonsnummer}/roller`)).json();
      for (const g of roles.rollegrupper || [])
        for (const r of g.roller || [])
          if (r.person && !r.fratraadt)
            people.push({ name: titleCase(`${r.person.navn.fornavn} ${r.person.navn.etternavn}`), role: r.type.beskrivelse });
    } catch {
      /* no roles */
    }
    const a = e.forretningsadresse || e.postadresse || {};
    out.push({
      register: "Brønnøysund Register Centre",
      sourceType: "business-register",
      id: e.organisasjonsnummer,
      label: `Org. no. ${e.organisasjonsnummer}`,
      name: e.navn,
      status: e.konkurs ? "Bankrupt" : "Registered",
      url: `https://virksomhet.brreg.no/nb/oppslag/enheter/${e.organisasjonsnummer}`,
      address: [...(a.adresse || []), a.postnummer, a.poststed, a.land].filter(Boolean).join(", "),
      people,
    });
  }
  return out;
}

async function chZefix(name) {
  const d = await (
    await get("https://www.zefix.ch/ZefixREST/api/v1/firm/search.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, languageKey: "en", maxEntries: 5 }),
    })
  ).json();
  return (d.list || []).map((r) => ({
    register: "Zefix (Swiss commercial register)",
    sourceType: "business-register",
    id: r.uidFormatted,
    label: `UID ${r.uidFormatted}`,
    name: r.name,
    status: r.status,
    url: r.cantonalExcerptWeb || `https://www.zefix.ch/en/search/entity/list/firm/${r.ehraid}`,
    address: r.legalSeat,
    people: [],
  }));
}

async function au(name) {
  const html = await (await get(`https://abr.business.gov.au/Search/ResultsActive?SearchText=${encodeURIComponent(name)}`)).text();
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
    .map((m) => [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => T(c[1])))
    .filter((c) => c.length >= 4 && /^\d{2} \d{3} \d{3} \d{3}/.test(c[0]));
  return rows.slice(0, 5).map((c) => {
    const abn = c[0].match(/^(\d{2} \d{3} \d{3} \d{3})/)[1];
    return {
      register: "ABN Lookup (Australian Business Register)",
      sourceType: "business-register",
      id: abn,
      label: `ABN ${abn}`,
      name: c[1],
      status: c[0].replace(abn, "").trim(),
      url: `https://abr.business.gov.au/ABN/View/${abn.replace(/ /g, "")}`,
      address: c[3],
      people: [],
    };
  });
}

async function br(_name, { id } = {}) {
  if (!id) throw new Error("BR needs a CNPJ (--id)");
  const cnpj = id.replace(/\D/g, "");
  const r = await (await get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)).json();
  const f = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  return [
    {
      register: "Receita Federal CNPJ (via BrasilAPI)",
      sourceType: "business-register",
      id: f,
      label: `CNPJ ${f}`,
      name: r.razao_social,
      tradeName: r.nome_fantasia,
      status: r.descricao_situacao_cadastral,
      url: `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
      address: [r.descricao_tipo_de_logradouro, r.logradouro, r.numero, r.complemento, r.bairro, r.municipio, r.uf, r.cep].filter(Boolean).join(" "),
      addressParts: { street: [r.descricao_tipo_de_logradouro, r.logradouro, r.numero, r.complemento].filter(Boolean).join(" "), city: titleCase(r.municipio), region: r.uf, postalCode: r.cep && r.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") },
      people: (r.qsa || []).map((s) => ({ name: titleCase(s.nome_socio), role: s.qualificacao_socio })),
    },
  ];
}

// OpenCorporates fallback. country "US" searches all US state registers.
// Anonymous use is rate-limited (it starts answering 429 after a few dozen
// requests), so requests are spaced out and a 429 is surfaced as
// OpenCorporatesRateLimited for callers to stop and try again another day.
class OpenCorporatesRateLimited extends Error {}
let lastOC = 0;
const OC_GAP_MS = 6000;
async function ocGet(url) {
  const wait = OC_GAP_MS - (Date.now() - lastOC);
  if (wait > 0) await sleep(wait);
  lastOC = Date.now();
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
  if (res.status === 429) throw new OpenCorporatesRateLimited(`OpenCorporates rate limit (429) on ${url}`);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// details: fetch each hit's page (status, company type, agent, address,
// branch/home relationship). onlyNames: only fetch details for hits whose
// name passes this predicate (saves requests).
async function opencorporates(cc, name, { details = true, onlyNames = null, maxDetails = 8 } = {}) {
  const c = cc.toLowerCase();
  const url =
    c === "us"
      ? `https://opencorporates.com/companies?q=${encodeURIComponent(name)}&country_code=us`
      : `https://opencorporates.com/companies/${c}?q=${encodeURIComponent(name)}`;
  const html = await ocGet(url);
  // <a class="company_search_result branch active" href="/companies/us_nj/0100922138"
  //    title="More Free And Open Company Data On NAME (New Jersey (US), 0100922138)">NAME</a>
  // A "branch" class marks a foreign registration (registered to trade outside its home jurisdiction).
  const hits = [...html.matchAll(/class="company_search_result([^"]*)" href="(\/companies\/([a-z_]+)\/([^"]+))"[^>]*title="[^"]*\(([^()]*(?:\([^()]*\))?), [^,()]+\)"[^>]*>([^<]+)</g)]
    .map(([, cls, path, jurisdiction, number, jurisdictionName, hitName]) => ({ cls, path, jurisdiction, number, jurisdictionName, hitName }))
    // home registrations first, so they get the detail lookups
    .sort((a, b) => /branch/.test(a.cls) - /branch/.test(b.cls));
  const out = [];
  let fetched = 0;
  for (const { cls, path, jurisdiction, number, jurisdictionName, hitName } of hits) {
    const rec = {
      register: `OpenCorporates (${T(jurisdictionName)})`,
      sourceType: "opencorporates",
      id: decodeURIComponent(number),
      label: `${T(jurisdictionName)} company no. ${decodeURIComponent(number)} (OpenCorporates)`,
      jurisdiction,
      jurisdictionName: T(jurisdictionName),
      name: T(hitName),
      url: `https://opencorporates.com${path}`,
      kind: /branch/.test(cls) ? "foreign" : "domestic",
      status: /inactive/.test(cls) ? "Inactive" : /active/.test(cls) ? "Active" : null,
      people: [],
    };
    if (details && fetched < maxDetails && (!onlyNames || onlyNames(rec.name))) {
      fetched++;
      const raw = await ocGet(rec.url);
      const page = raw.replace(/<[^>]+>/g, "\n").split("\n").map((l) => T(l)).filter(Boolean);
      const LABELS = /^(Company Number|Status|Incorporation Date|Company Type|Jurisdiction|Agent Name|Agent Address|Directors \/ Officers|Registered Address|Data source|Dissolution Date|Branch|Industry Codes|Previous Names|Contact|Twitter|Officers|Log in|Home Company|Inactive Directors)/;
      const after = (label, n = 4) => {
        const i = page.indexOf(label);
        if (i < 0) return null;
        const vals = [];
        for (const l of page.slice(i + 1, i + 1 + n)) {
          if (LABELS.test(l) && LABELS.exec(l)[0] === l) break; // a field label, not a value starting with one
          if (/^(Data source and freshness|Last update from source|Last change recorded)/.test(l)) break; // provenance box
          vals.push(l);
        }
        return vals.filter((v) => v !== "--" && !/please log in/i.test(v)).join(", ") || null;
      };
      rec.status = after("Status", 1) || rec.status;
      rec.companyType = after("Company Type", 1);
      rec.address = after("Registered Address");
      if (rec.address && /\[\{:|=>/.test(rec.address)) rec.address = null; // raw Ruby hash from some CZ/SK records
      rec.agent = after("Agent Name", 1);
      rec.agentAddress = after("Agent Address");
      const branch = after("Branch", 2);
      if ((branch && /branch|foreign/i.test(branch)) || /foreign/i.test(rec.companyType || "")) rec.kind = "foreign";
      const home = raw.match(/Branch[\s\S]{0,600}?href="(\/companies\/[a-z_]+\/[^"]+)"/);
      if (home && rec.kind === "foreign") rec.homeCompanyUrl = `https://opencorporates.com${home[1]}`;
    }
    out.push(rec);
  }
  return out;
}

const ADAPTERS = { GB: gb, FR: fr, IL: il, EE: ee, NO: no, CH: chZefix, AU: au, BR: br };

async function lookup(countryCode, name, opts = {}) {
  const cc = (countryCode || "").toUpperCase();
  if (ADAPTERS[cc]) return ADAPTERS[cc](name, opts);
  return opencorporates(cc, name, opts);
}

// One cheap request to see whether OpenCorporates is currently blocking us.
async function openCorporatesAvailable() {
  try {
    // the homepage isn't rate-limited, only search is, so probe a search
    const res = await fetch("https://opencorporates.com/companies?q=opencorporates", { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
    lastOC = Date.now();
    return res.status !== 429;
  } catch {
    return false;
  }
}

module.exports = { lookup, opencorporates, openCorporatesAvailable, ADAPTERS, OpenCorporatesRateLimited };

if (require.main === module) {
  const [cc, ...rest] = process.argv.slice(2);
  const idx = rest.indexOf("--id");
  const id = idx > -1 ? rest[idx + 1] : undefined;
  const name = (idx > -1 ? rest.filter((_, i) => i !== idx && i !== idx + 1) : rest).join(" ");
  if (!cc) {
    console.log('usage: registers.js <COUNTRY> "<company name>" [--id <number>]');
    process.exit(1);
  }
  lookup(cc, name, { id })
    .then((records) => {
      if (!records.length) console.log("no results");
      for (const r of records) {
        console.log(`${r.name} | ${r.register} | ${r.label || r.id} | ${r.status ?? ""}${r.kind ? ` | ${r.kind}` : ""}${r.companyType ? ` | ${r.companyType}` : ""}\n  ${r.url}\n  address: ${r.address ?? "?"}${r.agent ? `\n  registered agent: ${r.agent}` : ""}`);
        for (const p of r.people) console.log(`   - ${p.name} [${p.role ?? ""}]${p.residence ? ` residence=${p.residence}` : ""}`);
      }
    })
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
