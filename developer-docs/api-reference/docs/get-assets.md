---
updatedAt: 2026-09-06T08:32:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Assets (Platform MCP)

Retrieves file metadata for one or more monday.com assets by their IDs, including download URL, thumbnail, size, and uploader information using the Platform MCP.

Use this tool to fetch metadata for files (assets) that have been uploaded to monday.com. Given one or more asset IDs, it returns information about each file: its name, extension, size, a time-limited public URL for downloading or displaying the file, a thumbnail URL (for images), the upload date, and the user who uploaded it.

Asset IDs appear in API responses when files are attached to items, updates, or docs. You can also discover them by inspecting item column values that use file columns via `get_full_board_data` or by calling `update_doc` with an `image` block that references an `asset_id`.

<Callout icon="🚧" theme="warn">
The public URL returned for each asset is **valid for 1 hour**. Do not store or share these URLs for long-term use — re-fetch the asset to get a fresh URL.
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
      <td>ids</td>
      <td>`array`</td>
      <td>Yes</td>
      <td>Array of asset IDs to fetch. Must contain at least one ID. Asset IDs are numeric strings (e.g., `["12345678"]`).</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch metadata for two assets:

```json
{
  "ids": ["12345678", "87654321"]
}
```

For each valid asset ID, the tool returns:

* `name` — the original filename (e.g., `"screenshot.png"`)
* `file_extension` — the file type (e.g., `"png"`, `"pdf"`)
* `file_size` — size in bytes
* `public_url` — a time-limited URL (valid for 1 hour) to access the file directly
* `thumbnail_url` — a preview image URL (for image assets)
* `created_at` — upload timestamp
* `uploaded_by` — the name and ID of the user who uploaded the file

**If an ID is not found**, the tool returns a message indicating no assets were found for that ID. Verify that the ID is correct and belongs to an asset in your account.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/assets) to achieve the same result:

```graphql GraphQL
query {
  assets(ids: [12345678, 87654321]) {
    id
    name
    file_extension
    file_size
    public_url
    created_at
    uploaded_by {
      id
      name
    }
  }
}
```

For full documentation, see [Assets](https://developer.monday.com/api-reference/reference/assets).
