---
updatedAt: 2026-11-04T14:05:10.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the views APIs

The monday.com [views](https://developer.monday.com/api-reference/reference/board-views) APIs enable you to create, read, update, and delete board views.

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

***

# ViewContext

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The view's entity scope, passed to [`create_view`](https://developer.monday.com/api-reference/reference/board-views#create-view), [`create_view_table`](https://developer.monday.com/api-reference/reference/board-views#create-view-table), [`update_view`](https://developer.monday.com/api-reference/reference/board-views#update-view), and [`update_view_table`](https://developer.monday.com/api-reference/reference/board-views#update-view-table) via the `context` argument. The default is `BOARD`.

| Enum value | Description                         |
| :--------- | :---------------------------------- |
| `BOARD`    | Associates the view with the board. |

***

# ConditionalFormattingConditionInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A conditional formatting condition, passed to [`create_view`](https://developer.monday.com/api-reference/reference/board-views#create-view), [`create_view_table`](https://developer.monday.com/api-reference/reference/board-views#create-view-table), [`update_view`](https://developer.monday.com/api-reference/reference/board-views#update-view), and [`update_view_table`](https://developer.monday.com/api-reference/reference/board-views#update-view-table) via the `conditional_formatting_settings` argument. Each condition pairs a set of rules with a target and a highlight color: when an item matches the rules, the target cells or row are highlighted.

Passing `conditional_formatting_settings` replaces all existing conditions on the view. Pass an empty array to clear them.

| Field      | Type                                                                                                                                                           | Description                                                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| formatting | [`ConditionalFormattingFormattingInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#conditionalformattingformattinginput)    | The formatting to apply when the condition matches.               |
| id         | `String`                                                                                                                                                       | The condition's unique identifier. Generate a GUID on the client. |
| rules      | [`[ConditionalFormattingRuleBucketInput!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#conditionalformattingrulebucketinput) | The rules that trigger the condition.                             |
| target     | [`ConditionalFormattingTargetInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#conditionalformattingtargetinput)            | What to highlight when the condition matches.                     |

The example below highlights the entire row in `dark_red` when the `status` column is set to the label with index `2`.

```graphql
mutation {
  create_view_table(
    board_id: 1234567890
    name: "Stuck items"
    conditional_formatting_settings: [
      {
        id: "3f2b9c1e-8a4d-4f6e-9b2a-7c5d1e0f4a3b"
        rules: [
          {
            type: "RULE"
            operator: "ANY_OF"
            rule: {
              type: "BOARD_COLUMN"
              context: {
                board_id: 1234567890
                column_id: "status"
                column_type: "color"
              }
              compare_value: [2]
            }
          }
        ]
        target: { entire_row: true }
        formatting: { highlight_color: ["dark_red"] }
      }
    ]
  ) {
    id
    name
  }
}
```

## ConditionalFormattingRuleBucketInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A bucket of conditional formatting rules, referenced by [`ConditionalFormattingConditionInput`](#conditionalformattingconditioninput).

| Field    | Type                                                                                                                                            | Description                                         |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| operator | `String`                                                                                                                                        | The logical operator, such as `ANY_OF` or `ALL_OF`. |
| rule     | [`ConditionalFormattingRuleInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#conditionalformattingruleinput) | The rule definition.                                |
| type     | `String`                                                                                                                                        | The bucket type, such as `RULE`.                    |

### ConditionalFormattingRuleInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

A conditional formatting rule, referenced by [`ConditionalFormattingRuleBucketInput`](#conditionalformattingrulebucketinput).

| Field          | Type                                                                                                                                                          | Description                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------- |
| compare\_value | `JSON`                                                                                                                                                        | The values to match against. For status columns, pass an array of label indexes (for example, `[2]`). |
| context        | [`ConditionalFormattingRuleContextInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#conditionalformattingrulecontextinput) | The column the rule evaluates.                                                                        |
| type           | `String`                                                                                                                                                      | The rule type, such as `BOARD_COLUMN`.                                                                |

#### ConditionalFormattingRuleContextInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The column a conditional formatting rule evaluates, referenced by [`ConditionalFormattingRuleInput`](#conditionalformattingruleinput).

| Field              | Type     | Description                                               |
| :----------------- | :------- | :-------------------------------------------------------- |
| board\_id          | `ID`     | The unique identifier of the board the column belongs to. |
| column\_id         | `String` | The unique identifier of the column to evaluate.          |
| column\_type       | `String` | The column's type, such as `color`, `text`, or `date`.    |
| compare\_attribute | `String` | The column attribute to compare against.                  |

## ConditionalFormattingTargetInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

What a conditional formatting condition highlights, referenced by [`ConditionalFormattingConditionInput`](#conditionalformattingconditioninput).

| Field       | Type        | Description                                         |
| :---------- | :---------- | :-------------------------------------------------- |
| column\_ids | `[String!]` | The unique identifiers of the columns to highlight. |
| entire\_row | `Boolean`   | Whether to highlight the entire row.                |

## ConditionalFormattingFormattingInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The formatting a conditional formatting condition applies, referenced by [`ConditionalFormattingConditionInput`](#conditionalformattingconditioninput).

| Field            | Type        | Description                                                                              |
| :--------------- | :---------- | :--------------------------------------------------------------------------------------- |
| highlight\_color | `[String!]` | The color names to highlight with, such as `["orange"]` or `["dark_red", "done-green"]`. |
