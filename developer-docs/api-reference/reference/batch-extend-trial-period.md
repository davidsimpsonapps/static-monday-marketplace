---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Batch extend trial period

Trial periods allow users to explore your app and experience all its features commitment-free. For the duration of the trial, they have the same access as paid users, increasing the likelihood of purchasing a plan once the trial ends. You can grant [trial extensions](https://developer.monday.com/apps/docs/trial-extensions) to give users more time to try your app.

# Mutations

## Batch extend trial period

Enables apps monetized by monday to extend trials for up to five accounts. Returns [`BatchExtendTrialPeriod`](https://developer.monday.com/api-reference/reference/batch-extend-trial-period-other-types#batchextendtrialperiod).

:construction: Only works for **app collaborators**

```graphql
mutation {
  batch_extend_trial_period (account_slugs: ["test", "monday"], app_id: 12345678, plan_id: "Plan_1", duration_in_days: 21) {
    details {
      account_slug
      reason
      success
    }
    reason
    success
  }
}
```

### Arguments

| Argument           | Type         | Description                                                                                                                                     |
| :----------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| account\_slugs     | `[String!]!` | The account slug(s) to provide trial extensions for. The maximum is **5**.                                                                      |
| app\_id            | `ID!`        | The unique identifier of the application.                                                                                                       |
| duration\_in\_days | `Int!`       | The number of days to extend the trial. The maximum is **365**. If the account slugs require different durations, you must make multiple calls. |
| plan\_id           | `String!`    | The unique identifier of the payment plan.                                                                                                      |

<br />
