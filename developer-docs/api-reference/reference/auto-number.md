---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Auto Number

Learn how to create and configure the auto number column using the platform API

The [auto number column](https://support.monday.com/hc/en-us/articles/360001017529-The-Auto-Number-column-) displays a sequential number for each item in a group or board. It's commonly used to track item count and order. The numbers are auto-calculated on the client side and cannot be manually set.

Via the API, the auto number column supports create column and read settings operations only. Values cannot be read, filtered, updated, or cleared because they are computed client-side.

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
        `auto_number`
      </td>

      <td style={{ textAlign: "left" }}>
        —
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **No**
        * Filter: **No**
        * Create column: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  Auto number values are calculated on the client side. There is no `AutoNumberValue` GraphQL type, so the column does not appear in `column_values` query results.
</Callout>

***

# Queries

Auto number column values are **not available** through the API. Querying `column_values` on an item will not return entries for auto number columns — the column is excluded from the response entirely.

This applies to both direct column ID filtering and unfiltered `column_values` queries.

***

# Filter

Filtering by auto number column values is **not supported**. Using an auto number column ID in `items_page` filter rules will return no results.

***

# Mutations

## Create column

**Required scope: `boards:write`**

You can create an auto number column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column) mutation. Pass configuration options in the `defaults` argument as a JSON string.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Task Number"
    column_type: auto_number
    defaults: "{\"settings\":{\"scope\":\"board\",\"prefix\":\"TASK-\",\"order\":\"ascending\",\"font\":\"bold\",\"color\":\"#e2445c\"}}"
  ) {
    id
    title
    settings
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $title: String!, $defaults: JSON) {
    create_column(
      board_id: $boardId
      title: $title
      column_type: auto_number
      defaults: $defaults
    ) {
      id
      title
      settings
    }
  }
`;

const variables = {
  boardId: "1234567890",
  title: "Task Number",
  defaults: JSON.stringify({
    settings: {
      scope: "board",
      prefix: "TASK-",
      order: "ascending",
      font: "bold",
      color: "#e2445c"
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Settings

| Setting  | Type     | Required | Description                                                                                                                 |
| :------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `scope`  | `String` | No       | The numbering scope. `"group"` numbers items within each group separately. `"board"` numbers items across the entire board. |
| `prefix` | `String` | No       | Text displayed before the number (e.g., `"TASK-"` produces "TASK-1", "TASK-2").                                             |
| `order`  | `String` | No       | The numbering direction. `"ascending"` (1, 2, 3...) or `"descending"` (N, N-1, N-2...).                                     |
| `font`   | `String` | No       | The font weight for the displayed number. `"regular"` or `"bold"`.                                                          |
| `color`  | `String` | No       | Hex color code for the number display (e.g., `"#e2445c"`). Must be exactly 7 characters.                                    |

### Example response

```json
{
  "data": {
    "create_column": {
      "id": "autonumber_mm1nn162",
      "title": "Task Number",
      "settings": {"scope": "board", "prefix": "TASK-", "order": "ascending", "font": "bold", "color": "#e2445c"}
    }
  }
}
```

## Update value

Updating auto number values is **not supported**. The column is auto-calculated on the client side.

Attempting to update via `change_simple_column_value` returns:

```
column type AutonumberColumn is not supporting changing the column value with simple column value
```

Attempting to update via `change_multiple_column_values` returns:

```
This column type can not be updated or created (client side auto calculated column)
```

## Clear

Clearing auto number values is **not supported**. The values are automatically calculated and cannot be manually modified.

***

# Reading column configuration

You can query an auto number column's settings through the column's `settings` field. For columns created with default settings, `settings` returns an empty object (`{}`). For columns created with custom configuration, it returns the configured settings.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["auto_number_column_id"]) {
      id
      title
      type
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object that may contain these keys:

| Key      | Type     | Description                                                                                   |
| :------- | :------- | :-------------------------------------------------------------------------------------------- |
| `scope`  | `string` | `"group"` or `"board"`. Determines whether numbering is per-group or across the entire board. |
| `prefix` | `string` | Text prefix displayed before the number.                                                      |
| `order`  | `string` | `"ascending"` or `"descending"`. The numbering direction.                                     |
| `font`   | `string` | `"regular"` or `"bold"`. The font weight of the displayed number.                             |
| `color`  | `string` | Hex color code for the number display.                                                        |

### Example `settings` response

Default settings (no configuration):

```json
{}
```

Custom configuration:

```json
{
  "scope": "board",
  "prefix": "TASK-",
  "order": "ascending",
  "font": "bold",
  "color": "#e2445c"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the auto number column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: auto_number
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
              "scope": {
                "type": "string",
                "description": "Scope for auto number calculation",
                "enum": [
                  "group",
                  "board"
                ]
              },
              "color": {
                "type": "string",
                "description": "Hex color code for the auto number display (e.g., #e2445c)",
                "minLength": 7,
                "maxLength": 7
              },
              "font": {
                "type": "string",
                "description": "Font weight for the auto number",
                "enum": [
                  "regular",
                  "bold"
                ]
              },
              "order": {
                "type": "string",
                "description": "Order direction for numbering",
                "enum": [
                  "ascending",
                  "descending"
                ]
              },
              "prefix": {
                "type": "string",
                "description": "Prefix text to display before the auto number"
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
