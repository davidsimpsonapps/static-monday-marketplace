---
updatedAt: 2026-03-08T09:28:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Triggers

Triggers are events that start an integration. This reference guide describes the API that your app will use to start integrations.

# Background

Trigger blocks control when an integration is run. Many apps run their triggers based on webhooks from a third-party system, but you can use any event.

There are three steps that your app must handle:

1. User adds your trigger to a workflow: *monday calls your subscribe URL*
2. Your app triggers the subscription: *You call the subscription's webhook URL*
3. User deletes your trigger: *monday calls your unsubscribe URL*

To learn how to configure your block in the monday UI, start [here](https://developer.monday.com/apps/docs/how-to-create-a-trigger-block#/).

# Reference

## Subscribe URL

monday will send a POST request to the Subscribe URL when a user creates a workflow with your trigger. The request will contain a **webhook URL**. When your app calls this URL, monday will run the subsequent actions in the integration.

**Method**: POST

#### **Body**

```json Request Body
{
  "payload": {
    "webhookUrl": "https://api-gw.monday.com/automations/apps-events/481709001",
    "subscriptionId": 481709001,
    "inboundFieldValues": {
      "number": 10,
      "string": "10"
    },
     "credentialsValues":	{ 
       "credentials-key": { 
         userCredentialsId: 12345, 
         accessToken: "abcd1234" 
       } 
     },
    "inputFields": {
      "number": 10,
      "string": "10"
    },
    "recipeId": 629280,
    "integrationId": 398528596
  }
}
```

#### **Authorization header**

The request will contain [an authorization JWT in the headers.](https://developer.monday.com/apps/docs/authorization-header)

#### Webhook URL

The payload contains a webhook URL, which your app can call to invoke the trigger. The next section shows how to use it.

#### **Response**

Your endpoint should respond with a 200 status. Your response must also contain a `Content-Type:application/json` header.

You should store the subscription details in your app's storage so you can trigger it later. You can store this data in [monday code storage](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#storage) and use the subscription ID as the access key.

Your endpoint should return a `webhookId`, which will be returned when the unsubscribe event happens. If no webhook ID is passed, the `subscriptionId` will be used.

```node
import { Storage } from '@mondaycom/apps-sdk';

// Initialize storage instance
const storage = new Storage(token);

/**
 * Handles subscription requests and stores subscription data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Response with webhook ID
 */
export async function subscribe(req, res) {
  try {
    const { payload } = req.body;
    const {
      inputFields,
      webhookUrl,
      subscriptionId,
      recipeId,
      integrationId
    } = payload;

    const subscription = {
      inputFields,
      webhookUrl,
      recipeId,
      integrationId
    };

    await storage.set(subscriptionId, JSON.stringify(subscription));

    return res.status(200).send({ webhookId: subscriptionId });
  } catch (error) {
    console.error('Error in subscribe:', error);
    return res.status(500).send({ error: 'Failed to process subscription' });
  }
}
```

## Triggering your block

When you want to invoke the trigger (e.g., when a lead is created in the customer's CRM), you need to identify which subscription you would like triggered on the monday.com side.

Once you identify the correct subscription, send a POST request to the corresponding `webhookUrl`:

**Method:** POST

**Authorization:** JWT signed with your app's signing secret, including the `appId` in the JWT payload.

### Example: Creating the JWT with jsonwebtoken

```javascript
const jwt = require('jsonwebtoken');

const appId = 12345; // Your application id from the dev center
const signingSecret = process.env.MONDAY_SIGNING_SECRET;

const jwtToken = jwt.sign({ appId }, signingSecret);
```

### Body

```json Request Body
{
  "trigger" : {
    "outputFields" : {
      "text" : "Hello?",
      "number" : 9
    }
  }
}
```
```node
import { Storage } from '@mondaycom/apps-sdk';
import jwt from 'jsonwebtoken';

// Initialize storage instance
const storage = new Storage(process.env.MONDAY_TOKEN);

/**
 * Triggers a webhook event for a given subscription
 */
export async function triggerEvent(subscriptionId, data) {
  try {
    const subscriptionString = await storage.get(subscriptionId);

    if (!subscriptionString) {
      throw new Error(`Subscription not found for ID: ${subscriptionId}`);
    }

    const subscriptionData = JSON.parse(subscriptionString);
    const { webhookUrl } = subscriptionData;

    // Create JWT for authorization
    const jwtToken = jwt.sign(
      { appId: process.env.MONDAY_APP_ID },
      process.env.MONDAY_SIGNING_SECRET
    );

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      },
      body: JSON.stringify({
        trigger: {
          outputFields: {
            ...data,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in triggerEvent:', error);
    throw error;
  }
}

```

## Unsubscribe URL

Your Unsubscribe URL will be called when a user removes your recipe from the workflow, deactivates it, or deletes it.

**Method**: POST

#### **Body**

```json JSON
{
  "payload": {
    "webhookId": 481709001
  }
}
```

#### **Authorization header**

The request will contain [an Authorization JWT in the headers.](https://developer.monday.com/apps/docs/authorization-header)

#### **Response**

After the call, respond to the endpoint with a 200 HTTP status code and no payload. If you respond with an error, not a 2XX status, we will prevent the user from deleting the recipe.

Your response must also contain a `Content-Type:application/json` header.

You should also remove the subscription from your persistent storage based on the `webhookId` provided.

# Glossary

## Events

**Subscribe event:** What happens when a user adds your trigger to a monday board or workflow. monday will send a webhook to your *subscribe URL*.

**Unsubscribe event:** Happens when a user deletes or turns off your trigger. monday will send a webhook to your *unsubscribe URL*.

**Invocation:** The process of triggering a trigger block. Your app will send monday a webhook.

**Input fields:** Data the trigger needs to run, typically defined by the user when they create the integration.

**Output fields:** Data emitted by the trigger, typically data and metadata about the event.
