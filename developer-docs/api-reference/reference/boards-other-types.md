---
updatedAt: 2026-11-04T13:52:24.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the boards APIs

The monday.com [boards](https://developer.monday.com/api-reference/reference/boards) APIs enable you to create, read, update, and delete boards.

The types below are used by the boards queries and mutations, and are not independently queryable.

# ItemNicknameInput

An object containing the item nickname.

| Field        | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| plural       | `String` | The plural form of the item nickname    |
| preset\_type | `String` | The preset type for item nickname.      |
| singular     | `String` | The singular form of the item nickname. |

***

# item\_nickname

<Callout icon="🚧">
  **Only available in version [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An enum value of `board_attribute` on `update_board` that allows you to modify a board’s item nickname.

```graphql
mutation {
  update_board(
    board_id: 1234567890
    board_attribute: item_nickname
    new_value: "{\"preset_type\":\"other\",\"singular\":\"Task\",\"plural\":\"Tasks\"}"
  )
}
```

| Field        | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| plural       | `String` | The plural form of the item nickname    |
| preset\_type | `String` | The preset type for item nickname.      |
| singular     | `String` | The singular form of the item nickname. |

***

# SetBoardPermissionResponse

An object containing the result of setting a board's permissions via the API.

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
        edit_permissions
      </td>

      <td>
        `BoardEditPermissions!`
      </td>

      <td>
        Specifies which group of users is allowed to edit the board’s content. This setting reflects the board's technical editing permissions.
      </td>

      <td>
        `assignee`  
        `collaborators`  
        `everyone`  
        `owners`
      </td>
    </tr>

    <tr>
      <td>
        failed_actions
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        Any actions that failed during the permission update process.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateTeamsBoardRoleResponse

An object containing the result of the [`update_teams_board_role`](https://developer.monday.com/api-reference/reference/boards#update-teams-board-role) mutation.

**Only available in API versions `2026-10` and later**

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
        successful_team_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The IDs of the teams whose board role was successfully updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        failed_teams
      </td>

      <td>
        [`[FailedTeamBoardRoleUpdate!]!`](#failedteamboardroleupdate)
      </td>

      <td>
        The teams whose board role could not be updated, with the reason for each failure.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# FailedTeamBoardRoleUpdate

Represents a single team that failed to have its board role updated by [`update_teams_board_role`](https://developer.monday.com/api-reference/reference/boards#update-teams-board-role).

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
        team_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The ID of the team that could not be updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        error
      </td>

      <td>
        `String!`
      </td>

      <td>
        The reason the update failed for this team (e.g., the team isn't subscribed to the board).
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateUsersBoardRoleResponse

An object containing the result of the [`update_users_board_role`](https://developer.monday.com/api-reference/reference/boards#update-users-board-role) mutation.

**Only available in API versions `2026-10` and later**

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
        successful_user_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The IDs of the users whose board role was successfully updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        failed_users
      </td>

      <td>
        [`[FailedUserBoardRoleUpdate!]!`](#faileduserboardroleupdate)
      </td>

      <td>
        The users whose board role could not be updated, with the reason for each failure.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# FailedUserBoardRoleUpdate

Represents a single user that failed to have its board role updated by [`update_users_board_role`](https://developer.monday.com/api-reference/reference/boards#update-users-board-role).

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
        user_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The ID of the user that could not be updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        error
      </td>

      <td>
        `String!`
      </td>

      <td>
        The reason the update failed for this user.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateBoardHierarchyAttributesInput

An object containing the board's attributes to update.

| Field                | Type                                                                                                   | Description                                                                                                           |
| :------------------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| account\_product\_id | `ID`                                                                                                   | The board's updated account product ID. You must also provide the relevant `workspace_id` within the updated product. |
| folder\_id           | `ID`                                                                                                   | The board's updated folder ID.                                                                                        |
| position             | [`DynamicPosition`](https://developer.monday.com/api-reference/reference/other-types#dynamic-position) | The board's updated position in the left-side menu.                                                                   |
| workspace\_id        | `ID`                                                                                                   | The board's updated workspace ID.                                                                                     |

## Dynamic position

An object containing the board's updated position in the left-side menu of the platform.

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
        is_after
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Specifies where to position the target board relative to the reference object:

        * Set to `true` to place the target after the reference
        * Set to `false` to place the target before the reference
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the reference object that the target board should be positioned relative to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type
      </td>

      <td>
        `ObjectType!`
      </td>

      <td>
        The type of the reference object.
      </td>

      <td>
        `Board`  
        `Folder`  
        `Overview`
      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateBoardHierarchyResult

An object containing the result of updating a board's position, product, or workspace.

| Field   | Type                                                                   | Description                             |
| :------ | :--------------------------------------------------------------------- | :-------------------------------------- |
| board   | [`Board`](https://developer.monday.com/api-reference/reference/boards) | The updated board.                      |
| message | `String`                                                               | A message about the operation's result. |
| success | `Boolean!`                                                             | Whether the operation was successful.   |

***

# BoardInferredMetadata

<Callout icon="🚧">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Optional metadata inferred for a board (for example, how items are referred to in context).

| Field      | Type     | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| item\_type | `String` | Custom terminology label for items on this board (when set). |

***

# BoardManualMetadata

<Callout icon="🚧">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Optional metadata supplied explicitly for a board.

| Field     | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| board\_md | `String` | Markdown content describing the board. |

***

# BoardActivityLogsPage

<Callout icon="🚧">
  **Returned by [`Board.activity_logs`](https://developer.monday.com/api-reference/reference/activity-logs#get-board-activity-logs-in-2027-01-and-later) from API version [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01)**
</Callout>

Returned by [`activity_logs`](https://developer.monday.com/api-reference/reference/activity-logs#get-board-activity-logs-in-2027-01-and-later) on [`Board`](https://developer.monday.com/api-reference/reference/boards). A page of the board's activity log entries.

| Field  | Type             | Description                                                                 |
| :----- | :--------------- | :-------------------------------------------------------------------------- |
| logs   | `[ActivityLog!]` | The activity log entries for this page.                                     |
| cursor | `String`         | The cursor to pass to fetch the next page. `null` if this is the last page. |

***

# ExportAsyncJob

Moved to its own tab — see [`ExportAsyncJob`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportasyncjob) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ExportFile

Moved to its own tab — see [`ExportFile`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfile) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# CreateBoardExportOptionsInput

Moved to its own tab — see [`CreateBoardExportOptionsInput`](https://developer.monday.com/api-reference/docs/board-export-other-types#createboardexportoptionsinput) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ExportResult

Moved to its own tab — see [`ExportResult`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportresult) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# HeaderFormat

Moved to its own tab — see [`HeaderFormat`](https://developer.monday.com/api-reference/docs/board-export-other-types#headerformat) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ConnectedItemColumnFormat

Moved to its own tab — see [`ConnectedItemColumnFormat`](https://developer.monday.com/api-reference/docs/board-export-other-types#connecteditemcolumnformat) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# PeopleColumnFormat

Moved to its own tab — see [`PeopleColumnFormat`](https://developer.monday.com/api-reference/docs/board-export-other-types#peoplecolumnformat) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ExportJobStatusInfo

Moved to its own tab — see [`ExportJobStatusInfo`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportjobstatusinfo) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ExportJobStatus

Moved to its own tab — see [`ExportJobStatus`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportjobstatus) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# ExportFailureReason

Moved to its own tab — see [`ExportFailureReason`](https://developer.monday.com/api-reference/docs/board-export-other-types#exportfailurereason) in the [Board Export](https://developer.monday.com/api-reference/docs/board-export) reference.

***

# BoardDependencyCyclesResult

<Callout icon="🚧">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

The dependency cycles found on a board. Returned by [`board_dependency_cycles`](https://developer.monday.com/api-reference/reference/boards#get-board-dependency-cycles).

| Field     | Type                 | Description                                                               |
| :-------- | :------------------- | :------------------------------------------------------------------------ |
| board\_id | `ID`                 | The ID of the board.                                                      |
| cycles    | `[DependencyCycle!]` | The cycles found. An empty list means the board was checked and is clean. |
| truncated | `Boolean`            | Returns `true` when more cycles exist than the reporting cap allows.      |

***

# DependencyCycle

<Callout icon="🚧">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

A single cycle in the board dependency graph. Used by [`BoardDependencyCyclesResult.cycles`](https://developer.monday.com/api-reference/reference/boards-other-types#boarddependencycyclesresult).

| Field | Type           | Description                          |
| :---- | :------------- | :----------------------------------- |
| path  | `[CycleEdge!]` | The ordered items forming the cycle. |

***

# CycleEdge

<Callout icon="🚧">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

One item in a cycle, with the predecessor that links to it. Used by [`DependencyCycle.path`](https://developer.monday.com/api-reference/reference/boards-other-types#dependencycycle).

| Field           | Type            | Description                                                              |
| :-------------- | :-------------- | :----------------------------------------------------------------------- |
| item\_id        | `ID`            | The item that is part of the cycle.                                      |
| predecessor\_id | `ID`            | The item that this item depends on within the cycle.                     |
| type            | `CycleEdgeType` | The link type. Returns `null` when the stored edge type is unrecognized. |

***

# CycleEdgeType

<Callout icon="🚧">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

The type of link between two items inside a cycle. Used by [`CycleEdge.type`](https://developer.monday.com/api-reference/reference/boards-other-types#cycleedge).

| Value       | Description                                                                |
| :---------- | :------------------------------------------------------------------------- |
| `FS`        | Finish to Start: the item can start only after its predecessor finishes.   |
| `SS`        | Start to Start: the item can start only after its predecessor starts.      |
| `FF`        | Finish to Finish: the item can finish only after its predecessor finishes. |
| `SF`        | Start to Finish: the item can finish only after its predecessor starts.    |
| `HIERARCHY` | A parent/subitem link rather than a dependency.                            |
