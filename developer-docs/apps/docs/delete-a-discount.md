---
updatedAt: 2026-02-10T04:01:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Delete a discount

Learn how to delete discounts through the Developer Center or API

If you need to delete a discount, you can do so at any time through the Developer Center or the API. You can delete active and inactive discounts for both potential and existing customers.

Deleting a discount for a potential customer immediately removes it from their account. Deleting a discount for an existing customer does not remove a discount that has already been applied to the current billing cycle, so the customer will still receive (and pay with) the discounted price for that cycle. However, once deleted, the discount will not be applied again in the next billing cycle.

<Callout icon="🚧" theme="warn">
  For legacy discounts that were created before January 19th, 2026, deleting the discount will not remove it from an existing subscription if it has already been redeemed. In this case, the discount will remain active until it expires.
</Callout>

<Image align="center" alt="Delete a discount through the Developer Center" border={true} caption="Delete a discount through the Developer Center" src="https://files.readme.io/6742d5d48c2d5e32cddfb6b9db849608ebec3951201708128cd52cdceeaee673-Screenshot_2026-01-23_at_10.27.19_AM.png" width="600px" />

# Developer Center

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Click **Monetization** in the left-side menu.
3. On the *Monetization* page, select the **Discounts** tab to view your discounts.
4. Click the **trash can icon** next to the discount offer you want to delete.
5. Select **Confirm** to finalize the deletion.

# API

To delete a discount using the API, use the [`delete_marketplace_app_discount`](https://developer.monday.com/api-reference/reference/marketplace-app-discounts#delete-a-discount) mutation:

```graphql
mutation {
  delete_marketplace_app_discount (
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
