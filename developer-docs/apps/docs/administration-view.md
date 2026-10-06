---
updatedAt: 2026-01-30T16:20:34.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Administration View

The administration view is a new app feature for creating apps that can only be accessed by account admins in the [Administration](https://support.monday.com/hc/en-us/articles/115005321509-The-Administration-section-on-monday-com) section. App developers can build tools for their own accounts or list them in the app marketplace.

# Concepts

Administration view app features appear in the [Administration section](https://support.monday.com/hc/en-us/articles/115005321509-The-Administration-section-on-monday-com) and are ideal for bulk actions, centralized data reporting, and managing account-wide configurations. Unlike traditional view app features that connect to specific boards or items, administration views operate independently of specific monday.com contexts. This independence makes them perfect for the types of [use cases](https://developer.monday.com/apps/docs/administration-view#use-cases) described below.

Just like other view app features, administration views are rendered as iframes served from a custom URL or directly from monday.com's infrastructure. The content will span the entire screen, giving your app more visibility and users a better experience.

<Image align="center" border={true} src="https://files.readme.io/07d2b5a4d234ea70569c37148c8d7391d648f032371453552bff5db23ad03322-Administration_Apps.png" className="border" />

## Use cases

Whether you're building an internal app or one for the marketplace, the administration view is ideal for creating tools that help admins manage, optimize, and monitor account-level activity across the organization. Here are a few ideas to help you get started:

### Account administration and management

* **Bulk user updates:** Change user or team attributes (e.g., roles, departments, or permissions) across the account
* **Bulk assignments:** Enable project managers to bulk assign or unassign users and guests across boards
* **Audit log visualization:** Use the [Audit Log API](https://support.monday.com/hc/en-us/articles/4406042650002-Audit-Log-API) to display recent security or activity events, helping admins track changes and investigate issues

### Tools to increase adoption among monday users

* **Board activity tracking:** Visualize the most recently updated or active boards to highlight adoption trends
* **User engagement insights:** Rank users by activity levels and collaboration metrics to spotlight champions

### Product-specific examples

#### **monday CRM**

* **Process consistency checker:** Compare the column structure of multiple sales boards to ensure consistent processes and deal tracking across teams

#### **monday Dev**

* **Board cleanup dashboard:** Identify boards that are outdated, overloaded, or no longer in use to clean or archive them
* **Optimization suggestions:** Flag boards that could benefit from automation, better structure, or archiving

#### **monday Service**

* **Service board structure checker:** Compare service or support boards to ensure processes and SLAs are applied consistently across teams

# Implementation

## Create your app feature

1. Click your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in a new tab.
3. Select an existing app or create a new one.
4. Navigate to the *Build* section on the left-side menu.
5. Click **Features** and **Create new feature**.
6. Type **Administration view** in the search bar or scroll until you find the app feature card.
7. Select the **Administration view** feature and click **Create**. This will take you to the *Feature Details* page.

## Configure your app feature

1. Once on the *Feature Details* page, you can rename your app feature, write a description, provide links where users can learn more about the app or give feedback, and select a custom icon.
2. When you're ready, select your deployment method and [deploy your app](https://developer.monday.com/apps/docs/deploy-your-app).

## Test your app

1. Click **Save changes**.
2. Promote the [draft version to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).
3. [Install the app](https://developer.monday.com/apps/docs/install-and-share-your-apps#install-your-app) on your account. This makes the app visible to all account admins.
4. Open the marketplace by clicking on the **puzzle icon** from within the monday.com product.
5. Navigate to the **Installed** apps page and locate your app. Here's what it looks like in the UI:

<Image align="center" border={true} src="https://files.readme.io/e5a76150f21fd9342e052d7a035b07c1411d510066f7e3dc024af7662687e417-Installed_Apps_Page.png" className="border" />

## Locate your app in the UI

Once your app is ready, you can access it in the [Administration section](https://support.monday.com/hc/en-us/articles/115005321509-The-Administration-section-on-monday-com) by following these steps:

1. Click your profile picture in the top right corner.
2. Select **Administration**.
3. Click **Administration apps** on the left-side menu and locate your desired app.
