---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Version

Learn how to read which API version was used while making a call via the monday.com platform API

We support a handful of [API versions](https://developer.monday.com/api-reference/docs/api-versioning) at any given time to help ensure smooth transitions between version releases. Each version functions differently, so your request must be to the correct API version for it to run successfully.

<Callout icon="🚧" theme="warning">
Want data about all available API versions?

Query [`versions`](https://developer.monday.com/api-reference/docs/versions) instead!
</Callout>

# Queries

## Get version

* Returns an object containing metadata about the API version used to make a request
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  version {
    kind
    value
    display_name
  }
}
```
```json JSON
{
  "data": {
    "version": {
      "display_name": "Release Candidate",
      "kind": "release_candidate",
      "value": "2024-10"
    }
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
        The type of API version in use.
      </td>

      <td>
        `current`  
        `deprecated`  
        `maintenance`  
        `previous_maintenance` `release_candidate`
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
