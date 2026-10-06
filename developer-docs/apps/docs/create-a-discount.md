---
updatedAt: 2026-02-10T04:01:39.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Create a discount

Learn how to create discounts through the Developer Center or API

You can create discounts for both potential and existing customers through the Developer Center or API. Once the discount is created:

* **For potential customers**, the discounted price is shown during checkout when they select the discounted plan.
* **For existing customers**, the discount is applied automatically at the next billing cycle or when they switch to a discounted plan.

<Image align="center" alt="Create a discount through the Developer Center" border={true} caption="Create a discount through the Developer Center" src="https://files.readme.io/b11f32f5ae9ca0fec3d6ebc100708eda1588b12d3b73a11bab40629690f8fda9-Screenshot_2026-01-23_at_10.37.40_AM.png" width="600px" />

# Developer Center

1. Open your app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Click **Monetization** in the left-side menu.
3. On the *Monetization* page, select the **Discounts** tab to view your discounts.
4. Click **Grant a new discount** in the top-right corner.
5. Enter the **Account slug** (found in your webhooks or by [querying the account](https://developer.monday.com/api-reference/reference/account#fields)  through the API).

At this point, the system checks whether the account has an active subscription to your app:

* If **no active subscription exists**, you will see a message indicating that none exists.
* If an **active subscription exists**, it will appear in the *Active plan* section, including the plan name, subscription status, billing frequency, and next billing cycle.

6. Select the specific plan to apply the discount to, or select **All plans**.
   * For accounts with an active subscription, you can apply the discount to either the current plan or a different plan. The discount does not have to be applied to the existing plan.
7. Specify whether the discount applies to a monthly or yearly subscription. If you’re unsure which option the customer will choose, select both.
8. Enter the discount percentage.
9. Enter the number of days the discount applies for. During this period, potential customers can claim the discount, and existing customers will receive the discounted price. After the validity period ends, the discount will no longer be available to potential customers and will be removed from existing subscriptions.
10. Click **Grant discount**.

# API

To create a discount via the API, use the [`create_marketplace_app_discount`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts#create-marketplace-app-discount) mutation.

```graphql
mutation {
  create_marketplace_app_discount(
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

# Troubleshooting

If you receive an error while attempting to grant a discount, refer to the table below for common issues:

| Error message                                                 | Issue                                                                 |
| :------------------------------------------------------------ | :-------------------------------------------------------------------- |
| Failed to grant discount - Check your inputs                  | The user entered invalid input (e.g., a negative discount percentage) |
| Failed to grant discount - Invalid account details            | Account with the provided account ID doesn't exist                    |
| Failed to grant discount - App isn't installed on the account | The app is not installed on the account                               |
| Failed to grant discount - User cannot grant discounts        | Granting user is not an app collaborator and can't provide discounts  |

<br />
