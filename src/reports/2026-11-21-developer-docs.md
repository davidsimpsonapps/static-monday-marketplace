---
title: "Bulk import API adds cancellation, queue limits and queue_position in 2027-01"
date: 2026-11-21
topic: developer-docs
lede: "The bulk import docs now describe a `cancel_bulk_import` mutation, a 100-import board queue limit and a `queue_position` field, all in API version `2027-01`. Docs for the `2027-01` board activity log changes were removed."
---

### Bulk import changes

The [ingest items reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) documents `cancel_bulk_import`, available from `2027-01`. It takes the `job_id` returned by `ingest_items` or `backfill_items` and returns `ItemsJobStatus`. A queued import is removed from its board queue and ends `CANCELLED`. A running import stops after finishing the items it has already started. Cancelling an already-cancelled queued import, or a job created on an older API version, returns `IMPORT_NOT_CANCELLABLE` (HTTP 409).

Each board runs one import at a time and holds up to 100 imports in flight. From `2027-01`, further imports are rejected with `BOARD_QUEUE_FULL`.

The job status object gains a `queue_position` field, also from `2027-01`. It gives the job's position in the board queue while `status` is `QUEUED`, and is `null` otherwise. It is documented on the [ingest items](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) and [backfill items](https://developer.monday.com/api-reference/reference/backfill-items-api-reference) pages and requires the `boards:read` scope.

The [bulk import types page](https://developer.monday.com/api-reference/reference/bulk-import-other-types) adds failure reason values including `BOARD_QUEUE_FULL` (the board already holds 100 imports; retry with backoff) and `CANCELLED_BY_USER`, both from `2027-01`. A further value, `HOURLY_ACCOUNT_CAPACITY_EXCEEDED`, was also added.

### Board activity logs

The notices and sections describing the `2027-01` changes to board activity logs were removed from the [activity logs](https://developer.monday.com/api-reference/reference/activity-logs), [boards](https://developer.monday.com/api-reference/reference/boards) and [boards other types](https://developer.monday.com/api-reference/reference/boards-other-types) pages. These covered cursor pagination, a 90-day limit and the `BoardActivityLogsPage` type, which is no longer documented.

### Doc blocks

The [doc blocks types page](https://developer.monday.com/api-reference/reference/doc-blocks-other-types) adds a `DeletedDocBlock` type with an `id` field, returned by the `delete_doc_blocks` mutation.
