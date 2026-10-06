---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# App

Learn how to query apps built with the monday.com apps framework

Using the [apps framework](https://developer.monday.com/apps/docs/intro), you can build apps on top of the monday.com platform. These apps extend the platform's core functionality by bridging gaps and enabling you to customize your workflows.

Apps can be shared directly with select accounts, listed in the app marketplace for all monday.com users, or kept private within the account. They are created and managed in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center).

# Queries

## Get app

* Returns an object containing metadata about an app
* Can be queried directly at the root or nested within a [`daily_analytics`](https://developer.monday.com/api-reference/reference/other-types#platform-api-daily-analytics) query

```graphql GraphQL
query {
  platform_api {
    daily_analytics {
      by_app {
        app {
          name
          features {
            type
            name
          }
          id
          api_app_id
          state
        }
        usage
      }
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($appId: ID!) { app (id: $appId) { features { id type } } }`;
const variables = {
  appId: 1234567890,
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type  | Description                  |
| :------- | :---- | :--------------------------- |
| id       | `ID!` | The app's unique identifier. |

### Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The app's account ID.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        api_app_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The app's unique API consumer identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        client_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's unique API consumer identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        collaborators
      </td>

      <td>
        [`[User!]`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The app's collaborators.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The app's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who created the app.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        features
      </td>

      <td>
        [`[AppFeatureType!]`](https://developer.monday.com/api-reference/reference/app-features)
      </td>

      <td>
        The app's features.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's kind.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        permissions
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The app's permissions.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_url
      </td>

      <td>
        `String`
      </td>

      <td>
        The URL of the app's photo.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_url_small
      </td>

      <td>
        `String`
      </td>

      <td>
        The URL of the app's photo in a small size.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        slug
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's slug.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's state (active/inactive).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        status
      </td>

      <td>
        `AppStatus`
      </td>

      <td>
        The app's status.
      </td>

      <td>
        `DRAFT`  
        `LIVE`
      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The date the app was last updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who created the app.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        version_type
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's latest version type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        versions
      </td>

      <td>
        [`[DeveloperAppVersion!]`](https://developer.monday.com/api-reference/reference/app-other-types#developerappversion)
      </td>

      <td>
        The app's versions. Useful for polling the status of a version being promoted. **Only available in versions `2026-10` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        webhook_url
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's webhook endpoint URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

## Create app

Creates a new app. Returns [`App`](https://developer.monday.com/api-reference/docs/app#fields).

```graphql GraphQL
mutation {
  create_app(
    input: {
      collaborators: [54321, 12345],
      description: "The updated app description.",
      name: "The updated app name.",
      kind: PUBLIC,
      permissions: ["docs:write", "me:read"]
    }
  ) {
    description
    name
    kind
    permissions
    collaborators {
      id
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                     | Description                                            |
| :------- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| input    | [`CreateAppInput!`](https://developer.monday.com/api-reference/reference/app-other-types#createappinput) | An object containing the new app's configuration data. |

## Update app

Updates an app. Returns [`App`](https://developer.monday.com/api-reference/docs/app#fields).

:construction: Only works for **app collaborators**

```graphql GraphQL
mutation {
  update_app(
    id: 123456,
    input: {
      collaborators: [54321, 12345],
      description: "The updated app description.",
      name: "The updated app name."
    }
  ) {
    description
    name
    collaborators {
      id
    }
  }
}	
```

### Arguments

| Argument | Type                                                                                                     | Description                                                |
| :------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| id       | `ID!`                                                                                                    | The unique identifier of the app to update.                |
| input    | [`UpdateAppInput!`](https://developer.monday.com/api-reference/reference/app-other-types#updateappinput) | An object containing the updated app's configuration data. |

***

## Promote app

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Initiates promotion of a draft app version to live. This is an **asynchronous operation** — promotion may take several seconds to complete. Returns a [`DeveloperAppVersion`](https://developer.monday.com/api-reference/reference/app-other-types#developerappversion) object that you can use to poll the promotion status.

To track when promotion is complete, poll the [`app`](https://developer.monday.com/api-reference/reference/app) query and check `versions[].status` until it changes from `PROMOTING` to `LIVE`.

> 📘 NOTE
>
> Only **app collaborators** can run this mutation.

```graphql GraphQL
mutation {
  promote_app(
    app_id: "1234567890"
  ) {
    id
    status
  }
}
```

```graphql GraphQL
# Poll app versions after promoting
query {
  app(id: "1234567890") {
    id
    name
    versions {
      id
      status
    }
  }
}
```

### Arguments

| Argument         | Type  | Description                                                                                        |
| :--------------- | :---- | :------------------------------------------------------------------------------------------------- |
| app\_id          | `ID!` | The unique identifier of the app to promote.                                                       |
| app\_version\_id | `ID`  | The ID of the specific draft version to promote. If omitted, the latest draft version is promoted. |
