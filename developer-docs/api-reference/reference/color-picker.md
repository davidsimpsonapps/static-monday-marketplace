---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Color Picker

Learn how to filter by, read, update, and clear the color picker column on monday boards using the platform API

The [color picker column](https://support.monday.com/hc/en-us/articles/360001260269-The-Color-Picker-Column) allows design teams to assign specific colors to items. After selecting a color, the column displays the relevant color code in the format of your choice (HEX or RGB).

Via the API, the color picker column supports read, filter, update, and clear operations.

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
        `color_picker`
      </td>

      <td style={{ textAlign: "left" }}>
        `ColorPickerValue`
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

Color picker columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `ColorPickerValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on ColorPickerValue {
        id
        color
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
        ... on ColorPickerValue {
          id
          color
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `ColorPickerValue` implementation will return.

| Field              | Description                                                                                                                       |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| color `String`     | The column's HEX color value (e.g., `"#FF5733"`). Returns `null` if the value was stored using RGB format or the column is empty. |
| column `Column!`   | The column the value belongs to.                                                                                                  |
| id `ID!`           | The column's unique identifier.                                                                                                   |
| text `String`      | The column value as text. Returns the HEX color code, or `null` if the value was stored using RGB format or the column is empty.  |
| type `ColumnType!` | The column's type.                                                                                                                |
| updated\_at `Date` | The column's last updated date.                                                                                                   |
| value `JSON`       | The raw JSON-formatted column value. Contains the color object and a `changed_at` timestamp.                                      |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Design Task",
        "column_values": [
          {
            "id": "color_picker",
            "color": "#FF5733",
            "text": "#FF5733",
            "value": "{\"color\":{\"hex\":\"#FF5733\"},\"changed_at\":\"2026-03-21T12:00:00.000Z\"}",
            "updated_at": "2026-03-21T12:00:00+00:00"
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `color` and `text` fields return `null` when the value was stored using RGB format. To reliably read the color in all cases, parse the `value` JSON field instead.
</Callout>

***

# Filter

You can filter items by color picker values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object.

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
        An array of HEX color strings (e.g., `["#FF5733"]`)
      </td>

      <td>
        Returns items whose color picker value matches any of the specified HEX codes.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of HEX color strings (e.g., `["#FF5733"]`)
      </td>

      <td>
        Excludes items whose color picker value matches any of the specified HEX codes.
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
        Returns items with an empty (unset) color picker value.
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
        Returns items that have a color picker value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by HEX color

This example returns all items with a specific color value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "color_picker"
            compare_value: ["#FF5733"]
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

### Filter by empty color

This example returns all items on the specified board with an empty color picker value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "color_picker"
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

You can create a color picker column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column) mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: color_picker
    title: "Brand Color"
    description: "The item's assigned brand color."
  ) {
    id
    title
    description
  }
}
```

You can optionally pass column settings as a JSON string in the `defaults` argument to configure the default color and display method.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: color_picker
    title: "Brand Color"
    defaults: "{\"color\":\"#FF0000\",\"colorMethod\":\"hex\"}"
  ) {
    id
    title
    settings
  }
}
```

## Update value

You can update a color picker column value using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). Color picker values can be sent in HEX or RGB format.

<Callout icon="🚧" theme="warn">
  The color picker column does not support [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-a-simple-column-value). You must use `change_multiple_column_values` to update or clear the value.
</Callout>

### Update with HEX value

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"color_picker\": {\"color\": {\"hex\": \"#FF5733\"}}}"
  ) {
    id
    name
  }
}
```

### Update with RGB value

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"color_picker\": {\"color\": {\"r\": 0, \"g\": 128, \"b\": 255}}}"
  ) {
    id
    name
  }
}
```

<Callout icon="📘" theme="info">
  When a value is stored using RGB format, the `color` and `text` fields on `ColorPickerValue` will return `null`. The raw value is still available in the `value` field. Use HEX format if you need these fields to return data.
</Callout>

### Set color on item creation

You can set a color picker value when creating an item by passing it in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New design task"
    column_values: "{\"color_picker\": {\"color\": {\"hex\": \"#9D50DD\"}}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a color picker column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` or an empty object.

### Clear with null

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"color_picker\": null}"
  ) {
    id
    name
  }
}
```

### Clear with empty object

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"color_picker\": {}}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

You can query the color picker column's settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["color_picker"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type     | Description                                                 |
| :------------ | :------- | :---------------------------------------------------------- |
| `color`       | `string` | The default color value (HEX or RGB string).                |
| `colorMethod` | `string` | The color representation method. Either `"hex"` or `"rgb"`. |

A color picker column with no custom settings returns an empty object `{}`.

### Example `settings` response

```json
{
  "color": "#FF0000",
  "colorMethod": "hex"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the color picker column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: color_picker
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
                "description": "Color value (hex or rgb string)"
              },
              "colorMethod": {
                "type": "string",
                "description": "Color representation method",
                "enum": [
                  "rgb",
                  "hex"
                ]
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
