---
updatedAt: 2026-01-08T14:19:38.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Multi-region support

Learn how to deploy your monday code app to multiple data regions

monday.com and monday code data centers are located in four different regions: US (United States), EU (Europe), AU (Australia), and IL (Israel). Using the **multi-region feature**, public monday code apps can be deployed to all regions!

Doing so ensures that customer data remains within its region, helps apps maintain compliance with region‑specific regulations (e.g., GDPR), and reduces latency, all while eliminating the need for complex infrastructure setups across multiple jurisdictions.

# Eligibility

The multi‑region feature is available for **public monday code apps**.  If you have a private app, new deployments will default to the region assigned to your account. You can check which region you are in using these steps:

1. Open your monday account and click your profile picture in the top‑right corner.
2. Select **Administration**.
3. You will see the region listed under **General** > **Profile**.

<Image align="center" border={true} src="https://files.readme.io/f2f1668-Check_region_in_admin_tab.png" className="border" />

# Concepts

## For developers

App deployment regions will vary depending on whether the multi‑region feature is enabled. The table below explains the **behavior for app developers:**

| Multi‑region feature | Region                                        |
| :------------------- | :-------------------------------------------- |
| Disabled             | The region the developer's account is in      |
| Enabled              | US, EU, AU, IL (after individual deployments) |

<Callout icon="🚧" theme="warn">
  If you deployed before multi‑region support (August 2024), your app will be hosted on US servers. Enable multi‑region if you want to serve your app from another region.
</Callout>

## End users

End users will receive the app version most relevant to their region. The table below explains the **behavior for end users:**

| Multi‑region feature | Region                              |
| :------------------- | :---------------------------------- |
| Disabled             | The region the developer deploys to |
| Enabled              | The region customer's account is in |

# Implementation

To use the multi‑region feature, you must first enable it and then deploy your app individually to each region. Once enabled, the feature only impacts **new app deployments.**

If you have more than one app, you need to repeat the process for each one. If you don't deploy to each region individually, you won't be able to promote your version to live.

<Callout icon="❗️" theme="error">
  Once you enable the multi‑region feature and promote it to live, you can't disable it.
</Callout>

## Step 1: Create or open a draft version

The feature can only be enabled in a draft version, so [create a new one](https://developer.monday.com/apps/docs/app-versioning#create-a-new-version) or open an existing one!

## Step 2: Enable multi‑region support

1. Open the **General** monday code tab in the Developer Center.
2. Click **Enable multi‑region support.**
3. You will now see all four regions listed.

<Callout icon="🚧" theme="warn">
  If you're having issues enabling the multi-region feature, ensure your app:

  * Is [public](https://developer.monday.com/apps/docs/install-and-share-your-apps?utm_source=Dev+section#public-apps) (via the _Share_ tab)
  * Has at least [one deployment](https://developer.monday.com/apps/docs/quickstart-guide-for-monday-code) to monday code
</Callout>

## Step 3: Connect your app to monday code in each region

1. In the General tab, click **Connect to monday code** for either Europe or Australia.
2. [Deploy your app](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-appdeploy) using the region flag:

| Long flag  | Short flag | Description             | Accepted values        |
| :--------- | :--------- | :---------------------- | :--------------------- |
| `--region` | `-z`       | The region to deploy to | `eu`, `us`, `au`, `il` |

3. Repeat the process for each region.

```powershell
mapps code:push -i 1234567 -z au
```

## Step 4: Set your environment variables and secrets

Environment variables and secrets should be configured for each region. **Please note that alert policies are configured on the global level.**

### **Existing environment variables and secrets**

1. Click **Edit variable** or **Edit secret.**
2. Enter the value for all regions.
3. Click **Save.**

### **New environment variables and secrets**

1. Click **Add new variable** or **Add new secret.**
2. Enter the value for all regions.
3. Click **Save.**

## Step 5: Publish a new version

<Callout icon="🕒" theme="warn">
  **Temporary requirement for existing multi-region apps:**

  If your app already has **multi-region enabled**, then the **next** version you promote to live must also be deployed to the new **IL** region.

  This is a **one-time requirement per app** while we introduce the new IL region. After you’ve successfully promoted a version with an IL deployment, future versions can be promoted normally.

  Read more about the new region [here](https://developer.monday.com/apps/changelog/new-monday-code-hosting-region).
</Callout>

Once your app is ready to go, you can [promote your draft version to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live)!

**Note:** After promoting your app, you cannot disable the multi‑region feature.

# Client-side behavior

When your monday code app runs in a user's account, it receives a context object that includes the account’s region. You can use this information to determine which monday code deployment the app should communicate with.

## Determining the correct regional endpoint

You can use the URL provided by the app version metadata to retrieve the correct region-specific monday code hosting base URL. You don’t need to use context.region (e.g., use1, eu1, ap1) to manually determine the endpoint.

```javascript
const context = await monday.get("context");
const url = context.appVersion.mondayCodeHostingUrl;
```

This ensures that you don’t need to maintain region-mapping logic, your app continues to work if new regions are introduced, and requests always route to the correct deployment of your monday code backend.

## Example

```json
{
  "method": "get",
  "type": "context",
  "data": {
    "themeConfig": {}, // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "theme": "light", // or "dark" or "black"
    "account": {
      "id": "5"
    },
    "user": {
      "id": "28659824",
      "isAdmin": false,
      "isGuest": false,
      "isViewOnly": false,
      "countryCode": "US",
      "currentLanguage": "en",
      "timeFormat": "12H", // or 24H
      "timeZoneOffset": 2 // timezone offset based on GMT
    },
    "region": "use1", // availability zone ID
    "boardId": 4213911112, // unique board ID
    "boardIds": [ // list of connected boards
      4213911111
    ],
    "boardViewId": 122234064, // unique board view ID
    "viewMode": "mobile", // not available for item views
    "instanceId": 122234064, // unique instance ID for the feature on the board
    "instanceType": "board_view", // app feature type
    "mode": "mobile", 
    "app": {
      "id": 10089476,
      "clientId": "78643ruyagduyg743tyr812uygd74"
    },
    "appVersion": {
      "id": 10124592,
      "name": "Monday SDK Mobile Dev Playground",
      "status": "live",
      "type": "minor",
			"mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app", // used only for monday code apps; specifies the region-based hosting URL for server-side code
      "versionData": {
        "major": 1,
        "minor": 0,
        "patch": 0,
        "number": 31,
        "type": "major",
        "displayNumber": "v31"
      }
    },
    "appFeature": {
      "type": "AppFeatureBoardView",
      "name": "Monday SDK - board view"
    },
    "permissions": {
      "approvedScopes": [
        "me:read",
        "boards:read",
        "boards:write",
        "docs:read",
        "docs:write",
        "workspaces:read",
        "workspaces:write",
        "users:read",
        "users:write",
        "account:read",
        "notifications:write",
        "updates:read",
        "updates:write",
        "assets:read",
        "tags:read",
        "teams:read",
        "teams:write",
        "webhooks:write",
        "webhooks:read"
      ],
      "requiredScopes": [
        "me:read",
        "boards:read",
        "boards:write",
        "docs:read",
        "docs:write",
        "workspaces:read",
        "workspaces:write",
        "users:read",
        "users:write",
        "account:read",
        "notifications:write",
        "updates:read",
        "updates:write",
        "assets:read",
        "tags:read",
        "teams:read",
        "teams:write",
        "webhooks:write",
        "webhooks:read"
      ]
    }
  },
  "requestId": "ABCD"
}
```

<br />
