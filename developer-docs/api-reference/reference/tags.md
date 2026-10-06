---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Tags

Learn how to filter by, read, update, and clear the tags column on monday boards using the platform API

The [tags column](https://support.monday.com/hc/en-us/articles/115005905685-The-Tags-Column) stores one or more tag values, allowing you to categorize or group items by keywords across boards. Tags are account-wide entities — the same tag can be applied to items on different boards.

Via the API, the tags column supports read, filter, update, and clear operations.

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
        `tags`
      </td>

      <td style={{ textAlign: "left" }}>
        `TagsValue`
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

Tags columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on items queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `TagsValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on TagsValue {
        id
        tag_ids
        text
        value
        tags {
          id
          name
          color
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
        ... on TagsValue {
          id
          tag_ids
          text
          value
          tags {
            id
            name
            color
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `TagsValue` implementation will return.

| Field                                                                            | Description                                                                                    |
| :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                               |
| id `ID!`                                                                         | The column's unique identifier.                                                                |
| tag\_ids `[Int!]!`                                                               | The unique identifiers of the assigned tags.                                                   |
| tags [`[Tag!]!`](https://developer.monday.com/api-reference/reference/tags-1)    | A list of tag objects, each containing `id`, `name`, and `color`.                              |
| text `String`                                                                    | The column's value as text. Returns a comma-separated list of tag names, or `""` if empty.     |
| type `ColumnType!`                                                               | The column's type.                                                                             |
| value `JSON`                                                                     | The column's raw value as a JSON string. Returns `{"tag_ids": [id1, id2]}` or `null` if empty. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "tags",
            "tag_ids": [295026, 295064],
            "text": "Frontend, Urgent",
            "value": "{\"tag_ids\":[295026,295064]}",
            "tags": [
              {
                "id": "295026",
                "name": "Frontend",
                "color": "#579bfc"
              },
              {
                "id": "295064",
                "name": "Urgent",
                "color": "#e2445c"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Query tags directly

Tags are account-wide entities. You can query all tags or specific tags by ID using the root `tags` query.

```graphql GraphQL
query {
  tags(ids: [295026, 295064]) {
    id
    name
    color
  }
}
```

***

# Filter

You can filter items by tag values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The tags column supports the following operators:

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
        An array of tag IDs (e.g., `[295026, 295064]`) or `[-1]` for blank values
      </td>

      <td>
        Returns items that have any of the specified tags assigned.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of tag IDs (e.g., `[295026]`) or `[-1]` for blank values
      </td>

      <td>
        Excludes items that have any of the specified tags assigned.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A string value (e.g., `"Frontend"`)
      </td>

      <td>
        Returns items whose tag names contain the specified text (partial match).
      </td>
    </tr>

    <tr>
      <td>
        `contains_terms`
      </td>

      <td>
        A string value (e.g., `"Frontend"`)
      </td>

      <td>
        Returns items whose tag names match the specified term.
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
        Returns items with no tags assigned.
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
        Returns items that have at least one tag assigned.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by tag ID

This example returns items that have the tag with ID `295026` assigned.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "tags"
            compare_value: [295026]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on TagsValue {
            tag_ids
            text
          }
        }
      }
    }
  }
}
```

### Filter by tag name

This example returns items whose tags contain the text "Frontend".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "tags"
            compare_value: "Frontend"
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

### Filter items without tags

This example returns items with no tags assigned.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "tags"
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

### Exclude a specific tag

This example returns items that do not have the tag with ID `295026`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "tags"
            compare_value: [295026]
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

***

# Mutations

## Create or get a tag

Before assigning tags to items, the tags must exist at the account level. Use the `create_or_get_tag` mutation to create a new tag or retrieve an existing one by name.

```graphql GraphQL
mutation {
  create_or_get_tag(tag_name: "Frontend") {
    id
    name
    color
  }
}
```

### Arguments

| Argument  | Type     | Required | Description                                                                        |
| :-------- | :------- | :------- | :--------------------------------------------------------------------------------- |
| tag\_name | `String` | Yes      | The tag's name. Spaces are removed automatically (e.g., "My Tag" becomes "MyTag"). |
| board\_id | `ID`     | No       | The private board ID to create the tag on. Not needed for public boards.           |

<Callout icon="📘" theme="info">
  If a tag with the specified name already exists, the mutation returns the existing tag rather than creating a duplicate.
</Callout>

## Update value

You can update a tags column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object with a `tag_ids` array in `column_values`.

<Callout icon="🚧" theme="warn">
  The tags column does not support `change_simple_column_value`. You must use `change_multiple_column_values`.
</Callout>

### Set a single tag

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"tags\": {\"tag_ids\": [295026]}}"
  ) {
    id
  }
}
```

### Set multiple tags

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"tags\": {\"tag_ids\": [295026, 295064]}}"
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
    tags: { tag_ids: [295026, 295064] }
  })
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  Updating a tags column replaces all existing tags with the provided list. To add a tag to an item's existing tags, first read the current `tag_ids`, then send the full list including the new tag.
</Callout>

### Set tags on item creation

You can set tag values when creating an item by passing the tags column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"tags\": {\"tag_ids\": [295026, 295064]}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a tags column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` or an empty object in `column_values`.

### Clear with null

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"tags\": null}"
  ) {
    id
  }
}
```

### Clear with empty object

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"tags\": {}}"
  ) {
    id
  }
}
```

***

# Reading column configuration

You can query a tags column's settings through the column's `settings` field. Since tags are account-wide entities without column-specific configuration, the `settings` field for tags columns returns an empty object.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["tags"]) {
      id
      title
      type
      settings
    }
  }
}
```

### Example `settings` response

```json
{}
```

<Callout icon="📘" theme="info">
  Unlike columns such as status or dropdown, the tags column has no column-level configuration. Tags are managed at the account level and shared across all boards.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the tags column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: tags
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

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
