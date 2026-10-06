---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Objects

Learn how to create, read, update, and delete objects using the platform API

Objects are a core component of the platform API that represent a generic item within the monday.com platform. They can represent boards, dashboards, workflows, or other specialized objects.

# Queries

## Get objects

* Returns an array containing metadata about a collection of objects
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  objects(
    limit: 4, 
    state: ACTIVE, 
    order_by: CREATED_AT
  ) {
    id
    name
    owners {
      id
      name
    }
  }
}
```
```json JSON
{
  "data": {
    "objects": [
      {
        "id": "OBJECT_ID_1",
        "name": "Object 1",
        "owners": [
          {
            "id": "OWNER_ID_1",
            "name": "Owner 1"
          }
        ]
      },
      {
        "id": "OBJECT_ID_2",
        "name": "Object 2",
        "owners": [
          {
            "id": "OWNER_ID_2",
            "name": "Owner 2"
          }
        ]
      },
      {
        "id": "OBJECT_ID_3",
        "name": "Object 3",
        "owners": [
          {
            "id": "OWNER_ID_3",
            "name": "Owner 3"
          }
        ]
      },
      {
        "id": "OBJECT_ID_4",
        "name": "Object 4",
        "owners": [
          {
            "id": "OWNER_ID_4",
            "name": "Owner 4"
          }
        ]
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
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
        ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the objects to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int`
      </td>

      <td>
        The number of objects to get. The default is 25.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type_unique_keys
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The unique identifier of the object type to filter by. Query [`object_types_unique_keys`](https://developer.monday.com/api-reference/reference/object-types-unique-keys) to see available types.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        order_by
      </td>

      <td>
        `OrderBy`
      </td>

      <td>
        The order in which to return objects.
      </td>

      <td>
        `CREATED_AT`  
        `USED_AT`
      </td>
    </tr>

    <tr>
      <td>
        privacy_kind
      </td>

      <td>
        `PrivacyKind`
      </td>

      <td>
        The object visibility settings to filter by.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `ObjectState`
      </td>

      <td>
        The object state to filter by.
      </td>

      <td>
        `ACTIVE`  
        `ARCHIVED`  
        `DELETED`
      </td>
    </tr>

    <tr>
      <td>
        workspace_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the workspaces to filter by.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Field         | Type                                                                                         | Description                                                                                                                                                                                 |
| :------------ | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| creator       | `String`                                                                                     | The object's creator.                                                                                                                                                                       |
| description   | `String`                                                                                     | The object's description.                                                                                                                                                                   |
| folder\_id    | `String`                                                                                     | The unique identifier of the folder that contains the object.                                                                                                                               |
| id            | `String`                                                                                     | The object's unique identifier.                                                                                                                                                             |
| name          | `String`                                                                                     | The object's name.                                                                                                                                                                          |
| owners        | [`[User!]`](https://developer.monday.com/api-reference/reference/users)                      | The object's owners.                                                                                                                                                                        |
| privacy\_kind | `String`                                                                                     | The object's visibility settings.                                                                                                                                                           |
| state         | `String`                                                                                     | The object's state.                                                                                                                                                                         |
| subscribers   | [`[User!]`](https://developer.monday.com/api-reference/reference/users)                      | The object's subscribers.                                                                                                                                                                   |
| updated\_at   | `String`                                                                                     | The object's last updated date.                                                                                                                                                             |
| workspace\_id | `String`                                                                                     | The unique identifier of the workspace that contains the object.                                                                                                                            |
| relations     | [`[ObjectRelation!]`](https://developer.monday.com/api-reference/reference/object-relations) | Relations for this object (alias or dependency), filterable by `kind` (`ALIAS`, `DEPENDENCY`) and `direction` (`OUTGOING`, `INCOMING`). **Only available in versions `2026-04` and later.** |

# Mutations

## Create object

Creates an object. Returns [`Object`](https://developer.monday.com/api-reference/reference/objects#fields).

```graphql GraphQL
mutation {
  create_object(
    name: "New Marketing Campaign"
    privacy_kind: PUBLIC
    object_type_unique_key: "service::portal-object"
    description: "Our Q3 marketing campaign."
    folder_id: 9876543210
    owner_ids: [12345]
  ) {
    id
    name
    description
    owners {
      id
    }
  }
}
```
```json JSON
{
  "data": {
    "create_object": {
      "id": "1234567890",
      "name": "New Marketing Campaign",
      "description": "Our Q3 marketing campaign.",
      "owners": [
        {
          "id": "12345"
        }
      ]
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
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
        description
      </td>

      <td>
        `String`
      </td>

      <td>
        The new object's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder to create the object in.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new object's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type_unique_key
      </td>

      <td>
        `String!`
      </td>

      <td>
        The object type's unique identifier. Query [`object_types_unique_keys`](https://developer.monday.com/api-reference/reference/object-types-unique-keys)  to see available types.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        owner_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the new object's owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        owner_team_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the new object's team owners.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        payload
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The new object's JSON payload.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        privacy_kind
      </td>

      <td>
        `PrivacyKind!`
      </td>

      <td>
        The new object's visibility settings.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
      </td>
    </tr>

    <tr>
      <td>
        subscriber_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the new object's subscribers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        subscriber_team_ids
      </td>

      <td>
        `[ID!]`
      </td>

      <td>
        The unique identifiers of the new object's team subscribers.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the workspace to create the object in.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        relations
      </td>

      <td>
        `[ObjectRelationInput!]`
      </td>

      <td>
        Optional relations to create with the object. Each relation requires `kind` (`ALIAS` or `DEPENDENCY`), `target_id`, and optionally `target_object_type` (defaults to `BOARD`). **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update object

Updates an object. Returns [`Object`](https://developer.monday.com/api-reference/reference/objects#fields).

```graphql GraphQL
mutation {
  update_object(
    id: "12345678",
    input: {
      description: "Our Q4 marketing campaign.",
      name: "New Marketing Campaign"
      privacy_kind: PRIVATE
    }
  ) {
    name
    description
    privacy_kind
  }
}
```
```json JSON
{
  "data": {
    "update_object": {
      "name": "New Marketing Campaign",
      "description": "Our Q4 marketing campaign.",
      "privacy_kind": "private"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        id 
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the object to update.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        input
      </td>

      <td>
        `UpdateObjectInput!`
      </td>

      <td>
        The updated object's characteristics.
      </td>

      <td>
        description `String`  
        name `String`  
        privacy_kind `PrivacyKind`
      </td>
    </tr>
  </tbody>
</Table>

## Add subscribers to object

Adds subscribers or owners to an existing object. Returns [`Object`](https://developer.monday.com/api-reference/reference/objects#fields).

```graphql GraphQL
mutation {
  add_subscribers_to_object(
    id: 12345, 
    user_ids: [1234567890, 9876543210], 
    kind: SUBSCRIBER
	) {
    subscribers {
      id
      name
    }
  }
}
```
```json JSON
{
  "data": {
    "add_subscribers_to_object": {
      "subscribers": [
        {
          "id": "1234567890",
          "name": "Owner 1"
        },
        {
          "id": "9876543210",
          "name": "Owner 2"
        },
				{
          "id": "123459876",
          "name": "Owner 3"
        }
      ]
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
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
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the object to add subscribers to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `SubscriberKind`
      </td>

      <td>
        The role to assign the subscribers. The default is `SUBCRIBER`.
      </td>

      <td>
        `OWNER` (full control permissions)  
        `SUBSCRIBER` (notification access only)
      </td>
    </tr>
  </tbody>
</Table>

## Archive object

Archives an object. Returns [`Object`](https://developer.monday.com/api-reference/reference/objects#fields).

```graphql GraphQL
mutation {
  archive_object(id: 12345) {
    state
    name
  }
}
```
```json JSON
{
  "data": {
    "archive_object": {
      "state": "archived",
      "name": "Object 3"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type  | Description                                     |
| :------- | :---- | :---------------------------------------------- |
| id       | `ID!` | The unique identifier of the object to archive. |

## Delete object

Permanently deletes any object. Returns [`Object`](https://developer.monday.com/api-reference/reference/objects#fields).

When an object is deleted, there is a 30-day grace period to reverse the action. After those initial 30 days, the object will be permanently deleted and can't be retrieved.

```graphql GraphQL
mutation {
  delete_object(id: 12345) {
    state
    name
  }
}
```
```json JSON
{
  "data": {
    "delete_object": {
      "state": "deleted",
      "name": "Object 4"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type  | Description                                    |
| :------- | :---- | :--------------------------------------------- |
| id       | `ID!` | The unique identifier of the object to delete. |
