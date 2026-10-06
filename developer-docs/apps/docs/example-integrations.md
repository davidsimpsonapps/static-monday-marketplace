---
updatedAt: 2025-10-23T05:19:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Example integrations

Install our example apps to learn the fundamentals of the monday app framework.

We have three example projects to show you what a working integration app looks like.

# Quickstart

This is the simplest example we have. It shows a monday-to-monday integration, which capitalizes text from one column and adds it to another. [Read the tutorial and access the sample code.](https://developer.monday.com/apps/docs/quickstart-integration)

The quickstart will teach you:

* Implementation of a custom action block & custom field type
* Authentication with monday API (using a short-lived token)
* Hitting the monday API when the block is invoked

# Github integration

This sample app creates issues in Github when items are created in monday (and vice versa). [Clone the code for the Github integration.](https://github.com/mondaycom/welcome-apps/tree/master/apps/github-monday-code)

The Github integration will teach you:

* Implementation of a custom [trigger block](https://developer.monday.com/apps/docs/custom-trigger), custom [action block](https://developer.monday.com/apps/docs/custom-actions), custom [field type](https://developer.monday.com/apps/docs/custom-fields), and [dynamic mapping](https://developer.monday.com/apps/docs/dynamic-mapping)
* Authentication between monday and a third party API
* Hitting an external API when items in monday change
* Triggering actions in monday from webhooks in another tool - [Custom Triggers](https://developer.monday.com/apps/docs/custom-trigger)
* Hosting an app on monday code

# Slack integration

This app sends messages in Slack when items change in monday. [Clone the Slack integration from Github.](https://github.com/mondaycom/welcome-apps/tree/master/apps/slack-node)

The Slack integration will teach you:

* Implementation of a custom action block & custom field type
* Authentication with a third-party API  OAuth
* Hitting a third party API when an action is invoked – [Custom actions](https://developer.monday.com/apps/docs/custom-actions)
