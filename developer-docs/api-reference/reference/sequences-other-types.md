---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the sequences API

The monday.com [sequences](https://developer.monday.com/api-reference/reference/sequences) API supports listing enrollable email sequences and enrolling board items into those sequences.

The types below are used by the sequences query and mutation, and are not independently queryable.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Sequence

An object representing an email sequence that items can be enrolled in.

| Field          | Type                                  | Description                                  |
| :------------- | :------------------------------------ | :------------------------------------------- |
| `id`           | `ID!`                                 | The sequence's unique identifier.            |
| `title`        | `String`                              | Display title.                               |
| `status`       | [`SequenceStatus`](#sequencestatus)   | Lifecycle state of the sequence.             |
| `context_type` | [`SequenceContext`](#sequencecontext) | Scope of the sequence (e.g., board).         |
| `context_id`   | `ID`                                  | Identifier for the context (e.g., board ID). |
| `user_id`      | `ID`                                  | User associated with the sequence.           |
| `step_count`   | `Int`                                 | Number of steps in the sequence.             |
| `duration`     | `Int`                                 | Total duration associated with the sequence. |
| `created_at`   | `Date`                                | Creation timestamp.                          |
| `updated_at`   | `Date`                                | Last update timestamp.                       |

***

# SequenceStatus

An enum describing the state of a sequence.

| Enum Value       | Description                                        |
| :--------------- | :------------------------------------------------- |
| `ACTIVE`         | Sequence is active and can be used for enrollment. |
| `INACTIVE`       | Sequence is disabled.                              |
| `MISSING_CONFIG` | Sequence is missing required configuration.        |
| `DELETED`        | Sequence has been deleted.                         |

***

# SequenceContext

An enum describing where a sequence is scoped.

| Enum Value | Description                                  |
| :--------- | :------------------------------------------- |
| `BOARD`    | Sequence is associated with a board context. |

***

# EnrollToSequenceInput

Input for enrolling items into a sequence.

| Field         | Type     | Description                                      |
| :------------ | :------- | :----------------------------------------------- |
| `sequence_id` | `ID!`    | The sequence to enroll items into.               |
| `board_id`    | `ID!`    | The board containing the items.                  |
| `item_ids`    | `[ID!]!` | Items to enroll. Maximum **50** IDs per request. |

***

# EnrollToSequenceResult

Result of the `enroll_items_to_sequence` mutation.

| Field                | Type    | Description                               |
| :------------------- | :------ | :---------------------------------------- |
| `succeeded_item_ids` | `[ID!]` | Item IDs that were enrolled successfully. |
| `failed_item_ids`    | `[ID!]` | Item IDs that could not be enrolled.      |
