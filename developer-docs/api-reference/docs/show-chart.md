---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Show Chart (Platform MCP UI)

Renders an interactive pie or bar chart visualization in the chat interface from a set of named data points using the Platform MCP.

<Callout icon="🚧" theme="warn">This is an internal UI component. It is called automatically by the Platform MCP server — do not call it directly.</Callout>

`show-chart` renders a chart or graph in the chat interface, letting users see a visual breakdown of their data. The MCP server invokes this tool automatically when a user asks for a pie chart, bar chart, data visualization, or any graphical representation of numeric data derived from their boards.

The chart accepts an array of data points, each with a label and a numeric value. You can optionally specify a color per data point and add a title to the chart.

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
      <td>Array of data points. Each point must include <code>name</code> (label) and <code>y</code> (numeric value). Optionally include <code>color</code> (any valid CSS color: hex, rgb, or color name).</td>
    </tr>
    <tr>
      <td>type</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Chart type to render. Use <code>"pie"</code> for a circular chart with segments or <code>"bar"</code> for horizontal bars.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>`string`</td>
      <td>No</td>
      <td>Optional title text displayed above the chart. Omit for no title.</td>
    </tr>
  </tbody>
</Table>

# Example

Render a pie chart showing the distribution of item statuses on a board:

```json
{
  "type": "pie",
  "title": "Sprint Status Breakdown",
  "data": [
    { "name": "Done", "y": 14, "color": "#00ca72" },
    { "name": "In Progress", "y": 7, "color": "#fdab3d" },
    { "name": "Stuck", "y": 3, "color": "#e2445c" },
    { "name": "Not Started", "y": 6, "color": "#c4c4c4" }
  ]
}
```

Render a bar chart comparing item counts across groups:

```json
{
  "type": "bar",
  "title": "Items by Group",
  "data": [
    { "name": "Backlog", "y": 22 },
    { "name": "In Development", "y": 10 },
    { "name": "QA", "y": 5 },
    { "name": "Done", "y": 18 }
  ]
}
```

***

# Programmatic equivalent

There is no direct API equivalent for rendering a chart — this component is specific to the MCP chat interface. To retrieve the underlying data for your own charting, query the board items and aggregate column values using the monday.com GraphQL API. See the [monday.com API reference](https://developer.monday.com/api-reference/reference) for available queries.
