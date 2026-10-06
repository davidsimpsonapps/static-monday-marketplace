---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Favorites

Learn how to read, create, update, and delete favorites using the platform API

On the monday.com platform, you can create [favorites](https://support.monday.com/hc/en-us/articles/360009142179-The-favorites-section) for your preferred and most frequently used boards, dashboards, and docs. The favorite objects then appear in a separate *Favorites* section of the left-side menu for quick, easy access.

<Image align="center" border={true} width="600px" src="https://files.readme.io/00ead7f03bbb23bef61b475faecd66166a89e54cab3f8174fcde048720603ee8-monday.com_favorites.png" className="border" />

# Queries

## Get favorites

* Returns metadata for a list of favorites
* Can only be queried at the root; cannot be nested within another query

```graphql GraphQL
query {
  favorites {
    accountId
    createdAt
    folderId
    hierarchyListData {
      id
      type
    }
    id
    object {
      id
      type
    }
    position
    updatedAt
  }
}
```
```json JSON
{
  "data": {
    "favorites": [
      {
        "accountId": 9876543210,
        "createdAt": null,
        "folderId": null,
        "hierarchyListData": {
          "id": "123456",
          "type": "PersonalList"
        },
        "id": "98765",
        "object": {
          "id": "11223344",
          "type": "Overview"
        },
        "position": 65500,
        "updatedAt": null
      },
      {
        "accountId": 9876543210,
        "createdAt": null,
        "folderId": null,
        "hierarchyListData": {
          "id": "123456",
          "type": "PersonalList"
        },
        "id": "12345",
        "object": {
          "id": "44332211",
          "type": "Board"
        },
        "position": 65400,
        "updatedAt": null
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Fields

| Field             | Type                                                                                                                | Description                                                                    |
| :---------------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| accountId         | `Int`                                                                                                               | The ID of the account the favorite object belongs to.                          |
| createdAt         | `Date`                                                                                                              | The timestamp when the favorite object was created.                            |
| folderId          | `ID`                                                                                                                | The unique identifier of the folder the favorite object is in (if applicable). |
| hierarchyListData | [`ListID`](https://developer.monday.com/api-reference/reference/favorites-other-types#listid)                       | The type and unique identifier of the list.                                    |
| id                | `ID`                                                                                                                | The favorite object's unique identifier.                                       |
| object            | [`HierarchyObjectId`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectid) | The type and unique identifier of the favorite object.                         |
| position          | `Float`                                                                                                             | The favorite object's position within its list or folder.                      |
| updatedAt         | `Date`                                                                                                              | The timestamp when the favorite object was last updated.                       |

# Mutations

## Create favorite

Creates a new favorite. Returns [`CreateFavoriteResultType`](https://developer.monday.com/api-reference/reference/favorites-other-types#createfavoriteresulttype).

```graphql GraphQL
mutation {
  create_favorite(
    input: {
      name: "Tasks"
      object: {
        id: 1234567890
        type: Board
      }
      newPosition: {
        prevObject: {
          id: 9876543210
          type: Overview
        }
      }
    }
  ) {
    favorites {
      position
      id
    }
  }
}
```
```json JSON
{
  "data": {
    "create_favorite": {
      "favorites": {
        "position": 12345,
        "id": "98765"
      }
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type                                                                                                                     | Description                                              |
| :------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| input    | [`CreateFavoriteInput!`](https://developer.monday.com/api-reference/reference/favorites-other-types#createfavoriteinput) | The new favorite's name, position, identifier, and type. |

## Update favorite position

Updates a favorite's position. Returns [`UpdateFavoriteResultType`](https://developer.monday.com/api-reference/reference/favorites-other-types#updatefavoriteresulttype).

```graphql GraphQL
mutation {
  update_favorite_position(
    input: {
      object: {
        id: 1234567890
        type: Board
      }
      newPosition: {
        nextObject: {
          id: 9876543210
          type: Overview
        }
      }
    }
  ) {
    favorites {
      position
      id
      hierarchyListData {
        id
        type
      }
    }
  }
}
```
```json JSON
{
  "data": {
    "update_favorite_position": {
      "favorites": {
        "position": 54321,
        "id": "98765",
        "hierarchyListData": {
          "id": "123456",
          "type": "PersonalList"
        }
      }
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type                                                                                                                                                   | Description                               |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| input    | [`UpdateObjectHierarchyPositionInput!`](https://developer.monday.com/api-reference/reference/favorites-other-types#updateobjecthierarchypositioninput) | The updated favorite's position and type. |

## Delete favorite

Deletes a favorite. Returns [`DeleteFavoriteInputResultType`](https://developer.monday.com/api-reference/reference/favorites-other-types#deletefavoriteinputresulttype).

```graphql GraphQL
mutation {
  delete_favorite(
    input: {
      object: {
        id: 1234567890
        type: Board
      }
    }
  ) {
    success
  }
}
```
```json JSON
{
  "data": {
    "delete_favorite": {
      "success": true
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type                                                                                                                     | Description                   |
| :------- | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| input    | [`DeleteFavoriteInput!`](https://developer.monday.com/api-reference/reference/favorites-other-types#deletefavoriteinput) | The deleted favorite's input. |
