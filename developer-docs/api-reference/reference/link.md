---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Link

Learn how to filter by, read, update, and clear the link column on monday boards using the platform API

The [link column](https://support.monday.com/hc/en-us/articles/360001139125-The-Link-Column) stores a URL and optional display text for an item. It supports URLs with `http://` or `https://` protocols and renders as a clickable link in the board UI.

Via the API, the link column supports read, filter, update, and clear operations.

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
        `link`
      </td>

      <td style={{ textAlign: "left" }}>
        `LinkValue`
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

Link columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `LinkValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on LinkValue {
        id
        url
        url_text
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
        ... on LinkValue {
          id
          url
          url_text
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

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `LinkValue` implementation will return.

| Field              | Description                                                                                                                                                             |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column `Column!`   | The column the value belongs to.                                                                                                                                        |
| id `ID!`           | The column's unique identifier.                                                                                                                                         |
| text `String`      | The column's value as text. Returns `"display_text - url"` when both are set, or `" - url"` when only a URL is provided. Returns `""` if the column has an empty value. |
| type `ColumnType!` | The column's type.                                                                                                                                                      |
| updated\_at `Date` | The column's last updated date.                                                                                                                                         |
| url `String`       | The stored URL. Returns `null` if the column is empty.                                                                                                                  |
| url\_text `String` | The display text for the link. Returns `null` if the column is empty, or `""` if only a URL was set without display text.                                               |
| value `JSON`       | The column's raw value as a JSON string. Returns `{"url": "...", "text": "...", "changed_at": "..."}`.                                                                  |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "link",
            "url": "https://monday.com",
            "url_text": "Go to monday!",
            "text": "Go to monday! - https://monday.com",
            "value": "{\"url\":\"https://monday.com\",\"text\":\"Go to monday!\",\"changed_at\":\"2026-03-20T12:00:00.000Z\"}",
            "updated_at": "2026-03-20T12:00:00Z"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by link values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The link column supports the following operators:

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
        An array containing the exact display text or `""` for blank values
      </td>

      <td>
        Returns items whose link display text matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array containing the exact display text or `""` for blank values
      </td>

      <td>
        Excludes items whose link display text matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        Partial or full display text string
      </td>

      <td>
        Returns items whose link display text contains the specified substring.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        Partial or full display text string
      </td>

      <td>
        Excludes items whose link display text contains the specified substring.
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
        Returns items with an empty (unset) link value.
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
        Returns items that have a link value set.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  The `any_of`, `not_any_of`, `contains_text`, and `not_contains_text` operators match against the link's **display text**, not the URL.

  * If display text is set, the filter matches against the display text.
  * If only a URL is stored (no display text), the link is treated as having blank display text. Use `any_of` with `""` or `is_empty` / `is_not_empty` to match these items.
</Callout>

## Examples

### Filter by display text (exact match)

This example returns items whose link display text is exactly "monday.com":

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "link"
            compare_value: ["monday.com"]
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

### Filter by display text (partial match)

This example returns items whose link display text contains the word "monday":

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "link"
            compare_value: ["monday"]
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
  columnId: "link",
  compareValue: ["monday"],
  operator: "contains_text"
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by empty link

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "link"
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

## Update value

You can update a link column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

### `change_simple_column_value`

Send the URL (including `http://` or `https://`) followed by a space and the display text as a string in `value`. The display text is required and may contain spaces.

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation requires both a URL and display text separated by a space. Sending a URL without display text will return an error.
</Callout>

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "link"
    value: "https://monday.com Go to monday!"
  ) {
    id
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValue: String!, $columnId: String!) {
    change_simple_column_value(
      item_id: $itemId
      board_id: $boardId
      column_id: $columnId
      value: $columnValue
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnId: "link",
  columnValue: "https://monday.com Go to monday!"
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the `url` (including `http://` or `https://`) and `text` keys as a JSON object in `column_values`. The `text` key is optional — you can pass an empty string to set only the URL.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"link\": {\"url\": \"https://monday.com\", \"text\": \"Go to monday!\"}}"
  ) {
    id
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
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    link: {
      url: "https://monday.com",
      text: "Go to monday!"
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set link on item creation

You can set a link value when creating an item by passing the link column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"link\": {\"url\": \"https://monday.com\", \"text\": \"Go to monday!\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a link column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "link"
    value: ""
  ) {
    id
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
    column_values: "{\"link\": null}"
  ) {
    id
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
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    link: null
  })
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To understand a link column's settings, you can query its configuration through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["link"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                | Type      | Description                                                            |
| :----------------- | :-------- | :--------------------------------------------------------------------- |
| `defaultText`      | `string`  | Default text to display when no display text is provided with a URL.   |
| `disableAutoTitle` | `boolean` | If `true`, prevents automatic generation of a link title from the URL. |
| `hide_footer`      | `boolean` | Whether to hide the footer in the link cell.                           |

### Example `settings` response

A default link column returns an empty object:

```json
{}
```

A customized link column:

```json
{
  "defaultText": "Click here",
  "disableAutoTitle": true
}
```

***

# Get column type schema

You can retrieve the JSON schema for the link column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: link
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
              "defaultText": {
                "type": "string",
                "description": "Default text to display when no text is provided"
              },
              "disableAutoTitle": {
                "type": "boolean",
                "description": "If true, prevents automatic generation of a link title from the URL"
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
