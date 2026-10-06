---
updatedAt: 2026-09-06T08:33:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Searching across your account

Learn how to use the search API to find items, boards, and documents across your monday.com account

The [`search`](https://developer.monday.com/api-reference/reference/search) query lets you find items, boards, documents, and workspaces across your entire account in a single API call. This guide walks through common search patterns and shows you how to use filters and strategy options to get precise, performant results.

<Callout icon="🚧" theme="warn">
  Requests must include the `API-Version: 2026-07` header or later. See [API versioning](https://developer.monday.com/api-reference/docs/api-versioning) for details.
</Callout>

# Pre-requisites

* [API authentication token](https://developer.monday.com/api-reference/docs/authentication)
* **Required scopes:** `boards:read` for item and board results, `docs:read` for document results

# How the search API works

The `search` query returns a `SearchNamespace` object. You access results by calling fields on that namespace — one per entity type:

```
search {
  items(query: "...", ...)  → SearchItemResults
  boards(query: "...", ...) → SearchBoardResults
  docs(query: "...", ...)   → SearchDocResults
}
```

Each entity field accepts its own `query`, `limit`, `date_range`, `strategy`, and entity-specific filter arguments. Include only the entity fields you need — unused fields are not executed.

# Basic search

The simplest search queries a single entity type. Use `indexed_data` to get fast pre-indexed fields:

```graphql GraphQL
query {
  search {
    items(query: "quarterly report", limit: 10) {
      results {
        id
        indexed_data {
          name
          board_id
          url
        }
      }
    }
  }
}
```

# Searching multiple entity types

Include multiple entity fields in a single request to search across entity types simultaneously. Each field runs independently with its own arguments:

```graphql GraphQL
query {
  search {
    items(query: "quarterly report", limit: 10) {
      results {
        id
        indexed_data {
          name
          board_id
          url
        }
      }
    }
    boards(query: "quarterly report", limit: 10) {
      results {
        id
        indexed_data {
          name
          url
        }
      }
    }
    docs(query: "quarterly report", limit: 5) {
      results {
        id
        indexed_data {
          name
        }
      }
    }
  }
}
```

# Filtering by board or workspace

Pass `board_ids` or `workspace_ids` directly as arguments to the entity field.

## Items on specific boards

```graphql GraphQL
query {
  search {
    items(
      query: "design review"
      limit: 20
      board_ids: ["1234567890", "9876543210"]
    ) {
      results {
        id
        indexed_data {
          name
          board_id
          url
        }
      }
    }
  }
}
```

## Everything in a workspace

```graphql GraphQL
query {
  search {
    items(query: "roadmap", limit: 10, workspace_ids: ["12345"]) {
      results {
        id
        indexed_data { name board_id url }
      }
    }
    boards(query: "roadmap", limit: 10, workspace_ids: ["12345"]) {
      results {
        id
        indexed_data { name url }
      }
    }
    docs(query: "roadmap", limit: 10, workspace_ids: ["12345"]) {
      results {
        id
        indexed_data { name }
      }
    }
  }
}
```

## Search for workspaces

```graphql GraphQL
query {
  search {
    workspaces(query: "engineering", limit: 10) {
      results {
        id
        indexed_data { name }
        live_data {
          id
          name
          created_at
        }
      }
    }
  }
}
```

# Filtering by date range

Use the `date_range` argument to narrow results by creation or update timestamps. Pass it to any entity field independently.

```graphql GraphQL
query {
  search {
    items(
      query: "sprint planning"
      limit: 10
      date_range: {
        created_after: "2026-01-01T00:00:00Z"
        updated_after: "2026-03-01T00:00:00Z"
      }
    ) {
      results {
        id
        indexed_data { name url }
      }
    }
    boards(
      query: "sprint planning"
      limit: 10
      date_range: {
        created_after: "2026-01-01T00:00:00Z"
      }
    ) {
      results {
        id
        indexed_data { name url }
      }
    }
  }
}
```

All four date fields are optional and can be combined:

| Field            | Description                                |
| :--------------- | :----------------------------------------- |
| `created_after`  | Only results created after this timestamp  |
| `created_before` | Only results created before this timestamp |
| `updated_after`  | Only results updated after this timestamp  |
| `updated_before` | Only results updated before this timestamp |

# Controlling quality vs. speed

Use the `strategy` argument to tune the trade-off between search quality and response time:

| Value      | Behavior                                             |
| :--------- | :--------------------------------------------------- |
| `SPEED`    | Faster results with lower search quality             |
| `BALANCED` | Good quality with reasonable response time. Default. |
| `QUALITY`  | Best quality with higher response time               |

```graphql GraphQL
query {
  search {
    items(query: "critical bug", limit: 10, strategy: QUALITY) {
      results {
        id
        indexed_data { name url }
      }
    }
  }
}
```

Use `SPEED` for typeahead or autocomplete scenarios. Use `QUALITY` when precision matters more than latency.

# Using `live_data` for real-time fields

Each result includes a `live_data` field that resolves to the full entity from the core API. Use it when you need fields not available in `indexed_data`, such as item state or nested relationships.

`live_data` is resolved through GraphQL federation against the core API, which adds latency on top of the search request itself. For low-latency or read-heavy use cases, prefer `indexed_data` and only request `live_data` for the specific fields you genuinely need fresh.

```graphql GraphQL
query {
  search {
    items(query: "onboarding", limit: 5) {
      results {
        id
        indexed_data {
          name
          url
        }
        live_data {
          id
          name
          state
          column_values {
            id
            text
          }
        }
      }
    }
  }
}
```

> 📘 NOTE
>
> `live_data` can be `null` when the entity was deleted after indexing, is inaccessible to the caller, or has an indexing lag. In these cases the GraphQL response also includes a matching entry in the top-level `errors` field for the failed `live_data` fetch — the search query itself succeeded, only the `live_data` resolution for that result did not. Handle the `null` in your client code and continue processing the remaining results.

# JavaScript SDK example

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";

const client = new ApiClient({ token: "YOUR_API_TOKEN" });

const query = `query {
  search {
    items(query: "Q1 planning", limit: 10, workspace_ids: ["12345"]) {
      results {
        id
        indexed_data { name board_id url }
      }
    }
    boards(query: "Q1 planning", limit: 10) {
      results {
        id
        indexed_data { name url }
      }
    }
  }
}`;

const response = await client.request(query);
console.log(response);
```

# Limits and best practices

| Constraint            | Value                                              |
| :-------------------- | :------------------------------------------------- |
| Maximum `limit` value | `20` per entity field                              |
| Default `limit` value | `10` per entity field                              |
| Pagination            | Not supported — all results returned up to `limit` |

**Best practices:**

* **Request only the entity types you need.** Omitting entity fields avoids unnecessary processing.
* **Use `board_ids` or `workspace_ids`** to narrow the result set and improve relevance.
* **Prefer `indexed_data` over `live_data`** for read-heavy use cases. Indexing is asynchronous, so `indexed_data` can be several seconds (or longer under load) behind the core API — only opt into `live_data` for the fields where you can't tolerate that staleness.
* **Use `date_range` filters** to scope results to a relevant time window, especially in accounts with large amounts of data.
* **Tune `strategy`** — use `SPEED` for low-latency scenarios and `QUALITY` when precision matters.
* **Use specific search terms.** More specific queries return more relevant results.
* **Handle `null` `live_data`.** Entities may have been deleted since indexing.
