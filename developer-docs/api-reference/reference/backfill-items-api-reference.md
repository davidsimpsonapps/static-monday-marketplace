---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Backfill Items

Learn how to perform one-time, admin-only bulk loads of items via the platform API using the backfill_items mutation

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

`backfill_items` is for a **single, one-time initial load** of <Glossary>items</Glossary> into a board - for example, when seeding a board before it goes into day-to-day use. It is **not** intended for ongoing operational imports; for those, use [`ingest_items`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) instead.

Compared with ingest, backfill differs in two important ways:

* **Automations are not triggered** on items created during a backfill.
* **Item creation is not logged** in the Activity Log.

This makes backfill suitable for one-shot data migrations where you want to seed the board without firing a flood of automation events. To compare the two flows side-by-side, see the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide.

The backfill workflow is asynchronous:

1. Start the job with `backfill_items` and receive a `job_id` plus a pre-signed `upload_url`
2. Upload your CSV to the `upload_url`
3. Poll [`fetch_job_status`](#fetch-job-status) with the `job_id` until the job reaches a terminal state

## Supported column types

Board Relation, Date, Dropdown, Email, Link, Long Text, Number, People, Phone, Status, Text, and Timeline. Rows that include unsupported column types may fail validation.

## Endpoint behavior

* Maximum rows per uploaded file: **20,000**
* Maximum file size: **150 MB**
* Upload URL and report URL expiration: **10 minutes**
* Required scope: `boards:write` **and** account admin role
* `on_match` is **not** supported (every row creates a new item)
* Does **not** count against the per-account hourly **item create/update budget** that applies to ingest
* Supports create-only hierarchy imports on multi-level subitems boards. Use level columns from `name.l1` through `name.l5`; see the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide for the full CSV format.
* Supports Board Relation columns. See the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk#column-type-validation) guide for the CSV value format and limits.

***

# Queries

## Fetch job status

Use `fetch_job_status` to poll a backfill job. It returns the [`JobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#jobstatus) union, currently implemented as [`ItemsJobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#itemsjobstatus).

* Required scope: `boards:read`
* Returns a [`JobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#jobstatus) union
* Can only be queried directly at the root; cannot be nested inside another selection set

```graphql GraphQL
query {
  fetch_job_status(job_id: "550e8400-e29b-41d4-a716-446655440000") {
    ... on ItemsJobStatus {
      status
      counts {
        submitted
        invalid
        skipped
        created
        updated
        failed
      }
      progress_percentage
      failure_reason
      failure_message
      fully_imported
      report_created
      report_url
    }
  }
}
```

### Arguments

| Argument | Type  | Description                                      |
| :------- | :---- | :----------------------------------------------- |
| job\_id  | `ID!` | The job identifier returned by `backfill_items`. |

### Fields (`ItemsJobStatus`)

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>counts</td>
      <td>[`ItemsJobItemCounts`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#itemsjobitemcounts)</td>
      <td>Per-stage row counts (submitted, invalid, skipped, created, updated, failed).</td>
    </tr>
    <tr>
      <td>failure_message</td>
      <td>`String`</td>
      <td>Human-readable error details. `null` for `INTERNAL_ERROR`.</td>
    </tr>
    <tr>
      <td>failure_reason</td>
      <td>[`BulkImportFailureReason`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#bulkimportfailurereason)</td>
      <td>Machine-readable failure reason when status is `FAILED` or `REJECTED`.</td>
    </tr>
    <tr>
      <td>fully_imported</td>
      <td>`Boolean`</td>
      <td>`true` only when status is `COMPLETED` and `counts.failed` is `0`.</td>
    </tr>
    <tr>
      <td>progress_percentage</td>
      <td>`Int`</td>
      <td>Approximate completion percentage (0–100).</td>
    </tr>
    <tr>
      <td>report_created</td>
      <td>`Boolean`</td>
      <td>Whether a downloadable report exists.</td>
    </tr>
    <tr>
      <td>report_url</td>
      <td>`String`</td>
      <td>Time-limited URL for the report file (10-minute expiration).</td>
    </tr>
    <tr>
      <td>status</td>
      <td>[`BulkImportState`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#bulkimportstate)</td>
      <td>Current job state.</td>
    </tr>
  </tbody>
</Table>

***

# Mutations

**Required scope: `boards:write` (account admin only)**

## Backfill items

Starts a backfill import job and returns [`UploadJobInit`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#uploadjobinit) with the `job_id` and the pre-signed `upload_url`.

```graphql GraphQL
mutation {
  backfill_items(board_id: "1234567890", group_id: "topics") {
    job_id
    upload_url
  }
}
```

### Arguments

| Argument  | Type  | Description                           |
| :-------- | :---- | :------------------------------------ |
| board\_id | `ID!` | The target board.                     |
| group\_id | `ID!` | Target group for newly created items. |

### Response fields

| Field       | Type     | Description                                                        |
| :---------- | :------- | :----------------------------------------------------------------- |
| job\_id     | `ID`     | Identifier used with [`fetch_job_status`](#fetch-job-status).      |
| upload\_url | `String` | Pre-signed URL for the CSV `PUT` upload. Expires after 10 minutes. |

Do not include `x-amz-checksum-crc32` as a request header when uploading to the pre-signed URL. The URL may include checksum query parameters, but forwarding the checksum as an unsigned request header can cause S3 to reject the upload with HTTP 403.

***

# Multi-level subitems hierarchy imports

For MLS file format and hierarchy rules, see the Multi-level subitems boards section in the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk#multi-level-subitems-boards) guide. `backfill_items` remains admin-only and does not trigger automations or Activity Log item creation.

***

# Capacity and rate limits

* **Start-job calls.** `backfill_items` and `ingest_items` share a per-account hourly limit of **100 successful start-job calls per hour**. Exceeding the limit returns `RATE_LIMIT_EXCEEDED` (HTTP 429) with `extensions.retryAfterMs`.
* **Item create/update budget.** Backfill does **not** consume the 19,000-item-per-hour budget that `ingest_items` uses.
* **File size.** Files over 150 MB are rejected with `failure_reason: FILE_TOO_LARGE`.

***

# See also

* [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) - full step-by-step guide
* [Ingest items API reference](https://developer.monday.com/api-reference/reference/ingest-items-api-reference) - recommended for ongoing integrations
* [Bulk import other types](https://developer.monday.com/api-reference/reference/bulk-import-other-types) - input objects, result types, and enums

<br />
