---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Show Table (Platform MCP UI)

Renders an interactive table visualization of a monday.com board in the chat interface, with optional column-based filtering using the Platform MCP.

<Callout icon="🚧" theme="warn">This is an internal UI component. It is called automatically by the Platform MCP server — do not call it directly.</Callout>

`show-table` renders a board as an interactive table in the chat interface, letting users see and interact with their board data without leaving the conversation. The MCP server invokes this tool automatically when a user asks to display, view, or visualize a board in tabular form.

You can optionally pass filter rules to narrow the displayed items. **If using filters, you must call `get_board_info` first** to retrieve the `boardContextToken` required for filtering to work correctly. After any update to an item, the server will automatically re-invoke `show-table` to refresh the view.

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
      <td>The ID of the board to display as a table.</td>
    </tr>
    <tr>
      <td>currentlySelectedItemIdForShowingUpdates</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the item whose updates should be expanded in the table view.</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of filter rules to apply. Each filter requires <code>columnId</code> and <code>compareValue</code>, plus an optional <code>operator</code> (defaults to <code>any_of</code>) and <code>compareAttribute</code>. Requires <code>get_board_info</code> to be called first.</td>
    </tr>
    <tr>
      <td>filtersOperator</td>
      <td>`string`</td>
      <td>No</td>
      <td>How multiple filters are combined. Either <code>"and"</code> (all filters must match) or <code>"or"</code> (any filter must match). Defaults to <code>"and"</code>.</td>
    </tr>
  </tbody>
</Table>

**Supported filter operators:** `any_of`, `not_any_of`, `is_empty`, `is_not_empty`, `greater_than`, `greater_than_or_equals`, `lower_than`, `lower_than_or_equal`, `between`, `contains_text`, `not_contains_text`, `contains_terms`, `starts_with`, `ends_with`, `within_the_next`, `within_the_last`

# Example

Display a board as a table:

```json
{
  "boardId": "12406666"
}
```

Display the same board with only items where the status column is "Done":

```json
{
  "boardId": "12406666",
  "filters": [
    {
      "columnId": "status",
      "compareValue": 1,
      "operator": "any_of"
    }
  ],
  "filtersOperator": "and"
}
```

***

# Programmatic equivalent

You can retrieve board data directly through the monday.com GraphQL API using the `boards` query with `items_page`:

```graphql
query {
  boards(ids: [12406666]) {
    name
    columns { id title type }
    items_page(limit: 50) {
      items {
        id
        name
        column_values { id text value }
      }
    }
  }
}
```

For full filtering options, see the [Items query reference](https://developer.monday.com/api-reference/reference/items) in the monday.com API docs.
