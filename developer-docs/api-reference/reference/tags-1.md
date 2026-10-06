---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Tags

Learn how to query monday account tags using the platform API

[Tags](https://support.monday.com/hc/en-us/articles/115005905685-The-Tags-Column) are objects that help you group items from different groups or different boards throughout your account by a consistent keyword. Public tags appear on main boards and are accessible to all member and viewer-level users by default, while private tags only appear on private or shareable boards. They are created and displayed in the [tags](https://developer.monday.com/api-reference/reference/tags-1) column.

# Queries

## Get tags

* **Required scope:`tags:read`**
* Returns an array containing metadata about one or a collection of the account's **public tags**
* Can be queried directly at the root or nested within a `boards` (only returns tags stored on private or shareable boards)

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    tags {
      id
    }	
  }
}
```

### Arguments

| Argument | Type    | Description                                                                                     |
| :------- | :------ | :---------------------------------------------------------------------------------------------- |
| ids      | `[ID!]` | The unique identifiers of specific tags to return. Returns an empty result for private tag IDs. |

### Fields

| Field | Type      | Description                  |
| :---- | :-------- | :--------------------------- |
| color | `String!` | The tag's color.             |
| id    | `Int!`    | The tag's unique identifier. |
| name  | `String!` | The tag's name.              |

# Mutations

**Required scope:`boards:write`**

## Create or get tag

Creates new tags or retrieves their data if they already exist. Returns [`Tag`](https://developer.monday.com/api-reference/docs/tags-queries#fields).

After creating a tag, it only appears in the UI after being used at least once.

```graphql GraphQL
mutation {
  create_or_get_tag(
    tag_name: "My tag"
  ) {
    id
  }
}
```

### Arguments

| Argument  | Type     | Description                                                                                                                                                |
| :-------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| board\_id | `ID`     | The unique identifier of the shareable or private board where the tag should be created. If you want to create a public tag, **do not use** this argument. |
| tag\_name | `String` | The new tag's name.                                                                                                                                        |

## Update tags column

The [`change_column_value`](https://developer.monday.com/api-reference/docs/columns#change-a-column-value) mutation allows you to change a column value via the API. Check out the tags [column type reference](https://developer.monday.com/api-reference/docs/tags#updating-the-tags-column) for the correct formatting!

<br />
