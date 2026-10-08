---
title: "MCP custom apps now require the \"New OAuth flow\" toggle; developer sandbox page renamed"
date: 2026-10-08
topic: developer-docs
lede: "Docs for connecting custom apps to monday MCP now state that **New OAuth flow** must be switched on, or the app cannot authenticate. The developer account page also moved to a new URL, and `aggregate` gained a `DATA_VIEW` source type."
---

### MCP: New OAuth flow must be on

The [MCP integration guide](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp) adds a troubleshooting step: confirm **New OAuth flow** is on under **Build → OAuth & Permissions → New OAuth flow**. A custom app cannot connect to MCP while the toggle is off.

The [Claude custom app guide](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app) and the [Copilot Studio custom app guide](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app) now include enabling the toggle as a setup step, with a warning callout.

### Aggregation source type

In [aggregate other types](https://developer.monday.com/api-reference/reference/aggregate-other-types), the `type` field of the source input (`AggregateFromElementType`) now lists `DATA_VIEW` alongside `TABLE`. It applies to version `2027-01` and later.

### New and moved pages

The developer account page was renamed to [Developer Sandbox Account](https://developer.monday.com/api-reference/docs/developer-sandbox). Its URL changed from `developer-sandbox-account` to `developer-sandbox`, and links across the docs were updated.

A new page, [agent API key capabilities](https://developer.monday.com/api-reference/docs/agent-api-key-capabilities), was added. The [OAuth app MCP access page](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app) was also changed, but details were not available.
