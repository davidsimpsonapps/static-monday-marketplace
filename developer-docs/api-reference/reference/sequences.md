---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Sequences

Learn how to list email sequences available for enrollment and enroll board items into multi-step email outreach workflows using the platform API

Email sequences allow teams to automate multi-step email outreach workflows for items on a board.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Queries

## `allowed_sequences_to_enroll`

Returns sequences available for enrollment on a board.

### Arguments

| Argument   | Type  | Description                                 |
| :--------- | :---- | :------------------------------------------ |
| `board_id` | `ID!` | The board to list enrollable sequences for. |

### Returns

`[Sequence!]` — see [Sequence](sequences-other-types.md#sequence) for field details.

### Example

```graphql GraphQL
query {
  allowed_sequences_to_enroll(board_id: "1234567890") {
    id
    title
    status
    context_type
    context_id
    user_id
    step_count
    duration
    created_at
    updated_at
  }
}
```

***

# Mutations

## `enroll_items_to_sequence`

Enrolls items into an email sequence. You can enroll up to **50** items per request.

### Arguments

| Argument | Type                     | Description                                                                  |
| :------- | :----------------------- | :--------------------------------------------------------------------------- |
| `input`  | `EnrollToSequenceInput!` | See [EnrollToSequenceInput](sequences-other-types.md#enrolltosequenceinput). |

### Returns

[`EnrollToSequenceResult`](sequences-other-types.md#enrolltosequenceresult) — includes `succeeded_item_ids` and `failed_item_ids`.

### Example

```graphql GraphQL
mutation {
  enroll_items_to_sequence(
    input: {
      sequence_id: "9876543210"
      board_id: "1234567890"
      item_ids: ["111", "222", "333"]
    }
  ) {
    succeeded_item_ids
    failed_item_ids
  }
}
```

***

## Fields on `Sequence`

| Field          | Type                                                          | Description                                                                 |
| :------------- | :------------------------------------------------------------ | :-------------------------------------------------------------------------- |
| `id`           | `ID!`                                                         | The sequence's unique identifier.                                           |
| `title`        | `String`                                                      | Display title.                                                              |
| `status`       | [`SequenceStatus`](sequences-other-types.md#sequencestatus)   | Lifecycle state of the sequence.                                            |
| `context_type` | [`SequenceContext`](sequences-other-types.md#sequencecontext) | Where the sequence applies (e.g., board-scoped).                            |
| `context_id`   | `ID`                                                          | Identifier for the context (e.g., board ID when `context_type` is `BOARD`). |
| `user_id`      | `ID`                                                          | Identifier of the user associated with the sequence.                        |
| `step_count`   | `Int`                                                         | Number of steps in the sequence.                                            |
| `duration`     | `Int`                                                         | Total duration associated with the sequence.                                |
| `created_at`   | `Date`                                                        | When the sequence was created.                                              |
| `updated_at`   | `Date`                                                        | When the sequence was last updated.                                         |

For input and result types, see [Other types](sequences-other-types.md).
