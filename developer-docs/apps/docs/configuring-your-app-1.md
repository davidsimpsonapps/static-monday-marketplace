---
updatedAt: 2025-10-23T05:13:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Configuring your app

This guide covers the settings configuration modal and SDK methods that you can implement to help users configure your app.

After going through the <a href="https://developer.monday.com/apps/docs/user-onboarding" target="_blank">onboarding experience</a>, users can configure their app and start using its features. To help speed up the configuration process, we built a <a href="https://developer.monday.com/apps/docs/configuring-your-app-1#configuration-modal">configuration modal</a> and a handful of <a href="https://developer.monday.com/apps/docs/configuring-your-app-1#sdk-methods">SDK methods</a> that simultaneously help users get the most value from your app and reduce the need for extra support.

This guide delves into the configuration modal and how to use it. It also will walk through each SDK method to explain what it does and how it benefits users. You will also find links to the SDK, where you can find more details and examples for each method!

# Configuration modal

Using the configuration modal, you can prompt users to configure specific settings immediately so they can start using your app as quickly as possible and get the most value from it. The modal infrastructure works with view apps and requires no additional code, but you need to push a new minor version for the modal to appear.

For apps with a defined <a href="https://developer.monday.com/apps/docs/user-onboarding#starting-point" target="_blank">starting point</a>, the configuration first pops up after users go through the initial <a href="https://developer.monday.com/apps/docs/user-onboarding#onboarding-experience" target="_blank">onboarding experience</a>. You get to determine which settings you want users to configure before they start using the app, but you don't have to configure all settings in the modal. Users can always go through the modal, land on the starting point, and configure specific settings as needed.

<Image title="modal configuration.png" alt={2900} align="center" className="border" border={true} src="https://files.readme.io/888cab2-modal_configuration.png" />

You can customize the settings that appear in the modal using a variety of fields in *View Settings*, like color, text, or date. Each field's input options vary based on its type, but you can complete the following for each field:

* **Title:** The title displayed to users
* **Subtitle:** A brief description of the configuration field
* **Name:** The corresponding key for the data returned from the form
* **Info:** A brief description or any additional information that the user needs

Even though the modal will appear for all users who select the starting feature, by default, they do not have to complete the fields displayed in the modal. If you want to create a mandatory field, select the **Required for onboarding** checkbox. Doing so ensures that users cannot bypass the configuration modal without completing the specified field(s).

For required inputs, you must also fill in the *Alias* box with a unique alias for each field. If you have two fields with different titles but the same alias, only one will appear in the modal. You can also create fields using the same alias if you want users to configure multiple settings simultaneously. Each of these fields must have the same input options.

<Image title="view settings configuration.png" alt={1918} align="center" className="border" border={true} src="https://files.readme.io/b18a5a2-view_settings_configuration.png" />

After completing the fields in the modal, the app will be configured based on the user's inputs. If a user skips the fields in the modal, they can still configure them in the *Customize view* menu by clicking on the settings gear icon on the right side of the screen.

The configuration modal is a valuable tool to help customers use your app faster, and it's also the first thing they will see when they start using your app. Users can always click on the **Help** button to open the <a href="https://developer.monday.com/apps/docs/user-onboarding#additional-resources" target="_blank">How to use</a> tab for more information if your app has one, but you should try to provide users with the proper context about each field to avoid confusion and delays. If you're feeling stuck or need some inspiration, check out this sample <a href="https://dapulse-res.cloudinary.com/image/upload/v1674254916/RFP.png" target="blank">column field configuration</a>!

# SDK methods

You can utilize these SDK methods to help users configure your app and start using it faster!

## Open and close modal window

The <a href="https://developer.monday.com/apps/docs/mondayexecute#open-modal" target="_blank">openAppFeatureModal</a> and <a href="https://developer.monday.com/apps/docs/mondayexecute#close-modal" target="_blank">closeAppFeatureModal</a> methods open and close a modal window. Using this method, you can embed a help page in your app to provide useful onboarding instructions to users.

## Open and close settings window

The <a href="https://developer.monday.com/apps/docs/mondayexecute#open-setting-window" target="_blank">openSettings</a> and <a href="https://developer.monday.com/apps/docs/mondayexecute#close-setting-window" target="_blank">closeSettings</a> methods expand or collapse the settings window on your app's view. Once implemented, users can use this feature to open or close the settings window according to their preferences. This method provides a useful way to prompt users to configure their settings so they can start using your app as quickly as possible.

## Set settings

The <a href="https://developer.monday.com/apps/docs/mondayset" target="_blank">monday.set()</a> method allows you to set up data inside your app. You can use this method to configure default settings so users can start using your app immediately.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
