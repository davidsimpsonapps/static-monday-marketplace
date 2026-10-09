---
updatedAt: 2026-10-08T17:25:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Control MCP access with your own OAuth app

Replace the hosted MCP connector with your own OAuth app to control who connects, which clients can connect, and which permission scopes the MCP connection can use

By default, connecting an AI assistant (like Claude) to monday.com uses our hosted MCP connector — your users click **Connect**, sign in, and they're done. It's the fastest way to get started, but it's all-or-nothing: once it's enabled, any user who can log in, from any MCP-compatible client, can connect — and the connection inherits that user's full monday.com permissions.

If your organization needs tighter control — for example, allowing only Claude (not other AI tools), limiting access to a specific group of users, or restricting what the MCP connection is allowed to do — you can replace the hosted connector with your own OAuth app. This gives you the same MCP functionality, but with control over who connects, what connects, and which [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) apply to the connection.

This is also the right path while you're **developing** a user-facing MCP integration or distributing it privately inside your organization. To let other monday.com accounts connect your client, use [dynamic client registration](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration). The customer's admin approves the additional connection and its redirect URIs through [dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors).

This guide walks you through the setup. For client-specific walkthroughs, see:

* [Integrating monday MCP with Claude using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app)
* [Integrating monday MCP with Copilot Studio using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app)

The same credentials work with other MCP clients that support custom OAuth connectors.

# How it works

Instead of relying on monday.com's shared hosted connector, you:

1. Register your own OAuth app in the monday.com developer platform and get a Client ID and Client Secret
2. Turn on **New OAuth flow** under **Build → OAuth & Permissions** — required to connect to MCP with a custom app
3. Turn off the hosted MCP connector for your account
4. Give the app's credentials only to your approved users, who add monday.com as a custom connector in their AI agent, pointing at the same MCP endpoint

Your app now controls the connection — not the shared hosted integration.

# Why do this

* **Control scopes.** Set the OAuth permission scopes on your app — for example `boards:read` only, or no write access. Those scopes limit what the MCP connection can do, even if the authenticated user has broader permissions in monday.com.
* **Choose who connects.** Only users you've given your Client ID and Client Secret to can authorize the connection. Everyone else is locked out, even if they're logged in to monday.com.
* **Choose what connects.** Restrict access to a specific AI client rather than any MCP-compatible tool.
* **Revoke without disruption.** Remove a single user's access, or rotate your Client Secret to cut off everyone at once — without affecting your other integrations.
* **Get your own audit trail.** Your app has its own list of authorized users and activity in the developer platform, separate from the shared hosted connector.

<Callout icon="💡" theme="info">
  **Tradeoff:** Setup takes a few extra steps per user compared to one-click connect, and you're responsible for storing and rotating your Client Secret securely.
</Callout>

***

# Setup steps

## Step 1: Create your OAuth app in monday.com

The monday MCP server uses the standard **OAuth 2.0 Authorization Code Grant**, with monday.com as the identity provider — the same flow used by all third-party integrations with the platform API.

### Create your app

1. Log in to your monday.com account. Click your profile picture in the top-right corner and select **Developers** to open the Developer Center
2. Click **+ Create app** in the top-right corner
3. Enter an **App Name** and **App Slug**, then click **Create app**

### Configure OAuth settings

1. In the left sidebar under **Build**, click **OAuth & Permissions**
2. Open **New OAuth flow** and switch the toggle **on**. You must turn this on to connect to MCP with a custom app — while the toggle is off, the app cannot authenticate to the MCP server
3. On the **Scopes** tab, select only the [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) your integration needs — these scopes cap what the MCP connection can do, even when the user has broader permissions in monday.com (add all during testing)
4. Switch to the **Redirect URLs** tab and add your callback URL — the URL where monday.com sends authorization codes — then click **Save**

<Callout icon="🚧" theme="warn">
  **New OAuth flow must be on.** Find it on your app under **Build → OAuth & Permissions → New OAuth flow**. Switch the toggle on before you connect. A custom app cannot connect to MCP while this toggle is off.
</Callout>

### Retrieve your credentials

1. Go to **General Settings** in the left sidebar of your app
2. Scroll down to the **App Credentials** section and copy your **Client ID** and **Client Secret**

<Callout icon="❗️" theme="error">
  ### NOTE

  Your client secret is a _secret_. Never share it or add it to source code others can access. You can regenerate it from the app's settings if it's ever compromised.
</Callout>

## Step 2: Turn off the hosted MCP connector

In your monday.com admin settings, disable the built-in hosted MCP connector. This step matters: as long as it's on, users can bypass your app and connect the old way.

## Step 3: Add a custom connector to your agent

Point your AI agent at the monday MCP server using your OAuth app credentials — not the hosted one-click connector.

You can do this in either of two ways:

* **Configure it yourself** — If you're building or hosting your own MCP client, pass the MCP server URL plus your Client ID and Client Secret into your client's OAuth configuration. See [Authorization flow (custom MCP clients)](#authorization-flow-custom-mcp-clients) for how the token handshake works.
* **Use a product that supports custom MCP connectors** — Tools like Claude, ChatGPT, Copilot, Cursor, and other [compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) typically let you add a new MCP connector and supply OAuth credentials. Look for settings such as **Connectors**, **Custom connector**, or **Add MCP server**, then enter:
  * **MCP server URL:** `https://mcp.monday.com/mcp`
  * **OAuth Client ID** and **OAuth Client Secret** from Step 1

<Callout icon="⚠️" theme="warn">
  Only share the URL, Client ID, and Client Secret with users you want to authorize.
</Callout>

### Example: Claude

For screenshots and step-by-step Claude UI instructions, see [Integrating monday MCP with Claude using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app).

### Example: Copilot Studio

For Copilot Studio MCP tool setup (OAuth URLs, redirect URI, naming rules), see [Integrating monday MCP with Copilot Studio using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app).

## Step 4: Verify

Have one user complete the OAuth flow and confirm the connection appears under your app (not the hosted connector) in the monday.com developer platform.

***

# Authorization flow (custom MCP clients)

If you're building your own MCP client (rather than using a product's custom connector UI), the authorization flow follows the standard monday.com [OAuth flow](https://developer.monday.com/apps/docs/oauth):

1. Your MCP client redirects the user to `https://auth.monday.com/oauth2/authorize` with your client ID
2. The user approves the requested permission scopes
3. Your client exchanges the authorization code for an access token
4. Include the access token in the `Authorization` header of your MCP requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

All MCP tool calls execute in the context of the authenticated user, limited by both that user's platform permissions and the scopes enabled on your OAuth app. The MCP token can't exceed either boundary — it doesn't grant permissions the user lacks, and it can't use permissions the app didn't request.

***

***

# Which approach should you use?

| Approach             | Best when                                                                                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Hosted connector** | You want a fast rollout and any authenticated user, from any AI client, with that user's full permissions, is an acceptable level of access             |
| **Custom OAuth app** | You need to limit MCP actions with app scopes, name exactly who can connect, restrict it to a specific client, or need independent audit and revocation |

You can use both across your organization — for example, hosted for general workspaces, and a custom app for workspaces with sensitive data.

***

**Related resources:**

* [Integrating monday MCP with Claude using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-claude-custom-app)
* [Integrating monday MCP with Copilot Studio using a Custom App](https://developer.monday.com/api-reference/docs/integrating-monday-mcp-with-copilot-studio-custom-app)
* [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp)
* [Authenticate with an API token](https://developer.monday.com/api-reference/docs/mcp-api-token)
* [Make your integration publicly available (DCR)](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration)
* [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors)
* [Compatible MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)
* [MCP security overview](https://developer.monday.com/api-reference/docs/monday-mcp-security-overview)
* [OAuth documentation](https://developer.monday.com/apps/docs/oauth)
