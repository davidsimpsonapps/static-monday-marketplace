---
updatedAt: 2026-09-23T16:42:43.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Search

Learn how to search for items, boards, documents, users, workspaces, updates, and timeline items across your account using the platform API

The monday.com search API allows you to find <Glossary>items</Glossary>, [boards](https://support.monday.com/hc/en-us/articles/115005310489-The-Board), [documents](https://support.monday.com/hc/en-us/articles/360002139699-monday-Docs), users, <Glossary>workspaces</Glossary>, updates, and [timeline items](https://support.monday.com/hc/en-us/articles/360019213180-Emails-Activities-on-monday-com) across your account. It uses a combination of keyword matching and semantic understanding to return the most relevant results.

Unlike a traditional search query that returns a mixed list of results, the search API uses a **namespace structure** — `search` returns a `SearchNamespace` object with separate fields for each entity type. This lets you search multiple entity types in a single request while specifying different filters for each.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

<Callout icon="📘" theme="info">
  Check out the [Searching across your account](https://developer.monday.com/api-reference/docs/searching-across-your-account) guide for best practices, filtering strategies, and end-to-end examples.
</Callout>

# Queries

## Search across entities

**Required scopes vary by entity type:**

| Entity type      | Required scope    |
| :--------------- | :---------------- |
| `items`          | `boards:read`     |
| `boards`         | `boards:read`     |
| `docs`           | `docs:read`       |
| `users`          | `users:read`      |
| `workspaces`     | `workspaces:read` |
| `updates`        | `updates:read`    |
| `timeline_items` | `boards:read`     |

* Returns [`SearchNamespace!`](https://developer.monday.com/api-reference/reference/search-other-types#searchnamespace) — an object with one field per entity type
* Can be queried directly at the root
* Request only the entity type fields you need — omitting a field avoids unnecessary processing
* The `limit` argument on each field applies **to that entity type only**

Each entity type is accessed as a field on the returned `SearchNamespace`. Include only the fields for the entity types you want to search in a single request:

```graphql GraphQL
query {
  search {
    items(query: "Q1 planning", limit: 10, board_ids: ["1234567890"]) {
      results {
        id
        indexed_data {
          name
          board_id
          url
        }
        live_data {
          id
          name
          state
        }
      }
    }
    boards(query: "Q1 planning", limit: 10) {
      results {
        id
        indexed_data {
          name
          url
        }
      }
    }
    docs(query: "Q1 planning", limit: 5) {
      results {
        id
        indexed_data {
          name
        }
      }
    }
    users(query: "Ada", limit: 5) {
      results {
        id
        indexed_data {
          name
          email
        }
      }
    }
    workspaces(query: "Q1 planning", limit: 5) {
      results {
        id
        indexed_data {
          name
        }
      }
    }
    updates(query: "Q1 planning", limit: 5, board_ids: ["1234567890"]) {
      results {
        id
        indexed_data {
          body
          creator_id
          item_id
          board_id
          created_at
          updated_at
        }
        live_data {
          id
          body
        }
      }
    }
    timeline_items(query: "kickoff call", limit: 5, type: email) {
      results {
        id
        indexed_data {
          title
          summary
          type
          product_kind
          item_id
          board_id
        }
        live_data {
          id
        }
      }
    }
  }
}
```

### Arguments

The `search` query itself takes no arguments. Arguments are passed to each entity field on the `SearchNamespace`.

**`search.items` arguments:**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Controls the trade-off between search quality and response time. Default: `BALANCED`.</td>
    </tr>
    <tr>
      <td>board_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter items to specific board IDs.</td>
    </tr>
    <tr>
      <td>workspace_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter items to specific workspace IDs.</td>
    </tr>
  </tbody>
</Table>

**`search.boards` arguments:**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Controls the trade-off between search quality and response time. Default: `BALANCED`.</td>
    </tr>
    <tr>
      <td>board_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter boards to specific board IDs.</td>
    </tr>
    <tr>
      <td>workspace_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter boards to specific workspace IDs.</td>
    </tr>
  </tbody>
</Table>

**`search.docs` arguments:**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Controls the trade-off between search quality and response time. Default: `BALANCED`.</td>
    </tr>
    <tr>
      <td>ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter documents to specific document IDs.</td>
    </tr>
    <tr>
      <td>workspace_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter documents to specific workspace IDs.</td>
    </tr>
  </tbody>
</Table>

**`search.users` arguments:**

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Controls the trade-off between search quality and response time. Default: `BALANCED`.</td>
    </tr>
  </tbody>
</Table>

**`search.workspaces` arguments:**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Controls the trade-off between search quality and response time. Default: `BALANCED`.</td>
    </tr>
  </tbody>
</Table>

**`search.updates` arguments:**

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string. Update search matches against the update body.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Accepted for API consistency. Update search uses keyword matching over update bodies.</td>
    </tr>
    <tr>
      <td>board_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter updates to specific board IDs.</td>
    </tr>
    <tr>
      <td>creator_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter updates to those authored by specific creator user IDs.</td>
    </tr>
  </tbody>
</Table>

**`search.timeline_items` arguments:**

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>`String!`</td>
      <td>The search query string. Timeline item search matches against the title, summary, and content.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`Int`</td>
      <td>Maximum number of results to return. Default: `10`. Maximum: `20`.</td>
    </tr>
    <tr>
      <td>date_range</td>
      <td>[`CrossEntityDateRangeInput`](https://developer.monday.com/api-reference/reference/search-other-types#crossentitydaterangeinput)</td>
      <td>Optional. Filter results by creation or update timestamps.</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>[`SearchStrategy`](https://developer.monday.com/api-reference/reference/search-other-types#searchstrategy)</td>
      <td>Accepted for API consistency. Timeline item search uses keyword matching.</td>
    </tr>
    <tr>
      <td>board_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter timeline items to specific board IDs.</td>
    </tr>
    <tr>
      <td>workspace_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter timeline items to specific workspace IDs.</td>
    </tr>
    <tr>
      <td>item_ids</td>
      <td>`[ID!]`</td>
      <td>Optional. Filter timeline items to those belonging to specific item IDs.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>[`TimelineItemKind`](https://developer.monday.com/api-reference/reference/search-other-types#timelineitemkind)</td>
      <td>Optional. Filter by timeline item kind (e.g., `email`, `googleCalendar`).</td>
    </tr>
    <tr>
      <td>product_kind</td>
      <td>[`TimelineItemProductKind`](https://developer.monday.com/api-reference/reference/search-other-types#timelineitemproductkind)</td>
      <td>Optional. Filter by the product the timeline item originates from (e.g., `crm`, `service`).</td>
    </tr>
  </tbody>
</Table>

### Fields

Each entity field on `SearchNamespace` returns a result container object with a single `results` field:

| Field                   | Type                                                                                                                              | Description                                                                       |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `search.items`          | [`SearchItemResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchitemresults)                 | Item search results.                                                              |
| `search.boards`         | [`SearchBoardResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchboardresults)               | Board search results.                                                             |
| `search.docs`           | [`SearchDocResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchdocresults)                   | Document search results.                                                          |
| `search.users`          | [`SearchUserResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchuserresults)                 | User search results. Only available in API versions `2026-10` and later.          |
| `search.workspaces`     | [`SearchWorkspaceResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchworkspaceresults)       | Workspace search results.                                                         |
| `search.updates`        | [`SearchUpdateResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchupdateresults)             | Update search results. Only available in API versions `2026-10` and later.        |
| `search.timeline_items` | [`SearchTimelineItemResults!`](https://developer.monday.com/api-reference/reference/search-other-types#searchtimelineitemresults) | Timeline item search results. Only available in API versions `2026-10` and later. |

Each result in the `results` array includes:

| Field         | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description                                                                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | `ID!`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | The unique identifier of the entity.                                                                                                          |
| indexed\_data | [`SearchIndexedItem!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexeditem) / [`SearchIndexedBoard!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexedboard) / [`SearchIndexedDoc!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexeddoc) / [`SearchIndexedUser!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexeduser) / [`SearchIndexedWorkspace!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexedworkspace) / [`SearchIndexedUpdate!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexedupdate) / [`SearchIndexedTimelineItem!`](https://developer.monday.com/api-reference/reference/search-other-types#searchindexedtimelineitem) | The entity data stored in the search index. Fast but potentially stale.                                                                       |
| live\_data    | [`Item`](https://developer.monday.com/api-reference/reference/items) / [`Board`](https://developer.monday.com/api-reference/reference/boards) / [`Document`](https://developer.monday.com/api-reference/reference/docs) / [`User`](https://developer.monday.com/api-reference/reference/users) / [`Workspace`](https://developer.monday.com/api-reference/reference/workspaces) / [`Update`](https://developer.monday.com/api-reference/reference/updates) / [`TimelineItem`](https://developer.monday.com/api-reference/reference/timeline-item-ea)                                                                                                                                                                                                                                                                                                                    | The latest entity data resolved from the core API. `null` when the entity was deleted, is inaccessible to the caller, or has an indexing lag. |

<Callout icon="👍" theme="success">
**`indexed_data` vs `live_data`**

The `indexed_data` field returns pre-indexed data — fast but potentially stale. The `live_data` field resolves to the full entity from the core API with the latest data, but adds latency. Use `indexed_data` when speed matters; use `live_data` when you need real-time accuracy.
</Callout>

***

# Authorization

Authorization is applied automatically based on the authenticated user context. Results are filtered to the items, boards, documents, users, workspaces, updates, and timeline items the caller is allowed to access — inaccessible results are excluded from the response.

***

# Limits

| Constraint                       | Value |
| :------------------------------- | :---- |
| Maximum results per entity field | `20`  |
| Default limit                    | `10`  |

Results are returned ordered by relevance within each entity type. No cursor-based pagination is available — all results are returned up to the specified `limit`.
