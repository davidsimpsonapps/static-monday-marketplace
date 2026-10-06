---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Widget (Platform MCP)

Adds a new data visualization widget to a monday.com dashboard or board view with type-specific configuration settings using the Platform MCP.

Use this tool to add a widget to an existing dashboard or board view. Widgets are the building blocks of monday.com dashboards — they visualize board data as charts, counters, calendars, timelines, Gantt charts, and list views.

<Callout icon="🚧" theme="warn">
**Always call `all_widgets_schema` before creating a widget.** Each widget type has its own required settings structure. Providing incorrect or incomplete settings will result in an error. Fetch the schema first, then construct your settings object to match the widget type you want to create.
</Callout>

The recommended workflow is:

1. Use `all_widgets_schema` to retrieve the JSON schema for all widget types.
2. Build a `settings` object that conforms to the schema for your chosen `widget_kind`.
3. Call `create_widget` with the dashboard ID and the validated settings.

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
      <td>parent_container_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>ID of the parent container — a dashboard ID or a board view ID.</td>
    </tr>
    <tr>
      <td>parent_container_type</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Type of the parent container. Must be `DASHBOARD` or `BOARD_VIEW`.</td>
    </tr>
    <tr>
      <td>widget_kind</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of widget to create. One of: `APP_FEATURE`, `BATTERY`, `CALENDAR`, `CHART`, `GANTT`, `LISTVIEW`, `NUMBER`.</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Display name for the widget (1–255 UTF-8 characters).</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>`object`</td>
      <td>No</td>
      <td>Widget-specific configuration as a JSON object. Must conform to the schema for the specified `widget_kind`. Use `all_widgets_schema` to retrieve the required structure for each type.</td>
    </tr>
  </tbody>
</Table>

# Example

Add a NUMBER (counter) widget to dashboard `37055164` that counts items from board `18394529013`:

```json
{
  "parent_container_id": "37055164",
  "parent_container_type": "DASHBOARD",
  "widget_kind": "NUMBER",
  "widget_name": "Item Count",
  "settings": {
    "counter_data": {
      "calculation_type": "count",
      "column_ids_per_board": {
        "18394529013": []
      },
      "counter_type": "sum"
    }
  }
}
```

The tool returned widget ID `666707475`, confirming the widget was created on dashboard `37055164` with the name `Item Count`.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/widgets) to achieve the same result:

```graphql GraphQL
mutation {
  create_widget(
    board_id: 37055164
    widget_type: number
    name: "Item Count"
    settings: "{\"counter_data\":{\"calculation_type\":\"count\",\"counter_type\":\"sum\"}}"
  ) {
    id
    name
    type
  }
}
```

For full documentation, see [Widgets](https://developer.monday.com/api-reference/reference/widgets).
