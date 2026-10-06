---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Updates

Learn how to query monday.com board or item updates using the platform API

[Updates](https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section) are item or board-specific communication threads where teams can share notes, files, and key information. They help users collaborate across organizations, stay aligned, and communicate asynchronously, all within the context of their work.

Within an update, users can reply and react, attach files, pin important messages to the top, and see who has viewed the conversation. Many teams use updates as their main hub for ongoing communication in monday.com.

# Queries

## Get updates

* **Required scope:`updates:read`**
* Returns an array containing metadata about one or a collection of updates in reverse chronological order
* Can be queried directly at the root (returns all updates across an account) or can be nested inside a [`boards`](https://developer.monday.com/api-reference/reference/boards) or [`items`](https://developer.monday.com/api-reference/reference/items) query (returns updates from a specific board or item)

```graphql GraphQL
query {
  updates(
    limit: 50 
    to_date: "2025-06-04" 
    from_date: "2025-01-01"
	) {
    body
      id
      created_at
      creator {
        name
        id
    }
  }
}
```

### Arguments

| Argument             | Type      | Description                                                                                                                                                                                                                                                |
| :------------------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| board\_updates\_only | `Boolean` | Whether to only include board-level updates. Can only be used when nesting `updates` in a `boards` query.                                                                                                                                                  |
| from\_date           | `String`  | Filters updates created on or after this date. Accepts ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm`). Must be used together with the `to_date` argument, and only when querying `updates` directly at the root (not nested in a `boards` query).    |
| ids                  | `[ID!]`   | The specific ID(s) to return updates for.                                                                                                                                                                                                                  |
| limit                | `Int`     | The number of updates per page. The default is 25, and the maximum is 100.                                                                                                                                                                                 |
| page                 | `Int`     | The page number to get. Starts at 1.                                                                                                                                                                                                                       |
| to\_date             | `String`  | Filters updates created on or before this date. Accepts ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm`). Must be used together with the `from_date` argument, and only when querying `updates` directly at the root (not nested in a `boards` query). |

### Fields

| Field           | Type                                                                                | Description                                    |
| :-------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------- |
| assets          | [`[Asset]`](https://developer.monday.com/api-reference/docs/files)                  | The update's assets/files.                     |
| body            | `String!`                                                                           | The update's HTML-formatted body.              |
| created\_at     | `Date`                                                                              | The update's creation date.                    |
| creator         | [`User`](https://developer.monday.com/api-reference/reference/users)                | The update's creator.                          |
| creator\_id     | `String`                                                                            | The unique identifier of the update's creator. |
| edited\_at      | `Date!`                                                                             | The date the update's *body* was last edited.  |
| id              | `ID!`                                                                               | The update's unique identifier.                |
| item            | [`Item`](https://developer.monday.com/api-reference/reference/items)                | The update's item.                             |
| item\_id        | `String`                                                                            | The update's item ID.                          |
| likes           | [`[Like!]!`](https://developer.monday.com/api-reference/reference/other-types#like) | The update's likes.                            |
| pinned\_to\_top | `[UpdatePin!]!`                                                                     | The update's pinned to the top data.           |
| replies         | [`[Reply!]`](https://developer.monday.com/api-reference/reference/replies)          | The update's replies.                          |
| text\_body      | `String`                                                                            | The update's text body.                        |
| updated\_at     | `Date`                                                                              | The date the update was last edited.           |
| viewers         | [`[Watcher!]!`](https://developer.monday.com/api-reference/reference/watchers)      | The update's viewers.                          |

# Mutations

* **Required scope:`updates:write`**

## Create update

Creates and adds a new update to an item. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  create_update(
    item_id: 9876543210
    body: "This update will mention user 1234567890 on an item"
    mentions_list: [
      {
        id: 1234567890
        type: User
      }
    ]
  ) {
    id
  }
}
```

### Arguments

| Argument                 | Type                                                                                                 | Description                                                                                                       |
| :----------------------- | :--------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| body                     | `String!`                                                                                            | The update's text.                                                                                                |
| item\_id                 | `ID`                                                                                                 | The item's unique identifier. You don't need to use this argument if you're replying to a post using `parent_id`. |
| mentions\_list           | [`[UpdateMention]`](https://developer.monday.com/api-reference/reference/other-types#update-mention) | The user, team, or board to mention in an update.                                                                 |
| original\_creation\_date | `String`                                                                                             | The update's original creation date. Follows DD-MM-YYYY format.                                                   |
| parent\_id               | `ID`                                                                                                 | The parent updates's unique identifier. This can be used to create a reply to an update.                          |

## Like update

Likes an update. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  like_update(update_id: 1234567890) {
    id
  }
}
```

### Arguments

| Argument   | Type | Description                     |
| :--------- | :--- | :------------------------------ |
| update\_id | `ID` | The update's unique identifier. |

## Unlike update

Unlikes an update. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  unlike_update(update_id: 1234567890) {
    creator_id
    item_id
  }
}
```

### Arguments

| Argument   | Type  | Description                     |
| :--------- | :---- | :------------------------------ |
| update\_id | `ID!` | The update's unique identifier. |

## Edit update

Edits an update. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  edit_update(
    id: 1234567890
    body: "The updated text!"
	) {
    creator_id
    item_id
  }
}
```

### Arguments

| Argument | Type      | Description                     |
| :------- | :-------- | :------------------------------ |
| body     | `String!` | The update's new text.          |
| id       | `ID!`     | The update's unique identifier. |

## Pin to top

Pins an update to the top of an item. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  pin_to_top(
    id: 1234567890
    item_id: 9876543210
	) {
    creator_id
    body
  }
}
```

### Arguments

| Argument | Type  | Description                     |
| :------- | :---- | :------------------------------ |
| id       | `ID!` | The update's unique identifier. |
| item\_id | `ID`  | The item's unique identifier.   |

## Unpin from top

Unpins an update from the top of an item. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  unpin_from_top(
    id: 1234567890
    item_id: 9876543210
  ) {
    creator_id
    body
  }
}
```

### Arguments

| Argument | Type  | Description                     |
| :------- | :---- | :------------------------------ |
| id       | `ID!` | The update's unique identifier. |
| item\_id | `ID`  | The item's unique identifier.   |

## Clear item updates

Clears all updates on a specific item, including replies and likes. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  clear_item_updates(item_id: 1234567890) {
    id
  }
}
```

### Arguments

| Arguments | Type  | Description                   |
| :-------- | :---- | :---------------------------- |
| item\_id  | `ID!` | The item's unique identifier. |

## Delete update

Deletes an item's updates. Returns [`Update`](https://developer.monday.com/api-reference/docs/updates#fields).

```graphql GraphQL
mutation {
  delete_update(id: 1234567890) {
    id
  }
}
```

### Arguments

| Argument | Type  | Description                     |
| :------- | :---- | :------------------------------ |
| id       | `ID!` | The update's unique identifier. |
