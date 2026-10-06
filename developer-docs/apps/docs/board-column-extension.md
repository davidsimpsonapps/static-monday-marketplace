---
updatedAt: 2026-01-30T16:16:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Board column extension

Learn about the app feature, supported column types, how to build a board column extension, and relevant SDK methods

The **board column extension** app feature enables you to create your own UI where users can build workflows on monday products. It allows you to create advanced workflows on the column through a simple UI attached to the column menu.

The UI is rendered in an iframe where users can easily configure automations for the entire column. The automation is then created and managed on the backend using information sent through [webhooks](https://developer.monday.com/api-reference/reference/webhooks).

This feature simplifies user automation configuration and helps improve overall platform and app usability. It reduces confusion while navigating by allowing users to perform actions within the column's context instead of configuring individual integration recipes in the [Automation Center](https://support.monday.com/hc/en-us/articles/15080944734482-The-Automation-center).

It can be utilized in many different use cases, but it's especially beneficial for apps that:

* use integrations or automations to change a column's content
* already use board or item views to configure the app

<Image align="center" className="border" border={true} src="https://files.readme.io/5534513-Board_column_extension_test.png" />

# Supported column types

The board column extension app feature currently works on the following column types:

<table>
  <tr>
    <td>Date</td>

<td>Numbers</td>
  </tr>
  <tr>
    <td>Dropdown</td>
    <td>Person</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>Phone</td>
  </tr>
  <tr>
    <td>Files</td>
    <td>Status</td>
  </tr>
  <tr>
    <td>Long text</td>
    <td>Text</td>
  </tr>
</table>

# Build a board column extension app

## Add the app feature

Follow these steps to add a board column extension app feature in the *Developer Center*:

1. Click on your profile picture in the top right corner.
2. Follow [these steps](https://developer.monday.com/apps/docs/resources#developer-mode) to activate *Developer mode* in your account. Skip to **step 3** if you already activated it.
3. Select **Developers**. This will open the *Developer Center* in a new tab.
4. On the new tab, click **Create app**.
5. Navigate to the *Features* tab and select **Create feature**.
6. In the search bar, type *column*.
7. Select the **Board column extension** app feature.
8. Click **Create**.

## Configure the feature

Once you add a new app feature, you can configure it in the *Feature details* and *Custom title* tabs and set a unique key.

### Feature details tab

The *Feature details* tab is used primarily for backend configurations. There, you can:

* set the app feature name that will appear in the UI
* write a description
* upload a custom icon for the apps menu
* select the column types the app feature will run on
* select the shape of the iframe.

<Image align="right" className="border" width="200px" border={true} src="https://files.readme.io/f658ea5-Custom_title_details_in_UI.png" />

### Custom title tab

You can add custom column information that will be shown to users in the *Custom title* tab. These fields will appear after hovering over the ⓘ icon next to the column name. The icon will only appear when the board column extension is attached to the column.

### Unique key

When you click **Save** after updating the *Feature details* and *Custom title* tabs, you'll be prompted to enter a unique key for your app.

This key is a unique identifier that will be used to programmatically differentiate between app features. One unique key is required per app feature, and it can't be modified once set. It's required for future events that we will send you through various app feature lifecycles.

## Set up webhooks

Since this app feature provides an alternative to automations (without integration recipes), you need to set up webhooks to subscribe to and unsubscribe from events to perform actions in the app.

### Add an integration app feature

Your app must also have an integration app feature to receive webhooks containing the `authorization` header for your board column extension. This can be an empty app feature, but it must be added in addition to the board column extension app feature.

### Create a webhook

You can create a webhook via the API using the [`create_webhook`](https://developer.monday.com/api-reference/reference/webhooks#create-a-webhook) mutation to subscribe to the following events:

<table>
  <tr>
    <td>change_column_value</td>
    <td>item_restored</td>
  </tr>
  <tr>
    <td>change_status_column_value</td>
    <td>create_subitem</td>
  </tr>
  <tr>
    <td>change_subitem_column_value</td>
    <td>change_subitem_name</td>
  </tr>
  <tr>
    <td>change_subitem_column_value</td>
    <td>move_subitem</td>
  </tr>
  <tr>
    <td>change_specific_column_value</td>
    <td>subitem_archived</td>
  </tr>

<tr>
    <td>change_specific_column_value</td>
    <td>subitem_deleted</td>
  </tr>

<tr>
    <td>change_name</td>
    <td>create_column</td>
  </tr>

<tr>
    <td>create_item</td>
    <td>create_update</td>
  </tr>

<tr>
    <td>item_archived</td>
    <td>edit_update</td>
  </tr>

<tr>
    <td>item_deleted</td>
    <td>delete_update</td>
  </tr>

<tr>
    <td>item_moved_to_any_group</td>
    <td>create_subitem_update</td>
  </tr>

<tr>
    <td>item_moved_to_specific_group</td>
    <td></td>
  </tr>

</table>

### Delete a webhook

You can delete a webhook when a board column extension is detached from a column using the [`delete_webhook`](https://developer.monday.com/api-reference/reference/webhooks#delete-a-webhook) mutation.

# SDK methods

The [`closeDialog`](https://developer.monday.com/apps/docs/mondayexecute#closedialog) method can be used to close the app's UI, and each extension can be manually attached or detached from a column using the [`attachExtensionsToColumn`](https://developer.monday.com/apps/docs/mondayexecute#attachextensionstocolumn) and [`detachExtensionsToColumn`](https://developer.monday.com/apps/docs/mondayexecute#detachextensionstocolumn) SDK methods.

Users can have up to five active extensions at a time on each column. You will only receive webhooks for extensions that are attached to a column. Users can have up to five extensions attached to a column at the same time, and the attached extensions will have a green **On** label.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
