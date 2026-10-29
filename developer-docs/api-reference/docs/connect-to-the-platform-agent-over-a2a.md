---
updatedAt: 2026-10-28T20:05:10.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Connect to the Platform Agent over A2A

Integrate with the monday.com Platform Agent using the Agent2Agent (A2A) protocol: create an OAuth app, get a user token, and send JSON-RPC messages

The monday.com Platform Agent is an AI agent that can take actions across your account, such as reading boards, creating items, and managing workspaces. In addition to the [Platform MCP](https://developer.monday.com/api-reference/docs/mondaycom-mcp), you can now connect to the Platform Agent over the **Agent2Agent (A2A) protocol**, an open standard that lets AI agents and A2A-compatible clients talk to each other.

Use A2A when you want your agent or application to delegate a task to the Platform Agent in natural language, instead of calling individual tools.

| Resource                | URL                                                                                         |
| :---------------------- | :------------------------------------------------------------------------------------------ |
| **Agent card**          | `https://api.monday.com/platform-ai-gateway/a2a/platform-agent/.well-known/agent-card.json` |
| **Endpoint (JSON-RPC)** | `https://api.monday.com/platform-ai-gateway/a2a/platform-agent/jsonrpc`                     |

Most A2A clients only need the agent card URL. They read the card to discover the endpoint, the supported protocol version, and the authentication requirements.

<Callout icon="📘" theme="info">
  The agent acts on behalf of the authenticated user. It can only do what the OAuth scopes you request and the user's own monday.com permissions allow.
</Callout>

***

# Step 1: Create a monday.com app

You only need to do this once.

1. In the monday.com Developer Center, [create an app](https://developer.monday.com/apps/docs/create-an-app).
2. Under **OAuth & Permissions**:
   * Enable the **new OAuth flow** (OAuth 2.1).
   * Add your redirect URL.
   * Choose the [scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) your use case needs, for example `me:read`, `boards:read`, `boards:write`, and `workspaces:read`.
3. Save the **client ID** and **client secret**.

***

# Step 2: Get a user access token

Use the standard OAuth 2.1 authorization code flow with PKCE (`S256`). Most A2A clients run this flow automatically from the agent card.

| Endpoint                          | URL                                                                       |
| :-------------------------------- | :------------------------------------------------------------------------ |
| **Authorization server metadata** | `https://auth.monday.com/oauth_ms/.well-known/oauth-authorization-server` |
| **Authorize**                     | `https://auth.monday.com/oauth2/authorize`                                |
| **Token and refresh**             | `https://auth.monday.com/oauth_ms/oauth/token`                            |

Access tokens expire after **24 hours**. Use the refresh token to get a new access token.

<Callout icon="🚧" theme="warn">
  Each refresh returns a **new refresh token** and invalidates the previous one. Always store the latest refresh token.
</Callout>

***

# Step 3: Send a message

Call the `SendMessage` method on the JSON-RPC endpoint with the access token in the `Authorization` header.

```shell Terminal
curl -X POST https://api.monday.com/platform-ai-gateway/a2a/platform-agent/jsonrpc \
  -H 'Authorization: Bearer <access_token>' \
  -H 'Content-Type: application/json' \
  -H 'A2A-Version: 1.0' \
  -d '{"jsonrpc":"2.0","id":1,"method":"SendMessage","params":{"message":{"messageId":"1","role":"ROLE_USER","parts":[{"text":"list my boards"}]}}}'
```

The agent's answer is in `result.message.parts[0].text`.

## Continue a conversation

To continue a conversation, send the `contextId` returned in the response with your next message. The agent remembers earlier turns in the same context.

***

# Step 4: Set a timezone and enable full write access (optional)

The Platform Agent supports an options extension. To use it, activate the extension with the `A2A-Extensions` header:

```text
A2A-Extensions: https://developer.monday.com/a2a/extensions/platform-agent-options/v1
```

Then pass the options in the message `metadata`, keyed by the extension URI:

```json JSON
"metadata": {
  "https://developer.monday.com/a2a/extensions/platform-agent-options/v1": {
    "timezone": "America/New_York",
    "allApiWriteEnabled": true
  }
}
```

| Option               | Type      | Description                                                                                                          |
| :------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------- |
| `timezone`           | `String`  | An [IANA timezone name](https://www.iana.org/time-zones) used for dates and times. The default is `UTC`.             |
| `allApiWriteEnabled` | `Boolean` | Gives the agent the full monday.com API write tool, still limited to the user's permissions. The default is `false`. |

When the options are applied, the response includes the same `A2A-Extensions` header.

***

# Good to know

* **Blocking responses:** A request returns when the agent finishes. This usually takes a few seconds and can take up to about a minute. Streaming and push notifications are not supported yet.
* **AI credits:** Each message uses AI credits from the user's monday.com account. The credits used are returned in the `X-Monday-Credits-Used` response header. AI must be enabled on the account.
* **Errors:**
  * A missing or invalid token returns HTTP `401`.
  * An account without AI enabled, or a user without the required permission, returns HTTP `403`.

***

**Related resources:**

* [Build on monday.com with AI](https://developer.monday.com/api-reference/docs/build-on-monday-with-ai)
* [Build an external agent](https://developer.monday.com/api-reference/docs/build-an-external-agent)
* [Connect to the monday MCP server](https://developer.monday.com/api-reference/docs/mondaycom-mcp)
* [Authentication](https://developer.monday.com/api-reference/docs/authentication)
