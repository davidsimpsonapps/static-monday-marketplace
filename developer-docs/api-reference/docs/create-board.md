---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Board (Platform MCP)

Creates a new monday.com board in a specified workspace with configurable visibility, description, and ownership using the Platform MCP.

Use this tool to create a new board in your monday.com account. You can specify the board's name, visibility kind (`public`, `private`, or `share`), an optional description, the target workspace, and one or more board owners. If no workspace is provided, the board is created in your default workspace.

A board is the primary container for organizing work in monday.com. Once created, you can add groups, columns, and items to it using the `create_group`, `create_column`, and `create_item` tools.

# Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>boardName</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display name of the new board.</td>
    </tr>
    <tr>
      <td>boardKind</td>
      <td>`string`</td>
      <td>No</td>
      <td>Visibility level of the board. One of `public`, `private`, or `share`. Defaults to `public`.</td>
    </tr>
    <tr>
      <td>boardDescription</td>
      <td>`string`</td>
      <td>No</td>
      <td>A short description of the board's purpose.</td>
    </tr>
    <tr>
      <td>workspaceId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the workspace to create the board in. Use `list_workspaces` to discover workspace IDs.</td>
    </tr>
    <tr>
      <td>boardOwnerIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>List of user IDs to set as board owners. Use `list_users_and_teams` to look up user IDs.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a public project tracking board in workspace `12406666`:

```json
{
  "boardName": "MCP Docs Test Board",
  "boardKind": "public",
  "boardDescription": "Temporary board for MCP tool documentation testing",
  "workspaceId": "12406666"
}
```

The tool returned board ID `18412502536`, a name, and a direct URL to the board: `https://monday.monday.com/boards/18412502536`.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/boards#create-a-board) to achieve the same result:

```graphql GraphQL
mutation {
  create_board(
    board_name: "MCP Docs Test Board"
    board_kind: public
    workspace_id: 12406666
    description: "Temporary board for MCP tool documentation testing"
  ) {
    id
    name
    url
  }
}
```

For full documentation, see [Boards](https://developer.monday.com/api-reference/reference/boards#create-a-board).
