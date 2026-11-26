---
updatedAt: 2026-11-05T07:22:35.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about the other types supported by the items history and aggregate history queries

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The monday.com [board history](https://developer.monday.com/api-reference/docs/board-history) API lets you read the state of a board's items and aggregated board data as they were at specific points in time.

The types below are used by the `items_history` and `aggregate_history` queries and are not independently queryable.

# Items history types

## ItemsHistoryQueryInput

Input for querying historical item data from a board at a specific date.

| Field          | Type                                                                                                | Description                                                                                    |
| :------------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| from           | [`ItemsHistoryFromInput!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfrominput)                     | The data source for the query (board with TABLE type).                                         |
| at\_timestamps | `[String!]!`                                                                                        | Array of ISO timestamp/date strings to retrieve historical snapshots for.                      |
| select         | [`[ItemsHistorySelectElementInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryselectelementinput) | Columns and functions to include in the results. If omitted, all tracked columns are returned. |
| query          | [`ItemsHistoryItemsQueryInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryitemsqueryinput)          | Filters for items. Without filters, all items are included.                                    |
| order\_by      | [`[ItemsHistoryOrderByInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryorderbyinput)             | Sort configuration. Defaults to ordering by item ID.                                           |
| limit          | `Int`                                                                                               | Maximum number of items to return. Default: 50, max: 500.                                      |
| after          | `String`                                                                                            | Cursor for forward pagination. Returns items after this cursor position.                       |

## ItemsHistoryResultSet

The complete result set from an items\_history query.

| Field                | Type                                                                                     | Description                                                                                                                                                                                  |
| :------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| results              | [`[ItemsHistoryItem!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryitem)                  | Array of item snapshots at the requested timestamp.                                                                                                                                          |
| after                | `String`                                                                                 | Cursor for the next page. Null if there are no more results.                                                                                                                                 |
| earliest\_available  | `String`                                                                                 | When partial results are returned (some requested timestamps preceded the queryable range), the ISO 8601 date of the earliest available data. Null when the full requested range was served. |
| range\_limit\_reason | [`HistoricalRangeLimitReason`](https://developer.monday.com/api-reference/docs/board-history-other-types#historicalrangelimitreason) | Why the range was limited. Set alongside earliest\_available; null when nothing was dropped.                                                                                                 |

## ItemsHistoryColumnResult

The raw value of a column for a historical item.

| Field | Type   | Description                                  |
| :---- | :----- | :------------------------------------------- |
| value | `JSON` | The raw column value at the given timestamp. |

## ItemsHistoryFilterGroupInput

A group of filter rules that can be combined with AND/OR logic. Supports nesting.

| Field    | Type                                                                                            | Description                                              |
| :------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| operator | [`ItemsHistoryQueryOperator`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryqueryoperator)          | The logical operator to combine rules within this group. |
| rules    | [`[ItemsHistoryFilterRuleInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfilterruleinput)   | Filter rules in this group.                              |
| groups   | [`[ItemsHistoryFilterGroupInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfiltergroupinput) | Nested filter groups for complex logic.                  |

## ItemsHistoryFilterOperator

Comparison operators for filtering items in items history queries.

| Value                    | Description                                            |
| :----------------------- | :----------------------------------------------------- |
| `ANY_OF`                 | Match any of the specified values (OR).                |
| `NOT_ANY_OF`             | Match none of the specified values.                    |
| `GREATER_THAN`           | Value is greater than the specified value.             |
| `GREATER_THAN_OR_EQUALS` | Value is greater than or equal to the specified value. |
| `LOWER_THAN`             | Value is less than the specified value.                |
| `LOWER_THAN_OR_EQUAL`    | Value is less than or equal to the specified value.    |
| `STARTS_WITH`            | Text starts with the specified substring.              |
| `ENDS_WITH`              | Text ends with the specified substring.                |
| `IS_EMPTY`               | Value is empty or null.                                |
| `IS_NOT_EMPTY`           | Value is not empty or null.                            |

## ItemsHistoryFilterRuleInput

A single filter rule for matching items based on column values.

| Field              | Type                                                                                      | Description                                                                                                                                                                                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column\_id         | `ID!`                                                                                     | The unique identifier of the column to filter by.                                                                                                                                                                                                                      |
| operator           | [`ItemsHistoryFilterOperator!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfilteroperator) | The comparison operator to use.                                                                                                                                                                                                                                        |
| compare\_value     | `JSON`                                                                                    | The value(s) to compare against. Can be a string, number, boolean, or array.                                                                                                                                                                                           |
| compare\_attribute | `String`                                                                                  | For columns whose value has multiple comparable parts (such as `timeline` columns with a start and end date), indicates which part to compare. For example, set `"date"` to compare against the timeline date. Leave unset for columns with a single comparable value. |

## ItemsHistoryFromElement

The source type for the items history query.

| Value   | Description                                                        |
| :------ | :----------------------------------------------------------------- |
| `TABLE` | Query historical snapshots of board/table data at a specific date. |

## ItemsHistoryFromInput

The source table and its ID for the items history query.

| Field | Type                                                                                | Description                                            |
| :---- | :---------------------------------------------------------------------------------- | :----------------------------------------------------- |
| type  | [`ItemsHistoryFromElement!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfromelement) | The source type. Must be TABLE for historical queries. |
| id    | `ID!`                                                                               | The unique identifier of the source board.             |

## ItemsHistoryFunction

The function to apply to a column value.

| Value            | Description                              |
| :--------------- | :--------------------------------------- |
| `AVERAGE`        | Calculate the average of numeric values. |
| `COLOR`          | Get the hex color value.                 |
| `COUNT`          | Count all values.                        |
| `COUNT_DISTINCT` | Count distinct values.                   |
| `COUNT_ITEMS`    | Count items.                             |
| `FIRST`          | Get the first value.                     |
| `ID`             | Get the ID/index value.                  |
| `IS_DONE`        | Check if the status is a done state.     |
| `LABEL`          | Get the label text.                      |
| `LENGTH`         | Get the length of a value.               |
| `LOWER`          | Convert text to lowercase.               |
| `MAX`            | Get the maximum value.                   |
| `MEDIAN`         | Calculate the median.                    |
| `MIN`            | Get the minimum value.                   |
| `SUM`            | Calculate the sum of numeric values.     |
| `TRIM`           | Trim whitespace from a text value.       |
| `UPPER`          | Convert text to uppercase.               |

## ItemsHistoryFunctionResult

The result of a function applied to a column value (e.g. SUM, LABEL, COLOR).

| Field | Type   | Description                            |
| :---- | :----- | :------------------------------------- |
| value | `JSON` | The computed result from the function. |

## ItemsHistoryItem

A historical snapshot of an item at a specific timestamp.

| Field     | Type                                                                                  | Description                                                                    |
| :-------- | :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| item\_id  | `ID`                                                                                  | The unique identifier of the item.                                             |
| name      | `String`                                                                              | The item's name at the given timestamp.                                        |
| timestamp | `String`                                                                              | The timestamp this snapshot corresponds to (from the provided at\_timestamps). |
| entries   | [`[ItemsHistoryResultEntry!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryresultentry) | The selected field values for this item at the given timestamp.                |

## ItemsHistoryItemsQueryInput

Filter configuration for selecting which items to include in the items history results.

| Field    | Type                                                                                            | Description                                                                 |
| :------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| operator | [`ItemsHistoryQueryOperator`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryqueryoperator)          | The logical operator to combine top-level rules and groups.                 |
| rules    | [`[ItemsHistoryFilterRuleInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfilterruleinput)   | Filter rules to apply.                                                      |
| groups   | [`[ItemsHistoryFilterGroupInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfiltergroupinput) | Nested filter groups for complex logic.                                     |
| ids      | `[ID!]`                                                                                         | Specific item IDs to include. If provided, only these items are considered. |

## ItemsHistoryOrderByInput

Configuration for sorting items history results by a column.

| Field      | Type                                                                                   | Description                                     |
| :--------- | :------------------------------------------------------------------------------------- | :---------------------------------------------- |
| column\_id | `ID!`                                                                                  | The unique identifier of the column to sort by. |
| direction  | [`ItemsHistorySortDirection`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistorysortdirection) | The sort direction. Default: ASC.               |

## ItemsHistoryQueryOperator

Logical operators for combining filter rules.

| Value | Description                       |
| :---- | :-------------------------------- |
| `AND` | All rules must match (AND logic). |
| `OR`  | Any rule can match (OR logic).    |

## ItemsHistoryResultEntry

A single selected field for a historical item, identified by its alias.

| Field | Type                                                                               | Description                                                                 |
| :---- | :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| alias | `String`                                                                           | The alias for this field, as defined by the `as` field in the select input. |
| value | [`ItemsHistoryResultValue`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryresultvalue) | The value for this field.                                                   |

## ItemsHistoryResultValue

The value of a result entry. Either a raw column value or a function result.

Possible types: [`ItemsHistoryFunctionResult`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfunctionresult), [`ItemsHistoryColumnResult`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistorycolumnresult)

## ItemsHistorySelectColumnInput

Specifies a column to include in the items history results.

| Field      | Type  | Description                                     |
| :--------- | :---- | :---------------------------------------------- |
| column\_id | `ID!` | The unique identifier of the column to include. |

## ItemsHistorySelectElementInput

A select element: either a raw column (COLUMN) or a function applied to column(s) (FUNCTION). Use the `as` alias as the column\_id in the response.

| Field    | Type                                                                                               | Description                                                         |
| :------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| type     | [`ItemsHistorySelectKind!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryselectkind)                  | The type of selection.                                              |
| as       | `String!`                                                                                          | The alias for this element. Used as the column\_id in the response. |
| column   | [`ItemsHistorySelectColumnInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryselectcolumninput)     | The column to select. Required when type is COLUMN.                 |
| function | [`ItemsHistorySelectFunctionInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryselectfunctioninput) | The function to apply. Required when type is FUNCTION.              |

## ItemsHistorySelectFunctionInput

Specifies a function to apply to column value(s).

| Field    | Type                                                                                                | Description                                                      |
| :------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| function | [`ItemsHistoryFunction!`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryfunction)                       | The function to apply.                                           |
| params   | [`[ItemsHistorySelectElementInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#itemshistoryselectelementinput) | Parameters passed to the function (columns or nested functions). |

## ItemsHistorySelectKind

Whether this select element is a raw column or a function.

| Value      | Description                          |
| :--------- | :----------------------------------- |
| `COLUMN`   | Select a raw column value.           |
| `FUNCTION` | Apply a function to column value(s). |

## ItemsHistorySortDirection

Sort direction for ordering items history results.

| Value  | Description                          |
| :----- | :----------------------------------- |
| `ASC`  | Sort in ascending order (A-Z, 0-9).  |
| `DESC` | Sort in descending order (Z-A, 9-0). |

# Aggregate history types

## AggregateHistoryQueryInput

Input for querying historical aggregated data from a board at specific dates.

| Field          | Type                                                                                               | Description                                                                      |
| :------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| from           | [`AggregateHistoryFromInput!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfrominput)            | The data source for the aggregation (board with TABLE type).                     |
| at\_timestamps | `[String!]!`                                                                                       | Array of ISO timestamp/date strings to retrieve historical snapshots for.        |
| group\_by      | [`[AggregateHistoryGroupByInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorygroupbyinput)    | Columns to group results by.                                                     |
| query          | [`AggregateHistoryItemsQueryInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryitemsqueryinput) | Filters for the items being aggregated. Without filters, all items are included. |
| select         | [`[AggregateHistorySelectInput!]!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectinput)     | The fields or functions to include in the results.                               |
| limit          | `Int`                                                                                              | Maximum number of results to return. Default: 1000.                              |

## AggregateHistoryResultSet

The complete result set from an aggregate\_history query.

| Field                | Type                                                                                        | Description                                                                                                                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| results              | [`[AggregateHistoryDateResult!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorydateresult) | Array of results, one for each date specified in at\_timestamps.                                                                                                                             |
| source\_boards       | [`[SourceBoardInfo!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#sourceboardinfo)                       | Boards that contributed to the merged results. Populated for union queries; empty for single-board TABLE queries.                                                                            |
| earliest\_available  | `String`                                                                                    | When partial results are returned (some requested timestamps preceded the queryable range), the ISO 8601 date of the earliest available data. Null when the full requested range was served. |
| range\_limit\_reason | [`HistoricalRangeLimitReason`](https://developer.monday.com/api-reference/docs/board-history-other-types#historicalrangelimitreason)    | Why the range was limited. Set alongside earliest\_available; null when nothing was dropped.                                                                                                 |

## AggregateHistoryBasicAggregationResult

The result of an aggregation function.

| Field  | Type    | Description                                       |
| :----- | :------ | :------------------------------------------------ |
| result | `Float` | The numeric result from the aggregation function. |

## AggregateHistoryDateResult

Aggregation results for a specific historical date.

| Field     | Type                                                                                          | Description                                                                      |
| :-------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| timestamp | `String`                                                                                      | The historical snapshot timestamp, echoing the value supplied in at\_timestamps. |
| entries   | [`[AggregateHistoryResultEntry!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryresultentry) | The aggregation result entries for this date.                                    |

## AggregateHistoryFilterGroupInput

A group of filter rules that can be combined with AND/OR logic. Supports nesting.

| Field    | Type                                                                                                    | Description                                              |
| :------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- |
| operator | [`AggregateHistoryQueryOperator`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryqueryoperator)          | The logical operator to combine rules within this group. |
| rules    | [`[AggregateHistoryFilterRuleInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfilterruleinput)   | Filter rules in this group.                              |
| groups   | [`[AggregateHistoryFilterGroupInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfiltergroupinput) | Nested filter groups for complex logic.                  |

## AggregateHistoryFilterOperator

Comparison operators for filtering items in aggregate queries.

| Value                    | Description                                            |
| :----------------------- | :----------------------------------------------------- |
| `ANY_OF`                 | Match any of the specified values (OR).                |
| `NOT_ANY_OF`             | Match none of the specified values.                    |
| `GREATER_THAN`           | Value is greater than the specified value.             |
| `GREATER_THAN_OR_EQUALS` | Value is greater than or equal to the specified value. |
| `LOWER_THAN`             | Value is less than the specified value.                |
| `LOWER_THAN_OR_EQUAL`    | Value is less than or equal to the specified value.    |
| `STARTS_WITH`            | Text starts with the specified substring.              |
| `ENDS_WITH`              | Text ends with the specified substring.                |
| `IS_EMPTY`               | Value is empty or null.                                |
| `IS_NOT_EMPTY`           | Value is not empty or null.                            |

## AggregateHistoryFilterRuleInput

A single filter rule for matching items based on column values.

| Field              | Type                                                                                              | Description                                                                                                                                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column\_id         | `String!`                                                                                         | The unique identifier of the column to filter by.                                                                                                                                                                                                                      |
| operator           | [`AggregateHistoryFilterOperator!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfilteroperator) | The comparison operator to use.                                                                                                                                                                                                                                        |
| compare\_value     | `JSON`                                                                                            | The value(s) to compare against. Can be a string, number, boolean, or array.                                                                                                                                                                                           |
| compare\_attribute | `String`                                                                                          | For columns whose value has multiple comparable parts (such as `timeline` columns with a start and end date), indicates which part to compare. For example, set `"date"` to compare against the timeline date. Leave unset for columns with a single comparable value. |

## AggregateHistoryFromElement

The source type for the aggregate history query.

| Value   | Description                                                                |
| :------ | :------------------------------------------------------------------------- |
| `TABLE` | Query historical snapshots of board/table data at specific dates.          |
| `UNION` | Query historical snapshots across multiple boards via unified sub-queries. |

## AggregateHistoryFromInput

The source for the aggregate history query (single board or union of boards).

| Field | Type                                                                                        | Description                                                               |
| :---- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ |
| type  | [`AggregateHistoryFromElement!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfromelement) | The source type: TABLE for a single board, UNION for cross-board queries. |
| id    | `ID`                                                                                        | The board ID. Required when type is TABLE.                                |
| union | [`AggregateHistoryUnionInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryunioninput)    | Union sub-queries. Required when type is UNION.                           |

## AggregateHistoryFunction

The aggregation function to apply.

| Value                | Description                                       |
| :------------------- | :------------------------------------------------ |
| `AVERAGE`            | Calculate the average of numeric values.          |
| `COLOR`              | Get the color value.                              |
| `COUNT`              | Count all values.                                 |
| `COUNT_DISTINCT`     | Count distinct values.                            |
| `COUNT_ITEMS`        | Count items.                                      |
| `FIRST`              | Get the first value.                              |
| `ID`                 | Get the ID.                                       |
| `IS_DONE`            | Check if done/completed.                          |
| `LABEL`              | Get the label value.                              |
| `LENGTH`             | Get the length of a value.                        |
| `LOWER`              | Convert to lowercase.                             |
| `MAX`                | Get the maximum value.                            |
| `MEDIAN`             | Calculate the median.                             |
| `MIN`                | Get the minimum value.                            |
| `SUM`                | Calculate the sum of numeric values.              |
| `TRIM`               | Trim whitespace from value.                       |
| `UPPER`              | Convert to uppercase.                             |
| `DATE_TRUNC_DAY`     | Truncate a date or datetime value to the day.     |
| `DATE_TRUNC_WEEK`    | Truncate a date or datetime value to the week.    |
| `DATE_TRUNC_MONTH`   | Truncate a date or datetime value to the month.   |
| `DATE_TRUNC_QUARTER` | Truncate a date or datetime value to the quarter. |
| `DATE_TRUNC_YEAR`    | Truncate a date or datetime value to the year.    |

## AggregateHistoryGroupByInput

Configuration for grouping aggregate results by a column.

| Field      | Type      | Description                                              |
| :--------- | :-------- | :------------------------------------------------------- |
| column\_id | `String!` | The unique identifier of the column to group results by. |
| limit      | `Int`     | The maximum number of groups to return. Default: 1000.   |

## AggregateHistoryGroupByResult

The group-by key value from the aggregation.

| Field          | Type      | Description                                      |
| :------------- | :-------- | :----------------------------------------------- |
| value\_string  | `String`  | The string representation of the group-by value. |
| value\_int     | `Int`     | The group-by value for whole numbers.            |
| value\_float   | `Float`   | The group-by value for decimal numbers.          |
| value\_boolean | `Boolean` | The group-by value for booleans.                 |

## AggregateHistoryItemsQueryInput

Filter configuration for selecting which items to include in the aggregation.

| Field     | Type                                                                                                    | Description                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------- |
| operator  | [`AggregateHistoryQueryOperator`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryqueryoperator)          | The logical operator to combine top-level rules and groups.                 |
| rules     | [`[AggregateHistoryFilterRuleInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfilterruleinput)   | Filter rules to apply.                                                      |
| groups    | [`[AggregateHistoryFilterGroupInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfiltergroupinput) | Nested filter groups for complex logic.                                     |
| ids       | `[ID!]`                                                                                                 | Specific item IDs to include. If provided, only these items are considered. |
| order\_by | [`[AggregateHistoryOrderByInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryorderbyinput)         | Configuration for ordering results before aggregation.                      |

## AggregateHistoryOrderByInput

Configuration for sorting query results by a column.

| Field      | Type                                                                                           | Description                                     |
| :--------- | :--------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| column\_id | `String!`                                                                                      | The unique identifier of the column to sort by. |
| direction  | [`AggregateHistorySortDirection`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorysortdirection) | The sort direction. Default: ASC.               |

## AggregateHistoryQueryOperator

Logical operators for combining filter rules.

| Value | Description                       |
| :---- | :-------------------------------- |
| `AND` | All rules must match (AND logic). |
| `OR`  | Any rule can match (OR logic).    |

## AggregateHistoryResultEntry

A single field result from the aggregation, containing the alias and value.

| Field | Type                                                                                       | Description                                                               |
| :---- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| alias | `String`                                                                                   | The name of the field, as defined using the as field in the select input. |
| value | [`AggregateHistoryResultValue`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryresultvalue) | The value for this field. Can be an aggregation result or a group-by key. |

## AggregateHistoryResultValue

The value of an aggregate result entry. Can be an aggregation result or a group-by key.

Possible types: [`AggregateHistoryBasicAggregationResult`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorybasicaggregationresult), [`AggregateHistoryGroupByResult`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorygroupbyresult)

## AggregateHistorySelectColumnInput

Specifies a column to select in the aggregation.

| Field      | Type      | Description                          |
| :--------- | :-------- | :----------------------------------- |
| column\_id | `String!` | The unique identifier of the column. |

## AggregateHistorySelectFunctionInput

Specifies an aggregation function and its parameters.

| Field    | Type                                                                                          | Description                                                                   |
| :------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| function | [`AggregateHistoryFunction!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryfunction)         | The aggregation function to apply.                                            |
| params   | [`[AggregateHistorySelectInput!]`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectinput) | Parameters to pass to the function (can include columns or nested functions). |

## AggregateHistorySelectInput

Specifies a field or function to include in the aggregation results. For union queries, sub-queries may use any function; top-level select is restricted to mergeable functions at validation time.

| Field    | Type                                                                                                       | Description                                                                        |
| :------- | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| type     | [`AggregateHistorySelectKind!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectkind)                  | The type of selection: COLUMN for direct column values, FUNCTION for aggregations. |
| as       | `String!`                                                                                                  | The alias for this field in the result set.                                        |
| column   | [`AggregateHistorySelectColumnInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectcolumninput)     | The column to select. Required when type is COLUMN.                                |
| function | [`AggregateHistorySelectFunctionInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectfunctioninput) | The function to apply. Required when type is FUNCTION.                             |

## AggregateHistorySelectKind

The type of element to select in the aggregation.

| Value      | Description                                 |
| :--------- | :------------------------------------------ |
| `COLUMN`   | Select a column value directly.             |
| `FUNCTION` | Apply an aggregation function to column(s). |

## AggregateHistorySortDirection

Sort direction for ordering results.

| Value  | Description                          |
| :----- | :----------------------------------- |
| `ASC`  | Sort in ascending order (A-Z, 0-9).  |
| `DESC` | Sort in descending order (Z-A, 9-0). |

## AggregateHistoryTableFromElement

Table source type for union sub-queries.

| Value   | Description                |
| :------ | :------------------------- |
| `TABLE` | Single board table source. |

## AggregateHistoryTableFromInput

A single-board table source for union sub-queries.

| Field | Type                                                                                                  | Description                                |
| :---- | :---------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| type  | [`AggregateHistoryTableFromElement!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorytablefromelement) | Must be TABLE.                             |
| id    | `ID!`                                                                                                 | The unique identifier of the source board. |

## AggregateHistoryUnionInput

Union of per-board sub-queries for cross-board aggregate history.

| Field   | Type                                                                                                   | Description                                                                    |
| :------ | :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| queries | [`[AggregateHistoryUnionQueryInput!]!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryunionqueryinput) | One sub-query per board. All sub-queries must produce matching select aliases. |

## AggregateHistoryUnionQueryInput

A per-board sub-query within a union aggregate history query.

| Field  | Type                                                                                               | Description                                                                                                  |
| :----- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| from   | [`AggregateHistoryTableFromInput!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistorytablefrominput)  | The board source. Must be type TABLE.                                                                        |
| select | [`[AggregateHistorySelectInput!]!`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryselectinput)     | Per-board select elements with unified aliases across sub-queries. Supports the full aggregate function set. |
| query  | [`AggregateHistoryItemsQueryInput`](https://developer.monday.com/api-reference/docs/board-history-other-types#aggregatehistoryitemsqueryinput) | Optional per-board filter. ANDed with the top-level query filter when both are present.                      |
| limit  | `Int`                                                                                              | Maximum results per board before cross-board merge.                                                          |

# Shared types

## HistoricalRangeLimitReason

The reason the queryable historical range starts later than the earliest requested timestamp.

| Value        | Description                                                                         |
| :----------- | :---------------------------------------------------------------------------------- |
| `DATA_LIMIT` | Data capture for this board began after the earliest requested timestamp.           |
| `PLAN_LIMIT` | The earliest requested timestamp exceeds the account plan's maximum history window. |

## SourceBoardInfo

Metadata for a board that contributed results to a union aggregate query.

| Field     | Type | Description                                         |
| :-------- | :--- | :-------------------------------------------------- |
| board\_id | `ID` | The board ID that contributed to the merged result. |
