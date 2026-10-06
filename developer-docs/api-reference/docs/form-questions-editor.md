---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Form Questions Editor (Platform MCP)

Creates, updates, or deletes a single question on a monday.com WorkForm, with support for 23 question types and conditional visibility rules using the Platform MCP.

Use this tool to manage the questions on a monday.com WorkForm. Each call performs a single `create`, `update`, or `delete` action on one question. You can add any of 23 question types — from short text and email to ratings, file uploads, and conditional logic. Use `get_form` before updating select questions to retrieve the existing option values; omitting an existing option from your update will permanently delete it.

The typical form workflow is:

1. **`create_form`** — Create the form and get a `formToken`
2. **`form_questions_editor`** ← You are here — Add, update, or delete questions
3. **`update_form`** — Configure the form's title, appearance, features, and accessibility
4. **`get_form`** — Inspect the current form state
5. **`create_form_submission`** — Submit a response using the question IDs returned here

**Important notes:**

* The question `type` cannot be changed after creation. Always include the existing type when updating a question.
* For `update` and `delete`, the `questionId` field is required.
* For `create`, the `question.title` is required.
* When updating `SingleSelect` or `MultiSelect` questions, always include all options you want to keep with their original `value` fields intact. Any option omitted from the `options` array will be deleted.

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
      <td>`string`</td>
      <td>Yes</td>
      <td>The operation to perform: <code>create</code>, <code>update</code>, or <code>delete</code>.</td>
    </tr>
    <tr>
      <td>formToken</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The unique token identifying the form.</td>
    </tr>
    <tr>
      <td>questionId</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>ID of the question to update or delete. Required for <code>update</code> and <code>delete</code>.</td>
    </tr>
    <tr>
      <td>question</td>
      <td>`object`</td>
      <td>Conditional</td>
      <td>The question definition. Required for <code>create</code>. For <code>update</code>, required with <code>type</code> always included. See sub-fields below.</td>
    </tr>
  </tbody>
</Table>

**`question` object fields:**

| Field                      | Type               | Required         | Description                                                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                     | `string`           | Yes              | Question type. Cannot be changed after creation. Supported types: `Boolean`, `ConnectedBoards`, `Country`, `DISPLAY_TEXT`, `Date`, `DateRange`, `Email`, `File`, `HOUR`, `Link`, `Location`, `LongText`, `MultiSelect`, `Name`, `Number`, `PAGE_BLOCK`, `People`, `Phone`, `Rating`, `ShortText`, `Signature`, `SingleSelect`, `Subitems`, `Updates`. |
| `title`                    | `string`           | For create       | The question text shown to respondents.                                                                                                                                                                                                                                                                                                               |
| `description`              | `string`           | No               | Help text shown beneath the question.                                                                                                                                                                                                                                                                                                                 |
| `visible`                  | `boolean`          | No               | Whether the question is shown to respondents. Defaults to `true`.                                                                                                                                                                                                                                                                                     |
| `required`                 | `boolean`          | No               | Whether the respondent must answer this question.                                                                                                                                                                                                                                                                                                     |
| `insert_after_question_id` | `string` or `null` | No               | ID to insert after. Omit to append. Set to `null` for first position.                                                                                                                                                                                                                                                                                 |
| `page_block_id`            | `string` or `null` | No               | Page block ID to group this question within. Set to `null` to remove from a page block.                                                                                                                                                                                                                                                               |
| `options`                  | `array`            | For select types | Options for `SingleSelect` and `MultiSelect` questions. Always include all options — omitting one deletes it. Each option has `label` (required), `value`, and `visible`.                                                                                                                                                                             |
| `settings`                 | `object`           | No               | Type-specific settings (e.g., `display` for select questions, `includeTime` for date, `prefill` for autofill).                                                                                                                                                                                                                                        |
| `show_if_rules`            | `object`           | No               | Conditional visibility rules. All operators must be `OR`.                                                                                                                                                                                                                                                                                             |

# Example

Add a required short-text question to a form:

```json
{
  "action": "create",
  "formToken": "your_form_token_here",
  "question": {
    "type": "ShortText",
    "title": "What is your favorite feature?",
    "required": true,
    "visible": true
  }
}
```

The tool returned `question_id: "short_text413vvqbb"`. Use this ID when calling `create_form_submission` to submit an answer for this question.

***

# Programmatic equivalent

monday.com WorkForms are managed through the monday.com interface or via the MCP. There is no direct GraphQL API equivalent for this operation.
