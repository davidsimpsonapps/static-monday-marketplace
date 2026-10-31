---
updatedAt: 2026-10-30T11:35:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the dependencies APIs

The monday.com [dependencies](https://developer.monday.com/api-reference/docs/dependencies) APIs enable you to read the dependency predecessors of the items on a board.

The types below are used by the dependencies queries, and are not independently queryable.

# BoardDependencies

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

A page of items with their dependency predecessor edges for a board. Returned by the `board_dependencies` query.

| Field        | Type                                   | Description                                                  |
| :----------- | :------------------------------------- | :----------------------------------------------------------- |
| items        | [`[ItemDependency!]`](#itemdependency) | The items on the current page, with their predecessor edges. |
| total\_count | `Int`                                  | The total number of items across all pages.                  |

***

# ItemDependency

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An item and all its dependency predecessor edges. Returned by the `item_dependency` query and in the `items` field of [`BoardDependencies`](#boarddependencies).

| Field        | Type                                   | Description                                   |
| :----------- | :------------------------------------- | :-------------------------------------------- |
| item\_id     | `ID`                                   | The ID of the item.                           |
| predecessors | [`[DependencyEdge!]`](#dependencyedge) | The predecessor dependency edges of the item. |

***

# DependencyEdge

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

A dependency edge representing a predecessor relationship between two items.

| Field            | Type                                        | Description                                                                      |
| :--------------- | :------------------------------------------ | :------------------------------------------------------------------------------- |
| source\_item\_id | `ID`                                        | The ID of the predecessor item.                                                  |
| dependency\_type | [`DependencyRelation`](#dependencyrelation) | The type of dependency relationship between the items.                           |
| lag              | `Int`                                       | The lag in days between the predecessor and the dependent item. Can be negative. |

***

# DependencyRelation

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The type of dependency relationship between items.

| Enum value | Description                                                                          |
| :--------- | :----------------------------------------------------------------------------------- |
| `FS`       | Finish to start: the dependent item can start only after the predecessor finishes.   |
| `SS`       | Start to start: the dependent item can start only after the predecessor starts.      |
| `FF`       | Finish to finish: the dependent item can finish only after the predecessor finishes. |
| `SF`       | Start to finish: the dependent item can finish only after the predecessor starts.    |
