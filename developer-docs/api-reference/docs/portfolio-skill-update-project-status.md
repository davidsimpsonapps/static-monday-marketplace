---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Update Project Status

Learn how to update a project's health, stage, priority, and timeline using the change_column_value mutation

A project's status fields live on the **portfolio board** as column values on the project's item. You can update them using the [`change_column_value`](https://developer.monday.com/api-reference/reference/columns#change-a-column-value) mutation.

See [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) for how to identify the portfolio board and find the project item ID.

# Update a status column

```graphql GraphQL
mutation {
  change_column_value(
    board_id: PORTFOLIO_BOARD_ID,
    item_id: PROJECT_ITEM_ID,
    column_id: "portfolio_project_rag",
    value: "{\"index\": 1}"
  ) {
    id
  }
}
```

## Writable columns

| Column ID                            | Title                | Type     |
| :----------------------------------- | :------------------- | :------- |
| `portfolio_project_rag`              | Project Health (RAG) | status   |
| `portfolio_project_step`             | Stage                | status   |
| `portfolio_project_priority`         | Priority             | status   |
| `portfolio_project_planned_timeline` | Planned Timeline     | timeline |
| `portfolio_project_scope`            | Project Description  | text     |

## Project Health (RAG) values

| Index | Label     |
| :---- | :-------- |
| `0`   | At risk   |
| `1`   | On track  |
| `2`   | Off track |

> 👍 **Discovering status label indexes**
>
> To find the available index values for other status columns, attempt a write with an invalid label — the API error response will list all valid options.

## Updating a timeline

To set or update the Planned Timeline, pass `from` and `to` dates as a JSON string:

```graphql GraphQL
mutation {
  change_column_value(
    board_id: PORTFOLIO_BOARD_ID,
    item_id: PROJECT_ITEM_ID,
    column_id: "portfolio_project_planned_timeline",
    value: "{\"from\": \"2026-01-01\", \"to\": \"2026-03-31\"}"
  ) {
    id
  }
}
```

# Important notes

* `mirror` columns (Project Progress, Actual Timeline) are read-only — they aggregate data from the tasks board and cannot be set directly. This matches the behavior in the UI.
* To update status across multiple projects, send one `change_column_value` mutation per project item.
