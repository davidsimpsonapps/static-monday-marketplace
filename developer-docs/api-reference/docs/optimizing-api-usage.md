---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Optimizing API usage

API [rate limits](https://developer.monday.com/api-reference/docs/rate-limits) are designed to reduce the load on the API and help maintain optimal performance. By following the tips outlined below, you can monitor and optimize your usage to avoid hitting those limits.

# Monitor your usage

## Analytics dashboard

The [API analytics dashboard](https://developer.monday.com/api-reference/docs/api-analytics) monitors your API usage and tracks your account's daily usage, trends, and top contributors.

You can use this data to:

* **Detect sudden spikes:** Spikes can be one indicator of a bug in an application. Bugs can cause the app to consume a disproportionate amount of the API budget.
* **Evaluate app usage:** Sometimes, apps are no longer used but continue to run and use your API budget. This is often the cause of high API usage in companies with many applications. You can use these insights to evaluate which apps are consuming your API budget and determine whether or not they're still required.

The analytics dashboard is available to account admins on any plan with an active API usage add-on, as well as to all Enterprise accounts.

## [`platform_api`](https://developer.monday.com/api-reference/reference/platform-api) object

On top of the API analytics dashboard, you can retrieve your account's daily usage, trends, and top contributors by querying the [`platform_api`](https://developer.monday.com/api-reference/reference/platform-api) object.

```graphql
query {
  platform_api {
    daily_analytics {
      by_day { 
        day
        usage
      }
      by_app {
        app {
          name
        }
        api_app_id
        usage
      }
      by_user {
        user {
          name
        }
        usage
      }
      last_updated
    }
  }
}
```

## Maintain logs

Maintaining detailed logs of your API calls allows you to understand the cost of each and track your remaining budget. This data helps with resource allocation and ensuring you don't reach the limits.

Here are some key points to log:

* Complexity cost of the query
* Remaining budget for API calls
* Structure of the query (e.g., the fields requested, filters applied)
* Instances when your app hits the per-minute limit

## Evaluate your use case

Consider evaluating whether the monday.com platform API is the right tool for your use case. Keep in mind that monday.com excels as a work management tool, not as a high-frequency database.

# Optimize your calls

## Implement pagination

Pagination divides your results into smaller sets of data called pages, instead of returning everything at once. You can then utilize cursor-based pagination or the `page` argument to return data from subsequent pages. Doing so helps you avoid consuming a disproportionate amount of your API budget while reducing the load on the API and improving response time.

> Example: Instead of returning 10,000 items in your call, use [cursor-based pagination](https://developer.monday.com/api-reference/reference/items-page#cursor-based-pagination-using-next_items_page) to return 200 items over 50 calls.

Please note that some queries don't support cursor-based pagination or the `page` argument. Consult our [API reference documentation](https://developer.monday.com/api-reference/reference/about-the-api-reference) to read more about each query and what it supports.

## Use the `change_multiple_column_values` mutation

If you need to modify more than one column value, use [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) mutation instead of multiple `change_simple_column_value` mutations. This reduces the number of calls and improves efficiency.

## Simplify your calls

Each call has an associated "cost" that correlates to the load put on the API, also known as the complexity cost. By simplifying your queries, you can reduce their complexity to avoid hitting the [complexity limit](https://developer.monday.com/api-reference/docs/rate-limits#complexity-limit).

* Requesting only the data you need
* Reducing nested queries
* Utilizing the `page` and `limit` arguments
* Filtering your results

You can also calculate the complexity of each query in advance to avoid hitting the limit. The simplest way to do so is by adding the [complexity](https://developer.monday.com/api-reference/docs/complexity#queries) field to your queries to return the remaining complexity before and after the query, the complexity of the query itself, and when the limit resets.

```graphql
mutation {
  complexity {
    query
    before
    after
  }
  create_item(board_id:1234567890, item_name: "test item") {
    id
  }
}
```

## Avoid unnecessary calls

Errors, rate limit responses, and unsuccessful calls all contribute to your daily call limit. You can avoid wasting these calls by retrying your calls only after the required amount of time and properly handling errors.

> Example: If you hit the [minute limit](https://developer.monday.com/api-reference/docs/rate-limits#minute-limit), utilize the `Retry-After` header to determine how long you need to wait before retrying your call.

## Employ fragments

GraphQL is a flexible query language that allows you to only request the information you need in your query. This is done through components like arguments, fields, and [fragments](https://graphql.org/learn/queries/#fragments).

> Example: Certain objects, like [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#using-fragments-to-get-column-specific-fields), utilize fragments to return column-specific data, ultimately making your query more efficient.

# Improve your app's efficiency

## Utilize webhooks

If your app needs to respond to changes in monday, use webhooks to receive live alerts. Webhooks are more efficient than periodically polling the API since you will only make API calls as needed.

Please note that webhooks have their own limits (e.g., integration action limits), so it's crucial to strike a balance between webhooks and API usage.

## Implement caching

Consider implementing caching for repeated reads of the same data where live updates aren't critical. This reduces the number of API calls, improves performance, and optimizes your usage.

## Safe mutation retries with idempotency keys

When retrying mutations after network failures or timeouts, include an `Idempotency-Key` header to prevent duplicate side effects. The API caches the response and replays it on retry instead of executing the mutation again.

This is especially important for create operations (`create_item`, `create_board`, etc.) where a retry could produce duplicates.

See [Idempotency](https://developer.monday.com/api-reference/docs/idempotency) for full details and code examples.
