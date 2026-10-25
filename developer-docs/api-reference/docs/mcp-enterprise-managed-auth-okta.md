---
updatedAt: 2026-10-21T07:23:08.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Set up enterprise managed auth with Okta

Configure Okta Cross App Access so a supported AI client connects to monday MCP through your Okta single sign-on.

Okta supports [enterprise managed auth](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth) through [Okta Cross App Access (XAA)](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm). In XAA terms, monday.com is the resource app and the AI client is the AI agent (the requesting app).

# Before you start

* Your monday.com account meets the requirements in [Enterprise managed auth](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth), and its SAML SSO runs through an Okta app. That app is the one you configure below.
* You have an Okta admin who can manage apps and AI agents, and an admin for your AI client.
* Your AI client is registered in Okta as an AI agent, and your members sign in to it through Okta. Follow your AI client's documentation and [Configure AI agent-to-app with Cross App Access](https://help.okta.com/oie/en-us/content/topics/apps/apps-manage-cross-app-access.htm).

***

# Step 1: Enable Cross App Access on the monday.com app

You do this once, whichever AI clients you connect.

1. In the Okta Admin Console, go to **Applications and Resources** > **Applications** and open the app that runs your monday.com SSO.
2. Go to **Machine Assignments** > **Callers**.
3. Click **Edit** next to **Cross App Access (XAA)**, select **Enable**, and set the fields:

   | Field              | Value                         |
   | :----------------- | :---------------------------- |
   | Issuer URL         | `https://auth.monday.com/mcp` |
   | Audience/tenant ID | `https://auth.monday.com/mcp` |
   | Scopes             | Leave empty                   |

   If your app is the **monday.com** app from the Okta Integration Network, the issuer and scopes are already set. Keep the defaults.
4. Click **Save**.

# Step 2: Connect the AI client to monday.com

Repeat this step for each AI client.

1. In the Okta Admin Console, go to **Directory** > **AI Agents** and open the AI agent for your AI client.

2. Go to **Resource connections** and click **Add resource connection**.

3. Set the fields:

   | Field                              | Value                                          |
   | :--------------------------------- | :--------------------------------------------- |
   | Application instance               | The monday.com app from Step 1                 |
   | Client ID registered in monday.com | The AI client's client ID from the table below |
   | Resource identifier                | `https://mcp.monday.com/mcp`                   |
   | Scopes                             | **Allow any scope**                            |

4. Click **Add**.

5. Assign the members who should use monday.com in the AI client to both the AI client's app and the monday.com app in Okta.

| AI client | Client ID registered in monday.com                  |
| :-------- | :-------------------------------------------------- |
| Claude    | `https://claude.ai/oauth/mcp-oauth-client-metadata` |

# Step 3: Turn on enterprise managed auth in the AI client

An admin of the AI client turns on EMA for the monday.com connector (`https://mcp.monday.com/mcp`). Follow the client's own guide:

| AI client                          | Guide                                                                                                                                                          | monday.com notes                                                                                                            |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Claude (Team and Enterprise plans) | [Authorize MCP connectors for your entire organization](https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization) | Set up **Managed authorization** on the monday.com connector. On the **Scopes** step, select all monday.com scopes or none. |

Members covered by your Okta assignments can then use monday.com in the AI client after they sign in with SSO. They don't need to connect it themselves.

***

# Turn it off in Okta

* **For one AI client:** on the AI agent's **Resource connections** tab, deactivate or remove the connection to monday.com.
* **For all AI clients:** disable **Cross App Access (XAA)** on the monday.com app.
* **For one member:** unassign the member from the monday.com app or the AI client's app.

These changes stop new connections within a few minutes. An access token that monday.com already issued stays valid until it expires, up to 24 hours.

***

# Troubleshooting

For error messages and fixes, see the troubleshooting table in [Enterprise managed auth](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth).

If your Okta org uses a custom domain, `The assertion is invalid` also covers the account and member checks. When you see it, also confirm the monday.com requirements and that your monday.com SSO runs through the same Okta app you connected in Step 2.

***

**Related resources:**

* [Enterprise managed auth](https://developer.monday.com/api-reference/docs/mcp-enterprise-managed-auth)
* [Configure AI agent-to-app with Cross App Access (Okta)](https://help.okta.com/oie/en-us/content/topics/apps/apps-manage-cross-app-access.htm)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
