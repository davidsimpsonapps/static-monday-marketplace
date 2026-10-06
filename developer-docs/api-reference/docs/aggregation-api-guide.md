---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Aggregating Board Data

Learn how to use the aggregate query to calculate summaries, group results, and replace complex item queries with a single API call

The `aggregate` query lets you calculate summary statistics across a monday.com board in a single API call. Instead of fetching all items, paginating through results, and computing totals in your code, you can ask the API to do it for you.

This guide walks you through the `aggregate` query from basic counting to advanced grouping and filtering. By the end, you'll be able to build dashboards, generate reports, and surface insights without ever downloading raw item data.

# Why use aggregate?

## The problem with raw item queries

Before `aggregate`, getting summary data from a board required multiple steps:

1. **Fetch items** using `items_page` (paginating if the board has more than 500 items)
2. **Handle rate limits** and complexity budgets across multiple pages
3. **Parse column values** from the API response format
4. **Compute the summary** (count, sum, average, etc.) in your application code

For a board with 1,000+ items, this might take 3+ API calls and thousands of complexity points.

## The aggregate advantage

With `aggregate`, those steps collapse into one:

|                      | Raw item queries                  | Aggregate           |
| :------------------- | :-------------------------------- | :------------------ |
| **API calls**        | 3+ (pagination)                   | 1                   |
| **Complexity cost**  | 5,500+ per page                   | \~110 total         |
| **Client-side code** | Parse values, accumulate, compute | Read the result     |
| **Latency**          | Multiple round trips              | Single round trip   |
| **Data transfer**    | Full item payloads                | Summary values only |

> 👍 **Real-world benchmark**
>
> On a board with 1,368 items, we measured: **aggregate** with 3 functions cost **110 complexity points**. A single `items_page` call for 500 items with 1 column cost **5,520 points** — and that's only the first of 3 pages needed. The full item scan would cost approximately **16,560 points**, making aggregate **\~150x cheaper**.

## Who benefits most

**Private app developers** building internal tools:

* Check team productivity: count completed items in the last 90 days
* Size your sales pipeline: total deal value grouped by stage
* Track project health: average completion time from a formula column

**Public app developers** shipping to the marketplace:

* Time tracking dashboards: show average tracked time per person
* Workload balancing: find the team member with the fewest assigned tasks
* AI-powered insights: send aggregated metrics to an LLM for analysis

# Getting started

## Prerequisites

* [API authentication token](https://developer.monday.com/api-reference/docs/authentication)
* A board ID (find it in the URL: `monday.com/boards/{board_id}`)
* Familiarity with the column IDs on your board (query `boards` → `columns` → `id`)

## Your first aggregate query

Let's count the items on a board:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      {
        type: FUNCTION,
        function: { function: COUNT_ITEMS },
        as: "total_items"
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

The response:

```json
{
  "data": {
    "aggregate": {
      "results": [
        {
          "entries": [
            {
              "alias": "total_items",
              "value": {
                "result": 1368
              }
            }
          ]
        }
      ]
    }
  }
}
```

**Key things to note:**

* `from` identifies the board by its ID with `type: TABLE`
* `select` is an array of what you want to calculate
* Each select element needs an `as` alias — this becomes the `alias` field in the response
* Results use the `AggregateBasicAggregationResult` fragment to return the numeric `result`

# Aggregation functions

## Functions that don't require a column

These functions operate on items themselves:

| Function         | What it returns                           |
| :--------------- | :---------------------------------------- |
| `COUNT_ITEMS`    | Total number of items                     |
| `COUNT_SUBITEMS` | Total number of subitems across all items |

## Functions that require a column

These functions need a `params` argument specifying which column to aggregate:

| Function         | What it returns                                     |
| :--------------- | :-------------------------------------------------- |
| `SUM`            | Sum of all numeric values                           |
| `AVERAGE`        | Mean of all numeric values                          |
| `MEDIAN`         | Median value                                        |
| `MIN`            | Minimum value (works with numbers and dates)        |
| `MAX`            | Maximum value (works with numbers and dates)        |
| `COUNT`          | Number of items with a non-null value in the column |
| `COUNT_DISTINCT` | Number of distinct values in the column             |

### Column params syntax

When using a column-based function, pass the column as a `params` element:

```graphql GraphQL
{
  type: FUNCTION,
  function: {
    function: SUM,
    params: [{
      type: COLUMN,
      column: { column_id: "numbers_col" },
      as: "numbers_col"
    }]
  },
  as: "total_value"
}
```

The `as` inside `params` should match the `column_id`. The outer `as` is your custom alias for the result.

## Running multiple functions at once

You can calculate several metrics in a single call by adding more elements to `select`:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      {
        type: FUNCTION,
        function: { function: SUM, params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }] },
        as: "total"
      },
      {
        type: FUNCTION,
        function: { function: AVERAGE, params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }] },
        as: "average"
      },
      {
        type: FUNCTION,
        function: { function: MIN, params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }] },
        as: "minimum"
      },
      {
        type: FUNCTION,
        function: { function: MAX, params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }] },
        as: "maximum"
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

## Supported column types

Not all column types work with all functions. Here's what's supported:

| Column Type       | COUNT | SUM | AVERAGE | MIN | MAX | MEDIAN |
| :---------------- | :---- | :-- | :------ | :-- | :-- | :----- |
| Numbers           | ✅     | ✅   | ✅       | ✅   | ✅   | ✅      |
| Formula (numeric) | ✅     | ✅   | ✅       | ✅   | ✅   | ✅      |
| Rating            | ✅     | ✅   | ✅       | ✅   | ✅   | ✅      |
| Date              | ✅     | —   | —       | ✅   | ✅   | —      |
| Status            | ✅     | —   | —       | —   | —   | —      |
| People            | ✅     | —   | —       | —   | —   | —      |
| Text              | ✅     | —   | —       | —   | —   | —      |
| Checkbox          | ✅     | —   | —       | —   | —   | —      |

> 📘 NOTE
>
> `COUNT` and `COUNT_DISTINCT` work on any column type. `COUNT` returns how many items have a non-null value. `COUNT_DISTINCT` counts unique values (works best on text and numbers columns).

# Filtering aggregations

You can aggregate a subset of items by adding a `query` argument with filter rules. The filter syntax matches [items\_page filtering](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery).

## Single filter

Count items with status "Done" (status label index 1):

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [{ type: FUNCTION, function: { function: COUNT_ITEMS }, as: "done_count" }],
    query: {
      rules: [{
        column_id: "status",
        compare_value: [1],
        operator: any_of
      }]
    }
  }) {
    results {
      entries {
        alias
        value { ... on AggregateBasicAggregationResult { result } }
      }
    }
  }
}
```

## Multiple filters

Combine filters to narrow down further. Get the count and average estimation for items that are both "Done" and "Critical" priority:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      {
        type: FUNCTION,
        function: { function: AVERAGE, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "avg_estimation"
      }
    ],
    query: {
      rules: [
        { column_id: "task_status", compare_value: [1], operator: any_of },
        { column_id: "task_priority", compare_value: [0], operator: any_of }
      ]
    }
  }) {
    results {
      entries {
        alias
        value { ... on AggregateBasicAggregationResult { result } }
      }
    }
  }
}
```

# Grouping with group\_by

The `group_by` argument splits aggregation results into categories. This is how you answer questions like "average deal size **per sales rep**" or "item count **per status**".

## Basic group by

To group results:

1. Add the column to `group_by` with a `limit` for how many groups to return
2. Add the same column to `select` with `type: COLUMN`
3. Query `AggregateGroupByResult` to get the group's value

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      { type: COLUMN, column: { column_id: "task_status" }, as: "task_status" }
    ],
    group_by: [{ column_id: "task_status", limit: 15 }]
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
          ... on AggregateGroupByResult { value }
        }
      }
    }
  }
}
```

Each result set in the response represents one group:

```json
{
  "data": {
    "aggregate": {
      "results": [
        {
          "entries": [
            { "alias": "count", "value": { "result": 792 } },
            { "alias": "task_status", "value": { "value": "#00c875" } }
          ]
        },
        {
          "entries": [
            { "alias": "count", "value": { "result": 89 } },
            { "alias": "task_status", "value": { "value": "#fdab3d" } }
          ]
        }
      ]
    }
  }
}
```

## Understanding group by values

The `value` field in `AggregateGroupByResult` returns the raw internal value, which varies by column type:

| Column Type  | Value Format   | Example          | How to resolve                                                     |
| :----------- | :------------- | :--------------- | :----------------------------------------------------------------- |
| **Status**   | Hex color code | `"#00c875"`      | Match against the column's `settings.labels` to get the label text |
| **People**   | Person ID      | `"person-12345"` | Query `users(ids: 12345)` to get the name                          |
| **Checkbox** | Boolean        | `true`           | Use directly                                                       |
| **Text**     | Plain string   | `"Category A"`   | Use directly                                                       |
| **Date**     | Epoch ms       | `1768435200000`  | Convert: `new Date(1768435200000)` → `2026-01-15`                  |
| **Numbers**  | Number         | `42`             | Use directly                                                       |

> 👍 Pro tip
>
> To map status hex codes to labels, query `boards(ids: BOARD_ID) { columns { id settings_str } }` and parse the `labels` array from the status column's settings. Each label has a `color` (hex index) and `label` (text).

## Multiple group by columns

You can group by multiple columns to create cross-tabulations:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      { type: COLUMN, column: { column_id: "task_status" }, as: "task_status" },
      { type: COLUMN, column: { column_id: "task_type" }, as: "task_type" }
    ],
    group_by: [
      { column_id: "task_status", limit: 5 },
      { column_id: "task_type", limit: 5 }
    ]
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
          ... on AggregateGroupByResult { value }
        }
      }
    }
  }
}
```

This returns one result set per unique combination of status × type.

## Combining group by with filters

You can filter items before grouping. For example, get the sum of story points by task type, but only for completed items:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      {
        type: FUNCTION,
        function: { function: SUM, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "total_sp"
      },
      { type: COLUMN, column: { column_id: "task_type" }, as: "task_type" }
    ],
    group_by: [{ column_id: "task_type", limit: 20 }],
    query: { rules: [{ column_id: "task_status", compare_value: [1], operator: any_of }] }
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
          ... on AggregateGroupByResult { value }
        }
      }
    }
  }
}
```

# Date grouping with DATE\_TRUNC

Raw date grouping creates one group per unique date, which is rarely useful. Use `DATE_TRUNC_*` functions to group dates into meaningful time periods.

## Monthly grouping example

Count items created per month:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      {
        type: FUNCTION,
        function: {
          function: DATE_TRUNC_MONTH,
          params: [{ type: COLUMN, column: { column_id: "date_col" }, as: "month" }]
        },
        as: "month"
      }
    ],
    group_by: [{ column_id: "month", limit: 12 }]
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
          ... on AggregateGroupByResult { value }
        }
      }
    }
  }
}
```

The `as` alias in the `DATE_TRUNC_MONTH` params (`"month"`) must match the `column_id` in `group_by`. Date values are returned as epoch timestamps in milliseconds.

Available date truncation functions:

| Function             | Groups by        |
| :------------------- | :--------------- |
| `DATE_TRUNC_DAY`     | Calendar day     |
| `DATE_TRUNC_WEEK`    | Calendar week    |
| `DATE_TRUNC_MONTH`   | Calendar month   |
| `DATE_TRUNC_QUARTER` | Calendar quarter |
| `DATE_TRUNC_YEAR`    | Calendar year    |

# Practical examples

## Example 1: Team workload dashboard

Show each team member's task count and total story points:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "tasks" },
      {
        type: FUNCTION,
        function: { function: SUM, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "total_sp"
      },
      { type: COLUMN, column: { column_id: "task_owner" }, as: "task_owner" }
    ],
    group_by: [{ column_id: "task_owner", limit: 50 }],
    query: { rules: [{ column_id: "task_status", compare_value: [0], operator: any_of }] }
  }) {
    results {
      entries {
        alias
        value {
          ... on AggregateBasicAggregationResult { result }
          ... on AggregateGroupByResult { value }
        }
      }
    }
  }
}
```

## Example 2: Board health check

Get a comprehensive overview of a board in one query:

```graphql GraphQL
{
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "total_items" },
      { type: FUNCTION, function: { function: COUNT_SUBITEMS }, as: "total_subitems" },
      {
        type: FUNCTION,
        function: { function: COUNT, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "items_with_estimates"
      },
      {
        type: FUNCTION,
        function: { function: SUM, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "total_sp"
      },
      {
        type: FUNCTION,
        function: { function: AVERAGE, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "avg_sp"
      },
      {
        type: FUNCTION,
        function: { function: MEDIAN, params: [{ type: COLUMN, column: { column_id: "task_estimation" }, as: "task_estimation" }] },
        as: "median_sp"
      }
    ]
  }) {
    results {
      entries {
        alias
        value { ... on AggregateBasicAggregationResult { result } }
      }
    }
  }
}
```

## Example 3: Checking complexity cost

Include `complexity` to verify the cost of your aggregate query:

```graphql GraphQL
{
  complexity { before after query }
  aggregate(query: {
    from: { type: TABLE, id: 1234567890 },
    select: [
      { type: FUNCTION, function: { function: COUNT_ITEMS }, as: "count" },
      {
        type: FUNCTION,
        function: { function: AVERAGE, params: [{ type: COLUMN, column: { column_id: "numbers" }, as: "numbers" }] },
        as: "average"
      }
    ]
  }) {
    results {
      entries {
        alias
        value { ... on AggregateBasicAggregationResult { result } }
      }
    }
  }
}
```

# Important notes

## Null handling

When a group has no non-null values for an aggregated column, the result returns `null` instead of `0`:

```json
{ "alias": "sum_sp", "value": { "value": null } }
```

Your application should handle this case.

## Result ordering

Entries within each result set are returned in **alphabetical order by alias**, not in the order specified in `select`. Design your aliases accordingly or sort client-side.

## The limit parameter

The `limit` on `AggregateQueryInput` controls the maximum number of result groups when using `group_by`. It has no effect on non-grouped aggregations (which always return a single result set). The `limit` on `AggregateGroupByElementInput` controls how many unique values each group-by column can produce.

## COUNT vs COUNT\_ITEMS vs COUNT\_DISTINCT

| Function         | Requires column | What it counts                                        |
| :--------------- | :-------------- | :---------------------------------------------------- |
| `COUNT_ITEMS`    | No              | Every item on the board (or matching the filter)      |
| `COUNT`          | Yes             | Items where the specified column has a non-null value |
| `COUNT_DISTINCT` | Yes             | Distinct non-null values in the column                |

# Next steps

* **[Aggregate reference](https://developer.monday.com/api-reference/reference/aggregate)** — Full schema and type documentation
* **[Aggregate other types](https://developer.monday.com/api-reference/reference/aggregate-other-types)** — Input and result type details
* **[Items page filtering](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery)** — Filter syntax used in the `query` argument
* **[Complexity](https://developer.monday.com/api-reference/reference/complexity)** — Understanding API complexity budgets

If you have questions, post them in the [monday developer community](https://community.monday.com/c/developers/8).
