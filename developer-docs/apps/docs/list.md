---
updatedAt: 2026-01-30T14:56:58.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# List fields

Technical reference for building custom list fields

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

The **List** type allows the user to select from a predefined set of strings.

# Reference

## Options

The options section defines which options the user can choose from. YOu can define options statically or dynamically.

**Static options:** You can define a few static options by adding key-value pairs to the *Options* section of your field configuration.

**Dynamic options:** You can load the options from a remote source. When a user configures your field, monday will fetch the options from the URL in the *Remote Options URL* field. The data returned by your remote options URL should be an array of key-value pairs, and each option should have a `title` and `value`.

## Pagination

You can include the `isPaginated` field if your results are paginated. You can pass additional options like `nextPageRequestData` (shouldn't be used for the last page) and `isLastPage` (should be `true` when it is the last page. Learn more in our [advanced Pagination for remote options guide.](https://developer.monday.com/apps/docs/pagination-for-remote-options)

## Dependencies

The options in your list may be dependent on another field. You can add *Dependencies* to the field type to determine what other object the options are dependent on.

The payload to your remote options URL will contain any dependencies in `dependencyData`:

```json
{ 
    "payload": {
        "boardId": 12345678, 
        "automationId": 123456, 
        "dependencyData": {
             "boardId": 12345678 
         },
        "recipeId": 123456, //unique ID of the recipe in your app. the same recipe ID will be sent if two different accounts are using the same recipe
        "integrationId": 123456 //unique ID of the integration recipe on your board
    }
}
```

### Remote Options Dependencies

You must specify which fields your block will be dependent on during recipe configuration. The input field settings for the “child” field will show possible options for the “parent” custom field.

In the platform, it looks like this:

<Image align="center" alt={1802} border={true} src="https://files.readme.io/f3d6c4e-Custom_Fields_3.png" title="Custom Fields 3.png" className="border" />

# Sample request

```json Request
{
  "payload": {
    "recipeId": 30441053,
    "integrationId": 398885964,
    "automationId": 398885964,
    "pageRequestData": {
      "page": 3
    },
    "dependencyData": null
  }
}
```
```json Response
[
  {
    title: 'Red Socks', 
    value: 'socks_red'
  },
  {
    title: 'Green Socks',
    value: 'socks_green'
  },
  {
    title: 'Pink Socks',
    value: 'socks_pink'
  },
]
```
```json Response with pagination
{
  "options": [
    {
      "title": "Pink Shoes",
      "value": "shoe_pink"
    },
    {
      "title": "Silver Shoes",
      "value": "shoe_silver"
    }
  ],
  "isPaginated": true,
  "nextPageRequestData": {
    "page": 4
  },
  "isLastPage": false
}
```
