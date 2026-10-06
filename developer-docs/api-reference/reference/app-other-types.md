---
updatedAt: 2026-09-06T08:33:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the app APIs

The monday.com [app](https://developer.monday.com/api-reference/reference/app) APIs enable you to create and update apps.

The types below are used by app queries and mutations, and are not independently queryable.

# CreateAppInput

An object containing the new app's configuration data.

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
        collaborators
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        An array of the new app's collaborators.
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
        The new app's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `AppKind`
      </td>

      <td>
        The new app's visibility type.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new app's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        permissions
      </td>

      <td>
        `[AppPermission!]`
      </td>

      <td>
        An array of the new app's permission scopes.
      </td>

      <td>
        `ACCOUNT_READ`  
        `ASSETS_READ`  
        `BOARDS_READ`  
        `BOARDS_WRITE`  
        `DEPARTMENTS_READ`  
        `DEPARTMENTS_WRITE`  
        `DOCS_READ`  
        `DOCS_WRITE`  
        `ME_READ`  
        `NOTIFICATIONS_WRITE`  
        `TAGS_READ`  
        `TEAMS_READ`  
        `TEAMS_WRITE`  
        `UPDATES_READ`  
        `UPDATES_WRITE`  
        `USERS_READ`  
        `USERS_WRITE`  
        `WEBHOOKS_READ`  
        `WORKSPACES_READ`  
        `WORKSPACES_WRITE`
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
        A URL-friendly identifier in `{account_slug}_{app_slug}` format. Must contain at least three letters, numbers, dashes, and underscores.
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
        The new app's webhook endpoint URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateAppInput

An object containing the app's updated configuration data.

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
        collaborators
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        An array of the new app's collaborators.
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
        The new app's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `AppKind`
      </td>

      <td>
        The new app's visibility type.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new app's name.
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
        An array of the new app's permission scopes.
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
        The new app's slug.
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
        The new app's webhook endpoint URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# DeveloperAppVersion

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Represents a version of a developer app. Returned by the [`promote_app`](https://developer.monday.com/api-reference/reference/app#promote-app) mutation and queryable via the `versions` field on [`App`](https://developer.monday.com/api-reference/reference/app#fields).

| Field                     | Type                                    | Description                             |
| :------------------------ | :-------------------------------------- | :-------------------------------------- |
| id `ID`                   | `ID`                                    | The app version's unique identifier.    |
| status `AppVersionStatus` | [`AppVersionStatus`](#appversionstatus) | The current status of this app version. |

***

# AppVersionStatus

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

Enum representing the lifecycle status of a developer app version.

| Enum Value   | Description                                                                                                |
| :----------- | :--------------------------------------------------------------------------------------------------------- |
| `DRAFT`      | The version is in draft and has not been promoted to live.                                                 |
| `LIVE`       | The version is live and available to users.                                                                |
| `DEPRECATED` | The version has been deprecated and is no longer the active live version.                                  |
| `PROMOTING`  | The version is currently being promoted to live. Poll `status` until it changes to `LIVE` or `DEPRECATED`. |
