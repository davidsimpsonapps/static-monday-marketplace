---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Notifications

Learn how to create and read notifications on monday.com using the platform API

[Notifications](https://support.monday.com/hc/en-us/articles/360001292545-How-do-notifications-work-) alert users of platform activities, such as due dates, updates, and more. They appear in multiple locations, including the bell icon and email.

Notifications relevant only to the signed-in user appear under the bell icon. By default, they will also receive an email whenever they get a notification. This can be turned off and customized in the user’s profile settings.

# Queries

## Get notifications

* Returns metadata about a user's notifications
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  notifications(filter_read: true) {
    text
    title
    id
  }
}
```
```json JSON
{
  "data": {
    "notifications": [
      {
        "text": "This is a notification",
        "title": "New test notification",
        "id": "123456"
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument     | Type              | Description                                                 |
| :----------- | :---------------- | :---------------------------------------------------------- |
| cursor       | `ID`              | The unique identifier of the last notification to retrieve. |
| filter\_read | `Boolean`         | Whether to retrieve only unread notifications.              |
| limit        | `Int`             | The number of notifications returned. The default is 25.    |
| since        | `ISO8601DateTime` | Filter notifications from this date (inclusive).            |

### Fields

| Field       | Type                                                                            | Description                                  |
| :---------- | :------------------------------------------------------------------------------ | :------------------------------------------- |
| board       | [`Board`](https://developer.monday.com/api-reference/reference/boards#fields)   | The board associated with the notification.  |
| created\_at | `Date`                                                                          | The notification's creation date.            |
| creators    | [`[User!]!`](https://developer.monday.com/api-reference/reference/users#fields) | The notifications creator(s).                |
| id          | `ID!`                                                                           | The notification's unique identifier.        |
| item        | [`Item`](https://developer.monday.com/api-reference/reference/items#fields)     | The item associated with the notification.   |
| read        | `Boolean!`                                                                      | Whether the notification has been read.      |
| text        | `String`                                                                        | The notification's text.                     |
| title       | `String`                                                                        | The notification's title.                    |
| update      | [`Update`](https://developer.monday.com/api-reference/reference/updates#fields) | The update associated with the notification. |

# Mutations

**Required scope:`notifications:write`**

## Create notification

Sends a notification to the bell icon via the API. Doing so may also send an email if the recipient's [email preferences](https://support.monday.com/hc/en-us/articles/360001292545-How-do-notifications-work-#email_notifications) are set up accordingly.

If you send a notification from a board view or widget using seamless authentication, it will be sent from the app and display its name and icon. If you use a personal API key to make the call, the notification will appear to come from the user who installed the app on the account.

This mutation only sends the notification. Since notifications are asynchronous, you can't query back the notification ID when running the mutation.

```graphql GraphQL
mutation {
  create_notification(
    user_id: 12345678
    target_id: 674387
    text: "This is a notification"
    target_type: Project
  ) {
    text
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
        target_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The target's unique identifier. The value depends on the `target_type`:

        • `Post`: update or reply ID  
        • `Project`: item or board ID
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        target_type
      </td>

      <td>
        `NotificationTargetType!`
      </td>

      <td>
        The target's type.
      </td>

      <td>
        `Post` (sends a notification referring to an update or reply)  
        `Project` (sends a notification referring to an item or board)
      </td>
    </tr>

    <tr>
      <td>
        text
      </td>

      <td>
        `String!`
      </td>

      <td>
        The notification's text.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_id
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
  </tbody>
</Table>
