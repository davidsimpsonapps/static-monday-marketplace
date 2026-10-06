---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# List Workspaces (Platform MCP)

Returns a paginated list of all workspaces available to the authenticated user, including their IDs, names, and descriptions using the Platform MCP.

Use this tool to retrieve the workspaces accessible to the current user. This is typically the first step in any workspace-oriented workflow—you'll need the workspace ID to create folders, retrieve workspace contents, or move objects. The tool supports pagination and optional text filtering.

**Note:** Results are limited to 100 workspaces per page. If your account has more than 100 workspaces, use the `page` parameter to paginate through the full list. The `searchTerm` filter only supports alphanumeric characters.

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
      <td>searchTerm</td>
      <td>`string`</td>
      <td>No</td>
      <td>Filters results to workspaces whose name matches the search term. **Only alphanumeric characters are supported.**</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of workspaces to return per page. Min: `1`, max: `100`, default: `100`. Use a lower value for smaller responses.</td>
    </tr>
    <tr>
      <td>page</td>
      <td>`number`</td>
      <td>No</td>
      <td>Page number to return. Default: `1`. Increment to paginate through large workspace lists.</td>
    </tr>
  </tbody>
</Table>

# Example

List the first 20 workspaces:

```json
{
  "limit": 20
}
```

The response includes each workspace's `id`, `name`, `description` (if set), and `url`. For example, workspace `12406666` returned:

```json
{
  "id": "12406666",
  "name": "MCP TEST WORKSPACE",
  "description": "Workspace for demonstrating MCP tools and agent capabilities",
  "url": "https://monday.monday.com/workspaces/12406666"
}
```

The response also includes a `next_page` field indicating the next page number when more results are available.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/workspaces#get-workspaces) to achieve the same result:

```graphql GraphQL
query {
  workspaces(limit: 20, page: 1) {
    id
    name
    description
    kind
    state
  }
}
```

For full documentation, see [Workspaces](https://developer.monday.com/api-reference/reference/workspaces#get-workspaces).
