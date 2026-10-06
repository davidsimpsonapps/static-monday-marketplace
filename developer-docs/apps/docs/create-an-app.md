---
updatedAt: 2026-01-30T16:01:52.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Create an app

Learn how to create an app in the Developer Center

The monday apps framework enables you to build powerful, integrated user experiences within the monday.com platform. With it, you can:

* Add custom interfaces to modify data in monday.com boards
* Build reusable blocks for integrations
* Pipe visualizations from internal tools into monday.com
* Automate workflows or extend platform functionality using AI or custom data objects

monday.com apps are made up of app features—the foundational building blocks provided by the framework. Creating app features involves defining their functionality, user interface (if applicable), and how they integrate with monday.com.

# General development workflow

Although every development path is unique, most apps follow these core steps:

## 1. Conceptualize

Start by defining your app's purpose:

* What should it do?
* What data will it access or modify?
* How will users interact with it?

## 2. Select an app feature type

Choose the relevant [app feature type](https://developer.monday.com/apps/docs/intro#what-type-of-app-features-can-i-build) based on how your app interacts with monday.com. Feature types define where your app appears in monday.com and how it behaves.

## 3. Configure in the Developer Center

[Create and configure your app](https://developer.monday.com/apps/docs/create-an-app#creating-an-app-in-the-developer-center) and its features in the Developer Center. This includes configuring the app's general settings, feature-specific settings, and permissions/scopes.

## 4. Frontend development

For UI app features, you can build your UI using HTML, CSS, JavaScript, or any frontend framework. Use [`monday-sdk-js`](https://developer.monday.com/apps/docs/introduction-to-the-sdk) to get context, call the API, listen to events, and execute platform actions. Check out the example below for a basic board view HTML structure.

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Board View</title>
  <script src="https://cdn.jsdelivr.net/npm/monday-sdk-js/dist/main.js"></script>
</head>
<body>
  <h1>Board Data Will Go Here</h1>
  <div id="boardName"></div>
  <script>
    const monday = mondaySdk();
    monday.get('context').then(res => {
      if (res.data.boardId) {
        monday.api(`query { boards(ids: ${res.data.boardId}) { name } }`)
          .then(apiRes => {
            document.getElementById('boardName').innerText = apiRes.data.boards[0].name;
          });
      }
    });
  </script>
</body>
</html>
```

## 5. Backend development

For app features like integrations, or if your frontend needs server-side support, you need to:

* Implement logic to handle trigger and action requests from monday.com (e.g., action runs for an integration)
* Use OAuth 2.0 for secure API access
* Communicate with external services and process data

## 6. Test thoroughly

Be sure to test your feature in different environments, user roles, and scenarios to ensure a seamless user experience.

# Implementation

## Create an app in the Developer Center

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Click **Create app**.
3. Enter a unique app name and [slug](https://developer.monday.com/apps/docs/app-and-feature-slugs).
4. Click **Create app**.

<Image align="center" border={true} width="500px" src="https://files.readme.io/fbb2a6ab44181fdcc6bb7ade8f5d3e573086fff82535f3b9baeedbf90d5293bf-Screenshot_2026-01-26_at_4.07.38_PM.png" className="border" />

## Add an app feature in the Developer Center

After creating your app:

1. Navigate to the *Build* tab.
2. Select **Features**.
3. Click **Create feature**.
4. Choose your desired app feature and click **Create**.

<Image align="center" border={true} src="https://files.readme.io/0437018841944d152b4236208c009014803183209a9a80e7ec439445feb78ace-Screenshot_2025-06-23_at_7.12.09_PM.png" className="border" />
