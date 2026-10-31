---
updatedAt: 2026-10-30T11:53:15.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board activity logs

Query board-scoped activity_logs on the Board type (nested under boards)

This page documents the **`activity_logs`** field on **[`Board`](https://developer.monday.com/api-reference/reference/boards#fields)** — nested only under a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) query.

For **user-level** activity (`users { activity_logs }`), rate limits, the **`2026-07`** API version requirement, and the roadmap for cross-board / cross-user queries, see the main **[Activity logs](https://developer.monday.com/api-reference/docs/activity-logs)** guide.

[Activity logs](https://support.monday.com/hc/en-us/articles/115005310745-What-is-the-Activity-Log-) on a board are records of actions performed on that board. You can use them to see which actions were performed, when, and by whom.

# Queries

## Get board activity logs

<Callout icon="🚧" theme="warn">
  **This API changes starting from version [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01).** From `2027-01`, board activity logs include more entities, are limited to events from the last 90 days, and use cursor pagination. The description below applies to versions before `2027-01`. For `2027-01` and later, see [Get board activity logs in 2027-01 and later](#get-board-activity-logs-in-2027-01-and-later).
</Callout>

* **Required scope: `boards:read`**
* **Limit: up to 10,000 logs**
* Returns an array containing metadata about a collection of activity logs from a specific board in reverse chronological order
* Can only be nested within a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) query

```graphql GraphQL
query {
  boards(
    ids: [1234567890]
  ) {
    activity_logs(
      from: "2021-07-23T00:00:00Z"
      to: "2021-07-26T00:00:00Z"
    ) {
      id
      event
      data
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($board_id: [ID!], $from: ISO8601DateTime!, $to: ISO8601DateTime!) { boards (ids: $board_id) { activity_logs (from: $from, to: $to) { id event data }}}`;
const variables = {
  board_id: 1234567890,
  from: "2024-07-23T00:00:00Z",
  to: "2024-07-26T00:00:00Z",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument    | Type              | Description                                                     |
| :---------- | :---------------- | :-------------------------------------------------------------- |
| column\_ids | `[String]`        | The specific columns to return events for.                      |
| from        | `ISO8601DateTime` | From timestamp (ISO8601).                                       |
| group\_ids  | `[String]`        | The specific groups to return events for.                       |
| item\_ids   | `[ID!]`           | The specific items to return events for.                        |
| limit       | `Int`             | The number of activity log events to return. The default is 25. |
| page        | `Int`             | The page number to return. Starts at 1.                         |
| to          | `ISO8601DateTime` | To timestamp (ISO8601).                                         |
| user\_ids   | `[ID!]`           | The specific users to return events for.                        |

### Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the account that initiated the event.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        data
      </td>

      <td>
        `String!`
      </td>

      <td>
        The item's column values.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        entity
      </td>

      <td>
        `String!`
      </td>

      <td>
        The entity of the event that was changed. Use this field — `entity_id` is not available on `ActivityLogType`.
      </td>

      <td>
        `board`  
        `pulse`
      </td>
    </tr>

    <tr>
      <td>
        event
      </td>

      <td>
        `String!`
      </td>

      <td>
        The action that took place.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the activity log event.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the user who initiated the event.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `String!`
      </td>

      <td>
        The time of the event in 17-digit Unix time. To convert the timestamp to UNIX time in milliseconds, divide the 17-digit value by 10,000 and round to the nearest integer. For UNIX time in seconds, divide the value by 10,000,000.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

## Get board activity logs in 2027-01 and later

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

* **Required scope: `boards:read`**
* Returns a [`BoardActivityLogsPage`](https://developer.monday.com/api-reference/reference/boards-other-types#boardactivitylogspage) with the board's activity log entries and a `cursor` for the next page
* Only returns events from the last 90 days. Requests for data older than 90 days return a validation error
* Uses cursor pagination instead of `page`
* Can only be nested within a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) query

In the examples below, replace `FROM_TIMESTAMP` and `TO_TIMESTAMP` with ISO 8601 timestamps (for example, `2027-01-05T00:00:00Z`). `FROM_TIMESTAMP` must be within the last 90 days.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    activity_logs(
      from: "FROM_TIMESTAMP"
      to: "TO_TIMESTAMP"
      limit: 25
    ) {
      cursor
      logs {
        id
        event
        entity
        data
        user_id
        created_at
      }
    }
  }
}
```

To fetch the next page, pass the `cursor` value from the previous response. When `cursor` is `null`, there are no more pages.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    activity_logs(
      from: "FROM_TIMESTAMP"
      to: "TO_TIMESTAMP"
      limit: 25
      cursor: "CURSOR_FROM_PREVIOUS_RESPONSE"
    ) {
      cursor
      logs {
        id
        event
      }
    }
  }
}
```

### Arguments

| Argument         | Type        | Description                                                                             |
| :--------------- | :---------- | :-------------------------------------------------------------------------------------- |
| column\_ids      | `[ID!]`     | The specific columns to return events for.                                              |
| correlation\_ids | `[ID!]`     | Filter by correlation IDs to retrieve all events belonging to the same logical session. |
| cursor           | `String`    | The cursor for fetching the next page, obtained from a previous response.               |
| event\_types     | `[String!]` | Filter by event types (for example, `create_pulse` or `delete_pulse`).                  |
| from             | `String`    | From timestamp (ISO 8601), max 90 days ago.                                             |
| group\_ids       | `[ID!]`     | The specific groups to return events for.                                               |
| item\_ids        | `[ID!]`     | The specific items to return events for.                                                |
| limit            | `Int`       | The number of activity log events to return (1-1000, default 25).                       |
| search           | `String`    | Free-text prefix search over item names.                                                |
| to               | `String`    | To timestamp (ISO 8601).                                                                |
| user\_ids        | `[ID!]`     | The specific users to return events for.                                                |

### Fields

[`BoardActivityLogsPage`](https://developer.monday.com/api-reference/reference/boards-other-types#boardactivitylogspage):

| Field  | Type             | Description                                                                 |
| :----- | :--------------- | :-------------------------------------------------------------------------- |
| logs   | `[ActivityLog!]` | The activity log entries for this page.                                     |
| cursor | `String`         | The cursor to pass to fetch the next page. `null` if this is the last page. |

`ActivityLog`:

| Field                  | Type     | Description                                                                                                 |
| :--------------------- | :------- | :---------------------------------------------------------------------------------------------------------- |
| id                     | `ID`     | The unique identifier of the activity log entry.                                                            |
| account\_id            | `ID`     | The account this activity log entry belongs to.                                                             |
| user\_id               | `ID`     | The user who performed the action.                                                                          |
| event                  | `String` | The type of event that occurred.                                                                            |
| entity                 | `String` | The entity type that was affected.                                                                          |
| data                   | `String` | Additional data associated with the event, as a JSON string.                                                |
| created\_at            | `String` | The timestamp when the activity log entry was created.                                                      |
| correlation\_id        | `ID`     | Groups all activity log entries belonging to the same logical session (for example, an agent conversation). |
| triggering\_flow\_id   | `ID`     | The ID of the triggering flow (for example, an agent run UUID).                                             |
| triggering\_flow\_type | `String` | The type of triggering flow (for example, `agent_run`).                                                     |

### Changes in 2027-01

| Topic           | Before `2027-01`                | `2027-01` and later                                  |
| :-------------- | :------------------------------ | :--------------------------------------------------- |
| Return type     | `[ActivityLogType]`             | `BoardActivityLogsPage`                              |
| Pagination      | `page` and `limit` (default 25) | `cursor` and `limit` (1-1000, default 25)            |
| `page` argument | `Int`                           | Removed                                              |
| `from` and `to` | `ISO8601DateTime`               | `String` (ISO 8601); `from` is at most 90 days ago   |
| `column_ids`    | `[String]`                      | `[ID!]`                                              |
| `group_ids`     | `[String]`                      | `[ID!]`                                              |
| New arguments   | —                               | `event_types`, `correlation_ids`, `cursor`, `search` |

<br />
