---
updatedAt: 2025-10-23T05:08:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Authentication

When building an integration with monday.com, you'll need to handle authentication. Below are the main authentication flows you will implement:

* Verify the authenticity of requests from monday
* Authenticate using a short-lived token
* Initiate the OAuth flow

# Verify the authenticity of requests from monday.com

Your app should validate the **Authorization JWT** included with each request to ensure that incoming requests are from monday.com.

monday.com signs every outbound request with a [JWT](https://jwt.io/) (JSON Web Token) in the `Authorization` header. You can decode this token to extract useful metadata and verify its signature to ensure the request's authenticity.

The JWTs are signed with different secrets depending on the webhook source:

* [App lifecycle webhooks](https://developer.monday.com/apps/docs/webhooks-1): Signed using your app's **Client Secret**
* [Board webhooks](https://developer.monday.com/api-reference/reference/webhooks): Signed using your app's **Signing Secret**

### Verify the JWT

You should decode and verify the JWT using a third-party library like [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) or [pyjwt](https://github.com/jpadilla/pyjwt/). Visit jwt.io to [browse a list of libraries](https://jwt.io/libraries) in different languages.

### JWT contents

The JWT contains a JSON object with metadata about the request. It has the following structure:

```json
{
  "accountId": 1825528, // the ID of the account initiating the request
  "userId": 4012689, // the ID of the user triggering the action
  "aud": "https://www.yourserver.com/endpoint", // the expected audience of the token (your app’s endpoint URL)
  "exp": 1606808758, // expiration timestamp of the JWT
  "shortLivedToken": "SHORT_LIVED_TOKEN_HERE", // the short-lived token to authenticate against the monday API
  "iat": 1606808458 // issued-at timestamp of the JWT
}
```

This JWT will be included every time the monday integration server sends a POST request to your integration app, such as when:

* Directing a user to your app's Authorization URL
* Subscribing to a [custom trigger](developer.monday.com/apps/docs/trigger-block-reference-workflows)
* Unsubscribing from a [custom trigger](developer.monday.com/apps/docs/trigger-block-reference-workflows)
* Calling your [custom action's](developer.monday.com/apps/docs/action-block-reference-workflows) run URL
* Retrieving remote options for a dropdown field
* Retrieving remote field definitions for [object fields and custom entities](developer.monday.com/apps/docs/object)

## Authenticate using a short-lived API token

During integration runtime, monday will send your app a short-lived API token. This token is included in the `Authorization` header and is valid for five minutes.

You can use this token to authenticate against the monday API. It will have the same permission scopes as your app. Note that monday.com will only issue a short-lived token if your app's endpoints are secured with HTTPS.

For details on how to use this token for authentication, refer to [monday API Authentication](https://developer.monday.com/api-reference/docs/authentication).

## Initiate the OAuth flow

If your integration needs to authenticate with a third-party system (e.g., for sending data or storing OAuth tokens), you can choose between two options:

* Credentials field (recommended): Use if you want to share the same code for workflows and the sentence builder. Learn more about this option in the [Credentials field documentation](https://developer.monday.com/apps/docs/credentials)
* Authorization URL: Use if everyone goes through the same flow, or if you're using the sentence builder. Learn more in the [Authorization URL documentation](https://developer.monday.com/apps/docs/authorization-url).
