---
updatedAt: 2026-01-30T14:55:03.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Recipe sentences

Build atomic recipe sentences to automate the data in your monday boards.

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

The Integrations for Sentence Builder app feature allows apps to connect external platforms to monday.com using modular components called **blocks**.

Users can then utilize integrations to create connections between software tools without writing code or extensive technical configurations.

# Sentences

Integrations are built using **recipe sentences**. Each sentence has 2 or more **workflow blocks**. Users use these sentences in the **sentence builder**.

## Workflow Blocks

Each workflow block represents an event in or out of monday and can be combined to build integrated workflows between multiple platforms. They make the monday apps framework modular and easy to build with.

There are two types of blocks:

* **Trigger blocks** initiate an integrated workflow and can be started from any relevant event on your platform. You can use built-in triggers or create your own.
* **Action blocks** contain some logic that should occur after the event is initiated, such as notifying someone, creating a new campaign, or updating a lead. You can use built-in actions or create your own.

## Recipe Sentence

A **recipe sentence** represents an automated data flow. They are called recipes because they are made of two or more ingredients (the blocks). They are written in the form of an easy to understand sentence, such as:

> *When a status changes to done, notify #channel in Slack*

Recipes are constructed using a sequence of trigger and action blocks. While blocks are the individual components, recipes define an automated data flow between monday.com and your platform.

You can create templated recipes that can be added directly to a board; users can also connect your blocks themselves to create custom automations.

# Example recipes

monday contains a handful of native integrations that you can use as inspiration for your custom integrations:

* **Salesforce**: When a new record is created matching these attributes, create a corresponding item in monday.com
* **Gmail**: Every X number of days, send an email to a specific person
* **Hubspot**: When a new company is created in HubSpot, create an item in monday.com
* **Microsoft Teams**: When a status in monday.com changes, notify a specific channel
* **Slack**: When a new item is created on monday.com, notify a specific channel
