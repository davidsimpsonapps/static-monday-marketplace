---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Status

Learn how to filter by, read, update, and clear the status column on monday boards using the platform API

The [status column](https://support.monday.com/hc/en-us/articles/360001269685-The-Status-Column) displays labels that represent the state of an item. It's commonly used for workflows, project progress, and visual status reporting. Each status column contains a set of labels, colors, and indexes.

Via the API, the status column supports read, filter, create, update, and clear operations.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column Type
      </th>

      <th style={{ textAlign: "left" }}>
        Implementation Type
      </th>

      <th style={{ textAlign: "left" }}>
        Supported Operations
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `status`
      </td>

      <td style={{ textAlign: "left" }}>
        `StatusValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **Yes**
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Status columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments).

Depending on the board type, the API returns one of two value types:

* **Classic boards**: `StatusValue` type
* **Multi-level boards**: `BatteryValue` type

This affects how you query and interpret the data, as shown in the examples below.

<Callout icon="🚧" theme="warn">
  On multi-level boards, status columns with rollup capability require `capabilities: [CALCULATED]` on the `column_values` field to return any values. Without it, the API returns an empty array — even for leaf items with static values.  

  Status rollup columns always resolve to `BatteryValue` for **all** items, including leaves. Using `... on StatusValue` will **not** match on these columns.
</Callout>

## StatusValue (Classic Boards)

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on StatusValue {
        id
        index
        label
        text
        is_done
        label_style {
          color
          border
        }
        value
        updated_at
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      name
      column_values {
        ... on StatusValue {
          id
          index
          label
          text
          is_done
          label_style {
            color
            border
          }
          value
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `StatusValue` implementation will return.

| Field                                                | Description                                                                                                            |
| :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| column `Column!`                                     | The column the value belongs to.                                                                                       |
| id `ID!`                                             | The column's unique identifier.                                                                                        |
| index `Int`                                          | The status label's ID (used for updates). Returns `null` if the status is empty.                                       |
| is\_done `Boolean`                                   | Whether the status is marked as complete.                                                                              |
| label `String`                                       | The current label displayed for the item. Returns `null` if the status is empty.                                       |
| label\_style [`StatusLabelStyle`](#statuslabelstyle) | The label's color and border styling. Contains `color` (hex) and `border` (hex).                                       |
| text `String`                                        | The column's value as text. Returns `null` if the column has an empty value.                                           |
| type `ColumnType!`                                   | The column's type.                                                                                                     |
| update\_id `ID`                                      | The update associated with this status (if any).                                                                       |
| updated\_at `Date`                                   | The column's last updated date.                                                                                        |
| value `JSON`                                         | The column's raw value as a JSON string. Returns `{"index": N}` where `N` is the label ID.                             |
| is\_leaf `Boolean!`                                  | Whether this item has no subitems. Returns `false` when the item has subitems on either classic or multi-level boards. |

### StatusLabelStyle

An object containing the style properties for a status label.

| Field  | Type      | Description                        |
| :----- | :-------- | :--------------------------------- |
| border | `String!` | The label's border Hex color code. |
| color  | `String!` | The label's Hex color code.        |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "status",
            "index": 1,
            "label": "Done",
            "text": "Done",
            "is_done": true,
            "label_style": {
              "color": "#00c875",
              "border": "#00b461"
            },
            "value": "{\"index\":1}",
            "updated_at": "2026-03-20T12:00:00Z"
          }
        ]
      }
    ]
  }
}
```

## BatteryValue (Multi-Level Boards)

On multi-level boards, status columns with rollup capability resolve to `BatteryValue` instead of `StatusValue`. This applies to **all** items — both parents with calculated values and leaves with static values. For leaf items, the `battery_value` array contains a single entry representing the item's own status. For parent items, it contains the aggregated count of all child statuses.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values(capabilities: [CALCULATED]) {
      ... on BatteryValue {
        id
        text
        is_leaf
        battery_value {
          key
          count
        }
      }
    }
  }
}
```

### Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `BatteryValue` implementation will return.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        battery_value `[BatteryValueItem!]!`
      </td>

      <td>
        The column's indices and number of occurrences.
      </td>

      <td>
        count `Int!`  
        key `ID!`
      </td>
    </tr>

    <tr>
      <td>
        column `Column!`
      </td>

      <td>
        The column the value belongs to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id `ID!`
      </td>

      <td>
        The column's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        text `String`
      </td>

      <td>
        The column's value as text. Returns `null` if the column has an empty value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `ColumnType!`
      </td>

      <td>
        The column's type.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        value `JSON`
      </td>

      <td>
        The column's JSON-formatted raw value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_leaf `Boolean!`
      </td>

      <td>
        Whether this item has no subitems. On multi-level boards with rollup capability, `false` indicates the value is a calculated rollup from child items rather than a static value.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# Filter

You can filter items by status values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The filters support matching by:

* Label ID (recommended)
* Label text (`contains_terms`)
* Empty values

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Operator
      </th>

      <th>
        Compare Value
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `any_of`
      </td>

      <td>
        An array of label IDs (e.g., `[1, 2]`)
      </td>

      <td>
        Returns items whose status matches any of the specified label IDs. IDs can be found by querying the [column's settings](https://developer.monday.com/api-reference/docs/columns#field).
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of label IDs (e.g., `[1, 2]`)
      </td>

      <td>
        Excludes items whose status matches any of the specified label IDs.
      </td>
    </tr>

    <tr>
      <td>
        `contains_terms`
      </td>

      <td>
        A string label value (e.g., `"Done"`)
      </td>

      <td>
        Returns items whose status label contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `is_empty`
      </td>

      <td>
        `[]`
      </td>

      <td>
        Returns items with an empty (unset) status value.
      </td>
    </tr>

    <tr>
      <td>
        `is_not_empty`
      </td>

      <td>
        `[]`
      </td>

      <td>
        Returns items that have a status value set.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The default empty label uses ID `5`. You can also filter for empty statuses using `any_of` with `[5]`, though `is_empty` with `[]` is preferred for clarity.
</Callout>

## Examples

### Filter by label ID

This example returns all items with a status label ID of `1` (typically "Done" on default boards).

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "status"
            compare_value: [1]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on StatusValue {
            label
            index
          }
        }
      }
    }
  }
}
```

### Filter by status label text

This example returns all items on the specified board with a "Done" label.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "status"
            compare_value: "Done"
            operator: contains_terms
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on StatusValue {
            label
          }
        }
      }
    }
  }
}
```

### Filter by empty status

This example returns all items on the specified board with an empty status value.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "status"
            compare_value: []
            operator: is_empty
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

***

# Mutations

## Create

**Required scope: `boards:write`**

The [`create_status_column`](https://developer.monday.com/api-reference/reference/columns#create-status-column) mutation creates a new status column with strongly typed settings via the API. You can specify which [fields](https://developer.monday.com/api-reference/docs/columns#fields) to return in the mutation response.

```graphql GraphQL
mutation {
  create_status_column(
    board_id: 1234567890
    id: "project_status"
    title: "Project Status"
    defaults: {
      labels: [
        { color: done_green, label: "Done", index: 0, is_done: true }
        { color: working_orange, label: "Working on it", index: 1 }
        { color: stuck_red, label: "Stuck", index: 2 }
        { color: bright_blue, label: "Waiting for review", index: 3 }
      ]
    }
    description: "The project's current status."
  ) {
    id
    title
    description
    settings
  }
}
```

### Arguments

| Argument                                     | Type      | Description                                                           |
| :------------------------------------------- | :-------- | :-------------------------------------------------------------------- |
| board\_id                                    | `ID!`     | The board's unique identifier.                                        |
| id                                           | `String`  | A custom column ID. If not provided, one is auto-generated.           |
| title                                        | `String!` | The column's title.                                                   |
| description                                  | `String`  | The column's description.                                             |
| after\_column\_id                            | `ID`      | The ID of the column to insert the new column after.                  |
| defaults `CreateStatusColumnSettingsInput`   | `Object`  | The column's label configuration. See label input fields below.       |
| capabilities `StatusColumnCapabilitiesInput` | `Object`  | The column's capability settings (e.g., calculated/rollup functions). |

<Callout icon="📘" theme="info">
  On multi-level boards, status columns are created with `COUNT_KEYS` rollup by default. To disable rollup, pass `capabilities: { calculated: { function: NONE } }`.
</Callout>

### Label input fields (`CreateStatusLabelInput`)

| Field       | Type                  | Required | Description                                                       |
| :---------- | :-------------------- | :------- | :---------------------------------------------------------------- |
| label       | `String!`             | Yes      | The label's display text (max 30 characters).                     |
| color       | `StatusColumnColors!` | Yes      | The label's color. See [available colors](#available-colors).     |
| index       | `Int!`                | Yes      | The label's display order position (0–39).                        |
| description | `String`              | No       | An optional description for the label.                            |
| is\_done    | `Boolean`             | No       | Whether the label represents a "done" state. Defaults to `false`. |

## Update column settings

**Required scope: `boards:write`**

The `update_status_column` mutation updates an existing status column's settings, including its title, description, and label configuration.

<Callout icon="🚧" theme="warn">
  The `revision` argument is required. You can obtain the current revision from the column's `settings` or by querying the column. This prevents concurrent edits from overwriting each other.
</Callout>

```graphql GraphQL
mutation {
  update_status_column(
    board_id: 1234567890
    id: "status"
    revision: "replace_with_current_revision"
    title: "Task Status"
    settings: {
      labels: [
        { id: 1, color: done_green, label: "Complete", index: 0, is_done: true }
        { id: 0, color: working_orange, label: "In Progress", index: 1 }
        { id: 2, color: stuck_red, label: "Blocked", index: 2 }
        { id: 7, color: bright_blue, label: "Draft", index: 3, is_deactivated: false }
      ]
    }
  ) {
    id
    title
    settings
  }
}
```

### Arguments

| Argument                                     | Type      | Required | Description                                           |
| :------------------------------------------- | :-------- | :------- | :---------------------------------------------------- |
| board\_id                                    | `ID!`     | Yes      | The board's unique identifier.                        |
| id                                           | `String!` | Yes      | The column's unique identifier.                       |
| revision                                     | `String!` | Yes      | The column's current revision for conflict detection. |
| title                                        | `String`  | No       | The column's new title.                               |
| description                                  | `String`  | No       | The column's new description.                         |
| width                                        | `Int`     | No       | The column's display width in pixels.                 |
| settings `UpdateStatusColumnSettingsInput`   | `Object`  | No       | The column's updated label configuration.             |
| capabilities `StatusColumnCapabilitiesInput` | `Object`  | No       | The column's updated capability settings.             |

### Update label input fields (`UpdateStatusLabelInput`)

| Field           | Type                  | Required | Description                                                              |
| :-------------- | :-------------------- | :------- | :----------------------------------------------------------------------- |
| label           | `String!`             | Yes      | The label's display text (max 30 characters).                            |
| color           | `StatusColumnColors!` | Yes      | The label's color.                                                       |
| index           | `Int!`                | Yes      | The label's display order position (0–39).                               |
| id              | `Int`                 | No       | The label's unique identifier. Required when updating an existing label. |
| description     | `String`              | No       | An optional description for the label.                                   |
| is\_deactivated | `Boolean`             | No       | Whether the label is deactivated (hidden from the UI).                   |
| is\_done        | `Boolean`             | No       | Whether the label represents a "done" state.                             |

## Update value

<Callout icon="🚧" theme="warn">
  On multi-level boards, mutations on parent items with calculated rollup values **do not return an error** — the API returns a success response, but the value is not changed. Update child items instead.
</Callout>

You can update a status column value using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

Each status column can contain up to 40 labels.

You may update the column value using either:

* **Index values:** stable and recommended, especially when working across multiple boards
* **Label text:** human-readable, but fragile if labels change

<Callout icon="🚧" theme="warn">
  If a label is numeric (e.g., "2023"), always update by index, not label text. The API will interpret the string as an index number.
</Callout>

### `change_simple_column_value`

Pass either the index or the label value in the `value` argument.

#### Update by index

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "status"
    value: "1"
  ) {
    id
    name
  }
}
```

#### Update by label text

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "status"
    value: "Done"
    create_labels_if_missing: true
  ) {
    id
    name
  }
}
```

<Callout icon="📘" theme="info">
  Set `create_labels_if_missing: true` to automatically create a new label if the provided text doesn't match any existing label. Without this flag, updating by a non-existent label returns an error.
</Callout>

### `change_multiple_column_values`

Send the `index` or `label` keys as a JSON object in `column_values`.

#### Update by index (JSON)

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"status\": {\"index\": 1}}"
  ) {
    id
    name
  }
}
```

#### Update by label (JSON)

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"status\": {\"label\": \"Done\"}}"
    create_labels_if_missing: true
  ) {
    id
    name
  }
}
```

### Set status on item creation

You can set a status value when creating an item by passing the status column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"status\": {\"label\": \"Working on it\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a status column using [`change_simple_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "status"
    value: ""
  ) {
    id
    name
  }
}
```

### `change_multiple_column_values`

Pass `null` or an empty object in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"status\": null}"
  ) {
    id
    name
  }
}
```

***

# Reading column configuration

To understand a status column's labels, colors, and structure, query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["status"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

| Field    | Type            | Description                                                     |
| -------- | --------------- | --------------------------------------------------------------- |
| `labels` | `StatusLabel[]` | Array of label objects representing the possible status values. |

<br />

### `StatusLabel`

| Field            | Type                 | Required | Description                                                                                                                         |
| ---------------- | -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `number`             | Yes      | Unique numeric identifier for the label. **This is the value you must use when updating a status via the API** (see warning below). |
| `label`          | `string`             | Yes      | Display text of the status label (e.g., `"Working on it"`, `"Done"`, `"Stuck"`).                                                    |
| `color`          | `StatusColumnColors` | Yes      | Color enum value. See [Available colors](#available-colors).                                                                        |
| `hex`            | `string`             | No       | Hex color code override (e.g., `"#fdab3d"`). When present, takes precedence over `color`.                                           |
| `index`          | `number`             | Yes      | The label's **position** (display order) within the status column.                                                                  |
| `description`    | `string`             | No       | Optional description text for the label.                                                                                            |
| `is_deactivated` | `boolean`            | No       | Whether the label is deactivated (hidden from the UI). Defaults to `false`.                                                         |
| `is_done`        | `boolean`            | No       | Whether this label represents a "done" state. Defaults to `false`.                                                                  |

<br />

### Example response

```json
{
  "settings": {
    "type": "status",
    "labels": [
      {
        "id": 0,
        "label": "Working on it",
        "color": "working_orange",
        "index": 0,
        "is_done": false
      },
      {
        "id": 1,
        "label": "Done",
        "color": "done_green",
        "index": 1,
        "is_done": true
      },
      {
        "id": 2,
        "label": "Stuck",
        "color": "stuck_red",
        "index": 2,
        "is_done": false
      }
    ]
  }
}
```

### `id` vs `index` — Important distinction

<Callout icon="⚠️" theme="warning">
**Warning**

The `id` and `index` fields in the `StatusLabel` object have **different meanings**:

* **`index`** — The label's **display position** (order) in the column. This can change when labels are reordered.
* **`id`** — The label's **unique identifier**. This is stable and does not change when labels are reordered.

When updating a status value via `change_multiple_column_values`, you must pass the label's **`id`**, even though the API parameter is called `"index"`.
</Callout>

#### Example

Suppose a status column has these labels:

| `id` | `index` (position) | Label         |
| :--- | :----------------- | :------------ |
| 1    | 0                  | Done          |
| 0    | 1                  | Working on it |
| 2    | 2                  | Stuck         |

To set an item to "Done", pass `{"index": 1}` (the label's `id`, not its display position):

```graphql
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"status\": {\"index\": 1}}"
  ) {
    id
  }
}
```

***

# Index and color mapping

Status columns use index values to identify each label. Each index corresponds to a label and color, and these mappings can be customized per board.

Below are monday.com's default mappings:

| Index | Default Label | Default Color | Color Code |
| :---- | :------------ | :------------ | :--------- |
| 0     | (Empty/Blank) | Gray          | #c4c4c4    |
| 1     | Done          | Green         | #00c875    |
| 2     | Working on it | Orange        | #fdab3d    |
| 3     | Stuck         | Red           | #e2445c    |
| 4     | (Custom)      | Blue          | #0086c0    |
| 5     | (Empty)       | Gray          | #c4c4c4    |

View the [complete list of default index values and colors](https://view.monday.com/1073554546-ad9f20a427a16e67ded630108994c11b?r=use1).

## Important considerations

While index values are stable, the label text and colors are customizable. That means the mapping of each index can differ between boards.

For example:

* Index 1 might begin as the green "Done" label
* A board admin changes it to blue "Completed"
* The index remains 1, but the display label and color change

Do not assume that the same index corresponds to the same label or color on every board. Always check the board's configuration with the following query:

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["status"]) {
      id
      title
      settings
    }
  }
}
```

***

# Available colors

The `StatusColumnColors` enum defines the 40 available colors for status labels. You can reference these by name (in mutations) or by their numeric ID.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Color Name
      </th>

      <th>
        Numeric ID
      </th>

      <th>
        Hex Code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>`working_orange`</td>
      <td>0</td>
      <td>#fdab3d</td>
    </tr>
    <tr>
      <td>`done_green`</td>
      <td>1</td>
      <td>#00c875</td>
    </tr>
    <tr>
      <td>`stuck_red`</td>
      <td>2</td>
      <td>#e2445c</td>
    </tr>
    <tr>
      <td>`dark_blue`</td>
      <td>3</td>
      <td>#0086c0</td>
    </tr>
    <tr>
      <td>`purple`</td>
      <td>4</td>
      <td>#9d50dd</td>
    </tr>
    <tr>
      <td>`explosive`</td>
      <td>5</td>
      <td>#ff642e</td>
    </tr>
    <tr>
      <td>`grass_green`</td>
      <td>6</td>
      <td>#037f4c</td>
    </tr>
    <tr>
      <td>`bright_blue`</td>
      <td>7</td>
      <td>#579bfc</td>
    </tr>
    <tr>
      <td>`saladish`</td>
      <td>8</td>
      <td>#cab641</td>
    </tr>
    <tr>
      <td>`egg_yolk`</td>
      <td>9</td>
      <td>#ffcb00</td>
    </tr>
    <tr>
      <td>`blackish`</td>
      <td>10</td>
      <td>#333333</td>
    </tr>
    <tr>
      <td>`dark_red`</td>
      <td>11</td>
      <td>#bb3354</td>
    </tr>
    <tr>
      <td>`sofia_pink`</td>
      <td>12</td>
      <td>#ff158a</td>
    </tr>
    <tr>
      <td>`lipstick`</td>
      <td>13</td>
      <td>#ff5ac4</td>
    </tr>
    <tr>
      <td>`dark_purple`</td>
      <td>14</td>
      <td>#784bd1</td>
    </tr>
    <tr>
      <td>`bright_green`</td>
      <td>15</td>
      <td>#9cd326</td>
    </tr>
    <tr>
      <td>`chili_blue`</td>
      <td>16</td>
      <td>#66ccff</td>
    </tr>
    <tr>
      <td>`american_gray`</td>
      <td>17</td>
      <td>#808080</td>
    </tr>
    <tr>
      <td>`brown`</td>
      <td>18</td>
      <td>#7f5347</td>
    </tr>
    <tr>
      <td>`dark_orange`</td>
      <td>19</td>
      <td>#d974b0</td>
    </tr>
    <tr>
      <td>`sunset`</td>
      <td>101</td>
      <td>#ff7575</td>
    </tr>
    <tr>
      <td>`bubble`</td>
      <td>102</td>
      <td>#faa1f1</td>
    </tr>
    <tr>
      <td>`peach`</td>
      <td>103</td>
      <td>#ffadad</td>
    </tr>
    <tr>
      <td>`berry`</td>
      <td>104</td>
      <td>#e8697d</td>
    </tr>
    <tr>
      <td>`winter`</td>
      <td>105</td>
      <td>#9aadbd</td>
    </tr>
    <tr>
      <td>`river`</td>
      <td>106</td>
      <td>#68a1bd</td>
    </tr>
    <tr>
      <td>`navy`</td>
      <td>107</td>
      <td>#225091</td>
    </tr>
    <tr>
      <td>`aquamarine`</td>
      <td>108</td>
      <td>#4eccc6</td>
    </tr>
    <tr>
      <td>`indigo`</td>
      <td>109</td>
      <td>#5559df</td>
    </tr>
    <tr>
      <td>`dark_indigo`</td>
      <td>110</td>
      <td>#401694</td>
    </tr>
    <tr>
      <td>`pecan`</td>
      <td>151</td>
      <td>#563e3e</td>
    </tr>
    <tr>
      <td>`lavender`</td>
      <td>152</td>
      <td>#a25ddc</td>
    </tr>
    <tr>
      <td>`royal`</td>
      <td>153</td>
      <td>#2b76e5</td>
    </tr>
    <tr>
      <td>`steel`</td>
      <td>154</td>
      <td>#a9bee8</td>
    </tr>
    <tr>
      <td>`orchid`</td>
      <td>155</td>
      <td>#dce3ea</td>
    </tr>
    <tr>
      <td>`lilac`</td>
      <td>156</td>
      <td>#bda8f0</td>
    </tr>
    <tr>
      <td>`tan`</td>
      <td>157</td>
      <td>#a0a0a0</td>
    </tr>
    <tr>
      <td>`sky`</td>
      <td>158</td>
      <td>#a1e3f6</td>
    </tr>
    <tr>
      <td>`coffee`</td>
      <td>159</td>
      <td>#bd816e</td>
    </tr>
    <tr>
      <td>`teal`</td>
      <td>160</td>
      <td>#2da283</td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The numeric ID for a color also serves as the label ID when creating labels. For example, a label with `color: done_green` will be assigned ID `1`. This means each color can only be used once per status column.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the status column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: status
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of managed column (status)"
              },
              "labels": {
                "type": "array",
                "maxItems": 40,
                "description": "Array of status labels",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "description": "The unique identifier for the label"
                    },
                    "label": {
                      "type": "string",
                      "maxLength": 30,
                      "description": "The display text for the label"
                    },
                    "color": {
                      "oneOf": [
                        {
                          "type": "string",
                          "enum": [
                            "working_orange",
                            "done_green",
                            "stuck_red",
                            "..."
                          ],
                          "description": "The color name from StatusColumnColors enum"
                        },
                        {
                          "type": "integer",
                          "description": "The color value from StatusColumnColors enum"
                        }
                      ]
                    },
                    "index": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 39,
                      "description": "The display order of the label"
                    },
                    "is_done": {
                      "type": "boolean",
                      "description": "Whether the label represents a done state"
                    }
                  },
                  "required": [
                    "label",
                    "color",
                    "index"
                  ]
                }
              }
            },
            "required": [
              "labels"
            ]
          }
        }
      }
    }
  }
}
```

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
