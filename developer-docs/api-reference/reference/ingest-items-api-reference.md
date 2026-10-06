---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Ingest Items

Learn how to bulk-create and update items via the platform API using the default ingest_items mutation

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

`ingest_items` is the **default** way to create or update <Glossary>items</Glossary> in bulk via the platform API. It runs with full platform side effects - automations are triggered and the Activity Log records every change - so it is the right choice for ongoing integrations and recurring imports.

For a one-time, admin-only initial load that bypasses automations and the Activity Log, use [`backfill_items`](https://developer.monday.com/api-reference/reference/backfill-items-api-reference) instead. To compare the two flows side-by-side, see the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide.

The ingest workflow is asynchronous:

1. Start the job with `ingest_items` and receive a `job_id` plus a pre-signed `upload_url`
2. Upload your CSV to the `upload_url`
3. Poll [`fetch_job_status`](#fetch-job-status) with the `job_id` until the job reaches a terminal state

## Supported column types

Board Relation, Date, Dropdown, Email, Link, Long Text, Number, People, Phone, Status, Text, and Timeline. Rows that include unsupported column types may fail validation.

## Endpoint behavior

* Maximum rows per uploaded file: **10,000**
* Maximum file size: **150 MB**
* Upload URL and report URL expiration: **10 minutes**
* Required scope: `boards:write`
* Optional [`on_match`](#on-match) for upsert or skip behavior on duplicate column values in regular item imports
* Counts toward the per-account hourly **item create/update budget** (19,000 items per hour)
* Supports create-only hierarchy imports on multi-level subitems boards. Use level columns from `name.l1` through `name.l5`; see the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide for the full CSV format.
* Supports Board Relation columns. See the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk#column-type-validation) guide for the CSV value format and limits.

***

# Queries

## Fetch job status

Use `fetch_job_status` to poll an ingest job. It returns the [`JobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#jobstatus) union, currently implemented as [`ItemsJobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#itemsjobstatus).

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

| Argument | Type  | Description                                   |
| :------- | :---- | :-------------------------------------------- |
| job\_id  | `ID!` | The job identifier returned by `ingest_items` |

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

**Required scope: `boards:write`**

## Ingest items

Starts an ingest import job and returns [`UploadJobInit`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#uploadjobinit) with the `job_id` and the pre-signed `upload_url`.

```graphql GraphQL
mutation {
  ingest_items(
    board_id: "1234567890"
    group_id: "topics"
    on_match: { behaviour: UPSERT, match_column_id: "email" }
  ) {
    job_id
    upload_url
  }
}
```

### Arguments

| Argument  | Type                                                                                                        | Description                                                                                                                                 |
| :-------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| board\_id | `ID!`                                                                                                       | The target board.                                                                                                                           |
| group\_id | `ID!`                                                                                                       | Target group for newly created items. Does not scope `on_match` matching.                                                                   |
| on\_match | [`OnMatchInput`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#onmatchinput) | Optional matching rule for regular item imports. For MLS hierarchy imports, omit `on_match`; MLS imports always create new hierarchy items. |

### Response fields

| Field       | Type     | Description                                                        |
| :---------- | :------- | :----------------------------------------------------------------- |
| job\_id     | `ID`     | Identifier used with [`fetch_job_status`](#fetch-job-status).      |
| upload\_url | `String` | Pre-signed URL for the CSV `PUT` upload. Expires after 10 minutes. |

Do not include `x-amz-checksum-crc32` as a request header when uploading to the pre-signed URL. The URL may include checksum query parameters, but forwarding the checksum as an unsigned request header can cause S3 to reject the upload with HTTP 403.

***

# `on_match`

For regular item imports, `on_match` lets you update existing items or skip duplicates instead of creating a new item every time. It is **only available on `ingest_items`**; `backfill_items` ignores match rules and always creates new items.

For MLS hierarchy imports, omit `on_match`. MLS imports always create new hierarchy items and do not perform matching, skipping, or updating.

## Matching scope

Matching is evaluated across the whole board. The `group_id` argument controls where newly created items are inserted; it does not scope the search for existing items.

For example, if `on_match` uses `match_column_id: "email"` and the same email exists in another group on the board, that existing item can be matched even when the `group_id` points to a different group.

## OnMatchInput

| Field             | Type                                                                                                                 | Description                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| behaviour         | [`OnMatchBehaviour!`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#onmatchbehaviour) | `UPSERT` updates a matching item; `SKIP` skips the row when a match exists.               |
| match\_column\_id | `String!`                                                                                                            | Column ID used to detect matches (for example `email`, `phone`, or any supported column). |

## OnMatchBehaviour

| Enum value | Description                                                    |
| :--------- | :------------------------------------------------------------- |
| `UPSERT`   | Update the existing matched item; otherwise create a new item. |
| `SKIP`     | Skip the row when a matching item exists.                      |

## UPSERT and empty cells

In **UPSERT** mode, if a data cell is empty or contains only whitespace the column is **ignored**: the existing value on the matched item is preserved, not overwritten.

## UPSERT and clearing column values

In **UPSERT** mode, a data cell containing exactly the string `<NULL>` **clears** the column value on the matched item.

## Supported match column types

Email, Phone, Text, Name, Numbers, Link, Date, Long text, and Status. Use the board's column ID as `match_column_id`.

## Behavior notes

* Rows whose match value is empty are treated as new items.
* If multiple rows of the input file share the same match value, only the **final** row for that value is used (earlier rows are ignored).
* If more than one item on the board matches the match value, the update targets the **most recently created** item.
* `group_id` is not part of the matching key.

***

# Multi-level subitems hierarchy imports

For MLS file format and hierarchy rules, see the Multi-level subitems boards section in the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk#multi-level-subitems-boards) guide.

***

# Capacity and rate limits

* **Jobs started per hour.** `ingest_items` and `backfill_items` share a per-account hourly limit of **100 successful start-job calls per hour**. Exceeding the limit returns `RATE_LIMIT_EXCEEDED` (HTTP 429) with `extensions.retryAfterMs`.
* **Item create/update budget.** `ingest_items` reserves capacity against a per-account hourly budget of **19,000 items per hour**. If the job's valid row count would exceed the remaining budget, the job is rejected with `failure_reason: ACCOUNT_CAPACITY_EXCEEDED`. Capacity is released for rows that ultimately end up failed, skipped, or invalid.

***

# See also

* [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) - full step-by-step guide
* [Backfill items API reference](https://developer.monday.com/api-reference/reference/backfill-items-api-reference) - admin-only one-time loads
* [Bulk import other types](https://developer.monday.com/api-reference/reference/bulk-import-other-types) - input objects, result types, and enums

<br />

***

# job\_status query

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The `job_status` query polls the status of a general-purpose async job by its external job ID. Unlike [`fetch_job_status`](#fetch-job-status) (which is specific to bulk import jobs), `job_status` is a generic polling endpoint for any async operation that returns a job ID.

* **Required scope: `boards:read`**
* Returns [`AsyncJobStatus!`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#asyncjobstatus)
* Can only be queried directly at the root

```graphql GraphQL
query {
  job_status(job_id: "YOUR_JOB_ID") {
    id
    status
    created_at
    updated_at
    error
    result {
      total
      succeeded
      failed
    }
  }
}
```

### Arguments

| Argument | Type  | Description                                     |
| :------- | :---- | :---------------------------------------------- |
| job\_id  | `ID!` | The unique identifier of the async job to poll. |

### Fields

| Field       | Type             | Description                                                                  |
| :---------- | :--------------- | :--------------------------------------------------------------------------- |
| id          | `ID`             | The job's unique identifier.                                                 |
| status      | `JobState`       | The current status of the job. See `JobState` enum values below.             |
| created\_at | `String`         | ISO 8601 timestamp of when the job was created.                              |
| updated\_at | `String`         | ISO 8601 timestamp of when the job was last updated.                         |
| error       | `String`         | An error description if the job failed. Returns `null` if the job succeeded. |
| result      | `AsyncJobResult` | Structured result data for completed or partially-completed operations.      |

#### JobState enum values

| Value       | Description                                            |
| :---------- | :----------------------------------------------------- |
| `PENDING`   | The job is queued but has not started yet.             |
| `RUNNING`   | The job is actively being processed.                   |
| `COMPLETED` | The job finished successfully.                         |
| `FAILED`    | The job encountered a terminal error.                  |
| `EXPIRED`   | The job result has expired and is no longer available. |
| `CANCELLED` | The job was cancelled before it could complete.        |

#### AsyncJobResult fields

| Field     | Type   | Description                                         |
| :-------- | :----- | :-------------------------------------------------- |
| total     | `Int`  | Total number of items processed.                    |
| succeeded | `Int`  | Number of items that were successfully processed.   |
| failed    | `Int`  | Number of items that failed to process.             |
| details   | `JSON` | Additional structured details about the job result. |
