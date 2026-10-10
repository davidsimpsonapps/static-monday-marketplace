---
title: "MCP docs add dynamic connectors and admin approval for additional connections"
date: 2026-10-10
topic: developer-docs
lede: "monday.com added a docs page on dynamic connectors, which let an account admin approve additional MCP connections and their redirect URIs. The dynamic client registration (DCR) guide was rewritten, and the registration form step was removed."
---

The new [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors) page is linked from the other MCP guides. Its content was not available in the crawl.

The [dynamic client registration guide](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration) now says any developer can use DCR to let other monday.com accounts connect their MCP client. The earlier "Step 1: Register your integration" form submission no longer appears, and the guide now starts with authentication via DCR. Customers' admins approve the connection and its redirect URIs before it is created. The hosted MCP permission enables a separate set of pre-approved third-party agents, including Claude, ChatGPT and the other compatible MCP clients, which use the standard authorization screen.

The guides for [your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app), [Claude](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app) and [Copilot Studio](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app) no longer say that publicly available integrations should use DCR. They now point to DCR and dynamic connectors for letting other accounts connect.

The [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview) adds that approval allows a connection for the account but does not grant hosted MCP access or expand user permissions. During early access, revoking an approval takes effect at the next token refresh, and an existing access token can keep working for up to 24 hours. Admins review connections under **monday administration → Connectors → Dynamic Connectors**.

The [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) and [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp) pages also changed, but the details were not available. The [API token](https://developer.monday.com/api-reference/docs/mcp-api-token) and [monday MCP overview](https://developer.monday.com/api-reference/docs/mondaycom-mcp) pages gained links to dynamic connectors.
