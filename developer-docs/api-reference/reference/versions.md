---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Versions

Learn how to access all supported API versions using the monday.com platform API

At monday.com, we support multiple [API versions](https://developer.monday.com/api-reference/docs/api-versioning) to provide users with stability while still allowing us to continuously make improvements. You can find a list of current versions [here](https://developer.monday.com/api-reference/docs/api-versioning#current-versions), or you query `versions`.

<Callout icon="🚧" theme="warning">
Only want data about the specific version used in a request?

Query [`version`](https://developer.monday.com/api-reference/docs/version) instead!
</Callout>

# Queries

## Get versions

* Returns an array containing metadata about all available API versions
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  versions {
    kind
    value
    display_name
  }
}
```
```json JSON
{
  "data": {
    "versions": [
      {
        "display_name": "Previous Maintenance",
        "kind": "previous_maintenance",
        "value": "2024-01"
      },
      {
        "display_name": "Maintenance",
        "kind": "maintenance",
        "value": "2024-04"
      },
      {
        "display_name": "Current",
        "kind": "current",
        "value": "2024-07"
      },
      {
        "display_name": "Release Candidate",
        "kind": "release_candidate",
        "value": "2024-10"
      }
    ]
  },
  "account_id": 1
}
```

### Fields

<Table align={["left","left","left","left"]}>
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

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        display_name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The API version's display name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `VersionKind!`
      </td>

      <td>
        The type of API version.
      </td>

      <td>
        `current`  
        `deprecated`  
        `maintenance`  
        `previous_maintenance`  
        `release_candidate`
      </td>
    </tr>

    <tr>
      <td>
        value
      </td>

      <td>
        `String!`
      </td>

      <td>
        The API version name. Can be passed in the [`API-Version`](https://developer.monday.com/api-reference/docs/api-versioning#using-the-api-version-header-in-an-http-request) header.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>
