---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Workspaces

Learn how to query and update monday workspaces using the platform API

monday.com [workspaces](https://support.monday.com/hc/en-us/articles/360010785460-The-Workspaces) are used by teams to manage their accounts by departments, teams, or projects. They contain boards, dashboards, and folders to help you stay organized.

# Queries

## Get workspaces

* **Required scope: `workspaces:read`**
* Returns an array containing metadata about one or a collection of workspaces
* Can be queried directly at the root or nested within a `boards` query (returns the workspace ID, only requires the **`boards:read`** scope)

```graphql GraphQL
query {
  workspaces(ids: 1234567) {
    id
    name
    kind
    description
  }
}
```

### Querying the main workspace

Every account has a main workspace, but you typically can't query its details via the API.

However, users will eventually be able to query main workspace details as we complete a multi-product migration over the next few months. This capability will be released gradually, so you may not have access yet. All users will have this capability by the end of the migration.

Here's the expected behavior for both pre-and post-migration:

#### **Pre-migration**

If you query the workspaces on your account, the main workspace will not appear in the results because it has a `null` or `-1` ID. You can, however, filter for boards in the main workspace by passing `null` as the `workspace_id`.

```graphql
query {
  boards (workspace_ids: [null], limit:50) {
    name
  }
}
```

#### **Post-migration**

If you query the workspaces on your account, the main workspace will appear in the results with a real `id`. You can then use that ID to query the main workspace.

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
        ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The specific workspace(s) to return.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `WorkspaceKind`
      </td>

      <td>
        The kind of workspaces to return.
      </td>

      <td>
        `closed`  
        `open`  
        `template`
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
        The number of workspaces to return. The default is 25.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        membership_kind
      </td>

      <td>
        `WorkspaceMembershipKind`
      </td>

      <td>
        The type of membership relationship the user has with the workspace.
      </td>

      <td>
        `all`  (returns all workspaces visible to the user)
        `member` (returns only workspaces the user is a member of)
      </td>
    </tr>

    <tr>
      <td>
        order_by
      </td>

      <td>
        `WorkspacesOrderBy`
      </td>

      <td>
        The order in which to retrieve your workspaces.
      </td>

      <td>
        `created_at`
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
        The page number to get. Starts at 1.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `State`
      </td>

      <td>
        The state of the workspaces you want to filter by. The default is `active`.
      </td>

      <td>
        `active`  `all`  
        `archived`  
        `deleted`
      </td>
    </tr>

    <tr>
      <td>
        query_params
      </td>

      <td>
        `WorkspacesQueryInput`
      </td>

      <td>
        Filter workspaces by account product kind. **Only available in versions `2026-04` and later.**
      </td>

      <td>
        `account_product_kind`:  
        `core`  
        `crm`  
        `forms`  
        `marketing`  
        `project_management`  
        `service`  
        `software`  
        `whiteboard`
      </td>
    </tr>
  </tbody>
</Table>

### Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Fields
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
        account_product
      </td>

      <td>
        [`AccountProduct`](https://developer.monday.com/api-reference/docs/other-types#account-product)
      </td>

      <td>
        The account's product that contains the workspace.
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
        The workspace's creation date.
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
        The workspace's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The workspace's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_default_workspace
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the workspace is the default workspace of the product or account. Not all accounts can query the _main workspace_ (see more [here](<| https://developer.monday.com/api-reference/reference/workspaces#querying-the-main-workspace |    | | :------------------------------------------------------------------------------------------ | :- |>)).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `WorkspaceKind`
      </td>

      <td>
        The workspace's kind.
      </td>

      <td>
        `closed`  
        `open`  
        `template`
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
        The workspace's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        owners_subscribers
      </td>

      <td>
        [`[User]`](https://developer.monday.com/api-reference/docs/users#fields)
      </td>

      <td>
        The workspace's owners. The default is 25. Requires **`users:read`** scope.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        [`WorkspaceSettings`](https://developer.monday.com/api-reference/reference/workspaces-other-types#workspacesettings)
      </td>

      <td>
        The workspace's settings.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `State`
      </td>

      <td>
        The workspace's state. The default is `active`.
      </td>

      <td>
        `active`  
        `all`  
        `archived`  
        `deleted`
      </td>
    </tr>

    <tr>
      <td>
        team_owners_subscribers
      </td>

      <td>
        [`[Team!]`](https://developer.monday.com/api-reference/docs/teams#fields)
      </td>

      <td>
        The workspace's team owners. The default is 25. Requires **`teams:read`** scope.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        teams_subscribers
      </td>

      <td>
        [`[Team]`](https://developer.monday.com/api-reference/docs/teams#fields)
      </td>

      <td>
        The teams subscribed to the workspace. The default is 25. Requires **`teams:read`** scope.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        users_subscribers
      </td>

      <td>
        [`[User]`](https://developer.monday.com/api-reference/docs/users#fields)
      </td>

      <td>
        The users subscribed to the workspace. The default is 25. Requires **`users:read`** scope.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

* **Required scope: `workspaces:write`**

## Create workspace

Creates a new workspace. Returns [`Workspace`](https://developer.monday.com/api-reference/docs/workspaces#fields).

```graphql GraphQL
mutation {
  create_workspace(
    name:"New Cool Workspace"
    kind: open
    description: "This is a cool description"
    account_product_id: 505616
	) {
    id
    description
  }
}
```

### Arguments

| Arguments            | Type             | Description                                                                          | Enum Values     |
| :------------------- | :--------------- | :----------------------------------------------------------------------------------- | :-------------- |
| account\_product\_id | `ID`             | The unique identifier of the account’s product in which to create the new workspace. |                 |
| description          | `String`         | The new workspace's description.                                                     |                 |
| kind                 | `WorkspaceKind!` | The new workspace's kind.                                                            | `closed` `open` |
| name                 | `String!`        | The new workspace's name.                                                            |                 |

## Update workspace

Updates a workspace. Returns [`Workspace`](https://developer.monday.com/api-reference/docs/workspaces#fields).

```graphql GraphQL
mutation {
  update_workspace(
    id: 1234567
    attributes: {
      account_product_id: 98765
      name:"Marketing team"
      description: "This workspace is for the marketing team." 
    }
	) {
    id
  }
}
```

### Arguments

| Arguments  | Type                                                                                                                               | Description                           |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| attributes | [`UpdateWorkspaceAttributesInput!`](https://developer.monday.com/api-reference/docs/other-types#update-workspace-attributes-input) | The workspace's attributes to update. |
| id         | `ID`                                                                                                                               | The workspace's unique identifier.    |

## Add teams to workspace

Adds teams to a workspace. Returns [`[Team]`](https://developer.monday.com/api-reference/reference/teams).

```graphql GraphQL
mutation {
  add_teams_to_workspace(
    workspace_id: 1234567
    team_ids: [
      12345678
      87654321
      56789012
    ]
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
        The subscriber's kind.
      </td>

      <td>
        `owner`  
        `subscriber`
      </td>
    </tr>

    <tr>
      <td>
        team_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The teams' unique identifiers.
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

## Add users to workspace

Adds users to a workspace. Returns [`[User]`](https://developer.monday.com/api-reference/reference/users).

```graphql GraphQL
mutation {
  add_users_to_workspace(
    workspace_id: 1234567
    user_ids: [
      12345678
      87654321
      56789012
    ]
    kind: subscriber
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
        The subscriber's kind.
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

## Delete workspace

Deletes a workspace. Returns [`Workspace`](https://developer.monday.com/api-reference/docs/workspaces#fields).

```graphql GraphQL
mutation {
  delete_workspace(workspace_id: 1234567) {
    id
  }
}
```

### Arguments

| Arguments     | Type  | Description                        |
| :------------ | :---- | :--------------------------------- |
| workspace\_id | `ID!` | The workspace's unique identifier. |

## Delete teams from workspace

Deletes teams from a workspace. Returns [`[Team]`](https://developer.monday.com/api-reference/reference/teams).

```graphql GraphQL
mutation {
  delete_teams_from_workspace(
    workspace_id: 1234567
    team_ids: [
      12345678
      87654321
      56789012
    ]
	) {
    id
  }
}
```

### Arguments

| Arguments     | Type     | Description                        |
| :------------ | :------- | :--------------------------------- |
| team\_ids     | `[ID!]!` | The teams' unique identifiers.     |
| workspace\_id | `ID!`    | The workspace's unique identifier. |

## Delete users from workspace

Deletes users from a workspace. Returns [`[User]`](https://developer.monday.com/api-reference/reference/users).

```graphql GraphQL
mutation {
  delete_users_from_workspace(
    workspace_id: 1234567
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

### Arguments

| Arguments     | Type     | Description                        |
| :------------ | :------- | :--------------------------------- |
| user\_ids     | `[ID!]!` | The users' unique identifiers.     |
| workspace\_id | `ID!`    | The workspace's unique identifier. |
