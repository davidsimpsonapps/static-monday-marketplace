---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Idempotency

Learn how to safely retry mutations using the Idempotency-Key header to prevent duplicate side effects

When network failures or timeouts occur, retrying a mutation can accidentally create duplicate side effects — for example, creating the same item twice. The `Idempotency-Key` header lets you safely retry mutations without worrying about duplicates.

# How it works

Send a unique `Idempotency-Key` header with any mutation request. The API uses this key to deduplicate retries:

1. **First request**: Executes normally and caches the response for 30 minutes.
2. **Retry with same key**: Returns the cached response with an `Idempotency-Replayed: true` header — no duplicate side effect occurs.
3. **Concurrent duplicate**: Returns `409 Conflict` with a `Retry-After` header indicating when to retry.

> 👍 Best practice
>
> Always include an `Idempotency-Key` header when retrying mutations in production, especially for operations like `create_item`, `create_board`, or any mutation that creates or modifies resources.

# Using the `Idempotency-Key` header

Include a unique string value (e.g., a UUID) in the `Idempotency-Key` request header:

```javascript
fetch("https://api.monday.com/v2", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "{API_TOKEN}",
    "API-Version": "2025-07",
    "Idempotency-Key": "YOUR_UNIQUE_IDEMPOTENCY_KEY"
  },
  body: JSON.stringify({
    query: `mutation { create_item(board_id: 123456, item_name: "New item") { id } }`
  })
});
```

```curl
curl -X POST 'https://api.monday.com/v2' \
-H "Authorization: {API_TOKEN}" \
-H "Content-Type:application/json" \
-H "API-Version:2025-07" \
-H "Idempotency-Key:YOUR_UNIQUE_IDEMPOTENCY_KEY" \
--data-raw '{"query":"mutation { create_item(board_id: 123456, item_name: \"New item\") { id } }"}'
```

# Response headers

| Header                 | Description                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Idempotency-Replayed` | Set to `true` when the response is served from cache (i.e., this is a replayed retry, not a fresh execution). |

# Rules and constraints

| Rule              | Detail                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mutations only    | The header is ignored on queries (reads are inherently idempotent).                                                                                       |
| POST only         | Only applies to POST requests.                                                                                                                            |
| Cache duration    | Cached responses expire after 30 minutes. After expiration, the same key will execute fresh.                                                              |
| Key format        | Any non-empty string. We recommend UUIDs.                                                                                                                 |
| Per-user budget   | Each user+app combination has a memory budget for cached responses. If the budget is exceeded, new responses will execute but won't be cached for replay. |
| Max response size | Responses larger than 1 MB are not cached.                                                                                                                |

# Error responses

## 409 — Concurrent duplicate

If a request with the same idempotency key is already being processed, the API returns:

```json
{
  "errors": [
    {
      "message": "A request with this idempotency key is currently being processed",
      "extensions": {
        "code": "IDEMPOTENCY_CONFLICT"
      }
    }
  ]
}
```

The response includes a `Retry-After` header. Wait the indicated time and retry — the cached response will then be available.

# When to use idempotency keys

| Scenario                              | Use idempotency key?                                                     |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Retrying after a network timeout      | ✅ Yes                                                                    |
| Retrying after a 5xx server error     | ✅ Yes                                                                    |
| Retrying after a rate limit (429)     | ❌ No — the original request wasn't processed, so no duplicate risk.      |
| Automated/webhook-triggered mutations | ✅ Yes — derive the key from the triggering event ID.                     |
| Batch imports                         | ✅ Yes — use a per-record key to allow safe resume after partial failure. |

# Generating idempotency keys

Good keys are:

* **Unique per intended operation** — a UUID generated at the first attempt, reused on retries.
* **Deterministic for the same intent** — if retrying, send the same key; don't generate a new one.

Examples:

* `uuid()` — generated once when the user clicks "Create", reused on retries.
* `${webhookEventId}-create-item` — for webhook-driven automations.
* `${importBatchId}-row-${rowIndex}` — for batch imports.

> 🚧 Warning
>
> Do not generate a new key on every retry attempt. The key must remain the same across retries for deduplication to work. Store the key alongside the request so retries use the same value.
