---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get GraphQL Schema (Platform MCP)

Fetches the monday.com GraphQL schema structure, including all available query fields, mutation fields, and a list of every type in the schema using the Platform MCP.

`get_graphql_schema` introspects the monday.com GraphQL schema and returns its full structure: all query fields, all mutation fields, and a complete list of GraphQL types with their kinds. Use this tool before calling `all_monday_api` to understand which operations are available and what types they return.

You can optionally filter results to show only read operations (`query` fields) or only write operations (`mutation` fields). This makes it easier to find a specific operation without sifting through hundreds of entries.

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
      <td>operationType</td>
      <td>`string`</td>
      <td>No</td>
      <td>Filter results by operation type. Use <code>"read"</code> to return only query fields, or <code>"write"</code> to return only mutation fields. Omit to return both.</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch the full schema — all queries, mutations, and types:

```json
{}
```

Fetch only mutation fields to find write operations:

```json
{
  "operationType": "write"
}
```

When called without parameters, the tool returns an object with three keys: `query_fields` (array of query field names and descriptions), `mutation_fields` (array of mutation field names and descriptions), and `types` (full list of all GraphQL types in the schema). For example, among the query fields you'll find entries like:

* `boards` — Get a collection of boards
* `items` — Get a collection of items
* `users` — Get users
* `workspaces` — Get a collection of workspaces

And among the mutation fields:

* `create_board` — Create a new board
* `create_item` — Create a new item
* `change_multiple_column_values` — Changes the column values of a specific item

***

# Programmatic equivalent

You can retrieve the same information by running a GraphQL introspection query directly against the monday.com API:

```graphql
{
  __schema {
    queryType { name }
    mutationType { name }
    types {
      name
      kind
    }
  }
}
```

For human-readable documentation of every query and mutation, see the [monday.com API reference](https://developer.monday.com/api-reference/reference).
