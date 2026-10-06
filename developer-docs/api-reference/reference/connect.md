---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Connect Boards

Learn how to filter, read, update, and clear the connect boards column on monday boards using the platform API

The [connect boards column](https://support.monday.com/hc/en-us/articles/360000635139-Connect-Boards-Column-Previously-Link-to-Item-Column-) links an item on one board to one or more items on another board (or the same board). It enables cross-board relationships and is commonly used for project dependencies, related tasks, and CRM associations.

Via the API, the connect boards column supports read, filter, create, update, and clear operations.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column Type
      </th>

      <th style={{ textAlign: "left" }}>
        Implementation Type
      </th>

      <th style={{ textAlign: "left" }}>
        Supported Operations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `board_relation`
      </td>

      <td style={{ textAlign: "left" }}>
        `BoardRelationValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **Yes**
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Connect boards columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `BoardRelationValue`.

## Get connected board IDs

The `connection_board_ids` root query returns the IDs of all boards connected to a specific connect boards column.

<Callout icon="🚧" theme="warn">
  **Breaking change in `2026-07`**: The argument was renamed from `connectionId` to `connection_id` (snake_case), and is now required (`ID!`). The return type also changed from `[Int!]` to `[ID!]!`. Update your integration before migrating to `2026-07` or later.
</Callout>

* **Required scope: `boards:read`**
* Returns `[ID!]!` — an array of board IDs
* Can only be queried directly at the root

```graphql GraphQL
query {
  connection_board_ids(connection_id: "1234567890")
}
```

### Arguments

| Argument       | Type  | Description                                                  |
| :------------- | :---- | :----------------------------------------------------------- |
| connection\_id | `ID!` | The unique identifier of the connect boards column to query. |

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on BoardRelationValue {
        id
        display_value
        linked_item_ids
        linked_items {
          id
          name
        }
        updated_at
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      name
      column_values {
        ... on BoardRelationValue {
          id
          display_value
          linked_item_ids
          linked_items {
            id
            name
          }
          updated_at
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `BoardRelationValue` implementation will return.

| Field                                                                                    | Description                                                                              |
| :--------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns)         | The column the value belongs to.                                                         |
| display\_value `String!`                                                                 | The names of the linked items, separated by commas.                                      |
| id `ID!`                                                                                 | The column's unique identifier.                                                          |
| linked\_item\_ids `[ID!]!`                                                               | The unique identifiers of linked items.                                                  |
| linked\_items [`[Item!]!`](https://developer.monday.com/api-reference/reference/items#/) | The linked items. You can query any `Item` field on the linked items.                    |
| text `String`                                                                            | Always returns `null` for this column. Use `display_value` instead.                      |
| type `ColumnType!`                                                                       | The column's type (`board_relation`).                                                    |
| updated\_at `Date`                                                                       | The column's last updated date.                                                          |
| value `JSON`                                                                             | Always returns `null` for this column. Use `linked_items` and `linked_item_ids` instead. |

<Callout icon="📘" theme="info">
  The `text` and `value` fields always return `null` for connect boards columns. Use `display_value` for a comma-separated string of linked item names, `linked_item_ids` for an array of IDs, or `linked_items` for full item objects.
</Callout>

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "connect_boards",
            "display_value": "Task A, Task B",
            "linked_item_ids": ["1122334455", "5544332211"],
            "linked_items": [
              { "id": "1122334455", "name": "Task A" },
              { "id": "5544332211", "name": "Task B" }
            ],
            "updated_at": "2026-03-21T12:00:00+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by connect boards values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The connect boards column supports the following operators:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Operator
      </th>

      <th>
        Compare Value
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `any_of`
      </td>

      <td>
        An array of linked item IDs as numbers (e.g., `[1234567890]`)
      </td>

      <td>
        Returns items connected to any of the specified linked items.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of linked item IDs as numbers (e.g., `[1234567890]`)
      </td>

      <td>
        Excludes items connected to any of the specified linked items.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        Partial or full item name as a string (e.g., `["Task"]`)
      </td>

      <td>
        Returns items where a linked item's name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        Partial or full item name as a string (e.g., `["Task"]`)
      </td>

      <td>
        Returns items where no linked item's name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `is_empty`
      </td>

      <td>
        `[]`
      </td>

      <td>
        Returns items with no linked items.
      </td>
    </tr>

    <tr>
      <td>
        `is_not_empty`
      </td>

      <td>
        `[]`
      </td>

      <td>
        Returns items that have at least one linked item.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by linked item ID

This example returns all items connected to a specific linked item.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "connect_boards"
            compare_value: [9876543210]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

### Filter by linked item name

This example returns all items connected to an item whose name contains "Task".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "connect_boards"
            compare_value: ["Task"]
            operator: contains_text
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

### Filter by empty connection

This example returns all items with no linked items.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "connect_boards"
            compare_value: []
            operator: is_empty
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

***

# Mutations

## Create

**Required scope: `boards:write`**

You can create a connect boards column using the [`create_column`](https://developer.monday.com/api-reference/docs/columns#fields) mutation. Use the `defaults` argument to specify the target board and connection settings.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Related Items"
    column_type: board_relation
    defaults: {
      boardIds: [9876543210]
      allowMultipleItems: true
      allowCreateReflectionColumn: true
    }
  ) {
    id
    title
    type
  }
}
```

### `defaults` arguments

| Argument                    | Type      | Description                                                                              |
| :-------------------------- | :-------- | :--------------------------------------------------------------------------------------- |
| boardIds                    | `[Int]`   | Array of board IDs to connect to. At least one board ID is required.                     |
| allowMultipleItems          | `Boolean` | Whether to allow linking multiple items. Defaults to `true`.                             |
| allowCreateReflectionColumn | `Boolean` | Whether to create a mirror (two-way) column on the connected board. Defaults to `false`. |

<Callout icon="📘" theme="info">
  Setting `allowCreateReflectionColumn` to `true` automatically creates a corresponding connect boards column on the target board, enabling a two-way relationship between the boards.
</Callout>

## Update

<Callout icon="🚧" theme="warn">
  Boards must already be connected (via the column's settings) before you can link their items. You cannot programmatically connect new boards through item-level mutations.
</Callout>

You can update a connect boards column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values) by passing linked item IDs in an `item_ids` array.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"connect_boards\": {\"item_ids\": [1122334455, 5544332211]}}"
  ) {
    id
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
    change_multiple_column_values(
      item_id: $itemId
      board_id: $boardId
      column_values: $columnValues
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    connect_boards: { item_ids: [1122334455, 5544332211] }
  }),
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation is **not supported** for connect boards columns. You must use `change_multiple_column_values` instead.
</Callout>

### Set on item creation

You can set connected items when creating an item by passing the column value in the `column_values` argument of the [`create_item`](https://developer.monday.com/api-reference/reference/items#create-item) mutation.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"connect_boards\": {\"item_ids\": [1122334455]}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a connect boards column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` in the column value.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"connect_boards\": null}"
  ) {
    id
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
    change_multiple_column_values(
      item_id: $itemId
      board_id: $boardId
      column_values: $columnValues
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    connect_boards: null
  }),
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To understand a connect boards column's settings, you can query its configuration through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["connect_boards"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                           | Type       | Description                                                                                |
| :---------------------------- | :--------- | :----------------------------------------------------------------------------------------- |
| `boardIds`                    | `number[]` | Array of board IDs that this column can connect to.                                        |
| `allowMultipleItems`          | `boolean`  | Whether multiple items can be linked in a single cell.                                     |
| `allowCreateReflectionColumn` | `boolean`  | Whether a two-way (mirror) column was created on the connected board. Only present if set. |

### Example `settings` response

```json
{
  "boardIds": [9876543210],
  "allowMultipleItems": true,
  "allowCreateReflectionColumn": true
}
```

<Callout icon="📘" theme="info">
  An empty `settings` object (`{}`) indicates the column was created without specifying target boards. You must configure `boardIds` in the column's settings before items can be linked.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the connect boards column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: board_relation
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "allowCreateReflectionColumn": {
                "type": "boolean",
                "description": "Whether to allow creation of reflection columns"
              },
              "allowMultipleItems": {
                "type": "boolean",
                "description": "Whether to allow selection of multiple items"
              },
              "boardIds": {
                "type": "array",
                "description": "Array of related board IDs",
                "items": {
                  "type": "integer"
                }
              },
              "boardId": {
                "type": "integer",
                "description": "Default board ID for the relation"
              }
            },
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
