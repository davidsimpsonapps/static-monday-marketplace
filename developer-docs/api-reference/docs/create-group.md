---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Group (Platform MCP)

Creates a new group (section) in a monday.com board with an optional color and position relative to existing groups using the Platform MCP.

Use this tool to add a new group to an existing board. Groups are the sections that organize items into workflow phases, categories, or sprints (e.g. "Planning", "In Progress", "Done"). You can assign a predefined color and control where the new group appears by positioning it before or after an existing group.

**Note:** New items are always created in the top group of a board. If you want new items to land in the group you're creating, use `move_object` to reorder it to the top after creation, or design your group ordering accordingly.

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
      <td>boardId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the board to create the group in.</td>
    </tr>
    <tr>
      <td>groupName</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display name of the new group. Maximum 255 characters.</td>
    </tr>
    <tr>
      <td>groupColor</td>
      <td>`string`</td>
      <td>No</td>
      <td>Hex color for the group header. Must be one of the 19 predefined monday.com group colors: `#037f4c`, `#00c875`, `#9cd326`, `#cab641`, `#ffcb00`, `#784bd1`, `#9d50dd`, `#007eb5`, `#579bfc`, `#66ccff`, `#bb3354`, `#df2f4a`, `#ff007f`, `#ff5ac4`, `#ff642e`, `#fdab3d`, `#7f5347`, `#c4c4c4`, `#757575`.</td>
    </tr>
    <tr>
      <td>relativeTo</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of an existing group to position this group relative to. Use `get_board_info` to find group IDs.</td>
    </tr>
    <tr>
      <td>positionRelativeMethod</td>
      <td>`string`</td>
      <td>No</td>
      <td>Whether to place the new group `before_at` or `after_at` the `relativeTo` group.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a "Sprint 1" group with a blue color in board `18412502536`:

```json
{
  "boardId": "18412502536",
  "groupName": "Sprint 1",
  "groupColor": "#579bfc"
}
```

The tool returned the new group ID (`group_mm37rev`), group title (`Sprint 1`), and the board ID it was added to.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/groups) to achieve the same result:

```graphql GraphQL
mutation {
  create_group(
    board_id: 18412502536
    group_name: "Sprint 1"
    group_color: "#579bfc"
  ) {
    id
    title
    color
  }
}
```

For full documentation, see [Groups](https://developer.monday.com/api-reference/reference/groups).
