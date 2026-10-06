---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Board Activity (Platform MCP)

Returns the activity log for a board, showing what changed, when, and by whom, over a configurable time range using the Platform MCP.

Use this tool to retrieve the audit trail of events on a monday.com board. Each activity entry records the event type (e.g. `create_pulse`, `update_column_value`, `create_group`), the affected entity, the user who performed the action, and a high-precision timestamp. The default time window is the last 30 days; you can narrow or widen this using `fromDate` and `toDate`.

By default, the raw before/after data payload for each event is omitted to keep responses compact. Set `includeData: true` only when you need to inspect exactly what changed in each event.

# Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>boardId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the board to retrieve activity logs for.</td>
    </tr>
    <tr>
      <td>fromDate</td>
      <td>`string`</td>
      <td>No</td>
      <td>Start of the activity window in ISO 8601 format (e.g. `2025-12-01T00:00:00Z`). Defaults to 30 days ago.</td>
    </tr>
    <tr>
      <td>toDate</td>
      <td>`string`</td>
      <td>No</td>
      <td>End of the activity window in ISO 8601 format. Defaults to the current time.</td>
    </tr>
    <tr>
      <td>includeData</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include the full before/after data payload for each event. Defaults to `false`. Can significantly increase response size.</td>
    </tr>
  </tbody>
</Table>

# Example

Retrieve activity on board `18392419286` for December 2025:

```json
{
  "boardId": 18392419286,
  "fromDate": "2025-12-01T00:00:00Z",
  "toDate": "2026-01-01T00:00:00Z"
}
```

The response returned 42 activity entries including `create_pulse`, `update_column_value`, `create_column`, `create_group`, and `board_workspace_id_changed` events, each with a user ID and a nanosecond-precision timestamp.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/activity-logs) to achieve the same result:

```graphql GraphQL
query {
  boards(ids: [18392419286]) {
    activity_logs(
      from: "2025-12-01T00:00:00Z"
      to: "2026-01-01T00:00:00Z"
    ) {
      created_at
      event
      entity
      user_id
      data
    }
  }
}
```

For full documentation, see [Activity Logs](https://developer.monday.com/api-reference/reference/activity-logs).
