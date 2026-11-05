---
title: "monday code scheduler works in IL region although it is not officially enabled"
date: 2026-11-05
topic: community
lede: "An app developer reports that scheduler jobs run in monday code's IL (Israel) region, even though the docs say the scheduler is unsupported there. A monday.com representative said the feature is technically still disabled in monday code."
---

An app developer said on November 4 that scheduler jobs are confirmed working in the IL region. The developer did not know how long that has been the case, and noted that the [documentation](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code#:~:text=The%20scheduler%20is%20not%20supported%20in%20the%20new%20IL%20region) still states the scheduler is not supported in IL.

The monday apps framework changelog entry of January 8, 2026 introduced IL as the fourth monday code hosting region, alongside the US, AUS and EU. It says the scheduler is not supported there, and tells developers whose apps rely on scheduled jobs to plan their regional logic accordingly. It also makes deployment to IL mandatory for multi-region apps when promoting a version to Live.

Another developer pointed to Google's documentation: Google launched Cloud Scheduler support in the Tel Aviv (`me-west1`) region on April 17, 2026. monday code runs on Google Cloud.

A monday.com representative confirmed this in the thread. The feature was added in Google Cloud in April, but in monday code it is technically still disabled, and the reporting developer is the first user of the scheduler in the IL region in monday code.

No official change to the documentation or to scheduler support in IL was announced. Until that happens, the documented guidance to handle the lack of scheduler support in IL still stands.

*Source: monday.com and app developers in the monday developers community Slack*
