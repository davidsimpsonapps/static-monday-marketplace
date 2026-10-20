---
title: "monday.com reports resolved EU platform slowness and delayed automations"
date: 2026-10-20
topic: platform-status
lede: "monday.com posted two incidents on 19 October affecting the EU region: slow platform loading from 07:17 to 07:45 UTC, and delayed automations from 08:56 to 09:22 UTC. Both are resolved."
---

### Delayed automations in EU

Automations in the EU region were delayed because of congestion in the automation queue. The [incident](https://stspg.io/bkmxfjhsc55p) was rated major and affected the EU - Automations component. It started at 08:56 UTC and was marked resolved at 09:22 UTC.

### Slow loading of the platform

The [incident](https://stspg.io/9w1z6qg1080x) was rated minor and affected the EU - Platform component. It started at 07:17 UTC, a fix was implemented at 07:35 UTC, and it was resolved at 07:45 UTC.

### Healthcheck failures

During the platform slowness, the Board GraphQL API check on monday.com Infrastructure (EU) failed twice: from 07:24 to 07:25 UTC and from 07:26 to 07:34 UTC, about 9 minutes in total. See the [service status page](/status/) for details.
