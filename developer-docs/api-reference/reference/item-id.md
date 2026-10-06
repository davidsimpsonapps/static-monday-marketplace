---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Item ID

Learn how to filter by and read the item ID column on monday boards using the platform API

The [item ID column](https://support.monday.com/hc/en-us/articles/360001263345-The-Item-ID-Column) displays the unique identifier assigned to each item. The column can show either the raw numeric item ID or a custom key format with a configurable prefix and zero-padding.

Via the API, the item ID column supports read and filter operations. It does not support update or clear operations because the value is automatically generated and managed by the system. You can also read an item's ID directly by querying `id` on any field that returns an [`items`](https://developer.monday.com/api-reference/reference/items) type.

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
        `item_id`
      </td>

      <td style={{ textAlign: "left" }}>
        `ItemIdValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **No**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Item ID columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `ItemIdValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on ItemIdValue {
        id
        item_id
        text
        value
        is_leaf
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
        column { title id }
        ... on ItemIdValue {
          item_id
          text
          is_leaf
        }
      }
    }
  }
`;

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "item_id"
};

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `ItemIdValue` implementation will return.

| Field               | Description                                                                                   |
| :------------------ | :-------------------------------------------------------------------------------------------- |
| column `Column!`    | The column the value belongs to.                                                              |
| id `ID!`            | The column's unique identifier.                                                               |
| is\_leaf `Boolean!` | Whether the item is a leaf node (has no subitems). Returns `true` for items without subitems. |
| item\_id `ID!`      | The item's unique identifier.                                                                 |
| text `String`       | The column's value as text. Returns the item ID as a string.                                  |
| type `ColumnType!`  | The column's type (`item_id`).                                                                |
| value `JSON`        | The column's raw value as a JSON string. Returns `{"item_id": "1234567890"}`.                 |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "pulse_id",
            "item_id": "1234567890",
            "text": "1234567890",
            "value": "{\"item_id\":\"1234567890\"}",
            "is_leaf": true
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by their item ID using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object.

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
        An array of item IDs as strings (e.g., `["1234567890"]`)
      </td>

      <td>
        Returns items whose ID matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of item IDs as strings (e.g., `["1234567890"]`)
      </td>

      <td>
        Excludes items whose ID matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_terms`
      </td>

      <td>
        A string item ID value (e.g., `"1234567890"`)
      </td>

      <td>
        Returns items whose ID contains the specified text.
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
        Returns items that have an item ID value set. Since every item has an ID, this effectively returns all items.
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
        Returns items without an item ID value. Since every item has an ID, this always returns an empty result.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by specific item IDs

This example returns items matching any of the specified IDs.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "pulse_id"
            compare_value: ["9876543210", "1122334455"]
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

### Exclude specific item IDs

This example returns all items except those with the specified IDs.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "pulse_id"
            compare_value: ["9876543210"]
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

***

# Mutations

The item ID column is a read-only, auto-calculated column. It does not support update, clear, or set-on-creation operations.

Attempting to update an item ID column via `change_simple_column_value` or `change_multiple_column_values` returns an error:

<Callout icon="🚧" theme="warn">
  The item ID column value cannot be modified through the API. The value is automatically assigned when an item is created.
</Callout>

***

# Reading column configuration

To view an item ID column's configuration, query its `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["pulse_id"]) {
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

| Key                 | Type     | Description                                                                                   |
| :------------------ | :------- | :-------------------------------------------------------------------------------------------- |
| `copyValueSetting`  | `string` | How to copy the value: `"text"` (plain ID) or `"link"` (link to the item).                    |
| `displayType`       | `string` | Display type: `"pulseId"` (raw numeric ID) or `"customKey"` (prefixed key).                   |
| `customKeySettings` | `object` | Settings for the custom key display type. Contains `prefix` (string) and `padding` (integer). |

### Example: Default settings

For a standard item ID column, `settings` returns an empty object:

```json
{}
```

### Example: Custom key settings

For a column configured with a custom key format:

```json
{
  "displayType": "customKey",
  "customKeySettings": {
    "prefix": "PROJ-",
    "padding": 5
  }
}
```

This configuration displays item IDs as `PROJ-00001`, `PROJ-00002`, etc., in the monday.com UI. The API still returns the raw numeric ID in the `item_id` and `text` fields.

***

# Get column type schema

You can retrieve the JSON schema for the item ID column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: item_id
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
              "copyValueSetting": {
                "type": "string",
                "description": "How to copy the value (text or link)",
                "enum": [
                  "text",
                  "link"
                ]
              },
              "displayType": {
                "type": "string",
                "description": "Display type for the column value",
                "enum": [
                  "pulseId",
                  "customKey"
                ]
              },
              "customKeySettings": {
                "type": "object",
                "description": "Settings for custom key display type",
                "properties": {
                  "prefix": {
                    "type": "string",
                    "description": "Prefix for the generated key"
                  },
                  "padding": {
                    "type": "integer",
                    "description": "Minimum digits (zero padding)",
                    "minimum": 0
                  }
                },
                "additionalProperties": false
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
