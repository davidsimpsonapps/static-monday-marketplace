---
updatedAt: 2026-09-07T09:04:03.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Integrating monday MCP with Copilot Studio using a Custom App

Connect Microsoft Copilot Studio to monday.com through your own OAuth app so you control who connects, which scopes apply, and how the MCP connection is managed

<Callout icon="💡" theme="info">
  ### **Prefer a simpler setup?**

  Copilot Studio supports a default monday.com connector. Use that path when you want the fastest connection — no custom OAuth app required. See [Connect monday MCP with Microsoft Copilot Studio](https://support.monday.com/hc/en-us/articles/28584426338322-Connect-monday-MCP-with-Microsoft-Copilot-Studio).
</Callout>

Use this guide when you want Copilot Studio connected to monday.com through **your own OAuth app**, instead of the hosted one-click / default connector. You get the same MCP tools in your agent, with tighter control over who can connect and what the connection is allowed to do.

For the full organization-wide pattern (any MCP client, authorization flow details, and approach comparison), see [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app).

# Why use a custom app with Copilot Studio

By default, AI assistants can connect via monday.com's **hosted MCP connector**: users click **Connect**, sign in, and they're done. That path is fastest, but it's all-or-nothing — once enabled, any user who can log in, from any MCP-compatible client, can connect, and the connection inherits that user's full monday.com permissions.

A custom OAuth app is the right choice when you need to:

* **Limit scopes** — Cap MCP actions with app-level [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) (for example `boards:read` only), even if the user has broader permissions in monday.com
* **Choose who connects** — Share Client ID and Client Secret only with approved builders/users; everyone else stays locked out
* **Prefer Copilot Studio specifically** — Route access through credentials you control, rather than leaving the hosted connector open to any MCP client
* **Revoke cleanly** — Remove one user, or rotate the Client Secret to cut off everyone, without disrupting unrelated integrations
* **Keep a separate audit trail** — Authorized users and activity appear under *your* app in the developer platform

This path is also appropriate while you're **developing** a private or org-internal MCP setup. Publicly available integrations should use [dynamic client registration](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration) instead.

***

# Before you start

You'll need:

1. Permission to create an app in the [monday.com Developer Center](https://monday.com/developers)
2. Admin access to turn off the hosted MCP connector for your account (so users can't bypass your app)
3. A Copilot Studio agent where you can add tools

***

# Step 1: Create your OAuth app in monday.com

The monday MCP server uses the standard **OAuth 2.0 Authorization Code Grant**, with monday.com as the identity provider.

### Create your app

1. Log in to your monday.com account. Click your profile picture in the top-right corner and select **Developers** to open the Developer Center
2. Click **+ Create app** in the top-right corner
3. Enter an **App Name** and **App Slug**, then click **Create app**

### Configure OAuth settings

1. In the left sidebar under **Build**, click **OAuth & Permissions**
2. On the **Scopes** tab, select only the [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) your integration needs — these scopes cap what the MCP connection can do (add all during testing if needed)
3. Leave **Redirect URLs** for Step 3 — Copilot Studio generates the redirect URI after you start adding the MCP tool. You'll paste that URL back into monday.com before finishing authorization

### Retrieve your credentials

1. Go to **General Settings** in the left sidebar of your app
2. Scroll down to the **App Credentials** section and copy your **Client ID** and **Client Secret**

<Callout icon="❗️" theme="error">
  ### NOTE

  Your client secret is a _secret_. Never share it or add it to source code others can access. You can regenerate it from the app's settings if it's ever compromised.
</Callout>

# Step 2: Turn off the hosted MCP connector

In your monday.com admin settings, disable the built-in hosted MCP connector. This step matters: as long as it's on, users can bypass your app and connect the old way.

# Step 3: Add a Model Context Protocol tool in Copilot Studio

1. Open your agent in **Copilot Studio**
2. Go to the **Tools** tab and click **Add a tool**
3. Choose **Model Context Protocol**

   ![](https://files.readme.io/93b952ca1ce45bd85db04f2a0c3852df98c713fc7761228f20eb3bf8dd85dea1-Screenshot_2026-09-07_at_11.40.59.png)
4. Enter the server details:

| Field                  | Value                                                                                                                                                                                      |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server name**        | `monday MCP` *(names can't include a period)*                                                                                                                                              |
| **Server description** | `monday.com project management & CRM for projects, tasks, portfolios, boards, workflows, milestones, dependencies, forms, dashboards, cross-project portfolio status, and critical paths.` |
| **Server URL**         | `https://mcp.monday.com/mcp` *(the common hosted monday MCP endpoint)*                                                                                                                     |

5. Under **Authentication**, select **OAuth 2.0**, then set **Type** to **Manual**

6) Fill in the OAuth fields. Use values like the examples below — replace the Client ID with yours:

| Field                 | What to enter                                            | Example                                                                               |
| :-------------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **Authorization URL** | monday authorize endpoint with your Client ID            | `https://auth.monday.com/oauth2/authorize?client_id=38143d6bd05d57a74ed5e99942b24ttt` |
| **Token URL**         | monday token endpoint                                    | `https://auth.monday.com/oauth2/token`                                                |
| **Refresh URL**       | No separate refresh endpoint today — reuse the token URL | `https://auth.monday.com/oauth2/token`                                                |

![](https://files.readme.io/4921882a87e1f807dc3f766ce162f972371400dca1f8c0af00477f81b964779e-Screenshot_2026-09-07_at_11.43.39.png)

7. After submitting, copy the **Redirect URI** Copilot Studio shows for this connector. It looks similar to:

```
https://global.consent.azure-apim.net/redirect/cr7d9-5fmonday-20mcp-20test-2077-5f0f516cbecf05asda
```

Your URI will be unique to your connector — use the one Copilot Studio provides, not this example string as-is.

# Step 4: Add the Copilot Studio redirect URI in monday.com

1. Back in your monday.com app, open **OAuth & Permissions → Redirect URLs**
2. Paste the Redirect URI from Copilot Studio and click **Save**

The redirect must match exactly. If it doesn't, authorization fails (for example, missing `state` or redirect mismatch errors from Azure consent).

# Step 5: Complete authorization and verify

1. Finish adding the tool in Copilot Studio and run through the OAuth consent screen
2. In Copilot Studio, confirm the MCP tool is available on the agent and can call monday.com successfully

<Callout icon="💡" theme="info">
  **Recommendation:** After the MCP server is connected, review the available tools in Copilot Studio and **disable any tools you don't want the agent to use**. Leaving only the tools your agent needs reduces accidental writes, keeps prompts more focused, and complements the permission scopes on your OAuth app.
</Callout>

***

# What happens after you connect

All MCP tool calls from Copilot Studio run as the authenticated monday.com user, limited by both that user's platform permissions and the scopes on your OAuth app. The MCP token can't exceed either boundary — it doesn't grant permissions the user lacks, and it can't use permissions the app didn't request.

***

**Related resources:**

* [Control MCP access with your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app)
* [Connect monday MCP with Microsoft Copilot Studio](https://support.monday.com/hc/en-us/articles/28584426338322-Connect-monday-MCP-with-Microsoft-Copilot-Studio) (default connector setup)
* [Integrating monday MCP with Claude using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
* [OAuth documentation](https://developer.monday.com/apps/docs/oauth)
