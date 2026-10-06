---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Show Assign (Platform MCP UI)

Renders an interactive smart assignment interface in the chat, letting users review and confirm task assignments based on item and person details using the Platform MCP.

<Callout icon="🚧" theme="warn">This is an internal UI component. It is called automatically by the Platform MCP server — do not call it directly.</Callout>

`show-assign` renders an interactive assignment interface in the chat, displaying a list of items alongside their suggested assignees. The MCP server invokes this tool when a user asks to assign tasks, review assignments, or use an interactive assignment view. Assignment suggestions are based on task details (such as name and context) and person details (such as job title and availability).

**Before calling `show-assign`**, the MCP server typically calls `list_users_and_teams` to retrieve real user IDs and names. The `user.id` and `user.name` fields must contain valid, non-empty values from actual users in the system — placeholder or made-up values are not permitted.

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
      <td>title</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The board or context title displayed at the top of the assignment interface.</td>
    </tr>
    <tr>
      <td>assignments</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Array of item-to-user assignment objects. Each entry requires <code>itemId</code>, <code>itemName</code>, and a <code>user</code> object.</td>
    </tr>
    <tr>
      <td>assignments[].itemId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The monday.com item ID. Must be a non-empty string.</td>
    </tr>
    <tr>
      <td>assignments[].itemName</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display name of the item/task.</td>
    </tr>
    <tr>
      <td>assignments[].user.id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the user to assign. Must be a real user ID from the account.</td>
    </tr>
    <tr>
      <td>assignments[].user.name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The real name of the user to assign.</td>
    </tr>
    <tr>
      <td>assignments[].user.avatarUrl</td>
      <td>`string`</td>
      <td>No</td>
      <td>The user's avatar URL (<code>photo_tiny</code> or <code>photo_thumb</code> from the user object).</td>
    </tr>
    <tr>
      <td>assignments[].user.jobTitle</td>
      <td>`string`</td>
      <td>No</td>
      <td>The user's job title, used to support smart assignment suggestions.</td>
    </tr>
  </tbody>
</Table>

# Example

Render an assignment interface for a sprint board:

```json
{
  "title": "Q2 Sprint Board",
  "assignments": [
    {
      "itemId": "987654321",
      "itemName": "Design new onboarding flow",
      "user": {
        "id": "12345678",
        "name": "Sarah Chen",
        "avatarUrl": "https://example.com/avatars/sarah.jpg",
        "jobTitle": "Product Designer"
      }
    },
    {
      "itemId": "987654322",
      "itemName": "Fix login bug on mobile",
      "user": {
        "id": "23456789",
        "name": "Alex Rivera",
        "jobTitle": "Frontend Engineer"
      }
    }
  ]
}
```

This displays an interactive panel listing each task alongside its suggested assignee, showing the user's name, avatar, and job title where available. Users can review and confirm assignments directly in the interface.

***

# Programmatic equivalent

There is no direct API equivalent for rendering the assignment interface — this component is specific to the MCP chat interface. To assign a user to an item programmatically, use the `change_column_value` mutation targeting the people column:

```graphql
mutation {
  change_column_value(
    board_id: 12406666,
    item_id: 987654321,
    column_id: "person",
    value: "{\"personsAndTeams\":[{\"id\":12345678,\"kind\":\"person\"}]}"
  ) {
    id
  }
}
```

For more details, see the [People column reference](https://developer.monday.com/api-reference/reference) in the monday.com API docs.
