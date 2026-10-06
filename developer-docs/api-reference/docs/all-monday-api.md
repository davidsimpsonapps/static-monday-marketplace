---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Execute API Query (Platform MCP)

Executes any monday.com GraphQL query or mutation dynamically. The most flexible tool in the Platform MCP, giving direct access to the full monday.com API surface.

`all_monday_api` is the most powerful tool in the Platform MCP server. It executes any raw GraphQL query or mutation against the monday.com API, giving you access to every operation the platform supports. Use it when no other specialized MCP tool covers your use case, or when you need fine-grained control over which fields are returned.

**Before calling this tool**, use `get_graphql_schema` to discover available queries and mutations, and `get_type_details` to understand the shape of the types you need. Only request the fields you actually need — over-fetching increases complexity costs and slows responses.

<Callout icon="🚧" theme="warn">Crafting effective GraphQL requires familiarity with the monday.com schema. Use `get_graphql_schema` and `get_type_details` first to validate your query structure before executing it.</Callout>

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
      <td>query</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The full GraphQL query or mutation string to execute.</td>
    </tr>
    <tr>
      <td>variables</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>A JSON string containing the variables for the GraphQL operation. Pass <code>"{}"</code> if the query uses no variables.</td>
    </tr>
  </tbody>
</Table>

# Example

Query the first 3 boards in the account to retrieve their IDs and names:

```json
{
  "query": "query { boards(limit: 3) { id name } }",
  "variables": "{}"
}
```

This returns a list of boards like:

```json
{
  "boards": [
    { "id": "18412502571", "name": "MCP Docs Form Responses" },
    { "id": "18412502554", "name": "Subitems of Tickets" },
    { "id": "18412502553", "name": "Tickets" }
  ]
}
```

For a mutation with variables — for example, creating an item — pass variable values as a serialized JSON string:

```json
{
  "query": "mutation ($boardId: ID!, $groupId: String!, $name: String!) { create_item(board_id: $boardId, group_id: $groupId, item_name: $name) { id name } }",
  "variables": "{\"boardId\": \"12345678\", \"groupId\": \"topics\", \"name\": \"New task\"}"
}
```

***

# Programmatic equivalent

`all_monday_api` is a direct proxy to the monday.com GraphQL API. You can run the same queries and mutations by sending a `POST` request to `https://api.monday.com/v2` with your API token and the query in the request body.

For the full list of available queries, mutations, and types, see the [monday.com API reference](https://developer.monday.com/api-reference/reference).
