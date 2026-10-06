---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Table View (Platform MCP)

Updates an existing table-type board view — name, filters, sort, tags, or table-specific settings (column visibility/order and group-by) using the Platform MCP.

Use this tool to update an existing table-type board view: change its name, filters, sort, tags, or table-specific settings (column visibility/order and group-by). Provide only the fields you want to change — omitted fields are left unchanged.

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
      <td>The ID of the table view to update.</td>
    </tr>
    <tr>
      <td>boardId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The board ID the view belongs to.</td>
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
      <td>tags</td>
      <td>`array`</td>
      <td>No</td>
      <td>Tags to apply to the view.</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>`object`</td>
      <td>No</td>
      <td>Table-specific settings: <code>columns</code> (visibility/order) and <code>group_by</code>. Same shape as <a href="doc:create-view-table">create_view_table</a>.</td>
    </tr>
  </tbody>
</Table>

**Filter rule operators:** `any_of`, `not_any_of`, `is_empty`, `is_not_empty`, `greater_than`, `lower_than`, `between`, `contains_text`, `not_contains_text` (defaults to `any_of`).

See [create\_view\_table](https://developer.monday.com/api-reference/docs/create-view-table) for the full structure of `settings.columns` and `settings.group_by`.

# Example

Update a table view to hide empty groups and reorder columns:

```json
{
  "viewId": "98765",
  "boardId": "1234567890",
  "settings": {
    "columns": {
      "column_order": ["name", "owner", "status", "date"]
    },
    "group_by": {
      "conditions": [{ "columnId": "status" }],
      "hideEmptyGroups": true
    }
  }
}
```

The tool returns a confirmation with the updated table view's name, ID, and type.

***

# Programmatic equivalent

This tool maps to the [`update_view_table`](https://developer.monday.com/api-reference/reference/board-views) mutation in the monday.com API. See the [board views reference](https://developer.monday.com/api-reference/reference/board-views) for full details.
