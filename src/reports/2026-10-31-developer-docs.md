---
title: "monday CLI adds `mapps code:delete` to remove monday code deployments"
date: 2026-10-31
topic: developer-docs
lede: "The monday apps CLI documentation now lists `mapps code:delete`, which permanently deletes an app's monday code deployments in all regions without deleting the app."
---

The deletion cannot be undone, but the app can be deployed again with `mapps code:push`. The command takes two flags: `-f` or `--force` skips the confirmation prompt, and `-i` or `--appId` sets the app's ID.

The example usage is `mapps code:delete -i <APP_ID>`. Details are on the [CLI documentation page](https://developer.monday.com/apps/docs/command-line-interface-cli).
