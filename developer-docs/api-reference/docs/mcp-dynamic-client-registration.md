---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Make your MCP integration publicly available

Register your MCP integration with monday.com and authenticate publicly available clients with OAuth 2.0 dynamic client registration (DCR)

A personal API token or an OAuth app is enough for personal use, internal tools, and testing. To distribute your MCP integration publicly — as a product feature, marketplace listing, or partner integration available to monday.com users — you must register it with monday.com and authenticate through dynamic client registration (DCR).

<Callout icon="🚧" theme="warn">
  **Registration is required for public availability.** Skip this guide if you're only building for yourself or your organization — use an [API token](https://developer.monday.com/api-reference/docs/mcp-api-token) or [your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app) instead.
</Callout>

# Step 1: Register your integration

Submit your integration for review using the **[MCP integration registration form](https://forms.monday.com/forms/c2aedf208f6c156932392e3a786d4d41?r=use1)**. You'll be asked to provide details about your company, your integration, and how it uses the monday MCP server.

Once approved, your integration can be made available to monday.com users, and may be featured in the [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) list.

# Step 2: Authenticate with dynamic client registration (DCR)

Publicly available MCP clients don't use a pre-created monday.com app. Instead, they authenticate through **[OAuth 2.0 Dynamic Client Registration](https://datatracker.ietf.org/doc/html/rfc7591)**, as defined by the [MCP authorization specification](https://modelcontextprotocol.io/specification/latest/basic/authorization): the client registers itself with the MCP server's registration endpoint, then runs the standard authorization code + PKCE flow.

The server publishes its OAuth metadata through standard discovery documents, so MCP-compliant clients handle registration and authorization automatically:

| Endpoint                      | URL                                                             |
| :---------------------------- | :-------------------------------------------------------------- |
| Protected resource metadata   | `https://mcp.monday.com/.well-known/oauth-protected-resource`   |
| Authorization server metadata | `https://mcp.monday.com/.well-known/oauth-authorization-server` |
| Client registration           | `https://mcp.monday.com/register`                               |
| Authorization                 | `https://mcp.monday.com/authorize`                              |
| Token                         | `https://mcp.monday.com/token`                                  |

If you're building on an MCP SDK or framework that follows the MCP authorization specification, no additional OAuth setup is required — point your client at `https://mcp.monday.com/mcp` and the discovery, registration, and authorization flow happens automatically.

# Step 3: User authorization (OAuth consent)

When a user connects your MCP client to monday.com, your client opens the monday.com OAuth authorization screen. The user reviews the connection and clicks **Authorize** to grant access.

The consent screen shows your client name, a short description of the connection, and that the client inherits the user's existing monday.com permissions.

<Image src="https://files.readme.io/6e6bb391957dd5be65f1a7c8be08de35536b702c283074295eb543970a2de469-image.png" border={true} />

After the user authorizes:

1. monday.com redirects back to your client with an authorization code
2. Your client exchanges the code for an access token (and refresh token, if issued) via the token endpoint
3. Your client includes the access token in the `Authorization` header of subsequent MCP requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

All MCP tool calls then run as that user, scoped to their monday.com permissions and any MCP access limits set by the account admin — for example, restricting MCP to specific workspaces only.

***

**Related resources:**

* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Authenticate with an API token](https://developer.monday.com/api-reference/docs/mcp-api-token)
* [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
* [OAuth documentation](https://developer.monday.com/apps/docs/oauth)
