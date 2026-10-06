---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Folder (Platform MCP)

Creates a new folder inside a monday.com workspace, with optional color, icon, font weight, and parent folder settings using the Platform MCP.

Use this tool to create a folder inside a workspace. Folders help organize boards and docs into logical groups. You can nest folders by specifying a `parentFolderId`, and customize the folder's appearance with a color, icon, and font weight. After creating a folder, use its returned ID to move boards into it with [`move_object`](https://developer.monday.com/api-reference/docs/move-object) or nest additional folders.

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
      <td>workspaceId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the workspace where the folder will be created.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The name of the folder.</td>
    </tr>
    <tr>
      <td>color</td>
      <td>`string`</td>
      <td>No</td>
      <td>The folder's color. One of: `AQUAMARINE`, `BRIGHT_BLUE`, `BRIGHT_GREEN`, `CHILI_BLUE`, `DARK_ORANGE`, `DARK_PURPLE`, `DARK_RED`, `DONE_GREEN`, `INDIGO`, `LIPSTICK`, `NULL`, `PURPLE`, `SOFIA_PINK`, `STUCK_RED`, `SUNSET`, `WORKING_ORANGE`.</td>
    </tr>
    <tr>
      <td>fontWeight</td>
      <td>`string`</td>
      <td>No</td>
      <td>The font weight of the folder label. One of: `FONT_WEIGHT_BOLD`, `FONT_WEIGHT_LIGHT`, `FONT_WEIGHT_NORMAL`, `FONT_WEIGHT_VERY_LIGHT`, `NULL`.</td>
    </tr>
    <tr>
      <td>customIcon</td>
      <td>`string`</td>
      <td>No</td>
      <td>The icon displayed on the folder. One of: `FOLDER`, `MOREBELOW`, `MOREBELOWFILLED`, `NULL`, `WORK`.</td>
    </tr>
    <tr>
      <td>parentFolderId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of a parent folder to nest this folder inside. If omitted, the folder is created at the workspace root.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a blue folder named "MCP Test Folder" in workspace `12406666`:

```json
{
  "workspaceId": "12406666",
  "name": "MCP Test Folder",
  "color": "BRIGHT_BLUE"
}
```

When tested, this returned: `Folder 20393953 successfully created` with the name `MCP Test Folder`. The folder ID (`20393953`) can then be used with [`update_folder`](https://developer.monday.com/api-reference/docs/update-folder) or [`move_object`](https://developer.monday.com/api-reference/docs/move-object).

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/folders#create-a-folder) to achieve the same result:

```graphql GraphQL
mutation {
  create_folder(
    workspace_id: 12406666
    name: "MCP Test Folder"
    color: BRIGHT_BLUE
  ) {
    id
    name
    color
  }
}
```

For full documentation, see [Folders](https://developer.monday.com/api-reference/reference/folders#create-a-folder).
