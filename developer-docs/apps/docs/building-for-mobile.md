---
updatedAt: 2025-12-02T20:57:54.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Building for Mobile

Learn how to build monday.com apps for mobile devices

<Callout icon="🚧" theme="warn">
  **Beta: This feature is in testing and may change as improvements are made**
</Callout>

Apps built on the monday.com app framework can now run on mobile devices. Previously, apps were only available on the web platform; however, developers can now extend existing app functionality to both iOS and Android systems.

This enhancement allows apps to deliver a consistent experience across devices while maintaining the same underlying architecture. However, not all SDK methods are currently supported on mobile devices, and certain UI adjustments may be necessary to ensure a smooth user experience on smaller screens.

This guide covers the key considerations for enabling and optimizing mobile compatibility, including:

* Supported and unsupported app features and SDK methods
* Required UI and UX considerations for mobile screens
* Steps to enable mobile compatibility in the Developer Center
* Testing recommendations for ensuring mobile performance and usability

# App Features and SDK Methods

Mobile compatibility is currently limited to a set of app features and SDK methods. This section outlines what’s supported to help you ensure consistent app behavior across devices.

## App Features

Integration app features have always been supported on the monday.com mobile app. In the beta, the following [view app features](https://developer.monday.com/apps/docs/quickstart-view) are also supported on mobile:

* Board view
* Item view

Any app feature not listed above is not currently supported.

<Callout icon="💡" theme="default">
  Automations, integrations, and workflows run in the background, so they work seamlessly on mobile devices. However, users can’t access or manage these features directly from the mobile app interface.
</Callout>

## SDK Methods

For mobile app development, we currently support a handful of SDK methods for both iOS and Android. All supported methods behave the same across operating systems.

Features using the following SDK methods will work out of the box on mobile and do not require additional development:

* [`monday.api`](https://developer.monday.com/apps/docs/mondayapi)
* [`monday.execute("confirm")`](https://developer.monday.com/apps/docs/mondayexecute#confirm)
* [`monday.execute("notice")`](https://developer.monday.com/apps/docs/mondayexecute#notice)
* [`monday.execute("openCreateItemDialog")`](https://developer.monday.com/apps/docs/mondayexecute#opencreateitemdialog)
* [`monday.execute("openItemCard")`](https://developer.monday.com/apps/docs/mondayexecute#openitemcard)
* [`monday.execute("openLinkInTab")`](https://developer.monday.com/apps/docs/mondayexecute#openlinkintab)
* [`monday.get("context")`](https://developer.monday.com/apps/docs/mondayget)
* [`monday.get("itemIds")`](https://developer.monday.com/apps/docs/mondayget)
* [`monday.get("sessionToken")`](https://developer.monday.com/apps/docs/mondayget)
* [`monday.get("settings")`](https://developer.monday.com/apps/docs/mondayget)
* [`monday.listen("context")`](https://developer.monday.com/apps/docs/mondaylisten)
* [`monday.listen("itemIds")`](https://developer.monday.com/apps/docs/mondaylisten)
* [`monday.listen("settings")`](https://developer.monday.com/apps/docs/mondaylisten)
* [`monday.set`](https://developer.monday.com/apps/docs/mondayset)
* [`monday.storage`](https://developer.monday.com/apps/docs/mondaystorage)

Any [SDK](https://developer.monday.com/apps/docs/introduction-to-the-sdk) method not listed above is not currently supported on mobile. Your app should account for the missing SDK methods with additional logic to cover the gaps or replace interfaces that rely on them.

For example, the `monday.execute("openPlanSelection")` method is not supported. You should remove or disable any related UI elements to avoid broken functionality or layout issues.

<Callout icon="🔍">
  ### Detecting Mobile Mode

  When running inside the mobile app, your app's context will include the `mode:mobile` field. You can access is using either [`monday.get("context")`](https://developer.monday.com/apps/docs/mondayget#/parameters) or [`monday.listen("context")`](https://developer.monday.com/apps/docs/mondaylisten#/events), and use it to adjust your app's behavior for mobile-only or unsupported actions. 
</Callout>

# Enable Mobile Compatibility

By default, apps are not compatible with mobile. You must manually enable mobile compatibility for **each app feature** in the Developer Center:

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center).
2. Navigate to the *Build* tab and select **Features**.
3. Open the relevant app feature and click the **Mobile Compatibility** checkbox. This makes the feature mobile-compatible.
4. Click **Save**.

## Test Your App

After enabling mobile compatibility, test your app on both iOS and Android devices to ensure all functionality works as expected. Verify that your app's layout adapts well to smaller screens and that all supported SDK methods behave as intended.
