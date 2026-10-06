---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Aggregate

Learn how to read board data using grouped summaries and aggregation functions using the platform API

Aggregation summarizes large amounts of data into fewer, more meaningful values, helping you interpret work data at a glance.

It combines multiple rows into a smaller set of data points. For example, a marketing director with a monday.com board of campaigns can use aggregation to find the average campaign cost across the board.

Aggregation functions define how data is calculated (e.g., `AVERAGE` for averages, `COUNT_ITEMS` for totals). You can also apply filters to focus on specific subsets (e.g., campaigns launched in the last 6 months) or use grouping to summarize items by a shared column (e.g., average cost per marketing manager).

<Callout icon="👍" theme="okay">
  **Performance benefit:** Aggregate queries use significantly less [complexity](https://developer.monday.com/api-reference/reference/complexity) than equivalent item queries. In testing, an aggregate query on a 1,368-item board cost **110 complexity points** compared to **5,520+ points** for fetching the same data via `items_page`. See the [aggregation guide](https://developer.monday.com/api-reference/docs/aggregation-api-guide) for details.
</Callout>

# Queries

## Get aggregate

* Returns an array of aggregated results; returned values are pre-processed (no client-side data handling needed)
* Must be queried directly at the root; can't be nested within another query

### Basic example

Count items and calculate the average of a numbers column:

```graphql GraphQL
query {
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      {
        type: FUNCTION,
        function: { function: COUNT_ITEMS },
        as: "total_items"
      },
      {
        type: FUNCTION,
        function: {
          function: AVERAGE,
          params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }]
        },
        as: "avg_value"
      }
    ]
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
        }
      }
    }
  }
}
```

### Group by example

The following example returns the sum of story points per person, filtering to include only items where the status column is set to "Done".

```graphql GraphQL
query {
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    group_by: [{ column_id: "task_owner", limit: 10 }],
    query: {
      rules: [{
        operator: any_of,
        column_id: "status",
        compare_value: [1]
      }]
    },
    select: [
      {
        type: FUNCTION,
        function: {
          function: SUM,
          params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }]
        },
        as: "sum"
      },
      {
        type: COLUMN,
        column: { column_id: "task_owner" },
        as: "task_owner"
      }
    ]
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateGroupByResult { value }
          ... on AggregateBasicAggregationResult { result }
        }
      }
    }
  }
}
```

<Callout icon="📘" theme="info">
  **Group by value formats:** The `value` field in `AggregateGroupByResult` returns raw values whose format depends on the column type. Status columns return hex color codes (e.g., `"#00c875"`), people columns return IDs (e.g., `"person-12345"`), date columns return epoch timestamps in milliseconds, and checkbox columns return booleans. See the [aggregation guide](https://developer.monday.com/api-reference/docs/aggregation-api-guide#understanding-group-by-values) for a full mapping.
</Callout>

### Arguments

| Argument | Type                                                                                                                     | Description                                                                                             |
| :------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| query    | [`AggregateQueryInput!`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregatequeryinput) | The aggregation query to execute. Defines the data source, groupings, filters, and fields to aggregate. |

### Fields

| Field   | Type                                                                                                                     | Description                         |
| :------ | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| results | [`[AggregateResultSet!]`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateresultset) | The result of the aggregated query. |

# Supported functions

## Aggregation functions

These functions reduce a set of values to a single result.

| Function         | Description                                   | Requires column | Example use case                 |
| :--------------- | :-------------------------------------------- | :-------------- | :------------------------------- |
| `COUNT_ITEMS`    | Counts total items                            | No              | Total tasks on a board           |
| `COUNT_SUBITEMS` | Counts total subitems                         | No              | Total subtasks across items      |
| `COUNT`          | Counts items with non-null values in a column | Yes             | How many items have estimates    |
| `COUNT_DISTINCT` | Counts distinct values in a column            | Yes             | Number of unique text categories |
| `SUM`            | Sums numeric values                           | Yes             | Total story points               |
| `AVERAGE`        | Calculates the mean                           | Yes             | Average deal size                |
| `MEDIAN`         | Finds the median value                        | Yes             | Median completion time           |
| `MIN`            | Finds the minimum value                       | Yes             | Earliest date, lowest score      |
| `MAX`            | Finds the maximum value                       | Yes             | Latest date, highest score       |

## Transformative functions

These functions transform column values for use in `group_by` operations. The `as` alias of the transformative function must match the `column_id` in the `group_by` array.

| Function             | Description                | Example use case          |
| :------------------- | :------------------------- | :------------------------ |
| `DATE_TRUNC_DAY`     | Truncates dates to day     | Group items by day        |
| `DATE_TRUNC_WEEK`    | Truncates dates to week    | Weekly item counts        |
| `DATE_TRUNC_MONTH`   | Truncates dates to month   | Monthly summaries         |
| `DATE_TRUNC_QUARTER` | Truncates dates to quarter | Quarterly reports         |
| `DATE_TRUNC_YEAR`    | Truncates dates to year    | Year-over-year comparison |

# Use cases

* **Dynamic query generation:** Turn user input into structured aggregation queries for dashboards, charts, and summaries.
* **On-demand insights:** Give teams instant visibility into workload, activity, or bottlenecks through automated queries.
* **Custom reporting via API:** Build third-party reports and visualizations without client-side aggregation.
* **Self-serve intelligence:** Enable automations and internal tools to access grouped metrics programmatically.
* **Complexity optimization:** Replace multi-page item queries with a single aggregate call, reducing API complexity costs by 50-150x.
