---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn about the other types used reading filtered items data using the platform API

The monday.com [`items_page`](https://developer.monday.com/api-reference/reference/app-features) API enables you to read items on a board using expressive filters.

Each of the object types described below represents a specific aspect of a filter. They can be provided as arguments to define a filtered items query.

# ItemsQuery

An object containing a set of parameters to filter, sort, and control the scope of the query.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        groups `[ItemsQueryGroup!]`
      </td>

      <td>
        The group rules and attributes to filter your queries.
      </td>

      <td>

      </td>

      <td>
        groups `[ItemsQueryGroup!]`\
        operator `ItemsQueryOperator`\
        rules `[ItemsQueryRule!]`
      </td>
    </tr>

    <tr>
      <td>
        ids `[ID!]`
      </td>

      <td>
        The specific item IDs to return. The maximum is 100. 
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryOperator`
      </td>

      <td>
        The conditions between query rules. The default is `and`.
      </td>

      <td>
        `and` `or`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        order\_by [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/docs/other-types#itemsqueryorderby)
      </td>

      <td>
        The attributes to sort results by.
      </td>

      <td>

      </td>

      <td>
        column\_id `String!`\
        direction `ItemsOrderByDirection`
      </td>
    </tr>

    <tr>
      <td>
        rules [`[ItemsQueryRule!]`](https://developer.monday.com/api-reference/docs/other-types#itemsqueryrule)
      </td>

      <td>
        The rules to filter your queries.
      </td>

      <td>

      </td>

      <td>
        column\_id `ID!`\
        compare\_attribute `String`\
        compare\_value `CompareValue!`\
        operator `ItemsQueryRuleOperator`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryGroup

An object containing the group rules.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        groups `[ItemsQueryGroup!]`
      </td>

      <td>
        The group rules and attributes to filter your queries.
      </td>

      <td>

      </td>

      <td>
        groups `[ItemsQueryGroup!]`\
        operator `ItemsQueryOperator`\
        rules `[ItemsQueryRule!]`
      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryOperator`
      </td>

      <td>
        The conditions between query rules. The default is `and`.
      </td>

      <td>
        `and`\
        `or`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        rules `[ItemsQueryRule!]`
      </td>

      <td>
        The rules to filter your queries.
      </td>

      <td>

      </td>

      <td>
        column\_id `ID!`\
        compare\_attribute `String`\
        compare\_value `CompareValue!`\
        operator `ItemsQueryRuleOperator`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryOrderBy

An object containing the attributes to sort results by.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        column\_id `String!`
      </td>

      <td>
        The unique identifier of the column to filter or sort by.  You can also enter `"__creation_log__"` or `"__last_updated__"` to chronologically sort results by their last updated or creation date (oldest to newest).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction `ItemsOrderByDirection`
      </td>

      <td>
        The direction to sort items in. The default is *asc*.
      </td>

      <td>
        `asc`\
        `desc`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryRule

An object containing the rules to filter your queries.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        column\_id `ID!`
      </td>

      <td>
        The unique identifier of the column to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare\_attribute `String`
      </td>

      <td>
        The comparison attribute. You can find the supported attributes for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference). Most columns don't have a `compare_attribute`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare\_value `CompareValue!`
      </td>

      <td>
        The column value to filter by. This can be a `string` or index value depending on the column type. You can find the supported values for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryRuleOperator`
      </td>

      <td>
        The condition for value comparison. The default is `any_of`. 
      </td>

      <td>
        `any_of`\
        `not_any_of`\
        `is_empty`\
        `is_not_empty`\
        `greater_than`\
        `greater_than_or_equals`\
        `lower_than`\
        `lower_than_or_equal`\
        `between`\
        `not_contains_text`\
        `contains_text`\
        `contains_terms`\
        `starts_with`\
        `ends_with`\
        `within_the_next`\
        `within_the_last`
      </td>
    </tr>
  </tbody>
</Table>
