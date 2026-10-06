---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn more about the other types used when searching for items, boards, documents, users, workspaces, updates, and timeline items via the API

The monday.com [`search`](https://developer.monday.com/api-reference/reference/search) API lets you search for items, boards, documents, users, workspaces, updates, and timeline items in a single query. This page documents the namespace, result, indexed data, and enum types used by the search query.

# SearchNamespace

The object returned by the `search` query. Each field is a separate entity search with its own arguments and result set.

| Field           | Type                                                       | Description                                                                                                                                                                                                     |
| :-------------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items           | [`SearchItemResults!`](#searchitemresults)                 | Search for items. See [search reference](https://developer.monday.com/api-reference/reference/search#searchitems-arguments) for arguments.                                                                      |
| boards          | [`SearchBoardResults!`](#searchboardresults)               | Search for boards. See [search reference](https://developer.monday.com/api-reference/reference/search#searchboards-arguments) for arguments.                                                                    |
| docs            | [`SearchDocResults!`](#searchdocresults)                   | Search for documents. See [search reference](https://developer.monday.com/api-reference/reference/search#searchdocs-arguments) for arguments.                                                                   |
| users           | [`SearchUserResults!`](#searchuserresults)                 | Search for users. Only available in API versions `2026-10` and later. See [search reference](https://developer.monday.com/api-reference/reference/search#searchusers-arguments) for arguments.                  |
| workspaces      | [`SearchWorkspaceResults!`](#searchworkspaceresults)       | Search for workspaces. Only available in API versions `2026-07` and later. See [search reference](https://developer.monday.com/api-reference/reference/search#searchworkspaces-arguments) for arguments.        |
| updates         | [`SearchUpdateResults!`](#searchupdateresults)             | Search for updates. Only available in API versions `2026-10` and later. See [search reference](https://developer.monday.com/api-reference/reference/search#searchupdates-arguments) for arguments.              |
| timeline\_items | [`SearchTimelineItemResults!`](#searchtimelineitemresults) | Search for timeline items. Only available in API versions `2026-10` and later. See [search reference](https://developer.monday.com/api-reference/reference/search#searchtimelineitems-arguments) for arguments. |

***

# SearchItemResults

Contains the results of an item search.

| Field   | Type                                        | Description                  |
| :------ | :------------------------------------------ | :--------------------------- |
| results | [`[SearchItemResult!]!`](#searchitemresult) | List of item search results. |

***

# SearchBoardResults

Contains the results of a board search.

| Field   | Type                                          | Description                   |
| :------ | :-------------------------------------------- | :---------------------------- |
| results | [`[SearchBoardResult!]!`](#searchboardresult) | List of board search results. |

***

# SearchDocResults

Contains the results of a document search.

| Field   | Type                                      | Description                      |
| :------ | :---------------------------------------- | :------------------------------- |
| results | [`[SearchDocResult!]!`](#searchdocresult) | List of document search results. |

***

# SearchItemResult

Contains a single item result from the search query.

| Field         | Type                                                                 | Description                                                                                                                      |
| :------------ | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                | The unique identifier of the item.                                                                                               |
| indexed\_data | [`SearchIndexedItem!`](#searchindexeditem)                           | Item data from the search index. Fast but potentially stale.                                                                     |
| live\_data    | [`Item`](https://developer.monday.com/api-reference/reference/items) | The latest item data from the core API. `null` when the item was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchBoardResult

Contains a single board result from the search query.

| Field         | Type                                                                   | Description                                                                                                                        |
| :------------ | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                  | The unique identifier of the board.                                                                                                |
| indexed\_data | [`SearchIndexedBoard!`](#searchindexedboard)                           | Board data from the search index. Fast but potentially stale.                                                                      |
| live\_data    | [`Board`](https://developer.monday.com/api-reference/reference/boards) | The latest board data from the core API. `null` when the board was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchDocResult

Contains a single document result from the search query.

| Field         | Type                                                                    | Description                                                                                                                              |
| :------------ | :---------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                   | The unique identifier of the document.                                                                                                   |
| indexed\_data | [`SearchIndexedDoc!`](#searchindexeddoc)                                | Document data from the search index. Fast but potentially stale.                                                                         |
| live\_data    | [`Document`](https://developer.monday.com/api-reference/reference/docs) | The latest document data from the core API. `null` when the document was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchUserResults

Contains the results of a user search.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field   | Type                                        | Description                  |
| :------ | :------------------------------------------ | :--------------------------- |
| results | [`[SearchUserResult!]!`](#searchuserresult) | List of user search results. |

***

# SearchUserResult

Contains a single user result from the search query.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field         | Type                                                                 | Description                                                                                                                      |
| :------------ | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                | The unique identifier of the user.                                                                                               |
| indexed\_data | [`SearchIndexedUser!`](#searchindexeduser)                           | User data from the search index. Fast but potentially stale.                                                                     |
| live\_data    | [`User`](https://developer.monday.com/api-reference/reference/users) | The latest user data from the core API. `null` when the user was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchWorkspaceResults

Contains the results of a workspace search.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-07` and later**
</Callout>

| Field   | Type                                                  | Description                       |
| :------ | :---------------------------------------------------- | :-------------------------------- |
| results | [`[SearchWorkspaceResult!]!`](#searchworkspaceresult) | List of workspace search results. |

***

# SearchUpdateResults

Contains the results of an update search.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field   | Type                                            | Description                    |
| :------ | :---------------------------------------------- | :----------------------------- |
| results | [`[SearchUpdateResult!]!`](#searchupdateresult) | List of update search results. |

***

# SearchWorkspaceResult

Contains a single workspace result from the search query.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-07` and later**
</Callout>

| Field         | Type                                                                           | Description                                                                                                                                |
| :------------ | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                          | The unique identifier of the workspace.                                                                                                    |
| indexed\_data | [`SearchIndexedWorkspace!`](#searchindexedworkspace)                           | Workspace data from the search index. Fast but potentially stale.                                                                          |
| live\_data    | [`Workspace`](https://developer.monday.com/api-reference/reference/workspaces) | The latest workspace data from the core API. `null` when the workspace was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchUpdateResult

Contains a single update result from the search query.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field         | Type                                                                     | Description                                                                                                                          |
| :------------ | :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                    | The unique identifier of the update.                                                                                                 |
| indexed\_data | [`SearchIndexedUpdate!`](#searchindexedupdate)                           | Update data from the search index. Fast but potentially stale.                                                                       |
| live\_data    | [`Update`](https://developer.monday.com/api-reference/reference/updates) | The latest update data from the core API. `null` when the update was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchTimelineItemResults

Contains the results of a timeline item search.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field   | Type                                                        | Description                           |
| :------ | :---------------------------------------------------------- | :------------------------------------ |
| results | [`[SearchTimelineItemResult!]!`](#searchtimelineitemresult) | List of timeline item search results. |

***

# SearchTimelineItemResult

Contains a single timeline item result from the search query.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field         | Type                                                                                    | Description                                                                                                                                        |
| :------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                                   | The unique identifier of the timeline item.                                                                                                        |
| indexed\_data | [`SearchIndexedTimelineItem!`](#searchindexedtimelineitem)                              | Timeline item data from the search index. Fast but potentially stale.                                                                              |
| live\_data    | [`TimelineItem`](https://developer.monday.com/api-reference/reference/timeline-item-ea) | The latest timeline item data from the core API. `null` when the timeline item was deleted, is inaccessible to the caller, or has an indexing lag. |

***

# SearchIndexedItem

Item data stored in the search index. Returned in the `indexed_data` field of [`SearchItemResult`](#searchitemresult).

| Field         | Type      | Description                               |
| :------------ | :-------- | :---------------------------------------- |
| id            | `ID!`     | Item ID.                                  |
| name          | `String!` | Item name.                                |
| url           | `String!` | URL to view this item.                    |
| board\_id     | `ID`      | ID of the board containing this item.     |
| workspace\_id | `ID`      | ID of the workspace containing this item. |

***

# SearchIndexedBoard

Board data stored in the search index. Returned in the `indexed_data` field of [`SearchBoardResult`](#searchboardresult).

| Field         | Type      | Description                                |
| :------------ | :-------- | :----------------------------------------- |
| id            | `ID!`     | Board ID.                                  |
| name          | `String!` | Board name.                                |
| description   | `String`  | Board description.                         |
| creator\_id   | `ID`      | ID of the user who created this board.     |
| workspace\_id | `ID`      | ID of the workspace containing this board. |
| url           | `String!` | URL to view this board.                    |

***

# SearchIndexedDoc

Document data stored in the search index. Returned in the `indexed_data` field of [`SearchDocResult`](#searchdocresult).

| Field         | Type      | Description                                   |
| :------------ | :-------- | :-------------------------------------------- |
| id            | `ID!`     | Document ID.                                  |
| name          | `String!` | Document name.                                |
| workspace\_id | `ID`      | ID of the workspace containing this document. |

***

# SearchIndexedUser

User data stored in the search index. Returned in the `indexed_data` field of [`SearchUserResult`](#searchuserresult).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field | Type      | Description               |
| :---- | :-------- | :------------------------ |
| id    | `ID!`     | User ID.                  |
| name  | `String!` | The user's full name.     |
| email | `String!` | The user's email address. |

***

# SearchIndexedWorkspace

Workspace data stored in the search index. Returned in the `indexed_data` field of [`SearchWorkspaceResult`](#searchworkspaceresult).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-07` and later**
</Callout>

| Field       | Type      | Description                                           |
| :---------- | :-------- | :---------------------------------------------------- |
| id          | `ID!`     | Workspace ID.                                         |
| name        | `String!` | Workspace name.                                       |
| kind        | `String!` | Workspace kind (`open` or `closed`).                  |
| description | `String`  | Workspace description.                                |
| state       | `String!` | Workspace state (`active`, `archived`, or `deleted`). |

***

# SearchIndexedUpdate

Update data stored in the search index. Returned in the `indexed_data` field of [`SearchUpdateResult`](#searchupdateresult).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field       | Type      | Description                                      |
| :---------- | :-------- | :----------------------------------------------- |
| id          | `ID!`     | Update ID.                                       |
| body        | `String!` | HTML-formatted update body.                      |
| creator\_id | `ID!`     | ID of the user who created the update.           |
| item\_id    | `ID!`     | ID of the item this update belongs to.           |
| board\_id   | `ID!`     | ID of the board containing this update.          |
| created\_at | `String!` | ISO timestamp when the update was created.       |
| updated\_at | `String!` | ISO timestamp when the update was last modified. |

***

# SearchIndexedTimelineItem

Timeline item data stored in the search index. Returned in the `indexed_data` field of [`SearchTimelineItemResult`](#searchtimelineitemresult).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Field         | Type      | Description                                                                                                                                        |
| :------------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`     | Timeline item ID.                                                                                                                                  |
| account\_id   | `ID!`     | ID of the account that owns this timeline item.                                                                                                    |
| item\_id      | `ID!`     | ID of the item this timeline item belongs to.                                                                                                      |
| board\_id     | `ID`      | ID of the board containing this timeline item.                                                                                                     |
| type          | `String!` | Timeline item kind (e.g., `email`, `googleCalendar`). See [`TimelineItemKind`](#timelineitemkind) for possible values.                             |
| product\_kind | `String!` | Product the timeline item originates from (e.g., `service`, `crm`). See [`TimelineItemProductKind`](#timelineitemproductkind) for possible values. |
| title         | `String!` | Timeline item title.                                                                                                                               |
| summary       | `String!` | Timeline item summary.                                                                                                                             |
| content       | `String!` | Timeline item full content body.                                                                                                                   |
| created\_at   | `String!` | ISO timestamp when the timeline item was created.                                                                                                  |
| updated\_at   | `String!` | ISO timestamp when the timeline item was last modified.                                                                                            |

***

# CrossEntityDateRangeInput

Optional date range filter available on all entity fields (`items`, `boards`, `docs`, `users`, `workspaces`, `updates`, `timeline_items`). All fields are optional — provide any combination to narrow results by creation or update timestamps.

| Field           | Type              | Description                                                               |
| :-------------- | :---------------- | :------------------------------------------------------------------------ |
| created\_before | `ISO8601DateTime` | Filter results created before this date (e.g., `"2026-03-16T08:00:00Z"`). |
| created\_after  | `ISO8601DateTime` | Filter results created after this date.                                   |
| updated\_before | `ISO8601DateTime` | Filter results updated before this date.                                  |
| updated\_after  | `ISO8601DateTime` | Filter results updated after this date.                                   |

***

# SearchStrategy

Controls the trade-off between search quality and response time. Pass as the `strategy` argument to entity fields on `SearchNamespace`; behavior can vary by entity type.

| Enum Value | Description                                                 |
| :--------- | :---------------------------------------------------------- |
| `SPEED`    | Faster results with lower search quality.                   |
| `BALANCED` | Good search quality with reasonable response time. Default. |
| `QUALITY`  | Best search quality with higher response time.              |

***

# TimelineItemProductKind

Identifies the product a timeline item originates from. Pass as the `product_kind` argument to the `timeline_items` field on `SearchNamespace`.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Enum Value | Description      |
| :--------- | :--------------- |
| `service`  | Service product. |
| `crm`      | CRM product.     |

***

# TimelineItemKind

Identifies the kind of timeline item. Pass as the `type` argument to the `timeline_items` field on `SearchNamespace`.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

| Enum Value                | Description                      |
| :------------------------ | :------------------------------- |
| `email`                   | Email communication.             |
| `googleCalendar`          | Google Calendar event.           |
| `outlookCalendar`         | Outlook Calendar event.          |
| `zoom`                    | Zoom meeting.                    |
| `activity`                | General activity.                |
| `custom`                  | Custom activity.                 |
| `note`                    | Note.                            |
| `videoMeeting`            | Video meeting.                   |
| `meeting`                 | Meeting.                         |
| `aiAssistant`             | AI assistant interaction.        |
| `aiReply`                 | AI-generated reply.              |
| `portal`                  | Portal interaction.              |
| `demoEmail`               | Demo email.                      |
| `aiSummary`               | AI-generated summary.            |
| `form`                    | Form submission.                 |
| `portfolio_status`        | Portfolio status update.         |
| `sequencesEmail`          | Sequences email.                 |
| `outreachExpertPhoneCall` | Outreach expert phone call.      |
| `mergedTickets`           | Merged tickets.                  |
| `customInternalApp`       | Custom internal app interaction. |
| `campaigns`               | Campaign event.                  |
| `phoneCall`               | Phone call.                      |
