---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Column (Platform MCP)

Adds a new column of a specified type to a monday.com board, with an optional title, description, and type-specific settings using the Platform MCP.

Use this tool to add a new column to an existing board. You must specify the column type (e.g. `status`, `date`, `numbers`, `people`) and a title. For column types that require configuration—such as `status` (label definitions) or `dropdown` (option lists)—provide a JSON string in `columnSettings`.

<Callout icon="🚧" theme="warn">
**Best practice:** Before passing `columnSettings`, call `get_column_type_info` with `fetchMode: "schema"` for the target column type. This returns the exact JSON schema for that type's settings so you can construct a valid configuration.
</Callout>

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
      <td>boardId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the board to add the column to.</td>
    </tr>
    <tr>
      <td>columnType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of column to create. Supported types include: `auto_number`, `board_relation`, `checkbox`, `date`, `dependency`, `dropdown`, `email`, `file`, `formula`, `hour`, `link`, `location`, `long_text`, `numbers`, `people`, `phone`, `rating`, `status`, `tags`, `team`, `text`, `time_tracking`, `timeline`, `vote`, `week`, `world_clock`, and others.</td>
    </tr>
    <tr>
      <td>columnTitle</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display title for the new column.</td>
    </tr>
    <tr>
      <td>columnDescription</td>
      <td>`string`</td>
      <td>No</td>
      <td>An optional description shown in the column header tooltip.</td>
    </tr>
    <tr>
      <td>columnSettings</td>
      <td>`string`</td>
      <td>No</td>
      <td>Column-specific configuration as a JSON string. Use `get_column_type_info` with `fetchMode: "schema"` to get the correct structure for a given type.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a Status column on board `18412502536`:

```json
{
  "boardId": 18412502536,
  "columnType": "status",
  "columnTitle": "Status"
}
```

The tool returned the new column ID (`color_mm37gbqg`) and title (`Status`).

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/columns) to achieve the same result:

```graphql GraphQL
mutation {
  create_column(
    board_id: 18412502536
    title: "Status"
    column_type: status
  ) {
    id
    title
    type
  }
}
```

For full documentation, see [Columns](https://developer.monday.com/api-reference/reference/columns).
