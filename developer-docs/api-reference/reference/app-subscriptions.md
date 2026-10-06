---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# App subscriptions

Learn how to query app subscription data using the monday.com platform API

App monetization utilizes [subscriptions](https://developer.monday.com/apps/docs/monetization#subscriptions) as a billing contract between a user and an app. Each subscription contains unique data about the user's billing frequency, plan type, and renewal period.

# Queries

## Get app subscriptions

* Only works for **app collaborators**
* **Limit:** 120 times per minute
* Returns an array containing data about all of your app's subscriptions
* Can only be queried directly at the root; can't be nested within another query

<Callout icon="🚧" theme="warn">
  If you only want to query a specific account's subscription from the context of your app, use the [`app_subscription`](https://developer.monday.com/api-reference/reference/app-subscription) object instead.
</Callout>

```graphql GraphQL
query {
  app_subscriptions(app_id: 1234567890) {
    cursor
    total_count 
    subscriptions {
      account_id
      monthly_price
      currency
      max_units
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query($appId:ID!) { app_subscriptions (app_id: $appId) { cursor total_count subscriptions { account_id monthly_price currency } } }";
const variables = {
  appId: 123456789,
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

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
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The account's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        app_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        cursor
      </td>

      <td>
        `String`
      </td>

      <td>
        An opaque token representing the position in a set of results to fetch subscriptions from. Use this to paginate through large result sets.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int`
      </td>

      <td>
        The number of subscriptions to return. The default is 100, but the maximum is 500.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        status
      </td>

      <td>
        `SubscriptionStatus`
      </td>

      <td>
        The subscription's status.
      </td>

      <td>
        `active`  
        `inactive`
      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Fields        | Type                                                                                                                                      | Description                                                                                                                                                                                                                             |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor        | `String`                                                                                                                                  | An opaque cursor that represents the position in the list after the last returned subscription. Use this cursor for pagination to fetch the next set of subscriptions. If the cursor is null, there are no more subscriptions to fetch. |
| subscriptions | [`[AppSubscriptionDetails!]!`](https://developer.monday.com/api-reference/reference/app-subscriptions-other-types#appsubscriptiondetails) | Further details about the app's subscriptions.                                                                                                                                                                                          |
| total\_count  | `Int!`                                                                                                                                    | The total number of subscriptions.                                                                                                                                                                                                      |
