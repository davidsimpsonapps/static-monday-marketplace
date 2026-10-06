---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn more about the other types used when reading notifications settings via the API

# NotificationSettingChannel

An object containing the notification settings' available notification channels.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Field
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        editable\_status `ChannelEditableStatus`
      </td>

      <td style={{ textAlign: "left" }}>
        The notification channel's editable status. 
      </td>

      <td style={{ textAlign: "left" }}>
        `AllRelatedNotificationsDontHaveChannel`\
        `AlwaysEnabled`\
        `Editable`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        enabled `Boolean`
      </td>

      <td style={{ textAlign: "left" }}>
        Whether notifications are enabled for this channel.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        name `ChannelType`
      </td>

      <td style={{ textAlign: "left" }}>
        The name of the notification channel.
      </td>

      <td style={{ textAlign: "left" }}>
        `Email`\
        `Monday`\
        `Slack`
      </td>
    </tr>
  </tbody>
</Table>
