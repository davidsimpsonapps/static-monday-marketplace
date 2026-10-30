---
title: "monday.com adds guide for connecting to Platform Agent over A2A protocol"
date: 2026-10-30
topic: developer-docs
lede: "monday.com's developer docs now include a guide to connecting to the Platform Agent over the Agent2Agent (A2A) protocol, using OAuth 2.1 with PKCE and JSON-RPC messages."
---

The new page, [Connect to the Platform Agent over A2A](https://developer.monday.com/api-reference/docs/connect-to-the-platform-agent-over-a2a), lets an A2A-compatible client or agent delegate tasks to the Platform Agent in natural language instead of calling individual tools. It publishes an agent card URL and a JSON-RPC endpoint at `https://api.monday.com/platform-ai-gateway/a2a/platform-agent/jsonrpc`.

Setup requires a monday.com app with the new OAuth flow (OAuth 2.1) enabled, a redirect URL and the scopes the use case needs. Access tokens expire after 24 hours. Each refresh returns a new refresh token and invalidates the previous one, so the latest must always be stored. Messages are sent with the `SendMessage` method, with the access token in the `Authorization` header.

The agent acts for the authenticated user and is limited by the requested OAuth scopes and that user's permissions. The pages [Build on monday with AI](https://developer.monday.com/api-reference/docs/build-on-monday-with-ai) and [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) now link to the guide.
