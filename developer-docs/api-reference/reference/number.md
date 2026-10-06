---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Numbers

Learn how to filter by, read, update, and clear the numbers column on monday boards using the platform API

The [numbers column](https://support.monday.com/hc/en-us/articles/115005310565-The-Numbers-Column) stores numeric values (floats or integers) and may optionally include a unit symbol (e.g., `$`, `%`, or a custom string). It is commonly used for budgets, scores, quantities, and other measurable data.

Via the API, the numbers column supports read, filter, update, and clear operations.

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
        `numbers`
      </td>

      <td style={{ textAlign: "left" }}>
        `NumbersValue`
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

Numbers columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `NumbersValue`.

<Callout icon="🚧" theme="warn">
  On multi-level boards, number columns with rollup capability require `capabilities: [CALCULATED]` on the `column_values` field to return any values. Without it, the API returns an empty array — even for leaf items with static values.  

  Number rollup columns keep the `NumbersValue` type. Use the `is_leaf` field to distinguish static values (`true`) from calculated rollup values (`false`).
</Callout>

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on NumbersValue {
        id
        number
        symbol
        direction
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
        ... on NumbersValue {
          id
          number
          symbol
          direction
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `NumbersValue` implementation will return.

| Field                                                             | Description                                                                                                                                                                      |
| :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column `Column!`                                                  | The column the value belongs to.                                                                                                                                                 |
| direction [`NumberValueUnitDirection`](#numbervalueunitdirection) | Indicates where the unit symbol is placed relative to the number. `left` or `right`.                                                                                             |
| id `ID!`                                                          | The column's unique identifier.                                                                                                                                                  |
| is\_leaf `Boolean!`                                               | Whether this item has no subitems. On multi-level boards with rollup capability, `false` indicates the value is a calculated rollup from child items rather than a static value. |
| number `Float`                                                    | The column's numeric value. Returns `null` if the column is empty.                                                                                                               |
| symbol `String`                                                   | The unit symbol applied to the column (e.g., `$`, `%`). Returns `null` if no unit is configured.                                                                                 |
| text `String`                                                     | The column's value as text. Returns `""` if the column has an empty value.                                                                                                       |
| type `ColumnType!`                                                | The column's type.                                                                                                                                                               |
| value `JSON`                                                      | The column's raw value as a JSON string. Returns `null` if the column is empty.                                                                                                  |

### NumberValueUnitDirection

An enum indicating the position of a number value's unit symbol.

| Enum value | Description                                      |
| :--------- | :----------------------------------------------- |
| left       | The symbol is placed to the left of the number.  |
| right      | The symbol is placed to the right of the number. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Alpha",
        "column_values": [
          {
            "id": "numbers",
            "number": 4.5,
            "symbol": "$",
            "direction": "left",
            "text": "4.50",
            "value": "\"4.50\""
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  The `value` field returns a JSON-encoded string containing the numeric value (e.g., `"\"4.50\""`). The `number` field returns the parsed float directly and is easier to work with programmatically.
</Callout>

***

# Filter

You can filter items by numeric values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The numbers column supports the following operators:

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
        A numeric value or `"$$$blank$$$"`
      </td>

      <td>
        Returns items whose value matches any of the specified numbers. Use `"$$$blank$$$"` to match blank values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        A numeric value or `"$$$blank$$$"`
      </td>

      <td>
        Excludes items whose value matches any of the specified numbers. Use `"$$$blank$$$"` to exclude blank values.
      </td>
    </tr>

    <tr>
      <td>
        `greater_than`
      </td>

      <td>
        A numeric value
      </td>

      <td>
        Returns items whose value is strictly greater than the specified number.
      </td>
    </tr>

    <tr>
      <td>
        `greater_than_or_equals`
      </td>

      <td>
        A numeric value
      </td>

      <td>
        Returns items whose value is greater than or equal to the specified number.
      </td>
    </tr>

    <tr>
      <td>
        `lower_than`
      </td>

      <td>
        A numeric value
      </td>

      <td>
        Returns items whose value is strictly less than the specified number.
      </td>
    </tr>

    <tr>
      <td>
        `lower_than_or_equals`
      </td>

      <td>
        A numeric value
      </td>

      <td>
        Returns items whose value is less than or equal to the specified number.
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
        Returns items with an empty (unset) number value.
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
        Returns items that have a number value set.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by greater than

This example returns all items whose number column value is greater than 5.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "numbers"
            compare_value: [5]
            operator: greater_than
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on NumbersValue {
            number
          }
        }
      }
    }
  }
}
```

### Filter by exact value

This example returns all items whose number column value equals 100.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "numbers"
            compare_value: [100]
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

### Filter by empty value

This example returns all items whose number column is empty.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "numbers"
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

You can create a numbers column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. There is no typed `create_numbers_column` mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: numbers
    title: "Budget"
    description: "Project budget in USD"
    defaults: "{\"unit\":{\"symbol\":\"$\",\"direction\":\"left\",\"precision\":2}}"
  ) {
    id
    title
    description
  }
}
```

On multi-level boards, number columns are created with `SUM` rollup by default. You can specify a different function or disable rollup:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: numbers
    title: "Budget"
    capabilities: { calculated: { function: SUM } }
  ) {
    id
    title
  }
}
```

To disable rollup, pass `function: NONE`:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: numbers
    title: "Reference Number"
    capabilities: { calculated: { function: NONE } }
  ) {
    id
    title
  }
}
```

### Column settings

You can configure the column's unit and display settings via the `defaults` argument. Pass a JSON string with the following structure:

| Property           | Type      | Description                                                                                     |
| :----------------- | :-------- | :---------------------------------------------------------------------------------------------- |
| `unit.symbol`      | `String`  | The unit symbol to display (e.g., `"$"`, `"%"`, `"custom"`). Use `"custom"` with `custom_unit`. |
| `unit.custom_unit` | `String`  | A custom unit string when `symbol` is set to `"custom"`.                                        |
| `unit.direction`   | `String`  | Where to place the symbol: `"left"` or `"right"`.                                               |
| `unit.precision`   | `Integer` | Number of decimal places to display. Values: `-1` (automatic), `0` through `5`.                 |
| `hide_footer`      | `Boolean` | Whether to hide the column's summary footer.                                                    |

## Update value

You can update a numbers column value using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

<Callout icon="🚧" theme="warn">
  On multi-level boards, mutations on parent items with calculated rollup values **do not return an error** — the API returns a success response, but the value is not changed. Update child items instead.
</Callout>

### `change_simple_column_value`

Send a string containing an integer or float.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "numbers"
    value: "42.5"
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
  columnId: "numbers",
  value: "42.5"
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the numeric value as a string in a JSON object.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"numbers\": \"42.5\"}"
  ) {
    id
  }
}
```

### Set value on item creation

You can set a numbers value when creating an item by passing the value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"numbers\": \"100\"}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a numbers column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "numbers"
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
    column_values: "{\"numbers\": null}"
  ) {
    id
  }
}
```

<Callout icon="🚧" theme="warn">
  When using `change_multiple_column_values`, you must pass `null` to clear the value. Passing an empty string (`""`) will set the value to `0` instead of clearing it.
</Callout>

***

# Reading column configuration

To understand a numbers column's unit settings, you can query its configuration through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["numbers"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                | Type      | Description                                                               |
| :----------------- | :-------- | :------------------------------------------------------------------------ |
| `unit`             | `Object`  | The unit configuration object. Empty (`{}`) if no unit is configured.     |
| `unit.symbol`      | `String`  | The unit symbol (e.g., `"$"`, `"%"`, `"custom"`).                         |
| `unit.custom_unit` | `String`  | The custom unit string, used when `symbol` is `"custom"`.                 |
| `unit.direction`   | `String`  | The placement of the symbol relative to the value: `"left"` or `"right"`. |
| `unit.precision`   | `Integer` | Number of decimal places: `-1` (automatic), `0` through `5`.              |
| `hide_footer`      | `Boolean` | Whether the summary footer is hidden.                                     |

### Example `settings` response

A column configured with a dollar symbol:

```json
{
  "unit": {
    "symbol": "$",
    "custom_unit": "",
    "direction": "left"
  }
}
```

A column with no unit configured:

```json
{}
```

***

# Get column type schema

You can retrieve the JSON schema for the numbers column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: numbers
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
              "unit": {
                "type": "object",
                "properties": {
                  "symbol": {
                    "type": "string",
                    "description": "Unit symbol type (e.g., \"custom\", \"$\", etc.)"
                  },
                  "custom_unit": {
                    "type": "string",
                    "description": "Custom unit symbol when symbol is \"custom\""
                  },
                  "direction": {
                    "type": "string",
                    "enum": [
                      "left",
                      "right"
                    ],
                    "description": "Position of the unit symbol relative to the value"
                  },
                  "precision": {
                    "type": "integer",
                    "enum": [
                      -1,
                      0,
                      1,
                      2,
                      3,
                      4,
                      5
                    ],
                    "description": "Number of decimal places to display (-1 for automatic)"
                  }
                },
                "additionalProperties": false
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

The response includes property names, types, constraints (such as allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
