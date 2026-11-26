---
updatedAt: 2026-11-26T10:48:25.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# OAuth 2.1

Authorize your monday app with OAuth 2.1, PKCE, expiring access tokens, and refresh tokens.

OAuth 2.1 is the authorization flow for monday.com apps. Your app redirects a user to monday.com, the user approves the scopes your app requests, and your app exchanges the resulting authorization code for an access token and a refresh token. Use the access token to call the [monday API](https://developer.monday.com/api-reference/docs) on behalf of the user, and use the refresh token to get a new access token when the current one expires.

All new apps use OAuth 2.1. You can't turn it off for them. If your app was created before OAuth 2.1 became the default, see [Migrating to OAuth 2.1](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow).

<Callout icon="📘">
**Before you start**

Configure your app's [permission scopes](https://developer.monday.com/apps/docs/oauth#permission-scopes) and [redirect URLs](https://developer.monday.com/apps/docs/oauth#redirect-urls) in the Developer Center, and copy your app's `client_id` and `client_secret` from the **App credentials** tab in [General settings](https://developer.monday.com/apps/docs/the-developer-center#general-settings).
</Callout>

# How the flow works

1. Your app generates a PKCE code verifier and code challenge.
2. Your app redirects the user to `https://auth.monday.com/oauth2/authorize` with the code challenge.
3. The user reviews the requested scopes and approves them.
4. monday.com redirects the user to your `redirect_uri` with a temporary authorization code.
5. Your backend exchanges the code and the code verifier for an access token and a refresh token at `https://auth.monday.com/oauth_ms/oauth/token`.
6. Your backend calls the monday API with the access token and refreshes it before it expires.

| Endpoint      | URL                                                                  |
| :------------ | :------------------------------------------------------------------- |
| Authorization | `GET https://auth.monday.com/oauth2/authorize`                       |
| Token         | `POST https://auth.monday.com/oauth_ms/oauth/token`                  |
| Revocation    | `POST https://auth.monday.com/oauth_ms/oauth/revoke`                 |
| Discovery     | `GET https://auth.monday.com/.well-known/oauth-authorization-server` |

# 1. Generate PKCE values

PKCE (Proof Key for Code Exchange) binds the authorization request to the token request, so an intercepted authorization code can't be used by anyone else. PKCE is required for every authorization request.

Create a new code verifier for every authorization request. The verifier is a cryptographically random string of 43–128 characters that uses only unreserved characters (`A-Z`, `a-z`, `0-9`, `-`, `.`, `_`, `~`). Then hash it with SHA-256 and base64url-encode the result to get the code challenge:

```javascript
const crypto = require("crypto");

const codeVerifier = crypto.randomBytes(32).toString("base64url");
const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier)
  .digest("base64url");
```

Store the `codeVerifier` on your server (for example, in the user's session, next to your `state` value). You need it in [step 4](#4-exchange-the-code-for-tokens).

<Callout icon="🚧" theme="warn">
Only the `S256` method is supported. Plain code challenges are rejected.
</Callout>

# 2. Redirect the user to the authorization URL

Send the user to the authorization endpoint with your app's details and the code challenge. This example builds the URL from the values in step 1:

```javascript
const state = crypto.randomBytes(16).toString("hex");

const authorizeUrl = new URL("https://auth.monday.com/oauth2/authorize");
authorizeUrl.search = new URLSearchParams({
  client_id: "YOUR_CLIENT_ID",
  redirect_uri: "https://yourapp.com/callback",
  state,
  code_challenge: codeChallenge,
  code_challenge_method: "S256",
}).toString();

// Redirect the user to authorizeUrl.toString()
```

| Parameter                 | Description                                                                                                                                                                               | Required                                        |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| `client_id`               | Your app's client ID, from the **App credentials** tab in [General settings](https://developer.monday.com/apps/docs/the-developer-center#general-settings).                               | Yes                                             |
| `code_challenge`          | The base64url-encoded SHA-256 hash of your code verifier (43–128 characters).                                                                                                             | Yes                                             |
| `code_challenge_method`   | Must be `S256`.                                                                                                                                                                           | Yes                                             |
| `redirect_uri`            | The URL to send the user back to. Must exactly match one of your app's [redirect URLs](https://developer.monday.com/apps/docs/oauth#redirect-urls).                                       | Yes, if your app has more than one redirect URL |
| `scope`                   | A space-separated list of the scopes your app requests. Every scope must be configured in your app. If omitted, the scopes configured in your app are requested.                          | No                                              |
| `state`                   | A random value that monday.com returns to your `redirect_uri` unchanged. Generate a unique value per request and verify it in the callback to prevent cross-site request forgery.         | Recommended                                     |
| `force_install_if_needed` | Set to `true` to send users to the app installation page if your app isn't installed on their account yet. After an admin installs the app, the user returns to the authorization flow.   | No                                              |
| `subdomain`               | Forces authorization for a specific account. See [OAuth flow for users with multiple accounts](https://developer.monday.com/apps/docs/oauth#oauth-flow-for-users-with-multiple-accounts). | No                                              |

<Callout icon="📘">
**Which app version is used?**

OAuth 2.1 doesn't support the `app_version_id` parameter. For app collaborators, monday.com uses the version set as **Active for me**. For everyone else, it uses the live version.
</Callout>

If the authorization request is invalid (for example, the `client_id` is unknown, the `redirect_uri` doesn't match, or PKCE parameters are missing), monday.com shows the error to the user and doesn't redirect to your app.

# 3. Handle the redirect

When the user approves the request, monday.com redirects them to your `redirect_uri` with these query parameters:

| Parameter | Description                                                                          |
| :-------- | :----------------------------------------------------------------------------------- |
| `code`    | The authorization code. It's single-use and valid for 10 minutes.                    |
| `state`   | The `state` value you sent in the authorization request.                             |
| `status`  | `success` when the user approved the request.                                        |
| `iss`     | The authorization server that issued the code: `https://auth.monday.com`.            |
| `region`  | The monday.com region that hosts the user's account (for example, `use1` or `euc1`). |

For example (line breaks added for readability):

```
https://yourapp.com/callback
  ?code=AUTHORIZATION_CODE
  &state=RANDOM_STATE
  &status=success
  &iss=https%3A%2F%2Fauth.monday.com
  &region=use1
```

If the user denies the request, the redirect contains `error=access_denied`, an `error_description`, `iss`, and `state` instead of a `code`.

Before you continue, verify that `state` matches the value you stored for this user. If it doesn't, reject the request.

# 4. Exchange the code for tokens

From your backend, exchange the authorization code for tokens:

`POST https://auth.monday.com/oauth_ms/oauth/token`

```shell
curl -X POST https://auth.monday.com/oauth_ms/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "code": "AUTHORIZATION_CODE",
    "redirect_uri": "https://yourapp.com/callback",
    "code_verifier": "YOUR_CODE_VERIFIER"
  }'
```

| Parameter       | Description                                                                                                                 | Required                                         |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| `grant_type`    | `authorization_code`.                                                                                                       | Yes                                              |
| `client_id`     | Your app's client ID.                                                                                                       | Yes                                              |
| `client_secret` | Your app's client secret. Never expose it in client-side code.                                                              | Yes                                              |
| `code`          | The authorization code from the redirect.                                                                                   | Yes                                              |
| `code_verifier` | The code verifier you generated in step 1. Its SHA-256 hash must match the `code_challenge` from the authorization request. | Yes                                              |
| `redirect_uri`  | Must exactly match the `redirect_uri` from the authorization request.                                                       | Yes, if you sent it in the authorization request |

The token endpoint accepts `application/json` and `application/x-www-form-urlencoded` request bodies. You can send `client_id` and `client_secret` in the body or as an HTTP Basic `Authorization` header.

<Callout icon="🚧" theme="warn">
Authorization codes are single-use, including when the exchange fails. If the token request is rejected, send the user through the authorization flow again with a new code verifier.
</Callout>

## Response

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "scope": "boards:read users:read",
  "region": "use1"
}
```

| Field           | Description                                                                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `access_token`  | The token for calling the monday API. It's a JWT that expires.                                                                                                       |
| `refresh_token` | The token for getting a new access token. It's a JWT, it expires, and it changes every time you use it. See [Refresh the access token](#6-refresh-the-access-token). |
| `token_type`    | Always `Bearer`.                                                                                                                                                     |
| `expires_in`    | The number of seconds until the access token expires.                                                                                                                |
| `scope`         | A space-separated list of the scopes the user granted.                                                                                                               |
| `region`        | The monday.com region that hosts the user's account.                                                                                                                 |

Store both tokens securely on your server, encrypted at rest.

<Callout icon="📘">
Token lifetimes can change. Use `expires_in`, or the `exp` claim in the JWT, to know when a token expires. Don't hardcode lifetimes.
</Callout>

# 5. Call the monday API

Send the access token in the `Authorization` header. In this example, `$ACCESS_TOKEN` is a shell variable that holds the token:

```shell
curl -X POST https://api.monday.com/v2 \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { me { id name } }"}'
```

The token can only access what the granted scopes allow.

# 6. Refresh the access token

When the access token is about to expire, use the refresh token to get a new pair. The user doesn't need to do anything.

`POST https://auth.monday.com/oauth_ms/oauth/token`

```shell
curl -X POST https://auth.monday.com/oauth_ms/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "refresh_token",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

The response contains a new access token and a new refresh token:

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

<Callout icon="🚧" theme="warn">
**Refresh tokens rotate and are single-use**

Every refresh returns a new `refresh_token`. Store it right away and discard the previous one.

If your app sends the same refresh token again within a short retry window (for example, after a network error), it gets the same new token pair back. After that, reusing an old refresh token returns `invalid_grant` and revokes every token issued for that authorization. The user then has to authorize your app again.
</Callout>

## Recommended refresh strategy

* Refresh proactively, before the access token expires. Use `expires_in` from the token response, or the `exp` claim in the access token.
* Make sure only one process refreshes a given user's tokens at a time, and save the new refresh token before you use the new access token.
* If an API call returns `401 Unauthorized`, refresh once and retry the call.
* If the refresh request returns `invalid_grant`, send the user through the authorization flow again. Don't retry the refresh in a loop.

# 7. Revoke tokens

When an account uninstalls your app, monday.com revokes your app's tokens for that account automatically shortly after. You don't need to call this endpoint for uninstalls.

Use this endpoint to revoke tokens yourself, for example when a user disconnects their account inside your app without uninstalling it, or when your app no longer needs access.

`POST https://auth.monday.com/oauth_ms/oauth/revoke`

```shell
curl -X POST https://auth.monday.com/oauth_ms/oauth/revoke \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_REFRESH_TOKEN",
    "token_type_hint": "refresh_token",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'
```

| Parameter         | Description                                             | Required |
| :---------------- | :------------------------------------------------------ | :------- |
| `token`           | The access token or refresh token to revoke.            | Yes      |
| `token_type_hint` | `access_token` or `refresh_token`. See the table below. | No       |
| `client_id`       | Your app's client ID.                                   | Yes      |
| `client_secret`   | Your app's client secret.                               | Yes      |

| What you revoke                                               | Result                                                                                                   |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| A refresh token, or any token without `token_type_hint`       | The whole authorization is revoked. All access tokens and the refresh token stop working.                |
| An access token, with `token_type_hint` set to `access_token` | Access tokens issued so far stop working. The refresh token still works and can issue new access tokens. |

On success, the response is:

```json
{
  "success": true
}
```

Following [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009), the endpoint also returns `success: true` for tokens that are unknown or already revoked.

# Server discovery

The authorization server publishes its metadata at a well-known URL ([RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414)). Use it to configure OAuth client libraries without hardcoding endpoints. The endpoint is public and doesn't require authentication.

`GET https://auth.monday.com/.well-known/oauth-authorization-server`

The same document is also available at `https://auth.monday.com/oauth_ms/.well-known/oauth-authorization-server`.

**Example response (truncated):**

```json
{
  "issuer": "https://auth.monday.com",
  "authorization_endpoint": "https://auth.monday.com/oauth2/authorize",
  "token_endpoint": "https://auth.monday.com/oauth_ms/oauth/token",
  "revocation_endpoint": "https://auth.monday.com/oauth_ms/oauth/revoke",
  "scopes_supported": ["me:read", "boards:read", "boards:write", "..."],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["client_secret_post", "client_secret_basic"],
  "authorization_response_iss_parameter_supported": true
}
```

| Field                                            | Description                                                                       |
| :----------------------------------------------- | :-------------------------------------------------------------------------------- |
| `issuer`                                         | The authorization server identifier. Matches the `iss` parameter in the redirect. |
| `authorization_endpoint`                         | The URL to send users to for authorization.                                       |
| `token_endpoint`                                 | The URL for exchanging codes and refreshing tokens.                               |
| `revocation_endpoint`                            | The URL for revoking tokens.                                                      |
| `scopes_supported`                               | All OAuth scopes available to apps.                                               |
| `response_types_supported`                       | Supported response types (`code` only).                                           |
| `grant_types_supported`                          | Supported grant types.                                                            |
| `code_challenge_methods_supported`               | Supported PKCE methods (`S256` only).                                             |
| `token_endpoint_auth_methods_supported`          | How your app can send its client credentials to the token endpoint.               |
| `authorization_response_iss_parameter_supported` | `true`: the redirect includes the `iss` parameter.                                |

The full response also includes fields that apps don't need, such as `registration_endpoint`, which is used by MCP clients.

# Errors

The token and revocation endpoints return errors as JSON:

```json
{
  "error": "invalid_grant",
  "error_description": "PKCE verification failed"
}
```

| Status | Error             | Common causes                                                                                                                                                                                       |
| :----- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `invalid_request` | A required parameter is missing or malformed, `code_verifier` is missing, or `redirect_uri` doesn't match the authorization request.                                                                |
| 400    | `invalid_grant`   | The authorization code is invalid, expired, or already used; the code verifier doesn't match the code challenge; or the refresh token is invalid, expired, already used, or belongs to another app. |
| 401    | `invalid_client`  | `client_id` or `client_secret` is missing or wrong, or the app is inactive.                                                                                                                         |
| 500    | `unknown_error`   | An unexpected server error. Retry with exponential backoff.                                                                                                                                         |

Read `error` to decide what to do. The `error_description` text is for debugging and can change.

# Next steps

* [Migrating to OAuth 2.1](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow): move an existing app and its stored tokens to OAuth 2.1.
* [Choosing an authentication method](https://developer.monday.com/apps/docs/choosing-auth): compare OAuth with seamless authentication and short-lived tokens.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
