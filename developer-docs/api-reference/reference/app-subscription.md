---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# App subscription

Learn how to query app subscription data using the monday.com platform API

App monetization utilizes [subscriptions](https://developer.monday.com/apps/docs/monetization#subscriptions) as a billing contract between a user and an app. Each subscription contains unique data about the user's billing frequency, plan type, and renewal period.

# Queries

## Get app subscription

* Returns an array containing the current app and account subscription details based on the token used
* If an account has a mock subscription and a real one, it will only return the mock subscription
* Can only be queried directly at the root; can't be nested within another query

<Callout icon="🚧" theme="warn">
  This query is called on the app-level. It can only be called within the context of an app, not from the API Playground.

  It only returns details based on the token used. If you want to query all of your app's subscriptions, use the [`app_subscriptions`](https://developer.monday.com/api-reference/reference/app-subscriptions) object instead.
</Callout>

```graphql GraphQL
query {
  app_subscription {
    billing_period
    days_left
    is_trial
    max_units
    renewal_date
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query { app_subscription { billing_period days_left is_trial max_units renewal_date } }";
const response = await mondayApiClient.request(query);
```
```json JSON
{ 
  "data": {
    "app_subscription":[
      {
        "billing_period": "yearly",
        "days_left": 278,
        "is_trial": false,
        "max_units": 15,
        "renewal_date": "2023-08-27T00:00:00+00:00",
      }
    ]
  },
  "account_id": 12345
}
```

### Fields

| Fields           | Type      | Description                                                                                       |
| :--------------- | :-------- | :------------------------------------------------------------------------------------------------ |
| billing\_period  | `String`  | The billing period frequency: `monthly` or `yearly`.                                              |
| days\_left       | `Int`     | The number of days left until the subscription ends.                                              |
| is\_trial        | `Boolean` | Whether the subscription is in a trial.                                                           |
| max\_units       | `Int`     | The maximum number of seats allowed for seat-based plans. Returns `null` for feature-based plans. |
| plan\_id         | `String!` | The subscription plan ID from the app's side.                                                     |
| pricing\_version | `Int`     | The subscription's pricing version.                                                               |
| renewal\_date    | `Date!`   | The date when the subscription renews.                                                            |

# Mutations

## Set mock app subscription

Creates a mock subscription for an account and app based on the token you're using. Returns [`AppSubscription`](https://developer.monday.com/api-reference/docs/app-subscription#fields).

Mock subscriptions disappear after 24 hours, and each account-app pair can create one mock subscription. You may need to refresh your browser after creating a mock subscription so that it shows in your account.

```graphql GraphQL
mutation {
  set_mock_app_subscription(
    app_id: 12345,
		partial_signing_secret: "abcde12345",
    is_trial: true,
    plan_id: "basic_plan_15_users",
    max_units: 15
  ) {
    plan_id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  mutation {
    set_mock_app_subscription (
      app_id: 12345,
      partial_signing_secret: "abcde12345",
      is_trial: true,
      plan_id: "basic_plan_15_users",
      max_units: 15
    ) {
      plan_id
    }
  }`;
const response = await mondayApiClient.request(query);
```

### Arguments

| Argument                 | Type      | Description                                                                                                                                                                                        |
| :----------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app\_id                  | `ID!`     | The app’s unique identifier. You can access this ID from the URL of your app in the following format: *myaccount.monday.com/apps/manage/\{YOUR\_APP\_ID}/app\_versions/12345/sections/appDetails*. |
| billing\_period          | `String`  | The billing period frequency: *monthly* or *yearly*.                                                                                                                                               |
| is\_trial                | `Boolean` | Whether the subscription is in a trial. Defaults to `false`.                                                                                                                                       |
| max\_units               | `Int`     | For seat-based apps, the maximum number of seats allowed on the mock plan.                                                                                                                         |
| partial\_signing\_secret | `String!` | The last 10 characters of your app’s signing secret.                                                                                                                                               |
| plan\_id                 | `String`  | The plan's unique identifier for the mock subscription.                                                                                                                                            |
| pricing\_version         | `Int`     | The subscription's pricing version.                                                                                                                                                                |
| renewal\_date            | `Date`    | The date when the subscription renews. Defaults to one year in the future and follows UTC DateTime. \*The mutation will fail if you do not use a future date.                                      |

## Remove mock app subscription

Removes the mock subscription for the current account. Returns [`AppSubscription`](https://developer.monday.com/api-reference/docs/app-subscription#fields).

```graphql GraphQL
mutation {
  remove_mock_app_subscription(
    app_id: 12345
    partial_signing_secret: "abcde12345"
  ) {
    billing_period
    days_left
    is_trial
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation {
  remove_mock_app_subscription (app_id: 12345, partial_signing_secret: "abcde12345") {
    billing_period
    days_left
    is_trial
 }
}`;
const response = await mondayApiClient.request(query);
```

### Arguments

| Argument                 | Type      | Description                                          |
| :----------------------- | :-------- | :--------------------------------------------------- |
| app\_id                  | `ID!`     | The app's unique identifier.                         |
| partial\_signing\_secret | `String!` | The last 10 characters of your app's signing secret. |
