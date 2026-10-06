---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Skill: Duplicate a Project

Learn how to duplicate a project by identifying its tasks board and using the duplicate_board mutation

There is no single "duplicate project" mutation in the monday.com API. The correct approach is to use [`duplicate_board`](https://developer.monday.com/api-reference/reference/boards#duplicate-a-board) on the **project tasks board**.

See [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) for how to distinguish the tasks board from the portfolio board.

# Duplicate the tasks board

The `duplicate_board` mutation is synchronous and returns the new board ID immediately:

```graphql GraphQL
mutation {
  duplicate_board(
    board_id: TASKS_BOARD_ID,
    duplicate_type: duplicate_board_with_pulses,
    board_name: "My Project (copy)",
    workspace_id: TARGET_WORKSPACE_ID
  ) {
    board { id name }
  }
}
```

## `duplicate_type` options

| Value                                     | What it copies                           |
| :---------------------------------------- | :--------------------------------------- |
| `duplicate_board_with_structure`          | Structure only — no items                |
| `duplicate_board_with_pulses`             | Structure + items (recommended)          |
| `duplicate_board_with_pulses_and_updates` | Full copy including comments and updates |

# Limitations

* This duplicates the tasks board only. It does not replicate portfolio linkage or companion features (e.g., Resource Planner).
* For a full project duplication including portfolio context, additional steps beyond the public API are required.
