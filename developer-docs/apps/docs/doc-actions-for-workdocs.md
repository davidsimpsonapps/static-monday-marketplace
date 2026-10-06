---
updatedAt: 2026-01-30T16:19:34.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Doc actions for workdocs

This guide dives into the *doc action* feature details! You will learn about the feature, why it is useful, how to implement it, and the essential details required to build with it.

monday.com <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a> provide an innovative solution for users to collaborate and execute plans in one central location. Workdocs serve as virtual whiteboards that allow users to operate synchronously and asynchronously without losing any work.

Users can add various elements to their docs to bring all of their work together, including apps. The *doc action* feature allows developers to create plug-ins that integrate apps with workdocs, making the app accessible to users from two locations inside documents.

Previously, apps were only available in the marketplace to install on accounts and use in boards, items, dashboards, and integrations. This feature bridges the gap between the marketplace and workdocs by bringing app capabilities to a previously untouched monday.com product. Doing so exposes developers to an entirely new market, ideally leading to increased app exposure, adoption, and usage.

Developers aren’t the only ones to benefit from this feature. Users also get access to a more robust workdocs product that can help them create more complex workflows, automate processes, and improve their overall app experiences. With the doc action feature, the sky is the limit!

This guide will walk through the rest of the feature details and how to implement them. Check out this video to get started!

<Embed url="https://www.youtube.com/watch?v=Y66wr25bYxo" href="https://www.youtube.com/watch?v=Y66wr25bYxo" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FY66wr25bYxo%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DY66wr25bYxo%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FY66wr25bYxo%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

# Building a doc action feature

You can add this feature just like you would any other <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">view</a> from the developer section.

1. Select the **Create New Feature (+)** button on the left side menu to launch the feature modal.
2. Click **Doc Actions** > **Start from scratch**. This will take you to the *Feature Details* page.
3. Complete the fields on this page and upload your build. Please note that whatever you put in the *Name* field will display on the buttons/commands inside the doc.
4. You can also select where your app appears by checking one (or both) of the *Contextual toolbar* and *Add block menu* boxes.

Once you've completed these steps, you can test your app in a live workdoc! If you added your app to the *contextual menu*, you need to take the following steps to activate the feature:

1. Click on your profile picture/avatar inside of monday.
2. Select **monday.labs.**
3. Type *Apps in docs* in the search bar.
4. Click **Activate.**

After testing your app, you're ready to go. You can start using it or prepare to <a href="https://developer.monday.com/apps/docs/submit-your-app" target="_blank">submit your app</a> for review if you want to list it in the marketplace.

# Accessing a doc action feature

Workdocs are comprised of elements called blocks that contain the doc's contents. The doc action feature allows developers to add new blocks using the *add block menu* or new actions on specific blocks using the *contextual toolbar*. When creating the feature, you can decide which of these access points makes the most sense based on your app's logic (and yes, you can choose both if it makes sense for your app!)

## Add block menu or slash (/) command

If your app involves creating new blocks, you can add your app to the *add block menu*. These apps extend the core functionality of workdocs by building new blocks on top of the existing product.

When a user opens an empty doc or navigates to a blank line in a doc, the blue *Add Content (+)* button appears. Clicking on this button will open a list of formatting options with an *Apps* section at the bottom. Users can select the app they want to use, and an iframe modal will open with the app’s content.

They can also trigger the feature with the slash command (/) followed by the app name. For example, if a user wants to use an app called TranslatorApp, they could type */translatorapp*.

<Image align="center" alt={1194} border={true} src="https://files.readme.io/7897db0-doc_actions_-_add_block_menu_or_slash_command.png" title="doc actions - add block menu or slash command.png" className="border" />

## Contextual toolbar

If your app involves performing an action to specific blocks, you can add your app to the *contextual toolbar*.

Once a user highlights content inside a doc, a toolbar appears with a variety of formatting options. They can select the *marketplace puzzle piece* button to launch a menu of the apps installed on their account. Users can click on the app they want to use to launch the app's content in an iframe modal.

<Image align="center" alt={758} border={true} src="https://files.readme.io/6c90932-Doc_action_-_contextual_toolbar.png" title="Doc action - contextual toolbar.png" className="border" />

# API and SDK support

We support this feature through both the API and SDK.

You can use both the <a href="https://developer.monday.com/api-reference/docs/docs" target="_blank">docs</a> and <a href="https://developer.monday.com/api-reference/docs/blocks" target="_blank">blocks</a> API reference documents to learn more about the API support we provide. The <a href="https://developer.monday.com/apps/docs/mondayexecute" target="_blank">SDK</a> also contains a handful of methods that allow you to add, update, and delete blocks.

## Delta format

Each block's content is defined by a content JSON object containing multiple attributes, one of which is `deltaFormat`. This attribute is based on Quill's <a href="https://quilljs.com/docs/delta/" target="_blank" rel="_nofollow">Delta format</a> that describes text content as an array of objects.

Creating new blocks and updating existing ones requires familiarity with the Delta format. We recommend using Quill's <a href="https://github.com/quilljs/delta/" target="_blank" rel="_nofollow">Delta library</a> to format your content.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
