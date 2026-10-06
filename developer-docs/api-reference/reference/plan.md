---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Plan

Learn how to query an account's monday.com plan data using the platform API

monday.com offers a variety of [plans](https://monday.com/pricing) for users to choose from based on their needs.

# Queries

## Get plan

* **Required scope:`account:read`**
* Returns an array containing metadata about a specific plan (returns `null` for users on trial accounts)
* Can only be nested inside an [`account`](https://developer.monday.com/api-reference/docs/account#queries) query

```graphql GraphQL
query { 
  account {
    plan {
      max_users
      period
      tier
      version
    }
  }
}
```

### Fields

| Fields     | Type     | Description                                                                                                                                                                                                                              |
| :--------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max\_users | `Int!`   | The maximum number of users allowed on the plan. Returns 0 for free and developer accounts. **Deprecated:** use [apps\_monetization\_info](https://developer.monday.com/api-reference/reference/apps-monetization-info#fields)  instead. |
| period     | `String` | The plan's time period.                                                                                                                                                                                                                  |
| tier       | `String` | The plan's tier.                                                                                                                                                                                                                         |
| version    | `Int!`   | The plan's version.                                                                                                                                                                                                                      |
