---
updatedAt: 2026-02-25T20:45:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Plans and pricing

After creating your app, you must define the number of plans you want to offer, the difference between each tier, the pricing model they follow, and the price of each tier.

Check out our [pricing report](https://dapulse-res.cloudinary.com/image/upload/v1718300307/remote_mondaycom_static/uploads/DiproBhowmik/App%20Pricing%20Document%20-%20Untapped/v2/monday.com_-_Developer_Pricing_Report_-_FINAL4_June_2024.pdf) for a deeper look into selecting plan types, pricing your plans, selecting plan tiers, and how to measure success.

# Types of plans

Your app can support different types of plans, including feature- or seat-based, trial, and free (optional) plans. One plan will be used as the recommended option.

## Feature or seat-based plans

Your plans can follow three different pricing models: feature-based, seat-based, and account seat-based (new). The number of supported plans, pricing information format displayed in the UI, and plan submission process vary based on your app's selected pricing model.

### **Feature-based**

**Plan limit:** Up to 15 plans per app

Feature-based pricing lets you define plan tiers based on feature access or usage limits. This model is ideal for apps that offer multiple features or that measure user activity and consumption.

With this model, customers can choose a plan tier that fits their needs, only paying for the functionality or usage they require. This flexibility creates opportunities for upselling as accounts grow. However, creating effective bundles can be challenging and requires thorough planning.

<div style={{ backgroundColor: "#f6f6f7", borderLeft: "4px solid #c4c4c4", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#333" }}>
  💡 <strong>Examples:</strong>

  <ul style={{ margin: "12px 0 0 20px", padding: "0" }}>
    <li>An app offers 5 features on the Basic plan, 10 on Intermediate, 15 on Advanced, and 20 on Premium.</li>
    <li>An app offers up to 50 actions on Basic, 100 on Intermediate, 250 on Advanced, and unlimited on Premium.</li>
  </ul>
</div>

### **Seat-based (after September 2025)**

Seat-based pricing provides a scalable and predictable way to monetize your app based on the total number of seats in a customer’s monday.com account. Customers purchase the app for all seats in their account, and pricing is automatically calculated based on predefined seat buckets that correspond to the account’s size, scaling naturally as the account grows.

**Starting in August 2025, all new seat-based marketplace app submissions default to this model.**

By default, plans use optimized mode, which applies a progressive pricing structure: as seat count increases, the per-seat price gradually decreases, allowing you to offer stronger discounts to larger accounts without applying a single flat reduction to all seats. Because pricing is calculated progressively across seat ranges, the per-seat cost may include decimal values.

Seat-based plans can be offered on both monthly and yearly billing cycles. Yearly pricing follows the same bucket-based structure, with discounts applied per bucket rather than as one uniform percentage across all account sizes.

All seat-based apps must include a trial, and you may optionally configure free buckets, such as offering the app at no cost up to a defined seat threshold.

### Legacy seat-based (before September 2025)

<Callout icon="❗️" theme="error">
  Legacy seat-based pricing won't be supported in the near future. We encourage apps to migrate to the new account seat-based model.
</Callout>

**Plan limit:** Up to 25 plans per app

Legacy seat-based pricing lets you organize users into pricing tiers (or "buckets") based on seat count. Customers then purchase a subscription for the bucket that best aligns with the seats in their monday.com account.

This model is ideal for apps that deliver one core capability rather than a set of features. It is simple and allows customers to only pay for what they need. However, it may deter large companies or organizations with more seats from subscribing since their plan is determined by the number of required seats.

Legacy eat-based apps must offer a designated [trial plan](https://developer.monday.com/apps/docs/plans-and-pricing#trial-plan) that has unlimited seats to allow users to fully explore your app’s capabilities before committing to a subscription.

#### **How seat count works**

When customers subscribe to an app, our UI intuitively recommends the best-fit pricing tier based on the number of seats in their monday.com account (across all products).

If an account grows or shrinks, we monitor seat usage and compare it to the selected plan's limits for views, dashboard widgets, or custom objects. If the user count exceeds the plan's limit, the account maintains app access but is prompted to upgrade through pop-up messages and notifications on the *Installed Apps* page.

For example, a monday.com account with 200 seats purchases an app subscription for that size. If they expand to 300 seats, they will be prompted to upgrade their app accordingly in the UI.

If you're building a different type of app or prefer to manage access yourself, you can verify an account's seat count via the [`apps_monetization_info`](https://developer.monday.com/api-reference/reference/apps-monetization-info) endpoint. This requires the **`account:read`** scope.

```graphql
query {
  apps_monetization_info {
    seats_count
  }
}
```

## Trial and free plans

### Trial plan

Trial plans enable customers to evaluate your app, understand its value, and decide if it's a good fit. This can help attract a wider audience, increase engagement, and drive more subscriptions.

The default trial period is 14 days. If a customer requests more time, you can manually [extend their trial](https://developer.monday.com/apps/docs/discounts-and-trial-extensions#trial-extensions). Once the trial period ends, app admins will receive a notification prompting them to upgrade their plan. They will also see prompts on the *Installed Apps* page. For view apps, customer access will be blocked in the app's view, where they will also be prompted to upgrade.

### Free plan

Free plans are optional but can be leveraged to attract more app users. With a free plan, users can experience parts of your app and explore its benefits without committing to a paid subscription. They are also a great way to retain trial users after their initial trial subscription ends.

# Pricing

Effectively pricing your app is one key to making enough revenue to sustain development. After defining the plan tiers, you need to decide how much each plan costs (in USD). Part of this process involves defining different prices for each plan for both **monthly** and **yearly** billing periods. All of the pricing and plan information will be submitted for approval when you [implement monetization](https://developer.monday.com/apps/docs/implementing-monetization).

## Update your pricing

If you need to change your app's pricing, check out this [guide](https://developer.monday.com/apps/docs/marketplace-pricing)!
