---
title: "Free plan daily API call limit set at 200, down from a shared 1,000"
date: 2026-10-29
topic: developer-docs
lede: "The rate limits page now lists a separate daily call limit of 200 for the Free plan. Free previously shared a 1,000-call limit with Standard and Basic."
---

The [rate limits page](https://developer.monday.com/api-reference/docs/rate-limits) now splits the daily call limit table into four rows. Free is 200 calls, Standard/Basic is 1,000, Pro/Trial is 10,000 and Enterprise is 25,000. The limit resets at midnight UTC.

Trial accounts are now listed together with Pro at 10,000 calls. Previously, only Pro was named in that row. The Enterprise limit is unchanged. Exceeding the limit returns a `DAILY_LIMIT_EXCEEDED` error.

Apps used on Free accounts may reach the daily limit sooner than before.
