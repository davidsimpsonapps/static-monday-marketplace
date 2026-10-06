---
updatedAt: 2026-09-06T08:34:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Button

Learn how to create and read the button column using the monday.com platform API

The [button column](https://support.monday.com/hc/en-us/articles/360015690319-The-Button-Column) lets users trigger predefined actions with a single click. Buttons are typically connected to integrations or automations and display a configurable label and color.

Via the API, the button column supports read and create column operations. Values cannot be filtered, updated, or cleared because button state is managed by automations, not user data.

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
        `button`
      </td>

      <td style={{ textAlign: "left" }}>
        `ButtonValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **No**
        * Create column: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Button columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `ButtonValue`.

```graphql GraphQL
query {
  items(ids: [1234567890]) {
    id
    name
    column_values {
      ... on ButtonValue {
        id
        label
        color
        text
        value
      }
    }
  }
}
```
```javascript JavaScript
const query = `
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      id
      name
      column_values {
        ... on ButtonValue {
          id
          label
          color
          text
          value
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `ButtonValue` implementation will return.

| Field              | Description                                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------- |
| id `ID!`           | The column's unique identifier.                                                              |
| label `String`     | The button's display label (e.g., `"Click me"`). Configured in the column settings.          |
| color `String`     | The button's HEX color value (e.g., `"#579bfc"`).                                            |
| text `String`      | The button's display text. Returns the same value as `label`.                                |
| value `JSON`       | The column's raw value in JSON format. Returns `null` because buttons don't store user data. |
| column `Column!`   | The column the value belongs to.                                                             |
| type `ColumnType!` | The column's type (`button`).                                                                |

### Example response

```json
{
  "data": {
    "items": [
      {
        "id": "1234567890",
        "name": "Task A",
        "column_values": [
          {
            "id": "button_1",
            "label": "Click me",
            "color": "#579bfc",
            "text": "Click me",
            "value": null
          }
        ]
      }
    ]
  }
}
```

***

# Filter

Filtering by button column values is **not supported**. Button columns don't store user data, so filter rules targeting a button column ID will not return meaningful results.

***

# Mutations

## Create column

**Required scope: `boards:write`**

You can create a button column using the [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. Pass configuration options in the `defaults` argument as a JSON string.

<Callout icon="📘" theme="info">
  There is no typed `create_button_column` mutation. Use the generic `create_column` mutation with `column_type: button`.
</Callout>

### Default button

Creates a button with the default label "Click me" and color `#579bfc`.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Action"
    column_type: button
  ) {
    id
    title
    settings
  }
}
```

### Custom button text

Pass a `buttonText` property in the `defaults` settings to customize the label.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    title: "Launch"
    column_type: button
    defaults: "{\"settings\":{\"buttonText\":\"Launch\"}}"
  ) {
    id
    title
    settings
  }
}
```
```javascript JavaScript
const query = `
  mutation ($boardId: ID!, $title: String!, $defaults: JSON) {
    create_column(
      board_id: $boardId
      title: $title
      column_type: button
      defaults: $defaults
    ) {
      id
      title
      settings
    }
  }
`;

const variables = {
  boardId: "1234567890",
  title: "Launch",
  defaults: JSON.stringify({
    settings: {
      buttonText: "Launch"
    }
  })
};

const response = await mondayApiClient.request(query, variables);
```

### Settings

| Setting      | Type     | Required | Description                                                              |
| :----------- | :------- | :------- | :----------------------------------------------------------------------- |
| `buttonText` | `String` | No       | Text displayed on the button. Defaults to `"Click me"` if not specified. |

### Example response

```json
{
  "data": {
    "create_column": {
      "id": "button_1",
      "title": "Launch",
      "settings": {"buttonText": "Launch"}
    }
  }
}
```

## Update value

Updating button column values is **not supported**. Buttons are display elements connected to automations and do not store user-editable data.

Attempting to update via `change_simple_column_value` returns:

```
column type ButtonColumn is not supporting changing the column value with simple column value
```

## Clear

Clearing button column values is **not supported**. Buttons do not store user data.

***

# Reading column configuration

You can query a button column's settings through the column's `settings` field. For columns created with default settings, `settings` returns an empty object (`{}`). For columns with custom button text, it returns the configured text.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["button_column_id"]) {
      id
      title
      type
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object that may contain:

| Key          | Type     | Description                                                            |
| :----------- | :------- | :--------------------------------------------------------------------- |
| `buttonText` | `string` | The text displayed on the button. Absent when using the default label. |

### Example `settings` response

Default settings (no configuration):

```json
{}
```

Custom button text:

```json
{
  "buttonText": "Launch"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the button column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: button
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
            "description": "Button settings",
            "properties": {
              "buttonText": {
                "type": "string",
                "description": "Text displayed on the button"
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
