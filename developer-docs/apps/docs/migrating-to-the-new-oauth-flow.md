---
updatedAt: 2026-11-26T10:48:25.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Migrating to OAuth 2.1

Move an existing monday app and its stored tokens from the legacy OAuth 2.0 flow to OAuth 2.1.

This guide is for apps created before OAuth 2.1 became the default. It covers what to change in an existing OAuth 2.0 integration and how to move your stored tokens to OAuth 2.1 without asking users to authorize again. If you're building a new app, it already uses OAuth 2.1: follow the [OAuth 2.1](https://developer.monday.com/apps/docs/oauth-2-1) guide instead.

<Callout icon="🚧" theme="warn">
**Migrate before API version `2027-04`**

Starting with API version `2027-04`, the monday API accepts only OAuth 2.1 tokens. Requests that use OAuth 2.0 tokens with `2027-04` or later return `401 Unauthorized` with the `OAUTH21_TOKEN_REQUIRED` error code.
</Callout>

# What changes

|                            | OAuth 2.0 (legacy)                         | OAuth 2.1                                      |
| :------------------------- | :----------------------------------------- | :--------------------------------------------- |
| Authorization URL          | `https://auth.monday.com/oauth2/authorize` | Same URL, with required PKCE parameters        |
| Token URL                  | `https://auth.monday.com/oauth2/token`     | `https://auth.monday.com/oauth_ms/oauth/token` |
| PKCE                       | Not supported                              | Required (`S256` only)                         |
| Access token lifetime      | Doesn't expire                             | Expires (see `expires_in`)                     |
| Refresh tokens             | No                                         | Yes, rotating and single-use                   |
| Token revocation           | No                                         | Yes                                            |
| `scope` in token response  | Comma-separated                            | Space-separated                                |
| `app_version_id` parameter | Supported                                  | Not supported                                  |
| Redirect query parameters  | `code`, `scope`, `state`, `region`         | `code`, `state`, `status`, `iss`, `region`     |

These stay the same: your `client_id` and `client_secret`, your configured scopes and redirect URLs, the `state`, `force_install_if_needed`, and `subdomain` parameters, and the 10-minute lifetime of authorization codes.

# 1. Turn on OAuth 2.1 for a draft version

OAuth 2.1 is set per app version, and you can only change it on a draft version.

1. Open your app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#build).
2. Create a new draft version of your app.
3. Go to **OAuth & Permissions** and open the **Scopes** tab.
4. Turn on the **New OAuth flow** toggle.
5. Set the draft version as **Active for me** and test the flow end to end.
6. After you verify the flow, promote the draft version to live.

<Image align="center" alt="Turn on the New OAuth flow toggle in the OAuth & Permissions section of the Developer Center" caption="The New OAuth flow toggle in the OAuth & Permissions section" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1783411870/app%20features/new-oauth-opt-in-89d4a0cdfac2c6fa456a6c6de3c3a49c.png" className="border" />

New versions you create from this version keep OAuth 2.1 turned on.

<Callout icon="📘">
Turning on OAuth 2.1 doesn't affect tokens you already issued. Existing installations keep their OAuth 2.0 tokens until users authorize again or you [migrate the tokens](#6-migrate-stored-tokens). Only new authorizations use OAuth 2.1.
</Callout>

<Callout icon="🚧" theme="warn">
You can turn OAuth 2.1 off again on a later draft version, but OAuth 2.0 tokens stop working in API version `2027-04`. Keep OAuth 2.1 on and fix any issues on a draft version instead.
</Callout>

# 2. Add PKCE to the authorization request

The authorization URL is the same, but every request must include two new query parameters:

| Parameter               | Description                                                                    | Required |
| :---------------------- | :----------------------------------------------------------------------------- | :------- |
| `code_challenge`        | The base64url-encoded SHA-256 hash of a new code verifier (43–128 characters). | Yes      |
| `code_challenge_method` | Must be `S256`.                                                                | Yes      |

Generate a new code verifier for every authorization request and store it with the user's `state`. See [Generate PKCE values](https://developer.monday.com/apps/docs/oauth-2-1#1-generate-pkce-values) and [Redirect the user to the authorization URL](https://developer.monday.com/apps/docs/oauth-2-1#2-redirect-the-user-to-the-authorization-url) for examples.

If you send `app_version_id`, you can remove it. OAuth 2.1 uses the version set as **Active for me** for app collaborators, and the live version for everyone else.

# 3. Update your redirect handler

The redirect to your `redirect_uri` changes:

* The `scope` parameter is no longer included. Read the granted scopes from the `scope` field of the token response.
* A new `status` parameter is set to `success` when the user approves the request.
* A new `iss` parameter identifies the authorization server: `https://auth.monday.com`.
* Errors in the authorization request (for example, a missing code challenge) appear to the user on a monday.com error page and aren't sent to your `redirect_uri`. A denied request is still sent to your `redirect_uri` with `error=access_denied`.

See [Handle the redirect](https://developer.monday.com/apps/docs/oauth-2-1#3-handle-the-redirect) for the full list of parameters.

# 4. Update the token exchange

Send the token request to the new URL and include the code verifier:

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

The response now includes a refresh token and the access token's lifetime:

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

| Field           | Change from OAuth 2.0                                                |
| :-------------- | :------------------------------------------------------------------- |
| `access_token`  | Now expires. Use `expires_in` or the JWT's `exp` claim to know when. |
| `refresh_token` | New. Use it to get new tokens. It rotates every time you use it.     |
| `token_type`    | `Bearer` (OAuth 2.0 returned `bearer`).                              |
| `expires_in`    | New. The number of seconds until the access token expires.           |
| `scope`         | Now a space-separated list (OAuth 2.0 used commas).                  |
| `region`        | New. The monday.com region that hosts the user's account.            |

Update your storage to save both tokens and the access token's expiry time.

# 5. Refresh and revoke tokens

Your app must now refresh access tokens before they expire, and it can revoke tokens when a user disconnects:

* [Refresh the access token](https://developer.monday.com/apps/docs/oauth-2-1#6-refresh-the-access-token): store the new refresh token after every refresh. Refresh tokens are single-use, and reusing an old one revokes the authorization.
* [Revoke tokens](https://developer.monday.com/apps/docs/oauth-2-1#7-revoke-tokens): monday.com revokes your app's tokens automatically when an account uninstalls it. Revoke the refresh token yourself only when a user disconnects inside your app or your app no longer needs access.

# 6. Migrate stored tokens

If you stored OAuth 2.0 access tokens for existing users, exchange each one for an OAuth 2.1 token pair with the migration endpoint. Users don't need to authorize your app again.

<Callout icon="🚧" theme="warn">
This endpoint is **temporary** and will be removed after the migration period. Don't build it into your regular authentication flow.
</Callout>

<Callout icon="📘">
Only OAuth 2.0 tokens issued to your app can be migrated. Personal API tokens aren't supported.
</Callout>

`POST https://auth.monday.com/oauth_ms/oauth/migrate`

```shell
curl -X POST https://auth.monday.com/oauth_ms/oauth/migrate \
  -H "Content-Type: application/json" \
  -d '{
    "api_token": "YOUR_LEGACY_TOKEN",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'
```

| Parameter       | Description                             | Required |
| :-------------- | :-------------------------------------- | :------- |
| `api_token`     | The OAuth 2.0 access token to exchange. | Yes      |
| `client_id`     | Your app's client ID.                   | Yes      |
| `client_secret` | Your app's client secret.               | Yes      |

The endpoint is rate-limited. Migrate each token once, spread migrations of many tokens over time, and use exponential backoff if you receive a `429` response.

## Response

```json
{
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "already_migrated": false,
  "migrated_from": {
    "api_token_id": 12345678
  }
}
```

| Field              | Description                                                                                                                               |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `access_token`     | The new OAuth 2.1 access token. Use it for all API calls from now on.                                                                     |
| `refresh_token`    | The new refresh token. Use it to [refresh the access token](https://developer.monday.com/apps/docs/oauth-2-1#6-refresh-the-access-token). |
| `token_type`       | Always `Bearer`.                                                                                                                          |
| `expires_in`       | The number of seconds until the access token expires.                                                                                     |
| `already_migrated` | `true` if this token was migrated before. The response contains a new token pair for the existing authorization.                          |
| `migrated_from`    | The `api_token_id` of the token you exchanged.                                                                                            |

Calling the endpoint again for the same token is safe and doesn't create a second authorization.

After a successful migration, store the new token pair and stop using the OAuth 2.0 token. The OAuth 2.0 token keeps working only for a limited transition period.

## Error responses

| Status | Error code                      | Description                                                                                                 |
| :----- | :------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| 400    | `invalid_request`               | `api_token`, `client_id`, or `client_secret` is missing or not a string.                                    |
| 400    | `already_oauth_token`           | The token is already an OAuth 2.1 token. No migration is needed.                                            |
| 400    | `personal_tokens_not_supported` | The token is a personal API token. Only tokens issued to apps can be migrated.                              |
| 400    | `invalid_region`                | The token's region isn't recognized.                                                                        |
| 400    | `api_app_id_mismatch`           | The token wasn't issued to the app identified by `client_id`.                                               |
| 401    | `invalid_token`                 | The token is invalid, expired, or revoked.                                                                  |
| 401    | `token_not_found`               | The token doesn't exist.                                                                                    |
| 401    | `invalid_client`                | The `client_id` and `client_secret` don't match, or the app isn't eligible for token migration.             |
| 403    | `invalid_request`               | Token migration is currently disabled.                                                                      |
| 429    | `too_many_requests`             | Too many requests, or a migration of the same token is already in progress. Retry with exponential backoff. |
| 500    | `unknown_error`                 | An unexpected server error. Retry later.                                                                    |

# Migration checklist

1. Turn on **New OAuth flow** on a draft version and set it as **Active for me**.
2. Add `code_challenge` and `code_challenge_method=S256` to the authorization request, and remove `app_version_id`.
3. Read granted scopes from the token response instead of the redirect.
4. Send token requests to `https://auth.monday.com/oauth_ms/oauth/token` with `code_verifier`.
5. Store the access token, the refresh token, and the expiry time. Refresh before the access token expires, and save the new refresh token every time.
6. Call `/oauth/migrate` once for each stored OAuth 2.0 token, then stop using the old token.
7. Promote the draft version to live.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
