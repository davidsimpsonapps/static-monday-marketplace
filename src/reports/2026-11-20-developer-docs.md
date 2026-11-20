---
title: "API docs add portfolio bulk add, rollups for dropdown and people columns, and app input changes"
date: 2026-11-20
topic: developer-docs
lede: "monday.com's API docs describe new `2027-01` and `2027-04` features: `UNIQUE_VALUES` rollups for dropdown and people columns, `CreateAppInputV2` and `UpdateAppInputV2` for apps, reply lookup by ID, and portfolio bulk-add queries and mutations."
---

### Multi-level board rollups

From API version `2027-01`, rollup can be enabled on dropdown and people columns of multi-level boards, using the new `UNIQUE_VALUES` function. It is opt-in: pass `capabilities: { calculated: { function: UNIQUE_VALUES } }` when creating or updating the column. The rollup collects distinct values from leaf items only, ordered by item ID. `NONE` does not apply to these columns. See [Working with multi-level boards](https://developer.monday.com/api-reference/docs/working-with-multi-level-boards).

### App mutations

In `2027-01` and later, `create_app` and `update_app` take new input types, `CreateAppInputV2` and `UpdateAppInputV2`, with permission scopes as strings (for example `DOCS_WRITE`) instead of enum values. Earlier versions keep `CreateAppInput` and `UpdateAppInput`. See [App](https://developer.monday.com/api-reference/reference/app) and [app types](https://developer.monday.com/api-reference/reference/app-other-types).

### Replies

In `2027-01` and later, the `replies` query accepts an `ids` argument (max 100) and `board_ids` becomes optional. `ids` can't be combined with `board_ids`, and `limit`, `page`, `created_at_from` and `created_at_to` don't apply when it is used. See [Replies](https://developer.monday.com/api-reference/reference/replies).

### Portfolio bulk add

Version `2027-04` and later adds the `portfolio_bulk_add_status` and `portfolio_bulk_add_results` queries, plus an `add_existing_projects_to_portfolio` mutation and a halt result type for stopping a running bulk add. Failed items are reported with a reason code and a retryable flag. See [Portfolio](https://developer.monday.com/api-reference/reference/portfolio) and [portfolio types](https://developer.monday.com/api-reference/reference/portfolio-other-types).

### Board export limit

The `ITEM_LIMIT_EXCEEDED` export failure reason is now documented as applying to boards with more than 100,000 items, not counting subitems. See [board export types](https://developer.monday.com/api-reference/reference/board-export-other-types).
