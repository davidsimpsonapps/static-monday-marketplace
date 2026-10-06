---
updatedAt: 2025-10-23T05:27:56.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Trial extensions

Learn more about trial extensions for monetized marketplace apps

Trial periods allow users to explore your app and experience all its features commitment-free. For the duration of the trial, they have the same access as paid users, increasing the likelihood of purchasing a plan once the trial ends.

They get the same features as paid users for a limited time and may be more likely to purchase a plan once the trial period ends. Each app can offer a 14-day trial period, but through monetization, the trials can be extended!

# Concepts

Extending a trial period can be an effective way to convert users to paid plans. For example, you might offer users trial extensions via email as they near the end of their trial period based on their usage and likelihood of conversion.

Extended trials give users more time to explore the app without risking their money upfront. Once they are familiar with its features, they are more likely to subscribe when the trial ends. Users will receive a notification on the monday platform when their trial (initial or extended) ends, prompting them to select a new plan to maintain app access.

<Image title="Screen Shot 2022-11-28 at 9.59.59 AM.png" alt={1430} align="center" className="border" border={true} src="https://files.readme.io/15e42d6-Screen_Shot_2022-11-28_at_9.59.59_AM.png" />

# Eligibility

To extend a trial, the user must have the app installed on their account.

You can only extend trials for:

* Users currently in a trial period.
* Users whose trial ended but did not subscribe to a plan.

Once a trial extension is granted, it overrides the existing trial period. For example, if a user has five days left and you extend their trial for ten days, the total trial duration will be ten days, not fifteen.

# Implementation

This section outlines how to grant a discount from start to finish. If you're granting a discount to an existing customer, start here before completing the section below!

1. Determine the trial extension duration, applicable plan, and eligible accounts.
2. [Extend the trial](https://developer.monday.com/apps/docs/extend-a-trial) in the Developer Center or via the API.
3. Once you extend the trial, users will see the new expiration date in the Apps section of the [Admin tab](https://support.monday.com/hc/en-us/articles/115005321509-All-things-Admin).

# Manage your trial extensions

You can manage new trial extensions through the Developer Center or the API.

## Developer Center

In the [Developer Center's](https://developer.monday.com/apps/docs/extend-a-trial#developer-center) *Monetization* tab, you can [create new trial extensions](https://developer.monday.com/apps/docs/extend-a-trial#developer-center).

## API

Using the API, you can also [grant new batch trial extensions](https://developer.monday.com/apps/docs/extend-a-trial#api).
