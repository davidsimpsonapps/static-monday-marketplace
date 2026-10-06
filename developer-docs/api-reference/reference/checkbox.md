---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Checkbox

Learn how to filter, read, update, and clear the checkbox column on monday boards using the platform API

The [checkbox column](https://support.monday.com/hc/en-us/articles/360001022569-The-Checkbox-column) represents a simple true or false value on a board. It stores a boolean state: checked or unchecked.

Via the API, the checkbox column supports read, filter, update, and clear operations.

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
        `checkbox`
      </td>

      <td style={{ textAlign: "left" }}>
        `CheckboxValue`
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

Checkbox columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `CheckboxValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on CheckboxValue {
        id
        checked
        text
        value
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
        ... on CheckboxValue {
          id
          checked
          text
          value
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `CheckboxValue` implementation will return.

| Field              | Description                                                                               |
| :----------------- | :---------------------------------------------------------------------------------------- |
| checked `Boolean`  | Whether the checkbox is checked. Returns `true` if checked, `false` if unchecked.         |
| column `Column!`   | The column the value belongs to.                                                          |
| id `ID!`           | The column's unique identifier.                                                           |
| text `String`      | The column value as text. Returns `"v"` if checked, `""` if unchecked.                    |
| type `ColumnType!` | The column's type.                                                                        |
| updated\_at `Date` | The column's last updated date. Returns `null` if the checkbox has never been checked.    |
| value `JSON`       | The raw JSON-formatted column value. Returns `{"checked": true}` or `{"checked": false}`. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "checkbox",
            "checked": true,
            "text": "v",
            "value": "{\"checked\":true,\"changed_at\":\"2026-03-20T12:00:00.000Z\"}",
            "updated_at": "2026-03-20T12:00:00+00:00"
          }
        ]
      },
      {
        "name": "Task B",
        "column_values": [
          {
            "id": "checkbox",
            "checked": false,
            "text": "",
            "value": "{\"checked\":false}",
            "updated_at": null
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `text` field returns `"v"` (a checkmark indicator) when the checkbox is checked, and an empty string `""` when unchecked. Use the `checked` field for programmatic boolean logic.
</Callout>

***

# Filter

You can filter items by checkbox values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The checkbox column supports the following operators:

| Operator       | Compare Value | Description                                    |
| :------------- | :------------ | :--------------------------------------------- |
| `is_empty`     | `[]`          | Returns items where the checkbox is unchecked. |
| `is_not_empty` | `[]`          | Returns items where the checkbox is checked.   |

Checkbox column filters use an empty array as the compare value because the column stores either a checked or unchecked state.

## Examples

### Filter for checked items

The following query returns all items where the checkbox is checked:

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "checkbox"
            compare_value: []
            operator: is_not_empty
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on CheckboxValue {
            checked
          }
        }
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
        items {
          id
          name
          column_values {
            ... on CheckboxValue {
              checked
            }
          }
        }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "checkbox",
  compareValue: [null],
  operator: "is_not_empty",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter for unchecked items

The following query returns all items where the checkbox is unchecked:

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "checkbox"
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

## Create column

**Required scope: `boards:write`**

You can create a new checkbox column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. There is no typed `create_checkbox_column` mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Approved"
    column_type: checkbox
  ) {
    id
    title
    type
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $title: String!, $columnType: ColumnType!) {
    create_column(
      board_id: $boardId
      title: $title
      column_type: $columnType
    ) {
      id
      title
      type
    }
  }
`;

const variables = {
  boardId: 1234567890,
  title: "Approved",
  columnType: "checkbox",
};

const response = await mondayApiClient.request(query, variables);
```

## Update value

You can update a checkbox column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object in `column_values`.

To check the box, send `{"checked": "true"}`:

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 1234567890
    board_id: 9876543210
    column_values: "{\"checkbox\": {\"checked\": \"true\"}}"
  ) {
    id
    name
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
      name
    }
  }
`;

const variables = {
  boardId: 9876543210,
  itemId: 1234567890,
  columnValues: JSON.stringify({
    checkbox: { checked: "true" }
  })
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="🚧" theme="warn">
  The checkbox column does not support `change_simple_column_value`. You must use `change_multiple_column_values` to update checkbox values.
</Callout>

## Clear value

You can clear (uncheck) a checkbox column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 1234567890
    board_id: 9876543210
    column_values: "{\"checkbox\": null}"
  ) {
    id
    name
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
      name
    }
  }
`;

const variables = {
  boardId: 9876543210,
  itemId: 1234567890,
  columnValues: JSON.stringify({
    checkbox: null
  })
};

const response = await mondayApiClient.request(query, variables);
```

## Set on item creation

You can set a checkbox value when creating an item by passing the column value in the `column_values` argument of the [`create_item`](https://developer.monday.com/api-reference/reference/items#create-item) mutation.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"checkbox\": {\"checked\": \"true\"}}"
  ) {
    id
    name
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
    create_item(
      board_id: $boardId
      item_name: $itemName
      column_values: $columnValues
    ) {
      id
      name
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemName: "New task",
  columnValues: JSON.stringify({
    checkbox: { checked: "true" }
  })
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To inspect a checkbox column's configuration, you can query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["checkbox"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type      | Description                                                                                         |
| :------------ | :-------- | :-------------------------------------------------------------------------------------------------- |
| `color`       | `string`  | Hex color code for the checkbox display (e.g., `"#ff158a"`). Only present if a custom color is set. |
| `hide_footer` | `boolean` | Whether to hide the column footer summary.                                                          |

### Example `settings` response

A default checkbox column returns an empty settings object:

```json
{}
```

A checkbox column with a custom color:

```json
{
  "color": "#ff158a"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the checkbox column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: checkbox
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
              "color": {
                "type": "string",
                "description": "Hex color code for the boolean column display (e.g., #fdab3d)",
                "minLength": 7,
                "maxLength": 7
              },
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
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
