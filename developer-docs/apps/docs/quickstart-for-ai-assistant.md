---
updatedAt: 2026-01-30T16:10:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# AI assistant

A quick guide to build your first AI assistant app from our template.

Are you looking to build an AI assistant app? This guide is for you!

We will cover all the steps required to build your first AI assistant app in three different sections:

1. <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#creating-and-configuring-your-app" target="_blank">Creating and configuring your app in the monday platform</a>
2. <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#running-your-local-environment" target="_blank">Running the sample app on your local environment</a>
3. <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#connecting-your-local-environment-to-mondaycom" target="_blank">Connecting your local environment to the monday platform</a>

By the end, you'll have your own functioning app by the end of it! If at any point you want to see how the code works, check out our <a href="https://www.twitch.tv/videos/1844496642" target="_blank">live coding session</a>.

# Creating and configuring your app

We're going to start in the monday.com UI. If you haven't got a monday account yet, sign up for one <a href="https://auth.monday.com/users/sign_up_new?developer=true?utm_source=documentation&utm_campaign=ai_assitant" target="_blank">here</a>.

## Enable the AI assistant beta

Since the AI Assistant is still in preview mode, you'll need to enable it on your account once you create one. The account admin also needs to enable developer mode to test the app.

<Embed url="https://www.youtube.com/watch?v=w2wrkXIaK-M" href="https://www.youtube.com/watch?v=w2wrkXIaK-M" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fw2wrkXIaK-M%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dw2wrkXIaK-M%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fw2wrkXIaK-M%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

1. Click on your profile picture in the top right corner.
2. Select **monday.labs**.
3. Type *Developer mode* in the search bar.
4. Click **Activate** and close the modal.
5. Wait for the page to refresh.
6. Type *Ai Apps Assistant For Developers* in the search bar.
7. Click **Activate** and close the modal.
8. Wait for the page to refresh and open a monday board.
9. Accept the terms in the *Welcome to AI Assistant* popup.

## Create an app

You're ready to create your app once you've enabled the AI assistant beta!

1. Click on your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in a new tab.
3. On the new tab, click **Create app**.
4. Change the name of your app and hit **Save**.

## Create an AI assistant feature in your app

After creating an app, you can add an AI assistant feature. In this step, you'll also need to <a href="https://developer.monday.com/apps/docs/ai-assistant#selecting-your-app-feature-location" target="_blank">select a location</a> for your feature too.

1. Navigate to the *Features* tab and select **Create feature**.
2. On the pop-up, click **Filter by type** and select **AI**. This will show you all the locations where the AI assistant is supported.
3. Choose the **Board header AI assistant**.
4. Click **Empty feature** and then **Create**.
5. Rename the feature and select the **Wide** shape.
6. Click **Save** to save your changes.

# Running your local environment

## Download the example code

Download the example code from Github. You can either download the zip file from <a href="https://github.com/yuhgto/monday-ai-prompt-template" target="_blank">Github</a> or use the git clone command:

```shell
git clone https://github.com/yuhgto/monday-ai-prompt-template
```

## Install ngrok (recommended) or use the monday tunnel

In this guide, we recommend using a service called <a href="https://ngrok.com/" target="_blank">ngrok</a> to connect your local environment to the internet securely. You'll need to set up a free account and install the software to use it. If you do not want to use ngrok, you can also use the monday tunnel to expose your local environment to the internet.

You can skip to the <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#set-your-environment-variables" target="_blank">next step</a> if you've used ngrok before. If you decide you want to use the monday tunnel, its flow is effortless, and we will explain it <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#connecting-your-local-environment-to-mondaycom" target="_blank">in the next section.</a>

To use ngrok:

1. Download and install the software from the <a href="https://ngrok.com/download" target="_blank">ngrok website</a>.
2. Create an <a href="https://dashboard.ngrok.com/signup" target="_blank">ngrok account</a>.
3. Get your authtoken from your account dashboard.
4. Add your authtoken to your local installation by running ngrok config add-authtoken \<token>.

> 📘 Note for Mac users
>
> Sometimes, when setting up ngrok via `brew`, you may see a permissions error. If that happens, you can open the `finder`, **left click** + **control** on the installation file, and then click **open** for this to work.

## Set your environment variables

Now you can add the relevant API keys as environment variables.

1. Create a new file called `.env.local`.
2. Copy the contents of `.env` into this file.
3. Paste in your OpenAI API key as the `OPENAI_API_KEY`.
4. Paste your monday API key as `MONDAY_API_KEY`. You can learn how to access your API token <a href="https://developer.monday.com/api-reference/docs/authentication#developer-tab" target="_blank">here</a>.
5. Get your app's client secret from the main app page.

> 📘 Don't want to connect to an OpenAI account?
>
> You can edit `/app/api/prompts/route.ts` to connect to any API you choose!

## Run the app locally

Once you set up the example code and ngrok, it's time to run your app.

1. In your terminal, navigate to the code you downloaded: `cd monday-ai-prompt-template`.
2. Install the dependencies using npm:`npm install`.
3. Start your development server, which will run on port 3000: `npm run dev`.

# Connecting your local environment to monday.com

You can complete these steps using either <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#ngrok-recommended" target="_blank">ngrok (recommended)</a> or the <a href="https://developer.monday.com/apps/docs/quickstart-for-ai-assistant#monday-tunnel" target="_blank">monday tunnel</a>.

## ngrok (recommended)

### Create an ngrok tunnel on port 3000

1. Run `ngrok http 3000` in a new terminal window.
2. Copy the URL that is returned.

### Paste the ngrok URL as a new build

1. Copy your ngrok URL.
2. Open your app and go to the AI assistant feature you created.
3. Click the **New build** button.
4. Paste your ngrok URL as the custom URL.
5. Click **Create build**.

## monday tunnel

Use the following steps if ngrok doesn't work for you.

### Create a monday tunnel on port 3000

1. Run `npx @mondaydotcomorg/tunnel --port 3000` in a new terminal window.
2. Copy the URL that is returned.

### Paste the monday tunnel's URL as a new build

1. Copy your monday tunnel URL.
2. Open your app and go to the AI assistant feature you created.
3. Click the **New build** button.
4. Paste your monday tunnel URL as the custom URL and click **Create build**.

## Test your app on an actual board

1. Open a monday.com board.
2. Click **AI assistant** and choose your app.
3. Type something and see your app update it in real-time!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
