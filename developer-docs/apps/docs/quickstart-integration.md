---
updatedAt: 2026-01-30T14:56:27.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Quickstart

Build your first integration using our sample code.

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

In this quickstart guide, we'll build a simple integration that automatically transforms text between two text columns on a board between lowercase and uppercase. The app will do the following things:

* Use a monday trigger to notify your app when column data has changed
* Use a custom action to write the transformed text to a column value

In the end, it will look similar to this:

<Image align="center" border={true} src="https://files.readme.io/8d14c27991734e16a727fc42d42f0e0f07ee3916bbd8705bd1e19cd0abdcc1a2-Screenshot_2024-09-13_at_2.25.03_PM.png" className="border" />

> 👍 Get the code
>
> You can view the GitHub repository for this custom integration [here](https://github.com/mondaycom/welcome-apps/tree/master/apps/quickstart-integrations)!

# Build your first integration recipe from a template

We can start building now that you know a bit about monday.com integrations! If you don't have a monday.com account, start by signing up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation).

## Add an integration for sentence builder app feature

1. Click on your profile picture in the top right corner.
2. Select **Developers**.
3. Choose the app you'd like to create your blocks in or create a new one.
4. Navigate to the *Features* section of your app.
5. Click **Create feature**.
6. Select the **Integration for sentence builder** app feature and press **Next**.

<Image align="center" border={true} src="https://files.readme.io/b6004e2-Integration_for_sentence_builder_app_feature.png" className="border" />

7. Choose **Quickstart Integration - NodeJS** template.
8. Click **Add the missing scopes** and press **Next**.
9. Run the `scaffold` command in your command line, and paste the resulting URL into the box.

> 🚧 Having trouble with the `scaffold` command?
>
> 1. Clone the [`quickstart-integrations` app from Github](https://github.com/mondaycom/welcome-apps/tree/master/apps/quickstart-integrations)
> 2. Run `npm install` to install dependencies
> 3. Run `npm run dev` to start the app server

## Updating your integration's basic information

1. Open the *Feature Details* tab.
2. Here, you can update your app feature's name, description, and base URL. Please remember that the user will see the title and description when they see your recipe in the Integrations Center. You can also select whether or not you want to enable OAuth authorization.
3. Click **Save** to save your updates.
4. After this step, you should be able to load up the app for the first time using your local tunnel!

<Image align="center" border={true} src="https://files.readme.io/5620cab-Integration_app_feature_details.png" className="border" />

## Configuring your recipe

Our feature templates provide the integration recipe for you, so it is ready to go. This integration utilizes a custom action that calls our API to update a second text column. If you want to see the code behind this recipe, navigate to the **quickstart-integrations** folder downloaded onto your computer after running the command line prompt we previously covered.

<Image align="center" border={true} src="https://files.readme.io/56597ee-Recipe_configuration.png" className="border" />

## Using the custom integration recipe

You're done! Head to any of your boards to add the integration recipe by searching for the app feature name in the *Automations Center*. Follow the integration recipe prompts as usual (i.e., selecting which *text* columns you want) and watch the magic unfold!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
