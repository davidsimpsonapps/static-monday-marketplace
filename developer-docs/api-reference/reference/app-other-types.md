---
updatedAt: 2026-11-06T10:09:27.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the app APIs

The monday.com [app](https://developer.monday.com/api-reference/reference/app) APIs enable you to create and update apps.

The types below are used by app queries and mutations, and are not independently queryable.

# CreateAppInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions before [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01).** In `2027-01` and later, use [`CreateAppInputV2`](#createappinputv2).
</Callout>

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

<Callout icon="🚧" theme="warn">
  **Only available in API versions before [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01).** In `2027-01` and later, use [`UpdateAppInputV2`](#updateappinputv2).
</Callout>

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

# CreateAppInputV2

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

An object containing the new app's configuration data and its permission scopes as strings. Used by the [`create_app`](https://developer.monday.com/api-reference/reference/app#create-app) mutation. In versions before `2027-01`, the mutation takes [`CreateAppInput`](#createappinput).

| Field         | Type        | Description                                                                                                                                                                                                                                                                                                                                                   | Enum Values             |
| :------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------- |
| collaborators | `[ID!]`     | An array of user IDs with access to the app.                                                                                                                                                                                                                                                                                                                  |                         |
| description   | `String`    | The app's description.                                                                                                                                                                                                                                                                                                                                        |                         |
| kind          | `AppKind`   | The app's visibility type.                                                                                                                                                                                                                                                                                                                                    | `PRIVATE`<br />`PUBLIC` |
| name          | `String!`   | The app's display name.                                                                                                                                                                                                                                                                                                                                       |                         |
| permissions   | `[String!]` | An array of the app's permission scopes as strings in the `resource:access` format, such as `boards:read` or `me:read`. See the [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) your app can request. An unknown scope is rejected. In versions before `2027-01`, this field takes `[AppPermission!]` enum values. |                         |
| slug          | `String`    | A URL-friendly identifier in `{account_slug}_{app_slug}` format. Must contain only letters, numbers, dashes, and underscores. Example: `account-slug_my-scheduler`.                                                                                                                                                                                           |                         |
| webhook\_url  | `String`    | The app's webhook endpoint URL.                                                                                                                                                                                                                                                                                                                               |                         |

***

# UpdateAppInputV2

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

An object containing the app's updated configuration data and its permission scopes as strings. Used by the [`update_app`](https://developer.monday.com/api-reference/reference/app#update-app) mutation. If the app's latest version is live, a new draft version is created and updated. In versions before `2027-01`, the mutation takes [`UpdateAppInput`](#updateappinput).

| Field         | Type        | Description                                                                                                                                                                                                                                                                                                       | Enum Values             |
| :------------ | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| collaborators | `[ID!]`     | An array of user IDs with access to the app. Replaces the existing collaborators.                                                                                                                                                                                                                                 |                         |
| description   | `String`    | The app's description.                                                                                                                                                                                                                                                                                            |                         |
| kind          | `AppKind`   | The app's visibility type.                                                                                                                                                                                                                                                                                        | `PRIVATE`<br />`PUBLIC` |
| name          | `String`    | The app's display name.                                                                                                                                                                                                                                                                                           |                         |
| permissions   | `[String!]` | An array of the app's permission scopes as strings in the `resource:access` format, such as `boards:read` or `me:read`. See the [permission scopes](https://developer.monday.com/apps/docs/oauth#set-up-permission-scopes) your app can request. An unknown scope is rejected. Replaces the existing permissions. |                         |
| slug          | `String`    | A URL-friendly identifier. Can only be set if the app has no existing slug.                                                                                                                                                                                                                                       |                         |
| webhook\_url  | `String`    | The app's webhook endpoint URL.                                                                                                                                                                                                                                                                                   |                         |

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
