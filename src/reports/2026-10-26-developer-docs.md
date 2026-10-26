---
title: "monday MCP adds enterprise managed auth for Claude with Okta"
date: 2026-10-26
topic: developer-docs
lede: "monday MCP now supports enterprise managed auth (EMA), letting an organization connect an AI client once through its identity provider with no per-user consent screen. Currently only Claude with Okta is supported."
---

The new [Enterprise managed auth](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth) page describes the flow: the client asks the identity provider for a signed assertion, and monday.com exchanges it for an access token for the same member. Tool calls run with the member's existing permissions.

Requirements include an Enterprise plan account with active SAML SSO, and members who are active (not viewers) and have signed in through SSO at least once. Assertions are accepted only from the IdP app that runs the account's SSO. Access tokens last 24 hours and no refresh token is issued. EMA grants the full monday.com scope set; a partial scope selection is rejected. The authorization server issuer is `https://auth.monday.com/mcp` and the resource is `https://mcp.monday.com/mcp`.

A second new page, [Set up enterprise managed auth with Okta](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-okta), covers configuring Okta Cross App Access for the monday.com app and registering the AI client as an AI agent.

The [Integrate with monday MCP](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp) page now lists EMA as an authentication option for org-wide access.
