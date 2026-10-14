---
title: "`2027-01` release candidate changes `Board.activity_logs` to cursor pagination"
date: 2026-10-14
topic: developer-docs
lede: "The `2027-01` API release notes list a breaking change: `Board.activity_logs` now returns a `BoardActivityLogsPage` with `logs` and `cursor`, and the `page` argument is removed. New filter arguments were also added."
---

### Breaking changes

`Board.activity_logs` returns a `BoardActivityLogsPage` instead of a list of `ActivityLogType`. Select entries under `logs` and read `cursor` to fetch the next page. Pagination now uses the new `cursor` argument.

The `from` and `to` arguments are now `String` (previously `ISO8601DateTime`). `from` can be at most 90 days ago; older requests return a validation error. `column_ids` and `group_ids` are now `[ID!]` (previously `[String]`). The `limit` argument no longer declares a schema default of 25; it accepts 1-1000 and the documented default is still 25.

### New arguments

`Board.activity_logs` gains `event_types`, `correlation_ids`, `cursor` and `search`. They filter by event type or correlation ID, page with a cursor, and prefix-search item names.

The notes say `2027-01` is a release candidate and may still change before it becomes the current version on January 15, 2027. See the [release notes](https://developer.monday.com/api-reference/docs/release-notes).
