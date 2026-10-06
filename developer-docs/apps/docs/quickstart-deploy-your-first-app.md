---
updatedAt: 2026-01-22T20:44:26.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Quickstart: Deploy your first app to monday code

This quickstart guide will walk through the steps required to host an app on monday code.

This quickstart guide will walk you through deploying your first server-side app using monday code.

# Prerequisites

* Node 18+
* npm

# Step 1: Install the monday code CLI

First, install the monday code [CLI](https://developer.monday.com/apps/docs/command-line-interface-cli) using npm:

```
npm install -g @mondaycom/apps-cli
```

# Step 2: Create an app feature and enable monday code

Each instance of monday code must be connected to an app. Create your app and integration feature:

1. Create a [new app](https://developer.monday.com/apps/docs/create-an-app#build-an-app).
2. Add a new [app feature](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
   1. Select **Integrations for sentence builder** and click **Next**.
   2. Choose the **Quickstart Integration - NodeJS** template.
   3. Check the box to automatically add any missing OAuth scopes.
   4. Ignore the scaffold command prompt. Instead, add a dummy URL: `https://myserver.com`.
   5. Click **Create**.
3. [Enable monday code](https://developer.monday.com/apps/docs/get-started#enable-the-feature) on your account. You must be an admin to do this step!

# Step 3: Deploy the app

## Clone our example app

Clone our example code or download it from [Github](https://github.com/mondaycom/welcome-apps/):

```shell
git clone https://github.com/mondaycom/welcome-apps.git
```

Change your working directory to `apps/quickstart-integrations-ts`:

```shell
apps/quickstart-integrations-ts
```

## Deploy the app

Use the CLI to deploy your app to monday code servers. Run the following command, then select the app and version you created in the previous step:

```shell
mapps code:push
```

The CLI will take a few minutes to deploy and build your app. You will see a success message when the process is complete.

## Set environment variables

Copy your app's *Signing Secret* from the **General settings** tab in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#general-settings).

Use the CLI to add your signing secret as the `MONDAY_SIGNING_SECRET` environment variable:

```shell
mapps code:env -m set -k MONDAY_SIGNING_SECRET -v &lt;your_signing_secret&gt;
```

# Step 4: Connect your integration feature to your app backend

The final step is to connect the app feature in monday to your backend.

1. Navigate to the [Features](https://developer.monday.com/apps/docs/the-developer-center#build) tab and select the relevant app feature.
2. In the *Feature deployment* section, select **Server-side code** from the dropdown.
3. Leave the subroute field empty.

<Image align="center" border={true} width="700px" src="https://files.readme.io/21198076cab354adf47c38d17f896d8ed688b1a038aaad2a9b60ac33caebdc72-monday-code-choose-deployument.png" className="border" />

# Step 5: See your integration app in action

Now, set up your integration on a monday board and see it work!

1. Create a new board.
2. Create two text columns.
3. Click **Integrate** to open the *Integrations Center* and locate your app.
4. Choose the template: **When\_Text column\_ changes, transform it *to* into *text column***.
5. Configure the fields of the recipe and click **Save**.
6. Add text to your input column. The text will be capitalized and automatically appear in the output column.

<Image align="center" border={true} width="700px" src="https://files.readme.io/c3d2aa8b9f896eef12ac519180bcf93c2aa91f7e9a8be94301efa4ed34f40f54-8d14c27991734e16a727fc42d42f0e0f07ee3916bbd8705bd1e19cd0abdcc1a2-Screenshot_2024-09-13_at_2.25.03_PM.png" className="border" />

<div style={{ backgroundColor: "#fff8e1", borderLeft: "4px solid #fbc02d", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#f9a825" }}>
  🚧 App not working? You can inspect incoming HTTP requests and error logs on the Host on monday > Logs page.
</div>
