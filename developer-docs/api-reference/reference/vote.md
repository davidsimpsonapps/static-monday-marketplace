---
updatedAt: 2026-09-06T08:35:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Vote

Learn how to filter by and read the vote column on monday boards using the platform API

The [vote column](https://support.monday.com/hc/en-us/articles/360001012365-The-Vote-column) allows board subscribers and team members to vote on items. Votes are cast through the monday.com UI — the API provides read-only access to vote data and supports filtering.

Via the API, the vote column supports read and filter operations.

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
        `vote`
      </td>

      <td style={{ textAlign: "left" }}>
        `VoteValue`
      </td>

      <td style={{ textAlign: "left" }}>
        * Read: **Yes**
        * Filter: **Yes**
        * Create column: **Yes**
        * Update: **No**
        * Clear: **No**
      </td>
    </tr>
  </tbody>
</Table>

***

# Queries

Vote columns can be queried through the [`column_values`](https://developer.monday.com/api-reference/reference/column-values-v2#/) field on `items` queries using an inline [fragment](https://graphql.org/learn/queries/#fragments) on `VoteValue`.

```graphql GraphQL
query {
  items(ids: [1234567890, 9876543210]) {
    name
    column_values {
      ... on VoteValue {
        id
        vote_count
        voter_ids
        voters {
          id
          name
        }
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
  query ($itemIds: [ID!]) {
    items(ids: $itemIds) {
      name
      column_values {
        ... on VoteValue {
          id
          vote_count
          voter_ids
          voters {
            id
            name
          }
          text
          value
          updated_at
        }
      }
    }
  }
`;

const variables = { itemIds: [1234567890, 9876543210] };

const response = await mondayApiClient.request(query, variables);
```

## Fields

You can use the following [fields](https://graphql.org/learn/queries/#fields) to specify what information your `VoteValue` implementation will return.

| Field                                                                            | Description                                                                                              |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| column [`Column!`](https://developer.monday.com/api-reference/reference/columns) | The column the value belongs to.                                                                         |
| id `ID!`                                                                         | The column's unique identifier.                                                                          |
| text `String`                                                                    | The column's value as text. Returns the vote count as a string (e.g., `"3"`). Returns `"0"` if no votes. |
| type `ColumnType!`                                                               | The column's type (`vote`).                                                                              |
| updated\_at `Date`                                                               | The column's last updated date. Returns `null` if the column has no votes.                               |
| value `JSON`                                                                     | The column's JSON-formatted raw value. Returns `null` when there are no votes.                           |
| vote\_count `Int!`                                                               | The total number of votes on the item.                                                                   |
| voter\_ids `[ID!]!`                                                              | The unique identifiers of users who voted.                                                               |
| voters [`[User!]!`](https://developer.monday.com/api-reference/reference/users)  | The users who voted. Returns full user objects including `id`, `name`, `email`, etc.                     |

## Example response

```json
{
  "data": {
    "items": [
      {
        "name": "Feature request",
        "column_values": [
          {
            "id": "vote",
            "vote_count": 3,
            "voter_ids": ["12345", "67890", "11111"],
            "voters": [
              { "id": "12345", "name": "Alice" },
              { "id": "67890", "name": "Bob" },
              { "id": "11111", "name": "Charlie" }
            ],
            "text": "3",
            "value": "{\"voter_ids\":[12345,67890,11111],\"changed_at\":\"2026-03-21T10:00:00.000Z\"}",
            "updated_at": "2026-03-21T10:00:00Z"
          }
        ]
      }
    ]
  }
}
```

<Callout icon="📘" theme="info">
  When a vote column has no votes, `vote_count` returns `0`, `voter_ids` and `voters` return empty arrays, `text` returns `"0"`, and both `value` and `updated_at` return `null`.
</Callout>

***

# Filter

You can filter items by vote values using the [`items_page`](https://developer.monday.com/api-reference/docs/items_page) object. The vote column supports the following operators:

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
        An array of user IDs (e.g., `[12345]`) or `["No votes"]`
      </td>

      <td>
        Returns items where any of the specified users voted, or items with no votes when `"No votes"` is passed.
      </td>
    </tr>

    <tr>
      <td>
        `not_any_of`
      </td>

      <td>
        An array of user IDs (e.g., `[12345]`) or `["No votes"]`
      </td>

      <td>
        Excludes items where any of the specified users voted, or excludes items with no votes when `"No votes"` is passed.
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
        Returns items with no votes.
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
        Returns items that have at least one vote.
      </td>
    </tr>
  </tbody>
</Table>

## Examples

### Filter by voter

The following example returns all items that user `12345` voted for.

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "vote"
            compare_value: [12345]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
        column_values {
          ... on VoteValue {
            vote_count
            voter_ids
          }
        }
      }
    }
  }
}
```

### Filter for items with no votes

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "vote"
            compare_value: ["No votes"]
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

### Filter for items with any votes

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "vote"
            compare_value: []
            operator: is_not_empty
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

## Create column

**Required scope: `boards:write`**

You can create a vote column using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation. There is no typed `create_vote_column` mutation.

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: vote
    title: "Feature Votes"
    description: "Vote on features you want prioritized."
  ) {
    id
    title
    description
  }
}
```

You can optionally pass a custom display color in the `defaults` argument:

```graphql GraphQL
mutation {
  create_column(
    board_id: 1234567890
    column_type: vote
    title: "Feature Votes"
    defaults: "{\"settings\":{\"color\":\"#ff642e\"}}"
  ) {
    id
    title
    settings
  }
}
```

## Update value

<Callout icon="🚧" theme="warn">
  The vote column does not support updating values via the API. Votes can only be cast through the monday.com UI. Attempting to use `change_simple_column_value` will return an error: `"column type VotesColumn is not supporting changing the column value with simple column value"`. The `change_multiple_column_values` mutation accepts the request and modifies the raw `value` JSON, but does not affect the actual vote fields (`vote_count`, `voter_ids`, `voters`).
</Callout>

## Clear value

The vote column does not support clearing values via the API.

***

# Reading column configuration

To retrieve a vote column's display color setting, query the column's `settings` field.

<Callout icon="🚧" theme="warn">
  The `settings_str` field is deprecated as of API version **2025-10**. Use the typed `settings` object instead, which returns structured JSON rather than a JSON-encoded string.
</Callout>

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    columns(ids: ["vote"]) {
      id
      title
      settings
    }
  }
}
```

### `settings` response structure

The `settings` field returns a typed JSON object with these keys:

| Key     | Type     | Description                                                                                            |
| :------ | :------- | :----------------------------------------------------------------------------------------------------- |
| `color` | `string` | Hex color code for the vote column display (e.g., `"#ff642e"`). Only present if a custom color is set. |

### Example `settings` response

When no custom color is set:

```json
{}
```

When a custom color is configured:

```json
{
  "color": "#ff642e"
}
```

***

# Get column type schema

You can retrieve the JSON schema for the vote column's settings programmatically using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for the column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: vote
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
              "color": {
                "type": "string",
                "description": "Hex color code for the votes column display (e.g., #fdab3d)",
                "minLength": 7,
                "maxLength": 7
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
