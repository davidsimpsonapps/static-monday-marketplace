---
title: "API 2027-04 release candidate adds nullable Board.creator and Asset.uploaded_by"
date: 2026-11-06
topic: developer-docs
lede: "The release notes now list a `2027-04` release candidate. `Board.creator` and `Asset.uploaded_by` become nullable and return `null` when the user can't be resolved. The version becomes current on April 1, 2027 and may still change."
---

### API version 2027-04

Both fields change from `User!` to `User`. Clients that assumed a value is always present need to handle `null`. See the [release notes](https://developer.monday.com/api-reference/docs/release-notes).

The release notes also point the `include_project_board_link` input and the `create_board_export` mutation to new pages. Board export has new reference pages: [board export](https://developer.monday.com/api-reference/reference/board-export), [API reference](https://developer.monday.com/api-reference/reference/board-export-api-reference) and [other types](https://developer.monday.com/api-reference/reference/board-export-other-types).

### Custom agents

The [Build on monday with AI](https://developer.monday.com/api-reference/docs/build-on-monday-with-ai) page now says custom webhook agents can also be triggered by chat. The agent should acknowledge the webhook, then reply in chat with `send_custom_agent_message` using `payload.conversationId`. A new page, [Connect a custom agent](https://developer.monday.com/api-reference/docs/connect-a-custom-agent), was added, and [Build an external agent](https://developer.monday.com/api-reference/docs/build-an-external-agent) was updated.

### Models API

On the [supported models](https://developer.monday.com/api-reference/docs/models-api-supported-models) page, `gpt-5.6-sol` and `gpt-5.6-luna` were added to the text models. `gpt-image-2` is now the only supported image model and the default when `model` is omitted. `dall-e-3`, `dall-e-2` and `gpt-image-1` are no longer listed. Listed sizes are now `1024x1024`, `1024x1536`, `1536x1024` and `auto`.

### JavaScript SDK

The [JavaScript SDK](https://developer.monday.com/api-reference/docs/javascript-sdk) page lists `@mondaydotcomorg/api` version 14.3.1, up from 14.0.0. It also clarifies that the `T` type parameter of the `SeamlessApiClient` request describes the whole host reply, so boards are at `res.data.data.boards`.

### Other pages

A new guide, [migrating the user entity to 2026-10](https://developer.monday.com/api-reference/docs/migrating-user-entity-to-2026-10), was added. These pages were also modified, but details were not available: [board views](https://developer.monday.com/api-reference/reference/board-views), [board views other types](https://developer.monday.com/api-reference/reference/board-views-other-types), [boards](https://developer.monday.com/api-reference/reference/boards), [boards other types](https://developer.monday.com/api-reference/reference/boards-other-types), [notetaker](https://developer.monday.com/api-reference/reference/notetaker), [search](https://developer.monday.com/api-reference/reference/search) and [migrating to the new OAuth flow](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow).
