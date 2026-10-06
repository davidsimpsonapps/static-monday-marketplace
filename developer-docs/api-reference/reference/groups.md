---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Groups

Learn how to read, create, update, and delete groups from monday boards using the platform API

<Glossary>Items</Glossary> are organized in different sections on a board called [groups](https://support.monday.com/hc/en-us/articles/360011472320-The-Basics-of-Groups). Each board contains at least one group that houses one or more items.

# Queries

## Get groups

* **Required scope:`boards:read`**
* Returns an array containing metadata about one or a collection of groups on a specific board
* Can only be nested within another query (e.g., `boards`)

```graphql GraphQL
query {
  boards(ids: 1234567890) {
    groups {
      title
      id
    }
  }
}
```

### Arguments

| Argument | Type       | Description                    |
| :------- | :--------- | :----------------------------- |
| ids      | `[String]` | The specific groups to return. |

### Fields

| Field       | Type                                                                           | Description                              |
| :---------- | :----------------------------------------------------------------------------- | :--------------------------------------- |
| archived    | `Boolean`                                                                      | Returns `true` if the group is archived. |
| color       | `String!`                                                                      | The group's color.                       |
| deleted     | `Boolean`                                                                      | Returns `true` if the group is deleted.  |
| id          | `ID!`                                                                          | The group's unique identifier.           |
| items\_page | [`ItemsResponse!`](https://developer.monday.com/api-reference/docs/items_page) | The group's items.                       |
| position    | `String!`                                                                      | The group's position on the board.       |
| title       | `String!`                                                                      | The group's title.                       |

# Mutations

**Required scope:`boards:write`**

## Create group

Creates a new empty group. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

```graphql GraphQL
mutation {
  create_group(
    board_id: 1234567890, 
    group_name: "new group", 
    relative_to: "test_group", 
    group_color: "#ff642e", 
    position_relative_method: before_at
	) {
    id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        group_color
      </td>

      <td>
        `String`
      </td>

      <td>
        The group's HEX code color.
      </td>

      <td>
        See a full list of accepted HEX code values and their corresponding colors [here](https://asset.cloudinary.com/monday-platform-dev/729947c8c3429c9126c4afa91db06c3a) (don't forget to include # in your string!)
      </td>
    </tr>

    <tr>
      <td>
        group_name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new group's name. Maximum of 255 characters.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position (DEPRECATED)
      </td>

      <td>
        `String`
      </td>

      <td>
        The group's position on the board.
      </td>

      <td>
        The group's position is determined using a string containing only a number value (no letters or special characters). The higher the value, the lower the group sits on the board; the lower the value, the higher the group sits on the board. If you provide an invalid input using letters or special characters, the group will go to the top of the board. You will get an error if you provide a `number` rather than a `string`.

        * _For example:_* Assume _Group 1_ has a position of 10000 and _Group 3_ has a position of 30000. If you want to create a new group between the other two called _Group 2_, it needs a position greater than 10000 and less than 30000.
      </td>
    </tr>

    <tr>
      <td>
        relative_to
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the group you want to create the new one in relation to. The default creates the new group below the specified `group_id`.

        You can also use this argument in conjunction with `position_relative_method` to specify if you want to create the new group above or below the group in question.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        position_relative_method
      </td>

      <td>
        [`PositionRelative`](https://developer.monday.com/api-reference/reference/other-types#position-relative)
      </td>

      <td>
        The desired position of the new group.
      </td>

      <td>
        You can use this argument in conjunction with `relative_to` to specify which group you want to create the new group above or below.

        * `before_at`:  This enum value creates the new group above the `relative_to` value. If you don't use the `relative_to` argument, the new group will be created at the bottom of the board.
        * `after_at`: This enum value creates the new group below the `relative_to` value. If you don't use the `relative_to` argument, the new group will be created at the top of the board.
      </td>
    </tr>
  </tbody>
</Table>

## Update group

Updates a group. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

```graphql GraphQL
mutation {
  update_group(
    board_id: 1234567890, 
    group_id: "test group id", 
    group_attribute: relative_position_before, 
    new_value: "test_group"
	) { 
    id
  } 
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The board's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        group_attribute
      </td>

      <td>
        `GroupAttributes!`
      </td>

      <td>
        The group attribute to update.
      </td>

      <td>
        `color`  
        `position`  
        `relative_position_after`  
        `relative_position_before`  
        `title`
      </td>
    </tr>

    <tr>
      <td>
        group_id
      </td>

      <td>
        `String!`
      </td>

      <td>
        The group's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        new_value
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new attribute value.
      </td>

      <td>
        See a full list of accepted color values [here](https://dapulse-res.cloudinary.com/image/upload/v1669754611/remote_mondaycom_static/developers/screenshots/status-labels-2.png).

        When updating a group's position using the `relative_position_after` or `relative_position_before` attributes, the new attribute value should be the unique identifier of the group you intend to place the updated group above or below.
      </td>
    </tr>
  </tbody>
</Table>

## Duplicate group

Duplicates a group and all of its items. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

<Callout icon="🚧" theme="warn">
  This mutation has an additional rate limit of **40** mutations per minute.
</Callout>

```graphql GraphQL
mutation {
  duplicate_group(
    board_id: 1234567890, 
    group_id: "test group id", 
    add_to_top: true
	) {
    id
  }
}
```

### Arguments

| Argument     | Type      | Description                                           |
| :----------- | :-------- | :---------------------------------------------------- |
| add\_to\_top | `Boolean` | Boolean to add the new group to the top of the board. |
| board\_id    | `ID!`     | The board's unique identifier.                        |
| group\_id    | `String!` | The group's unique identifier.                        |
| group\_title | `String`  | The group's title.                                    |

## Move item to group

Moves an item between groups on the same board. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

```graphql GraphQL
mutation {
  move_item_to_group(
    item_id: 1234567890, 
    group_id: "test group id"
	) {
    id
  }
}
```

### Arguments

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| group\_id | `String!` | The group's unique identifier. |
| item\_id  | `ID`      | The item's unique identifier.  |

## Archive group

Archives a group and all of its items. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

```graphql GraphQL
mutation {
  archive_group(
    board_id: 1234567890, 
    group_id: "test group id"
	) {
    id
    archived
  }
}
```

### Arguments

You can use the following arguments to specify which group to archive.

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| board\_id | `ID!`     | The board's unique identifier. |
| group\_id | `String!` | The group's unique identifier. |

## Delete group

Deletes a group and all of its items. Returns [`Group`](https://developer.monday.com/api-reference/docs/groups#fields).

```graphql GraphQL
mutation {
  delete_group(
    board_id: 1234567890
    group_id: "Test Group ID"
  ) {
    id
    deleted
  }
}

```

### Arguments

| Argument  | Type      | Description                    |
| :-------- | :-------- | :----------------------------- |
| board\_id | `ID!`     | The board's unique identifier. |
| group\_id | `String!` | The group's unique identifier. |
