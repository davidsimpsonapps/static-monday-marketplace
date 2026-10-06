---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Long Text

Learn how to filter by, read, update, and clear the long text column on monday boards using the platform API

The [long text column](https://support.monday.com/hc/en-us/articles/360001150345-The-Long-Text-Column) stores up to 2,000 characters of free-form text. It supports multi-line content and is commonly used for descriptions, notes, and detailed comments.

Via the API, the long text column supports read, filter, create, update, and clear operations.

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
        `long_text`
      </td>

      <td style={{ textAlign: "left" }}>
        `LongTextValue`
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

Long text columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `LongTextValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on LongTextValue {
        id
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
        ... on LongTextValue {
          id
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `LongTextValue` implementation will return.

| Field              | Description                                                                                        |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| column `Column!`   | The column the value belongs to.                                                                   |
| id `ID!`           | The column's unique identifier.                                                                    |
| text `String`      | The column's text content. Returns `""` if the column has an empty value.                          |
| type `ColumnType!` | The column's type.                                                                                 |
| updated\_at `Date` | The column's last updated date. Returns `null` if the column has never been set.                   |
| value `JSON`       | The column's raw value as a JSON string. Returns `{"text": "..."}` when set, or `null` when empty. |

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "long_text",
            "text": "This is a detailed description.\nWith multiple lines.",
            "value": "{\"text\":\"This is a detailed description.\\nWith multiple lines.\",\"changed_at\":\"2026-03-21T12:00:00Z\"}",
            "updated_at": "2026-03-21T12:00:00+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by long text values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The long text column supports the following operators:

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
        An array of full text values (e.g., `["exact text"]`)
      </td>

      <td>
        Returns items whose long text exactly matches any of the specified values. Use `[""]` to match blank values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of full text values (e.g., `["exact text"]`)
      </td>

      <td>
        Excludes items whose long text exactly matches any of the specified values. Use `[""]` to exclude blank values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A partial or full text string (e.g., `"description"`)
      </td>

      <td>
        Returns items whose long text contains the specified substring.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        A partial or full text string (e.g., `"description"`)
      </td>

      <td>
        Excludes items whose long text contains the specified substring.
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
        Returns items with an empty long text value.
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
        Returns items that have a long text value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by partial text match

This example returns all items whose long text column contains the word "description".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "long_text"
            compare_value: "description"
            operator: contains_text
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on LongTextValue {
            text
          }
        }
      }
    }
  }
}
```

### Filter by empty value

This example returns all items with an empty long text column.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "long_text"
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

You can create a long text column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with `column_type: long_text`.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Notes"
    column_type: long_text
  ) {
    id
    title
    description
  }
}
```

You can also pass a `defaults` argument to configure the column's settings on creation. See [Reading column configuration](#reading-column-configuration) for available settings.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Notes"
    column_type: long_text
    defaults: "{\"settings\": {\"hide_footer\": true}}"
  ) {
    id
    title
    settings
  }
}
```

## Update value

You can update a long text column value using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). The column accepts up to 2,000 characters.

### `change_simple_column_value`

Pass the text content directly as a string. Use `\n` for newlines.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "long_text"
    value: "This is a detailed description.\nWith a second line."
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Send the `text` key as a JSON object in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"long_text\": {\"text\": \"This is a detailed description.\\nWith a second line.\"}}"
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
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    long_text: { text: "This is a detailed description.\nWith a second line." }
  }),
};

const response = await mondayApiClient.request(query, variables);
```

### Set long text on item creation

You can set a long text value when creating an item by passing the column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"long_text\": {\"text\": \"Initial description for this task.\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a long text column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "long_text"
    value: ""
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Pass `null` in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"long_text\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

To retrieve a long text column's settings, query its `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["long_text"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type      | Description                                                                                                         |
| :------------ | :-------- | :------------------------------------------------------------------------------------------------------------------ |
| `hide_footer` | `boolean` | Whether the footer is hidden in the column's UI. When `true`, the word count and character count are not displayed. |

### Example `settings` response

A default long text column returns an empty settings object:

```json
{}
```

A column with the footer hidden:

```json
{
  "hide_footer": true
}
```

***

# Get column type schema

You can retrieve the JSON schema for the long text column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: long_text
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
