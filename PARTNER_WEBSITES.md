# Maintaining partner-websites.json

`partner-websites.json` (repo root) enriches the monday.com partner directory
(fetched live in `src/_data/partners.js` from the monday.com partners API)
with data that API doesn't provide: each partner's **real company website**,
a **contact email**, and whether they're **also a Microsoft partner**. It's
consumed by `src/_data/partnerWebsites.js` and joined to a partner by `id` via
the `findPartnerWebsiteById` filter (see `.eleventy.js`), used in
`src/partners/index.njk` and `src/partners/[slug].njk` (website link, email,
and the Microsoft badge).

This data can't be fetched programmatically — it was collected by Claude
doing web research per partner (search for the company, find their real site,
a contact email, and evidence of Microsoft partner status). It was populated
in tiers over time:

- Platinum/Gold/Silver — added 2026-09 (commit `e7c0533c598`)
- Bronze/Authorized — added 2026-09-08

Because it's AI-collected, **it might be wrong or stale** — websites change,
emails bounce, companies gain/lose Microsoft partner status, and new
monday.com partners are added continuously. Periodically re-run this process.

## 1. Check what's missing or stale

Fetch the live partner list and diff against `partner-websites.json` by `id`:

```bash
curl -s "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000" \
  -o /tmp/partners_api.json

python3 -c "
import json
api = {p['id'] for p in json.load(open('/tmp/partners_api.json'))['partners']}
have = {p['id'] for p in json.load(open('partner-websites.json'))}
print('missing (in API, not in file):', len(api - have))
print('stale (in file, gone from API):', len(have - api))
"
```

- **Missing partners**: need fresh research (see step 2).
- **Stale entries**: the partner left the program or was removed — remove
  their entry from `partner-websites.json`.

Also worth checking: has a partner's `tier` changed in the API (e.g. Silver →
Gold)? The `tier` field in `partner-websites.json` is display-only (lookups
are by `id`, not tier) but should stay accurate — update it opportunistically
when re-verifying an entry.

## 2. Research missing/changed partners

For each partner needing research, find:

- `url` — the partner's own company website (not a monday.com URL, not a
  social profile). `null` if they genuinely have no independent site (some
  solo freelancers only have a LinkedIn).
- `email` — a public contact email (contact/about page, or an `info@` /
  `contact@` / `sales@` / `hello@` address on their own domain). `null` if
  none can be found.
- `isMicrosoftPartner` — `true` only with real evidence (e.g. "Microsoft
  Solutions Partner" / "Microsoft Gold/Silver Partner" mentioned on their
  site, LinkedIn, or a partner directory). Default `false` — don't guess.

For batches larger than ~10 partners, split the work across a few parallel
Claude subagents (each given a slice of the list with `id`/`slug`/`name`/
`tier`/`countryCode` from the API, told to return a JSON array in the exact
`partner-websites.json` shape) rather than doing it serially — this is what
was done for the Bronze/Authorized batch (3 agents × 9 partners).

Schema (keep this exact field order/shape):

```json
{
  "id": "<matches monday.com partner id>",
  "slug": "<matches monday.com partner slug>",
  "name": "<partner display name>",
  "tier": "Platinum" | "Gold" | "Silver" | "Bronze" | "Authorized",
  "url": "https://..." | null,
  "email": "someone@example.com" | null,
  "isMicrosoftPartner": true | false
}
```

## 3. Spot-check existing entries

Full re-verification of 200+ entries every time isn't practical. Instead,
periodically sample a subset (e.g. ~20 random entries, or all entries not
touched in the last audit) and re-check their `url` and `email` still
resolve/make sense, and whether `isMicrosoftPartner` still holds. Widen the
sample if spot-checks turn up a lot of drift.

## 4. Merge and verify

Merge new/updated entries into `partner-websites.json`, preserving existing
untouched entries, then sanity-check before committing:

```bash
python3 -c "import json; d=json.load(open('partner-websites.json')); print(len(d), 'entries, valid JSON')"
```

Confirm the count matches the live API's total partner count (`totalCount` in
the API response) minus any you deliberately excluded.
