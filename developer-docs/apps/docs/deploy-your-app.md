---
updatedAt: 2025-10-23T05:04:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Deploy your app

After creating an app and adding features in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center), you need to deploy your code and connect it to the features to activate their functionality on the monday.com platform.

You can either deploy your code to monday.com's infrastructure (recommended) or provide a URL to externally hosted code.

# Deployment options

There are multiple ways to deploy your code depending on where it runs (client-side or server-side) and where it’s hosted.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Where code runs
      </th>

      <th>
        Deployment options
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client-side (in the browser)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom) (recommended)<br />• [Upload as a Zip file](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-zip-file) (will eventually be deprecated)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>

    <tr>
      <td>
        Server-side (on a server)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#server-side-code-via-cli-monday-code) (recommended)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>
  </tbody>
</Table>

## Client-side code via CLI (monday.com)

The recommended way to deploy client-side code to monday.com's infrastructure is through the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). It allows you to automate your deployment flow and integrate with your CI/CD tools.

For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

```shell Terminal
$ mapps code:push --client-side -d <PROJECT DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH> 
```

## Client-side code via Zip file

You can also upload your client-side code to monday.com's infrastructure as a `.zip` file.

<div style={{ backgroundColor: "rgba(255, 236, 164, 0.4)", border: "1px solid #FBC02D", padding: "10px", marginTop: "20px" }}>
  <strong>🚧 Zip file deployment will be deprecated soon. </strong>We recommend migrating to the <a href="https://developer.monday.com/docs/cli" target="_blank" style={{ color: "#FBC02D", textDecoration: "none" }}>CLI</a> for long-term support.
</div>

## Server-side code via CLI (monday code)

Server-side code can only be deployed using the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). This is for app features that use monday code to run backend logic.

```shell Terminal
$ mapps code:push -i 123456 
```

## External hosting

If your code is hosted outside of monday.com's infrastructure, you can integrate it with monday.com's platform by providing a render URL in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center). Doing so allows your app to run on your own infrastructure while still being accessible on monday.com.

# How to deploy

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#build-an-app) in the Developer Center.
2. Add and configure [app features](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
3. Navigate to the *Feature Deployment* widget in the top right corner.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/92b3a584508905254f0cdf346cda5c6cb5805ac62ffaa6b42be09e27931faae7-Screenshot_2025-04-25_at_3.43.20_PM3x.png" />

4. Select your deployment method:
   1. **CLI (client/server):** Follow the prompts and deploy via the CLI. Provide the subroute of the feature to render.
   2. **Zip file (client-side only):** Upload the Zip file.
   3. **External hosting:** Paste your render URL.
5. Click **Save** to save your deployment.

# App versioning

Code deployments only impact the selected draft version. If your app has multiple versions, make sure you're deploying to the right one.
