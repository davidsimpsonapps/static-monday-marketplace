---
updatedAt: 2026-11-10T12:44:53.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Enterprise managed auth

Let your organization connect an AI client to monday MCP once, for everyone, with no per-user sign-in or consent.

monday MCP supports enterprise managed auth (EMA), the [Enterprise-Managed Authorization](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization) extension of the MCP specification. With EMA, your organization connects an AI client to monday MCP once, for everyone, and members don't see a monday.com sign-in or consent screen. When the client needs monday.com, it presents a signed identity assertion for the signed-in member. monday.com exchanges that assertion for an access token for the same member.

EMA changes how a connection is approved, not what it can do. Every tool call runs as the member, with their existing monday.com permissions.

# Choose your setup

The assertion is signed by one of two identity sources:

| Identity source      | Signed by                                                                                           | AI clients | Setup guide                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------- |
| Claude-issued (beta) | Claude, under an Issuer URL unique to your Claude organization. No identity provider or SSO needed. | Claude     | [Set up enterprise-managed authorization for Claude](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-claude) |
| Okta                 | Your Okta org, through the Okta app that runs your monday.com SSO                                   | Claude     | [Set up enterprise managed auth with Okta](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-okta)             |

Other identity providers and AI clients aren't supported yet.

***

# How monday.com trusts an assertion

## Claude-issued

An account admin registers your Claude organization's Issuer URL in **Administration** > **Connections** > **Dynamic connectors** > **Advanced**. monday.com accepts an assertion only when its Issuer URL is the one registered by the account it names (the Tenant ID). monday.com then finds the member in that account by email. The email must be on a domain the account claimed and verified.

## Okta

There is nothing to turn on in monday.com. monday.com accepts an assertion only when it comes from the IdP app that already runs your account's single sign-on (SSO), and only for a member that SSO has linked to that IdP user. An assertion from any other IdP org or app is rejected.

# Requirements

|               | Claude-issued                                                                                                                                                                                        | Okta                                                                                                                                                                                                                                                                                  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Plan**      | Enterprise                                                                                                                                                                                           | Enterprise                                                                                                                                                                                                                                                                            |
| **Account**   | The member's email domain is claimed and verified under **Administration** > **Security** > **Domains**                                                                                              | [SAML single sign-on](https://support.monday.com/hc/en-us/articles/360000460605-SAML-Single-Sign-on-SSO-) through Okta, with the SSO connection active                                                                                                                                |
| **Members**   | An active user in the account who accepted their invitation, with the same email as their Claude account. Viewers connect with read-only access; agent, API, service and portal users can't connect. | An active member or admin (not a viewer) who accepted their invitation and signed in to monday.com through SSO at least once. The first SSO sign-in links the member's monday.com user to their IdP user. Members created through SCIM are linked only after their first SSO sign-in. |
| **AI client** | Claude Team or Enterprise plan, for an organization that doesn't sign in to Claude through Okta                                                                                                      | A client that supports EMA with Okta                                                                                                                                                                                                                                                  |

# Values for your setup

Okta setups use all these values. Claude-issued setups don't set the issuer or the resource: the monday.com connector in Claude already has them. The scopes and the token lifetime apply to both.

| Setting                                          | Value                                                                                                         |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Authorization server issuer (assertion audience) | `https://auth.monday.com/mcp`                                                                                 |
| Resource (MCP server)                            | `https://mcp.monday.com/mcp`                                                                                  |
| Scopes                                           | All monday.com scopes, or none. EMA grants the full monday.com scope set, so a partial selection is rejected. |
| Access token lifetime                            | 24 hours. No refresh token is issued; the client gets a new assertion instead.                                |

***

# Turn it off

* **For everyone:** turn off EMA for the monday.com connector in your AI client. For Claude-issued, you can also turn off **Enterprise-managed authorization for Claude** in monday.com. For Okta, you can also remove the connection between the AI client and monday.com in Okta.
* **For one member:** for Claude-issued, remove the member from your Claude organization or deactivate them in monday.com. For Okta, unassign the member from the monday.com app or the AI client in Okta.

These changes stop new connections within a few minutes. Turning off **Enterprise-managed authorization for Claude** in monday.com also ends existing connections within a few minutes. Otherwise, an access token that monday.com already issued stays valid until it expires, up to 24 hours.

***

# Troubleshooting

When monday.com rejects a connection, the error description usually says what to fix.

* **Claude-issued:** see [Troubleshooting](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-claude#troubleshooting) in the Claude setup guide.
* **Okta:** these errors need more context:

| Error description                                                                 | What to do                                                                                                                                                                                                                                               |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `The assertion is invalid`                                                        | Check your IdP configuration against the [values for your setup](#values-for-your-setup), especially the issuer, audience, client ID, and resource. Some IdP setups also report account and member problems with this error. See your IdP's setup guide. |
| `No monday user with this email is in an account that uses this Okta app for SSO` | Check that the member's email is the same in monday.com and your IdP, and that your account's active SSO connection runs through the IdP app you connected to the AI client.                                                                             |
| `The user is in more than one monday account that uses this Okta app for SSO`     | Contact monday.com support.                                                                                                                                                                                                                              |

***

**Related resources:**

* [Set up enterprise-managed authorization for Claude](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-claude)
* [Set up enterprise managed auth with Okta](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth-okta)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
