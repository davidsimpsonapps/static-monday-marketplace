---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Get Tasks Assigned to a Person Across Projects

Learn how to find all tasks assigned to a specific person across multiple projects in a portfolio

There is no cross-board query in the monday.com API. To find all tasks assigned to a specific person across projects in a portfolio, you need to iterate over each project's tasks board and filter by assignee.

# Step 1 — Get all tasks board IDs from the portfolio

Follow Step 2 of the [List All Projects in a Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-list-portfolio-projects) skill to extract all tasks board IDs from the portfolio's `portfolio_project_link` column:

```graphql GraphQL
{
  boards(ids: [PORTFOLIO_BOARD_ID]) {
    columns {
      id
      settings_str
    }
  }
}
```

Parse `settings_str` for the column with `id: "portfolio_project_link"` to get the `boardIds` array.

# Step 2 — Query each tasks board for assigned items

For each tasks board ID, use [`items_page_by_column_values`](https://developer.monday.com/api-reference/reference/items-page-by-column-values) to filter by assignee:

```graphql GraphQL
{
  items_page_by_column_values(
    limit: 50,
    board_id: TASKS_BOARD_ID,
    columns: [{ column_id: "project_owner", column_values: ["USER_ID"] }]
  ) {
    cursor
    items {
      id
      name
      board { id name }
      column_values(ids: ["project_owner", "project_dependency"]) {
        id
        type
        text
      }
    }
  }
}
```

Repeat this query for each board ID. Use `cursor` for pagination if a single board has more than 50 tasks.

# Important notes

* `project_owner` is the consistent column ID for the assignee on tasks boards — no per-board column inspection is needed.
* This approach requires O(n) requests where n is the number of projects in the portfolio. If you only need tasks across a known subset of projects, pass only those board IDs.
* `items_page_by_column_values` requires a single `board_id` — multi-board filtering is not supported.
* `query_params` rules do not work for people columns. Always use `items_page_by_column_values` for person-based filtering.
