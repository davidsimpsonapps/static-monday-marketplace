---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Items

Learn how to read, create, update, and delete items from monday boards using the platform API

<Glossary>Items</Glossary> are core objects in the monday.com platform that hold the actual data within the board. To better illustrate the platform, imagine each board as a table, and an item is a single row in that table. Take one row, fill it with whatever information you'd like, and you now have an [item](https://support.monday.com/hc/en-us/articles/115005319105-The-basics-of-items)!

<Callout icon="🚧" theme="warning">
Want to read all items on a board?

The `items` object allows you to query specific items by their IDs. If you want to read all items on a board, use the [`items_page`](https://developer.monday.com/api-reference/reference/items-page) object instead!
</Callout>

# Queries

## Get items

* **Required scope:`boards:read`**
* Returns an array containing metadata about one or a collection of specific items
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210, 2345678901]) {
    name
  }
}
```

### Arguments

| Argument           | Type      | Description                                                                                                                    |
| :----------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------- |
| exclude\_nonactive | `Boolean` | Excludes items that are inactive, deleted, or belong to deleted items. Only works when used with the `ids` argument.           |
| ids                | `[ID!]`   | The IDs of the specific items, subitems, or parent items to return. Maximum of 100 IDs at one time using the `limit` argument. |
| limit              | `Int`     | The number of items returned. The default is 25, and the maximum is 100.                                                       |
| newest\_first      | `Boolean` | Lists the most recently created items at the top.                                                                              |
| page               | `Int`     | The page number to return. Starts at 1.                                                                                        |

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
        The item's assets/files.
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
        The board that contains the item.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_values
      </td>

      <td>
        `[ColumnValue]`
      </td>

      <td>
        The item's column values.
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
        The item's creation date.
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
        The item's creator.
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
        The unique identifier of the item's creator. Returns `null` if the item was created by default on the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description
      </td>

      <td>
        `ItemDescription`
      </td>

      <td>
        The item's [description](https://support.monday.com/hc/en-us/articles/17653444316562-The-Item-Description).
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
        The item's email.
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
        The item's group.
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
        The item's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        [linked_items](https://developer.monday.com/api-reference/docs/other-types#linked-items)
      </td>

      <td>
        `[Item!]!`
      </td>

      <td>
        The item's linked items.
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
        The item's name.
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
        A subitem's parent item. Returns `null` if querying a parent item.
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
        The item's relative path.
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
        The item's state.
      </td>

      <td>
        `active`  
        `all`  
        `archived`  
        `deleted`
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
        The item's subitems.
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
        The item's subscribers.
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
        The date the item was last updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updates
      </td>

      <td>
        [`[Update!]`](https://developer.monday.com/api-reference/reference/updates)
      </td>

      <td>
        The item's updates.
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
        The item's URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

**Required scope: `boards:write`**

## Create item

Creates a new item. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

Item data is stored in columns that hold particular information based on the column type. Each type expects a different set of parameters to update its values. When sending data to a particular column, use a JSON-formatted string. If you're using JavaScript, you can use `JSON.stringify()` to convert a JSON object into a string.

You can also use simple values in this mutation or combine them with regular values. Read more about sending data for each column in our [column types reference](https://developer.monday.com/api-reference/reference/column-types-reference).

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    group_id: "group_one" 
    item_name: "new item" 
    column_values: "{\"date\":\"2023-05-25\"}"
	) {
    id
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
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_values
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The column values of the new item.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        create_labels_if_missing
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Creates status/dropdown labels if they are missing (requires permission to change the board structure).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        group_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The group's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        item_name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new item's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position_relative_method
      </td>

      <td>
        [`PositionRelative`](https://developer.monday.com/api-reference/reference/other-types#position-relative)
      </td>

      <td>
        Specifies where to place the item in relation to another item. Must be used with `relative_to`.
      </td>

      <td>
        You can use this argument in conjunction with `relative_to` to specify which item you want to create the new item above or below.

        * `before_at`:  This enum value creates the new item above the `relative_to` value. If you don't use the `relative_to` argument, the new item will be created at the bottom of the first active group (unless you specify a group using `group_id`).

        * `after_at`: This enum value creates the new item below the `relative_to` value. If you don't use the `relative_to` argument, the new item will be created at the top of the first active group (unless you specify a group using `group_id`).
      </td>
    </tr>

    <tr>
      <td>
        relative_to
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of an item on the same board to set the position relative to. Must be used with `position_relative_method`.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Duplicate item

Duplicates an item (or subitem) and its nested subitems. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

**Note:** Updates shouldn't be requested in the response as they're duplicated asynchronously.

```graphql GraphQL
mutation {
  duplicate_item(
    board_id: 1234567890
    item_id: 9876543210 
    with_updates: true
  ) {
    id
  }
}
```

### Arguments

| Argument      | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| board\_id     | `ID!`     | The board's unique identifier.             |
| item\_id      | `ID`      | The item's unique identifier. Required.    |
| with\_updates | `Boolean` | Duplicates the item with existing updates. |

## Change an item's position

Changes an item's position on the **same board**. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

```graphql GraphQL
mutation { 
 change_item_position(
  item_id: 1234567890
  relative_to: 9876543210
  position_relative_method: after_at
 ) {
  id
  group {
   id
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
        group_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of an existing group. Must be used with `group_top`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        group_top
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Specifies if the item will be placed at the top or bottom of the group. Must be used with `group_id`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        item_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The item's unique identifier. Moving subitems or converting an item to a subitem is not currently supported.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position_relative_method
      </td>

      <td>
        `PositionRelative`
      </td>

      <td>
        Specifies where to place the item in relation to another item. Must be used with `relative_to`.
      </td>

      <td>
        `after_at` (moves the item below the relative_to value)  
        `before_at` (moves the item above the relative_to value)
      </td>
    </tr>

    <tr>
      <td>
        relative_to
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of an item on the same board to set the position relative to. Must be used with `position_relative_method`.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Set item description content

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

Updates an item's description using markdown. The provided markdown is converted into document blocks and replaces the item's existing content. Returns [`DocBlocksFromMarkdownResult`](https://developer.monday.com/api-reference/reference/items-other-types#docblocksfrommarkdownresult).

```graphql
mutation {
  set_item_description_content(
    item_id: 1234567890
    markdown: "**The updated description!**"
  ) {
    success
    error
    block_ids
  }
}
```

### Arguments

| Argument | Type      | Description                             | Notes                                                                                                                 |
| :------- | :-------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| item\_id | `ID!`     | The item's unique identifier.           |                                                                                                                       |
| markdown | `String!` | The item's updated description content. | Markdown doesn't support text colors or background highlights. Any existing colored or highlighted text will be lost. |

## Update assets on item

Updates the files in a file column. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

```graphql GraphQL
mutation {
  update_assets_on_item(
    board_id: 1234567890
    item_id: 9876543210
    column_id: "YOUR_COLUMN_ID"
    files: {
      fileType: asset
      name: "New asset"
      assetId: 12345
      linkToFile: "https://yourlink.com"
    }
  ) {
    assets {
      id
      name
      url
    }
  }
}
```

### Arguments

| Argument   | Type                                                                                                | Description                                   |
| :--------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| board\_id  | `ID!`                                                                                               | The board's unique identifier.                |
| column\_id | `String!`                                                                                           | The column's unique identifier.               |
| files      | [`[FileInput!]!`](https://developer.monday.com/api-reference/reference/items-other-types#fileinput) | An object containing the file's input values. |
| item\_id   | `ID!`                                                                                               | The item's unique identifier.                 |

## Move item to group

Moves an item (or subitem) and its nested subitems between groups on the same board. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

<Callout icon="🚧" theme="warning">
Multi-level board validations

The operation will be blocked if it would create a parent–child cycle (e.g., an item becoming an ancestor or descendant of itself) or if the resulting depth on the target board would exceed 5.
</Callout>

```graphql GraphQL
mutation {
  move_item_to_group(
    item_id: 1234567890, 
    group_id: "group_one"
	) {
    id
  }
}
```

### Arguments

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| group\_id | `String!` | The group's unique identifier. |
| item\_id  | `ID`      | The item's unique identifier.  |

## Move item to board

Moves an item (or subitem) and its nested subitems to a different board. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

<Callout icon="🚧" theme="warning">
Multi-level board validations

The operation will be blocked if it would create a parent–child cycle (e.g., an item becoming an ancestor or descendant of itself) or if the resulting depth on the target board would exceed 5.
</Callout>

```graphql GraphQL
mutation {
  move_item_to_board(
    board_id: 1234567890
    group_id: "new_group"
    item_id: 9876543210
    columns_mapping: [
      { source: "status", target: "status2" }
      { source: "person", target: "person" }
      { source: "date", target: "date4" }
    ]
  ) {
    id
  }
}
```

### Arguments

<Table align={["left","left","left"]}>
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
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the board to move the item to (target board)
      </td>
    </tr>

    <tr>
      <td>
        group_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the group to move the item to (target group).
      </td>
    </tr>

    <tr>
      <td>
        item_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the item to move.
      </td>
    </tr>

    <tr>
      <td>
        columns_mapping
      </td>

      <td>
        [`[ColumnMappingInput!]`](https://developer.monday.com/api-reference/docs/other-types#column-mapping-input)
      </td>

      <td>
        The object that defines the column mapping between the original and target board. Every column type can be mapped **except for formula columns.**

        When using this argument, you must specify the mapping for **all** columns. You can select the target as `null` for any columns you don't want to map, but doing so will lose the column's data.

        If you omit this argument, the columns will be mapped based on the best match.
      </td>
    </tr>

    <tr>
      <td>
        subitems_columns_mapping
      </td>

      <td>
        [`[ColumnMappingInput!]`](https://developer.monday.com/api-reference/docs/other-types#column-mapping-input)
      </td>

      <td>
        The object that defines the subitems' column mapping between the original and target board. Every column type can be mapped **except for formula columns.**

        When using this argument, you must specify the mapping for **all** columns. You can select the target as `null` for any columns you don't want to map, but doing so will lose the column's data.

        If you omit this argument, the columns will be mapped based on the best match.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  **`columns_mapping` format**

  Pass an **array** of [`ColumnMappingInput`](https://developer.monday.com/api-reference/reference/columns-other-types#columnmappinginput) objects — one entry per column on the source board:

  ```graphql
  columns_mapping: [
    { source: "status", target: "status2" }
    { source: "person", target: "person" }
    { source: "date", target: "date4" }
    { source: "formula", target: null }
  ]
  ```

  * `source` — column ID on the board the item is moving **from**
  * `target` — column ID on the destination board, or `null` to drop the column's data
  * When you include `columns_mapping`, map **every** column (use `target: null` for columns you don't want to copy)
  * Formula columns cannot be mapped
  * If you omit `columns_mapping`, columns are matched automatically by type and title

  A `Columns mapping is not in the expected format` error usually means the value is not an array, uses wrong field names, or is missing required mappings.
</Callout>

## Archive item

Archives an item (or subitem) and its nested subitems. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

```graphql GraphQL
mutation {
  archive_item(item_id: 1234567890) {
    id
  }
}
```

### Arguments

| Argument | Type  | Description                   |
| :------- | :---- | :---------------------------- |
| item\_id | `ID!` | The item's unique identifier. |

## Clear item updates

Clears all updates on a specific item, including replies and likes. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

```graphql GraphQL
mutation {
  clear_item_updates(
    item_id: 1234567890
	) {
    id
  }
}
```

### Arguments

| Arguments | Type  | Description                   |
| :-------- | :---- | :---------------------------- |
| item\_id  | `ID!` | The item's unique identifier. |

## Delete item

Deletes an item (or subitem) and its nested subitems. Returns [`Item`](https://developer.monday.com/api-reference/docs/items#fields).

```graphql GraphQL
mutation {
  delete_item(
    item_id: 1234567890
	) {
    id
  }
}
```

### Arguments

| Argument | Type | Description                   |
| :------- | :--- | :---------------------------- |
| item\_id | `ID` | The item's unique identifier. |
