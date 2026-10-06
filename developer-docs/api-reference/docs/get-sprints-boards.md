---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Sprints Boards (Platform MCP)

Discovers monday Dev sprint boards and their paired tasks boards in your account using the Platform MCP.

Use this tool to discover monday Dev sprint boards in your account. It scans your recently used boards (up to 100) to identify valid monday Dev sprint management boards and returns them as pairs: a sprints board and its corresponding tasks board. The board IDs returned by this tool are required inputs for `get_sprints_metadata` and other sprint tools.

Run this tool first when working with sprints. If no sprint boards are found, the user may need to provide board IDs manually.

# Parameters

This tool takes no parameters.

# Example

```json
{}
```

Calling the tool in the test account returned one matched pair:

* **Sprints board ID:** `8222767867`
* **Tasks board:** `Tasks - Platform API` (ID `8222767873`, workspace: Platform API)

The response also includes a `technical_reference` field describing how to use the `task_sprint` column to add, remove, search, and move tasks between sprints. Note that the `task_sprint` column on a tasks board references **only its paired sprints board** — cross-pair operations will fail.

***

# Programmatic equivalent

You can retrieve board information using the [GraphQL API](https://developer.monday.com/api-reference/reference/boards):

```graphql GraphQL
query {
  boards(limit: 100) {
    id
    name
    board_kind
    workspace {
      id
      name
    }
  }
}
```

However, identifying which boards are monday Dev sprint boards and resolving the pairing between sprints boards and tasks boards requires the logic built into this MCP tool. Use `get_monday_dev_sprints_boards` for discovery and then the GraphQL API for further board operations if needed.
