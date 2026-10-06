---
updatedAt: 2026-09-06T08:31:25.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Authentication

Learn about monday platform API token permissions, how to access tokens, and how to authenticate requests

The monday.com platform API utilizes **personal V2 API tokens** to authenticate requests and identify the user making the call. These tokens are unique to each user and have no explicit length.

Personal tokens allow you to interact with the API using your own user account. Their permissions mirror what you can do in the monday.com UI, ensuring that API access is consistent with your platform-level permissions.

If you don't have a monday.com account yet, create a free [developer account](https://developer.monday.com/api-reference/docs/developer-sandbox-account) to get an API token and start testing.

# Token permissions

Personal tokens mirror all permission levels set in the monday.com UI, including [board](https://support.monday.com/hc/en-us/articles/115005315809-Board-permissions), [column](https://support.monday.com/hc/en-us/articles/360011926640-Column-permissions), [item](https://support.monday.com/hc/en-us/articles/360021172320-Item-viewing-permissions-), or [account](https://support.monday.com/hc/en-us/articles/360003457320-Account-permissions) access.

> For example: If you don't have permission to access a certain workspace via the UI, you won't have permission using your personal API token either.

App tokens have an additional [set of permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) that specify which queries and mutations it can access, while personal tokens have all permission scopes.

# Accessing your token

You can access your API token in two ways, depending on your [user type](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained).

## In the Developer Center (all users)

All [users with API access](https://developer.monday.com/api-reference/docs/basics#who-can-use-the-api) can follow these steps to access their API token:

1. In your monday.com account, click on your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in another tab.
3. Click **API token** > **Show**.
4. Copy your personal token.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/d8a190b958dd51496ca9b1b92de1b660e9ccba227534c642552994b5b3874880-API_Token_in_Developer_Center.png" />

## In the Administration tab (account admins only)

Account admins can use the *Developer Center* steps above or access their token via the *Administration* tab:

1. In your monday.com account, click on your profile picture in the top right corner.
2. Select **Administration** > **Connections** > **Personal API token**.
3. Copy your personal token.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/b8eef71025582992cbb2ab39e60a484431e303a7e409f974979468a6fa4596bc-API_Token_-_Admin.png" />

# Making requests with your token

Once you have your token, you can make requests with the API by passing the token in the `Authorization` header.

```curl cURL
curl -X POST https://api.monday.com/v2 \
  -H "Authorization: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"query": "query { me { id name } }"}'
```

# Regenerating a token

API tokens can be regenerated at any time. However, this will immediately invalidate your current token, so be sure to update any integrations using it.

## How to regenerate a token

### In the Developer Center

1. In your monday.com account, click on your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in another tab.
3. Click **API token** > **Regenerate**.

### In the Administration tab

1. In your monday.com account, click on your profile picture in the top right corner.
2. Select **Administration** > **Connections** > **Personal API token**.
3. Click **Regenerate**.
