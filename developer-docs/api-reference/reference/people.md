---
updatedAt: 2026-09-06T08:35:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# People

Learn how to filter by, read, update, and clear the people column on monday boards using the platform API

The [people column](https://support.monday.com/hc/en-us/articles/360002281539-The-People-Column) assigns one or more users or teams to an item. Each entry in the column is a `PeopleEntity` with an `id` and a `kind` (`person`, `team`, or `agent`).

Via the API, the people column supports read, filter, update, and clear operations.

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
        `people`
      </td>

      <td style={{ textAlign: "left" }}>
        `PeopleValue`
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

People columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on `items` using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `PeopleValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on PeopleValue {
        id
        text
        persons_and_teams {
          id
          kind
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
        ... on PeopleValue {
          id
          text
          persons_and_teams {
            id
            kind
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

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `PeopleValue` implementation will return.

| Field                                                                             | Description                                                                                         |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns#) | The column the value belongs to.                                                                    |
| id `ID!`                                                                          | The column's unique identifier.                                                                     |
| is\_leaf `Boolean!`                                                               | Whether the item has no subitems. Returns `false` for parent items with subitems.                   |
| persons\_and\_teams [`[PeopleEntity!]`](#peopleentity)                            | The assigned people or teams. Each entity has an `id` and `kind` (`person`, `team`, or `agent`).    |
| text `String`                                                                     | The column's value as text (comma-separated names). Returns `""` if the column has an empty value.  |
| type `ColumnType!`                                                                | The column's type (`people`).                                                                       |
| updated\_at `Date`                                                                | The column's last updated date.                                                                     |
| value `JSON`                                                                      | The column's JSON-formatted raw value. Contains `personsAndTeams` array and `changed_at` timestamp. |

### PeopleEntity

Each entry in the `persons_and_teams` array is a `PeopleEntity` object.

| Field | Type   | Description                                  |
| :---- | :----- | :------------------------------------------- |
| id    | `ID!`  | The unique identifier of the person or team. |
| kind  | `Kind` | The type of entity: `person` or `team`.      |

### Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Design homepage",
        "column_values": [
          {
            "id": "people",
            "text": "Daniel Hai, Roy Mann",
            "persons_and_teams": [
              {
                "id": "48202303",
                "kind": "person"
              },
              {
                "id": "331",
                "kind": "person"
              }
            ],
            "value": "{\"changed_at\":\"2026-03-21T09:03:56.017Z\",\"personsAndTeams\":[{\"id\":48202303,\"kind\":\"person\"},{\"id\":331,\"kind\":\"person\"}]}",
            "updated_at": "2026-03-21T09:03:56+00:00"
          }
        ]
      }
    ]
  }
}
```

***

# Filter

You can filter items by people values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The people column supports the following operators:

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
        `["person-123456"]` or `["assigned_to_me"]` or `["person-0"]`
      </td>

      <td>
        Returns items assigned to any of the specified people. Use `"person-{userId}"` format for user IDs, `"assigned_to_me"` for the API caller, or `"person-0"` for blank values.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        `["person-123456"]` or `["assigned_to_me"]` or `["person-0"]`
      </td>

      <td>
        Excludes items assigned to any of the specified people.
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
        Returns items with no people assigned.
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
        Returns items that have at least one person or team assigned.
      </td>
    </tr>

    <tr>
      <td>
        `contains_text`
      </td>

      <td>
        A partial or full name string (e.g., `"Daniel"`)
      </td>

      <td>
        Returns items where an assigned person's name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `not_contains_text`
      </td>

      <td>
        A partial or full name string
      </td>

      <td>
        Excludes items where an assigned person's name contains the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `contains_terms`
      </td>

      <td>
        One or more keywords (e.g., `"Daniel Hai"`)
      </td>

      <td>
        Matches names by keyword(s) in any order.
      </td>
    </tr>

    <tr>
      <td>
        `starts_with`
      </td>

      <td>
        A string prefix (e.g., `"Dan"`)
      </td>

      <td>
        Returns items where an assigned person's name starts with the specified text.
      </td>
    </tr>

    <tr>
      <td>
        `ends_with`
      </td>

      <td>
        A string suffix (e.g., `"Mann"`)
      </td>

      <td>
        Returns items where an assigned person's name ends with the specified text.
      </td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The `any_of` and `not_any_of` operators require the `"person-{userId}"` format for user IDs. For example, use `"person-48202303"`, not `"48202303"`.
</Callout>

## Examples

### Filter by specific person

This example returns items assigned to a specific user.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
            compare_value: ["person-48202303"]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on PeopleValue {
            text
            persons_and_teams {
              id
              kind
            }
          }
        }
      }
    }
  }
}
```

### Filter by current API user

This example returns items assigned to the user making the API call.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
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

### Filter by name text

This example returns items where an assigned person's name contains "Daniel".

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
            compare_value: "Daniel"
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

### Filter by empty people column

This example returns items with no people assigned.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "people"
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

## Update value

You can update a people column value using [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). You can send values as simple strings or JSON objects, depending on the mutation you choose.

<Callout icon="🚧" theme="warn">
  Updating a people column **replaces** all currently assigned people. To add a person without removing existing ones, first read the current value, then send the full list including the new person.
</Callout>

### `change_simple_column_value`

Pass a comma-separated list of user IDs as a string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "people"
    value: "48202303,331"
  ) {
    id
  }
}
```

### `change_multiple_column_values`

Send people and/or team IDs as a JSON object with a `personsAndTeams` array. Each entry requires an `id` (integer) and `kind` (`"person"` or `"team"`).

```graphql GraphQL
mutation {
  change_multiple_column_values(
    item_id: 9876543210
    board_id: 1234567890
    column_values: "{\"people\": {\"personsAndTeams\": [{\"id\": 48202303, \"kind\": \"person\"}, {\"id\": 51166, \"kind\": \"team\"}]}}"
  ) {
    id
  }
}
```

### Set on item creation

You can assign people when creating an item by passing the people column value in the `column_values` argument.

```graphql GraphQL
mutation {
  create_item(
    board_id: 1234567890
    item_name: "New task"
    column_values: "{\"people\": {\"personsAndTeams\": [{\"id\": 48202303, \"kind\": \"person\"}]}}"
  ) {
    id
    name
  }
}
```

## Clear

You can clear a people column using [`change_simple_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/docs/columns#change-multiple-column-values).

### `change_simple_column_value`

Pass an empty string in `value`.

```graphql GraphQL
mutation {
  change_simple_column_value(
    item_id: 9876543210
    board_id: 1234567890
    column_id: "people"
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
    column_values: "{\"people\": null}"
  ) {
    id
  }
}
```

***

# Reading column configuration

To understand a people column's settings, you can query its `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["people"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object. For people columns, the settings object is typically empty (`{}`) when using default configuration.

When settings are customized, the response contains these keys:

| Key                  | Type      | Description                                               |
| :------------------- | :-------- | :-------------------------------------------------------- |
| `hide_footer`        | `boolean` | Whether to hide the footer in the column cell.            |
| `max_people_allowed` | `string`  | Maximum number of people allowed (`"0"` means unlimited). |

### Example `settings` response

```json
{}
```

<Callout icon="📘" theme="info">
  People columns use an empty settings object by default. The `max_people_allowed` and `hide_footer` settings only appear when explicitly configured.
</Callout>

***

# Get column type schema

You can retrieve the JSON schema for the people column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: people
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
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              },
              "max_people_allowed": {
                "type": "string",
                "description": "Maximum number of people allowed (0 means unlimited)"
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
