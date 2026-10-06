---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

The monday.com [departments](https://developer.monday.com/api-reference/reference/departments) APIs enable you to create, read, update, and delete departments.

The types below are used by department mutations and are not independently queryable.

# Result types

## `AssignDepartmentMembersResult`

**Used by:** [`assign_department_members`](https://developer.monday.com/api-reference/reference/departments#assign-department-members)

The result returned after assigning members to a department.

| Field             | Type                                                                    | Description                                                                                  |
| :---------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| failed\_users     | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users who were not assigned to the department. Returns the full `users` object.          |
| successful\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users who were successfully assigned to the department. Returns the full `users` object. |

***

## `AssignDepartmentOwnerResult`

**Used by:** [`assign_department_owner`](https://developer.monday.com/api-reference/reference/departments#assign-department-owner)

The result returned after assigning an owner to a department.

| Field | Type                                                                 | Description                                                                           |
| :---- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| owner | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who was assigned as the department's owner. Returns the full `users` object. |

***

## `ClearUsersDepartmentResult`

**Used by:** [`clear_users_department`](https://developer.monday.com/api-reference/reference/departments#clear-users-department)

The result returned after clearing users from a department.

| Field          | Type                                                                    | Description                                                                      |
| :------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| cleared\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users who were cleared from the department. Returns the full `users` object. |

***

## `UnassignDepartmentOwnerResult`

**Used by:** [`unassign_department_owners`](https://developer.monday.com/api-reference/reference/departments#unassign-department-owners)

The result returned after unassigning owners from a department.

| Field             | Type                                                                    | Description                                                                         |
| :---------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| unassigned\_users | [`[User!]`](https://developer.monday.com/api-reference/reference/users) | The users who were unassigned from the department. Returns the full `users` object. |

***

# Input types

## `CreateDepartmentDataInput`

**Used by:** [`create_department`](https://developer.monday.com/api-reference/reference/departments#create-department)

Input fields for creating a department.

| Field           | Type      | Description                                      |
| :-------------- | :-------- | :----------------------------------------------- |
| name            | `String!` | The department's name.                           |
| reserved\_seats | `Int`     | The number of reserved seats for the department. |

***

## `UpdateDepartmentOptionsInput`

**Used by:** [`update_department`](https://developer.monday.com/api-reference/reference/departments#update-department)

Input fields for updating a department.

| Field           | Type     | Description                                        |
| :-------------- | :------- | :------------------------------------------------- |
| name            | `String` | The department's updated name.                     |
| reserved\_seats | `Int`    | The department's updated number of reserved seats. |
