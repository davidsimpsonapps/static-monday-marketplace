---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Form Submission (Platform MCP)

Submits a completed response to a monday.com WorkForm, creating a new item on the form's backing board with the provided answers using the Platform MCP.

Use this tool to submit a response to a monday.com WorkForm. Each submission creates a new item on the form's backing board, with column values populated from the answers you provide. You can submit using a bare form token, a full WorkForm URL (`https://forms.monday.com/forms/{token}?r=use1`), or a shortened `wkf.ms` URL — shortened URLs are automatically resolved.

<Callout icon="🚧" theme="warn">
**Always call `get_form` before submitting.** You need the exact question IDs to map answers correctly. For `SingleSelect` and `MultiSelect` questions, you also need the option IDs returned by `get_form` — the display labels are not valid answer values. Additionally, inspect `showIfRules` on each question to determine which questions are conditionally shown based on prior answers, and only submit answers for questions that are visible.
</Callout>

**Gather all answers before calling this tool.** Do not call this tool once per question — collect all answers first and submit them in a single call as an array.

The typical form workflow is:

1. **`create_form`** — Create the form and get a `formToken`
2. **`form_questions_editor`** — Add, update, or delete questions
3. **`update_form`** — Configure the form's title, appearance, and features
4. **`get_form`** — Retrieve question IDs, types, options, and conditional rules
5. **`create_form_submission`** ← You are here — Submit answers and receive a `submission_id`

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
      <td>form_token</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The form token, a full WorkForm URL, or a shortened <code>wkf.ms</code> URL. Shortened URLs are automatically resolved.</td>
    </tr>
    <tr>
      <td>answers</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Array of answer objects. Each object must include <code>question_id</code> and exactly one answer field matching the question type. See answer type fields below.</td>
    </tr>
    <tr>
      <td>form_timezone_offset</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The submitter's timezone offset in minutes (e.g., <code>-120</code> for UTC−2, <code>0</code> for UTC, <code>120</code> for UTC+2).</td>
    </tr>
    <tr>
      <td>password</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required only if the form has password protection enabled (check <code>features.password.enabled</code> from <code>get_form</code>).</td>
    </tr>
    <tr>
      <td>tags</td>
      <td>`array`</td>
      <td>No</td>
      <td>Routing tags to attach to the submission. Each tag maps a <code>column_id</code> to a <code>value</code>.</td>
    </tr>
  </tbody>
</Table>

**Answer field reference** (set exactly one per answer object):

| Field              | Type      | Used for                                                                                             |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------- |
| `name`             | `string`  | `Name` questions                                                                                     |
| `email`            | `string`  | `Email` questions                                                                                    |
| `short_text`       | `string`  | `ShortText` questions                                                                                |
| `long_text`        | `string`  | `LongText` questions                                                                                 |
| `link`             | `string`  | `Link` questions                                                                                     |
| `updates`          | `string`  | `Updates` questions                                                                                  |
| `boolean`          | `boolean` | `Boolean` questions                                                                                  |
| `number`           | `number`  | `Number` questions                                                                                   |
| `rating`           | `number`  | `Rating` questions — must be ≥ 1 and within the question's configured limit                          |
| `single_select`    | `string`  | `SingleSelect` questions — the selected option ID (not label)                                        |
| `multi_select`     | `array`   | `MultiSelect` questions — list of selected option IDs                                                |
| `people`           | `array`   | `People` questions — list of user IDs (use `list_users_and_teams`)                                   |
| `connected_boards` | `array`   | `ConnectedBoards` questions — list of connected item IDs                                             |
| `phone`            | `object`  | `Phone` questions — `{ phone, country_short_name }`                                                  |
| `country`          | `object`  | `Country` questions — `{ country_name, country_code }`                                               |
| `date`             | `object`  | `Date` questions — `{ date: "YYYY-MM-DD", zone_diff? }`                                              |
| `date_range`       | `object`  | `DateRange` questions — `{ from: "YYYY-MM-DD", to: "YYYY-MM-DD" }`                                   |
| `location`         | `object`  | `Location` questions — full structured address with `lat`, `lng`, `place_id`, and address components |
| `file`             | `array`   | `File` questions — files must be uploaded first to get a file ID                                     |
| `signature`        | `object`  | `Signature` questions — file must be uploaded first                                                  |

# Example

Submit a response to the test form with a name answer and a short text answer:

```json
{
  "form_token": "your_form_token_here",
  "form_timezone_offset": 0,
  "answers": [
    {
      "question_id": "name",
      "name": "API Tester"
    },
    {
      "question_id": "short_text413vvqbb",
      "short_text": "Automations and integrations"
    }
  ]
}
```

The tool returned `submission_id: "4b4cb753-b3bd-4184-a7b6-7c9b949d3754"`, confirming the submission was recorded. A new item now appears on the form's backing board with the provided values.

***

# Programmatic equivalent

monday.com WorkForms are managed through the monday.com interface or via the MCP. There is no direct GraphQL API equivalent for this operation.
