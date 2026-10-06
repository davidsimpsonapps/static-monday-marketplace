---
updatedAt: 2026-01-30T15:19:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# JavaScript SDK

The monday code JavaScript SDK gives developers useful tools to build and host secure apps using monday code that seamlessly integrate with the monday.com platform. It currently contains six methods:

* [storage](https://developer.monday.com/apps/docs/monday-code-sdk#storage)
* [secure storage](https://developer.monday.com/apps/docs/monday-code-sdk#secure-storage)
* [environment variables manager ](https://developer.monday.com/apps/docs/monday-code-sdk#environment-variables-manager)
* [secrets manager](https://developer.monday.com/apps/docs/monday-code-sdk#secrets-manager)
* [logger](https://developer.monday.com/apps/docs/monday-code-sdk#logger)
* [queue](https://developer.monday.com/apps/docs/monday-code-sdk#queue)

This document will walk through each available method, its parameters, and relevant code samples. You can also access the SDK [here](https://www.npmjs.com/package/@mondaycom/apps-sdk).

# Install the SDK

You can install the monday code JavaScript SDK using `npm install`:

```shell Shell
npm i @mondaycom/apps-sdk
```

# Storage

The `storage` method stores your app's customer data. The data is stored securely and logically segregated, meaning it is stored in smaller categories on the same device to easily grant or block access. It is segregated according to the `accountId` and `app`, so data stored by one account is inaccessible to other accounts to provide an additional layer of security.

This method can be used in **every backend app**, not only those hosted on monday code.

The following limits apply to the `storage` methods:

* Key length limit: 256
* Storage limit per key: 6MB
* Concurrency limit per JWT token: 12 requests per second

## Parameters

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Required
      </th>

      <th>
        Supported methods
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        key
      </td>

      <td>
        String
      </td>

      <td>
        The key to store, retrieve, or delete content for.
      </td>

      <td>
        Yes
      </td>

      <td>
        `set`  
        `get`  
        `search`  
        `delete`
      </td>
    </tr>

    <tr>
      <td>
        value
      </td>

      <td>
        Any serializable object
      </td>

      <td>
        The value to store.
      </td>

      <td>
        Yes
      </td>

      <td>
        `set`
      </td>
    </tr>

    <tr>
      <td>
        shared
      </td>

      <td>
        Boolean
      </td>

      <td>
        <ul>
          <li>`False` if data is not shared between integrations and views. It is only accessible from backend-oriented apps. This is the default.</li>
          <li>`True` if stored data is accessible from both frontend and backend-oriented apps.</li>
        </ul>
      </td>

      <td>
        No
      </td>

      <td>
        `set`  
        `get`  
        `delete`
      </td>
    </tr>

    <tr>
      <td>
        previousVersion
      </td>

      <td>
        String
      </td>

      <td>
        The last version of the stored value for a specific key.
      </td>

      <td>
        No
      </td>

      <td>
        `set`
      </td>
    </tr>

    <tr>
      <td>
        version
      </td>

      <td>
        String
      </td>

      <td>
        The new version of the stored value.
      </td>

      <td>
        Yes
      </td>

      <td>
        `set`
      </td>
    </tr>

    <tr>
      <td>
        cursor
      </td>

      <td>
        String
      </td>

      <td>
        The cursor used to paginate through large sets of results.
      </td>

      <td>
        No
      </td>

      <td>
        `search`
      </td>
    </tr>

    <tr>
      <td>
        ttl
      </td>

      <td>
        Number
      </td>

      <td>
        Duration (in seconds) until the value gets deleted and becomes inaccessible. Maximum value of 30 days.
      </td>

      <td>
        No
      </td>

      <td>
        `set`
      </td>
    </tr>
  </tbody>
</Table>

## Initialize

| Parameter     | Description                                                                                                                                       |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| ACCESS\_TOKEN | The access token of the user/account the app works for (obtained from the OAuth flow). The `sessionToken` passed from the frontend will not work. |

```javascript
import { Storage } from '@mondaycom/apps-sdk';

const storage = new Storage('<ACCESS_TOKEN>');
```

## Methods

We expose four methods to manage the storage: `set`, `get`, `search`, and `delete`.

### `set`

The `storage.set` method stores `value` under `key` in the database.

```javascript
const { version, success, error } = await storage.set(key, value, { previousVersion, shared });
```

### `get`

The `storage.get` method returns a stored value from the database under `key`.

```javascript
const { value, version, success } = await storage.get(key, { shared });
```

### `search`

The `storage.search` method fetches a stored value by `key`.

```javascript
const { records, cursor, success } = await storage.search(key, { cursor });
```

### `delete`

The `storage.delete` method deletes a stored value under `key` from the database.

```javascript
const { success, error } = await storage.delete(key, { shared });
```

# Secure storage

The `secureStorage` method stores sensitive customer data for monday-code projects. The data is stored securely and logically segregated, meaning it is stored in smaller categories on the same device to easily grant or block access. It is segregated for your specific app, so data stored by one app is inaccessible by other apps to provide an additional layer of security.

This method will automatically utilize the real secure storage if your monday-code project is deployed. If you use the SDK locally, it will utilize the local secure storage, or a local mock database that mimics the API exposed by the real secure storage. The local secure storage will not be retained if you don't have permissions to write files on the disk.

The following limits apply to the `secureStorage` methods:

* Concurrency limit: 7 requests per second
* Per-key write limit: 1 write request per second to the same key

## Parameters

| Parameter | Type   | Description                      | Required |
| :-------- | :----- | :------------------------------- | :------- |
| key       | String | The key to store content for.    | Yes      |
| value     | Any    | The serializable value to store. | Yes      |

## Initialize

```javascript
import { SecureStorage } from '@mondaycom/apps-sdk';

const secureStorage = new SecureStorage();
```

## Methods

We expose three methods to manage secure storage: `set`, `get`, and `delete`.

### `set`

The `secureStorage.set` method stores `value` under `key` in the database.

| Parameter | Type   | Description                                                                                                         | Required |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------------ | :------- |
| key       | String | The key to store content for.                                                                                       | Yes      |
| value     | Any    | The serializable value to store. If the value is not an object, it will be wrapped in an object with a key `value`. | Yes      |

```javascript
await secureStorage.set(key, value);
```

### `get`

The `secureStorage.get` method returns a stored value from the database under `key`.

```javascript
const storedValue = await secureStorage.get(key);
```

### `delete`

The `secureStorage.delete` method deletes a stored value under `key` from the database.

```javascript
await secureStorage.delete(key);
```

# Environment variables manager

The `EnvironmentVariablesManager` method enables you to read your app's environment variables in a deployed monday-code project. If you need to set the variables, you can use the [CLI](https://developer.monday.com/apps/docs/command-line-interface-cli).

The variables are on an app level, so you can access them with all app versions.

If you are using the Node.js SDK, we encourage you to utilize the environment variables manager to load variables without redeploying your server. If you are using other [languages](https://developer.monday.com/apps/docs/deployment-process#quickstarts-in-other-languages), you need to redeploy the service so new variables will take effect.

## Initialize

```javascript
import { EnvironmentVariablesManager } from '@mondaycom/apps-sdk';

// Initialize the environment variables manager without injecting env into `process.env`
let envManager = new EnvironmentVariablesManager();

// Initialize the environment variables manager and inject env into `process.env`
envManager = new EnvironmentVariablesManager({ updateProcessEnv: true });
```

## Methods

We expose two methods to manage the environment variables: `get` and `getKeys`.

### `get`

The `envManager.get` method retrieves environment variables.

```javascript
// Get cached environment variable
const cachedValue = envManager.get(key, { invalidate: false });

// Get the latest version of environment variable
const latestValue = envManager.get(key);
```

### `getKeys`

The `envManager.getKeys` method retrieves environment variables keys.

```javascript
// Get all cached environment variables keys
const cachedKeys = envManager.getKeys({ invalidate: false });

// Get all environment variables keys
const latestKeys = envManager.getKeys();
```

# Secrets manager

The `SecretsManager` method enables you to read secrets for your app in a deployed monday-code project. You can set secrets in the monday code section of the [Developer Center UI](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#general).

The following limits apply to the `SecretsManager` methods:

## Initialize

```javascript
import { SecretsManager } from '@mondaycom/apps-sdk';

const secretsManager = new SecretsManager();
```

## Methods

We expose two methods to manage secrets: `get` and `getKeys`.

### `get`

The `get` method retrieves secrets.

```javascript
// Get cached secrets
const cachedValue = secretsManager.get(key, { invalidate: false });

// Get the latest version of a secret
const latestValue = secretsManager.get(key);
```

### `getKeys`

The `getKeys` method retrieves secrets keys.

```javascript
// Get all cached secrets keys
const cachedKeys = secretsManager.getKeys({ invalidate: false });

// Get all secrets keys
const latestKeys = secretsManager.getKeys();
```

# Logger

The `logger` is a simple way to log your app's messages in a monday-code project. You can access the logged messages via the <a href="https://developer.monday.com/apps/docs/monday-code-cli#mapps-codelogs" target="_blank">CLI</a>. Logs written without the `logger` are not accessible using the CLI and may not get labeled correctly.

## Initialize

```javascript
import { Logger } from '@mondaycom/apps-sdk';

const tag = 'my-app';
// tag will be added to every logged message
const logger = new Logger(tag);
```

## Methods

We expose four methods to manage environment variables: `info`, `warn`, `error`, and `debug`.

### `info`

The `logger.info` method logs an info message.

```javascript
logger.info('info message');
```

### `warn`

The `logger.warn` method logs a warning message.

```javascript
logger.warn('warn message');
```

### `debug`

The `logger.debug` method logs a debug message.

```javascript
logger.debug('debug message');
```

### `error`

The `logger.error` method logs an error message.

```javascript
// Stack trace will be logged as well if error is provided
logger.error('error message', { error: new Error('error') });
```

# Queue

We support a queue built on a simple publish-subscribe (i.e., pub/sub) model. **Please note** that each minor and major app version has its own queue.

## Initialize

```javascript
import { Queue } from "@mondaycom/apps-sdk";
const queue = new Queue();
```

## Methods

We expose two methods to manage the queue: `publishMessage` and `validateMessageSecret`.

### `publishMessage`

The `publishMessage` method publishes a message to the queue. It takes the `message` parameter as a string.

After publishing, messages are sent as POST requests to a specific app endpoint: `/mndy-queue`.

```javascript
const messageContent = JSON.stringify({ content: "This is a message" })
const messageId = await queue.publishMessage(messageContent)
```

### `validateMessageSecret`

Each message contains a random `secret` string in the query params of the request that can be used to authenticate the request. The `validateMessageSecret` method confirms whether or not a message is valid and that the request to the `/mndy-queue` endpoint was triggered by monday code.

**Please note** that each minor and major app version has its own secret for the message.

```javascript JavaScript
const queryParams = req.query;
if (!queue.validateMessageSecret(queryParams.secret))  {
  logger.info("Queue message received is not valid, since secret does not match. This message could come from an attacker.");
  throw new Error('not allowed');
}
```

## Receiving a message

All messages will be sent to your app as HTTP POST requests at the `/mndy-queue` endpoint.

```javascript
app.post(
    "/mndy-queue",
    async (req, res) => {
        try {
            const { body, query } = req;
            readQueueMessage({ body, query });
            return res.status(200).send({}); // return 200 to ACK the queue message
        } catch (err) {
            logger.error(err.error);
            return res.status(500).send({ message: "internal server error" });
        }
    }
);
```

## Responding to a message

When you receive a message, you should respond to the request with a success status (HTTP 200) within 10 minutes. If you don't respond in that time, or if you return an error, we will attempt to resend the queue item 9 more times. The message will disappear after the tenth and final attempt.
