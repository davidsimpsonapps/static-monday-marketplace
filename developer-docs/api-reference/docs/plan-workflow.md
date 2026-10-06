---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Plan Workflow (Platform MCP)

Plans one or more monday.com workflows for a described process using an AI agent, returning a structured implementation plan, via the Platform MCP.

Use this tool to plan one or more monday.com workflows for a described process. An AI agent analyzes your prompt, decides how many workflows are needed, identifies the required boards and columns, selects the correct trigger and action blocks, and returns a structured implementation plan with Mermaid diagrams and build notes.

This is a read-only planning step. Use it **before** [create\_workflow](https://developer.monday.com/api-reference/docs/create-workflow) to understand how to break a complex process into individual workflows and which resources to create first.

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
      <td>prompt</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Natural-language description of the full end-to-end process to plan (e.g. "When a deal is marked Won, create a task in the onboarding board and notify the account manager"). Maximum 2000 characters.</td>
    </tr>
  </tbody>
</Table>

# Example

Plan the workflows for an end-to-end process:

```json
{
  "prompt": "When a deal is marked Won, create a task in the onboarding board and notify the account manager."
}
```

The tool returns a `result` containing a structured markdown plan: workflow breakdowns, block IDs, resource definitions, and a list of assumptions and gaps.

***

# Programmatic equivalent

This tool calls the monday.com workflow-planner agent service on the dev (preview) API. There is no stable public GraphQL equivalent — it is a planning aid, not a mutation.
