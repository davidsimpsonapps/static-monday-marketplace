---
updatedAt: 2026-09-06T08:33:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Update Doc (Platform MCP)

Updates an existing monday.com document by executing an ordered list of operations such as appending content, renaming, editing blocks, or adding comments using the Platform MCP.

Use this tool to modify an existing monday.com document. You supply one or more operations in an ordered array, and they are executed sequentially — the tool stops at the first failure. Operations cover the full range of document edits: appending markdown, renaming the document, updating or creating individual blocks at precise positions, deleting blocks, and adding comments.

To target a document, provide either `doc_id` (the `id` field from `read_docs`) or `object_id` (the numeric ID visible in the document URL). If you need block IDs for `update_block`, `delete_block`, or `replace_block` operations, call `read_docs` first with `include_blocks: true`.

<Callout icon="🚧" theme="warn">
Operations are executed sequentially and stop on the first failure. If an operation references a block created in the same call (e.g., nesting content inside a `notice_box`), you must split it into two separate `update_doc` calls — the first to create the container, the second to nest content inside it using `parent_block_id`.
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
      <td>doc_id</td>
      <td>`string`</td>
      <td>Yes (or object_id)</td>
      <td>The document ID returned by `read_docs` (`id` field). Takes priority over `object_id` if both are provided.</td>
    </tr>
    <tr>
      <td>object_id</td>
      <td>`string`</td>
      <td>Yes (or doc_id)</td>
      <td>The document object ID visible in the document URL. Resolved to `doc_id` internally.</td>
    </tr>
    <tr>
      <td>operations</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Ordered list of operations to perform (1–25). Each operation requires an `operation_type` and type-specific fields. See operation types below.</td>
    </tr>
  </tbody>
</Table>

## Operation types

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>operation_type</th>
      <th>Key fields</th>
      <th>When to use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`set_name`</td>
      <td>`name` (string)</td>
      <td>Rename the document.</td>
    </tr>
    <tr>
      <td>`add_markdown_content`</td>
      <td>`markdown` (string), optional `after_block_id`</td>
      <td>Append markdown as blocks. Best for text, headings, lists, and simple tables. No block IDs needed.</td>
    </tr>
    <tr>
      <td>`update_block`</td>
      <td>`block_id`, `content` (with `block_content_type`)</td>
      <td>Edit the content of an existing `text`, `code`, or `list_item` block in place. Cannot change block subtype — use `replace_block` for that.</td>
    </tr>
    <tr>
      <td>`create_block`</td>
      <td>`block` (with `block_type`), optional `after_block_id`, optional `parent_block_id`</td>
      <td>Insert a new block at a specific position. Supports `text`, `list_item`, `code`, `divider`, `page_break`, `image`, `video`, `notice_box`, `table`, and `layout`.</td>
    </tr>
    <tr>
      <td>`delete_block`</td>
      <td>`block_id`</td>
      <td>Permanently remove a block. The only option for `BOARD`, `WIDGET`, `DOC` embed, and `GIPHY` blocks.</td>
    </tr>
    <tr>
      <td>`replace_block`</td>
      <td>`block_id`, `block` (with `block_type`), optional `after_block_id`</td>
      <td>Delete a block and create a new one in its place. Use when changing image/video source, table structure, or `notice_box` theme.</td>
    </tr>
    <tr>
      <td>`add_comment`</td>
      <td>`body` (HTML string), optional `block_id`, `selection_from`, `selection_length`, `parent_update_id`, `mentions_list`</td>
      <td>Add a doc-level, block-level, or text-selection comment. Format `body` with HTML, not markdown.</td>
    </tr>
  </tbody>
</Table>

# Example

Append a new section to document `41622523`:

```json
{
  "doc_id": "41622523",
  "operations": [
    {
      "operation_type": "add_markdown_content",
      "markdown": "## Section Added via update_doc\n\nThis section was appended using the `add_markdown_content` operation."
    }
  ]
}
```

The tool confirmed `1/1 operations completed` and returned the IDs of the 2 new blocks created: `f1fe721e-a5c9-4e99-8564-6ad39fc6a635` and `e1693499-5daa-41ec-ba92-782d1960384a`.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/docs) to achieve the same result:

```graphql GraphQL
mutation {
  add_blocks_to_document(
    doc_id: 41622523
    content: "{\"delta\":[{\"insert\":\"Section Added via update_doc\"},{\"insert\":\"\\n\",\"attributes\":{\"header\":2}}]}"
    after_block_id: null
  ) {
    id
  }
}
```

For full documentation, see [Docs](https://developer.monday.com/api-reference/reference/docs).
