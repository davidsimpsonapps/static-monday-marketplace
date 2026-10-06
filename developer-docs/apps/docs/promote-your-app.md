---
updatedAt: 2025-10-23T05:12:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Promote your app

Learn more about tools to help promote your app and monday's marketing and promotion guidelines

Once your app is in the marketplace, you can create campaigns and marketing assets to help promote your app to new users and retain existing ones.

We've devised a handful of tools that you can utilize, or you can create your own. Whichever option you choose, make sure to follow our marketing and promotion guidelines discussed below!

# Custom URLs

You can use embeddable custom URLs to help direct users to specific screens on the *Installed apps* page and your app's marketplace listing. Customers must be logged in to monday on the device they use to open the email, or else it will redirect them to the monday homepage.

Each URL must be manually constructed using the account slug (found in any of the [webhook](https://developer.monday.com/apps/docs/api-reference#webhooks) responses) and one of the query parameters listed below.

## Installed apps page

These URLs open the *Installed apps* page to one of the sections listed below:

* **Plans and pricing:** Opens the pricing and plans screen inside your app. Must be monetized by monday. You can use it to prompt users to pick a new plan when their subscription expires.

> **Sample format:** \<account\_slug>.monday.com/apps/installed\_apps/\<app\_id>/billing?plans\_selection=true

* **Billing:** Opens the billing screen inside your app. Must be monetized by monday. You can use it to direct users to the billing screen to update any required information.

> **Sample format:** \<account\_slug>.monday.com/apps/installed\_apps/\<app\_id>/billing

* **How to use:** Opens the [How to use](https://developer.monday.com/apps/docs/user-onboarding#how-to-use-tab) section of your app (if you have one). You can use it to help users learn how to get the most value from your app by directing them to your app's instructions.

> **Sample format:** \<account\_slug>.monday.com/apps/installed\_apps/\<app\_id>/how\_to\_use

* **App rating modal:** Opens your app with the [rating modal](https://developer.monday.com/apps/docs/marketplace-app-ratings-and-reviews#custom-urls) open. You can use it to encourage customers to rate and review your app in the marketplace.

> **Sample format:** \<account\_slug>.monday.com/apps/installed\_apps/\<app\_id>?openRatingDialog=true

## App listing page

These URLs open your app's listing page to one of the sections listed below:

* **Overview:** Opens your app's listing page on the *Overview* tab.

> **Sample format:** \<account\_slug>.monday.com/apps/marketplace/\<marketplace\_listing\_id>?section=overview

* **Permissions:** Opens your app's listing page on the *Permissions* tab.

> **Sample format:** \<account\_slug>.monday.com/apps/marketplace/\<marketplace\_listing\_id>?section=permissions

* **Security & Compliance:** Opens your app's listing page on the *Security & Compliance* tab.

> **Sample format:** \<account\_slug>.monday.com/apps/marketplace/\<marketplace\_listing\_id>?section=compliance

* **Pricing:** Opens your app's listing page on the *Pricing* tab.

> **Sample format:** \<account\_slug>.monday.com/apps/marketplace/\<marketplace\_listing\_id>?section=pricing

> 👍 You can get your marketplace listing ID from the app listing page URL!

# Onboarding emails

We've compiled an e-book that walks you through effectively using onboarding emails to retain app users. Get your own copy [here](https://dapulse-res.cloudinary.com/image/upload/v1722862288/remote_mondaycom_static/uploads/AlexPolonsky/ebook_mastering_onboarding_emails.pdf)!

> 📘 Send emails with our no-code app management solution
>
> Our App Management Product (AMP) lets you monitor new installs and email them automatically. [Learn more and install the app](https://developer.monday.com/apps/docs/app-management-product)

# Marketing and promotion guidelines

When promoting your app, keep these legal requirements and guidelines in mind to help you comply with our terms of service.

### Implement monday’s UI guidelines

* When promoting your app, use only the approved images, badges, and graphics provided by monday.com. Do not alter or misrepresent these assets.

### Ensure accuracy of graphics and written content

* Include accurate and high-quality screenshots of your app as it appears on the monday.com platform. Ensure these are up-to-date and reflective of the latest version of your app.
* Should you choose to include videos, make sure that they are accurate and high-quality videos of your app’s functionality as it appears on the monday.com platform. Ensure that these are up-to-date and reflect the latest version of your app.
* Ensure all marketing materials accurately represent your app's capabilities and the experience it provides. Avoid using deceptive or exaggerated claims.

### Follow relevant policies

* All promotional content must comply with these marketing and content guidelines and any applicable advertisement laws and regulations.
* Do not use terms that might imply endorsement by monday.com or other third parties unless explicitly authorized.
* Ensure that the app’s promotional content does not contain messaging that may induce or cause third parties to make negative statements or communications disparaging monday.com, the marketplace, or other marketplace app developers.

## Updates to guidelines and enforcement

monday.com reserves the right to update these guidelines as necessary. If any significant changes are made to these Guidelines, Partners will be notified through monday.com’s regular channels of communication.

monday.com reserves the right to suspend an app from the marketplace if it believes, at its sole discretion, that the app developer is in breach of these guidelines. This right is in addition to any remedies that may be available to monday.com in accordance with the Terms and/or applicable laws.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
