---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the blocks APIs

The monday.com [blocks](https://developer.monday.com/api-reference/reference/blocks) APIs enable you to create, read, update, and delete document blocks from monday docs.

The types below are used by the blocks queries and mutations, and are not independently queryable.

# CreateBlockInput

An object containing the block inputs, by block type.

| Field              | Type                                                                                                                     | Description                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| divider\_block     | [`DividerBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#dividerblockinput)     | An object containing the input for creating divider blocks.    |
| image\_block       | [`ImageBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#imageblockinput)         | An object containing the input for creating image blocks.      |
| layout\_block      | [`LayoutBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#layoutblockinput)       | An object containing the input for creating layout blocks.     |
| list\_block        | [`ListBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#listblockinput)           | An object containing the input for creating list blocks.       |
| notice\_box\_block | [`NoticeBoxBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#noticeboxblockinput) | An object containing the input for creating notice box blocks. |
| page\_break\_block | [`PageBreakBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#pagebreakblockinput) | An object containing the input for creating page break blocks. |
| table\_block       | [`TableBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#tableblockinput)         | An object containing the input for creating table blocks.      |
| text\_block        | [`TextBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#textblockinput)           | An object containing the input for creating text blocks.       |
| video\_block       | [`VideoBlockInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#videoblockinput)         | An object containing the input for creating video blocks.      |

## DividerBlockInput

An object containing the input for creating divider blocks.

| Field             | Type     | Description                                                              |
| :---------------- | :------- | :----------------------------------------------------------------------- |
| parent\_block\_id | `String` | The unique identifier of the parent block to create the new block under. |

## ImageBlockInput

An object containing the input for creating image blocks.

| Field             | Type     | Description                                                              |
| :---------------- | :------- | :----------------------------------------------------------------------- |
| parent\_block\_id | `String` | The unique identifier of the parent block to create the new block under. |
| asset\_id         | `ID`     | The monday.com asset ID of the image.                                    |
| public\_url       | `String` | The public URL of the image.                                             |
| width             | `Int`    | The width of the image.                                                  |

## LayoutBlockInput

An object containing the input for creating layout blocks.

| Field             | Type                                                                                                                  | Description                                                              |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| column\_count     | `Int!`                                                                                                                | The number of columns in the layout.                                     |
| column\_style     | [`[ColumnStyleInput!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#columnstyleinput) | The column style configuration.                                          |
| parent\_block\_id | `String`                                                                                                              | The unique identifier of the parent block to create the new block under. |

### ColumnStyleInput

An array containing the column style configuration.

| Field | Type   | Description                    |
| :---- | :----- | :----------------------------- |
| width | `Int!` | The column's width percentage. |

### Usage and behavior

When a layout is created, the system automatically generates `column_count` child cell blocks, one for each column. The layout block itself acts as a container, and each cell has `parentBlockId === <layout-block-id>`, making it the direct parent for any content placed in that column. The creation response also includes an ordered list of generated cell IDs under `content[0].cells`, represented as a one-dimensional array from left to right.

**Recommended workflow**

1. Create the layout and capture its ID.
2. Retrieve the cell block IDs from `content[0].cells` in the response (or by querying the layout block’s children).
3. Bulk-create child blocks (e.g., textBlock, imageBlock) using `parentBlockId = matrix[row][col]`. Use `afterBlockId` only for ordering siblings inside the same cell.

## ListBlockInput

An object containing the input for creating list blocks.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The list block's alignment.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        delta_format
      </td>

      <td>
        [`[OperationInput!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#operationinput)
      </td>

      <td>
        An array of operations specifying the list block's text content and attributes.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The list block's text display direction.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        indentation
      </td>

      <td>
        `Int`
      </td>

      <td>
        The list item's indentation level.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        list_block_type
      </td>

      <td>
        `ListBlock`
      </td>

      <td>
        The list block type. Default is `BULLETED_LIST`.
      </td>

      <td>
        `BULLETED_LIST`  
        `CHECK_LIST`  
        `NUMBERED_LIST`
      </td>
    </tr>

    <tr>
      <td>
        parent_block_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the parent block to create the new block under.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## NoticeBoxBlockInput

An object containing the input for creating notice box blocks. Be sure to capture the notice box block's ID after creation. Every block that will appear inside it must use that as the `parent_block_id`.

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
        parent_block_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the parent block to create the new block under.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        theme
      </td>

      <td>
        `NoticeBoxTheme!`
      </td>

      <td>
        The theme options to apply to the notice box block.
      </td>

      <td>
        `GENERAL`  
        `INFO`  
        `TIPS`  
        `WARNING`
      </td>
    </tr>
  </tbody>
</Table>

## PageBreakBlockInput

An object containing the input for creating page break blocks.

| Field             | Type     | Description                                                              |
| :---------------- | :------- | :----------------------------------------------------------------------- |
| parent\_block\_id | `String` | The unique identifier of the parent block to create the new block under. |

## TableBlockInput

An object containing the input for creating table blocks.

<Callout icon="👍" theme="okay">
  For simpler table creation, use `add_content_to_doc_from_markdown` with markdown tables instead of manually creating table blocks.
</Callout>

| Field             | Type                                                                                                                  | Description                                                              |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| column\_count     | `Int!`                                                                                                                | The number of columns in the table.                                      |
| column\_style     | [`[ColumnStyleInput!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#columnstyleinput) | The column style configuration.                                          |
| parent\_block\_id | `String`                                                                                                              | The unique identifier of the parent block to create the new block under. |
| row\_count        | `Int!`                                                                                                                | The number of rows in the table.                                         |
| width             | `Int`                                                                                                                 | The table's width.                                                       |

### Usage and behavior

When a table is created, the system automatically generates a grid of `row_count × column_count` child cell blocks (one for each cell). Each cell has `parentBlockId === <table-block-id>` and acts as the direct parent for its content. To reference cells, always use the 2D matrix returned under `content[0].cells`.

This matrix is row-major (`matrix[rowIndex][columnIndex]`). You should not rely on the order returned by `docs { blocks { ... } }` since that order is implementation-specific.

**Recommended workflow**

1. Create the table and capture its ID.
2. Retrieve `content[0].cells` to get the cell ID matrix.
3. Bulk-create child blocks (e.g., textBlock, imageBlock) using `parentBlockId = matrix[row][col]`. Use `afterBlockId` only for ordering siblings inside the same cell.

## TextBlockInput

An object containing the input for creating text blocks.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The text block's alignment.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        delta_format
      </td>

      <td>
        [`[OperationInput!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#operationinput)
      </td>

      <td>
        An array of operations specifying the text block's content and attributes.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text block's display direction.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        parent_block_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the parent block to create the new block under.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        text_block_type 
      </td>

      <td>
        `TextBlock`
      </td>

      <td>
        The text block type. Default is `NORMAL_TEXT`.
      </td>

      <td>
        `CODE`  
        `LARGE_TITLE` (H1)  
        `MEDIUM_TITLE` (H2)  
        `NORMAL_TEXT` (H3)  
        `QUOTE`  
        `SMALL_TITLE`
      </td>
    </tr>
  </tbody>
</Table>

## VideoBlockInput

An object containing the input for creating video blocks.

| Field             | Type      | Description                                                              |
| :---------------- | :-------- | :----------------------------------------------------------------------- |
| parent\_block\_id | `String`  | The unique identifier of the parent block to create the new block under. |
| raw\_url          | `String!` | The raw URL of the video.                                                |
| width             | `Int`     | The width of the video.                                                  |

***

# DocumentBlockV2

An object containing the structured content, hierarchical relationships, and associated metadata of a content block.

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
        Possible Types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        content
      </td>

      <td>
        [`[BlockContent]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#blockcontent)
      </td>

      <td>
        A structured array of the block's content.
      </td>

      <td>
        `DividerContent`  
        `ImageContent`  
        `LayoutContent`  
        `ListBlockContent`  
        `NoticeBoxContent`  
        `PageBreakContent`  
        `TableContent`  
        `TextBlockContent`  
        `VideoContent`
      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `String`
      </td>

      <td>
        The block's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        [`User`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The block's creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        doc_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the doc the block belongs to.
      </td>

      <td>

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
        The block's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        parent_block_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the parent block. Null for top-level blocks.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position
      </td>

      <td>
        `Float`
      </td>

      <td>
        The block's position in the document. Higher numbers indicate placement towards the end of the document.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `String`
      </td>

      <td>
        The block's content type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `String`
      </td>

      <td>
        The block's last updated date.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## BlockContent

An abstract union type representing different types of block content. All of the `BlockContent` types implement the `DocBaseBlockContent` interface. This means they all share the common fields, `alignment` and `direction`, which can be queried through the interface.

| Possible Types                                                                                                     | Description                                                       |
| :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| [`DividerContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#dividercontent)     | An object containing metadata about a divider block's content.    |
| [`ImageContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#imagecontent)         | An object containing metadata about an image block's content.     |
| [`LayoutContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#layoutcontent)       | An object containing metadata about a layout block's content.     |
| [`ListBlockContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#listblockcontent) | An object containing metadata about a list block's content.       |
| [`NoticeBoxContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#noticeboxcontent) | An object containing metadata about a notice box block's content. |
| [`PageBreakContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#pagebreakcontent) | An object containing metadata about a page break block's content. |
| [`TableContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#tablecontent)         | An object containing metadata about a table block's content.      |
| [`TextBlockContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#textblockcontent) | An object containing metadata about a text block's content.       |
| [`VideoContent`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#videocontent)         | An object containing metadata about a video block's content.      |

### DividerContent

An object containing metadata about a divider block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>
  </tbody>
</Table>

### ImageContent

An object containing metadata about an image block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        public_url
      </td>

      <td>
        `String!`
      </td>

      <td>
        The image's public URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        width
      </td>

      <td>
        `Int`
      </td>

      <td>
        The image's width.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### LayoutContent

An object containing metadata about a layout block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        cells
      </td>

      <td>
        [`[Cell!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#cell)
      </td>

      <td>
        1-D array of cells.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_style
      </td>

      <td>
        [`[ColumnStyle!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#columnstyle)
      </td>

      <td>
        The column style configuration.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>
  </tbody>
</Table>

#### Cell

An object containing metadata about a cell within a layout or table block.

| Field     | Type      | Description                                                                                                    |
| :-------- | :-------- | :------------------------------------------------------------------------------------------------------------- |
| block\_id | `String!` | The unique identifier of the block representing the cell (parent block of all the content blocks in the cell). |

#### ColumnStyle

An object containing the column style configuration.

| Field | Type   | Description                    |
| :---- | :----- | :----------------------------- |
| width | `Int!` | The column's width percentage. |

### ListBlockContent

An object containing metadata about a list block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        delta_format
      </td>

      <td>
        [`[Operation!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#operation)
      </td>

      <td>
        An array containing the block's text content in delta format.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        indentation
      </td>

      <td>
        `Int`
      </td>

      <td>
        The indentation level of the list item.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### NoticeBoxContent

An object containing metadata about a notice box block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        theme
      </td>

      <td>
        `NoticeBoxTheme!`
      </td>

      <td>
        The notice box block's theme.
      </td>

      <td>
        `GENERAL`  
        `INFO`  
        `TIPS`  
        `WARNING`
      </td>
    </tr>
  </tbody>
</Table>

### PageBreakContent

An object containing metadata about a page break block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>
  </tbody>
</Table>

### TableContent

An object containing metadata about a table block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        cells
      </td>

      <td>
        [`[TableRow!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#tablerow)
      </td>

      <td>
        2-D array of cells (rows and columns).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_style
      </td>

      <td>
        [`[ColumnStyle!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#columnstyle-1)
      </td>

      <td>
        The column style configuration.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        width
      </td>

      <td>
        `Int`
      </td>

      <td>
        The table's width.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

#### **ColumnStyle**

An object containing the column style configuration.

| Field | Type   | Description                    |
| :---- | :----- | :----------------------------- |
| width | `Int!` | The column's width percentage. |

#### **TableRow**

An object containing the table row's configuration.

| Field      | Type                                                                                           | Description      |
| :--------- | :--------------------------------------------------------------------------------------------- | :--------------- |
| row\_cells | [`[Cell!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#cell) | The row's cells. |

### TextBlockContent

An object containing metadata about a text block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        delta_format
      </td>

      <td>
        [`[Operation!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#operation)
      </td>

      <td>
        An array containing the block's text content in delta format.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>
  </tbody>
</Table>

### VideoContent

An object containing metadata about a video block's content.

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
        alignment
      </td>

      <td>
        `BlockAlignment`
      </td>

      <td>
        The alignment of the block's content.
      </td>

      <td>
        `CENTER`  
        `LEFT`  
        `RIGHT`
      </td>
    </tr>

    <tr>
      <td>
        direction
      </td>

      <td>
        `BlockDirection`
      </td>

      <td>
        The text direction of the block's content.
      </td>

      <td>
        `LTR`  
        `RTL`
      </td>
    </tr>

    <tr>
      <td>
        url
      </td>

      <td>
        `String!`
      </td>

      <td>
        The video's raw URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        width
      </td>

      <td>
        `Int`
      </td>

      <td>
        The video's width.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Operation

An array of operations specifying the block's text content and attributes.

| Field      | Type                                                                                                   | Description                                                |
| :--------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| attributes | [`Attributes`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#attributes) | An object containing the optional text formatting options. |
| insert     | [`InsertOps`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#insertops)   | An object containing the content to insert.                |

## Attributes

An object containing the optional text formatting options.

| Field      | Type      | Description                                            |
| :--------- | :-------- | :----------------------------------------------------- |
| background | `String`  | The background color (HEX, RGB, or named color).       |
| bold       | `Boolean` | Whether to apply bold formatting to the text.          |
| code       | `Boolean` | Whether to apply code formatting to the text.          |
| color      | `String`  | The text's color (HEX, RGB, or named color).           |
| italic     | `Boolean` | Whether to apply italic formatting to the text.        |
| link       | `String`  | The URL to create a hyperlink with.                    |
| strike     | `Boolean` | Whether to apply strikethrough formatting to the text. |
| underline  | `Boolean` | Whether to apply underline formatting to the text.     |

## InsertOps

An object containing the content to insert.

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
        Possible Types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        blot
      </td>

      <td>
        `BlotContent`
      </td>

      <td>
        The structured data within a text block.
      </td>

      <td>
        [`DocsColumnValue`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#docscolumnvalue)  
        [`Mention`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#mention)
      </td>
    </tr>

    <tr>
      <td>
        text
      </td>

      <td>
        `String`
      </td>

      <td>
        The plain text content.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### DocsColumnValue

An object containing the column value reference for displaying board item column data.

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| column\_id | `String` | The column's unique identifier. |
| item\_id   | `Int`    | The item's unique identifier.   |

### Mention

An object containing the mention metadata for user or document references.

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
        id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the mentioned user or document.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `DocsMention`
      </td>

      <td>
        The mention's type.
      </td>

      <td>
        `BOARD`  
        `DOC`  
        `USER`
      </td>
    </tr>
  </tbody>
</Table>

# OperationInput

An array of operations specifying the block's text content and attributes.

| Field      | Type                                                                                                             | Description                                                |
| :--------- | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| attributes | [`AttributesInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#attributesinput) | An object containing the optional text formatting options. |
| insert     | [`InsertOpsInput!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#insertopsinput)  | An object containing the content to insert.                |

## AttributesInput

An object containing the optional text formatting options.

| Field      | Type      | Description                                            |
| :--------- | :-------- | :----------------------------------------------------- |
| background | `String`  | The background color (HEX, RGB, or named color).       |
| bold       | `Boolean` | Whether to apply bold formatting to the text.          |
| code       | `Boolean` | Whether to apply code formatting to the text.          |
| color      | `String`  | The text's color (HEX, RGB, or named color).           |
| italic     | `Boolean` | Whether to apply italic formatting to the text.        |
| link       | `String`  | The URL to create a hyperlink with.                    |
| strike     | `Boolean` | Whether to apply strikethrough formatting to the text. |
| underline  | `Boolean` | Whether to apply underline formatting to the text.     |

## InsertOpsInput

An object containing the content to insert.

| Field | Type                                                                                                 | Description                              |
| :---- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| blot  | [`BlotInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#blotinput) | The structured data within a text block. |
| text  | `String`                                                                                             | The plain text content.                  |

### BlotInput

An object containing the structured data within a text block.

| Field         | Type                                                                                                                       | Description                                                       |
| :------------ | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| column\_value | [`DocsColumnValueInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#docscolumnvalueinput) | The column value reference for displaying board item column data. |
| mention       | [`MentionInput`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#mentioninput)                 | The mention metadata for user or document references.             |

#### **DocsColumnValueInput**

An object containing the column value reference for displaying board item column data.

| Field      | Type      | Description                     |
| :--------- | :-------- | :------------------------------ |
| column\_id | `String!` | The column's unique identifier. |
| item\_id   | `Int!`    | The item's unique identifier.   |

#### **MentionInput**

An object containing the mention metadata for user or document references.

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
        id
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The unique identifier of the mentioned user or document.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `DocsMention!`
      </td>

      <td>
        The mention's type.
      </td>

      <td>
        `BOARD`  
        `DOC`  
        `USER`
      </td>
    </tr>
  </tbody>
</Table>
