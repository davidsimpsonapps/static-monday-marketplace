---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Audit event catalogue

Learn how to query a catalogue of audit log events using the platform API

The [audit logs](https://support.monday.com/hc/en-us/articles/360001259429-The-Audit-Log) in monday.com provide a detailed record of an account’s security-related activities, including login attempts, board data exports, and more. Access to these logs is restricted to **account admins** on the **Enterprise** plan.

# Queries

## Get audit event catalogue

* 🚧 Only available for **Enterprise plans**
* Returns an object containing a list of supported audit log events. Used to filter results when querying [`audit_logs`](https://developer.monday.com/api-reference/reference/audit-logs).
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  audit_event_catalogue {
    description
    metadata_details
    name
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2025-07" });

const query = `query {
  audit_event_catalogue {
    description
    metadata_details
    name
  }
}`
const response = await mondayApiClient.request(query);
```

### Fields

| Field            | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| description      | `String` | The audit log event's description. |
| metadata\_detail | `JSON`   | The audit log event's metadata.    |
| name             | `String` | The audit log event's description. |
