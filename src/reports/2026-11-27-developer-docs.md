---
title: "Board history API and OAuth 2.1 docs added; OAuth 2.0 tokens end with API version 2027-04"
date: 2026-11-27
topic: developer-docs
lede: "monday.com documented the `items_history` and `aggregate_history` queries (API `2026-10`+) and published OAuth 2.1 guides. Starting with API version `2027-04`, only OAuth 2.1 tokens are accepted."
---

### Board history queries

New pages describe [board history](https://developer.monday.com/api-reference/reference/board-history), which reads a board's items as they were at past points in time. `items_history` returns item snapshots and `aggregate_history` returns aggregated values such as counts, sums or averages. Both take a list of ISO timestamps in `at_timestamps` and are only available in API versions `2026-10` and later.

The [other types](https://developer.monday.com/api-reference/reference/board-history-other-types) page covers the input and result types, including `ItemsHistoryQueryInput` and `ItemsHistoryResultSet`. `items_history` must be queried at the root, supports filtering, sorting and cursor pagination, and returns 50 items by default (max 500).

### OAuth 2.1

A new [OAuth 2.1](https://developer.monday.com/apps/docs/oauth-2-1) guide describes the flow now used by all new apps: PKCE with `S256` only, expiring access tokens, rotating single-use refresh tokens and token revocation. The token endpoint is `https://auth.monday.com/oauth_ms/oauth/token`.

The legacy flow now has its own page, [OAuth 2.0 (legacy)](https://developer.monday.com/apps/docs/oauth-2-0). Starting with API version `2027-04`, requests with OAuth 2.0 tokens return `401 Unauthorized` with the `OAUTH21_TOKEN_REQUIRED` error code.

The [migration guide](https://developer.monday.com/apps/docs/migrating-to-the-new-oauth-flow) was rewritten to cover moving stored tokens to OAuth 2.1 without asking users to reauthorize. [OAuth and Permissions](https://developer.monday.com/apps/docs/oauth) now covers only scopes, redirect URLs and multi-account users, and [Choosing auth](https://developer.monday.com/apps/docs/choosing-auth) points to the OAuth 2.1 endpoint.
