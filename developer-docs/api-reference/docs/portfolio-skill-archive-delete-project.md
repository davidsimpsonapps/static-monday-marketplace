---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Archive / Delete a Project

Learn how to archive or delete project boards and understand the limitations of disconnecting projects from portfolios

A project consists of two boards — the tasks board and the portfolio board. Both can be archived or deleted via the API. Typically you operate on the tasks board; the portfolio board follows.

See [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) for how to identify each board type.

# Archive a project board

Archiving is reversible. The board is hidden from the workspace but not permanently removed.

```graphql GraphQL
mutation {
  archive_board(board_id: TASKS_BOARD_ID) {
    id
    state
  }
}
```

Returns `state: "archived"` on success.

# Delete a project board

Deletion is permanent and cannot be undone.

```graphql GraphQL
mutation {
  delete_board(board_id: TASKS_BOARD_ID) {
    id
  }
}
```

> 🚧 **Important**
>
> `archive_board` and `delete_board` operate on individual boards. To fully remove a project, you need to archive or delete **both** the tasks board and the portfolio board.

# Disconnect a project from a portfolio

Disconnecting a project from a portfolio (leaving it as a standalone project) is **not supported via the public API**.

Do not use `delete_item` on the portfolio board item as a workaround — this deletes the portfolio board entirely, leaving the tasks board orphaned. It does not replicate the UI "disconnect" behavior.

For disconnect operations, use the monday.com UI.

# Important notes

* [`connect_project_to_portfolio`](https://developer.monday.com/api-reference/docs/portfolio) takes the **tasks board ID** as `projectBoardId` (not the portfolio board ID). Once connected to a portfolio, the portfolio board holds the project item.
