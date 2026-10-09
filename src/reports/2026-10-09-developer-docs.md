---
title: "New docs page covers admin-approved dynamic connectors for the monday MCP server"
date: 2026-10-09
topic: developer-docs
lede: "monday.com added a developer docs page on dynamic connectors, which let an account admin approve additional MCP connections and their redirect URIs beyond the pre-approved third-party agents. Related MCP pages were updated to point to it."
---

The new [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors) page is linked from the MCP overview, API token, OAuth app and security pages. Its contents were not available for this report.

The guides for [controlling MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app), [Claude custom apps](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app) and [Copilot Studio custom apps](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app) changed their guidance. They previously said publicly available integrations should use dynamic client registration. They now say to use it to let other monday.com accounts connect your client, with the customer's admin approving the additional connection and its redirect URIs through dynamic connectors.

The [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview) has a new section on account approval. Approval allows a connection for the account but does not grant a user access to the hosted MCP server or expand their monday.com permissions. During early access, revoking an approval takes effect at the next token refresh, and an existing access token can keep working for up to 24 hours. The page also tells admins to review connections under **monday administration → Connectors → Dynamic Connectors**.

The [dynamic client registration](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration), [integrate with MCP](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp) and [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) pages also changed, but details were not available.
