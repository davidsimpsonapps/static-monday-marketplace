---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Name (first column)

Learn how to filter by, read, and update the name column on monday boards using the platform API

The [name column](https://support.monday.com/hc/en-us/articles/115005310945-The-Item-Name-Column) stores the title of an item and is always the first column on a board. Every item must have a name — it cannot be empty or cleared.

Via the API, the name column supports read, filter, and update operations.

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
        `name`
      </td>

      <td style={{ textAlign: "left" }}>
        —
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **No** (auto-created with every board)
        * Update: **Yes**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The name column does not have a dedicated implementation type like other columns. It is not accessible through `column_values`. Instead, use the `name` field on items or the `items_page_by_column_values` query.
</Callout>

***

# Queries

The name column **cannot** be read through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2) field. Querying `column_values(ids: ["name"])` returns an empty array.

Instead, use one of the following approaches:

## Read via the `name` field

The simplest way to read an item's name is through the `name` field on the `items` object.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    id
    name
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      id
      name
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

### Example response

```json
{
  "data": {
    "items": [
      {
        "id": "1234567890",
        "name": "Task A"
      },
      {
        "id": "9876543210",
        "name": "Task B"
      }
    ]
  }
}
```

## Read via `items_page_by_column_values`

You can also use [`items_page_by_column_values`](https://developer.monday.com/api-reference/docs/items-page-by-column-values) to find items whose name matches a specific value.

```graphql GraphQL
query {
  items_page_by_column_values(
    board_id: 1234567890
    columns: {
      column_id: "name"
      column_values: "Task A"
    }
  ) {
    items {
      id
      name
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($boardId: ID!, $columnValues: String!) {
    items_page_by_column_values(
      board_id: $boardId
      columns: {
        column_id: "name"
        column_values: $columnValues
      }
    ) {
      items {
        id
        name
      }
    }
  }
`;

const variables = { boardId: 1234567890, columnValues: "Task A" };

const response = await mondayApiClient.request(query, variables);
```

***

# Filter

You can filter items by name values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The name column supports the following operators:

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
        An array of full name values (e.g., `["Task A"]`)
      </td>

      <td>
        Returns items whose name exactly matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of full name values (e.g., `["Task A"]`)
      </td>

      <td>
        Excludes items whose name exactly matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A partial or full name value (e.g., `["Task"]`)
      </td>

      <td>
        Returns items whose name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        A partial or full name value (e.g., `["Task"]`)
      </td>

      <td>
        Excludes items whose name contains the specified text.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  The `is_empty` and `is_not_empty` operators are not supported for the name column. Every item must have a name, so these operators will return an error.
</Callout>

## Examples

### Filter by exact name

This example returns all items whose name is exactly "Project Alpha".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "name"
            compare_value: ["Project Alpha"]
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

### Filter by partial name

This example returns all items whose name contains "Project".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "name"
            compare_value: ["Project"]
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

### Exclude by name

This example returns all items whose name does not contain "Draft".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "name"
            compare_value: ["Draft"]
            operator: not_contains_text
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

## Update

You can update an item's name using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). The name must be between 1 and 255 characters.

### `change_simple_column_value`

Pass the new name as a plain string in the `value` argument.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "name"
    value: "Updated Task Name"
  ) {
    id
    name
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $value: String!) {
    change_simple_column_value(
      item_id: $itemId
      board_id: $boardId
      column_id: "name"
      value: $value
    ) {
      id
      name
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  value: "Updated Task Name"
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Pass the name as a JSON string value in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"name\": \"Updated Task Name\"}"
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
  columnValues: JSON.stringify({ name: "Updated Task Name" })
};

const response = await mondayApiClient.request(query, variables);
```

## Set name on item creation

You set the item's name using the `item_name` argument when creating an item. You can also include it in `column_values`.

### Using `item_name`

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New Task"
  ) {
    id
    name
  }
}
```

### Using `column_values`

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "Placeholder"
    column_values: "{\"name\": \"Actual Task Name\"}"
  ) {
    id
    name
  }
}
```

<Callout icon="📘" theme="info">
  When both `item_name` and a `name` key in `column_values` are provided, the `column_values` name takes precedence.
</Callout>

## Clear

The name column **cannot** be cleared. Every item must have a name.

* Passing an empty string to `change_simple_column_value` returns: `"Invalid item name. Name must not be empty"`
* Passing `null` or `""` via `change_multiple_column_values` silently ignores the update — the name remains unchanged.

***

# Reading column configuration

The name column has no configurable settings. Querying `settings` returns an empty JSON object.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["name"]) {
      id
      title
      type
      settings
    }
  }
}
```

### Example response

```json
{
  "data": {
    "boards": [
      {
        "columns": [
          {
            "id": "name",
            "title": "Name",
            "type": "name",
            "settings": {}
          }
        ]
      }
    ]
  }
}
```

***

# Get column type schema

You can retrieve the JSON schema for the name column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: name
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
            "properties": {},
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

The name column has no configurable settings, so the schema returns an empty `settings` object. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
