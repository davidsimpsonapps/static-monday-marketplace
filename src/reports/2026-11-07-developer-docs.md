---
title: "API release notes: app inputs change, CLI scheduler gains `il` region"
date: 2026-11-07
topic: developer-docs
lede: "The `create_app` and `update_app` mutations now take new `CreateAppInputV2` and `UpdateAppInputV2` types, and the old input types are removed. The `mapps scheduler` commands now accept the `il` region."
---

### API release notes

The [release notes](https://developer.monday.com/api-reference/docs/release-notes) say the `input` argument of `create_app` is now `CreateAppInputV2!` (previously `CreateAppInput!`). The `input` argument of `update_app` is now `UpdateAppInputV2!` (previously `UpdateAppInput!`). The old input types are removed, so queries that declare a variable with them need updating.

The `permissions` field on the new inputs is `[String!]` (previously `[AppPermission!]`), so permission scopes are passed as strings. The `AppPermission` enum is no longer used by any app input.

The note on `Board.activity_logs` no longer states that `from` can be at most 90 days ago. The `subscribers` field on the `Agent` type now lists an editor role alongside owner and member.

### CLI

The [CLI documentation](https://developer.monday.com/apps/docs/command-line-interface-cli) now lists `il` as a region (`-z`, `--region`) for the `mapps scheduler:create`, `scheduler:delete` and `scheduler:run` commands, in addition to `us`, `au` and `eu`. The `mapps scheduler:list` command now documents a `--region` flag.

### Rate limits and idempotency

The [rate limits](https://developer.monday.com/api-reference/docs/rate-limits) and [API usage](https://developer.monday.com/api-reference/docs/optimizing-api-usage) pages were reworded. The API usage page now says the API stores a successful response and replays it on retry when an `Idempotency-Key` header is used.

The pages on [idempotency](https://developer.monday.com/api-reference/docs/idempotency), [quotas and limits](https://developer.monday.com/apps/docs/quotas-and-limits), [multi-region](https://developer.monday.com/apps/docs/multi-region-feature), [scheduling cron jobs](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code), the [JavaScript SDK](https://developer.monday.com/api-reference/docs/javascript-sdk), [MCP clients](https://developer.monday.com/api-reference/docs/compatible-mcp-clients) and the [notetaker reference](https://developer.monday.com/api-reference/reference/notetaker) also changed, but the details were not available.
