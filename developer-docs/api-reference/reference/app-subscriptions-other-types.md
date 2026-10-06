---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the app subscriptions API

The monday.com [app subscriptions](https://developer.monday.com/api-reference/reference/timeline) API enables you to read an app's subscription details.

The types below are used by the app subscriptions query and are not independently queryable.

# AppSubscriptionDetails

An object containing the app's subscriptions.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        `Int!`
      </td>

      <td>
        The account's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        currency
      </td>

      <td>
        `String!`
      </td>

      <td>
        The currency used to make the purchase.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        days_left
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of days until the subscription ends.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        discounts
      </td>

      <td>
        [`[SubscriptionDiscount!]!`](https://developer.monday.com/api-reference/reference/app-subscriptions-other-types#subscriptiondiscount)
      </td>

      <td>
        The discounts granted to the subscription.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        end_date
      </td>

      <td>
        `String`
      </td>

      <td>
        An inactive subscription's end date. Returns null for subscriptions with an `active` status.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        max_units
      </td>

      <td>
        `Int`
      </td>

      <td>
        The subscribed unit quantity. Returns `null` for feature-based plans.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        monthly_price
      </td>

      <td>
        `Float!`
      </td>

      <td>
        The subscription's monthly price (after discounts) in the currency used to make the purchase.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        period_type
      </td>

      <td>
        `SubscriptionPeriodType!`
      </td>

      <td>
        The subscription's billing period frequency.
      </td>

      <td>
        `monthly`  
        `yearly`
      </td>
    </tr>

    <tr>
      <td>
        plan_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The pricing plan's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        pricing_version_id
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The pricing version's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        renewal_date
      </td>

      <td>
        `String`
      </td>

      <td>
        An active subscription’s renewal date. Returns null for subscriptions with an `inactive` status.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        status
      </td>

      <td>
        `SubscriptionStatus!`
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

## SubscriptionDiscount

An object containing details about a single subscription discount.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        discount_model_type
      </td>

      <td>
        `SubscriptionDiscountModelType!`
      </td>

      <td>
        The discount's type.
      </td>

      <td>
        `nominal`: dollar amount of the discount  
        `percent`: percentage of the discount
      </td>
    </tr>

    <tr>
      <td>
        discount_type
      </td>

      <td>
        `SubscriptionDiscountType!`
      </td>

      <td>
        The discount's frequency.
      </td>

      <td>
        `one_time`  
        `recurring`
      </td>
    </tr>

    <tr>
      <td>
        value
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The discount's value as a percent.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>
