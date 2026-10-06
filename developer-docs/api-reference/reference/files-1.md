---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Files (assets)

Learn how to read, update, and clear the files column on monday boards using the platform API

The [files column](https://support.monday.com/hc/en-us/articles/360000597900-The-Files-Column) stores files, links, and documents attached to an item. Users can upload images, PDFs, spreadsheets, and other file types, as well as link to external cloud storage services like Google Drive, Dropbox, OneDrive, and Box.

Via the API, the files column supports read, update, and clear operations. Files are added through a dedicated file upload mutation (`add_file_to_column`) that uses the `/v2/file` endpoint rather than the standard `/v2` endpoint.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column Type
      </th>

      <th style={{ textAlign: "left" }}>
        Implementation Type
      </th>

      <th style={{ textAlign: "left" }}>
        Supported Operations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `file`
      </td>

      <td style={{ textAlign: "left" }}>
        `FileValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **No**
        * Update: **Yes**
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Files columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `FileValue`.

The `files` field returns a list of `FileValueItem` objects. Each item is one of four types depending on the kind of file attached:

* **`FileAssetValue`** — An uploaded file (image, PDF, document, etc.)
* **`FileDocValue`** — A monday doc attached to the column
* **`FileLinkValue`** — A link to an external file (Google Drive, Dropbox, OneDrive, Box, or a generic link)
* **`FileAssetInvalidValue`** — A file with an invalid or missing asset

Use inline fragments on each type to access its specific fields.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on FileValue {
        id
        text
        value
        files {
          ... on FileAssetValue {
            asset_id
            name
            is_image
            created_at
            creator_id
            asset {
              id
              public_url
              url
              file_extension
              file_size
            }
          }
          ... on FileDocValue {
            file_id
            url
            created_at
            creator_id
          }
          ... on FileLinkValue {
            file_id
            name
            url
            kind
            created_at
            creator_id
          }
          ... on FileAssetInvalidValue {
            asset_id
            name
            error
            created_at
            creator_id
          }
        }
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      name
      column_values {
        ... on FileValue {
          id
          text
          files {
            ... on FileAssetValue {
              asset_id
              name
              is_image
              created_at
              asset {
                public_url
                file_extension
                file_size
              }
            }
            ... on FileLinkValue {
              file_id
              name
              url
              kind
            }
            ... on FileDocValue {
              file_id
              url
            }
          }
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

<Callout icon="📘" theme="info">
  When querying `FileAssetValue`, you can nest into the `asset` field to access the full `Asset` object, which includes `public_url` (valid for 1 hour), `file_extension`, `file_size`, and `url_thumbnail` (images only).
</Callout>

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `FileValue` implementation will return.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Possible Types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        column [`Column!`](https://developer.monday.com/api-reference/reference/columns)
      </td>

      <td>
        The column the value belongs to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        files [`[FileValueItem!]!`](#fileassetvalue-fields)
      </td>

      <td>
        The column's attached files, links, and docs.
      </td>

      <td>
        `FileAssetValue`  
        `FileDocValue`  
        `FileLinkValue`  
        `FileAssetInvalidValue`
      </td>
    </tr>

    <tr>
      <td>
        id `ID!`
      </td>

      <td>
        The file column's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        text `String`
      </td>

      <td>
        The column's value as text. Returns `""` if the column has an empty value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ColumnType!`
      </td>

      <td>
        The column's type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        value `JSON`
      </td>

      <td>
        The column's JSON-formatted raw value. Returns `null` if the column is empty.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### FileAssetValue fields

| Field       | Type                                                                      | Description                                                                                             |
| :---------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| asset       | [`Asset!`](https://developer.monday.com/api-reference/reference/assets-1) | The full asset object. Includes `public_url`, `file_extension`, `file_size`, `url_thumbnail`, and more. |
| asset\_id   | `ID!`                                                                     | The asset's unique identifier.                                                                          |
| created\_at | `Date!`                                                                   | The file's creation date.                                                                               |
| creator     | [`User`](https://developer.monday.com/api-reference/reference/users)      | The user who uploaded the file.                                                                         |
| creator\_id | `ID`                                                                      | The ID of the user who uploaded the file.                                                               |
| is\_image   | `Boolean!`                                                                | Whether the file is an image.                                                                           |
| name        | `String!`                                                                 | The file's name.                                                                                        |

### FileDocValue fields

| Field       | Type                                                                     | Description                                         |
| :---------- | :----------------------------------------------------------------------- | :-------------------------------------------------- |
| created\_at | `Date!`                                                                  | The doc's creation date.                            |
| creator     | [`User`](https://developer.monday.com/api-reference/reference/users)     | The user who created the doc.                       |
| creator\_id | `ID`                                                                     | The ID of the user who created the doc.             |
| doc         | [`Document!`](https://developer.monday.com/api-reference/reference/docs) | The associated monday doc object.                   |
| file\_id    | `ID!`                                                                    | The doc file's unique identifier.                   |
| object\_id  | `ID!`                                                                    | The associated board or object's unique identifier. |
| url         | `String`                                                                 | The doc's URL.                                      |

### FileLinkValue fields

| Field       | Type                                                                 | Description                                                                |
| :---------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| created\_at | `Date!`                                                              | The link's creation date.                                                  |
| creator     | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who added the link.                                               |
| creator\_id | `ID`                                                                 | The ID of the user who added the link.                                     |
| file\_id    | `ID!`                                                                | The link's unique identifier.                                              |
| kind        | `FileLinkValueKind!`                                                 | The type of link: `box`, `dropbox`, `google_drive`, `link`, or `onedrive`. |
| name        | `String!`                                                            | The link's display name.                                                   |
| url         | `String`                                                             | The link's URL.                                                            |

### FileAssetInvalidValue fields

| Field       | Type                                                                 | Description                                            |
| :---------- | :------------------------------------------------------------------- | :----------------------------------------------------- |
| asset\_id   | `ID!`                                                                | The asset's unique identifier.                         |
| created\_at | `Date!`                                                              | The file's creation date.                              |
| creator     | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who uploaded the file.                        |
| creator\_id | `ID`                                                                 | The ID of the user who uploaded the file.              |
| error       | `String!`                                                            | The error message describing why the asset is invalid. |
| name        | `String`                                                             | The file's name (may be null if the asset is missing). |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project brief",
        "column_values": [
          {
            "id": "files",
            "text": "screenshot.png",
            "value": "{\"files\":[{\"assetId\":123456,\"isImage\":\"true\",\"name\":\"screenshot.png\",\"fileType\":\"ASSET\",\"createdAt\":\"1711036800000\",\"createdBy\":\"9876543\"}]}",
            "files": [
              {
                "asset_id": "123456",
                "name": "screenshot.png",
                "is_image": true,
                "created_at": "2026-03-21T12:00:00+00:00",
                "creator_id": "9876543",
                "asset": {
                  "id": "123456",
                  "public_url": "https://files.monday.com/...",
                  "url": "https://files.monday.com/...",
                  "file_extension": "png",
                  "file_size": 204800
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

***

# Mutations

## Update

**Required scope: `boards:write`**

The [`add_file_to_column`](https://developer.monday.com/api-reference/docs/files#add-a-file-to-the-file-column) mutation adds a file to a files column. This mutation uses the **file upload endpoint** (`https://api.monday.com/v2/file`) instead of the standard API endpoint.

<Callout icon="🚧" theme="warn">
  The `add_file_to_column` mutation requires a multipart form request. It cannot be sent as a standard JSON request to the `/v2` endpoint. See the JavaScript example below for the full implementation.
</Callout>

```graphql GraphQL
mutation ($file: File!) {
  add_file_to_column(
    item_id: 1234567890
    column_id: "files"
    file: $file
  ) {
    id
  }
}
```
```javascript JavaScript
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const data = new FormData();
data.append(
  "query",
  'mutation ($file: File!) { add_file_to_column(item_id: 1234567890, column_id: "files", file: $file) { id } }'
);
data.append("map", '{"image":"variables.file"}');
data.append("image", fs.createReadStream("/local/path/to/file.png"));

const config = {
  method: "post",
  url: "https://api.monday.com/v2/file",
  headers: {
    Authorization: "YOUR_API_TOKEN",
    ...data.getHeaders(),
  },
  data: data,
};

const response = await axios.request(config);
```

### Arguments

| Argument   | Type      | Description                                         |
| :--------- | :-------- | :-------------------------------------------------- |
| item\_id   | `ID!`     | The item to add the file to.                        |
| column\_id | `String!` | The column to add the file to.                      |
| file       | `File!`   | The file to upload. Passed via multipart form data. |

### Return fields

The mutation returns an [`Asset`](https://developer.monday.com/api-reference/reference/assets) object. You can request these fields:

| Field           | Type                                                                  | Description                                 |
| :-------------- | :-------------------------------------------------------------------- | :------------------------------------------ |
| id              | `ID!`                                                                 | The file's unique identifier.               |
| name            | `String!`                                                             | The file's name.                            |
| url             | `String!`                                                             | URL to view the asset.                      |
| public\_url     | `String!`                                                             | Public URL to the asset (valid for 1 hour). |
| file\_extension | `String!`                                                             | The file's extension (e.g., `png`, `pdf`).  |
| file\_size      | `Int!`                                                                | The file's size in bytes.                   |
| uploaded\_by    | [`User!`](https://developer.monday.com/api-reference/reference/users) | The user who uploaded the file.             |
| url\_thumbnail  | `String`                                                              | Thumbnail URL (images only).                |

<Callout icon="📘" theme="info">
  Each uploaded file is added to the column. The `add_file_to_column` mutation does not replace existing files — it appends to them. To replace all files, clear the column first and then upload the new file.
</Callout>

## Clear

You can clear all files from a files column using [`change_column_value`](https://developer.monday.com/api-reference/reference/columns#change-a-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) by passing `{"clear_all": true}`.

### `change_column_value`

```graphql GraphQL
mutation {
  change_column_value(
    board_id: 1234567890
    item_id: 9876543210
    column_id: "files"
    value: "{\"clear_all\": true}"
  ) {
    id
  }
}
```

### `change_multiple_column_values`

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"files\": {\"clear_all\": true}}"
  ) {
    id
  }
}
```

<Callout icon="🚧" theme="warn">
  Clearing a files column removes **all** files, links, and docs from the column. This action cannot be undone via the API.
</Callout>

<Callout icon="📘" theme="info">
  You cannot set file column values using `change_simple_column_value` or `change_multiple_column_values`. Files can only be added through the `add_file_to_column` mutation. The JSON column value mutations only support the `clear_all` operation for file columns.
</Callout>

***

# Reading column configuration

To inspect a file column's configuration, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["files"]) {
      id
      title
      type
      settings
    }
  }
}
```

### `settings` response structure

The file column has minimal configuration. The `settings` field returns a typed JSON object with the following structure:

| Key           | Type      | Description                                                                                                   |
| :------------ | :-------- | :------------------------------------------------------------------------------------------------------------ |
| `hide_footer` | `boolean` | Whether to hide the footer in the column cell. Defaults to `false` (not present when using default settings). |

### Example `settings` response

When using default settings:

```json
{}
```

With custom settings:

```json
{
  "hide_footer": true
}
```

***

# Get column type schema

You can retrieve the JSON schema for the files column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: file
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              }
            },
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
