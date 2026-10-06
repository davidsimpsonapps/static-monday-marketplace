---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Automation (Platform MCP)

Creates an automation on a monday.com board from a structured natural-language description using the Platform MCP.

Use this tool to create an automation on a monday.com board from a structured natural-language description. You don't need to know the exact automation blocks or their fields — describe the user's intent clearly and the tool translates it into supported triggers, conditions, and actions.

Use this tool only when you know the `boardId`, the intended trigger, at least one intended action, and any details relevant to the trigger, conditions, or actions. If a required detail is missing, ask the user before calling the tool.

<Callout icon="📘" theme="info">
If the tool returns `status: "needs_clarification"`, present the unresolved fields to the user, gather answers, then call the tool again.
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
      <td>userPrompt</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Structured description of the automation to create (see the format below).</td>
    </tr>
    <tr>
      <td>boardId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The numeric board ID as a string.</td>
    </tr>
  </tbody>
</Table>

**Describe the automation in this format:**

```
Trigger:
  When <the event that should start the automation>
  Details:
    <relevant detail>: <value>

Conditions:
  - Only if <condition that should be true>

Actions:
  - <action the automation should perform>:
      <relevant detail>: <value>
```

Rules: use one trigger; conditions are optional (multiple conditions mean AND); use one or more actions; no branching; use natural language, not block IDs. Actions may reference trigger context such as `{{item name}}`, `{{creator}}`, `{{status}}`, `{{group}}`, or `{{board}}`.

# Example

Create an automation that notifies someone and moves an item when a new item is created:

```json
{
  "boardId": "1234567890",
  "userPrompt": "Trigger:\n  When a new item is created\n\nActions:\n  - Send a notification:\n      Recipient: John Snow\n      Title: Important Update\n      Message: The item \"{{item name}}\" was created.\n  - Move the item to a group:\n      Group: Top group"
}
```

The tool returns the created automation, or a `needs_clarification` status with the fields it still needs.

***

# Programmatic equivalent

This tool calls the monday.com automation builder service. Automations are primarily managed through the monday.com interface or via the MCP — there is no direct public GraphQL equivalent.
