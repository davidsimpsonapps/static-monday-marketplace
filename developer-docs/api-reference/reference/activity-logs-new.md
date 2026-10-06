---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Activity logs

Query board-scoped and user-scoped activity logs with the GraphQL platform API

<Callout icon="⚠️" theme="warn">
  **User activity logs are not stable yet.** We are building a new **top-level** activity log API that will span **boards and users** (cross-board, cross-user). Until that ships and the user-scoped field stabilizes, treat **`users { activity_logs }` as preview-only** — it may change before the API version is finalized. **Do not rely on it in production apps** until we announce it as stable in [release notes](https://developer.monday.com/api-reference/docs/release-notes).
</Callout>

[Activity logs](https://support.monday.com/hc/en-us/articles/115005310745-What-is-the-Activity-Log-) record actions in your monday.com account. The GraphQL API exposes them in two ways:

| Entry point             | GraphQL shape                                        | Use when                                                                                                    |
| :---------------------- | :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| **Board activity logs** | `boards(ids: …) { activity_logs(…) { … } }`          | You know the **board ID** and want events on that board (filter by columns, groups, items, or users).       |
| **User activity logs**  | `users(ids: …) { activity_logs(…) { logs cursor } }` | You know **user ID(s)** and want their activity (optional filters by boards and event types; cursor pages). |

* **Board logs** are board-first: you must pass a board ID. You can narrow rows with `user_ids` on the board field for people on that board.
* **User logs** are user-first: you pass user IDs. You can narrow with `board_ids` on the user field.
* Row shape, pagination, and limits **differ** between the two paths — validate for your use case before assuming parity.

# Queries

## Get board activity logs

* **Required scope: `boards:read`**
* Nested only under a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) query — see **[Board activity logs](https://developer.monday.com/api-reference/docs/board-activity-logs)** for full **arguments**, **field** definitions, and the `ActivityLog` shape for this path.
* **Pagination:** `page` and `limit` (default **25** rows); up to **10,000** log rows per query.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    activity_logs(
      from: "2026-03-01T00:00:00Z"
      to: "2026-04-09T23:59:59Z"
      limit: 25
      page: 1
    ) {
      id
      event
      entity
      data
      user_id
      created_at
    }
  }
}
```

***

## Get user activity logs

* **Required scope: `users:read`**
* Nested under a [`users`](https://developer.monday.com/api-reference/docs/users#queries) query as **`activity_logs`** on type **`User`**. The response is **`UserActivityLogsPage`**: **`logs`** plus a **`cursor`** for the next page.
* **API version:** use **`API-Version: 2026-04`** or later
* **`from` / `to`:** in the schema these are **`String`** — pass **ISO 8601** datetimes (for example `2026-03-01T00:00:00Z`). Invalid values may surface as **field errors** from the activity-log service.

### First page

```graphql GraphQL
query UserActivityFirstPage(
  $userIds: [ID!]!
  $from: String!
  $to: String!
  $limit: Int
) {
  users(ids: $userIds) {
    id
    activity_logs(from: $from, to: $to, limit: $limit) {
      cursor
      logs {
        id
        account_id
        user_id
        event
        entity
        data
        created_at
      }
    }
  }
}
```

**Variables (example):**

```json
{
  "userIds": ["1234567890"],
  "from": "2026-03-01T00:00:00Z",
  "to": "2026-04-09T23:59:59Z",
  "limit": 50
}
```

### Pagination (cursor)

User activity logs use **cursor** pagination (not `page` numbers).

1. Call `activity_logs` **without** `cursor` (or with `cursor: null`) for the **first** page.
2. If **`cursor`** in the response is non-null, pass that string as **`cursor`** on the **next** request for the **same** user with the **same** `from` / `to` (and other filters).
3. Stop when **`cursor` is `null`**.

```graphql GraphQL
query UserActivityNextPage(
  $userIds: [ID!]!
  $from: String!
  $to: String!
  $cursor: String!
  $limit: Int
) {
  users(ids: $userIds) {
    id
    activity_logs(from: $from, to: $to, limit: $limit, cursor: $cursor) {
      cursor
      logs {
        id
        event
        created_at
      }
    }
  }
}
```

* **Default page size:** **50** rows.
* **Maximum page size:** **200** rows per `activity_logs` call.

### Arguments

| Argument      | Type        | Description                                                                               |
| :------------ | :---------- | :---------------------------------------------------------------------------------------- |
| `from`        | `String`    | Start of window (ISO 8601). Must fall within the **last 90 days** (see limitations).      |
| `to`          | `String`    | End of window (ISO 8601).                                                                 |
| `board_ids`   | `[ID!]`     | Optional. Only events related to these boards.                                            |
| `event_types` | `[String!]` | Optional. Only events whose type matches one of the given strings (exact set may evolve). |
| `limit`       | `Int`       | Page size. Default **50**, max **200**.                                                   |
| `cursor`      | `String`    | Opaque cursor from the previous response for the same user and filter set.                |

### `UserActivityLogsPage` fields

| Field    | Type             | Description                                                    |
| :------- | :--------------- | :------------------------------------------------------------- |
| `logs`   | `[ActivityLog!]` | Rows for this page.                                            |
| `cursor` | `String`         | Next-page cursor, or **`null`** when there is no further page. |

### `ActivityLog` fields (user activity path)

| Field        | Type     | Description                                                                                                                                                                                                                                              |
| :----------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | `ID`     | Unique log row ID.                                                                                                                                                                                                                                       |
| `account_id` | `ID`     | Account for the event.                                                                                                                                                                                                                                   |
| `user_id`    | `ID`     | User associated with the event.                                                                                                                                                                                                                          |
| `event`      | `String` | Event name/type.                                                                                                                                                                                                                                         |
| `entity`     | `String` | Entity the event refers to.                                                                                                                                                                                                                              |
| `data`       | `String` | Event payload (structure depends on `event`).                                                                                                                                                                                                            |
| `created_at` | `String` | Event time. On **board** logs, `created_at` uses the **17-digit** format documented under [Board activity logs](https://developer.monday.com/api-reference/docs/board-activity-logs); on **user** logs the string format may differ — parse defensively. |

***

## User activity logs — limitations and errors

Values below reflect the **current** design.

### Time range

* Only activity within the **last 90 days** is queryable.
* If `from` is **older than 90 days**, the field may error for that user. Other users in the same request may still return data.

### Pagination edge cases

* Rows are ordered by **timestamp**. There is **no guaranteed order** among rows that share the **exact same** timestamp.
* If a page break falls inside equal timestamps, you may see **duplicates or gaps** across pages — **deduplicate by `id`** and avoid strict totals without reconciliation.

### Errors (GraphQL)

On failure, `activity_logs` may be **`null`** for that user while other fields still return. Check the `errors` array; paths look like `users → <index> → activity_logs`.

| Situation                     | Typical message                                 | Typical `extensions`                                  |
| :---------------------------- | :---------------------------------------------- | :---------------------------------------------------- |
| `from` outside allowed window | e.g. `"from" date cannot be older than 90 days` | `code`: `INVALID_ARGUMENT`, `service`: `activity-log` |

***

## Choosing board vs user logs

| Topic                 | Board `activity_logs`                      | User `activity_logs`                                                                        |
| :-------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------ |
| **You have**          | Board ID(s)                                | User ID(s)                                                                                  |
| **Pagination**        | `page` + `limit`                           | `cursor` + `limit` (max 200)                                                                |
| **Default rows/page** | 25                                         | 50                                                                                          |
| **Strong filters**    | Column, group, item, user (on that board)  | Board list, event types                                                                     |
| **API version**       | Dated stable versions (e.g. **`2026-07`**) | **`2026-07`** when released to dated API; see warning — **not for production** until stable |
