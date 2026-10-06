---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Resource Directory

Learn how to read and update resource directories via the platform API

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-01`](https://developer.monday.com/api-reference/docs/release-notes#2026-01) and later**
</Callout>

The monday.com [Resource Directory](https://support.monday.com/hc/en-us/articles/24415595721234-The-Resource-Directory-on-monday-com) provides a centralized overview of an account's resources. From there, you can define attributes (e.g., job roles, skills, locations, and resource managers), assign them to resources, and filter by those attributes to quickly find the right match for your projects.

🚧 Resource directories are only available on **Enterprise plans.**

# Queries

## Get directory resources

* 🚧 Only available for **Enterprise plans**
* Returns an array containing metadata about an account's resources
* Can only be queried directly at the root; can't be nested within another query

```graphql
query {
  get_directory_resources(limit: 25) {
    resources {
      id
      name
      email
    }
    cursor
    id
  }
}
```

### Example: Filter with `query_params`

Pass [`ItemsQuery`](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery) as `query_params`. For each rule, set `column_id` to the Resource Directory attribute you want to filter on (for example `JOB_ROLE`, `LOCATION`, `SKILLS`, `TEAMS`, `NAME`, or `EMAIL`). Use [`ItemsQueryRuleOperator`](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsqueryrule) values such as `contains_text` or `any_of` together with `compare_value`, following the same patterns as [`items_page`](https://developer.monday.com/api-reference/reference/items-page) filters.

The query below requests resources whose job role contains `"Engineer"` **and** whose location contains `"London"`. The top-level `operator` on `query_params` controls how multiple rules are combined (`and` or `or`).

```graphql
query {
  get_directory_resources(
    limit: 25
    query_params: {
      operator: and
      rules: [
        {
          column_id: "JOB_ROLE"
          operator: contains_text
          compare_value: "Engineer"
        }
        {
          column_id: "LOCATION"
          operator: contains_text
          compare_value: "London"
        }
      ]
    }
  ) {
    resources {
      id
      name
      job_role
      location
      skills
    }
    cursor
    id
  }
}
```

### Arguments

| Argument      | Type                                                                                                   | Description                                                                                                                            |
| :------------ | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| cursor        | `String`                                                                                               | An opaque token representing the position in a set of results to fetch resources from. Use this to paginate through large result sets. |
| limit         | `Int`                                                                                                  | The number of resources to retrieve. Default is 25.                                                                                    |
| query\_params | [`ItemsQuery`](https://developer.monday.com/api-reference/reference/items-page-other-types#itemsquery) | Filter directory resources by column-based attributes (e.g., job role, skills, location, and other resource attributes).               |

### Fields

| Field     | Type                                                                                                                             | Description                                                                                                                                                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor    | `String`                                                                                                                         | An opaque cursor that represents the position in the list after the last returned resource. Use this cursor for pagination to fetch the next set of resources. If the cursor is null, there are no more resources to fetch. |
| id        | `ID!`                                                                                                                            | The directory resource's unique identifier.                                                                                                                                                                                 |
| resources | [`[DirectoryResource!]!`](https://developer.monday.com/api-reference/reference/resource-directory-other-types#directoryresource) | The directory's resources.                                                                                                                                                                                                  |

# Mutations

* 🚧 Only available for **Enterprise plans**

## Update directory resources attributes

Updates attributes of your resources in your account. Returns [`UpdateDirectoryResourceAttributesResponse`](https://developer.monday.com/api-reference/reference/resource-directory-other-types#updatedirectoryresourceattributesresponse).

```graphql
mutation {
  update_directory_resources_attributes(
    attribute: SKILLS
    values: ["React", "JavaScript"]
    resource_ids: [12345, 54321]
  ) {
    success
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
        attribute
      </td>

      <td>
        `DirectoryResourceAttribute!`
      </td>

      <td>
        The type of attribute(s) to update.
      </td>

      <td>
        `JOB_ROLE`  
        `LOCATION`  `SKILLS`
      </td>
    </tr>

    <tr>
      <td>
        resource_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The unique identifiers of the resources to update. Query `get_directory_resources` to retrieve the ID.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        values
      </td>

      <td>
        `[String!]!`
      </td>

      <td>
        The resource's updated attribute(s) values. The attribute must already exist; otherwise, the request will fail.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

<br />
