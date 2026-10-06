---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# App installs

Learn how to query app installation data using the monday.com platform API

Whenever a monday.com user installs an app, we send the installation information to the app developer to help them further understand their app's performance and usage. This information is available through [webhooks](https://developer.monday.com/apps/docs/webhooks#available-webhooks) and by querying `app_installs`.

# Queries

## Get app installs

* Only works for **app collaborators** using a **personal token**
* Returns an object containing an app's installation details
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  app_installs(
    app_id: 123456789
    account_id: 98766543210
	) {
    app_id
    timestamp
    app_install_account {
      id
    }
    app_install_user {
      id
    }
    app_version {
      major
      minor
      patch
      type
      text
    }
    permissions {
      approved_scopes
      required_scopes
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($appId: ID!, $accountId: ID!) { app_installs (app_id: $appId, account_id: $accountId) { app_id timestamp app_install_account { id } app_install_user { id } app_version { major minor patch type text } permissions { approved_scopes required_scopes }}}`;
const variables = {
  appId: 123456789,
  accountId: 9876543210
}

const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument    | Type  | Description                                                                |
| :---------- | :---- | :------------------------------------------------------------------------- |
| account\_id | `ID`  | The account's unique identifier to filter results by.                      |
| app\_id     | `ID!` | The application's unique identifier to filter results by.                  |
| limit       | `Int` | The number of boards to return. The default is 25, and the maximum is 100. |
| page        | `Int` | The page number to return. Starts at 1.                                    |

### Fields

| Fields                | Type                                                                                                                           | Description                                               |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| app\_id               | `Int!`                                                                                                                         | The app's unique identifier.                              |
| app\_install\_account | [`AppInstallAccount!`](https://developer.monday.com/api-reference/reference/app-installs-other-types#appinstallaccount)        | The app installer's account details.                      |
| app\_install\_user    | [`AppInstallUser!`](https://developer.monday.com/api-reference/reference/app-installs-other-types#appinstalluser)              | The app installer's user details.                         |
| app\_version          | [`AppVersion`](https://developer.monday.com/api-reference/reference/app-installs-other-types#appversion)                       | The app's version details when it was installed.          |
| permissions           | [`AppInstallPermissions`](https://developer.monday.com/api-reference/reference/app-installs-other-types#appinstallpermissions) | The required and approved scopes for an app installation. |
| timestamp             | `String`                                                                                                                       | The date and time the app was installed.                  |
