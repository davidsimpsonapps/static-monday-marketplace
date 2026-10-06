---
updatedAt: 2025-10-23T05:27:56.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Extend a trial

Learn how to gran trial extensions through the Developer Center or API

You can extend a trial through the Developer Center or API. Once the trial extension is granted, account admins will see the updated expiration date in the Apps section of the [Admin tab](https://support.monday.com/hc/en-us/articles/115005321509-All-things-Admin).

<Image alt="Extend a trial through the Developer Center" align="center" width="600px" border={true} src="https://files.readme.io/1a028c010fa3e4837be3e07c388a8d1fa554f38499fdd6015c440d64b88f7b3b-Screenshot_2025-03-25_at_1.22.05_PM.png">
  Extend a trial through the Developer Center
</Image>

# How to extend a trial

## Developer center

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Click **Monetization** in the left-side menu.
3. Select **Trials** to extend a trial plan.
4. Enter the **Account slug** (found in your webhooks or by [querying the account](https://developer.monday.com/api-reference/reference/account#fields)  through the API).
5. Select the plan for which you want to extend the trial.
6. Choose the extension duration (up to 365 days).
7. Click **Set**.

## API

To extend up to five trials at a time via the API, use the [`batch_extend_trial_period`](https://developer.monday.com/api-reference/docs/other-types#batch-extend-trial-period) mutation:

```graphql
mutation {
  batch_extend_trial_period (account_slugs: ["test", "monday"], app_id: 12345678, plan_id: "Plan_1", duration_in_days: 21) {
    details {
      account_slug
      reason
      success
    }
    reason
    success
  }
}
```

# Troubleshooting

If you receive an error while attempting to extend a trial, refer to the table below for common issues:

| Error message                                                             | Issue                                                |
| :------------------------------------------------------------------------ | :--------------------------------------------------- |
| Failed to extend trial - Check your inputs                                | User entered invalid input (e.g. exceeding 365 days) |
| Failed to extend trial - Invalid account details                          | Account with the provided ID doesn’t exist           |
| Failed to extend trial - Account missing monetized install of application | The app is not installed on the account              |
| Failed to extend trial - Existing app subscription                        | Account already purchased a subscription             |
| Failed to extend trial - User cannot extend trials                        | Granting user can't provide trial extensions         |
