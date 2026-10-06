---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Updates (Platform MCP)

Retrieves updates (comments and posts) from a monday.com item or board, with optional filtering by date range, replies, and file attachments using the Platform MCP.

Use this tool to read the update history of an item or board. For item queries, the response includes each update's text, creator, and timestamps. For board queries, only board-level discussion is returned by default — set `includeItemUpdates` to `true` to also include updates posted on individual items within the board.

Date range filtering (`fromDate` / `toDate`) is only supported for `Board` queries and both parameters must be used together. Results are paginated; use `page` and `limit` to navigate through large update histories.

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
      <td>objectId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The ID of the item or board to retrieve updates from.</td>
    </tr>
    <tr>
      <td>objectType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of object: `"Item"` or `"Board"`.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of updates to return per page. Default: `25`. Maximum: `100`.</td>
    </tr>
    <tr>
      <td>page</td>
      <td>`number`</td>
      <td>No</td>
      <td>Page number for pagination. Default: `1`.</td>
    </tr>
    <tr>
      <td>includeReplies</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Set to `true` to include threaded replies on each update. Default: `false`.</td>
    </tr>
    <tr>
      <td>includeAssets</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Set to `true` to include file attachments in the response. Default: `false`.</td>
    </tr>
    <tr>
      <td>fromDate</td>
      <td>`string`</td>
      <td>No</td>
      <td>Start of date range filter in ISO 8601 format (e.g. `"2025-01-01"` or `"2025-01-01T00:00:00Z"`). **Board queries only.** Must be used together with `toDate`.</td>
    </tr>
    <tr>
      <td>toDate</td>
      <td>`string`</td>
      <td>No</td>
      <td>End of date range filter in ISO 8601 format. **Board queries only.** Must be used together with `fromDate`.</td>
    </tr>
    <tr>
      <td>includeItemUpdates</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>When `objectType` is `"Board"`, set to `true` to include updates on individual items. Default: `false` (board-level discussion only).</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch updates on item `11971936030` including replies:

```json
{
  "objectId": "11971936030",
  "objectType": "Item",
  "includeReplies": true
}
```

The tool returned 1 update (ID `5179486006`) with text `"Testing the MCP create_update tool for documentation purposes."`, creator `Daniel Hai`, and an empty replies array. The pagination response showed `page: 1`, `limit: 25`, `count: 1`.

**Fetch all updates on a board within a date range:**

```json
{
  "objectId": "18412502536",
  "objectType": "Board",
  "fromDate": "2026-01-01",
  "toDate": "2026-05-10",
  "includeItemUpdates": true
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/updates#get-updates) to achieve the same result:

```graphql GraphQL
query {
  items(ids: [11971936030]) {
    updates(limit: 25, page: 1) {
      id
      body
      text_body
      created_at
      updated_at
      creator {
        id
        name
      }
      replies {
        id
        body
        creator {
          id
          name
        }
      }
    }
  }
}
```

For full documentation, see [Updates](https://developer.monday.com/api-reference/reference/updates#get-updates).
