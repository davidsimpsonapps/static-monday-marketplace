---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Export markdown from doc

Learn how to export markdown from a monday doc using the platform API

[Workdocs](https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs) serve as a central place for teams to plan and execute work collaboratively. They're like virtual whiteboards that allow you to jot down notes, create charts, and populate items on a board from the text you type.

Docs enable teams to collaborate in real time without overwriting each other's work. Users can even use built-in features like widgets, templates, and apps to enhance their docs. When teams need to take that content outside monday, they can export whole docs (or specific blocks) to Markdown.

# Queries

## Get export markdown from doc

* **Required scope:`docs:read`**
* Returns an object containing a document's markdown content
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  export_markdown_from_doc(
    docId: 12345, 
    blockIds: ["e4b1c79a-5f2d-4c83-b1a7-0f9e2d6c3a58", "3a7f2c18-91d4-4b6e-a3f2-7c9e12b4d5a6"]
  ){
    error
    markdown
    success
  }
}
```

### Arguments

| Argument | Type        | Description                                                                                                         |
| :------- | :---------- | :------------------------------------------------------------------------------------------------------------------ |
| blockIds | `[String!]` | The unique identifier of the specific blocks to export. If omitted, this will export the entire document's content. |
| docId    | `ID!`       | The unique identifier of the document to export.                                                                    |

### Fields

| Field    | Type       | Description                                                                                                  |
| :------- | :--------- | :----------------------------------------------------------------------------------------------------------- |
| error    | `String`   | The errors that occurred while exporting markdown from a doc. Use this field to check for calls that failed. |
| markdown | `String`   | The exported markdown content as a string.                                                                   |
| success  | `Boolean!` | Whether the document content was successfully exported as markdown.                                          |
