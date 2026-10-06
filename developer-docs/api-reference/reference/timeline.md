---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Timeline

Learn how to create, filter by, read, update, and clear the timeline column on monday boards using the platform API

The [timeline column](https://support.monday.com/hc/en-us/articles/115005333969-The-Timeline-Column) stores a date range, allowing items to represent time spans such as project durations or sprints. It uses the `timeline` column type and returns values as `TimelineValue` in the GraphQL schema.

Via the API, the timeline column supports read, filter, create, update, and clear operations. Updates and clears use `change_multiple_column_values` only.

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
        `timeline`
      </td>

      <td style={{ textAlign: "left" }}>
        `TimelineValue`
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

***

# Queries

Timeline columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `TimelineValue`.

<Callout icon="🚧" theme="warn">
  On multi-level boards, timeline columns with rollup capability require `capabilities: [CALCULATED]` on the `column_values` field to return any values. Without it, the API returns an empty array — even for leaf items with static values.  

  Timeline rollup columns keep the `TimelineValue` type. Use the `is_leaf` field to distinguish static values (`true`) from calculated rollup values (`false`). The `MIN_MAX` function calculates the earliest `from` date and latest `to` date across all child items.
</Callout>

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on TimelineValue {
        id
        from
        to
        text
        visualization_type
        updated_at
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
        ... on TimelineValue {
          id
          from
          to
          text
          visualization_type
          updated_at
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

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `TimelineValue` implementation will return.

| Field                                                                            | Description                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                                                                                                                                                |
| from `Date`                                                                      | The timeline's start date as an ISO 8601 datetime (e.g., `"2026-03-01T00:00:00+00:00"`). Returns `null` if no timeline is set.                                                                                  |
| id `ID!`                                                                         | The column's unique identifier.                                                                                                                                                                                 |
| is\_leaf `Boolean!`                                                              | Whether this item has no subitems. On multi-level boards with rollup capability, `false` indicates the value is a calculated rollup from child items rather than a static value.                                |
| text `String`                                                                    | The date range as text in `YYYY-MM-DD - YYYY-MM-DD` format (e.g., `"2026-03-01 - 2026-03-15"`). Returns `""` if empty.                                                                                          |
| to `Date`                                                                        | The timeline's end date as an ISO 8601 datetime (e.g., `"2026-03-15T00:00:00+00:00"`). Returns `null` if no timeline is set.                                                                                    |
| type `ColumnType!`                                                               | The column's type (`timeline`).                                                                                                                                                                                 |
| updated\_at `Date`                                                               | The date when the column value was last updated. Returns `null` if the value was set during item creation and never subsequently updated.                                                                       |
| value `JSON`                                                                     | The column's raw value as a JSON string containing `from` and `to` dates. Includes a `changed_at` timestamp after updates via `change_multiple_column_values`, but not when initially set during item creation. |
| visualization\_type `String`                                                     | The column's visualization type. Returns `null` by default; returns `"milestone"` if the item is set as a milestone.                                                                                            |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Sprint 1",
        "column_values": [
          {
            "id": "timeline",
            "from": "2026-03-01T00:00:00+00:00",
            "to": "2026-03-15T00:00:00+00:00",
            "text": "2026-03-01 - 2026-03-15",
            "visualization_type": null,
            "updated_at": "2026-03-01T10:00:00+00:00",
            "value": "{\"to\":\"2026-03-15\",\"from\":\"2026-03-01\",\"changed_at\":\"2026-03-01T10:00:00.000Z\"}"
          }
        ]
      },
      {
        "name": "Sprint 2",
        "column_values": [
          {
            "id": "timeline",
            "from": null,
            "to": null,
            "text": "",
            "visualization_type": null,
            "updated_at": null,
            "value": null
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by timeline values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The timeline column supports the following operators:

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
        `"CURRENT"`, `"DUE_TODAY"`, `"FUTURE_TIMELINE"`, `"PAST_TIMELINE"`, `"DONE_ON_TIME"`, `"OVERDUE"`, `"DONE_OVERDUE"`, `"MILESTONE"`, `"$$$blank$$$"`
      </td>

      <td>
        Returns items matching any of the specified timeline states.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        Same values as `any_of`
      </td>

      <td>
        Excludes items matching any of the specified timeline states.
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
        Returns items with no timeline set.
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
        Returns items that have a timeline set.
      </td>
    </tr>

    <tr>
      <td>
        `greater_than`
      </td>

      <td>
        `"TODAY"`, `"TOMORROW"`, `"YESTERDAY"`, `"THIS_WEEK"`, `"ONE_WEEK_AGO"`, `"ONE_WEEK_FROM_NOW"`, `"THIS_MONTH"`, `"ONE_MONTH_AGO"`, `"ONE_MONTH_FROM_NOW"`, or `["EXACT", "YYYY-MM-DD"]`
      </td>

      <td>
        Returns items where the specified date attribute is after the compare value. Requires `compare_attribute`.
      </td>
    </tr>

    <tr>
      <td>
        `greater_than_or_equals`
      </td>

      <td>
        Same values as `greater_than`
      </td>

      <td>
        Returns items where the specified date attribute is on or after the compare value. Requires `compare_attribute`.
      </td>
    </tr>

    <tr>
      <td>
        `lower_than`
      </td>

      <td>
        Same values as `greater_than`
      </td>

      <td>
        Returns items where the specified date attribute is before the compare value. Requires `compare_attribute`.
      </td>
    </tr>

    <tr>
      <td>
        `lower_than_or_equal`
      </td>

      <td>
        Same values as `greater_than`
      </td>

      <td>
        Returns items where the specified date attribute is on or before the compare value. Requires `compare_attribute`.
      </td>
    </tr>

    <tr>
      <td>
        `between`
      </td>

      <td>
        Same values as `greater_than`
      </td>

      <td>
        Returns items where the specified date attribute falls within the given range. Requires `compare_attribute`.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The `greater_than`, `greater_than_or_equals`, `lower_than`, `lower_than_or_equal`, and `between` operators require the `compare_attribute` field set to either `"START_DATE"` or `"END_DATE"` to specify which date in the range to compare against.
</Callout>

## Examples

### Filter current timelines

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "timeline"
            compare_value: ["CURRENT"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on TimelineValue {
            from
            to
          }
        }
      }
    }
  }
}
```

### Filter by end date after this week

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "timeline"
            compare_value: "THIS_WEEK"
            compare_attribute: "END_DATE"
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

### Filter by exact start date

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "timeline"
            compare_value: ["EXACT", "2026-03-01"]
            compare_attribute: "START_DATE"
            operator: lower_than_or_equal
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

You can create a timeline column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation with the `column_type` set to `timeline`. You can optionally configure display settings through the `defaults` argument.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Project Duration"
    column_type: timeline
    defaults: "{\"settings\": {\"show_weekends\": false, \"show_week_number\": true}}"
  ) {
    id
    title
    settings
  }
}
```

On multi-level boards, timeline columns are created with `MIN_MAX` rollup by default. To disable rollup:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: timeline
    title: "Reference Timeline"
    capabilities: { calculated: { function: NONE } }
  ) {
    id
    title
  }
}
```

The `defaults` argument accepts a JSON string containing a `settings` object with the following optional fields:

| Field                   | Type      | Description                                           |
| :---------------------- | :-------- | :---------------------------------------------------- |
| `hide_footer`           | `boolean` | Whether to hide the column footer.                    |
| `show_set_as_milestone` | `boolean` | Whether to show the "Set as milestone" option.        |
| `show_weekends`         | `boolean` | Whether to show weekends in the timeline display.     |
| `show_week_number`      | `boolean` | Whether to show week numbers in the timeline display. |

<Callout icon="⚠️" theme="warning">
  The `change_simple_column_value` mutation is not supported for the timeline column. Use `change_multiple_column_values` instead.
</Callout>

## Update

You can update a timeline column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing a JSON object with `from` and `to` dates in `YYYY-MM-DD` format.

<Callout icon="🚧" theme="warn">
  On multi-level boards, mutations on parent items with calculated rollup values **do not return an error** — the API returns a success response, but the value is not changed. Update child items instead.
</Callout>

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"timeline\": {\"from\": \"2026-03-01\", \"to\": \"2026-03-15\"}}"
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
    timeline: { from: "2026-03-01", to: "2026-03-15" }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Set timeline on item creation

You can set a timeline when creating an item by passing the timeline column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New sprint"
    column_values: "{\"timeline\": {\"from\": \"2026-04-01\", \"to\": \"2026-04-14\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a timeline column using [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values) by passing `null` or an empty object `{}`. Both clear the `from` and `to` fields, but passing `null` sets the raw `value` to `null`, while `{}` retains a `changed_at` timestamp in the `value`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"timeline\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

You can read the timeline column's configuration by querying the `settings` field on the [`columns`](https://developer.monday.com/api-reference/reference/columns) object.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["timeline"]) {
      id
      title
      settings
    }
  }
}
```

### Example `settings` response

The `settings` field returns `{}` by default. When display settings have been configured, the response contains:

```json
{
  "hide_footer": false,
  "show_set_as_milestone": true,
  "show_weekends": true,
  "show_week_number": false
}
```

| Field                   | Type      | Description                                     |
| :---------------------- | :-------- | :---------------------------------------------- |
| `hide_footer`           | `boolean` | Whether the column footer is hidden.            |
| `show_set_as_milestone` | `boolean` | Whether the "Set as milestone" option is shown. |
| `show_weekends`         | `boolean` | Whether weekends are displayed.                 |
| `show_week_number`      | `boolean` | Whether week numbers are displayed.             |

***

# Get column type schema

You can retrieve the JSON schema for the timeline column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query.

```graphql GraphQL
query {
  get_column_type_schema(
    type: timeline
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
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              },
              "show_set_as_milestone": {
                "type": "boolean",
                "description": "Whether to show set as milestone option"
              },
              "show_weekends": {
                "type": "boolean",
                "description": "Whether to show weekends"
              },
              "show_week_number": {
                "type": "boolean",
                "description": "Whether to show week numbers"
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
