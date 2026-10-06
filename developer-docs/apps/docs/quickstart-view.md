---
updatedAt: 2026-01-30T16:10:54.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Views

Step-by-step instructions to build a simple client-side monday app with React!

This tutorial guides you through building a simple "Hello World" app with React, starting small and gradually expanding functionality. The same code can be used as a board view, item view, or dashboard widget.

# Supported frameworks

This tutorial serves solely as an example and was written using React. The monday apps framework is framework-agnostic, so you can build with any JavaScript framework for the client and any programming language for your server. Keep in mind that views and widgets run in a client's browser, so they'll need to compile into HTML/CSS/JavaScript.

# Before we begin

## What you will learn

* How to build a simple "Hello World" app in React
* How to package and upload a production-ready monday app

## Prerequisites

* Basic understanding of web programming (HTML, CSS, JS)
* Working environment of NodeJS on your computer, as well as a package manager like npm or yarn.
* A monday.com account. If you don't have one, sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation).
* Access to a [monday.com API token](https://developer.monday.com/api-reference/docs/authentication#accessing-your-token)

## Step 1. Create your monday app

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#creating-an-app-in-the-developer-center).
2. Add an [app feature](https://developer.monday.com/apps/docs/create-an-app#adding-an-app-feature-in-the-developer-center). Select between **Board View**, **Account Settings View**, or **Dashboard Widget**.
3. Choose a template or build your own from scratch. For this tutorial, we will select **Quickstart - ReactJS**.
4. You will then see this screen below. Keep the tab open, and move on to the next section.

<Image align="center" border={true} src="https://files.readme.io/64659717b4c83513039254a462f5f333c00c19c71e9a8d01959aa40ae1f55594-Set_up_your_dev_environment.png" className="border" />

## Step 2: Set up your development environment

After selecting Quickstart - ReactJS, you will need to set up your development environment.

<Callout icon="❗️" theme="error">
  Important: We use the [apps-cli (mapps)](https://developer.monday.com/apps/docs/command-line-interface-cli), not the legacy monday-cli, which is no longer supported for new apps.
</Callout>

1. Install the apps-cli (mapps) globally:

```shell Terminal
npm i -g @mondaycom/apps-cli
```

2. Initialize it using your monday.com API token:

```shell Terminal
mapps init -t YOUR_TOKEN
```

3. Download and run the Quickstart app. The CLI will also create a temporary secure tunnel, so your local app can be accessed by monday.com.

```shell Terminal
mapps app:scaffold ./ quickstart-react
```

This command will:

* Download the [quickstart-react](https://github.com/mondaycom/welcome-apps/tree/master/apps/quickstart-react) project into your current directory
* Install dependencies (npm install)
* Run the app locally immediately after installation (npm run start)

4. Wait for the installation process to finish. This may take a few minutes.

## Step 3: Connect your app to monday.com

1. Once the app is running, you’ll see a message similar to:

> Your app is served from this URL:
> <https://abc1234asdlqwe.loca.lit>

2. Return to the screen at the end of step 1 and paste the URL.
3. If you want to run the application manually in the future:

```shell Terminal
cd quickstart-react
npm run start
```

## Step 4: Update your view's basic information

After setting up your development environment, the system automatically redirects you to the Feature Editor.

1. Open the **Feature Details** tab.

   **Note:** This is where you can add a title and description to your board view or widget. Users will see the title and description in the View or the Dashboard Center.

2. You can update the feature's name, description, *Learn More* link, or *Feedback* link. You can also choose whether to hide the board controls.

3. Save your changes and navigate to the *View Setup* tab.

4. The tab will display the initial example app and show *Hello Monday Apps.*

5. You should now be able to load the app for the first time using your tunnel URL.

We've recently added an Attention Box element from our design elements to the app's initial load. It looks like this when you first open the app:

<Image align="center" alt="hello_monday_attention_box" border={true} src="https://dapulse-res.cloudinary.com/image/upload/w_900/v1610793984/remote_mondaycom_static/uploads/AlexSavchuk/Screenshot_2021-01-16_at_12.37.16.png" className="border" />

You can find more info on our design system <a href="https://vibe.monday.com/" target="_blank">here</a>. You can also reference the [Attention Box element](https://vibe.monday.com/?path=/docs/components-attentionbox--docs).

## Step 5: Edit `src/App.js` to include a simple UI

1. Navigate to the **quickstart-react** folder.
2. Open the `App.js` file downloaded in the starter code package.
3. In the function `App`, you will see a `return()` function.
4. If you want to replace the text displayed in the Attention Box on initial load, you can use the `text` property within the Attention Box element. This is assigned to the `attentionBoxText` variable. Replace the text with whatever content you want, and it will display in the attention box.

**Note:** Your `return()` method should look something like this after these steps:

```javascript
  const attentionBoxText = `Ready to start my app journey by building a view!`
  
  return (
    <div className="App">
      <AttentionBox
        title="Hello Monday Apps!"
        text={attentionBoxText}
        type="success"
      />
    </div>
  );
```

Navigate to Preview after opening the View Setup section. You will see this:\
![](https://dapulse-res.cloudinary.com/image/upload/w_900/v1610794882/remote_mondaycom_static/uploads/AlexSavchuk/Screenshot_2021-01-16_at_13.01.04.png)

Now we can edit a style element from our Design System!

## Step 6: Upload your monday app build

To build our simple application, we will bundle it in a ZIP file and upload it to the monday.com server.

1. Compile your React code into a production build by running `npm run build`. This command will create a new build folder in your directory.
2. Create an archive of the contents of your build folder (ZIP file).
3. Open your feature and select the **Builds** tab. Click **New Build** to upload your production code.
4. Upload the ZIP you just created.
5. Open a board and add your view to it. Your app should display data for the first item on the board.

> 📘 Security in our CDN
>
> When you upload a client-side app to our platform, it is hosted on the monday.com apps CDN. Note that this CDN does not have authentication on it. Any views or widgets uploaded to our platform will be publicly-accessible via a randomly-generated (and difficult to guess) URL.
>
> If this is not suitable for you, you can serve your app via an iframe URL instead.

<br />

<br />
