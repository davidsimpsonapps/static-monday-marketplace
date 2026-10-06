---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Type Details (Platform MCP)

Returns the full field list and type information for a specific GraphQL type in the monday.com API schema using the Platform MCP.

`get_type_details` looks up a specific GraphQL type by name and returns its complete definition: every field, its return type, nullability, and the arguments each field accepts. Use this tool after `get_graphql_schema` to understand the exact shape of a type before constructing a query with `all_monday_api`.

This is especially useful for complex object types like `Board`, `Item`, or `Column`, which have many fields and nested arguments that are impractical to memorize.

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
      <td>typeName</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The exact name of the GraphQL type to inspect. Type names are case-sensitive (e.g., <code>"Board"</code>, <code>"Item"</code>, <code>"Column"</code>).</td>
    </tr>
  </tbody>
</Table>

# Example

Get all fields on the `Board` type:

```json
{
  "typeName": "Board"
}
```

The response includes the type's kind (`OBJECT`), description, and a `fields` array. Each field entry includes its name, description, return type (with nullability and nesting), and any arguments it accepts. For example, the `Board` type includes fields like:

| Field        | Type             | Notes                                                        |
| ------------ | ---------------- | ------------------------------------------------------------ |
| `id`         | `ID!`            | Unique board identifier                                      |
| `name`       | `String!`        | Board name                                                   |
| `columns`    | `[Column]`       | Accepts `ids`, `types`, and `capabilities` filter args       |
| `items_page` | `ItemsResponse!` | Accepts `cursor`, `limit`, and `query_params` for pagination |
| `groups`     | `[Group]`        | Accepts optional `ids` filter                                |
| `state`      | `State!`         | Active, archived, or deleted                                 |
| `board_kind` | `BoardKind!`     | Public, private, or share                                    |
| `workspace`  | `Workspace`      | Null for the main workspace                                  |

You can use any type name found in the `types` array from `get_graphql_schema` — for example, `"Item"`, `"Column"`, `"User"`, `"Group"`, `"Workspace"`, `"Update"`, or input types like `"ItemsQuery"`.

***

# Programmatic equivalent

You can retrieve the same information with a GraphQL type introspection query:

```graphql
{
  __type(name: "Board") {
    name
    kind
    description
    fields {
      name
      description
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
      args {
        name
        type {
          name
          kind
        }
      }
    }
  }
}
```

For human-readable field documentation, see the [monday.com API reference](https://developer.monday.com/api-reference/reference).
