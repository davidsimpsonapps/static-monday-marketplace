---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Update (Platform MCP)

Posts a new update (comment) on a monday.com item, with support for mentions and threaded replies using the Platform MCP.

Use this tool to add a comment, note, or discussion post to a monday.com item. Updates appear in the item's update section and are visible to all collaborators. You can mention users, teams, or boards inline by passing a `mentionsList`, and you can reply to an existing update by supplying the `parentId` of the update you want to thread under.

**Do not use `@` symbols in the `body` field to mention people** — use the `mentionsList` parameter instead. The `body` field supports HTML tags for formatting (e.g. `<b>`, `<i>`, `<br>`); do not use Markdown.

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
      <td>itemId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the item to post the update on.</td>
    </tr>
    <tr>
      <td>body</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The update text. Use HTML tags for formatting. Do not use `@` mentions here — use `mentionsList` instead.</td>
    </tr>
    <tr>
      <td>mentionsList</td>
      <td>`string`</td>
      <td>No</td>
      <td>JSON array of mention objects. Each object requires an `id` and a `type`. Valid types: `User`, `Team`, `Board`, `Project`. Example: `[{"id": "48202303", "type": "User"}]`.</td>
    </tr>
    <tr>
      <td>parentId</td>
      <td>`number`</td>
      <td>No</td>
      <td>The ID of an existing update to reply to. Omit this parameter to create a top-level update.</td>
    </tr>
  </tbody>
</Table>

# Example

Post a comment on item `11971936030`:

```json
{
  "itemId": 11971936030,
  "body": "Testing the MCP <b>create_update</b> tool for documentation purposes."
}
```

The tool created update ID `5179486006` on item `11971936030` (`Design homepage mockup`) and returned the item URL.

**Reply to an existing update with a user mention:**

```json
{
  "itemId": 11971936030,
  "body": "Following up on this thread.",
  "mentionsList": "[{\"id\": \"48202303\", \"type\": \"User\"}]",
  "parentId": 5179486006
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/updates#create-an-update) to achieve the same result:

```graphql GraphQL
mutation {
  create_update(
    item_id: 11971936030
    body: "Testing the <b>create_update</b> mutation."
  ) {
    id
    body
    created_at
    creator {
      id
      name
    }
  }
}
```

For full documentation, see [Updates](https://developer.monday.com/api-reference/reference/updates#create-an-update).
