---
updatedAt: 2025-10-23T05:12:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# User onboarding

This guide covers features you can implement and the onboarding flow that you can follow to provide users with a smooth onboarding experience.

# Why should I set up an onboarding flow in my app?

Providing a simple and intuitive user experience is **one of the best ways to increase app adoption**, reduce friction between installation and usage, and convert users to paid plans. Users are more likely to download and use an app if they understand the value of the app, what it does, and how to use it.

As app developers, this is helpful information we can use to improve apps, ultimately leading to increased app adoption and usage. That's why we've optimized our onboarding experience to seamlessly guide users through the post-installation process and clearly convey an app's capabilities.

# What's in this guide

In this guide, we walk through the available features to help you level up your app and create a great user experience! We have organized these best practices into three different parts:

* **Onboarding configuration tab:** Tab in the app management section that define your app's onboarding flow
* **User onboarding experience:** What the user will see when they go through various onboarding flows
* **Additional features:** Extra features that you can implement to improve your app

# Onboarding configuration tab

The onboarding configuration tab defines the flow users follow when they start using your app. It is located on the left side of the app management section.

You can specify whether the app uses a landing feature, a template, or both. Based on your selection, we will present different UIs to the user. It automatically defaults to *Don't set up a starting point*.

<Image align="center" className="border" border={true} src="https://files.readme.io/e357c2b9ca208b3e3188d81f054b1461ae8ae128ca8e7292c878e696b031c67c-Onboarding_Tab.png" />

## Starting point

The **starting point** is the feature or template that opens when a user tries to set up your app for the first time.

### Why should I use the starting point?

Many apps have multiple features available, but some users might not know how to use each one. To eliminate unnecessary confusion, you can identify and select a starting point that best represents your app's initial and essential functionality.

The starting point then becomes the default when a user opens that workflow. Doing so helps eliminate confusion for people using your app by directing them to your app's main feature. When choosing your starting point, you should ask yourself which view is the best to start with and which feature clearly demonstrates your app's purpose.

### Defining your starting point

After determining what your starting point will be, you can set up an onboarding flow.

1. Open the *Onboarding* tab.
2. Select **Specific feature or a template as starting point**. If your app only has <a href="<https://developer.monday.com/apps/docs/workspace-templates>" target="_blank">templates</a>, you can choose **Templates only as a starting point**.
3. If you selected **Specific feature or a template as starting point**, navigate to the *Choose starting point feature* dropdown and select which one of your app's features you'd like to use as the starting point.
4. Click **Save app.**

# Onboarding experience

Users can navigate through the app marketplace to browse through apps and relevant solutions. Once they find and install an app, it will appear on the *Installed apps* page in the top-right corner. From there, users can see and access the apps installed on their accounts.

## Starting point template and existing workspace

After installing your app, users will need to determine how they would like to use the app. If you selected **Specific feature or template as a starting point**, they will see a screen with two different buckets where they can decide if they want to use a template or a predefined starting point feature.

<Image title="Starting point screen.png" alt={1789} align="center" className="border" border={true} src="https://files.readme.io/8a723b3-Starting_point_screen.png" />

If the user starts with a template, they must specify which template they want to use and which workspace to add the app to. If the user begins with the starting point feature workflow, they must specify which workspace and board to add the app to.

## Template-only

If you selected **Templates only as a starting point**, users will not see the buckets and will instead be prompted to select which template they want to use. If your app only has one template, users only need to specify which workspace to add the app to.

<Image title="templates.png" alt={1789} align="center" className="border" border={true} src="https://files.readme.io/67742d2-templates.png" />

After selecting a feature, users can <a href="https://developer.monday.com/apps/docs/configuring-your-app-1" target="_blank">configure your app</a> and explore what it can do! Please note that for all users to get access to this flow, you must release a new minor version of your app. You can read more about versioning in our <a href="https://developer.monday.com/apps/docs/versioning" target="_blank">documentation</a>.

## Testing your onboarding experience

You can test your app's onboarding experience before it goes into the marketplace if you want to see it from a user's perspective.

Once you <a href="https://developer.monday.com/apps/docs/installing-your-app#how-do-i-install-an-app-on-my-own-account" target="blank">install</a> the app on your account, it will appear on the *\_\_Installed apps* page in the *Installed outside the marketplace* section. From there, you can initiate the onboarding experience that users will have once they install the app from the marketplace. This section also contains any apps installed but not necessarily developed on your account, like apps <a href="https://developer.monday.com/apps/docs/share-your-apps#different-ways-to-share-your-apps" target="_blank">shared</a> with you.

<Image title="Apps installed outside the marketplace.png" alt={1789} align="center" className="border" border={true} src="https://files.readme.io/a7876e1-Apps_installed_outside_the_marketplace.png" />

# Additional resources

### Example code

The *Onboarding example app* shows a number of features to create a seamless onboarding experience. Check out this video to see the user onboarding flow first-hand and learn onboarding best practices!

<Embed url="https://www.youtube.com/watch?v=MaEHUar1rAY" title="Example app for onboarding good practices" favicon="https://www.google.com/favicon.ico" image="https://i.ytimg.com/vi/MaEHUar1rAY/hqdefault.jpg" provider="youtube.com" href="https://www.youtube.com/watch?v=MaEHUar1rAY" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FMaEHUar1rAY%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DMaEHUar1rAY%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FMaEHUar1rAY%252Fhqdefault.jpg%26key%3Df2aa6fc3595946d0afc3d76cbbd25dc3%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

### "Works on" tab

The *Works on* tab provides a dedicated space to list all of the app's features so users can better understand its functionality.

<Image title="works on tab.png" alt={1788} align="center" className="border" border={true} src="https://files.readme.io/d1fcc1f-works_on_tab.png" />

### "How to use" tab

The *How to use* tab is a similar space that allows you to share relevant instructions and information that users need to operate your app. You can choose whether or not you want to incorporate this tab on your app listing page, but we highly recommend doing so to provide users with more context and walk them through using your app.

<Image title="how to use page.png" alt={1792} align="center" className="border" border={true} src="https://files.readme.io/4dd0c1f-how_to_use_page.png" />

All of these features can help you provide a smooth user experience, ultimately increasing app adoption and usage post-installation. While some features are optional, we recommend incorporating as many as possible to elevate your app. Happy onboarding!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
