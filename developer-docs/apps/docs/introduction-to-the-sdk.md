---
updatedAt: 2025-10-23T05:04:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Software development kit (SDK)

The monday.com SDK provides a toolset for application developers to build features and solutions on top of monday.com. You'll find this SDK useful if you want to:

* Access monday.com account data from your application by utilizing the GraphQL client
* Build board views and dashboard widgets that extend the monday.com UI
* Build integrations and automations using your own external services and business logic

The SDK contains methods for server-side and client-side application development. Client-side capabilities assume a valid user session is present and can seamlessly act on behalf of that user. At the same time, you can use server-side methods to access monday.com features using explicit credentials without any client-side code.

# Usage

## `npm` module

1. Install the SDK as a module:

```javascript
npm install monday-sdk-js --save
```

2. Import into your project:

```javascript
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setApiVersion("2023-10");
```

## `<script>` tag directly in your HTML code

1. Load the SDK directly into your HTML code by adding the following:

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/monday-sdk-js/dist/main.js"></script>
</head>
```

2. Initialize the SDK anywhere on the page by declaring:

```javascript
const monday = window.mondaySdk()
```

# Seamless authentication

When used for client-side development, SDK methods that require acting on behalf of the connected user will work out-of-the-box by communicating with the parent monday.com running application. You're not required to initialize the SDK client with any explicit credentials.

Methods that use seamless authentication (including `monday.api` and `monday.storage`) offer capabilities that are scoped based on the permissions of the logged-in user and the scopes you have configured in your app.

# SDK capabilities

The SDK exposes the following capabilities:

| SDK Object                                                               | Capability                                                                    |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| [`monday.api`](https://developer.monday.com/apps/docs/mondayapi)         | Performing queries against the monday.com API on behalf of the connected user |
| [`monday.listen`](https://developer.monday.com/apps/docs/mondaylisten)   | Listen to client-side events on the monday.com client running this app        |
| [`monday.get`](https://developer.monday.com/apps/docs/mondayget)         | Retrieve information from the monday.com client running this app              |
| [`monday.execute`](https://developer.monday.com/apps/docs/mondayexecute) | Call an action on the monday.com client running this app                      |
| [`monday.storage`](https://developer.monday.com/apps/docs/mondaystorage) | Read/write to the Storage API, a key-value storage service for apps           |
| [`monday.set`](https://developer.monday.com/apps/docs/mondayset)         | Setup data inside an app                                                      |

# Typescript support

The SDK supports TypeScript, a superset of JavaScript, to help improve the developer experience. Our SDK uses type definitions to distinguish between correct and incorrect code before running it, allowing you to identify errors earlier in your development process.

You can find the type declaration for each SDK method in the `types/index.d.ts` [file](https://github.com/mondaycom/monday-sdk-js). TypeScript support is only available in SDK versions 0.3.0 and later.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
