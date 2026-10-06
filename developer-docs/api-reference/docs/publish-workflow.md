---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Publish Workflow (Platform MCP)

Publishes a workflow draft, promoting it to the live version so it starts running, using the Platform MCP.

Use this tool to publish a workflow draft, promoting it to the live version. Call it after [create\_workflow](https://developer.monday.com/api-reference/docs/create-workflow) (and optionally [update\_workflow](https://developer.monday.com/api-reference/docs/update-workflow)) to make the workflow active.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. Before publishing, the workflow is validated. If a step is missing or misconfigured, publish fails with a `WORKFLOW_VALIDATION_FAILED` error that includes structured details — which step failed, the issue type, and which inputs are missing. Use those details to guide the user on what to fix before retrying.
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
      <td>`string`</td>
      <td>Yes</td>
      <td>The workflow object ID returned by <a href="doc:create-workflow">create_workflow</a>. Identifies the workflow across all drafts and live versions.</td>
    </tr>
    <tr>
      <td>workflowDraftId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The draft version ID to publish. Both <code>workflowObjectId</code> and <code>workflowDraftId</code> are required — together they identify the exact draft to publish.</td>
    </tr>
    <tr>
      <td>shouldActivate</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to activate the workflow immediately after publishing so it starts running. Defaults to <code>true</code>. Pass <code>false</code> to publish without activating.</td>
    </tr>
  </tbody>
</Table>

# Example

Publish a workflow draft and activate it:

```json
{
  "workflowObjectId": "12345",
  "workflowDraftId": "67890",
  "shouldActivate": true
}
```

The tool returns `workflowObjectId` (unchanged) and `workflowLiveId` (the new live version ID). The live ID changes on every publish, so do not cache it.

***

# Programmatic equivalent

This tool maps to the `publish_workflow` mutation on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
