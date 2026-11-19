---
title: "Trial extension bug fixed; webhooks still reported without Authorization header"
date: 2026-11-19
topic: community
lede: "monday.com says a bug that made trial extension requests fail on November 18 is resolved. Separately, app developers report that some webhooks are still delivered without the `Authorization` header, an issue first raised in early September."
---

### Trial extensions failed for cross-region accounts

An app developer reported that extending a trial failed with the error "Failed to extend account trial period". monday.com replied that between about 08:30 and 13:00 UTC on November 18, a bug in its cross-regional infrastructure affected all trial extension requests where the developer account is in a different region than the customer's account. monday.com says the issue is now resolved.

*Source: monday.com in the monday developers community Slack*

### Webhooks reported without Authorization header

An app developer first reported on September 2 that automation blocks on their development system were triggered by webhooks arriving without the `Authorization` header, and asked why the header would be missing. Later replies from other developers described the same problem, and one asked for a way to migrate.

On November 18, an app developer said some of their users with old webhooks are still affected and asked whether another developer had been able to migrate theirs. The thread shows no confirmed cause or fix.

*Source: an app developer in the monday developers community Slack*
