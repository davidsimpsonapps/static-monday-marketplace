---
updatedAt: 2025-10-23T05:02:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Choosing an authentication method

Learn the different ways your app can authenticate with the monday API and the best use-cases for each

## Introduction

Determining which authentication method to use in your app can be difficult and confusing.

When designing your app, you should consider what data it needs to access. Any data that comes from a user’s monday.com account must be accessed via the monday GraphQL API.

Additionally, if your app accesses data from other platforms, you should consider their authentication protocols as well.

## How do you authenticate with the monday API?

The monday API uses token-based authentication. To successfully authenticate with our GraphQL API, every request should include an API token in the request’s “Authorization” header.

Generally speaking, there are four ways your app can get an access token to use:

* Seamless Authentication using monday SDK
* Seamless Authentication using shortTermToken
* Using an OAuth Access Token
* Using a user’s global API token

## Method 1: Seamless Authentication

We offer two mechanisms for seamless authentication, which eliminate most of the overhead of user and token management in your app. We recommend using Seamless Authentication if your app only needs to make API calls when a user is interacting with it.

Using Seamless Authentication has the following advantages:

* Your app does not need to store and manage API keys
* You can host client-side apps fully on monday servers
* Your users do not need to take additional steps to authorize your app or supply an API key

### Seamless authentication in a view app using the monday SDK

If you have a view app, use the [SeamlessApiClient SDK methods](https://github.com/mondaycom/monday-graphql-api/tree/main/packages/api#seamlessapiclient) to make API calls on behalf of the logged-in user. The iframe your app is running in will handle authentication and no API keys are needed.

```javascript
const seamlessApiClient = new SeamlessApiClient();
try {
  const data = await seamlessApiClient.request(`query { boards(ids: 12345) { id name } }`);
} catch (error) { 
  console.log(error.response.errors)
}
```

Seamless authentication only works when your app is open in an iframe. If you need to make API calls from the server-side, [use an OAuth token.](https://developer.monday.com/apps/docs/oauth)

> 📘 TIP
>
> If you need to make API calls in the background or upload files, we recommend implementing [OAuth and Permissions](https://developer.monday.com/apps/docs/oauth).

### Seamless Authentication in integration recipes using shortLivedToken

You can also use seamless authentication in integration recipes. Every request from the monday server to your app will be accompanied with a [JSON web token in the `Authorization` header.](https://developer.monday.com/apps/docs/integration-authorization#authorization-header)

When you decode the JWT token, you will see a `shortLivedToken` that is valid for 5 minutes and can be used to authenticate against the monday.com API.

### When is seamless authentication not an option for me?

Seamless authentication will work for almost every app use case. However, there are a few exceptions:

* If your app needs to make API calls without user input
* If your integration needs to make API calls for longer than 5 minutes after the monday server sends you a request
* If your client-side app needs to make an API call from the backend/server-side.

## Method 2: Using OAuth to issue access tokens

Your app can also use OAuth to get authentication tokens. Simply put, OAuth allows your app to ask for user authorization before accessing their account, and will receive an API key once authorized. If your app needs to store a user’s API token or make API calls in the background, OAuth is a good option.

### Benefits of OAuth:

* Quick and painless permission-granting for your app users
* Ability to make API calls in the background for an extended period of time and without user input
* Tokens are scoped to your app automatically and you don’t have to worry about deleting the token when your app is uninstalled

To implement OAuth in a board view or a dashboard widget, you will need to establish the logic in your backend to retrieve an access token (that will give you access to a user’s data) from our token endpoint: `https://auth.monday.com/oauth2/token`.

To implement OAuth in your integration recipe, you will need to set up an authorization URL on your own server that will initiate the process of obtaining an access token.

For more detailed information on this process, we recommend reading our oauth and permissions <a href="https://developer.monday.com/apps/docs/oauth" target="_blank">article</a>.

## Method 3: Using a user’s global API token

> 🚧 Marketplace approval
>
> Any app that utilizes this authentication method will not be approved for our marketplace. Learn more about submission guidelines <a href="https://developer.monday.com/apps/docs/app-review-checklist" target="_blank">here</a>.

If you’re looking to build a quick app that prioritizes easy development over security (for example, something only your team uses), you can store a user’s API token. Each user has a global API token that can be accessed by going to their Avatar > Developers tab, and your app can use this to authenticate with the API.

We don’t recommend this method for most apps, for the following reasons:

* The API token is not scoped (ie, it can do everything)
* The user only has one token at a time -- if they regenerate it, your app will break
* The API token is permissioned to a particular user & can only do actions that user can do

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
