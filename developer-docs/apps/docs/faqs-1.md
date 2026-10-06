---
updatedAt: 2025-11-12T18:13:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# FAQs

This guide will cover simple tips and FAQs regarding how to manage monetization for different kinds of apps.

# Plans and subscriptions

### How do I test monetization?

You can create a mock subscription using our GraphQL API to test your app’s logic. You can set the subscription to the different tiers of your app to test the upgrade/downgrade flow, block screens, and more.

Mock subscriptions only apply to the specific app and account that created them, so they will not affect any of your existing customers. If you do not explicitly remove the mock subscription, it will automatically disappear after 24 hours.

We recommend thoroughly testing your app to ensure that you have implemented monetization correctly. We cannot review the implementation, so it is up to you to conduct Q\&A.

### How do I check subscriptions on a frontend app?

When the app loads, check the *Subscription* object in the JWT token. Depending on the subscription plan\_id, you can enable/disable features and display block screens as needed.

When users attempt to access a feature not available on their plan, display a block screen. You can then prompt them to open the billing tab using the SDK method.

### How do I check subscriptions on an integration app?

**Deprecation notice:**

The subscription enrichment in the authorization JWT token for custom actions is deprecated and will be fully removed after the [deprecation period](https://developer.monday.com/apps/changelog/deprecating-subscription-data-in-jwt-for-custom-actions#/).

Going forward, use the [`app_subscription`](https://developer.monday.com/api-reference/reference/app-subscription#/) GraphQL API to retrieve subscription information for both custom actions and custom triggers. This method is already the standard for new block apps in monday workflows

**Recommended approach:**

* **Custom actions:** Retrieve subscription data using the [`app_subscription`](https://developer.monday.com/api-reference/reference/app-subscription#/) query instead of relying on the JWT token.
* **Custom triggers:** Continue using the [`app_subscription`](https://developer.monday.com/api-reference/reference/app-subscription#/) GraphQL method as before.
* (Optional) Cache the most recent subscription information on your backend to reduce API calls and improve performance.

# Webhooks

### Will I get a webhook if a payment method fails?

Not immediately. The user has up to 45 days to provide accurate payment information. After the grace period, you will receive a webhook for the cancellation of the subscription if a valid payment method has not been added.

### How many webhooks do I get if someone uninstalls my app?

You will get two webhooks. One for the uninstall webhook and one for the subscription canceled webhook.

### Will monday send subscription information for a trial in the install webhook?

Yes.

### Does the `app_subscription_created` event trigger on installation for trial accounts?

`app_subscription_created` will not trigger with the installation of the app for trial accounts. 

### Will an `app_subscription_created` event be sent to the app with the install webhook if the customer signs up for a subscription during installation?

The install webhook will always come with either a trial or a free plan unless someone uninstalls the app and then reinstalls it while the subscription is still valid.

Then the user can upgrade, and the `app subscription-created` webhook will be sent. 

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
