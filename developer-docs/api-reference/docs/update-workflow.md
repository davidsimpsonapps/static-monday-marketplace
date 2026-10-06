---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Workflow (Platform MCP)

Updates an existing workflow draft using an AI agent that interprets a natural-language prompt and applies structural changes, via the Platform MCP.

Use this tool to update an existing workflow draft. An AI agent interprets your natural-language prompt and applies the structural changes — creating, updating, or deleting steps — then returns a summary of what it did. Call it after [create\_workflow](https://developer.monday.com/api-reference/docs/create-workflow), and call it repeatedly on the same draft to refine the workflow step by step.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. Changes apply to the **draft** — the workflow runs only after it is published with [publish_workflow](https://developer.monday.com/api-reference/docs/publish-workflow).
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
      <td>workflowObjectId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The workflow object ID returned by <a href="doc:create-workflow">create_workflow</a>. Identifies the workflow across all drafts and published versions; does not change across publishes.</td>
    </tr>
    <tr>
      <td>workflowDraftId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The draft version ID to update. Always read it from the latest <code>create_workflow</code>/<code>update_workflow</code> response — the agent may return a new draft ID.</td>
    </tr>
    <tr>
      <td>prompt</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Natural-language description of the changes to make (e.g. "Add a trigger that fires when an item is created on the Marketing board"). Maximum 2000 characters.</td>
    </tr>
  </tbody>
</Table>

# Example

Add a trigger step to an existing workflow draft:

```json
{
  "workflowObjectId": 12345,
  "workflowDraftId": 67890,
  "prompt": "Add a trigger that fires when an item is created on the Marketing board, then notify the item's owner."
}
```

The tool returns `workflowObjectId`, `workflowDraftId`, and a `result` describing the changes the agent made.

***

# Programmatic equivalent

This tool calls the monday.com workflow-builder agent service on the dev (preview) API. There is no stable public GraphQL equivalent yet.
