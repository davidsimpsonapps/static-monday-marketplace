---
updatedAt: 2025-10-23T05:07:38.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Actions

When an action is triggered in your custom integration recipe, the monday apps server will send a POST request to the run URL configured in your custom action block.

When your server receives this event, you should do the action and then return output fields as necessary.

## Reference

### Action event

When your action runs in a workflow, monday will call your app's **Run URL**. The request will contain input fields, credentials, and block metadata.

**Method:** POST

#### **Authorization header:**

The request will contain [an authorization JWT in the header.](https://developer.monday.com/apps/docs/authorization-header)

#### **Payload:**

The HTTP request will contain the following payload:

```json Request Body
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
      "shoes": "shoe1",
      "listSocks": "socks_2",
      "object": {
        "email": "Hello world",
        "name": [
          "Dipro"
        ],
        "lastCall": "1993-08-27"
      },
      "login": "abc1234",
      "boo": true,
      "myNumber": 10
    },
    "inputFields": {
      "shoes": "shoe1",
      "listSocks": "socks_2",
      "object": {
        "email": "Hello world",
        "name": [
          "Dipro"
        ],
        "lastCall": "1993-08-27"
      },
      "login": "abc1234",
      "boo": true,
      "myNumber": 10
    },
    "recipeId": 629280,
    "integrationId": 398528596
  },
  "runtimeMetadata": {
    "actionUuid": "3b0a86dcb5a1d05e8aff1e4791cafde5",
    "triggerUuid": "bd661564c1d1968d5e56c67051cf7511"
  }
}
```

#### **Response:**

Your app should respond with output fields returned by your action, a status of 200, and an `Content-Type:application/json` header. For example, an action that sends an email may return metadata about the action itself:

```json Response
{
  outputFields: {
    recipientAddress: "dipro@tuesday.gov",
    subjectLine: "Build your perfect workflow with our services",
    contentHead: "Hey Dipro, we're workflow experts and can help your team..."
    success: true,
    sentAt: "2025-01-01"
   }
}
```

### Retry policy

If your server responds with any other status, or doesn’t respond within a minute, the monday platform will retry the request for 30 minutes.

## Glossary & examples

### Example

The following example shows the implementation of a "Send an email to customer" action.

1. You get a request from monday with input fields – the email subject, content, and customer's email address.
2. You call the mail provider's API to send the email.
3. API responds, with request status and email ID.
4. You respond to monday:
   1. On success, respond with the action's output the response body – the email ID and creation time.
   2. On failure, [respond with a severity code](https://developer.monday.com/apps/docs/error-handling). The error will be logged in the [automation run history](https://support.monday.com/hc/en-us/articles/360017254600-Automation-Run-history).

### Designing for reusability

Custom actions you create can also be used in more than one workflow, so they should be designed for reusability. Some examples of custom actions include: *“Create a lead in Salesforce,*” or *“Update a status in Jira,”* or even *“Send SMS via Twilio.”*
