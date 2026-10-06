---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Object Schemas

Learn how to read, create, update, and delete object schemas, manage their columns, and connect boards using the platform API

Object schemas define the column structure that can be applied consistently across multiple <Glossary>boards</Glossary> in your monday.com account. Each schema has a unique name, optional description, and a set of typed <Glossary>columns</Glossary> with configurable policies that control which properties boards can override. Boards can be connected to an object schema to inherit its column definitions.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

# Queries

## Get object schemas

* **Required permission:** `manage_account_data_entities`
* Returns an array containing one or a collection of account object schemas
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  get_object_schemas(limit: 10, page: 1) {
    id
    name
    description
    revision
    columns {
      id
      title
      type
    }
    connected_boards_count
  }
}
```

### Arguments

| Argument                     | Type       | Description                                                                                                                                                                                                               | Enum Values |
| :--------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------- |
| exclude\_created\_by\_monday | `Boolean`  | When `true`, returns only object schemas created by users in this account, excluding the default schemas seeded by monday.com. When combined with `ids` or `names`, only results satisfying both conditions are returned. |             |
| ids                          | `[ID]`     | A list of object schema IDs to filter by. Cannot be combined with `names`.                                                                                                                                                |             |
| limit                        | `Int`      | The number of object schemas to return per page. The default is 25 and the maximum is 100.                                                                                                                                |             |
| names                        | `[String]` | A list of object schema names to filter by. Names are unique identifiers. Cannot be combined with `ids`.                                                                                                                  |             |
| page                         | `Int`      | The page number to retrieve. Pages are 1-indexed. The default is 1.                                                                                                                                                       |             |

### Fields

| Field                    | Type                                                                                                                           | Description                                                                                    | Supported Subfields                                          |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| account\_id              | `ID!`                                                                                                                          | The unique identifier of the account the object schema belongs to.                             |                                                              |
| columns                  | [`[ObjectSchemaColumn!]!`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#objectschemacolumn) | The columns defined in this object schema.                                                     | `id` `title` `type` `description` `settings` `policy` `tags` |
| connected\_boards\_count | `Int!`                                                                                                                         | The number of boards currently connected to this object schema.                                |                                                              |
| created\_at              | `DateTime!`                                                                                                                    | The date and time the object schema was created.                                               |                                                              |
| created\_by              | `ID!`                                                                                                                          | The unique identifier of the user who created the object schema.                               |                                                              |
| description              | `String`                                                                                                                       | The object schema's description. Returns `null` if no description is set.                      |                                                              |
| id                       | `ID!`                                                                                                                          | The object schema's unique identifier.                                                         |                                                              |
| name                     | `String`                                                                                                                       | The object schema's unique name (slug). Used as an identifier in mutations.                    |                                                              |
| parent\_id               | `ID`                                                                                                                           | The unique identifier of the parent object schema. Returns `null` if the schema has no parent. |                                                              |
| revision                 | `Int!`                                                                                                                         | The current revision number. Used for optimistic locking when updating the schema.             |                                                              |
| updated\_at              | `DateTime!`                                                                                                                    | The date and time the object schema was last updated.                                          |                                                              |

***

# Mutations

* **Required permission:** `manage_account_data_entities`

## Create object schema

Creates a new account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields).

```graphql GraphQL
mutation {
  create_object_schema(
    name: "project_tracker"
    description: "Standard columns for all project boards"
  ) {
    id
    name
    description
    revision
  }
}
```

### Arguments

| Argument    | Type      | Description                                                                                                                                                                            | Enum Values |
| :---------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| description | `String`  | The object schema's description.                                                                                                                                                       |             |
| name        | `String!` | A unique human-readable name for the object schema. Must be 3–15 characters, contain at least one letter, and use only lowercase letters, numbers, and underscores (e.g. `my_schema`). |             |
| parent\_id  | `ID`      | The unique identifier of a parent object schema.                                                                                                                                       |             |

## Update object schema

Updates an existing account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields).

```graphql GraphQL
mutation {
  update_object_schema(
    id: "1234567890"
    revision: 1
    description: "Updated description for project boards"
  ) {
    id
    name
    description
    revision
  }
}
```

### Arguments

| Argument    | Type     | Description                                                                                                   | Enum Values |
| :---------- | :------- | :------------------------------------------------------------------------------------------------------------ | :---------- |
| description | `String` | The updated description for the object schema.                                                                |             |
| id          | `ID!`    | The unique identifier of the object schema to update.                                                         |             |
| parent\_id  | `ID`     | The unique identifier of a new parent object schema.                                                          |             |
| revision    | `Int!`   | The current revision number of the object schema. Used for optimistic locking to prevent conflicting updates. |             |

## Delete object schema

Deletes an account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields). The schema can only be deleted if no boards are connected to it.

```graphql GraphQL
mutation {
  delete_object_schema(id: "1234567890") {
    id
    name
  }
}
```

### Arguments

| Argument | Type     | Description                                                                                   | Enum Values |
| :------- | :------- | :-------------------------------------------------------------------------------------------- | :---------- |
| id       | `ID`     | The unique identifier of the object schema to delete. Either `id` or `name` must be provided. |             |
| name     | `String` | The name of the object schema to delete. Either `id` or `name` must be provided.              |             |

## Create object schema columns

Creates one or more columns on an account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields).

```graphql GraphQL
mutation {
  create_object_schema_columns(
    object_schema_id: "1234567890"
    columns: [
      {
        type: status
        title: "Project Status"
        description: "Current phase of the project"
        opt_out_by_default: false
        policy: { can_override: [title, description], cannot_delete: false }
      }
    ]
  ) {
    id
    columns {
      id
      title
      type
    }
  }
}
```

### Arguments

| Argument             | Type                                                                                                                                         | Description                                                                                                     | Enum Values |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------- |
| columns              | [`[CreateObjectSchemaColumnInput!]!`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#createobjectschemacol) | An array of column definitions to create on the object schema.                                                  |             |
| object\_schema\_id   | `ID`                                                                                                                                         | The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided. |             |
| object\_schema\_name | `String`                                                                                                                                     | The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.              |             |

## Update object schema columns

Updates one or more columns on an account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields).

```graphql GraphQL
mutation {
  update_object_schema_columns(
    object_schema_id: "1234567890"
    columns: [
      {
        column_id: "9876543210"
        title: "Updated Status"
        description: "Updated phase tracking column"
      }
    ]
  ) {
    id
    columns {
      id
      title
      description
    }
  }
}
```

### Arguments

| Argument             | Type                                                                                                                                         | Description                                                                                                     | Enum Values |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------- |
| columns              | [`[UpdateObjectSchemaColumnInput!]!`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#updateobjectschemacol) | An array of column updates to apply to the object schema.                                                       |             |
| object\_schema\_id   | `ID`                                                                                                                                         | The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided. |             |
| object\_schema\_name | `String`                                                                                                                                     | The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.              |             |

## Delete object schema columns

Deletes columns from an account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields). Columns can only be deleted when no boards are connected to the object schema.

<Callout icon="🚧" theme="warn">
  **Only available in API version `dev`(experimental)**
</Callout>

```graphql GraphQL
mutation {
  delete_object_schema_columns(
    object_schema_id: "1234567890"
    column_ids: ["9876543210", "1122334455"]
  ) {
    id
    columns {
      id
      title
    }
  }
}
```

### Arguments

| Argument             | Type     | Description                                                                                                     | Enum Values |
| :------------------- | :------- | :-------------------------------------------------------------------------------------------------------------- | :---------- |
| column\_ids          | `[ID!]!` | An array of column IDs to delete from the object schema.                                                        |             |
| object\_schema\_id   | `ID`     | The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided. |             |
| object\_schema\_name | `String` | The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.              |             |

## Set object schema column active state

Deactivates or reactivates a column on an account object schema. Returns [`ObjectSchema`](https://developer.monday.com/api-reference/reference/object-schemas#fields). Use `DEACTIVATE` to deprecate a column and `REACTIVATE` to restore it.

```graphql GraphQL
mutation {
  set_object_schema_column_active_state(
    object_schema_id: "1234567890"
    column_id: "9876543210"
    action: DEACTIVATE
  ) {
    id
    columns {
      id
      title
      tags {
        deprecated
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
        action
      </td>

      <td>
        `ColumnActiveStateAction!`
      </td>

      <td>
        The action to perform on the column.
      </td>

      <td>
        `DEACTIVATE` (deprecate the column)  
        `REACTIVATE` (restore a deprecated column)
      </td>
    </tr>

    <tr>
      <td>
        column_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the column to deactivate or reactivate.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_schema_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_schema_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Bulk object schema column actions

Executes multiple column actions on an account object schema in a single request. Returns [`[ObjectSchemaActionResult]`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#objectschemaactionresult). Actions are executed sequentially in the order provided; if any action fails, execution stops and an error is returned. Each action type may appear at most once per request.

```graphql GraphQL
mutation {
  bulk_object_schema_column_actions(
    object_schema_id: "1234567890"
    actions: [
      {
        action: CREATE_OBJECT_SCHEMA_COLUMNS
        create_object_schema_columns: {
          columns: [
            {
              type: text
              title: "Notes"
              policy: { can_override: [title, description], cannot_delete: false }
            }
          ]
        }
      },
      {
        action: UPDATE_OBJECT_SCHEMA_COLUMNS
        update_object_schema_columns: {
          columns: [
            {
              column_id: "9876543210"
              title: "Updated Status"
            }
          ]
        }
      }
    ]
  ) {
    action
    object_schema {
      id
      columns {
        id
        title
      }
    }
  }
}
```

### Arguments

| Argument             | Type                                                                                                                                     | Description                                                                                                     | Enum Values |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------- |
| actions              | [`[ObjectSchemaActionInput!]!`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#objectschemaactioninput) | An array of actions to execute sequentially on the object schema's columns.                                     |             |
| object\_schema\_id   | `ID`                                                                                                                                     | The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided. |             |
| object\_schema\_name | `String`                                                                                                                                 | The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.              |             |

## Connect board to object schema

Connects a board to an object schema, making the board inherit the schema's column definitions. Returns [`BoardConnection`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#boardconnection).

```graphql GraphQL
mutation {
  connect_board_to_object_schema(
    board_id: "1234567890"
    object_schema_id: "9876543210"
  ) {
    id
    object_schema_id
  }
}
```

### Arguments

| Argument             | Type     | Description                                                                                                     | Enum Values |
| :------------------- | :------- | :-------------------------------------------------------------------------------------------------------------- | :---------- |
| board\_id            | `ID!`    | The unique identifier of the board to connect to the object schema.                                             |             |
| object\_schema\_id   | `ID`     | The unique identifier of the object schema. Either `object_schema_id` or `object_schema_name` must be provided. |             |
| object\_schema\_name | `String` | The name of the object schema. Either `object_schema_id` or `object_schema_name` must be provided.              |             |

## Detach boards from object schema

Detaches one or more boards from their object schemas. Returns [`[BulkDetachBoardResult]`](https://developer.monday.com/api-reference/reference/object-schemas-other-types#bulkdetachboardresult).

```graphql GraphQL
mutation {
  detach_boards_from_object_schema(
    board_ids: ["1234567890", "9876543210"]
  ) {
    board_id
    success
    error
  }
}
```

### Arguments

| Argument   | Type     | Description                                                |
| :--------- | :------- | :--------------------------------------------------------- |
| board\_ids | `[ID!]!` | An array of board IDs to detach from their object schemas. |
