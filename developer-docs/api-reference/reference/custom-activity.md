---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Custom activity

Learn how to read, create, and custom activities from the Email & Activities app using the platform API

The [Emails & Activities](https://support.monday.com/hc/en-us/articles/360019213180-Emails-Activities-on-monday-com) app (E\&A) is a useful tool that enables monday.com CRM customers to manage client communication in one centralized location. Each contact is logged and tracked as an activity in the app's timeline for easy access to important details and updates.

You can choose from default activities, like *Meeting* or *Call Summary*, or you can create custom activities to better organize your contacts.

<Image align="center" border={true} width="500px" src="https://files.readme.io/1b8d7e4362f3d9b351646f78fc3e914eb04995481aaba20e807cd67315414e89-Custom_activity.png" className="border" />

# Queries

## Get custom activity

* **Limit:** up to 50 custom activities
* Returns an array containing metadata about custom activities in the E\&A timeline
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  custom_activity {
    color
    icon_id
    id
    name
    type
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "query { custom_activity { color icon_id id name type }}";
const response = await mondayApiClient.request(query);
```

### Fields

| Field    | Type                  | Description                                                                                                                                                                      |
| :------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color    | `CustomActivityColor` | The custom activity's color. View a full list of names and their corresponding colors [here](https://asset.cloudinary.com/monday-platform-dev/d1bb4937490d6c971b9420433828f60b). |
| icon\_id | `CustomActivityIcon`  | The custom activity's icon. View a full list of names and their corresponding icons [here](https://asset.cloudinary.com/monday-platform-dev/2ef0e5a6e0f074d5aaa196c066680d34).   |
| id       | `ID`                  | The custom activity's unique identifier.                                                                                                                                         |
| name     | `String`              | The custom activity's name.                                                                                                                                                      |
| type     | `String`              | The custom activity's type.                                                                                                                                                      |

# Mutations

## Create custom activity

Creates a custom activity in the E\&A app. Returns [`CustomActivity`](https://developer.monday.com/api-reference/reference/custom-activity#fields).

```graphql GraphQL
mutation {
  create_custom_activity(
    color: SLATE_BLUE
    icon_id: TRIPOD
    name: "Test custom activity"
	) {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "mutation ($color:CustomActivityColor!, $iconId:CustomActivityIcon!, $name: String!) { create_custom_activity (color: $color, icon_id: $iconId, name: $name) {	id }}";
const variables = {
  color: "SLATE_BLUE",
  iconId: "TRIPOD",
  name: "My custom activity",
};
const response = await mondayApiClient.request(query, variables);
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
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        color 
      </td>

      <td>
        `CustomActivityColor!`
      </td>

      <td>
        The custom activity's color. View a full list of names and their corresponding colors [here](https://asset.cloudinary.com/monday-platform-dev/d1bb4937490d6c971b9420433828f60b).
      </td>

      <td>
        `BRINK_PINK`  
        `CELTIC_BLUE`  
        `CORNFLOWER_BLUE`  
        `DINGY_DUNGEON`  
        `GO_GREEN`  
        `GRAY`  
        `LIGHT_DEEP_PINK`  
        `LIGHT_HOT_PINK`  
        `MAYA_BLUE`  
        `MEDIUM_TURQUOISE`  
        `PARADISE_PINK`  
        `PHILIPPINE_GREEN`  
        `PHILIPPINE_YELLOW`  
        `SLATE_BLUE`  
        `VIVID_CERULEAN`  
        `YANKEES_BLUE`  
        `YELLOW_GREEN`  
        `YELLOW_ORANGE`
      </td>
    </tr>

    <tr>
      <td>
        icon_id
      </td>

      <td>
        `CustomActivityIcon!`
      </td>

      <td>
        The custom activity's icon. View a full list of names and their corresponding icons [here](https://asset.cloudinary.com/monday-platform-dev/2ef0e5a6e0f074d5aaa196c066680d34).
      </td>

      <td>
        `ASCENDING`  
        `CAMERA`  
        `CONFERENCE`  
        `FLAG`  
        `GIFT`  
        `HEADPHONES`  
        `HOMEKEYS`  
        `LOCATION`  
        `NOTEBOOK`  
        `PAPERPLANE`  
        `PLANE`  
        `PLIERS`  
        `TRIPOD`  
        `TWOFLAGS`  
        `UTENSILS`
      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The custom activity's name.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Delete custom activity

Deletes a custom activity in the E\&A app. Returns [`CustomActivity`](https://developer.monday.com/api-reference/reference/custom-activity#fields).

```graphql GraphQL
mutation {
  delete_custom_activity(id: "cbb37d0e-04ee-3662-z832-c4150e80eddz") {
    name
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = "mutation ($activityId: String!) { delete_custom_activity (id: $activityId) {	name }}";
const variables = {
  activityId: "c95ccef8-f41d-40a9-b5b7-b039505e85da",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type      | Description                              |
| :------- | :-------- | :--------------------------------------- |
| id       | `String!` | The custom activity's unique identifier. |
