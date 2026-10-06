---
updatedAt: 2026-04-20T12:03:51.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Authorization URL migration guide

As part of the [migration](https://developer.monday.com/apps/docs/automation-features-migration-overview) to monday workflows, the [Authorization URL](https://developer.monday.com/apps/docs/authorization-url) feature is not supported and must be replaced with the [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials) app feature or built-in authentication mechanisms.

Credentials provide:

* Secure credential storage managed by monday.com
* A consistent user experience
* Support across multiple products (Automation Builder, Workflow Builder, AI Sidekick)
* Built-in credential management (list, create, delete)

# Migration checklist

* Identify which authentication pattern your app uses
* Select the appropriate migration path
* Create a new Credentials feature (if required)
* Update your block implementations to use the new authentication method
* Test the authentication flow end-to-end

<Callout icon="🚧" theme="warn">
  The migration wizard does not migrate Authorization URL usage automatically. You must manually complete the steps for one of these paths below.
</Callout>

# Migration paths

## Path 1: monday.com API authentication

### Use case

You used the Authorization URL to authenticate requests to monday.com's GraphQL API.

### Migration approach

Use the `shortLivedToken` included in the JWT [`Authorization` header](https://developer.monday.com/apps/docs/authorization-header) sent to your block endpoints. No Credentials feature or user connection flow is required. The token automatically carries the [OAuth permission scopes](https://developer.monday.com/apps/docs/oauth#permission-scopes) approved for your app, so no separate OAuth implementation is needed to access monday.com's API.

<Callout icon="💡" theme="default">
  ### Notes

  * The `shortLivedToken` is valid for 5 minutes
  * It is included automatically in every block request
  * It contains the permissions granted in your app's [OAuth permission scopes](https://developer.monday.com/apps/docs/oauth#permission-scopes) - no separate OAuth flow or Credentials feature is required for monday.com API access
</Callout>

### How it works

* monday.com sends requests to your block endpoints with an [`Authorization` header](https://developer.monday.com/apps/docs/authorization-header)
* Verify and decode the JWT using your app's *Signing Secret*
* Extract the `shortLivedToken` from the JWT payload
* Use the token to authenticate API calls to monday.com

### JWT payload structure

```json
{
  "accountId": 1825529,
  "userId": 4012689,
  "aud": "https://www.yourserver.com/endpoint",
  "exp": 1606808758,
  "shortLivedToken": "eyJhbGciOiJIUzI1NiJ9...",
  "iat": 1606808458
}
```

### Example

```javascript
import jwt from 'jsonwebtoken';

router.post('/your-block-endpoint', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const payload = jwt.verify(token, process.env.MONDAY_SIGNING_SECRET);

  const mondayToken = payload.shortLivedToken;

  const response = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      Authorization: mondayToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'query { me { id name } }'
    })
  });

  // ...handle response
});

```

## Path 2: OAuth with third-party services

### Use case

You used the Authorization URL to perform OAuth authentication with external services (e.g., Google, Slack, Salesforce).

### Migration approach

Use a [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials) app feature configured with OAuth. monday.com handles the OAuth flow and securely stores credentials.

1. Create a credentials app feature.
2. Select **OAuth** as the authentication type.
3. Configure the OAuth settings:
   * Client ID
   * Client Secret
   * Authorization URL (third-party service)
   * Token URL
   * Scopes
   * Redirect URI handling
4. Add the credentials field to your block's configuration
5. Access the OAuth token at runtime.

### Runtime example

```json
{
  "payload": {
    "credentialsValues": {
      "credentials-key": {
        "userCredentialsId": 1231,
        "accessToken": "..." // Used to make API calls to the third-party service
      }
    }
  }
}
```

## Path 3: API key authentication

### Use case

You used the Authorization URL to collect API keys for third-party services.

### Migration approach

1. Create a new [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials) app feature.
2. Select **API Key** as the authentication type.
3. Add the credentials feature to your blocks.
4. Receive credential values at runtime.

## Path 4: Custom or manual authentication

### Use case

You implemented custom authentication logic that does not fit OAuth or API key patterns.

<Callout icon="🚧" theme="warn">
  Custom credentials cannot be created directly through the Developer Center UI. The custom credentials type is only available as a result of migrating an _Integration for sentence builder_ that has a credentials field type. If you try to add a credentials feature manually, the "custom" option will not appear.
</Callout>

### Prerequisites

Before following this path, ensure your app has an existing *Integration for sentence builder* feature with a credentials field type. Run the [migration wizard](https://developer.monday.com/apps/docs/automation-features-migration-guide) to convert it. After migration, your app will have a Credentials feature with the custom type.

### Migration approach

Use the migrated [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials) app feature with custom field configuration. This approach is intended for advanced use cases that cannot be modeled using OAuth or API key authentication.

1. Migrate your existing *Integration for sentence builder* feature using the [migration wizard](https://developer.monday.com/apps/docs/automation-features-migration-guide). This creates a Credentials feature with the custom type.
2. Configure custom fields for user input.

| URL                    | Purpose                              |
| :--------------------- | :----------------------------------- |
| Credentials URL        | Return the list of saved credentials |
| Authorization URL      | Handle new credential creation       |
| Delete Credentials URL | Remove a credential                  |

<br />
