---
updatedAt: 2026-02-27T18:24:55.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Asynchronously run your action blocks

With the **async action feature**, workflow builder action blocks can run asynchronously. This frees up time to perform complex operations without blocking the automation flow or faking successes, helping prevent duplications and unnecessary retries. As a result, users have a smoother experience, and resources are allocated more efficiently.

# Concepts

Until now, action blocks were expected to return a quick, synchronous response. However, some actions (e.g., calling external APIs) take longer than the current response window allows. To avoid timeout errors, developers often immediately return a “success” response before the action logic has run.

This flow hides the block's true outcome from users, but the automation proceeds as if it had succeeded. If the developer waits too long to respond, they may face timeouts, retries, and duplications.

Async actions solve this by allowing developers to report the result when the action succeeds or fails. The automation then pauses and waits for this confirmation before continuing. This prevents duplication, avoids unnecessary retries, and gives users more visibility into what’s happening.

## Asynchronous vs custom actions

Asynchronous action blocks work similarly to traditional [custom actions](https://developer.monday.com/apps/docs/custom-actions)- once the action is triggered, the monday apps server will send a POST request to the run URL configured in the custom block. After receiving the request, your app still must respond with a status of 200.

Unlike custom actions, asynchronous action blocks send a 200 response just to acknowledge that the **action was triggered**. The automation then pauses and waits for the app to perform the action. Once completed, your app should send a POST request to the provided callbackUrl to indicate success or failure.

The table below outlines the key similarities and differences between asynchronous action blocks and custom actions:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Asynchronous Action Blocks
      </th>

      <th>
        Custom Actions
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        * Allows you to build any actions not supported by built-in blocks
        * Receives a POST request at the configured run URL once triggered
        * **Responds immediately** with a 200 status to acknowledge that the action was triggered
        * Automation waits for the result before continuing
        * Sends a POST request to a new route to indicate success or failure
        * Payload contains a `callbackUrl` where the developer is expected to report back with the block's result
      </td>

      <td>
        * Allows you to build any actions not supported by built-in blocks
        * Receives a POST request at the configured run URL once triggered
        * Automation runs immediately after the initial response
        * **Responds after the action is completed** with 200 status
      </td>
    </tr>
  </tbody>
</Table>

## Error Handling

The response to the new route uses severity codes to indicate success or failure, following the existing [error handling contract](https://developer.monday.com/apps/docs/error-handling). HTTP status codes are not used since the action is completed in a request, not in the response.

To report an issue without triggering side effects (e.g., logging a message in the activity log), you can use severity code 2000 along with a runtime error description.

# Implementation

Follow these steps to create an async action block:

1. Open your app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Create a new [action block](https://developer.monday.com/apps/docs/how-to-create-a-workflow-block).
3. In the *Basic Details* section, check **Mark block as async**.

<Image align="center" border={true} width="5700px" src="https://files.readme.io/b1cf43e3222c2336ebce3ae838d6af95153f2d0386ce245e005a34b49797409c-Async_action_block.png" className="border" />

# Reference

## Sample POST request body from monday server

```json
{ 
  "payload": { 
    "blockKind": "action",
    "inboundFieldValues": {
      "boardId": 1234567890, 
      "columnId": "text",
      "itemId": 9876543210
    },
    "inputFields": { 
      "boardId": 1234567890,
      "itemId": 9876543210,
      "columnId": "text"
    },
    "recipeId": 123456,
    "integrationId": 123456,
    "callbackUrl": "https://callback-to-monday.com/callbacks/12345678" 
  }, 
  "runtimeMetadata": {
    "actionUuid": "a6676dzce11zd50b25c4871417e1zez1",
    "triggerUuid": "z607d55cc428bb438ba02cbbcde6a25e"
  }
}
```

## Sample POST response after the action is triggered

```http HTTP Request
HTTP/1.1 200 OK
Content-Type: application/json
```
```json JSON Body
{
  "status": "received",
  "message": "Action has been triggered.",
  "actionUuid": "a6676dzce11zd50b25c4871417e1zez1"
}
```

## Sample POST request to report result

Before sending the callback response, you must sign a JWT with your app’s signing secret.

This JWT is then sent in the `Authorization` header as a raw token. It should include your `appId` in the payload.

### Example: Signing the JWT

```javascript
import jwt from "jsonwebtoken";

const appId = "YOUR_APP_ID";
const appSigningSecret = "YOUR_APP_SIGNING_SECRET";

const token = jwt.sign({ appId }, appSigningSecret);
```

Use the resulting token as the value for the `Authorization` header.

```http HTTP Request
# The `callbackUrl` received from monday in the initial POST request body
POST https://callback-to-monday.com/callbacks/12345678 HTTP/1.1
Content-Type: application/json
Authorization: <SIGNED_JWT_TOKEN>
```
```json JSON Body - Success
{
  "success": true,
  "outputFields": {}
}
```
```json JSON Body - Failure
{
  "success": false,
  "severityCode": 4000,
  "runtimeErrorDescription": "This is the activity log description of 4000",
  "notificationErrorTitle": "This is the notification title of 4000",
  "notificationErrorDescription": "This is the notification description of 4000"
}
```

<br />
