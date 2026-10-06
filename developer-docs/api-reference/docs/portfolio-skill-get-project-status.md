---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Get Project Status / Health

Learn how to read a project's health, stage, priority, and timeline from the portfolio board

A project's status and health data lives on the **portfolio board**, not the tasks board. Each project is represented as an item on this board, with dedicated columns for health (RAG), stage, priority, and timeline.

# Identifying the portfolio board vs. the tasks board

When a project is created, monday.com provisions two boards with the same name. You need to distinguish between them before reading or writing project data.

Fetch all boards in the workspace and compare their structure:

```graphql GraphQL
{
  boards(workspace_ids: [WORKSPACE_ID], limit: 20, order_by: created_at) {
    id
    name
    groups { title }
    columns { id title type }
  }
}
```

| Board               | Groups                      | How to identify                                                                 |
| :------------------ | :-------------------------- | :------------------------------------------------------------------------------ |
| **Tasks board**     | Planning, Execution, Launch | Has a `dependency` column; created first (earlier `created_at`)                 |
| **Portfolio board** | Projects                    | Has columns of type `mirror` and a `status` column named `Project Health (RAG)` |

> 📘 **Tip**
>
> The tasks board is always created first (earlier `created_at`), so sorting by `created_at` can help you identify it quickly.

# Reading project status columns

Each project is an item on the portfolio board. You can fetch all projects at once or query a specific item by ID.

## All projects on the board

```graphql GraphQL
{
  boards(ids: [PORTFOLIO_BOARD_ID]) {
    items_page(limit: 50) {
      items {
        id
        name
        column_values {
          id
          type
          text
          value
        }
      }
    }
  }
}
```

## A specific project by item ID

```graphql GraphQL
{
  items(ids: [ITEM_ID]) {
    id
    name
    column_values {
      id
      type
      text
      value
    }
  }
}
```

## Key columns

| Column ID                            | Title                | Type     | Values                               |
| :----------------------------------- | :------------------- | :------- | :----------------------------------- |
| `portfolio_project_rag`              | Project Health (RAG) | status   | `On track`, `At risk`, `Off track`   |
| `portfolio_project_step`             | Stage                | status   | Stage labels                         |
| `portfolio_project_priority`         | Priority             | status   | Priority labels                      |
| `portfolio_project_planned_timeline` | Planned Timeline     | timeline | Start/end dates                      |
| `portfolio_project_progress`         | Project Progress     | mirror   | Read-only, mirrored from tasks board |
| `portfolio_project_actual_timeline`  | Actual Timeline      | mirror   | Read-only, mirrored from tasks board |

> 📘 **Note**
>
> `mirror` columns are read-only — they reflect aggregated data from the linked tasks board and cannot be set directly. This matches the behavior in the UI.

# Important notes

* Column IDs (`portfolio_project_rag`, etc.) are consistent across projects but may vary if a custom project template is used.
* To read health across multiple projects in a portfolio, query all items on the portfolio board in a single call.
