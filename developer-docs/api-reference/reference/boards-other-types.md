---
updatedAt: 2026-10-02T13:31:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the boards APIs

The monday.com [boards](https://developer.monday.com/api-reference/reference/boards) APIs enable you to create, read, update, and delete boards.

The types below are used by the boards queries and mutations, and are not independently queryable.

# ItemNicknameInput

An object containing the item nickname.

| Field        | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| plural       | `String` | The plural form of the item nickname    |
| preset\_type | `String` | The preset type for item nickname.      |
| singular     | `String` | The singular form of the item nickname. |

***

# item\_nickname

<Callout icon="🚧">
  **Only available in version [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An enum value of `board_attribute` on `update_board` that allows you to modify a board’s item nickname.

```graphql
mutation {
  update_board(
    board_id: 1234567890
    board_attribute: item_nickname
    new_value: "{\"preset_type\":\"other\",\"singular\":\"Task\",\"plural\":\"Tasks\"}"
  )
}
```

| Field        | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| plural       | `String` | The plural form of the item nickname    |
| preset\_type | `String` | The preset type for item nickname.      |
| singular     | `String` | The singular form of the item nickname. |

***

# SetBoardPermissionResponse

An object containing the result of setting a board's permissions via the API.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        edit_permissions
      </td>

      <td>
        `BoardEditPermissions!`
      </td>

      <td>
        Specifies which group of users is allowed to edit the board’s content. This setting reflects the board's technical editing permissions.
      </td>

      <td>
        `assignee`  
        `collaborators`  
        `everyone`  
        `owners`
      </td>
    </tr>

    <tr>
      <td>
        failed_actions
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        Any actions that failed during the permission update process.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateBoardHierarchyAttributesInput

An object containing the board's attributes to update.

| Field                | Type                                                                                                   | Description                                                                                                           |
| :------------------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| account\_product\_id | `ID`                                                                                                   | The board's updated account product ID. You must also provide the relevant `workspace_id` within the updated product. |
| folder\_id           | `ID`                                                                                                   | The board's updated folder ID.                                                                                        |
| position             | [`DynamicPosition`](https://developer.monday.com/api-reference/reference/other-types#dynamic-position) | The board's updated position in the left-side menu.                                                                   |
| workspace\_id        | `ID`                                                                                                   | The board's updated workspace ID.                                                                                     |

## Dynamic position

An object containing the board's updated position in the left-side menu of the platform.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        is_after
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Specifies where to position the target board relative to the reference object:

        * Set to `true` to place the target after the reference
        * Set to `false` to place the target before the reference
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the reference object that the target board should be positioned relative to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type
      </td>

      <td>
        `ObjectType!`
      </td>

      <td>
        The type of the reference object.
      </td>

      <td>
        `Board`  
        `Folder`  
        `Overview`
      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateBoardHierarchyResult

An object containing the result of updating a board's position, product, or workspace.

| Field   | Type                                                                   | Description                             |
| :------ | :--------------------------------------------------------------------- | :-------------------------------------- |
| board   | [`Board`](https://developer.monday.com/api-reference/reference/boards) | The updated board.                      |
| message | `String`                                                               | A message about the operation's result. |
| success | `Boolean!`                                                             | Whether the operation was successful.   |

***

# BoardInferredMetadata

<Callout icon="🚧">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Optional metadata inferred for a board (for example, how items are referred to in context).

| Field      | Type     | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| item\_type | `String` | Custom terminology label for items on this board (when set). |

***

# BoardManualMetadata

<Callout icon="🚧">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Optional metadata supplied explicitly for a board.

| Field     | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| board\_md | `String` | Markdown content describing the board. |

***

# BoardActivityLogsPage

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Returned by [`activity_log`](https://developer.monday.com/api-reference/reference/boards#fields) on [`Board`](https://developer.monday.com/api-reference/reference/boards). Fields are not yet documented here.

***

# ExportAsyncJob

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Returned by [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export). Poll `export_job_status` with the job's `job_id` until the status is `COMPLETED`, `FAILED`, or `CANCELLED`. `fetch_export_job_status` is a deprecated alias reachable only on dev. Fields are not yet documented here.

***

# ExportFile

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A completed board export, ready to download. Returned as one branch of [`ExportResult`](https://developer.monday.com/api-reference/reference/boards-other-types#exportresult) when the export finished within the synchronous window.

| Field         | Type     | Description                                                                                                                      |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------- |
| download\_url | `String` | Presigned URL to download the exported file. Treat it as a secret — anyone holding it can download the file until it expires.    |
| expires\_at   | `String` | When `download_url` stops working, as an ISO 8601 timestamp. The URL cannot be refreshed; call the mutation again for a new one. |

***

# CreateBoardExportOptionsInput

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Optional export configuration, passed to [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export). Every field is optional; omitting the whole object exports the board with the defaults below.

| Field                           | Type                        | Default     | Description                                                                                                                                             |
| :------------------------------ | :-------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| include\_subitems               | `Boolean`                   | `false`     | Include subitems in the export.                                                                                                                         |
| include\_item\_identifiers      | `Boolean`                   | `false`     | Append `item_id` — and `parent_item_id` when `include_subitems` is `true` — as the last columns. Needed to match exported rows back to items.           |
| header\_row                     | `HeaderFormat`              | `COLUMN_ID` | Whether the header row uses column titles or column IDs. Defaults to `COLUMN_ID` when omitted.                                                          |
| people\_column\_format          | `PeopleColumnFormat`        | —           | Output format for people column values. Omit to keep the raw ID form.                                                                                   |
| connected\_item\_column\_format | `ConnectedItemColumnFormat` | `NAME`      | Whether connected items (Connect boards) render as names or IDs.                                                                                        |
| columns\_order                  | `[String!]`                 | —           | Column IDs in the order you want them in the file. **This also filters** — see the note below. Omit it to export every column in the board's own order. |
| include\_project\_board\_link   | `Boolean`                   | —           | Include the project board link in the export. **Only available in versions `2027-01` and later.**                                                       |

<Callout icon="⚠️" theme="warn">
  **`columns_order` selects columns as well as ordering them.** Any column you do not list is left out of the export entirely — it is not appended at the end. To reorder a board without losing columns, list every column ID you want.

  The item name and subitems columns are the exception: they are always placed first, whether or not you list them.
</Callout>

***

# ExportResult

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A union returned by [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export). It is either a finished export you can download immediately, or a reference to a job that is still running.

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

| Member                                                                                                     | Meaning                                                                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ExportFile`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfile)         | The export already finished. Use `download_url` right away.                                                                                                                    |
| [`ExportAsyncJob`](https://developer.monday.com/api-reference/reference/boards-other-types#exportasyncjob) | The export is still running. Poll [`export_job_status`](https://developer.monday.com/api-reference/reference/boards#get-export-job-status) with `job_id` until it is terminal. |

There is no error member. Problems surface either as a GraphQL error (if the request is rejected before the export starts) or as a `FAILED` status on `export_job_status` (if it fails after starting).

***

# HeaderFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Format of the header row in an exported file. Used by [`CreateBoardExportOptionsInput.header_row`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput).

| Value       | Description                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| `TITLE`     | Use column titles as headers. Human-readable, but titles are not unique and can be renamed at any time.              |
| `COLUMN_ID` | Use column IDs as headers. Stable identifiers — use this when the file will be re-imported or processed by a script. |

***

# ConnectedItemColumnFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Output format for connected items (Connect boards) column values. Used by [`CreateBoardExportOptionsInput.connected_item_column_format`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput).

| Value  | Description                                                                                             |
| :----- | :------------------------------------------------------------------------------------------------------ |
| `NAME` | Use the linked items' display names (e.g. `Task A, Task B`). This is the default.                       |
| `ID`   | Use the linked items' IDs (e.g. `111, 222`). Use this when the export needs to be joined back to items. |

***

# PeopleColumnFormat

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Output format for people column values. Used by [`CreateBoardExportOptionsInput.people_column_format`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput).

| Value  | Description                                                                                         |
| :----- | :-------------------------------------------------------------------------------------------------- |
| `NAME` | Use display names (e.g. `Jordan Lee, Marketing Team`) instead of the raw ID form (e.g. `user:123`). |

Omit the option entirely to keep the raw ID form, which is what you want if the values need to be resolved back to specific users or teams.

***

# ExportJobStatusInfo

<Callout icon="🚧">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The current state of an async board export job. Returned by [`export_job_status`](https://developer.monday.com/api-reference/reference/boards#get-export-job-status).

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

Lifecycle status of an async board export job. Used by [`ExportJobStatusInfo.status`](https://developer.monday.com/api-reference/reference/boards-other-types#exportjobstatusinfo).

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

Structured reason an async board export job failed. Used by [`ExportJobStatusInfo.failure_reason`](https://developer.monday.com/api-reference/reference/boards-other-types#exportjobstatusinfo).

| Value                 | Retryable | Description                                                                                                                              |
| :-------------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `BOARD_UNAVAILABLE`   | No        | The board was deleted or archived.                                                                                                       |
| `BOARD_INACCESSIBLE`  | No        | The caller lost permission to read the board.                                                                                            |
| `ITEM_LIMIT_EXCEEDED` | No        | The board has more items than the export limit allows.                                                                                   |
| `INVALID_REQUEST`     | No        | The request was rejected during validation — for example, an unsupported combination of export options. Fix the request before retrying. |
| `NOT_FOUND`           | No        | The board, or something it referenced, could not be found.                                                                               |
| `INTERNAL_ERROR`      | Yes       | An unexpected internal error occurred. Retrying the mutation is reasonable.                                                              |
