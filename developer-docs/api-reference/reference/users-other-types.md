---
updatedAt: 2026-09-17T09:26:27.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the users APIs

The monday.com [users](https://developer.monday.com/api-reference/reference/workspaces) APIs enable you to create, read, update, and delete users.

The types below are used by the users queries and mutations, and are not independently queryable.

# InvitationMethod

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The method by which a user was added to the account. Returned on `User.invitation_method`.

| Enum Value                       | Description                                           |
| :------------------------------- | :---------------------------------------------------- |
| `USER`                           | Invited by another user.                              |
| `SCIM`                           | Provisioned via SCIM.                                 |
| `SSO`                            | Added via single sign-on.                             |
| `AUTH_DOMAIN`                    | Added via an authorized domain.                       |
| `FIRST_USER`                     | The first user who created the account.               |
| `CONSOLIDATION`                  | Added via account consolidation.                      |
| `INTERNAL_CREATION`              | Created through an internal monday.com process.       |
| `UNKNOWN`                        | Unknown invitation method.                            |
| `SERVICE_PORTAL_AUTH_DOMAIN`     | Added via a service portal authorized domain.         |
| `SERVICE_PORTAL_USER_INVITATION` | Invited to the monday service portal by another user. |
| `API_USER_CREATION`              | Created as an API user.                               |

***

# PhotoUrl

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

URLs for a user's profile photo in each supported size. Returned on [`User.photo_url`](https://developer.monday.com/api-reference/reference/users#fields). Replaces the flat `photo_*` fields.

| Field                 | Description                                  | Notes                   |
| :-------------------- | :------------------------------------------- | :---------------------- |
| original `String`     | The photo URL in its original uploaded size. | Requires authorization. |
| small `String`        | The photo URL at 150×150 px.                 |                         |
| thumb `String`        | The photo URL at 100×100 px.                 |                         |
| thumb\_small `String` | The photo URL at 50×50 px.                   |                         |
| tiny `String`         | The photo URL at 30×30 px.                   |                         |

***

# UserConfig

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Per-kind configuration for a user within an account. Accessible via [`User.user_config`](https://developer.monday.com/api-reference/reference/users#fields) (single config for the user) or [`user_configs`](https://developer.monday.com/api-reference/reference/users#get-user-configs) (every config defined for the account). Requires the `users:read` scope.

| Field                   | Description                                                                                  |
| :---------------------- | :------------------------------------------------------------------------------------------- |
| kind `String!`          | The user kind this config applies to (for example, `admin`, `member`, `guest`, `view_only`). |
| role\_id `ID!`          | The role ID associated with this config.                                                     |
| visibility `[String!]!` | The visibility settings for this config.                                                     |

***

# UserKindFilter

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Used inside [`UserKindFilterInput`](#userkindfilterinput) on the `Query.users` `user_kind` argument. Supports both individual user kinds and kind groups.

| Enum Value                              | Description                                                                               |
| :-------------------------------------- | :---------------------------------------------------------------------------------------- |
| `ADMIN`                                 | An admin user.                                                                            |
| `MEMBER`                                | A member user.                                                                            |
| `GUEST`                                 | A guest user.                                                                             |
| `VIEW_ONLY`                             | A view-only user.                                                                         |
| `AGENT_MEMBER`                          | A member user acting as an agent.                                                         |
| `PORTAL`                                | An external portal user.                                                                  |
| `BASIC`                                 | Group: admin, member, guest, and view-only users.                                         |
| `PORTFOLIO_API_USER`                    | API user for the Portfolio feature.                                                       |
| `NEXUS_API_USER`                        | API user for the Nexus feature.                                                           |
| `RESOURCE_DIRECTORY_API_USER`           | API user for the Resource Directory feature.                                              |
| `OMNICHANNEL_API_USER`                  | API user for the Omnichannel feature.                                                     |
| `GOALS_API_USER`                        | API user for the Goals feature.                                                           |
| `PROJECTS_API_USER`                     | API user for the Projects feature.                                                        |
| `SPRINT_MANAGEMENT_API_USER`            | API user for the Sprint Management feature.                                               |
| `CRM_COMMERCE_API_USER`                 | API user for the CRM Commerce feature.                                                    |
| `CAMPAIGNS_API_USER`                    | API user for the Campaigns feature.                                                       |
| `DATA_RETENTION_API_USER`               | API user for the Data Retention feature.                                                  |
| `MONDAY_SERVICE_API_USER`               | API user for the monday service feature.                                                  |
| `AI_PLATFORM_AGENT_API_USER`            | API user for the AI Platform Agent feature.                                               |
| `DEPENDENCIES_API_USER`                 | API user for the Dependencies feature.                                                    |
| `HISTORICAL_TRACKING_BACKFILL_API_USER` | API user for the historical tracking backfill feature.                                    |
| `CRM_USER_AGENT_MEMBER`                 | A CRM user acting as an agent member. **Only available in versions `2026-10` and later.** |

***

# UserKindFilterInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Used on the `user_kind` argument of [`Query.users`](https://developer.monday.com/api-reference/reference/users#arguments). `not_in` values are removed from the expanded `in` set.

| Field                       | Description                                               |
| :-------------------------- | :-------------------------------------------------------- |
| in `[UserKindFilter!]`      | Include users matching any of these kinds or kind groups. |
| not\_in `[UserKindFilter!]` | Exclude users matching these kinds or kind groups.        |

***

# UserStatus

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The activation status of a user. Returned on [`User.status`](https://developer.monday.com/api-reference/reference/users#fields) and accepted on the `status` argument of [`Query.users`](https://developer.monday.com/api-reference/reference/users#arguments).

| Enum Value | Description                                   |
| :--------- | :-------------------------------------------- |
| `ACTIVE`   | The user is active.                           |
| `INACTIVE` | The user has been deactivated.                |
| `PENDING`  | The user has not yet accepted the invitation. |

***

# UsersSortField

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The field used inside [`UsersSortInput`](#userssortinput) to sort the result of `Query.users`.

| Enum Value   | Description                            |
| :----------- | :------------------------------------- |
| `CREATED_AT` | Sort by the date the user was created. |

***

# UsersSortDirection

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The sort direction used inside [`UsersSortInput`](#userssortinput).

| Enum Value | Description               |
| :--------- | :------------------------ |
| `ASC`      | Sort in ascending order.  |
| `DESC`     | Sort in descending order. |

***

# UsersSortInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Used on the `sort` argument of [`Query.users`](https://developer.monday.com/api-reference/reference/users#arguments). Replaces the legacy `newest_first` boolean.

| Field                                                  | Description           |
| :----------------------------------------------------- | :-------------------- |
| field [`UsersSortField!`](#userssortfield)             | The field to sort by. |
| direction [`UsersSortDirection!`](#userssortdirection) | The sort direction.   |

***

# ActivateUsersResult

An object containing the result of activating users via the API.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        activated_users
      </td>

      <td>
        [`[User!]`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The users who were activated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        errors
      </td>

      <td>
        `[ActivateUsersError!]`
      </td>

      <td>
        The errors that occurred during user activation. Use this field to check for calls that failed.
      </td>

      <td>
        code `ActivateUsersErrorCode`  
        message `String`  
        user_id `ID`
      </td>
    </tr>
  </tbody>
</Table>

## ActivateUsersError

An object containing the error that occurred when an `activate_users` mutation fails.

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
        code
      </td>

      <td>
        `ActivateUsersErrorCode`
      </td>

      <td>
        The error code that occurred.
      </td>

      <td>
        `CANNOT_UPDATE_SELF`  
        `EXCEEDS_BATCH_LIMIT`  
        `FAILED`  
        `INVALID_INPUT`  
        `USER_NOT_FOUND`
      </td>
    </tr>

    <tr>
      <td>
        message
      </td>

      <td>
        `String`
      </td>

      <td>
        The error message.
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
        The unique identifier of the user that caused the error.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# ClearUsersDepartmentResult

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the result of deactivating users via the API.

| Field          | Type                                                                    | Description                                         |
| :------------- | :---------------------------------------------------------------------- | :-------------------------------------------------- |
| cleared\_users | [`[User]!`](https://developer.monday.com/api-reference/reference/users) | Data from the users whose departments were cleared. |

***

# DeactivateUsersResult

An object containing the result of deactivating users via the API.

| Field              | Type                                                                                                                 | Description                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| deactivated\_users | [`[User]!`](https://developer.monday.com/api-reference/reference/users)                                              | Data from the users who were deactivated.                                                    |
| errors             | [`[DeactivateUsersError]!`](https://developer.monday.com/api-reference/reference/other-types#deactivate-users-error) | The errors that occurred during deactivation. Use this field to check for calls that failed. |

## DeactivateUsersError

An object containing the error that occurred when an `deactivate_users` mutation fails.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        code `DeactivateUsersErrorCode`
      </td>

      <td>
        The error code that occurred.
      </td>

      <td>
        `CANNOT_UPDATE_SELF`  
        `EXCEEDS_BATCH_LIMIT`  
        `FAILED`  
        `INVALID_INPUT`  
        `USER_NOT_FOUND`
      </td>
    </tr>

    <tr>
      <td>
        message `String`
      </td>

      <td>
        The error message.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_id `ID`
      </td>

      <td>
        The unique identifier of the user that caused the error.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# InviteUsersResult

An object containing the result of inviting users via the API.

| Field          | Type                                                                                                         | Description                                                                                            |
| :------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| invited\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users)                                      | Data from the users who were successfully invited.                                                     |
| errors         | [`[InviteUsersError!]`](https://developer.monday.com/api-reference/reference/other-types#invite-users-error) | The errors that occurred during the invitation process. Use this field to check for calls that failed. |

## InviteUsersError

An object containing the error that occurred when an `invite_users` mutation fails.

| Field   | Type                   | Description                                  | Enum Values |
| :------ | :--------------------- | :------------------------------------------- | :---------- |
| code    | `InviteUsersErrorCode` | The error code that occurred.                | `ERROR`     |
| message | `String`               | The error message.                           |             |
| email   | `ID`                   | The email of the user that caused the error. |             |

***

# UpdateEmailDomainAttributesInput

An object containing the attributes to update.

| Field       | Type      | Description                                                        |
| :---------- | :-------- | :----------------------------------------------------------------- |
| new\_domain | `String!` | The updated email domain.                                          |
| user\_ids   | `[ID!]!`  | The unique identifiers of the users to update. The maximum is 200. |

***

# UpdateUserAttributesResult

An object containing the result of updating users' attributes via the API.

| Field          | Type                                                                                                                            | Description                                                                                       |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| errors         | [`[UpdateUserAttributesError!]`](https://developer.monday.com/api-reference/reference/other-types#update-user-attributes-error) | The errors that occurred during user attribute updates. Use this field to check for failed calls. |
| updated\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users#fields)                                                  | Data from the users who were updated.                                                             |

## UpdateUserAttributesError

An object containing the error that occurred when an `update_multiple_users` mutation fails.

| Field    | Type                            | Description                                              | Enum Values     |
| :------- | :------------------------------ | :------------------------------------------------------- | :-------------- |
| code     | `UpdateUserAttributesErrorCode` | The error code.                                          | `INVALID_FIELD` |
| message  | `String`                        | The error message.                                       |                 |
| user\_id | `ID`                            | The unique identifier of the user that caused the error. |                 |

***

# UpdateEmailDomainAttributesInput

An object containing the attributes to update through the [`update_email_domain`](https://developer.monday.com/api-reference/reference/users#update-a-users-email-domain) mutation.

| Field       | Type      | Description                                                        |
| :---------- | :-------- | :----------------------------------------------------------------- |
| new\_domain | `String!` | The updated email domain.                                          |
| user\_ids   | `[ID!]!`  | The unique identifiers of the users to update. The maximum is 200. |

***

# UpdateUsersEmailDomainResult

An object containing the result of updating a user's email domain via the API.

| Field          | Type                                                                                                                      | Description                                                                                        |
| :------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------- |
| errors         | [`[UpdateEmailDomainError!]`](https://developer.monday.com/api-reference/reference/other-types#update-email-domain-error) | The errors that occurred during the email domain update. Use this field to check for failed calls. |
| updated\_users | `[User!]`                                                                                                                 | Data from the users who were updated.                                                              |

## UpdateEmailDomainError

An object containing the error that occurred when an `update_email_domain` mutation fails.

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
        code
      </td>

      <td>
        `UpdateEmailDomainErrorCode`
      </td>

      <td>
        The error code that occurred.
      </td>

      <td>
        `CANNOT_UPDATE_SELF`  
        `EXCEEDS_BATCH_LIMIT`  
        `FAILED`  
        `INVALID_INPUT`  
        `UPDATE_EMAIL_DOMAIN_ERROR`  
        `USER_NOT_FOUND`
      </td>
    </tr>

    <tr>
      <td>
        message
      </td>

      <td>
        `String`
      </td>

      <td>
        The error message.
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
        The unique identifier of the user that caused the error.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateUsersRoleResult

An object containing the result of updating a user's role via the API.

| Field          | Type                                                                                                                  | Description                                                                                      |
| :------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| errors         | [`[UpdateUsersRoleError!]`](https://developer.monday.com/api-reference/reference/other-types#update-users-role-error) | The errors that occurred while updating the role. Use this field to check for calls that failed. |
| updated\_users | [`[User]!`](https://developer.monday.com/api-reference/reference/users#fields)                                        | Data from the users who were updated.                                                            |

## UpdateUsersRoleError

An object containing the error that occurred when an `update_users_role` mutation fails.

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
        code
      </td>

      <td>
        `UpdateUsersRoleErrorCode`
      </td>

      <td>
        The error code that occurred.
      </td>

      <td>
        `CANNOT_UPDATE_SELF`  
        `EXCEEDS_BATCH_LIMIT`  
        `FAILED`  
        `INVALID_INPUT`  
        `USER_NOT_FOUND`
      </td>
    </tr>

    <tr>
      <td>
        message
      </td>

      <td>
        `String`
      </td>

      <td>
        The error message.
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
        The unique identifier of the user that caused the error.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UserUpdateInput

An object containing the user IDs and attributes to update.

| Field                    | Type                                                                                                             | Description                                  |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| user\_attribute\_updates | [`UserAttributesInput!`](https://developer.monday.com/api-reference/reference/other-types#user-attributes-input) | The attributes to update.                    |
| user\_id                 | `ID!`                                                                                                            | The unique identifier of the user to update. |

## UserAttributesInput

An object containing the specific attributes to update.

| Field         | Type     | Description                                          |
| :------------ | :------- | :--------------------------------------------------- |
| birthday      | `String` | The user's updated birthday. Use YYYY-MM-DD format.  |
| department    | `String` | The user's updated department.                       |
| email         | `String` | The user's updated email.                            |
| join\_date    | `String` | The user's updated join date. Use YYYY-MM-DD format. |
| location      | `String` | The user's updated location.                         |
| mobile\_phone | `String` | The user's updated mobile phone number.              |
| name          | `String` | The user's updated name.                             |
| phone         | `String` | The user's updated phone number.                     |
| title         | `String` | The user's updated title.                            |

<br />
