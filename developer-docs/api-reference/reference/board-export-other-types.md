---
updatedAt: 2026-11-04T13:52:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board Export Other Types

Input objects, result types, and enums used by create_board_export and export_job_status

# ExportAsyncJob

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Returned by [`create_board_export`](https://developer.monday.com/api-reference/docs/board-export-api-reference#create-board-export). Poll `export_job_status` with the job's `job_id` until the status is `COMPLETED`, `FAILED`, or `CANCELLED`.

| Field   | Type | Description                                                                                                                                          |
| :------ | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| job\_id | `ID` | Opaque identifier for the export job. Pass it to [`export_job_status`](https://developer.monday.com/api-reference/docs/board-export-api-reference#get-export-job-status) to poll for the result. |

***

# ExportFile

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A completed board export, ready to download. Returned as one branch of [`ExportResult`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportresult) when the export finished within the synchronous window.

| Field         | Type     | Description                                                                                                                      |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------- |
| download\_url | `String` | Presigned URL to download the exported file. Treat it as a secret — anyone holding it can download the file until it expires.    |
| expires\_at   | `String` | When `download_url` stops working, as an ISO 8601 timestamp. The URL cannot be refreshed; call the mutation again for a new one. |

***

# CreateBoardExportOptionsInput

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Optional export configuration, passed to [`create_board_export`](https://developer.monday.com/api-reference/docs/board-export-api-reference#create-board-export). Every field is optional; omitting the whole object exports the board with the defaults below.

| Field                           | Type                        | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------ | :-------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| include\_subitems               | `Boolean`                   | `false`     | Include subitems in the export.                                                                                                                                                                                                                                                                                                                                                             |
| include\_item\_identifiers      | `Boolean`                   | `false`     | Append `item_id` — and `parent_item_id` when `include_subitems` is `true` — as the last columns. Needed to match exported rows back to items.                                                                                                                                                                                                                                               |
| header\_row                     | `HeaderFormat`              | `COLUMN_ID` | Whether the header row uses column titles or column IDs. Defaults to `COLUMN_ID` when omitted.                                                                                                                                                                                                                                                                                              |
| people\_column\_format          | `PeopleColumnFormat`        | —           | Output format for people column values. Omit to keep the raw ID form.                                                                                                                                                                                                                                                                                                                       |
| connected\_item\_column\_format | `ConnectedItemColumnFormat` | `NAME`      | Whether connected items (Connect boards) render as names or IDs.                                                                                                                                                                                                                                                                                                                            |
| columns\_order                  | `[String!]`                 | —           | Column IDs in the order you want them in the file. **This also filters** — see the note below. Omit it to export every column in the board's own order.                                                                                                                                                                                                                                     |
| include\_project\_board\_link   | `Boolean`                   | —           | Add a trailing `Project Board` column with the board ID of the project board connected to each row through its portfolio project-link column (`portfolio_project_link`). Resolves to the first linked project's board ID; blank when the row has no linked project. Ignored for non-CSV formats and where not available to the account. **Only available in versions `2027-01` and later.** |

<Callout icon="⚠️" theme="warn">
  **`columns_order` selects columns as well as ordering them.** Any column you do not list is left out of the export entirely — it is not appended at the end. To reorder a board without losing columns, list every column ID you want.

  The item name and subitems columns are the exception: they are always placed first, whether or not you list them.
</Callout>

***

# ExportResult

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A union returned by [`create_board_export`](https://developer.monday.com/api-reference/docs/board-export-api-reference#create-board-export). It is either a finished export you can download immediately, or a reference to a job that is still running.

```graphql
union ExportResult = ExportAsyncJob | ExportFile
```

The server decides which member to return based on board size and current load. **Which branch you get is not part of the contract and can change without notice, so your query must handle both.** Select both members with inline fragments:

```graphql GraphQL
mutation {
  create_board_export(board_id: 1234567890) {
    ... on ExportFile {
      download_url
      expires_at
    }
    ... on ExportAsyncJob {
      job_id
    }
  }
}
```

| Member                                                          | Meaning                                                                                                                                           |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile)         | The export already finished. Use `download_url` right away.                                                                                       |
| [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob) | The export is still running. Poll [`export_job_status`](https://developer.monday.com/api-reference/docs/board-export-api-reference#get-export-job-status) with `job_id` until it is terminal. |

There is no error member. Problems surface either as a GraphQL error (if the request is rejected before the export starts) or as a `FAILED` status on `export_job_status` (if it fails after starting).

***

# HeaderFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Format of the header row in an exported file. Used by [`CreateBoardExportOptionsInput.header_row`](https://developer.monday.com/api-reference/docs/board-export-other-types#createboardexportoptionsinput).

| Value       | Description                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| `TITLE`     | Use column titles as headers. Human-readable, but titles are not unique and can be renamed at any time.              |
| `COLUMN_ID` | Use column IDs as headers. Stable identifiers — use this when the file will be re-imported or processed by a script. |

***

# ConnectedItemColumnFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Output format for connected items (Connect boards) column values. Used by [`CreateBoardExportOptionsInput.connected_item_column_format`](https://developer.monday.com/api-reference/docs/board-export-other-types#createboardexportoptionsinput).

| Value  | Description                                                                                             |
| :----- | :------------------------------------------------------------------------------------------------------ |
| `NAME` | Use the linked items' display names (e.g. `Task A, Task B`). This is the default.                       |
| `ID`   | Use the linked items' IDs (e.g. `111, 222`). Use this when the export needs to be joined back to items. |

***

# PeopleColumnFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Output format for people column values. Used by [`CreateBoardExportOptionsInput.people_column_format`](https://developer.monday.com/api-reference/docs/board-export-other-types#createboardexportoptionsinput).

| Value  | Description                                                                                         |
| :----- | :-------------------------------------------------------------------------------------------------- |
| `NAME` | Use display names (e.g. `Jordan Lee, Marketing Team`) instead of the raw ID form (e.g. `user:123`). |

Omit the option entirely to keep the raw ID form, which is what you want if the values need to be resolved back to specific users or teams.

***

# ExportJobStatusInfo

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The current state of an async board export job. Returned by [`export_job_status`](https://developer.monday.com/api-reference/docs/board-export-api-reference#get-export-job-status).

| Field            | Type                  | Description                                                                                                                                                                  |
| :--------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status           | `ExportJobStatus`     | Current status of the job. `COMPLETED`, `FAILED`, and `CANCELLED` are terminal — stop polling when you see one.                                                              |
| download\_url    | `String`              | Presigned download URL. Populated only while `status` is `COMPLETED` **and** the URL has not expired; it becomes `null` afterwards. Run the export again to get a fresh one. |
| failure\_reason  | `ExportFailureReason` | Structured reason the job failed. Populated only when `status` is `FAILED`. Branch on this rather than on `failure_message`.                                                 |
| failure\_message | `String`              | Human-readable error detail, when the failure exposes text that is safe to show. Populated only when `status` is `FAILED`, and may be `null` even then.                      |

Note that a `COMPLETED` job can still return a `null` `download_url` if you poll after the URL has expired, so check for `null` before using it.

***

# ExportJobStatus

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Lifecycle status of an async board export job. Used by [`ExportJobStatusInfo.status`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportjobstatusinfo).

| Value       | Terminal | Description                                                                   |
| :---------- | :------- | :---------------------------------------------------------------------------- |
| `RUNNING`   | No       | The export is still in progress. Keep polling.                                |
| `COMPLETED` | Yes      | The export finished successfully. Read `download_url`.                        |
| `FAILED`    | Yes      | The export failed. Read `failure_reason`, and `failure_message` when present. |
| `CANCELLED` | Yes      | The export was cancelled.                                                     |

Treat any unrecognized value as terminal so a future addition cannot leave your client polling forever.

***

# ExportFailureReason

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Structured reason an async board export job failed. Used by [`ExportJobStatusInfo.failure_reason`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportjobstatusinfo).

| Value                 | Retryable | Description                                                                                                                              |
| :-------------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `BOARD_UNAVAILABLE`   | No        | The board was deleted or archived.                                                                                                       |
| `BOARD_INACCESSIBLE`  | No        | The caller lost permission to read the board.                                                                                            |
| `ITEM_LIMIT_EXCEEDED` | No        | The board has more items than the export limit allows.                                                                                   |
| `INVALID_REQUEST`     | No        | The request was rejected during validation — for example, an unsupported combination of export options. Fix the request before retrying. |
| `NOT_FOUND`           | No        | The board, or something it referenced, could not be found.                                                                               |
| `INTERNAL_ERROR`      | Yes       | An unexpected internal error occurred. Retrying the mutation is reasonable.                                                              |

***

# See also

* [Board Export overview](https://developer.monday.com/api-reference/docs/board-export) - sync vs. async at a glance
* [Board Export API reference](https://developer.monday.com/api-reference/docs/board-export-api-reference) - `create_board_export` and `export_job_status`

<br />
