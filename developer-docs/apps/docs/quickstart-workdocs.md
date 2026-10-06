---
updatedAt: 2026-01-30T16:10:29.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Doc actions for workdocs 

This guide will teach you how to build your first app on top of monday workdocs using the *doc action* feature.

Building apps for workdocs using the *doc action* feature allows you to create new collaboration tools for monday users, such as text validation and idea generation.

In this guide, we're going to build a simple doc action app that lets users automatically capitalize a highlighted portion of a document.

<Embed url="https://www.youtube.com/watch?v=1SG7LwviOQk" title="Develop your first workdoc app | monday app developers" favicon="https://www.google.com/favicon.ico" image="https://i.ytimg.com/vi/1SG7LwviOQk/hqdefault.jpg" provider="youtube.com" href="https://www.youtube.com/watch?v=1SG7LwviOQk" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252F1SG7LwviOQk%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253D1SG7LwviOQk%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252F1SG7LwviOQk%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

# Build your first app

## Download the example code

Download the example code from the monday Github repo. You can either download the zip file from <a href="https://github.com/mondaycom/welcome-apps" target="_blank">Github</a> or use the `git clone` command:

```
$ git clone https://github.com/mondaycom/welcome-apps.git
```

## Install ngrok

This example uses a service called ngrok to securely connect your local environment to the internet. To use it, you'll need to set up a free account and install the software.

If you've used ngrok before, you can skip this step.

1. Download and install the software from the [ngrok website](https://ngrok.com/download)
2. Create an ngrok account
3. Get your authtoken from [your account dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
4. Add your authtoken to your local installation by running `ngrok config add-authtoken <token>`

## Run the app locally

Once you have the example code and ngrok set up, it's time to run your app.

Open the welcome apps folder in the terminal of your choice and navigate to the `apps/quickstart-workdocs` folder.

```
$ cd apps/quickstart-workdocs
```

Install the dependencies using `npm`.

```
$ npm install --loglevel error
```

Run the code.

```
$ npm run start
```

Navigate to the ngrok dashboard at  <a href="http://localhost:4040/" target="_blank">localhost:4040</a> and copy your tunnel URL from there. Make sure to use the URL that starts with `https://`.

## Create the *doc action* feature

Next, you need to add the *doc action* feature to an existing app and connect that feature to the tunnel URL from the previous step.

1. Click the **Add feature** button on your app's left-side menu.
2. Select **Doc Action** in the modal.
3. On the *Feature Details* page, check the **Contextual Toolbar** box under the *Supported Locations* section.
4. Click **Save Feature**.
5. Once you save your feature, click the **New Build** button on the right of the screen.
6. Add your tunnel URL from the previous step to the *Custom URL* field.
7. Press **Create build** to save the URL.

## Use your app in a monday workdoc

Now you're ready to add the app to a doc and test it out!

1. Create a new workdoc through the **Add** menu on the top left of your workspace. If you've never created a workdoc before, check out this <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">article</a> before moving on.
2. Write some text in your doc.
3. Highlight the text, and a contextual menu will appear.
4. Select the **Apps** puzzle piece icon in the contextual menu.
5. This will open a dropdown menu so that you can select your app feature from the list. A modal will appear with your app embedded inside it.
6. Click the **Capitalize** button.
7. The highlighted text will become capitalized.

# Why it works

After running the example code, you can inspect the code and app configuration to understand why it works the way it does.

Below, we've broken down some guiding principles to explain why the app behaves the way it does to help you use them in your apps.

## Choosing your app's location

Since our app edits existing text, we selected the *contextual toolbar* location. This way, it will only appear when someone highlights content in a workdoc.

We recommend placing your app in the *add block menu* if it creates new workdoc content rather than updating it. If your app has both capabilities, you can add it to each location!

## Using the context object

In the example app, we use an object called `context` that contains information about your app's context. You can retrieve this object using the <a href="https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data" target="_blank">`monday.get`</a> or <a href="https://developer.monday.com/apps/docs/mondaylisten#listen-to-changes-in-your-apps-context" target="_blank">`monday.listen`</a> SDK methods.

In line 20, we use the `monday.get()` method to retrieve the current context. We then use the `focusedBlocks` and `range` attributes to know what content to update.

In this example, we only use two fields from the context. The complete context object contains much more helpful information, like the ID of the current document, what blocks are currently selected, and if the app was launched from the toolbar or add block menu. You can examine the full structure of the context object \[here].

## Using monday.updateBlock() to update doc content

We update the doc's content using the SDK method `monday.updateBlock()` without needing to authenticate or construct a GraphQL query. We recommend using the <a href="" target="_blank">`addBlock`</a>, <a href="" target="_blank">`addMultiBlocks`</a>, and <a href="" target="_blank">`updateBlock`</a> methods in client-side applications. Our GraphQL API supports adding blocks, but the SDK methods are much more straightforward.

## Referencing the Delta library

The content inside each block is defined in <a href="https://quilljs.com/docs/delta/" target="_blank" rel="_nofollow">Delta format</a>, a specification built by Quill. The app uses the `quill-delta` library to manipulate block content instead of doing it manually. We recommend using this <a href="https://github.com/quilljs/delta/" target="_blank" rel="_nofollow">library</a> to prevent any validation errors in your content.

Since the Delta format is just an array of objects, you may be tempted to manipulate the delta-formatted content without a library. We don't recommend this because you will get validation errors if your content has the wrong structure.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
