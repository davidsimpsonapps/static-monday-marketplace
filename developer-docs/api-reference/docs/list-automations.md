---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# List Automations (Platform MCP)

Lists all automations on a specific monday.com board, including their IDs, titles, active state, and configuration, using the Platform MCP.

Use this tool to list all automations on a specific monday.com board, including their IDs, titles, active state, and configuration. When a user refers to an automation by name, call this tool first to resolve its ID before using [manage\_automations](https://developer.monday.com/api-reference/docs/manage-automations).

<Callout icon="📘" theme="info">
**Automations vs. workflows.** Automations are per-board trigger/action rules ("when X happens, do Y" on a single board). Workflows are standalone, workspace-level objects — see [create_workflow](https://developer.monday.com/api-reference/docs/create-workflow). They are different products.
</Callout>

> 🚧 Some legacy automations may not appear in the results. Mention this if a user asks about a missing automation.

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
      <td>The numeric board ID as a string.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of automations to return (1–100). Default: 100.</td>
    </tr>
    <tr>
      <td>cursor</td>
      <td>`string`</td>
      <td>No</td>
      <td>Pagination cursor from a previous response. Pass it to retrieve the next page of automations.</td>
    </tr>
  </tbody>
</Table>

# Example

List the automations on a board:

```json
{
  "boardId": "1234567890",
  "limit": 50
}
```

The tool returns the matching automations (with `id`, `title`, `is_active`, and configuration) plus a `pagination` object containing `nextCursor` and `hasMore`.

***

# Programmatic equivalent

This tool queries `board_automations` on the monday.com API. Automations are primarily managed through the monday.com interface or via the MCP.
