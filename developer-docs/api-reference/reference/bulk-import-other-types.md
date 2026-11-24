---
updatedAt: 2026-11-24T12:56:03.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Bulk Import Other Types

Learn about the input objects, result types, and enums used by the bulk import items API

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The types below are used by [`backfill_items`](https://developer.monday.com/api-reference/reference/backfill-items-api-reference#backfill-items), [`ingest_items`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#ingest-items), and [`fetch_job_status`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#fetch-job-status).

***

# BulkImportFailureReason

Enum returned in `failure_reason` when a job ends in `REJECTED` or `FAILED`.

| Enum value                         | Description                                                                                                                                                                                  |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACCOUNT_CAPACITY_EXCEEDED`        | Account capacity was exceeded. In API versions before `2027-01`, and in requests with no API version, this also covers the ingest hourly item create/update budget check.                    |
| `AUTHORIZATION_FAILED`             | Caller authentication or authorization failed.                                                                                                                                               |
| `BOARD_CAPACITY_EXCEEDED`          | Board reached its maximum item capacity.                                                                                                                                                     |
| `BOARD_QUEUE_FULL`                 | The board already holds the maximum number of imports in flight (100). Retry with backoff after earlier imports finish. Available from `2027-01`.                                            |
| `CANCELLED_BY_USER`                | The import was cancelled by a user. Available from `2027-01`.                                                                                                                                |
| `FILE_TOO_LARGE`                   | Uploaded file exceeded the 150 MB limit.                                                                                                                                                     |
| `HOURLY_ACCOUNT_CAPACITY_EXCEEDED` | The hourly account ingest capacity was exceeded. You can retry the import in the next hour. Available from `2027-01`. Earlier versions return `ACCOUNT_CAPACITY_EXCEEDED` for the same case. |
| `INTERNAL_ERROR`                   | Unexpected server error occurred.                                                                                                                                                            |
| `INVALID_UPLOAD`                   | CSV parse or validation failed (for example bad header, wrong column separator, malformed rows, or invalid multi-level subitems hierarchy rows).                                             |
| `PERMISSION_DENIED`                | Caller lacks the required permission for the operation.                                                                                                                                      |
| `TIMED_OUT`                        | The import waited too long in the board queue for earlier imports to finish, and did not start (4 hours by default). Try again. Available from `2027-01`.                                    |
| `UPLOAD_NOT_FOUND`                 | The uploaded file was not found in storage. Available from `2027-01`.                                                                                                                        |

***

# BulkImportState

Enum returned in `status` describing the current state of a job.

| Enum value       | Description                                                               |
| :--------------- | :------------------------------------------------------------------------ |
| `CANCELLED`      | The import was cancelled. Available from `2027-01`.                       |
| `COMPLETED`      | Processing finished. Check `counts` for partial failures.                 |
| `FAILED`         | Job failed during processing. See `failure_reason` and `failure_message`. |
| `PROCESSING`     | Job is processing rows.                                                   |
| `QUEUED`         | Waiting in the queue of the board. Available from `2027-01`.              |
| `REJECTED`       | Job was rejected before processing completed.                             |
| `UPLOAD_PENDING` | Waiting for the CSV upload to `upload_url`, or upload still in flight.    |

In API versions before `2027-01`, and in requests with no API version, the newer values read as older ones. In `status`, `QUEUED` reads as `PROCESSING` and `CANCELLED` reads as `FAILED`. In `failure_reason`, `BOARD_QUEUE_FULL` reads as `BOARD_CAPACITY_EXCEEDED`, and `TIMED_OUT` and `CANCELLED_BY_USER` read as `INTERNAL_ERROR`, and `HOURLY_ACCOUNT_CAPACITY_EXCEEDED` reads as `ACCOUNT_CAPACITY_EXCEEDED`.

***

# ItemsJobItemCounts

Per-stage row counters returned inside `ItemsJobStatus.counts`.

| Field     | Type  | Description                                                                                                                                                            |
| :-------- | :---- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| created   | `Int` | Items created in monday.com. For multi-level subitems hierarchy imports, this includes created parent and child items.                                                 |
| failed    | `Int` | Valid rows (passed validation) that failed during execution.                                                                                                           |
| invalid   | `Int` | Rows that failed validation. For MLS hierarchy imports, this can include rows with no populated level column, multiple populated level columns, or hierarchy errors.   |
| skipped   | `Int` | Rows skipped (for example by `on_match: { behaviour: SKIP }` in regular item imports). MLS hierarchy imports are create-only and should not use `SKIP`.                |
| submitted | `Int` | Total rows submitted in the uploaded file.                                                                                                                             |
| updated   | `Int` | Existing items updated (for example via `on_match: { behaviour: UPSERT }` in regular item imports). MLS hierarchy imports are create-only and should not use `UPSERT`. |

***

# ItemsJobStatus

Returned from [`fetch_job_status`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#fetch-job-status) through the [`JobStatus`](#jobstatus) union. The full field listing lives on the [Ingest items API reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#fields-itemsjobstatus); a short summary follows.

| Field                | Type                                                  | Description                                                                                                                                                                                                                        |
| :------------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status               | [`BulkImportState`](#bulkimportstate)                 | Current job state.                                                                                                                                                                                                                 |
| counts               | [`ItemsJobItemCounts`](#itemsjobitemcounts)           | Per-stage row counters.                                                                                                                                                                                                            |
| progress\_percentage | `Int`                                                 | Approximate completion percentage (0–100).                                                                                                                                                                                         |
| failure\_reason      | [`BulkImportFailureReason`](#bulkimportfailurereason) | Machine-readable failure reason.                                                                                                                                                                                                   |
| failure\_message     | `String`                                              | Human-readable failure details. `null` for `INTERNAL_ERROR`.                                                                                                                                                                       |
| fully\_imported      | `Boolean`                                             | `true` only when `COMPLETED` and `counts.failed = 0`.                                                                                                                                                                              |
| queue\_position      | `Int`                                                 | Position of the job in its board queue while `status` is `QUEUED`, starting at `1` for the next job to run. `null` in any other state or when the position is unknown. Available from `2027-01`. Requires the `boards:read` scope. |
| report\_created      | `Boolean`                                             | Whether a downloadable report exists.                                                                                                                                                                                              |
| report\_url          | `String`                                              | Time-limited report URL (10-minute expiration).                                                                                                                                                                                    |

***

# JobStatus

Union returned by [`fetch_job_status`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#fetch-job-status). Today, bulk CSV imports resolve to [`ItemsJobStatus`](#itemsjobstatus). The union is forward-compatible - additional job kinds may be added in future versions.

```graphql
union JobStatus = ItemsJobStatus
```

***

# OnMatchInput

Input object accepted by [`ingest_items`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#ingest-items) only. Not supported by `backfill_items`.

`OnMatchInput` applies to regular item imports. For MLS hierarchy imports, omit `on_match`. MLS imports always create new hierarchy items and do not perform matching, skipping, or updating.

Matching is evaluated across the whole board. The `group_id` argument on `ingest_items` controls where newly created items are inserted; it does not scope matching for updates or skips.

| Field             | Type                                     | Description                                                                                                                                                                                                     |
| :---------------- | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| behaviour         | [`OnMatchBehaviour!`](#onmatchbehaviour) | Match strategy: `UPSERT` updates a matching item; `SKIP` skips the row.                                                                                                                                         |
| match\_column\_id | `String!`                                | Column ID used to detect matches. Use `item_id` to match on the monday item ID; see [Matching by item ID](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#matching-by-item-id). |

For supported match column types, see the [Ingest items API reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#supported-match-column-types).

# OnMatchBehaviour

Enum used in [`OnMatchInput.behaviour`](#onmatchinput).

| Enum value | Description                                                    |
| :--------- | :------------------------------------------------------------- |
| `SKIP`     | Skip importing the row when a matching item exists.            |
| `UPSERT`   | Update the existing matched item; otherwise create a new item. |

***

# UploadJobInit

Response object from [`backfill_items`](https://developer.monday.com/api-reference/reference/backfill-items-api-reference#backfill-items) and [`ingest_items`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#ingest-items).

| Field       | Type     | Description                                                                                                                                           |
| :---------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| job\_id     | `ID`     | Identifier for [`fetch_job_status`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#fetch-job-status).                |
| upload\_url | `String` | Pre-signed URL for the CSV `PUT` upload. Expires after 10 minutes. Do not send `x-amz-checksum-crc32` as a request header when uploading to this URL. |

<br />
