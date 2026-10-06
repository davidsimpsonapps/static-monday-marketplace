---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Dashboards and widgets

Learn how to create, update, and delete dashboards and widgets using the platform API

monday.com <Glossary>dashboards</Glossary> compile data from one or more boards into a centralized [high-level overview](https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards). They're made up of apps and widgets that visually display key metrics like project progress, budgets, workloads, and much more!

# Mutations

## Create dashboard

Creates a new dashboard. Returns [`Dashboard`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#dashboard).

```graphql GraphQL
mutation {
  create_dashboard(
    board_ids: ["1234567890", "9876543210"]
    board_folder_id: 543210
    kind: PRIVATE
    name: "Team Performance"
    workspace_id: -1
  ) {
    id
    name
    kind
    workspace_id
  }
}
```
```json JSON
{
  "data": {
    "create_dashboard": {
      "id": "12345",
      "name": "Team Performance",
      "kind": "PRIVATE",
      "workspace_id": -1
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
        board_ids
      </td>

      <td>
        `[ID!]!`
      </td>

      <td>
        The unique identifier of the board(s) to create dashboards for.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder to create the dashboard in.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `DashboardKind`
      </td>

      <td>
        The dashboard's visibility. The default is `PRIVATE`.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
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
        The dashboard's name. Up to 255 characters.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the workspace to create the dashboard in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Create widget

Creates a new widget. Returns [`WidgetModel`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#widgetmodel).

```graphql GraphQL
mutation CreateNumberWidget($settings: JSON!) {
  create_widget(
    parent: {
      kind: BOARD_VIEW
      id: 54321
    }
    kind: NUMBER
    name: "High Cost Sum (>$1000)"
    settings: $settings
    filter: {
      operator: and
      rules: [
        {
          column_id: "cost"
          operator: greater_than
          compare_value: [1000]
        }
      ]
    }
  ) {
    id
    name
    kind
  }
}
```
```json Variables
// Pass these variables with the sample mutation

{
  "settings": {
    "counter_data": {
      "calculation_type": "columns",
      "column_ids_per_board": {
        "1234567890": ["cost"]
      },
      "counter_type": "sum",
      "counter_unit": {
        "symbol": "$",
        "direction": "left"
      }
    },
    "prefix": "Total",
    "suffix": "in high-cost flights",
    "number_format": "currency"
  }
}

```
```json JSON
{
  "data": {
    "create_widget": {
      "id": 123456789,
      "name": "High Cost Sum (>$1000)",
      "kind": "NUMBER"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type                                                                                                                              | Description                                                                                                                                                             |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter   | [`ItemsQueryGroup`](https://developer.monday.com/api-reference/reference/other-types#items-query)                                 | The optional filter to apply to the widget. Only works with board views.                                                                                                |
| kind     | [`ExternalWidget!`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#externalwidget)       | The type of widget to create.                                                                                                                                           |
| name     | `String!`                                                                                                                         | The widget's name that's displayed in the UI.                                                                                                                           |
| parent   | [`WidgetParentInput!`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#widgetparentinput) | The widget's parent container.                                                                                                                                          |
| settings | `JSON!`                                                                                                                           | The widget's type-specific settings. Query [`all_widgets_schema`](https://developer.monday.com/api-reference/reference/all-widgets-schema) to see available properties. |

## Update dashboard

Updates a dashboard. Returns [`Dashboard`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#dashboard).

```graphql GraphQL
mutation {
  update_dashboard(
    id: 12345
		board_folder_id: 9876543210
    kind: PUBLIC
    name: "Team Performance Q4"
    workspace_id: -1
  ) {
		id
    name
    kind
    workspace_id
  }
}
```
```json JSON
{
  "data": {
    "update_dashboard": {
      "id": "12345",
      "name": "Team Performance Q4",
      "kind": "PUBLIC",
      "workspace_id": -1
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
        board_folder_id
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the folder to move the dashboard to.
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
        The unique identifier of the dashboard to update.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `DashboardKind`
      </td>

      <td>
        The dashboard's updated kind.
      </td>

      <td>
        `PRIVATE`  
        `PUBLIC`
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
        The dashboard's updated name.
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
        The unique identifier of the workspace to update the dashboard in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Update overview hierarchy

Updates a dashboard's position or location. Returns [`UpdateOverviewHierarchy`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#updateoverviewhierarchy).

```graphql GraphQL
mutation {
  update_overview_hierarchy(
    overview_id: 12345
    attributes: {
      workspace_id: -1
      position: {
        is_after: true
        object_id: "9876543210"
        object_type: Board
      }
    }
  ) {
    success
    message
    overview {
      workspace_id
      name
      state
      creator {
        id
      }
    }
  }
}
```
```json JSON
{
  "data": {
    "update_overview_hierarchy": {
      "success": true,
      "message": "Overview position updated successfully",
      "overview": {
        "workspace_id": "-1",
        "name": "New Dashboard",
				"state": "1",
        "creator": {
          "id": "1234567890"
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

| Argument     | Type                                                                                                                                                             | Description                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| attributes   | [`UpdateOverviewHierarchyAttributes`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#updateoverviewhierarchyattributes) | The dashboard's updated position and location attributes. |
| overview\_id | `ID!`                                                                                                                                                            | The dashboard's unique identifier.                        |

## Delete dashboard

Deletes a dashboard. Returns a Boolean indicating whether the deletion was successful.

```graphql GraphQL
mutation {
  delete_dashboard(id: 12345)
}
```
```json JSON
{
  "data": {
    "delete_dashboard": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type  | Description                                       |
| :------- | :---- | :------------------------------------------------ |
| id       | `ID!` | The unique identifier of the dashboard to delete. |

## Delete widget

Deletes a widget. Returns a Boolean indicating whether the deletion was successful.

```graphql GraphQL
mutation {
  delete_widget(id: 12345)
}
```
```json JSON
{
  "data": {
    "delete_widget": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument | Type  | Description                                    |
| :------- | :---- | :--------------------------------------------- |
| id       | `ID!` | The unique identifier of the widget to delete. |
