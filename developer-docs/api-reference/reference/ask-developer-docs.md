---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Ask Developer Docs

Query monday.com developer documentation with AI to get answers about app development and API usage

Query monday.com's developer documentation using AI to get answers about app development.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Queries

## `ask_developer_docs`

Returns an AI-generated answer based on monday.com developer documentation.

### Arguments

| Argument | Type      | Description                       |
| :------- | :-------- | :-------------------------------- |
| `query`  | `String!` | The question or topic to look up. |

### Returns

`AppDocumentationAiResponse` — includes identifiers and text you can use for follow-up turns.

| Field             | Type     | Description                                                      |
| :---------------- | :------- | :--------------------------------------------------------------- |
| `id`              | `ID`     | Identifier for this response.                                    |
| `question`        | `String` | The question that was processed.                                 |
| `answer`          | `String` | The AI-generated answer.                                         |
| `conversation_id` | `String` | Pass this on subsequent calls to continue the same conversation. |

### Example

```graphql GraphQL
query {
  ask_developer_docs(query: "How do I create a board using the API?") {
    id
    question
    answer
    conversation_id
  }
}
```
