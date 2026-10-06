---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Form (Platform MCP)

Updates a monday.com WorkForm's settings, appearance, features, tags, or question order using a single action-based call using the Platform MCP.

Use this tool to modify an existing monday.com WorkForm. Each call performs a single named `action` on the form — for example, updating the title and description, changing the layout, activating or deactivating the form, setting a password, or reordering questions. Pass only the fields relevant to the action you are performing; all fields not included in your call are left unchanged (patch semantics).

The typical form workflow is:

1. **`create_form`** — Create the form and get a `formToken`
2. **`form_questions_editor`** — Add, update, or delete questions
3. **`update_form`** ← You are here — Configure the form's title, appearance, features, and accessibility
4. **`get_form`** — Inspect the updated form state
5. **`create_form_submission`** — Submit a response

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
      <td>formToken</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The unique token identifying the form.</td>
    </tr>
    <tr>
      <td>action</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The operation to perform. See the table below for all supported actions and their required fields.</td>
    </tr>
    <tr>
      <td>form</td>
      <td>`object`</td>
      <td>Conditional</td>
      <td>Form data to update. Required for <code>updateFormHeader</code>, <code>updateAppearance</code>, <code>updateAccessibility</code>, <code>updateFeatures</code>, and <code>updateQuestionOrder</code>. Patch semantics — only include the fields you want to change.</td>
    </tr>
    <tr>
      <td>formPassword</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for the <code>setFormPassword</code> action.</td>
    </tr>
    <tr>
      <td>tag</td>
      <td>`object`</td>
      <td>Conditional</td>
      <td>Required for <code>createTag</code>, <code>updateTag</code>, and <code>deleteTag</code>. For create: provide <code>name</code> and <code>value</code>. For update: provide <code>id</code> and new <code>value</code>. For delete: provide <code>id</code> only.</td>
    </tr>
  </tbody>
</Table>

**Supported actions:**

| Action                | Required fields                  | Description                                                                     |
| --------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `activate`            | —                                | Makes the form publicly accessible.                                             |
| `deactivate`          | —                                | Stops the form from accepting new responses.                                    |
| `updateFormHeader`    | `form.title`, `form.description` | Updates the form's title and description text.                                  |
| `updateAppearance`    | `form.appearance`                | Sets background, layout, font, colors, and branding.                            |
| `updateAccessibility` | `form.accessibility`             | Sets the form language and logo alt text.                                       |
| `updateFeatures`      | `form.features`                  | Configures submission behavior, password, response limit, close date, and more. |
| `updateQuestionOrder` | `form.questions`                 | Reorders questions. Must include all existing question IDs.                     |
| `setFormPassword`     | `formPassword`                   | Enables password protection and sets the password.                              |
| `shortenFormUrl`      | —                                | Generates a shortened `wkf.ms` URL for the form.                                |
| `createTag`           | `tag.name`, `tag.value`          | Adds a routing tag to the form.                                                 |
| `updateTag`           | `tag.id`, `tag.value`            | Updates an existing tag's value.                                                |
| `deleteTag`           | `tag.id`                         | Removes a tag from the form.                                                    |

# Example

Update the title and description of a form:

```json
{
  "formToken": "your_form_token_here",
  "action": "updateFormHeader",
  "form": {
    "title": "MCP Docs Test Form",
    "description": "A test form created to demonstrate the monday.com MCP tools"
  }
}
```

The tool confirmed the action `updateFormHeader` succeeded and returned the updated `title` and `description` values.

***

# Programmatic equivalent

monday.com WorkForms are managed through the monday.com interface or via the MCP. There is no direct GraphQL API equivalent for this operation.
