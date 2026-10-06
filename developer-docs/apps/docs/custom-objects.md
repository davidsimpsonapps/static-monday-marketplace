---
updatedAt: 2026-01-30T16:33:56.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Custom Objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform.

Traditional views and widgets must be connected to a specific dashboard, board, or item on monday. While this format works for some features, others may require a separate space to visualize data outside of a board, item, or dashboard.

That's where custom objects come in. They allow features to live independently in the left-pane menu so that users can access the view outside the context of a specific dashboard, board, or item. You can use the view as a standalone app or for a specific feature within an app.

Custom objects are rendered as iframes served from a custom URL or directly from our CDN. Aside from the title and top header, the displayed content will span the entire screen. This view gives your app more visibility to users in the account, ultimately providing a better customer experience.

# Building a custom object

You can add this feature just like you would any other <a href="https://developer.monday.com/apps/docs/quickstart-view#create-your-monday-app" target="_blank">view</a> from the developer section.

1. Click your profile picture in the top right corner of the platform.
2. Select **Developers**. This will open the *Developer Center* in another tab.
3. Select an existing app or create a new one.
4. Navigate to the *Features* tab on the left-side menu.
5. Click **Create new feature**.
6. Type *Object* in the search bar or scroll until you find the feature card.
7. Select the *Object* feature and click **Create**.
8. This will take you to the *Feature details* page where you can upload your build.

# Accessing a custom object

Users can access the feature by clicking the **Add item to workspace (+)** button at the top of the left side menu, just like they would for a doc or board. They then can select **Apps** and look for your app in the *Installed* section.

<Image align="center" className="border" border={true} src="https://files.readme.io/c3d8ebf-Custom_object_feature.png" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
