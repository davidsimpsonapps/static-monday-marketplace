---
updatedAt: 2026-10-07T10:20:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Build an external agent

Create, connect, and host your own external (custom) AI agent on monday.com: webhook setup, signature verification, responding in agent chat, and acting on boards under the agent's identity

This guide walks through building a **custom external agent** ("bring your own agent") for monday.com end to end: creating it programmatically, pointing its webhook at your service, verifying requests, and — the part that trips most people up — **responding correctly so replies render in the agent chat**.

<Callout icon="🚧" theme="warn">
  The agent operations used in this guide are available only in the **`dev`** API version, so every request must send the `API-Version: dev` header. The `agents` query and the `subscribe_users_to_agent` / `unsubscribe_users_from_agent` mutations are available from API version [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01), which is a release candidate until it becomes current on January 15, 2027, but they are not needed for this guide. The `dev` API version is an unstable preview; signatures and types can change before these operations reach a dated version.
</Callout>

For the full API specification (every query, mutation, type, and enum), see the [Agents reference](https://developer.monday.com/api-reference/reference/agents). For the conceptual overview of how agents fit into the platform, see [Build on monday.com with AI](https://developer.monday.com/api-reference/docs/build-on-monday-with-ai).

***

# Concepts

monday.com supports two kinds of agent that you don't have to build a UI for:

* **Agents** — AI work orchestrators created and configured *inside* monday.com (personal or account-level). You define a profile, goal, plan, skills, knowledge, and triggers through the API, and monday.com runs them. See the [Agents reference](https://developer.monday.com/api-reference/reference/agents).
* **External agents** — agents that *you* host and own. monday.com gives them a first-class identity (they can be @mentioned, assigned to items, and act on boards) and communicates with your service over a signed webhook. This guide covers external agents.

There are two ways to connect an external agent:

* **Managed provider** (e.g. a Claude-managed agent) — monday.com orchestrates calls to the provider on your behalf. Connect it with the asynchronous [`connect_external_agent`](https://developer.monday.com/api-reference/reference/agents#connect-an-external-agent-async) mutation. This guide does **not** cover managed providers.
* **Custom agent (webhook)** — you provide a callback URL that monday.com posts events to, and your service replies. Connect it with the synchronous [`connect_external_agent_sync`](https://developer.monday.com/api-reference/reference/agents#connect-a-custom-agent-sync) mutation. **This is what this guide covers.**

At a high level, the custom agent flow looks like this:

```text
monday.com  ──(signed POST: "agent_triggered")──▶  your callback URL
your service ──(SSE stream / JSON response)──────▶  monday.com   (the reply)
your service ──(GraphQL with the agent's token)──▶  monday.com   (actions on items)
```

You receive two credentials **once** at setup:

| Credential       | Purpose                                                                                                                           |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `signing_secret` | Verify that incoming webhooks really came from monday.com (HMAC). Rotated whenever you set or update `callback_url`.              |
| `api_token`      | Act **as the agent** when calling the monday.com GraphQL API. Required for runtime replies that use GraphQL (mention / assigned). |

### Who sees what

monday waits up to \~**30 seconds** on the webhook request. What the user sees depends on the trigger:

| Trigger    | What monday waits for on the webhook     | What the user sees in monday                                         |
| :--------- | :--------------------------------------- | :------------------------------------------------------------------- |
| `chat`     | HTTP 200 body within \~30s (SSE or JSON) | That HTTP body **is** the chat reply                                 |
| `mention`  | HTTP 200 ack (body not shown in UI)      | Threaded update you post via GraphQL with the agent token            |
| `assigned` | HTTP 200 ack (body not shown in UI)      | Update (or other mutation) you post via GraphQL with the agent token |

For `mention` / `assigned`, acknowledge the HTTP request quickly, then do the visible work via GraphQL. For `chat`, keep the request open until your reply is ready — GraphQL cannot render agent chat replies.

***

# Prerequisites

* A monday.com account with **Agents enabled** (early-access feature).
* An **owner token** to create and manage the agent — a monday.com user token (OAuth access token or a personal API token). Management mutations run in the context of this user and under their permissions.
* A **public HTTPS endpoint** that monday.com can reach (see [Deployment notes](#deployment-notes-monday-code)).
* All agent API calls must send the header **`API-Version: dev`**.

A small GraphQL helper used throughout this guide:

```javascript
async function mondayApi(token, query, variables = {}) {
  const res = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,        // owner token OR agent api_token
      'API-Version': 'dev',        // REQUIRED for the agents API
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}
```

***

# Create the agent

Use [`connect_external_agent_sync`](https://developer.monday.com/api-reference/reference/agents#connect-a-custom-agent-sync) with the **owner token**.

<Callout icon="🚧" theme="warn">
  This mutation is **synchronous and slow (~25 seconds)**. Set your HTTP client timeout to **at least 40 seconds** and show a loading state while you wait.
</Callout>

```graphql GraphQL
mutation ConnectCustomAgent($input: ConnectExternalAgentSyncInput!) {
  connect_external_agent_sync(input: $input) {
    agent_id
    signing_secret
    api_token
    instructions
  }
}
```

Variables:

```json
{
  "input": {
    "custom": {
      "name": "My Custom Agent",
      "callback_url": "https://your-public-host.example.com/agent/webhook"
    }
  }
}
```

```javascript
const data = await mondayApi(ownerToken, CONNECT_MUTATION, {
  input: { custom: { name, callback_url } },
});
const { agent_id, signing_secret, api_token, instructions } =
  data.data.connect_external_agent_sync;
```

## Response fields

| Field            | Notes                                                      |
| :--------------- | :--------------------------------------------------------- |
| `agent_id`       | Internal monday.com agent ID.                              |
| `signing_secret` | **Shown once.** Store securely — used to verify webhooks.  |
| `api_token`      | **Shown once.** Store securely — used to act as the agent. |
| `instructions`   | Optional setup notes.                                      |

<Callout icon="❗️" theme="warn">
  `signing_secret` and `api_token` are returned **only once** at connect and can never be retrieved again. Persist them immediately (e.g. a secrets manager or monday-code secure storage). To rotate `signing_secret`, update `callback_url` via [`update_custom_agent`](#set-or-update-the-callback-url) — a new secret is returned. If you lose `api_token`, you must [`disconnect_external_agent`](#disconnect-an-agent) and reconnect.
</Callout>

The `callback_url` **must be public HTTPS** and reachable from monday.com's infrastructure. It is re-validated at execution time as protection against SSRF and DNS-rebinding. **Do not** use `localhost` or an internal host (see [Deployment notes](#deployment-notes-monday-code)).

<Callout icon="📘" theme="info">
  Prefer the API but want to start in the UI? You can also create a custom agent from **Agents → Manage agents → Bring your agent → Custom agent**, then copy the credentials from the success modal (shown only once).
</Callout>

***

# Set or update the callback URL

To change the name or callback URL later, use [`update_custom_agent`](https://developer.monday.com/api-reference/reference/agents#update-a-custom-agent). You can call it with the **owner's token** (pass `agent_id`) or the **agent's own `api_token`** (omit `agent_id` — monday resolves the agent from the token). That lets the agent update its own webhook after a deploy.

When you set or change `callback_url`, the response includes a new `signing_secret` (rotated on every callback URL update). Persist it immediately — the previous secret stops working for signature verification. Name-only updates return `signing_secret: null` — do **not** overwrite a stored secret with null.

<Callout icon="🚧" theme="warn">
  When authenticating with the agent token, **omit `agent_id`**. Passing it with an agent token can return an authorization error. monday resolves the agent from the token.
</Callout>

### Agent self-update (recommended after deploy)

Authorize with the agent's `api_token`. Omit `agent_id`.

```graphql GraphQL
mutation UpdateCustomAgent($input: UpdateCustomAgentInput!) {
  update_custom_agent(input: $input) {
    success
    signing_secret
  }
}
```

```json
{
  "input": {
    "callback_url": "https://your-public-host.example.com/agent/webhook"
  }
}
```

### Owner token

Pass `agent_id` explicitly. You can also update `name`.

```json
{
  "input": {
    "agent_id": "1234567890",
    "name": "My Renamed Agent",
    "callback_url": "https://your-public-host.example.com/agent/webhook"
  }
}
```

`name` and `callback_url` are both optional and independent. Errors (not found, not authorized, invalid URL) come back as **GraphQL errors**, not `success: false`. The new URL must be a valid public HTTPS endpoint.

### Confirm you have an agent token

Integrations that accept a pasted token should verify it is a custom-agent token before registering a callback. Call `me` with the token and accept only these `kind` values:

| `me.kind`                        | Meaning                                                |
| :------------------------------- | :----------------------------------------------------- |
| `external_agent_member`          | Custom agent token (connected)                         |
| `external_agent_detached_member` | Custom agent token (also seen on newly created agents) |

Reject owner/user tokens (`admin`, `member`, …) and personal-agent tokens (`personal_agent_member`).

```graphql GraphQL
query {
  me {
    id
    name
    kind
    email
  }
}
```

Custom agent emails look like `agent-<CUSTOM_AGENT_ID>@agent.monday.com` — you can parse the agent ID from `me.email` when you need it for display or logging. Prefer `me` for identity; listing `custom_agents` with an agent token is best-effort and may fail.

***

# Activate the agent

Newly created agents start **inactive** and must be activated before they can run. Use [`activate_agent`](https://developer.monday.com/api-reference/reference/agents#activate-an-agent).

```graphql GraphQL
mutation {
  activate_agent(id: 1234567890) {
    success
  }
}
```

***

# Grant board access

A connected agent acts under **its own identity** — your personal board access does **not** carry over. Grant it access to the boards and docs it needs with [`add_agent_resource_access`](https://developer.monday.com/api-reference/reference/agents#add-resource-access-to-an-agent).

```graphql GraphQL
mutation {
  add_agent_resource_access(
    id: 1234567890,
    resource_id: 9876543210,
    scope_type: BOARD,            # or DOC
    permission_type: READ_WRITE   # READ or READ_WRITE
  ) {
    success
  }
}
```

`READ_WRITE` is required to create or edit items, or to post updates.

<Callout icon="📘" theme="info">
  You can also grant access in the UI from the agent's page → **Knowledge and access**. If a board is in a non-default data region, the agent's API token must be able to reach that region.
</Callout>

***

# Receive triggers (the webhook)

When the agent is triggered, monday.com sends a **signed POST** to your callback URL and waits for your reply **on the same request**. There is no separate reply token or reply URL — the request is synchronous.

## Headers

| Header               | Example            | Use                                                            |
| :------------------- | :----------------- | :------------------------------------------------------------- |
| `x-monday-agent-id`  | `139988`           | Which agent fired → look up its stored credentials.            |
| `x-monday-signature` | `sha256=a3a6ce…`   | HMAC of the body — [verify it](#verify-the-request-signature). |
| `x-monday-timestamp` | `1782326623754`    | Epoch **milliseconds**; part of the signed string.             |
| `content-type`       | `application/json` | The request body is JSON.                                      |

<Callout icon="🚧" theme="warn">
  Agents hosted on monday-code (Cloud Run) also receive infrastructure headers: `x-serverless-authorization` (a Google-signed JWT), `host` (the internal `…---service-….a.run.app` host — **not** your public URL; never derive your callback URL from it), `x-forwarded-*`, `cf-*`, `via: 1.1 google`, and `user-agent: node`. Sign and route on the `x-monday-*` headers above, not on these.
</Callout>

## Body envelope

The body always has the same shape; only `payload` varies by trigger type.

```json
{
  "event": "agent_triggered",
  "triggerType": "chat",
  "payload": { "text": "...", "...": "trigger-specific fields" },
  "timestamp": "2026-06-24T18:43:43.754Z",
  "stream": true
}
```

| Field         | Type      | Description                                                                                                                                   |
| :------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`       | `String`  | Always `agent_triggered` for custom agent webhooks.                                                                                           |
| `triggerType` | `String`  | How the agent was triggered: `chat`, `assigned`, `mention`, or `unknown`. Aliases such as `mentioned` / `assign` may appear — normalize them. |
| `payload`     | `Object`  | Trigger-specific data. Always includes `text`; other fields depend on `triggerType`.                                                          |
| `timestamp`   | `String`  | ISO 8601 time the event occurred.                                                                                                             |
| `stream`      | `Boolean` | When `true` (default / omitted), reply with SSE. When `false`, reply with JSON `{ "message": "..." }`.                                        |

## Trigger types

### `chat`

The user typed a message in the agent chat. The payload is minimal and contains **no IDs** — only text. This is why a chat reply *must* be returned in the HTTP response: there is nothing to call back to.

```json
{
  "event": "agent_triggered",
  "triggerType": "chat",
  "payload": { "text": "sent this message through agent chat" },
  "timestamp": "2026-06-24T18:43:43.754Z",
  "stream": true
}
```

The chat request may include a **`stream`** flag (defaults to `true`). See [Respond to triggers](#respond-to-triggers).

### `assigned`

The agent was assigned to an item. The payload carries the full target, and monday.com formats `text` as an instruction prompt. The payload does **not** include the item name — fetch it via GraphQL if you need it.

```json
{
  "event": "agent_triggered",
  "triggerType": "assigned",
  "payload": {
    "text": "You were assigned to an item. Follow these steps:\n1. ...\n\nTRIGGER DATA:\n- itemId: 12334011531\n- boardId: 18418747579\n- groupId: topics",
    "itemId": 12334011531,
    "boardId": 18418747579,
    "groupId": "topics",
    "updateId": null,
    "replyId": null,
    "updateBody": null,
    "files": null
  },
  "timestamp": "2026-06-24T18:45:26.706Z"
}
```

Acknowledge the webhook quickly, then [act on the item via the API](#act-as-the-agent-via-the-api) (for example `create_update` on `itemId`). The HTTP response body is not shown in the UI.

### `mention`

The agent was @mentioned in an update. A mention only delivers a webhook when the agent has access to the relevant board and is mentioned in a valid context.

```json
{
  "event": "agent_triggered",
  "triggerType": "mention",
  "payload": {
    "text": "<monday-generated instruction prompt>",
    "itemId": 123456789,
    "boardId": 987654321,
    "updateId": 111222333,
    "updateBody": "user update text where @agent was mentioned",
    "replyId": null,
    "files": null
  },
  "timestamp": "2026-06-24T18:46:10.000Z"
}
```

Prefer **`payload.updateBody`** for the user's words when drafting a reply — `payload.text` is often monday's generated instruction prompt, not the update the user wrote. Acknowledge the webhook, then post a threaded reply with `create_update` using `item_id` + `parent_id` (= `updateId`). See [Act as the agent via the API](#act-as-the-agent-via-the-api).

<Callout icon="🚧" theme="warn">
  **Limits:** 30-second request timeout; response body ≤ 1 MB.
</Callout>

***

# Verify the request signature

Verify every incoming request before processing it. Compute an HMAC-SHA256 over the string `${timestamp}.${rawBody}` using the **`signing_secret`**, prefix the hex digest with `sha256=`, and compare it to `x-monday-signature` using a constant-time comparison.

```javascript
import crypto from 'crypto';

function verifySignature(signingSecret, rawBody, headers) {
  const timestamp = headers['x-monday-timestamp'];
  const received  = headers['x-monday-signature'];
  if (!timestamp || !received) return false;

  const expected = 'sha256=' + crypto
    .createHmac('sha256', signingSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  // timingSafeEqual throws on length mismatch — guard first.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

<Callout icon="🚧" theme="warn">
  HMAC the **raw, unparsed request body bytes**. If you re-serialize a parsed `req.body`, key ordering and whitespace will differ and the check will fail. Capture the raw body, e.g. with an `express.json({ verify })` hook. Use the `signing_secret` here — **not** the `api_token`.
</Callout>

```javascript
app.use(express.json({
  verify: (req, _res, buf) => { req.rawBody = buf; },
}));
```

***

# Respond to triggers

monday reads the agent's reply **synchronously from the HTTP response**. Behavior differs by trigger — see [Who sees what](#who-sees-what).

| Trigger                | Recommended HTTP behavior                                                                                         |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `chat`                 | Keep the request open; return SSE or JSON (below). This is the only way to reply in agent chat.                   |
| `mention` / `assigned` | Return HTTP 200 quickly with an empty SSE ack (or empty JSON if `stream: false`), then continue work via GraphQL. |

Empty SSE acknowledgement (for mention / assigned):

```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: [DONE]
```

If `stream: false`, ack with `{ "message": "" }`.

<Callout icon="🚧" theme="warn">
  A plain JSON body like `{ "text": "..." }` for a chat trigger **does not render** — the run shows _"Something went wrong while running the agent."_ You must stream SSE (or use the non-stream JSON shape below).
</Callout>

## Streaming reply (default — used by chat)

* Respond with `200` and `Content-Type: text/event-stream`.
* Emit one or more events: `data: {"type":"text","content":"<piece>"}` followed by a blank line.
* Terminate the stream with `data: [DONE]` followed by a blank line.
* monday.com concatenates the `content` pieces into the chat message.

```javascript
function streamReply(res, replyText) {
  res.status(200);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  if (res.flushHeaders) res.flushHeaders();

  const tokens = replyText.split(' ');
  let i = 0, closed = false;
  res.req.on('close', () => { closed = true; });

  const send = () => {
    if (closed) return;
    if (i < tokens.length) {
      const isLast = i === tokens.length - 1;
      const content = tokens[i] + (isLast ? '' : ' ');
      i += 1;
      res.write(`data: ${JSON.stringify({ type: 'text', content })}\n\n`);
      setTimeout(send, 40);            // pace the stream; optional
    } else {
      res.write('data: [DONE]\n\n');
      res.end();
    }
  };
  send();
}
```

You can also stream the whole message as a single chunk, then `[DONE]` — token-by-token just looks nicer.

## Non-streaming reply

If the request body has `stream: false`, return a single JSON object:

```json
{ "message": "your full reply text" }
```

## Rules

* Respond within **30 seconds**, with body **≤ 1 MB** and status **200**. The whole window — including a full SSE stream — must complete in time, or the run fails with a timeout and cannot be answered afterward.
* `event-stream` events are separated by a blank line (`\n\n`).
* For `chat`, generate `replyText` with your LLM and return it in the HTTP body. For `mention` / `assigned`, ack the HTTP request and do the visible work via the API.

***

# Act as the agent via the API

For triggers that carry a target (`assigned`, `mention`) — or any time the agent should *do* something — call the GraphQL API with the agent's **`api_token`** and the `API-Version: dev` header. Actions run under the agent's identity and permissions.

Post an update on an assigned item:

```javascript
await mondayApi(agentApiToken, `
  mutation ($itemId: ID!, $body: String!) {
    create_update(item_id: $itemId, body: $body) { id }
  }`,
  { itemId: String(payload.itemId), body: 'On it — reviewing the item now.' }
);
```

Reply in the mention thread (`parent_id` = `payload.updateId`):

```graphql GraphQL
mutation ($itemId: ID!, $body: String!, $parentId: ID) {
  create_update(item_id: $itemId, body: $body, parent_id: $parentId) {
    id
    text_body
  }
}
```

```json
{
  "itemId": "123456789",
  "parentId": "111222333",
  "body": "Thanks — I saw your mention and will follow up."
}
```

Sanity-check the token and identity:

```shell Terminal
curl -X POST https://api.monday.com/v2 \
  -H "Authorization: <agent-api-token>" \
  -H "API-Version: dev" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ me { id name kind email account { id } } }"}'
```

Remember: the agent needs explicit board access ([Grant board access](#grant-board-access)) or writes will fail even though the token is valid.

***

# Disconnect an agent

Revokes the agent's token and deletes the agent. Uses the owner token. See [`disconnect_external_agent`](https://developer.monday.com/api-reference/reference/agents#disconnect-an-external-agent).

```graphql GraphQL
mutation {
  disconnect_external_agent(id: 1234567890) {
    success
  }
}
```

To rotate lost credentials, disconnect and then [reconnect](#create-the-agent).

***

# Full reference implementation (Express)

A minimal end-to-end webhook receiver: verify → parse → respond (SSE) → (optionally) act.

```javascript
import express from 'express';
import crypto from 'crypto';

const app = express();

// Capture the RAW body for signature verification.
app.use(express.json({ verify: (req, _res, buf) => { req.rawBody = buf; } }));

// Look these up per agent_id from your secure store (set at connect time).
async function getAgentCreds(agentId) {
  // return { name, signingSecret, apiToken } | null
}

function verifySignature(signingSecret, rawBody, headers) {
  const ts = headers['x-monday-timestamp'];
  const recv = headers['x-monday-signature'];
  if (!ts || !recv) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', signingSecret)
    .update(`${ts}.${rawBody}`).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(recv);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function mondayApi(token, query, variables = {}) {
  const res = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token, 'API-Version': 'dev' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

app.post('/agent/webhook', async (req, res) => {
  const agentId = req.headers['x-monday-agent-id'];
  const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body || {});
  const body = req.body || {};
  const triggerType = String(body.triggerType || 'unknown').toLowerCase();
  const normalized =
    triggerType === 'mentioned' ? 'mention' :
    triggerType === 'assign' ? 'assigned' :
    triggerType;
  const wantsStream = body.stream !== false; // default: stream
  const payload = body.payload || {};

  if (!agentId) return res.status(400).json({ error: 'missing x-monday-agent-id' });

  const creds = await getAgentCreds(agentId);
  if (creds?.signingSecret && !verifySignature(creds.signingSecret, rawBody, req.headers)) {
    return res.status(401).json({ error: 'invalid signature' });
  }

  // --- chat: keep the request open and return the reply in the HTTP body ---
  if (normalized === 'chat') {
    const replyText = `Hi! I'm ${creds?.name || 'the agent'}. You said: "${payload.text || ''}"`;
    if (!wantsStream) return res.status(200).json({ message: replyText });
    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
    res.write(`data: ${JSON.stringify({ type: 'text', content: replyText })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  // --- mention / assigned: ack immediately, then act via GraphQL ---
  if (wantsStream) {
    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
    res.write('data: [DONE]\n\n');
    res.end();
  } else {
    res.status(200).json({ message: '' });
  }

  if (!creds?.apiToken || !payload.itemId) return;

  if (normalized === 'mention' && payload.updateId) {
    const userText = payload.updateBody || payload.text || '';
    await mondayApi(creds.apiToken, `
      mutation ($itemId: ID!, $body: String!, $parentId: ID) {
        create_update(item_id: $itemId, body: $body, parent_id: $parentId) { id }
      }`, {
      itemId: String(payload.itemId),
      parentId: String(payload.updateId),
      body: `Thanks — I saw your mention: "${userText}"`,
    });
  }

  if (normalized === 'assigned') {
    await mondayApi(creds.apiToken, `
      mutation ($itemId: ID!, $body: String!) {
        create_update(item_id: $itemId, body: $body) { id }
      }`, {
      itemId: String(payload.itemId),
      body: 'On it — reviewing the item now.',
    });
  }
});

app.listen(process.env.PORT || 8080);
```

***

# Deployment notes (monday-code)

If you host the agent on [monday-code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code), the most common failure is using the **wrong host** for the callback URL.

* Behind the monday-code proxy, your server's request `host` / Express `req.hostname` is the **internal Cloud Run host**, e.g. `xxxxx---service-….a.run.app`. **That host returns `403 Forbidden` to monday.com** — webhooks never arrive.
* Always use the **public** host: `https://<deploy>-service-…-<region>.monday.app/...`.
  * Derive it from the frontend `origin` (the iframe is served from the public host), the `x-forwarded-host` header, or an explicit `PUBLIC_BASE_URL` — and explicitly **reject any `*.run.app`** value.
* The public deploy host **changes on every deployment**. If you set the callback to a specific deploy host, you must update it after each deploy. Prefer the **stable live alias** (`https://live1-service-…monday.app/...`) so the callback survives redeploys.
* OAuth/redirect URLs (if your app uses OAuth) must include each public host you serve from.

***

# Troubleshooting

| Symptom                                           | Cause / Fix                                                                                                                                                                                          |
| :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *"Something went wrong while running the agent."* | You returned a plain JSON body for a `chat` trigger. **Respond with SSE** (`text/event-stream`, `{type:"text",content:…}` chunks, `data: [DONE]`).                                                   |
| Chat reply never appears                          | GraphQL cannot render chat — the HTTP response body is the reply. Also honor `stream` (SSE vs `{ "message": "..." }`).                                                                               |
| Mention reply uses the wrong text                 | Prefer `payload.updateBody` (user's update). `payload.text` is often monday's instruction prompt.                                                                                                    |
| Webhook never arrives                             | Callback points at an unreachable host — `*.run.app` (returns 403), `localhost`, or an `http` URL. Use a public HTTPS `*.monday.app` host.                                                           |
| Signature verification fails                      | HMAC must be over `${timestamp}.${rawBody}` with the **raw** body and the **`signing_secret`** (not `api_token`). After updating `callback_url`, use the **new** `signing_secret` from the response. |
| Auth error on agent-token `update_custom_agent`   | Omit `agent_id` when using the agent token. Pass `agent_id` only with the owner token.                                                                                                               |
| Stored signing secret wiped after rename          | Name-only updates return `signing_secret: null` — only overwrite your stored secret when a non-null value is returned.                                                                               |
| Agent "has access but can't edit items"           | Grant `READ_WRITE` via `add_agent_resource_access` — your own access doesn't carry over.                                                                                                             |
| Agent never runs                                  | It's inactive — call `activate_agent`.                                                                                                                                                               |
| Secrets lost                                      | `api_token` is shown once at connect. To rotate `signing_secret`, call `update_custom_agent` with a new `callback_url`. To rotate both, `disconnect_external_agent` and reconnect.                   |
| `connect_external_agent_sync` times out           | It's synchronous (\~25s). Set client timeout ≥ 40s.                                                                                                                                                  |

***

# Quick reference

```text
CREATE   connect_external_agent_sync(input:{custom:{name, callback_url}})  → agent_id, signing_secret, api_token   [owner token, ~25s]
UPDATE   update_custom_agent(input:{agent_id?, name?, callback_url?})       → success, signing_secret?             [owner token or agent api_token; omit agent_id with agent token; callback_url rotates signing_secret; name-only → signing_secret null]
ACTIVATE activate_agent(id)                                                 → success                              [owner token]
ACCESS   add_agent_resource_access(id, resource_id, scope_type, permission_type) → success                        [owner token]
DELETE   disconnect_external_agent(id)                                      → success                              [owner token]
IDENTITY me { id name kind email }                                          → kind: external_agent(_detached)_member  [agent token]

WEBHOOK  POST {callback_url}
         headers: x-monday-agent-id, x-monday-signature, x-monday-timestamp
         body:    { event:"agent_triggered", triggerType, payload:{text, ...}, timestamp, stream? }
         verify:  HMAC-SHA256(signing_secret, `${timestamp}.${rawBody}`) === x-monday-signature
         chat:    SSE  data: {"type":"text","content":"..."}\n\n  ...  data: [DONE]\n\n
                  (or  { "message": "..." }  when stream:false)
         mention/assigned: ack with empty SSE/[DONE] (or { "message": "" }), then GraphQL as agent

ACT      POST https://api.monday.com/v2   Authorization: {api_token}   API-Version: dev   [act as the agent]
         mention: create_update(item_id, body, parent_id=updateId) — prefer payload.updateBody for user text
         assigned: create_update(item_id, body)
```

<Callout icon="🚧" theme="warn">
  The agent operations used in this guide are available only in the **`dev`** API version, so every request must send the header **`API-Version: dev`**. The `agents` query and the `subscribe_users_to_agent` / `unsubscribe_users_from_agent` mutations are available from API version [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01), which is a release candidate until it becomes current on January 15, 2027, but they are not needed for this guide.
</Callout>

> 📘 Join our developer community!
>
> If you have questions or need help with custom agents, visit the [monday.com developer community](https://developer-community.monday.com/).

<br />
