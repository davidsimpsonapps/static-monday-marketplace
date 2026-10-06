---
updatedAt: 2025-10-23T05:08:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Authorization header

Incoming requests to your integration app include the `Authorization` header that contains a JWT token signed by your app’s *Signing Secret*. This token verifies the legitimacy of the request from monday.com.

# Verifying the JWT

To confirm the token's authenticity, you need to verify that it is signed with your app's *Signing Secret*. You can do this through various third-party libraries—check out the full list of supported libraries [here](https://jwt.io/libraries).

When verifying the JWT, be sure to:

* Check that the `aud` field matches your integration app’s endpoint.
* Verify the `exp` field to ensure the token hasn’t expired.

# JWT contents

The JWT contains metadata that your app can use to verify the request and identify the context. The contents of the token are in the following format:

```javascript
{
  "accountId": 1825529, // the ID of the account initiating the request
  "userId": 4012689, // the ID of the user triggering the action
  "aud": "https://www.yourserver.com/endpoint", // the app's endpoint URL
  "exp": 1606808758, // expiration timestamp of the JWT
  "shortLivedToken": "SHORT_LIVED_TOKEN_HERE", // the short-lived token to authenticate against the monday API
  "iat": 1606808458 // issued-at timestamp of the JWT
}
```

By verifying these fields, you can ensure that the request is coming from monday.com and that the token is valid.
