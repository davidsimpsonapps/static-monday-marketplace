---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn about other types used while reading an account's API consumption data

The monday.com [`platform_api`](https://developer.monday.com/api-reference/reference/platform-api) API lets enterprise accounts query their daily API usage.

Each of the object types described below represents a specific aspect of an account's daily usage. You can use these object types to supply metadata in queries.

# DailyAnalytics

An object containing the account's daily call limit analytics (by app, by day, or by user).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        by_app [`[PlatformApiDailyAnalyticsByApp!]!`](https://developer.monday.com/api-reference/reference/other-types#by-app)
      </td>

      <td>
        The API usage per app.
      </td>

      <td>
        api_app_id `String!`  
        app [`AppType`](https://developer.monday.com/api-reference/reference/app)  
        usage `Int!`
      </td>
    </tr>

    <tr>
      <td>
        by_day [`[PlatformApiDailyAnalyticsByDay!]!`](https://developer.monday.com/api-reference/reference/other-types#by-day)
      </td>

      <td>
        The API usage per day.
      </td>

      <td>
        day `String!`  
        usage `Int!`
      </td>
    </tr>

    <tr>
      <td>
        by_user [`[PlatformApiDailyAnalyticsByUser!]!`](https://developer.monday.com/api-reference/reference/other-types#by-user)
      </td>

      <td>
        The daily API usage per user.
      </td>

      <td>
        usage `Int!`  
        user `User!`
      </td>
    </tr>

    <tr>
      <td>
        last_updated `ISO8601DateTime`
      </td>

      <td>
        The timestamp of when the API usage data was last updated.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## PlatformApiDailyAnalyticsByApp

An object containing an account's API consumption data for the top six apps over the past 14 days.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        api_app_id `ID!`
      </td>

      <td>
        The app's unique API consumer identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        app [`AppType`](https://developer.monday.com/api-reference/reference/app)
      </td>

      <td>
        Metadata about the top six apps with the highest API consumption.
      </td>

      <td>
        api_app_id `ID`  
        client_id `String`  
        created_at `Date`  
        features `[AppFeatureType!]`  
        id `ID!`  
        kind `String`  
        name `String`  
        state `String`  
        updated_at `Date`  
        user_id `ID`
      </td>
    </tr>

    <tr>
      <td>
        usage `Int!`
      </td>

      <td>
        The API amount consumed by a given app in the past 14 days.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## PlatformApiDailyAnalyticsByDay

An object containing an account's API usage per day over the past 14 days.

| Field         | Description                         |
| :------------ | :---------------------------------- |
| day `String!` | The day.                            |
| usage `Int!`  | The amount consumed on a given day. |

## platformApiDailyAnalyticsByUser

An object containing an account's API consumption data for the top six users over the past 14 days.

| Field                                                                      | Description                                                        |
| :------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| usage `Int!`                                                               | The API amount consumed by a given user in the past 14 days.       |
| user [`User!`](https://developer.monday.com/api-reference/reference/users) | Metadata about the top six users with the highest API consumption. |

<br />
