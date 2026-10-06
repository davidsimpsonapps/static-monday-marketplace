---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the docs APIs

The monday.com [docs](https://developer.monday.com/api-reference/reference/docs) APIs enable you to create, read, update, and delete monday docs.

The types below are used by the docs queries and mutations, and are not independently queryable.

# CreateDocInput

An input object indicating the target location for creating the new doc.

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
        Supported Arguments
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board
      </td>

      <td>
        [`CreateDocBoardInput`](https://developer.monday.com/api-reference/docs/other-types#create-doc-board-input)
      </td>

      <td>
        The new document's location (when creating a doc on a board).
      </td>

      <td>
        column_id `String!`  
        item_id `ID!`
      </td>
    </tr>

    <tr>
      <td>
        workspace
      </td>

      <td>
        [`CreateDocWorkspaceInput`](https://developer.monday.com/api-reference/docs/other-types#create-doc-workspace-input)
      </td>

      <td>
        The new document's location (when creating a doc in a workspace).
      </td>

      <td>
        kind `BoardKind`  
        name `String!`  
        workspace_id `ID!`
      </td>
    </tr>
  </tbody>
</Table>

## CreateDocBoardInput

An input object containing the target item and column for creating the new doc.

| Field      | Type      | Description                                                   |
| :--------- | :-------- | :------------------------------------------------------------ |
| column\_id | `String!` | The unique identifier of the column to create the new doc in. |
| item\_id   | `ID!`     | The unique identifier of the item to create the new doc on.   |

## CreateDocWorkspaceInput

An input object containing the target workspace for creating the new doc.

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
        kind
      </td>

      <td>
        `BoardKind`
      </td>

      <td>
        The kind of document to create.
      </td>

      <td>
        `private`  
        `public`  
        `share`
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
        The new document's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the workspace to create the new doc in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# DocBlocksFromMarkdownResult

The result of adding markdown content to a document.

| Field      | Type        | Description                                                                |
| :--------- | :---------- | :------------------------------------------------------------------------- |
| block\_ids | `[String!]` | An array of block IDs that were created from the markdown content.         |
| error      | `String`    | The error message (if the operation failed).                               |
| success    | `Boolean!`  | Whether the markdown was converted successfully and added to the document. |

***

# ImportDocFromHtmlResult

The result of converting HTML content to a new monday doc.

| Field   | Type       | Description                                                                 |
| :------ | :--------- | :-------------------------------------------------------------------------- |
| doc\_id | `String`   | The unique identifier of the newly created document.                        |
| error   | `String`   | The error message (if the operation failed).                                |
| success | `Boolean!` | Whether the HTML was converted successfully and imported as a new document. |
