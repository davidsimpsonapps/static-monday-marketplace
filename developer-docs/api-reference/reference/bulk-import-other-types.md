---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
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

| Enum value                  | Description                                                                                                                                      |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACCOUNT_CAPACITY_EXCEEDED` | Account capacity was exceeded (includes the ingest hourly item create/update budget check).                                                      |
| `AUTHORIZATION_FAILED`      | Caller authentication or authorization failed.                                                                                                   |
| `BOARD_CAPACITY_EXCEEDED`   | Board reached its maximum item capacity.                                                                                                         |
| `FILE_TOO_LARGE`            | Uploaded file exceeded the 150 MB limit.                                                                                                         |
| `INTERNAL_ERROR`            | Unexpected server error occurred.                                                                                                                |
| `INVALID_UPLOAD`            | CSV parse or validation failed (for example bad header, wrong column separator, malformed rows, or invalid multi-level subitems hierarchy rows). |
| `PERMISSION_DENIED`         | Caller lacks the required permission for the operation.                                                                                          |

***

# BulkImportState

Enum returned in `status` describing the current state of a job.

| Enum value       | Description                                                               |
| :--------------- | :------------------------------------------------------------------------ |
| `COMPLETED`      | Processing finished. Check `counts` for partial failures.                 |
| `FAILED`         | Job failed during processing. See `failure_reason` and `failure_message`. |
| `PROCESSING`     | Job is processing rows.                                                   |
| `REJECTED`       | Job was rejected before processing completed.                             |
| `UPLOAD_PENDING` | Waiting for the CSV upload to `upload_url`, or upload still in flight.    |

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

| Field                | Type                                                  | Description                                                  |
| :------------------- | :---------------------------------------------------- | :----------------------------------------------------------- |
| status               | [`BulkImportState`](#bulkimportstate)                 | Current job state.                                           |
| counts               | [`ItemsJobItemCounts`](#itemsjobitemcounts)           | Per-stage row counters.                                      |
| progress\_percentage | `Int`                                                 | Approximate completion percentage (0–100).                   |
| failure\_reason      | [`BulkImportFailureReason`](#bulkimportfailurereason) | Machine-readable failure reason.                             |
| failure\_message     | `String`                                              | Human-readable failure details. `null` for `INTERNAL_ERROR`. |
| fully\_imported      | `Boolean`                                             | `true` only when `COMPLETED` and `counts.failed = 0`.        |
| report\_created      | `Boolean`                                             | Whether a downloadable report exists.                        |
| report\_url          | `String`                                              | Time-limited report URL (10-minute expiration).              |

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

| Field             | Type                                     | Description                                                             |
| :---------------- | :--------------------------------------- | :---------------------------------------------------------------------- |
| behaviour         | [`OnMatchBehaviour!`](#onmatchbehaviour) | Match strategy: `UPSERT` updates a matching item; `SKIP` skips the row. |
| match\_column\_id | `String!`                                | Column ID used to detect matches.                                       |

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
