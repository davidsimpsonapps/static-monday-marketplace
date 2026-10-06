---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Rating

Learn how to create, filter by, read, update, and clear the rating column on monday boards using the platform API

The [rating column](https://support.monday.com/hc/en-us/articles/360001017645-The-Rating-column-) stores a numeric rating value that can be used to rank or score items. It uses the `rating` column type and returns values as `RatingValue` in the GraphQL schema.

Via the API, the rating column supports read, filter, create, update, and clear operations.

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
        `rating`
      </td>

      <td style={{ textAlign: "left" }}>
        `RatingValue`
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

Rating columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `RatingValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on RatingValue {
        id
        rating
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
        ... on RatingValue {
          id
          rating
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `RatingValue` implementation will return.

| Field                                                                             | Description                                                                                                   |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#) | The column the value belongs to.                                                                              |
| id `ID!`                                                                          | The column's unique identifier.                                                                               |
| rating `Int`                                                                      | The numeric rating value (e.g., `1` to `5`). Returns `null` if the column has an empty value.                 |
| text `String`                                                                     | The rating value as a string (e.g., `"5"`). Returns `""` if the column has an empty value.                    |
| type `ColumnType!`                                                                | The column's type (`rating`).                                                                                 |
| updated\_at `Date`                                                                | The date when the rating was last updated.                                                                    |
| value `JSON`                                                                      | The column's raw value as a JSON string. Contains `{"rating": N}` where `N` is the numeric rating, or `null`. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Feature A",
        "column_values": [
          {
            "id": "rating",
            "rating": 4,
            "text": "4",
            "value": "{\"rating\":4}",
            "updated_at": "2026-03-20T12:00:00Z"
          }
        ]
      },
      {
        "name": "Feature B",
        "column_values": [
          {
            "id": "rating",
            "rating": null,
            "text": "",
            "value": null,
            "updated_at": null
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by rating values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The rating column supports the following operators:

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
        An array of rating values: `0` (blank), `1`, `2`, `3`, `4`, `5`
      </td>

      <td>
        Returns items with any of the specified ratings. Use `0` to match blank values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of rating values: `0` (blank), `1`, `2`, `3`, `4`, `5`
      </td>

      <td>
        Excludes items with any of the specified ratings. Use `0` to exclude blank values.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The maximum rating value in filters depends on the column's configured `limit` setting (default is `5`, maximum is `10`).
</Callout>

## Examples

### Filter by specific rating

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "rating"
            compare_value: [5]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on RatingValue {
            rating
          }
        }
      }
    }
  }
}
```

### Filter by non-blank ratings

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "rating"
            compare_value: [0]
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

## Create

You can create a rating column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with the `column_type` set to `rating`. You can optionally configure the rating scale, symbol, and color through the `defaults` argument.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Priority Score"
    column_type: rating
    defaults: "{\"settings\": {\"limit\": 10, \"symbol\": \"stars\", \"color\": \"#fdab3d\"}}"
  ) {
    id
    title
    settings
  }
}
```

The `defaults` argument accepts a JSON string containing a `settings` object with the following optional fields:

| Field    | Type      | Description                                                                                            |
| :------- | :-------- | :----------------------------------------------------------------------------------------------------- |
| `limit`  | `integer` | Maximum rating value. Must be between `3` and `10`. Defaults to `5`.                                   |
| `symbol` | `string`  | Rating symbol type. Allowed values: `"stars"`, `"hearts"`. Defaults to `"stars"`.                      |
| `color`  | `string`  | Hex color code for the rating display (e.g., `"#fdab3d"`). Must be exactly 7 characters including `#`. |

## Update

You can update a rating column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass the rating as a string.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "rating"
    value: "5"
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Pass a JSON object with the `rating` value as a number between `1` and the column's configured limit.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"rating\": {\"rating\": 5}}"
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
    rating: { rating: 5 }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set rating on item creation

You can set a rating when creating an item by passing the rating column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New feature"
    column_values: "{\"rating\": {\"rating\": 3}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a rating column using [`change_simple_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "rating"
    value: ""
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Pass `null` or an empty object.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"rating\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

You can read the rating column's configuration by querying the `settings` field on the [`columns`](https://developer.monday.com/api-reference/reference/columns) object. The returned JSON object contains the column's settings.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["rating"]) {
      id
      title
      settings
    }
  }
}
```

### Example `settings` response

The `settings` object contains:

```json
{
  "limit": 5,
  "symbol": "stars",
  "color": "#fdab3d"
}
```

| Field    | Type      | Description                                                   |
| :------- | :-------- | :------------------------------------------------------------ |
| `limit`  | `integer` | Maximum rating value (between `3` and `10`). Defaults to `5`. |
| `symbol` | `string`  | Rating symbol type: `"stars"` or `"hearts"`.                  |
| `color`  | `string`  | Hex color code for the rating display (e.g., `"#fdab3d"`).    |

***

# Get column type schema

You can retrieve the JSON schema for the rating column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: rating
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
              "limit": {
                "type": "integer",
                "description": "Maximum rating value",
                "minimum": 3,
                "maximum": 10
              },
              "symbol": {
                "type": "string",
                "description": "Rating symbol type",
                "enum": [
                  "stars",
                  "hearts"
                ]
              },
              "color": {
                "type": "string",
                "description": "Hex color code for the rating display",
                "minLength": 7,
                "maxLength": 7
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
