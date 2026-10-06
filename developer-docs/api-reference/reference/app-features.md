---
updatedAt: 2026-09-23T16:42:43.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Features

Learn how to read, create, update, and delete app features using the platform API

All apps built on the monday.com [apps framework](https://developer.monday.com/apps/docs/intro) are comprised of features. These features determine where the app appears in the UI, the methods required to build it, and its functionality. They are created and managed through the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center).

# Queries

## Get features

* Returns an object containing metadata about an app's features
* Must be nested within an `app` query

```graphql GraphQL
query {
  app(id:123456) {
    features(limit:2) {
      created_at
      data
      id
      name
    }
  }
}
```

### Arguments

| Argument | Type  | Description                                          |
| :------- | :---- | :--------------------------------------------------- |
| limit    | `Int` | The number of features to return. The default is 25. |
| page     | `Int` | The page number to return. Starts at 1.              |

### Fields

| Field       | Type     | Description                                                                                                                                             |
| :---------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| app\_id     | `ID`     | The unique identifier of the app the feature belongs to.                                                                                                |
| created\_at | `Date`   | The app feature's creation date.                                                                                                                        |
| data        | `JSON`   | The data of the app feature. Icon/logo fields (iconUrl, logoUrl, etc., including nested headerConfig.\*.iconUrl) must be HTTPS URLs or Vibe icon names. |
| id          | `ID!`    | The app feature's unique identifier.                                                                                                                    |
| name        | `String` | The app's feature's name.                                                                                                                               |
| type        | `String` | The app feature's type.                                                                                                                                 |
| updated\_at | `Date`   | The app feature's last updated date.                                                                                                                    |

# Mutations

## Create app feature

Creates an app feature. Returns [`AppFeatureType`](https://developer.monday.com/api-reference/reference/app-features#fields).

```graphql GraphQL
mutation {
  create_app_feature(
    slug: "test-item-view", 
    app_id: 9876543210, 
    type: ITEM_VIEW
  ) {
    id
    name
  }
}
```

### Arguments

| Argument         | Type                                                                                                                         | Description                                                                                                                                                                 |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app\_id          | `ID!`                                                                                                                        | The app's unique identifier to create the new feature for.                                                                                                                  |
| app\_version\_id | `ID`                                                                                                                         | The unique identifier of the app version to create the new feature for.                                                                                                     |
| data             | `JSON`                                                                                                                       | The app feature data. Structure is dynamic per feature type. Any iconUrl/logoUrl/thumbnailUrl (including nested under headerConfig) must be an HTTPS URL or Vibe icon name. |
| deployment       | [`AppFeatureReleaseInput`](https://developer.monday.com/api-reference/reference/features-other-types#appfeaturereleaseinput) | The new app feature's deployment data.                                                                                                                                      |
| name             | `String`                                                                                                                     | The new app feature's name.                                                                                                                                                 |
| slug             | `String!`                                                                                                                    | The new app feature's unique slug.                                                                                                                                          |
| type             | [`AppFeatureTypeE!`](https://developer.monday.com/api-reference/reference/features-other-types#appfeaturetypee)              | The new app feature's type.                                                                                                                                                 |

## Update app feature

Updates an app feature. Returns [`AppFeatureType`](https://developer.monday.com/api-reference/reference/app-features#fields).

```graphql GraphQL
mutation {
  update_app_feature(
    id: 12345,
    input: {
       data: {
          name: "Updated App Feature",
          description: "This is an updated app feature description."
        }
      deployment: {
        kind: CLIENT_SIDE_CODE,
        data: {
          url: "/sub-route"
        }
      }
    }
  ) {
    id
    name
    data
  }
}
```

### Arguments

| Argument | Type                                                                                                                        | Description                            |
| :------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| id       | `ID!`                                                                                                                       | The app feature's unique identifier.   |
| input    | [`UpdateAppFeatureInput!`](https://developer.monday.com/api-reference/reference/features-other-types#updateappfeatureinput) | The input for the updated app feature. |
