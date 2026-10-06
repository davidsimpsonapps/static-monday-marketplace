---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Authenticate with an API token

Connect to the monday.com hosted MCP server with a personal API token for personal use, prototyping, and testing

If you're using one of the [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients), you don't need a token — add the server URL and authenticate via OAuth when prompted. Use a personal API token when your client **isn't** a compatible MCP client or doesn't support the MCP OAuth flow — for example, custom scripts, homegrown agents, or tools that only support static Bearer tokens.

For personal use, prototyping, and testing, this is the fastest way to connect. No app or registration is needed.

# Get your token

1. Log in to your monday.com account
2. Click your profile picture in the top-right corner and select **Developers**
3. Click **My access tokens** in the left menu
4. Copy your personal access token

# Configure your MCP client

Pass the token as a Bearer token in the `Authorization` header of your MCP requests:

```
Authorization: Bearer YOUR_API_TOKEN
```

For MCP clients that support custom headers, the configuration looks like this:

```json
{
  "mcpServers": {
    "monday-mcp": {
      "url": "https://mcp.monday.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_TOKEN"
      }
    }
  }
}
```

Personal tokens mirror your UI permissions, so the MCP server can access everything your user can — and nothing more. This is ideal for individual development, but not for integrations used by other people.

<Callout icon="⚠️" theme="warn">
  ### Warning

  Never share your API token or commit it to version control. Rotate tokens regularly, and revoke them when they're no longer needed.
</Callout>

***

**Related resources:**

* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)
* [Make your integration publicly available (DCR)](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration)
* [Authentication](https://developer.monday.com/api-reference/docs/authentication)
