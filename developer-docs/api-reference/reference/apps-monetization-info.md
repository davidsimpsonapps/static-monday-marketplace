---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Apps monetization info

Learn how to retrieve an account's seat count data using the platform API

[Seat-based pricing](https://developer.monday.com/apps/docs/plans-and-pricing#seat-based) is one pricing method available for marketplace apps. In this method, users purchase an app subscription based on the size of their monday account.

When users make a purchase, our UI will intuitively recommend an app plan based on their monday account size. Seats fluctuate over time, so developers must monitor account size to ensure compliance.

# Queries

## Get apps monetization info

* **Required scope:`account:read`**
* Returns an integer representing the number of seats in an account
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  apps_monetization_info {
    seats_count
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query { apps_monetization_info { seats_count } }";
const response = await mondayApiClient.request(query);
```
```json JSON
{
  "data": {
    "apps_monetization_info": {
      "seats_count": 3
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Fields

<Table align={["left","left","left"]}>
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
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        seats_count
      </td>

      <td>
        `Int`
      </td>

      <td>
        * For accounts with **one product**, this returns the total number of seats in the account.
        * For accounts with **more than one product**, this returns the product subscription with the most seats.
      </td>
    </tr>
  </tbody>
</Table>

# Error Handling

Refer to the [API error handling](https://developer.monday.com/api-reference/docs/error-handling#/) for a list of common error types, retry strategies, and troubleshooting examples.

When calling `apps_monetization_info`, you may occasionally see standard GraphQL or HTTP errors. Here are the most common categories to check:

| Error Type                | Description                                                      | Next Steps                                                                                   |
| :------------------------ | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Permission or scope error | The app token doesn’t include the required `account:read` scope. | Re-authorize the app requesting `account:read`.                                              |
| Validation error          | The query is nested incorrectly or contains a typo.              | Ensure `apps_monetization_info` is queried at the root level and field names match the docs. |
| Rate-limit error          | Too many requests in a short period.                             | Abide by `Retry-After` headers before trying your request again.                             |
| Server or network error   | Temporary outage or connectivity issue.                          | Retry with backoff; if it persists, contact monday.com support with the `request_id`.        |

<br />
