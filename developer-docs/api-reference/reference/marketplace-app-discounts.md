---
updatedAt: 2026-09-06T08:37:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Marketplace app discounts

Marketplace developers can [grant app subscription discounts](https://developer.monday.com/apps/docs/discounts-and-trial-extensions#discounts) to attract and retain users. These can be managed, created, and deleted through both the Developer Center and the platform API.

# Queries

## Get marketplace app discounts

* Only works for **app collaborators**
* Returns an array containing metadata about a specific app discount
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  marketplace_app_discounts(app_id: 123456) {
    account_slug
    discount
    valid_until  	
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query ($appId: ID!) { marketplace_app_discounts (app_id: $appId) { account_slug discount valid_until  	} }"
const variables = {
  appId: 123456
};
```

### Arguments

| Argument | Type  | Description                  |
| :------- | :---- | :--------------------------- |
| app\_id  | `ID!` | The app's unique identifier. |

### Fields

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
        `ID!`
      </td>

      <td>
        The account's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        account_slug
      </td>

      <td>
        `String!`
      </td>

      <td>
        The account's slug.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        app_plan_ids
      </td>

      <td>
        `[String!]!`
      </td>

      <td>
        The app plan IDs.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `String!`
      </td>

      <td>
        The discount's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        discount
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The discount's percentage.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_recurring
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the discount is recurring.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        period
      </td>

      <td>
        `DiscountPeriod`
      </td>

      <td>
        The discount's period. If it returns `null`, the discount applies to both yearly and monthly plans.
      </td>

      <td>
        `MONTHLY`  
        `YEARLY`
      </td>
    </tr>

    <tr>
      <td>
        valid_until
      </td>

      <td>
        `String!`
      </td>

      <td>
        The date the discount is valid until.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

## Create marketplace app discount

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

Creates a discount for a marketplace app. Returns [`CreateMarketplaceAppDiscountResult!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#createmarketplaceappdiscountresult).

```graphql
mutation {
  create_marketplace_app_discount_offer(
    app_id: "12345"
    account_slug: "my-company"
    discount_data: {
      discount: 20
      days_valid: 30
      period: MONTHLY
      app_plan_ids: ["plan_001"]
    }
  ) {
    granted_discount {
      app_id
      app_plan_ids
      discount
      period
    }
  }
}
```

### Arguments

| Argument       | Type                                                                                                                                                                 | Description                  |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| account\_slug  | `String!`                                                                                                                                                            | The account's slug.          |
| app\_id        | `ID!`                                                                                                                                                                | The app's unique identifier. |
| discount\_data | [`CreateMarketplaceAppDiscountInput!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#createmarketplaceappdiscountinput) | The discount's details.      |

## Grant marketplace app discount

<Callout icon="❗️" theme="error">
  This mutation will eventually be deprecated. We recommend using `create_marketplace_app_discount` instead.
</Callout>

Grants a discount for a new marketplace app subscription. Returns [`GrantMarketplaceAppDiscountResult!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#grantmarketplaceappdiscountresult).

```graphql GraphQL
mutation {
  grant_marketplace_app_discount(
    account_slug: "Test"
    app_id: 123456
    data: {
      app_plan_ids: ["Basic"]
      days_valid: 30
      discount: 10
      is_recurring: false
      period: MONTHLY
    }
  ) {
    granted_discount {
      app_id
      period
      discount
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "mutation ($slug: String!, $appId: ID!, $appPlanIds: [String!]!, $days: Int!, $discountPercent: Int!, $recurring: Boolean!, $period: DiscountPeriod) { grant_marketplace_app_discount ( account_slug: $slug, app_id: $appId, data: {app_plan_ids: $appPlanIds, days_valid: $days, discount: $discountPercent, is_recurring: $recurring, period: $period }) { granted_discount { app_id period discount } } }"
const variables = {
  appId: 123456,
  slug: "my-team-monday",
  appPlanIds: ["Basic"], 
  days: 30, 
  discountPercent: 10, 
  recurring: false, 
  period: "MONTHLY" 
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument      | Type                                                                                                                                                             | Description                  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| account\_slug | `String!`                                                                                                                                                        | The account's slug.          |
| app\_id       | `ID!`                                                                                                                                                            | The app's unique identifier. |
| data          | [`GrantMarketplaceAppDiscountData!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#grantmarketplaceappdiscountdata) | The discount's details.      |

## Delete marketplace app discount

Deletes an existing discount for a marketplace app subscription. Returns [`DeleteMarketplaceAppDiscountResult!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#deletemarketplaceappdiscountresult).

```graphql GraphQL
mutation {
  delete_marketplace_app_discount(
    account_slug: "Test", 
    app_id: 123456
  ) {
    deleted_discount {
      account_slug
      app_id
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query =
  "mutation ($slug: String!, $appId: ID!) { delete_marketplace_app_discount ( account_slug: $slug, app_id: $appId ) { deleted_discount { account_slug app_id } } }";
const variables = {
  appId: 123456,
  slug: "my-team-monday",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument      | Type      | Description                  |
| :------------ | :-------- | :--------------------------- |
| account\_slug | `String!` | The account's slug.          |
| app\_id       | `ID!`     | The app's unique identifier. |

# Error Handling

Refer to the [API error handling](https://developer.monday.com/api-reference/docs/error-handling#/) for a list of common error types, retry strategies, and troubleshooting examples.

When calling `marketplace_app_discounts`, `grant_marketplace_app_discount`, or `delete_marketplace_app_discount`, you may occasionally see standard GraphQL or HTTP errors. Here are the most common categories to check:

| Error Type                       | Description                                                                                 | Next Steps                                                                                                                                              |
| :------------------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Permission or collaborator error | The caller isn’t an app collaborator or the provided `app_id` doesn’t belong to them.       | Verify the user token belongs to an app collaborator for the specified `app_id`.                                                                        |
| Validation error                 | The query or mutation contains invalid arguments, missing fields, or is nested incorrectly. | Ensure `marketplace_app_discounts` is queried at the root level, and that all required arguments (like `app_id` or `account_slug`) are correctly typed. |
| Delete target not found          | Trying to delete a discount that doesn’t exist for the specified account or app.            | Check that the discount exists before calling `delete_marketplace_app_discount`.                                                                        |
| Rate-limit error                 | Too many requests in a short period.                                                        | Wait and retry after the duration specified in the Retry-After header (if provided).                                                                    |
| Server or network error          | Temporary outage or connectivity issue.                                                     | Retry with backoff; if it persists, contact monday.com support with the `request_id`.                                                                   |
