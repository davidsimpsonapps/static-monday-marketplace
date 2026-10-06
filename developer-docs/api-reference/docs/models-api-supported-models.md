---
updatedAt: 2026-09-06T08:33:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Models API supported models

Model IDs available on the Models API for chat, embeddings, image generation, and text-to-speech—grouped by endpoint with their vendor.

# Overview

Pass these **`model`** values to the OpenAI-compatible endpoints (`/chat/completions`, `/embeddings`, `/images/generations`, `/audio/speech`).

**Pricing:** Usage is billed in **monday AI tokens**, which are intended to approximate the cost of the underlying model to the best of our ability and may reflect a small additional cost depending on the model used. See [Pricing and metering](https://developer.monday.com/api-reference/docs/models-api-overview#pricing-and-metering) on the overview for details.

# Recommended chat model aliases

For **`POST /chat/completions`**, we **recommend** always passing one of these aliases instead of a raw vendor model ID. Aliases are **more stable**: monday can change which underlying model powers each tier (fast, standard, powerful) without you renaming models in every app.

| Alias             | Resolves to         | Notes                                              |
| :---------------- | :------------------ | :------------------------------------------------- |
| `monday-fast`     | `claude-haiku-4-5`  | Fast, cost efficient tier                          |
| `monday-standard` | `claude-sonnet-4-6` | **Default** when you omit `model` from the request |
| `monday-powerful` | `claude-opus-4-6`   | Highest capability tier                            |

You can still pass any supported **direct** Claude or OpenAI ID from the tables below; see the [overview](https://developer.monday.com/api-reference/docs/models-api-overview#pricing-and-metering) for how usage is metered.

# Text and chat (`/chat/completions`)

| Model ID            | Vendor    |
| :------------------ | :-------- |
| `gpt-4o`            | OpenAI    |
| `gpt-4o-mini`       | OpenAI    |
| `gpt-4.1`           | OpenAI    |
| `gpt-4.1-mini`      | OpenAI    |
| `gpt-4.1-nano`      | OpenAI    |
| `gpt-5`             | OpenAI    |
| `gpt-5-mini`        | OpenAI    |
| `gpt-5-nano`        | OpenAI    |
| `claude-opus-4-6`   | Anthropic |
| `claude-opus-4-5`   | Anthropic |
| `claude-sonnet-4-6` | Anthropic |
| `claude-sonnet-4-5` | Anthropic |
| `claude-sonnet-4`   | Anthropic |
| `claude-haiku-4-5`  | Anthropic |
| `claude-3-7-sonnet` | Anthropic |
| `claude-3-5-sonnet` | Anthropic |
| `claude-3-haiku`    | Anthropic |

# Embeddings (`/embeddings`)

| Model ID                 | Vendor |
| :----------------------- | :----- |
| `text-embedding-3-large` | OpenAI |
| `text-embedding-ada-002` | OpenAI |

# Image generation (`/images/generations`)

## Models

| Model ID      | Vendor |
| :------------ | :----- |
| `dall-e-3`    | OpenAI |
| `dall-e-2`    | OpenAI |
| `gpt-image-1` | OpenAI |

## Typical `size` values

Exact availability depends on the model; common values include:

| `size` values (reference)                  |
| :----------------------------------------- |
| `256x256`, `512x512`, `1024x1024`          |
| `1024x1792`, `1792x1024` (where supported) |
| `auto` (where supported for a given model) |

Validate sizes in your integration against live API behavior—unsupported combinations may return an error with no usage charged.

# Text-to-speech (`/audio/speech`)

| Model ID          | Vendor |
| :---------------- | :----- |
| `tts-1`           | OpenAI |
| `tts-1-hd`        | OpenAI |
| `gpt-4o-mini-tts` | OpenAI |
| `gpt-4o-tts`      | OpenAI |

Voices and audio formats follow the same parameter names as the [OpenAI Speech API](https://platform.openai.com/docs/api-reference/audio/createSpeech) (for example `voice`, `response_format`, `speed`).

# Defaults

If you omit `model` on **`/chat/completions`**, the Models API uses **`monday-standard`**, which resolves to **`claude-sonnet-4-6`**. For other endpoints, defaults vary; prefer **setting `model` explicitly** in production so upgrades to defaults never change your app behavior unexpectedly.

# See also

<Cards>
  <Card title="Models API overview" href="https://developer.monday.com/api-reference/docs/models-api-overview">
    Positioning, metering, pricing, and feature summary.
  </Card>

  <Card title="Getting started with the Models API" href="https://developer.monday.com/api-reference/docs/getting-started-with-the-models-api">
    API token, base URL, capabilities, aliases, and first request.
  </Card>
</Cards>
