---
updatedAt: 2026-02-10T04:02:57.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Discounts

Learn more about providing discounts for monetized marketplace apps

Once your app is monetized, you can focus on increasing app purchases, attracting new users, and converting free users to paid plans. We offer several tools to help you promote your app (read more [here](https://developer.monday.com/apps/docs/app-discoverability)), including discounts you can use to reach your goals.

This guide will cover who is eligible for discounts and how to manage them. You can also check out our [pricing report](https://dapulse-res.cloudinary.com/image/upload/v1711643936/remote_mondaycom_static/uploads/DiproBhowmik/App%20Pricing%20Document%20-%20Untapped/monday.com_-_Developer_Pricing_Report.pdf) to learn more about leveraging discounts to attract and retain users!

# Concepts

Offering a discount may seem counterintuitive. Why lower your price if you want to increase revenue? When used strategically, discounts can influence key decision points in the app lifecycle, such as renewals, upgrades, and trial conversions.

They can help:

* Attract new users
* Retain existing users about to churn
* Convert trial and free plan users to paid subscriptions
* Transition customers from their current plan to a higher one

# Eligibility

Both potential and existing customers are eligible to receive discounts. Potential customers are those without an existing app subscription, including those on free and trial plans. Existing customers are those with an active app subscription.

# Implementation

This section outlines the process of granting a discount from start to finish.

1. Determine what discount percentage you'd like to offer and to whom.
2. Create the discount in the [Developer Center ](https://developer.monday.com/apps/docs/create-a-discount#developer-center)or via the [API](https://developer.monday.com/apps/docs/create-a-discount).
3. Once you grant a discount:
   * **For potential customers**, the discounted price is shown during checkout when they select the discounted plan.
   * **For existing customers**, the discount is applied automatically at the next billing cycle or when they switch to a discounted plan.

<Callout icon="💡" theme="default">
  If they don't see the reduced rate, verify the following:

  * The account slug they're using matches the granted discount
  * The selected plan ID matches the granted discount

  If you've verified the above and the discount still doesn't appear, reach out to our support team [here](https://developer.monday.com/api-reference/docs/get-help#open-a-support-ticket).
</Callout>

4. Potential customers must select the discounted plan and create a new subscription. For existing customers, the discount is applied automatically at the next billing cycle or when they change their subscription to a plan that has a discount applied.
5. The discount will be applied based on the *Created at* and *Valid until* dates.

# Manage discounts

You can manage new and existing discounts through the Developer Center or the API.

<Image align="center" alt="Manage your discounts in the Developer Center" border={true} caption="Manage your discounts in the Developer Center" src="https://files.readme.io/49370672b86ad3bbda32a4d875099d6b2b3e10e60a82dd7da873034b8a229d63-Screenshot_2026-01-23_at_10.23.01_AM.png" width="600px" />

## Developer Center

In the *Monetization* tab, you can [create new discounts](https://developer.monday.com/apps/docs/create-a-discount), [delete existing ones](https://developer.monday.com/apps/docs/delete-a-discount), and see a list of your active and inactive discounts.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Field Name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Account slug**
      </td>

      <td>
        The account's slug
      </td>
    </tr>

    <tr>
      <td>
        **Subscription**
      </td>

      <td>
        * **Active:** The discount is for an active subscription
        * **New:** The discount is for a new subscription
      </td>
    </tr>

    <tr>
      <td>
        **Discount**
      </td>

      <td>
        * **Active:**  The discount is still valid
        * **Ended:** The discount has expired
      </td>
    </tr>

    <tr>
      <td>
        **Plan ID**
      </td>

      <td>
        The plan the discount is applied to
      </td>
    </tr>

    <tr>
      <td>
        **Period**
      </td>

      <td>
        * **Monthly:** The discount is for a monthly plan
        * **Yearly:** The discount is for a yearly plan
      </td>
    </tr>

    <tr>
      <td>
        **Discount**
      </td>

      <td>
        The discount percentage
      </td>
    </tr>

    <tr>
      <td>
        **Created at**
      </td>

      <td>
        The discount creation date
      </td>
    </tr>

    <tr>
      <td>
        **Valid until**
      </td>

      <td>
        The discount expiration date
      </td>
    </tr>
  </tbody>
</Table>

### Legacy discounts

You may see an additional table in the Developer Center labeled *Legacy discounts*. This displays discounts created prior to January 19th, 2026. You will continue to see this table until the discounts are deleted. However, if the discount has already been redeemed, deleting it from this table will not remove the discount from an existing subscription; it will remain active until it expires.

## API

Using the API, you can also [query your app's discounts](https://developer.monday.com/api-reference/reference/marketplace-app-discounts#queries), [grant new ones](https://developer.monday.com/api-reference/reference/marketplace-app-discounts#grant-a-discount), and [delete existing ones](https://developer.monday.com/api-reference/reference/marketplace-app-discounts#delete-a-discount).
