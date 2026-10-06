---
updatedAt: 2026-09-06T08:37:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the marketplace app discount APIs

The monday.com [marketplace app discount](https://developer.monday.com/api-reference/reference/marketplace-app-discounts) APIs enable you to create, read, and delete discounts for marketplace apps.

The types below are used by marketplace app discount mutations and are not independently queryable.

# CreateMarketplaceAppDiscountInput

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the discount's properties.

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
        Supported Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        app_plan_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The app plan IDs.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        days_valid
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of days the discount will be valid.
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
        period
      </td>

      <td>
        `DiscountPeriod`
      </td>

      <td>
        The discount's frequency.
      </td>

      <td>
        `MONTHLY`  
        `YEARLY`
      </td>
    </tr>
  </tbody>
</Table>

***

# CreateMarketplaceAppDiscountResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the result of creating a marketplace app discount.

| Field             | Type                                                                                                                                                      | Description           |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| granted\_discount | [`CreateMarketplaceAppDiscount`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#createmarketplaceappdiscount) | The granted discount. |

## CreateMarketplaceAppDiscount

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing metadata for a granted marketplace discount.

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
        Supported Values
      </th>
    </tr>
  </thead>

  <tbody>
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
        app_plan_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The app plan IDs.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        days_valid
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of days the discount will be valid.
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
  </tbody>
</Table>

***

# DeleteMarketplaceAppDiscountResult

An object containing the result of deleting a marketplace app discount.

| Field             | Type                                                                                                                                                       | Description                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| deleted\_discount | [`DeleteMarketplaceAppDiscount!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#deletemarketplaceappdiscount) | The result of deleting a marketplace app discount. |

## DeleteMarketplaceAppDiscount

An object containing metadata for recently deleted marketplace app discounts.

| Field         | Type      | Description                  |
| :------------ | :-------- | :--------------------------- |
| account\_slug | `String!` | The account's slug.          |
| app\_id       | `Int!`    | The app's unique identifier. |

***

# GrantMarketplaceAppDiscount

An object containing metadata for recently granted marketplace app discounts.

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
        Supported Values
      </th>
    </tr>
  </thead>

  <tbody>
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
        days_valid
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of days the discount will be valid.
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
        Returns `true` if the discount is recurring.
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
  </tbody>
</Table>

***

# GrantMarketplaceAppDiscountData

An object containing details about the discount to be granted.

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
        days_valid
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of days the discount will be valid.
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
        Whether or not the discount is recurring.
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
        The discount's period.
      </td>

      <td>
        `MONTHLY`  
        `YEARLY`
      </td>
    </tr>
  </tbody>
</Table>

***

# GrantMarketplaceAppDiscountResult

An object containing the result of granting a marketplace app discount.

| Field             | Type                                                                                                                                                     | Description                                        |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| granted\_discount | [`GrantMarketplaceAppDiscount!`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts-other-types#grantmarketplaceappdiscount) | The result of granting a marketplace app discount. |
