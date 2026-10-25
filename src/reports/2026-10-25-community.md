---
title: "monday.com orders Node.js security patch for marketplace apps by 4:30 PM ET on October 24"
date: 2026-10-25
topic: community
lede: "monday.com told marketplace app developers to upgrade Node.js and resubmit affected apps by October 24, 2026, 4:30 PM ET, citing high-severity vulnerability CVE-2026-111497 in the Brotli decoder bundled with Node.js. Unpatched apps may be disabled."
---

The Node.js project announced a security release for the vulnerability on October 21, 2026. monday.com says the requirement applies to developers who received an email or use older Node.js versions. The notice gave a window of four hours.

For each affected app, monday.com asks developers to upgrade to Node.js 22.23.4, 24.22.1 or 26.12.1, or a later version. They then need to rebuild and redeploy the app and submit the updated version to the Marketplace. If an app bundles a separate Brotli decoder, it should be updated to 1.0.10, 1.1.1 or 1.2.1, whichever applies.

Developers must notify monday.com in writing through a form (wkf.ms/4ylQy7w) once remediation is complete. Developers who already patched an app should submit the updated version and confirm through the same form with the app's name and ID.

The same form is for developers who believe a listed app does not use Node.js and does not bundle a separate Brotli decoder, or who have an app that the message does not list. monday.com asks that questions go through the form rather than by replying to the email.

Apps not patched and resubmitted by the deadline may be disabled. monday.com also reserves the right to disable an app before the deadline if it decides this is necessary to protect the security, integrity or stability of the platform, safeguard customer data, or prevent security risks or harm to customers.

The official Node.js advisory, titled "October 21, 2026 security releases", has further details on the vulnerability and fixes.

*Source: monday.com in the monday developers community Slack*
