---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Column Type Info (Platform MCP)

Returns the JSON settings schema or filter/aggregation guidelines for a specific monday.com column type using the Platform MCP.

Use this tool to look up type-specific information about a column before working with it. It has two modes controlled by the `fetchMode` parameter:

* **`schema`** (default): Returns the full JSON schema for the column's settings object. Use this before calling `create_column` to understand what configuration options are available and what values are valid.
* **`guidelines`**: Returns only the filter and aggregation guidelines for the column type. Use this before building `filters` for `get_board_items_page` or `aggregations` for `board_insights` — without making a GraphQL round-trip.

You can use this tool for any of the 40+ supported column types, including `status`, `date`, `numbers`, `people`, `text`, `dropdown`, `timeline`, `formula`, and more.

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
      <td>columnType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The column type to look up (e.g. `status`, `text`, `date`, `numbers`, `people`, `dropdown`, `timeline`).</td>
    </tr>
    <tr>
      <td>fetchMode</td>
      <td>`string`</td>
      <td>No</td>
      <td>Either `schema` (default) to get the full JSON settings schema, or `guidelines` to get only filter and aggregation rules.</td>
    </tr>
  </tbody>
</Table>

# Example

Get the settings schema for the `status` column type:

```json
{
  "columnType": "status",
  "fetchMode": "schema"
}
```

The response returned a JSON Schema object describing the `settings` property structure for a status column. It defined a `labels` array (max 40 items), where each label requires an `id` (one of 40 valid numeric values), a `label` string (max 30 chars), a `color` (name or numeric ID from the `StatusColumnColors` enum), an `index`, and optional `description`, `is_deactivated`, and `is_done` flags.

***

# Programmatic equivalent

Use the [GraphQL API column types reference](https://developer.monday.com/api-reference/reference/column-types-reference) for documentation on each column type's value format and settings structure:

```graphql GraphQL
query {
  boards(ids: [18392419286]) {
    columns {
      id
      type
      settings_str
    }
  }
}
```

For full documentation, see [Column Types Reference](https://developer.monday.com/api-reference/reference/column-types-reference).
