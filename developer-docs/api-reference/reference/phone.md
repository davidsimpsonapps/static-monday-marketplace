---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Phone

Learn how to filter by, read, update, and clear the phone column on monday boards using the platform API

The [phone column](https://support.monday.com/hc/en-us/articles/360001151249-The-Phone-Column) stores a phone number together with a country code. It optionally displays a country flag next to the number.

Via the API, the phone column supports read, filter, update, and clear operations.

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
        `phone`
      </td>

      <td style={{ textAlign: "left" }}>
        `PhoneValue`
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

Phone columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `PhoneValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on PhoneValue {
        id
        phone
        country_short_name
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
        ... on PhoneValue {
          id
          phone
          country_short_name
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `PhoneValue` implementation will return.

| Field                                                                             | Description                                                                                                           |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#) | The column the value belongs to.                                                                                      |
| country\_short\_name `String`                                                     | The [ISO-2](http://country.io/names.json) country code (e.g., `"US"`, `"GB"`). Returns `null` if the column is empty. |
| id `ID!`                                                                          | The column's unique identifier.                                                                                       |
| phone `String`                                                                    | The phone number stored in the column. Returns `null` if the column is empty.                                         |
| text `String`                                                                     | The column's value as text. Returns `""` if the column has an empty value.                                            |
| type `ColumnType!`                                                                | The column's type.                                                                                                    |
| updated\_at `Date`                                                                | The column's last updated date.                                                                                       |
| value `JSON`                                                                      | The column's raw value as a JSON string. Returns `{"phone": "+12025550169", "countryShortName": "US"}`.               |

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Alice Johnson",
        "column_values": [
          {
            "id": "phone",
            "phone": "+12025550169",
            "country_short_name": "US",
            "text": "+12025550169",
            "value": "{\"phone\":\"+12025550169\",\"countryShortName\":\"US\"}",
            "updated_at": "2026-03-20T12:00:00Z"
          }
        ]
      },
      {
        "name": "Bob Smith",
        "column_values": [
          {
            "id": "phone",
            "phone": null,
            "country_short_name": null,
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

You can filter items by phone values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The phone column supports filtering by country code, phone number text, and empty values.

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
        An array of [ISO-2](http://country.io/names.json) country codes (e.g., `["US"]`)
      </td>

      <td>
        Returns items whose phone country code matches any of the specified codes.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of [ISO-2](http://country.io/names.json) country codes (e.g., `["US"]`)
      </td>

      <td>
        Excludes items whose phone country code matches any of the specified codes.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        Partial or full phone number text (e.g., `"2025"`)
      </td>

      <td>
        Returns items whose phone number contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        Partial or full phone number text (e.g., `"2025"`)
      </td>

      <td>
        Excludes items whose phone number contains the specified text.
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
        Returns items with an empty (unset) phone value.
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
        Returns items that have a phone value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by country code

This example returns all items with a phone number in the United States.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "phone"
            compare_value: ["US"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on PhoneValue {
            phone
            country_short_name
          }
        }
      }
    }
  }
}
```

### Filter by phone number text

This example returns all items whose phone number contains "2025".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "phone"
            compare_value: "2025"
            operator: contains_text
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on PhoneValue {
            phone
          }
        }
      }
    }
  }
}
```

### Filter by empty phone

This example returns all items on the specified board with an empty phone value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "phone"
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

## Update

You can update a phone column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

### `change_simple_column_value`

Send your values in the following format in `value`:

```php Template
"+<phone number> <ISO-2 country code>"
```

The [country code](http://country.io/names.json) must be capitalized and separated from the number by a space.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "phone"
    value: "+12025550169 US"
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
  columnId: "phone",
  value: "+12025550169 US"
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the `phone` and `countryShortName` keys as a JSON object in `column_values`, using an uppercase [ISO-2](http://country.io/names.json) country code.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"phone\": {\"phone\": \"+12025550169\", \"countryShortName\": \"US\"}}"
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
    phone: { phone: "+12025550169", countryShortName: "US" }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Phone number validation

Phone numbers must follow the valid national formatting rules for the specified country code.

The phone column uses:

* ISO 3166 for country codes
* The [Google libphonenumber](https://github.com/google/libphonenumber) library for number validation

If you encounter validation errors, you can verify your number using the [online tool](https://libphonenumber.appspot.com/).

#### Accepted formats

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Country
      </th>

      <th>
        Accepted Formats
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        United States (US)
      </td>

      <td>
        `"{\"phone\":\"+12025550172\",\"countryShortName\":\"US\"}"`  
        `"{\"phone\":\"12025550172\",\"countryShortName\":\"US\"}"`  
        `"{\"phone\":\"2025550169\",\"countryShortName\":\"US\"}"`
      </td>
    </tr>

    <tr>
      <td>
        Great Britain (GB)
      </td>

      <td>
        `"{\"phone\":\"+447975777666\",\"countryShortName\":\"GB\"}"`  
        `"{\"phone\":\"447975777666\",\"countryShortName\":\"GB\"}"`  
        `"{\"phone\":\"+442079460990\",\"countryShortName\":\"GB\"}"`  
        `"{\"phone\":\"07975777666\",\"countryShortName\":\"GB\"}"`
      </td>
    </tr>

    <tr>
      <td>
        Australia (AU)
      </td>

      <td>
        `"{\"phone\":\"+61488870510\",\"countryShortName\":\"AU\"}"`  
        `"{\"phone\":\"61488870510\",\"countryShortName\":\"AU\"}"`  
        `"{\"phone\":\"0488870510\",\"countryShortName\":\"AU\"}"`  
        `"{\"phone\":\"0255504321\",\"countryShortName\":\"AU\"}"`
      </td>
    </tr>
  </tbody>
</Table>

## Set phone on item creation

You can set a phone value when creating an item by passing the phone column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New contact"
    column_values: "{\"phone\": {\"phone\": \"+12025550169\", \"countryShortName\": \"US\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a phone column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "phone"
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
    column_values: "{\"phone\": null}"
  ) {
    id
  }
}
```

***

# Reading column configuration

To understand a phone column's settings, you can query its configuration through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["phone"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object. For phone columns with default settings, the value is `{}`. The following keys may be present:

| Key         | Type      | Description                                                   |
| :---------- | :-------- | :------------------------------------------------------------ |
| `show_flag` | `boolean` | Whether to display the country flag next to the phone number. |

### Example `settings` response

```json
{}
```

<Callout icon="📘" theme="info">
  By default, phone columns have no custom settings. The `show_flag` option can be configured in the column's UI settings to display a country flag alongside the phone number.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the phone column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: phone
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
              "show_flag": {
                "type": "boolean",
                "description": "Whether to display the country flag next to the phone number"
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
