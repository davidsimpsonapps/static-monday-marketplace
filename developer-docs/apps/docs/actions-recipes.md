---
updatedAt: 2026-01-30T14:56:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Actions

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

When an action is executed in your recipe sentence, the monday apps server will send a POST request to the run URL configured in your custom action block.

When your server receives this event, you should do the action and return a success or error response.

# Reference

## Action event

When your block is triggered, monday will call your app's **Run URL**.

**Method:** POST

#### **Authorization header:**

The request will contain [an authorization JWT in the header.](https://developer.monday.com/apps/docs/authorization-header)

#### **Payload:**

The HTTP request will contain the following payload:

```json JSON
{
  "payload": {
    "blockKind": "action",
    "credentialsValues": {},
    "inboundFieldValues": {
      "number": "12"
    },
    "inputFields": {
      "number": "12"
    },
    "recipeId": 30440660,
    "integrationId": 398759485
  },
  "runtimeMetadata": {
    "actionUuid": "1f6129e75d7b78b77179061ab026bbab",
    "triggerUuid": "b644926b34fbabf3547bd1bc38ad6cdb"
  }
}
```

#### **Response:**

Your app should respond with a status of 200 or an error status as described in our [Error Handling docs.](https://developer.monday.com/apps/docs/error-handling)

## Retry policy

If your server responds with any other status, or doesn’t respond within a minute, the monday platform will retry the request for 30 minutes.

# Examples & discussion

## Example

The following example shows the implementation of a "Send an email to customer" action.

1. You get a request from monday with input fields – the email subject, content, and customer's email address.
2. You call the mail provider's API to send the email.
3. API responds, with request status and email ID.
4. You respond to monday:
   1. On success, respond with a 200 status code.
   2. On failure, [respond with a severity code](https://developer.monday.com/apps/docs/error-handling). The error will be logged in the [automation run history](https://support.monday.com/hc/en-us/articles/360017254600-Automation-Run-history).

## Designing for reusability

Keep in mind the custom actions you create can also be used in more than one recipe in your custom app! This is important as your actions should be designed for reusability. Some examples of custom actions include: *“create a lead in Salesforce,*” or *“update a status in JIRA,”* or even *“send SMS via Twilio.”*
