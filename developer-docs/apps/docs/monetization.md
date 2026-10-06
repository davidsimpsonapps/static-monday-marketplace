---
updatedAt: 2025-10-23T05:27:34.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Monetization

monday's app monetization allows your app to accept payments from users directly through monday.com instead of leaving the platform. It's a seamless way to process payments without a third-party system.

Our platform handles the entire payment and billing process, including VAT and currency conversions. It takes the hassle out of billing users and processing payments, giving you more time to focus on building and improving your app.

All new marketplace apps must be monetized by monday rather than an external monetization system.

To use native monetization, apps must support the following flows:

* Check the status of the user's subscription when they use your app
* Enable or disable features based on the user's subscription level
* Prompt the user for payment using our SDK
* Migrate any users from an external billing system to monday billing without double payment

You can implement monetization in just a few simple [steps](https://developer.monday.com/apps/docs/implementing-monetization), but we recommend reading our guides on [plans and pricing](https://developer.monday.com/apps/docs/plans-and-pricing), [subscriptions and billing](https://developer.monday.com/apps/docs/subscriptions-payments-and-billing), [webhooks](https://developer.monday.com/apps/docs/webhooks), and [discounts and trial extensions](https://developer.monday.com/apps/docs/discounts-and-trial-extensions) before doing so!

> 🚧
>
> Developers take full responsibility for checking and enforcing monetization for their app. Failing to do so may lead to customers using your app for free!
