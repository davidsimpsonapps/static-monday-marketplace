---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Notifications settings

Learn how to read monday.com notifications settings via the platform API

monday.com notifications play a key role in alerting users to important account activity. They are customizable and can be managed in the platform's [notifications settings](https://support.monday.com/hc/en-us/articles/360001292545-Notifications-explained) section.

# Queries

## Get notifications settings

* Returns metadata about a user's notification settings
* Can only be queried at the root; can't be nested within another query

```graphql GraphQL
query {
  notifications_settings(
    channels: [Email, Slack]
    scope_type: AccountNewUserDefaults
  ) {
    kind
    description
    is_for_admins_only
    is_for_non_guests_only
    channels {
      name
      enabled
      editable_status
    }
  }
}
```
```json JSON
{
  "data": {
    "notifications_settings": [
      {
        "kind": "invitation",
        "description": "Invitations to workspace, board, doc, item, or team",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "notify_auth_domain_signup",
        "description": "Signed up with an email address from my account domain",
        "is_for_admins_only": true,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "ask_for_permissions",
        "description": "Requests access to boards & dashboards",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "invitation_requests_admins_reminder_setting",
        "description": "Pending invite requests when invite requests have been pending for over 7 days",
        "is_for_admins_only": true,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "mention",
        "description": "Mentioned me in an update or reply",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": true,
            "editable_status": "Editable"
          }
        ]
      },
      {
        "kind": "notify_invitee_join",
        "description": "Signed up after I have invited them",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "dlp_file_deleted_setting",
        "description": "File has been deleted for breaching data policies",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "new_post_on_owned_item",
        "description": "Wrote an update on an item I own",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "like_your_post",
        "description": "Reactions to my update",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "daily_digest",
        "description": "My highlights",
        "is_for_admins_only": false,
        "is_for_non_guests_only": true,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "dlp_update_deleted_setting",
        "description": "Update has been deleted or redacted for breaching data policies",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "request_to_install_and_purchase_apps",
        "description": "Requests installation to install & purchase apps",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "notify_invitee_didnt_join",
        "description": "Didn’t sign up after I have invited them",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "assign",
        "description": "Assigned me to an item",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": true,
            "editable_status": "Editable"
          }
        ]
      },
      {
        "kind": "new_post_on_subscribed_item",
        "description": "Wrote an update on an item I’m subscribed to",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "automation",
        "description": "Automations via an automation",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "api",
        "description": "Platform API custom notifications using the GraphQL API",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "automation_product",
        "description": "Automations with a \"notify\" step this does not include \"send an email\" automations",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "reply_your_reply",
        "description": "Replied to a thread I commented on or reacted to",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "automation_system",
        "description": "Automation failures when automations don’t run as expected",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "reply_your_post",
        "description": "Replied to an update I wrote",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": true,
            "editable_status": "Editable"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
      },
      {
        "kind": "template_update",
        "description": "Template changes by the template owner",
        "is_for_admins_only": false,
        "is_for_non_guests_only": false,
        "channels": [
          {
            "name": "Email",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          },
          {
            "name": "Slack",
            "enabled": false,
            "editable_status": "AllRelatedNotificationsDontHaveChannel"
          }
        ]
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
        channels
      </td>

      <td>
        `[ChannelType!]`
      </td>

      <td>
        The notification channel type to filter by.
      </td>

      <td>
        `Email`  
        `Monday`  
        `Slack`
      </td>
    </tr>

    <tr>
      <td>
        scope_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the user to retrieve results for. Must be used with the `User` scope type argument. The default is the current signed‑in user.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        scope_type
      </td>

      <td>
        `ScopeType!`
      </td>

      <td>
        The notification settings scope types to filter by.
      </td>

      <td>
        `AccountNewUserDefaults`  
        `User` (user's private settings)
      </td>
    </tr>

    <tr>
      <td>
        setting_kinds
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The name of the notification settings type to filter by.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Field                      | Type                                                                                                                                          | Description                                                      |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| channels                   | [`[NotificationSettingChannel!]!`](https://developer.monday.com/api-reference/reference/notifications-other-types#notificationsettingchannel) | The available channels for the notification setting.             |
| description                | `String`                                                                                                                                      | The notification settings description.                           |
| is\_for\_admins\_only      | `Boolean`                                                                                                                                     | Whether the notification setting is only configurable by admins. |
| is\_for\_non\_guests\_only | `Boolean`                                                                                                                                     | Whether the notification setting is only for non‑guests.         |
| kind                       | `String`                                                                                                                                      | The notification settings kind.                                  |
