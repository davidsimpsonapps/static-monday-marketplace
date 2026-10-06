---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Board Items (Platform MCP)

Retrieves items from a board with pagination, optional column values, filters, sorting, and sub-item support using the Platform MCP.

Use this tool to fetch items from a monday.com board. It supports cursor-based pagination, structured column filters, free-text search, sorting, and optional inclusion of column values, item descriptions, and sub-items. The response includes item IDs, names, URLs, timestamps, and—when `includeColumns` is true—the values for each column.

<Callout icon="🚧" theme="warn">
**Precondition:** Call `get_board_info` before using filters to get the correct column IDs, types, and status label values for that board. For view-based filtering (e.g. "show the Overdue view"), call `get_board_info` first to extract the view's filter object, then pass it as `filters`.
</Callout>

When `has_more` is `true` in the response, pass the `nextCursor` value as `cursor` to fetch the next page.

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
      <td>The ID of the board to retrieve items from.</td>
    </tr>
    <tr>
      <td>itemIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Fetch specific items by their IDs (maximum 100).</td>
    </tr>
    <tr>
      <td>searchTerm</td>
      <td>`string`</td>
      <td>No</td>
      <td>Free-text search term. Use when the user provides an approximate term rather than an exact column value. Prefer structured `filters` for exact matches.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of items to return per page. Range: 1–500. Defaults to `25`.</td>
    </tr>
    <tr>
      <td>cursor</td>
      <td>`string`</td>
      <td>No</td>
      <td>Pagination cursor from the previous response's `nextCursor` field.</td>
    </tr>
    <tr>
      <td>includeColumns</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include column values. Defaults to `false`. Only enable when you need column data — it significantly increases response size.</td>
    </tr>
    <tr>
      <td>includeItemDescription</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include the item's rich-text description (body/notes). Defaults to `false`.</td>
    </tr>
    <tr>
      <td>includeSubItems</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include sub-items for each item. Defaults to `false`.</td>
    </tr>
    <tr>
      <td>subItemLimit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of sub-items to return per item when `includeSubItems` is true. Range: 1–100. Defaults to `25`.</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of column filter objects. Each filter requires `columnId` and `compareValue`, with optional `operator` and `compareAttribute`. Call `get_column_type_info` with `fetchMode: "guidelines"` to understand valid filter values per column type.</td>
    </tr>
    <tr>
      <td>filtersOperator</td>
      <td>`string`</td>
      <td>No</td>
      <td>Logical operator for combining multiple filters. Either `and` (default) or `or`.</td>
    </tr>
    <tr>
      <td>columnIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Limit which columns are returned when `includeColumns` is true. Omit to return all columns.</td>
    </tr>
    <tr>
      <td>orderBy</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of sort objects with `columnId` and `direction` (`asc` or `desc`).</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch the first 5 items from board `18392419286` with column values:

```json
{
  "boardId": 18392419286,
  "limit": 5,
  "includeColumns": true
}
```

The response returned 5 items with names, URLs, creation timestamps, and column values (including `status`, `date`, `status_1`, and `files`). The `pagination` object showed `has_more: true` and provided a `nextCursor` for the next page.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/items-page) to achieve the same result:

```graphql GraphQL
query {
  boards(ids: [18392419286]) {
    items_page(limit: 5) {
      cursor
      items {
        id
        name
        url
        created_at
        updated_at
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

For full documentation, see [Items Page](https://developer.monday.com/api-reference/reference/items-page).
