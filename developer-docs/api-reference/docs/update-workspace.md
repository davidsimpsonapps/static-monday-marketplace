---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Workspace (Platform MCP)

Updates the name, description, kind, or account product association of an existing workspace using the Platform MCP.

Use this tool to modify the properties of an existing workspace. You can rename it, update its description, change its kind (open, closed, or template), or move it to a different account product. Only the `id` is required—all other attributes are optional and only the fields you provide will be updated.

**Note:** You must have admin or owner permissions on the workspace to update it. Changing `workspaceKind` from `open` to `closed` will restrict visibility to current members only.

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
      <td>id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the workspace to update. Use <a href="doc:list-workspaces">list_workspaces</a> to find workspace IDs.</td>
    </tr>
    <tr>
      <td>attributeName</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new name for the workspace.</td>
    </tr>
    <tr>
      <td>attributeDescription</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new description for the workspace.</td>
    </tr>
    <tr>
      <td>attributeKind</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new kind for the workspace. One of: `open`, `closed`, or `template`.</td>
    </tr>
    <tr>
      <td>attributeAccountProductId</td>
      <td>`number`</td>
      <td>No</td>
      <td>The target account product ID to move the workspace to.</td>
    </tr>
  </tbody>
</Table>

# Example

Rename a workspace and update its description:

```json
{
  "id": "15420091",
  "attributeName": "Product Team Q3 (Archive)",
  "attributeDescription": "Archived workspace for Q3 product roadmap"
}
```

When tested, this returned: `Workspace 15420091 updated` with the new name reflected immediately. Unspecified fields were left unchanged.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/workspaces#update-a-workspace) to achieve the same result:

```graphql GraphQL
mutation {
  update_workspace(
    id: 15420091
    attributes: {
      name: "Product Team Q3 (Archive)"
      description: "Archived workspace for Q3 product roadmap"
    }
  ) {
    id
    name
    description
    kind
  }
}
```

For full documentation, see [Workspaces](https://developer.monday.com/api-reference/reference/workspaces#update-a-workspace).
