---
updatedAt: 2026-01-13T20:16:50.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Primitive fields

A primitive custom field lets users choose an option from a list. The values must be one of four fundamental scalar types: string, number, boolean, or date.

<Callout icon="❗️">
  Only available in the workflow builder. For sentence builder, use list field instead.
</Callout>

# Reference

## Options

The user will need to choose a value from a list provided by the custom field. This list can be static or dynamic.

### Static options

You can configure static options in the "Configuration" section of your field feature. These are configured in the developer center and will not change.

### Dynamic options

You can load dynamic options from a "Remote options URL" on your app server. When the user selects the field, monday will request the list of options from this URL. The options in the response will be shown to the user. Each value should be unique.

```json Expected response
[
  {
    title: 'Red Socks', 
    value: 'socks_1'
  },
  {
    title: 'Green Socks',
    value: 'socks_2'
  },
  {
    title: 'Pink Socks',
    value: 'socks_3'
  },
]
```
```json Request body
{
  "payload": {
    "shoes": {
      "value": "shoe1",
      "fieldTypeKey": 11369480
    },
    "pageRequestData": {},
    "credentialsValues":	{ 
       "credentials-key": { 
         userCredentialsId: 12345, 
         accessToken: "abc1234" 
       } 
     },
    "dependencyData": {
      "shoes": {
        "value": "shoe1",
        "fieldTypeKey": 11369480
      }
    }
  }
}
```
```node
router.post('/fields/socks', (req, res) => {
  res.status(200).send([
    {
      title: 'Red Socks',
      value: 'socks_1'
    },
    {
      title: 'Green Socks',
      value: 'socks_2'
    },
    {
      title: 'Pink Socks',
      value: 'socks_3'
    },
  ])
})
```

## Dependencies

Your primitive fields can have mandatory and optional dependencies. The field's dependencies will be sent to the remote options URL, and also included in any payloads that contain the field's value.

## Pagination

If your field returns a large number of items, or relies on a paginated API, you can include the `isPaginated` field. Learn how to implement this in the [advanced Pagination for remote options guide.](https://developer.monday.com/apps/docs/pagination-for-remote-options)

# Sample request

The following JSON is a sample that shows how primitive fields will be delivered to your app. Notice string, boolean, number, and dates have different formats.

```json Action Run
{
  "payload": {
    "blockKind": "action",
    "credentialsValues":	{ 
       "credentials-key": { 
         userCredentialsId: 12345, 
         accessToken: "abc1234" 
       } 
     },
    "inboundFieldValues": {
      "customerId": "abc1234", // string
      "lastCallDate": "1993-08-27", // date field, in ISO format
      "fromContactUsPage": true, // boolean
      "dealSize": 100, // number
      "shoes": "shoe1",
      "listSocks": "socks_1"
    },
    "inputFields": {
      "customerId": "abc1234", // string
      "lastCallDate": "1993-08-27", // date field
      "fromContactUsPage": true,
      "dealSize": 100,
      "shoes": "shoe1",
      "listSocks": "socks_1"
    },
    "recipeId": 629166,
    "integrationId": 398514541
  },
  "runtimeMetadata": {
    "actionUuid": "8d496442b49bcc4f9968f154b1464cb1",
    "triggerUuid": "ced54d4ca581d948d6fdddaa0841f6ca"
  }
}
```
