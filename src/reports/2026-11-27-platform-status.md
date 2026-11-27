---
title: "Third-party apps degraded for 18 minutes; US and EU infrastructure checks failed"
date: 2026-11-27
topic: platform-status
lede: "monday.com reported degraded performance for third-party apps in the AUS, EU, IL and US regions from 13:15 to 13:33 UTC on 26 November. It is resolved. Infrastructure checks in the US and EU also failed."
---

The [status page incident](https://stspg.io/lnwgrd3bzjq4) was rated minor. At 13:27 UTC monday.com said it had identified the issue, at 13:30 it implemented a fix, and at 13:33 it marked it resolved.

Healthchecks for US infrastructure were unhealthy from 12:46 to 13:29 UTC (43 minutes). EU checks failed from 13:05 to 13:30 UTC (25 minutes). In both regions the failing checks were Board GraphQL API, Board Items GraphQL API, Filtered Board Items GraphQL API, Monday Code (Google Cloud Run), Secure Storage API (Hashicorp Vault) and Storage API (DynamoDB).

Current state: [service status](/status/).
