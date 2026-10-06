---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the views APIs

The monday.com [views](https://developer.monday.com/api-reference/reference/views) APIs enable you to create, read, update, and delete board views.

The types below are used by the views queries and mutations, and are not independently queryable.

# ItemsQueryGroup

An object containing a group of filtering rules.

| Field    | Type                                                                                              | Description                                                    | Enum Values |
| :------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------- | :---------- |
| groups   | `[ItemsQueryGroup!]`                                                                              | The rule groups to filter your queries.                        |             |
| operator | `ItemsQueryOperator`                                                                              | The operator to use for the rule groups. The default is `and`. | `and` `or`  |
| rules    | [`[ItemsQueryRule!]`](https://developer.monday.com/api-reference/docs/other-types#itemsqueryrule) | The rules to filter your queries.                              |             |

## ItemsQueryRule

The rules to filter your queries by specific columns.

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
        column_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the column to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare_attribute
      </td>

      <td>
        `String`
      </td>

      <td>
        The comparison attribute. You can find the supported attributes for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference). Most columns don't have a `compare_attribute`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare_value
      </td>

      <td>
        `CompareValue!`
      </td>

      <td>
        The column value to filter by. This can be a `string` or index value depending on the column type. You can find the supported values for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        operator
      </td>

      <td>
        `ItemsQueryRuleOperator`
      </td>

      <td>
        The condition for value comparison. The default is `any_of`.
      </td>

      <td>
        `any_of`  
        `not_any_of`  
        `is_empty`  
        `is_not_empty`  
        `greater_than`  
        `greater_than_or_equals`  
        `lower_than`  
        `lower_than_or_equal`  
        `between`  
        `not_contains_text`  
        `contains_text`  
        `contains_terms`  
        `starts_with`  
        `ends_with`  
        `within_the_next`  
        `within_the_last`
      </td>
    </tr>
  </tbody>
</Table>

***

# ItemsQueryOrderBy

The column attributes to sort results by.

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
        column_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the column to filter or sort by.  You can also enter `\"__creation_log__\"` or `\"__last_updated__\"` to chronologically sort results by their last updated or creation date (oldest to newest).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `ItemsOrderByDirection`
      </td>

      <td>
        The direction to sort items in. The default is `asc`.
      </td>

      <td>
        `asc`  
        `desc`
      </td>
    </tr>
  </tbody>
</Table>

***

# TableViewSettingsInput

An object containing the table view setting's configuration.

| Field     | Type                                                                                                                        | Description                                       |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| columns   | [`ColumnsConfigInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#columnconfiginput)      | The table view's column visibility configuration. |
| group\_by | [`GroupBySettingsInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#groupbysettingsinput) | The table view's grouping conditions.             |

## ColumnConfigInput

The column visibility and display order configuration.

| Field                        | Type                                                                                                                         | Description                                |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| column\_order                | `[String!]`                                                                                                                  | The order of the columns.                  |
| column\_properties           | [`[ColumnPropertyInput!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#columnpropertyinput) | The columns' configuration.                |
| floating\_columns\_count     | `Int`                                                                                                                        | The number of floating columns to display. |
| subitems\_column\_properties | [`[ColumnPropertyInput!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#columnpropertyinput) | The subitem columns' configuration.        |

### ColumnPropertyInput

The column visibility configuration.

| Field      | Type       | Description                     |
| :--------- | :--------- | :------------------------------ |
| column\_id | `String!`  | The column's unique identifier. |
| visible    | `Boolean!` | Whether the column is visible.  |

## GroupBySettingsInput

The table view's grouping and visibility conditions.

| Field           | Type                                                                                                                              | Description                                 |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| conditions      | [`[GroupByConditionInput!]!`](https://developer.monday.com/api-reference/reference/board-views-other-types#groupbyconditioninput) | The list of item grouping conditions.       |
| hideEmptyGroups | `Boolean`                                                                                                                         | Whether to hide empty groups without items. |

### GroupByConditionInput

The list of item grouping conditions.

| Field    | Type                                                                                                                                | Description                     |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| columnId | `String!`                                                                                                                           | The column's unique identifier. |
| config   | [`GroupByColumnConfigInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#groupbycolumnconfiginput) | The column's sort settings.     |

### GroupByColumnConfigInput

The group's column sort settings.

| Field        | Type                                                                                                                                | Description                 |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| sortSettings | [`GroupBySortSettingsInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#groupbysortsettingsinput) | The column's sort settings. |

#### **GroupBySortSettingsInput**

The direction and type of sort.

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
        direction
      </td>

      <td>
        `SortDirection!`
      </td>

      <td>
        The group's sort direction.
      </td>

      <td>
        `ASC`  
        `DESC`
      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `String`
      </td>

      <td>
        The type of sorting to apply.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>
