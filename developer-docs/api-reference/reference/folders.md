---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Folders

Learn how to read, create, update, and delete folders using the monday.com platform API

Users can create [folders](https://support.monday.com/hc/en-us/articles/115005316845-Folders) in their workspaces to help organize their boards, dashboards, and workdocs.

# Queries

## Get folders

* **Required scope:`workspaces:read`**
* Returns an array containing metadata about one or a collection of folders
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  folders(workspace_ids: [1234567890]) {
    id
    name
    children {
      id
      name
    }
  }
}
```

### Arguments

| Argument       | Type    | Description                                                                                                                 |
| :------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| ids            | `[ID!]` | The specific folders to return.                                                                                             |
| limit          | `Int`   | The number of folders to get. The default is 25 and the maximum is 100.                                                     |
| page           | `Int`   | The page number to return. Starts at 1.                                                                                     |
| workspace\_ids | `[ID]`  | The unique identifiers of the specific workspaces to return. You can pass `[null]` to return folders in the Main Workspace. |

### Fields

| Field              | Type                                                                            | Description                                                                                                                              |
| :----------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| children           | [`[Board]!`](https://developer.monday.com/api-reference/reference/boards)       | The folder's contents, excluding dashboards and subfolders.                                                                              |
| color              | `FolderColor`                                                                   | The folder's color. See a full list of colors [here](https://asset.cloudinary.com/monday-platform-dev/3e39afb2309b512f4f53cc9173554d48). |
| created\_at        | `Date!`                                                                         | The folder's creation date.                                                                                                              |
| id                 | `ID!`                                                                           | The folder's unique identifier.                                                                                                          |
| name               | `String!`                                                                       | The folder's name.                                                                                                                       |
| owner\_id          | `ID`                                                                            | The unique identifier of the folder's owner.                                                                                             |
| parent             | `Folder`                                                                        | The folder's parent folder.                                                                                                              |
| sub\_folders       | `[Folder]!`                                                                     | The folders inside of the parent folder.                                                                                                 |
| workspace          | [`Workspace!`](https://developer.monday.com/api-reference/reference/workspaces) | The workspace that contains the folder.                                                                                                  |
| app\_feature\_slug | `String`                                                                        | The app feature slug associated with this folder (Folders 2.0). **Only available in versions `2026-04` and later.**                      |

# Mutations

**Required scope:`workspaces:write`**

## Create folder

Creates a new folder in a workspace. Returns [`Folder`](https://developer.monday.com/api-reference/docs/folders#fields).

```graphql GraphQL
mutation {
  create_folder(
    name: "New folder", 
    workspace_id: 1234567890
	) {
    id
  }
}
```

### Arguments

| Argument           | Type          | Description                                                                                                                              |
| :----------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| color              | `FolderColor` | The folder's color. See a full list of colors [here](https://asset.cloudinary.com/monday-platform-dev/3e39afb2309b512f4f53cc9173554d48). |
| name               | `String!`     | The folder's name.                                                                                                                       |
| parent\_folder\_id | `ID`          | The ID of the folder you want to nest the new one under.                                                                                 |
| workspace\_id      | `ID`          | The unique identifier of the workspace to create the new folder in.                                                                      |

## Update folder

Updates a folder's color, name, or parent folder. Returns [`Folder`](https://developer.monday.com/api-reference/docs/folders#fields).

```graphql GraphQL
mutation {
  update_folder(
    folder_id: 1234567890,
    name: "Updated folder name",
    account_product_id: 54321,
    position: {
      object_id: "15",
      object_type: Board,
      is_after: false
    }
  ) {
    id
    name
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
        account_product_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the product to move the folder to. You must also provide the relevant `workspace_id` within the updated product.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        color
      </td>

      <td>
        `FolderColor`
      </td>

      <td>
        The folder's color. See a full list of colors [here](https://asset.cloudinary.com/monday-platform-dev/3e39afb2309b512f4f53cc9173554d48).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        custom_icon
      </td>

      <td>
        `FolderCustomIcon`
      </td>

      <td>
        The folder's custom icon. See a full list of icons [here](https://asset.cloudinary.com/monday-platform-dev/3e39afb2309b512f4f53cc9173554d48) .
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        folder_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The folder's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        font_weight
      </td>

      <td>
        `FolderFontWeight`
      </td>

      <td>
        The folder's font weight.
      </td>

      <td>
        `FONT_WEIGHT_BOLD`  
        `FONT_WEIGHT_LIGHT`  
        `FONT_WEIGHT_NORMAL`  
        `FONT_WEIGHT_VERY_LIGHT`  
        `NULL`
      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String`
      </td>

      <td>
        The folder's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        parent_folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The ID of the folder you want to nest the updated one under.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position
      </td>

      <td>
        [`DynamicPosition`](https://developer.monday.com/api-reference/reference/other-types#dynamic-position-1)
      </td>

      <td>
        The folder's updated position in the left-side menu.
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
        The unique identifier of the workspace to move the folder to.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Delete folder

Deletes a folder and all its contents. Returns [`Folder`](https://developer.monday.com/api-reference/docs/folders#fields).

```graphql GraphQL
mutation {
  delete_folder(
    folder_id: 1234567890
	) {
    id
  }
}
```

### Arguments

| Argument   | Type  | Description                     |
| :--------- | :---- | :------------------------------ |
| folder\_id | `ID!` | The folder's unique identifier. |
