---
title: "Activity logs docs drop 90-day limit for board logs in version 2027-01"
date: 2026-11-05
topic: developer-docs
lede: "The docs for the `activity_logs` board query no longer say that, from API version `2027-01`, board activity logs are limited to the last 90 days. Requests for older data are no longer described as returning a validation error."
---

The [activity logs reference](https://developer.monday.com/api-reference/reference/activity-logs) still says `2027-01` adds more entities and cursor pagination. The `from` argument is now described as an ISO 8601 timestamp, without the 90-day maximum, and the example text no longer requires `FROM_TIMESTAMP` to fall within the last 90 days.

The comparison table between the earlier version and `2027-01` also appears to have been updated for `from` and `to`, but that part of the diff was truncated.

The [updates reference](https://developer.monday.com/api-reference/reference/updates) also changed, but the visible changes are formatting only.
