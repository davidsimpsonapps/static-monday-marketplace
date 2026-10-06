---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Creation Log

Learn how to read and filter the creation log column on monday boards using the platform API

The [creation log column](https://support.monday.com/hc/en-us/articles/360001140029-The-Creation-Log-Column) displays the creator and creation date for each item on a board. The column is automatically populated when an item is created and cannot be modified.

Via the API, the creation log column supports read and filter operations. You can't update or clear it programmatically because the values are system-generated.

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
        `creation_log`
      </td>

      <td style={{ textAlign: "left" }}>
        `CreationLogValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes** (column only)
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Creation log columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `CreationLogValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    column_values {
      ... on CreationLogValue {
        id
        text
        value
        created_at
        creator_id
        creator {
          id
          name
          email
        }
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      column_values {
        ... on CreationLogValue {
          id
          text
          value
          created_at
          creator_id
          creator {
            id
            name
            email
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `CreationLogValue` implementation will return.

| Field                                                                              | Description                                                                           |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#/) | The column the value belongs to.                                                      |
| created\_at `Date!`                                                                | The date and time when the item was created, in ISO 8601 format.                      |
| creator [`User!`](https://developer.monday.com/api-reference/reference/users#/)    | The user who created the item. Supports nested fields like `id`, `name`, and `email`. |
| creator\_id `ID!`                                                                  | The unique identifier of the user who created the item.                               |
| id `ID!`                                                                           | The column's unique identifier.                                                       |
| is\_leaf `Boolean!`                                                                | Whether the item has no subitems.                                                     |
| text `String`                                                                      | The column's value as human-readable text (e.g., `"2026-02-27 12:11:30 UTC"`).        |
| type `ColumnType!`                                                                 | The column's type (`creation_log`).                                                   |
| value `JSON`                                                                       | The raw JSON-formatted column value.                                                  |

### Example response

```json
{
  "data": {
    "items": [
      {
        "column_values": [
          {
            "id": "creation_log",
            "text": "2026-02-27 12:11:30 UTC",
            "value": "{\"created_at\":\"2026-02-27T12:11:30Z\",\"creator_id\":\"48202303\"}",
            "created_at": "2026-02-27T12:11:30Z",
            "creator_id": "48202303",
            "creator": {
              "id": "48202303",
              "name": "John Doe",
              "email": "john@example.com"
            }
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `value` field returns a JSON string with `created_at` (ISO 8601 timestamp) and `creator_id` (user ID as a string). The `text` field returns a human-readable format: `"YYYY-MM-DD HH:MM:SS UTC"`.
</Callout>

***

# Filter

You can filter items by creation log values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The creation log column supports filtering by creator and by creation date range.

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
        Compare Attribute
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `any_of`
      </td>

      <td>
        An array of user IDs (e.g., `[123456]`)
      </td>

      <td>
        `"CREATED_BY"`
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of user IDs to exclude (e.g., `[123456]`)
      </td>

      <td>
        `"CREATED_BY"`
      </td>
    </tr>

    <tr>
      <td>
        `between`
      </td>

      <td>
        An array with two dates: `["YYYY-MM-DD", "YYYY-MM-DD"]`
      </td>

      <td>
        `"CREATED_AT"`
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by creator

The following query returns all items created by user `123456`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "creation_log"
            compare_value: [123456]
            compare_attribute: "CREATED_BY"
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
  query ($boardId: [ID!], $columnId: ID!, $operator: ItemsQueryRuleOperator!, $compareValue: CompareValue!, $compareAttribute: String!) {
    boards(ids: $boardId) {
      items_page(
        query_params: {
          rules: [
            {
              column_id: $columnId,
              compare_value: $compareValue,
              compare_attribute: $compareAttribute,
              operator: $operator
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
`;

const variables = {
  boardId: 1234567890,
  columnId: "creation_log",
  compareValue: [123456],
  compareAttribute: "CREATED_BY",
  operator: "any_of",
};

const response = await mondayApiClient.request(query, variables);
```

### Exclude specific creators

The following query returns items **not** created by user `123456`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "creation_log"
            compare_value: [123456]
            compare_attribute: "CREATED_BY"
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

### Filter by creation date range

The following query returns all items created between January 1 and March 31, 2026.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "creation_log"
            compare_value: ["2026-01-01", "2026-03-31"]
            compare_attribute: "CREATED_AT"
            operator: between
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

## Create column

**Required scope: `boards:write`**

You can create a creation log column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. Creation log columns are read-only — values are automatically populated by the system when items are created.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Created"
    column_type: creation_log
  ) {
    id
    title
    type
    settings
  }
}
```

<Callout icon="📘" theme="info">
  You can optionally pass a `defaults` JSON string to set the column's display mode (e.g., `"{\"mode\":\"dateOnly\"}"`). See [Reading column configuration](#reading-column-configuration) for available modes.
</Callout>

## Update and clear

The creation log column is a system-generated, read-only column. You **cannot** update or clear its value using `change_simple_column_value` or `change_multiple_column_values`.

Attempting to update returns an error:

* `change_simple_column_value`: *"column type PulseLogColumn is not supporting changing the column value with simple column value"*
* `change_multiple_column_values`: *"This column type can not be updated or created (client side auto calculated column)"*

***

# Reading column configuration

You can query the creation log column's settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["creation_log"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key    | Type     | Description                                                                                 |
| :----- | :------- | :------------------------------------------------------------------------------------------ |
| `mode` | `string` | The display mode for the column. One of `"personOnly"`, `"dateOnly"`, or `"personAndDate"`. |

<Callout icon="📘" theme="info">
  The display mode controls what the column shows in the board UI. `"personAndDate"` shows both the creator's avatar and the creation date, `"personOnly"` shows only the creator, and `"dateOnly"` shows only the date. The API always returns all fields (`created_at`, `creator`, `creator_id`) regardless of the display mode.
</Callout>

### Example `settings` response

```json
{
  "mode": "personAndDate"
}
```

<Callout icon="📘" theme="info">
  If no custom mode has been set, `settings` returns `{}`. The default display mode is `personAndDate`.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the creation log column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: creation_log
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
              "mode": {
                "type": "string",
                "description": "Display mode for the pulse log",
                "enum": [
                  "personOnly",
                  "dateOnly",
                  "personAndDate"
                ]
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
