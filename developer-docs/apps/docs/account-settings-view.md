---
updatedAt: 2026-01-30T16:20:29.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Account Settings View

The **account settings view** provides a dedicated space inside your app to display global settings that impact the entire account. Unlike board and item views, this feature can't be manually added to a board. Instead, it displays your app’s settings in multiple locations across the product, ensuring users can easily access and configure them.

# Background

The **account settings view** acts as a central hub for managing global app preferences and permissions.
It enables developers to create an experience where users can configure settings that apply across all boards, workspaces, or users in the account, without needing to access each instance individually.

Unlike traditional views, which are tied to a specific board or item, the account settings view functions at the account level. This ensures that app settings remain easily accessible from multiple entry points, such as the app listing, a view settings menu, or the *Administration* section.

# Implementation

## Step 1: Create an Account Settings View Feature

You can add the account settings view the same way you would create any other view feature from the Developer Center.

1. Create a new [feature](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
2. Type *Account settings view* in the search bar.
3. Click **Create** to proceed to configuration.
4. This opens the *Feature Details* page, where you can upload your build.

## Step 2: Configure the Feature

After creating a new Account Settings View feature, you'll be redirected to the feature configuration page. There, you can configure the following:

* **Feature Details:** Choose a deployment method and [deploy your app](https://developer.monday.com/apps/docs/deploy-your-app#/)
* **View Setup:**  Select your view’s source (either a custom URL or published build) and preview how it will appear to users

# Accessing the Account Settings View

Once implemented, the view is automatically displayed in three key locations within the app, providing users with multiple entry points for managing their settings.

## *Settings* tab

The *Settings* tab appears on your app’s listing page when accessed from the *Installed apps* section.
Users can access this screen by opening the app marketplace and selecting *Installed apps* in the top-right corner of the modal.

<Callout icon="🚧" theme="warn">
  The tab will only appear when the user accesses the app through the _Installed apps_ screen. It will not display when navigating from other areas of the product.
</Callout>

<Image align="center" border={true} src="https://files.readme.io/f762269-Settings_tab.png" className="border" />

## *View settings* button

When a user opens one of your app’s views, they can click the **settings icon (⚙︎)** in the top-right corner to access the *View Settings*. From there, they can select **Go to app settings** to be redirected to the *Settings* tab on your app’s listing page.

<Image align="center" border={true} src="https://files.readme.io/cf96b2c-go_to_app_settings.png" title="Go to app settings" className="border" />

## *Administration* section

Users can also access your app’s *Settings* tab through the *Administration* section:

1. Click your profile picture in the top right corner.
2. Select **Administration**.
3. Click **Apps** in the left-hand menu to see a list of all installed apps.
4. Locate your app, click the **three dots (...)**, and select **Settings** to open the same *Settings* tab.

<Image align="center" border={true} src="https://files.readme.io/df79f60-admin_section_settings.png" title="Admin section settings" className="border" />

<br />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
