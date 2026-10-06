---
updatedAt: 2026-02-25T16:45:02.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Manage your app's outbound communication

Enabling monday code networking provides developers with the following capabilities:

* **Static IPs:** monday code communicates with external services using a fixed range of IP addresses, allowing those services to permit traffic only from those known, trusted sources.
* **Network allowlist:** Developers can manage and restrict outbound traffic from the app’s backend. This feature allows you to define specific destination IP addresses, IP ranges, or domains the app can connect to, or block all outbound connections entirely.

These features help apps securely integrate with external APIs, databases, or third-party services by ensuring communication only with trusted destinations.

# Eligibility

To use static IPs and the allowlist, your app must have at least one active monday code deployment. This applies to both single and multi-region apps.

You can only activate monday code networking on your app’s **latest draft version**. Allowlist settings take effect from that version forward, so they won’t apply to older drafts or the current live version.

Allowlist changes are global and affect all deployments in all regions.

<Callout icon="❗️">
  Once networking is enabled, the allowlist is activated, and the latest draft version is promoted to live, any further changes to the allowlist (even in a draft version) will immediately apply to the live version.
</Callout>

# Concepts

## Static IPs

Once networking is enabled, monday code will communicate with external services using a fixed set of outbound IP addresses. These static IPs allow other services to securely interact with monday code.

| Name                 | IP Address     | Region               |
| -------------------- | -------------- | -------------------- |
| australia-southeast1 | 35.213.247.80  | australia-southeast1 |
| australia-southeast2 | 34.1.189.134   | australia-southeast2 |
| europe-west1         | 35.210.247.138 | europe-west1         |
| europe-west3         | 35.207.155.235 | europe-west3         |
| me-west1             | 34.0.65.191    | me-west1             |
| us-east1             | 35.211.88.68   | us-east1             |
| us-east4-1           | 35.212.43.200  | us-east4             |
| us-east4-2           | 35.212.78.240  | us-east4             |
| us-east4-3           | 35.212.47.254  | us-east4             |

## Network allowlist

Enabling monday code networking also enables you to configure a network allowlist. The allowlist specifies IP addresses, IP ranges, and domains where outgoing communication is approved. Connections on the list are allowed, while connections not on the list are blocked.

If the allowlist is activated and no destinations are added, all outbound communication will be blocked. You can manage destinations by adding, editing, or deleting them as needed.

<div style={{ backgroundColor: "#f1f9f5", borderLeft: "4px solid #08844c", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#08844c" }}>
  💡 monday.com resources are within the same network and will always be available.
</div>

### Inbound requests

The allowlist only controls outgoing communication. It does not affect inbound requests. To ensure integrations function properly, third-party domains or IP addresses must be added to the allowlist so your app can send data to them.

# Implementation

By enabling networking on your account, you can access **static IPs** and set up a **network allowlist**.

## Enable networking

Follow these steps to enable networking and access static IPs:

1. Open the relevant app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center).
2. Select your app's latest draft version, or create a new one.
3. Navigate to the **Host on monday** dropdown on the left-side menu and select **Networking**.
4. Click **Enable networking**.
5. Wait for the network settings configuration to finish. This may take up to five minutes. When it finishes, you will receive a green success message.
6. Once networking is enabled, you can access static IPs. Proceed to the next section to set up the network allowlist.

## Set up the allowlist

To enable and configure a monday code network allowlist:

1. After enabling networking, navigate to the *Networking* tab.
2. Toggle **Activate allowlist** on.

<Image align="center" border={true} width="700px" src="https://files.readme.io/02f9b0281230c0ec088ccfab2eac96c8c62f3dffc197f2863315a6068aba3e8f-Screenshot_2025-04-03_at_4.06.39_PM.png" className="border" />

7. Create new destinations for your approved IP addresses, IP ranges (CIDR format), and domains (FQDN format, no wildcards).

<div style={{ backgroundColor: "#fff8e1", borderLeft: "4px solid #fbc02d", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#f9a825" }}>
  🚧 Each destination and its description will eventually appear in your app's marketplace listing (for public apps only), so take care while naming and explaining them.
</div>

8. Click **Save**.
9. Once all relevant changes are made to the version, promote it to live.

# Troubleshooting and logging

Blocked outbound requests will appear as log messages. We recommend setting a short timeout for your external calls to help catch blocked attempts and their related errors. Ensure that your logging system is set up to capture and store these messages.
