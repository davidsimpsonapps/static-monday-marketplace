---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Dependency

Learn how to filter, read, update, and clear the dependency column on monday boards using the platform API

The [dependency column](https://support.monday.com/hc/en-us/articles/360007402599-How-to-Set-Dependencies-on-monday-com) allows you to set up item-to-item dependencies within the same board. These dependencies can be visualized in Gantt views, used in automations, and combined with timeline and date logic.

Via the API, the dependency column supports read, filter, update, and clear operations.

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
        `dependency`
      </td>

      <td style={{ textAlign: "left" }}>
        `DependencyValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Update: **Yes**
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Dependency columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `DependencyValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values(types: dependency) {
      ... on DependencyValue {
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
  query ($itemIds: [ID!], $columnType: [ColumnType!]) {
    items(ids: $itemIds) {
      name
      column_values(types: $columnType) {
        ... on DependencyValue {
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

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "dependency",
};

const response = await mondayApiClient.request(query, variables);
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `DependencyValue` implementation will return.

| Field                                                                                  | Description                                                                                                  |
| :------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns)       | The column the value belongs to.                                                                             |
| display\_value `String!`                                                               | The names of dependent items, separated by commas. Returns an empty string if no dependencies are set.       |
| id `ID!`                                                                               | The dependency column's unique identifier.                                                                   |
| is\_leaf `Boolean!`                                                                    | Whether the item has no subitems.                                                                            |
| linked\_item\_ids `[ID!]!`                                                             | The unique identifiers of the items this item depends on. Returns an empty array if no dependencies are set. |
| linked\_items [`[Item!]!`](https://developer.monday.com/api-reference/reference/items) | The dependent items. Returns an empty array if no dependencies are set.                                      |
| text `String`                                                                          | Always returns `null`. Use `display_value` instead.                                                          |
| type `ColumnType!`                                                                     | The column's type (`dependency`).                                                                            |
| updated\_at `Date`                                                                     | The column's last updated date. Returns `null` if the value has never been set.                              |
| value `JSON`                                                                           | Always returns `null`. Use `linked_items` and `linked_item_ids` instead.                                     |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Launch website",
        "column_values": [
          {
            "id": "dependent_on",
            "display_value": "Design review, Content approval",
            "linked_item_ids": ["1234567891", "1234567892"],
            "linked_items": [
              { "id": "1234567891", "name": "Design review" },
              { "id": "1234567892", "name": "Content approval" }
            ],
            "updated_at": "2026-03-20T12:00:00+00:00"
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `text` and `value` fields always return `null` for dependency columns. Use `linked_item_ids` or `linked_items` to access the dependency data, and `display_value` for a human-readable summary.
</Callout>

<Callout icon="🚧" theme="warn">
  The **dependency relationship type** (Finish-to-start, Start-to-start, Finish-to-finish, Start-to-finish) is configurable per dependency in the monday.com UI but is **not currently exposed** by the API. `DependencyValue` only returns which items are linked — not the relationship type between them.
</Callout>

***

# Filter

You can filter items by dependency values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The dependency column supports the following operators:

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
        An array of item IDs (e.g., `[1234567890]`)
      </td>

      <td>
        Returns items that depend on any of the specified items.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of item IDs (e.g., `[1234567890]`)
      </td>

      <td>
        Returns items that do not depend on any of the specified items.
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
        Returns items with no dependencies set.
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
        Returns items that have at least one dependency set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by dependent item ID

This example returns all items that depend on item `9876543210`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dependent_on"
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
```javascript JavaScript
const query = `
  query ($boardId: [ID!], $columnId: ID!, $operator: ItemsQueryRuleOperator!, $compareValue: CompareValue!) {
    boards(ids: $boardId) {
      items_page(
        query_params: {
          rules: [
            { column_id: $columnId, compare_value: $compareValue, operator: $operator }
          ]
        }
      ) {
        items { id name }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "dependent_on",
  compareValue: [9876543210],
  operator: "any_of",
};

const response = await mondayApiClient.request(query, variables);
```

### Exclude items by dependency

This example returns all items that do **not** depend on item `9876543210`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dependent_on"
            compare_value: [9876543210]
            operator: not_any_of
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

### Filter for items with dependencies

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dependent_on"
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

***

# Mutations

## Update

You can update a dependency column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object in `column_values`.

Inside the object, provide an `item_ids` array containing the IDs of the items this item depends on (as strings).

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation is not supported for dependency columns. You must use `change_multiple_column_values`.
</Callout>

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dependent_on\": {\"item_ids\": [\"1234567891\", \"1234567892\"]}}"
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
    dependent_on: {
      item_ids: ["1234567891", "1234567892"]
    }
  }),
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  Updating a dependency column replaces the entire list of dependencies. To add a new dependency without removing existing ones, first query the current `linked_item_ids`, append the new ID, then send the full list.
</Callout>

## Set on item creation

You can set dependency values when creating an item by passing the dependency column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"dependent_on\": {\"item_ids\": [\"9876543210\"]}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a dependency column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` or an empty object `{}` in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dependent_on\": null}"
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
    dependent_on: null
  }),
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To understand a dependency column's settings, you can query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["dependent_on"]) {
      id
      title
      type
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                  | Type       | Description                                                                                                                                                                         |
| :------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boardIds`           | `number[]` | Array of board IDs the dependency column references. Typically contains the current board's ID.                                                                                     |
| `dependencyNewInfra` | `boolean`  | Whether the column uses the new dependency infrastructure.                                                                                                                          |
| `allowMultipleItems` | `boolean`  | Whether the column allows multiple dependent items.                                                                                                                                 |
| `dependency_mode`    | `string`   | Controls how linked date or timeline columns respond when dependencies change. One of: `flexible`, `strict`, or `no_action`. See [Dependency modes](#dependency-modes) for details. |

### Example `settings` response

```json
{
  "boardIds": [1234567890],
  "dependencyNewInfra": true,
  "allowMultipleItems": true,
  "dependency_mode": "flexible"
}
```

### Dependency modes

The `dependency_mode` setting determines how the column interacts with a linked **Date** or **Timeline** column on the same board when a dependency is marked as done.

| Mode        | Description                                                                                                                                                |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flexible`  | The linked date or timeline shifts automatically, but allows some overlap between the predecessor and successor item.                                      |
| `strict`    | The linked date or timeline shifts automatically and enforces strict sequencing — the dependent item cannot start until its predecessor is fully complete. |
| `no_action` | No automatic adjustment is made to dates or timelines when a dependency changes state.                                                                     |

<Callout icon="📘" theme="info">
  The `dependency_mode` only has an effect when the board contains a **Date** or **Timeline** column. Boards without either column behave as if the mode is `no_action` regardless of the setting.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the dependency column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: dependency
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
              "boardIds": {
                "type": "array",
                "description": "Array of board IDs for dependencies",
                "items": {
                  "type": "integer"
                }
              },
              "dependencyNewInfra": {
                "type": "boolean",
                "description": "Whether to use new dependency infrastructure"
              },
              "allowMultipleItems": {
                "type": "boolean",
                "description": "Whether to allow multiple items"
              },
              "boardId": {
                "type": "integer",
                "description": "Primary board ID for the dependency"
              },
              "dependency_mode": {
                "type": "string",
                "enum": ["flexible", "strict", "no_action"],
                "description": "Controls automatic date/timeline adjustments when dependencies change"
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
