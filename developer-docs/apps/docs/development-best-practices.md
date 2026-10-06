---
updatedAt: 2025-10-23T05:09:27.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Development best practices

We want to ensure that you have a seamless developer experience with monday.com. To do so, we've compiled a list of tips, tricks, and development best practices to make your dev journey easier. Whether you're working with our API or developing an app for the marketplace, this list is for you!

## API usage

### Use a queuing mechanism for mutations and queries to avoid limitations

A queuing mechanism is essential to maintain a good user experience and keep the API healthy if your app has bulk mutations or queries.

Check out these queuing service providers for more information:

* <a href="https://docs.bullmq.io/" target="_blank">BullMQ</a>

* <a href="https://aws.amazon.com/sqs/" target="_blank">Amazon SQS</a>

### Avoid API call timeouts

All API calls follow a 60-second <a href="https://developer.monday.com/api-reference/docs/rate-limits#timeout-policy" target="_blank">timeout policy</a>. You can avoid timeouts by returning less data per query.

You can return less data by implementing <a href="https://developer.monday.com/api-reference/docs/rate-limits#pagination" target="_blank">pagination</a>, using limits in your queries, and only returning required information.

### Use a workaround for items by column values calls on large boards

The items by column values call can be very slow on large boards. It may be faster to get all the data from the board and filter it in your app.

```graphql
query {
  boards (ids: 1234567891) {
    name
    items (limit:100) {
      id
      name
      column_values {
        text
      }
    }
  }
}
```

### Don't create too many items at the same time

You cannot create more than 10 to 20 items in real time. Each `create_item` mutation uses 10,000 complexity points, which means you can make \~160 items per minute to avoid hitting the complexity limit.

For example, you'll need to queue your mutations if you need to create 1,000 items.

### Do not make API calls concurrently

You should make all mutations one after the other. If you make multiple mutations on the same board simultaneously, the data on the board can become corrupted.

## Storage API

### Understand the limits of the storage API

The storage API is instance-level, so different views cannot access the same data. If you'd like to access data between different views, you'll need to implement your own backend database or find another suitable solution.

For more information on our Storage API (not to be confused with the monday GraphQL API), please see our SDK Reference [here](https://github.com/mondaycom/monday-sdk-js#mondaycom-apps-framework-sdk-for-javascript).

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
