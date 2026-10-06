---
updatedAt: 2026-09-10T08:20:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Views

Learn how to read, create, update, and delete monday.com board views using the platform API

monday.com [board views](https://support.monday.com/hc/en-us/articles/360001267945-The-board-views) allow you to visualize your board data differently through colors, shapes, and graphs.

# Queries

## Get views

* Returns an array containing metadata about a collection of board views
* Must be nested inside a `boards` query

```graphql GraphQL
query {
  boards(
    ids: [1234567890]
	) {
    views {
      type
      settings_str
      view_specific_data_str
      name
      id
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($board: [ID!]) { boards (ids: $board) { views { id name type } } }`
const variables = {
  board: 1234567
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type     | Description                                 |
| :------- | :------- | :------------------------------------------ |
| ids      | `[ID!]`  | The specific board IDs to return views for. |
| type     | `String` | The specific type of views to return.       |

### Fields

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
        access_level
      </td>

      <td>
        `BoardViewAccessLevel!`
      </td>

      <td>
        The user's board view access level.
      </td>

      <td>
        `edit`  
        `view`
      </td>
    </tr>

    <tr>
      <td>
        filter
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The view's filter metadata.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_team_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The team ID the view is filtered by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_user_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The user ID the view is filtered by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The view's unique identifier.
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
        The view's name.
      </td>

      <td>

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
        The view's settings. The structure varies by view type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings_str
      </td>

      <td>
        `String!`
      </td>

      <td>
        The view's settings.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sort
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The view's sort metadata.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        source_view_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the original view this was duplicated from (if applicable).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        tags
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The view's tags.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `String!`
      </td>

      <td>
        The view's type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        view_specific_data_str
      </td>

      <td>
        `String!`
      </td>

      <td>
        Specific board view data (only supported for forms).
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

# Mutations

**Required scope:`boards:write`**

## Create view

Creates a new board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

```graphql GraphQL
mutation {
  create_view(
    board_id: 1234567890
    type: APP
    name: "My app view"
    settings: {
      app_feature_id: 54321
    }
  ) {
    id
    name
  }
}
```
```json JSON
{
  "data": {
    "create_view": {
      "id": "9876543210",
      "name": "My app view"
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
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter
      </td>

      <td>
        [`ItemsQueryGroup`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsquerygroup)
      </td>

      <td>
        The view's filters.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_user_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The user ID to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_team_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The team ID to filter by.
      </td>

      <td>

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
        The view's name.
      </td>

      <td>

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
        The view's type-specific configuration settings. Query [`get_view_schema_by_type`](https://developer.monday.com/api-reference/reference/get-view-schema-by-type) to see available properties.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sort
      </td>

      <td>
        [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsqueryorderby)
      </td>

      <td>
        The view's sort order.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        tags
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The view's tags.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `ViewKind!`
      </td>

      <td>
        The type of view to create.
      </td>

      <td>
        `APP`  
        `DASHBOARD`  
        `FORM`  
        `TABLE`
      </td>
    </tr>
  </tbody>
</Table>

## Create view table

Creates a new table board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

```graphql GraphQL
mutation {
  create_view_table(
    board_id: 1234567890
    name: "My new table view"
  ) {
    id
    name
  }
} 
```
```json JSON
{
  "data": {
    "create_view_table": {
      "id": "9876543210",
      "name": "My new table view"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument         | Type                                                                                                                            | Description                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| board\_id        | `ID!`                                                                                                                           | The board's unique identifier.           |
| filter           | [`ItemsQueryGroup`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsquerygroup)               | The table view's filters.                |
| filter\_user\_id | `ID`                                                                                                                            | The user ID to filter by.                |
| filter\_team\_id | `ID`                                                                                                                            | The team ID to filter by.                |
| name             | `String`                                                                                                                        | The table view's name.                   |
| settings         | [`TableViewSettingsInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#tableviewsettingsinput) | The table view's configuration settings. |
| sort             | [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsqueryorderby)        | The table view's sort order.             |
| tags             | `[String!]`                                                                                                                     | The table view's tags.                   |

## Update view

Updates a board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

```graphql GraphQL
mutation {
  update_view(
    board_id: 1234567890
    view_id: 54321
    sort: {
      column_id: "name"
      direction: asc
    }
    type:TABLE
  ) {
    id
    sort
  }
}
```
```json JSON
{
  "data": {
    "update_view": {
      "id": "54321",
      "sort": [
        {
          "column_id": "name",
          "direction": "ASC"
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
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter
      </td>

      <td>
        [`ItemsQueryGroup`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsquerygroup)
      </td>

      <td>
        The view's filters.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_user_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The user ID to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        filter_team_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The team ID to filter by.
      </td>

      <td>

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
        The view's name.
      </td>

      <td>

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
        The view's type-specific configuration settings. Query [`get_view_schema_by_type`](https://developer.monday.com/api-reference/reference/get-view-schema-by-type) to see available properties.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sort
      </td>

      <td>
        [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsqueryorderby)
      </td>

      <td>
        The view's sort order.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        tags
      </td>

      <td>
        `[String!]`
      </td>

      <td>
        The view's tags.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `ViewKind!`
      </td>

      <td>
        The view's type.
      </td>

      <td>
        `APP`  
        `DASHBOARD`  
        `FORM`  
        `TABLE`
      </td>
    </tr>

    <tr>
      <td>
        view_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The view's unique identifier.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update view table

Updates a table board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

```graphql GraphQL
mutation {
  update_view_table(
    board_id: 1234567890
    view_id: 54321
    settings: {
      columns:{
        column_properties:{
          column_id:"date",
          visible: false
        }
      }
    }
  ) {
    id
    sort
  }
}
```

### Arguments

| Argument         | Type                                                                                                                            | Description                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| board\_id        | `ID!`                                                                                                                           | The board's unique identifier.           |
| filter           | [`ItemsQueryGroup`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsquerygroup)               | The table view's filters.                |
| filter\_user\_id | `ID`                                                                                                                            | The user ID to filter by.                |
| filter\_team\_id | `ID`                                                                                                                            | The team ID to filter by.                |
| name             | `String`                                                                                                                        | The table view's name.                   |
| settings         | [`TableViewSettingsInput`](https://developer.monday.com/api-reference/reference/board-views-other-types#tableviewsettingsinput) | The table view's configuration settings. |
| sort             | [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/reference/board-views-other-types#itemsqueryorderby)        | The table view's sort order.             |
| tags             | `[String!]`                                                                                                                     | The table view's tags.                   |
| view\_id         | `ID!`                                                                                                                           | The view's unique identifier.            |

## Delete view

Deletes a board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

```graphql GraphQL
mutation {
  delete_view(
    board_id: 1234567890
    view_id: 54321
  ) {
    name
  }
}
```
```json JSON
{
  "data": {
    "delete_view": {
      "name": "Deleted Form"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type  | Description                    |
| :-------- | :---- | :----------------------------- |
| board\_id | `ID!` | The board's unique identifier. |
| view\_id  | `ID!` | The view's unique identifier.  |

## Duplicate view

Duplicates an existing board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

```graphql GraphQL
mutation {
  duplicate_view(
    board_id: 1234567890
    view_id: 54321
  ) {
    id
    name
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($board: ID!, $view: ID!) { duplicate_view(board_id: $board, view_id: $view) { id name }}`
const variables = {
  board: 1234567890,
  view: 54321
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument  | Type  | Description                                     |
| :-------- | :---- | :---------------------------------------------- |
| board\_id | `ID!` | The board's unique identifier.                  |
| view\_id  | `ID!` | The unique identifier of the view to duplicate. |

## Restore view

Restores a previously deleted board view. Returns [`BoardView`](https://developer.monday.com/api-reference/reference/board-views#fields).

<Callout icon="🚧" theme="warn">
  **Only available in API versions `2026-10` and later**
</Callout>

```graphql GraphQL
mutation {
  restore_view(
    board_id: 1234567890
    view_id: 54321
  ) {
    id
    name
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });
const query = `mutation ($board: ID!, $view: ID!) { restore_view(board_id: $board, view_id: $view) { id name }}`
const variables = {
  board: 1234567890,
  view: 54321
}
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument  | Type  | Description                                           |
| :-------- | :---- | :---------------------------------------------------- |
| board\_id | `ID!` | The board's unique identifier.                        |
| view\_id  | `ID!` | The unique identifier of the deleted view to restore. |
