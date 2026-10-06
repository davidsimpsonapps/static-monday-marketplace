---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Docs

Learn how to read, create, update, and delete monday docs using the platform API

[Workdocs](https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs) serve as a central place for teams to plan and execute work collaboratively. They're like virtual whiteboards that allow you to jot down notes, create charts, and populate items on a board from the text you type.

Docs enable teams to collaborate in real time without overwriting each other's work. Users can even implement built-in features, such as widgets, templates, and apps, to enhance their docs.

# Queries

## Get docs

* **Required scope:`docs:read`**
* Returns an array containing metadata about a collection of docs
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  docs(
    object_ids: [123456789]
    limit: 1
  ) {
    id
    object_id
    settings
    created_by {
      id
      name
    }
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The document's unique internal identifier. In the UI, this is the ID that appears in the top-left corner of the doc when [developer mode](https://developer.monday.com/api-reference/docs/getting-started#developer-mode) is activated. It's also the value returned when querying `docs`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int`
      </td>

      <td>
        The number of docs to get. The default is 25.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The document's unique identifier(s). In the UI, this is the ID that appears in the URL and the doc column values.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        order_by
      </td>

      <td>
        `DocsOrderBy`
      </td>

      <td>
        The order in which to retrieve your boards. The default shows _created_at_ with the newest docs listed first. This argument will not be applied if you query docs by specific `ids`.
      </td>

      <td>
        `created_at`  
        `used_at`
      </td>
    </tr>

    <tr>
      <td>
        page
      </td>

      <td>
        `Int`
      </td>

      <td>
        The page number to return. Starts at 1.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_ids
      </td>

      <td>
        `[ID]`
      </td>

      <td>
        The unique identifiers of the specific workspaces to return.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        blocks
      </td>

      <td>
        [`[DocumentBlock]`](https://developer.monday.com/api-reference/docs/blocks)
      </td>

      <td>
        The document's content blocks.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The document's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        `User`
      </td>

      <td>
        The document's creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        doc_folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder that contains the doc. Returns `null` for the first level.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        doc_kind
      </td>

      <td>
        `BoardKind!`
      </td>

      <td>
        The document's kind.
      </td>

      <td>
        `private` `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The document's unique identifier. In the UI, this ID appears in the top-left corner of the doc when [developer mode](https://developer.monday.com/api-reference/docs/resources#developer-mode) is activated. Can be passed in the `ids` argument.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The document's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The associated board or object's unique identifier. In the UI, this is the ID that appears in the URL and the doc column values.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        relative_url
      </td>

      <td>
        `String`
      </td>

      <td>
        The document's relative URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The document's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        url
      </td>

      <td>
        `String`
      </td>

      <td>
        The document's direct URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace 
      </td>

      <td>
        [`Workspace`](https://developer.monday.com/api-reference/reference/workspaces)
      </td>

      <td>
        The workspace that contains this document. Returns `null` for the _Main_ workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the workspace that contains the doc. Returns `null` for the _Main_ workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The document's settings.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Settings field

The `settings` field returns document-level settings. You can view a sample payload below, but keep in mind that the API will return payloads in a slightly different format using escaped JSON.

```json
{
  "fontSize": "small", // "small", "normal", or "large"
  "hasTitle": true, // true or false
  "coverPhoto": {
    "isEnabled": true, // true or false
    "imageUrl": "", 
    "fromTop": 0
 	 },
  "fontFamily": "Serif", // "Serif", "Mono", or "Default"
  "isPageLayout": true, // true or false
  "backgroundColor": "var(--color-sofia_pink-selected)", 
  "isFullWidthMode": false, // true or false
  "backgroundPattern": null, // "sticky-note", "notepad", or "cubes-notepad"
  "showTableOfContent": true // true or false
}
```

# Mutations

**Required scope:`docs:write`**

## Create doc

Creates a new doc in a document column or workspace. Returns [`Document`](https://developer.monday.com/api-reference/docs/docs#fields).

```graphql GraphQL
mutation {
  create_doc(
    location: {
      workspace: {
        workspace_id: 12345678
        name: "New doc"
        kind: private
      }
    }
  ) {
    id
  }
}
```

### Arguments

| Argument | Type                                                                                              | Description                  |
| :------- | :------------------------------------------------------------------------------------------------ | :--------------------------- |
| location | [`CreateDocInput!`](https://developer.monday.com/api-reference/docs/other-types#create-doc-input) | The new document's location. |

## Add content to doc from markdown

Adds markdown content to an existing monday doc. The markdown will be parsed and converted into the corresponding block types. Returns [`DocBlocksFromMarkdownResult`](https://developer.monday.com/api-reference/reference/docs-other-types#docblocksfrommarkdownresult).

```graphql GraphQL
mutation {
  add_content_to_doc_from_markdown(
    docId: 123456, 
    markdown: "# Markdown Example\n\n**Bold text**, *italic text*, and `inline code`.\n\n- Item one\n- Item two\n\n> A simple blockquote."
  ) {
    success
    block_ids
    error
  }
}
```
```json JSON
{
  "data": {
    "add_content_to_doc_from_markdown": {
      "success": true,
      "block_ids": [
				"7fa2d9c4-1b3e-4c67-9f5a-2d9d84e3a912",
				"c4b6e2f1-59a7-4c12-b3de-8a1d4e0f42ac",
				"2d3f6b19-83e2-45cd-b9a1-7fe6493b0f56",
				"9b4d1f22-6c3a-4879-a82d-1e2c3f8d9a77",
				"e5c8f320-7a14-4d9c-b25e-9f1a2c4d8b33"
      ],
      "error": null
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument     | Type      | Description                                                              |
| :----------- | :-------- | :----------------------------------------------------------------------- |
| afterBlockId | `String`  | The unique identifier of the block to insert the markdown content after. |
| docId        | `ID!`     | The unique identifier of the doc to add the content to.                  |
| markdown     | `String!` | The markdown content to add and convert.                                 |

## Import doc from html

Imports HTML content into a new monday doc. The HTML will be parsed and converted into the corresponding block types. We currently support the following block types: style/format text, emoji, quote, table, list, code, divider, and title/header text. Returns [`ImportDocFromHtmlResult`](https://developer.monday.com/api-reference/reference/docs-other-types#importdocfromhtmlresult).

```graphql GraphQL
mutation {
  import_doc_from_html(
    html: """
<!DOCTYPE html>
<html>
  <head>
    <title>Test Doc</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a <strong>fake HTML</strong> doc for testing.</p>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </body>
</html>
    """,
    workspaceId: 1234567890,
    title: "New Doc from HTML",
    folderId: 9876543210
  ) {
    error
    success
    doc_id
  }
}
```
```json JSON
{
  "data": {
    "import_doc_from_html": {
      "error": null,
      "success": true,
      "doc_id": "12345"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        folderId
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder to create the doc in. If omitted, the document will be created at the root level of the workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        html
      </td>

      <td>
        `String!`
      </td>

      <td>
        The HTML content to convert into a new doc.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `DocKind`
      </td>

      <td>
        The document's access level.
      </td>

      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The new document's title. If omitted, the title will be inferred from the provided HTML content.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspaceId
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the workspace to create the doc in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update doc name

Updates the name/title of an existing document. Returns a JSON object containing the updated name.

```graphql GraphQL
mutation {
  update_doc_name(
    docId: 12345, 
    name: "The new document name."
	)
}
```

### Arguments

| Argument | Type      | Description                       |
| :------- | :-------- | :-------------------------------- |
| docId    | `Int!`    | The document's unique identifier. |
| name     | `String!` | The document's new name.          |

## Duplicate doc

Creates an exact copy of an existing monday.com document (including all its content and structure). Returns a JSON object containing the new document's ID.

```graphql GraphQL
mutation {
  duplicate_doc(
    docId: 12345, 
    duplicateType: duplicate_doc_with_content_and_updates
	)
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        docId
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The document's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        duplicateType
      </td>

      <td>
        `DuplicateType`
      </td>

      <td>
        The document's duplication types.
      </td>

      <td>
        `duplicate_doc_with_content` (only the document content)  
        `duplicate_doc_with_content_and_updates` (both the content and associated updates)
      </td>
    </tr>
  </tbody>
</Table>

## Delete doc

Deletes an existing document. Returns a JSON object confirming whether the deletion was successful and the ID of the deleted document.

```graphql GraphQL
mutation {
  delete_doc (
    docId: 12345
	)
}
```

### Arguments

| Argument | Type  | Description                       |
| :------- | :---- | :-------------------------------- |
| docId    | `ID!` | The document's unique identifier. |

***

# Version History

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

## Get doc version history

Returns a list of restoring points (snapshots) for a document, grouped in 5-minute intervals. Each restoring point includes timestamps and user IDs of who made changes.

* **Required scope: `docs:read`**

```graphql GraphQL
query {
  doc_version_history(
    doc_id: "1234567890"
    since: "2025-01-01T00:00:00Z"
  ) {
    doc_id
    restoring_points {
      date
      user_ids
      type
    }
  }
}
```

### Arguments

| Argument | Type     | Description                                                   |
| :------- | :------- | :------------------------------------------------------------ |
| doc\_id  | `ID!`    | The document's unique identifier (object ID from the URL).    |
| since    | `String` | Optional ISO 8601 lower bound for filtering restoring points. |
| until    | `String` | Optional ISO 8601 upper bound for filtering restoring points. |

### Fields (`DocVersionHistory`)

| Field             | Type                  | Description                                   |
| :---------------- | :-------------------- | :-------------------------------------------- |
| doc\_id           | `ID`                  | The document's unique identifier.             |
| restoring\_points | `[DocRestoringPoint]` | A list of version snapshots for the document. |

### Fields (`DocRestoringPoint`)

| Field     | Type       | Description                                                                            |
| :-------- | :--------- | :------------------------------------------------------------------------------------- |
| date      | `String`   | The ISO 8601 timestamp of the restoring point.                                         |
| user\_ids | `[String]` | The unique identifiers of users who made changes in this snapshot interval.            |
| type      | `String`   | The type of restoring point. Returns `"publish"` for publish events, otherwise `null`. |

## Get doc version diff

Returns the blocks that were added, deleted, or changed between two restoring points. Only blocks with changes are included.

* **Required scope: `docs:read`**

```graphql GraphQL
query {
  doc_version_diff(
    doc_id: "1234567890"
    date: "2026-01-08T10:24:02.469Z"
    prev_date: "2025-01-01T00:00:00Z"
  ) {
    doc_id
    date
    prev_date
    blocks {
      id
      type
      content
      summary
      parent_block_id
      changes {
        added
        deleted
        changed
      }
    }
  }
}
```

### Arguments

| Argument   | Type      | Description                                     |
| :--------- | :-------- | :---------------------------------------------- |
| doc\_id    | `ID!`     | The document's unique identifier.               |
| date       | `String!` | The newer restoring point timestamp (ISO 8601). |
| prev\_date | `String!` | The older restoring point timestamp (ISO 8601). |

### Fields (`DocVersionDiff`)

| Field      | Type          | Description                                       |
| :--------- | :------------ | :------------------------------------------------ |
| doc\_id    | `ID`          | The document's unique identifier.                 |
| date       | `String`      | The newer restoring point timestamp.              |
| prev\_date | `String`      | The older restoring point timestamp.              |
| blocks     | `[DiffBlock]` | The blocks that changed between the two versions. |

### Fields (`DiffBlock`)

| Field             | Type           | Description                                            |
| :---------------- | :------------- | :----------------------------------------------------- |
| id                | `String`       | The block's unique identifier.                         |
| type              | `String`       | The block type identifier.                             |
| content           | `String`       | The block's content (may include base64-encoded data). |
| summary           | `String`       | A human-readable summary of the change.                |
| parent\_block\_id | `String`       | The parent block's unique identifier, if nested.       |
| changes           | `BlockChanges` | An object describing what changed for this block.      |

### Fields (`BlockChanges`)

| Field   | Type      | Description                            |
| :------ | :-------- | :------------------------------------- |
| added   | `Boolean` | Whether the block was added.           |
| deleted | `Boolean` | Whether the block was deleted.         |
| changed | `Boolean` | Whether the block content was changed. |
