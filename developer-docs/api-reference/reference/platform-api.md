---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Platform API

Learn how to query an account's platform API daily usage

All monday.com accounts are subject to the platform API [daily call limit](https://developer.monday.com/api-reference/docs/rate-limits#daily-call-limit). This limit restricts the number of calls made in a day to prevent excessive load from individual accounts, maintains the API service as a free feature across all plans, and controls operational costs to continue delivering value to all our users.

:construction: Enterprise accounts can retrieve this data through the [API analytics dashboard](https://developer.monday.com/api-reference/docs/api-analytics) or by querying the `platform_api` endpoint.

# Queries

## Get platform API

* Returns an object containing metadata about the account's daily API usage
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
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

## Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Fields
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        daily_limit
      </td>

      <td>
        `DailyLimit`
      </td>

      <td>
        The account's [daily call limit](https://developer.monday.com/api-reference/docs/rate-limits#daily-call-limit).
      </td>

      <td>
        base `Int`  
        total `Int` (includes extensions, if any)  
        consumption (version `2026-10` and later)
      </td>
    </tr>

    <tr>
      <td>
        daily_analytics
      </td>

      <td>
        [`DailyAnalytics`](https://developer.monday.com/api-reference/reference/other-types#platform-api-daily-analytics)
      </td>

      <td>
        The account's daily call limit analytics (by app, by day, or by user).
      </td>

      <td>
        by_app [`[PlatformApiDailyAnalyticsByApp!]!`](https://developer.monday.com/api-reference/reference/other-types#by-app)  
        by_day [`[PlatformApiDailyAnalyticsByDay!]!`](https://developer.monday.com/api-reference/reference/other-types#by-day)  
        by_user [`[PlatformApiDailyAnalyticsByUser!]!`](https://developer.monday.com/api-reference/reference/other-types#by-user)  
        last_updated`ISO8601DateTime`
      </td>
    </tr>
  </tbody>
</Table>
