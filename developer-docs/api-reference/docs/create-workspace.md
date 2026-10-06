---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Workspace (Platform MCP)

Creates a new workspace in your monday.com account with a specified name, kind, and optional description using the Platform MCP.

Use this tool to create a new workspace in your monday.com account. Workspaces are the top-level organizational containers in monday.com—everything from boards and docs to folders lives inside a workspace. You can create open workspaces (visible to all account members), closed workspaces (invite-only), or template workspaces.

**Note:** Creating a workspace requires sufficient permissions on your monday.com account. The workspace is immediately active after creation and can be further configured with folders, boards, and members.

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
      <td>name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The name of the new workspace.</td>
    </tr>
    <tr>
      <td>workspaceKind</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of workspace to create. One of: `open`, `closed`, or `template`. Open workspaces are visible to all account members; closed workspaces require an explicit invite.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>`string`</td>
      <td>No</td>
      <td>A short description of the workspace's purpose.</td>
    </tr>
    <tr>
      <td>accountProductId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The account product ID to associate with the workspace (e.g., to scope the workspace to a specific monday product like CRM or Dev).</td>
    </tr>
  </tbody>
</Table>

# Example

Create an open workspace for a product team with a description:

```json
{
  "name": "Product Team Q3",
  "workspaceKind": "open",
  "description": "All boards and docs for the Q3 product roadmap"
}
```

When tested, this returned: `Workspace 15420091 successfully created` with the URL `https://monday.monday.com/workspaces/15420091`. The workspace was immediately accessible and ready to receive folders and boards.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/workspaces#create-a-workspace) to achieve the same result:

```graphql GraphQL
mutation {
  create_workspace(
    name: "Product Team Q3"
    kind: open
    description: "All boards and docs for the Q3 product roadmap"
  ) {
    id
    name
    kind
    description
  }
}
```

For full documentation, see [Workspaces](https://developer.monday.com/api-reference/reference/workspaces#create-a-workspace).
