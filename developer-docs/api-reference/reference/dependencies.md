---
updatedAt: 2026-10-30T11:35:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Dependencies

Learn how to read the dependencies between items on a board using the platform API

[Dependencies](https://support.monday.com/hc/en-us/articles/360007402599-How-to-Set-Dependencies-on-monday-com) connect <Glossary>items</Glossary> on a board, so that one item (the predecessor) relates to another (the dependent item). Use the queries below to read the predecessors of every item on a board, or of a single item, including the dependency type and lag of each one.

To read or update the dependency column value of an item, see the [dependency column](https://developer.monday.com/api-reference/reference/dependency) reference.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

# Queries

## Get board dependencies

* Returns the dependency predecessors of the items on a board, one page at a time
* Each item includes its predecessor edges with the dependency type and lag

```graphql GraphQL
query {
  board_dependencies(board_id: 1234567890, limit: 50, page: 1) {
    total_count
    items {
      item_id
      predecessors {
        source_item_id
        dependency_type
        lag
      }
    }
  }
}
```

### Arguments

| Argument                              | Type      | Description                                                                                   |
| :------------------------------------ | :-------- | :-------------------------------------------------------------------------------------------- |
| board\_id                             | `ID!`     | The unique identifier of the board to get dependencies for.                                   |
| limit                                 | `Int`     | The maximum number of items to return per page. The default is `25` and the maximum is `500`. |
| page                                  | `Int`     | The page number to return, starting from `1`. The default is `1`.                             |
| include\_items\_without\_predecessors | `Boolean` | Whether to include items that have no predecessor dependencies. The default is `true`.        |

### Fields

| Field        | Type                                                               | Description                                                  |
| :----------- | :----------------------------------------------------------------- | :----------------------------------------------------------- |
| items        | [`[ItemDependency!]`](https://developer.monday.com/api-reference/docs/dependencies-other-types#itemdependency) | The items on the current page, with their predecessor edges. |
| total\_count | `Int`                                                              | The total number of items across all pages.                  |

For more about this type, see [`BoardDependencies`](https://developer.monday.com/api-reference/docs/dependencies-other-types#boarddependencies).

## Get item dependency

* Returns all the dependency predecessors of a specific item
* Each predecessor edge includes the dependency type and lag

```graphql GraphQL
query {
  item_dependency(board_id: 1234567890, item_id: 9876543210) {
    item_id
    predecessors {
      source_item_id
      dependency_type
      lag
    }
  }
}
```

### Arguments

| Argument  | Type  | Description                                                |
| :-------- | :---- | :--------------------------------------------------------- |
| board\_id | `ID!` | The unique identifier of the board containing the item.    |
| item\_id  | `ID!` | The unique identifier of the item to get predecessors for. |

### Fields

| Field        | Type                                                               | Description                                   |
| :----------- | :----------------------------------------------------------------- | :-------------------------------------------- |
| item\_id     | `ID`                                                               | The ID of the item.                           |
| predecessors | [`[DependencyEdge!]`](https://developer.monday.com/api-reference/docs/dependencies-other-types#dependencyedge) | The predecessor dependency edges of the item. |

For more about this type, see [`ItemDependency`](https://developer.monday.com/api-reference/docs/dependencies-other-types#itemdependency).
