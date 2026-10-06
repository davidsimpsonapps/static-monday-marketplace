---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Articles

Learn how to read, create, publish, and delete knowledge base articles using the platform API

**Articles** are part of monday.com's [Knowledge Base](https://support.monday.com/) feature. They let teams create and share knowledge articles inside <Glossary>workspaces</Glossary>, so documentation stays organized and easy to find.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Queries

## Get articles

Returns published articles for the given object IDs. Each **Article** includes a `metadata` object and a `blocks` array (the first page of content blocks; use [`article_blocks`](#get-article-blocks) to load more).

* **Required scope: `docs:read`**
* Returns `[Article]!`
* Can only be queried at the root; can't be nested inside another field

```graphql GraphQL
query {
  articles(
    object_ids: [1234567890]
    workspace_ids: [9876543210]
    limit: 25
    page: 1
  ) {
    metadata {
      object_id
      name
      state
    }
    blocks {
      id
    }
  }
}
```

### Arguments

| Argument        | Type     | Description                                                       |
| :-------------- | :------- | :---------------------------------------------------------------- |
| `object_ids`    | `[ID!]!` | Required. Article object IDs (for example, from the article URL). |
| `workspace_ids` | `[ID!]`  | Optional. Limit results to these workspaces.                      |
| `limit`         | `Int`    | Max articles per page. Default: `25`.                             |
| `page`          | `Int`    | Page number (1-based). Default: `1`.                              |

***

## Get article blocks

Returns paginated content blocks for the **published** version of a single article, when the requesting user has access.

* **Required scope: `docs:read`**
* Returns `[ArticleBlock]!`
* Can only be queried at the root; can't be nested inside another field

```graphql GraphQL
query {
  article_blocks(object_id: "1234567890", limit: 25, page: 1) {
    id
  }
}
```

### Arguments

| Argument    | Type  | Description                          |
| :---------- | :---- | :----------------------------------- |
| `object_id` | `ID!` | The article's object ID.             |
| `limit`     | `Int` | Max blocks per page. Default: `25`.  |
| `page`      | `Int` | Page number (1-based). Default: `1`. |

***

## Knowledge base search

Runs an **AI-powered** search across the knowledge base: it returns an LLM-generated answer plus the underlying source snippets.

* **Required scope: `docs:read`**
* Returns [`KnowledgeBaseAnswer`](https://developer.monday.com/api-reference/reference/articles-other-types#knowledgebaseanswer)
* Can only be queried at the root; can't be nested inside another field

```graphql GraphQL
query {
  knowledge_base_search(query: "How do I reset a password?", limit: 5) {
    answer
    raw_snippets {
      id
      title
      text
      url
    }
  }
}
```

### Arguments

| Argument | Type      | Description                             |
| :------- | :-------- | :-------------------------------------- |
| `query`  | `String!` | Natural-language search text.           |
| `limit`  | `Int`     | Max snippets to consider. Default: `5`. |

### Fields (`KnowledgeBaseAnswer`)

| Field          | Type                                                                                                                     | Description                                  |
| :------------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `answer`       | `String`                                                                                                                 | Generated answer text from the model.        |
| `raw_snippets` | [`[SnippetSearchResult]`](https://developer.monday.com/api-reference/reference/articles-other-types#snippetsearchresult) | Matching source snippets used for grounding. |

***

# Mutations

**Required scope: `docs:write`**

## Create article

Creates a new knowledge base article (draft). Returns [`ArticleMetadata`](https://developer.monday.com/api-reference/reference/articles-other-types#articlemetadata).

```graphql GraphQL
mutation {
  create_article(
    name: "Getting started"
    workspace_id: "1234567890"
    folder_id: "9876543210"
  ) {
    object_id
    name
    workspace_id
  }
}
```

### Arguments

| Argument       | Type     | Description                                 |
| :------------- | :------- | :------------------------------------------ |
| `name`         | `String` | Optional display name for the article.      |
| `workspace_id` | `ID!`    | Workspace where the article is created.     |
| `folder_id`    | `ID`     | Optional folder to place the article under. |

***

## Publish article

Publishes a draft article and sets visibility and subscribers. Subscriber add/remove arguments apply when `privacy_kind` is `PRIVATE`. Returns [`ArticleMetadata`](https://developer.monday.com/api-reference/reference/articles-other-types#articlemetadata).

```graphql GraphQL
mutation {
  publish_article(
    object_id: "1234567890"
    privacy_kind: PUBLIC
    folder_id: "9876543210"
    add_subscriber_ids: [111, 222]
    add_subscriber_team_ids: [333]
    remove_subscriber_ids: []
    remove_subscriber_team_ids: []
  ) {
    object_id
    privacy_kind
    state
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>object_id</code></td>
      <td><code>ID!</code></td>
      <td>The article&apos;s object ID.</td>
      <td></td>
    </tr>
    <tr>
      <td><code>privacy_kind</code></td>
      <td><code>PrivacyKind!</code></td>
      <td>Whether the article is visible only to subscribers or workspace-wide.</td>
      <td><code>PRIVATE</code>, <code>PUBLIC</code></td>
    </tr>
    <tr>
      <td><code>folder_id</code></td>
      <td><code>ID</code></td>
      <td>Optional folder for the published article.</td>
      <td></td>
    </tr>
    <tr>
      <td><code>add_subscriber_ids</code></td>
      <td><code>[ID!]</code></td>
      <td>User IDs to add as subscribers (private articles).</td>
      <td></td>
    </tr>
    <tr>
      <td><code>add_subscriber_team_ids</code></td>
      <td><code>[ID!]</code></td>
      <td>Team IDs to add as subscriber groups (private articles).</td>
      <td></td>
    </tr>
    <tr>
      <td><code>remove_subscriber_ids</code></td>
      <td><code>[ID!]</code></td>
      <td>User IDs to remove from subscribers.</td>
      <td></td>
    </tr>
    <tr>
      <td><code>remove_subscriber_team_ids</code></td>
      <td><code>[ID!]</code></td>
      <td>Team IDs to remove from subscribers.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## Delete article

Deletes an article by object ID. Returns [`ArticleMetadata`](https://developer.monday.com/api-reference/reference/articles-other-types#articlemetadata).

```graphql GraphQL
mutation {
  delete_article(object_id: "1234567890") {
    object_id
    state
  }
}
```

### Arguments

| Argument    | Type  | Description            |
| :---------- | :---- | :--------------------- |
| `object_id` | `ID!` | The article to delete. |
