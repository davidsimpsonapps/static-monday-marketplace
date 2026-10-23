---
title: "MCP public client docs add Client ID Metadata Document registration option"
date: 2026-10-23
topic: developer-docs
lede: "The guide to making an MCP integration publicly available now describes two ways to register a client: Client ID Metadata Documents (CIMD), which it recommends, and dynamic client registration (DCR)."
---

The [updated page](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration) previously covered only DCR. Step 1 is now "Register your client", with CIMD as Option A. The `client_id` is the HTTPS URL of a metadata document you host, so no registration call is needed. monday.com advertises support with `client_id_metadata_document_supported: true` in its authorization server metadata.

monday.com accepts only public clients through CIMD. The document must support the `none` token endpoint auth method and contain no secret, and the client must use PKCE with `S256`. The `client_id` URL must use the default HTTPS port and have no query string.

The page also no longer mentions admin approval of redirect URIs in its summary. It still says admins approve additional connections.
