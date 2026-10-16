---
title: "JavaScript SDK docs update SeamlessApiClient options and add error policies"
date: 2026-10-16
topic: developer-docs
lede: "The `SeamlessApiClient` documentation now describes a constructor `options.errorPolicy` setting (from SDK 14.3.0) and a changed `request()` signature that takes an `options` object. The documented response shape also changed."
---

The [JavaScript SDK page](https://developer.monday.com/api-reference/docs/javascript-sdk) now lists the constructor as `new SeamlessApiClient(apiVersion?, options?)`. The new `options.errorPolicy` accepts `'none'`, `'ignore'` or `'all'`, defaults to `'none'`, and controls what happens when the API replies with GraphQL errors. It is available from 14.3.0.

`client.request<T>(query, variables?, options?)` now takes per-request settings in an `options` object: `versionOverride` (replacing `version`), `timeoutMs` (replacing `timeout`, default 60000), `headers` and `idempotencyKey`. monday.com forwards only allowlisted headers and drops the rest. `idempotencyKey` is sent as the `Idempotency-Key` header.

The example now reads boards from `res.data.data.boards` instead of destructuring `boards` directly from the result.
