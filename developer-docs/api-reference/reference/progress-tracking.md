---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Progress Tracking

Learn how to read, filter, and create the progress tracking column on monday boards using the platform API

The [progress tracking column](https://support.monday.com/hc/en-us/articles/360001150365-The-Progress-Tracking-Column) combines all status columns on a board to calculate a percentage-based progress value. The percentage reflects the proportion of status columns that are in a "done" state for each item. Each contributing status column can be weighted individually.

Via the API, the progress tracking column supports read, filter, and create operations.

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
        `progress`
      </td>

      <td style={{ textAlign: "left" }}>
        `ProgressValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The progress tracking column is a calculated column — its value is derived from the "done" state of related status columns. You cannot directly update or clear its value.
</Callout>

***

# Queries

Progress tracking columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments).

## ProgressValue

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on ProgressValue {
        id
        text
        value
        type
        is_leaf
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
        ... on ProgressValue {
          id
          text
          value
          type
          is_leaf
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `ProgressValue` implementation will return.

| Field               | Description                                                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------- |
| column `Column!`    | The column the value belongs to.                                                                                     |
| id `ID!`            | The column's unique identifier.                                                                                      |
| is\_leaf `Boolean!` | Whether this item is a leaf (has no subitems).                                                                       |
| text `String`       | The column's value as text. Returns `null` if the column has an empty value.                                         |
| type `ColumnType!`  | The column's type (`progress`).                                                                                      |
| value `JSON`        | The column's raw value as a JSON string. Returns `null` for progress tracking columns since the value is calculated. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "progress",
            "text": "",
            "value": null,
            "type": "progress",
            "is_leaf": false
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The progress tracking column's raw `value` field typically returns `null` because its percentage is calculated dynamically from the board's status columns. Use the filter operations below to query items by their progress percentage.
</Callout>

***

# Filter

You can filter items by progress tracking values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The progress tracking column supports the following operators:

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
        An array of threshold values
      </td>

      <td>
        Returns items whose progress meets or exceeds the specified threshold. Supported values: `0` (less than 20%), `"20"` (20%+), `"50"` (50%+), `"80"` (80%+), `"100"` (complete), `""` (blank).
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of threshold values
      </td>

      <td>
        Excludes items whose progress meets or exceeds the specified threshold. Uses the same threshold values as `any_of`.
      </td>
    </tr>
  </tbody>
</Table>

### Compare value reference

| Value   | Meaning                       |
| :------ | :---------------------------- |
| `0`     | Items less than 20% complete  |
| `"20"`  | Items 20% or more complete    |
| `"50"`  | Items 50% or more complete    |
| `"80"`  | Items 80% or more complete    |
| `"100"` | Items that are 100% complete  |
| `""`    | Items with blank/empty values |

## Examples

### Filter by progress threshold

This example returns all items that are 80% or more complete.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "progress"
            compare_value: ["80"]
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

### Filter for completed items

This example returns all items that are 100% complete.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "progress"
            compare_value: ["100"]
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

### Exclude high-progress items

This example returns all items that are NOT 80% or more complete.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "progress"
            compare_value: ["80"]
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

### Filter for items with no progress

This example returns all items with blank progress values (no status columns set to "done").

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "progress"
            compare_value: [""]
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

***

# Mutations

## Create

**Required scope: `boards:write`**

You can create a progress tracking column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column) mutation. The column automatically detects and includes all status columns on the board.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: progress
    title: "Project Progress"
  ) {
    id
    title
    type
    settings
  }
}
```

### Arguments

| Argument     | Type          | Description                                              |
| :----------- | :------------ | :------------------------------------------------------- |
| board\_id    | `ID!`         | The board's unique identifier.                           |
| column\_type | `ColumnType!` | Must be `progress`.                                      |
| title        | `String!`     | The column's title.                                      |
| description  | `String`      | The column's description.                                |
| defaults     | `JSON`        | Column-specific configuration settings as a JSON string. |

### Example response

```json
{
  "data": {
    "create_column": {
      "id": "columns_battery_xxxxxx",
      "title": "Project Progress",
      "type": "progress",
      "settings": {"related_columns":{"isNormalized":false,"columns":{"status":{"isSelected":true,"percentage":50},"color_1":{"isSelected":true,"percentage":50}}}}
    }
  }
}
```

<Callout icon="📘" theme="info">
  When created, the progress column automatically includes all existing status columns on the board with equal weighting. You can adjust which columns contribute and their weights through the board UI.
</Callout>

***

# Reading column configuration

To understand a progress tracking column's configuration, you can query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["progress"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                                       | Type      | Description                                                                    |
| :---------------------------------------- | :-------- | :----------------------------------------------------------------------------- |
| `related_columns`                         | `Object`  | Configuration for the status columns contributing to the progress calculation. |
| `related_columns.isNormalized`            | `Boolean` | Whether to normalize percentages across related columns.                       |
| `related_columns.columns`                 | `Object`  | Maps each status column's ID to its selection state and weight.                |
| `related_columns.columns.{id}.isSelected` | `Boolean` | Whether the column is included in the progress calculation.                    |
| `related_columns.columns.{id}.percentage` | `Integer` | Weight percentage for the column (0–100).                                      |

### Example `settings` response

```json
{
  "related_columns": {
    "isNormalized": false,
    "columns": {
      "status": {
        "isSelected": true,
        "percentage": 50
      },
      "color_1": {
        "isSelected": true,
        "percentage": 50
      }
    }
  }
}
```

<Callout icon="📘" theme="info">
  The `percentage` values represent each status column's weight in the overall progress calculation. When `isNormalized` is `false`, the percentages are distributed evenly by default. When `true`, the percentages are normalized so they always sum to 100%.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the progress tracking column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: progress
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
              "related_columns": {
                "type": "object",
                "description": "Configuration for related columns contributing to the battery",
                "properties": {
                  "isNormalized": {
                    "type": "boolean",
                    "description": "Whether to normalize percentages across related columns"
                  },
                  "columns": {
                    "type": "object",
                    "description": "Mapping of column identifier to selection and weight",
                    "additionalProperties": {
                      "type": "object",
                      "properties": {
                        "isSelected": {
                          "type": "boolean",
                          "description": "Whether the column is included in the battery calculation"
                        },
                        "percentage": {
                          "type": "integer",
                          "minimum": 0,
                          "maximum": 100,
                          "description": "Weight percentage for the column (0-100)"
                        }
                      },
                      "additionalProperties": false
                    }
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
