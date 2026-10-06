---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board Insights (Platform MCP)

Calculates aggregated summaries of board data by filtering, grouping, and applying aggregation functions to columns using the Platform MCP.

Use this tool to get statistical summaries of a board's data without fetching individual items. It supports grouping by column values, applying aggregation functions (count, sum, average, min, max, and more), filtering the item set, and sorting results. Common use cases include counting items per status, summing numbers by owner, or finding the average timeline duration across groups.

<Callout icon="🚧" theme="warn">
**Precondition:** Call `get_board_info` before using this tool to identify column IDs and types. For each column type in your aggregations or filters, call `get_column_type_info` with `fetchMode: "guidelines"` to understand valid aggregation functions and filter rules for that type.
</Callout>

When grouping, every column in `groupBy` must also appear in `aggregations` **without** a function (plain column reference). Human-readable labels for grouped columns appear under a `LABEL_<columnId>` field in the response.

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
      <td>The ID of the board to calculate insights for.</td>
    </tr>
    <tr>
      <td>aggregations</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of aggregation objects, each with a `columnId` and an optional `function`. Supported functions include `COUNT`, `COUNT_ITEMS`, `SUM`, `AVERAGE`, `MIN`, `MAX`, `MEDIAN`, `LABEL`, `DATE_TRUNC_MONTH`, `DATE_TRUNC_WEEK`, and more. Columns in `groupBy` must also appear here without a function.</td>
    </tr>
    <tr>
      <td>groupBy</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of column IDs to group results by. All groupBy columns must also be present in `aggregations` without a function.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of result rows to return. Maximum 1000. Defaults to `1000`.</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of column filter objects (same structure as `get_board_items_page` filters). Narrows the item set before aggregation.</td>
    </tr>
    <tr>
      <td>filtersOperator</td>
      <td>`string`</td>
      <td>No</td>
      <td>Logical operator for combining multiple filters: `and` (default) or `or`.</td>
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

Count items grouped by Status on board `18392419286`:

```json
{
  "boardId": 18392419286,
  "aggregations": [
    { "columnId": "status", "function": "COUNT_ITEMS" },
    { "columnId": "status" }
  ],
  "groupBy": ["status"]
}
```

The response returned 5 rows, one per status label, with item counts: `Working on it` (6), `Done` (4), `Needs Review` (2), `Stuck` (1), and blank/no-status (3). Each row included a `LABEL_status` field with the human-readable label and the hex color of that status.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/items) to achieve the same result. Board insights combine item filtering and aggregation, which in the API can be approximated with `items_by_column_values` and post-processing, or by fetching all items and aggregating client-side:

```graphql GraphQL
query {
  boards(ids: [18392419286]) {
    items_page(limit: 500) {
      items {
        id
        column_values(ids: ["status"]) {
          id
          text
          value
        }
      }
    }
  }
}
```

For full documentation, see [Items](https://developer.monday.com/api-reference/reference/items).
