---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Workspace Info (Platform MCP)

Returns the boards, docs, and folders inside a workspace, including which folder each item belongs to using the Platform MCP.

Use this tool to get a structural overview of a workspace's contents. It returns up to 100 boards, 100 docs, and 100 folders, organized by folder membership. Root-level items (not inside any folder) are returned separately under `root_items`. This is useful for understanding a workspace's layout before moving objects, creating folders, or targeting specific boards.

<Callout icon="🚧" theme="warn">
If any object type (boards, docs, or folders) returns exactly 100 results, assume there are additional items of that type not included in the response. Use the GraphQL API directly to paginate through the full list.
</Callout>

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
      <td>workspace_id</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the workspace to retrieve information for. Use <a href="doc:list-workspaces">list_workspaces</a> to find workspace IDs.</td>
    </tr>
  </tbody>
</Table>

# Example

Get the full structure of workspace `12406666`:

```json
{
  "workspace_id": 12406666
}
```

The response includes workspace metadata, a `folders` array (each with its nested boards and docs), and a `root_items` object for boards and docs that aren't inside any folder. For example:

```json
{
  "workspace": {
    "id": "12406666",
    "name": "MCP TEST WORKSPACE",
    "kind": "open",
    "state": "active"
  },
  "folders": [
    {
      "id": "19028717",
      "name": "Real estate agency management",
      "boards": [
        { "id": "18392419211", "name": "Agent task management Board" }
      ],
      "docs": []
    }
  ],
  "root_items": {
    "boards": [
      { "id": "18394522211", "name": "Final Asset Library" }
    ],
    "docs": [
      { "id": "35809248", "name": "test doc" }
    ]
  }
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/workspaces) to achieve the same result:

```graphql GraphQL
query {
  workspaces(ids: [12406666]) {
    id
    name
    kind
    state
    boards {
      id
      name
      folder_id
    }
    folders {
      id
      name
      children {
        id
        name
      }
    }
  }
}
```

For full documentation, see [Workspaces](https://developer.monday.com/api-reference/reference/workspaces).
