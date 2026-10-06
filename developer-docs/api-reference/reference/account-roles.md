---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Account roles

Learn how to query an account's user roles using the platform API

When a user joins a monday.com account, they are assigned a [role](https://support.monday.com/hc/en-us/articles/360002144900-User-types-explained#) that specifies their permissions and what actions they can perform. All accounts have admin, member, viewer, and guest roles by default; some monday.com plans also allow you to create custom roles.

# Queries

## Get account roles

* **Required scope:`account:read`**
* Returns an object containing metadata about all user roles in an account (both default and custom)
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  account_roles {
    id
    name
    roleType
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query { account_roles { id name roleType } }`;
const response = await mondayApiClient.request(query);
```

### Fields

| Fields   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| id       | `ID`     | The role's unique identifier. |
| name     | `String` | The role's name.              |
| roleType | `String` | The role's type.              |
