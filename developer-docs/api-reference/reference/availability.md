---
updatedAt: 2026-09-14T07:25:29.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Availability

Learn how to read, create, update, and assign work schedules, company time off, and personal time off using the platform API

[Resource availability](https://support.monday.com/hc/en-us/articles/36305176145682-Managing-resource-schedules-and-time-off) is made up of three independent layers: a **work schedule** (which days and hours a resource works), a **company time off** schedule (holidays and company days off), and **personal time off (PTO)**. Users and teams with no explicit assignment fall back to the account-level default work schedule and company time off schedule.

You manage these layers from **Administration → General → Schedules**. Assigning a schedule to a <Glossary>team</Glossary> does **not** change individual members' assignments — team schedules apply when a team is the assigned resource in the Workload widget.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

* 🚧 Only available on **Pro and Enterprise** plans
* This feature is in early release and is rolled out gradually. Accounts that do not have it enabled receive `FEATURE_NOT_ENABLED`.

Input types, result types, and enums used below are documented in [Availability other types](https://developer.monday.com/api-reference/reference/availability-other-types).

# Permissions

These are account-level permissions (not OAuth scopes). Personal API tokens follow the caller's monday.com permissions. App tokens also require the matching account permission on the acting user.

| Permission                     | Required for                                                                                                                                 |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `view_schedules`               | All queries                                                                                                                                  |
| `edit_schedules`               | Create, update, and delete work schedules, company time off schedules, and time off entries. Create, update, and delete PTO for other users. |
| `assign_users_to_schedules`    | Assign and unassign work schedules and company time off schedules                                                                            |
| `update_own_personal_time_off` | Create, update, and delete your own PTO entries when you do not have `edit_schedules`                                                        |

Without `edit_schedules`, `user_pto` returns only the caller's own entries regardless of which `user_ids` you pass.

# Queries

* 🚧 Only available for **Pro and Enterprise** plans
* **Required scope:** none — this API uses [account-level permissions](#permissions), not OAuth scopes
* **Account-level permission:** `view_schedules`

## Get work schedules

* **Required scope:** none
* **Account-level permission:** `view_schedules`
* Returns [`WorkSchedulePage`](https://developer.monday.com/api-reference/reference/availability-other-types#workschedulepage)
* Can be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  work_schedules(limit: 25) {
    work_schedules {
      id
      name
      is_default
      days {
        week_day
        is_active
        start_time
        end_time
      }
    }
    cursor
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2026-10" });

const query = `query { work_schedules(limit: 25) { work_schedules { id name is_default } cursor } }`;
const response = await mondayApiClient.request(query);
```

### Arguments

| Argument | Type     | Description                                                                                                                 |
| :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| ids      | `[ID!]`  | Fetch specific schedules by ID. Maximum 100. Cannot be combined with `limit`, `name`, or `cursor`. Unknown IDs are omitted. |
| limit    | `Int`    | The maximum number of schedules to return. Default: `20`. Maximum: `500`. Cannot be combined with `ids`.                    |
| name     | `String` | Filter by schedule name (case-insensitive substring). Maximum 255 characters. Cannot be combined with `ids` or `cursor`.    |
| cursor   | `String` | A cursor from a previous response to fetch the next page. Cannot be combined with `ids` or `name`.                          |

### Fields

| Field           | Type                                                                                                             | Description                                                                |
| :-------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| work\_schedules | [`[WorkSchedule!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#workschedule) | The work schedules in this page.                                           |
| cursor          | `String`                                                                                                         | A cursor for the next page. Returns `null` when there are no more results. |

***

## Get time off schedules

* **Required scope:** none
* **Account-level permission:** `view_schedules`
* Returns [`TimesOffPage`](https://developer.monday.com/api-reference/reference/availability-other-types#timesoffpage)
* Can be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  time_offs(limit: 25) {
    time_offs {
      id
      name
      is_default
      entries {
        id
        name
        start
        end
      }
    }
    cursor
  }
}
```

All entries for a schedule are returned inline. There is no separate pagination for entries.

### Arguments

| Argument | Type     | Description                                                                                                              |
| :------- | :------- | :----------------------------------------------------------------------------------------------------------------------- |
| ids      | `[ID!]`  | Fetch specific time off schedules by ID. Maximum 100. Cannot be combined with `limit`, `name`, or `cursor`.              |
| limit    | `Int`    | The maximum number of schedules to return. Default: `20`. Maximum: `500`. Cannot be combined with `ids`.                 |
| name     | `String` | Filter by schedule name (case-insensitive substring). Maximum 255 characters. Cannot be combined with `ids` or `cursor`. |
| cursor   | `String` | A cursor from a previous response to fetch the next page. Cannot be combined with `ids` or `name`.                       |

### Fields

| Field      | Type                                                                                                   | Description                                                                |
| :--------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| time\_offs | [`[TimeOff!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoff) | The time off schedules in this page.                                       |
| cursor     | `String`                                                                                               | A cursor for the next page. Returns `null` when there are no more results. |

***

## Get resource availability

* **Required scope:** none
* **Account-level permission:** `view_schedules`
* Returns [`ResourcesAvailability`](https://developer.monday.com/api-reference/reference/availability-other-types#resourcesavailability)
* Can be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  resources_availability(user_ids: ["1234567890"], team_ids: ["9876543210"]) {
    users_assigned_schedules {
      user_id
      work_schedule_id
      company_time_off_id
      personal_time_offs {
        id
        start
        end
      }
    }
    teams_assigned_schedules {
      team_id
      work_schedule_id
      company_time_off_id
    }
    work_schedules {
      id
      name
    }
    company_time_offs {
      id
      name
    }
    default_work_schedule_id
    default_company_time_off_id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2026-10" });

const query = `query ($userIds: [ID!], $teamIds: [ID!]) { resources_availability(user_ids: $userIds, team_ids: $teamIds) { users_assigned_schedules { user_id work_schedule_id company_time_off_id } teams_assigned_schedules { team_id work_schedule_id company_time_off_id } default_work_schedule_id default_company_time_off_id } }`;
const variables = {
  userIds: ["1234567890"],
  teamIds: ["9876543210"]
};

const response = await mondayApiClient.request(query, variables);
```

This query is not paginated. At least one of `user_ids` or `team_ids` is required. Compare `work_schedule_id` with `default_work_schedule_id` to see whether a resource is on the account default. Use the [`users`](https://developer.monday.com/api-reference/reference/users) and [`teams`](https://developer.monday.com/api-reference/reference/teams) APIs to find IDs.

### Arguments

| Argument  | Type    | Description                                                                                           |
| :-------- | :------ | :---------------------------------------------------------------------------------------------------- |
| user\_ids | `[ID!]` | User IDs to fetch assignments for. Maximum 100. At least one of `user_ids` or `team_ids` is required. |
| team\_ids | `[ID!]` | Team IDs to fetch assignments for. Maximum 100. At least one of `user_ids` or `team_ids` is required. |

### Fields

| Field                           | Type                                                                                                                 | Description                                                                                                      |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| users\_assigned\_schedules      | [`[UserAssignment!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#userassignment) | Schedule assignments for each requested user.                                                                    |
| teams\_assigned\_schedules      | [`[TeamAssignment!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#teamassignment) | Schedule assignments for each requested team.                                                                    |
| work\_schedules                 | [`[WorkSchedule!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#workschedule)     | Deduplicated work schedules referenced by any assignment in this response, plus the account default.             |
| company\_time\_offs             | [`[TimeOff!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoff)               | Deduplicated company time off schedules referenced by any assignment in this response, plus the account default. |
| default\_work\_schedule\_id     | `ID!`                                                                                                                | The account-level default work schedule ID.                                                                      |
| default\_company\_time\_off\_id | `ID!`                                                                                                                | The account-level default company time off schedule ID.                                                          |

***

## Get account availability defaults

* **Required scope:** none
* **Account-level permission:** `view_schedules`
* Returns [`AccountAvailabilityDefaults`](https://developer.monday.com/api-reference/reference/availability-other-types#accountavailabilitydefaults)
* Can be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  account_availability_defaults {
    work_schedule {
      id
      name
      days {
        week_day
        is_active
        start_time
        end_time
      }
    }
    time_off {
      id
      name
      entries {
        id
        name
        start
        end
      }
    }
  }
}
```

This query always returns a result. Default schedules are created automatically the first time they are needed.

### Fields

| Field          | Type                                                                                                          | Description                                      |
| :------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------- |
| work\_schedule | [`WorkSchedule!`](https://developer.monday.com/api-reference/reference/availability-other-types#workschedule) | The account's default work schedule.             |
| time\_off      | [`TimeOff!`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoff)           | The account's default company time off schedule. |

***

## Get user PTO

* **Required scope:** none
* **Account-level permission:** `view_schedules`
* Returns [`[UserPto!]`](https://developer.monday.com/api-reference/reference/availability-other-types#userpto)
* Can be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  user_pto(user_ids: ["1234567890", "9876543210"]) {
    user_id
    time_off_id
    entries {
      id
      start
      end
    }
  }
}
```

A user with no PTO entries still appears in the response with an empty `entries` array. `time_off_id` is `null` until the user has a PTO collection.

### Arguments

| Argument  | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| user\_ids | `[ID!]!` | The user IDs to fetch PTO for. Maximum 100. |

### Fields

| Field         | Type                                                                                                     | Description                                                                                   |
| :------------ | :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| user\_id      | `ID!`                                                                                                    | The user's unique identifier.                                                                 |
| time\_off\_id | `ID`                                                                                                     | The user's personal time off record ID. Returns `null` if the user has no PTO collection yet. |
| entries       | [`[PtoEntry!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#ptoentry) | The user's personal time off entries.                                                         |

# Mutations

* 🚧 Only available for **Pro and Enterprise** plans
* **Required scope:** none — this API uses [account-level permissions](#permissions), not OAuth scopes
* Failed items in a batch do not abort the rest of the batch. Check `success` on each result.

Date arguments use `YYYY-MM-DD`. Time arguments use `HH:MM` (24-hour). Time off and PTO dates must fall within **1 year in the past** and **20 years in the future**. Names are 1–255 characters.

***

## Create work schedule

Creates one or more work schedules. Returns [`[WorkScheduleResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#workscheduleresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  create_work_schedule(inputs: [{
    name: "Standard Work Week",
    days: [
      { week_day: MONDAY, is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: TUESDAY, is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: WEDNESDAY, is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: THURSDAY, is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: FRIDAY, is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: SATURDAY, is_active: false },
      { week_day: SUNDAY, is_active: false }
    ]
  }]) {
    work_schedule {
      id
      name
    }
    success
    error {
      code
      message
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2026-10" });

const query = `mutation ($inputs: [CreateWorkScheduleInput!]!) { create_work_schedule(inputs: $inputs) { work_schedule { id name } success error { code message } } }`;
const variables = {
  inputs: [{
    name: "Standard Work Week",
    days: [
      { week_day: "MONDAY", is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: "TUESDAY", is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: "WEDNESDAY", is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: "THURSDAY", is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: "FRIDAY", is_active: true, start_time: "09:00", end_time: "17:00" },
      { week_day: "SATURDAY", is_active: false },
      { week_day: "SUNDAY", is_active: false }
    ]
  }]
};

const response = await mondayApiClient.request(query, variables);
```

Omit `days` to create a schedule with all seven days inactive. Each `week_day` may appear at most once per input. When `is_active` is `true`, `start_time` and `end_time` are required and `start_time` must be before `end_time`.

### Arguments

| Argument | Type                                                                                                                                   | Description                                         |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| inputs   | [`[CreateWorkScheduleInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#createworkscheduleinput) | The work schedules to create. Maximum 100 per call. |

***

## Update work schedule

Updates the name and/or working hours of an existing work schedule. Returns [`WorkScheduleResult!`](https://developer.monday.com/api-reference/reference/availability-other-types#workscheduleresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  update_work_schedule(
    id: "1234567890",
    input: {
      days: [{ week_day: SATURDAY, is_active: true, start_time: "10:00", end_time: "14:00" }]
    }
  ) {
    work_schedule {
      id
      name
      days {
        week_day
        is_active
        start_time
        end_time
      }
    }
    success
    error {
      code
      message
    }
  }
}
```

Only the days you list in `input.days` are updated. Unlisted days are unchanged.

### Arguments

| Argument | Type                                                                                                                                | Description                            |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| id       | `ID!`                                                                                                                               | The work schedule's unique identifier. |
| input    | [`UpdateWorkScheduleInput!`](https://developer.monday.com/api-reference/reference/availability-other-types#updateworkscheduleinput) | Fields to update.                      |

***

## Delete work schedule

Deletes one or more work schedules. Returns [`[WorkScheduleDeleteResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#workscheduledeleteresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  delete_work_schedule(ids: ["1234567890"]) {
    id
    success
    error {
      code
      message
    }
  }
}
```

You cannot delete a schedule that still has users or teams assigned to it. Unassign those resources first. The account default schedule cannot be deleted.

### Arguments

| Argument | Type     | Description                                            |
| :------- | :------- | :----------------------------------------------------- |
| ids      | `[ID!]!` | The work schedule IDs to delete. Maximum 100 per call. |

***

## Assign work schedule

Assigns a work schedule to users and/or teams. Returns [`AssignWorkScheduleResult`](https://developer.monday.com/api-reference/reference/availability-other-types#assignworkscheduleresult).

**Account-level permission:** `assign_users_to_schedules`

```graphql GraphQL
mutation {
  assign_work_schedule(input: {
    user_ids: ["1234567890"],
    team_ids: ["9876543210"],
    work_schedule_id: "1122334455"
  }) {
    users {
      user_id
      success
      error {
        code
        message
      }
    }
    teams {
      team_id
      success
      error {
        code
        message
      }
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2026-10" });

const query = `mutation ($input: AssignWorkScheduleInput!) { assign_work_schedule(input: $input) { users { user_id success error { code message } } teams { team_id success error { code message } } } }`;
const variables = {
  input: {
    user_ids: ["1234567890"],
    team_ids: ["9876543210"],
    work_schedule_id: "1122334455"
  }
};

const response = await mondayApiClient.request(query, variables);
```

To revert a resource to the account default, pass the default schedule's ID as `work_schedule_id`.

### Arguments

| Argument | Type                                                                                                                                | Description                                |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| input    | [`AssignWorkScheduleInput!`](https://developer.monday.com/api-reference/reference/availability-other-types#assignworkscheduleinput) | The resources and work schedule to assign. |

***

## Unassign work schedule

Removes explicit work schedule assignments. Affected resources fall back to the account default. Returns [`AssignWorkScheduleResult`](https://developer.monday.com/api-reference/reference/availability-other-types#assignworkscheduleresult).

**Account-level permission:** `assign_users_to_schedules`

```graphql GraphQL
mutation {
  unassign_work_schedule(
    user_ids: ["1234567890"],
    team_ids: ["9876543210"]
  ) {
    users {
      user_id
      success
      error {
        code
        message
      }
    }
    teams {
      team_id
      success
      error {
        code
        message
      }
    }
  }
}
```

### Arguments

| Argument  | Type    | Description                                                                              |
| :-------- | :------ | :--------------------------------------------------------------------------------------- |
| user\_ids | `[ID!]` | User IDs to unassign. Maximum 100. At least one of `user_ids` or `team_ids` is required. |
| team\_ids | `[ID!]` | Team IDs to unassign. Maximum 100. At least one of `user_ids` or `team_ids` is required. |

***

## Create time off schedule

Creates one or more company time off schedules, optionally with initial entries. Returns [`[TimeOffResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  create_time_off(inputs: [{
    name: "Public Holidays 2026",
    entries: [
      { name: "New Year's Day", start: "2026-01-01", end: "2026-01-01" },
      { name: "Christmas Day", start: "2026-12-25", end: "2026-12-25" }
    ]
  }]) {
    time_off {
      id
      name
      entries {
        id
        name
        start
        end
      }
    }
    success
    error {
      code
      message
    }
  }
}
```

To add entries after creation, use [create time off entry](#create-time-off-entry).

### Arguments

| Argument | Type                                                                                                                         | Description                                             |
| :------- | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| inputs   | [`[CreateTimeOffInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#createtimeoffinput) | The time off schedules to create. Maximum 100 per call. |

***

## Update time off schedule

Updates the name of an existing company time off schedule. Returns [`TimeOffResult`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  update_time_off(
    id: "1234567890",
    input: { name: "Global Holidays 2026" }
  ) {
    time_off {
      id
      name
    }
    success
    error {
      code
      message
    }
  }
}
```

To add, update, or remove entries, use the [time off entry mutations](#create-time-off-entry).

### Arguments

| Argument | Type                                                                                                                      | Description                                |
| :------- | :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
| id       | `ID!`                                                                                                                     | The time off schedule's unique identifier. |
| input    | [`UpdateTimeOffInput!`](https://developer.monday.com/api-reference/reference/availability-other-types#updatetimeoffinput) | Fields to update.                          |

***

## Delete time off schedule

Deletes one or more company time off schedules. Returns [`[TimeOffDeleteResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffdeleteresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  delete_time_off(ids: ["1234567890"]) {
    id
    success
    error {
      code
      message
    }
  }
}
```

You cannot delete a schedule that still has users or teams assigned to it. The account default schedule cannot be deleted.

### Arguments

| Argument | Type     | Description                                                |
| :------- | :------- | :--------------------------------------------------------- |
| ids      | `[ID!]!` | The time off schedule IDs to delete. Maximum 100 per call. |

***

## Assign time off schedule

Assigns a company time off schedule to users and/or teams. Returns [`AssignTimeOffResult`](https://developer.monday.com/api-reference/reference/availability-other-types#assigntimeoffresult).

**Account-level permission:** `assign_users_to_schedules`

```graphql GraphQL
mutation {
  assign_time_off(input: {
    user_ids: ["1234567890"],
    time_off_id: "1122334455"
  }) {
    users {
      user_id
      success
      error {
        code
        message
      }
    }
    teams {
      team_id
      success
      error {
        code
        message
      }
    }
  }
}
```

To revert a resource to the account default, pass the default time off schedule's ID.

### Arguments

| Argument | Type                                                                                                                      | Description                                    |
| :------- | :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------- |
| input    | [`AssignTimeOffInput!`](https://developer.monday.com/api-reference/reference/availability-other-types#assigntimeoffinput) | The resources and time off schedule to assign. |

***

## Unassign time off schedule

Removes explicit company time off assignments. Affected resources fall back to the account default. Returns [`AssignTimeOffResult!`](https://developer.monday.com/api-reference/reference/availability-other-types#assigntimeoffresult).

**Account-level permission:** `assign_users_to_schedules`

```graphql GraphQL
mutation {
  unassign_time_off(user_ids: ["1234567890"]) {
    users {
      user_id
      success
      error {
        code
        message
      }
    }
    teams {
      team_id
      success
      error {
        code
        message
      }
    }
  }
}
```

### Arguments

| Argument  | Type    | Description                                                                              |
| :-------- | :------ | :--------------------------------------------------------------------------------------- |
| user\_ids | `[ID!]` | User IDs to unassign. Maximum 100. At least one of `user_ids` or `team_ids` is required. |
| team\_ids | `[ID!]` | Team IDs to unassign. Maximum 100. At least one of `user_ids` or `team_ids` is required. |

***

## Create time off entry

Adds one or more non-working date entries to existing time off schedules. Returns [`[TimeOffEntryResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentryresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  create_time_off_entry(inputs: [
    { time_off_id: "1234567890", name: "New Year's Day", start: "2026-01-01", end: "2026-01-01" },
    { time_off_id: "1234567890", name: "Independence Day", start: "2026-07-04", end: "2026-07-04" }
  ]) {
    time_off_entry {
      id
      name
      start
      end
    }
    success
    error {
      code
      message
    }
  }
}
```

You can create entries for different schedules in a single call by using different `time_off_id` values.

### Arguments

| Argument | Type                                                                                                                                   | Description                                  |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| inputs   | [`[CreateTimeOffEntryInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#createtimeoffentryinput) | The entries to create. Maximum 100 per call. |

***

## Update time off entry

Updates the name and/or date range of one or more time off entries. Returns [`[TimeOffEntryResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentryresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  update_time_off_entry(inputs: [{
    id: "1234567890",
    name: "Christmas Eve",
    start: "2026-12-24",
    end: "2026-12-25"
  }]) {
    time_off_entry {
      id
      name
      start
      end
    }
    success
    error {
      code
      message
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                                                   | Description                                  |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| inputs   | [`[UpdateTimeOffEntryInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#updatetimeoffentryinput) | The entries to update. Maximum 100 per call. |

***

## Delete time off entry

Deletes one or more time off entries. Returns [`[TimeOffEntryDeleteResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentrydeleteresult).

**Account-level permission:** `edit_schedules`

```graphql GraphQL
mutation {
  delete_time_off_entry(ids: ["1234567890"]) {
    id
    success
    error {
      code
      message
    }
  }
}
```

### Arguments

| Argument | Type     | Description                                    |
| :------- | :------- | :--------------------------------------------- |
| ids      | `[ID!]!` | The entry IDs to delete. Maximum 100 per call. |

***

## Create PTO entry

Creates one or more personal time off entries. Returns [`[TimeOffEntryResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentryresult).

**Account-level permission:** `edit_schedules` to create PTO for other users, or `update_own_personal_time_off` for your own entries.

```graphql GraphQL
mutation {
  create_pto_entry(inputs: [
    { user_id: "1234567890", start: "2026-08-01", end: "2026-08-05" }
  ]) {
    time_off_entry {
      id
      start
      end
    }
    success
    error {
      code
      message
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken, apiVersion: "2026-10" });

const query = `mutation ($inputs: [CreatePtoEntryInput!]!) { create_pto_entry(inputs: $inputs) { time_off_entry { id start end } success error { code message } } }`;
const variables = {
  inputs: [{ user_id: "1234567890", start: "2026-08-01", end: "2026-08-05" }]
};

const response = await mondayApiClient.request(query, variables);
```

Creating an entry for a user who has no PTO collection initializes their collection. The mutation returns a [`TimeOffEntry`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentry): `name` is `"PTO"` and `type` is `null`.

### Arguments

| Argument | Type                                                                                                                           | Description                                      |
| :------- | :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| inputs   | [`[CreatePtoEntryInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#createptoentryinput) | The PTO entries to create. Maximum 100 per call. |

***

## Update PTO entry

Updates the date range of one or more PTO entries. Returns [`[TimeOffEntryResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentryresult).

**Account-level permission:** `edit_schedules` to update PTO for other users, or `update_own_personal_time_off` for your own entries.

```graphql GraphQL
mutation {
  update_pto_entry(inputs: [{
    id: "1234567890",
    start: "2026-08-02",
    end: "2026-08-06"
  }]) {
    time_off_entry {
      id
      start
      end
    }
    success
    error {
      code
      message
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                                           | Description                                      |
| :------- | :----------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| inputs   | [`[UpdatePtoEntryInput!]!`](https://developer.monday.com/api-reference/reference/availability-other-types#updateptoentryinput) | The PTO entries to update. Maximum 100 per call. |

***

## Delete PTO entry

Deletes one or more PTO entries. Returns [`[TimeOffEntryDeleteResult!]`](https://developer.monday.com/api-reference/reference/availability-other-types#timeoffentrydeleteresult).

**Account-level permission:** `edit_schedules` to delete PTO for other users, or `update_own_personal_time_off` for your own entries.

```graphql GraphQL
mutation {
  delete_pto_entry(ids: ["1234567890"]) {
    id
    success
    error {
      code
      message
    }
  }
}
```

### Arguments

| Argument | Type     | Description                                        |
| :------- | :------- | :------------------------------------------------- |
| ids      | `[ID!]!` | The PTO entry IDs to delete. Maximum 100 per call. |

# Errors

Mutation results include `success: Boolean!` and an optional `error` of type [`Error`](https://developer.monday.com/api-reference/reference/availability-other-types#error). When `success` is `false`, `error` explains the failure.

Queries that are not enabled for the account throw a GraphQL error with code `FEATURE_NOT_ENABLED` instead of returning per-item errors.

| Code                    | Meaning                                                                     |
| :---------------------- | :-------------------------------------------------------------------------- |
| `FEATURE_NOT_ENABLED`   | Availability 2.0 is not enabled for this account.                           |
| `NOT_FOUND`             | The ID does not exist or belongs to a different account.                    |
| `HAS_ASSIGNED_USERS`    | Cannot delete the schedule because users or teams are still assigned to it. |
| `CANNOT_DELETE_DEFAULT` | The account default schedule cannot be deleted.                             |
| `NOT_AUTHORIZED`        | The caller does not have the required permission.                           |
| `LIMIT_EXCEEDED`        | The account has reached the maximum number of active work schedules.        |
| `INVALID_INPUT`         | Input validation failed (for example, `end` is before `start`).             |
| `USER_NOT_FOUND`        | The specified user does not exist.                                          |
| `INTERNAL_ERROR`        | An unexpected server error occurred. Retry with exponential backoff.        |

Authorization failures on mutations that use a GraphQL `authorize` check (work schedules, company time off, and assignments) can also surface as a top-level `USER_UNAUTHORIZED` GraphQL error instead of a per-item `NOT_AUTHORIZED` result.

<br />
