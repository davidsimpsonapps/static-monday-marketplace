---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: List All Projects in a Portfolio

Learn how to list projects in a portfolio and resolve each project's tasks board ID

Listing projects in a portfolio is a two-layer operation. You can retrieve project names and high-level metadata (health, status, owner) in a single query, but resolving the tasks board ID for each project requires additional steps.

This guide covers both layers.

# Step 1 — List all portfolio items

Query the portfolio board to retrieve project items with their metadata:

```graphql GraphQL
{
  boards(ids: [PORTFOLIO_BOARD_ID]) {
    items_page(limit: 50) {
      cursor
      items {
        id
        name
        column_values(ids: [
          "portfolio_project_rag",
          "portfolio_project_step",
          "portfolio_project_priority",
          "portfolio_project_owner",
          "portfolio_project_planned_timeline"
        ]) {
          id
          type
          text
        }
      }
    }
  }
}
```

This returns all projects with their health, stage, priority, owner, and timeline. Use cursor-based pagination for portfolios with more than 50 projects.

> 📘 **Note**
>
> If you only need project names and status (not tasks board IDs), this step alone is sufficient.

# Step 2 — Get tasks board IDs

The `portfolio_project_link` column (a `board_relation` type) links each portfolio item to its tasks board. The linked board IDs are stored in the column's `settings_str`:

```graphql GraphQL
{
  boards(ids: [PORTFOLIO_BOARD_ID]) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
```

Parse `settings_str` for the column with `id: "portfolio_project_link"`:

```json
{"boardIds": [TASKS_BOARD_ID_1, TASKS_BOARD_ID_2, ...]}
```

This gives you all tasks board IDs linked to the portfolio, but **not** which board belongs to which project item.

# Step 3 — Match each project to its tasks board

To map each portfolio item to its specific tasks board ID, use `linked_items` with each tasks board ID:

```graphql GraphQL
{
  boards(ids: [PORTFOLIO_BOARD_ID]) {
    items_page(limit: 50) {
      items {
        id
        name
        linked_items(
          link_to_item_column_id: "portfolio_project_link",
          linked_board_id: TASKS_BOARD_ID
        ) {
          id
          name
          board { id name }
        }
      }
    }
  }
}
```

Run this query once per tasks board ID from Step 2. Items that return `linked_items` for a given `linked_board_id` are matched to that tasks board.

# Full flow summary

1. **Get portfolio items** → project names + metadata
2. **Get portfolio board columns** → parse `portfolio_project_link.settings_str` → tasks board IDs
3. **For each tasks board ID** → get `linked_items` → match portfolio item to tasks board

# Important notes

* The `portfolio_project_link` column value is `null` on portfolio items — the board IDs are only available via `settings_str`, not per-item column values.
* The number of `linked_items` queries in Step 3 equals the number of projects in the portfolio. Batch where possible.
