---
updatedAt: 2025-12-02T19:27:40.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)
