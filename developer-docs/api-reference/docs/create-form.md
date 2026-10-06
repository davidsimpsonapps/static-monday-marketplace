---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Form (Platform MCP)

Creates a new monday.com WorkForm and a backing board to store responses, returning a form token for subsequent form operations using the Platform MCP.

Use this tool to create a new monday.com WorkForm. When you create a form, the tool simultaneously creates a backing board in the specified workspace to store all form responses as items. The tool returns a `formToken` that you use with all subsequent form operations: `get_form`, `update_form`, `form_questions_editor`, and `create_form_submission`.

The typical form workflow is:

1. **`create_form`** — Create the form and get a `formToken`
2. **`form_questions_editor`** — Add, update, or delete questions
3. **`update_form`** — Configure the form's title, appearance, features, and accessibility
4. **`get_form`** — Retrieve the full form structure to inspect questions and settings
5. **`create_form_submission`** — Submit a response to the form

A newly created form includes a default `Name` question. The backing board is created with the name you provide via `destination_name`.

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
      <td>destination_workspace_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>ID of the workspace in which the form and its backing board will be created.</td>
    </tr>
    <tr>
      <td>destination_name</td>
      <td>`string`</td>
      <td>No</td>
      <td>Name of the backing board that stores form responses. If omitted, the board receives a default name.</td>
    </tr>
    <tr>
      <td>board_kind</td>
      <td>`string`</td>
      <td>No</td>
      <td>Visibility of the backing board. One of `private`, `public`, or `share`.</td>
    </tr>
    <tr>
      <td>destination_folder_id</td>
      <td>`string`</td>
      <td>No</td>
      <td>ID of an existing folder to place the backing board in.</td>
    </tr>
    <tr>
      <td>destination_folder_name</td>
      <td>`string`</td>
      <td>No</td>
      <td>Name of a new folder to create and place the backing board in.</td>
    </tr>
    <tr>
      <td>board_owner_ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>List of user IDs to set as owners of the backing board.</td>
    </tr>
    <tr>
      <td>board_owner_team_ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>List of team IDs to set as owners of the backing board.</td>
    </tr>
    <tr>
      <td>board_subscriber_ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>User IDs to notify on board activity.</td>
    </tr>
    <tr>
      <td>board_subscriber_teams_ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>Team IDs to notify on board activity.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a public form in workspace `12406666` with a named backing board:

```json
{
  "destination_workspace_id": "12406666",
  "destination_name": "MCP Docs Form Responses",
  "board_kind": "public"
}
```

The tool returned `form_token: "your_form_token_here"` and `board_id: "18412502571"`. The form is immediately active and accessible. Use the `form_token` in all subsequent operations on this form.

***

# Programmatic equivalent

monday.com WorkForms are managed through the monday.com interface or via the MCP. There is no direct GraphQL API equivalent for this operation.
