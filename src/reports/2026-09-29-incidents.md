---
title: "Webhooks created with app tokens lack the Authorization header"
date: 2026-09-29
topic: incidents
lede: "Since September 28, 11:19 UTC, newly created webhooks are sent without an Authorization header, and webhooks created through the API with an app token are created as regular webhooks. It is not resolved."
---

Because they are not created as app webhooks, users can edit and update them. The problem has been replicated in several accounts, including customer accounts, and reported to monday.com support (#5230446, #5231219). Apps that verify incoming webhook requests through the Authorization header are affected. The incident is tracked on the [incidents](/status/incidents/) page.
