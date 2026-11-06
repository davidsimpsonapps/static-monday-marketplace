---
updatedAt: 2026-11-05T12:44:49.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Idempotency

Learn how to safely retry mutations using the Idempotency-Key header to prevent duplicate side effects

When network failures or timeouts occur, retrying a mutation can accidentally create duplicate side effects — for example, creating the same item twice. The `Idempotency-Key` header lets you safely retry mutations without worrying about duplicates.

# How it works

Send a unique `Idempotency-Key` header with any mutation request. The API uses this key to deduplicate retries:

1. **First request**: Executes normally. If the response is successful (2xx), it's stored for 30 minutes, subject to the [rules below](#rules-and-constraints).
2. **Retry with same key**: Returns the stored response with an `Idempotency-Replayed: true` header — no duplicate side effect occurs.
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
    query: `mutation CreateItem { create_item(board_id: 123456, item_name: "New item") { id } }`
  })
});
```

```curl
curl -X POST 'https://api.monday.com/v2' \
-H "Authorization: {API_TOKEN}" \
-H "Content-Type:application/json" \
-H "API-Version:2025-07" \
-H "Idempotency-Key:YOUR_UNIQUE_IDEMPOTENCY_KEY" \
--data-raw '{"query":"mutation CreateItem { create_item(board_id: 123456, item_name: \"New item\") { id } }"}'
```

# Using the monday SDK

In `@mondaydotcomorg/api`, `ApiClient` (from 14.1.0) and `SeamlessApiClient` (from 14.2.0) send the `Idempotency-Key` header for you when you pass `idempotencyKey` in the options of `request()`:

```typescript
import { ApiClient } from '@mondaydotcomorg/api';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

await client.request(
  `mutation CreateItem { create_item(board_id: 123456, item_name: "New item") { id } }`,
  undefined,
  { idempotencyKey: 'YOUR_UNIQUE_IDEMPOTENCY_KEY' }
);
```

In an app, `SeamlessApiClient` takes the same option:

```typescript
import { SeamlessApiClient } from '@mondaydotcomorg/api';

const client = new SeamlessApiClient();

await client.request(
  `mutation CreateItem { create_item(board_id: 123456, item_name: "New item") { id } }`,
  undefined,
  { idempotencyKey: 'YOUR_UNIQUE_IDEMPOTENCY_KEY' }
);
```

If you also pass an `Idempotency-Key` in `headers`, the `idempotencyKey` option wins. An empty string (`""`) is rejected before the request is sent. See the [JavaScript SDK](https://developer.monday.com/api-reference/docs/javascript-sdk) page for all request options.

## In an app iframe

When your app runs in a monday.com iframe and uses `SeamlessApiClient`, only some response headers reach your app (see [Response](https://developer.monday.com/api-reference/docs/javascript-sdk#response) on the JavaScript SDK page). `Idempotency-Replayed` isn't one of them, so an app in an iframe can't tell a replayed response from a fresh one.

Errors arrive without an HTTP status, so you can't check for `409`. Read the error code from `error.response.errors[0].extensions.code` and the wait time from the `Retry-After` header. For a concurrent duplicate (this example needs 14.3.0 or later, where `instanceof SeamlessApiClientError` works):

```typescript
import { SeamlessApiClient, SeamlessApiClientError } from '@mondaydotcomorg/api';

const client = new SeamlessApiClient();

try {
  await client.request(mutation, variables, { idempotencyKey });
} catch (error) {
  if (
    error instanceof SeamlessApiClientError &&
    error.response.errors?.[0]?.extensions?.code === 'IDEMPOTENCY_CONFLICT'
  ) {
    const waitSeconds = Number(error.response.headers?.get('retry-after') ?? 1);
    // wait, then retry with the same idempotencyKey
  }
}
```

If you set `errorPolicy` to `'all'` or `'ignore'`, the call resolves instead of rejecting, so check the response for errors yourself. See [SeamlessApiClient error policies](https://developer.monday.com/api-reference/docs/javascript-sdk#seamlessapiclient-error-policies).

# Response headers

| Header                 | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Idempotency-Replayed` | Set to `true` when the response is served from storage (i.e., this is a replayed retry, not a fresh execution). The mutation already ran; the replay still counts against [rate limits](https://developer.monday.com/api-reference/docs/rate-limits). To run it again, use a new key. |

# Rules and constraints

| Rule              | Detail                                                                                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mutations only    | Queries ignore the header. Sending it on a query has no effect and returns no error.                                                                                                                                        |
| POST only         | Only applies to POST requests.                                                                                                                                                                                              |
| What is stored    | Only successful (2xx) responses. Any other status frees the key, so a retry with the same key runs again. A `200` response that carries GraphQL `errors`, partial or full, is stored and replayed for the whole 30 minutes. |
| Key reuse         | Use a unique `Idempotency-Key` for every unique operation. Reuse a key only when retrying that exact same request.                                                                                                          |
| Storage duration  | A response is stored for 30 minutes from the moment it's stored. The window is fixed and replays don't extend it. After it expires, the same key executes fresh.                                                            |
| API version       | No minimum version. Idempotency keys work on every API version.                                                                                                                                                             |
| Key format        | Any non-empty string, not validated. We recommend UUIDs.                                                                                                                                                                    |
| Per-user budget   | Each user and app combination has a storage budget over a fixed 30-minute window. If the budget is exceeded, the response is returned but not stored, so a retry with the same key runs again.                              |
| Max response size | Responses with an empty body, or larger than 1 MB, are not stored, so a retry runs again.                                                                                                                                   |

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

The response includes a `Retry-After` header. Wait the indicated time, then retry with the same key. If the first request's response was stored, the retry returns it. If the first request returned a non-2xx status, the key is freed and the retry runs as a new request.

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
