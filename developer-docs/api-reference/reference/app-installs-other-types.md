---
updatedAt: 2026-09-06T08:33:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the app installs API

The monday.com [app installs](https://developer.monday.com/api-reference/reference/app-installs) API enables you to read an app's performance and usage.

The types below are used by the app installs query and are not independently queryable.

# AppInstallAccount

An object containing the app installer's account details.

| Field | Type   | Description                                           |
| :---- | :----- | :---------------------------------------------------- |
| id    | `Int!` | The unique identifier of the app installer's account. |

***

# AppInstallPermissions

An object containing the required and approved scopes for an app installation.

| Field            | Type         | Description                                         |
| :--------------- | :----------- | :-------------------------------------------------- |
| approved\_scopes | `[String!]!` | The scopes approved by the account admin.           |
| required\_scopes | `[String!]!` | The scopes required by the latest live app version. |

***

# AppInstallUser

An object containing the app installer's user details.

| Field | Type  | Description                            |
| :---- | :---- | :------------------------------------- |
| id    | `Int` | The app installer's unique identifier. |

***

# AppVersion

An object containing the app version when the app was installed.

| Field | Type      | Description              |
| :---- | :-------- | :----------------------- |
| major | `Int!`    | The app's major version. |
| minor | `Int!`    | The app's minor version. |
| patch | `Int!`    | The app's patch version. |
| text  | `String!` | The app's version text.  |
| type  | `String`  | The app's version type.  |
