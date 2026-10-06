---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# App subscription operations

Monetization by monday offers two different types of app pricing models: [feature-based](https://developer.monday.com/apps/docs/plans-and-pricing#feature-based) and [seat-based](https://developer.monday.com/apps/docs/plans-and-pricing#seat-based). When using feature-based pricing, it's vital to track the number of operations an app completes so they don't exceed their allotted usage.

The `app_subscription_operations` object and its associated queries and mutations allow you to do just that by counting usage per operation type (kind) and per account. For annual and monthly subscriptions, the counter resets monthly based on the renewal date. For example, if a subscription renews annually on the 15th of the month, the counter will reset on the 15th of each month.

Using the `increase_app_subscription_operations` mutation, you can increase the operation counter based on an account's usage and then query `app_subscription_operations` to read the updated values. These queries and mutations will only work with **access tokens generated for the app**, and the account must have an **active app subscription**. Developer access tokens **will not work**.

# Queries

## Get app subscription operations

* Returns an object containing an operation count for feature-based apps
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
 query {
  app_subscription_operations(kind: "image_scan") {
    counter_value
    period_key
   }
 }
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query ($operationKind: String!) { app_subscription_operations (kind: $operationKind) { counter_value period_key }}"
const variables = {
  operationKind: "image_scan",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type     | Description           |
| :------- | :------- | :-------------------- |
| kind     | `String` | The operation's name. |

### Fields

| Field             | Type                                                                                         | Description                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| app\_subscription | [`[AppSubscription]`](https://developer.monday.com/api-reference/reference/app-subscription) | The account's app subscription details.                                                         |
| counter\_value    | `Int`                                                                                        | The new counter value. The counter will restart each time a new app subscription period begins. |
| kind              | `String!`                                                                                    | The operation's name.                                                                           |
| period\_key       | `String`                                                                                     | The unique window key (related to subscription periods).                                        |

# Mutations

## Increase app subscription operations

Increases the counter for a specific operation. Returns [`AppSubscriptionOperationsCounter`](https://developer.monday.com/api-reference/reference/app-subscription-operations#fields).

It will return an error if no active subscription exists for the supplied token.

```graphql GraphQL
 mutation {
  increase_app_subscription_operations(
    kind: "image_scan"
    increment_by: 2
  ){
	counter_value
   }
 }
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "mutation ($operationKind: String!, $value: Int!) { increase_app_subscription_operations (kind: $operationKind, increment_by: $value) { counter_value }}"
const variables = {
  operationKind: "image_scan",
  value: 2
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

If you omit these arguments, it will default to a global `kind` and increment by 1.

| Argument      | Type     | Description                                                                                   |
| :------------ | :------- | :-------------------------------------------------------------------------------------------- |
| increment\_by | `Int`    | The amount to increase the counter by. Must be a positive number.                             |
| kind          | `String` | This can be an alphanumeric string of up to 14 characters, including the `-` and `_` symbols. |
