---
title: "Bulk import docs add item ID matching, new capacity error code and long text rich_text field"
date: 2026-11-25
topic: developer-docs
lede: "The `ingest_items` docs now describe matching rows by monday item ID with `match_column_id: \"item_id\"`. Docs also rename the hourly capacity failure reason to `HOURLY_ACCOUNT_CAPACITY_EXCEEDED` from API version `2027-01`, and add a `rich_text` field for long text columns."
---

### Matching by item ID

The [`ingest_items` reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) has a new section, "Matching by item ID". Set `match_column_id` in `on_match` to the literal string `item_id` to match each CSV row to an existing item by its monday item ID. The CSV must contain a column with the header `item_id` holding the numeric item ID. `item_id` is not a board column, and `id` or `pulse_id` are not accepted.

### Hourly capacity failure reason

When an ingest job exceeds the hourly item budget, the `failure_reason` is now `HOURLY_ACCOUNT_CAPACITY_EXCEEDED` in API version `2027-01` and later. Earlier versions, and requests with no API version, still return `ACCOUNT_CAPACITY_EXCEEDED`. The change is documented in [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) and in the [bulk import types reference](https://developer.monday.com/api-reference/reference/bulk-import-other-types), where the enum descriptions were updated.

### Long text `rich_text` field

The [long text column](https://developer.monday.com/api-reference/reference/long-text) page documents a new `rich_text` field on `LongTextValue`, available in API versions `2027-01` and later. Its optional `format` argument accepts `html` (the default) or `markdown`. Markdown output is converted from the stored HTML and drops underline, text alignment and line breaks inside headings.

### Board export

The [board export reference](https://developer.monday.com/api-reference/reference/board-export-api-reference) now says the job query returns `null` for an unknown `job_id`, and that a failed job reports the `FAILED` status instead. The earlier text said `null` was also returned for a job belonging to a different account.
