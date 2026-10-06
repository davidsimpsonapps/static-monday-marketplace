---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Dashboard (Platform MCP)

Creates a new monday.com dashboard that aggregates and visualizes data from one or more boards using the Platform MCP.

Use this tool to create a new dashboard in your monday.com workspace. Dashboards are visual containers that display board data through widgets — charts, counters, timelines, and more. You must connect at least one board (and up to 50) when creating the dashboard; all widgets you add later will draw data from those connected boards.

After creating a dashboard, use `create_widget` to populate it with visualizations. Use `all_widgets_schema` first to understand which widget types are available and what settings each type requires.

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
      <td>Human-readable title for the dashboard (UTF-8 characters).</td>
    </tr>
    <tr>
      <td>workspace_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>ID of the workspace that will own the dashboard. Use `list_workspaces` or `workspace_info` to find workspace IDs.</td>
    </tr>
    <tr>
      <td>board_ids</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>List of board IDs (as strings) to connect to the dashboard. Minimum 1, maximum 50. All widgets on this dashboard will source data from these boards.</td>
    </tr>
    <tr>
      <td>kind</td>
      <td>`string`</td>
      <td>No</td>
      <td>Visibility level: `PUBLIC` or `PRIVATE`. Defaults to `PUBLIC`.</td>
    </tr>
    <tr>
      <td>board_folder_id</td>
      <td>`string`</td>
      <td>No</td>
      <td>Folder ID within the workspace to place the dashboard in. If omitted, the dashboard is placed in the workspace root.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a public dashboard connected to a project tracking board in workspace `12406666`:

```json
{
  "name": "MCP Docs Test Dashboard",
  "workspace_id": "12406666",
  "board_ids": ["18394529013"],
  "kind": "PUBLIC"
}
```

The tool returned dashboard ID `37055164` and confirmed the name `MCP Docs Test Dashboard`. The dashboard is now available in the workspace and ready to receive widgets.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/boards#create-a-board) to achieve the same result:

```graphql GraphQL
mutation {
  create_board(
    board_name: "MCP Docs Test Dashboard"
    board_kind: public
    workspace_id: 12406666
    board_type: dashboard
  ) {
    id
    name
    url
  }
}
```

For full documentation, see [Boards](https://developer.monday.com/api-reference/reference/boards#create-a-board).
