---
updatedAt: 2026-01-30T16:02:38.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# The Developer Center

Learn about managing your app in the Developer Center

The Developer Center is a one-stop shop to manage your monday apps and [API usage](https://developer.monday.com/api-reference/docs/the-developer-center). For app builders, you can create new apps, manage apps hosted with monday code, publish new app versions, implement webhooks, submit an app to the marketplace, analyze marketplace sales and ratings data, and so much more.

Access to these capabilities varies based on your monday.com [user type](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained):

* [Admins](https://support.monday.com/hc/en-us/articles/360002426920-Admins-on-monday-com) and [members](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained#what_are_members) can **create** apps and **view** those they are collaborators on
* [Guests](https://support.monday.com/hc/en-us/articles/115005340405-How-to-get-started-as-a-guest) can **view** apps they're collaborators on but **can't create** them
* [Viewers](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained#What_are_viewers?) **can't access** the *Developer Center*

# Access the Developer Center

1. Open your monday.com account or [sign up](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation) for a free developer account!
2. Click your profile picture in the top right corner.
3. Select **Developers**.
4. This will open the *Developer Center* in a new tab.
5. From here, you can [create a new app](https://developer.monday.com/apps/docs/create-an-app) or open an existing one to manage.

# Manage your app

The Developer Center's left-side menu has various sections where you can manage all of your app's components. The rest of the document will walk through each section and its corresponding tabs.

<Image align="center" alt="Developer Center UI" border={true} src="https://files.readme.io/7bf20d002d8ae4c8face29a3d7edb948fb0005a6edbd10f8aec13e146fa6ecd0-Dev_Center_UI.png" className="border" />

## General settings

This section allows you to define your app's display information, locate your app's credentials, or delete your app.

| Tab name            | Description                                                                                                                                                                                                         | Notes                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| Display information | Update your app's display information, including app name, short description, app icon, and app color                                                                                                               |                                                                                                                                 |
| App credentials     | Locate your app's client ID, client secret, signing secret, and ID                                                                                                                                                  |                                                                                                                                 |
| App slug            | Set or retrieve your app’s [slug](https://developer.monday.com/apps/docs/app-and-feature-slugs)                                                                                                                     | If your app was created before January 2026, you can manually set your app’s slug here one time. Once set, it can’t be updated. |
| Delete app          | Delete your app. Keep in mind that users will lose access to your app, and you won't have access to your code, settings, or configuration. If you are listed in the marketplace, this will not remove your listing. |                                                                                                                                 |

## Build

In this section, you can create app features, set permissions, connect webhooks, and build an onboarding flow.

| Tab name            | Description                                                                                                                                                                                                                | Documentation link                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Features            | Build and manage your app's features                                                                                                                                                                                       | Read more [here](https://developer.monday.com/apps/docs/intro#what-type-of-app-features-can-i-build) |
| OAuth & Permissions | Define and manage your app's permissions. Every request to the monday API requires a specific permission scope, so you need to define the scopes your app will use to access a particular API on behalf of your app users. | Read more [here](https://developer.monday.com/apps/docs/oauth)                                       |
| Webhooks            | Create and manage your app's webhooks                                                                                                                                                                                      | Read more [here](https://developer.monday.com/apps/docs/api-reference#webhooks)                      |
| App onboarding      | Set up an onboarding flow to help users get more value from your app faster                                                                                                                                                | Read more [here](https://developer.monday.com/apps/docs/user-onboarding)                             |

## Host on monday

[monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) is our app hosting solution that seamlessly integrates with our apps framework to provide a one-stop shop for your applications. This section of the Developer Center will only appear for monday code apps.

| Tab name         | Description                                                                                                               | Documentation link                                                                                                   |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| Server-side code | Manage your server-side code, including the app's version URL, environment variables, alert policies, and secrets         | Read more [here](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#server-side-code) |
| Client-side code | Provides useful commands and your app’s version-specific URL for client-side code deployed to monday.com's infrastructure | Read more [here](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#client-side-code) |
| Monitoring       | Check your monday code app's performance, including latency, hits, errors, and more                                       | Read more [here](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#monitoring)       |
| Logs             | Access your app's error logs                                                                                              | Read more [here](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#logs)             |

## Manage

This section allows you to manage your app's versioning, collaborators, monetization, listing page, and pricing and plan information.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Tab name
      </th>

      <th>
        Description
      </th>

      <th>
        Documentation link
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        App versions
      </td>

      <td>
        Manage your draft, live, and deprecated app versions
      </td>

      <td>
        Read more [here](https://developer.monday.com/apps/docs/app-versioning)
      </td>
    </tr>

    <tr>
      <td>
        Collaborators
      </td>

      <td>
        Invite and manage app collaborators. Collaborators can edit the app and test it on their boards and dashboards.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Monetization
      </td>

      <td>
        * If your app is not monetized, you can request to join monetization through this tab.  - If your app is already monetized, this tab enables you to [extend trials](https://developer.monday.com/apps/docs/monetization-trial-extensions)  and [grant discounts](https://developer.monday.com/apps/docs/discounts-and-trial-extensions#discounts)  for users.
      </td>

      <td>
        Read more [here](https://developer.monday.com/apps/docs/monetization)
      </td>
    </tr>

    <tr>
      <td>
        Listing page
      </td>

      <td>
        Submit and manage requests to update your marketplace app listing page and security and compliance information
      </td>

      <td>
        Read more here about the [app listing page](https://developer.monday.com/apps/docs/update-your-app-listing-page) and [security and compliance](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance)
      </td>
    </tr>

    <tr>
      <td>
        Pricing & plans
      </td>

      <td>
        Submit and manage requests to update your marketplace app's plan pricing information
      </td>

      <td>
        Read more [here](https://mondaydotdev.readme.io/apps/docs/marketplace-pricing)
      </td>
    </tr>
  </tbody>
</Table>

## Distribute

In this section, you can install your app, publish it to share with others, and submit it to the app marketplace.

| Tab name              | Description                                                                                                                                         | Documentation link                                                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Install app           | Install your app to make it accessible for all account users                                                                                        | Read more [here](https://developer.monday.com/apps/docs/installing-your-app) |
| Share app             | Publish your app so other monday.com accounts can install it                                                                                        | Read more [here](https://developer.monday.com/apps/docs/share-your-apps)     |
| Submit to marketplace | Submit your app to the marketplace so all monday.com users can access it. This tab won't appear if your app is already approved for the marketplace | Read more [here](https://developer.monday.com/apps/docs/submit-your-app)     |

## Analyze

This section allows you to view key app metrics related to sales, installs, usage, payments, reviews, app listing, and Google Analytics.

| Tab name         | Description                                                                                                                                                         | Documentation link                                                                    |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| Sales            | Tracks your app's marketplace ARR, MRR, and app subscriptions. Only available for apps that are monetized by monday.                                                | Read more [here](https://developer.monday.com/apps/docs/sales-analytics)              |
| Installs         | Tracks your app's installations and uninstallations                                                                                                                 | Read more [here](https://developer.monday.com/apps/docs/installs)                     |
| Usage            | Tracks how your app is being used across accounts and users                                                                                                         | Read more [here](https://developer.monday.com/apps/docs/usage)                        |
| Payment          | Tracks key payment metrics, including install-to-purchase funnels and conversion timelines                                                                          | Read more [here](https://developer.monday.com/apps/docs/payment)                      |
| Reviews          | Compiles data about your app's ratings and reviews                                                                                                                  | Read more [here](https://developer.monday.com/apps/docs/reviews)                      |
| Listing          | Tracks key metrics about your app's marketplace listing page, including visitor-to-installation funnels, traffic sources, keyword searches, unique clicks, and more | Read more [here](https://developer.monday.com/apps/docs/listing)                      |
| Google Analytics | Integrate your app listing page with Google Analytics                                                                                                               | Read more [here](https://developer.monday.com/apps/docs/google-analytics-integration) |

<br />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
