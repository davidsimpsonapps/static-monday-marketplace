---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Integrate with the monday MCP server

Connect your MCP client to the monday.com hosted MCP server — choose API token, OAuth, or dynamic client registration

This guide walks you through connecting your own MCP client — an AI assistant, agent platform, or product feature — to the monday.com hosted MCP server. Pick an authentication path below, then follow the linked guide for setup details.

# Overview

The hosted MCP server is the recommended way to connect to monday.com. It requires no local setup, updates automatically, and handles all the infrastructure for you.

* **Server URL:** `https://mcp.monday.com/mcp`
* **Transport:** Streamable HTTP
* **Auth:** OAuth 2.0 or Bearer token with a [personal API token](https://developer.monday.com/api-reference/docs/authentication)

<Callout icon="🚧" theme="warn">
  **SSE transport is deprecated and not supported.** Older guides and configs may still reference `https://mcp.monday.com/sse` or an SSE-based transport. The hosted Platform MCP supports **Streamable HTTP only** at `https://mcp.monday.com/mcp`. Update any client that still points at `/sse` — SSE will not be brought back.
</Callout>

<Callout icon="📘" theme="info">
  **The monday MCP server is a wrapper around the monday.com platform API.** Every tool call executes in the context of the authenticated user and respects that user's monday.com permissions. See the [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview) for the full security architecture.
</Callout>

# Choosing an authentication path

How you authenticate depends on what you're building:

| Use case                                                                                             | Guide                                                                                 | Registration required               |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :---------------------------------- |
| Personal use and testing                                                                             | [Authenticate with an API token](https://developer.monday.com/api-reference/docs/mcp-api-token)                                   | No                                  |
| Private / org-controlled access (who connects, which client, and **which scopes** limit MCP actions) | [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)   | No                                  |
| **Publicly available integration**                                                                   | [Make your integration publicly available (DCR)](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration) | **Yes — register your integration** |

***

# Advanced configuration

## Specifying an API version

The MCP server executes tool calls against the monday.com GraphQL API. You can pin a specific [API version](https://developer.monday.com/api-reference/docs/api-versioning) using the `Api-Version` header:

```json
{
  "mcpServers": {
    "monday-mcp": {
      "url": "https://mcp.monday.com/mcp",
      "headers": {
        "Api-Version": "2026-07"
      }
    }
  }
}
```

## Available tools

The monday MCP server exposes more than 60 tools for reading and writing monday.com data. To view all available tools and their current parameters, use the `tools/list` MCP command, or browse the [Platform MCP tools reference](https://developer.monday.com/api-reference/docs/platform-mcp-tools).

The tool set may evolve over time — tools may be added, updated, or deprecated. Use `tools/list` to ensure your client always has the most up-to-date schemas.

## Rate limits

MCP tool calls consume from your account's [daily API call limit](https://developer.monday.com/api-reference/docs/rate-limits), just like direct API requests. Keep this in mind for agent-driven workflows that may issue many calls.

***

# Security and permissions

* **User-scoped access:** All actions taken over MCP appear as the user who authorized them. Access is determined by the authenticated user's monday.com permissions — users can only reach workspaces, boards, and items they already have access to.
* **Token security:** Store client secrets and all tokens securely (never commit them to version control), use HTTPS for all requests, implement proper token refresh logic, and revoke tokens when they're no longer needed.
* **No token storage:** The MCP server does not store or log customer OAuth tokens. Token lifecycle management (storage, rotation, revocation) is your responsibility.

For the full security architecture — tenant isolation, AI-layer risks, and OWASP MCP Top 10 alignment — see the [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview).

***

# Common issues

**Authentication failures**

1. Verify your redirect URL matches exactly in both your app settings and authorization request
2. Ensure your client ID and client secret are correct
3. Check that the requested scopes are enabled on your app's **OAuth & Permissions** page

**Connection issues**

1. Verify the MCP server URL is `https://mcp.monday.com/mcp` (not `https://mcp.monday.com/sse` — SSE is deprecated and unsupported)
2. Check that you're including a valid access token or API token in the `Authorization` header
3. Verify the access token hasn't expired
4. If your client config uses `mcp-remote` with an `/sse` URL, replace it with a direct Streamable HTTP config pointing at `https://mcp.monday.com/mcp`

***

**Related resources:**

* [Authenticate with an API token](https://developer.monday.com/api-reference/docs/mcp-api-token)
* [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)
* [Make your integration publicly available (DCR)](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [Platform MCP tools reference](https://developer.monday.com/api-reference/docs/platform-mcp-tools)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
* [OAuth documentation](https://developer.monday.com/apps/docs/oauth)
