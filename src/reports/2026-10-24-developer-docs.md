---
title: "MCP dynamic connectors: admins now get email for new connector requests"
date: 2026-10-24
topic: developer-docs
lede: "The docs for MCP dynamic connectors now say account admins receive an email notification for new connector requests. Earlier text said no emails were sent during early access and admins had to check the administration page manually."
---

The change affects anyone building an MCP client that relies on admin approval of additional connections. Admins no longer need to poll **monday administration → Connectors → Dynamic Connectors → Pending requests** to notice a new request, according to the updated page.

The early-access warning remains for revocation: existing access tokens may keep working for up to 24 hours after an admin revokes approval. The page also drops its separate section on manual checking of requests.

See [MCP dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors).
