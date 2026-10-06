---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Last Updated

Learn how to create, filter by, and read the last updated column on monday boards using the platform API

The [last updated column](https://support.monday.com/hc/en-us/articles/360000504840-The-Last-Updated-column-) displays when an item was last modified and who updated it. It is automatically populated by the system — you cannot write to or clear its value directly.

Via the API, the last updated column supports read, filter, and create operations.

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
        `last_updated`
      </td>

      <td style={{ textAlign: "left" }}>
        `LastUpdatedValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Last updated columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `LastUpdatedValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on LastUpdatedValue {
        id
        updated_at
        updater_id
        updater {
          id
          name
        }
        text
        value
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!], $columnType: [ColumnType!]) {
    items(ids: $itemIds) {
      name
      column_values(types: $columnType) {
        column { title id }
        ... on LastUpdatedValue {
          updated_at
          updater_id
          updater {
            id
            name
          }
          text
          value
        }
      }
    }
  }
`;

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "last_updated"
};

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `LastUpdatedValue` implementation will return.

| Field                                                                            | Description                                                                                    |
| :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                               |
| id `ID!`                                                                         | The column's unique identifier.                                                                |
| is\_leaf `Boolean!`                                                              | Whether the item is a leaf (has no subitems). Returns `false` for parent items.                |
| text `String`                                                                    | The column's value as text (e.g., `"2026-03-21 08:47:10 UTC"`).                                |
| type `ColumnType!`                                                               | The column's type.                                                                             |
| updated\_at `Date`                                                               | Timestamp of the last time the item was updated.                                               |
| updater [`User`](https://developer.monday.com/api-reference/reference/users)     | The user who last updated the item. Contains `id`, `name`, and other user fields.              |
| updater\_id `ID`                                                                 | The unique identifier of the user who last updated the item.                                   |
| value `JSON`                                                                     | The column's raw value as a JSON string. Returns `{"updated_at": "...", "updater_id": "..."}`. |

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "last_updated",
            "updated_at": "2026-03-21T08:47:10Z",
            "updater_id": "123456",
            "updater": {
              "id": "123456",
              "name": "John Doe"
            },
            "text": "2026-03-21 08:47:10 UTC",
            "value": "{\"updated_at\":\"2026-03-21T08:47:10Z\",\"updater_id\":\"123456\"}"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by their last updated information using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object.

Even if the last updated column is not visible on the board, you can filter by last updated metadata using `__last_updated__` as the `column_id`.

You can filter items by:

* Who last updated them
* When they were last updated

<Callout icon="👍" theme="okay">
  The results depend on the timezone, date format, and [first day of the week](https://support.monday.com/hc/en-us/articles/115005720725-How-to-change-the-first-day-of-the-week-in-my-calendar) settings configured in the monday.com profile of the user making the API call.
</Callout>

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Compare Value
      </th>

      <th>
        Description
      </th>

      <th>
        Operators
      </th>

      <th>
        Compare Attribute
      </th>

      <th>
        Compare Attribute Required?
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `"assigned_to_me"`
      </td>

      <td>
        Items last updated by the calling user
      </td>

      <td>
        `any_of`
        `not_any_of`
      </td>

      <td>
        *
      </td>

      <td>
        No
      </td>
    </tr>

    <tr>
      <td>
        `"person-123456"`
      </td>

      <td>
        Items last updated by a specific user (replace `123456` with the user ID)
      </td>

      <td>
        `any_of`
        `not_any_of`
      </td>

      <td>
        *
      </td>

      <td>
        No
      </td>
    </tr>

    <tr>
      <td>
        `"TODAY"`
      </td>

      <td>
        Items last updated today
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"YESTERDAY"`
      </td>

      <td>
        Items last updated yesterday
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"THIS_WEEK"`
      </td>

      <td>
        Items last updated this week
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"LAST_WEEK"`
      </td>

      <td>
        Items last updated last week
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"THIS_MONTH"`
      </td>

      <td>
        Items last updated this month
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"LAST_MONTH"`
      </td>

      <td>
        Items last updated last month
      </td>

      <td>
        `any_of` `not_any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>

    <tr>
      <td>
        `"PAST_DATETIME"`
      </td>

      <td>
        Items that have been updated at any point in the past
      </td>

      <td>
        `any_of`
      </td>

      <td>
        `"UPDATED_AT"`
      </td>

      <td>
        Yes
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by today's updates

This example returns all items last updated today, even if the board does not have a visible last updated column.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "__last_updated__"
            compare_value: ["TODAY"]
            operator: any_of
            compare_attribute: "UPDATED_AT"
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
```javascript JavaScript
const query = `
  query ($boardId: [ID!], $columnId: ID!, $operator: ItemsQueryRuleOperator!, $compareValue: CompareValue!, $compareAttribute: String!) {
    boards(ids: $boardId) {
      items_page(
        query_params: {
          rules: [
            {
              column_id: $columnId,
              compare_value: $compareValue,
              compare_attribute: $compareAttribute,
              operator: $operator
            }
          ]
        }
      ) {
        items { id name }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "__last_updated__",
  compareValue: ["TODAY"],
  compareAttribute: "UPDATED_AT",
  operator: "any_of"
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by who last updated an item

This example returns all items last updated by user `123456`.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "__last_updated__"
            compare_value: ["person-123456"]
            operator: any_of
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
```javascript JavaScript
const query = `
  query ($boardId: [ID!], $columnId: ID!, $operator: ItemsQueryRuleOperator!, $compareValue: CompareValue!) {
    boards(ids: $boardId) {
      items_page(
        query_params: {
          rules: [
            { column_id: $columnId, compare_value: $compareValue, operator: $operator }
          ]
        }
      ) {
        items { id name }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "__last_updated__",
  compareValue: ["person-123456"],
  operator: "any_of"
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by items not updated today

This example returns items that were **not** updated today.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "__last_updated__"
            compare_value: ["TODAY"]
            operator: not_any_of
            compare_attribute: "UPDATED_AT"
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

### Filter by items updated by the calling user

This example returns items last updated by the user making the API call.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "__last_updated__"
            compare_value: ["assigned_to_me"]
            operator: any_of
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

You can create a last updated column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column) mutation. There is no typed create mutation for the last updated column.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Last Updated"
    column_type: last_updated
    defaults: "{\"mode\":\"personAndDate\",\"dateFormatMode\":\"dateAgo\"}"
  ) {
    id
    title
    description
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $title: String!, $columnType: ColumnType!, $defaults: JSON) {
    create_column(
      board_id: $boardId
      title: $title
      column_type: $columnType
      defaults: $defaults
    ) {
      id
      title
      description
    }
  }
`;

const variables = {
  boardId: 1234567890,
  title: "Last Updated",
  columnType: "last_updated",
  defaults: "{\"mode\":\"personAndDate\",\"dateFormatMode\":\"dateAgo\"}"
};

const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument          | Type          | Description                                                                                                              |
| :---------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------- |
| board\_id         | `ID!`         | The board's unique identifier.                                                                                           |
| title             | `String!`     | The column's title.                                                                                                      |
| column\_type      | `ColumnType!` | Must be `last_updated`.                                                                                                  |
| id                | `String`      | A custom column ID. If not provided, one is auto-generated.                                                              |
| description       | `String`      | The column's description.                                                                                                |
| after\_column\_id | `ID`          | The ID of the column to insert the new column after.                                                                     |
| defaults          | `JSON`        | A JSON string containing column settings. See [column settings](#reading-column-configuration) for available properties. |

### Settings properties

| Property         | Type     | Description                                                                                             |
| :--------------- | :------- | :------------------------------------------------------------------------------------------------------ |
| `mode`           | `String` | Display mode: `"personOnly"`, `"dateOnly"`, or `"personAndDate"`.                                       |
| `dateFormatMode` | `String` | How to display the date: `"dateAgo"` (relative, e.g., "2 hours ago") or `"dateFormat"` (absolute date). |

## Update and clear

The last updated column is read-only. You cannot update or clear its value through the API — it is automatically set by the system whenever any column value on the item changes.

***

# Reading column configuration

To understand a last updated column's display settings, you can query its settings through the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["last_updated"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key              | Type     | Description                                                                                                                |
| :--------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| `mode`           | `String` | Display mode: `"personOnly"` (show only who updated), `"dateOnly"` (show only the date), or `"personAndDate"` (show both). |
| `dateFormatMode` | `String` | How to display the date: `"dateAgo"` (relative time like "2 hours ago") or `"dateFormat"` (absolute date).                 |

<Callout icon="📘" theme="info">
  If the column uses default settings, `settings` returns `{}`. The settings keys only appear when explicitly configured.
</Callout>

### Example: Default settings

```json
{}
```

### Example: Custom settings

```json
{
  "mode": "dateOnly",
  "dateFormatMode": "dateFormat"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the last updated column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: last_updated
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
              "mode": {
                "type": "string",
                "description": "Display mode for the pulse updated column",
                "enum": [
                  "personOnly",
                  "dateOnly",
                  "personAndDate"
                ]
              },
              "dateFormatMode": {
                "type": "string",
                "description": "How to display the date value",
                "enum": [
                  "dateAgo",
                  "dateFormat"
                ]
              }
            },
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

The response includes property names, types, constraints (such as max lengths and allowed values), and descriptions for each setting. You can use this to validate column settings, dynamically generate UIs, or give context to AI agents. [Learn more about the schema response format](https://developer.monday.com/api-reference/reference/get-column-type-schema).

<br />
