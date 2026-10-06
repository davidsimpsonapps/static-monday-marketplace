---
updatedAt: 2026-01-30T14:55:43.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# How to create a trigger block

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

A trigger block is the first step of any integration in monday. This guide will show you how to set up a trigger block in the monday developer center. Read the Trigger reference page to dive into the exact protocol between your app and monday.com.

You can create a trigger for use in either the workflow builder or a recipe sentence. The API and concepts remain the same.

## Create the trigger in the monday dev center

1. In your app feature, open the **Workflow Blocks** tab.
2. Click **Create New**.
3. Select **Trigger**.

<Image align="center" alt="Trigger workflow block" border={true} src="https://files.readme.io/4059379-Trigger_workflow_block.png" title="Custom Triggers 2.png" className="border" />

## Add your block's fields and URLs.

### Basic Details

This is where you name your trigger.

### Input fields

This is where you define the input fields for your custom trigger; in the event your trigger needs some configuration before it can run.

For example, a user can choose a "Leads Category" if they are looking to select leads from a CRM system. This will then sync into monday.com.

You must choose a field type, field key, and source for each input field.

<Image align="center" alt="Field configuration for an input field" border={true} caption="Field configuration for an input field" src="https://files.readme.io/694a941a4c7ffc38cb5f80c6d9ca3ffcea4494c6b8f843826de7a147aa4efbca-SCR-20250411-jhtd.png" />

### Output fields

These are how your block will pass data forward to the following blocks in the sentence. Each field must contain a type and a key.

When you create a recipe, you'll map these output fields to the inputs of the action block.

<Image align="center" alt="Field configuration for an output field" border={true} caption="Field configuration for an output field" src="https://files.readme.io/526ae3a9474839b8c7b5ff908f6c28c80cd5dcdeeb3bb8e517685556260ffb42-image.png" />

<br />

> 📘 NOTE
>
> The max character limit for a custom trigger or action is 255 characters for each one - meaning they can be used together for a total of 510 characters on the entire recipe. As a best practice we recommend making recipes short and easily configurable, breaking the logic into multiple recipes if necessary.

### Subscription URLs

These are endpoints that monday will call when a user adds or removes your sentence on their boards.

The subscribe URL is called when the sentence is added to a board. monday will send an HTTP POST with any input fields configured (such as the board ID).

The unsubscribe URL is called when the sentence is removed.

[Read our Triggers Reference](https://developer.monday.com/apps/docs/triggers-recipes) to learn how your app should respond to these requests – and how to invoke your trigger.
