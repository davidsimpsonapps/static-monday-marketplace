---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Board Info (Platform MCP)

Returns comprehensive metadata for a board, including its columns, groups, views, owners, and workspace details using the Platform MCP.

Use this tool to retrieve the full structure of a monday.com board before performing operations that depend on knowing column IDs, group IDs, or board configuration. The response includes column definitions (IDs, types, settings, and status labels), group names and IDs, board views with filter configurations, owner information, and sub-item column structure.

**This tool is a required precondition** before calling `get_board_items_page`, `create_item`, `change_item_column_values`, or `board_insights` on an unfamiliar board. It is also used to resolve view-based filters: if a user refers to a saved view by name, call this tool first to get the view's filter object.

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
      <td>`number`</td>
      <td>Yes</td>
      <td>The numeric ID of the board to retrieve information for.</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch metadata for board `18392419286`:

```json
{
  "boardId": 18392419286
}
```

The response returned the board's name (`Single Marketing Project`), 8 columns (including `status`, `date`, `people`, and `file` columns with their IDs and settings), 5 groups (`Planning`, `Design`, `Content`, `Channels`, `Done Tasks`), 5 saved views (Gantt, Kanban, chart, workload, files), and the sub-item board's column structure. Status column settings included all label definitions with their index values and hex colors.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/boards) to achieve the same result:

```graphql GraphQL
query {
  boards(ids: [18392419286]) {
    id
    name
    description
    board_kind
    state
    permissions
    url
    columns {
      id
      title
      type
      settings_str
    }
    groups {
      id
      title
    }
    owners {
      id
      name
    }
    views {
      id
      name
      type
    }
    workspace {
      id
      name
    }
  }
}
```

For full documentation, see [Boards](https://developer.monday.com/api-reference/reference/boards).
