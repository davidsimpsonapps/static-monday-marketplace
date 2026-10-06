---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Date

Learn how to filter, read, update, and clear the date column on monday boards using the platform API

The [date column](https://support.monday.com/hc/en-us/articles/360000317520-The-Date-Column) represents a specific date and optionally a time. It's used for deadlines, milestones, scheduling, and any date-based tracking.

Via the API, the date column supports read, filter, update, and clear operations.

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
        `date`
      </td>

      <td style={{ textAlign: "left" }}>
        `DateValue`
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

Date columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `DateValue`.

<Callout icon="🚧" theme="warn">
  On multi-level boards, date columns with rollup capability require `capabilities: [CALCULATED]` on the `column_values` field to return any values. Without it, the API returns an empty array — even for leaf items with static values.  

  Date rollup columns keep the `DateValue` type. Use the `is_leaf` field to distinguish static values (`true`) from calculated rollup values (`false`).
</Callout>

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on DateValue {
        id
        date
        time
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
        ... on DateValue {
          id
          date
          time
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `DateValue` implementation will return.

| Field                                                                              | Description                                                                                                                                                                      |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#/) | The column the value belongs to.                                                                                                                                                 |
| date `String`                                                                      | The date value in `YYYY-MM-DD` format. Returns `""` if the column has no value.                                                                                                  |
| icon `String`                                                                      | The selected icon as a string.                                                                                                                                                   |
| id `ID!`                                                                           | The column's unique identifier.                                                                                                                                                  |
| is\_leaf `Boolean!`                                                                | Whether this item has no subitems. On multi-level boards with rollup capability, `false` indicates the value is a calculated rollup from child items rather than a static value. |
| text `String`                                                                      | The formatted date and optional time in the user's time zone. Returns `""` if the column has no value.                                                                           |
| time `String`                                                                      | The time value converted to the user's time zone. Returns `""` if no time is set.                                                                                                |
| type `ColumnType!`                                                                 | The column's type.                                                                                                                                                               |
| updated\_at `Date`                                                                 | The column's last updated date.                                                                                                                                                  |
| value `JSON`                                                                       | The raw JSON-formatted column value. Contains `date` and `time` in UTC. Returns `null` if the column has no value.                                                               |

<Callout icon="📘" theme="info">
  The `time` field and the time in `text` are automatically converted to the time zone of the user making the API call. The `value` field always stores times in UTC.
</Callout>

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "date",
            "date": "2026-06-15",
            "time": "12:00",
            "text": "2026-06-15 12:00",
            "value": "{\"date\":\"2026-06-15\",\"time\":\"09:00:00\",\"changed_at\":\"2026-03-21T08:36:10.897Z\"}",
            "updated_at": "2026-03-21T08:36:10+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by date column values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object.

Some compare values are dynamic (e.g., `"TODAY"`, `"THIS_WEEK"`) and depend on the time, time zone, date format, and first day of the week of the user making the API call. Others are static (e.g., `"EXACT"` with a specific date).

<Callout icon="📘" theme="info">
  The results depend on the time zone, date format, and [first day of the week](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) configured in the monday.com profile of the user making the API call.
</Callout>

The table below outlines the supported compare values and their compatible operators.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Compare Value
      </th>

      <th>
        Description
      </th>

      <th>
        Operators
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `"TODAY"`
      </td>

      <td>
        Items with today's date.
      </td>

      <td>
        * `any_of`: items dated today
        * `not_any_of`: items with a date that is not today
        * `greater_than`: dates after today
        * `greater_than_or_equals`: dates on or after today
        * `lower_than`: dates before today
        * `lower_than_or_equal`: dates on or before today
      </td>
    </tr>

    <tr>
      <td>
        `"TOMORROW"`
      </td>

      <td>
        Items with tomorrow's date.
      </td>

      <td>
        * `any_of`: items dated tomorrow
        * `not_any_of`: items not dated tomorrow
        * `greater_than`: dates after tomorrow
        * `greater_than_or_equals`: dates on or after tomorrow
        * `lower_than`: dates before tomorrow
        * `lower_than_or_equal`: dates on or before tomorrow
      </td>
    </tr>

    <tr>
      <td>
        `"YESTERDAY"`
      </td>

      <td>
        Items with yesterday's date.
      </td>

      <td>
        * `any_of`: items dated yesterday
        * `not_any_of`: items not dated yesterday
        * `greater_than`: dates after yesterday
        * `greater_than_or_equals`: dates on or after yesterday
        * `lower_than`: dates before yesterday
        * `lower_than_or_equal`: dates on or before yesterday
      </td>
    </tr>

    <tr>
      <td>
        `"THIS_WEEK"`
      </td>

      <td>
        Items dated during the current week. The [first day of the week](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) is defined by the account settings of the user making the API call.
      </td>

      <td>
        * `any_of`: dates in the current week
        * `not_any_of`: dates not in the current week
        * `greater_than`: dates after this week
        * `greater_than_or_equals`: dates during or after this week
        * `lower_than`: dates before this week
        * `lower_than_or_equal`: dates during or before this week
      </td>
    </tr>

    <tr>
      <td>
        `"ONE_WEEK_AGO"`
      </td>

      <td>
        Items dated during the previous week. The [first day of the week](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) is defined by the account settings of the user making the API call.
      </td>

      <td>
        * `any_of`: dates in the previous week
        * `not_any_of`: dates not in the previous week
        * `greater_than`: dates after the previous week
        * `greater_than_or_equals`: dates during or after the previous week
        * `lower_than`: dates before the previous week
        * `lower_than_or_equal`: dates during or before the previous week
      </td>
    </tr>

    <tr>
      <td>
        `"ONE_WEEK_FROM_NOW"`
      </td>

      <td>
        Items dated during the upcoming week. The [first day of the week](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) is defined by the account settings of the user making the API call.
      </td>

      <td>
        * `any_of`: dates in the upcoming week
        * `not_any_of`: dates not in the upcoming week
        * `greater_than`: dates after the upcoming week
        * `greater_than_or_equals`: dates during or after the upcoming week
        * `lower_than`: dates before the upcoming week
        * `lower_than_or_equal`: dates during or before the upcoming week
      </td>
    </tr>

    <tr>
      <td>
        `"THIS_MONTH"`
      </td>

      <td>
        Items dated during the current month.
      </td>

      <td>
        * `any_of`: dates in the current month
        * `not_any_of`: dates not in the current month
        * `greater_than`: dates after the current month
        * `greater_than_or_equals`: dates during or after the current month
        * `lower_than`: dates before the current month
        * `lower_than_or_equal`: dates during or before the current month
      </td>
    </tr>

    <tr>
      <td>
        `"ONE_MONTH_AGO"`
      </td>

      <td>
        Items dated during the previous month.
      </td>

      <td>
        * `any_of`: dates in the previous month
        * `not_any_of`: dates not in the previous month
        * `greater_than`: dates after the previous month
        * `greater_than_or_equals`: dates during or after the previous month
        * `lower_than`: dates before the previous month
        * `lower_than_or_equal`: dates during or before the previous month
      </td>
    </tr>

    <tr>
      <td>
        `"ONE_MONTH_FROM_NOW"`
      </td>

      <td>
        Items dated during the upcoming month.
      </td>

      <td>
        * `any_of`: dates in the upcoming month
        * `not_any_of`: dates not in the upcoming month
        * `greater_than`: dates after the upcoming month
        * `greater_than_or_equals`: dates during or after the upcoming month
        * `lower_than`: dates before the upcoming month
        * `lower_than_or_equal`: dates during or before the upcoming month
      </td>
    </tr>

    <tr>
      <td>
        `"PAST_DATETIME"`
      </td>

      <td>
        Items with a date and time in the past.
      </td>

      <td>
        * `any_of`: past date and time
        * `not_any_of`: date and time not in the past
      </td>
    </tr>

    <tr>
      <td>
        `"FUTURE_DATETIME"`
      </td>

      <td>
        Items with a date and time in the future.
      </td>

      <td>
        * `any_of`: future date and time
        * `not_any_of`: date and time not in the future
      </td>
    </tr>

    <tr>
      <td>
        `"UPCOMING"`
      </td>

      <td>
        Used with a status column. Returns items not marked as "Done" where the date has not passed. Items with today's date are not considered upcoming.
      </td>

      <td>
        * `any_of`: not "Done" before the date
        * `not_any_of`: "Done" before the date
      </td>
    </tr>

    <tr>
      <td>
        `"OVERDUE"`
      </td>

      <td>
        Used with a status column. Returns items not marked as "Done" where the date has passed. Items with today's date will be considered overdue starting the next day.
      </td>

      <td>
        * `any_of`: not "Done" after the date
        * `not_any_of`: "Done" after the date
      </td>
    </tr>

    <tr>
      <td>
        `"DONE_ON_TIME"`
      </td>

      <td>
        Used with a status column. Returns items marked as "Done" before the date in the date column.
      </td>

      <td>
        * `any_of`: completed before the date
        * `not_any_of`: not completed before the date
      </td>
    </tr>

    <tr>
      <td>
        `"DONE_OVERDUE"`
      </td>

      <td>
        Used with a status column. Returns items marked as "Done" after the date in the date column.
      </td>

      <td>
        * `any_of`: completed after the date
        * `not_any_of`: not completed after the date
      </td>
    </tr>

    <tr>
      <td>
        Exact dates with `"EXACT"` (e.g., `["EXACT", "2026-07-01"]`)
      </td>

      <td>
        Use static dates in `YYYY-MM-DD` format, paired with the `"EXACT"` keyword.
      </td>

      <td>
        * `any_of`: items with the specific date
        * `not_any_of`: items without the specific date
        * `greater_than`: dates after the specified date
        * `greater_than_or_equals`: dates on or after the specified date
        * `lower_than`: dates before the specified date
        * `lower_than_or_equal`: dates on or before the specified date
        * `between`: items between two dates (see example below)
      </td>
    </tr>

    <tr>
      <td>
        `"$$$blank$$$"`
      </td>

      <td>
        Items with a blank date value.
      </td>

      <td>
        * `any_of`: items with a blank value
        * `not_any_of`: items without a blank value
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  You can also use the `is_empty` and `is_not_empty` operators with an empty compare value (`[]`) to filter for items with or without a date value set.
</Callout>

## Examples

### Filter by an exact date

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: ["EXACT", "2026-07-01"]
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
        items { id name }
      }
    }
  }
`;

const variables = {
  boardId: [1234567890],
  columnId: "date",
  compareValue: ["EXACT", "2026-07-01"],
  operator: "any_of",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by multiple compare values

You can combine multiple dynamic and static compare values in a single rule. Each `"EXACT"` keyword applies to the date that immediately follows it.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: [
              "EXACT"
              "2026-09-10"
              "TODAY"
              "EXACT"
              "2026-09-11"
              "TOMORROW"
            ]
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
        items { id name }
      }
    }
  }
`;

const variables = {
  boardId: [1234567890],
  columnId: "date",
  compareValue: ["EXACT", "2026-09-10", "TODAY", "EXACT", "2026-09-11", "TOMORROW"],
  operator: "any_of",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter for dates during or after the current week

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: ["THIS_WEEK"]
            operator: greater_than_or_equals
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

### Filter between two dates

The `between` operator accepts two dates in `YYYY-MM-DD` format and returns items with dates in that range (inclusive).

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: ["2026-06-01", "2026-12-31"]
            operator: between
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

### Filter by `"UPCOMING"`

Returns items not marked as "Done" where the date has not passed. Requires a status column on the board.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: ["UPCOMING"]
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

### Filter for empty date values

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
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

You can create a date column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with `column_type: date`.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: date
    title: "Deadline"
  ) {
    id
    title
  }
}
```

On multi-level boards, date columns are created with `MAX` rollup by default. You can specify a different function or disable rollup:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: date
    title: "Deadline"
    capabilities: { calculated: { function: MIN } }
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
    column_type: date
    title: "Reference Date"
    capabilities: { calculated: { function: NONE } }
  ) {
    id
    title
  }
}
```

## Update value

You can update a date column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

<Callout icon="🚧" theme="warn">
  On multi-level boards, mutations on parent items with calculated rollup values **do not return an error** — the API returns a success response, but the value is not changed. Update child items instead.
</Callout>

### `change_simple_column_value`

Send the date as a string in `YYYY-MM-DD` format, optionally including time as `HH:MM:SS` with a space separator. Values should be in UTC, as they are automatically converted to the user's time zone in the UI.

#### Date only

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "date"
    value: "2026-06-15"
  ) {
    id
  }
}
```

#### Date with time

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "date"
    value: "2026-06-15 09:00:00"
  ) {
    id
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValue: String!, $columnId: String!) {
    change_simple_column_value(
      item_id: $itemId
      board_id: $boardId
      column_id: $columnId
      value: $columnValue
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnId: "date",
  columnValue: "2026-06-15 09:00:00",
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the `date` and optional `time` keys as a JSON object in `column_values`. The `date` key uses `YYYY-MM-DD` format and the `time` key uses `HH:MM:SS` format (UTC).

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"date\": {\"date\": \"2026-06-15\", \"time\": \"09:00:00\"}}"
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
    date: {
      date: "2026-06-15",
      time: "09:00:00"
    }
  }),
};

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  Omit the `time` key to set a date-only value. When no time is set, the `time` field returns `""` and the raw `value` stores `"time": null`.
</Callout>

## Set date on item creation

You can set a date value when creating an item by passing the date column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"date\": {\"date\": \"2026-06-15\", \"time\": \"09:00:00\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a date column using `change_simple_column_value` or `change_multiple_column_values`.

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "date"
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
    column_values: "{\"date\": null}"
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
    date: null
  }),
};

const response = await mondayApiClient.request(query, variables);
```

***

# Reading column configuration

To understand a date column's display settings, you can query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    columns(ids: ["date"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key                       | Type      | Description                                                                                |
| :------------------------ | :-------- | :----------------------------------------------------------------------------------------- |
| `show_current_year`       | `boolean` | Whether to show the current year in the date display.                                      |
| `show_week_day`           | `boolean` | Whether to show the day of the week.                                                       |
| `show_week_number`        | `boolean` | Whether to show the week number.                                                           |
| `show_time_by_default`    | `boolean` | Whether to show time by default in the column.                                             |
| `hide_footer`             | `boolean` | Whether to hide the footer in the date picker.                                             |
| `use_numeric_only_format` | `boolean` | Whether to use numeric-only format (e.g., `03/21/2026` instead of `Mar 21, 2026`).         |
| `show_add_icon`           | `boolean` | Whether to show the add icon.                                                              |
| `show_weekends`           | `boolean` | Whether to show weekends in the date picker.                                               |
| `calcType`                | `string`  | Calculation type for date aggregation. One of `earliestToLatest`, `earliest`, or `latest`. |
| `date_format`             | `string`  | Date format configuration.                                                                 |
| `time_format`             | `string`  | Time format configuration.                                                                 |

<Callout icon="📘" theme="info">
  A date column with default settings returns an empty `settings` object (`{}`). Only customized settings appear in the response.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the date column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: date
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
              "show_current_year": {
                "type": "boolean",
                "description": "Whether to show the current year"
              },
              "show_week_day": {
                "type": "boolean",
                "description": "Whether to show the day of the week"
              },
              "show_week_number": {
                "type": "boolean",
                "description": "Whether to show the week number"
              },
              "show_time_by_default": {
                "type": "boolean",
                "description": "Whether to show time by default"
              },
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              },
              "use_numeric_only_format": {
                "type": "boolean",
                "description": "Whether to use numeric only format"
              },
              "show_add_icon": {
                "type": "boolean",
                "description": "Whether to show the add icon"
              },
              "show_weekends": {
                "type": "boolean",
                "description": "Whether to show weekends"
              },
              "calcType": {
                "type": "string",
                "description": "Calculation type for date column",
                "enum": ["earliestToLatest", "earliest", "latest"]
              },
              "state": {
                "type": "integer",
                "description": "Column state",
                "enum": [0, 1]
              },
              "date_format": {
                "type": "string",
                "description": "Date format configuration"
              },
              "time_format": {
                "type": "string",
                "description": "Time format configuration"
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
