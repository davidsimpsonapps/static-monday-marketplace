---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Move Object (Platform MCP)

Moves a board, folder, or overview to a different position, parent folder, or workspace in monday.com using the Platform MCP.

Use this tool to reposition or reorganize a board, folder, or overview within monday.com. You can move an object into a different folder, to a different workspace, or to a specific position relative to another object. This tool is the primary way to restructure your workspace layout without modifying the content of the objects themselves.

**Note:** To move an object into a folder, provide `parentFolderId`. To move it to a workspace root, omit `parentFolderId`. To move it to a different workspace entirely, provide `workspaceId`. Positioning parameters (`position_object_id` and `position_object_type`) must always be provided together.

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
      <td>objectType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of object to move. One of: `Board`, `Folder`, `Overview`.</td>
    </tr>
    <tr>
      <td>id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the object to move.</td>
    </tr>
    <tr>
      <td>parentFolderId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the destination folder. Provide this to move the object into a specific folder.</td>
    </tr>
    <tr>
      <td>workspaceId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the destination workspace. Provide this when moving the object to a different workspace.</td>
    </tr>
    <tr>
      <td>accountProductId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the destination account product. Provide this when moving to a different account product context.</td>
    </tr>
    <tr>
      <td>position_object_id</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of a reference object to position this object relative to. Must be paired with `position_object_type`.</td>
    </tr>
    <tr>
      <td>position_object_type</td>
      <td>`string`</td>
      <td>No</td>
      <td>The type of the reference object for positioning. One of: `Board`, `Folder`, `Overview`. Must be paired with `position_object_id`.</td>
    </tr>
    <tr>
      <td>position_is_after</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, places this object after the reference object. If `false`, places it before.</td>
    </tr>
  </tbody>
</Table>

# Example

Move folder `20393953` into parent folder `19175809`:

```json
{
  "objectType": "Folder",
  "id": "20393953",
  "parentFolderId": "19175809"
}
```

When tested, this returned: `Object moved` with `object_id: 20393953`. The folder appeared nested inside folder `19175809` immediately after the operation.

To instead position a board after another board in the same folder:

```json
{
  "objectType": "Board",
  "id": "18394529013",
  "position_object_id": "18406574366",
  "position_object_type": "Board",
  "position_is_after": true
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/folders) to achieve the same result. For moving a board to a folder:

```graphql GraphQL
mutation {
  move_to_folder(
    board_id: 20393953
    folder_id: 19175809
  ) {
    id
  }
}
```

For moving a board between workspaces, use `update_board`:

```graphql GraphQL
mutation {
  update_board(
    board_id: 18394529013
    board_attribute: workspace_id
    new_value: "12406666"
  )
}
```

For full documentation, see [Folders](https://developer.monday.com/api-reference/reference/folders).
