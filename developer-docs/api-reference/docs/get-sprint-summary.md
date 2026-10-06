---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Sprint Summary (Platform MCP)

Returns a complete AI-generated performance summary and analysis for a completed monday Dev sprint using the Platform MCP.

Use this tool to retrieve the full summary and performance analysis for a completed sprint. The summary includes scope management analysis, velocity and task completion metrics, workload distribution per team member, task type breakdown, and AI-generated retrospective recommendations. Use this tool to drive sprint retrospectives, track team velocity over time, or surface improvement areas after a sprint closes.

<Callout icon="🚧" theme="warn">
The sprint must be **completed** and must have been created **after January 1, 2025**. Calling this tool on a planned or active sprint, or on a sprint that predates 2025, will return an error. The sprint board must also have the `sprint_summary` column configured.
</Callout>

Use `get_sprints_metadata` to find completed sprint IDs before calling this tool. When viewing the "Completed by Assignee" section of the summary, user IDs appear in the format `@user-12345678`. Use `list_users_and_teams` with the numeric user ID (the 8 digits after `@user-`) and `includeTeams: false` to resolve them to names.

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
      <td>sprintId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the sprint to get the summary for. Must be a completed sprint created after January 1, 2025. Use `get_sprints_metadata` to find sprint IDs.</td>
    </tr>
  </tbody>
</Table>

# Example

Retrieve the summary for sprint ID `11545180130` (Sprint 34):

```json
{
  "sprintId": 11545180130
}
```

The summary includes sections for:

* **Scope Management** — planned vs. unplanned tasks, scope creep analysis
* **Velocity & Performance** — individual velocity, task completion rates, workload distribution per team member
* **Task Distribution** — breakdown of completed tasks by type (Feature, Bug, Tech Debt, Infrastructure, etc.)
* **AI Recommendations** — action items, process improvements, and retrospective focus areas

<Callout icon="🚧" theme="warn">
If the sprint board doesn't have the `sprint_summary` column configured, the tool returns a validation error: `"Sprint item is missing required columns: sprint_summary"`. This column is part of the monday Dev sprint board setup and must be present for this tool to work.
</Callout>

***

# Programmatic equivalent

Sprint summaries are stored as monday.com items. You can retrieve the raw item data using the [GraphQL API](https://developer.monday.com/api-reference/reference/items-page):

```graphql GraphQL
query {
  items(ids: [11545180130]) {
    id
    name
    column_values {
      id
      text
      value
    }
  }
}
```

The MCP tool interprets the `sprint_summary` column value and structures it into the sections described above. For raw column data, use the `items` query directly. See the [Items Page](https://developer.monday.com/api-reference/reference/items-page) reference for full documentation.
