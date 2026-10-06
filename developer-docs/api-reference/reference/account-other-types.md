---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the account API

The monday.com [account](https://developer.monday.com/api-reference/reference/account) APIs enable you to read account data.

The type below is used by the account query and is not independently queryable.

# AccountProduct

An object containing the account's active products.

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
        default_workspace_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The default workspace ID for the account product.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the account product.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `AccountProductKind`
      </td>

      <td>
        The account product.
      </td>

      <td>
        `core`  
        `crm`  
        `forms`  
        `marketing`  
        `project_management`  
        `service`  
        `software`  
        `whiteboard`
      </td>
    </tr>

    <tr>
      <td>
        tier
      </td>

      <td>
        `String`
      </td>

      <td>
        The account product tier.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

<br />
