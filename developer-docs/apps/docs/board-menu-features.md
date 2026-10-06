---
updatedAt: 2026-01-30T16:16:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Board menu features

monday.com <a href="https://support.monday.com/hc/en-us/articles/115005317249-The-Basics-of-a-Board" target="_blank">boards</a> and <a href="https://support.monday.com/hc/en-us/articles/115005319105-The-basics-of-items" target="_blank">items</a> play an integral role in the system and form the building blocks that allow users to create and store data. Traditional board and item views enable your app to display and update a board and its items, but it is essential to support apps that work on an item or group level.

Board menu app features do just that. These app features extend the platform by enabling developers to create apps that work on a single group, a single item, or multiple items. They live in three different locations on the platform, and each app feature serves a different purpose based on your app's logic:

1. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-group-menu">Board group menu</a>
2. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-item-menu">Board item menu</a>
3. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-multi-item-menu">Board multi-item menu</a>

This guide walks through each of the three board menu features and teaches you how to build your own. Let's get started!

# Building a board menu feature

1. Click on your profile picture in the top right corner.
2. If you don't have *Developer mode* activated, follow these steps. Skip to **step 3** if you already activated it.
   1. Select **monday.labs**.
   2. Type *Developer mode* in the search bar.
   3. Click **Activate** and close the modal.
   4. Wait for the page to refresh.
   5. Click on your profile picture again.
3. Select **Developers**. This will open the *Developer Center* in a new tab.
4. On the new tab, click **Create app**.
5. Navigate to the *Features* tab and select **Create feature**.
6. In the search bar, type *board*. This will show you all the board app features.
7. Select the <a href="https://developer.monday.com/apps/docs/board-menu-features#selecting-a-board-menu-feature" target="_blank">board menu feature</a> you'd like to build.
8. Click **Create**.

# Selecting a board menu feature

## Board group menu

The *board group menu* feature only works on groups and enables your app to perform an action on a single group. When a user hovers over a group, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single group on a board, such as reordering items in the group, sending the items as text to another app, or compiling a list.

<Image align="center" className="border" border={true} src="https://files.readme.io/9650e48-Board_group_menu.png" />

## Board item menu

The *board item menu* feature only works on items and enables your app to perform an action on just one item. When a user hovers over an item, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single item on a board, such as populating an item's columns based on information from a third-party application or sending the item's as text to another app.

<Image align="center" className="border" border={true} src="https://files.readme.io/4a5d28a-Board_item_menu.png" />

## Board multi-item menu

The *board multi-item menu* feature only works on items and enables your app to perform an action on multiple items. When a user selects one or more items, a menu opens at the bottom of the screen and your app appears under the *Apps* section.

You can use this feature for any app that works on one or more items, such as merging multiple items into one, reordering them, or sending them as text to another app.

**Please keep in mind** that users won't be prevented from using this app feature regardless of the number of selected items!

<Image align="center" className="border" border={true} src="https://files.readme.io/e8b87d3-Board_multi_item_menu.png" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
