---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Country

Learn how to filter, read, update, and clear the country column on monday boards using the platform API

The [country column](https://support.monday.com/hc/en-us/articles/360001140069-The-Country-Column) allows users to select a country from the [list of available countries](http://country.io/names.json). Each value stores a two-letter ISO-2 country code and the country's name.

Via the API, the country column supports read, filter, update, and clear operations.

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
        `country`
      </td>

      <td style={{ textAlign: "left" }}>
        `CountryValue`
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

Country columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `CountryValue`.

The `country` field returns a nested `Country` object with `code` and `name` subfields.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on CountryValue {
        id
        country {
          code
          name
        }
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
        ... on CountryValue {
          id
          country {
            code
            name
          }
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `CountryValue` implementation will return.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        column `Column!`
      </td>

      <td>
        The column the value belongs to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        country `Country`
      </td>

      <td>
        The selected country. Returns `null` if the column has no value.
      </td>

      <td>
        code `String!`
        name `String!`
      </td>
    </tr>

    <tr>
      <td>
        id `ID!`
      </td>

      <td>
        The column's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        text `String`
      </td>

      <td>
        The column's value as text (e.g., `"United States"`). Returns `""` if the column has no value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ColumnType!`
      </td>

      <td>
        The column's type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at `Date`
      </td>

      <td>
        The column's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        value `JSON`
      </td>

      <td>
        The raw JSON-formatted column value. Returns `{"countryCode": "XX", "countryName": "..."}` with an additional `changed_at` timestamp after updates.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "My item",
        "column_values": [
          {
            "id": "country",
            "country": {
              "code": "US",
              "name": "United States"
            },
            "text": "United States",
            "value": "{\"countryCode\":\"US\",\"countryName\":\"United States\"}",
            "updated_at": "2026-03-21T08:26:30.268Z"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by country values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The country column supports the following operators:

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
        An array of [ISO-2 country codes](http://country.io/names.json) (e.g., `["US", "DE"]`) or `[""]` for blank values
      </td>

      <td>
        Returns items whose country matches any of the specified codes.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of [ISO-2 country codes](http://country.io/names.json) (e.g., `["US"]`) or `[""]` for blank values
      </td>

      <td>
        Excludes items whose country matches any of the specified codes.
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
        Returns items with no country value set.
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
        Returns items that have a country value set.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        Partial or full country name (e.g., `"United"`)
      </td>

      <td>
        Returns items whose country name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        Partial or full country name (e.g., `"United"`)
      </td>

      <td>
        Excludes items whose country name contains the specified text.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by country code

This example returns all items whose country column matches Uruguay.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "country"
            compare_value: ["UY"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on CountryValue {
            country {
              code
              name
            }
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
        }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "country",
  compareValue: ["UY"],
  operator: "any_of",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by country name

This example returns all items whose country name contains "United".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "country"
            compare_value: "United"
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

### Filter by empty country

This example returns all items on the specified board with no country value set.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "country"
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

You can create a country column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. There is no typed `create_country_column` mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Country"
    column_type: country
  ) {
    id
    title
    type
  }
}
```

## Update value

You can update a country column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). Pass a JSON object with `countryCode` (ISO-2 code) and `countryName` (full country name).

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation is not supported for the country column. You must use `change_multiple_column_values`.
</Callout>

### `change_multiple_column_values`

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"country\": {\"countryCode\": \"US\", \"countryName\": \"United States\"}}"
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
    country: {
      countryCode: "SG",
      countryName: "Singapore"
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  Both `countryCode` and `countryName` are required. The code must be a valid [two-letter ISO-2 abbreviation](http://country.io/names.json).
</Callout>

### Set country on item creation

You can set a country value when creating an item by passing it in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New item"
    column_values: "{\"country\": {\"countryCode\": \"JP\", \"countryName\": \"Japan\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a country column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"country\": null}"
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
    country: null
  })
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

You can query the country column's settings through the column's `settings` field. The country column has no configurable settings, so `settings` returns an empty JSON object.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["country"]) {
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
            "id": "country",
            "title": "Country",
            "type": "country",
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

You can retrieve the JSON schema for the country column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: country
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
