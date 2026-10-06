---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Account

Learn how to query monday.com accounts using the platform API

All monday.com users must either join an existing [account](https://auth.monday.com/users/sign_up_new?source=web_main\&origin=hp_fullbg_page_header#soft_signup_from_step) or create a new one. At the account level, users can invite other users to join the account, specify their primary platform use, sign up for a plan, and more!

# Queries

* **Required scope:`account:read`**
* Returns an object containing metadata about a specific account
* Can be queried directly at the root or nested within a [`me`](https://developer.monday.com/api-reference/docs/me#queries) or [`users`](https://developer.monday.com/api-reference/docs/users#queries) query

## Get account

```graphql GraphQL
query {
  users {
    account {
      id
      slug
      tier
      show_timeline_weekends
      is_during_trial
      plan {
        period
      }
      product {
        kind
        id
        tier
      }
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query { users { account { id show_timeline_weekends tier slug plan { period }}}}`;
const response = await mondayApiClient.request(query);
```

### Fields

| Fields                    | Type                                                                                                          | Description                                                                                                                | Enum Values       |
| :------------------------ | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| active\_members\_count    | `Int`                                                                                                         | The number of active users on the account (includes active users across all products who are not guests or viewers).       |                   |
| country\_code             | `String`                                                                                                      | The account's two-letter country code in ISO3166 format. The result is based on the location of the account's first admin. |                   |
| created\_at               | `Date`                                                                                                        | The account's creation date.                                                                                               |                   |
| first\_day\_of\_the\_week | `FirstDayOfTheWeek!`                                                                                          | The account's first day of the week.                                                                                       | `monday` `sunday` |
| id                        | `ID!`                                                                                                         | The account's unique identifier.                                                                                           |                   |
| is\_during\_trial         | `Boolean`                                                                                                     | Whether the account is in a free trial period.                                                                             |                   |
| is\_trial\_expired        | `Boolean`                                                                                                     | Whether the account's trial has expired.                                                                                   |                   |
| logo                      | `String`                                                                                                      | The account's logo.                                                                                                        |                   |
| name                      | `String!`                                                                                                     | The account's name.                                                                                                        |                   |
| plan                      | [`Plan`](https://developer.monday.com/api-reference/reference/plan)                                           | The account's payment plan. Returns `null` for accounts with the multi-product infrastructure.                             |                   |
| products                  | [`[AccountProduct]`](https://developer.monday.com/api-reference/reference/account-other-types#accountproduct) | The account's active products.                                                                                             |                   |
| show\_timeline\_weekends  | `Boolean!`                                                                                                    | Returns `true` if weekends appear in the timeline.                                                                         |                   |
| sign\_up\_product\_kind   | `String`                                                                                                      | The product the account first signed up for.                                                                               |                   |
| slug                      | `String!`                                                                                                     | The account's slug.                                                                                                        |                   |
| tier                      | `String`                                                                                                      | The account's tier.                                                                                                        |                   |
