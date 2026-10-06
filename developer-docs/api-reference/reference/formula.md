---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Formula

Learn how to read and create the formula column on monday boards using the platform API

The [formula column](https://support.monday.com/hc/en-us/articles/360001235445-The-Formula-Column) calculates values using mathematical expressions, text functions, and references to other columns. Formulas are computed server-side and cannot be written via the API.

Via the API, the formula column supports read and create operations.

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
        `formula`
      </td>

      <td style={{ textAlign: "left" }}>
        `FormulaValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **No**
        * Create: **Yes** (generic)
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Formula columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `FormulaValue`.

The computed result is returned in the `display_value` field. The `text` and `value` fields are not populated for formula columns.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on FormulaValue {
        id
        display_value
        type
        column {
          title
        }
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!], $columnType: [ColumnType!]) {
    items(ids: $itemIds) {
      id
      name
      column_values(types: $columnType) {
        column { title id }
        ... on FormulaValue {
          display_value
        }
      }
    }
  }
`;

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "formula"
};

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `FormulaValue` implementation will return.

| Field                    | Description                                                                                                                         |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| column `Column!`         | The column the value belongs to.                                                                                                    |
| display\_value `String!` | The formula column's computed result. This is the primary field for reading formula values. Subject to [rate limits](#rate-limits). |
| id `ID!`                 | The column's unique identifier.                                                                                                     |
| text `String`            | Returns an empty string for formula columns. Use `display_value` instead.                                                           |
| type `ColumnType!`       | The column's type (`formula`).                                                                                                      |
| value `JSON`             | Returns `null` for formula columns. Use `display_value` instead.                                                                    |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "formula_mkl3sp",
            "display_value": "10",
            "type": "formula",
            "column": {
              "title": "Numbers + 5"
            }
          }
        ]
      }
    ]
  }
}
```

## Rate limits

The `display_value` field for formula columns is subject to the following [limits](https://developer.monday.com/api-reference/docs/rate-limits#limits):

* Up to 10,000 formula values per minute
* Maximum of 5 formula columns in one request
* Does not support formulas that reference mirror or connect boards columns

<Callout icon="📘" theme="info">
  If you exceed these limits, `display_value` may return an empty string or an error. Consider caching results or batching requests to stay within the limits.
</Callout>

***

# Filter

Formula columns **do not support filtering** via [`items_page`](https://developer.monday.com/api-reference/docs/items_page). Attempting to filter by a formula column returns an invalid rule error.

To filter by formula results, query the `display_value` for all items and filter client-side, or use a different column that stores the value you need to filter by.

***

# Mutations

## Create

**Required scope: `boards:write`**

There is no typed `create_formula_column` mutation. Use the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with `column_type: formula` and pass the formula expression in the `defaults` argument.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Total Cost"
    column_type: formula
    defaults: "{\"settings\":{\"formula\":\"{numbers_col} * {rate_col}\"}}"
  ) {
    id
    title
    type
    settings
  }
}
```

### Arguments

| Argument          | Type          | Description                                                                             |
| :---------------- | :------------ | :-------------------------------------------------------------------------------------- |
| board\_id         | `ID!`         | The board's unique identifier.                                                          |
| title             | `String!`     | The column's title.                                                                     |
| column\_type      | `ColumnType!` | Must be `formula`.                                                                      |
| defaults          | `JSON`        | A JSON string containing the formula settings. See [defaults format](#defaults-format). |
| description       | `String`      | The column's description.                                                               |
| after\_column\_id | `ID`          | The ID of the column to insert the new column after.                                    |
| id                | `String`      | A custom column ID. If not provided, one is auto-generated.                             |

### Defaults format

The `defaults` argument accepts a JSON string with the following structure:

```json
{
  "settings": {
    "formula": "{column_id_1} + {column_id_2}"
  }
}
```

The `formula` field contains the formula expression. Reference other columns using their column ID wrapped in curly braces (e.g., `{numeric_col}`). You can use standard formula functions like `IF`, `CONCATENATE`, `SUM`, etc.

<Callout icon="🚧" theme="warn">
  If you omit the `defaults` argument or pass an empty formula, the column is created without a formula expression. You'll need to configure it manually in the monday.com UI.
</Callout>

### Example response

```json
{
  "data": {
    "create_column": {
      "id": "formula_mkl3sp",
      "title": "Total Cost",
      "type": "formula",
      "settings": {"formula": "{numbers_col} * {rate_col}"}
    }
  }
}
```

## Update value

Formula columns **cannot be updated** via the API. The formula result is computed automatically from the referenced column values.

Attempting to update a formula column returns an error:

* `change_simple_column_value`: *"column type FormulaColumn is not supporting changing the column value with simple column value"*
* `change_multiple_column_values`: *"This column type can not be updated or created (client side auto calculated column)"*

To change a formula's result, update the source columns that the formula references.

## Clear

Formula columns **cannot be cleared** via the API. To reset a formula's computed value, clear the source columns it references.

***

# Reading column configuration

You can query a formula column's configuration through the column's `settings` field to inspect the formula expression.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["formula_mkl3sp"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type      | Description                                                                                                   |
| :------------ | :-------- | :------------------------------------------------------------------------------------------------------------ |
| `formula`     | `string`  | The formula expression. References other columns using their IDs in curly braces (e.g., `{numeric_col} + 5`). |
| `hide_footer` | `boolean` | Whether the footer summary is hidden. Only present if explicitly set.                                         |

### Example `settings` response

```json
{
  "formula": "{numeric_mkl3sp} + 5"
}
```

<Callout icon="📘" theme="info">
  The formula expression uses column IDs (not titles) to reference other columns. If a referenced column is deleted, the formula may return an empty result.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the formula column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: formula
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
              "formula": {
                "type": "string",
                "description": "Formula expression"
              },
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              }
            },
            "additionalProperties": false,
            "required": [
              "formula"
            ]
          }
        }
      }
    }
  }
}
```

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
