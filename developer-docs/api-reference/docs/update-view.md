---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update View (Platform MCP)

Updates an existing board view (tab) — its name, filters, or sort order — on a monday.com board using the Platform MCP.

Use this tool to update an existing board view (tab): change its name, filter rules, or sort order. Provide only the fields you want to change — omitted fields are left unchanged.

For table views where you need to update column visibility, column order, or group-by, prefer the dedicated [update\_view\_table](https://developer.monday.com/api-reference/docs/update-view-table) tool, which exposes a strongly-typed `settings` field.

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
      <td>viewId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the view to update.</td>
    </tr>
    <tr>
      <td>boardId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The board ID the view belongs to.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>`ViewKind`</td>
      <td>No</td>
      <td>The type of the board view being updated. Defaults to <code>TABLE</code>.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>No</td>
      <td>New name for the view (omit to leave unchanged).</td>
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
      <td>Type-specific view settings as a JSON object. The shape varies by view type. For <code>TABLE</code> views, prefer <a href="doc:update-view-table">update_view_table</a>.</td>
    </tr>
  </tbody>
</Table>

**Filter rule operators:** `any_of`, `not_any_of`, `is_empty`, `is_not_empty`, `greater_than`, `lower_than`, `between`, `contains_text`, `not_contains_text` (defaults to `any_of`).

# Example

Rename a view and change its filter to show only items with a specific status:

```json
{
  "viewId": "98765",
  "boardId": "1234567890",
  "name": "Active Work",
  "filter": {
    "rules": [
      { "column_id": "status", "compare_value": [1], "operator": "any_of" }
    ]
  }
}
```

The tool returns a confirmation with the updated view's name, ID, and type.

***

# Programmatic equivalent

This tool maps to the [`update_view`](https://developer.monday.com/api-reference/reference/board-views) mutation in the monday.com API. See the [board views reference](https://developer.monday.com/api-reference/reference/board-views) for full details.
