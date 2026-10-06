---
updatedAt: 2026-01-30T14:57:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Authorization URL

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

The Authorization URL is an endpoint on your server that directs users through any authorization steps your app needs.

# Concepts

When a user adds your integration recipe, they will be redirected to this Authorization URL before configuring anything else. Your app should pass them through the relevant authorization flows, such as prompting them to log in to an external system.

Once the steps are complete, your app should redirect them to the `backToUrl` to finish configuring the recipe.

# Reference

## Back to URL

The `backToUrl` is a monday URL where the user can finish configuring their integration. Your app should redirect them to this URL once the authorization flow is complete. You can get this URL by decoding the JWT in the `token` query parameter.

## Authorization token

When we redirect users to your Authorization URL, we will pass your app a **token** query parameter. This parameter is a JWT token signed with your app's *Signing Secret* which can be found on your app's [Basic Information](https://developer.monday.com/apps/docs/the-developer-center#basic-information) page.

After verifying the token, its payload will contain three parameters:

* **userId** - The **User ID** of the monday.com user you're authorizing
* **accountId** - The **Account ID** of the user's monday.com account
* **backToUrl** - This URL is where the user will finish configuring their recipe. Your app should redirect the user to the `backToUrl` after they have finished authorization.

## Code example

Here is an empty Node.js implementation that verifies the token and immediately redirects the user back to monday.

```javascript
// The authorization route is /authorization
router.get("/authorization", (req, res) => { 
  // get the token from the query parameter
  const { token } = req.query; 

  // verify the JWT token
  const { userId, accountId, backToUrl } = jwt.verify(token, process.env.SIGNING_SECRET);

  // redirect the user
  return res.redirect(backToUrl);
});
```

# Get a monday access token

Sometimes your authorization process will need to obtain a long-term access token from the user to the monday.com API. To do so, your app should redirect the user to its monday.com OAuth URL. After the user approves access, this will grant you an access token with the required scopes.

When the process is done, you can redirect the user to the *Back To URL*. Check out [the full OAuth documentation here](https://developer.monday.com/apps/docs/oauth) !

> 📘 NOTE
>
> In order for your app to still have the *Back To URL* after the monday OAuth flow, you'll need to pass it (or the entire authorization token) through the **state** parameter of the monday OAuth request.

# Implementing OAuth

Here are two example endpoints to implement the flow:

1. Redirects the user to the **OAuth Authorization URL**
2. Callback URL that exchanges the **OAuth authorization code** for a token

```javascript
router.get("/authorization", (req, res) => {
  const { token } = req.query;
  return res.redirect('https://auth.monday.com/oauth2/authorize?' +
    querystring.stringify({
      client_id: process.env.CLIENT_ID,
      state: token
    })
  );
});

router.get("/oauth/callback", async (req, res) => {
  const { code, state } = req.query;
  const { userId, accountId, backToUrl } = jwt.verify(state, process.env.SIGNING_SECRET);

  // Get access token
  const token = await monday.oauthToken(code, process.env.CLIENT_ID, process.env.CLIENT_SECRET)
  
  // TODO - Store the token in a secure way in a way you'll can later on find it using the user ID. 
  // For example: await tokenStoreService.storeToken(userId, token);

  // Redirect back to monday
  return res.redirect(backToUrl);
});
```

## Add other services to your authorization flow

If your app integrates monday with another service, you might need to add additional authorization flows so your app can access the resources it needs. You can easily do so by redirecting the user to authorize more services using the same flow in the previous section. After your app has all the tokens and information it needs, you should redirect the user back to the *Back To URL*.

## What about the next time the user adds my recipe?

The user will be redirected to your authorization URL every time they choose to add a recipe to their board. Your app can then check if the user has already been authenticated, and redirect them to the `backToUrl` instead of going through the authorization process again.

Here is an example that redirects the user immediately if your app already has an access token:

```javascript
router.get("/authorization", (req, res) => {
  const { token } = req.query;
  const { userId, accountId, backToUrl } = jwt.verify(state, process.env.CLIENT_SECRET);

  // TODO - Check if you already have proper access token for that user
  // For example: const accessToken = await tokenStoreService.getToken(userId, token);

  if (accessToken) {
    return res.redirect(backToUrl) // redirect immediately
  } else {
    // redirect to monday.com OAuth URL
    return res.redirect('https://auth.monday.com/oauth2/authorize?' +
      querystring.stringify({
        client_id: process.env.CLIENT_ID,
        state: token
      })
    );
  }
});
```
