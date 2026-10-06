---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create View (Platform MCP)

Creates a new board view (tab) with optional filters and sorting on a monday.com board using the Platform MCP.

Use this tool to create a new board view (tab) on a monday.com board. A view is a saved configuration — filters, sort order, and type-specific settings — that users can switch between on the board. The view type defaults to `TABLE`, the standard board view.

For table views where you need to configure column visibility, column order, or group-by, prefer the dedicated [create\_view\_table](https://developer.monday.com/api-reference/docs/create-view-table) tool, which exposes a strongly-typed `settings` field.

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
      <td>`string`</td>
      <td>Yes</td>
      <td>The board ID to create the view on.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>`ViewKind`</td>
      <td>No</td>
      <td>The type of board view to create. Defaults to <code>TABLE</code>. Use <code>TABLE</code> for standard board views.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>No</td>
      <td>The name of the view (e.g. "High Priority Items", "My Tasks").</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>`object`</td>
      <td>No</td>
      <td>Filter configuration. Contains <code>rules</code> (an array of <code>{ column_id, compare_value, operator }</code>) and an optional <code>operator</code> (logical operator between rules, defaults to <code>and</code>).</td>
    </tr>
    <tr>
      <td>sort</td>
      <td>`array`</td>
      <td>No</td>
      <td>Sort configuration. Array of <code>{ column_id, direction }</code> objects. <code>direction</code> defaults to <code>asc</code>.</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>`object`</td>
      <td>No</td>
      <td>Type-specific view settings as a JSON object. The shape varies by view type. For <code>TABLE</code> views, prefer <a href="doc:create-view-table">create_view_table</a>.</td>
    </tr>
  </tbody>
</Table>

**Filter rule operators:** `any_of`, `not_any_of`, `is_empty`, `is_not_empty`, `greater_than`, `lower_than`, `between`, `contains_text`, `not_contains_text` (defaults to `any_of`).

# Example

Create a table view that shows only items assigned to a specific person:

```json
{
  "boardId": "1234567890",
  "name": "My Tasks",
  "type": "TABLE",
  "filter": {
    "rules": [
      { "column_id": "people", "compare_value": ["person-12345"], "operator": "any_of" }
    ],
    "operator": "and"
  }
}
```

The tool returns a confirmation with the new view's name, ID, and type.

***

# Programmatic equivalent

This tool maps to the [`create_view`](https://developer.monday.com/api-reference/reference/board-views) mutation in the monday.com API. See the [board views reference](https://developer.monday.com/api-reference/reference/board-views) for full details.
