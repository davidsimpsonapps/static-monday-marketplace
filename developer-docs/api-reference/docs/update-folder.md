---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Folder (Platform MCP)

Updates the name, color, icon, position, or parent of an existing folder in monday.com using the Platform MCP.

Use this tool to modify an existing folder's properties. You can rename it, change its visual appearance (color, icon, font weight), reposition it relative to another object, or move it into a different parent folder or workspace. Only `folderId` is required—all other fields are optional and only provided fields will be updated.

**Note:** Positioning parameters (`position_object_id`, `position_object_type`, `position_is_after`) must be provided together. If you provide `position_object_id`, you must also provide `position_object_type`, and vice versa.

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
      <td>folderId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the folder to update.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new name for the folder.</td>
    </tr>
    <tr>
      <td>color</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new color for the folder. One of: `AQUAMARINE`, `BRIGHT_BLUE`, `BRIGHT_GREEN`, `CHILI_BLUE`, `DARK_ORANGE`, `DARK_PURPLE`, `DARK_RED`, `DONE_GREEN`, `INDIGO`, `LIPSTICK`, `NULL`, `PURPLE`, `SOFIA_PINK`, `STUCK_RED`, `SUNSET`, `WORKING_ORANGE`.</td>
    </tr>
    <tr>
      <td>fontWeight</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new font weight for the folder label. One of: `FONT_WEIGHT_BOLD`, `FONT_WEIGHT_LIGHT`, `FONT_WEIGHT_NORMAL`, `FONT_WEIGHT_VERY_LIGHT`, `NULL`.</td>
    </tr>
    <tr>
      <td>customIcon</td>
      <td>`string`</td>
      <td>No</td>
      <td>The new icon for the folder. One of: `FOLDER`, `MOREBELOW`, `MOREBELOWFILLED`, `NULL`, `WORK`.</td>
    </tr>
    <tr>
      <td>parentFolderId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the new parent folder to nest this folder inside.</td>
    </tr>
    <tr>
      <td>workspaceId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the workspace containing the folder. Required when moving the folder to a different workspace.</td>
    </tr>
    <tr>
      <td>accountProductId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The account product ID to associate with the folder.</td>
    </tr>
    <tr>
      <td>position_object_id</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of an object to position this folder relative to. Must be paired with `position_object_type`.</td>
    </tr>
    <tr>
      <td>position_object_type</td>
      <td>`string`</td>
      <td>No</td>
      <td>The type of object used as the positioning reference. One of: `Board`, `Folder`, `Overview`. Must be paired with `position_object_id`.</td>
    </tr>
    <tr>
      <td>position_is_after</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, positions the folder after the reference object. If `false`, positions it before.</td>
    </tr>
  </tbody>
</Table>

# Example

Rename folder `20393953` and change its color to purple:

```json
{
  "folderId": "20393953",
  "name": "MCP Test Folder (Updated)",
  "color": "PURPLE"
}
```

When tested, this returned: `Folder 20393953 updated` with the new name `MCP Test Folder (Updated)`. The color change was applied immediately and all unspecified fields remained unchanged.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/folders#update-a-folder) to achieve the same result:

```graphql GraphQL
mutation {
  update_folder(
    folder_id: 20393953
    name: "MCP Test Folder (Updated)"
    color: PURPLE
  ) {
    id
    name
    color
  }
}
```

For full documentation, see [Folders](https://developer.monday.com/api-reference/reference/folders#update-a-folder).
