---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Workflow (Platform MCP)

Creates a new empty workflow in a monday.com workspace using the Platform MCP, returning the workflow object ID and draft ID.

Use this tool to create a new empty workflow in a monday.com workspace. Workflows are cross-board, workspace-level objects — distinct from automations, which are per-board trigger/action rules (use [create\_automation](https://developer.monday.com/api-reference/docs/create-automation) for those). You only need a `workspaceId` to get started; all other fields are optional.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. Workflows start as **drafts** and must be published with [publish_workflow](https://developer.monday.com/api-reference/docs/publish-workflow) before they run.
</Callout>

The typical workflow-building flow is:

1. **[plan\_workflow](https://developer.monday.com/api-reference/docs/plan-workflow)** *(optional)* — Break a complex process into workflows and resources.
2. **`create_workflow`** ← You are here — Create an empty workflow and get its `workflowObjectId` and `workflowDraftId`.
3. **[update\_workflow](https://developer.monday.com/api-reference/docs/update-workflow)** — Add and modify steps on the draft.
4. **[publish\_workflow](https://developer.monday.com/api-reference/docs/publish-workflow)** — Promote the draft to the live version.

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
      <td>workspaceId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the workspace to create the workflow in.</td>
    </tr>
    <tr>
      <td>title</td>
      <td>`string`</td>
      <td>No</td>
      <td>Workflow title. Defaults to "New Workflow".</td>
    </tr>
    <tr>
      <td>privacyKind</td>
      <td>`enum`</td>
      <td>No</td>
      <td>Visibility: <code>PUBLIC</code> (default), <code>PRIVATE</code>, or <code>SHAREABLE</code> (accessible to guests outside the account).</td>
    </tr>
    <tr>
      <td>description</td>
      <td>`string`</td>
      <td>No</td>
      <td>Optional workflow description.</td>
    </tr>
    <tr>
      <td>folderId</td>
      <td>`string`</td>
      <td>No</td>
      <td>Optional folder ID to place the workflow in.</td>
    </tr>
    <tr>
      <td>ownerIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Optional list of user IDs to set as workflow owners.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a workflow in a workspace:

```json
{
  "workspaceId": "4567890",
  "title": "Deal Onboarding",
  "privacyKind": "PUBLIC"
}
```

The tool returns `workflowObjectId` (stable across publishes) and `workflowDraftId` (the editable draft version). Pass both to [update\_workflow](https://developer.monday.com/api-reference/docs/update-workflow) and [publish\_workflow](https://developer.monday.com/api-reference/docs/publish-workflow).

***

# Programmatic equivalent

This tool maps to the `create_workflow` mutation on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
