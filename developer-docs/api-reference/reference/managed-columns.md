---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Managed columns

Learn how to read, create, update, and delete managed columns using the platform API

[Managed columns](https://support.monday.com/hc/en-us/articles/23053834284690-The-Managed-Column) are useful tools to standardize workflows across your monday.com account. Select users can create, own, and manage status and dropdown columns with predefined labels that other members can't edit. This ensures consistent terminology across different workflows and helps align teams on a unified structure.

# Queries

## Get managed column

* Returns an array containing metadata about one or several managed columns
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  managed_column(state: active) {
    created_by
    revision
    settings {
      ...on StatusColumnSettings { 
        type
        labels {
          id
          description
        }
      }
    }
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
        `[String!]`
      </td>

      <td>
        The unique identifier of the managed column to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `[ManagedColumnState!]`
      </td>

      <td>
        The state of the managed column to filter by.
      </td>

      <td>
        `active`  
        `inactive`
      </td>
    </tr>
  </tbody>
</Table>

### Fields

<Table align={["left","left","left","left","left"]}>
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

      <th>
        Possible Types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's creation date.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who created the managed column.
      </td>

      <td>

      </td>

      <td>

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
        The managed column's description.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the managed column.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        revision
      </td>

      <td>
        `Int`
      </td>

      <td>
        The current version of the managed column.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        `ColumnSettings`
      </td>

      <td>
        The managed column's settings.
      </td>

      <td>

      </td>

      <td>
        [`DropdownColumnSettings`](https://developer.monday.com/api-reference/reference/other-types#dropdown-column-settings)  
        [`StatusColumnSettings`](https://developer.monday.com/api-reference/reference/other-types#status-column-settings)
      </td>
    </tr>

    <tr>
      <td>
        settings_json
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The managed column's settings in JSON.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `ManagedColumnState`
      </td>

      <td>
        The managed column's state.
      </td>

      <td>
        `active`  
        `inactive`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The managed column's title.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's last updated date.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who last updated the managed column.
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

## Create status managed column

Creates a new managed status column. Returns [`StatusManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns-other-types#statusmanagedcolumn).

```graphql GraphQL
mutation {
  create_status_managed_column(
    title: "Project status"
    description:"This column indicates the project's status."
    settings: {
      labels: [
        {
          color: done_green
          label: "Done"
          index: 1
          is_done: true
        },
        {			
          color: working_orange
          label: "In progress"
          index: 2
        },
        {			
          color: stuck_red
          label: "Stuck"
          index: 3
        }
      ]
    }
  ) {
    id
    state
    created_at
    created_by
  }
}
```

### Arguments

| Argument    | Type                                                                                                                                      | Description                                         |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| description | `String`                                                                                                                                  | The description of the new managed dropdown column. |
| settings    | [`CreateStatusColumnSettingsInput`](https://developer.monday.com/api-reference/reference/other-types#create-status-column-settings-input) | The settings of the new managed dropdown column.    |
| title       | `String!`                                                                                                                                 | The title of the new managed dropdown column.       |

## Create dropdown managed column

Creates a new managed dropdown column. Returns [`DropdownManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns-other-types#dropdownmanagedcolumn).

```graphql GraphQL
mutation {
  create_dropdown_managed_column(
    title: "Project Domains"
    description: "This column lists all of the domains the project falls under."
    settings: {
      labels: [
        {
          label: "Research and Development" 
        }, 
        { 
          label: "Human Resources" 
        }, 
        {
          label: "Customer Support"
        }
      ]
    }
  ) {
    id
    title
    state
    created_at
    created_by
    settings {
      labels {
        id
        label
        is_deactivated
      }
    }
  }
}
```

### Arguments

| Argument    | Type                                                                                                                                          | Description                                         |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| description | `String`                                                                                                                                      | The description of the new managed dropdown column. |
| settings    | [`CreateDropdownColumnSettingsInput`](https://developer.monday.com/api-reference/reference/other-types#create-dropdown-column-settings-input) | The settings of the new managed dropdown column.    |
| title       | `String!`                                                                                                                                     | The title of the new managed dropdown column.       |

## Activate managed column

Activates a managed column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

```graphql GraphQL
mutation {
  activate_managed_column(
    id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
	) {
    status
    title
  }
}
```

### Arguments

| Argument | Type      | Description                                              |
| :------- | :-------- | :------------------------------------------------------- |
| id       | `String!` | The unique identifier of the managed column to activate. |

## Attach dropdown managed column

Creates a new dropdown column that's linked to a managed column. The new column's settings and data are controlled by the managed column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

```graphql
mutation {
  attach_dropdown_managed_column(
    board_id: 1234567890
    managed_column_id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
    title: "Project Domains"
    description: "This column is attached to a managed column."
    settings: {
      label_limit_count: 3
      limit_select:true
    }
  ) {
    id
    title
    type
  }
}
```

### Arguments

| Argument            | Type                                                                                                                                                | Description                                                                                                   |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| after\_column\_id   | `ID`                                                                                                                                                | The unique identifier to insert the new column after.                                                         |
| board\_id           | `ID!`                                                                                                                                               | The board's unique identifier.                                                                                |
| description         | `String`                                                                                                                                            | The new dropdown column's description. If omitted, the description of the linked managed column will be used. |
| managed\_column\_id | `ID!`                                                                                                                                               | The unique identifier of the managed column to attach.                                                        |
| settings            | [`DropdownSettingsOverridesInput`](https://developer.monday.com/api-reference/reference/managed-columns-other-types#dropdownsettingsoverridesinput) | The new dropdown column's optional settings.                                                                  |
| title               | `String`                                                                                                                                            | The new dropdown column's title. If omitted, the title of the linked managed column will be used.             |

## Attach status managed column

Creates a new status column that's linked to a managed column. The new column's settings and data are controlled by the managed column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

```graphql
mutation {
  attach_status_managed_column(
    board_id: 1234567890
    managed_column_id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
    title: "Project Status"
    description: "This column is attached to a managed column."
  ) {
    id
    title
    type
  }
}
```

### Arguments

| Argument            | Type     | Description                                                                                                 |
| :------------------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| after\_column\_id   | `ID`     | The unique identifier to insert the new column after.                                                       |
| board\_id           | `ID!`    | The board's unique identifier.                                                                              |
| description         | `String` | The new status column's description. If omitted, the description of the linked managed column will be used. |
| managed\_column\_id | `ID!`    | The unique identifier of the managed column to attach.                                                      |
| title               | `String` | The new status column's title. If omitted, the title of the linked managed column will be used.             |

## Update status managed column

Updates a managed status column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

:construction: You must provide all of the column’s labels, even if you’re only updating one of them!

```graphql GraphQL
mutation {
  update_status_managed_column(
    id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
    revision: 0
    title: "Project status"
    description:"This column indicates the status of the project."
    settings: {
      labels: [
        {
          color: bright_blue
          label: "In progress"
          index: 2
        }
      ]
    }
) {
  id
  description
  updated_at
  settings {
    labels {
      color
    }
  }
}
```

### Arguments

| Argument    | Type                                                                                                                                      | Description                                                                                                                                                                                                                         |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description | `String`                                                                                                                                  | The new description for the managed status column.                                                                                                                                                                                  |
| id          | `String!`                                                                                                                                 | The unique identifier of the managed status column to update.                                                                                                                                                                       |
| revision    | `Int!`                                                                                                                                    | The current version of the managed column. Must be provided when updating the column to ensure your data is up to date. If you receive a revision error, the revision may be outdated — fetch the latest column data and try again. |
| settings    | [`UpdateStatusColumnSettingsInput`](https://developer.monday.com/api-reference/reference/other-types#update-status-column-settings-input) | The managed status column's settings to update.                                                                                                                                                                                     |
| title       | `String`                                                                                                                                  | The new title for the managed status column.                                                                                                                                                                                        |

## Update dropdown managed column

Updates a managed dropdown column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

:construction: You must provide all of the column’s labels, even if you’re only updating one of them!

```graphql GraphQL
mutation {  
  update_dropdown_managed_column(
    id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
    revision: 0
    title: "Project Domains"
    description: "This column tracks each domain a project falls under."
    settings: {
      labels: [
        {
          id: 1
          label: "Research & Development"
        }
      ]
    }
  ) {
    description
    updated_at
    revision
    state
  }
}
```

### Arguments

| Argument    | Type                                                                                                                                          | Description                                                                                                                                                                                                                         |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description | `String`                                                                                                                                      | The updated description for the managed dropdown column.                                                                                                                                                                            |
| id          | `String!`                                                                                                                                     | The unique identifier of the managed dropdown column to update.                                                                                                                                                                     |
| revision    | `Int!`                                                                                                                                        | The current version of the managed column. Must be provided when updating the column to ensure your data is up to date. If you receive a revision error, the revision may be outdated — fetch the latest column data and try again. |
| settings    | [`UpdateDropdownColumnSettingsInput`](https://developer.monday.com/api-reference/reference/other-types#update-dropdown-column-settings-input) | The managed dropdown column's settings to update.                                                                                                                                                                                   |
| title       | `String`                                                                                                                                      | The managed dropdown column's updated title.                                                                                                                                                                                        |

## Deactivate managed column

Deactivates a managed column. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

Deactivating a managed column prevents users from adding it to new boards. The column remains on existing boards and can be reactivated at any time using the [`activate_managed_column`](https://developer.monday.com/api-reference/reference/managed-columns#activate-managed-column) mutation or through the UI.

```graphql GraphQL
mutation {
  deactivate_managed_column(
    id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
  ) {
    state
    title
  }
}
```

### Arguments

| Argument | Type      | Description                                                |
| :------- | :-------- | :--------------------------------------------------------- |
| id       | `String!` | The unique identifier of the managed column to deactivate. |

## Delete managed column

Deletes a managed column via the API. Returns [`ManagedColumn`](https://developer.monday.com/api-reference/reference/managed-columns#fields).

Deleting a managed column removes it from the *Managed Column* list in the *Column Center* and prevents users from adding it to new boards. The deleted column will remain on existing boards as a normal column, but it cannot be reactivated as a managed column.

```graphql GraphQL
mutation {
  delete_managed_column(
    id: "f01e5115-fe6c-3861-8daa-4a1bcce2c2ce"
  ) {
    state
    title
  }
}
```

### Arguments

| Argument | Type      | Description                                            |
| :------- | :-------- | :----------------------------------------------------- |
| id       | `String!` | The unique identifier of the managed column to delete. |
