---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Object types unique keys

Learn how to read object types using the platform API

Objects are a core component of the API that represent a generic item within the monday.com platform. They can represent boards, dashboards, workflows, or other specialized objects. Each object is of a specific type, which is used to create new objects or filter results from the [`objects`](https://developer.monday.com/api-reference/reference/objects) query.

# Queries

## Get object types unique keys

* Returns an array containing metadata about a collection of object types
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  object_types_unique_keys {
    app_name
    app_feature_name
    description
    object_type_unique_key
  }
}
```
```json JSON
{
  "data": {
    "object_types_unique_keys": [
      {
        "app_name": "Monday Workflows",
        "app_feature_name": "Workflow",
        "description": "",
        "object_type_unique_key": "monday_workflows::workflow"
      },
      {
        "app_name": "Service",
        "app_feature_name": "Portal",
        "description": "",
        "object_type_unique_key": "service::portal-object"
      }
    ]
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
        app_feature_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The object type's app feature name.
      </td>
    </tr>

    <tr>
      <td>
        app_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The app's name that provides this object type.
      </td>
    </tr>

    <tr>
      <td>
        description
      </td>

      <td>
        `String`
      </td>

      <td>
        The object type's description.
      </td>
    </tr>

    <tr>
      <td>
        object_type_unique_key
      </td>

      <td>
        `String`
      </td>

      <td>
        The object type's unique identifier. Formatted as  
        `app_slug::app_feature_slug`.
      </td>
    </tr>
  </tbody>
</Table>
