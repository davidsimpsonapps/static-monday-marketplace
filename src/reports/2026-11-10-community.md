---
title: "monday.com adds 30-second refresh token grace period; old API tokens expire 7 days after migration"
date: 2026-11-10
topic: community
lede: "As part of its move to OAuth 2.1, monday.com now allows a refresh request to be retried within 30 seconds, and revokes the grant on later replays. API tokens migrated to OAuth stay valid for 7 days, then expire."
---

### Refresh token replays

monday.com announced on November 5 an update to how it handles refresh token replays. A refresh request can be retried safely within a 30-second grace period, which covers cases such as a network interruption or a dropped response.

After the grace period, any replay of a refresh token is treated as a potential security issue and the entire grant is automatically revoked. The user then needs to re-authorize.

monday.com advises developers to make sure their integration handles token refreshes properly, to retry quickly if a refresh request fails, and not to reuse a refresh token after it has been successfully exchanged.

*Source: monday.com in the monday developers community Slack*

### API token expiry after migration

In a second announcement, monday.com described the next step of the migration. After an API token is migrated to OAuth tokens through the migration endpoint, the original API token remains valid for 7 days and then expires. Calling the migration endpoint again does not extend that window.

Developers who have already migrated should confirm their integration has fully switched to the new OAuth access and refresh tokens, since the old API tokens will stop working soon. monday.com said more updates on the OAuth 2.1 migration are coming.

*Source: monday.com in the monday developers community Slack*
