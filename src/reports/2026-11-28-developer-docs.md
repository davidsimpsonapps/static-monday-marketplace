---
title: "API-Version header to become required on all monday.com API requests"
date: 2026-11-28
topic: developer-docs
lede: "The API versioning docs now state that the `API-Version` header is required on every request. Calls without it still run on the default version today, but will later be rejected with an `API_VERSION_REQUIRED` error (HTTP `400`)."
---

The enforcement date has not been announced. Valid values are a version name such as `2026-10`, or `current` for the newest current version. A missing header or an invalid version string will be rejected.

The `@mondaydotcomorg/api` JS SDK always sends the header and accepts an `apiVersion` option to pin the version. The monday MCP server and the agent toolkit send it automatically, so no change is needed there.

See the [API versioning page](https://developer.monday.com/api-reference/docs/api-versioning) for details and examples.
