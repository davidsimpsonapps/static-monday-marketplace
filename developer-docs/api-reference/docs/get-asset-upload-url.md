---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Asset Upload URL (Platform MCP)

Returns a presigned URL to upload a file to monday.com, the first step in attaching a file to an item using the Platform MCP.

Use this tool to get a presigned URL for uploading a file to monday.com. It returns an `upload_id` and an `upload_url`. This is the **first step** of a three-step upload flow — after uploading the file to the returned URL, call [finalize\_asset\_upload](https://developer.monday.com/api-reference/docs/finalize-asset-upload) to create the asset and attach it to an item.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema** (`create_upload`). The underlying API is subject to change until it is promoted to a stable API version.
</Callout>

The full upload flow is:

1. **`get_asset_upload_url`** ← You are here — Get an `upload_id` and `upload_url`.
2. **Upload the file** — Send the file to `upload_url` with an HTTP `PUT` request and capture the `ETag` response header.
3. **[finalize\_asset\_upload](https://developer.monday.com/api-reference/docs/finalize-asset-upload)** — Complete the upload with the `upload_id` and `etag`, and attach the asset to a file/doc column.

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
      <td>fileName</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The name of the file to upload, including extension (e.g. "report.pdf").</td>
    </tr>
    <tr>
      <td>contentType</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The MIME type of the file (e.g. "application/pdf", "image/png", "text/plain").</td>
    </tr>
    <tr>
      <td>fileSize</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The file size in bytes. Maximum 500&nbsp;MB (524288000 bytes).</td>
    </tr>
  </tbody>
</Table>

# Example

Request an upload URL for a PDF:

```json
{
  "fileName": "report.pdf",
  "contentType": "application/pdf",
  "fileSize": 248320
}
```

The tool returns an `upload_id`, an `upload_url`, and a `url_expires_at` timestamp. Upload the file with `PUT` and capture the `ETag` header:

```bash
curl -i -X PUT "<upload_url>" \
  -H "Content-Type: application/pdf" \
  --data-binary @report.pdf
```

Save the `ETag` value from the response — you'll pass it to [finalize\_asset\_upload](https://developer.monday.com/api-reference/docs/finalize-asset-upload).

***

# Programmatic equivalent

This tool maps to the `create_upload` mutation on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet. For working with files on the stable API, see [Assets](https://developer.monday.com/api-reference/reference/assets).
