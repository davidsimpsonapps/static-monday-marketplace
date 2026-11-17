---
title: "Notetaker API docs add `dynamics` field; `items_page` items gain `description`"
date: 2026-11-17
topic: developer-docs
lede: "The `notetaker` reference now documents a `dynamics` field on meetings with speaker and turn-taking statistics, available in API versions `2027-01` and later. The `items_page` reference adds a `description` field to items."
---

The [notetaker reference](https://developer.monday.com/api-reference/reference/notetaker) includes a new example query selecting `dynamics` on a meeting. It returns `total_talk_time_seconds`, `turn_switches_per_minute`, `interruption_count`, `longest_monologue`, `silent_attendees` and `speaker_stats`. The per-speaker stats include `talk_time_seconds`, `talk_time_percentage` and `questions_asked`.

The [`items_page` other types reference](https://developer.monday.com/api-reference/reference/items-page-other-types) now lists a `description` field of type `ItemDescription` on the item type, described as the item's description.
