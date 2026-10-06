---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Mirror

Learn how to read and create mirror columns on monday boards using the platform API

The [mirror column](https://support.monday.com/hc/en-us/articles/360001733859-The-Mirror-Column) displays values from another board through a linked item. This allows users to surface data from connected boards without duplication, making it easy to see relevant information across multiple boards in one view.

Via the API, the mirror column supports read and create operations. Mirror column values cannot be updated or cleared directly — they reflect the source column's value on the connected board. Filtering mirrored content is not supported.

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
        `mirror`
      </td>

      <td style={{ textAlign: "left" }}>
        `MirrorValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **No**
        * Create: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Mirror columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `MirrorValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on MirrorValue {
        id
        display_value
        mirrored_items {
          linked_item {
            id
            name
          }
          mirrored_value {
            ... on StatusValue {
              label
              index
            }
            ... on TextValue {
              text
            }
          }
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
      name
      column_values {
        ... on MirrorValue {
          id
          display_value
          mirrored_items {
            linked_item {
              id
              name
            }
            mirrored_value {
              ... on StatusValue {
                label
              }
              ... on TextValue {
                text
              }
            }
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  Use `display_value` for a quick text summary of the mirrored content. Use `mirrored_items` with inline fragments on the `mirrored_value` field to access the full typed value from the source column.
</Callout>

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `MirrorValue` implementation will return.

| Field                                                                            | Description                                                                            |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                       |
| display\_value `String!`                                                         | The mirrored content as a comma-separated text string.                                 |
| id `ID!`                                                                         | The column's unique identifier.                                                        |
| mirrored\_items [`[MirroredItem!]!`](#mirroreditem)                              | The linked items and their mirrored values. See [`MirroredItem`](#mirroreditem) below. |
| text `String`                                                                    | Returns `null`. Use `display_value` instead.                                           |
| type `ColumnType!`                                                               | The column's type.                                                                     |
| value `JSON`                                                                     | Returns `null`. Use `mirrored_items` instead.                                          |

## MirroredItem

Each `MirroredItem` represents one linked item and its mirrored value.

| Field                                             | Description                                                                                                                           |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| linked\_board `Board!`                            | The board that the linked item belongs to.                                                                                            |
| linked\_board\_id `ID!`                           | The linked board's unique identifier.                                                                                                 |
| linked\_item `Item!`                              | The linked item.                                                                                                                      |
| mirrored\_value [`MirroredValue`](#mirroredvalue) | The value from the source column, returned as a union of all column value types. Use inline fragments to access type-specific fields. |

## MirroredValue

`MirroredValue` is a [union type](https://graphql.org/learn/schema/#union-types) that can resolve to any column value type (e.g., `StatusValue`, `TextValue`, `NumbersValue`). Use inline fragments to access the fields of the specific type:

```graphql GraphQL
mirrored_value {
  ... on StatusValue {
    label
    index
  }
  ... on NumbersValue {
    number
  }
  ... on DateValue {
    date
    time
  }
}
```

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "mirror",
            "display_value": "Done, Working on it",
            "mirrored_items": [
              {
                "linked_item": {
                  "id": "9876543210",
                  "name": "Linked Task 1"
                },
                "mirrored_value": {
                  "label": "Done",
                  "index": 1
                }
              },
              {
                "linked_item": {
                  "id": "9876543211",
                  "name": "Linked Task 2"
                },
                "mirrored_value": {
                  "label": "Working on it",
                  "index": 0
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

***

# Mutations

## Create

**Required scope: `boards:write`**

You can create a mirror column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with `column_type: mirror`. The `defaults` argument defines the mirror's configuration, including which connect boards column to use and which columns from the linked board to display.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Linked Status"
    column_type: mirror
    defaults: "{\"settings\": {\"relation_column\": {\"board_relation\": true}, \"displayed_linked_columns\": [{\"board_id\": \"9876543210\", \"column_ids\": [\"status\"]}]}}"
  ) {
    id
    title
    type
    settings
  }
}
```

### Configuration fields

The `defaults` JSON object accepts the following settings:

| Field                      | Type     | Description                                                                                                                                                    |
| :------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `relation_column`          | `Object` | Maps a connect boards column ID to `true`. Specifies which board relation column provides the linked items. E.g., `{"board_relation": true}`.                  |
| `displayed_linked_columns` | `Array`  | Array of objects specifying which columns to mirror from each linked board. Each object has `board_id` (string) and `column_ids` (array of column ID strings). |
| `sumType`                  | `String` | Aggregation type for status mirrors. Values: `"doneOnly"` (shows done percentage) or `"allStatuses"` (shows all status counts).                                |
| `calcType`                 | `String` | Calculation type for date mirrors. Values: `"earliestToLatest"`, `"earliest"`, or `"latest"`.                                                                  |

***

# Reading column configuration

To retrieve a mirror column's settings, query its `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["mirror"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                        | Type     | Description                                                                              |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `relation_column`          | `Object` | Maps the connect boards column ID to `true`.                                             |
| `displayed_linked_columns` | `Array`  | Array of objects with `board_id` and `column_ids` specifying which columns are mirrored. |
| `sumType`                  | `String` | The aggregation type for status mirrors (if configured).                                 |
| `calcType`                 | `String` | The calculation type for date mirrors (if configured).                                   |

### Example `settings` response

```json
{
  "relation_column": {
    "board_relation": true
  },
  "displayed_linked_columns": [
    {
      "board_id": "9876543210",
      "column_ids": ["status", "date"]
    }
  ]
}
```

***

# Get column type schema

You can retrieve the JSON schema for the mirror column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: mirror
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
              "relation_column": {
                "type": "object",
                "description": "Map of relation-column ID to a boolean flag",
                "additionalProperties": {
                  "type": "boolean"
                }
              },
              "displayed_linked_columns": {
                "type": "array",
                "description": "Array of entries mapping a linked board to the columns to display",
                "items": {
                  "type": "object",
                  "properties": {
                    "board_id": { "type": "string" },
                    "column_ids": {
                      "type": "array",
                      "items": { "type": "string" }
                    }
                  },
                  "required": ["board_id", "column_ids"],
                  "additionalProperties": false
                }
              },
              "sumType": {
                "type": "string",
                "description": "Aggregation type for status summaries",
                "enum": ["doneOnly", "allStatuses"]
              },
              "calcType": {
                "type": "string",
                "description": "Calculation type for linked date aggregation",
                "enum": ["earliestToLatest", "earliest", "latest"]
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
