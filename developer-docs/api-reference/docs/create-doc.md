---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Doc (Platform MCP)

Creates a new monday.com document in a workspace or attached to a board item, then populates it with the provided markdown content using the Platform MCP.

Use this tool to create a new document in your monday.com account. Documents can be created in two locations: inside a workspace (standalone doc) or attached to a specific item on a board via a doc column. After creation, the markdown content you provide is automatically imported into the document as blocks.

You must specify the `location` parameter first, as it controls which other parameters are required. For workspace documents, provide `workspace_id`. For item-attached documents, provide `item_id`. Use `read_docs` to read the document after creation, or `update_doc` to modify it.

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
      <td>doc_name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display name of the new document.</td>
    </tr>
    <tr>
      <td>markdown</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Markdown content to import into the document as blocks on creation.</td>
    </tr>
    <tr>
      <td>location</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Where to create the document. One of `workspace` (standalone doc) or `item` (attached to a board item).</td>
    </tr>
    <tr>
      <td>workspace_id</td>
      <td>`number`</td>
      <td>Yes (if location=`workspace`)</td>
      <td>The ID of the workspace to create the document in. Use `list_workspaces` to discover workspace IDs.</td>
    </tr>
    <tr>
      <td>doc_kind</td>
      <td>`string`</td>
      <td>No</td>
      <td>Visibility of the document. One of `public`, `private`, or `share`. Defaults to `public`. Only used when location=`workspace`.</td>
    </tr>
    <tr>
      <td>folder_id</td>
      <td>`number`</td>
      <td>No</td>
      <td>ID of a folder to place the document inside. Only used when location=`workspace`. Use `search` with searchType `FOLDERS` to find folder IDs.</td>
    </tr>
    <tr>
      <td>item_id</td>
      <td>`number`</td>
      <td>Yes (if location=`item`)</td>
      <td>The ID of the board item to attach the document to. Only used when location=`item`.</td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`string`</td>
      <td>No</td>
      <td>ID of an existing doc column on the item's board. If omitted, a new doc column is created automatically. Only used when location=`item`.</td>
    </tr>
  </tbody>
</Table>

# Example

Create a public document in workspace `12406666` with some initial markdown content:

```json
{
  "doc_name": "MCP Tool Test Doc",
  "location": "workspace",
  "workspace_id": 12406666,
  "doc_kind": "public",
  "markdown": "# Hello from MCP\n\nThis document was created via the `create_doc` tool.\n\n- Item one\n- Item two\n- Item three"
}
```

The tool returned `doc_id: "41622523"`, `object_id: "18412502542"`, and a direct URL to the new document at `https://monday.monday.com/docs/18412502542`.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/docs#create-a-doc) to achieve the same result:

```graphql GraphQL
mutation {
  create_doc(
    location: {
      workspace: {
        workspace_id: 12406666
        kind: public
      }
    }
  ) {
    id
    object_id
    url
  }
}
```

For full documentation, see [Docs](https://developer.monday.com/api-reference/reference/docs#create-a-doc).
