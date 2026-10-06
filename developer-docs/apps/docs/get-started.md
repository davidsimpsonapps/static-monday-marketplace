---
updatedAt: 2025-10-23T05:02:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Get started

Learn how to enable monday code on your account, deploy your first app, and manage your app deployments

If you're ready to get started with monday code, this guide will help you set up and deploy your app, manage it after deployment, and optimize your usage. It also covers key features to help you get the most out of monday code

<div style={{ backgroundColor: "#f1f9f5", borderLeft: "4px solid #08844c", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#08844c" }}>
  <strong>💡 Prefer to learn by doing? Try our <a href="https://developer.monday.com/apps/docs/quickstart-deploy-your-first-app" target="_blank" style={{ color: "#08844c" }}>tutorial</a>.</strong>
</div>

# Set up your monday code environment

## Enable the feature

To begin, an **account admin** must enable monday code on the account. Once enabled, all users will be able to use monday code in their apps.

1. Open an app in the Developer Center or [create a new one](https://developer.monday.com/apps/docs/create-an-app).
2. In the left-side menu, navigate to **Host on monday** and select **Server-side code**.
3. Click **Connect monday code** and accept the terms and conditions.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/180714e0f4554d9323443dbeada3521a1395d77576b8f3549d62271454c9c936-monday-code-enable-v2.png" />

# Required tools

## Command line interface (CLI)

You must install the [monday code CLI](https://developer.monday.com/apps/docs/command-line-interface-cli) to manage your app's deployments. You can use it to:

* Create new versions of your app
* Upload your code to monday code servers
* Add environment variables and secrets

Here's how to install the CLI:

1. Install the CLI globally through npm by running `npm install -g @mondaycom/apps-cli`
2. Run `mapps help` to test that it worked. You should receive a list of supported commands.
3. Once installed, run `mapps init` and add your API token once prompted. Follow [these steps](https://developer.monday.com/api-reference/docs/authentication#developer-tab) if you don't know how to get your API token.

## Software development kit (SDK)

Our official SDKs support [NodeJS](https://developer.monday.com/apps/docs/monday-code-javascript-sdk) and [Python](https://developer.monday.com/apps/docs/monday-code-python-sdk). Server-side apps can use the SDK to access features such as storage, queues, and environment variables.

### JavaScript SDK installation

To install the [JavaScript SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk), navigate to your app's directory and run the following command:

```shell
npm install @mondaycom/apps-sdk
```

# Deploy your app

We recommend starting with our [example app tutorial](https://developer.monday.com/apps/docs/quickstart-deploy-your-first-app-to-monday-code) to see the deployment process in action. For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

Once you're ready to deploy your app:

1. Run `mapps code:push` to deploy to monday's infrastructure.
2. Follow the CLI prompts to choose which app and version to deploy.
3. If you don’t yet have an app to deploy, try our [GitHub integration example](https://github.com/mondaycom/welcome-apps/tree/master/apps/github-monday-code) built for monday code to test the process.

## What happens during deployment

When you [deploy your app](https://developer.monday.com/apps/docs/deploy-your-app) with `mapps code:push`, we:

* Zip your project files and upload them
* Create a container image from your code using [Buildpack](https://buildpacks.io/docs/)
* Deploy the container to Cloud Run and expose a URL
* Run health checks
* Return the URL via the CLI

# After deployment

After deployment, you'll be able to access your deployment URL, view logs, and connect your app features.

### Connect your app features

You can connect each app feature to your deployments on the [Features](https://developer.monday.com/apps/docs/the-developer-center#build) tab. Your monday code URL is automatically connected, and you can choose an optional sub-route to serve your feature.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/f3a89bc3a2c4377dca6d5e38abbc1691b41406314a5c0b58d15094cf1bab1800-monday-code-choose-deployument.png" />

### Get your deployment URL

Once you deploy your app, you'll see your deployment URLs under **Host on monday** > **Server-side code**. You can copy and use these URLs to test your endpoints, connect to integrations, or configure your app features.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/f85ba704fce22e2392635840ebdce1db404a0cf277ad5d1adcfe45299699b64c-monday-code-deployment-url.png" />

### Check your deployment's status

Check the [status of your app's deployments](https://developer.monday.com/apps/docs/monday-code-cli#mapps-codestatus) with:

```shell Terminal
mapps code:status -i <APP_VERSION_ID>
```

### Explore logs

You can see your app's log output under **Host on monday** > **Logs** or by running:

```shell Terminal
mapps code:logs -i <APP_VERSION_ID>
```

# Key features

monday code provides a robust toolset that simplifies your development process, with built-in security being one of its key benefits. Use the storage, logging, and environment management tools in the [SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk) to ensure your app meets our security standards.

<div style={{ backgroundColor: "#f5f5f5", borderLeft: "4px solid #9e9e9e", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#424242" }}>
  💡 <strong>For example:</strong><br /><br />integrating with an external database for customer data storage will not provide the same level of security as using monday code's secure, bundled storage solutions.
</div>

## Store data seamlessly and securely

We provide two key-value storage APIs for your app to persist data on behalf of a customer. To use these APIs, you need an access token (e.g., OAuth token or integration shortLivedToken).

### Storage API

```javascript
import { Storage } from '@mondaycom/apps-sdk';

const storage = new Storage('<ACCESS_TOKEN>');

// set value
const { version } = await storage.set(key, value, { previousVersion, shared });
// retrieve value
const storedValue = await storage.get(key, { shared });
// delete value
await storage.delete(key, { shared });
```

### Secure storage API

```javascript
import { SecureStorage } from '@mondaycom/apps-sdk';
const secureStorage = new SecureStorage();

// set value
await secureStorage.set(key, value);
// retrieve value
const storedValue = await secureStorage.get(key);
// delete value
await secureStorage.delete(key);
```

### Remove storage to comply with privacy regulations

You can purge account data using:

```shell Terminal
mapps storage:remove-data
```

Doing so allows you to comply with GDPR and other privacy regulations.

## Manage secrets

You can declare environment variables and secrets via the CLI:

```shell Terminal
mapps code:secret
```

Then access secrets using the [Secrets Manager SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#secrets-manager).

## Log output

monday code includes a logger to store and inspect logs:

```javascript
import { Logger } from '@mondaycom/apps-sdk';

const tag = 'app-2322-user-12344';
// tag will be added to every logged message
const logger = new Logger(tag);

logger.info('POST request at /routes/run');
logger.warn('Complexity limit reached. Retrying...');
logger.debug(`account_info: ${JSON.stringify(account_data)}`);
logger.error('Something went wrong', { error: new Error('error') }); // will include stack trace
```

### Access logs through the CLI

You can access logs through the CLI in several ways by filtering for a specific date range, search term, or logs of a certain type.

```shell Terminal
mapps code:logs [--verbose] [--print-command] [-i <value>] [-t <value>] [-s <value>] [-f <value>] [-e <value>] [-r <value>]
```

### Access logs on web

Go to **Host on monday** > **Logs** in your app.

## Message queue

monday code also ships with a message queue so you can logically separate different services and make your app more scalable. Use the [Queue SDK](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#queue) to publish and consume messages.

# Other supported technologies

monday code's infrastructure is flexible and supports other frameworks and languages outside [NodeJS](https://developer.monday.com/apps/docs/monday-code-javascript-sdk) and [Python](https://developer.monday.com/apps/docs/monday-code-python-sdk).. We've created [quickstarts](https://github.com/mondaycom/monday-code-quickstarts) to help you build and deploy a working app using your preferred language:

* [C#](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-csharp)
* [Django](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-python-django)
* [Go](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-go)
* [Java](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-java)
* [PHP](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-php)
* [Python](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-python)
* [Ruby](https://github.com/mondaycom/monday-code-quickstarts/tree/main/quickstart-ruby)

If you're using a language other than NodeJS or Python, here are some tips:

* **Secure storage** is not supported
* Use our **App Storage API endpoints** to store application data
* **Log messages to stdout** using your preferred logging library (these will be captured by monday code)
