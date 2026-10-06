---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the aggregate API

The monday.com [aggregate](https://developer.monday.com/api-reference/reference/aggregate) API enables you to read board data using groupings and aggregation functions.

The types below are used by the aggregate query and are not independently queryable.

# AggregateQueryInput

An object containing the aggregation query to execute.

| Field     | Type                                                                                                                                         | Description                                                                         |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| from      | [`AggregateFromTableInput!`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregatefromtableinput)             | The data source for the aggregation.                                                |
| group\_by | [`[AggregateGroupByElementInput!]`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregategroupbyelementinput) | The fields to group results by. The default limit per group is 1,000.               |
| limit     | `Int`                                                                                                                                        | The maximum number of result groups to return. Only applies when using `group_by`.  |
| query     | [`ItemsQuery`](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery)                                       | The filters for the items being aggregated. Without it, all items will be included. |
| select    | [`[AggregateSelectElementInput!]!`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateselectelementinput)  | The fields or functions to return.                                                  |

## AggregateFromTableInput

An object containing the source table and its ID for the aggregation query.

| Field | Type                        | Description                                           | Enum Values |
| :---- | :-------------------------- | :---------------------------------------------------- | :---------- |
| id    | `ID!`                       | The unique identifier of the source (e.g., board ID). |             |
| type  | `AggregateFromElementType!` | The source type.                                      | `TABLE`     |

## AggregateGroupByElementInput

An object containing the item limit and column to group results by.

| Field      | Type      | Description                                                                                                   |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------------ |
| column\_id | `String!` | The unique identifier of the column to group results by. Can also be an alias from a transformative function. |
| limit      | `Int`     | The number of groups to return. The default is 1,000.                                                         |

## AggregateSelectElementInput

An object containing the fields or functions to return.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        as
      </td>

      <td>
        `String!`
      </td>

      <td>
        The field's alias in the result set. For columns used in `group_by`, the alias must match the `column_id` in the `group_by` array.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column
      </td>

      <td>
        [`AggregateSelectColumnInput`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateselectcolumninput)
      </td>

      <td>
        The column to select from the source. Required if type is `COLUMN`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        function
      </td>

      <td>
        [`AggregateSelectFunctionInput`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateselectfunctioninput)
      </td>

      <td>
        The function to apply to the specified fields. Required if type is `FUNCTION`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `AggregateSelectElementType!`
      </td>

      <td>
        Whether this element is a column reference or a function call.
      </td>

      <td>
        `COLUMN`  
        `FUNCTION`
      </td>
    </tr>
  </tbody>
</Table>

### AggregateSelectColumnInput

An object containing the column to select from the source.

| Field      | Type      | Description                     |
| :--------- | :-------- | :------------------------------ |
| column\_id | `String!` | The column's unique identifier. |

### AggregateSelectFunctionInput

An object containing the function to apply to the specified fields.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        function
      </td>

      <td>
        `AggregateSelectFunctionName!`
      </td>

      <td>
        The function name.
      </td>

      <td>
        `AVERAGE`
        `BETWEEN`
        `CASE`
        `COLOR`
        `COUNT`  
        `COUNT_DISTINCT`  
        `COUNT_ITEMS`  
        `COUNT_KEYS`  
        `COUNT_SUBITEMS`  
        `DATE`  
        `DATE_TRUNC_DAY`  
        `DATE_TRUNC_MONTH`  
        `DATE_TRUNC_QUARTER`  
        `DATE_TRUNC_WEEK`  
        `DATE_TRUNC_YEAR`  
        `DURATION_RUNNING`  
        `END_DATE`  
        `EQUALS`  
        `FIRST`  
        `FLATTEN`  
        `HOUR`  
        `ID`  
        `IS_DONE`  
        `LABEL`  
        `LEFT`  
        `LENGTH`  
        `LOWER`  
        `MAX`  
        `MEDIAN`  
        `MIN`  
        `MIN_MAX`  
        `NONE`  
        `ORDER`  
        `PERSON`  
        `PHONE_COUNTRY_SHORT_NAME`  
        `RAW`  
        `START_DATE`  
        `SUM`  
        `TRIM`  
        `UPPER`
      </td>
    </tr>

    <tr>
      <td>
        params
      </td>

      <td>
        [`[AggregateSelectElementInput!]`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateselectelementinput)
      </td>

      <td>
        The arguments passed into the function. For column-based functions (e.g., `SUM`, `AVERAGE`), pass a `COLUMN` type element with the target `column_id`. Not required for item-level functions like `COUNT_ITEMS`.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# AggregateResultSet

An object containing the result of the `aggregate` query. When using `group_by`, each `AggregateResultSet` represents one group.

| Field   | Type                                                                                                                         | Description                                                                        |
| :------ | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| entries | [`[AggregateResultEntry!]`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregateresultentry) | A list of results, each representing either a grouping key or an aggregated value. |

## AggregateResultEntry

An object containing the field's name and value.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Possible Types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        alias
      </td>

      <td>
        `String`
      </td>

      <td>
        The name of the field, as defined using the `as` field. Used to map the result to its corresponding expression.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        value
      </td>

      <td>
        `AggregateResult`
      </td>

      <td>
        The value returned for the given alias. Can represent a group-by key or an aggregated metric.
      </td>

      <td>
        [`AggregateBasicAggregationResult`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregatebasicaggregationresult)  
        [`AggregateGroupByResult`](https://developer.monday.com/api-reference/reference/aggregate-other-types#aggregategroupbyresult)
      </td>
    </tr>
  </tbody>
</Table>

### AggregateBasicAggregationResult

An object containing the result of the aggregation function.

| Field  | Type    | Description                                                                                                                    |
| :----- | :------ | :----------------------------------------------------------------------------------------------------------------------------- |
| result | `Float` | The numeric result from the aggregation function. Returns `null` when all values in the group are null or the column is empty. |

### AggregateGroupByResult

An object containing the group-by value. The `value` field returns a JSON value whose type depends on the source column.

<Callout icon="🚧" theme="warn">
  **Breaking change in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later:** The `value_string`, `value_int`, `value_float`, and `value_boolean` fields have been removed and replaced by a single unified `value` field of type `JSON`. Consumers that reference the old typed fields must migrate to the `value` field and handle type coercion on the client side.
</Callout>

| Field | Type   | Description                                                                                                                  |
| :---- | :----- | :--------------------------------------------------------------------------------------------------------------------------- |
| value | `JSON` | The group-by value. Type varies: strings for text/status (hex codes), booleans for checkboxes, numbers for dates (epoch ms). |

| API Version         | Available Fields                                            | Notes                                            |
| :------------------ | :---------------------------------------------------------- | :----------------------------------------------- |
| Before `2026-04`    | `value_string`, `value_int`, `value_float`, `value_boolean` | Separate typed fields                            |
| `2026-04` and later | `value` (`JSON`)                                            | Unified field — handle type coercion client-side |

<Callout icon="📘" theme="info">
**Group by value format reference**

| Column Type | Value Format | Example |
| :---------- | :----------- | :------ |
| Status | Hex color code | `"#00c875"` |
| People | Person ID string | `"person-12345"` |
| Checkbox | Boolean | `true` |
| Text | Plain string | `"Category A"` |
| Date | Epoch timestamp (ms) | `1768435200000` |
| Numbers | Numeric value | `42` |
</Callout>
