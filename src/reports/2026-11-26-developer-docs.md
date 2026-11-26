---
title: "Bulk import adds 100-column cap, raises hourly job limit to 500; new portfolio bulk-add API"
date: 2026-11-26
topic: developer-docs
lede: "CSV imports via `ingest_items` and `backfill_items` are now limited to 100 columns per file, while the shared start-job limit rises from 100 to 500 per account per hour. Release notes also list new portfolio bulk-add operations."
---

### Bulk import limits

Files with more than 100 columns, counted from the header row including the item name column, are rejected with `failure_reason: INVALID_UPLOAD`. The `failure_message` states the column count. The shared limit on successful start-job calls for `ingest_items` and `backfill_items` is now 500 per account per hour. See [importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk), the [`ingest_items` reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) and the [`backfill_items` reference](https://developer.monday.com/api-reference/reference/backfill-items-api-reference). The [`INVALID_UPLOAD` description](https://developer.monday.com/api-reference/reference/bulk-import-other-types) now mentions the column limit.

### Portfolio bulk add

The [release notes](https://developer.monday.com/api-reference/docs/release-notes) add the `add_existing_projects_to_portfolio` mutation, which queues up to 5000 existing projects for addition to a portfolio in the background. Related additions are the `portfolio_bulk_add_status` and `portfolio_bulk_add_results` queries and the `halt_portfolio_bulk_add_batch` mutation. Only one bulk add can run on a portfolio at a time.

### Other API changes

The release notes also list a new `ids` argument on `replies` (up to 100 IDs; `board_ids` becomes optional) and new `item_id` and `parent_id` fields on `Reply`, under `2027-01`.

The [board views reference](https://developer.monday.com/api-reference/reference/board-views) adds an `is_pinned` argument for pinning a view for all board members. It requires board owner or admin rights and is available in API version `2027-01` and later.
