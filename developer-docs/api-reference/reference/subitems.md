---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Subitems

Learn how to query subitems on monday boards using the platform API

[Subitems](https://support.monday.com/hc/en-us/articles/360011905480-The-Subitems) are special items that are "nested" under the items on your board. They can be accessed via the subitem column, which can be added from the column's center or by right-clicking an item to expose its dropdown menu. Like [items](https://developer.monday.com/api-reference/docs/items), subitems store data within their columns.

# Queries

## Get subitems

* **Required scope:`boards:read`**
* Returns an array containing metadata about one or a collection of subitems
* Can only be nested within another query (e.g., `items`); can't be queried directly at the root

```graphql GraphQL
query {
  items(ids: 1234567890) {
    subitems {
      id
      column_values {
        value
        text
      }
    }
  }
}
```

### Fields

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
        assets
      </td>

      <td>
        [`[Asset]`](https://developer.monday.com/api-reference/reference/assets-1)
      </td>

      <td>
        The subitem's assets/files.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board
      </td>

      <td>
        [`Board`](https://developer.monday.com/api-reference/reference/boards)
      </td>

      <td>
        The board that contains the subitem.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_values
      </td>

      <td>
        [`[ColumnValue]`](https://developer.monday.com/api-reference/reference/column-values-v2)
      </td>

      <td>
        The subitem's column values.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The subitem's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator
      </td>

      <td>
        [`User`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The subitem's creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the user who created the subitem. Returns `null` if the item was created by default on the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        `String!`
      </td>

      <td>
        The subitem's email.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        group
      </td>

      <td>
        [`Group`](https://developer.monday.com/api-reference/reference/groups)
      </td>

      <td>
        The subitem's group.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The subitem's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        linked_items
      </td>

      <td>
        [`[Item!]!`](https://developer.monday.com/api-reference/reference/items)
      </td>

      <td>
        The subitem's linked items.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The subitem's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        parent_item
      </td>

      <td>
        [`Item`](https://developer.monday.com/api-reference/reference/items)
      </td>

      <td>
        A subitem's parent item. If used for a parent item, it will return `null`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        relative_link
      </td>

      <td>
        `String`
      </td>

      <td>
        The subitem's relative path.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `State`
      </td>

      <td>
        The subitem's state.
      </td>

      <td>
        `active`  
        `all`  
        `archived` `deleted`
      </td>
    </tr>

    <tr>
      <td>
        subitems
      </td>

      <td>
        [`[Item]`](https://developer.monday.com/api-reference/reference/items)
      </td>

      <td>
        The subitem's subitems.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        subscribers
      </td>

      <td>
        [`[User]!`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The subitem's subscribers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The date the subitem was last updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updates
      </td>

      <td>
        [`[Update]`](https://developer.monday.com/api-reference/reference/updates)
      </td>

      <td>
        The subitem's updates.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        url
      </td>

      <td>
        `String!`
      </td>

      <td>
        The subitem's link.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

**Required scope:`boards:write`**

## Create subitem

Creates a new subitem via the API. Returns [`Item`](https://developer.monday.com/api-reference/reference/items).

The data of each subitem is stored in the subitem board columns (same as items), each of which holds a particular piece of information. Each column has a specific type, and different column types expect a different set of parameters to update their values. When sending data to a particular column, use a JSON-formatted string. If you're using JavaScript, you can use `JSON.stringify()` to convert a JSON object into a string.

You can also use simple values in this mutation or combine them with regular values. Read more about sending data for each column in our [column types reference](https://developer.monday.com/api-reference/docs/guide-to-changing-column-data).

```graphql GraphQL
mutation {
  create_subitem(
    parent_item_id: 1234567890, 
    item_name: "New subitem", 
    column_values: "{\"date0\":\"2023-05-25\"}"
	) {
    id
    board {
      id
    }
  }
}
```

### Arguments

| Argument                    | Type      | Description                                                                                           |
| :-------------------------- | :-------- | :---------------------------------------------------------------------------------------------------- |
| column\_values              | `JSON`    | The column values of the new subitem.                                                                 |
| create\_labels\_if\_missing | `Boolean` | Creates status/dropdown labels if they're missing. Requires permission to change the board structure. |
| item\_name                  | `String!` | The new subitem's name.                                                                               |
| parent\_item\_id            | `ID!`     | The parent item's unique identifier. Can reference an item or subitem for multi-level boards.         |

<Callout icon="🚧" theme="warning">
For multi-level boards:

* Subitems can be nested up to 5 levels deep.
* `parent_item_id` can reference an item or subitem.
* When you create the first subitem under a parent:
  * For rollup-eligible columns:
    * If no values are provided, the parent’s values are copied to the subitem and then cleared from the parent.
    * If values are provided, the parent’s values are not copied, but they are still cleared.
* For any additional subitems, values are not copied; the parent instead shows a calculated rollup.
</Callout>
