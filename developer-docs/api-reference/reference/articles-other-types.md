---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types used by the articles and knowledge base APIs

The monday.com [articles](https://developer.monday.com/api-reference/reference/articles) APIs let you create, publish, search, and delete knowledge base articles.

The types below are returned by articles-related queries and mutations (and related APIs), and are not independently queryable at the root.

***

# ArticleMetadata

Metadata for a knowledge base article: identifiers, visibility, location, lifecycle state, and people.

| Field          | Type          | Description                                                       |
| :------------- | :------------ | :---------------------------------------------------------------- |
| `object_id`    | `ID`          | The article’s object ID.                                          |
| `name`         | `String`      | Display name of the article.                                      |
| `privacy_kind` | `PrivacyKind` | Visibility level (for example `PRIVATE` or `PUBLIC`).             |
| `workspace_id` | `ID`          | Workspace that contains the article.                              |
| `folder_id`    | `ID`          | Folder the article is filed under, if any.                        |
| `state`        | `String`      | Lifecycle state of the article (for example draft vs. published). |
| `owners`       | —             | Users and teams that own the article.                             |
| `subscribers`  | —             | Users and teams subscribed to the article when it is private.     |

***

# KnowledgeBaseAnswer

Result of the [`knowledge_base_search`](https://developer.monday.com/api-reference/reference/articles#knowledge-base-search) query: an AI-generated answer plus the raw snippets that grounded it.

| Field          | Type                                                                                                                     | Description                                       |
| :------------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| `answer`       | `String`                                                                                                                 | Generated answer text.                            |
| `raw_snippets` | [`[SnippetSearchResult]`](https://developer.monday.com/api-reference/reference/articles-other-types#snippetsearchresult) | Matching source snippets from the knowledge base. |

***

# SnippetSearchResult

A single snippet returned inside `KnowledgeBaseAnswer.raw_snippets`.

| Field       | Type     | Description                                                 |
| :---------- | :------- | :---------------------------------------------------------- |
| `id`        | `String` | Snippet identifier.                                         |
| `title`     | `String` | Title or heading of the snippet source.                     |
| `text`      | `String` | Snippet body text.                                          |
| `parent_id` | `String` | Parent object or snippet ID, when applicable.               |
| `distance`  | `Float`  | Relevance score from vector search (lower is often closer). |
| `url`       | `String` | Link to the source in the product, when available.          |

***

# AppDocumentationAiResponse

Returned by the `ask_developer_docs` query (developer documentation AI). It is not specific to knowledge base articles but shares the same AI response pattern.

| Field             | Type     | Description                                                 |
| :---------------- | :------- | :---------------------------------------------------------- |
| `id`              | `String` | Identifier for this response.                               |
| `question`        | `String` | The question that was asked.                                |
| `answer`          | `String` | The generated answer.                                       |
| `conversation_id` | `String` | Conversation ID for follow-up questions in the same thread. |
