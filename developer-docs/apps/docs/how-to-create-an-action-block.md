---
updatedAt: 2026-01-30T14:55:26.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# How to create an action block

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

To better demonstrate this process, we'll be using an example from the [Integrations Quickstart](https://developer.monday.com/apps/docs/quickstart-integration) template in the following sections. We recommend reviewing the quickstart so you can follow along.

## Create an action block

1. In your app feature, open the **Workflow Blocks** tab.
2. Click **Create New**.
3. Select **Action**.

## Add your block's fields and URLs

### 1. Basic details

Add a descriptive name for your block.

### 2. Configure your block's fields

The output fields in the trigger block feed into the input fields of your action block. In this way, we are mapping the relevant trigger output fields directly into your action’s input fields.

The “types” of input fields for your custom action are dictated by where the field is coming from. In the dropdown menu for any input field, you can see there are three options:

* Context - Get the value of this field from the context in which the action is executing (for example the userId of the user who set up the recipe, or the boardId of the board in which the recipe was set up).
* Trigger Output - Get the value of this field from one of the output fields of your recipe trigger (for example the itemId of the item whose Status column was used to trigger the recipe).
* Recipe Sentence - Get the value of this field from the configuration chosen by the user in the recipe sentence.

<Image align="center" alt={908} border={true} src="https://files.readme.io/fa3bcad-custom_actions_5.png" title="custom actions 5.png" className="border" />

<br />

### 3. Configure your block's sentence

Your action sentence describes what action or event your app will accomplish. The example from the Quickstart Integrations template is *“translate it into\*\*\{text column, targetColumn}\*\*.”*

Your action sentence can contain fields that are configurable by the user. In order to add a field to your sentence, use the `{FIELD_LABEL, FIELD_KEY}` format.

For example, *“When\*\*\{text column, columnId}\*\* changes, translate it **\{to, transformationType}** into **\{text column, targetColumn}**”*.

> 📘 NOTE
>
> The max character limit for a sentence is 255 characters. We recommend making recipes short and easily configurable, breaking the logic into multiple recipes if necessary.

### API Configuration

Add your block's Run URL. [Read the Custom Action Reference](https://developer.monday.com/apps/docs/actions-recipes) to learn how your app's Run URL should be configured.

### Publish Settings

Select "Enable to publish" if you want your block available [in the custom automation builder.](https://support.monday.com/hc/en-us/articles/360012254440-Build-your-own-custom-automation)
