---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Apps monetization status

Learn how to query an account's app monetization status using the monday.com platform API

The monday.com apps framework utilizes [monetization](https://developer.monday.com/apps/docs/monetization) to accept and process payments within the platform itself.

# Queries

## Get apps monetization status

* Returns a boolean representing whether an account supports monetization
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  apps_monetization_status {
    is_supported
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query { apps_monetization_status { is_supported } }";
const response = await mondayApiClient.request(query);
```

### Fields

| Field         | Type       | Description                                    |
| :------------ | :--------- | :--------------------------------------------- |
| is\_supported | `Boolean!` | Whether the account supports app monetization. |
