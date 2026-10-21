---
title: "API add-on can now be bought from the analytics dashboard; complexity error codes documented"
date: 2026-10-21
topic: developer-docs
lede: "monday.com's docs now describe how to buy the API add-on to raise the daily call limit, with packages of 25K to 250K extra calls. The rate limits page also lists the specific error codes returned when complexity limits are hit."
---

### API add-on purchase

A new section in API analytics dashboard explains how to buy the add-on when an account exceeds its daily call limit. Accounts with dashboard access use **Extend limit**; accounts without access use **Get the add-on** on the restricted page. The purchase pop-up offers 25K to 250K extra daily API calls, and accounts needing more are told to contact monday.com.

The [rate limits](https://developer.monday.com/api-reference/docs/rate-limits) page now says the daily limit can be raised by purchasing the add-on, replacing the earlier wording about requesting an increase. The [platform API](https://developer.monday.com/api-reference/reference/platform-api), [developer center](https://developer.monday.com/api-reference/docs/the-developer-center) and [optimizing API usage](https://developer.monday.com/api-reference/docs/optimizing-api-usage) pages link to the new section.

### Complexity error codes

The [rate limits](https://developer.monday.com/api-reference/docs/rate-limits) page no longer refers only to `ComplexityException`. A single query above 5M complexity points returns `REQUEST_MAX_COMPLEXITY_EXCEEDED`; API version `2025-07` and earlier return `maxComplexityExceeded`. Exhausting a per-minute complexity budget returns `COMPLEXITY_BUDGET_EXHAUSTED`.
