---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Location

Learn how to filter by, read, update, and clear the location column on monday boards using the platform API

The [location column](https://support.monday.com/hc/en-us/articles/360001144325-The-Location-Column) stores a geographic location with longitude/latitude precision and displays the address as text in the UI.

Via the API, the location column supports read, filter, update, and clear operations.

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
        `location`
      </td>

      <td style={{ textAlign: "left" }}>
        `LocationValue`
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

Location columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `LocationValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on LocationValue {
        id
        address
        city
        country
        country_short
        lat
        lng
        place_id
        street
        street_number
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
        ... on LocationValue {
          id
          address
          city
          country
          country_short
          lat
          lng
          place_id
          street
          street_number
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `LocationValue` implementation will return.

| Field                          | Description                                                                |
| :----------------------------- | :------------------------------------------------------------------------- |
| address `String`               | The location's address.                                                    |
| city `String`                  | The location's city.                                                       |
| city\_short `String`           | The location's shortened city value.                                       |
| column `Column!`               | The column the value belongs to.                                           |
| country `String`               | The location's country.                                                    |
| country\_short `String`        | The location's shortened country value (e.g., `"PE"` for Peru).            |
| id `ID!`                       | The column's unique identifier.                                            |
| lat `Float`                    | The location's latitude.                                                   |
| lng `Float`                    | The location's longitude.                                                  |
| place\_id `String`             | The unique place identifier of the location (Google Places).               |
| street `String`                | The location's street.                                                     |
| street\_number `String`        | The location's street number.                                              |
| street\_number\_short `String` | The location's shortened street building number value.                     |
| street\_short `String`         | The location's shortened street value.                                     |
| text `String`                  | The column's value as text. Returns `""` if the column has an empty value. |
| type `ColumnType!`             | The column's type.                                                         |
| updated\_at `Date`             | The column's last updated date.                                            |
| value `JSON`                   | The column's JSON-formatted raw value.                                     |

<Callout icon="📘" theme="info">
  When a location is set via the API (without a Google Place ID), only the `lat`, `lng`, and `address` fields are populated. The structured fields (`city`, `country`, `street`, etc.) will return `null` because they are derived from the Place ID lookup.
</Callout>

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Office Location",
        "column_values": [
          {
            "id": "location",
            "address": "Giza Pyramid Complex",
            "city": null,
            "country": null,
            "country_short": null,
            "lat": 29.9773,
            "lng": 31.1325,
            "place_id": null,
            "street": null,
            "street_number": null,
            "text": "Giza Pyramid Complex",
            "value": "{\"lat\":\"29.9773\",\"lng\":\"31.1325\",\"address\":\"Giza Pyramid Complex\",\"changed_at\":\"2026-03-20T12:00:00.000Z\"}",
            "updated_at": "2026-03-20T12:00:00+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by location values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The location column supports filtering by address text and empty/non-empty state.

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
        `contains_terms`
      </td>

      <td>
        A string value (e.g., `"Tokyo"`)
      </td>

      <td>
        Returns items whose location address contains the specified text.
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
        Returns items with an empty (unset) location value.
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
        Returns items that have a location value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by address text

This example returns all items on the specified board whose location address contains "Tokyo".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "location"
            compare_value: "Tokyo"
            operator: contains_terms
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on LocationValue {
            address
            lat
            lng
          }
        }
      }
    }
  }
}
```

### Filter by empty location

This example returns all items on the specified board with an empty location value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "location"
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

### Filter by non-empty location

This example returns all items on the specified board that have a location value set.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "location"
            compare_value: []
            operator: is_not_empty
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

You can update a location column using the [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) mutations. You can send values as simple strings or JSON objects, depending on the mutation you choose.

<Callout icon="👍" theme="okay">
  The address is not validated against the latitude and longitude — it is displayed as text in the cell. If no address is provided, the cell displays _unknown_.

  Valid latitude values range from **-90.0 to 90.0 (exclusive)**, and valid longitude values range from **-180.0 to 180.0 (inclusive)**. If the updated coordinates fall outside these ranges, the mutation returns an error.
</Callout>

### `change_simple_column_value`

Send the latitude, longitude, and (optionally) the address as a space-separated string in `value`. The format is `"lat lng address"`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "location"
    value: "29.9772962 31.1324955 Giza Pyramid Complex"
  ) {
    id
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: String!) {
    change_simple_column_value(
      item_id: $itemId
      board_id: $boardId
      column_id: $columnId
      value: $value
    ) {
      id
    }
  }
`;

const variables = {
  boardId: "1234567890",
  itemId: "9876543210",
  columnId: "location",
  value: "29.9772962 31.1324955 Giza Pyramid Complex"
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the `lat`, `lng`, and optional `address` keys as a JSON object in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"location\": {\"lat\": \"29.9772962\", \"lng\": \"31.1324955\", \"address\": \"Giza Pyramid Complex\"}}"
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
  boardId: "1234567890",
  itemId: "9876543210",
  columnValues: JSON.stringify({
    location: {
      lat: "29.9772962",
      lng: "31.1324955",
      address: "Giza Pyramid Complex"
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set location on item creation

You can set a location value when creating an item by passing the location column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New office"
    column_values: "{\"location\": {\"lat\": \"40.7128\", \"lng\": \"-74.0060\", \"address\": \"New York, NY\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a location column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` or an empty object in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"location\": null}"
  ) {
    id
  }
}
```

<Callout icon="🚧" theme="warn">
  Clearing with `change_simple_column_value` (by passing an empty string) is not supported for the location column and will return an error. Use `change_multiple_column_values` with `null` instead.
</Callout>

***

# Reading column configuration

You can query a location column's settings through the column's `settings` field. Location columns have no configurable settings, so `settings` returns an empty JSON object.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["location"]) {
      id
      title
      settings
    }
  }
}
```

### Example `settings` response

```json
{}
```

***

# Get column type schema

You can retrieve the JSON schema for the location column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: location
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
