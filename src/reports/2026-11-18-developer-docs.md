---
title: "New guide covers enterprise-managed authorization for Claude with monday MCP"
date: 2026-11-18
topic: developer-docs
lede: "monday.com added a developer guide for enterprise-managed authorization for Claude, a beta setup that lets members of a Claude organization use the monday MCP connector without signing in or approving access individually."
---

The [guide](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-claude) says an admin connects a Claude organization to monday.com once, using an Issuer URL from Claude. monday.com trusts that URL only for the account that registered it and matches each member by email. Tool calls run with the member's existing monday.com permissions.

Requirements include an Enterprise plan on monday.com, an account admin or a custom role with the **Access the Security section** permission, and a claimed and verified email domain. In Claude, the organization must be on the Team or Enterprise plan, must not sign in to Claude through Okta, and the setup must be done by an Owner or Primary Owner. The connector URL is `https://mcp.monday.com/mcp`.

Organizations that use Okta should follow the Okta guide instead. Each connector uses one identity source at a time.
