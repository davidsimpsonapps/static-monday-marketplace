---
updatedAt: 2026-01-30T16:15:02.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# AI assistant

The monday.com AI assistant app features leverage the power of artificial intelligence (AI) to build on top of the platform and extend its functionality through AI-powered applications. The features unlock the potential to further automate workflows and tasks on boards, items, and docs across the platform.

Every app contains one of six different app features that are accessible from various locations on the monday.com platform, and each app feature serves a different purpose based on your app's logic.

After selecting your feature and building your app, you can keep it just for personal use or submit it to the app marketplace for other monday.com customers. From translating content to another language to analyzing data to optimize workflows, the opportunities are endless with AI assistant apps!

Keep reading to learn about each of the six AI assistant app features, how to create a new one, and the available SDK support. You can move on to our <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant" target="_blank">quickstart guide</a> once you're ready to build your own AI assistant app. Let's get started!

# Building your AI assistant app

You can create a new AI assistant app in just a few steps! We'll walk through the basics here, but you can always check out our <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant" target="_blank">quickstart guide</a> for an in-depth tutorial.

1. The account admin must enable the <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#enable-the-ai-assistant-beta" target="_blank">AI assistant beta</a> and <a href="https://developer.monday.com/api-reference/docs/getting-started-1#developer-mode" target="_blank">developer mode</a>.
2. After enabling both features, click on your profile picture in the top right corner.
3. Select **Developers**. This will open the *Developer Center* in a new tab.
4. On the new tab, click **Create app**.
5. Navigate to the *Features* tab and select **Create feature**.
6. On the pop-up, click **Filter by type** and select **AI**. This will show you all the locations that the AI assistant is supported on.
7. Select the <a href="https://developer.monday.com/apps/docs/ai-assistant#selecting-your-app-feature-location" target="_blank">app feature location</a> you'd like to build.
8. Click **Empty feature** and then **Create**.
9. You will be redirected to the feature details tab. From there, you can create a build and edit your new feature. Most importantly, you can select the shape of the iFrame that your app appears in.

<HTMLBlock>{`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
  box-sizing: border-box;
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  flex: 33.33%;
  padding: 1px;
}

</style>

</head>
<body>
<div class="row">
  <div class="column">
    <img src="https://res.cloudinary.com/monday-platform-dev/image/upload/v1686859591/Square_iframe.png" alt="Square" class="center" border="1" style="width:120%">
    <figcaption><b>Square iFrame</b></figcaption>
  </div>
  <div class="column">
    <img src="https://res.cloudinary.com/monday-platform-dev/image/upload/v1686859591/Tall_iframe.png" alt="Tall" class="center" style="width:120%">
    <figcaption><b>Tall iFrame</b></figcaption>
  </div>
    <div class="column">
    <img src="https://res.cloudinary.com/monday-platform-dev/image/upload/v1686859591/Wide_iframe.png" alt="Wide" class="center" style="width:120%">
    <figcaption><b>Wide iFrame</b></figcaption>
  </div>
</div>

</body>
</html>
`}</HTMLBlock>

10. After making changes to your feature, click **Save feature**.
11. Now, you can test your app in a live doc or board!

# Selecting your app feature location

When planning your AI assistant app, consider what you want it to do, what product you want it to work on, and where it'll appear on the platform. We've created six different app feature locations that you can choose from based on your app's logic: <a href="https://developer.monday.com/apps/docs/ai-assistant#board-header-ai-assistant" target="_blank">Board header AI assistant</a>, <a href="https://developer.monday.com/apps/docs/ai-assistant#update-ai-assistant" target="_blank">Update AI assistant</a>, <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-header-ai-assistant" target="_blank">Doc header AI assistant</a>, <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-command-ai-assistant" target="_blank">Doc command AI assistant</a>, <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-toolbar-ai-assistant" target="_blank">Doc toolbar AI assistant</a>, and <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-quickstart-ai-assistant" target="_blank">Doc Quickstart AI assistant</a>.

Each lives in a different platform location, supports different SDK methods based on the app's context, and works with different monday.com products (docs, boards, items, etc.). Your app can contain one or more of these features, but you may have to utilize various SDK methods based on your chosen locations.

When using the AI assistant from different contexts, a dialog will always be opened. For all the possible dialogs you can use the `monday.execute("closeDialog")` <a href="https://developer.monday.com/apps/docs/mondayexecute#close-ai-dialog" target="_blank">SDK method</a> to close them.

## Board header AI assistant

The *Board header AI assistant* feature only works on boards and enables your app to perform an action on the board level. It appears on a board's top menu underneath the list of views and the board's name. The *AI Assistant* button will remain visible while the board is open.

You can use this feature for apps that work on the whole board, such as task generation, sorting, or data entry.

<Image align="center" className="border" border={true} src="https://files.readme.io/012809d-Board_header_AI_assistant.png" />

## Update AI assistant

The *Update AI assistant* feature only appears on updates and enables your app to create a new update. It appears when a user opens an item's updates section and clicks in the *Write an update...* box or edits an existing update.

You can use this feature for text-related actions, such as editing, composing, translating, or reformatting. It accepts the <a href="https://developer.monday.com/apps/docs/mondayexecute#create-or-update-an-update" target="_blank"> `updatePostContentAction`</a> SDK method.

<Image align="center" className="border" border={true} src="https://files.readme.io/dd1d19a-Update_AI_assistant.png" />

## Doc header AI assistant

The *Doc header AI assistant* feature only works on monday docs and enables your app to perform an action on the entire doc. It appears on a monday doc's main menu at the top of the screen.

You can use this feature for apps that work on all content within a document, such as exporting, translating, or summarizing. It accepts the <a href="https://developer.monday.com/apps/docs/mondayexecute#add-multiple-document-blocks" target="_blank">`addMultiBlocks`</a> SDK method.

<Image align="center" className="border" border={true} src="https://files.readme.io/791c961-Doc_header_AI_assistant.png" />

## Doc command AI assistant

This feature only works on monday docs and enables your app to perform an action on the entire doc. Just like the doc actions <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs#add-block-menu-or-slash--command" target="_blank">add block menu</a>, it appears in the menu that opens when you type a forward slash (/).

You can use this feature for apps that add content to a doc, such as templates. It accepts the <a href="https://developer.monday.com/apps/docs/mondayexecute#add-multiple-document-blocks" target="_blank">`addMultiBlocks`</a>, <a href="https://developer.monday.com/apps/docs/mondayexecute#replace-highlighted-text" target="_blank">`replaceHighlightText`</a>, <a href="https://developer.monday.com/apps/docs/mondayexecute#open-app-on-previous-block" target="_blank">`moveToPrevSelectedTextualBlock`</a>, and <a href="https://developer.monday.com/apps/docs/mondayexecute#open-app-on-next-block" target="_blank">`moveToNextSelectedTextualBlock`</a> SDK methods.

<Image align="center" className="border" border={true} src="https://files.readme.io/d0e0ea1-Doc_command_AI_assistant.png" />

## Doc toolbar AI assistant

This feature only works on monday docs and enables your app to perform an action just on a highlighted section of a doc. Just like the doc actions <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs#contextual-toolbar" target="_blank">contextual toolbar</a>, it appears in the toolbar that opens when a user highlights content within a doc. The toolbar will disappear as soon as they click out of the highlighted block.

You can use this feature for any actions related to a particular block in a doc (not the entire document), like editing, translating, or reformatting. It accepts the <a href="https://developer.monday.com/apps/docs/mondayexecute#add-multiple-document-blocks" target="_blank">`addMultiBlocks`</a>, <a href="https://developer.monday.com/apps/docs/mondayexecute#update-document-block" target="_blank">`updateDocBlock`</a>, and <a href="https://developer.monday.com/apps/docs/mondayexecute#open-app-on-the-selected-block" target="_blank"> `openAppOnFirstTextualSelectedBlock`</a>.

<Image align="center" className="border" border={true} src="https://files.readme.io/2ae9baf-Doc_toolbar_AI_assistant.png" />

## Doc Quickstart AI assistant

The *Doc quickstart AI assistant* feature only works on monday docs and enables your app to perform an action on the entire doc. It lives in the *Start with AI* button that appears when a user first creates a new doc. The button still appears if a user makes a new doc from a monday doc column. Once they edit the doc, the button will only reappear if the user clears, exits, and reopens it.

You can use this feature for apps that generate templates. It accepts the <a href="https://developer.monday.com/apps/docs/mondayexecute#add-multiple-document-blocks" target="_blank">`addMultiBlocks`</a> and <a href="https://developer.monday.com/apps/docs/mondayexecute#add-multiple-document-blocks-with-html" target="_blank"> `addMultiBlocksFromHtml`</a> SDK methods.

<Image align="center" className="border" border={true} src="https://files.readme.io/3ad0ba4-Doc_Quickstart_AI_assistant.png" />

## API and SDK support

You can also use other <a href="https://developer.monday.com/apps/docs/mondayexecute" target="_blank">SDK methods</a> and the <a href="https://developer.monday.com/api-reference/docs" target="_blank">API</a> to support your AI assistant app, even if they're not explicitly stated above for each app feature location. For example, when using the `monday.listen` <a href="https://developer.monday.com/apps/docs/mondaylisten" target="_blank">SDK method</a> to get the context in which the app is being used, you can retrieve data like the `workspaceId`,  `boardId`,  `docId`,  `pulseId`, and `objectId`. You can then use this information in your API <a href="https://developer.monday.com/api-reference/docs/introduction-to-graphql#query" target="_blank">queries</a> and <a href="https://developer.monday.com/api-reference/docs/introduction-to-graphql#mutation" target="_blank">mutations</a> to interact with the account's data.

For AI assistant apps in monday workdocs, the available SDK methods change based on where a user is in the document. You can see the available methods in the `additionalSdkMethodsList` field when using `monday.listen` to get the app's context.

Let's say you create a <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-toolbar-ai-assistant" target="_blank">doc toolbar AI assistant app</a>. When the user selects a single block in the workdoc, the `replaceHighlightText` and the `addMultiBlocks` methods will be available. When they select multiple blocks, the `openAppOnFirstTextualSelectedBlock`, `addMultipleBlocks`, and `updateDocBlock` methods will be available. Note that when multiple blocks are selected, there is a method available to open the first block, which is not available when one block is selected. In each specific situation, you will get the list of the available methods within the `additionalSdkMethodsList` field from the context.

> 👍 Pro tip
>
> Make sure you u<a href="https://www.npmjs.com/package/monday-sdk-js/v/0.4.0" target="_blank">v0.4.0</a> or later to use these SDK methods!

# Use cases

Now that you know a bit about each of the six app feature locations, you may wonder which one(s) is best for your app. Your app can support more than one of the app feature locations based on its logic, but you may have to implement multiple SDK methods. Let's walk through a few scenarios to help!

1. You want to create an app that summarizes text. This type of app can work in multiple locations, like the *Doc toolbar*, *Doc header*, and *Update AI assistant*.
2. You want to build an app that creates preformatted templates. This type of app can work on both the *Update AI assistant* and *Doc Quickstart* locations.
3. You want to create an app that exports data. This type of app can also work in multiple locations, like the *Board header* and *Doc header*.
4. You want to build an app that integrates a voice assistant. This type of app can work in any of the six app feature locations, so take your pick!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
