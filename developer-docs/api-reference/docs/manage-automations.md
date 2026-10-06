---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Manage Automations (Platform MCP)

Activates, deactivates, or deletes an existing monday.com automation using the Platform MCP.

Use this tool to activate, deactivate, or delete an existing monday.com automation. It requires an automation ID — when a user refers to an automation by name, always call [list\_automations](https://developer.monday.com/api-reference/docs/list-automations) first to resolve the ID. Never guess or infer IDs.

<Callout icon="🚧" theme="warn">
The `delete` action is **permanent and irreversible**. When intent is ambiguous ("stop", "turn off", "pause"), prefer `deactivate` over `delete`.
</Callout>

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
      <td>action</td>
      <td>`enum`</td>
      <td>Yes</td>
      <td>The operation to perform: <code>activate</code> (enable a paused automation), <code>deactivate</code> (pause without deleting), or <code>delete</code> (permanently remove — irreversible).</td>
    </tr>
    <tr>
      <td>workflowId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The automation ID to operate on. Obtain it from <a href="doc:list-automations">list_automations</a>.</td>
    </tr>
  </tbody>
</Table>

# Example

Deactivate an automation:

```json
{
  "action": "deactivate",
  "workflowId": "55512345"
}
```

The tool returns a confirmation message, the `workflowId`, and the resulting `isActive` state.

***

# Programmatic equivalent

This tool maps to the `activate_live_workflow`, `deactivate_live_workflow`, and `delete_live_workflow` mutations on the monday.com dev (preview) API schema. Automations are primarily managed through the monday.com interface or via the MCP.
