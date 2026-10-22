---
updatedAt: 2026-10-19T11:11:12.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Make your MCP integration publicly available

Let monday.com customers connect your MCP client with a Client ID Metadata Document or dynamic client registration. Admins approve additional connections.

A personal API token or an OAuth app is enough for personal use, internal tools, and testing. To let other monday.com accounts connect your MCP client — as a product feature, a custom integration, or a partner integration — register it with a Client ID Metadata Document (CIMD) or through dynamic client registration (DCR).

Any developer can use this path. Customers add your connection through [dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors): their account admin approves the connection and its redirect URIs before the connection is created.

The **hosted MCP permission** enables a separate set of pre-approved third-party agents, including Claude, ChatGPT, and the other [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients). Those agents use the standard authorization screen.

<Callout icon="🚧" theme="warn">
  **Building only for yourself or your organization?** Use an [API token](https://developer.monday.com/api-reference/docs/mcp-api-token) or [your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app). Those paths do not use dynamic connector approval.
</Callout>

# Step 1: Register your client

Publicly available MCP clients don't use a pre-created monday.com app. The [MCP authorization specification](https://modelcontextprotocol.io/specification/latest/basic/authorization) defines two ways for a client to identify itself, and monday.com supports both. After registration, the client runs the standard authorization code + PKCE flow.

## Option A: Client ID Metadata Document (CIMD) (recommended)

monday.com supports [Client ID Metadata Documents](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents) as defined in the MCP authorization specification, which recommends them over DCR. Your `client_id` is the HTTPS URL of a metadata document you host, so there is no registration call. monday.com advertises support with `client_id_metadata_document_supported: true` in its authorization server metadata.

monday.com accepts only public clients: the document must support the `none` token endpoint auth method (in `token_endpoint_auth_methods_supported` if the document lists it) and contain no secret, and the client must use PKCE with `S256`. The `client_id` URL must use the default HTTPS port and have no query string.

## Option B: Dynamic client registration (DCR)

With **[OAuth 2.0 Dynamic Client Registration](https://datatracker.ietf.org/doc/html/rfc7591)**, the client registers itself with the MCP server's registration endpoint and receives a `client_id`.

## Discovery

The server publishes its OAuth metadata through standard discovery documents, so MCP-compliant clients handle registration and authorization automatically:

| Endpoint                      | URL                                                             |
| :---------------------------- | :-------------------------------------------------------------- |
| Protected resource metadata   | `https://mcp.monday.com/.well-known/oauth-protected-resource`   |
| Authorization server metadata | `https://mcp.monday.com/.well-known/oauth-authorization-server` |
| Client registration (DCR)     | `https://mcp.monday.com/register`                               |
| Authorization                 | `https://mcp.monday.com/authorize`                              |
| Token                         | `https://mcp.monday.com/token`                                  |

If you're building on an MCP SDK or framework that follows the MCP authorization specification, no additional OAuth setup is required — point your client at `https://mcp.monday.com/mcp` and the discovery, registration, and authorization flow happens automatically.

# Step 2: User authorization (OAuth consent)

When a user connects your MCP client to monday.com, your client opens the monday.com OAuth authorization screen.

Whether you use CIMD or DCR, for an additional connection the screen shows **Admin approval required** instead of completing the connection. The user requests approval, and an account admin approves the connector and its redirect URIs for that account. Nothing is connected while the request is pending. After approval, the user starts the connection again and selects **Authorize**. Follow [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors) for the approval steps, admin review, and early-access limitations.

When the user is connecting a pre-approved third-party agent, or an admin has already approved the connector, the user reviews the connection and clicks **Authorize** to grant access.

The consent screen shows your client name, a short description of the connection, and that the client inherits the user's existing monday.com permissions.

<Image src="https://files.readme.io/6e6bb391957dd5be65f1a7c8be08de35536b702c283074295eb543970a2de469-image.png" border={true} />

After the user authorizes:

1. monday.com redirects back to your client with an authorization code
2. Your client exchanges the code for an access token (and refresh token, if issued) via the token endpoint
3. Your client includes the access token in the `Authorization` header of subsequent MCP requests:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

All MCP tool calls then run as that user, scoped to their monday.com permissions and any MCP access limits set by the account admin — for example, restricting MCP to specific workspaces only.

***

**Related resources:**

* [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Authenticate with an API token](https://developer.monday.com/api-reference/docs/mcp-api-token)
* [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
* [OAuth documentation](https://developer.monday.com/apps/docs/oauth)
