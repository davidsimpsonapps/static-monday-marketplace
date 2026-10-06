---
updatedAt: 2026-02-04T16:15:52.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Migration guide

As part of the [migration of automation features](https://developer.monday.com/apps/docs/automation-features-migration-overview), we've built a migration wizard to make the process as seamless as possible.

It automatically converts:

* Field Types → Field for automation block or Credentials feature
* Blocks (Actions and Triggers) → Automation block
* Recipe Templates → Automation template

This guide walks you through migrating your *Integration for sentence builder* app feature to the new monday workflows infrastructure using the wizard.

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=tmaCAVWa5ZY" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FtmaCAVWa5ZY%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DtmaCAVWa5ZY%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FtmaCAVWa5ZY%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=tmaCAVWa5ZY" providerUrl="https://www.youtube.com/" providerName="YouTube" />

# How to migrate

## Prerequisites

Before starting, make sure:

* Your app has at least one *Integration for sentence builder* feature
* You’ve created a draft app version (migration cannot run on live versions)

## Step 1: Access the migration wizard

1. Open the Developer Center.
2. Select the relevant app.
3. Under *Build*, click **Features**.
4. Locate the *Integration for sentence builder* feature(s) you want to migrate.
5. Click **Start migration**. This opens a migration modal.

## Step 2: Confirm migration details

In the migration modal, you’ll see a list of all feature instances that will be migrated, including their name and type (field types, blocks, and recipes).

Each instance will be migrated into its own independent app feature in the new infrastructure. After migration, you can delete any redundant migrated features if needed.

<Image align="center" border={true} width="500px" src="https://files.readme.io/2d5faec3e7850cceb2d80742c70eb19d169fd77fb2f7a197b45803a043c50583-Screenshot_2026-01-13_at_4.08.39_PM.png" className="border" />

Review the list carefully, then continue.

## Step 3: Start the migration

Click **Start Migration** to initiate the process.

The migration runs asynchronously. While it’s in progress, we recommend waiting until it completes before continuing to work on your app.

## Step 4: Review results

<Image align="center" border={true} width="700px" src="https://files.readme.io/f7f94bd703e2cbf588c7e3f6681c02ab2ea30a3a183154740c8846687a2d8f38-Automations_Features_Migration_Completion.png" className="border" />

When the migration completes:

* A completion banner appears
* The feature label changes to *Migrated*

### View migration details

1. Click **Migrated** to open the feature migration details.

<Image align="center" border={true} src="https://files.readme.io/c80907386d9d2fb28a1b61d094bad451a63fe3e699683f3dc32272f54cdf070f-Screenshot_2026-01-13_at_4.15.21_PM.png" className="border" />

2. Review the details on the modal. Each component from your integration is listed, along with its migration status.

| Status    | Description                 | Next Steps                               |
| :-------- | :-------------------------- | :--------------------------------------- |
| *Success* | Block successfully migrated | Click **Review** to view the new feature |
| *Failed*  | An error occurred           | Review the error details and retry       |

### Deprecated API payload mode

Migrated features use a compatibility mode called "Uses deprecated API payload" to avoid requiring immediate backend changes.

When this flag is enabled, your *Automation blocks* and *Field for automation blocks* continue to receive the legacy payload format.

<Image align="center" border={true} width="600px" src="https://files.readme.io/61a20e33ecacf7d06caba5e7da657a264a427b531ce0d8775db58501ac5f4b1e-Screenshot_2026-01-26_at_2.41.25_PM.png" className="border" />

This allows your existing backend implementation to keep working immediately after migration, without requiring changes upfront.

#### **Limitations**

Blocks operating with this flag enabled may experience:

* **Slower execution:** Additional processing overhead is required to transform payloads between formats
* **Limited support for new features:** Some new capabilities in monday workflows may not be available when using the deprecated payload
* **Potential edge case issues:** Certain behaviors from the legacy infrastructure may not translate perfectly to the new workflows infrastructure

#### **Recommended action**

We strongly recommend disabling this flag and updating your backend to support the new API payload format.

1. Open your migrated *Automation block* or *Field for automation block* in the Developer Center.
2. Uncheck **Uses deprecated API payload**.
3. Test the block and review the new payload format.
4. Update your backend endpoints to handle the new format.

## Step 5: Test your blocks

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=D8fpiqigVEw" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FD8fpiqigVEw%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DD8fpiqigVEw%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FD8fpiqigVEw%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=D8fpiqigVEw" providerUrl="https://www.youtube.com/" providerName="YouTube" />

After migration, test your migrated blocks before publishing:

* Verify that the new features appear in the Automation Builder
* Configure automations using your migrated blocks
* Trigger the automations and confirm your backend behaves as expected

See the [Test your blocks](https://developer.monday.com/apps/docs/test-your-blocks) guide for detailed testing steps.

## Re-migrate app features

You can re-run the migration at any time to:

* Sync changes to your original *Integration for Sentence Builder* feature
* Retry entities that previously failed
* Reset migrated features to their original state

Re-running the migration overwrites any changes you've made. If you've manually edited a migrated *Automation block* or *Field for automation block*, those changes will be replaced with the configuration from the original Integration for Sentence Builder.

### How to re-run the migration

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=NPXG7Rq7MYc" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FNPXG7Rq7MYc%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DNPXG7Rq7MYc%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FNPXG7Rq7MYc%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=NPXG7Rq7MYc" providerUrl="https://www.youtube.com/" providerName="YouTube" />

1. Locate the original *Integration for sentence builder* feature.
2. Click the **three-dot menu** on the right side.
3. Select **Migrate to new features**.
4. Review the migration details and click **Start migration**.

# Troubleshooting

## Walk-through video

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=z7cTlBLUSy0" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fz7cTlBLUSy0%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dz7cTlBLUSy0%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fz7cTlBLUSy0%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22640%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=z7cTlBLUSy0" providerUrl="https://www.youtube.com/" providerName="YouTube" />

## Error details

| Error Type          | Description                                     | Action                                                                                                                                                                 |
| :------------------ | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retryable           | A temporary failure (e.g., network, timing)     | Click **Retry**.                                                                                                                                                       |
| Data Issue          | Configuration problem in the source data        | Fix the issue and retry.                                                                                                                                               |
| Unsupported Feature | Feature not supported in the new infrastructure | Manual configuration required (e.g., [Authorization URL](https://developer.monday.com/apps/docs/authorization-url-migration-guide)).                                   |
| Internal Error      | An unexpected system error                      | Wait before retrying the migration. If the error persists, contact our [support team](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962). |

<br />
