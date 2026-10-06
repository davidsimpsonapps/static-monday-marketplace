# Maintaining vendor-details.json and partner-details.json

Two hand-maintained files (repo root) enrich data that monday.com's APIs
don't provide:

| File | Joined to | Key | Loaded by | Used by |
|---|---|---|---|---|
| `vendor-details.json` | marketplace vendors (`src/_data/vendors.js`, marketplace-developers API) | `vendorId` = API `id` (number) | `src/_data/vendorDetails.js` | `findVendorDetailsById` filter → `src/vendors/[vendorId].njk`, `src/vendors/index.njk`, `schema-vendor.njk` |
| `partner-details.json` | monday.com partners (`src/_data/partners.js`, gotopartners API) | `id` = API partner UUID | `src/_data/partnerDetails.js` | `findPartnerDetailsById` filter → `src/partners/[slug].njk`, `src/partners/index.njk`, `schema-partner.njk` |

Both power the **Company Details** section (`src/_includes/partials/company-details.njk`):
legal name, contact, other contacts, address, other addresses, website,
support email and numbered source links. They also feed the JSON-LD
`legalName`/`PostalAddress`.

`partner-details.json` (previously `partner-websites.json`) also holds each
partner's real `url`, `email` and `isMicrosoftPartner` flag, which drive the
partner pages' Website/Email links and the Microsoft badge.

Companies that are **both** a marketplace vendor and a partner are linked
with `partnerIds` (vendor side) and `vendorIds` (partner side). Linked
companies show a cross badge on cards and pages
(`src/_includes/partials/cross-badges.njk`) plus links between the two pages.

All of this is collected by research (mostly Claude doing web research), so
**it might be wrong or stale**: companies move, directors change, partners
change tier. Re-run this process periodically.

## Scope

- **Vendors:** every partner-program vendor (`partners_program` 1–4:
  Bronze, Silver, Gold, Platinum), every other vendor with **more than 100
  installs**, and any vendor linked to a partner. Vendors in
  `vendorBlockList` (`src/_data/data-filters.js`) are ignored.
- **Partners:** every partner in the gotopartners API (all tiers, including
  Authorized).

History: Silver+ vendors 2026-09-30, Bronze 2026-09-30, other vendors with
>100 installs 2026-10-01, partner company details and vendor↔partner links
2026-10-06 (partner websites/emails/Microsoft flags were collected in
2026-09).

## Tooling (`scripts/company-details/`)

Node scripts, no extra dependencies. Run from the repo root.

| Command | What it does |
|---|---|
| `npm run validate:details` | Schema check for both files: types, unique ids, ISO country codes, source types, reciprocal `partnerIds`⇄`vendorIds`, `locationFlag` vs notes. Exits 1 on structural errors; missing data is only a warning (`-- --quiet` hides warnings). |
| `npm run report:details` | Compares both files with the live APIs: missing/stale entries, tier changes, partners whose researched country differs from their self-reported one, entries without a country, entries not verified recently (`-- --stale-days 180`), possible offshore companies. |
| `node scripts/company-details/scrape.js <urls…>` / `--vendors 123,456` / `--partners slug-a,slug-b` | Fetches each site plus its imprint/legal/privacy/terms/about/contact pages (cached in `.cache/company-details/`, `--refresh` to refetch) and prints a digest: legal-entity names, address-like lines, founder/CEO lines, phone country codes and country mentions, each with its source page. |
| `node scripts/company-details/companies-house.js <number or "NAME LTD">…` | UK Companies House: registered office, status, active officers and persons with significant control, with **country of residence and nationality**. |
| `node scripts/company-details/register-sync.js` | Fills `registrations` (plus register sources, legal names and published directors) from official registers. Countries with their own register are all done in one run; every other country goes through OpenCorporates **10 companies per run**, biggest first, rotating via `registrationsCheckedAt`. Flags: `--direct-only`, `--oc-only`, `--limit N`, `--dry`, `--recheck-days N`. Ambiguous matches are skipped and listed; resolve them in `scripts/company-details/register-overrides.json`. |
| `node scripts/company-details/registers.js <CC> "<name>"` / `BR --id <CNPJ>` | Looks a company up in its **country's own register** (see below) and prints the registered name, number, status, registered address, directors where published, and the register URL to cite as a source. |
| `node scripts/company-details/whois.js <domain>…` | WHOIS registrant country/state/org, ignoring privacy services. Last resort for a country. |
| `node scripts/company-details/match.js` | Proposes vendor↔partner matches by normalised name and website/email domain. `--write confirmed.json` records confirmed links (`[{ "partnerId": "<uuid>", "vendorIds": [123] }]`) on both sides. |

`scripts/company-details/lib.js` holds the shared bits: the source-type
list, `classifySource(url)` (turns a URL into a typed source), the
registered-agent address patterns, name/domain normalising and the API URLs.

After editing either JSON file, run `npx prettier --write vendor-details.json partner-details.json`
then `npm run validate:details`.

## Schema

Both files share the company-details fields. Keep this field order.

### vendor-details.json

```jsonc
{
  "vendorId": 10000114,                 // number; the marketplace-developers API id
  "name": "Gorilla Apps",               // vendor display name from the API
  "tier": "Silver",                     // "Platinum" | "Gold" | "Silver" | "Bronze" | null (no partner tier)
  "partnerIds": [],                     // linked monday.com partner UUIDs (see partner-details.json vendorIds)
  "legalName": "Kusterer & Müller GbR", // registered entity, not the brand; null if unknown
  "contactName": "Simon Kusterer",      // primary named person; null if unknown
  "contactTitle": "Managing Director",
  "alternativeContacts": [{ "contactName": "Markus Müller", "contactTitle": "Managing Director" }],
  "address": {                          // registered office / HQ; fill only what's confirmed
    "street": "Hagbergstrasse 11", "city": "Stuttgart", "region": "Baden-Württemberg",
    "postalCode": "70188", "country": "Germany", "countryCode": "DE"   // ISO 3166-1 alpha-2
  },
  "alternativeAddresses": [             // other offices, trading/old addresses, US registered-agent addresses
    { "label": "US office", "street": null, "city": "Raleigh", "region": "NC",
      "postalCode": "27607", "country": "United States", "countryCode": "US" }
  ],
  "registrations": [                    // official register entries (filled by register-sync.js)
    { "register": "OpenCorporates (Delaware (US))", "jurisdiction": "Delaware (US)",
      "kind": "domestic",               // "domestic" (home registration) | "foreign" (registered to trade in another state/country)
      "id": "6464752", "name": "WORKIFLOW LLC", "companyType": "Limited Liability Company", "status": "Active",
      "registeredAgent": "LEGALINC CORPORATE SERVICES INC", "registeredAddress": "New Castle, DE, United States",
      "url": "https://opencorporates.com/companies/us_de/6464752" }
  ],
  "sources": [
    { "type": "imprint", "url": "https://getgorilla.app/imprint" },
    { "type": "vat", "url": null, "id": "DE815324806" },
    { "type": "companies-house", "url": "https://find-and-update.company-information.service.gov.uk/company/09819483", "id": "09819483" },
    { "type": "business-register", "url": null, "id": "HRB 30164", "label": "HRB 30164 (Amtsgericht Wiesbaden)" }
  ],
  "locationFlag": null,                 // null | "offshore-moved" | "possible-offshore" | "registered-agent"
  "notes": "Free text for maintainers (not shown on the site)",
  "lastVerified": "2026-10-06",         // YYYY-MM-DD the entry was last researched
  "registrationsCheckedAt": "2026-10-06" // when register-sync.js last looked this company up (null = never)
}
```

### partner-details.json

```jsonc
{
  "id": "fd296931-…",                   // gotopartners API partner id
  "slug": "unitask",                    // API slug
  "name": "Unitask",                    // API display name
  "tier": "Platinum",                   // "Platinum" | "Gold" | "Silver" | "Bronze" | "Authorized"
  "url": "https://www.unitask-inc.com/",// the partner's own website (API websiteUrl is often example.com); null if none
  "email": "itay.n@unitask-inc.com",    // public contact email; null if none
  "isMicrosoftPartner": false,          // true only with real evidence
  "vendorIds": [10000016],              // linked marketplace vendor ids (a partner can have several)
  "legalName": "Unitask Ltd",
  "contactName": "Adar Rubin", "contactTitle": "CEO",
  "alternativeContacts": [],
  "address": { … }, "alternativeAddresses": [ … ],
  "sources": [ … ],                     // always includes the monday.com partner profile
  "locationFlag": null, "notes": null, "lastVerified": "2026-10-06"
}
```

### Registrations

`registrations` lists the company's entries in official registers: the
home (`domestic`) registration and, for US companies especially, any
`foreign` registrations in other states. Foreign registrations are not
offices: their address is normally the registered agent's, so they belong
here and **not** in `alternativeAddresses`. The page shows them in a
"Registrations" row with the company type, status and registered agent.

A home registration in Wyoming, Delaware or New Mexico with a commercial
registered agent (Registered Agents Inc, Legalinc, Northwest, …) and no
other presence is a strong hint for the US offshore check below.

### Sources

`sources` is a list of `{ type, url, id?, label? }`. `url` may be `null`
when `id` is set (e.g. a VAT or D-U-N-S number with no public page). The
site shows each source as a numbered pill; the tooltip comes from the
`sourceLabel` filter (`.eleventy.js`): `label` if set, otherwise the type
name plus `id`.

Types: `website`, `imprint`, `legal` (privacy/terms), `about`, `contact`,
`linkedin` (company page or person profile), `companies-house`,
`business-register` (KvK, KRS, Estonian e-Äriregister, ABN, RCS, HRB…),
`duns`, `vat`, `opencorporates`, `crunchbase`, `directory` (G2, Crunchbase-like
aggregators, CB Insights…), `marketplace` (Atlassian/Shopify/monday.com
listings), `press`, `whois`, `other`. `classifySource()` in `lib.js` picks the
type from a URL; set `id`/`label` by hand for registry numbers.

### locationFlag

| Value | Meaning | Note prefix |
|---|---|---|
| `offshore-moved` | The company presents a US/UK address but is really elsewhere; `address` was moved to the real country and the US/UK address kept in `alternativeAddresses`. | "Offshore company with a US address: …" |
| `possible-offshore` | Same suspicion, weaker evidence; the US/UK address is still `address`. | "Possible offshore company: …" |
| `registered-agent` | `address` is a registered-agent / virtual-office / mailbox address, but there's no evidence the company is elsewhere. | (explain in notes) |

`validate.js` warns when the note prefix and the flag disagree.

## 1. Check what's missing or stale

```bash
npm run report:details
```

- **Missing vendors/partners**: research them (step 2).
- **Entries no longer in scope / gone from the API**: remove them (or leave
  blocked test accounts, which the report lists too).
- **Tier changes**: update `tier`.
- **Researched country differs from the API**: partners self-report their
  country on the monday.com profile; keep the researched value when the
  evidence is good and explain in `notes` (e.g. Agence Gro is in Québec,
  Tryve's registered office is in Belgium).

## 2. Research

Work in this order; each step usually fills in more than the last.

1. **Partners: seed from the API.** The gotopartners API gives a
   self-reported `countryCode` and an `employees` list with job titles. The
   most senior titled person (CEO > founder > MD > owner > president >
   C-level > director) is a reasonable `contactName`, and other leaders go in
   `alternativeContacts`. Cite the profile as
   `{ "type": "marketplace", "url": "https://monday.com/gotopartners/directory/<slug>", "label": "monday.com partner profile" }`.
2. **Scrape the website** with `scrape.js` and read the digest. Imprint pages
   (German/Austrian/Swiss companies must publish one), privacy policies and
   terms usually name the legal entity, its registered office and sometimes a
   company number; about/team pages name the founders.
3. **Official registers**: once you know the country, look the company up
   in that country's register with `registers.js` and cite it as a source
   (with the company number as `id`). Add published directors as the
   contact (if missing) or as `alternativeContacts`, and add the registered
   office to `alternativeAddresses` when it differs from the trading address.

   | Country | Register used by `registers.js` | Directors? |
   |---|---|---|
   | GB | Companies House (`companies-house.js`): also officers' residence and nationality | yes |
   | FR | Annuaire des Entreprises / recherche-entreprises API (SIREN) | yes |
   | NO | Brønnøysund Register Centre (org. no. + roles API) | yes |
   | BR | Receita Federal CNPJ via BrasilAPI: needs the CNPJ, which is usually in the site footer | yes (partners) |
   | IL | Israeli Registrar of Companies, data.gov.il open dataset (company no., status, registered address) | no |
   | EE | e-Äriregister (registry code, legal address) | no (names hidden) |
   | CH | Zefix (UID, seat, link to the cantonal excerpt, which lists the board) | via the excerpt |
   | AU | ABN Lookup (ABN, state, postcode; directors need a paid ASIC search) | no |
   | everything else | OpenCorporates: US by state, IN, DE, NL, PL, CA, SG, … (company no., registered address; for US companies also the **registered agent**, a good offshore signal) | no (needs login) |

   Other registers worth checking by hand: Germany's handelsregister.de
   (Geschäftsführer, HRB) or North Data; the Netherlands' KvK (paid
   extract); India's MCA21 master data (directors; captcha); Poland's KRS
   (`api-krs.ms.gov.pl`, with director names masked); Québec's REQ;
   Singapore's ACRA BizFile; Denmark's CVR; New Zealand's Companies Office.
   US states rarely publish owners (Delaware and Wyoming deliberately
   don't), so register lookups there mostly confirm the state, number and
   registered agent.

   Only accept a register match when the registered name matches the
   entry's legal (or brand) name exactly, ignoring legal suffixes. Several
   similar names (e.g. "Codex Group International" vs "Codex Solutions
   International") are a reason to stop and check, not to pick one.
4. **LinkedIn, D-U-N-S, Crunchbase, press**: search for the company's
   LinkedIn company page and the founder/CEO profile, its dnb.com business
   directory page (D-U-N-S number) and Crunchbase. Add each as a typed source.
5. **Other listings**: the same developer's Atlassian Marketplace or Shopify
   listing often shows an address or location; monday.com developer blog
   posts name founders.
6. **WHOIS** (`whois.js`) as a last resort for a country.

JS-rendered sites return little to the scraper; use a fetch tool that
renders or summarises the page. Hebrew, Thai, Japanese or Korean pages are
fine: transliterate where the reading is unambiguous, otherwise keep names
in the original script (e.g. Japanese executives), and note it.

For large batches, split the list across a few parallel research agents,
each returning entries in the exact schema above.

### Recording rules

- `legalName`: the registered entity (`Tower Apps Ltd`, `Localyse Workplace NV`),
  not the brand. If a brand belongs to a group, say so in `notes`.
- `contactName`/`contactTitle`:
  - Use a named person, preferring the CEO, founder, managing director or GM of the brand.
  - A name from a personal-looking email (`bas.debruin@…`) or a partner profile slug (`mark-anley`) is acceptable; say so in `notes`.
  - **Don't guess.** A name seen only in unverified snippets goes in `notes`.
  - **Never infer a country from a person's name.**
- `address`: the registered office or HQ. Fill only what you can confirm; a country alone is still useful. Put other offices, trading addresses and old registered offices in `alternativeAddresses`, each with a `label`.
- `sources`: every page or register the data came from, as typed sources.
  Registry numbers (company no., VAT, KvK, KRS, HRB, ABN, D-U-N-S) go here
  as `id`s.
- `notes`: anything a later maintainer needs, especially how the country was inferred and any low-confidence fields.
- `lastVerified`: today's date whenever you research an entry.

### When nothing else gives a country

In rough order of reliability:
1. a governing-law clause ("governed by the laws of Israel");
2. the legal form (`OÜ` → Estonia, `Sp. z o.o.` → Poland, `Pty Ltd` → Australia, `Pvt Ltd`/`LLP` → India, `Sdn Bhd` → Malaysia, `FZCO`/`DMCC` → UAE, `SA de CV` → Mexico, `AB` → Sweden, `ApS` → Denmark, `Oy` → Finland, `Kft.` → Hungary, `s.r.o.` → CZ/SK, `d.o.o.` → ex-Yugoslav states, `Ltda.` → Brazil);
3. phone numbers on the site (`+91`, `+972`, `+48`…);
4. a country-code domain (`.nl`, `.com.br`, `.co.in`, `.com.au`);
5. the same developer's listing on another marketplace;
6. the WHOIS registrant country.

Ignore privacy-service registrants: **Tempe, AZ** (Domains By Proxy) and **Lewes, DE** are not real locations.

### Check every US address for offshore companies

Many non-US developers register a US LLC/Inc and publish only a
registered-agent or virtual-mailbox address. For **every entry with a US
address**, check whether it's one of these and whether the team is
actually elsewhere. Registered-agent/virtual addresses seen so far (also
in `REGISTERED_AGENT_PATTERNS` in `lib.js`):

- `30 N Gould St, Ste R, Sheridan, WY 82801`
- `2810 N Church St`, `1007 N Orange St` (Wilmington, DE)
- `8 The Green` (Dover, DE), `600`/`651 N Broad St` (Middletown, DE)
- `2035 Sunset Lake Road` (Newark, DE)
- `2105 Vista Oeste NW` (Albuquerque, NM)
- any `PMB`, `#12345`-style unit or `STE 22625`-style suite

Evidence that the team is elsewhere:
- non-US phone numbers;
- offices or team members listed abroad;
- a foreign parent or operating entity in the legal pages;
- founders' LinkedIn locations;
- the same developer's other marketplace listings.

What to record:
- **Good evidence:** move `address` to the real country, put the US address in `alternativeAddresses` (label "US registered-agent address"), set `locationFlag: "offshore-moved"` and start the note with "Offshore company with a US address: …". Examples: TimelinesAI, SurveySparrow, JustCall, Centilio, Simpleday, WME Solutions.
- **Weaker evidence:** keep the address, set `"possible-offshore"` and start the note with "Possible offshore company: …".
- **Can't tell:** set `"registered-agent"` and say where the team is wasn't established.

### Check every UK address the same way

Companies House (`companies-house.js`) is the best evidence for UK entries.
Each company's officers and persons with significant control show
**country of residence** and **nationality**, so you can quickly see whether
the people behind a London address live elsewhere.

Also check for:
- registered-office services and virtual offices (`128 City Road, EC1V`, `71-75 Shelton Street, WC2H`);
- law-firm or accountant addresses shared by unrelated companies (`4 Mentmore Court, Milton Keynes`);
- liquidators' addresses on dissolved companies;
- whether a company with that name exists at all. A "UK" company with no Companies House match gets "Possible offshore company".

Distinguish a **foreign group's UK subsidiary** (e.g. Boost Moveo UK Ltd,
directors in Israel; Omnitas Consulting Ltd, director in Sweden: just note
it) from a **shell for a company that's really elsewhere** (e.g. Broken
Build LLP, all members in Ukraine, moved to Ukraine; Toolstrek Ltd,
director in Latvia).

### Link vendors and partners

Run `node scripts/company-details/match.js`, confirm each candidate by hand,
and record confirmed links with `--write`:
- **Domain matches are strong evidence;** name-only matches often aren't. Gorilla Services ≠ Gorilla Apps, Magic Button Labs ≠ Magic Apps.
- **Group links are fine**, e.g. Adaptavist → Upscale/ScriptRunner/Kolekti, OrangeDot → OBO (both The OBO Group), upstream → Luxie Tech (same address and CTO), Cloud Concept → DocuGen.
- **Linked vendors with no entry yet:** if a linked vendor has no `vendor-details.json` entry, create one from the partner's details.

### Keep register data flowing

Run `node scripts/company-details/register-sync.js` regularly (e.g. weekly).
Each run checks every not-yet-checked company in countries with their own
register, plus the next 10 biggest companies elsewhere via OpenCorporates.
OpenCorporates blocks anonymous clients after a few dozen requests (HTTP
429); the script stops cleanly when that happens and simply continues
with the remaining companies next time. Entries are re-checked after
`--recheck-days` (default 365).

## 3. Spot-check existing entries

Every few months, run `npm run report:details -- --stale-days 180` and
re-research a sample, prioritising Platinum/Gold, `possible-offshore` and
low-confidence notes. UK entries are quick to re-verify against Companies
House. Watch for CEO changes (press releases) and acquisitions.

For partners also re-check that `url` and `email` still work and that
`isMicrosoftPartner` still holds (only `true` with real evidence such as
"Microsoft Solutions Partner" on their site, LinkedIn or a partner
directory).

## 4. Merge and verify

Merge new/updated entries without overwriting hand-corrected fields (diff
before replacing). Then:

```bash
npx prettier --write vendor-details.json partner-details.json
npm run validate:details
npm run build
```

Check a couple of pages:
- `/vendors/10000016/` and `/partners/unitask/`: cross badges, links both ways, Company Details with source tooltips.
- An offshore-moved entry (e.g. `/vendors/10000159/`): Other Addresses shows the US registered-agent address.

## Known quirks

- **Duplicate vendor accounts**: Boost Apps `10000231`/`10000023`,
  CarbonApps `10000052`/`58`. Keep an entry for each ID with the same data.
- **One company, several partner listings**: e.g. Boost IL/UK/US, Omnitas
  Consulting/Omnitas UK, Workiflow/Workiflow SA, CarbonWeb/CarbonWeb LATAM,
  Xebia/Xebia DACH, Empyra US/India, Adaptavist/Adaptavist Spain. Hence
  vendors have `partnerIds` (an array).
- **Group brands**: Upscale, ScriptRunner, Kolekti and Adaptavist are
  Adaptavist Group and share its Companies House registered office.
- **Vendors hidden on the site**: vendors with no installs (e.g. `10000069`
  Adaptavist, `10000231` Boost Apps) are filtered out by `vendors.js` but
  can still carry details and links.
- **Not real vendors**: `10000072` "Rami LTD." and `10000214` "Grzegorz
  Swatowski Sp. z o. o." are monday.com internal/test accounts and are in
  `vendorBlockList`; the report lists them as out of scope.
- **Country codes**: `countryjs` (used by the site's `countryName`/
  `regionName` filters) lacks RS and ME; both filters fall back to
  `Intl.DisplayNames` plus manual region overrides.
