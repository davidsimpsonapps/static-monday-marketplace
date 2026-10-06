---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Search (Platform MCP)

Searches across monday.com for boards, documents, or folders by keyword, with optional filtering by workspace using the Platform MCP.

Use this tool to find boards, documents, or folders in your monday.com account by keyword. You can scope the search to specific workspaces using `workspaceIds`. Results are paginated and capped at 20 per page.

This tool is scoped to three content types: `BOARD`, `DOCUMENTS`, and `FOLDERS`. For other lookups — users and teams, workspaces, items and groups — use the dedicated tools (`list_users_and_teams`, `list_workspaces`, `get_board_items_page`, `get_board_info`).

<Callout icon="🚧" theme="warn">
IDs returned by this tool are prefixed with the object type (e.g., `board-18394529013`, `doc-10069112255`, `folder-19028717`). **Strip the prefix before passing an ID to any other tool.** For example, pass `18394529013` — not `board-18394529013` — to `get_board_info`.
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
      <td>searchType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The type of objects to search. One of `BOARD`, `DOCUMENTS`, or `FOLDERS`.</td>
    </tr>
    <tr>
      <td>searchTerm</td>
      <td>`string`</td>
      <td>No</td>
      <td>The keyword to search for. Omit or pass an empty string to return all objects of the given type.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of results to return per page. Maximum and default is `20`.</td>
    </tr>
    <tr>
      <td>page</td>
      <td>`number`</td>
      <td>No</td>
      <td>Page number to return, starting at 1. Defaults to `1`.</td>
    </tr>
    <tr>
      <td>workspaceIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of workspace IDs to scope the search. Only pass this when you want to restrict results to specific workspaces.</td>
    </tr>
  </tbody>
</Table>

# Examples

## Search for boards by keyword

Find boards containing "test" in workspace `12406666`:

```json
{
  "searchType": "BOARD",
  "searchTerm": "test",
  "limit": 5,
  "workspaceIds": [12406666]
}
```

The tool returned 5 matching boards. Each result includes a prefixed `id` (e.g., `"board-18394529013"`) and a `title`. Strip the `board-` prefix to get `18394529013`, which you can pass directly to `get_board_info` or other tools.

## Search for documents by keyword

Find documents containing "MCP" in workspace `12406666`:

```json
{
  "searchType": "DOCUMENTS",
  "searchTerm": "MCP",
  "workspaceIds": [12406666]
}
```

Results include document IDs in `doc-<id>` format. Strip the `doc-` prefix before passing to `read_docs`.

## List all folders in a workspace

```json
{
  "searchType": "FOLDERS",
  "searchTerm": "",
  "workspaceIds": [12406666]
}
```

The tool returned folders with IDs like `"folder-19028717"`. Strip the `folder-` prefix before passing to tools that accept folder IDs.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/boards) to achieve the same result for board searches:

```graphql GraphQL
query {
  boards(
    workspace_ids: [12406666]
    limit: 5
  ) {
    id
    name
    url
  }
}
```

For full documentation, see [Boards](https://developer.monday.com/api-reference/reference/boards).
