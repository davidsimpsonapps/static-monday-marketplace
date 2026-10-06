---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Object Schemas Other Types

Learn more about the other types used when reading, creating, updating, and deleting object schemas via the API

The monday.com [`object schemas`](https://developer.monday.com/api-reference/reference/object-schemas) API lets you manage the column structure applied across boards in your account. The types below are used as inputs and return types across the object schema queries and mutations.

# ObjectSchemaColumn

Represents a column defined within an object schema.

| Field       | Type                       | Description                                                                 |
| :---------- | :------------------------- | :-------------------------------------------------------------------------- |
| description | `String`                   | The column's description. Returns `null` if not set.                        |
| id          | `ID!`                      | The column's unique identifier.                                             |
| policy      | `ObjectSchemaColumnPolicy` | The policy rules governing this column. Returns `null` if no policy is set. |
| settings    | `JSON`                     | The column's type-specific configuration as a JSON object.                  |
| tags        | `ObjectSchemaColumnTags`   | Status tags for this column (deprecation, opt-in, inheritance info).        |
| title       | `String!`                  | The column's display title.                                                 |
| type        | `ColumnType`               | The column's type.                                                          |

***

# ObjectSchemaColumnPolicy

Defines the policy rules that govern a column's behavior and what boards can override.

| Field          | Type         | Description                                                                                   |
| :------------- | :----------- | :-------------------------------------------------------------------------------------------- |
| can\_override  | `[String!]!` | The fields that connected boards are allowed to override: `settings`, `title`, `description`. |
| cannot\_delete | `Boolean!`   | When `true`, the column cannot be deleted.                                                    |
| messages       | `JSON`       | User-facing messages explaining why specific actions are disabled. Returns `null` if not set. |
| read\_only     | `Boolean!`   | When `true`, the column is read-only for boards.                                              |

***

# ObjectSchemaColumnTags

Status tags that indicate the current state of a column within an object schema.

| Field                | Type      | Description                                                                                                 |
| :------------------- | :-------- | :---------------------------------------------------------------------------------------------------------- |
| deprecated           | `JSON`    | Deprecation metadata, including a `start` timestamp. Returns `null` if the column is not deprecated.        |
| inherited            | `Boolean` | When `true`, the column is inherited from a parent object schema.                                           |
| opt\_in\_by\_default | `JSON`    | Opt-in metadata, including an optional `end` timestamp. Returns `null` if the column uses opt-out behavior. |

***

# ObjectSchemaActionResult

Represents the result of a single action executed within a `bulk_object_schema_column_actions` mutation.

| Field          | Type                  | Description                                                  |
| :------------- | :-------------------- | :----------------------------------------------------------- |
| action         | `ObjectSchemaAction!` | The action type that was performed.                          |
| object\_schema | `ObjectSchema!`       | The state of the object schema after the action was applied. |

***

# BoardConnection

Represents the connection between a board and an object schema, returned by the `connect_board_to_object_schema` mutation.

| Field              | Type  | Description                                                                                                     |
| :----------------- | :---- | :-------------------------------------------------------------------------------------------------------------- |
| id                 | `ID!` | The board's unique identifier.                                                                                  |
| object\_schema\_id | `ID`  | The unique identifier of the connected object schema. Returns `null` if the board is not connected to a schema. |

***

# BulkDetachBoardResult

Represents the result of a single detach operation within a `detach_boards_from_object_schema` mutation.

| Field     | Type       | Description                                                                  |
| :-------- | :--------- | :--------------------------------------------------------------------------- |
| board\_id | `ID!`      | The unique identifier of the board that was detached.                        |
| error     | `String`   | The error message if the detach operation failed. Returns `null` on success. |
| success   | `Boolean!` | When `true`, the board was successfully detached.                            |

***

# CreateObjectSchemaColumnInput

Input type for creating a new column on an object schema.

| Field                 | Type                 | Description                                                                                       |
| :-------------------- | :------------------- | :------------------------------------------------------------------------------------------------ |
| defaults              | `JSON`               | Type-specific configuration for the column (e.g. labels for a status column).                     |
| description           | `String`             | The column's description.                                                                         |
| opt\_out\_by\_default | `Boolean`            | When `true`, connected boards opt out of this column by default. The default is `false` (opt-in). |
| policy                | `ColumnPolicyInput!` | The policy rules for this column.                                                                 |
| title                 | `String!`            | The column's display title.                                                                       |
| type                  | `ColumnType!`        | The column's type.                                                                                |

***

# UpdateObjectSchemaColumnInput

Input type for updating an existing column on an object schema.

| Field                 | Type                | Description                                         |
| :-------------------- | :------------------ | :-------------------------------------------------- |
| column\_id            | `ID!`               | The unique identifier of the column to update.      |
| defaults              | `JSON`              | Updated type-specific configuration for the column. |
| description           | `String`            | The updated column description.                     |
| opt\_out\_by\_default | `Boolean`           | Updated opt-out behavior for the column.            |
| policy                | `ColumnPolicyInput` | Updated policy rules for the column.                |
| title                 | `String`            | The updated column title.                           |

***

# ColumnPolicyInput

Input type for defining a column's policy rules.

| Field          | Type                   | Description                                                                            |
| :------------- | :--------------------- | :------------------------------------------------------------------------------------- |
| can\_override  | `[CanOverrideField!]!` | The fields that connected boards are allowed to override.                              |
| cannot\_delete | `Boolean!`             | When `true`, prevents boards from deleting this column.                                |
| messages       | `PolicyMessagesInput`  | User-facing messages explaining why specific actions are disabled on connected boards. |

***

# PolicyMessagesInput

Input type for configuring user-facing messages on a column policy.

| Field            | Type                  | Description                                                   |
| :--------------- | :-------------------- | :------------------------------------------------------------ |
| disabled\_reason | `DisabledReasonInput` | Messages explaining why specific column actions are disabled. |

***

# DisabledReasonInput

Input type for per-action disabled reason messages displayed to board users.

| Field                       | Type     | Description                                             |
| :-------------------------- | :------- | :------------------------------------------------------ |
| delete                      | `String` | Reason why the column cannot be deleted.                |
| edit\_description           | `String` | Reason why the column description cannot be edited.     |
| edit\_labels                | `String` | Reason why the column labels cannot be edited.          |
| edit\_labels\_positions\_v2 | `String` | Reason why the column label positions cannot be edited. |
| edit\_settings              | `String` | Reason why the column settings cannot be edited.        |
| edit\_title                 | `String` | Reason why the column title cannot be edited.           |

***

# ObjectSchemaActionInput

Input type for a single action within the `bulk_object_schema_column_actions` mutation.

| Field                           | Type                                   | Description                                                                            |
| :------------------------------ | :------------------------------------- | :------------------------------------------------------------------------------------- |
| action                          | `ObjectSchemaAction!`                  | The type of action to execute.                                                         |
| create\_object\_schema\_columns | `CreateObjectSchemaColumnsActionInput` | The columns to create. Required when `action` is `CREATE_OBJECT_SCHEMA_COLUMNS`.       |
| delete\_object\_schema\_columns | `DeleteObjectSchemaColumnsActionInput` | The column IDs to delete. Required when `action` is `DELETE_OBJECT_SCHEMA_COLUMNS`.    |
| update\_object\_schema\_columns | `UpdateObjectSchemaColumnsActionInput` | The column updates to apply. Required when `action` is `UPDATE_OBJECT_SCHEMA_COLUMNS`. |

***

# CreateObjectSchemaColumnsActionInput

Input type for the create columns action within a bulk operation.

| Field   | Type                                | Description                               |
| :------ | :---------------------------------- | :---------------------------------------- |
| columns | `[CreateObjectSchemaColumnInput!]!` | An array of column definitions to create. |

***

# UpdateObjectSchemaColumnsActionInput

Input type for the update columns action within a bulk operation.

| Field   | Type                                | Description                          |
| :------ | :---------------------------------- | :----------------------------------- |
| columns | `[UpdateObjectSchemaColumnInput!]!` | An array of column updates to apply. |

***

# DeleteObjectSchemaColumnsActionInput

Input type for the delete columns action within a bulk operation.

| Field       | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| column\_ids | `[ID!]!` | An array of column IDs to delete. |

***

# ObjectSchemaAction

Enum of supported action types for `bulk_object_schema_column_actions`.

| Enum Value                     | Description                             |
| :----------------------------- | :-------------------------------------- |
| `CREATE_OBJECT_SCHEMA_COLUMNS` | Creates columns on the object schema.   |
| `DELETE_OBJECT_SCHEMA_COLUMNS` | Deletes columns from the object schema. |
| `UPDATE_OBJECT_SCHEMA_COLUMNS` | Updates columns on the object schema.   |

***

# ColumnActiveStateAction

Enum of supported actions for `set_object_schema_column_active_state`.

| Enum Value   | Description                                 |
| :----------- | :------------------------------------------ |
| `DEACTIVATE` | Deprecates the column on the object schema. |
| `REACTIVATE` | Restores a previously deprecated column.    |

***

# CanOverrideField

Enum of fields that connected boards are permitted to override on a schema column.

| Enum Value    | Description                                              |
| :------------ | :------------------------------------------------------- |
| `description` | Boards can override the column's description.            |
| `settings`    | Boards can override the column's type-specific settings. |
| `title`       | Boards can override the column's display title.          |
