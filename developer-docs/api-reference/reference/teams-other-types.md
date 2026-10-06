---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the teams APIs

The monday.com [teams](https://developer.monday.com/api-reference/reference/teams) APIs enable you to create, read, update, and delete teams.

The types below are used by the teams queries and mutations, and are not independently queryable.

# AssignTeamOwnersResult

An object containing the result of assigning team owners via the API.

| Field  | Type                                                                                                                    | Description                                                                                               |
| :----- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| errors | [`[AssignTeamOwnersError!]`](https://developer.monday.com/api-reference/reference/other-types#assign-team-owners-error) | The errors that occurred while assigning owners to a team. Use this field to check for calls that failed. |
| team   | [`Team`](https://developer.monday.com/api-reference/reference/teams)                                                    | The team the owners were assigned to.                                                                     |

## AssignTeamOwnersError

An object containing the error that occurred when an `assign_team_owners` mutation fails.

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
        `AssignTeamOwnersErrorCode`
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
        `USER_NOT_MEMBER_OF_TEAM`  
        `VIEWERS_OR_GUESTS`
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

# ChangeTeamMembershipsResult

An object containing the result of adding or removing users from a team via the API.

| Field             | Type                                                                    | Description                                              |
| :---------------- | :---------------------------------------------------------------------- | :------------------------------------------------------- |
| failed\_users     | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users for whom the team membership update failed.    |
| successful\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users for whom the team membership update succeeded. |

***

# CreateTeamAttributesInput

An object containing the attributes of the team to create.

| Field            | Type      | Description                                                                             |
| :--------------- | :-------- | :-------------------------------------------------------------------------------------- |
| is\_guest\_team  | `Boolean` | Whether the new team contains guest users.                                              |
| name             | `String!` | The new team's name.                                                                    |
| parent\_team\_id | `ID`      | The parent team's unique identifier.                                                    |
| subscriber\_ids  | `[ID!]`   | The team members' unique identifiers. Cannot be empty unless `allow_empty_team` is set. |

***

# CreateTeamOptionsInput

An object containing the options for the team to create.

| Field              | Type      | Description                                      |
| :----------------- | :-------- | :----------------------------------------------- |
| allow\_empty\_team | `Boolean` | Whether or not the team can have no subscribers. |

***

# RemoveTeamOwnersResult

An object containing the result of removing team owners via the API.

| Field  | Type                                                                 | Description                                                                                                |
| :----- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| errors | `[RemoveTeamOwnersError!]`                                           | The errors that occurred while removing owners from a team. Use this field to check for calls that failed. |
| team   | [`Team`](https://developer.monday.com/api-reference/reference/teams) | The team the owners were removed from.                                                                     |

## RemoveTeamOwnersError

An object containing the error that occurred when a `remove_team_owners` mutation fails.

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
        Enum values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        code
      </td>

      <td>
        `RemoveTeamOwnersErrorCode`
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
        `USER_NOT_MEMBER_OF_TEAM`  
        `VIEWERS_OR_GUESTS`
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

<br />
