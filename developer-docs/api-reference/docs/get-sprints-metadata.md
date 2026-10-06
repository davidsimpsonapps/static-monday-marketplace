---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Sprints Metadata (Platform MCP)

Returns a table of sprints from a monday Dev sprints board, including timeline, status, and completion data for each sprint using the Platform MCP.

Use this tool to retrieve metadata for sprints on a monday Dev sprints board. It returns a structured list of sprints with their IDs, names, timelines, completion status, start and end dates, activation status, and summary document references. Use the sprint IDs returned here as input to `get_sprint_summary`.

You need the **sprints board ID** to call this tool. Use `get_monday_dev_sprints_boards` to discover the correct board ID if you don't have it already.

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
      <td>sprintsBoardId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the monday Dev board containing the sprints. Use `get_monday_dev_sprints_boards` to find this ID.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of sprints to retrieve. Between 1 and 100. Defaults to 25.</td>
    </tr>
  </tbody>
</Table>

# Example

Retrieve the most recent 5 sprints from a sprint board:

```json
{
  "sprintsBoardId": 8222767867,
  "limit": 5
}
```

The test account returned 5 sprints. Each sprint object includes:

* `id` — the sprint item ID (e.g., `"11889118342"`)
* `name` — the sprint name (e.g., `"Sprint 40"`)
* `status` — one of `PLANNED`, `ACTIVE`, or `COMPLETED`
* `timeline` — planned `from` and `to` dates
* `start_date` / `end_date` — actual start and end dates (null for planned sprints)
* `is_completed` — boolean
* `document_object_id` — reference to a sprint summary document, if one exists

The test board had 40 total sprints spanning from January 2025 through July 2026.

***

# Programmatic equivalent

Sprint boards are standard monday.com boards. You can query sprint items using the [GraphQL API](https://developer.monday.com/api-reference/reference/items-page):

```graphql GraphQL
query {
  boards(ids: [8222767867]) {
    items_page(limit: 25) {
      items {
        id
        name
        column_values {
          id
          text
          value
        }
      }
    }
  }
}
```

The MCP tool maps column values (timeline, status, start/end dates) into a structured sprint object. For raw column data, use the `boards` query with `items_page`. See the [Items Page](https://developer.monday.com/api-reference/reference/items-page) reference for pagination and filtering options.
