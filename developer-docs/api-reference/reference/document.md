---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Monday doc

Learn how to read, create, and clear the monday doc column on boards using the platform API

The [monday doc column](https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs) stores a [Workdoc](https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs) directly inside an item. Workdocs are collaborative documents that teams can edit together in real time.

Via the API, the monday doc column supports read, create, and clear operations. You cannot update the column value directly — instead, use the `create_doc` mutation to create a doc inside the column.

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
        `doc`
      </td>

      <td style={{ textAlign: "left" }}>
        `DocValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **No**
        * Create: **Yes**
        * Update: **No** (use `create_doc`)
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Monday doc columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `DocValue`.

The `DocValue` type contains a `file` field of type `FileDocValue`, which provides metadata about the attached Workdoc and access to the underlying `Document` object.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on DocValue {
        id
        text
        value
        file {
          file_id
          object_id
          url
          created_at
          creator_id
          doc {
            id
            name
            url
            doc_kind
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
        ... on DocValue {
          id
          text
          value
          file {
            file_id
            object_id
            url
            created_at
            creator_id
            doc {
              id
              name
              url
              doc_kind
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

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `DocValue` implementation will return.

| Field               | Description                                                                          |
| :------------------ | :----------------------------------------------------------------------------------- |
| column `Column!`    | The column the value belongs to.                                                     |
| file `FileDocValue` | The Workdoc attached to the column. Returns `null` if no doc is attached.            |
| id `ID!`            | The column's unique identifier.                                                      |
| text `String`       | Text representation. Always returns `""` for doc columns.                            |
| type `ColumnType!`  | The column's type (`doc`).                                                           |
| value `JSON`        | The column's raw value as a JSON string. Contains a `files` array with doc metadata. |

### `FileDocValue` fields

| Field               | Description                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------ |
| created\_at `Date!` | The file's creation date.                                                                                           |
| creator `User`      | The user who created the file.                                                                                      |
| creator\_id `ID`    | The ID of the user who created the file.                                                                            |
| doc `Document!`     | The `Document` object associated with the file. Provides access to the doc's name, URL, blocks, and other metadata. |
| file\_id `ID!`      | The file's unique identifier (UUID format).                                                                         |
| object\_id `ID!`    | The associated board or object's unique identifier.                                                                 |
| url `String`        | The file's URL (links to the doc in context of the board and item).                                                 |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Project Brief",
        "column_values": [
          {
            "id": "monday_doc",
            "text": "",
            "value": "{\"files\":[{\"name\":\"Project Brief\",\"fileId\":\"a1b2c3d4-e5f6-7890-abcd-ef1234567890\",\"isImage\":\"false\",\"fileType\":\"MONDAY_DOC\",\"objectId\":1234567890,\"createdAt\":1710000000,\"createdBy\":12345678,\"linkToFile\":\"https://yourdomain.monday.com/boards/1234567890/pulses/9876543210?doc_id=1234567890\"}]}",
            "file": {
              "file_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
              "object_id": "1234567890",
              "url": "https://yourdomain.monday.com/boards/1234567890/pulses/9876543210?doc_id=1234567890",
              "created_at": "2026-03-20T12:00:00Z",
              "creator_id": "12345678",
              "doc": {
                "id": "12345678",
                "name": "Project Brief",
                "url": "https://yourdomain.monday.com/docs/1234567890",
                "doc_kind": "private"
              }
            }
          }
        ]
      }
    ]
  }
}
```

### Reading doc blocks

You can also access the content blocks of the attached Workdoc by querying the `blocks` field on the `Document` object.

```graphql GraphQL
query {
  items(ids: [1234567890]) {
    column_values {
      ... on DocValue {
        id
        file {
          doc {
            id
            name
            blocks(limit: 10) {
              id
              type
              content
            }
          }
        }
      }
    }
  }
}
```

<Callout icon="📘" theme="info">
  The `blocks` field supports pagination with the `limit` (default 25) and `page` (default 1) arguments.
</Callout>

### Empty column response

When no doc is attached to the column, the `file` field returns `null` and `value` is either `null` or `{"files":[]}`.

```json
{
  "data": {
    "items": [
      {
        "column_values": [
          {
            "id": "monday_doc",
            "text": "",
            "value": null,
            "file": null
          }
        ]
      }
    ]
  }
}
```

***

# Mutations

## Create column

**Required scope: `boards:write`**

The [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation creates a monday doc column via the API. You can specify which [fields](https://developer.monday.com/api-reference/docs/columns#fields) to return in the mutation response.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: doc
    title: "Task Notes"
  ) {
    id
    title
    type
  }
}
```

## Create a doc inside a doc column

**Required scope: `docs:write`**

The [`create_doc`](https://developer.monday.com/api-reference/reference/docs#create-doc) mutation creates a Workdoc inside a monday doc column. Pass the `item_id` and `column_id` in the `location.board` input to attach the doc to a specific item's doc column.

```graphql GraphQL
mutation {
  create_doc(
    location: {
      board: {
        item_id: 9876543210
        column_id: "monday_doc"
      }
    }
  ) {
    id
    name
    object_id
    url
  }
}
```
```javascript JavaScript
const query = `
  mutation ($location: CreateDocInput!) {
    create_doc(location: $location) {
      id
      name
      object_id
      url
    }
  }
`;

const variables = {
  location: {
    board: {
      item_id: 9876543210,
      column_id: "monday_doc"
    }
  }
};

const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument                   | Type      | Description                                                                        |
| :------------------------- | :-------- | :--------------------------------------------------------------------------------- |
| location `CreateDocInput!` | `Object`  | The location where the doc will be created. Use the `board` input for doc columns. |
| location.board.item\_id    | `ID!`     | The ID of the item containing the doc column.                                      |
| location.board.column\_id  | `String!` | The ID of the doc column.                                                          |

<Callout icon="📘" theme="info">
  Each doc column cell can hold one Workdoc at a time. If the column already contains a doc, creating a new one will replace it. To clear the existing doc first, use the [clear](#clear) mutation.
</Callout>

<Callout icon="🚧" theme="warn">
  You cannot populate a doc column by passing a value in `column_values` during item creation (`create_item`). The column will be empty when the item is created. Use `create_doc` as a separate mutation to attach a doc afterward.
</Callout>

## Clear

You can clear a monday doc column using [`change_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values) by passing `{"clear_all": true}`.

Clearing the column removes the Workdoc link from the item, but it does not delete the underlying Workdoc.

### `change_column_value`

```graphql GraphQL
mutation {
  change_column_value(
    board_id: 1234567890
    item_id: 9876543210
    column_id: "monday_doc"
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
    board_id: 1234567890
    item_id: 9876543210
    column_values: "{\"monday_doc\": {\"clear_all\": true}}"
  ) {
    id
  }
}
```

<Callout icon="🚧" theme="warn">
  The `change_simple_column_value` mutation is **not supported** for doc columns. Attempting to use it returns an error. Use `change_column_value` or `change_multiple_column_values` with `clear_all` instead.
</Callout>

***

# Reading column configuration

To view a doc column's configuration, query its `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["monday_doc"]) {
      id
      title
      type
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object. For doc columns without a template, it returns an empty object `{}`.

When a doc template is configured, it contains a `template` key:

| Key                          | Type      | Description                                              |
| :--------------------------- | :-------- | :------------------------------------------------------- |
| `template.objectId`          | `integer` | Internal object identifier for the template doc.         |
| `template.fileType`          | `string`  | File type identifier (e.g., `"MONDAY_DOC"`).             |
| `template.name`              | `string`  | The template's name.                                     |
| `template.linkToFile`        | `string`  | URL to the template document.                            |
| `template.fileId`            | `string`  | The template file's unique identifier (UUID).            |
| `template.createdAt`         | `integer` | Creation timestamp in milliseconds.                      |
| `template.createdBy`         | `string`  | The creator's user ID.                                   |
| `template.docColumnTemplate` | `boolean` | Always `true` — indicates this is a doc column template. |
| `template.columnId`          | `string`  | The column's identifier.                                 |

### Example `settings` response (with template)

```json
{
  "template": {
    "objectId": 1234567890,
    "fileType": "MONDAY_DOC",
    "name": "Meeting Notes Template",
    "linkToFile": "https://yourdomain.monday.com/boards/1234567890/pulses/9876543210?doc_id=1234567890",
    "isImage": false,
    "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "createdAt": 1710000000,
    "createdBy": "12345678",
    "docColumnTemplate": true,
    "columnId": "monday_doc"
  }
}
```

### Example `settings` response (no template)

```json
{}
```

***

# Get column type schema

You can retrieve the JSON schema for the monday doc column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: doc
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
              "template": {
                "type": "object",
                "description": "Default document template configuration",
                "properties": {
                  "objectId": {
                    "type": "integer",
                    "description": "Internal object identifier"
                  },
                  "fileType": {
                    "type": "string",
                    "description": "File type identifier (e.g., MONDAY_DOC)"
                  },
                  "name": {
                    "type": "string",
                    "description": "Template name"
                  },
                  "linkToFile": {
                    "type": "string",
                    "description": "Link to the document"
                  },
                  "isImage": {
                    "type": "boolean",
                    "description": "Whether the file is an image"
                  },
                  "fileId": {
                    "type": "string",
                    "description": "File unique identifier"
                  },
                  "createdAt": {
                    "type": "integer",
                    "description": "Creation timestamp (ms)"
                  },
                  "createdBy": {
                    "type": "string",
                    "description": "Creator user ID"
                  },
                  "docColumnTemplate": {
                    "type": "boolean",
                    "description": "Indicates this is a doc column template"
                  },
                  "columnId": {
                    "type": "string",
                    "description": "Column identifier"
                  }
                },
                "additionalProperties": false
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
