---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Working with the dependency column

Learn how to read, set, and manage item dependencies via the monday.com API, including column configuration and dependency modes.

The [dependency column](https://developer.monday.com/api-reference/docs/dependency) lets you define relationships between items on the same board — for example, "Task B cannot start until Task A is finished." These relationships can be visualized in Gantt views, drive timeline and date automations, and power dependency-based automations.

This guide walks through how to read dependency values, set them via mutation, understand column configuration modes, and filter items by their dependencies.

***

## Prerequisites

* A board with a dependency column
* Item IDs for the items you want to link
* The dependency column's ID (e.g., `"dependent_on"`)

To find your column ID, query the board's columns:

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    columns {
      id
      title
      type
    }
  }
}
```

***

## Reading dependency values

Query the dependency column using an inline fragment on `DependencyValue`:

```graphql GraphQL
query {
  items(ids: [9876543210]) {
    name
    column_values(types: dependency) {
      ... on DependencyValue {
        id
        display_value
        linked_item_ids
        linked_items {
          id
          name
        }
        updated_at
      }
    }
  }
}
```

```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      name
      column_values(types: dependency) {
        ... on DependencyValue {
          id
          display_value
          linked_item_ids
          linked_items {
            id
            name
          }
          updated_at
        }
      }
    }
  }
`;

const variables = { itemIds: [9876543210] };
const response = await mondayApiClient.request(query, variables);
```

**Key fields:**

| Field             | Description                                                                |
| :---------------- | :------------------------------------------------------------------------- |
| `display_value`   | Comma-separated names of dependent items. Empty string if no dependencies. |
| `linked_item_ids` | Array of item IDs this item depends on.                                    |
| `linked_items`    | Full item objects (id + name) for each dependency.                         |
| `updated_at`      | When the dependency was last changed. `null` if never set.                 |

<Callout icon="📘" theme="info">
  The `text` and `value` fields always return `null` for dependency columns. Use `linked_item_ids` or `linked_items` for dependency data.
</Callout>

***

## Setting dependencies

Use [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) to set dependencies. Pass an `item_ids` array containing the IDs of items that this item depends on.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dependent_on\": {\"item_ids\": [\"1111111111\", \"2222222222\"]}}"
  ) {
    id
  }
}
```

```javascript JavaScript
const mutation = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
    change_multiple_column_values(
      item_id: $itemId
      board_id: $boardId
      column_values: $columnValues
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    dependent_on: {
      item_ids: ["1111111111", "2222222222"]
    }
  }),
};

const response = await mondayApiClient.request(mutation, variables);
```

<Callout icon="🚧" theme="warn">
  Setting dependencies **replaces** the entire list. To add a dependency without removing existing ones, first query `linked_item_ids`, append the new ID, then send the full updated list.
</Callout>

### Adding a dependency without overwriting existing ones

```javascript JavaScript
// 1. Read current dependencies
const readQuery = `
  query ($itemId: [ID!]) {
    items(ids: $itemId) {
      column_values(types: dependency) {
        ... on DependencyValue {
          linked_item_ids
        }
      }
    }
  }
`;

const readResult = await mondayApiClient.request(readQuery, { itemId: [9876543210] });
const existing = readResult.data.items[0].column_values[0].linked_item_ids;

// 2. Append new dependency and write back
const newId = "3333333333";
const updatedIds = [...existing, newId];

const updateMutation = `
  mutation ($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
    change_multiple_column_values(
      item_id: $itemId
      board_id: $boardId
      column_values: $columnValues
    ) { id }
  }
`;

await mondayApiClient.request(updateMutation, {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({ dependent_on: { item_ids: updatedIds } }),
});
```

***

## Setting dependencies on item creation

You can set dependency values at the time an item is created:

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "Deploy backend"
    column_values: "{\"dependent_on\": {\"item_ids\": [\"9876543210\"]}}"
  ) {
    id
    name
  }
}
```

***

## Clearing dependencies

Pass `null` or an empty object as the column value to remove all dependencies:

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"dependent_on\": null}"
  ) {
    id
  }
}
```

***

## Reading column configuration

To inspect how a dependency column is configured, query the `settings` field on the column:

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    columns(ids: ["dependent_on"]) {
      id
      title
      settings
    }
  }
}
```

Example response:

```json
{
  "id": "dependent_on",
  "title": "Dependency",
  "settings": {
    "boardIds": [1234567890],
    "dependencyNewInfra": true,
    "allowMultipleItems": true,
    "dependency_mode": "flexible"
  }
}
```

### Dependency modes

The `dependency_mode` controls what happens to a linked **Date** or **Timeline** column when a dependency is completed:

| Mode        | Behavior                                                                                                           |
| :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `flexible`  | The linked date or timeline shifts automatically, but allows some overlap between predecessor and successor items. |
| `strict`    | Strict sequencing is enforced — the dependent item cannot start until its predecessor is fully complete.           |
| `no_action` | No automatic adjustment is made to dates or timelines when a dependency's status changes.                          |

<Callout icon="📘" theme="info">
  The `dependency_mode` only affects boards that also have a **Date** or **Timeline** column. Without one, the mode has no functional impact.
</Callout>

***

## Filtering by dependency

Use [`items_page`](https://developer.monday.com/api-reference/docs/items_page) to filter items by dependency state. The dependency column supports four operators:

| Operator       | Compare value     | Returns                                                     |
| :------------- | :---------------- | :---------------------------------------------------------- |
| `any_of`       | Array of item IDs | Items that depend on any of the specified items.            |
| `not_any_of`   | Array of item IDs | Items that do **not** depend on any of the specified items. |
| `is_empty`     | `[]`              | Items with no dependencies set.                             |
| `is_not_empty` | `[]`              | Items with at least one dependency set.                     |

### Find all items that depend on a specific item

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dependent_on"
            compare_value: ["9876543210"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

### Find all items with no dependencies

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "dependent_on"
            compare_value: []
            operator: is_empty
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

***

## Dependency relationship types

monday.com supports four dependency relationship types that define how two items relate to each other:

| Type             | Abbreviation | Description                                                      |
| :--------------- | :----------- | :--------------------------------------------------------------- |
| Finish-to-start  | FS           | Item B cannot start until Item A finishes. The most common type. |
| Start-to-start   | SS           | Item B cannot start until Item A starts.                         |
| Finish-to-finish | FF           | Item B cannot finish until Item A finishes.                      |
| Start-to-finish  | SF           | Item B cannot finish until Item A starts. Rarely used.           |

These types are set per dependency link in the monday.com UI when choosing dependencies.

<Callout icon="🚧" theme="warn">
  Dependency relationship types are **not currently exposed by the API**. The `DependencyValue` type returns which items are linked but not the relationship type (FS, SS, FF, SF) between them. Use the monday.com UI to configure relationship types.
</Callout>

***

## Common patterns

### Build a dependency chain readout

This query retrieves all items on a board with their full dependency data — useful for visualizing chains or validating ordering:

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page {
      items {
        id
        name
        column_values(types: dependency) {
          ... on DependencyValue {
            linked_item_ids
            display_value
          }
        }
      }
    }
  }
}
```

### Validate no circular dependencies

The API does not enforce cycle detection. If you're building tooling that creates dependencies programmatically, implement cycle detection client-side by traversing the `linked_item_ids` graph before writing changes.

***

## Related

* [Dependency column reference](https://developer.monday.com/api-reference/docs/dependency)
* [Timeline column reference](https://developer.monday.com/api-reference/docs/timeline)
* [Querying board items](https://developer.monday.com/api-reference/docs/querying-board-items)
* [change\_multiple\_column\_values](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values)
