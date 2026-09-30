# Maintaining vendor-details.json

`vendor-details.json` (repo root) enriches the monday.com marketplace vendor
list (fetched live in `src/_data/vendors.js` from the
`marketplace-developers` API) with data that API doesn't provide: each
vendor's **legal company name**, a **named contact person**, and their
**postal address + country**. The API only gives `name`, `website`, `email`
(often a support address or helpdesk URL) and `partners_program` (tier).

It's consumed by `src/_data/vendorDetails.js` and joined to a vendor by
`vendorId` (the API's `id`) via the `findVendorDetailsById` filter (see
`.eleventy.js`). The address is formatted by the `addressLines` filter. Both
are used in the **Contact** section of `src/vendors/[vendorId].njk`. Vendors
with no entry still get a Contact section showing the API's website/email.

Only **Silver, Gold and Platinum** vendors are covered
(`partners_program` 2, 3 and 4; Bronze is 1, none is 0).

This data can't be fetched programmatically. It was collected by Claude
doing web research per vendor (first added 2026-09-30), so **it might be
wrong or stale**: companies move, directors change, vendors change tier.
Periodically re-run this process.

## 1. Check what's missing or stale

Fetch the live vendor list and diff Silver+ vendors against
`vendor-details.json` by `vendorId`:

```bash
curl -s "https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true" \
  -o /tmp/vendors_api.json

python3 -c "
import json
tiers = {2: 'Silver', 3: 'Gold', 4: 'Platinum'}
api = {v['id']: v for v in json.load(open('/tmp/vendors_api.json'))['marketplace_developers']
       if v.get('partners_program') in tiers}
have = {d['vendorId']: d for d in json.load(open('vendor-details.json'))}
for i in sorted(api.keys() - have.keys()):
    v = api[i]; print('missing:', i, tiers[v['partners_program']], v['name'], v.get('website'), v.get('email'))
for i in sorted(have.keys() - api.keys()):
    print('stale (no longer Silver+ or gone):', i, have[i]['name'])
for i in sorted(api.keys() & have.keys()):
    if tiers[api[i]['partners_program']] != have[i]['tier']:
        print('tier changed:', i, have[i]['tier'], '->', tiers[api[i]['partners_program']])
"
```

- **Missing vendors**: need fresh research (see step 2).
- **Stale entries**: the vendor dropped below Silver or left the marketplace.
  Removing them is optional: the template still works if an entry exists,
  but it's cleaner to keep the file Silver+ only.
- **Tier changed**: update the `tier` field. It's display/reference only;
  lookups are by `vendorId`.

## 2. Research missing/changed vendors

Start from the vendor's `website` and `email` in the API. Look for, in
roughly this order of reliability:

1. **Official registers**: UK Companies House
   (`find-and-update.company-information.service.gov.uk`, which gives the
   registered office and active directors), Dutch KvK, Italian P.IVA/Registro
   Imprese, and so on. The UK register is scriptable with `curl`.
2. **Imprint / legal notice pages** (`/imprint`, `/impressum`, `/legal`):
   German and Austrian vendors must publish name, address and managing
   director here.
3. **Privacy policy / terms of service**: usually name the legal entity and
   often a postal address or a governing-law country.
4. **About / team pages**: founder or CEO names.
5. **Marketplace listings**: the vendor's Atlassian Marketplace vendor page
   often lists an address. monday.com developer blog posts often name founders.
6. **Press releases / news**: current CEO, HQ city.

Some sites are JS-rendered (plain `curl` returns nothing useful); use a
fetch tool that renders or summarises the page instead. Hebrew or Japanese
pages are fine to use; transliterate into Latin script and put the original
in `notes`.

Record for each vendor:

- `legalName`: the registered entity (e.g. `Tower Apps Ltd`,
  `Kusterer & Müller GbR`), not the brand name. `null` if not found.
- `contactName` / `contactTitle`: a named person, preferring
  CEO / founder / managing director / general manager of the brand. For
  group brands with no named lead, use the group CEO and say so in the title.
  `null` if not found. **Don't guess**: a name seen only in unverified
  search snippets goes in `notes`, not `contactName`.
- `address`: registered office or HQ. Fill only the parts you can confirm;
  a country alone is still useful. If the registered office differs from a
  trading address, use the registered office and mention the other in
  `notes`.
- `sources`: the URLs the data came from, so it can be re-verified.
- `notes`: anything a later maintainer needs, such as duplicates, low
  confidence, virtual-office addresses, or accounts that aren't real vendors.

For batches larger than ~10 vendors, split the work across a few parallel
Claude subagents (each given a slice of the missing list with
`id`/`name`/`tier`/`website`/`email`, told to return a JSON array in the
exact schema below) rather than doing it serially.

Schema (keep this exact field order/shape):

```json
{
  "vendorId": 10000114,
  "name": "<vendor display name from the API>",
  "tier": "Platinum" | "Gold" | "Silver",
  "legalName": "Kusterer & Müller GbR" | null,
  "contactName": "Simon Kusterer" | null,
  "contactTitle": "Managing Director" | null,
  "address": {
    "street": "Hagbergstrasse 11" | null,
    "city": "Stuttgart" | null,
    "region": "Baden-Württemberg" | null,
    "postalCode": "70188" | null,
    "country": "Germany" | null,
    "countryCode": "DE" | null
  },
  "sources": ["https://getgorilla.app/imprint"],
  "notes": "Free text" | null
}
```

`vendorId` is a **number** (it's compared with `===` against the API's
numeric `id`). `countryCode` is ISO 3166-1 alpha-2. `notes` and `sources`
are not shown on the site.

### Known quirks

- **Duplicate vendor accounts**: some companies have two vendor IDs (Boost
  Apps: `10000231` and `10000023`; CarbonApps: `10000052` and `58`). Keep an
  entry for each ID with the same data.
- **Group brands**: Upscale, ScriptRunner, Kolekti and Adaptavist are all
  Adaptavist Group; they share the group's Companies House registered office.
- **Not a real vendor**: `10000072` "Rami LTD." is a monday.com internal/test
  account (website monday.com, test apps). It's a candidate for
  `vendorBlockList` in `src/_data/data-filters.js`.

## 3. Spot-check existing entries

Every few months, re-check a sample of entries, prioritising Platinum/Gold
and anything whose `notes` flag low confidence. UK entries can be
re-verified quickly against Companies House (registered office and active
directors). Pay attention to CEO changes; press releases are the usual
signal.

## 4. Merge and verify

Merge new/updated entries into `vendor-details.json`, preserving existing
entries (some have been corrected by hand; don't overwrite them with
freshly researched data without comparing). Then sanity-check:

```bash
python3 -c "
import json
d = json.load(open('vendor-details.json'))
ids = [x['vendorId'] for x in d]
assert all(isinstance(i, int) for i in ids), 'vendorId must be a number'
assert len(ids) == len(set(ids)), 'duplicate vendorId'
print(len(d), 'entries, valid JSON')
"
```

Finally, build and look at the Contact section on a couple of vendor pages
(e.g. `/vendors/10000114/`) to confirm it renders.
