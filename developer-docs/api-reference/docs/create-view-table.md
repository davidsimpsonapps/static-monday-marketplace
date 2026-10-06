---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Table View (Platform MCP)

Creates a new table-type board view with filters, sort, tags, and table-specific settings (column visibility/order and group-by) using the Platform MCP.

Use this tool to create a new table-type board view with optional filters, sort, tags, and table-specific settings (column visibility/order and group-by). Use this instead of [create\_view](https://developer.monday.com/api-reference/docs/create-view) when you need to configure table-specific settings. For a simple table view, `create_view` also works.

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
      <td>The board ID to create the table view on.</td>
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
      <td>tags</td>
      <td>`array`</td>
      <td>No</td>
      <td>Tags to apply to the view.</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>`object`</td>
      <td>No</td>
      <td>Table-specific settings: <code>columns</code> (visibility/order) and <code>group_by</code>. See the settings reference below.</td>
    </tr>
  </tbody>
</Table>

**`settings.columns` fields:**

| Field                        | Type     | Description                                                               |
| ---------------------------- | -------- | ------------------------------------------------------------------------- |
| `column_properties`          | `array`  | Visibility config for main board columns — each `{ column_id, visible }`. |
| `subitems_column_properties` | `array`  | Visibility config for subitem columns — each `{ column_id, visible }`.    |
| `floating_columns_count`     | `number` | Number of floating (pinned) columns to display.                           |
| `column_order`               | `array`  | Ordered list of column IDs.                                               |

**`settings.group_by` fields:**

| Field             | Type      | Description                                                                                                              |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| `conditions`      | `array`   | Group-by conditions — each `{ columnId, config? }`, where `config.sortSettings` holds `{ direction (ASC/DESC), type? }`. |
| `hideEmptyGroups` | `boolean` | Whether to hide groups with no items.                                                                                    |

**Filter rule operators:** `any_of`, `not_any_of`, `is_empty`, `is_not_empty`, `greater_than`, `lower_than`, `between`, `contains_text`, `not_contains_text` (defaults to `any_of`).

# Example

Create a table view grouped by status, with the status column pinned visible:

```json
{
  "boardId": "1234567890",
  "name": "By Status",
  "settings": {
    "columns": {
      "column_properties": [
        { "column_id": "status", "visible": true }
      ],
      "column_order": ["name", "status", "date"]
    },
    "group_by": {
      "conditions": [{ "columnId": "status" }],
      "hideEmptyGroups": true
    }
  }
}
```

The tool returns a confirmation with the new table view's name, ID, and type.

***

# Programmatic equivalent

This tool maps to the [`create_view_table`](https://developer.monday.com/api-reference/reference/board-views) mutation in the monday.com API. See the [board views reference](https://developer.monday.com/api-reference/reference/board-views) for full details.
