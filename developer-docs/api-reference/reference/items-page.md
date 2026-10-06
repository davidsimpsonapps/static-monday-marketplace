---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Items page

Learn how to filter monday board data using the platform API

The `items_page` object represents a page of items. As a query, you can use it to filter data from a board. As an object type, it represents a set of items returned by the parent resolver.

Every board includes advanced filters that let you quickly retrieve items based on specified criteria. You can replicate this behavior via the API using the `items_page` object and customized parameters to filter your results.

<Image align="center" border={true} src="https://files.readme.io/e9295a3-Advanced_filters.png" className="border" />

As the monday.com platform evolves, so does the allotted number of items on each board. These filters are the only way to retrieve items from larger boards without hitting any [limits](https://developer.monday.com/api-reference/docs/rate-limits) or timeouts, since you can't query a board with all items.

As a bonus, these filters are more expressive so you don't have to waste any of your complexity budget retrieving unnecessary data.

<Callout icon="🚧" theme="warning">
Want to read specific items on a board?

The `items_page` object allows you to query and filter all items on a board. If you want to read specific items using their IDs (up to 100 at a time), use the [`items`](https://developer.monday.com/api-reference/reference/items) object instead!
</Callout>

<Callout icon="📘" theme="info">
**Archived and deleted items**

`items_page` returns **active** items only. It does not support a `state` filter for archived or deleted items.

To read archived or deleted items by ID, use the root [`items`](https://developer.monday.com/api-reference/reference/items) query with the `state` argument (`archived`, `deleted`, or `all`). You must provide item IDs (up to 100 per request) — `items_page` cannot browse all archived items on a board server-side.
</Callout>

# Queries

## Get items page

* Returns an object containing metadata about a collection of items filtered by the specified criteria
* Can't be queried at the root; must be nested within a [`boards`](https://developer.monday.com/api-reference/docs/boards#queries) or [`groups`](https://developer.monday.com/api-reference/reference/groups) query

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      limit: 1
      query_params: {
        rules: [
          {
            column_id: "status"
            compare_value: [1]
          }
        ]
        operator: and
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```

## Arguments

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
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        cursor
      </td>

      <td>
        `String`
      </td>

      <td>
        An opaque token representing the position in a set of results to fetch items from. Use this to paginate through large result sets. **Please note** that you can't use `query_params` and `cursor` in the same request. We recommend using `query_params` for the initial request and `cursor` for paginated requests.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        hierarchy_scope_config
      </td>

      <td>
        `String`
      </td>

      <td>
        Controls how item hierarchy is handled when filtering results. Use
        `parentItems` (default) to include parent items related to a match,
        or `allItems` to return only items that directly match the filter.
      </td>

      <td>
        `allItems`  
        `parentItems`
      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of items to return. The default is 25, but the maximum is 500.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        query_params
      </td>

      <td>
        [`ItemsQuery`](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery)
      </td>

      <td>
        A set of parameters to filter, sort, and control the scope of the `boards` query. Use this to customize the results based on specific criteria. **Please note** that you can't use `query_params` and `cursor` in the same request. We recommend using `query_params` for the initial request and `cursor` for paginated requests.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Fields

| Field  | Type                                                                     | Description                                                                                                                                                                                                       |
| :----- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor | `String`                                                                 | An opaque cursor that represents the position in the list after the last returned item. Use this cursor for pagination to fetch the next set of items. If the cursor is `null`, there are no more items to fetch. |
| items  | [`[Item!]!`](https://developer.monday.com/api-reference/reference/items) | The cursor's corresponding item.                                                                                                                                                                                  |

# Cursor-based pagination using `next_items_page`

`items_page` utilizes cursor-based pagination to help return smaller sets of items from a large data set. When querying `items_page`, you can return the `cursor` argument that represents the next page of items.

After returning the cursor, you can keep paginating through the data set using the [`next_items_page`](https://developer.monday.com/api-reference/reference/next-items-page) object. This object allows you to retrieve the next page of items while avoiding the complexity cost of nesting `items_page` within a `boards` query. It takes the `cursor` argument, so you can specify where in the data set you want to start from.

# Use cases

Let's dive into a few use cases to demonstrate how and when to use the `items_page` object to filter and sort items.

## Filtering items by name

You only want to retrieve items named "New item" on board 1234567890.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "name"
            compare_value: ["New item"]
          }
        ]
      }
    ) {
      cursor
      items {
        id
      }
    }
  }
}
```

## Filtering items assigned to yourself with a checkmark

You only want to retrieve items assigned to yourself with a checkmark in the checkbox column on board 1234567890.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
            compare_value: ["assigned_to_me"]
            operator: any_of
          }
          {
            column_id: "check"
            compare_value: null
            operator: is_not_empty
          }
        ]
        operator: and
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```

## Filtering items with specific status and people column values

You only want to retrieve items assigned to *Person 1* (ID#76543210) or *Person 7* (ID#01234567). In addition, you just need items marked as *Done* or *Removed* in the status column on board 1234567890.

With the <a href="https://developer.monday.com/api-reference/docs/people" target="_blank">people column</a>, you have two different ways to filter data:

1. Send their name(s) as a string along with the `contains_text` operator
2. Use the `any_of` operator along with their IDs as a string in the following format: "person-XXXXXXXX"

```graphql GraphQL (with text)
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
            compare_value: ["Person 1", "Person 2"]
            operator: contains_text
          }
          {
            column_id: "status"
            compare_value: [1, 0]
          }
        ]
        operator: and
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```
```graphql GraphQL (with IDs)
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
            compare_value: ["person-87654321", "person-12345678"]
            operator: any_of
          }
          {
            column_id: "status"
            compare_value: [1, 0]
          }
        ]
        operator: and
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```

## Filtering items with specific date column values in a particular group that are not assigned to yourself

You only want to retrieve items assigned to everyone but yourself, with a release date between June 1 and June 30, 2023, also in the group named *Finished* on board 1234567890.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "date"
            compare_value: ["2023-06-01", "2023-06-30"]
            operator: between
          }
          {
            column_id: "group"
            compare_value: ["new_group12345"]
            operator: any_of
          }
          {
            column_id: "people"
            compare_value: ["assigned_to_me"]
            operator: not_any_of
          }
        ]
        operator: and
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```

## Sorting items by column type

You can also use the `items_page` object to sort items by column type.

Let's say you want to retrieve items from a board and sort them by the item name column. The following query will return the first 25 items on board 1234567890 in ascending order (alphabetically) within each group.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        order_by: [
          {
            column_id: "name"
          }
        ]
      }
    ) {
      cursor
      items {
        id
        name
      }
    }
  }
}
```
