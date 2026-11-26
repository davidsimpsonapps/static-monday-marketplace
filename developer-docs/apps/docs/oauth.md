---
updatedAt: 2026-11-26T09:58:51.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# OAuth and Permissions

Authorize your monday app with OAuth and define the permission scopes it needs.

OAuth lets your app ask a user for permission to read or change data in their monday.com account. When the user approves, your app gets an access token that acts on the user's behalf and is limited to the permission scopes your app requested.

This page covers the setup that applies to every app: permission scopes, redirect URLs, and users with multiple accounts. For the authorization flow itself, see the page for your app's OAuth version.

<Cards columns={3}>
  <Card title="OAuth 2.1" href="https://developer.monday.com/apps/docs/oauth-2-1">
    The OAuth flow for all new apps, with PKCE, expiring access tokens, and refresh tokens.
  </Card>
  <Card title="Migrating to OAuth 2.1" href="https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow">
    Move an existing app and its stored tokens from OAuth 2.0 to OAuth 2.1.
  </Card>
  <Card title="OAuth 2.0 (legacy)" href="https://developer.monday.com/apps/docs/oauth-2-0">
    Reference for the legacy flow with non-expiring tokens.
  </Card>
</Cards>

# Which OAuth version does my app use?

All new apps use OAuth 2.1, and you can't turn it off for them. Apps created before OAuth 2.1 became the default use OAuth 2.0 until you turn on OAuth 2.1 for an app version.

To check, open your app in the Developer Center, go to **OAuth & Permissions**, and open the **Scopes** tab:

* **OAuth 2.1** with the description "New monday.com apps use OAuth 2.1": your app uses OAuth 2.1. Follow the [OAuth 2.1](https://developer.monday.com/apps/docs/oauth-2-1) guide.
* A **New OAuth flow** toggle: your app was created before OAuth 2.1 became the default. If the toggle is on for a version, that version uses OAuth 2.1. If it's off, follow [Migrating to OAuth 2.1](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow).

<Callout icon="🚧" theme="warn">
Starting with API version `2027-04`, the monday API accepts only OAuth 2.1 tokens. If your app still uses OAuth 2.0, [migrate to OAuth 2.1](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow) to keep using newer API versions.
</Callout>

# Configure your scopes and redirect URLs

Before you start the OAuth flow, configure your app's scopes and redirect URLs. If you don't have an app yet, [create an app](https://developer.monday.com/apps/docs/create-an-app) and copy its [`client_id` and `client_secret`](https://developer.monday.com/apps/docs/the-developer-center#general-settings).

Then set the scopes and redirect URLs in the **OAuth & Permissions** tab of the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#build).

## Permission scopes

OAuth scopes define what your app can and can't do. Each endpoint in the monday API requires a specific permission scope, which is listed in the [API reference](https://developer.monday.com/api-reference/reference/about-the-api-reference).

> **Example**: the [get boards](https://developer.monday.com/api-reference/reference/boards#get-boards) query requires the `boards:read` scope.

When you ask a user to authorize your app, you specify which scopes your app requests. You can find the full list of available scopes:

* in the **OAuth & Permissions** section of the Developer Center, with a description of each scope
* in the `scopes_supported` field of the [authorization server metadata](https://auth.monday.com/.well-known/oauth-authorization-server)

Request only the scopes your app needs. Adding scopes later requires a new app version, and users must approve the new scopes.

## Redirect URLs

After a user approves or denies your app's authorization request, monday.com redirects them to your app's [`redirect_uri`](https://developer.monday.com/apps/docs/the-developer-center#build). You can register multiple URLs to send users to different pages based on their context.

The `redirect_uri` in an authorization request must exactly match one of your registered URLs. For OAuth 2.1, redirect URLs must use HTTPS. Plain HTTP is only allowed for `localhost` during development.

# OAuth flow for users with multiple accounts

![account\_selection](https://dapulse-res.cloudinary.com/image/upload/w_300/v1611934360/remote_mondaycom_static/uploads/AlexSavchuk/Screenshot_2021-01-29_at_17.30.25.png)

Some monday.com users belong to multiple accounts, so your app may want to specify which account to authorize. By default, the user selects the account from a dropdown.

To make sure the user authorizes a specific account, change the authorization URL based on the account's slug (the part of the account URL before `.monday.com`). You can get an account's slug by querying the [account](https://developer.monday.com/api-reference/reference/account#fields) through the monday API.

There are two ways to do this: construct the URL or add a query parameter. Both work with OAuth 2.1 and OAuth 2.0.

## Construct the URL

Build the authorization URL on the account's subdomain. The account becomes the default selection, but the user can still pick another account from the dropdown.

For an account with the slug `awesomeapp`, the URL looks like this:

`https://awesomeapp.monday.com/oauth2/authorize?client_id=<CLIENT_ID>&redirect_uri=<YOUR_URL>`

## Add a query parameter

Add the `subdomain=<ACCOUNT_SLUG>` query parameter to the authorization URL. Unlike the previous option, the user can't switch accounts from the dropdown.

For the same account, the URL looks like this:

`https://auth.monday.com/oauth2/authorize?client_id=<CLIENT_ID>&redirect_uri=<YOUR_URL>&subdomain=awesomeapp`

For OAuth 2.1, also include the PKCE parameters (`code_challenge` and `code_challenge_method`) in both URLs.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
