---
title: "API version 2027-01 changes board activity logs, adds view pinning and a new column function"
date: 2026-11-01
topic: developer-docs
lede: "Documentation updates describe changes arriving in API version `2027-01`, including cursor-paginated board `activity_logs` limited to 90 days, `is_pinned` on board views, and a `UNIQUE_VALUES` column function. Two new pages cover dependencies."
---

### Board activity logs

From `2027-01`, board activity logs include more entities, return only events from the last 90 days, and use cursor pagination instead of `page`. Requests for older data return a validation error. The [activity logs page](https://developer.monday.com/api-reference/reference/activity-logs) now documents a separate query for `2027-01` and later. It returns a `BoardActivityLogsPage` with `logs` and a `cursor`, which is `null` when no pages remain. New arguments include `column_ids`, `correlation_ids`, `cursor` and `event_types`. The docs also list `boards:read` as the required scope.

### Board views

The [board views page](https://developer.monday.com/api-reference/reference/board-views) adds an `is_pinned` field, available in `2027-01` and later. Views can also be pinned or unpinned for all board members through an `is_pinned` argument on the update mutation, which requires board owner or admin permissions.

### Column and subscription types

The [column types page](https://developer.monday.com/api-reference/reference/columns-other-types) adds `UNIQUE_VALUES` to the column calculation functions in `2027-01` and later. On the [app subscriptions types page](https://developer.monday.com/api-reference/reference/app-subscriptions-other-types), a discount value changes from `Int!` to `Float!` in `2027-01` and later, marked as a breaking change.

### Other changes

The [`ask_developer_docs` page](https://developer.monday.com/api-reference/reference/ask-developer-docs) adds a `retrieval_only` boolean argument, available in `2026-10` and later. When `true`, it returns relevant documentation content without summarization.

New pages were added for [dependencies](https://developer.monday.com/api-reference/reference/dependencies) and [dependencies types](https://developer.monday.com/api-reference/reference/dependencies-other-types). The [API versioning](https://developer.monday.com/api-reference/docs/api-versioning) and [release notes](https://developer.monday.com/api-reference/docs/release-notes) pages also changed, as did the reference pages for boards, items, items page, docs, files, search and assets. Details of those changes were not available.
