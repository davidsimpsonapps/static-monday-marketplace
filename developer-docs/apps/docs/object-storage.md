---
updatedAt: 2026-10-01T09:05:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Object storage (BLOB storage)

Object storage enables monday code apps to store and manage large, unstructured files such as images, videos, documents, and archives directly within monday.com.

It is designed for large volumes of unstructured files and heavy, infrequent read and write operations. By contrast, monday code also provides key-value storage for fast key-based access and a document database for rich querying of structured or semi-structured data.

With native object storage backed by Google Cloud Storage, you can upload, download, list, and delete files, retrieve metadata, and generate presigned URLs for direct client uploads. All capabilities are built into monday code, so data never leaves monday’s infrastructure, ensuring security, simplicity, and performance.

<Callout icon="👍" theme="okay">
  Object storage complements monday code’s [existing storage solutions](https://developer.monday.com/apps/docs/monday-code-javascript-sdk) and is intended specifically for large, unstructured file content.
</Callout>

# Limits

Object storage is subject to the following limits:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Limit
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Server-side uploads (`uploadFile`)
      </td>

      <td>
        No SDK-enforced hard limit; practical limits depend on GCS and runtime constraints
      </td>
    </tr>

    <tr>
      <td>
        Presigned uploads
      </td>

      <td>
        Maximum file size of 500 MB
      </td>
    </tr>

    <tr>
      <td>
        Presigned URL expiration
      </td>

      <td>
        **Default:** 15 minutes  
        **Maximum:** 7 days
      </td>
    </tr>
  </tbody>
</Table>

# Initialization

<Callout icon="🚧" theme="warn">
  The maximum file size was increased from 50MB to 500MB in **@mondaycom/apps-sdk v3.3.2** and later.
</Callout>

Initialize object storage from backend code running on monday code:

```javascript
import { ObjectStorage } from '@mondaycom/apps-sdk';

const objectStorage = new ObjectStorage();
```

### Notes

* All operations are asynchronous and must be awaited.
* All responses follow a `{ success: boolean, ... }` pattern.

# Supported methods

## Upload files

Uploads file content from server-side code. For client-side uploads (browser or mobile), use a presigned upload URL.

```javascript
const objectStorage = new ObjectStorage();

// Simple upload
const result = await objectStorage.uploadFile('user-avatar.jpg', fileBuffer);

// Upload with options
const result2 = await objectStorage.uploadFile('document.pdf', fileBuffer, {
  contentType: 'application/pdf',
  metadata: {
    'uploaded-by': 'user123',
    'department': 'sales'
  }
});
```

### Options

| Option      | Type   | Description                                                  | Required |
| :---------- | :----- | :----------------------------------------------------------- | :------- |
| contentType | String | The file's MIME type. Default is `application/octet-stream`. | No       |
| metadata    | Object | Custom key-value pairs for tagging and organization.         | No       |

### Response

<Tabs>
  <Tab title="Success">
    ```json
    { "success": true, "fileName": "user-avatar.jpg", "fileUrl": "gs://bucket/user-avatar.jpg" }
    ```
  </Tab>

  <Tab title="Failure">
    ```json
    { "success": false, "error": "error message" }
    ```
  </Tab>
</Tabs>

## Download files

Retrieves file content and its content type.

```javascript
const result = await objectStorage.downloadFile('user-avatar.jpg');

if (result.success) {
  const fileContent = result.content; // Buffer
  const mimeType = result.contentType; // e.g. 'image/jpeg'
}
```

### Response

<Tabs>
  <Tab title="Success">
    Returns `content` (Buffer) and `contentType`.
  </Tab>

  <Tab title="Failure">
    Returns an error message, for example `File not found`.
  </Tab>
</Tabs>

## Delete files

Permanently removes a file from storage.

```javascript
const result = await objectStorage.deleteFile('old-document.pdf');
```

### Response

<Tabs>
  <Tab title="Success">
    ```json
    { "success": true }
    ```
  </Tab>

  <Tab title="Failure">
    ```json
    { "success": false, "error": "error message" }
    ```
  </Tab>
</Tabs>

## List files

Lists files with metadata. Supports optional prefix filtering and pagination.

```javascript
// List all files (default: 100 files per page)
const result = await objectStorage.listFiles();

// Filter by prefix (logical folder)
const result2 = await objectStorage.listFiles({
  prefix: 'users/123/'
});

// Pagination
const result3 = await objectStorage.listFiles({
  maxResults: 50,
  pageToken: 'next-page-token-from-previous-response'
});
```

### Options

| Option     | Type   | Description                                     | Required |
| :--------- | :----- | :---------------------------------------------- | :------- |
| prefix     | String | Filter results by path prefix (logical folder). | No       |
| maxResults | Number | Number of items per page. Default is 100.       | No       |
| pageToken  | String | Token used to fetch the next page of results.   | No       |

### Response

Returns:

* An array of file info objects: `name`, `size`, `contentType`, `lastModified`, `etag`, and `metadata`
* `nextPageToken` when more results are available

## Get file information

Retrieves metadata for a file without downloading its contents.

```javascript
const result = await objectStorage.getFileInfo('report.pdf');

if (result.success) {
  console.log(result.fileInfo.size); // File size in bytes
  console.log(result.fileInfo.lastModified); // Date object
  console.log(result.fileInfo.metadata); // Custom metadata
}
```

### Response

<Tabs>
  <Tab title="Success">
    Returns a `fileInfo` object.
  </Tab>

  <Tab title="Failure">
    Returns `{ success: false, error: '...' }`.
  </Tab>
</Tabs>

## Generate presigned upload URLs

Creates temporary URLs that allow clients (browser or mobile) to upload a specific file directly to cloud storage without routing the request through your backend. A presigned URL is a temporary, secure link generated and authorized by monday code that grants restricted permission to upload that file.

<Callout icon="🚧" theme="warn">
  Keep in mind that:

  * Anyone with the presigned URL can upload until it expires
  * The URL becomes invalid after expiration
  * Recommended for large files and browser-based uploads
</Callout>

```javascript
// Basic usage (15-minute expiration, 50 MB limit)

const result = await objectStorage.getPresignedUploadUrl('user-upload.jpg');

// With custom options
const result2 = await objectStorage.getPresignedUploadUrl('video.mp4', {
  expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  contentType: 'video/mp4',
  maxFileSizeBytes: 50 * 1024 * 1024 // 50 MB
});

const uploadUrl = result.presignedUrl;
```

### Options

| Option           | Type   | Description                                                        | Required |
| :--------------- | :----- | :----------------------------------------------------------------- | :------- |
| expires          | Date   | Expiration time for the URL. Defaults to 15 minutes from creation. | No       |
| contentType      | String | Restricts uploads to a specific MIME type.                         | No       |
| maxFileSizeBytes | Number | Maximum allowed file size.                                         | No       |

# Errors

All operations return descriptive error messages, including but not limited to:

* `File not found`
* `Failed to upload file: [reason]`
* `Failed to download file: [reason]`
* `Failed to list files: [reason]`
* `Failed to generate presigned upload URL: [reason]`

<Callout icon="📘" theme="info">
  Need to scale your app? <Anchor label="Contact our support team" target="_blank" href="https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962">Contact our support team</Anchor> to request higher monday app limits.
</Callout>

<br />
