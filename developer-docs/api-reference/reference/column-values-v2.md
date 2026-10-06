---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Column values

Learn how to read column values on monday boards using the platform API

Every monday.com board has one or more [columns](https://support.monday.com/hc/en-us/articles/115005466609-The-Basics-of-Columns), each holding a particular type of information. These column values make up the board's content, and their internal value structure varies by type.

# Queries

## Get column values

* Returns an array containing metadata about one or a collection of columns
* Can only be nested within an `items` query

```graphql GraphQL
query {
  items(ids: 1234567890) {
    column_values {
      column {
        title
      }
      id
      type
      value
    }
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
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
        capabilities
      </td>

      <td>
        `[ColumnCapability!]`
      </td>

      <td>
        The column's capabilities.
      </td>

      <td>
        `CALCULATED`  
        `VISIBILITY` (hidden)
      </td>
    </tr>

    <tr>
      <td>
        ids
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The specific columns to return.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        types
      </td>

      <td>
        [`[ColumnType!]`](https://developer.monday.com/api-reference/docs/other-types#column-type)
      </td>

      <td>
        The specific type of columns to return.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Field    | Type                                                                                     | Description                                                                              |
| :------- | :--------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| column   | [`Column!`](https://developer.monday.com/api-reference/reference/columns)                | The column the value belongs to.                                                         |
| id       | `ID!`                                                                                    | The column's unique identifier.                                                          |
| is\_leaf | `Boolean!`                                                                               | Whether the item is a leaf (has no subitems).                                            |
| text     | `String`                                                                                 | The text representation of the column's value. Not every column supports the text value. |
| type     | [`ColumnType!`](https://developer.monday.com/api-reference/docs/other-types#column-type) | The column's type.                                                                       |
| value    | `JSON`                                                                                   | The column's raw value.                                                                  |

# Implementations

Our schema also contains specific types for each column value, such as `ButtonValue` and `StatusValue`. These extend the core `ColumnValue` type, so you can query column-specific fields instead of parsing the column's raw JSON value.

Take the `StatusValue` type for example. On top of the 6 core [fields](https://developer.monday.com/api-reference/docs/column-values-v2#fields), it also exposes the `index`, `is_done`, `label`, `label_style`, `update_id`, and `updated_at` [fields](https://developer.monday.com/api-reference/docs/status#fields) specific to the `StatusValue` type.

## Using fragments to get column-specific fields

You can return subfields for a specific column type using [GraphQL fragments](https://graphql.org/learn/queries/#fragments), or queries that will only run if a specific type is returned. Fragments can help you selectively return column-specific data that doesn't exist on other columns on the board. Each column type has its own fields documented [here](https://developer.monday.com/api-reference/docs/column-types-reference).

### Example

Notice the `...on StatusValue` expression, which will return the `label` and `update_id` only on status columns.

```graphql GraphQL
query {
  items (ids: 1234567890) {
    column_values {
      value
      type
      ... on StatusValue  { # will only run for status columns
        label
        update_id
      }
    }
  }
}
```
