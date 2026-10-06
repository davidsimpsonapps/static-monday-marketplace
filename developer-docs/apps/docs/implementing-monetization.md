---
updatedAt: 2026-01-30T21:55:34.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Implement monday.com's monetization

Learn how to implement monday.com's built-in monetization for both new and existing marketplace apps

<Callout icon="⚠️" theme="warn">
  Your app must verify active subscriptions at runtime. monday.com does **not** automatically restrict access when a subscription expires or changes. You are responsible for enforcing plan entitlements and access rules in your code.
</Callout>

monday.com provides a built-in monetization framework that allows you to define pricing tiers, manage subscriptions, and receive payments directly through Payoneer.

[From July 2024](https://developer.monday.com/apps/changelog/new-monetization-requirements-for-marketplace-approval), all new marketplace apps must use monday’s built-in monetization. Existing apps can opt in at any time to benefit from automated billing, subscription management, and payout reporting.

# Prerequisites

Before implementing monetization:

* [ ] App is submitted to the marketplace (new apps) or live (existing apps)
* [ ] Pricing strategy and plan tiers defined
* [ ] Payoneer eligibility verified
* [ ] Webhook endpoints ready
* [ ] Subscription test plan created

# Implementation

All apps follow the same setup process. The only difference is that new apps require approval from the marketplace before they can be published.

1. **For new apps only:** [Submit your app](https://developer.monday.com/apps/docs/submit-your-app#submit-your-app-for-review) for marketplace approval. When selecting your pricing model, choose **monday’s Monetization** from the dropdown.

<Image align="center" border={true} width="500px" src="https://files.readme.io/6bb052431515d108f0cf7b53f679eee967202223b61594ab008bfeebfe7a3f83-Screenshot_2025-01-08_at_6.24.35_PM.png" className="border" />

2. **Define your pricing:** Submit your [first pricing version](https://developer.monday.com/apps/docs/submit-your-plans-and-pricing) to define your plan tiers, pricing, and feature availability.
3. **Set up webhooks (recommended):** Configure [webhooks](https://developer.monday.com/apps/docs/webhooks) to track app installations, subscriptions, and usage events in real time.
4. **Complete your Payoneer setup:** Create or [connect](https://docs.google.com/document/d/1P-nmffMo54yyngVOLjsQOaFPvy3GLN_ipxpf8MHd9_o/edit?usp=sharing) your [Payoneer](https://www.payoneer.com/) account to receive monthly payments.
5. **Register as a vendor:** If you're not already registered as a vendor, you will receive an email from Zip with a link to register. You can't receive payments from monday until this process is completed.
