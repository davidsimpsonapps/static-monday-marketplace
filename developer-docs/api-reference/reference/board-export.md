---
updatedAt: 2026-11-04T13:52:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board Export

Overview of the create_board_export mutation and the export_job_status query, and how they fit together as one export workflow

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later, on Enterprise plans**
</Callout>

The platform API exposes **`create_board_export`** to export a board's items to a CSV file. Small boards usually finish before the mutation returns; larger boards return a job you poll instead. Both outcomes come back from the same call, so every client has to handle both.

The export workflow is:

1. Call [`create_board_export`](https://developer.monday.com/api-reference/docs/board-export-api-reference#create-board-export). It returns [`ExportResult`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportresult), a union of:
   * [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile) — the export already finished. Download `download_url` before `expires_at`.
   * [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob) — the export is still running. Go to step 2.
2. Poll [`export_job_status`](https://developer.monday.com/api-reference/docs/board-export-api-reference#get-export-job-status) with the job's `job_id` until `status` reaches a terminal value — `COMPLETED`, `FAILED`, or `CANCELLED`.
3. On `COMPLETED`, download `download_url` before it expires. On `FAILED`, read `failure_reason` (and `failure_message` when present) from [`ExportFailureReason`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfailurereason).

**Which branch you get is not part of the contract.** The server picks `ExportFile` or `ExportAsyncJob` based on board size and current load, and the thresholds can change without notice — the same board can return `ExportFile` today and `ExportAsyncJob` tomorrow. Always select both branches.

## Comparison

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th></th>
      <th>`ExportFile` (sync)</th>
      <th>`ExportAsyncJob` (async)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**When it happens**</td>
      <td>Small boards, export finishes within the request</td>
      <td>Larger boards, export keeps running after the request returns</td>
    </tr>
    <tr>
      <td>**What you get back**</td>
      <td>`download_url` and `expires_at` directly on the mutation response</td>
      <td>`job_id` to poll</td>
    </tr>
    <tr>
      <td>**Next call**</td>
      <td>None — download the file</td>
      <td>[`export_job_status`](https://developer.monday.com/api-reference/docs/board-export-api-reference#get-export-job-status), repeated until terminal</td>
    </tr>
    <tr>
      <td>**Failure surface**</td>
      <td>A GraphQL error on the mutation itself</td>
      <td>A `FAILED` status on `export_job_status`, or a GraphQL error if rejected before the job starts</td>
    </tr>
  </tbody>
</Table>

For the full request/response reference for both operations, see the [Board Export API reference](https://developer.monday.com/api-reference/docs/board-export-api-reference). For input objects, result types, and enums, see [Board export other types](https://developer.monday.com/api-reference/docs/board-export-other-types).

<br />
