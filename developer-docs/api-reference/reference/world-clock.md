---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# World Clock

Learn how to read, filter, update, and clear world clock columns using the monday.com platform API

The [world clock column](https://support.monday.com/hc/en-us/articles/360001139425-The-World-Clock-column) displays the current time for a selected global timezone. It is commonly used to track team members' local times across distributed teams.

Via the API, the world clock column supports read, filter, create, update, and clear operations.

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
        `world_clock`
      </td>

      <td style={{ textAlign: "left" }}>
        `WorldClockValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **Yes** (`change_multiple_column_values` only)
        * Clear: **Yes** (`change_multiple_column_values` only)
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="🚧" theme="warn">
  The world clock column does **not** support `change_simple_column_value`. Use `change_multiple_column_values` for all updates and clears.
</Callout>

***

# Queries

World clock columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `WorldClockValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on WorldClockValue {
        id
        timezone
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
        ... on WorldClockValue {
          id
          timezone
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `WorldClockValue` implementation will return.

| Field                                                                            | Description                                                                                                         |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                                                    |
| id `ID!`                                                                         | The column's unique identifier.                                                                                     |
| text `String`                                                                    | The IANA timezone identifier as text (e.g., `"Europe/London"`). Returns `""` if empty.                              |
| timezone `String`                                                                | The IANA timezone identifier (e.g., `"Europe/London"`, `"America/New_York"`). Returns `null` if no timezone is set. |
| type `ColumnType!`                                                               | The column's type (`world_clock`).                                                                                  |
| updated\_at `Date`                                                               | The date when the column value was last updated.                                                                    |
| value `JSON`                                                                     | The column's raw value as a JSON string.                                                                            |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "London Office",
        "column_values": [
          {
            "id": "world_clock",
            "timezone": "Europe/London",
            "text": "Europe/London",
            "value": "{\"timezone\":\"Europe/London\",\"changed_at\":\"2026-03-21T10:58:37.307Z\"}",
            "updated_at": "2026-03-21T10:58:37+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by world clock values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The world clock column supports filtering by timezone display name.

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
        An array of timezone display names (e.g., `["London"]`)
      </td>

      <td>
        Returns items whose world clock matches any of the specified timezone names as shown in the monday.com UI.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of timezone display names (e.g., `["London"]`)
      </td>

      <td>
        Excludes items whose world clock matches any of the specified timezone names.
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
        Returns items with no timezone set.
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
        Returns items that have a timezone set.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The `compare_value` for `any_of` and `not_any_of` uses the timezone's **display name** as shown in the monday.com UI (e.g., `"London"`, `"New York"`), not the IANA timezone identifier used in mutations (e.g., `"Europe/London"`).
</Callout>

## Examples

### Filter by timezone

This example returns all items with a world clock set to "London".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "world_clock"
            compare_value: ["London"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on WorldClockValue {
            timezone
            text
          }
        }
      }
    }
  }
}
```

### Filter for empty world clock

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "world_clock"
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

The [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation creates a new world clock column via the API.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Local Time"
    column_type: world_clock
  ) {
    id
    title
    type
  }
}
```

## Update value

You can update a world clock column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). Send a valid [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) in `Continent/City` format (e.g., `"Europe/London"`, `"America/New_York"`, `"Asia/Tokyo"`).

<Callout icon="🚧" theme="warn">
  The world clock column does **not** support `change_simple_column_value`. Attempting to use it will return an error: *"column type TimezoneColumn is not supporting changing the column value with simple column value."*
</Callout>

### `change_multiple_column_values`

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"world_clock\": {\"timezone\": \"Europe/London\"}}"
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
    world_clock: { timezone: "Europe/London" }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set world clock on item creation

You can set a timezone when creating an item by passing the world clock column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "London Office"
    column_values: "{\"world_clock\": {\"timezone\": \"Europe/London\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a world clock column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values) by passing `null`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"world_clock\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

To read a world clock column's configuration, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["world_clock"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                 | Type      | Description                                                                        |
| :------------------ | :-------- | :--------------------------------------------------------------------------------- |
| `format`            | `string`  | Time display format string (e.g., `"HH:mm"` for 24-hour, `"hh:mm A"` for 12-hour). |
| `startWorkingHours` | `string`  | Start of working hours as a string number (`"0"` to `"23"`).                       |
| `endWorkingHours`   | `string`  | End of working hours as a string number (`"0"` to `"23"`).                         |
| `show_utc_offset`   | `boolean` | Whether to display the UTC offset alongside the time.                              |

### Example `settings` response

When no custom settings are configured:

```json
{}
```

When settings are configured:

```json
{
  "format": "hh:mm A",
  "startWorkingHours": "9",
  "endWorkingHours": "17",
  "show_utc_offset": true
}
```

***

# Get column type schema

You can retrieve the JSON schema for the world clock column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: world_clock
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
                "description": "Time display format string (e.g., HH:mm, hh:mm A)"
              },
              "startWorkingHours": {
                "type": "string",
                "description": "Start of working hours (0-23)",
                "enum": ["0", "1", "2", "...", "23"]
              },
              "endWorkingHours": {
                "type": "string",
                "description": "End of working hours (0-23)",
                "enum": ["0", "1", "2", "...", "23"]
              },
              "show_utc_offset": {
                "type": "boolean",
                "description": "Whether to show UTC offset alongside the time"
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
