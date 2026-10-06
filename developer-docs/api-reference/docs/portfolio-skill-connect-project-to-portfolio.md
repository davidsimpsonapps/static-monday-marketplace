---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Connect a Project to a Portfolio

Learn how to connect an existing project board to a portfolio board, with optional async callback delivery

The [`connect_project_to_portfolio`](https://developer.monday.com/api-reference/docs/portfolio) mutation links an existing project board to a portfolio board by creating a linked item in the portfolio. The mutation runs synchronously by default and returns the new `portfolio_item_id` directly. From version `2026-07`, it also accepts an optional `callback_url` that switches the operation into async mode.

> 🚧 **Rate limit**
>
> This mutation has an additional rate limit of **40 mutations per minute** on top of the standard API complexity limits.

# Step 1 — Identify the project and portfolio boards

You need two board IDs:

* **Project board** — the tasks board you want to add to the portfolio. This is the board with the `Planning / Execution / Launch` groups (see [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) for how to distinguish a tasks board from a portfolio board).
* **Portfolio board** — the destination portfolio. This is the board with a single `Projects` group (see [Create a New Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-create-portfolio) and [List All Projects in a Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-list-portfolio-projects)).

If you only have a regular board (not yet a project), use [`convert_board_to_project`](https://developer.monday.com/api-reference/docs/portfolio) first to convert it before connecting.

# Step 2 — Connect the project (synchronous)

Run the mutation with both IDs. The response includes the new `portfolio_item_id` once the link is created:

```graphql GraphQL
mutation {
  connect_project_to_portfolio(
    projectBoardId: 1234567890
    portfolioBoardId: 9876543210
  ) {
    success
    message
    portfolio_item_id
  }
}
```

A successful response looks like:

```json
{
  "data": {
    "connect_project_to_portfolio": {
      "success": true,
      "message": "Successfully connected project 1234567890 to portfolio 9876543210",
      "portfolio_item_id": "5555555555"
    }
  }
}
```

Use the returned `portfolio_item_id` to read or update portfolio-level metadata (health, stage, owner, timeline) on the new linked item — see [Update Project Status](https://developer.monday.com/api-reference/docs/portfolio-skill-update-project-status).

# Step 3 — Connect with a callback URL (async, `2026-07`+)

> 🚧 **Available from API version `2026-07`**
>
> The `callback_url` argument and the `process_id` response field require version `2026-07` or later.

Pass an HTTPS URL as `callback_url` to switch the mutation into async mode. The mutation returns **immediately** with a `process_id` and `success: true`, and the actual result is POSTed to your callback URL once the operation completes.

```graphql GraphQL
mutation {
  connect_project_to_portfolio(
    projectBoardId: 1234567890
    portfolioBoardId: 9876543210
    callback_url: "https://your-domain.com/webhook/portfolio-connect"
  ) {
    success
    message
    process_id
    portfolio_item_id
  }
}
```

In async mode the immediate response looks like:

```json
{
  "data": {
    "connect_project_to_portfolio": {
      "success": true,
      "message": "Connection initiated. The result will be sent to your callback URL when available.",
      "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e",
      "portfolio_item_id": null
    }
  }
}
```

`portfolio_item_id` is `null` in the immediate response — it arrives in the callback payload.

## Callback payload

When the operation finishes, monday.com sends a `POST` request to your `callback_url` with this JSON body:

| Field               | Type      | Description                                                          |
| :------------------ | :-------- | :------------------------------------------------------------------- |
| `is_success`        | `Boolean` | `true` if the project was linked, `false` if the operation failed.   |
| `process_id`        | `String`  | The same `process_id` returned by the mutation. Use it to correlate. |
| `portfolio_item_id` | `String`  | The new portfolio item ID. Present only when `is_success` is `true`. |

Example success payload:

```json
{
  "is_success": true,
  "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e",
  "portfolio_item_id": "5555555555"
}
```

Example failure payload:

```json
{
  "is_success": false,
  "process_id": "9c1f2a8b-7d3e-4c12-9b2f-7a0e1d4c8b6e"
}
```

## When to use callbacks

Use the synchronous flow when you can keep the GraphQL request open and act on `portfolio_item_id` directly. Prefer the async (`callback_url`) flow when:

* You're connecting many projects in a batch and want to avoid blocking on each request.
* You're running in an environment where long-lived requests are awkward (queue workers, serverless, etc.).
* You want a durable record of the operation outcome that doesn't depend on holding the original HTTP connection.

# Important notes

* **Mutation version:** the mutation itself has been available since `2025-10`. Only the `callback_url` argument and the `process_id` result field require `2026-07`.
* **Rate limit:** even with the async variant, the 40-per-minute rate limit applies to the mutation call, not the callback delivery.
* **Callback security:** treat the callback endpoint as untrusted from the network's perspective — verify the `process_id` matches one you initiated before acting on the payload.
* **Idempotency:** connecting the same project to the same portfolio twice will fail validation. Use [List All Projects in a Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-list-portfolio-projects) to check membership first if you can't track it client-side.
* **Permissions:** requires the `boards:write` scope, and portfolio solutions are only available on Enterprise plans.
