---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Read Docs (Platform MCP)

Retrieves monday.com documents with their full markdown content and block structure, or fetches the version history of a single document using the Platform MCP.

Use this tool to read documents from your monday.com account. The tool supports two modes controlled by the `mode` parameter: `content` (default) retrieves documents with their full markdown content and optionally their block structure and comments; `version_history` fetches the edit history of a single document as a list of restoring points.

You typically call `read_docs` in `content` mode before calling `update_doc`, so you can discover block IDs needed to target specific blocks. Set `include_blocks: true` to include block IDs, types, positions, and content in the response.

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
      <td>mode</td>
      <td>`string`</td>
      <td>No</td>
      <td>Operation mode. `content` (default) retrieves documents with markdown content. `version_history` retrieves the edit history of a single document.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>`string`</td>
      <td>Yes (content mode)</td>
      <td>Query type for content mode. One of `ids` (doc IDs), `object_ids` (object IDs from the URL), or `workspace_ids`. Required when mode is `content`.</td>
    </tr>
    <tr>
      <td>ids</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Array of ID values matching the selected `type`. In `version_history` mode, provide the single document `object_id` here (e.g., `["18412502542"]`).</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Number of documents per page (default: 25). Content mode only.</td>
    </tr>
    <tr>
      <td>page</td>
      <td>`number`</td>
      <td>No</td>
      <td>Page number to return, starting at 1. Content mode only.</td>
    </tr>
    <tr>
      <td>order_by</td>
      <td>`string`</td>
      <td>No</td>
      <td>Sort order for results. One of `created_at` or `used_at`. Content mode only.</td>
    </tr>
    <tr>
      <td>include_blocks</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, includes block IDs, types, positions, and content in the response. Required before calling `update_doc`. Defaults to `false`. Content mode only.</td>
    </tr>
    <tr>
      <td>blocks_limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of blocks to return per document (default: 25). Use with `blocks_page` to paginate long documents. Content mode only.</td>
    </tr>
    <tr>
      <td>blocks_page</td>
      <td>`number`</td>
      <td>No</td>
      <td>Page number for block pagination, starting at 1. Content mode only.</td>
    </tr>
    <tr>
      <td>include_comments</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, fetches all comments and replies on the document. Defaults to `false`. Content mode only.</td>
    </tr>
    <tr>
      <td>comments_limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of comments to fetch per document when `include_comments` is `true`. Defaults to 50. Content mode only.</td>
    </tr>
    <tr>
      <td>version_history_limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of restoring points to return. Version history mode only.</td>
    </tr>
    <tr>
      <td>since</td>
      <td>`string`</td>
      <td>No</td>
      <td>ISO 8601 date string to filter version history from (e.g., `"2026-03-15T00:00:00Z"`). Version history mode only.</td>
    </tr>
    <tr>
      <td>until</td>
      <td>`string`</td>
      <td>No</td>
      <td>ISO 8601 date string to filter version history until. Defaults to now. Version history mode only.</td>
    </tr>
    <tr>
      <td>include_diff</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, fetches content diffs between consecutive restoring points. May be slower. Version history mode only.</td>
    </tr>
  </tbody>
</Table>

# Examples

## List all docs in a workspace

Retrieve all documents in workspace `12406666`:

```json
{
  "mode": "content",
  "type": "workspace_ids",
  "ids": ["12406666"],
  "limit": 25
}
```

The tool returned 3 documents in the workspace, including their names, IDs, object IDs, creation dates, and full markdown content. The response also includes `has_more_pages: false` to indicate there are no further pages.

## Read a specific document with blocks

Fetch a single document by its `doc_id` and include all block metadata (required before calling `update_doc`):

```json
{
  "mode": "content",
  "type": "ids",
  "ids": ["41622523"],
  "include_blocks": true
}
```

The response includes a `blocks` array where each entry has an `id`, `type` (e.g., `"large title"`, `"normal text"`, `"bulleted list"`), `parent_block_id`, `position`, and `content` in delta format.

**Tip:** If querying by `ids` returns no results, the tool automatically retries using `object_ids`. You can also query directly by `object_ids` using the ID from the document URL.

## Fetch version history

Retrieve the last 3 edit snapshots of a document using its `object_id`:

```json
{
  "mode": "version_history",
  "ids": ["18412502542"],
  "version_history_limit": 3,
  "include_diff": true
}
```

The response returns restoring points sorted newest-first, with diffs showing what content changed between versions.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/docs#get-docs) to achieve the same result:

```graphql GraphQL
query {
  docs(workspace_ids: [12406666], limit: 25) {
    id
    object_id
    name
    doc_kind
    created_at
    url
    blocks {
      id
      type
      position
      content
    }
  }
}
```

For full documentation, see [Docs](https://developer.monday.com/api-reference/reference/docs#get-docs).
