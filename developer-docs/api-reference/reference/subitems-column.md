---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Subitems

Learn how to read and filter the subitems column on monday boards using the platform API

The [subitems column](https://support.monday.com/hc/en-us/articles/360019262679-The-Subitems-Column) displays the <Glossary>subitems</Glossary> nested under a parent item. It provides a way to break items into smaller, actionable tasks while keeping them linked to their parent.

The subitems column is **read-only** — you cannot write values to it directly. Instead, manage subitems through the [`create_subitem`](https://developer.monday.com/api-reference/reference/subitems#create-subitem) and [`delete_item`](https://developer.monday.com/api-reference/reference/items#delete-item) mutations.

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
        `subtasks`
      </td>

      <td style={{ textAlign: "left" }}>
        `SubtasksValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes** (column only)
        * Update: **No** (use `create_subitem` / `delete_item`)
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Subitems columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments). Values for the subitems column are of the `SubtasksValue` type.

The column's behavior depends on whether the queried item is a parent or a leaf:

* **Parent items** (items with subitems): `is_leaf` is `false`, `subitems` and `subitems_ids` are populated
* **Leaf items** (items without subitems, or subitems themselves): `is_leaf` is `true`, `subitems` and `subitems_ids` are empty

## SubtasksValue

```graphql GraphQL
query {
  items(ids: [1234567890]) {
    name
    column_values {
      ... on SubtasksValue {
        id
        display_value
        is_leaf
        subitems_ids
        subitems {
          id
          name
        }
        text
        type
        value
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
        ... on SubtasksValue {
          id
          display_value
          is_leaf
          subitems_ids
          subitems {
            id
            name
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890] };

const response = await mondayApiClient.request(query, variables);
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `SubtasksValue` implementation will return.

| Field                    | Description                                                                                                 |
| :----------------------- | :---------------------------------------------------------------------------------------------------------- |
| column `Column!`         | The column the value belongs to.                                                                            |
| display\_value `String!` | A comma-separated string of all subitem names. Returns an empty string if the item has no subitems.         |
| id `ID!`                 | The column's unique identifier.                                                                             |
| is\_leaf `Boolean!`      | Whether this item is a leaf node (has no subitems). Returns `true` for subitems and items without subitems. |
| subitems `[Item!]!`      | The item's subitems. Returns an empty array if the item has no subitems.                                    |
| subitems\_ids `[ID!]!`   | An array of subitem IDs. Returns an empty array if the item has no subitems.                                |
| text `String`            | The column's value as text. Always returns `null` for subitems columns.                                     |
| type `ColumnType!`       | The column's type (`subtasks`).                                                                             |
| value `JSON`             | The column's raw value in JSON format. Always returns `null` for subitems columns.                          |

### Example response (parent item)

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "subitems",
            "display_value": "Design mockup, Write specs, Implement feature",
            "is_leaf": false,
            "subitems_ids": ["1234567891", "1234567892", "1234567893"],
            "subitems": [
              { "id": "1234567891", "name": "Design mockup" },
              { "id": "1234567892", "name": "Write specs" },
              { "id": "1234567893", "name": "Implement feature" }
            ],
            "text": null,
            "type": "subtasks",
            "value": null
          }
        ]
      }
    ]
  }
}
```

### Example response (leaf item)

```json
{
  "data": {
    "items": [
      {
        "name": "Design mockup",
        "column_values": [
          {
            "id": "subitems",
            "display_value": "",
            "is_leaf": true,
            "subitems_ids": [],
            "subitems": [],
            "text": null,
            "type": "subtasks",
            "value": null
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `subitems` field on `SubtasksValue` returns full `Item` objects, so you can query any item field (column values, groups, etc.) on each subitem within the same request.
</Callout>

### Querying subitems directly

You can also access subitems through the `subitems` field on the `Item` type, without using the subitems column value:

```graphql GraphQL
query {
  items(ids: [1234567890]) {
    name
    subitems {
      id
      name
      column_values {
        id
        text
      }
    }
  }
}
```

***

# Filter

You can filter items by whether they have subitems using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object.

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
        `is_empty`
      </td>

      <td>
        `[]`
      </td>

      <td>
        Returns items that have no subitems.
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
        Returns items that have at least one subitem.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter for items with subitems

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "subitems"
            compare_value: []
            operator: is_not_empty
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

### Filter for items without subitems

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "subitems"
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

The subitems column is read-only — you cannot set or clear its value directly. Instead, use the following mutations to manage subitems:

## Create column

**Required scope: `boards:write`**

You can create a subitems column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. There is no typed `create_subtasks_column` mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Subitems"
    column_type: subtasks
  ) {
    id
    title
    type
  }
}
```

<Callout icon="🚧" theme="warn">
  Each board can only have one subitems column. Attempting to create a second one will return an error.
</Callout>

## Create a subitem

**Required scope: `boards:write`**

Use the [`create_subitem`](https://developer.monday.com/api-reference/reference/subitems#create-subitem) mutation to add a subitem under a parent item. The subitem will automatically appear in the parent's subitems column.

```graphql GraphQL
mutation {
  create_subitem(
    parent_item_id: 1234567890
    item_name: "Design mockup"
  ) {
    id
    name
    board {
      id
    }
  }
}
```
```javascript JavaScript
const query = `
  mutation ($parentItemId: ID!, $itemName: String!) {
    create_subitem(
      parent_item_id: $parentItemId
      item_name: $itemName
    ) {
      id
      name
    }
  }
`;

const variables = {
  parentItemId: 1234567890,
  itemName: "Design mockup"
};

const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument                    | Type      | Description                                                                                       |
| :-------------------------- | :-------- | :------------------------------------------------------------------------------------------------ |
| parent\_item\_id            | `ID!`     | The parent item's unique identifier.                                                              |
| item\_name                  | `String!` | The new subitem's name.                                                                           |
| column\_values              | `JSON`    | Column values for the new subitem as a JSON string.                                               |
| create\_labels\_if\_missing | `Boolean` | Create status/dropdown labels if they don't exist. Requires permission to change board structure. |

### Create a subitem with column values

```graphql GraphQL
mutation {
  create_subitem(
    parent_item_id: 1234567890
    item_name: "Implement login flow"
    column_values: "{\"status\": {\"label\": \"Working on it\"}, \"person\": {\"personsAndTeams\": [{\"id\": 9876543, \"kind\": \"person\"}]}}"
  ) {
    id
    name
  }
}
```

## Delete a subitem

**Required scope: `boards:write`**

Use the [`delete_item`](https://developer.monday.com/api-reference/reference/items#delete-item) mutation to remove a subitem. This also removes it from the parent's subitems column.

```graphql GraphQL
mutation {
  delete_item(item_id: 9876543210) {
    id
  }
}
```

<Callout icon="📘" theme="info">
  You cannot update the subitems column value directly using `change_simple_column_value` or `change_multiple_column_values`. The API will return an error if you attempt to write to this column.
</Callout>

***

# Reading column configuration

You can query the subitems column's settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["subitems"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                  | Type       | Description                                             |
| :------------------- | :--------- | :------------------------------------------------------ |
| `allowMultipleItems` | `boolean`  | Whether the column allows multiple subitems.            |
| `itemTypeName`       | `string`   | The internal type name for subitems in this column.     |
| `displayType`        | `string`   | How subitems are displayed. Typically `"BOARD_INLINE"`. |
| `boardIds`           | `number[]` | The board IDs associated with the subitems.             |

### Example `settings` response

```json
{
  "allowMultipleItems": true,
  "itemTypeName": "column.subtasks.title",
  "displayType": "BOARD_INLINE",
  "boardIds": [1234567890]
}
```

***

# Get column type schema

You can retrieve the JSON schema for the subitems column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: subtasks
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
            "properties": {},
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

The subitems column has no configurable settings via the schema. The column's behavior is managed through the board's structure and the subitem mutations.

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
