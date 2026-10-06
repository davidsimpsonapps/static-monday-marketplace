---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn about the other types used when reading, creating, updating, and deleting favorites via the API

The monday.com `favorites` API lets you query a user's favorites.

Each of the object types described below represents a specific aspect of a favorite. They can be queried as subfields on the `favorites` query or provide favorite metadata in mutations.

# CreateFavoriteInput

An object containing the input of the new favorite to create.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Input Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        name `String`
      </td>

      <td>
        The name of the object to mark as a favorite.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        newPosition `ObjectDynamicPositionInput`
      </td>

      <td>
        The new position of the favorite object.
      </td>

      <td>
        nextObject [`HierarchyObjectIDInputType`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)  
        prevObject [`HierarchyObjectIDInputType`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)
      </td>
    </tr>

    <tr>
      <td>
        object [`HierarchyObjectIDInputType!`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)
      </td>

      <td>
        The type of object to mark as a favorite.
      </td>

      <td>
        id `ID!`  
        type `ObjectType!`
      </td>
    </tr>
  </tbody>
</Table>

***

# CreateFavoriteResultType

An object containing the result of creating a new favorite via the API.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        favorites `HierarchyObjectItem`
      </td>

      <td>
        The new favorite object's metadata.
      </td>

      <td>
        accountId `Int`  
        createdAt `Date`  
        folderId `ID`  
        hierarchyListData [`ListID`](https://developer.monday.com/api-reference/reference/favorites-other-types#listid)  
        id `ID`  
        object [`HierarchyObjectID`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectid)  
        position `Float`  
        updatedAt `Date`
      </td>
    </tr>
  </tbody>
</Table>

***

# DeleteFavoriteInput

An object containing the input of the favorite to delete.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Input Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        object [`HierarchyObjectIDInputType!`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)
      </td>

      <td>
        The object to remove from the favorites.
      </td>

      <td>
        id `ID!`  
        type `ObjectType!`
      </td>
    </tr>
  </tbody>
</Table>

***

# DeleteFavoriteInputResultType

An object containing the result of deleting a favorite object via the API.

| Field             | Description                                    |
| :---------------- | :--------------------------------------------- |
| success `Boolean` | Whether the favorite was successfully deleted. |

***

# HierarchyObjectId

An object containing metadata about the favorited object.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        id `ID`
      </td>

      <td>
        The object's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ObjectType`
      </td>

      <td>
        The object's type.
      </td>

      <td>
        `Board`  
        `Folder`  
        `Overview`
      </td>
    </tr>
  </tbody>
</Table>

***

# HierarchyObjectIDInputType

Metadata about the favorite object.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        id `ID!`
      </td>

      <td>
        The object's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ObjectType!`
      </td>

      <td>
        The object's type.
      </td>

      <td>
        `Board`  
        `Folder`  
        `Overview` (dashboard)
      </td>
    </tr>
  </tbody>
</Table>

***

# ListID

An object containing metadata about the favorited list.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        id `ID`
      </td>

      <td>
        The list's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ListType`
      </td>

      <td>
        The list's type.
      </td>

      <td>
        `CustomizedList`  
        `PersonalList`  
        `Workspace`
      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateObjectHierarchyPositionInput

An object containing the input of the favorite to update.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Input Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        newFolder `ID`
      </td>

      <td>
        The unique identifier of the folder to move the favorite object into.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        newPosition `ObjectDynamicPositionInput`
      </td>

      <td>
        The new position of the favorite object in the favorites list.
      </td>

      <td>
        nextObject [`HierarchyObjectIDInputType`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)  
        prevObject [`HierarchyObjectIDInputType`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)
      </td>
    </tr>

    <tr>
      <td>
        object [`HierarchyObjectIDInputType!`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectidinputtype)
      </td>

      <td>
        The favorite object to update.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateFavoriteResultType

An object containing the result of updating a favorite object's position via the API.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        favorites `HierarchyObjectItem`
      </td>

      <td>
        The updated favorite object's metadata.
      </td>

      <td>
        accountId `Int`  
        createdAt `Date`  
        folderId `ID`  
        hierarchyListData [`ListID`](https://developer.monday.com/api-reference/reference/favorites-other-types#listid)  
        id `ID`  
        object [`HierarchyObjectID`](https://developer.monday.com/api-reference/reference/favorites-other-types#hierarchyobjectid)  
        position `Float`  
        updatedAt `Date`
      </td>
    </tr>
  </tbody>
</Table>
