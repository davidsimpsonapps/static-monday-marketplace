---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Email

Learn how to filter, read, update, and clear the email column on monday boards using the platform API

The [email column](https://support.monday.com/hc/en-us/articles/360002155560-The-Email-Column) allows you to attach an email address to an item and send emails to that contact with a single click. Each value stores both an email address and a display text label.

Via the API, the email column supports read, filter, update, and clear operations.

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
        `email`
      </td>

      <td style={{ textAlign: "left" }}>
        `EmailValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Update: **Yes**
        * Clear: **Yes**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Email columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `EmailValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on EmailValue {
        id
        email
        label
        text
        value
        updated_at
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
        ... on EmailValue {
          id
          email
          label
          text
          value
          updated_at
        }
      }
    }
  }
`;

const variables = {
  itemIds: [1234567890, 9876543210],
  columnType: "email"
};

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `EmailValue` implementation will return.

| Field              | Description                                                                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| column `Column!`   | The column the value belongs to, including its `id` and `title`.                                                                               |
| email `String`     | The email address. Returns `null` if the column is empty.                                                                                      |
| id `ID!`           | The column's unique identifier.                                                                                                                |
| label `String`     | The display text label. When the user doesn't set separate display text, this equals the `email` value. Returns `null` if the column is empty. |
| text `String`      | A combined text representation in the format `"label - email"`. Returns `""` if the column is empty.                                           |
| type `ColumnType!` | The column's type (`email`).                                                                                                                   |
| updated\_at `Date` | The column's last updated date.                                                                                                                |
| value `JSON`       | The column's raw value as a JSON string containing `email`, `text`, and `changed_at` keys. Returns `null` if the column is empty.              |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Task A",
        "column_values": [
          {
            "id": "email",
            "email": "test@example.com",
            "label": "Test Contact",
            "text": "Test Contact - test@example.com",
            "value": "{\"email\":\"test@example.com\",\"text\":\"Test Contact\",\"changed_at\":\"2026-03-21T08:42:31.539Z\"}",
            "updated_at": null
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by email values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The email column supports the following operators:

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
        An array of display text values (e.g., `["Test Contact"]`)
      </td>

      <td>
        Returns items whose email column display text matches any of the specified values. Matches the `label` field, not the raw email address.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of display text values (e.g., `["Test Contact"]`)
      </td>

      <td>
        Excludes items whose email column display text matches any of the specified values.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A partial or full string (e.g., `["@example.com"]`)
      </td>

      <td>
        Returns items where the email address or display text contains the specified string.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        A partial or full string (e.g., `["@gmail"]`)
      </td>

      <td>
        Excludes items where the email address or display text contains the specified string.
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
        Returns items with an empty (unset) email value.
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
        Returns items that have an email value set.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The `any_of` and `not_any_of` operators match against the column's display text (`label`), not the raw email address. If the display text equals the email (i.e., the user didn't set separate display text), then the email address will match. Use `contains_text` if you need to search by the email address specifically.
</Callout>

## Examples

### Filter by display text

This example returns all items where the email column's display text matches "Test Contact".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "email"
            compare_value: ["Test Contact"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on EmailValue {
            email
            label
          }
        }
      }
    }
  }
}
```

### Filter by email domain

This example returns all items that contain "@example.com" in their email address or display text.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "email"
            compare_value: ["@example.com"]
            operator: contains_text
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
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  query ($boardId: [ID!], $columnId: ID!, $operator: ItemsQueryRuleOperator!, $compareValue: CompareValue!) {
    boards(ids: $boardId) {
      items_page(
        query_params: {
          rules: [{
            column_id: $columnId,
            compare_value: $compareValue,
            operator: $operator
          }]
        }
      ) {
        items {
          id
          name
        }
      }
    }
  }
`;

const variables = {
  boardId: 1234567890,
  columnId: "email",
  compareValue: ["@example.com"],
  operator: "contains_text",
};

const response = await mondayApiClient.request(query, variables);
```

### Filter by empty values

This example returns all items with an empty email column.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "email"
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

## Update

You can update an email column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

### `change_simple_column_value`

Send both the email address and display text as a single string separated by a space. The first token is the email address; everything after the first space is the display text. **Both are required.**

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "email"
    value: "example@example.com This is an example email"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  mutation (
    $boardId: ID!,
    $itemId: ID!,
    $columnId: String!,
    $columnValue: String!
  ) {
    change_simple_column_value(
      item_id: $itemId,
      board_id: $boardId,
      column_id: $columnId,
      value: $columnValue
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnId: "email",
  columnValue: "example@example.com This is an example email",
};

const response = await mondayApiClient.request(query, variables);
```

### `change_multiple_column_values`

Send the `email` and `text` keys as a JSON object in `column_values`. **Both keys are required.**

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"email\": {\"email\": \"example@example.com\", \"text\": \"This is an example email\"}}"
  ) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  mutation (
    $boardId: ID!,
    $itemId: ID!,
    $columnValues: JSON!
  ) {
    change_multiple_column_values(
      item_id: $itemId,
      board_id: $boardId,
      column_values: $columnValues
    ) {
      id
    }
  }
`;

const variables = {
  boardId: 1234567890,
  itemId: 9876543210,
  columnValues: JSON.stringify({
    email: {
      email: "example@example.com",
      text: "This is an example email"
    }
  }),
};

const response = await mondayApiClient.request(query, variables);
```

### Set email on item creation

You can set an email value when creating an item by passing the email column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New contact"
    column_values: "{\"email\": {\"email\": \"contact@example.com\", \"text\": \"Main Contact\"}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear an email column using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "email"
    value: ""
  ) {
    id
  }
}
```

### `change_multiple_column_values`

Pass `null` in `column_values`.

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"email\": null}"
  ) {
    id
  }
}
```

***

# Reading column configuration

To check an email column's settings, query the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["email"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object. For a default email column, this will be an empty object `{}`. When configured, it can contain:

| Key                     | Type      | Description                                                 |
| :---------------------- | :-------- | :---------------------------------------------------------- |
| `includePulseInSubject` | `boolean` | Whether to include the item name in the email subject line. |
| `ccPulse`               | `boolean` | Whether to CC the item's email address on outgoing emails.  |

### Example `settings` response (default)

```json
{}
```

### Example `settings` response (configured)

```json
{
  "includePulseInSubject": true,
  "ccPulse": true
}
```

***

# Get column type schema

You can retrieve the JSON schema for the email column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: email
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
              "includePulseInSubject": {
                "type": "boolean",
                "description": "Whether to include the item name in the email subject"
              },
              "ccPulse": {
                "type": "boolean",
                "description": "Whether to CC the item email address"
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
