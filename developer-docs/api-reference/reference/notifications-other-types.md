---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn more about the other types used when reading and creating notifications and their settings via the API

The monday.com [`notifications`](https://developer.monday.com/api-reference/reference/notification), [`notifications_settings`](https://developer.monday.com/api-reference/reference/notifications-settings), and [`mute_board_settings`](https://developer.monday.com/api-reference/reference/mute-board-settings) APIs let you create, read, and update users' notifications and notification settings.

Each object type described below represents a specific part of a user's notification settings. You can use these object types to supply metadata in mutations or to define which fields should be returned in your queries.

# BoardMuteSettings

An object containing the result of updating a board's mute notification settings via the API.

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
        board_id `ID`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        enabled `[CustomizableBoardSettings!]`
      </td>

      <td>
        A list of customizable settings. Only available when the board is in a `CUSTOM_SETTINGS` state, otherwise it returns null.
      </td>

      <td>
        `AUTOMATION_NOTIFIED`  
        `IM_ASSIGNED`  
        `IM_MENTIONED`
      </td>
    </tr>

    <tr>
      <td>
        mute_state `BoardMuteState`
      </td>

      <td>
        The current user's board mute settings state.
      </td>

      <td>
        `CURRENT_USER_MUTE_ALL`  
        `CUSTOM_SETTINGS`  
        `MENTIONS_AND_ASSIGNS_ONLY`  
        `MUTE_ALL`  
        `NOT_MUTED`
      </td>
    </tr>
  </tbody>
</Table>

# NotificationSettingChannel

An object containing the available notification settings for a given channel.

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
        editable_status `ChannelEditableStatus`
      </td>

      <td>
        Whether the notification channel settings are editable.
      </td>

      <td>
        `AllRelatedNotificationsDontHaveChannel` (not relevant to the notification)  
        `AlwaysEnabled`  
        `Editable`
      </td>
    </tr>

    <tr>
      <td>
        enabled `Boolean`
      </td>

      <td>
        Whether notifications are enabled for the channel.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name `ChannelType`
      </td>

      <td>
        The notification channel type.
      </td>

      <td>
        `Email`  
        `Monday`  
        `Slack`
      </td>
    </tr>
  </tbody>
</Table>
