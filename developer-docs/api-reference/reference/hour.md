---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Hour

Learn how to filter by, read, update, and clear the hour column on monday boards using the platform API

The [hour column](https://support.monday.com/hc/en-us/articles/360001272365-The-Hour-Column) stores a specific time value in HH:MM format using 24-hour time internally. It is commonly used for scheduling, logging, or setting deadlines within a day.

Via the API, the hour column supports read, filter, update, and clear operations.

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
        `hour`
      </td>

      <td style={{ textAlign: "left" }}>
        `HourValue`
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

Hour columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `HourValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on HourValue {
        id
        hour
        minute
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
        ... on HourValue {
          id
          hour
          minute
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `HourValue` implementation will return.

| Field              | Description                                                                                               |
| :----------------- | :-------------------------------------------------------------------------------------------------------- |
| column `Column!`   | The column the value belongs to.                                                                          |
| hour `Int`         | The hour value (0–23, 24-hour format). Returns `null` if the column is empty.                             |
| id `ID!`           | The column's unique identifier.                                                                           |
| minute `Int`       | The minute value (0–59). Returns `null` if the column is empty.                                           |
| text `String`      | The column's value as formatted text (e.g., `"02:30 PM"`). Returns `""` if the column has an empty value. |
| type `ColumnType!` | The column's type.                                                                                        |
| updated\_at `Date` | The column's last updated date.                                                                           |
| value `JSON`       | The column's JSON-formatted raw value. Returns `{"hour": N, "minute": N}` or `null` if empty.             |

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "hour",
            "hour": 14,
            "minute": 30,
            "text": "02:30 PM",
            "value": "{\"hour\":14,\"minute\":30}",
            "updated_at": null
          }
        ]
      },
      {
        "name": "Task B",
        "column_values": [
          {
            "id": "hour",
            "hour": null,
            "minute": null,
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

You can filter items by hour values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The hour column supports the following operators:

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
        An array of time range labels (e.g., `["Afternoon"]`)
      </td>

      <td>
        Returns items whose hour value falls within any of the specified time ranges.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of time range labels (e.g., `["Morning"]`)
      </td>

      <td>
        Excludes items whose hour value falls within any of the specified time ranges.
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
        Returns items with an empty (unset) hour value.
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
        Returns items that have an hour value set.
      </td>
    </tr>
  </tbody>
</Table>

## Compare values

Hour column filters use predefined time range labels aligned with the UI. These values depend on the user's timezone settings when making the API call.

| Label           | Time Range         |
| :-------------- | :----------------- |
| `Early morning` | 4:00 – 7:00 AM     |
| `Morning`       | 7:00 AM – 12:00 PM |
| `Afternoon`     | 12:00 – 8:00 PM    |
| `Evening`       | 8:00 – 11:00 PM    |
| `Night`         | 11:00 PM – 4:00 AM |

## Examples

### Filter by time range

This example returns items with an hour column value in the `Afternoon` range:

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "hour"
            compare_value: ["Afternoon"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on HourValue {
            hour
            minute
            text
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
  columnId: "hour",
  compareValue: ["Afternoon"],
  operator: "any_of"
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by multiple time ranges

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "hour"
            compare_value: ["Evening", "Night"]
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

### Filter by empty hour

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "hour"
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

You can create an hour column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Meeting Time"
    column_type: hour
    description: "Scheduled meeting time"
  ) {
    id
    title
    description
  }
}
```

You can optionally pass a `defaults` argument to set the display format:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Meeting Time (24H)"
    column_type: hour
    defaults: "{\"format\": \"24H\"}"
  ) {
    id
    title
  }
}
```

## Update value

You can update an hour column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object with `hour` and `minute` keys. The `hour` field uses 24-hour format (0–23) and `minute` uses 0–59.

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation is **not supported** for the hour column. You must use `change_multiple_column_values` instead.
</Callout>

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"hour\": {\"hour\": 16, \"minute\": 42}}"
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
    hour: {
      hour: 16,
      minute: 42
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Value format

| Key      | Type  | Required | Description                              |
| :------- | :---- | :------- | :--------------------------------------- |
| `hour`   | `Int` | Yes      | The hour value in 24-hour format (0–23). |
| `minute` | `Int` | Yes      | The minute value (0–59).                 |

## Set value on item creation

You can set an hour value when creating an item by passing the hour column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "Morning standup"
    column_values: "{\"hour\": {\"hour\": 9, \"minute\": 0}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear an hour column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `null` in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"hour\": null}"
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
    hour: null
  })
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To view an hour column's display format, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["hour"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object. It may contain the following key:

| Key      | Type     | Description                                                                   |
| :------- | :------- | :---------------------------------------------------------------------------- |
| `format` | `String` | The time display format: `"24H"` or `"12H"`. If omitted, defaults to `"12H"`. |

### Example `settings` response

A column configured for 24-hour display:

```json
{
  "format": "24H"
}
```

A default column (12-hour display) returns an empty object:

```json
{}
```

<Callout icon="📘" theme="info">
  The `format` setting only affects how the time is displayed in the UI and in the `text` field. The `hour` and `minute` fields always use 24-hour format regardless of this setting.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the hour column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: hour
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
              "format": {
                "type": "string",
                "description": "Time display format",
                "enum": [
                  "24H",
                  "12H"
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
