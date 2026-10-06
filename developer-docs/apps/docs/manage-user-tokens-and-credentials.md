---
updatedAt: 2026-03-13T16:44:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Manage user tokens and credentials

Using the **credentials** app feature, you can effortlessly connect to third-party services—minimal coding required!

Whether you're building blocks for monday workflows or integrating external APIs, this feature makes secure, scalable integrations easier than ever. The framework handles authentication flows and credential storage, so you can focus on building flexible, user‑friendly solutions.

# Concepts

The credentials app feature enables secure authentication between monday apps and third-party services, such as Google, Dropbox, or Slack, within **monday workflows**.

It supports both OAuth 2.0 and API Token authentication flows, making it easy to integrate services regardless of the authentication method they support.

Once authenticated, user-specific credentials are securely stored and scoped to the app. These credentials can then be reused across multiple workflow app features, including blocks and custom fields.

## Security

All credentials are handled with strict security controls:

* Secrets are stored in secure storage.
* Secrets are stored in the same region as the monday.com account region.

> 👍 Authentication types supported
>
> * **OAuth 2.0**: Handles redirect flows, token exchange, refresh tokens, and user consent.
> * **API Token:** Uses a static token for direct API access. Simple and fast to set up, but less secure.
>
> ✅ **Best practice:** Prefer OAuth whenever possible for stronger security and better token management.

# Implementation

Building a credentials app feature requires setting up both your monday app and the third‑party service you are integrating with. Since these two systems rely on coordination between your apps, some configurations will need to happen in parallel.

The steps below provide a high‑level overview of the process, with additional details available in the Reference section:

1. Start by creating an app for the third‑party service you want to integrate with. Follow the provided instructions to set up the required settings accurately.
2. Create an app or open an existing one in the monday.com Developer Center.
3. Add a *Credentials* app feature. Learn how to create a new app feature [here](https://developer.monday.com/apps/docs/create-an-app#add-app-features).

<Image align="center" alt="alt text" border={true} width="400px" src="https://files.readme.io/a4900c823a6d1c8e4c13ea79a12bd05510c11e31bac923ffef4d76782c37e66a-Screenshot_2025-05-20_at_4.30.10_PM.png" className="border" />

4. After creating your monday app feature, configure your monday app's settings for each of the sections below:

| Section       | Description                                                                                | Notes                                                                                                                                                             |
| :------------ | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic details | Enter a name, description, credential type (OAuth 2.0 or API Token), and default field key | This key will be automatically suggested as the default in the request payload whenever you use or select this credentials app feature within other app features. |

### If you selected OAuth

Continue configuring the following sections in your monday app:

| Section                            | Description                                                                                                                                                            | Notes                                                                                                                                                                                                                                                   |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parameters                         | Configure your [credential parameters](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#configure-credential-parameters) (optional)           | You can read more [here](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#/configure-credential-parameters).                                                                                                                   |
| OAuth 2.0 Redirect URL             | Paste this into your third‑party service app’s redirect settings                                                                                                       | You can read more [here](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#redirect-url).                                                                                                                                       |
| Enter your application credentials | Copy and paste the client ID and client secret from your third‑party service app; select if you want to include the client ID and secret in the request body or header | We recommend keeping the default (header), as most developers won’t need to change it unless a third party specifically requires it.                                                                                                                    |
| Configure OAuth endpoint           | Configure the authorization URL, scopes, access token request, and refresh token request from your third‑party service app                                             |                                                                                                                                                                                                                                                         |
| Extra details                      | Provide a URL to your own server to request a unique provider ID                                                                                                       | This endpoint should return a unique provider ID, enabling monday to identify users across different services uniquely. You can read more [here](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#provider-unique-identifier). |
| Retrieve params                    | Configure how to extract values from the access token and OAuth callback responses                                                                                     | These extracted parameters will be included in the request to your unique provider identifier endpoint.                                                                                                                                                 |

### If you selected API Token

The following fields will appear in the configuration panel:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Section
      </th>

      <th>
        Description
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Parameters
      </td>

      <td>
        Configure your API token credential parameters. The following parameters appear by default and are required:

        * API Token
        * API Token Label
      </td>

      <td>
        The API Token and API Token Label parameters can't be deleted, but they can partially be edited. Read more about configuring API Token parameters [here](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#/configure-api-token-parameters).

        You can read more about configuring additional parameters [here](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#/configure-credential-parameters).
      </td>
    </tr>
  </tbody>
</Table>

5. [Connect](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials#connect-credentials-app-feature-to-other-app-features) the credentials app feature to your block and custom field app features to use in the workflow builder.
6. Test your workflow blocks using these [steps](https://developer.monday.com/apps/docs/test-your-blocks-and-fields) (optional, but recommended).
7. Promote the [draft version to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live) to make the feature accessible in the platform.
8. After successful authentication, the credentials will be stored in monday.

# Reference

## Redirect URL

When configuring your external app, all third‑party services that support OAuth 2.0 will ask for a redirect URL where they will send users after they login.

You can access this in the Developer Center after creating your monday.com credentials app feature. Alternatively, you can use the following [OAuth Redirect URL](https://apps-credentials.monday.com/authorize/oauth2/redirect-uri): `https://apps-credentials.monday.com/authorize/oauth2/redirect-uri`

***

## Provider unique identifier

Some third‑party services use unique identifiers to recognize individual user connections.

> :point\_right: For example: In Gmail, the unique identifier is the user's email address.

Since there's no standard for exposing or retrieving the identifier across different services, you must provide a publicly accessible backend endpoint that we can call to retrieve it. This endpoint should verify the incoming request by checking the `Authorization` header against the application signing secret.

```typescript
// Example: Verify Authorization header using the jsonwebtoken package

const { authorization } = req.headers;

const signingSecret = process.env.MONDAY_SIGNING_SECRET;

await new Promise((resolve, reject) => {
   jwt.verify(authorization, signingSecret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
   });
});
```

After implementing your endpoint:

1. Navigate to the *Extra details* section of your credentials app feature.
2. Enter the URL of the endpoint used to retrieve the provider’s unique identifier — e.g., `https://your-server`

This refers to the request monday.com sends to your backend during the OAuth callback phase. After the OAuth flow is complete, we’ll call your provided endpoint to retrieve the provider’s unique identifier for the user's credentials.

We include the user's access token in this request, along with the following payload:

```json Header
{
  "token": "abcs1234"
}
```
```json Expected request payload to retrieve provider's unique identifier
{  
  "userId": 123, // The ID of the user initiating the request  
  "accountId": 456, // The ID of the account associated with the request  
  "appFeatureReferenceId": 789, // The reference ID of your app feature  
  "callbackRequestedParams": {...}, // Parameters extracted from the OAuth callback  
  "tokenRequestedParams": {...}, // Parameters extracted from the token response  
  "userCredentialsParams": {...} // Optional parameters provided by the user  
}
```

We automatically enrich the request with the user’s access token, using the key you provided under the `token` key.

<div style={{ backgroundColor: "#fff8e1", borderLeft: "4px solid #fbc02d", padding: "16px 24px", margin: "24px 0", fontSize: "16px", color: "#f9a825", lineHeight: "1.6" }}>
  🚧 To ensure secure token handling while still allowing you to complete one‑time, token‑authenticated requests, we have the following security measures:

  <ul style={{ marginTop: "10px", paddingLeft: "20px", color: "#333" }}>
    <li>You cannot initiate requests to retrieve this access token.</li>
    <li>You are not allowed to store the access token.</li>
    <li>If you attempt to store it, you will only have access to the raw token string — not identifying metadata or a refresh capability.</li>
    <li>The token cannot be renewed by your app.</li>
  </ul>
</div>

### Expected response

Your server should return the following format:

```json Sample response for provider unique identifier
{  
  "providerUniqueIdentifier": "test@monday.com", // a unique token-specific ID  
  "displayName": "Test Gmail" // the name displayed to the user in the UI  
}
```

***

## Configure credential parameters

Some third‑party services require user‑specific information (e.g., subdomain, region, organization ID) before initiating the authentication flow. Using credential parameters, you can collect this information and define extra input fields that appear when a user sets up the integration.

> :point\_right: For example: In Salesforce, we need to know the user's subdomain to be able to interact with the correct API.

### Supported types

Credential parameters support primitive data types: `string`, `boolean`, and `number`.

You can link a parameter to a field type that uses one of these primitive types. Parameters can also reference a primitive field type that includes static options.

### How to configure

1. You can configure credential parameters directly in the Developer Center under your *Credentials* app feature. When adding a parameter, be sure to include:

* **Name:** A short key used to reference the value in API calls
* **Title:** A user‑facing name that explains what the field is
* **Type:** Choose from `string`, `number`, or `boolean`
* **Required:** Mark whether the field is required

2. Once configured, these parameters can be referenced inside the other credential fields through a `{{parameterName}}` syntax.

```json Salesforce subdomain example
"authorizationUrl": {
  "type": "url",
  "value": "https://{{subdomain}}.salesforce.com/oauth2/authorize"
}
```

3. When the authorization flow is initiated, we replace the parameters with user‑provided input. That value is also available in the payload of your provider's unique identifier endpoint and other credential‑based requests (e.g., block execution URL, and remote options).

***

## Configure API token parameters

Some third-party services don’t support OAuth and instead require authentication using API tokens. Through API token parameters, you can define the input fields that appear when a user sets up the integration.

### How to configure

You can configure API token parameters directly in the Developer Center under your *Credentials* app feature.

These parameters appear automatically when you select API Token as the credentials type. Some fields are pre-defined and can't be modified, but you can configure the following settings to customize how the token behaves in your app:

* **Parameter Title:** The field title shown to users
* **Placeholder:** The text displayed inside the input field before the user enters a value
* **Static Suffix:** The optional text displayed after the input field
* **Description Text:** Brief additional context or guidance to help users understand what to enter
* **Link Text:** The label for an optional link (e.g., “Learn more”)
* **Link URL:** The destination URL opened when a user clicks the link text

These settings control how the API Token field appears in the monday.com UI when users connect your app.

***

## Connect credentials app feature to other app features

You have to connect the credentials app feature to use it in the workflow builder:

### Custom field for monday workflows

1. Open your custom field app feature and navigate to the **Credentials** section.
2. Click **Add credentials**.
3. Select the credential from the dropdown and assign a key\*.
4. Click **Add**.

> * :memo: Note: The key will be used in the payloads of requests made to your service (e.g., for remote options or sub‑fields). It will be accessible under the `credentialsValues` attribute.

### Integration for monday workflows

1. Open your block app feature and navigate to the **Credentials** section.
2. Click **Add credentials**.
3. Select the credential from the dropdown and add a title, header (optional), subheader, and key\*.
4. Click **Add**.

> * :memo: Note: The key will be used in the payloads of requests made to your service (e.g., for subscribe and unsubscribe or run execution). It will be accessible under the `credentialsValues` attribute.
