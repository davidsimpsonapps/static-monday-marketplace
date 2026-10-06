---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Show Battery (Platform MCP UI)

Renders an interactive battery-style progress indicator in the chat interface, visualizing a status or completion distribution across colored segments using the Platform MCP.

<Callout icon="🚧" theme="warn">This is an internal UI component. It is called automatically by the Platform MCP server — do not call it directly.</Callout>

`show-battery` renders a battery-style horizontal progress bar in the chat interface. Each segment represents a named category with a numeric value and a color, displayed as a proportional slice of the bar. The MCP server invokes this tool automatically when a user asks for a progress view, status distribution, completion percentage, or monday.com-style battery visualization.

Unlike `show-chart`, the `color` field is **required** for every segment in `show-battery` — it controls each segment's color in the bar and in the legend.

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
      <td>data</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Array of segments. Each segment must include <code>name</code> (label), <code>y</code> (numeric value, minimum 0), and <code>color</code> (any valid CSS color). All three fields are required per segment.</td>
    </tr>
  </tbody>
</Table>

# Example

Render a battery showing sprint completion status:

```json
{
  "data": [
    { "name": "Done", "y": 18, "color": "#00ca72" },
    { "name": "In Progress", "y": 9, "color": "#fdab3d" },
    { "name": "Stuck", "y": 3, "color": "#e2445c" },
    { "name": "Not Started", "y": 10, "color": "#c4c4c4" }
  ]
}
```

This displays a single horizontal bar divided into four colored segments proportional to their `y` values, with a legend below. The total (40 items) is used to calculate percentages for each segment.

***

# Programmatic equivalent

There is no direct API equivalent for rendering a battery visualization — this component is specific to the MCP chat interface. To retrieve the underlying status data, use the monday.com GraphQL API to query item column values and aggregate them by status label. See the [monday.com API reference](https://developer.monday.com/api-reference/reference) for available queries.
