---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Mute board settings

Learn how to read a board’s muted notification settings via the platform API

Notifications are a core part of monday.com, helping users and teams stay up to date on important changes, assignments, and mentions. However, there are times when users or board owners may want to reduce noise by [muting notifications](https://support.monday.com/hc/en-us/articles/360001292545-Notifications-explained#mute_board_notifications) for specific boards.

# Queries

## Get mute board settings

* Returns a board's muted notification settings
* Can only be queried at the root; cannot be nested within another query

```graphql GraphQL
query {
  mute_board_settings(board_ids: [1234567890]) {
    board_id
    mute_state
  }
}
```
```json JSON
{
  "data": {
    "mute_board_settings": [
      {
        "board_id": "1234567890",
        "mute_state": "CURRENT_USER_MUTE_ALL"
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument   | Type     | Description                                                         |
| :--------- | :------- | :------------------------------------------------------------------ |
| board\_ids | `[ID!]!` | The unique identifiers of the boards to retrieve mute settings for. |

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
        board_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        mute_state
      </td>

      <td>
        `BoardMuteState`
      </td>

      <td>
        The board's mute state.
      </td>

      <td>
        • `CURRENT_USER_MUTE_ALL`: current user has all notifications muted  
        • `MENTIONS_AND_ASSIGNS_ONLY`: current user is only notified when mentioned or assigned something  
        • `MUTE_ALL`: board owner has all notifications for all users are muted  
        • `NOT_MUTED`: board owner has nothing muted for all users
      </td>
    </tr>
  </tbody>
</Table>

# Mutations

## Update mute board settings

Updates the mute notification settings for a specific board. Returns [`[BoardMuteSettings!]`](https://developer.monday.com/api-reference/reference/notifications-other-types#boardmutesettings).

```graphql GraphQL
mutation {
  update_mute_board_settings(
    board_id: "1234567890", 
    enabled: IM_ASSIGNED, 
    mute_state: CUSTOM_SETTINGS
  ) {
    enabled
    mute_state
    board_id
  }
}
```
```json JSON
{
  "data": {
    "update_mute_board_settings": [
      {
        "enabled": [
          "IM_ASSIGNED"
        ],
        "mute_state": "CUSTOM_SETTINGS",
        "board_id": "1234567890"
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
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
        `String!`
      </td>

      <td>
        The unique identifier of the board to update the mute settings for.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        enabled
      </td>

      <td>
        `[CustomizableBoardSettings!]`
      </td>

      <td>
        An array specifying which custom settings are enabled. Only used for  `CUSTOM_SETTINGS` mute state.
      </td>

      <td>
        • `AUTOMATION_NOTIFIED`: notify the current user when an automation reaches a “notify” step on this board  
        • `IM_ASSIGNED`: notify the current user when they're assigned on the board  
        • `IM_MENTIONED`: notify the current user when they're mentioned on the board
      </td>
    </tr>

    <tr>
      <td>
        mute_state
      </td>

      <td>
        `BoardMuteState!`
      </td>

      <td>
        The desired board mute state.
      </td>

      <td>
        • `CURRENT_USER_MUTE_ALL`: mute all notifications for the current user  
        • `CUSTOM_SETTINGS`: notify the current user for the enabled custom settings (must be used with the `enabled` argument)  
        • `MENTIONS_AND_ASSIGNS_ONLY`: notify the current user only when they are mentioned or assigned something  
        • `MUTE_ALL`: mute all notifications for all users (admin-only)  
        • `NOT_MUTED`: unmute everything (admin-only)
      </td>
    </tr>
  </tbody>
</Table>
