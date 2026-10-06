---
updatedAt: 2025-10-23T05:19:16.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Build an integration app

Learn how to integrate a third-party tool to the monday work OS.

Integration apps enable data transfers between monday and another system. With the monday integration framework, users can configure and run automated jobs based on triggers in monday or elsewhere.

**For example:**

* When <Glossary>Items</Glossary> are created in monday, create leads in Salesforce
* When a user is assigned to a task, assign them to the corresponding issue in JIRA

Integration apps unlock new use cases. They enable your software to interact with critical work data it wouldn't otherwise have access to.

For users, integration apps help unify data across systems, minimize double work, and provide a single source of truth. [Read some sample use cases here.](https://developer.monday.com/apps/docs/integration-use-cases)

> 🚧 Not building an integration?
>
> Try another app type, such as the [AI assistant](https://developer.monday.com/apps/docs/ai-assistant) or [apps for workdocs](https://mondaydotdev.readme.io/apps/docs/doc-actions-for-workdocs).

# Who should build integration apps

Anyone can build integration apps, but they're especially useful for:

1. **Product developers or ISVs** who want to integrate software with the monday ecosystem
2. **monday admins & power users** who need custom data flows with other systems
3. **Independent developers** who want to publish and monetize apps on the monday app marketplace

# App features

monday apps are made up of one or more app features. You can choose these features based on where in the monday platform your app will appear.

For integration developers, we recommend starting with the **integration sentence** feature.

## Integration sentences & blocks

Integration sentences are pre-made data flows that run a task. Sentences are made of 2 or [more blocks, each representing a unit of logic](https://developer.monday.com/apps/docs/workflow-blocks) in that task.

Start by building a [trigger](https://developer.monday.com/apps/docs/custom-trigger) or [action](https://developer.monday.com/apps/docs/custom-actions) block. Then connect multiple blocks to create your final integration sentence.

The example below is an email integration with two blocks – "When an email is recieved" is the trigger, and "create an item in top group" is the action.

<Image align="center" src="https://files.readme.io/1cc3e360efbae32610bdd53782d0fa4aa60e56d8a2de2d99e7d97daa43a48bc1-integration-image.png" />

After building your integration sentence, you can bundle other features with your integration. If you choose to do this, consider whether your users would expect such a connection in those parts of the monday UI.

# How to start

Choose a learning journey based on how you prefer to learn – by reading about concepts, or building a practical example.

## I want to learn concepts first

The following docs will cover the main concepts to start your integrations learning journey.

1. [Choosing a use case](https://developer.monday.com/apps/docs/use-cases)
2. [Check out our sample apps](https://developer.monday.com/apps/docs/integration-examples)
3. [Learn some security best practices](https://developer.monday.com/apps/docs/trust-compliance)

## I want to build something

Start with the integration quickstart, then move on to our sample Github integration or Slack integration apps.

1. [Integration quickstart](https://developer.monday.com/apps/docs/quickstart-integration)
2. Choose a sample to try out:
   1. [Github integration](https://github.com/mondaycom/welcome-apps/tree/master/apps/github-monday-code)
   2. [Slack integration](https://github.com/mondaycom/welcome-apps/tree/master/apps/slack-node)
3. [Review our sample use cases](https://developer.monday.com/apps/docs/use-cases) to understand the possibilities of the monday apps framework.

> 👍 Sign up for a free developer account
>
> If you need a monday instance for development and testing, [you can sign up for a free developer account.](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation\&utm_campaign=integrations)
