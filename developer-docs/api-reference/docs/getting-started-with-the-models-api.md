---
updatedAt: 2026-09-06T08:33:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Getting started with the Models API

Get a monday API token, point your client at the Models API, and call chat, embeddings, images, and audio through the OpenAI-compatible API.

The Models API is **OpenAI-compatible**: request bodies, parameters, and response objects match the [OpenAI HTTP API](https://platform.openai.com/docs/api-reference), so you can reuse existing OpenAI tutorials and SDKs by swapping the **base URL** and **API key**.

# Before you begin

* A monday.com **Pro** or **Enterprise** workspace with AI features available for your use case.

# 1. Get your API token

Use a **monday.com personal API token** as the credential for the Models API (not an OpenAI API key). How to create and copy your token, regenerate it, and what it can access is documented in **[Authentication](https://developer.monday.com/api-reference/docs/authentication)**.

If you authenticate with an **app token** instead, configure scopes and tokens as described in the apps documentation so the token can use AI features. The app associated with the token must include the **`ai:consume`** scope.

# 2. Point your client at the Models API

Set:

| Setting           | Value                                                  |
| :---------------- | :----------------------------------------------------- |
| **Base URL**      | `https://api.monday.com/platform-ai-gateway/openai/v1` |
| **Authorization** | `Bearer <MONDAY_API_TOKEN>`                            |

If you use the [OpenAI SDKs](https://platform.openai.com/docs/libraries), set `baseURL` / `base_url` to the value above and `apiKey` / `api_key` to your monday token.

# 3. Send a test request

**cURL (chat completion)**

```bash
curl -sS -X POST "https://api.monday.com/platform-ai-gateway/openai/v1/chat/completions" \
  -H "Authorization: Bearer <MONDAY_API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "monday-standard",
    "messages": [{ "role": "user", "content": "Reply with the word: ok" }]
  }'
```

We recommend **`monday-standard`** (or **`monday-fast`** / **`monday-powerful`**) for tests. See [Recommended chat model aliases](https://developer.monday.com/api-reference/docs/models-api-supported-models#recommended-chat-model-aliases). You can also pass a direct model ID from the [supported models](https://developer.monday.com/api-reference/docs/models-api-supported-models) list.

<Callout icon="👍" theme="okay">
  **Prefer GraphQL?** For simple, single-turn chat completions you can use the [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation in the core GraphQL API instead of the OpenAI-compatible REST endpoint — no separate base URL or client required. It's a simplified wrapper over the same AI gateway, so the same access requirements and **monday AI token** consumption apply. Available in API versions `2026-10` and later. For streaming, tools / function calling, embeddings, images, or audio, use the Models API. See the [AI reference](https://developer.monday.com/api-reference/reference/ai).
</Callout>

# Supported capabilities

| Capability      | Endpoint                   | Notes                                                                                 |
| :-------------- | :------------------------- | :------------------------------------------------------------------------------------ |
| **Text / chat** | `POST /chat/completions`   | Streaming SSE, tools / function calling, JSON response modes—same concepts as OpenAI. |
| **Embeddings**  | `POST /embeddings`         | Text embeddings for search, RAG, and similarity.                                      |
| **Images**      | `POST /images/generations` | Image generation from a text prompt.                                                  |
| **Audio**       | `POST /audio/speech`       | Text-to-speech; response is binary audio (for example MP3).                           |

Together, these cover **text**, **embeddings**, **images**, and **audio** through one API.

# Chat model aliases (recommended)

For **`/chat/completions`**, pass one of the **`monday-*` aliases** instead of hard coding a vendor model ID whenever you can:

* `monday-fast` → `claude-haiku-4-5`
* `monday-standard` → `claude-sonnet-4-6` (also used when **`model` is omitted**)
* `monday-powerful` → `claude-opus-4-6`

**Why aliases:** They are **more stable** for your product. monday controls how each alias maps to an underlying model, so improvements (for example switching to a newer Sonnet) do not require you to redeploy new model strings everywhere. See [Supported models](https://developer.monday.com/api-reference/docs/models-api-supported-models#recommended-chat-model-aliases) and [Pricing and metering](https://developer.monday.com/api-reference/docs/models-api-overview#pricing-and-metering).

# Using official OpenAI SDKs

Point the client at the Models API base URL and use your monday token as the API key. The request and response types match what the OpenAI SDKs expect, so you can follow any tutorial written for OpenAI by swapping **base URL** and **API key**.

* **Full method list and parameters:** [OpenAI API reference](https://platform.openai.com/docs/api-reference)
* **Cookbook and patterns:** [OpenAI documentation](https://platform.openai.com/docs) — use the same request shapes; validate **model IDs** against [Supported models](https://developer.monday.com/api-reference/docs/models-api-supported-models) because not every OpenAI model name is available on the Models API.

> 👍 **Tip**
>
> Some OpenAI SDKs require an explicit `model` argument even when the upstream server has a default. When you must pass a value, use **`monday-standard`** (or another **`monday-*` alias**) rather than a raw vendor ID. If you rely on server-side defaults via REST, the Models API defaults to **`monday-standard`**.

# Behavior notes

A few practical differences from calling OpenAI directly are worth planning for:

* **Images:** Responses may return image data as `b64_json` rather than a hosted `url`—decode base64 in your app.
* **Errors:** Some HTTP errors (for example authentication failures) may use a platform-specific JSON shape instead of the OpenAI `error` object. Handle both raw HTTP failures and structured `error` bodies.
* **Models:** Unsupported model names can surface as generic upstream errors—prefer the [supported models](https://developer.monday.com/api-reference/docs/models-api-supported-models) list and pin explicit IDs in production.

# Metering

**There is no separate fee to use the Models API itself**. Usage draws down **monday AI tokens**, which are intended to approximate the cost of the underlying model to the best of our ability and may reflect a small additional cost depending on the model used. See [Pricing and metering](https://developer.monday.com/api-reference/docs/models-api-overview#pricing-and-metering) for details.

Check response headers (such as `x-monday-credits-used`) while integrating so your app can log or display usage consistently.

# See also

<Cards>
  <Card title="Models API overview" href="https://developer.monday.com/api-reference/docs/models-api-overview">
    Positioning, metering, pricing, and feature summary.
  </Card>
  <Card title="Models API supported models" href="https://developer.monday.com/api-reference/docs/models-api-supported-models">
    Model IDs, monday aliases, and defaults.
  </Card>
  <Card title="run_prompt (GraphQL)" href="https://developer.monday.com/api-reference/reference/ai">
    A simplified, GraphQL-native way to run single-turn chat completions.
  </Card>
</Cards>
