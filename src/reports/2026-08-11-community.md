---
title: "monday-sdk-js 1.0.0-beta removes the server SDK, monday.api() and the itemIds event"
date: 2026-08-11
topic: community
lede: "monday.com has released v1.0.0-beta of `monday-sdk-js` with breaking changes: three long-deprecated features are removed, and from September 1, monday.com no longer supports issues with them."
---

Server-side GraphQL queries through `mondaySdk({ token })` no longer work; apps need to switch to the official `@mondaydotcomorg/api` package. The client-side `monday.api()` method is removed as well, with the same migration path. The legacy `monday.listen('itemIds')` event is also gone: filtered item IDs on a board now have to be fetched through the GraphQL API directly.

The removals had been signaled with deprecation warnings before the release. monday.com offered help with migrations until September 1.

*Source: monday.com in the monday developers community Slack*
