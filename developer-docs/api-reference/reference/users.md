---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Users

Learn how to read, add, and delete monday users via the platform API

Every monday.com [user](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained)  belongs to an account or organization and is assigned a role, such as admin, member, viewer, guest, subscriber, board owner, or a custom role. Each user also has a unique profile containing their user details and permissions.

# Queries

## Get users

* **Required scope: `users:read`**
* Returns an array containing metadata about one or multiple users
* Can be queried directly at the root or nested within a `teams` query (returns users from a specific team)

```graphql GraphQL
query {
  users(limit: 50) {
    created_at
    email
    account {
      name
      id
    }
  }
}
```
```javascript JavaScript
const GET_USERS = "query { users (limit: 50) { created_at email account { name id }}}";
const seamlessApiClient = new SeamlessApiClient("2025-04");

const response = await seamlessApiClient.request(GET_USERS)
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
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
        emails
      </td>

      <td>
        `[String]` (2026-04)  
        `[String!]` (2026-07+)
      </td>

      <td>
        The specific user emails to return. **Starting in `2026-07`, array elements must be non-null.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifier of the specific users to return.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind (DEPRECATED)
      </td>

      <td>
        `UserKind`
      </td>

      <td>
        The kind of users you want to search by. **Deprecated in `2026-07`** (`@deprecated(reason: "Use user_kind instead.")`). Still accepted at runtime; a removal version has not been announced.
      </td>

      <td>
        `all`  
        `guests`  
        `non_guests`  
        `non_pending`
      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int`
      </td>

      <td>
        The number of users to get. **Starting in `2026-07`, defaults to `200` and has a maximum of `1000`.** Queries with no `limit` returned all users in earlier versions; starting in `2026-07` they return at most 200.
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
        A fuzzy search of users by name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        newest_first (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Lists the most recently created users at the top. **Deprecated in `2026-07`** (`@deprecated(reason: "Use sort instead.")`). Still accepted at runtime; a removal version has not been announced.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        non_active (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Returns the account's non-active users. **Deprecated in `2026-07`** (`@deprecated(reason: "Use status instead.")`). Still accepted at runtime; a removal version has not been announced.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        page
      </td>

      <td>
        `Int`
      </td>

      <td>
        The page number to return. Starts at 1.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sort
      </td>

      <td>
        [`[UsersSortInput!]`](https://developer.monday.com/api-reference/reference/users-other-types#userssortinput)
      </td>

      <td>
        Sort users by one or more fields and directions. Replaces `newest_first`. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        status
      </td>

      <td>
        [`[UserStatus!]`](https://developer.monday.com/api-reference/reference/users-other-types#userstatus)
      </td>

      <td>
        Filter users by activation status. Defaults to `[ACTIVE, PENDING]` when omitted. Replaces `non_active`. **Only available in versions `2026-07` and later.**
      </td>

      <td>
        `ACTIVE`  
        `INACTIVE`  
        `PENDING`
      </td>
    </tr>

    <tr>
      <td>
        user_kind
      </td>

      <td>
        [`UserKindFilterInput`](https://developer.monday.com/api-reference/reference/users-other-types#userkindfilterinput)
      </td>

      <td>
        Filter users by kind. Supports individual kinds and kind groups (for example, `BASIC` = admin + member + guest + view_only). Replaces `kind`. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        visibility
      </td>

      <td>
        `String`
      </td>

      <td>
        Filter users by visibility. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

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
        Field description
      </th>

      <th>
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account
      </td>

      <td>
        [`Account!`](https://developer.monday.com/api-reference/reference/account#fields)
      </td>

      <td>
        The user's account.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        account_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the account the user belongs to. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        activity_logs
      </td>

      <td>
        [`UserActivityLogsPage`](https://developer.monday.com/api-reference/reference/activity-logs-new#get-user-activity-logs)
      </td>

      <td>
        The user's activity log events. Returns a paginated list of activity logs with cursor-based pagination. See [Activity logs](https://developer.monday.com/api-reference/reference/activity-logs-new#get-user-activity-logs) for arguments, field definitions, and rate-limit details. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        bb_visitor_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        Opaque platform identifier for the user within the account. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        became_active_at
      </td>

      <td>
        `ISO8601DateTime`
      </td>

      <td>
        The date and time when the user became active. Replaces `join_date`. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        birthday
      </td>

      <td>
        `Date` (2026-04)  
        `String` (2026-07+)
      </td>

      <td>
        The user's date of birth. Returned as _YYYY-MM-DD_. **Starting in `2026-07`, this field is typed as `String` instead of `Date`.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        country_code
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's country code.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date` (2026-04)  
        `ISO8601DateTime!` (2026-07+)
      </td>

      <td>
        The user's creation date. In `2026-04` and earlier, returned as `Date` (_YYYY-MM-DD_). **Starting in `2026-07`, returned as `ISO8601DateTime!` (for example, `2023-09-02T13:22:48.000Z`) and non-null.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        current_language
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's language.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        department
      </td>

      <td>
        [`Department`](https://developer.monday.com/api-reference/reference/departments)
      </td>

      <td>
        The department the user is a member of (if any). Returns `null` if the user is not assigned to a department. **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        custom_field_metas
      </td>

      <td>
        `[CustomFieldMetas]`
      </td>

      <td>
        The user profile custom fields metadata.
      </td>

      <td>
        description `String`  
        editable `Boolean`  
        field_type `String`  
        flagged `Boolean`  
        icon `String`  
        id `String`  
        position `String`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        custom_field_values
      </td>

      <td>
        `[CustomFieldValue]`
      </td>

      <td>
        The user profile custom field values.
      </td>

      <td>
        custom_field_meta_id `String`  
        value `String`
      </td>
    </tr>

    <tr>
      <td>
        department
      </td>

      <td>
        [`Department`](https://developer.monday.com/api-reference/reference/departments)
      </td>

      <td>
        The department(s) the user is a member of. **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        `String!`
      </td>

      <td>
        The user's email.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        enabled (DEPRECATED)
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the user is enabled. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `status` (`ACTIVE`, `INACTIVE`) instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        greeting
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's greeting.
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
        The user's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        invitation_method
      </td>

      <td>
        [`InvitationMethod!`](https://developer.monday.com/api-reference/reference/users-other-types#invitationmethod)
      </td>

      <td>
        The method by which the user was added to the account. **Only available in versions `2026-07` and later.**
      </td>

      <td>
        `USER`  
        `SCIM`  
        `SSO`  
        `AUTH_DOMAIN`  
        `FIRST_USER`  
        `CONSOLIDATION`  
        `INTERNAL_CREATION`  
        `UNKNOWN`  
        `SERVICE_PORTAL_AUTH_DOMAIN`  
        `SERVICE_PORTAL_USER_INVITATION`  
        `API_USER_CREATION`
      </td>
    </tr>

    <tr>
      <td>
        is_admin (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is an admin. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Compare `kind == "admin"` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_deleted
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the user has been soft-deleted. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_email_confirmed
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the user has confirmed their email address. Replaces `is_verified`. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_guest (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is a guest. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Compare `kind == "guest"` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_pending (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user hasn't confirmed their email yet. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Compare `status == PENDING` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_view_only (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is a viewer. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Compare `kind == "view_only"` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_verified (DEPRECATED)
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user verified their email. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `is_email_confirmed` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        join_date (DEPRECATED)
      </td>

      <td>
        `Date`
      </td>

      <td>
        The date the user joined the account. Returned as _YYYY-MM-DD_. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `became_active_at` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        last_activity
      </td>

      <td>
        `Date`
      </td>

      <td>
        The last date and time the user was active. Returned as _YYYY-MM-DDT00:00:00_.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        location
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's location.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        mobile_phone
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's mobile phone number.
      </td>

      <td>

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
        The user's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        out_of_office
      </td>

      <td>
        `OutOfOffice`
      </td>

      <td>
        The user's out-of-office status.
      </td>

      <td>
        active `Boolean`  
        disable_notifications `Boolean`  
        end_date `Date`  
        start_date `Date`  
        type `String`
      </td>
    </tr>

    <tr>
      <td>
        phone
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's phone number.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_original (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in its original size. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `photo_url { original }` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_small (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in a small size (150x150 px). **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `photo_url { small }` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_thumb (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in thumbnail size (100x100 px). **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `photo_url { thumb }` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_thumb_small (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in a small thumbnail size (50x50 px). **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `photo_url { thumb_small }` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_tiny (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in tiny size (30x30 px). **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** Use `photo_url { tiny }` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_url
      </td>

      <td>
        [`PhotoUrl`](https://developer.monday.com/api-reference/reference/users-other-types#photourl)
      </td>

      <td>
        The URLs for the user's profile photo in all available sizes. Replaces the flat `photo_*` fields. **Only available in versions `2026-07` and later.**
      </td>

      <td>
        original `String`  
        small `String`  
        thumb `String`  
        thumb_small `String`  
        tiny `String`
      </td>
    </tr>

    <tr>
      <td>
        serial_number
      </td>

      <td>
        `Int`
      </td>

      <td>
        The user's registration sequence number within the account. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sign_up_product_kind (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        The product the user first signed up to. **Deprecated in `2026-07` and scheduled for removal in `2026-10`.** No replacement.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        status
      </td>

      <td>
        [`UserStatus!`](https://developer.monday.com/api-reference/reference/users-other-types#userstatus)
      </td>

      <td>
        The activation status of the user. Replaces the `enabled` and `is_pending` booleans. **Only available in versions `2026-07` and later.**
      </td>

      <td>
        `ACTIVE`  
        `INACTIVE`  
        `PENDING`
      </td>
    </tr>

    <tr>
      <td>
        teams
      </td>

      <td>
        [`[Team]`](https://developer.monday.com/api-reference/reference/teams#fields)
      </td>

      <td>
        The user's teams.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        time_zone_identifier
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's timezone identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        url
      </td>

      <td>
        `String!`
      </td>

      <td>
        The user's profile URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_config
      </td>

      <td>
        [`UserConfig!`](https://developer.monday.com/api-reference/reference/users-other-types#userconfig)
      </td>

      <td>
        The user's configuration based on their kind (role id, visibility). Requires the `users:read` scope. **Only available in versions `2026-07` and later.**
      </td>

      <td>
        kind `String!`  
        role_id `ID!`  
        visibility `[String!]!`
      </td>
    </tr>

    <tr>
      <td>
        utc_hours_diff
      </td>

      <td>
        `Int` (2026-04)  
        `Float` (2026-07+)
      </td>

      <td>
        The user's UTC hours difference. **Starting in `2026-07`, this field is typed as `Float` to support fractional timezone offsets (for example, `5.5`).**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Get user configs

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

* **Required scope: `users:read`**
* Returns [`[UserConfig!]!`](https://developer.monday.com/api-reference/reference/users-other-types#userconfig)
* Can be queried directly at the root
* Returns every user config defined for the account, sorted by `role_id` ascending

```graphql GraphQL
query {
  user_configs {
    kind
    role_id
    visibility
  }
}
```

### Arguments

| Argument   | Type       | Description                               |
| :--------- | :--------- | :---------------------------------------- |
| kinds      | `[String]` | Filter to configs that match these kinds. |
| visibility | `String`   | Filter by visibility.                     |

### Migration: user entity in `2026-07` and `2026-10`

Starting with API version `2026-07`, the `User` type and `Query.users` follow the updated schema described in the [User entity migration guide](https://developer.monday.com/api-reference/docs/migrating-user-entity-to-2026-10). Several legacy fields are deprecated and are scheduled for removal in `2026-10`.

| Deprecated field                                                                  | Replacement                                                   |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| `photo_original`, `photo_small`, `photo_thumb`, `photo_thumb_small`, `photo_tiny` | `photo_url { original / small / thumb / thumb_small / tiny }` |
| `is_admin`                                                                        | `kind == "admin"`                                             |
| `is_guest`                                                                        | `kind == "guest"`                                             |
| `is_view_only`                                                                    | `kind == "view_only"`                                         |
| `is_pending`                                                                      | `status == PENDING`                                           |
| `enabled`                                                                         | `status == ACTIVE`                                            |
| `is_verified`                                                                     | `is_email_confirmed`                                          |
| `join_date`                                                                       | `became_active_at`                                            |
| `encrypt_api_token`, `sign_up_product_kind`                                       | Removed without replacement                                   |
| `Query.users(kind:)`                                                              | `Query.users(user_kind:)`                                     |
| `Query.users(newest_first:)`                                                      | `Query.users(sort:)`                                          |
| `Query.users(non_active:)`                                                        | `Query.users(status:)`                                        |

# Mutations

## Add users to board

**Required scope: `boards:write`**

Adds users to a board. Returns [`[User]`](https://developer.monday.com/api-reference/reference/users).

```graphql GraphQL
mutation {
  add_users_to_board(
    board_id: 1234567890
    user_ids: [
      123456
      234567
      345678
    ] 
    kind: owner
  ) {
    id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
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
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `BoardSubscriberKind`
      </td>

      <td>
        The user's role.
      </td>

      <td>
        `owner`  
        `subscriber`
      </td>
    </tr>

    <tr>
      <td>
        user_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The users' unique identifiers.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Add users to team

Adds users to a team. Returns [`ChangeTeamMembershipResult`](https://developer.monday.com/api-reference/docs/other-types#change-team-memberships-result).

```graphql GraphQL
mutation {
  add_users_to_team(
    team_id: 7654321
    user_ids: [
      123456
      654321
      12345
    ]
  ) {
    successful_users {
      name
      email
    }
    failed_users {
      name
      email
    }
  }
}
```

### Arguments

| Argument  | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| team\_id  | `ID!`    | The team's unique identifier.  |
| user\_ids | `[ID!]!` | The users' unique identifiers. |

## Add users to workspace

**Required scope: `workspaces:write`**

Adds users to a workspace. Returns [`[User]`](https://developer.monday.com/api-reference/reference/users).

```graphql GraphQL
mutation {
  add_users_to_workspace(
    workspace_id: 1234567
    user_ids: [
      123456
      654321
      987654
    ] 
    kind: subscriber
	) {
    id
  }
}
```
```javascript JavaScript
let query = "mutation { add_users_to_workspace (workspace_id: 1234567, user_ids: [123456, 654321, 012345], kind: subscriber) { id } }";

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     query : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Arguments
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
        kind
      </td>

      <td>
        `WorkspaceSubscriberKind`
      </td>

      <td>
        The user's role.
      </td>

      <td>
        `owner`  
        `subscriber`
      </td>
    </tr>

    <tr>
      <td>
        user_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The users' unique identifiers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The workspace's unique identifier.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Activate users

Activates or reactivates users in a monday.com account. Returns [`ActivateUsersResult`](https://developer.monday.com/api-reference/docs/other-types#activate-users-result).

```graphql GraphQL
mutation {
  activate_users(
    user_ids: [
      54321
      12345
    ]
	) {
    activated_users {
     id
     name
     email
    }
    errors {
      user_id
      code
      message
    }
  }
}
```
```javascript JavaScript
let query = 'mutation { activate_users (user_ids: [54321, 12345]) { activated_users { id name email } errors { user_id code message }}}';

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     'query' : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

| Argument  | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| user\_ids | `[ID!]!` | The users' unique identifiers. The maximum is 200. |

## Invite users

Invites users to join a monday.com account. They will remain in a pending status until the invitation is accepted. Returns [`InviteUsersResult`](https://developer.monday.com/api-reference/reference/other-types#invite-users-result).

```graphql GraphQL
mutation {
  invite_users(
    emails: [
      "test@monday.com"
      "test2@monday.com"
    ]
    product: crm
    user_role: VIEW_ONLY
  ) {
    errors {
      message
      code
      email
    }
    invited_users {
      name
      id
    }
  }
}
```
```javascript JavaScript
let query = 'mutation { invite_users (input: ) { deactivated_users { id name }}';

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     'query' : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
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
        emails
      </td>

      <td>
        `[String!]!`
      </td>

      <td>
        The users' emails.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        product
      </td>

      <td>
        `Product`
      </td>

      <td>
        The product to invite the user to.
      </td>

      <td>
        `crm`  
        `dev`  
        `forms`  
        `knowledge`  
        `service`  
        `whiteboard`  
        `workflows`  
        `work_management`
      </td>
    </tr>

    <tr>
      <td>
        user_role
      </td>

      <td>
        `UserRole`
      </td>

      <td>
        The invited user's new role.
      </td>

      <td>
        `GUEST`  
        `MEMBER`  
        `VIEW_ONLY`
      </td>
    </tr>
  </tbody>
</Table>

## Update multiple users

Updates one or multiple users' attributes. Returns [`UpdateUserAttributesResult`](https://developer.monday.com/api-reference/reference/other-types#update-user-attributes-result).

```graphql GraphQL
mutation {
  update_multiple_users(
    user_updates: [
      {
        user_id: 12345678
        user_attribute_updates: {
          birthday: "1985-06-01"
          email: "user12345678@monday.com"
        }
      }
      {
        user_id: 87654321
        user_attribute_updates: {
          birthday: "1975-01-20"
          email: "user87654321@monday.com"
        }
      }
    ]
  ) {
    updated_users {
      name
      birthday
      email
      id
    }
    errors {
      message
      code
      user_id
    }
  }
}
```

### Arguments

| Argument      | Type                                                                                                        | Description                                                                                                                                                     |
| :------------ | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user\_updates | [`[UserUpdateInput!]!`](https://developer.monday.com/api-reference/reference/other-types#user-update-input) | The unique identifiers and attributes to update. Updates users' birthdays, departments, emails, join dates, locations, mobile phone numbers, names, and titles. |

## Update email domain

Updates a user's email domain. Returns [`UpdateEmailDomainResult`](https://developer.monday.com/api-reference/reference/other-types#update-users-email-domain-result).

```graphql GraphQL
mutation {
  update_email_domain(
    input: {
      new_domain: "test@monday.com"
      user_ids: [
        123456
        654321
      ]
    }
	) {
    updated_users {
      name
      is_admin
    }
    errors {
      user_id
      code
      message
    }
  }
} 
```

### Arguments

| Argument | Type                                                                                                                                         | Description               |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| input    | [`UpdateEmailDomainAttributesInput!`](https://developer.monday.com/api-reference/reference/other-types#update-email-domain-attributes-input) | The attributes to update. |

## Update user's role

Updates a user's role (accepts both custom or default roles). Returns [`UpdateUsersRoleResult`](https://developer.monday.com/api-reference/reference/other-types#update-users-role-result).

Please keep the following in mind:

* You can't update yourself
* Maximum of 200 user IDs per mutation
* Only admins can use this mutation

```graphql GraphQL (Default Role)
mutation {
  update_users_role(
    user_ids: [
      12345
      54321
    ]
    new_role: ADMIN
	) {
    updated_users {
      name
      is_admin
    }
    errors {
      user_id
      code
      message
    }
  }
} 
```
```graphql GraphQL (Custom Role)
mutation {
  update_users_role(
    user_ids: [
      12345
      54321
    ]
    role_id: "5"
	) {
    updated_users {
      name
    }
    errors {
      user_id
      code
      message
    }
  }
} 
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
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
        new_role
      </td>

      <td>
        `BaseRoleName`
      </td>

      <td>
        The user's updated role. Only used to update default roles, not custom ones (read more [here](https://developer.monday.com/api-reference/reference/account-roles)).
      </td>

      <td>
        `ADMIN`  
        `GUEST`  
        `MEMBER`  
        `VIEW_ONLY`
      </td>
    </tr>

    <tr>
      <td>
        role_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The custom role's unique identifier (found by querying [`account_roles`](https://developer.monday.com/api-reference/reference/account-roles)). Available only for enterprise customers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The users' unique identifiers. The maximum is 200.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Delete subscribers from a board

Deletes subscribers from a board. Returns [`[User]`](https://developer.monday.com/api-reference/docs/users#fields).

```graphql GraphQL
mutation {
  delete_subscribers_from_board(
    board_id: 1234567890
    user_ids: [
      12345678
      87654321
      56789012
    ]
	) {
    id
  }
}
```
```javascript JavaScript
let query = 'mutation { delete_subscribers_from_board (board_id: 1234567890, user_ids: [12345678, 87654321, 01234567]) { id }}';

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     'query' : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

| Argument  | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| board\_id | `ID!`    | The board's unique identifier. |
| user\_ids | `[ID!]!` | The users' unique identifiers. |

## Clear users department

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

Clears a user's department. Returns [`ClearUsersDepartmentResult`](https://developer.monday.com/api-reference/reference/users-other-types#clearusersdepartmentresult).

```graphql
mutation {
  clear_users_department(user_ids: [12345, 54321]) {
    cleared_users {	
      name
      id
      department
    }
  }
}
```

### Arguments

| Argument  | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| user\_ids | `[ID!]!` | The IDs of the users to clear the department of. |

## Remove users from team

Removes users from a team. Returns [`ChangeTeamMembershipResult`](https://developer.monday.com/api-reference/docs/other-types#change-team-memberships-result).

```graphql GraphQL
mutation {
  remove_users_from_team(
    team_id: 7654321
    user_ids: [
      123456
      654321
      987654
    ]
	) {
    successful_users {
      name
      email 
    }
    failed_users {
      name
      email
    }
  }
}   
```
```javascript JavaScript
let query = "mutation { remove_users_from_team (team_id:7654321, user_ids: [123456, 654321, 012345]) { successful_users { name email } failed_users { name email }}}";

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     query : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

| Argument  | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| team\_id  | `ID!`    | The team's unique identifier.  |
| user\_ids | `[ID!]!` | The users' unique identifiers. |

## Delete users from workspace

**Required scope: `workspaces:write`**

Deletes users from a workspace. Returns [`[User]`](https://developer.monday.com/api-reference/docs/users#fields).

```graphql GraphQL
mutation {
  delete_users_from_workspace(
    workspace_id: 1234567
    user_ids: [
      123456
      654321
      987654
    ]
	) {
    id
  }
}
```
```javascript JavaScript
let query = "mutation { delete_users_from_workspace (workspace_id: 1234567, user_ids: [123456, 654321, 012345]) { id } }";

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE'
   },
   body: JSON.stringify({
     query : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
```

### Arguments

| Arguments     | Type     | Description                        |
| :------------ | :------- | :--------------------------------- |
| user\_ids     | `[ID!]!` | The users' unique identifiers.     |
| workspace\_id | `ID!!`   | The workspace's unique identifier. |

## Deactivate users

Deactivates users from a monday.com account. Returns [`DeactivateUsersResult`](https://developer.monday.com/api-reference/reference/other-types#deactivate-users-result).

Please keep the following in mind:

* You can't deactivate yourself
* There's a maximum of 200 users per mutation
* Only admins can use this mutation
* Deactivating a user also deactivates the integrations and automations they've created. Read more about deactivating users [here](https://support.monday.com/hc/en-us/articles/360002426980-How-to-manage-users-on-your-account#:~:text=To%20reactivate%20a%20user%20who,side%20and%20press%20Activate%20user.)!

```graphql GraphQL
mutation {
  deactivate_users(
    user_ids: [
      54321
      12345
    ]
	) {
    deactivated_users {
     id
     name
    }
    errors {
      message
      code
      user_id
    }
  }
}
```

### Arguments

| Arguments | Type     | Description                                                            |
| :-------- | :------- | :--------------------------------------------------------------------- |
| user\_ids | `[ID!]!` | The unique identifiers of the users to deactivate. The maximum is 200. |
