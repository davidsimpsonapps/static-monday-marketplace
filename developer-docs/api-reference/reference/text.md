---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Text

Learn how to filter by, read, update, and clear the text column on monday boards using the platform API

The [text column](https://support.monday.com/hc/en-us/articles/115005310285-What-are-the-column-choices-) stores free-form text. The column has no fixed character limit, but each item has an approximate **64KB** total column value capacity.

Via the API, the text column supports read, filter, create, update, and clear operations.

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
        `text`
      </td>

      <td style={{ textAlign: "left" }}>
        `TextValue`
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

Text columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `TextValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on TextValue {
        id
        text
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
        ... on TextValue {
          id
          text
          value
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `TextValue` implementation will return.

| Field                                                                            | Description                                                                  |
| :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                             |
| id `ID!`                                                                         | The column's unique identifier.                                              |
| text `String`                                                                    | The column's textual value. Returns `""` if the column has an empty value.   |
| type `ColumnType!`                                                               | The column's type (`text`).                                                  |
| value `JSON`                                                                     | The column's raw value as a JSON-encoded string (e.g., `"\"Hello world\""`). |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "text",
            "text": "Hello world",
            "value": "\"Hello world\""
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by text values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The text column supports the following operators:

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
        An array of exact text values (e.g., `["Sample text"]`)
      </td>

      <td>
        Returns items whose text value exactly matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of exact text values (e.g., `["Sample text"]`)
      </td>

      <td>
        Excludes items whose text value exactly matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A partial or full text value (e.g., `"hello"`)
      </td>

      <td>
        Returns items whose text value contains the specified string (case-insensitive).
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        A partial or full text value (e.g., `"hello"`)
      </td>

      <td>
        Excludes items whose text value contains the specified string.
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
        Returns items with an empty text value.
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
        Returns items that have a text value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by partial text match

This example returns items whose text column contains "hello".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "text"
            compare_value: "hello"
            operator: contains_text
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on TextValue {
            text
          }
        }
      }
    }
  }
}
```

### Filter by exact text value

This example returns items with an exact text match.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "text"
            compare_value: ["Sample text"]
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

### Filter by empty text

This example returns items with an empty text value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "text"
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

The [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation creates a new text column via the API. You can specify which [fields](https://developer.monday.com/api-reference/docs/columns#fields) to return in the mutation response.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Notes"
    column_type: text
    description: "Additional notes for this item"
  ) {
    id
    title
    type
  }
}
```

## Update value

You can update a text column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

### `change_simple_column_value`

Send the value as a plain string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "text"
    value: "Sample text"
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Send the value as a JSON string in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"text\": \"Sample text\"}"
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
      board_id: $boardId
      item_id: $itemId
      column_values: $columnValues
    ) {
      id
      name
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    text: "Sample text"
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set text on item creation

You can set a text value when creating an item by passing the text column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"text\": \"Initial notes\"}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a text column using [`change_simple_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "text"
    value: ""
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Pass `null` or an empty string in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"text\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

To read a text column's configuration, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["text"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type      | Description                          |
| :------------ | :-------- | :----------------------------------- |
| `hide_footer` | `boolean` | Whether the column footer is hidden. |

### Example `settings` response

```json
{}
```

<Callout icon="📘" theme="info">
  Most text columns return an empty settings object. The `hide_footer` option is only present when explicitly configured.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the text column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: text
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
