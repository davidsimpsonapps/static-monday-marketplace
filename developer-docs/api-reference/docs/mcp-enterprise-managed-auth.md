---
updatedAt: 2026-10-21T07:23:08.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Enterprise managed auth

Let your organization connect an AI client to monday MCP once, through your identity provider, with no per-user OAuth consent.

monday MCP supports enterprise managed auth (EMA), the [Enterprise-Managed Authorization](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization) extension of the MCP specification. With EMA, your organization connects an AI client to monday MCP once, for everyone, and members don't see a monday.com consent screen. When the client needs monday.com, it asks your identity provider (IdP) for a signed identity assertion for the signed-in member. monday.com exchanges that assertion for an access token for the same member.

EMA changes how a connection is approved, not what it can do. Every tool call runs as the member, with their existing monday.com permissions.

# Supported setups

| Identity provider | AI clients | Setup guide                                                                      |
| :---------------- | :--------- | :------------------------------------------------------------------------------- |
| Okta              | Claude     | [Set up enterprise managed auth with Okta](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-okta) |

Other identity providers and AI clients aren't supported yet.

***

# How monday.com trusts an assertion

There is nothing to turn on in monday.com. monday.com accepts an assertion only when it comes from the IdP app that already runs your account's single sign-on (SSO), and only for a member that SSO has linked to that IdP user. An assertion from any other IdP org or app is rejected.

# Requirements

* **Plan and SSO:** an Enterprise plan account that signs in with [SAML single sign-on](https://support.monday.com/hc/en-us/articles/360000460605-SAML-Single-Sign-on-SSO-) through a supported IdP, with the SSO connection active.
* **Members:** each member is an active monday.com member or admin (not a viewer), has accepted their invitation, and has signed in to monday.com through SSO at least once. The first SSO sign-in links the member's monday.com user to their IdP user. Members created through SCIM are linked only after their first SSO sign-in.
* **AI client:** a client that supports EMA with your IdP. See [Supported setups](#supported-setups).

# Values for your setup

Every IdP and AI client setup uses these values:

| Setting                                          | Value                                                                                                         |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Authorization server issuer (assertion audience) | `https://auth.monday.com/mcp`                                                                                 |
| Resource (MCP server)                            | `https://mcp.monday.com/mcp`                                                                                  |
| Scopes                                           | All monday.com scopes, or none. EMA grants the full monday.com scope set, so a partial selection is rejected. |
| Access token lifetime                            | 24 hours. No refresh token is issued; the client gets a new assertion from your IdP instead.                  |

***

# Turn it off

* **For everyone:** turn off EMA for the monday.com connector in your AI client, or remove the connection between the AI client and monday.com in your IdP.
* **For one member:** unassign the member from the monday.com app or the AI client in your IdP.

These changes stop new connections within a few minutes. An access token that monday.com already issued stays valid until it expires, up to 24 hours.

***

# Troubleshooting

When monday.com rejects a connection, the error description usually says what to fix. These need more context:

| Error description                                                                 | What to do                                                                                                                                                                                                                                               |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `The assertion is invalid`                                                        | Check your IdP configuration against the [values for your setup](#values-for-your-setup), especially the issuer, audience, client ID, and resource. Some IdP setups also report account and member problems with this error. See your IdP's setup guide. |
| `No monday user with this email is in an account that uses this Okta app for SSO` | Check that the member's email is the same in monday.com and your IdP, and that your account's active SSO connection runs through the IdP app you connected to the AI client.                                                                             |
| `The user is in more than one monday account that uses this Okta app for SSO`     | Contact monday.com support.                                                                                                                                                                                                                              |

***

**Related resources:**

* [Set up enterprise managed auth with Okta](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-okta)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
