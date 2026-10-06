---
updatedAt: 2026-02-02T22:48:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Credentials field

<Callout icon="❗️" theme="error">
  This feature will be deprecated soon. Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

The `credentials` field enables you to easily store and manage a set of profiles in an integration recipe. The field is useful in a variety of use cases, including:

* Storing one or more authentication profiles, without building the logic yourself
* Securely managing login details for multiple users on a shared account

# Implementation

## Sentence builder

1. Add or open an *Integration for sentence builder* feature.
2. Open the *Field Types* tab.
3. Click **Create new** to create your field type.
4. Select **Credentials** as the field type.
5. Add your field's remote options and customize its name and description.
6. Click **Save**.

## monday workflows

1. Add a *Custom field for monday workflows* feature.
2. Select **Credentials** in the schema type.
3. Configure your remote options and dependencies
4. Click **Save**.

## Video tutorial - Integration for sentence builder

Watch this video to learn how to add a credentials field to your integration app feature:

<Embed url="https://www.youtube.com/watch?v=lJQmvyKH_xE" href="https://www.youtube.com/watch?v=lJQmvyKH_xE" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FlJQmvyKH_xE%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DlJQmvyKH_xE%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FlJQmvyKH_xE%252Fhqdefault.jpg%26key%3D7788cb384c9f4d5dbbdbeffd9fe4b92f%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

# Reference

The credentials field requires three different URLs to send requests to when the user interacts with the credential selection component in the UI:

1. Credentials URL - returns a list of credentials
2. Authorization URL - redirect URL to add a new credential
3. Delete Credentials URL - deletes a specific credential

The selected credential value will then be sent to your app when the relevant block executes (i.e., when your custom action runs or your trigger is subscribed to).

> 🚧 Return credential IDs, not real API tokens
>
> Your credentials field should return IDs, not user tokens. Keep tokens in encrypted storage (like monday secure storage) and look them up by the ID at runtime.

## 1. Credentials URL

The *credentials URL* is the endpoint to get a list of credentials. monday will send a POST request with an empty body to the URL when a user opens the credentials field. Your app can [decode the authorization header](https://developer.monday.com/apps/docs/authorization-header) to get context about the request.

```node NodeJS
router.post("/credentials/get", async function getCredentials(req, res) {
  return res.status(200).send([
    { title: "User 1 login", value: "abc1234" },
    { title: "User 2 login", value: "bcd2345" },
  ]);
});
```
```json Response body (JSON)
[
    {
        "title": "Dipro (Admin)",
        "value": "salesforce:"
    },
    {
        "title": "Rachel (Admin)",
        "value": "2222"
    }
]
```

## 2. Authorization URL

The *authorization URL* is the redirect URL to add a new credential to the list. monday will redirect the user to this URL when they click **Use another account** in the UI.

The URL will have a [JWT token](https://jwt.io/) in the query params that contains `backToUrl` and `shortLivedToken`.  You can use the `shortLivedToken` to make requests to the monday API, retrieve user profile information, etc. It is only valid for **five minutes**. You can use the `backToUrl` to redirect the user to the sentence configuration page.

```node NodeJS
router.get("/credentials/create", async function addCredentials(req, res) {
  // verify and decode token data
  const tokenPayload = jwt.verify(
    req.query.token,
    process.env.MONDAY_SIGNING_SECRET,
  );
  
  // add authentication steps here (eg OAuth2, etc)
  console.log({ tokenPayload });

  // once finished, redirect to the back to URL
  return res.redirect(tokenPayload.backToUrl);
});
```
```json JWT
{
  accountId: 1800028,
  userId: 4000089,
  boardId: 6440001771,
  backToUrl:
    "https://myaccount.monday.com/boards/1111/app_automations/2222?nodeId=2&fieldKey=account",
  recipeId: 30000047,
  integrationId: "327000608",
  aud: "https://myapptunnel.apps-tunnel.monday.app/credentials/create",
  exp: 1723137005,
  shortLivedToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9ydExpdmVkIjp0cnVlLCJ1aWQiOjQwMTI2ODksImV4cCI6MTcyMzEzNzAwNSwiaWF0IjoxNzIzMTM2NzA1fQ.tYUTMOfZd72-HUYgverehC0lDs_E8P-01Gfd-yoxh-M",
  iat: 1723136705,
}
```

## 3. Delete Credentials URL

The *delete credentials URL* is the endpoint to delete a credential. monday will send a POST request to this URL when a user clicks the delete icon next to a credential. The request body will contain the ID of the credential to be deleted.

```node
router.post("/credentials/delete", async function deleteCredentials(req, res) {
  console.log("hit");
  // extract credential ID
  const id = req.body.payload.credentialId;

  // delete the credential from DB
  const success = removeCredentialFromDatabase(id);

  // return success
  if (success) {
    return res.status(200).send();
  }
});
```
```json Request body
{
  payload: {
    credentialsId: "bcd2345";
  }
}
```

# Sample request

When your integration runs, the credentials field will be sent to your app as a string, which you can then use to look up the relevant credential in your database.

```
{
  "payload": {
    "blockKind": "action",
    "credentialsValues": {},
    "inboundFieldValues": {
      "login": "abc1234"
    },
    "inputFields": {
      "login": "abc1234"
    },
    "recipeId": 629186,
    "integrationId": 398515811
  },
  "runtimeMetadata": {
    "actionUuid": "6b68c693284f082e506361b1b5430955",
    "triggerUuid": "176d9c746aac92c59cce735b949daec5"
  }
}
```
