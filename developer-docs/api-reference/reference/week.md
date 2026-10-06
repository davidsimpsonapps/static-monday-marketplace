---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Week

Learn how to read, filter, update, and clear week columns using the monday.com platform API

The [week column](https://support.monday.com/hc/en-us/articles/360001144769-The-Week-Column) represents a week-long date range. The start and end dates adapt to the [first-day-of-week settings](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) configured in the monday.com account.

Via the API, the week column supports read, filter, create, update, and clear operations.

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
        `week`
      </td>

      <td style={{ textAlign: "left" }}>
        `WeekValue`
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

Week columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `WeekValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on WeekValue {
        id
        start_date
        end_date
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
        ... on WeekValue {
          id
          start_date
          end_date
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `WeekValue` implementation will return.

| Field                                                                            | Description                                                                                     |
| :------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                                |
| end\_date `Date`                                                                 | The week's end date. Returns `null` if no week is set.                                          |
| id `ID!`                                                                         | The column's unique identifier.                                                                 |
| start\_date `Date`                                                               | The week's start date. Returns `null` if no week is set.                                        |
| text `String`                                                                    | The week range as text (e.g., `"2026-03-16 - 2026-03-22"`). Returns `""` if empty.              |
| type `ColumnType!`                                                               | The column's type (`week`).                                                                     |
| value `JSON`                                                                     | The column's raw value as a JSON string. Contains `week` object with `startDate` and `endDate`. |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Sprint 12",
        "column_values": [
          {
            "id": "week",
            "start_date": "2026-03-16",
            "end_date": "2026-03-22",
            "text": "2026-03-16 - 2026-03-22",
            "value": "{\"week\":{\"startDate\":\"2026-03-16\",\"endDate\":\"2026-03-22\"}}"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by week values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The week column supports relative time-based and empty/non-empty filtering.

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
        An array of relative week identifiers
      </td>

      <td>
        Returns items whose week matches any of the specified periods. See [compare values](#compare-values) below.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of relative week identifiers
      </td>

      <td>
        Excludes items whose week matches any of the specified periods.
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
        Returns items with no week value set.
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
        Returns items that have a week value set.
      </td>
    </tr>
  </tbody>
</Table>

### Compare values

| Value          | Description        |
| :------------- | :----------------- |
| `"THIS_WEEK"`  | The current week   |
| `"NEXT_WEEKS"` | All upcoming weeks |
| `"PAST_WEEKS"` | All previous weeks |

## Examples

### Filter for current week

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "week"
            compare_value: ["THIS_WEEK"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on WeekValue {
            start_date
            end_date
          }
        }
      }
    }
  }
}
```

### Filter for past weeks

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "week"
            compare_value: ["PAST_WEEKS"]
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

***

# Mutations

## Create

**Required scope: `boards:write`**

The [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation creates a new week column via the API.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Sprint Week"
    column_type: week
  ) {
    id
    title
    type
  }
}
```

## Update value

You can update a week column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object with `startDate` and `endDate` in `YYYY-MM-DD` format.

<Callout icon="🚧" theme="warn">
  The dates must span exactly one week (7 days) and the `startDate` must align with the account's [first-day-of-week setting](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar). If the dates don't form a valid week, the API will return an error.
</Callout>

### `change_multiple_column_values`

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"week\": {\"week\": {\"startDate\": \"2026-03-16\", \"endDate\": \"2026-03-22\"}}}"
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
    week: {
      week: {
        startDate: "2026-03-16",
        endDate: "2026-03-22"
      }
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set week on item creation

You can set a week value when creating an item by passing the week column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "Sprint 12"
    column_values: "{\"week\": {\"week\": {\"startDate\": \"2026-03-16\", \"endDate\": \"2026-03-22\"}}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a week column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values) by passing `null` or an empty object.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"week\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

To read a week column's configuration, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["week"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key     | Type     | Description                                                                                   |
| :------ | :------- | :-------------------------------------------------------------------------------------------- |
| `color` | `string` | Hex color code for the week column display (e.g., `"#037f4c"`). Must be exactly 7 characters. |

### Example `settings` response

```json
{
  "color": "#037f4c"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the week column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: week
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
                "description": "Hex color code for the week column display (e.g., #037f4c)",
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
