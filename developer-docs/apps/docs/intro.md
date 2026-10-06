---
updatedAt: 2026-02-09T21:49:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
