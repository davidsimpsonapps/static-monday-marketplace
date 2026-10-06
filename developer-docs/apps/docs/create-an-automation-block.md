---
updatedAt: 2026-02-02T22:42:45.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Create an automation block

You can use build and configure independent action and trigger blocks from inside the Developer Center. Each block and field lives in a separate app feature.

# Implementation

## Step 1: Add the app feature

Add your block by following these steps:

1. Click on your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in a new tab.
3. Choose the app you'd like to build your blocks in or create a new one.
4. Navigate to the *Features* tab.
5. Click **Create feature** > **Automation block** > **Create**.

## Step 2: Configure the block

Once you've added the app feature, you can configure your block:

### Basic details

This section allows you to specify the name, description, and type of block.

* **Block name:** Enter a descriptive name users will see in the workflow builder.
* **Block description:** Enter a brief description to explain what the action or trigger does. This is only displayed in the *Developer Center* and will not be exposed to users.
* **Block type:** Select *trigger* or *action*.
* **Async actions:** Check the box to run your[ action blocks](https://developer.monday.com/apps/docs/asynchronously-run-your-action-blocks) asynchronously.

### Deployment

Connect a [deployment](https://developer.monday.com/apps/docs/deploy-your-app) to populate the block.

### Credentials

Add [credentials](https://developer.monday.com/apps/docs/credentials) if your app connects monday.com to a third-party.

### Fields

This section allows you to configure your block's input and output fields.

* **Input fields**
  * **Field type:** Choose the field type from the list of predefined and [custom fields](https://developer.monday.com/apps/docs/create-your-blocks-fields) created in the previous step.
  * **Field key:** Enter the unique identifier from where you want to pull data for the block. It can only contain numbers, letters, and underscores and must begin with a letter.
  * **Field header:** Enter a descriptive header that tells the user what to do.
  * **Field title:** Enter a unique name for the field that will appear in the workflow builder.
  * **Placeholder:** Enter placeholder text to display when the field is empty.
  * **Description:**
  * **Field type properties:** Check the boxes if the field is a list or optional.
  * **Constraints:** This option appears when you create an input field from a field type that has overlapping dependencies with your other input fields.
* **Is main field?:** After adding all of your input fields, you must select one main field. This should be the most valuable field for the block, and it will appear in the workflow builder.

<Image align="center" border={true} src="https://files.readme.io/1325565-Is_main_field.png" className="border" />

* **Output fields**
  * **Field:** Choose the field type from the list of predefined and [custom fields](https://developer.monday.com/apps/docs/create-your-blocks-fields) created in the previous step.
  * **Field key:** Enter a unique identifier for the field. It can only contain numbers, letters, and underscores and must begin with a letter.
  * **Field title:** Enter a unique name for the field that will appear in the workflow builder.
  * **Field type properties:** Check the box if the field is a list.

### API configuration

Add URLs so monday can communicate with your block. Refer to the [Trigger Reference](https://developer.monday.com/apps/docs/trigger-block-reference-workflows) or [Action Reference](https://developer.monday.com/apps/docs/action-block-reference-workflows) for full descriptions of what URLs are needed.

* **Triggers**: Subscribe URL and Unsubscribe URL
* **Actions**: Execution URL

# Next steps

Once you've created all your blocks, you can publish a new [app version](https://developer.monday.com/apps/docs/app-versioning) to make the new app features go live. You can then also update your code and return the answers.
