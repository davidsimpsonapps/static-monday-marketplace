---
updatedAt: 2026-11-04T13:46:58.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Connect a custom agent

Connect your own external AI agent to monday.com so it can be @mentioned, assigned to items, and act on boards under its own identity.

A **custom agent** is an external AI agent that you own and host. Once connected, it gets its own monday.com identity, can be @mentioned in updates or assigned to items, and acts on boards through the monday.com API.

When the agent is triggered, monday.com sends a **signed HTTP POST** to a callback URL you provide. Acknowledge that request within 30 seconds. For agent chat, deliver the visible reply afterward with `send_custom_agent_message`, using `payload.conversationId` from the webhook. Your service can also act on monday.com independently using an API token issued at connection time.

<Callout icon="🚧" theme="warn">
This feature is in alpha and under active development as of June 2026. Breaking changes are expected before general availability. All requests require the request header <code>api-version: dev</code>.
</Callout>

> 📘 The GraphQL mutations referenced here (`connect_external_agent_sync`, `update_custom_agent`, `send_custom_agent_message`, `disconnect_external_agent`, `add_agent_resource_access`) are documented in full on the [Agents API reference](https://developer.monday.com/api-reference/reference/agents#connect-external-agents).

***

# Step 1. Create the agent

**From the UI:** go to **Agents** → **Manage agents** → **Bring your agent**, choose **Custom agent**, enter a name, and optionally provide a **Callback URL**. On the success modal, copy the **API Token** and **Signing Secret** — they are shown only once.

**From the API:** call [`connect_external_agent_sync`](https://developer.monday.com/api-reference/reference/agents#connect-a-custom-agent-sync). It returns the `agent_id`, `signing_secret`, and `api_token`.

<Callout icon="📘">
The callback URL is optional. Provide one if you want monday.com to notify your service when the agent is triggered. If you omit it, the agent is still created and you receive an API token — drive it through the monday.com API using that token; you just won't receive webhook events.
</Callout>

<Callout icon="❗️" theme="error">
<code>signing_secret</code> and <code>api_token</code> are returned only once and are never shown or logged again. Store them immediately in a secrets manager. If lost, disconnect and reconnect the agent to generate new credentials.
</Callout>

***

# Step 2. Receive the trigger webhook

When the agent is triggered, monday.com sends a signed `POST` to your callback URL.

**Request body:**

```json
{
  "event": "agent_triggered",
  "triggerType": "chat",
  "payload": {
    "text": "<trigger text>",
    "conversationId": "v1.example-conversation-token"
  },
  "timestamp": "2026-06-15T10:30:00Z"
}
```

| Field                    | Values                                   | Description                                                                                                       |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `event`                  | `agent_triggered`                        | Always `agent_triggered` for custom agent webhooks.                                                               |
| `triggerType`            | `chat`, `mention`, `assigned`, `unknown` | How the agent was triggered. Aliases such as `assign` may appear — normalize them.                                |
| `payload.text`           | string                                   | The text that triggered the agent.                                                                                |
| `payload.conversationId` | string                                   | Chat only. Opaque conversation ID. Pass it through unchanged as `conversation_id` on `send_custom_agent_message`. |
| `timestamp`              | ISO 8601 string                          | When the event occurred.                                                                                          |

**Request headers:**

| Header               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `x-monday-signature` | `sha256=<hex>` — HMAC-SHA256 signature of the request. |
| `x-monday-timestamp` | Epoch milliseconds — when monday.com sent the request. |
| `x-monday-agent-id`  | The agent ID that triggered the event.                 |
| `content-type`       | `application/json`                                     |

***

# Step 3. Reply to the webhook

monday.com `POST`s the trigger to your callback URL and waits up to **30 seconds** for HTTP 200. The response body is capped at **1 MB**. For agent chat, that HTTP response is only the acknowledgement. The message the user sees is sent afterward with [`send_custom_agent_message`](https://developer.monday.com/api-reference/reference/agents#send-a-custom-agent-message).

## Reply in chat

1. Read `payload.conversationId` from the webhook. It is an opaque string — pass it through unchanged.
2. Respond HTTP 200 before doing slower work. When `stream` is omitted or `true`, return an empty SSE stream ending in `data: [DONE]`. When `stream` is `false`, return `{ "success": true }`.
3. Call `send_custom_agent_message` with the agent's `api_token`. Set `conversation_id` to `payload.conversationId`.

The same `conversation_id` can be reused for as many messages as you need for up to 7 days. Changing the callback URL or reconnecting the agent invalidates it.

```graphql GraphQL
mutation ($input: SendCustomAgentMessageInput!) {
  send_custom_agent_message(input: $input) {
    delivered
    message_id
  }
}
```

```json
{
  "input": {
    "conversation_id": "v1.example-conversation-token",
    "message": "The project is 62% complete — 3 tasks remain in the backlog."
  }
}
```

```javascript
await mondayApi(agentApiToken, `
  mutation ($input: SendCustomAgentMessageInput!) {
    send_custom_agent_message(input: $input) {
      delivered
      message_id
    }
  }`, {
  input: {
    conversation_id: payload.conversationId,
    message: replyText,
  },
});
```

`delivered` is `true` when the chat UI received the message. `message_id` is the ID of that chat message.

<Callout icon="🚧" theme="warn">
Acknowledge the webhook within 30 seconds or the run fails with a timeout. After that acknowledgement, <code>send_custom_agent_message</code> delivers the chat message. The same <code>conversationId</code> stays valid for up to 7 days unless you change the callback URL or reconnect the agent.
</Callout>

You can instead put the full chat reply in the HTTP body. Return JSON `{ "success": true, "message": "Your reply text" }`, or stream SSE `data: {"type":"text","content":"..."}` lines and finish with `data: [DONE]`. Use that only when the reply is ready inside the 30-second window. For mention and assigned triggers, the HTTP body is not shown — acknowledge, then write with the agent's token (see [Step 5](#step-5-act-on-mondaycom)).

***

# Step 4. Verify the webhook signature

Every incoming webhook must be verified before processing. Use constant-time comparison to prevent timing attacks.

1. Read `x-monday-signature` and `x-monday-timestamp` from the request headers.
2. Compute `HMAC-SHA256(signing_secret, "{x-monday-timestamp}.{raw_body}")`.
3. Prefix your result with `sha256=` and compare it to `x-monday-signature` using a constant-time comparison.
4. Reject requests where signatures don't match or the timestamp is stale.

```javascript
const crypto = require('crypto');

function verifySignature(signingSecret, rawBody, headers) {
  const timestamp = headers['x-monday-timestamp'];
  const receivedSig = headers['x-monday-signature'];

  if (!timestamp || !receivedSig) return false;

  const expected = 'sha256=' + crypto
    .createHmac('sha256', signingSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  // timingSafeEqual throws if the buffers differ in length, so guard first.
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(receivedSig);
  return (
    expectedBuf.length === receivedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, receivedBuf)
  );
}
```

<Callout icon="🚧" theme="warn">
The <code>callback_url</code> must be a valid HTTPS URL reachable from monday.com's infrastructure. It is re-validated at execution time as a protection against SSRF and DNS-rebinding attacks.
</Callout>

***

# Step 5. Act on monday.com

Connected agents act under their own monday.com identity — your own account access does not carry over to the agent. Grant the agent access to the boards or docs it needs (the agent's page → **Knowledge and access**, or the [`add_agent_resource_access`](https://developer.monday.com/api-reference/reference/agents#add-resource-access-to-an-agent) mutation), then call the API with the agent's `api_token`:

```shell Terminal
curl -X POST https://api.monday.com/v2 \
  -H "Authorization: <agent-api-token>" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ me { id name } }"}'
```

The `api_token` is long-lived — it does not expire on a timer and is only revoked when the agent is disconnected. Use it for work that outlasts the 30-second webhook window, including [`send_custom_agent_message`](https://developer.monday.com/api-reference/reference/agents#send-a-custom-agent-message) for chat replies.

***

# Manage the agent

* **Update** the name or callback URL — [`update_custom_agent`](https://developer.monday.com/api-reference/reference/agents#update-a-custom-agent) (owner token with `agent_id`, or the agent's own `api_token` with `agent_id` omitted). Changing `callback_url` rotates `signing_secret` — persist the new value.
* **Disconnect** — [`disconnect_external_agent`](https://developer.monday.com/api-reference/reference/agents#disconnect-an-external-agent). This revokes the agent's token and deletes the agent.

***

# Troubleshooting

**The agent says it has access but can't edit items.**
The agent acts under its own identity. Grant `READ_WRITE` access to the relevant board (see [Step 5](#step-5-act-on-mondaycom)) — your own board access has no effect on the agent.

**Webhook signature verification is failing.**
Compute HMAC-SHA256 over `"{x-monday-timestamp}.{raw_body}"` using the `signing_secret` (not the API token), and use the raw, unparsed request body.

**The webhook times out.**
You must acknowledge the webhook within 30 seconds. For a later chat reply, call `send_custom_agent_message` with `payload.conversationId` from that webhook.

**The secrets were lost after setup.**
`signing_secret` and `api_token` are shown only once. If lost, disconnect the agent and reconnect to generate new credentials.

***

> 📘 Join our developer community!
>
> If you have questions or need help with custom agents, visit the [monday.com developer community](https://developer-community.monday.com/).
