---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Finalize Asset Upload (Platform MCP)

Completes a file upload started with get_asset_upload_url, creates the asset, and attaches it to an item's file column using the Platform MCP.

Use this tool to finalize a file upload and create the asset on monday.com. Call it after uploading the file to the presigned URL returned by [get\_asset\_upload\_url](https://developer.monday.com/api-reference/docs/get-asset-upload-url). It automatically attaches the uploaded asset to the specified file or doc column on an item and returns the created `asset_id`.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema** (`complete_upload`). The underlying API is subject to change until it is promoted to a stable API version.
</Callout>

This is the **final step** of the upload flow:

1. **[get\_asset\_upload\_url](https://developer.monday.com/api-reference/docs/get-asset-upload-url)** — Get an `upload_id` and `upload_url`.
2. **Upload the file** — `PUT` the file to `upload_url` and capture the `ETag` response header.
3. **`finalize_asset_upload`** ← You are here — Complete the upload and attach the asset.

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
      <td>uploadId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The <code>upload_id</code> returned by <a href="doc:get-asset-upload-url">get_asset_upload_url</a>.</td>
    </tr>
    <tr>
      <td>etag</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The <code>ETag</code> header value from the <code>PUT</code> response when uploading to the presigned URL.</td>
    </tr>
    <tr>
      <td>boardId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The board's unique identifier.</td>
    </tr>
    <tr>
      <td>itemId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The item's unique identifier.</td>
    </tr>
    <tr>
      <td>columnId</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The file or doc column's unique identifier to attach the uploaded asset to.</td>
    </tr>
  </tbody>
</Table>

# Example

Finalize an upload and attach the file to an item's file column:

```json
{
  "uploadId": "upl_abc123",
  "etag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
  "boardId": "1234567890",
  "itemId": "987654321",
  "columnId": "files"
}
```

The tool returns the created asset's `asset_id`, `filename`, `content_type`, `file_size`, `url`, and `filelink`.

***

# Programmatic equivalent

This tool maps to the `complete_upload` mutation on the monday.com dev (preview) API schema, followed by a `change_column_value` mutation to attach the asset. There is no stable public GraphQL equivalent for `complete_upload` yet. For working with files on the stable API, see [Assets](https://developer.monday.com/api-reference/reference/assets).
