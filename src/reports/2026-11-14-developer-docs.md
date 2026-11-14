---
title: "monday MCP enterprise managed auth adds Claude-issued assertions in beta"
date: 2026-11-14
topic: developer-docs
lede: "The enterprise managed auth (EMA) page for monday MCP now lists a Claude-issued identity source in beta alongside Okta. It needs no identity provider or SSO."
---

With the Claude-issued option, the identity assertion is signed by Claude under an Issuer URL unique to your Claude organization. An account admin registers that Issuer URL in **Administration** > **Connections** > **Dynamic connectors** > **Advanced**.

The page now has a "Choose your setup" section comparing the two identity sources. Both support Claude as the AI client. A new guide covers the Claude-issued setup: Set up enterprise-managed authorization for Claude. The Okta guide remains available.

The overview also now says members see no sign-in or consent screen, and that the client presents a signed assertion rather than asking the identity provider for one. Other identity providers and AI clients are still not supported. See the [full page](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth).
