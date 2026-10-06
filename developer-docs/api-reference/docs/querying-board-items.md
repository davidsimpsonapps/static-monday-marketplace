---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Querying board items

Learn how to query items on a monday.com board using the platform API

As your monday.com boards grow, it's increasingly important to know how to leverage the API to query all items on a board. Our API uses cursor-based pagination to retrieve up to 500 items in a single query, allowing you to paginate through large boards in just a few steps seamlessly.

This guide walks through each step and includes sample queries to help you structure your own. Following these steps, you can efficiently retrieve all items on a board using the API. Let's get started!

1. Start by running a GraphQL [`items_page`](https://developer.monday.com/api-reference/reference/items-page) query to retrieve the first 500 items from the board (don't forget to include your board ID as an argument!)

```graphql GraphQL
query {
  boards (ids: 1234567890){
    items_page {
      cursor
      items {
        id 
        name 
      }
    }
  }
}
```

2. This query returns a cursor value and the first 500 items on your board. Using that cursor value as an argument, run a [`next_items_page`](https://developer.monday.com/api-reference/reference/items-page#cursor-based-pagination-using-next_items_page) query to fetch the next relevant set of items. Please keep in mind that each cursor is valid for 60 minutes after the *initial* request!

```graphql GraphQL
query {
  next_items_page (cursor: "MSw5NzI4MDA5MDAsaV9YcmxJb0p1VEdYc1VWeGlxeF9kLDg4MiwzNXw0MTQ1NzU1MTE5") {
    cursor
    items {
      id
      name
    }
  }
}
```

3. This query returns another cursor value and the following 500 items on the board. Repeat the same query using the consecutive cursor values until you have paginated through the entire data set!
