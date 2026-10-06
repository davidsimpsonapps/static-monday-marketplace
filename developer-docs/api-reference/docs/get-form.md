---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Form (Platform MCP)

Retrieves the full structure of a monday.com WorkForm by its form token, including all questions, settings, appearance, and features using the Platform MCP.

Use this tool to retrieve the complete configuration of an existing monday.com WorkForm. The response includes all questions (with their IDs, types, options, and conditional logic), appearance settings, feature flags, accessibility settings, and tags. You need the form's `formToken` to call this tool.

You can extract a `formToken` from a form URL. Given a URL like `https://forms.monday.com/forms/abc123def456?r=use1`, the token is the alphanumeric string between `/forms/` and the `?` — in this case, `abc123def456`.

**Call this tool before calling `form_questions_editor` or `create_form_submission`** to inspect the current question IDs, question types, and available options. This is especially important when updating select questions — you must pass all existing options to avoid accidentally deleting them.

The typical form workflow is:

1. **`create_form`** — Create the form and get a `formToken`
2. **`form_questions_editor`** — Add, update, or delete questions
3. **`update_form`** — Configure the form's title, appearance, features, and accessibility
4. **`get_form`** ← You are here — Inspect the current form state before submitting
5. **`create_form_submission`** — Submit a response using the retrieved question IDs

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
      <td>The unique token identifying the form. Extract from the form URL: the alphanumeric string after <code>/forms/</code> and before <code>?</code>.</td>
    </tr>
  </tbody>
</Table>

# Example

Retrieve the form created in the `create_form` example:

```json
{
  "formToken": "your_form_token_here"
}
```

The response included the form's full structure: two questions (a `PAGE_BLOCK` and a `Name` question with ID `"name"`), feature flags (`reCaptchaChallenge: false`, `requireLogin: false`, etc.), appearance settings (layout `Center`, `LtR` direction), and an empty `tags` array. The form had `active: true` and `title: "New Form"` at the time of retrieval.

***

# Programmatic equivalent

monday.com WorkForms are managed through the monday.com interface or via the MCP. There is no direct GraphQL API equivalent for this operation.
