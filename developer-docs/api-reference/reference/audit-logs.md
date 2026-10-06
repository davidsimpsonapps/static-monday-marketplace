---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Audit logs

Learn how to query an account's audit logs using the platform API

The [audit logs](https://support.monday.com/hc/en-us/articles/360001259429-The-Audit-Log) in monday.com provide a detailed record of an account’s security-related activities, including login attempts, board data exports, and more. Access to these logs is restricted to **account admins** on the **Enterprise** plan.

# Queries

## Get audit logs

* 🚧 Only available for **Enterprise plans**
* **Required permissions: `manage_account_security`**
* Returns an object containing metadata about audit logs
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  audit_logs(
    user_id: 1234567890 
    events: [
      "login"
      "logout"
    ] 
    limit: 100
  ) {
    logs {
      timestamp
      event
      user_agent
      user {
        id
        name
        email
      }
      ip_address
    }
    pagination {
      has_more_pages
      next_page_number
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2025-07" });

const query = `query ($userId: ID!, $events: [String!]) { audit_logs(user_id: $userId, events: $events, limit: 100) { logs { timestamp event user_agent user { id name email } ip_address } pagination { has_more_pages next_page_number } } }`
const variables = {
  userId: 1234567890,
  events: ["login", "logout"]
}

const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument    | Type              | Description                                                                                                                                                                                                          |
| :---------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| end\_time   | `ISO8601DateTime` | Filters for logs up to this date and time.                                                                                                                                                                           |
| events      | `[String!]`       | The specific event(s) to return logs for. You can view a list of supported events by querying the [`audit_event_catalogue`](https://developer.monday.com/api-reference/reference/audit-logs-event-catalogue) object. |
| ip\_address | `String`          | The specific IP address to return logs for.                                                                                                                                                                          |
| limit       | `Int`             | The number of logs per page                                                                                                                                                                                          |
| page        | `Int`             | The page number to get. Starts at 1.                                                                                                                                                                                 |
| start\_time | `ISO8601DateTime` | Filters for logs from this date and time.                                                                                                                                                                            |
| user\_id    | `ID`              | The specified user to return logs for. This ID can be retrieved by querying [`users`](https://developer.monday.com/api-reference/reference/users).                                                                   |

### Fields

| Field      | Type                                                                                                   | Description                            |
| :--------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------- |
| logs       | [`[AuditLogEntry!]`](https://developer.monday.com/api-reference/reference/other-types#audit-log-entry) | A paginated list of audit log entries. |
| pagination | [`Pagination`](https://developer.monday.com/api-reference/reference/other-types#pagination)            | Details about the object's pagination. |
