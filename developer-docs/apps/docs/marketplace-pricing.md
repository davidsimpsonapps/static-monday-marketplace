---
updatedAt: 2025-10-23T05:28:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Marketplace pricing

Learn how to use pricing versioning to update your app's prices

Effectively pricing your app is one key to generating enough revenue to sustain development. You may need to adjust your app's pricing over time, and you can do so through **pricing versioning.**

# Concepts

Pricing versioning enables you to update your app's marketplace prices by creating a new version. You can change existing plan prices or add new plans—up to 25 total plans for seat-based or 15 total plans for feature-based.

You can create a new version through the Developer Center. To do so, you will need the updated plan name, ID, description, included features, and the monthly or yearly price.

Once approved, the new pricing version is only available to:

* New users (those who haven't subscribed before)
* Users currently on free plans

It is not visible to:

* Trial users
* Users with active paid subscriptions

We are unable to migrate existing customers to a new pricing version. They will only be exposed to a new version if they've completely canceled their subscription and the renewal date has passed.

> 🚧 Changing from seat-based to feature-based, or vice versa?
>
> Pricing versioning does not allow you to switch your [pricing model](https://developer.monday.com/apps/docs/plans-and-pricing#types-of-plans). Use this [form](https://form.workforms.com/3vQmCcp) instead!

# How to submit a new pricing version

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Select the relevant app to create a new pricing version for.
3. Click on the **Pricing & Plans** tab.
4. Navigate to the **Version requests** section.
5. Click **Create new version.**
6. Provide the updated information for each field. **Pro tip:** If you're reusing an existing plan in the new version, make sure the plan name casing is identical to the previous version.
7. Click **Submit to review** when you're ready.
8. Our review team will process your submission within 72 business hours and update your plans accordingly.

## A note on pricing version IDs

The pricing version ID is only exposed to developers through subscription webhooks. Therefore, users do not know when a new pricing version is created.

While users won’t see version IDs, you may want to use a consistent numbering scheme (e.g., 1, 2, 3 or 10, 20, 30) for your internal tracking or debugging via webhooks.
