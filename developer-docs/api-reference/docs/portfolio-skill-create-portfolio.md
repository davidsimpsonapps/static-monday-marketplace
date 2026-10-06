---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Create a New Portfolio

Learn how to create a portfolio board and retrieve its ID, either via an optional callback URL or by polling workspace boards

The [`create_portfolio`](https://developer.monday.com/api-reference/docs/portfolio) mutation creates a new portfolio board. From version `2026-07` it accepts an optional `callback_url`: pass an HTTPS endpoint and monday.com will POST the new `portfolio_id` to it once the board is created. If you can't receive callbacks, use the polling fallback below.

# Recommended — Create with a callback URL (`2026-07`+)

> 🚧 **Available from API version `2026-07`**
>
> The `callback_url` argument and the `process_id` response field require version `2026-07` or later.

Pass an HTTPS URL as `callback_url`. The mutation returns **immediately** with a `process_id` and `success: true`, and the new `portfolio_id` is POSTed to your callback URL once the portfolio board is actually created.

```graphql GraphQL
mutation {
  create_portfolio(
    boardName: "My Portfolio"
    boardPrivacy: "public"
    destinationWorkspaceId: 12345
    callback_url: "https://your-domain.com/webhook/portfolio-created"
  ) {
    success
    message
    process_id
  }
}
```

The immediate response looks like:

```json
{
  "data": {
    "create_portfolio": {
      "success": true,
      "message": "Creation initiated. The portfolio_id will be sent to your callback URL when available.",
      "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e"
    }
  }
}
```

`solution_live_version_id` is not the portfolio board ID — ignore it in async mode and rely on the callback.

## Callback payload

When the portfolio board is created, monday.com sends a `POST` request to your `callback_url` with this JSON body:

| Field          | Type      | Description                                                                 |
| :------------- | :-------- | :-------------------------------------------------------------------------- |
| `is_success`   | `Boolean` | `true` if the portfolio board was created, `false` if the operation failed. |
| `process_id`   | `String`  | The same `process_id` returned by the mutation. Use it to correlate.        |
| `portfolio_id` | `Number`  | The new portfolio board ID. Present only when `is_success` is `true`.       |

Example success payload:

```json
{
  "is_success": true,
  "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e",
  "portfolio_id": 1234567890
}
```

Example failure payload:

```json
{
  "is_success": false,
  "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e"
}
```

# Fallback — Poll workspace boards

If you can't expose a callback endpoint, you can identify the new portfolio board by polling the workspace.

## Step 1 — Record a timestamp and create the portfolio

Record the current UTC timestamp immediately before calling the mutation, then create the portfolio:

```graphql GraphQL
mutation {
  create_portfolio(
    boardName: "My Portfolio"
    boardPrivacy: "public"
    destinationWorkspaceId: 12345
  ) {
    success
    message
  }
}
```

The `boardPrivacy` argument accepts `"public"` or `"private"`.

## Step 2 — Poll for the portfolio board

Wait approximately 20 seconds, then fetch boards created after your recorded timestamp:

```graphql GraphQL
{
  boards(workspace_ids: [WORKSPACE_ID], limit: 20, order_by: created_at) {
    id
    name
    board_kind
    created_at
    groups { title }
  }
}
```

Filter the results client-side to identify the new portfolio board:

* `created_at` is after your recorded timestamp
* The board has a single group named `Projects`
* The `name` matches the portfolio name you provided

This combination reliably identifies the newly created portfolio board.

# When to use callbacks

Prefer the async (`callback_url`) flow when:

* You're creating many portfolios in a batch and want to avoid polling delays.
* You're running in an environment where polling is awkward (queue workers, serverless, etc.).
* You want a durable record of the operation outcome that doesn't depend on holding the original HTTP connection or scanning workspace boards.

Use the polling fallback only when you can't accept inbound HTTPS callbacks.

# Important notes

* **Mutation version:** `create_portfolio` itself has been available since `2025-10`. Only the `callback_url` argument and the `process_id` result field require `2026-07`.
* **`solution_live_version_id` is not a board ID** — it identifies the template used to create the portfolio and cannot be used to look up the board. In async mode, rely on the callback for the `portfolio_id`.
* **Callback security:** treat the callback endpoint as untrusted from the network's perspective — verify the `process_id` matches one you initiated before acting on the payload.
* **Permissions:** requires the `boards:write` scope, and portfolio solutions are only available on Enterprise plans.
