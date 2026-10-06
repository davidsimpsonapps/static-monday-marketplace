---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Replies

Learn how to read replies to monday.com updates using the platform API

On the monday.com platform, users can reply directly to [updates](https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section) to collaborate within a thread.

# Queries

## Get replies

* Returns an array of metadata objects for replies to an update(s)
* Can be queried directly at the root or nested within an [`updates`](https://developer.monday.com/api-reference/reference/updates) query

```graphql GraphQL
query {
  replies(
    board_ids: [1234567890], 
    created_at_to: "2025-08-02", 
    created_at_from: "2025-01-01"
	) {
    body
    created_at
    edited_at
    creator {
      id
      name
    }
  }
}
```

### Arguments

| Argument          | Type     | Description                                                               |
| :---------------- | :------- | :------------------------------------------------------------------------ |
| board\_ids        | `[ID!]!` | The unique board identifier(s) to return replies from.                    |
| created\_at\_from | `String` | Filters replies created on or after this ISO 8601 timestamp (inclusive).  |
| created\_at\_to   | `String` | Filters replies created on or before this ISO 8601 timestamp (inclusive). |
| limit             | `Int`    | The number of replies returned. The default is 25, and the max is 100.    |
| page              | `Int`    | The page number to return. Starts at 1.                                   |

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
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        assets 
      </td>

      <td>
        [`[Asset]`](https://developer.monday.com/api-reference/reference/assets-1)
      </td>

      <td>
        The reply's assets.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        body
      </td>

      <td>
        `String!`
      </td>

      <td>
        The reply's HTML-formatted body.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The reply's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator
      </td>

      <td>
        [`User`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The reply's creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        creator_id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the reply's creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        edited_at
      </td>

      <td>
        `Date!`
      </td>

      <td>
        The date the reply was edited.
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
        The reply's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `String!`
      </td>

      <td>
        The reply's kind.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        likes
      </td>

      <td>
        `[Like!]!`
      </td>

      <td>
        The reply's likes.
      </td>

      <td>
        created_at `Date`  
        creator `User`  
        creator_id `String`  
        id `ID!`  
        reaction_type `String`  
        updated_at `Date`
      </td>
    </tr>

    <tr>
      <td>
        pinned_to_top
      </td>

      <td>
        `[UpdatePin!]!`
      </td>

      <td>
        The reply's pinned to the top data.
      </td>

      <td>
        item_id `ID!`
      </td>
    </tr>

    <tr>
      <td>
        text_body
      </td>

      <td>
        `String`
      </td>

      <td>
        The reply's text body.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The reply's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        viewers
      </td>

      <td>
        [`[Watcher!]!`](https://developer.monday.com/api-reference/reference/viewers)
      </td>

      <td>
        The reply's viewers.
      </td>

      <td>
        medium `String!`  
        user `User`  
        user_id `ID!`
      </td>
    </tr>
  </tbody>
</Table>
