---
updatedAt: 2026-02-02T14:21:52.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Product

Learn about the product requirements for listing an app in the marketplace

To receive approval for the app marketplace, your app must meet the following product requirements:

* [ ] Create at least one [app feature](https://developer.monday.com/apps/docs/intro#what-type-of-app-features-can-i-build) with code in the [Developer Center](https://developer.monday.com/apps/docs/manage#updating-an-app-in-the-developer-center). Ensure that your app has a clear use case that your feature helps address.

<Callout icon="🚧" theme="warn">
  Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas (as of Q1 2026):

  * Automations: Multi-tool apps
  * Integrations with Microsoft tools
  * Google integrations
</Callout>

* [ ] Ensure that your app works with various user types, including members, admins, guests, and viewers. The app should display relevant messages to each user type (e.g., viewers can't access the API, so your app should display a relevant message like *As a viewer, you are unable to use this app.*). We pass an `isViewOnly` [parameter](https://developer.monday.com/apps/docs/mondayget#parameters) in the `sessionToken` that you can decode to check if the user is view-only.

* [ ] Your app must:
  * Support small and large boards (use techniques like pagination, infinite scroll, and bulk operations to do so - read more on rate limiting [here](https://developer.monday.com/api-reference/docs/rate-limits))
  * Support multiple columns of the same type
  * Work on public, private, and shareable boards
  * Work in different monday accounts that share the same email

* [ ] If your app has **more than one feature**, set your [starting point](https://developer.monday.com/apps/docs/user-onboarding#onboarding-configuration-tab).

* [ ] Provide a valid installation link. You can find your installation link under **Developers** > **Your app** > **Share** > **Share your app with others.** The link should follow this format: `https﻿://auth.monday.com/oauth2/authorize?client_id=*******`

* [ ] If your app redirects users to a sign-in or authorization page, you must redirect them back to monday upon completion.

* [ ] Implement the [value-created event](https://developer.monday.com/apps/docs/value-created-event-best-practices) method in your code.

* [ ] Embed a guidance video or link to your *How-to-use page* in the app.

* [ ] Ensure users can set up your app without needing to consult documentation.
  * **For views**, provide in-app onboarding to accommodate no-touch configuration (if required). You should be able to describe the main flow in 3-5 steps.
  * **For integration recipes**, provide a clear and descriptive recipe sentence.

* [ ] **For workspace templates**, ensure that other app features can be added to boards independently, with clear onboarding guidelines or a clear message to users (e.g., *To make best use of this app, please use the Workspace Template.*).

* [ ] **For workspace templates**, the attached images should be descriptive, visually appealing, not broken, and be 1424x779 pixels in size. You can set this under **Developers** > **App** > **Workspace Template** > **Feature Details**.

* [ ] **For workspace templates**, create a how-to-use monday doc as part of the template.

* [ ] Uninstall and reinstall your app to verify that users who previously downloaded the app have the same experience.

* [ ] Submit a full app URL from the [Basic Information](https://developer.monday.com/apps/docs/manage#basic-information-tab) page in the Developer Center.

<Image align="center" border={true} src="https://files.readme.io/91c0b4b-App_URL_1.png" className="border" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
