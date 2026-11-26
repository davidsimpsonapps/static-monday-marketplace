---
updatedAt: 2026-11-26T09:58:51.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# OAuth 2.0 (legacy)

Reference for the legacy OAuth 2.0 flow with non-expiring access tokens.

This page documents the legacy OAuth 2.0 flow, which issues access tokens that don't expire and has no refresh tokens. It's only available to apps created before [OAuth 2.1](https://developer.monday.com/apps/docs/oauth-2-1) became the default, and only for app versions that don't have OAuth 2.1 turned on.

<Callout icon="🚧" theme="warn">
**Legacy tokens stop working in API version `2027-04`**

Starting with API version `2027-04`, the monday API accepts only OAuth 2.1 tokens. Requests that use OAuth 2.0 tokens with `2027-04` or later return `401 Unauthorized` with the `OAUTH21_TOKEN_REQUIRED` error code. [Migrate to OAuth 2.1](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow) to keep using newer API versions.
</Callout>

# How the flow works

1. Your app redirects the user to `https://auth.monday.com/oauth2/authorize` with your `client_id`.
2. The user reviews the requested scopes and approves them.
3. monday.com redirects the user to your `redirect_uri` with a temporary authorization code.
4. Your backend exchanges the code for an access token at `https://auth.monday.com/oauth2/token`. The token is valid until the user uninstalls your app.

# Authorization request

Redirect the user to the authorization endpoint:

`GET https://auth.monday.com/oauth2/authorize?client_id=YOUR_CLIENT_ID`

| Parameter                 | Description                                                                                                                                                                                                    | Default value                                                      | Required                                         |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :----------------------------------------------- |
| `client_id`               | Your app's client ID, from the **App credentials** tab in [General settings](https://developer.monday.com/apps/docs/the-developer-center#general-settings).                                                    |                                                                    | Yes                                              |
| `redirect_uri`            | The URL to redirect back to after approval or denial. Must exactly match one of your app's [redirect URLs](https://developer.monday.com/apps/docs/oauth#redirect-urls).                                        | Your only redirect URL, if you configured exactly one              | Yes, if more than one redirect URL is configured |
| `scope`                   | A space-separated list of the scopes your app requests. Every scope must be configured in your app.                                                                                                            | The scopes configured in your app                                  | No                                               |
| `state`                   | A random value returned to your `redirect_uri` unchanged. Use a unique value per request and verify it in the callback to prevent forgery attacks.                                                             |                                                                    | Recommended                                      |
| `app_version_id`          | The ID of the app version to authorize, found in your app's URL after `app_versions`. Lets app collaborators test a draft version. Doesn't work for deprecated versions or for users who aren't collaborators. | The live version, or the latest version if there's no live version | No                                               |
| `force_install_if_needed` | Set to `true` to send users to the app installation page if your app isn't installed on their account yet. After an admin installs the app, the user returns to the authorization flow.                        |                                                                    | No                                               |
| `subdomain`               | Forces authorization for a specific account. See [OAuth flow for users with multiple accounts](https://developer.monday.com/apps/docs/oauth#oauth-flow-for-users-with-multiple-accounts).                      |                                                                    | No                                               |

# Redirect

After the user approves the request, monday.com redirects them to your `redirect_uri` with these query parameters:

| Parameter | Description                                                                          |
| :-------- | :----------------------------------------------------------------------------------- |
| `code`    | The authorization code. It's single-use and valid for 10 minutes.                    |
| `scope`   | The scopes the user granted.                                                         |
| `state`   | The `state` value you sent in the authorization request.                             |
| `region`  | The monday.com region that hosts the user's account (for example, `use1` or `euc1`). |

If the user denies the request, the redirect contains `error=access_denied`, an `error_description`, and `state` instead of a `code`.

# Token request and response

Exchange the authorization code for an access token from your backend within 10 minutes. After that, the code expires and the user has to authorize again.

`POST https://auth.monday.com/oauth2/token`

| Parameter       | Description                                                                                                  | Required                                         |
| :-------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| `client_id`     | Your app's client ID.                                                                                        | Yes                                              |
| `client_secret` | Your app's client secret.                                                                                    | Yes                                              |
| `code`          | The authorization code from the redirect.                                                                    | Yes                                              |
| `redirect_uri`  | Used for validation only; there's no redirect. Must match the `redirect_uri` from the authorization request. | Yes, if you sent it in the authorization request |
| `grant_type`    | `authorization_code`.                                                                                        | No                                               |

## Response

On success, the response status is `200 OK` and the body contains:

| Key            | Description                                                                                                                                                  |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `access_token` | The token for calling the monday API. It **doesn't expire** and is valid until the user uninstalls your app. The legacy flow doesn't support refresh tokens. |
| `token_type`   | Always `bearer`.                                                                                                                                             |
| `scope`        | A **comma-separated** list of the scopes granted to the token.                                                                                               |

```json
{
  "access_token": "NgeFeX...FEmEka",
  "token_type": "bearer",
  "scope": "boards:write,boards:read"
}
```

# Error codes

Most errors in the authorization request are returned as a JSON response with an HTTP status code. When the user denies access, monday.com redirects them to your `redirect_uri` with `error=access_denied`.

| Status | Error code                  | Description                                                                                                                                   |
| :----- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `invalid_request`           | A required parameter is missing or invalid (for example, an unknown `client_id`, an unregistered `redirect_uri`, or a wrong `client_secret`). |
| 400    | `invalid_scope`             | A requested scope isn't configured in your app.                                                                                               |
| 400    | `unsupported_response_type` | The `response_type` isn't supported.                                                                                                          |
| 400    | `unsupported_grant_type`    | The `grant_type` isn't `authorization_code`.                                                                                                  |
| 401    | `invalid_grant`             | The authorization code is invalid or expired, or the `client_id` or `redirect_uri` doesn't match the authorization request.                   |
| 403    | `access_denied`             | The user denied the request, or API access is disabled for the user.                                                                          |
| 500    | `server_error`              | An unexpected server error.                                                                                                                   |

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
