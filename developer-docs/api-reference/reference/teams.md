---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Teams

Learn how to query monday team data using the platform API

[Teams](https://support.monday.com/hc/en-us/articles/115005884405-How-to-Create-a-Team) are the most efficient way to manage groups of users in monday.com. Teams are comprised of one or multiple users, and every user can be a part of multiple teams (or none).

# Queries

## Get teams

* **Required scope: `teams:read`**
* Returns an array containing metadata about one or several teams
* Can be queried directly at the root or nested within a [`users`](https://developer.monday.com/api-reference/reference/users) query (returns the teams a user is part of)

```graphql GraphQL
query {
  teams {
    name
    picture_url
    users {
      created_at
      phone
    }
  }
}
```

### Arguments

| Argument | Type    | Description                                             |
| :------- | :------ | :------------------------------------------------------ |
| ids      | `[ID!]` | The unique identifiers of the specific teams to return. |

### Fields

| Field        | Type                                                                     | Description                          |
| :----------- | :----------------------------------------------------------------------- | :----------------------------------- |
| id           | `ID!`                                                                    | The team's unique identifier.        |
| name         | `String!`                                                                | The team's name.                     |
| owners       | [`[User!]!`](https://developer.monday.com/api-reference/reference/users) | The users who are the team's owners. |
| picture\_url | `String`                                                                 | The team's picture URL.              |
| users        | [`[User]`](https://developer.monday.com/api-reference/reference/users)   | The team's users.                    |

# Mutations

## Create team

**Required scope:** `teams:write`

Creates a team. Returns [`Team`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql GraphQL
mutation {
  create_team(
    input: {
      name: "New team"
      is_guest_team: false
      subscriber_ids: [
        1234567890
        9876543210
      ]
    }
    options: {
      allow_empty_team: false
    }
  ) {
    id
  }
}
```

### Arguments

| Argument | Type                                                                                                                          | Description                          |
| :------- | :---------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| input    | [`CreateTeamAttributesInput!`](https://developer.monday.com/api-reference/reference/other-types#create-team-attributes-input) | The new team's attributes.           |
| options  | [`CreateTeamOptionsInput`](https://developer.monday.com/api-reference/reference/other-types#create-team-options-input)        | The options for creating a new team. |

## Add teams to board

**Required scope: `boards:write`**

Adds teams to a board. Returns [`[Team]`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql Sample GraphQL Mutation
mutation {
  add_teams_to_board(
    board_id: 1234567890
    kind: owner
    team_ids: [
      654321
      123456
    ]
  ) {
    id
  }
}
```

### Arguments

| Argument  | Type                  | Description                                                                                                                                                                                                                                          | Enum Values          |
| :-------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| board\_id | `ID!`                 | The board's unique identifier.                                                                                                                                                                                                                       |                      |
| kind      | `BoardSubscriberKind` | The team's role. If the argument is not used, the team will be added as a *subscriber*.                                                                                                                                                              | `owner` `subscriber` |
| team\_ids | `[ID!]!`              | The unique identifiers of the teams to add to the board. You can pass `-1` to subscribe everyone in an account to the board (see more [here](https://developer.monday.com/api-reference/changelog/bug-fix-subscribe-everyone-on-a-team-to-a-board)). |                      |

## Add users to team

**Required scope: `teams:write`**

Adds users to a team. Returns [`ChangeTeamMembershipResult`](https://developer.monday.com/api-reference/docs/other-types#change-team-memberships-result).

```graphql GraphQL
mutation {
  add_users_to_team(
    team_id: 7654321 
    user_ids: [
      123456
      654321
      012345
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

| Argument  | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| team\_id  | `ID!`    | The unique identifier of the team to add users to.      |
| user\_ids | `[ID!]!` | The unique identifiers of the users to add to the team. |

## Add teams to workspace

**Required scope: `workspaces:write`**

Adds teams to a workspace. Returns [`[Team]`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql GraphQL
mutation {
  add_teams_to_workspace(
    workspace_id: 1234567
    kind: owner
    team_ids: [
      123456
      654321
      012345
    ]
  ) {
    id
  }
}
```

### Arguments

| Arguments     | Type                      | Description                                                  | Enum Values          |
| :------------ | :------------------------ | :----------------------------------------------------------- | :------------------- |
| kind          | `WorkspaceSubscriberKind` | The team's role.                                             | `owner` `subscriber` |
| team\_ids     | `[ID!]!`                  | The unique identifiers of the teams to add to the workspace. |                      |
| workspace\_id | `ID!`                     | The workspace's unique identifier.                           |                      |

## Assign team owners

Assigns owners to a team. Returns [`AssignTeamOwnersResut`](https://developer.monday.com/api-reference/reference/other-types#assign-team-owners-result).

```graphql GraphQL
mutation {
  assign_team_owners(
    user_ids: [654321, 123456]
    team_id: 24681012
  ) {
    errors {
      message
      code
      user_id
    }
    team {
      owners {
        id
      }
    }
  }
}
```

### Arguments

| Argument  | Type     | Description                                                         |
| :-------- | :------- | :------------------------------------------------------------------ |
| team\_id  | `ID!`    | The unique identifier of the team to assign owners to.              |
| user\_ids | `[ID!]!` | The unique identifiers of the users to be assigned. Maximum of 200. |

## Remove team owners

Removes owners from a team. Returns [`RemoveTeamOwnersResult`](https://developer.monday.com/api-reference/reference/other-types#remove-team-owners-result).

```graphql GraphQL
mutation {
  remove_team_owners(
    user_ids: [
      654321
      123456
    ]
    team_id: 9876543210
  ) {
    errors {
      message
      code
      user_id
    }
    team {
      owners {
        id
      }
    }
  }
}
```

### Arguments

| Argument  | Type     | Description                                                            |
| :-------- | :------- | :--------------------------------------------------------------------- |
| team\_id  | `ID!`    | The unique identifier of the team to remove owners from.               |
| user\_ids | `[ID!]!` | The unique identifiers of the users to be removed. The maximum is 200. |

## Remove users from team

**Required scope: `teams:write`**

Removes users from a team. Returns [`ChangeTeamMembershipResult`](https://developer.monday.com/api-reference/docs/other-types#change-team-memberships-result).

```graphql GraphQL
mutation {
  remove_users_from_team(
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

| Argument  | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| team\_id  | `ID!`    | The unique identifier of the team to remove users from.      |
| user\_ids | `[ID!]!` | The unique identifiers of the users to remove from the team. |

## Delete team

**Required scope: `teams:write`**

Deletes a team. Returns [`Team`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql GraphQL
mutation {
  delete_team(team_id: 1234567890) {
    id
  }
}
```

### Arguments

| Argument | Type  | Description                                      |
| :------- | :---- | :----------------------------------------------- |
| team\_id | `ID!` | The unique identifier of the team to be deleted. |

## Delete teams from a board

**Required scope: `boards:write`**

Deletes teams from a board. Returns [`Team`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql GraphQL
mutation {
  delete_teams_from_board(
    board_id: 1234567890
    team_ids: [
      123456
      654321
      12345
    ]
  ) {
    id
  }
}
```

### Arguments

| Arguments | Type     | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| board\_id | `ID!`    | The board's unique identifier.                                |
| team\_ids | `[ID!]!` | The unique identifiers of the teams to delete from the board. |

## Delete teams from a workspace

**Required scope: `workspaces:write`**

Deletes teams from a workspace. Returns [`Team`](https://developer.monday.com/api-reference/docs/teams#fields).

```graphql GraphQL
mutation {
  delete_teams_from_workspace(
    workspace_id: 1234567
    team_ids: [
      123456
      654321
      12345
    ]
  ) {
    id
  }
}
```

### Arguments

| Arguments     | Type     | Description                                                       |
| :------------ | :------- | :---------------------------------------------------------------- |
| team\_ids     | `[ID!]!` | The unique identifiers of the teams to delete from the workspace. |
| workspace\_id | `ID!`    | The workspace's unique identifier.                                |
