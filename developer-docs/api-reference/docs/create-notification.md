---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Notification (Platform MCP)

Sends a notification to a user via the monday.com bell icon, with an optional email, targeting an update/reply or an item/board using the Platform MCP.

Use this tool to send an in-app notification to any user in the account. Notifications appear in the recipient's bell icon (notification center) and may also trigger an email depending on the user's notification preferences. You must provide the recipient's user ID, a target object ID, the notification text, and a `target_type` that determines how monday.com links the notification.

Use `target_type: "Post"` when the notification relates to an update or reply (provide the update/reply ID as `target_id`). Use `target_type: "Project"` when the notification relates to an item or board (provide the item or board ID as `target_id`). To notify yourself, first call `get_user_context` or `list_users_and_teams` with `getMe: true` to retrieve your user ID.

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
      <td>user_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the user to send the notification to.</td>
    </tr>
    <tr>
      <td>target_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the target object. Provide an update or reply ID when `target_type` is `"Post"`, or an item or board ID when `target_type` is `"Project"`.</td>
    </tr>
    <tr>
      <td>text</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The notification message text.</td>
    </tr>
    <tr>
      <td>target_type</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The context for the notification link. `"Post"` links to an update or reply; `"Project"` links to an item or board.</td>
    </tr>
  </tbody>
</Table>

# Example

Send a notification to user `48202303` linking to item `11971936030`:

```json
{
  "user_id": "48202303",
  "target_id": "11971936030",
  "text": "Testing the MCP create_notification tool for documentation purposes.",
  "target_type": "Project"
}
```

The tool confirmed the notification was sent to user `48202303` with the specified text.

**Notify a user about a specific update:**

```json
{
  "user_id": "66347492",
  "target_id": "5179486006",
  "text": "You were mentioned in an update on the Design homepage mockup item.",
  "target_type": "Post"
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/notifications#create-a-notification) to achieve the same result:

```graphql GraphQL
mutation {
  create_notification(
    user_id: 48202303
    target_id: 11971936030
    text: "Testing the create_notification mutation."
    target_type: Project
  ) {
    text
  }
}
```

For full documentation, see [Notifications](https://developer.monday.com/api-reference/reference/notifications#create-a-notification).
