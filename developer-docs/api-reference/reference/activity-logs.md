---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Board activity logs

Query board-scoped activity_logs on the Board type (nested under boards)

This page documents the **`activity_logs`** field on **[`Board`](https://developer.monday.com/api-reference/reference/boards#fields)** — nested only under a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) query.

For **user-level** activity (`users { activity_logs }`), rate limits, the **`2026-07`** API version requirement, and the roadmap for cross-board / cross-user queries, see the main **[Activity logs](https://developer.monday.com/api-reference/docs/activity-logs)** guide.

[Activity logs](https://support.monday.com/hc/en-us/articles/115005310745-What-is-the-Activity-Log-) on a board are records of actions performed on that board. You can use them to see which actions were performed, when, and by whom.

# Queries

## Get board activity logs

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

<br />
