---
updatedAt: 2026-11-05T10:38:34.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Migrating to the new OAuth 2.1 flow

Migrate your monday app from the legacy OAuth flow to the new OAuth 2.1 flow with expiring tokens, refresh tokens, and token revocation.

The new OAuth 2.1 flow introduces several important changes to how your app handles authentication tokens. This guide covers only what you need to change in your existing integration - the authorization request (step 1 of the [OAuth flow](https://developer.monday.com/apps/docs/oauth#the-oauth-flow)) remains the same URL, with PKCE parameters required for the new flow.

The key differences in the new flow are:

* **Access tokens now expire** - decode the JWT and read the `exp` claim to know when to refresh.
* **Refresh tokens** - use them to obtain new access tokens without user re-authorization. Refresh tokens rotate on every use and are single-use; they also carry an `exp` claim.
* **Token revocation** - explicitly revoke tokens when they are no longer needed.
* **New token endpoint URL** - token exchange uses a different endpoint.
* **PKCE is required** - every authorization request and token exchange in the new flow must use PKCE (`S256`).

> 📘 New to OAuth?
>
> If you haven't implemented OAuth yet, start with the [OAuth and Permissions](https://developer.monday.com/apps/docs/oauth) guide first, then return here to use the new flow.

# 1. Enable the new OAuth flow

Before migrating, enable the new OAuth flow for your app version in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#oauth):

1. Go to your app in the Developer Center.
2. Navigate to the **OAuth & Permissions** tab.
3. Create a new draft version of your app. The toggle is per version.
4. Enable the **New OAuth Flow** toggle for the draft version.
5. Test the flow using the draft version by setting it as **Active for me**.
6. After verifying the flow works, promote the draft version to live.

<Image align="center" alt="Enable the New OAuth flow toggle in the OAuth & permissions tab of the Developer Center" caption="The New OAuth flow toggle in the OAuth & permissions tab" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1783411870/app%20features/new-oauth-opt-in-89d4a0cdfac2c6fa456a6c6de3c3a49c.png" className="border" />

<Callout icon="📘">
Enabling the toggle does **not** expire tokens already issued under the legacy flow. Existing installs keep their non-expiring tokens until the user re-authorizes or you migrate those tokens with [`/oauth/migrate`](#6-migrate-legacy-api-tokens). Only **new** authorization-code exchanges after the toggle use the new token URL and expiring access/refresh tokens.
</Callout>

# 2. Update your token endpoint URL

The authorize endpoint stays at the same URL:

`GET https://auth.monday.com/oauth2/authorize`

For the new flow it requires PKCE, which adds the following query parameters:

| Parameter               | Description                                                                                                                                                                  | Required |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| code\_challenge         | A PKCE code challenge (a base64url-encoded SHA-256 hash of the `code_verifier`). Must be 43–128 characters. See the [PKCE](#pkce-proof-key-for-code-exchange) section below. | Required |
| code\_challenge\_method | The method used to generate the code challenge. Only `S256` is supported.                                                                                                    | Required |

The token exchange endpoint **has changed**:

|           | Old flow                                    | New flow                                            |
| :-------- | :------------------------------------------ | :-------------------------------------------------- |
| Token URL | `POST https://auth.monday.com/oauth2/token` | `POST https://auth.monday.com/oauth_ms/oauth/token` |

Update your backend code to use the new URL when exchanging authorization codes for tokens.

The token exchange request also requires the PKCE verifier:

| Parameter      | Description                                                                                                                                                                             | Required |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| code\_verifier | The original PKCE code verifier string (43–128 characters). Must match the `code_challenge` sent during authorization. See the [PKCE](#pkce-proof-key-for-code-exchange) section below. | Required |

## Updated token exchange request

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

> 📘 Redirect URI
>
> The `redirect_uri` parameter is required in the token exchange request if it was provided in the authorization request.

## Updated token exchange response

The response now includes a `refresh_token` and a space-separated `scope` list. Access and refresh tokens are JWTs — decode them and read the `exp` claim for expiry. Do not hard-code lifetimes; they can change.

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "scope": "boards:read users:read"
}
```

| Key            | Change from old flow                                                                                                                                                                           |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access\_token  | Now expires. Decode the JWT and read `exp` for the expiration timestamp. Previously, tokens were valid until the user uninstalled your app.                                                    |
| refresh\_token | New. Use this to obtain a new access token when the current one expires. Also a JWT with an `exp` claim. Rotates on every refresh — see [Implement token refresh](#3-implement-token-refresh). |
| token\_type    | No change. Always `Bearer`.                                                                                                                                                                    |
| scope          | Now a **space-separated** list of granted scopes (the legacy flow returned a comma-separated list).                                                                                            |

# 3. Implement token refresh

Since access tokens now expire, your app must refresh them using the refresh token. This does not require user interaction.

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

The response returns a new access token and a new refresh token:

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "scope": "boards:read users:read"
}
```

<Callout icon="🚧" theme="warn">
**Refresh tokens rotate and are single-use**

Every successful refresh returns a **new** `refresh_token`. Persist it immediately and discard the previous one.

Reusing an old refresh token returns `invalid_grant`. Concurrent refreshes that present the same token within a short retry window are treated as retries and receive the same successor pair; after that window, reuse can revoke the entire token family and force the user to re-authorize.
</Callout>

## Recommended refresh strategy

* Decode the access token JWT and read the `exp` claim to know when it expires. Do the same for the refresh token when you need its lifetime.
* Refresh the access token proactively before `exp` — for example, when less than 5 minutes remain.
* If an API call returns `401 Unauthorized`, attempt one token refresh and retry the request.
* On `invalid_grant` from the refresh endpoint (expired or reused refresh token), send the user through the authorization flow again. Do not retry refresh in a loop.

# 4. Revoke tokens

You can explicitly revoke tokens when they are no longer needed.

`POST https://auth.monday.com/oauth_ms/oauth/revoke`

```shell
curl -X POST https://auth.monday.com/oauth_ms/oauth/revoke \
  -H "Content-Type: application/json" \
  -d '{
    "token": "TOKEN_TO_REVOKE",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "token_type_hint": "access_token"
  }'
```

| Parameter         | Description                                                                         | Required |
| :---------------- | :---------------------------------------------------------------------------------- | :------- |
| token             | The access token or refresh token to revoke. Depends on `token_type_hint`.          | Yes      |
| client\_id        | Your app's unique identifier.                                                       | Yes      |
| client\_secret    | Your app's secret.                                                                  | Yes      |
| token\_type\_hint | Either `access_token` or `refresh_token`. Helps the server identify the token type. | No       |

On success, the response contains:

```json
{
  "success": true
}
```

# 5. Server discovery (well-known endpoint)

The OAuth service exposes an [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414) discovery endpoint that lets clients auto-discover all OAuth endpoints, supported scopes, and capabilities without hardcoding URLs.

`GET https://auth.monday.com/oauth_ms/.well-known/oauth-authorization-server`

**Example response (truncated):**

```json
{
  "issuer": "https://auth.monday.com",
  "authorization_endpoint": "https://auth.monday.com/oauth2/authorize",
  "token_endpoint": "https://auth.monday.com/oauth_ms/oauth/token",
  "registration_endpoint": "https://auth.monday.com/oauth_ms/oauth/register",
  "revocation_endpoint": "https://auth.monday.com/oauth_ms/oauth/revoke",
  "scopes_supported": ["me:read", "boards:read", "boards:write", "..."],
  "response_types_supported": ["code"],
  "grant_types_supported": [
    "authorization_code",
    "refresh_token"
  ],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["client_secret_post"]
}
```

| Field                                     | Description                                         |
| :---------------------------------------- | :-------------------------------------------------- |
| issuer                                    | The monday.com base URL.                            |
| authorization\_endpoint                   | URL to redirect users for authorization.            |
| token\_endpoint                           | URL to exchange codes for tokens or refresh tokens. |
| registration\_endpoint                    | URL for Dynamic Client Registration (DCR).          |
| revocation\_endpoint                      | URL to revoke tokens.                               |
| scopes\_supported                         | Full list of available OAuth scopes.                |
| response\_types\_supported                | Supported response types (`code` only).             |
| grant\_types\_supported                   | Supported grant types.                              |
| code\_challenge\_methods\_supported       | Supported PKCE methods (`S256` only).               |
| token\_endpoint\_auth\_methods\_supported | How clients authenticate at the token endpoint.     |

> 📘 Auto-configure your OAuth client
>
> Use this endpoint to auto-configure your OAuth client. It is unauthenticated and publicly accessible. See the full response at <https://auth.monday.com/oauth_ms/.well-known/oauth-authorization-server>.

# PKCE (Proof Key for Code Exchange)

PKCE protects the authorization code flow from interception attacks, especially for public clients such as mobile apps, single-page apps, and CLI tools. It is required for all apps using the new OAuth flow.

## 1. Generate a code verifier

Create a cryptographically random string between 43 and 128 characters using unreserved characters (`[A-Z]` / `[a-z]` / `[0-9]` / `-` / `.` / `_` / `~`).

```javascript
const crypto = require("crypto");
const codeVerifier = crypto.randomBytes(32).toString("base64url");
```

## 2. Compute the code challenge

Hash the verifier with SHA-256 and base64url-encode the result:

```javascript
const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier)
  .digest("base64url");
```

## 3. Include the challenge in the authorization request

`GET https://auth.monday.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&code_challenge=CODE_CHALLENGE&code_challenge_method=S256`

## 4. Include the verifier in the token exchange

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

The server verifies that `SHA256(code_verifier)` matches the `code_challenge` sent during authorization. If they don't match, the token exchange is rejected.

> 🚧 Only S256 is supported
>
> Only `S256` is supported as the challenge method. Plain code challenges are not accepted.

# What stays the same

The following parts of the OAuth flow are unchanged and do not require any modifications:

* **Authorization URL**: `GET https://auth.monday.com/oauth2/authorize` (same URL; add the required PKCE query parameters for the new flow).
* **Permission scopes**: Same scope definitions and configuration in the Developer Center. The token response delimiter changes from commas to spaces — see [Updated token exchange response](#updated-token-exchange-response).
* **Redirect URLs**: Same configuration and validation rules.
* **Redirect callback**: Same parameters — `code`, `state`, and `status`. Check `status` to confirm the user approved the authorization.
* **Authorization code**: Still valid for 10 minutes, with the same exchange process (just a different endpoint URL, plus `code_verifier`).
* **Client credentials**: Same `client_id` and `client_secret` from the Developer Center.

# 6. Migrate legacy API tokens

<Callout icon="🚧" theme="warn">
This endpoint is **temporary** and will be removed once the OAuth 2.1 migration is complete. Do not use it as a permanent authentication strategy.
</Callout>

If you have existing integrations using legacy monday app API tokens, you can exchange them for an OAuth 2.1 access/refresh token pair using the migration endpoint — without requiring the user to go through the OAuth consent flow again.

<Callout icon="📘">
Only legacy **app** API tokens can be migrated. Personal API tokens are not supported.
</Callout>

`POST https://auth.monday.com/oauth_ms/oauth/migrate`

This endpoint is **rate-limited**. Avoid calling it repeatedly or in bulk. It is intended for a one-time migration per token.
If you receive a `429` status code, wait 5 minutes before retrying. Build exponential backoff into any migration script — do not retry immediately.

## Request

```shell Terminal
curl -X POST https://auth.monday.com/oauth_ms/oauth/migrate \
  -H "Content-Type: application/json" \
  -d '{
    "api_token": "YOUR_LEGACY_API_TOKEN",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'
```

| Parameter      | Description                                                          | Required |
| :------------- | :------------------------------------------------------------------- | :------- |
| api\_token     | The legacy monday API token to exchange.                             | Yes      |
| client\_id     | The OAuth client ID of your app (from the app's OAuth settings).     | Yes      |
| client\_secret | The OAuth client secret of your app (from the app's OAuth settings). | Yes      |

## Response

On success, the response contains a new OAuth 2.1 access token and refresh token:

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "already_migrated": false,
  "migrated_from": {
    "api_token_id": 12345678
  }
}
```

| Field             | Description                                                                                                                                                            |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access\_token     | The new OAuth 2.1 access token. Decode the JWT and read `exp` for expiry. Use this for all subsequent API calls.                                                       |
| refresh\_token    | Use this to obtain a new access token when the current one expires. Also a JWT with an `exp` claim. See [Implement token refresh](#3-implement-token-refresh).         |
| token\_type       | Always `Bearer`.                                                                                                                                                       |
| migrated\_from    | Contains the `api_token_id` of the original token that was exchanged.                                                                                                  |
| already\_migrated | `true` if this token was already migrated in a previous call. No new token was created; the existing pair is returned — read `exp` on the JWTs for remaining lifetime. |

<Callout icon="📘">
This endpoint is idempotent per token. Calling it multiple times for the same token is safe — it returns the existing OAuth token with `already_migrated: true` and the remaining lifetime.
</Callout>

<Callout icon="🚧" theme="warn">
Migration issues a **new** OAuth access/refresh pair and leaves the legacy API token in place for a transition period. After a successful migration, store the new pair and use it for all API calls. The legacy token will stop working eventually, so treat the migration as the moment to retire it.
</Callout>

After migration, store the `access_token` and `refresh_token` and use the standard [token refresh](#3-implement-token-refresh) flow going forward.

## Error responses

| Status | Error code                      | Description                                                                     |
| :----- | :------------------------------ | :------------------------------------------------------------------------------ |
| 400    | `invalid_request`               | `api_token`, `client_id`, or `client_secret` is missing or not a string.        |
| 400    | `already_oauth_token`           | The supplied token is already an OAuth token — no migration needed.             |
| 400    | `personal_tokens_not_supported` | Personal API tokens cannot be migrated; only app tokens are supported.          |
| 400    | `invalid_region`                | The token's region is not recognized.                                           |
| 400    | `api_app_id_mismatch`           | The `client_id` and `client_secret` do not belong to the same app as the token. |
| 401    | `invalid_token`                 | Token signature is invalid, expired, revoked, or not found.                     |
| 401    | `invalid_client`                | The `client_id` does not match the `client_secret`.                             |
| 403    | `invalid_request`               | Token migration is currently disabled.                                          |
| 429    | `too_many_requests`             | Rate limit exceeded. Wait 5 minutes before retrying.                            |
| 500    | —                               | Unexpected server error.                                                        |

# Migration checklist

1. Enable **New OAuth Flow** on a draft app version and set it **Active for me**.
2. Switch your token URL to `https://auth.monday.com/oauth_ms/oauth/token` and send PKCE (`code_challenge` / `code_verifier`, `S256` only).
3. Persist both `access_token` and `refresh_token`; treat refresh tokens as rotating and single-use.
4. Refresh proactively from the access token JWT `exp`; on API `401`, refresh once and retry; on refresh `invalid_grant`, re-authorize the user.
5. If you store legacy app API tokens, call `/oauth/migrate` once per token, then stop using the legacy token.
6. Promote the draft version to live after verifying the flow.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
