---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Time Tracking

Learn how to read, filter, and create the time tracking column on monday boards using the platform API

The [time tracking column](https://support.monday.com/hc/en-us/articles/360001143809-The-Time-Tracking-column-) records the total time spent on an item, allowing teams to track work duration across multiple sessions. Users can start and stop the timer, and the column stores a complete history of tracking sessions.

Via the API, the time tracking column supports read, filter, and create operations. Timer values cannot be updated or cleared directly through the API.

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
        `time_tracking`
      </td>

      <td style={{ textAlign: "left" }}>
        `TimeTrackingValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Time tracking columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `TimeTrackingValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on TimeTrackingValue {
        id
        duration
        running
        started_at
        updated_at
        history {
          id
          status
          started_at
          ended_at
          started_user_id
          ended_user_id
          created_at
        }
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
        ... on TimeTrackingValue {
          id
          duration
          running
          started_at
          updated_at
          history {
            id
            status
            started_at
            ended_at
            started_user_id
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `TimeTrackingValue` implementation will return.

| Field                                                                            | Description                                                                                     |
| :------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                                |
| duration `Int`                                                                   | The total tracked time in seconds across all sessions. Returns `0` if no time has been tracked. |
| history [`[TimeTrackingHistoryItem!]!`](#history-fields)                         | An array of tracking session records. See [history fields](#history-fields) below.              |
| id `ID!`                                                                         | The column's unique identifier.                                                                 |
| running `Boolean`                                                                | Whether the timer is currently running. Returns `false` if never started or paused.             |
| started\_at `Date`                                                               | The date when the currently running session was started. Returns `null` if not running.         |
| text `String`                                                                    | The total duration as text (e.g., `"02:30:00"`). Returns `""` if no time has been tracked.      |
| type `ColumnType!`                                                               | The column's type (`time_tracking`).                                                            |
| updated\_at `Date`                                                               | The date when the column value was last updated.                                                |
| value `JSON`                                                                     | The column's raw value as a JSON string.                                                        |

## History fields

Each entry in the `history` array represents a single tracking session (a `TimeTrackingHistoryItem`).

| Field                                     | Description                                                                              |
| :---------------------------------------- | :--------------------------------------------------------------------------------------- |
| id `ID!`                                  | A unique session identifier.                                                             |
| status `String!`                          | The status of the session (e.g., `"active"`, `"stopped"`).                               |
| started\_at `Date`                        | When the session was started. Only present if started via the play button or automation. |
| ended\_at `Date`                          | When the session ended. Only present for completed sessions.                             |
| started\_user\_id `ID`                    | The ID of the user who started the session.                                              |
| ended\_user\_id `ID`                      | The ID of the user who ended the session.                                                |
| created\_at `Date!`                       | When the session record was created.                                                     |
| updated\_at `Date`                        | When the session was last updated.                                                       |
| manually\_entered\_start\_date `Boolean!` | Whether the start date was manually entered.                                             |
| manually\_entered\_start\_time `Boolean!` | Whether the start time was manually entered.                                             |
| manually\_entered\_end\_date `Boolean!`   | Whether the end date was manually entered.                                               |
| manually\_entered\_end\_time `Boolean!`   | Whether the end time was manually entered.                                               |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Design Review",
        "column_values": [
          {
            "id": "time_tracking",
            "duration": 5400,
            "running": false,
            "started_at": null,
            "updated_at": "2026-03-20T14:30:00Z",
            "history": [
              {
                "id": "abc123",
                "status": "stopped",
                "started_at": "2026-03-20T10:00:00Z",
                "ended_at": "2026-03-20T11:30:00Z",
                "started_user_id": "1234567",
                "ended_user_id": "1234567",
                "created_at": "2026-03-20T10:00:00Z"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by time tracking status using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The filter matches against the timer's running state.

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
        An array of state values
      </td>

      <td>
        Returns items matching the specified timer state. See [compare values](#compare-values) below.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of state values
      </td>

      <td>
        Excludes items matching the specified timer state.
      </td>
    </tr>
  </tbody>
</Table>

### Compare values

| Value | Description                            |
| :---- | :------------------------------------- |
| `1`   | Timer is paused or empty (not running) |
| `2`   | Timer is currently running             |

## Examples

### Filter for running timers

This example returns items with an actively running time tracker.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "time_tracking"
            compare_value: [2]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on TimeTrackingValue {
            duration
            running
            started_at
          }
        }
      }
    }
  }
}
```

### Filter for paused or empty timers

This example returns items where the timer is not running.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "time_tracking"
            compare_value: [1]
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

The [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation creates a new time tracking column via the API. You can specify which [fields](https://developer.monday.com/api-reference/docs/columns#fields) to return in the mutation response.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Time Spent"
    column_type: time_tracking
  ) {
    id
    title
    type
  }
}
```

<Callout icon="🚧" theme="warn">
  Time tracking column values cannot be updated or cleared via the API. The timer can only be started, stopped, and managed through the monday.com UI or automations.
</Callout>

***

# Reading column configuration

To read a time tracking column's configuration, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["time_tracking"]) {
      id
      title
      settings
    }
  }
}
```

## `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key           | Type      | Description                                      |
| :------------ | :-------- | :----------------------------------------------- |
| `showSeconds` | `boolean` | Whether to show seconds in the duration display. |

### Example `settings` response

```json
{}
```

<Callout icon="📘" theme="info">
  Most time tracking columns return an empty settings object. The `showSeconds` option is only present when explicitly configured.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the time tracking column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: time_tracking
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
              "showSeconds": {
                "type": "boolean",
                "description": "Whether to show seconds in the duration UI"
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
