---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Columns

Learn how to create, read, update, and delete columns on monday boards using the platform API

monday.com boards are formatted as a table with columns and rows of items. Each [column](https://support.monday.com/hc/en-us/articles/115005466609-The-basics-of-columns) has specific functionality and only stores relevant data. For example, a numbers column stores numerical values, a text column stores text values, and a time tracking column stores only time-based data from log events.

# Queries

## Get columns

* **Required scope: `boards:read`**
* Returns an array containing metadata about one or a collection of columns
* Can only be nested within another query (e.g., `boards`); can't be queried directly at the root

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    columns {
      id
      title
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($board: [ID!]) {boards (ids: $board) { columns { id title }}}`
const variables = {
  board: 1234567
}
const response = await mondayApiClient.request(query, variables);
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
        capabilities
      </td>

      <td>
        `[ColumnCapability]`
      </td>

      <td>
        A list of column capabilities to filter by. Returns columns that have any of the specified capabilities.

        * Use `null` in the array to retrieve **columns with no capabilities** (e.g., `[null]` for only columns without capabilities, `[null, CALCULATED]` for columns without capabilities or with calculated).
      </td>

      <td>
        `CALCULATED`  (column's calculated value)
        `VISIBILITY` (hidden columns)
      </td>
    </tr>

    <tr>
      <td>
        ids
      </td>

      <td>
        `[String]`
      </td>

      <td>
        The specific columns to return. Please use quotation marks when passing this ID as a string.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        types
      </td>

      <td>
        [`[ColumnType!]`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype)
      </td>

      <td>
        The specific type of columns to return.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Field        | Type                                                                                                                 | Description                                                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| archived     | `Boolean!`                                                                                                           | Returns `true` if the column is archived.                                                                                                   |
| capabilities | [`ColumnCapabilities!`](https://developer.monday.com/api-reference/reference/columns-other-types#columncapabilities) | Calculates and retrieves the column's rollup value.                                                                                         |
| description  | `String`                                                                                                             | The column's description.                                                                                                                   |
| id           | `ID!`                                                                                                                | The column's unique identifier.                                                                                                             |
| revision     | `String!`                                                                                                            | The column's current revision. Used for optimistic concurrency control.                                                                     |
| settings     | `JSON`                                                                                                               | The column's dynamic JSON settings. For multi-level boards, use this field to retrieve labels and color mappings for status rollup columns. |
| title        | `String!`                                                                                                            | The column's title.                                                                                                                         |
| type         | [`ColumnType!`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype)                 | The column's type.                                                                                                                          |
| width        | `Int`                                                                                                                | The column's width.                                                                                                                         |

# Mutations

**Required scope: `boards:write`**

## Create column

Creates a column. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title:"Work Status"
    description: "This is my work status column"
    column_type:status
  ) {
    id
    title
    description
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board: ID!, $title: String!, $desc: String!) { create_column(board_id: $board, title: $title, description: $desc, column_type:status){ id title description}}`
const variables = {
  board: 1234567,
  title: "Work status",
  desc: "Current status of the task"
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

<Table align={["left","left","left"]}>
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
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        after_column_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the column after which the new column will be created.
      </td>
    </tr>

    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the board where the new column should be created.
      </td>
    </tr>

    <tr>
      <td>
        capabilities
      </td>

      <td>
        [`ColumnCapabilitiesInput`](https://developer.monday.com/api-reference/reference/columns-other-types#columncapabilitiesinput)
      </td>

      <td>
        The new column’s capabilities configuration. If omitted, defaults apply: on multi-level boards, numeric, date, timeline, and status columns are created with the calculated capability enabled; in all other cases, no capabilities are applied. To override this default on multi-level boards, pass an empty argument to create the column without capabilities.
      </td>
    </tr>

    <tr>
      <td>
        column_type
      </td>

      <td>
        [`ColumnType!`](https://developer.monday.com/api-reference/docs/other-types#column-type)
      </td>

      <td>
        The type of column to create. This determines which properties are valid in the `defaults` argument.
      </td>
    </tr>

    <tr>
      <td>
        defaults
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The new column’s defaults. Accepts a JSON object or string. Validated against the column-type schema; query [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) to see available properties.
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
        The new column’s description.
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
        The column’s user-specified unique identifier. If not provided, a new ID will be auto-generated. If provided, it must meet the following requirements:

        * [1-20] characters in length (inclusive)
        * Only lowercase letters (_a-z_) and underscores (**_**)
        * Must be unique (no other column on the board can have the same ID)
        * Can’t reuse column IDs, even if the column has been deleted from the board
        * Can’t be null, blank, or an empty string
      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new column’s title.
      </td>
    </tr>
  </tbody>
</Table>

## Change column value

Changes a column **with a JSON value**. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

For multi-level boards, rollup column changes are blocked if the item has at least one subitem.

```graphql GraphQL
mutation {
  change_column_value(
    board_id: 1234567890
    item_id: 9876543210
    column_id: "email9",
    value: "{\"text\":\"test@gmail.com\",\"email\":\"test@gmail.com\"}"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $item_id: ID!, $column_id: String!, $column_value: JSON!) { change_column_value (board_id: $board_id, item_id: $item_id, column_id: $column_id, value: $column_value) {id}}`;
const variables = {
  board_id: 9571351437,
  item_id: 9571351485,
  column_id: "email_mksr9hcd", // email column
  column_value: JSON.stringify({
    text: "Dabba Baz",
    email: "dabba@tuesday.biz",
  })
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument                    | Type      | Description                                                                                                                                                                                |
| :-------------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| board\_id                   | `ID!`     | The board's unique identifier.                                                                                                                                                             |
| column\_id                  | `String!` | The column's unique identifier.                                                                                                                                                            |
| create\_labels\_if\_missing | `Boolean` | Creates status/dropdown labels if they are missing. Requires permission to change the board structure.                                                                                     |
| item\_id                    | `ID`      | The item's unique identifier.                                                                                                                                                              |
| value                       | `JSON!`   | The new value of the column in JSON format. See [Column Types Reference](https://developer.monday.com/api-reference/reference/column-types-reference) for each column type and its format. |

## Change simple column value

Changes a column **with a string value**. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

```graphql GraphQL
mutation {
  change_simple_column_value(
    board_id: 1234567890
    item_id: 9876543210
    column_id: "status"
    value: "Working on it"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $item_id: ID!, $column_id: String!, $column_value: String!) { change_simple_column_value (board_id: $board_id, item_id: $item_id, column_id: $column_id, value: $column_value) {id}}`;
const variables = {
  board_id: 9571351437,
  item_id: 9571351485,
  column_id: "email_mksr9hcd",
  // Each column type has a different value structure
  // Check "Column types reference" section for different values
  column_value: "dabba@monday.com dabba@monday.com"
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument                    | Type      | Description                                                                                            |
| :-------------------------- | :-------- | :----------------------------------------------------------------------------------------------------- |
| board\_id                   | `ID!`     | The board's unique identifier.                                                                         |
| column\_id                  | `String!` | The column's unique identifier.                                                                        |
| create\_labels\_if\_missing | `Boolean` | Creates status/dropdown labels if they are missing. Requires permission to change the board structure. |
| item\_id                    | `ID`      | The item's unique identifier.                                                                          |
| value                       | `String`  | The new simple value of the column.                                                                    |

## Change multiple column values

Changes multiple columns  **with a JSON value**. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

Each column has a type, and different column types require different parameter sets to update their values. When sending data in the `column_values` argument, use a string and build it using this sample form: `{\"text\": \"New text\", \"status\": {\"label\": \"Done\"}}`

<Callout icon="👍" theme="okay">
  You can also use **simple** (`String`) values in this mutation along with **regular** (`JSON`) values, or just simple values. Here's an example of setting a status with a simple value: `{\"text\": \"New text\", \"status\": \"Done\"}`
</Callout>

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 1234567890
    board_id: 9876543210
    column_values: "{\"status\":{\"index\":1},\"date4\":{\"date\":\"2021-01-01\"},\"person\":{\"personsAndTeams\":[{\"id\":9603417,\"kind\":\"person\"}]}}"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $item_id: ID!,  $column_value: JSON!) {change_multiple_column_values (item_id: $item_id, board_id: $board_id, column_values: $column_value) {id}}`;
const variables = {
  board_id: 9571351437,
  item_id: 9571351485,
  column_id: "email_mksr9hcd",
  // Each column type has a different value structure
  // Check "Column types reference" section for different values
  column_value: JSON.stringify({
    color_mksreyj6: "In progress",
    date_mksr13fh: "2025-08-27",
    multiple_person_mksr4ka7: "dabba.baz@gmail.com",
  })
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument                    | Type      | Definition                                                                                             |
| :-------------------------- | :-------- | :----------------------------------------------------------------------------------------------------- |
| board\_id                   | `ID!`     | The unique identifier of the board that contains the columns to change.                                |
| column\_values              | `JSON!`   | The updated column values.                                                                             |
| create\_labels\_if\_missing | `Boolean` | Creates status/dropdown labels if they are missing. Requires permission to change the board structure. |
| item\_id                    | `ID`      | The unique identifier of the item to change.                                                           |

## Change column title

Changes the title of an existing column. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

```graphql GraphQL
mutation {
  change_column_title(
    board_id: 1234567890
    column_id: "status"
    title: "new_status"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $column_id: String!, $title: String!) {change_column_title (board_id: $board_id, column_id: $column_id, title: $title) {id}}`;
const variables = {
  board_id: 9571351437,
  column_id: "status",
  title: "New title"
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument   | Type      | Definition                                                             |
| :--------- | :-------- | :--------------------------------------------------------------------- |
| board\_id  | `ID!`     | The unique identifier of the board that contains the column to change. |
| column\_id | `String!` | The column's unique identifier.                                        |
| title      | `String!` | The column's new title.                                                |

## Update column

Updates a column. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

The input is validated against the column type's schema before applying changes

```graphql GraphQL
mutation {
  update_column(
    board_id: 1234567890
    id: "status"
    title: "Work Status"
    description: "This is my updated work status column"
    column_type: status
    width: 200
    revision: "a73d19e54f82c0b7d1e348f5ac92b6de"
  ) {
    id
    title
    description
  }
}
```

### Arguments

<Table align={["left","left","left"]}>
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
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the board where the updated column is located.
      </td>
    </tr>

    <tr>
      <td>
        capabilities
      </td>

      <td>
        [`ColumnCapabilitiesInput`](https://developer.monday.com/api-reference/reference/columns-other-types#columncapabilitiesinput)
      </td>

      <td>
        The new column’s capabilities configuration. If omitted, defaults apply: on multi-level boards, numeric, date, timeline, and status columns are created with the calculated capability enabled; in all other cases, no capabilities are applied. To override this default on multi-level boards, pass an empty argument to create the column without capabilities.
      </td>
    </tr>

    <tr>
      <td>
        column_type
      </td>

      <td>
        [`ColumnType!`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype)
      </td>

      <td>
        The updated column’s type. This determines which properties are valid in the `defaults` argument.
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
        The updated column’s description.
      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The updated column’s user-specified unique identifier. If not provided, a new ID will be auto-generated. If provided, it must meet the following requirements:

        * [1-20] characters in length (inclusive)
        * Only lowercase letters (_a-z_) and underscores (**_**)
        * Must be unique (no other column on the board can have the same ID)
        * Can’t reuse column IDs, even if the column has been deleted from the board
        * Can’t be null, blank, or an empty string
      </td>
    </tr>

    <tr>
      <td>
        revision
      </td>

      <td>
        `String!`
      </td>

      <td>
        The column’s current revision. Used for optimistic concurrency control.
      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The column’s type-specific settings in JSON. Query [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) to see available properties.
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
        The updated column’s title.
      </td>
    </tr>

    <tr>
      <td>
        width
      </td>

      <td>
        `Int`
      </td>

      <td>
        The column’s updated width in pixels.
      </td>
    </tr>
  </tbody>
</Table>

## Change column metadata

Updates the title or description of an existing column. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

```graphql GraphQL
mutation {
  change_column_metadata(
    board_id: 1234567890
    column_id: "date4"
    column_property: description
    value: "This is my awesome date column"
  ) {
    id
    title
    description
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $column_id: String!, $desc: String!) {change_column_metadata (board_id: $board_id, column_id: $column_id, column_property: description, value: $desc) {id}}`;
const variables = {
  board_id: 9571351437,
  column_id: "status",
  desc: "New title"
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument         | Type             | Definition                                                             | Enum Values           |
| :--------------- | :--------------- | :--------------------------------------------------------------------- | :-------------------- |
| board\_id        | `ID!`            | The unique identifier of the board that contains the column to change. |                       |
| column\_id       | `String!`        | The column's unique identifier.                                        |                       |
| column\_property | `ColumnProperty` | The property you want to change.                                       | `description` `title` |
| value            | `String`         | The new value of that property.                                        |                       |

## Delete column

Deletes a single column from a board. Returns [`Column`](https://developer.monday.com/api-reference/docs/columns#fields).

```graphql GraphQL
mutation {
  delete_column(
    board_id: 1234567890
    column_id: "status"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($board_id: ID!, $column_id: String!) { delete_column(board_id: $board_id, column_id: $column_id) { id }}`;
const variables = {
  board_id: 9571351437,
  column_id: "status",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument   | Type      | Description                                                            |
| :--------- | :-------- | :--------------------------------------------------------------------- |
| board\_id  | `ID!`     | The unique identifier of the board that contains the column to delete. |
| column\_id | `String!` | The column's unique identifier.                                        |
