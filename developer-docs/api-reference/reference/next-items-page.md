---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Next items page

Learn how to paginate through large sets of items using the platform API

[`items_page`](https://developer.monday.com/api-reference/reference/items-page) utilizes cursor-based pagination to help return smaller sets of items from a large data set. When querying `items_page`, you can return the `cursor` argument that represents the next page of items.

After returning the cursor, you can keep paginating through the data set using the `next_items_page` object. This object allows you to retrieve the next page of items while avoiding the complexity cost of nesting `items_page` within a `boards` query. It takes the `cursor` argument, so you can specify where in the data set you want to start from.

<Callout icon="🚧" theme="warning">
Cursor validity

Cursors are generated when you first request a given board and are cached for 60 minutes. Each cursor will expire **60 minutes after the first request**.
</Callout>

# Queries

## Get next items page

* Returns the next set of items that correspond with the provided cursor
* Can only be queried at the root; can't be nested within another query

### Arguments

| Argument | Type      | Description                                                                                                                                                                                                       |
| :------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor   | `String!` | An opaque cursor that represents the position in the list after the last returned item. Use this cursor for pagination to fetch the next set of items. If the cursor is `null`, there are no more items to fetch. |
| limit    | `Int!`    | The number of items to return. The maximum is 500.                                                                                                                                                                |

### Fields

| Field  | Type                                                                     | Description                                                                                                                                                                                                       |
| :----- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor | `String`                                                                 | An opaque cursor that represents the position in the list after the last returned item. Use this cursor for pagination to fetch the next set of items. If the cursor is `null`, there are no more items to fetch. |
| items  | [`[Item!]!`](https://developer.monday.com/api-reference/reference/items) | The cursor's corresponding item.                                                                                                                                                                                  |

## Example

Now that you know the available arguments and fields for the `next_items_page` object, let's walk through an example. Say you only want to retrieve items from board 1234567890 with a timeline column that spans June 30, 2023, and July 1, 2023. This board contains thousands of items that cannot be retrieved simultaneously, so you can use cursor-based pagination.

The query below returns the ID and name of the first 50 items, along with a timeline column spanning those dates and a cursor value representing the position in the data set after returning 50 items.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      limit: 50
      query_params: {
        rules: [
          {
            column_id: "timeline"
            compare_value: ["2023-06-30", "2023-07-01"]
            compare_attribute: "START_DATE"
            operator: between
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

You can then use the `next_items_page` object with the `cursor` argument from the first query to return the following 50 relevant items in the data set. After returning the next cursor value, you can continue paginating through the entire data set.

```graphql
query {
  next_items_page(
    limit: 50
    cursor: "MSw5NzI4MDA5MDAsaV9YcmxJb0p1VEdYc1VWeGlxeF9kLDg4MiwzNXw0MTQ1NzU1MTE5"
  ) {
    cursor
    items {
      id
      name
    }
  }
}
```
