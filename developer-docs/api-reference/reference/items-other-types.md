---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn more about the other types used when reading, creating, updating, and deleting items via the API

The monday.com [`items`](https://developer.monday.com/api-reference/reference/items) API lets you query monday.com items. With it, you can programmatically access an item's metadata and column values.

The object types below provide additional data structures used across the items API’s CRUD operations. They extend the core types documented in the main [`items`](https://developer.monday.com/api-reference/reference/items) reference and are used to create and configure new items, update item details, and retrieve detailed item information.

# DocBlocksFromMarkdownResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the result of the [`set_item_description_content`](https://developer.monday.com/api-reference/reference/items#set-item-description-content) mutation.

| Field                  | Description                                                        | Notes                                              |
| :--------------------- | :----------------------------------------------------------------- | :------------------------------------------------- |
| block\_ids `[String!]` | An array of block IDs that were created from the markdown content. | Use the IDs to reference or modify the new blocks. |
| error `String`         | A detailed error message that appears when the operation fails.    | Check this field when `success` is `false`.        |
| success `Boolean!`     | Whether the description was successfully updated.                  |                                                    |

***

# FileInput

An object containing the file's input values.

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
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        assetId `ID`
      </td>

      <td>
        The file's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        fileType `FileColumnValue!`
      </td>

      <td>
        The file's type.
      </td>

      <td>
        `asset`  
        `box`  
        `doc`  
        `dropbox`  
        `google_drive`  
        `link`  
        `onedrive`
      </td>
    </tr>

    <tr>
      <td>
        linkToFile `String`
      </td>

      <td>
        The file's link.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name `String!`
      </td>

      <td>
        The file's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        objectId `ID`
      </td>

      <td>
        The document's unique identifier.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# Linked items

An object containing metadata about an item's linked items.

| Arguments                            | Description                                  |
| :----------------------------------- | :------------------------------------------- |
| linked\_board\_id `Int!`             | The linked board's unique identifier.        |
| link\_to\_item\_column\_id `String!` | The link to item column's unique identifier. |

***

# PositionRelative

An object defining the location of the item being created.

| Enum Value  | Description                                                  |
| :---------- | :----------------------------------------------------------- |
| `after_at`  | Creates the new group or item below the `relative_to` value. |
| `before_at` | Creates the new group or item above the `relative_to` value. |
