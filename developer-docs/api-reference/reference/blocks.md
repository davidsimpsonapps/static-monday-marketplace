---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Blocks

Learn how to read, create, update, and delete doc blocks inside of monday docs using the platform API

[Workdocs](https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs) are comprised of various components called document blocks, or blocks. Blocks contain different types of content, including text, code, lists, titles, images, videos, and quotes.

# Queries

## Get blocks

* **Required scope:`docs:read`**
* Returns an array containing metadata about one or a collection of blocks
* Can only be nested with a [`docs`](https://developer.monday.com/api-reference/docs/docs) query

```graphql GraphQL (&#x60;ids&#x60; argument)
query {
  docs(ids:1234567) { # the ID returned when querying `docs`
    blocks {
      id
      type
      content
    }
  }
}
```
```graphql GraphQL (&#x60;object_ids&#x60; argument)
query {
  docs(object_ids:1234567) { # the ID in the URL
    blocks {
      id
      type
      content
    }
  }
}
```

### Arguments

| Argument | Type  | Description                                     |
| :------- | :---- | :---------------------------------------------- |
| limit    | `Int` | The number of blocks to get. The default is 25. |
| page     | `Int` | The page number to return. Starts at 1.         |

### Fields

| Field             | Type      | Description                                                                                                                                                                                                             |
| :---------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| created\_at       | `Date`    | The block's creation date. Returned in *YYYY-MM-DD* format.                                                                                                                                                             |
| created\_by       | `User`    | The block's creator.                                                                                                                                                                                                    |
| doc\_id           | `ID`      | The document's unique identifier. In the UI, this ID appears in the top-left corner of the document when [Developer Mode](https://developer.monday.com/api-reference/docs/getting-started#developer-mode) is activated. |
| id                | `String!` | The block's unique identifier.                                                                                                                                                                                          |
| parent\_block\_id | `String`  | The parent block's unique identifier. First-level blocks will return `null`.                                                                                                                                            |
| position          | `Float`   | The block's position in the document.                                                                                                                                                                                   |
| type              | `String`  | The block's content type.                                                                                                                                                                                               |
| updated\_at       | `Date`    | The date the block was last updated. Returned in *YYYY-MM-DD* format.                                                                                                                                                   |
| content           | `JSON`    | The block's content.                                                                                                                                                                                                    |

### Content field

The `content` field will return different information based on the block type. You can view a sample payload for each block type below, but keep in mind that the API will return payloads in a slightly different format using escaped JSON.

```json Text
{
  "id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
  "type": "normal text", // "normal text", "large title", "medium title", "small title", or "quote"
  "content": {
    "alignment": "left", // "left", "center", or "right"
    "direction": "ltr", // "ltr" or "rtl"
    "deltaFormat": [{
      "insert": "document block text",
      "attributes": { // description of the text
        "bold": true, // bold text
        "underline": true, // underlined text
        "strike": true, // text with strike through
        "color": "var(--color-saladish)", // text with font color
        "background": "var(--color-river-selected)" // text with background color
      }
    }]
  }
}
```
```json List
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "check list", // "bulleted list", "numbered list", or "check list"
	"content": {
		"alignment": "right", // "left", "right", or "center"
		"direction": "rtl", // "ltr" or "rtl"
		"deltaFormat": [{
			"insert": "block 1"
		}],
		"indentation": 1,
		"checked": true // checks or unchecks a box
	}
}
```
```json Table and layout
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "table", // "table" or "layout"
	"content": {
		"cells": [ // the table's rows
			[{
					"blockId": "7f8c145-989f-48bb-b7f8-dc8f91690g42" // ID of the child block
				},
				{
					"blockId": "8g9d256-090g-59cc-c8g9-ed9g02701h53" // ID of the child block
				}
			]
		],
		"alignment": "right", // "left", "right", or "center"
		"direction": "rtl", // "ltr" or "rtl"
		"columnsStyle": [{ // size of the column by percent - the sum of these values has to be 100
				"width": 50
			},
			{
				"width": 50
			}
		]
	}
}
```
```json Notice box
{
  "id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
  "type": "notice box", 
  "content": {
  	"theme": "info", // "tips", "warning", or "general"
  	"direction": "ltr", // "ltr" or "rtl"
  	"alignment": "left" // "left", "right", or "center"
  }
}
```
```json GIF
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "gif",
	"content": {
		"id": "123abc456def",
		"url": "https://media2.giphy.com/media/123abc456def/311x.gif?cid=1d9492h43&rid=200w.gif&ct=g",
		"width": 278,
		"alignment": "center", // "left", "right", or "center"
		"direction": "ltr", // "ltr" or "rtl"
		"aspectRatio": ""
	}
}
```
```json Image: monday asset
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "image",
	"content": {
		"url": "https://monday.monday.com/test/resources/123456789/testimage.png",
		"width": "900",
		"assetId": 123456789,
		"alignment": "center", // "left", "right", or "center"
		"direction": "ltr", // "ltr" or "rtl"
		"aspectRatio": "2380x1230"
	}
}
```
```json Image: public URL
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "image",
	"content": {
		"width": 123, // changes the size of the image
		"publicUrl": "https://www.test.com/static/download/testimage.png",
		"direction": "rtl", // "ltr" or "rtl"
		"alignment": "right" // "left", "right", or "center"
	}
}
```
```json Video: monday asset
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "video",
	"content": {
		"url": "https://monday.monday.com/test/987654321/testvideo.mov",
		"width": 613,
		"assetId": 987654321,
		"alignment": "center", // "left", "right", or "center"
		"direction": "ltr", // "ltr" or "rtl"
		"aspectRatio": null
	}
}
```
```json Video: raw URL
{
	"id": "7f8c145-989f-48bb-b7f8-dc8f91690g42",
	"type": "video",
	"content": {
		"url": null,
		"width": 450,
		"rawUrl": "https://www.youtube.com/watch?v=123abc",
		"assetId": null,
		"alignment": "left", // "left", "right", or "center"
		"direction": "ltr", // "ltr" or "rtl"
		"embedData": {
			"embedlyData": {
				"url": "https://www.youtube.com/watch?v=123abc",
				"html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F123abc&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D123abc&image=http%3A%2F%2Fi.ytimg.com%2Fvi%2F123abc%2Fhqdefault.jpg&key=60f4bf4bdbb750b6b09783043556f314&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
				"type": "video",
				"title": "Sample video title",
				"width": 854,
				"height": 480,
				"version": "1.0",
				"author_url": "https://www.youtube.com/monday.com",
				"author_name": "monday.com",
				"description": "This is a sample monday.com video",
				"provider_url": "http://youtube.com",
				"provider_name": "YouTube",
				"thumbnail_url": "http://i.ytimg.com/vi/3lrXMmciw2N/hqdefault.jpg",
				"thumbnail_width": 480,
				"thumbnail_height": 360
			}
		}
	}
}
```

# Mutations

**Required scope:`docs:write`**

## Create doc block

Creates a new doc block. Returns [`DocumentBlock`](https://developer.monday.com/api-reference/docs/blocks#fields).

Alternatively, you can add a new document block using the [SDK](https://developer.monday.com/apps/docs/mondayexecute#add-document-block).

```graphql GraphQL
mutation {
  create_doc_block(
    type: normal_text, 
    doc_id: 1234567, 
    after_block_id: "7f8c145-989f-48bb-b7f8-dc8f91690g42", 
    content: "{\"alignment\":\"left\",\"direction\":\"ltr\",\"deltaFormat\":[{\"insert\":\"new block\"}]}"
	) {
    id
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
        after_block_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the block that will be above the new block. Used to specify where in the doc the new block should go. Without this argument, the new block will appear at the top of the doc.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        doc_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The document's unique identifier.
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
        The parent block's ID under which the new block will be created.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `DocBlockContentType!`
      </td>

      <td>
        The block's content type.
      </td>

      <td>
        `bulleted_list`  
        `check_list`  
        `code`  
        `divider`  
        `image`  
        `large_title`  
        `layout`  
        `medium_title`  
        `normal_text`  
        `notice_box`, `numbered_list`  
        `page_break`  
        `quote`  
        `small_title`  
        `table`  
        `video`
      </td>
    </tr>

    <tr>
      <td>
        content 
      </td>

      <td>
        `DocBlockContentType!`
      </td>

      <td>
        The block's content.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

#### **Content argument**

When creating a block, the content must follow proper JSON syntax and include all required attributes.

For text blocks and most other block types, all attributes are optional. You can use the same fields and attributes returned when you [query](https://developer.monday.com/api-reference/docs/blocks#content-field) the block's content.

**Tables** have two required attributes: `column_count` and `row_count`. Tables can have up to 25 rows and 10 columns. You cannot update table dimensions after they are set. The `column_style` attribute is optional, but you can use it to specify the size of each cell. The sum of each cell's width must equal 100.

**Layouts** require the `column_count` field, which determines the size of your layout. You can use the optional `column_style` attribute to determine the size of each cell in the layout. The sum of each cell's width must equal 100.

## Create doc blocks

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Creates up to 25 doc blocks in bulk. Returns [`[DocumentBlockV2!]`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#documentblockv2).

```graphql GraphQL
mutation {
  create_doc_blocks(
    docId: 12345
    blocksInput: [
      {
        text_block: {
          text_block_type: QUOTE
          delta_format: [
            {
              insert: {
                text: "The best way to predict the future is to create it."
              }
              attributes: {
                italic: true
                color: "#666666"
              }
            }
            {
              insert: {
                text: "Peter Drucker"
              }
              attributes: {
                bold: true
                color: "#999999"
              }
            }
          ]
        }
      }
      {
        text_block: {
          text_block_type: LARGE_TITLE
          delta_format: [
            {
              insert: {
                text: "This quote highlights the power of action and ownership."
              }
            }
          ]
        }
      }
      {
        notice_box_block: {
          theme: TIPS
        }
      }
      {
        list_block: {
          list_block_type: BULLETED_LIST
          delta_format: [
            {
              insert: {
                text: "Set clear objectives"
              }
            }
          ]
        }
      }
      {
        list_block: {
          list_block_type: BULLETED_LIST
          delta_format: [
            {
              insert: {
                text: "Take small, consistent steps"
              }
            }
          ]
        }
      }
      {
        list_block: {
          list_block_type: BULLETED_LIST
          delta_format: [
            {
              insert: {
                text: "Review and adjust regularly"
              }
            }
          ]
        }
      }
      {
        page_break_block: {}
      }
    ]
  ) {
    doc_id
    id
    type
    position
    content {
      ... on TextBlockContent {
        delta_format {
          insert {
            text
          }
        }
      }
      ... on ListBlockContent {
        delta_format {
          insert {
            text
          }
        }
      }
    }
  }
}

```
```json JSON
{
  "data": {
    "create_doc_blocks": [
      {
        "doc_id": "12345",
        "id": "11111111-1111-1111-1111-111111111111",
        "type": "quote",
        "position": 100000,
        "content": [
          {
            "delta_format": [
              {
                "insert": {
                  "text": "The best way to predict the future is to create it."
                }
              },
              {
                "insert": {
                  "text": "Peter Drucker"
                }
              }
            ]
          }
        ]
      },
      {
        "doc_id": "12345",
        "id": "22222222-2222-2222-2222-222222222222",
        "type": "large title",
        "position": 141250,
        "content": [
          {
            "delta_format": [
              {
                "insert": {
                  "text": "This quote highlights the power of action and ownership."
                }
              }
            ]
          }
        ]
      },
      {
        "doc_id": "12345",
        "id": "33333333-3333-3333-3333-333333333333",
        "type": "notice box",
        "position": 189875,
        "content": [
          {}
        ]
      },
      {
        "doc_id": "12345",
        "id": "44444444-4444-4444-4444-444444444444",
        "type": "bulleted list",
        "position": 235420,
        "content": [
          {
            "delta_format": [
              {
                "insert": {
                  "text": "Set clear objectives"
                }
              }
            ]
          }
        ]
      },
      {
        "doc_id": "12345",
        "id": "55555555-5555-5555-5555-555555555555",
        "type": "bulleted list",
        "position": 287965,
        "content": [
          {
            "delta_format": [
              {
                "insert": {
                  "text": "Take small, consistent steps"
                }
              }
            ]
          }
        ]
      },
      {
        "doc_id": "12345",
        "id": "66666666-6666-6666-6666-666666666666",
        "type": "bulleted list",
        "position": 346780,
        "content": [
          {
            "delta_format": [
              {
                "insert": {
                  "text": "Review and adjust regularly"
                }
              }
            ]
          }
        ]
      },
      {
        "doc_id": "12345",
        "id": "77777777-7777-7777-7777-777777777777",
        "type": "page break",
        "position": 412555,
        "content": [
          {}
        ]
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}

```

### Arguments

| Argument     | Type                                                                                                                   | Description                                                                                                                                                                                                                                                                 |
| :----------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| afterBlockId | `String`                                                                                                               | The unique identifier of the block that will be above the new block. Used to specify where in the doc the new blocks should go. Without this argument, the new blocks will be inserted either by their `parentBlockId` or at the end of the document in the provided order. |
| blocksInput  | [`[CreateBlockInput!]!`](https://developer.monday.com/api-reference/reference/doc-blocks-other-types#createblockinput) | An array of block inputs. Each input must specify one block type. Maximum of 25 blocks per request.                                                                                                                                                                         |
| docId        | `ID!`                                                                                                                  | The document's unique identifier.                                                                                                                                                                                                                                           |

## Update doc block

Updates a doc block. Returns [`DocumentBlock`](https://developer.monday.com/api-reference/docs/blocks#fields).

Alternatively, you can update a document block using the [SDK](https://developer.monday.com/apps/docs/mondayexecute#update-document-block).

```graphql GraphQL
mutation {
  update_doc_block(
    block_id: "7f8c145-989f-48bb-b7f8-dc8f91690g42"
    content: "{\"alignment\":\"left\",\"direction\":\"ltr\",\"deltaFormat\":[{\"insert\":\"new block\"}]}"
  ) {
    id
  }
}
```

### Arguments

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| block\_id | `String!` | The block's unique identifier. |
| content   | `JSON!`   | The block's content.           |

#### **Content argument**

When updating a block, the content must follow proper JSON syntax and include all required attributes.

For text blocks and most other block types, all attributes are optional. You can use the same fields and attributes returned when you [query](https://developer.monday.com/api-reference/docs/blocks#content-field) the block's content.

**Tables** have two required attributes: `column_count` and `row_count`.  The maximum value for each is 5; you cannot change the values after they have been set. The `column_style` attribute is optional, but you can use it to specify the size of each cell. The sum of each cell's width must equal 100.

**Layouts** have one required attribute: `column_count`. Optionally, you can also use the `column_style` attribute to determine the size of each cell in the layout. The sum of each cell's width must equal 100.

## Delete doc block

Deletes a doc block. Returns [`DocumentBlock`](https://developer.monday.com/api-reference/docs/blocks#fields).

```graphql GraphQL
mutation { 
  delete_doc_block(block_id: "7f8c145-989f-48bb-b7f8-dc8f91690g42") {
    id
  }
}
```

### Arguments

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| block\_id | `String!` | The block's unique identifier. |
