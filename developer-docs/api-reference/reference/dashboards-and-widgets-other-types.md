---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the dashboards and widgets APIs

The monday.com [dashboards and widgets](https://developer.monday.com/api-reference/reference/dashboards-and-widgets) APIs enable you to create, update, and delete dashboards/widgets.

The types below are used by the dashboards and widgets queries and mutations, and are not independently queryable.

# Dashboard

An object containing the result of creating a new dashboard via the API.

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
        board_folder_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the folder the dashboard is in.
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
        The dashboard's unique identifier.
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
        The dashboard's visibility.
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
        The dashboard's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the workspace the dashboard is in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# ExternalWidget

Supported `ExternalWidget`enum values.

| Enum Value    | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `APP_FEATURE` | App feature widgets for embedding custom app functionality in dashboards. (version `2026-04` and later)        |
| `BATTERY`     | The battery widget is used to track progress and visualize completion status.                                  |
| `CHART`       | The chart widget is used to visualize data (e.g., pie charts, bar charts, column charts).                      |
| `LISTVIEW`    | Cross-board items displayed in a tabular list format with filtering and sorting. (version `2026-04` and later) |
| `NUMBER`      | The number widget displays numeric metrics (e.g., sums, averages, counts, and totals).                         |

***

# UpdateOverviewHierarchy

An object containing the result of updating a dashboard's hierarchy via the API.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        message
      </td>

      <td>
        `String!`
      </td>

      <td>
        A message about the operation's result.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        overview
      </td>

      <td>
        [`Overview`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#overview)
      </td>

      <td>
        The updated dashboard's metadata.
      </td>

      <td>
        created_at `ISO8601DateTime`  
        creator `User!`  
        folder_id `ID`  
        id `ID!`  
        kind `String`  
        name `String!`  
        state `String!`  
        updated_at `ISO8601DateTime`  
        workspace_id `ID`
      </td>
    </tr>

    <tr>
      <td>
        success
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the operation was successful.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Overview

An object containing metadata about the updated dashboard.

| Field         | Type                                                                  | Description                                                 |
| :------------ | :-------------------------------------------------------------------- | :---------------------------------------------------------- |
| created\_at   | `ISO8601DateTime`                                                     | The dashboard's creation date.                              |
| creator       | [`User!`](https://developer.monday.com/api-reference/reference/users) | The unique identifier of the dashboard's creator.           |
| folder\_id    | `ID`                                                                  | The unique identifier of the folder the dashboard is in.    |
| id            | `ID!`                                                                 | The unique identifier of the dashboard.                     |
| kind          | `String`                                                              | The dashboard's kind (private or public).                   |
| name          | `String!`                                                             | The dashboard's name.                                       |
| state         | `String!`                                                             | The dashboard's state.                                      |
| updated\_at   | `ISO8601DateTime`                                                     | The dashboard's last updated date.                          |
| workspace\_id | `ID`                                                                  | The unique identifier of the workspace the dashboard is in. |

***

# UpdateOverviewHierarchyAttributes

An object containing the updated dashboard hierarchy attributes.

| Field                | Type                                                                                                                         | Description                                                                    |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| account\_product\_id | `ID`                                                                                                                         | The unique identifier of the account to which the dashboard should be moved.   |
| folder\_id           | `ID`                                                                                                                         | The unique identifier of the folder to which the dashboard should be moved.    |
| position             | [`DynamicPosition`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#dynamicposition) | The dashboard's position in the left pane.                                     |
| workspace\_id        | `ID`                                                                                                                         | The unique identifier of the workspace to which the dashboard should be moved. |

## DynamicPosition

An object containing attributes about the updated dashboard's left pane reference item.

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
        is_after
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the target dashboard will be placed after the reference object.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The unique identifier of the object relative to which the target dashboard will be positioned (e.g., board ID, dashboard ID, folder ID).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        object_type
      </td>

      <td>
        `ObjectType!`
      </td>

      <td>
        The type of object used to reference where the target dashboard should be positioned in relation to.
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

# WidgetModel

An object containing the result of creating a new widget via the API.

| Field  | Type                                                                                                                               | Description                                                        |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| id     | `Int`                                                                                                                              | The new widget's unique identifier.                                |
| kind   | [`ExternalWidget`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#externalwidget)         | The new widget's type.                                             |
| name   | `String`                                                                                                                           | The new widget's name.                                             |
| parent | [`WidgetParentOutput`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#widgetparentoutput) | An object containing metadata about the widget's parent container. |

## WidgetParentOutput

An object containing the widget's parent properties.

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
        id
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the parent dashboard or board view.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `WidgetParentKind`
      </td>

      <td>
        The type of parent container.
      </td>

      <td>
        `BOARD_VIEW`  
        `DASHBOARD`
      </td>
    </tr>
  </tbody>
</Table>

### WidgetParentKind

Supported `WidgetParentKind`enum values.

| Enum Value | Description                                                                                  |
| :--------- | :------------------------------------------------------------------------------------------- |
| `BATTERY`  | The battery widget is used to track progress and visualize completion status.                |
| `CHART`    | The chart widget is used for visualizing data (e.g., pie charts, bar charts, column charts). |
| `NUMBER`   | The number widget displays numeric metrics (e.g., sums, averages, counts, and totals).       |

***

# WidgetParentInput

An object containing the widget's parent properties.

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
        id
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The unique identifier of the parent dashboard or board view.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `WidgetParentKind!`
      </td>

      <td>
        The type of parent container.
      </td>

      <td>
        `BOARD_VIEW`  
        `DASHBOARD`
      </td>
    </tr>
  </tbody>
</Table>
