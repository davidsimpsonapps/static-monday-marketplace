---
updatedAt: 2026-10-02T13:46:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Boards

Learn how to read, create, update, and delete boards using the platform API

monday.com [boards](https://support.monday.com/hc/en-us/articles/115005317249-The-basics-of-a-board) are where users input all of their data, making them a core component of the platform. The board's structure consists of <Glossary>items</Glossary>(rows), [groups](https://support.monday.com/hc/en-us/articles/360011472320-The-basics-of-groups) (groups of rows), and [columns](https://support.monday.com/hc/en-us/articles/115005466609-The-basics-of-columns), and the board's data is stored in items and their respective [updates](https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section) sections.

# Queries

## Get boards

* **Required scope: `boards:read`**
* Returns an array containing metadata about one or a collection of boards
* Can be queried directly at the root or nested within another query (e.g., `items`)

```graphql GraphQL
query {
  boards(
    ids: [1234567890]
    hierarchy_types: [classic, multi_level]
  ) {
    name
    state
    permissions
    items_page {
      items {
        id
        name
      }
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken});

const query = `query { boards (ids: [1234567890]) { name state permissions items_page { items { id name }}}}`
const response = await mondayApiClient.request(query);
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
        board_kind
      </td>

      <td>
        `BoardKind`
      </td>

      <td>
        The type of board to return.
      </td>

      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        hierarchy_type
      </td>

      <td>
        `[BoardHierarchy!]`
      </td>

      <td>
        The board hierarchy type to filter by. If omitted, only `classic` boards will be returned unless specific board IDs are provided.
      </td>

      <td>
        `classic`  
        `multi_level`
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
        The specific board IDs to return.
      </td>

      <td>

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
        The number of boards to return. The default is 25.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        order_by
      </td>

      <td>
        `BoardsOrderBy`
      </td>

      <td>
        The order in which to retrieve your boards.
      </td>

      <td>
        `created_at` (desc.)  
        `used_at` (desc.)
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
        state
      </td>

      <td>
        `State`
      </td>

      <td>
        The state of the board to return. The default is `active`.
      </td>

      <td>
        `active`  
        `all`  
        `archived` `deleted`
      </td>
    </tr>

    <tr>
      <td>
        workspace_ids
      </td>

      <td>
        `[ID]`
      </td>

      <td>
        The specific workspace IDs that contain the boards to return.
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
        access_level
      </td>

      <td>
        `BoardAccessLevel!`
      </td>

      <td>
        The user's board permission level.
      </td>

      <td>
        `edit`  
        `view`
      </td>
    </tr>

    <tr>
      <td>
        activity_log
      </td>

      <td>
        [`BoardActivityLogsPage`](https://developer.monday.com/api-reference/reference/boards-other-types#boardactivitylogspage)
      </td>

      <td>
        Returns a page of the board's activity log events. **Only available in versions `2026-10` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        activity_logs
      </td>

      <td>
        [`[ActivityLogType]`](https://developer.monday.com/api-reference/docs/activity-logs)
      </td>

      <td>
        The activity log events for the queried board(s).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder that contains the board(s). Returns `null` if the board is not in a folder.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_kind
      </td>

      <td>
        `BoardKind!`
      </td>

      <td>
        The board's type.
      </td>

      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        columns
      </td>

      <td>
        [`[Column]`](https://developer.monday.com/api-reference/docs/columns)
      </td>

      <td>
        The board's visible columns.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        communication
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The board's communication value (typically a meeting ID).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator
      </td>

      <td>
        [`User!`](https://developer.monday.com/api-reference/reference/users#fields)
      </td>

      <td>
        The board's creator.
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
        The board's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        groups
      </td>

      <td>
        [`[Group]`](https://developer.monday.com/api-reference/reference/groups#fields)
      </td>

      <td>
        The board's visible groups.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        hierarchy_type
      </td>

      <td>
        `BoardHierarchy`
      </td>

      <td>
        The board's hierarchy type.
      </td>

      <td>
        `classic`  
        `multi_level`
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
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        item_terminology
      </td>

      <td>
        `String`
      </td>

      <td>
        The nickname for items on the board. Can be a predefined or custom value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        items_count
      </td>

      <td>
        `Int`
      </td>

      <td>
        The number of items on the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        items_page
      </td>

      <td>
        [`ItemsResponse!`](https://developer.monday.com/api-reference/docs/items_page)
      </td>

      <td>
        The board's items. Can be used to retrieve all items on a board.
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
        The board's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type_unique_key
      </td>

      <td>
        `String`
      </td>

      <td>
        A unique identifier for the board's object type. May return `null` for boards without a specific object type classification.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        owner (DEPRECATED)
      </td>

      <td>
        [`User!` ](https://developer.monday.com/api-reference/reference/users#fields)
      </td>

      <td>
        The user who created the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        owners
      </td>

      <td>
        [`[User]!`](https://developer.monday.com/api-reference/reference/users#fields)
      </td>

      <td>
        The board's owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        permissions
      </td>

      <td>
        `String!`
      </td>

      <td>
        The board's permissions.
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
        state
      </td>

      <td>
        `State!`
      </td>

      <td>
        The board's state.
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
        subscribers
      </td>

      <td>
        [`[User]!`](https://developer.monday.com/api-reference/reference/users#fields)
      </td>

      <td>
        The board's subscribers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        tags
      </td>

      <td>
        [`[Tag]`](https://developer.monday.com/api-reference/reference/tags-1#fields)
      </td>

      <td>
        The board's tags.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        team_owners
      </td>

      <td>
        [`[Team!]`](https://developer.monday.com/api-reference/reference/teams#fields)
      </td>

      <td>
        The board's team owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        team_subscribers
      </td>

      <td>
        [`[Team!]`](https://developer.monday.com/api-reference/reference/teams#fields)
      </td>

      <td>
        The board's team subscribers. A value of `-1` indicates that the "everyone at account" team is subscribed to this board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        top_group
      </td>

      <td>
        [`Group!`](https://developer.monday.com/api-reference/reference/groups#fields)
      </td>

      <td>
        The group at the top of the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `BoardObjectType`
      </td>

      <td>
        The board's object type.
      </td>

      <td>
        `board`  
        `custom_object`  
        `document`  
        `sub_items_board`
      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `ISO8601DateTime`
      </td>

      <td>
        The last time the board was updated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updates
      </td>

      <td>
        [`[Update]`](https://developer.monday.com/api-reference/docs/updates)
      </td>

      <td>
        The board's updates.
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
        The board's URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        views
      </td>

      <td>
        `[BoardView]`
      </td>

      <td>
        The board's views.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace
      </td>

      <td>
        [`Workspace`](https://developer.monday.com/api-reference/docs/workspaces)
      </td>

      <td>
        The workspace that contains the board. Returns `null` for the _Main_ workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the board's workspace. Returns `null` for the _Main_ workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_from_board_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the source board this board was created from (e.g., when duplicated). Returns `null` if the board was not created from another board. **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        folder
      </td>

      <td>
        [`Folder`](https://developer.monday.com/api-reference/reference/folders)
      </td>

      <td>
        The folder containing this board. Returns `null` if the board is not in a folder. **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        inferred_metadata
      </td>

      <td>
        [`BoardInferredMetadata`](https://developer.monday.com/api-reference/reference/boards-other-types#boardinferredmetadata)
      </td>

      <td>
        Inferred metadata for the board (for example, custom terminology for items). **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        manual_metadata
      </td>

      <td>
        [`BoardManualMetadata`](https://developer.monday.com/api-reference/reference/boards-other-types#boardmanualmetadata)
      </td>

      <td>
        Manually set metadata for the board (for example, markdown describing the board). **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Get export job status

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

* 🚧 Only available for **Enterprise plans** — other accounts receive a `FORBIDDEN_EXCEPTION` error
* **Required scope: `boards:read`**
* Returns the current state of an async board export as [`ExportJobStatusInfo`](https://developer.monday.com/api-reference/reference/boards-other-types#exportjobstatusinfo), or `null`
* Use it to poll a `job_id` returned by [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export)

```graphql GraphQL
query {
  export_job_status(job_id: "a1b2c3d4-0000-0000-0000-000000000000") {
    status
    download_url
    failure_reason
    failure_message
  }
}
```

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($job: ID!) { export_job_status (job_id: $job) { status download_url failure_reason failure_message }}`
const variables = {
  job: "a1b2c3d4-0000-0000-0000-000000000000"
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type  | Description                                     |
| :------- | :---- | :---------------------------------------------- |
| job\_id  | `ID!` | The `job_id` returned by `create_board_export`. |

### Polling

Poll until `status` is one of the terminal values — `COMPLETED`, `FAILED`, or `CANCELLED`:

* **`COMPLETED`** — read `download_url`. It can still be `null` if you poll after the URL has expired, so check before using it.
* **`FAILED`** — read `failure_reason` (and `failure_message` when present).
* **`RUNNING`** — wait and poll again.

Back off between polls rather than polling in a tight loop; every call counts against your [rate limits](https://developer.monday.com/api-reference/docs/rate-limits). Large exports can take minutes, so set a timeout in your own client rather than polling indefinitely.

<Callout icon="⚠️" theme="warn">
  **A `null` result does not mean the job failed.** This query returns `null` for a `job_id` that does not exist *and* for one that belongs to a different account — the two are deliberately indistinguishable, so an ID that leaks cannot be used to probe for other accounts' exports. If you get `null` for an ID you just received, check that you are querying with the same account's token.
</Callout>

# Mutations

**Required scope: `boards:write`**

## Create board

Creates a new board. Returns [`Board`](https://developer.monday.com/api-reference/docs/boards#fields).

The user who creates the board is automatically added as a board owner when creating a private or shareable board or if `board_owners_ids` is not provided.

<Callout icon="🚧" theme="warn">
  This mutation has an additional rate limit of **40** mutations per minute.
</Callout>

```graphql GraphQL
mutation {
  create_board(
    board_name: "my board"
    board_kind: public
    item_nickname: { preset_type: "item" }
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
        board_kind
      </td>

      <td>
        `BoardKind!`
      </td>

      <td>
        The type of board to create.
      </td>

      <td>
        `private`  
        `public` `share`
      </td>
    </tr>

    <tr>
      <td>
        board_name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new board's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_owner_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        A list of the IDs of the users who will be board owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_owner_team_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        A list of the IDs of the teams that will be board owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_subscriber_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        A list of the IDs of the users who will subscribe to the board.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_subscriber_teams_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        A list of the IDs of the teams that will subscribe to the board.
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
        The new board's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        empty
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Creates an empty board without any default items.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The board's folder ID.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        item_nickname
      </td>

      <td>
        [`ItemNicknameInput`](https://developer.monday.com/api-reference/reference/boards-other-types#itemnicknameinput)
      </td>

      <td>
        The nickname configuration for items on the board. When provided, the configuration is applied to the new board's items.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        template_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The board's template ID.*
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The board's workspace ID.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        prompt
      </td>

      <td>
        `String`
      </td>

      <td>
        An AI prompt to generate the board's structure and content (columns, groups, items). **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        use_mls_template
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        When `true`, creates the board as a [multi-level board](https://developer.monday.com/api-reference/docs/working-with-multi-level-boards) using the MLS template. **Only available in versions `2026-10` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        use_dataset_template
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        When `true`, creates the board from the dataset template. **Only available in versions `2026-10` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

\**You can see your personal template IDs in the template preview screen by activating Developer Mode in monday.labs. For built-in templates, the template ID will be the board ID of the board created from the template.*

## Change board kind

Changes the privacy kind (public, private, or shareable) of a board. Returns `ChangeBoardKindResult`.

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

```graphql GraphQL
mutation {
  change_board_kind(
    board_id: 1234567890
    kind: PRIVATE
  ) {
    id
    board_kind
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($board: ID!, $kind: BoardKindInput!) { change_board_kind(board_id: $board, kind: $kind) { id board_kind }}`
const variables = {
  board: 1234567890,
  kind: "PRIVATE"
}
const response = await mondayApiClient.request(query, variables);
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
        `BoardKindInput!`
      </td>

      <td>
        The board's new privacy kind.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`  
        `SHARE`
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
        id
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
        board_kind
      </td>

      <td>
        `String!`
      </td>

      <td>
        The board's new privacy kind.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Set board permission

Sets or updates a [board's default role/permissions](https://support.monday.com/hc/en-us/articles/115005315809-Board-permissions). Returns [`SetBoardPermissionResponse`](https://developer.monday.com/api-reference/reference/other-types#set-board-permission-response).

<Callout icon="🚧" theme="warn">
  This mutation only works for board owners on an Enterprise plan.
</Callout>

```graphql GraphQL
mutation {
  set_board_permission(
    board_id: 1234567890
    basic_role_name: viewer
  ) {
    edit_permissions
    failed_actions
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
        Enum values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        basic_role_name
      </td>

      <td>
        `BoardBasicRoleName!`
      </td>

      <td>
        The role's name.
      </td>

      <td>
        `contributor` (can edit content)  
        `editor` (can edit content and structure)  
        `viewer` (read-only)
      </td>
    </tr>

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
        cross_product_collaborative
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        When `true`, enables cross-product collaboration permissions for the board. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Duplicate board

Duplicates a board with all of its items and groups to a specific workspace or folder. Returns [`Board`](https://developer.monday.com/api-reference/docs/boards#fields).

An asynchronous duplication process may take some time to complete, so the query may initially return partial data.

<Callout icon="🚧" theme="warn">
  This mutation has an additional rate limit of **40** mutations per minute.
</Callout>

```graphql GraphQL
mutation {
  duplicate_board(
    board_id: 1234567890
    duplicate_type: duplicate_board_with_structure
  ) {
    board {
      id
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($board: ID!) { duplicate_board(board_id: $board, duplicate_type: duplicate_board_with_structure) { board { id }}}`
const variables = {
  board: 9571351437
}
const response = await mondayApiClient.request(query, variables);
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
        board_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The board's name. If omitted, it will be automatically generated.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        duplicate_type
      </td>

      <td>
        `DuplicateBoardType!`
      </td>

      <td>
        The duplication type.
      </td>

      <td>
        `duplicate_board_with_pulses` (duplicate structure and items)  
        `duplicate_board_with_pulses_and_updates` (duplicate structure, items, and updates)  
        `duplicate_board_with_structure` (duplicate structure)
      </td>
    </tr>

    <tr>
      <td>
        folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The destination folder within the destination workspace. Required if you are duplicating to another workspace. If omitted, it will default to the original board's folder.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        keep_subscribers
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether to duplicate the subscribers to the new board. Defaults to false.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The destination workspace. If omitted, it will default to the original board's workspace.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update board

Updates a board. Returns a JSON object that confirms whether the update was successful and returns the updated board metadata.

```graphql GraphQL
mutation {
  update_board(
    board_id: 1234567890
    board_attribute: description
    new_value: "This is my new description"
  ) 
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($desc: String!) { update_board (board_id: 1234567890, board_attribute: description, new_value: $desc)}`
const variables = {
  desc: "This is my new description"
}
const response = await mondayApiClient.request(query, variables);
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
        board_attribute
      </td>

      <td>
        `BoardAttributes!`
      </td>

      <td>
        The board's attribute to update.
      </td>

      <td>
        `communication`  
        `description`  
        [`item_nickname`](https://developer.monday.com/api-reference/reference/boards-other-types#item_nickname) (version `2026-04` and later)
        `name`
      </td>
    </tr>

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
        new_value
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new attribute value.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update board hierarchy

Updates a board's position, workspace, or product. Returns [`UpdateBoardHierarchyResult`](https://developer.monday.com/api-reference/reference/other-types#update-board-hierarchy-result).

```graphql GraphQL
mutation {
  update_board_hierarchy(
    board_id: 1234567890,
    attributes: {
      account_product_id: 54321
      workspace_id: 12345
      folder_id: 9876543210
      position: {
        object_id: "15",
        object_type: Overview,
        is_after: true
      }
    }
  ) {
    success
  }
}
```

### Arguments

| Argument   | Type                                                                                                                                               | Description                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| attributes | [`UpdateBoardHierarchyAttributesInput!`](https://developer.monday.com/api-reference/reference/other-types#update-board-hierarchy-attributes-input) | The board's attributes to update. |
| board\_id  | `ID!`                                                                                                                                              | The board's unique identifier.    |

## Archive board

Archives a board. Returns [`Board`](https://developer.monday.com/api-reference/docs/boards#fields).

```graphql GraphQL
mutation {
  archive_board(
    board_id: 1234567890
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($board: ID!) { archive_board (board_id: $board) { id }}`
const variables = {
  board: 1234567
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument  | Type  | Description                    |
| :-------- | :---- | :----------------------------- |
| board\_id | `ID!` | The board's unique identifier. |

## Delete board

Deletes a board. Returns [`Board`](https://developer.monday.com/api-reference/docs/boards#fields).

```graphql GraphQL
mutation {
  delete_board(
    board_id: 1234567890
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board: ID!) { delete_board (board_id: $board) { id }}`
const variables = {
  board: 1234567
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument  | Type  | Description                    |
| :-------- | :---- | :----------------------------- |
| board\_id | `ID!` | The board's unique identifier. |

## Create board export

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

* 🚧 Only available for **Enterprise plans** — other accounts receive a `FORBIDDEN_EXCEPTION` error
* **Required scope: `boards:read`** (not `boards:write` — this mutation only reads board data)
* Exports a board to a CSV file and returns [`ExportResult`](https://developer.monday.com/api-reference/reference/boards-other-types#exportresult)
* The exported file is always CSV

<Callout icon="❗️" theme="error">
  **This mutation returns one of two different types, and your query must handle both.**

  Small boards usually finish immediately and return [`ExportFile`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfile) with a `download_url`. Larger ones return [`ExportAsyncJob`](https://developer.monday.com/api-reference/reference/boards-other-types#exportasyncjob) with a `job_id` you then poll.

  **Which one you get is not part of the contract.** It depends on board size and current server load, and the thresholds can be retuned without notice — so the same board can return `ExportFile` today and `ExportAsyncJob` tomorrow. A client that selects only one branch will break. Always select both.
</Callout>

```graphql GraphQL
mutation {
  create_board_export(
    board_id: 1234567890
    export_options: { include_subitems: true, header_row: COLUMN_ID, columns_order: ["name", "status", "date4"] }
    time_zone: "America/New_York"
  ) {
    ... on ExportFile {
      download_url
      expires_at
    }
    ... on ExportAsyncJob {
      job_id
    }
  }
}
```

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board: ID!) { create_board_export (board_id: $board) { ... on ExportFile { download_url expires_at } ... on ExportAsyncJob { job_id }}}`
const variables = {
  board: 1234567890
}
const response = await mondayApiClient.request(query, variables);

const result = response.create_board_export;
if (result.download_url) {
  // Finished synchronously — download it now.
} else {
  // Still running — poll export_job_status with result.job_id.
}
```

### Arguments

| Argument        | Type                                                                                                                                     | Description                                                                                                                                                                                   |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| board\_id       | `ID!`                                                                                                                                    | The unique identifier of the board to export.                                                                                                                                                 |
| export\_options | [`CreateBoardExportOptionsInput`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput) | Export configuration (subitems, header format, column order, and so on). Omit for defaults.                                                                                                   |
| time\_zone      | `String`                                                                                                                                 | IANA time zone used to format date and time values, for example `America/New_York`. Defaults to the time zone of the user whose token made the request, and to UTC if that user has none set. |

<Callout icon="⚠️" theme="warn">
  **`export_options.columns_order` selects columns as well as ordering them.** Any column you do not list is left out of the export entirely — it is not appended at the end. To reorder a board without losing columns, list every column ID you want.

  The item name and subitems columns are the exception: they are always placed first, whether or not you list them.
</Callout>

### Returns

[`ExportResult`](https://developer.monday.com/api-reference/reference/boards-other-types#exportresult) — a union of:

| Type                                                                                                       | When                        | What to do                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ExportFile`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfile)         | The export finished in time | Download `download_url` before `expires_at`.                                                                                                              |
| [`ExportAsyncJob`](https://developer.monday.com/api-reference/reference/boards-other-types#exportasyncjob) | The export is still running | Poll [`export_job_status`](https://developer.monday.com/api-reference/reference/boards#get-export-job-status) with `job_id` until the status is terminal. |

Use `__typename` if you would rather branch explicitly than infer the branch from which fields came back:

```graphql GraphQL
mutation {
  create_board_export(board_id: 1234567890) {
    __typename
    ... on ExportFile { download_url }
    ... on ExportAsyncJob { job_id }
  }
}
```

### Errors

The result has no error branch. Failures reach you one of two ways:

* **As a GraphQL error**, if the request is rejected before the export starts — for example an invalid `board_id`, missing permissions, or an unsupported combination of export options. Accounts that are not on an Enterprise plan are rejected here with the `FORBIDDEN_EXCEPTION` error code.
* **As a `FAILED` status** on [`export_job_status`](https://developer.monday.com/api-reference/reference/boards#get-export-job-status), if an async export fails after starting. Read [`ExportFailureReason`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfailurereason) to find out why.

### Download URLs

`download_url` is a presigned URL and expires. Treat it as a secret — anyone who has it can download the file until it expires. It cannot be refreshed: once it expires, call `create_board_export` again to produce a new file.
