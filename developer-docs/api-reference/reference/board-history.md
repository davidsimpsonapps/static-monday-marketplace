---
updatedAt: 2026-11-05T07:22:35.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board history

Learn how to read items and aggregated board data as they were at specific points in time using the platform API

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The board history queries let you read a board as it was at one or more past points in time. Use `items_history` to read item snapshots, and `aggregate_history` to read aggregated values (such as counts, sums, or averages) for those same points in time.

Both queries take a list of ISO timestamps in `at_timestamps` and return one result for each timestamp. When a date column is referenced, results are only available from when date column history began for that board, and earlier timestamps are rejected.

***

# Queries

## Get items history

* Returns an [`ItemsHistoryResultSet`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryresultset) object
* Retrieves historical item data from a board at specific points in time
* Must be queried directly at the root; can't be nested within another query
* Supports filtering, sorting, and cursor-based pagination

```graphql GraphQL
query {
  items_history(query: {
    from: { type: TABLE, id: 1234567890 },
    at_timestamps: ["2026-09-01T00:00:00Z"],
    select: [
      { type: COLUMN, column: { column_id: "status" }, as: "status" }
    ],
    limit: 50
  }) {
    results {
      item_id
      name
      timestamp
      entries {
        alias
        value {
          ... on ItemsHistoryColumnResult {
            value
          }
          ... on ItemsHistoryFunctionResult {
            value
          }
        }
      }
    }
    after
    earliest_available
    range_limit_reason
  }
}
```

### Arguments

| Argument | Type                                                                              | Description                                                                                                                                             |
| :------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| query    | [`ItemsHistoryQueryInput!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryqueryinput) | The history query. It sets the source board, the timestamps, the columns and functions to return, the item filters, the sort order, and the pagination. |

### Fields

You can use the following fields to specify what the query returns.

| Field                | Type                                                                                     | Description                                                                                                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| results              | [`[ItemsHistoryItem!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryitem)                  | The item snapshots at the requested timestamps.                                                                                                               |
| after                | `String`                                                                                 | The cursor for the next page. Null if there are no more results.                                                                                              |
| earliest\_available  | `String`                                                                                 | The ISO 8601 date of the earliest available data, when some requested timestamps preceded the queryable range. Null when the full requested range was served. |
| range\_limit\_reason | [`HistoricalRangeLimitReason`](https://developer.monday.com/api-reference/docs/board-history-other-types#historicalrangelimitreason) | Why the range was limited. Null when nothing was dropped.                                                                                                     |

### Pagination

Use `limit` to set the page size (the default is 50 and the maximum is 500). To get the next page, pass the `after` value from the previous response in the `after` field of the query input.

### Filter items

Use `query` to limit the items that are returned. Each rule compares a column to a value with an [`ItemsHistoryFilterOperator`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfilteroperator), and `operator` combines the rules and groups.

```graphql GraphQL
query {
  items_history(query: {
    from: { type: TABLE, id: 1234567890 },
    at_timestamps: ["2026-09-01T00:00:00Z", "2026-10-01T00:00:00Z"],
    query: {
      rules: [
        { column_id: "status", operator: ANY_OF, compare_value: [1] }
      ]
    },
    order_by: [{ column_id: "name", direction: ASC }]
  }) {
    results {
      item_id
      name
      timestamp
    }
  }
}
```

***

## Get aggregate history

* Returns an [`AggregateHistoryResultSet`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryresultset) object
* Retrieves aggregated board data at specific points in time
* Must be queried directly at the root; can't be nested within another query
* Supports grouping, filtering, and cross-board (union) queries

```graphql GraphQL
query {
  aggregate_history(query: {
    from: { type: TABLE, id: 1234567890 },
    at_timestamps: ["2026-09-01T00:00:00Z", "2026-10-01T00:00:00Z"],
    select: [
      {
        type: FUNCTION,
        function: { function: COUNT_ITEMS },
        as: "total_items"
      }
    ]
  }) {
    results {
      timestamp
      entries {
        alias
        value {
          ... on AggregateHistoryBasicAggregationResult {
            result
          }
        }
      }
    }
    earliest_available
    range_limit_reason
  }
}
```

### Arguments

| Argument | Type                                                                                      | Description                                                                                                                                |
| :------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| query    | [`AggregateHistoryQueryInput!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryqueryinput) | The aggregate history query. It sets the source board or boards, the timestamps, the values to return, the grouping, and the item filters. |

### Fields

You can use the following fields to specify what the query returns.

| Field                | Type                                                                                        | Description                                                                                                                                                   |
| :------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| results              | [`[AggregateHistoryDateResult!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorydateresult) | One result for each timestamp in `at_timestamps`.                                                                                                             |
| source\_boards       | [`[SourceBoardInfo!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#sourceboardinfo)                       | The boards that contributed to the merged results. Populated for union queries; empty for single-board queries.                                               |
| earliest\_available  | `String`                                                                                    | The ISO 8601 date of the earliest available data, when some requested timestamps preceded the queryable range. Null when the full requested range was served. |
| range\_limit\_reason | [`HistoricalRangeLimitReason`](https://developer.monday.com/api-reference/docs/board-history-other-types#historicalrangelimitreason)    | Why the range was limited. Null when nothing was dropped.                                                                                                     |

### Group results

Use `group_by` to split the results by a column. The group key is returned as an [`AggregateHistoryGroupByResult`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorygroupbyresult) entry. The default limit is 1000 groups.

```graphql GraphQL
query {
  aggregate_history(query: {
    from: { type: TABLE, id: 1234567890 },
    at_timestamps: ["2026-09-01T00:00:00Z"],
    group_by: [{ column_id: "status" }],
    select: [
      { type: COLUMN, column: { column_id: "status" }, as: "status" },
      {
        type: FUNCTION,
        function: { function: COUNT_ITEMS },
        as: "total_items"
      }
    ]
  }) {
    results {
      timestamp
      entries {
        alias
        value {
          ... on AggregateHistoryGroupByResult {
            value_string
          }
          ... on AggregateHistoryBasicAggregationResult {
            result
          }
        }
      }
    }
  }
}
```

### Query across boards

Set `from` to `{ type: UNION, union: { queries: [...] } }` to combine several boards. Each sub-query reads one board, and all sub-queries must produce matching `select` aliases. See [`AggregateHistoryUnionQueryInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryunionqueryinput) for the sub-query fields.
