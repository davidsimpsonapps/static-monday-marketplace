---
updatedAt: 2026-11-04T13:52:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board Export API Reference

Full reference for create_board_export and export_job_status - starting, polling, and downloading a board export

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

* 🚧 Only available for **Enterprise plans**
* **Required scope: `boards:read`** for both operations (not `boards:write` — the export only reads board data)
* The exported file is always CSV

The export workflow:

1. Call `create_board_export` with the `board_id`
2. If the response is [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile), download `download_url` immediately
3. If the response is [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob), poll [`export_job_status`](#get-export-job-status) with its `job_id` until the job reaches a terminal state

***

# Queries

## Get export job status

* 🚧 Only available for **Enterprise plans** — other accounts receive a `FORBIDDEN_EXCEPTION` error
* **Required scope: `boards:read`**
* Returns the current state of an async board export as [`ExportJobStatusInfo`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportjobstatusinfo), or `null`
* Use it to poll a `job_id` returned by [`create_board_export`](#create-board-export)

```graphql GraphQL
query {
  export_job_status(job_id: "a1b2c3d4-0000-0000-0000-000000000000") {
    status
    download_url
    failure_reason
    failure_message
  }
}
```

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($job: ID!) { export_job_status (job_id: $job) { status download_url failure_reason failure_message }}`
const variables = {
  job: "a1b2c3d4-0000-0000-0000-000000000000"
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type  | Description                                     |
| :------- | :---- | :---------------------------------------------- |
| job\_id  | `ID!` | The `job_id` returned by `create_board_export`. |

### Polling

Poll until `status` is one of the terminal values — `COMPLETED`, `FAILED`, or `CANCELLED`:

* **`COMPLETED`** — read `download_url`. It can still be `null` if you poll after the URL has expired, so check before using it.
* **`FAILED`** — read `failure_reason` (and `failure_message` when present).
* **`RUNNING`** — wait and poll again.

Back off between polls rather than polling in a tight loop; every call counts against your [rate limits](https://developer.monday.com/api-reference/docs/rate-limits). Large exports can take minutes, so set a timeout in your own client rather than polling indefinitely.

<Callout icon="⚠️" theme="warn">
  **A `null` result does not mean the job failed.** This query returns `null` for a `job_id` that does not exist *and* for one that belongs to a different account — the two are deliberately indistinguishable, so an ID that leaks cannot be used to probe for other accounts' exports. If you get `null` for an ID you just received, check that you are querying with the same account's token.
</Callout>

***

# Mutations

**Required scope: `boards:read`** (not `boards:write` — this mutation only reads board data)

## Create board export

* 🚧 Only available for **Enterprise plans**
* Exports a board to a CSV file and returns [`ExportResult`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportresult)
* The exported file is always CSV

<Callout icon="❗️" theme="error">
  **This mutation returns one of two different types, and your query must handle both.**

  Small boards usually finish immediately and return [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile) with a `download_url`. Larger ones return [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob) with a `job_id` you then poll.

  **Which one you get is not part of the contract.** It depends on board size and current server load, and the thresholds can be retuned without notice — so the same board can return `ExportFile` today and `ExportAsyncJob` tomorrow. A client that selects only one branch will break. Always select both.
</Callout>

```graphql GraphQL
mutation {
  create_board_export(
    board_id: 1234567890
    export_options: { include_subitems: true, header_row: COLUMN_ID, columns_order: ["name", "status", "date4"] }
    time_zone: "America/New_York"
  ) {
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

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board: ID!) { create_board_export (board_id: $board) { ... on ExportFile { download_url expires_at } ... on ExportAsyncJob { job_id }}}`
const variables = {
  board: 1234567890
}
const response = await mondayApiClient.request(query, variables);

const result = response.create_board_export;
if (result.download_url) {
  // Finished synchronously — download it now.
} else {
  // Still running — poll export_job_status with result.job_id.
}
```

### Arguments

| Argument        | Type                                                                                          | Description                                                                                                                                                                                   |
| :-------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| board\_id       | `ID!`                                                                                         | The unique identifier of the board to export.                                                                                                                                                 |
| export\_options | [`CreateBoardExportOptionsInput`](https://developer.monday.com/api-reference/docs/board-export-other-types#createboardexportoptionsinput) | Export configuration (subitems, header format, column order, and so on). Omit for defaults.                                                                                                   |
| time\_zone      | `String`                                                                                      | IANA time zone used to format date and time values, for example `America/New_York`. Defaults to the time zone of the user whose token made the request, and to UTC if that user has none set. |

<Callout icon="⚠️" theme="warn">
  **`export_options.columns_order` selects columns as well as ordering them.** Any column you do not list is left out of the export entirely — it is not appended at the end. To reorder a board without losing columns, list every column ID you want.

  The item name and subitems columns are the exception: they are always placed first, whether or not you list them.
</Callout>

### Returns

[`ExportResult`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportresult) — a union of:

| Type                                                            | When                        | What to do                                                                                     |
| :-------------------------------------------------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------- |
| [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile)         | The export finished in time | Download `download_url` before `expires_at`.                                                   |
| [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob) | The export is still running | Poll [`export_job_status`](#get-export-job-status) with `job_id` until the status is terminal. |

Use `__typename` if you would rather branch explicitly than infer the branch from which fields came back:

```graphql GraphQL
mutation {
  create_board_export(board_id: 1234567890) {
    __typename
    ... on ExportFile { download_url }
    ... on ExportAsyncJob { job_id }
  }
}
```

### Errors

The result has no error branch. Failures reach you one of two ways:

* **As a GraphQL error**, if the request is rejected before the export starts — for example an invalid `board_id`, missing permissions, or an unsupported combination of export options. Accounts that are not on an Enterprise plan are rejected here with the `FORBIDDEN_EXCEPTION` error code.
* **As a `FAILED` status** on [`export_job_status`](#get-export-job-status), if an async export fails after starting. Read [`ExportFailureReason`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfailurereason) to find out why.

### Download URLs

`download_url` is a presigned URL and expires. Treat it as a secret — anyone who has it can download the file until it expires. It cannot be refreshed: once it expires, call `create_board_export` again to produce a new file.

***

# See also

* [Board Export overview](https://developer.monday.com/api-reference/docs/board-export) - sync vs. async at a glance
* [Board export other types](https://developer.monday.com/api-reference/docs/board-export-other-types) - input objects, result types, and enums

<br />
