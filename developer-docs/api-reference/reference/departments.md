---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Departments

Learn how to read, create, update, and delete departments using the platform API

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

[Departments](https://support.monday.com/hc/en-us/articles/115005321509-The-Administration-section-on-monday-com) allow Enterprise accounts to group users by location, cost center, or organizational department for seat management and administrative purposes.

Each department has its own members and owners. It can have more than one owner, but each user can belong to **at most one** department (or none).

# Queries

## Get departments

* 🚧 Only available for **Enterprise plans**
* **Required scope:** `departments:read`
* Returns an array containing metadata about an account's departments
* Can be queried directly at the root or nested within a [`users`](https://developer.monday.com/api-reference/reference/users) query

```graphql
query {
  departments(ids: [12345, 54321]) {
    id
    name
    assigned_seats
    reserved_seats
    members {
      id
      name
    }
    owners {
      id
      name
    }
  }
}
```

### Arguments

| Argument | Type    | Description                      |
| :------- | :------ | :------------------------------- |
| ids      | `[ID!]` | The department IDs to filter by. |

### Fields

| Field           | Type                                                                    | Description                                                |
| :-------------- | :---------------------------------------------------------------------- | :--------------------------------------------------------- |
| assigned\_seats | `Int!`                                                                  | The number of seats assigned to the department.            |
| id              | `ID!`                                                                   | The department's unique identifier.                        |
| members         | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The department's members. Returns the full `users` object. |
| name            | `String!`                                                               | The department's name.                                     |
| owners          | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The department's owners.                                   |
| reserved\_seats | `Int!`                                                                  | The number of seats reserved for the department.           |

# Mutations

* 🚧 Only available for **Enterprise plans**
* **Required scope:** `departments:write`
* **Account-level permission:** `manage_account_users_permission`

## Create department

Creates a department. Returns [`Department`](https://developer.monday.com/api-reference/reference/department#fields).

```graphql
mutation {
  create_department(data: {
    name: "New Department",
    reserved_seats: 3
  }) {
    id
    name
    reserved_seats
  }
}
```

### Arguments

| Argument | Type                                                                                                                                  | Description                             |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- |
| data     | [`CreateDepartmentDataInput!`](https://developer.monday.com/api-reference/reference/department-other-types#createdepartmentdatainput) | Input fields for creating a department. |

## Assign department members

Assigns members to a department. Returns [`AssignDepartmentMembersResult`](https://developer.monday.com/api-reference/reference/department-other-types#assigndepartmentmembersresult).

```graphql
mutation {
  assign_department_members(
    department_id: 45678,
    user_ids: [54321, 12345]
  ) {
    successful_users {
      id
      name
    }
    failed_users {
      id
      name
    }
  }
}
```

### Arguments

| Argument       | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| department\_id | `ID!`    | The department's unique identifier. |
| user\_ids      | `[ID!]!` | The users' unique identifiers.      |

## Assign department owner

Assigns an owner to a department. Returns [`AssignDepartmentOwnerResult`](https://developer.monday.com/api-reference/reference/department-other-types#assigndepartmentownerresult).

```graphql
mutation {
  assign_department_owner(
    department_id: 45678,
    user_id: 12345
  ) {
    owner {
      id
      name
    }
  }
}
```

### Arguments

| Argument       | Type  | Description                         |
| :------------- | :---- | :---------------------------------- |
| department\_id | `ID!` | The department's unique identifier. |
| user\_id       | `ID!` | The user's unique identifier.       |

## Update department

Updates a department. Returns [`Department`](https://developer.monday.com/api-reference/reference/department#fields).

```graphql
mutation {
  update_department(
    department_id: 12345,
    data: {
      name: "Engineering",
      reserved_seats: 4
    }
  ) {
    id
    name
    reserved_seats
    assigned_seats
  }
}
```

### Arguments

| Argument       | Type                                                                                                                                       | Description                             |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| data           | [`UpdateDepartmentOptionsInput`](https://developer.monday.com/api-reference/reference/department-other-types#updatedepartmentoptionsinput) | Input fields for updating a department. |
| department\_id | `ID!`                                                                                                                                      | The department's unique identifier.     |

## Clear users department

Clears users' departments. Returns [`ClearUsersDepartmentResult`](https://developer.monday.com/api-reference/reference/department-other-types#clearusersdepartmentresult).

```graphql
mutation {
  clear_users_department(user_ids: [12345, 54321]) {
    cleared_users {
      id
      name
    }
  }
}
```

### Arguments

| Argument  | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| user\_ids | `[ID!]!` | The users' unique identifiers. |

## Unassign department owners

Unassigns owners from a department. Returns [`UnassignDepartmentOwnerResult`](https://developer.monday.com/api-reference/reference/department-other-types#unassigndepartmentownerresult).

```graphql
mutation {
  unassign_department_owners(
    department_id: 45678,
    user_ids: [12345, 54321]
  ) {
    unassigned_users {
      id
      name
    }
  }
}
```

### Arguments

| Argument       | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| department\_id | `ID!`    | The department's unique identifier. |
| user\_ids      | `[ID!]!` | The users' unique identifiers.      |

## Delete department

Deletes a department from the account. Returns [`Department`](https://developer.monday.com/api-reference/reference/department#fields).

```graphql
mutation {
  delete_department(department_id: 12345) {
    id
    name
    members {
      id
      name
    }
  }
}
```

### Arguments

| Argument       | Type  | Description                         |
| :------------- | :---- | :---------------------------------- |
| department\_id | `ID!` | The department's unique identifier. |

<br />
