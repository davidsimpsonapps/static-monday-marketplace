---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Viewers

Learn how to query an update's viewers using the platform API

Within an [update](https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section), users can reply and react, attach files, pin important messages to the top, and see who has viewed the conversation.

# Queries

## Get viewers

* **Required scope:`updates:read`**
* Returns an array containing metadata about one or a collection of an update's viewers
* Must be nested within an [`updates`](https://developer.monday.com/api-reference/reference/updates) query; can't be queried directly at the root

```graphql GraphQL
query {
  updates {
    viewers {
      user_id
      medium
      user {
        name
      }
    }
  }
}
```

### Arguments

| Argument | Type  | Description                                          |
| :------- | :---- | :--------------------------------------------------- |
| limit    | `Int` | The number of updates to return. The default is 100. |
| page     | `Int` | The page number to get. Starts at 1.                 |

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
        Possible Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        medium
      </td>

      <td>
        `String!`
      </td>

      <td>
        The channel that the viewers saw the update from.
      </td>

      <td>
        `"email"`  
        `"mobile"`  
        `"web"`
      </td>
    </tr>

    <tr>
      <td>
        user
      </td>

      <td>
        [`User`](https://developer.monday.com/api-reference/reference/users)
      </td>

      <td>
        The user who viewed the update.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        user_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The unique identifier of the user who viewed the update.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>
