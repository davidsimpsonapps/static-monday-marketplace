---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the workspaces APIs

The monday.com [workspaces](https://developer.monday.com/api-reference/reference/workspaces) APIs enable you to create, read, update, and delete workspaces.

The types below are used by the workspaces queries and mutations, and are not independently queryable.

# UpdateWorkspaceAttributesInput

An object containing the input for which workspace attributes to update.

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
        account_product_id `ID`
      </td>

      <td>
        The unique identifier of the target account product to move the workspace to. You can retrieve this by querying the [`account`](https://developer.monday.com/api-reference/reference/account#fields) object.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description `String`
      </td>

      <td>
        The updated workspace description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind `WorkspaceKind`
      </td>

      <td>
        The kind of workspace to update.
      </td>

      <td>
        `closed`  
        `open`
      </td>
    </tr>

    <tr>
      <td>
        name `String`
      </td>

      <td>
        The updated workspace name.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# WorkspaceSettings

An object containing data about the workspace's settings.

| Field | Type            | Description           |
| :---- | :-------------- | :-------------------- |
| icon  | `WorkspaceIcon` | The workspace's icon. |

## WorkspaceIcon

An object containing data about the workspace's icon.

| Field          | Description                                                            |
| :------------- | :--------------------------------------------------------------------- |
| color `String` | The hex value of the icon's color. Used as a background for the image. |
| image `String` | The temporary public image URL (valid for one hour).                   |
