---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the audit logs API

The monday.com [audit logs](https://developer.monday.com/api-reference/reference/audit-logs) API enables admins to read their account’s security-related activities.

The types below are used by the audit logs query and are not independently queryable.

# AuditLogEntry

An object containing metadata about the audit log's entries.

| Field              | Type                                                                 | Description                                                                                                                                                                           |
| :----------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| account\_id        | `String`                                                             | The unique identifier of the account associated with the event                                                                                                                        |
| activity\_metadata | `JSON`                                                               | Additional metadata about the audit log activity.                                                                                                                                     |
| client\_name       | `String`                                                             | The name of the browser used during the event.                                                                                                                                        |
| client\_version    | `String`                                                             | The version of the browser used during the event.                                                                                                                                     |
| device\_name       | `String`                                                             | The name of the device from which the activity originated.                                                                                                                            |
| device\_type       | `String`                                                             | The type of device from which the activity originated.                                                                                                                                |
| event              | `String`                                                             | The audit log event. You can view a list of supported events by querying [`audit_event_catalogue`](https://developer.monday.com/api-reference/reference/audit-logs-event-catalogue) . |
| ip\_address        | `String`                                                             | The IP address from which the activity originated.                                                                                                                                    |
| os\_name           | `String`                                                             | The operating system name on the user's device.                                                                                                                                       |
| os\_version        | `String`                                                             | The operating system version on the user's device.                                                                                                                                    |
| slug               | `String`                                                             | The account slug.                                                                                                                                                                     |
| timestamp          | `String`                                                             | The date and time of the audit log event.                                                                                                                                             |
| user               | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who did the audit log event.                                                                                                                                                 |
| user\_agent        | `String`                                                             | The user agent string of the client or browser.                                                                                                                                       |

***

# Pagination

An object containing metadata about the audit log's pagination.

| Field              | Type      | Description                             |
| :----------------- | :-------- | :-------------------------------------- |
| has\_more\_pages   | `Boolean` | Whether there are more available pages. |
| next\_page\_number | `Int`     | The next page number.                   |
| page               | `Int`     | The current page number.                |
| page\_size         | `Int`     | The number of requested items per page. |

<br />
