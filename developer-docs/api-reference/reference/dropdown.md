---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Dropdown

Learn how to filter, read, create, update, and clear the dropdown column on monday boards using the platform API

The [dropdown column](https://support.monday.com/hc/en-us/articles/360004162179-The-Dropdown-Column) lets users select one or more options from a predefined list. It's commonly used for categorization, tagging, and multi-select workflows.

Via the API, the dropdown column supports read, filter, create, update, and clear operations.

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
        `dropdown`
      </td>

      <td style={{ textAlign: "left" }}>
        `DropdownValue`
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

Dropdown columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `DropdownValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on DropdownValue {
        id
        text
        value
        values {
          id
          label
        }
        column {
          id
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
      name
      column_values(types: $columnType) {
        ... on DropdownValue {
          id
          text
          value
          values {
            id
            label
          }
          column {
            id
            title
          }
        }
      }
    }
  }
`;

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "dropdown",
};

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `DropdownValue` implementation will return.

| Field                                                                             | Description                                                                                                     |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#) | The column the value belongs to.                                                                                |
| id `ID!`                                                                          | The dropdown column's unique identifier.                                                                        |
| text `String`                                                                     | The column's value as text (comma-separated labels). Returns `null` if the column has an empty value.           |
| type `ColumnType!`                                                                | The column's type (`dropdown`).                                                                                 |
| value `JSON`                                                                      | The column's raw value as a JSON string. Returns `{"ids": [1, 3]}` where the array contains selected label IDs. |
| values [`[DropdownValueOption!]!`](#dropdownvalueoption)                          | The selected dropdown options for this item. Each option has `id` and `label` fields.                           |

### `DropdownValueOption`

Each selected option in the `values` array contains:

| Field           | Description                              |
| :-------------- | :--------------------------------------- |
| id `ID!`        | The dropdown option's unique identifier. |
| label `String!` | The dropdown option's display text.      |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "dropdown",
            "text": "Marketing, Design",
            "value": "{\"ids\":[1,3]}",
            "values": [
              { "id": "1", "label": "Marketing" },
              { "id": "3", "label": "Design" }
            ],
            "column": {
              "id": "dropdown",
              "title": "Category"
            }
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by dropdown values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The dropdown column supports the following operators:

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
        An array of dropdown label IDs (e.g., `[1, 2]`)
      </td>

      <td>
        Returns items with any of the specified dropdown labels selected. Use label IDs from the column's settings.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of dropdown label IDs (e.g., `[1, 2]`)
      </td>

      <td>
        Excludes items with any of the specified dropdown labels selected.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        Partial or full label text as a string (e.g., `"Marketing"`)
      </td>

      <td>
        Returns items whose dropdown labels contain the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        Partial or full label text as a string (e.g., `"Sales"`)
      </td>

      <td>
        Excludes items whose dropdown labels contain the specified text.
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
        Returns items with no dropdown labels selected.
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
        Returns items with at least one dropdown label selected.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by label ID

This example returns all items with dropdown label ID `1` selected.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dropdown"
            compare_value: [1]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on DropdownValue {
            values {
              id
              label
            }
          }
        }
      }
    }
  }
}
```

### Filter by label text

This example returns all items whose dropdown labels contain the text "Marketing".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dropdown"
            compare_value: ["Marketing"]
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
  columnId: "dropdown",
  compareValue: ["Marketing"],
  operator: "contains_text",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by empty dropdown

This example returns all items with no dropdown labels selected.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dropdown"
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

The [`create_dropdown_column`](https://developer.monday.com/api-reference/reference/columns#create-dropdown-column) mutation creates a new dropdown column with strongly typed settings. You can specify which [fields](https://developer.monday.com/api-reference/docs/columns#fields) to return in the mutation response.

```graphql GraphQL
mutation {
  create_dropdown_column(
    board_id: 1234567890
    id: "project_category"
    title: "Project Category"
    defaults: {
      labels: [
        { label: "Marketing" }
        { label: "Engineering" }
        { label: "Design" }
        { label: "Sales" }
        { label: "HR" }
      ]
      limit_select: true
      label_limit_count: 2
    }
    description: "The project's category."
  ) {
    id
    title
    description
    settings
  }
}
```

### Arguments

| Argument                                     | Type      | Description                                                       |
| :------------------------------------------- | :-------- | :---------------------------------------------------------------- |
| board\_id                                    | `ID!`     | The board's unique identifier.                                    |
| id                                           | `String`  | A custom column ID. If not provided, one is auto-generated.       |
| title                                        | `String!` | The column's title.                                               |
| description                                  | `String`  | The column's description.                                         |
| after\_column\_id                            | `ID`      | The ID of the column to insert the new column after.              |
| defaults `CreateDropdownColumnSettingsInput` | `Object`  | The column's label and selection configuration. See fields below. |

### Settings input fields (`CreateDropdownColumnSettingsInput`)

| Field               | Type                           | Required | Description                                                                   |
| :------------------ | :----------------------------- | :------- | :---------------------------------------------------------------------------- |
| labels              | `[CreateDropdownLabelInput!]!` | Yes      | Array of label objects. Each must have a `label` (string) field.              |
| limit\_select       | `Boolean`                      | No       | Whether to limit selection to a fixed number of labels.                       |
| label\_limit\_count | `Int`                          | No       | Maximum number of labels that can be selected when `limit_select` is enabled. |

## Update column settings

**Required scope: `boards:write`**

The `update_dropdown_column` mutation updates an existing dropdown column's settings, including its title, description, label configuration, and selection limits.

<Callout icon="🚧" theme="warn">
  The `revision` argument is required. You can obtain the current revision from the column's `revision` field or by querying the column. This prevents concurrent edits from overwriting each other.
</Callout>

<Callout icon="🚧" theme="warn">
  The `labels` array replaces the column's full label list, so any existing label you omit is treated as a deletion. To avoid unintended removals, include all current labels in your request (retrievable from the column's `settings` field) and apply your changes only to the relevant entries.

  To protect against accidental data loss, a single request can delete at most one label and can't add and remove labels in the same call. To hide a label without deleting it, set `is_deactivated: true` instead of omitting it.
</Callout>

```graphql GraphQL
mutation {
  update_dropdown_column(
    board_id: 1234567890
    id: "dropdown"
    revision: "replace_with_current_revision"
    title: "Project Category"
    settings: {
      labels: [
        { id: 1, label: "Marketing" }
        { id: 2, label: "Engineering" }
        { id: 3, label: "Design" }
        { id: 4, label: "Sales" }
        { id: 5, label: "HR" }
        { id: 6, label: "Old Label", is_deactivated: true }
      ]
      limit_select: true
      label_limit_count: 3
    }
  ) {
    id
    title
    settings
  }
}
```

### Arguments

| Argument                                     | Type      | Required | Description                                             |
| :------------------------------------------- | :-------- | :------- | :------------------------------------------------------ |
| board\_id                                    | `ID!`     | Yes      | The board's unique identifier.                          |
| id                                           | `String!` | Yes      | The column's unique identifier.                         |
| revision                                     | `String!` | Yes      | The column's current revision for conflict detection.   |
| title                                        | `String`  | No       | The column's new title.                                 |
| description                                  | `String`  | No       | The column's new description.                           |
| width                                        | `Int`     | No       | The column's display width in pixels.                   |
| settings `UpdateDropdownColumnSettingsInput` | `Object`  | No       | The column's updated label and selection configuration. |

### Update label input fields (`UpdateDropdownLabelInput`)

| Field           | Type      | Required | Description                                                                 |
| :-------------- | :-------- | :------- | :-------------------------------------------------------------------------- |
| label           | `String!` | Yes      | The label's display text.                                                   |
| id              | `Int`     | No       | The label's unique identifier. Required when updating an existing label.    |
| is\_deactivated | `Boolean` | No       | Whether the label is deactivated (hidden from the UI). Defaults to `false`. |

## Update value

You can update a dropdown column value using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

<Callout icon="🚧" theme="warn">
  You can't mix dropdown label text and label IDs in the same string value when using `change_simple_column_value`.
</Callout>

### `change_simple_column_value`

Send label IDs or label text as a comma-separated string in `value`.

If the label doesn't exist, the API returns an error that includes the existing labels. To automatically create missing labels, use `create_labels_if_missing: true`.

#### Update by IDs

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "dropdown"
    value: "1,2"
  ) {
    id
  }
}
```

#### Update by labels

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "dropdown"
    value: "Marketing, Engineering"
  ) {
    id
  }
}
```

### `change_multiple_column_values`

Send the dropdown IDs or label text as a JSON object in `column_values`.

#### JSON with IDs

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dropdown\": {\"ids\": [1, 2]}}"
  ) {
    id
  }
}
```

#### JSON with labels

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dropdown\": {\"labels\": [\"Marketing\", \"Engineering\"]}}"
  ) {
    id
  }
}
```

### Add a new dropdown label

You can create a new dropdown label and assign it to an item by using `create_labels_if_missing: true`. This works with both `change_simple_column_value` and `change_multiple_column_values`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "dropdown"
    value: "New Category"
    create_labels_if_missing: true
  ) {
    id
  }
}
```

<Callout icon="📘" theme="info">
  Using `create_labels_if_missing: true` requires permission to change the board structure. Without this flag, referencing a non-existent label returns an error.
</Callout>

### Set dropdown on item creation

You can set dropdown values when creating an item by passing the dropdown column value in the `column_values` argument.

#### Create with label IDs

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"dropdown\": {\"ids\": [1, 3]}}"
  ) {
    id
    name
  }
}
```

#### Create with label text

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"dropdown\": {\"labels\": [\"Marketing\", \"Design\"]}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a dropdown column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "dropdown"
    value: ""
  ) {
    id
  }
}
```

### `change_multiple_column_values`

Pass `null` or an empty labels array in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dropdown\": null}"
  ) {
    id
  }
}
```

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dropdown\": {\"labels\": []}}"
  ) {
    id
  }
}
```

***

# Reading column configuration

To understand a dropdown column's available labels and selection settings, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["dropdown"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

| Field    | Type              | Description                                                         |
| -------- | ----------------- | ------------------------------------------------------------------- |
| `labels` | `DropdownLabel[]` | Array of label objects representing the available dropdown options. |

<br />

### `DropdownLabel`

| Field            | Type      | Required | Description                                                                 |
| ---------------- | --------- | -------- | --------------------------------------------------------------------------- |
| `id`             | `number`  | Yes      | Unique numeric identifier for the label.                                    |
| `label`          | `string`  | Yes      | Display text of the dropdown option.                                        |
| `is_deactivated` | `boolean` | No       | Whether the label is deactivated (hidden from the UI). Defaults to `false`. |

<br />

### Example response

```json
{
  "settings": {
    "labels": [
      { "id": 1, "label": "Marketing", "is_deactivated": false },
      { "id": 2, "label": "Engineering", "is_deactivated": false },
      { "id": 3, "label": "Design", "is_deactivated": false },
      { "id": 4, "label": "Sales", "is_deactivated": false },
      { "id": 5, "label": "HR", "is_deactivated": false }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `id` field in each label object is the stable identifier used for filtering (`any_of`, `not_any_of`) and updating (`change_simple_column_value` with IDs, or `change_multiple_column_values` with `ids` array). Labels are assigned incrementing IDs starting from `1`.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the dropdown column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: dropdown
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
              "type": {
                "type": "string",
                "description": "The type of column (dropdown)"
              },
              "labels": {
                "type": "array",
                "description": "Array of dropdown labels",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "description": "The unique identifier for the label"
                    },
                    "label": {
                      "type": "string",
                      "description": "The display text for the label"
                    },
                    "is_deactivated": {
                      "type": "boolean",
                      "description": "Whether the label is deactivated"
                    }
                  },
                  "required": [
                    "label"
                  ],
                  "additionalProperties": false
                }
              },
              "limit_select": {
                "type": "boolean",
                "description": "Whether to limit selection to a single value"
              },
              "label_limit_count": {
                "type": "integer",
                "description": "Maximum number of labels that can be selected"
              }
            },
            "additionalProperties": false,
            "required": [
              "labels"
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
