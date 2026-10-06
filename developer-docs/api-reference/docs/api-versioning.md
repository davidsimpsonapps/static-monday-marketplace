---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Versioning

Learn about different versions of the monday.com platform API, when they are released, and how to access them

Versioning is an important approach to continuously evolve our API without disrupting existing functionality. It enables developers to make updates and improvements while maintaining a stable and predictable behavior.

We guarantee at least **three** different versions of the API in parallel and release a new version every quarter. You can read more about the latest versions in our [release notes](https://developer.monday.com/api-reference/docs/release-notes).

The current versions are:

<HTMLBlock>{`
<style>
  body {
    font-family: 'Poppins', sans-serif;    
  }
  .columns-container {
    font-family: 'Poppins', sans-serif;
    display: flex;
    
    }
  .column {
    flex: 1;
    padding: 10px;
    background-color: #FFFFFF;
    font-size: 22px;
    text-align: center;
  }
  .column-text {
    text-align: center;
    margin-bottom: 10px;
    font-size: 40px;
    color: #605cd4;
  }

</style>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap">

<div class="columns-container">
  <div class="column">
    <div class="column-text">2026-04</div>
    Maintenance
  </div>
  <div class="column">
    <div class="column-text">2026-07</div>
    Current
  </div>
    <div class="column">
    <div class="column-text">2026-10</div>
    Release candidate
  </div>
</div>
`}</HTMLBlock>

# Version types

There are at least three types of API versions at any given time: release candidate, current, and maintenance. Two are [stable](https://developer.monday.com/api-reference/docs/api-versioning#important-terms), and the other is an [unstable](https://developer.monday.com/api-reference/docs/api-versioning#important-terms) preview version.

This guarantees that any given version will be stable for **at least six months**. You can minimize your development effort by always passing a [version header](https://developer.monday.com/api-reference/docs/api-versioning#using-the-api-version-header-in-an-http-request) with your API calls.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Release candidate (RC)
      </td>

      <td>
        * Provides early access to the latest features and improvements
        * **Unstable** and should not be used in production applications
        * Previously known as the _Preview version_
      </td>
    </tr>

    <tr>
      <td>
        Current
      </td>

      <td>
        * Only bug fixes with no breaking changes
        * **Stable** and can be used in production applications
        * Used as the default version when no header is passed
        * Anything built using this won't change for at least six months
        * Previously known as the _Stable version_
      </td>
    </tr>

    <tr>
      <td>
        Maintenance
      </td>

      <td>
        * Only bug fixes with no breaking changes
        * **Stable** and can be used in production applications (recommended to only use it when you are unable to migrate to the _current_ version on time)
        * Previously known as the _Deprecated version_
      </td>
    </tr>
  </tbody>
</Table>

## Documentation

Our [guides](https://developer.monday.com/api-reference/docs/basics) and [API reference](https://developer.monday.com/api-reference/reference/about-the-api-reference) will always reflect the schema of the **current version**. All upcoming updates or schema changes will be announced in the

[API changelog](https://developer.monday.com/api-reference/changelog) and [release notes](https://developer.monday.com/api-reference/docs/release-notes) and denoted in the API reference when relevant (see the example below).

# Life cycle

Each version moves through the following lifecycle:

* Release a new **RC** (every quarter)
* **RC** --> **Current** (after 3 months)
* **Current** --> **Maintenance** (after 3 months)
* **Maintenance** --> **Deprecated** (will be announced **at least** 6 months in advance)

## Release schedule

New RCs are gradually released every three months at the start of each quarter at 12:00 AM UTC.

Version names are not semantic but instead refer to the year and month in which they become the default/current version. **For example**, the July/Q3 2024 current version would be called `2024-07`.

| Version name  | RC                 | Current (default)  | Maintenance        | Deprecated            |
| :------------ | :----------------- | :----------------- | :----------------- | :-------------------- |
| `2024-10`     | July 1st, 2024     | October 1st, 2024  | January 15th, 2025 | February 15th, 2026   |
| `2025-01`     | October 1st, 2024  | January 15th, 2025 | April 1st, 2025    | February 15th, 2026   |
| `2025-04`     | January 15th, 2025 | April 1st, 2025    | July 1st, 2025     | *Not yet announced\** |
| `2025-07`     | April 1st, 2025    | July 1st, 2025     | October 1st, 2025  | *Not yet announced\** |
| `2025-10`     | July 1st, 2025     | October 1st, 2025  | January 15th, 2026 | *Not yet announced\** |
| `2026-01`     | October 1st, 2025  | January 15th, 2026 | April 1st, 2026    | *Not yet announced\** |
| `2026-04`     | January 15th, 2026 | April 1st, 2026    | July 1st, 2026     | *Not yet announced\** |
| **`2026-07`** | April 1st, 2026    | **July 1st, 2026** | October 1st, 2026  | *Not yet announced\** |
| `2026-10`     | July 1st, 2026     | October 1st, 2026  | January 15th, 2027 | *Not yet announced\** |
| `2027-01`     | October 1st, 2026  | January 15th, 2027 | April 1st, 2027    | *Not yet announced\** |

*\*Each version deprecation will be announced at least six months in advance!*

# How to access different versions

You can access different versions of the API using a header in an HTTP request, through the SDK, or in the API playground.

> 👍 Passing the version name in your request
>
> We strongly encourage production applications to pass a [version name](https://developer.monday.com/api-reference/docs/api-versioning#important-terms) in each API call. If you don't, your app will always get the *Current version*. Passing a version name makes your app less susceptible to breaking changes and gives you more time to migrate to a new version.

## Using the `API-Version` header in an HTTP request

You can select which API version you want to use by sending the version name in the `API-Version` header.

```javascript
fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE',
    'API-Version' : '2026-07'
   },
   body: JSON.stringify({
     'query' : 'query{version {kind value} }'
   })
  });
```
```curl
curl --location --request POST 'https://api.monday.com/v2' \
--header 'API-Version: 2026-07' \
--header 'Authorization: YOUR_API_KEY_HERE' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query { version { kind value } }"}'
```

All API responses include the `API-Version` header to indicate the version used during the call, or you can query the [`version`](https://developer.monday.com/api-reference/docs/version) object to return the same data. If you'd like to see all available API versions, you can query the [`versions`](https://developer.monday.com/api-reference/docs/versions) object.

## Using the SDK

We support two ways to set the API version when using the [GraphQL JS SDK](https://www.npmjs.com/package/@mondaydotcomorg/api): setting the default version or passing the version for a specific call.

```javascript Default Version
import { ApiClient } from "@mondaydotcomorg/api";

const monday = new ApiClient({
  token: process.env.MONDAY_API_TOKEN,  // required
  version: "2026-07"                    // sets default API version
});
```
```javascript Specific Call
const query = `query { me { id } }`;

const data = await monday.request(query, {
  version: "2026-07"
});
```

## API playground

You can also use the [API playground](https://developer.monday.com/api-reference/docs/introduction-to-graphql#api-playground) to access and test different versions of the API by clicking the **clock going in reverse** icon in the middle of the screen.

This will open the version selector where you can test queries and mutations with any of the versions listed.

# Versioning examples

Versioning is a powerful way to improve the API, but understanding which version to request and when can be confusing. We've compiled these hypothetical scenarios to help you better understand the flow!

1. We announce the release of a new API called `new_API` in version `2024-01`. You can access `new_API` as soon as `2024-01` is released as the *RC* by passing `2024-01` in the `API-Version` header. If you don't include the `API-Version` header, it will automatically call the *Current version* and you will get an error stating that the field does not exist.
2. We announce the deprecation of the `example` field in version `2023-07`. You can access the `example` field until January 15th, 2024 when `2023-07` is deprecated. Once you start passing `2024-04` in your request, you will no longer have access to the `example` field.

# Important terms

API versioning differs across the board, so frequently used terms may mean something slightly different in each case. This section walks through some of the most important concepts and terms we use, and more importantly, covers exactly what they mean!

| Term         | Description                                                                                                                                                       |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stable       | Indicates that a version can reliably be used in production. Addresses only non-breaking bug fixes, regressions, and critical bugs that require breaking changes. |
| Default      | The version that will be called when no header or the `default` header is passed in an API call.                                                                  |
| Unstable     | Indicates that a version cannot reliably be used in production. Addresses both breaking and non-breaking changes.                                                 |
| Deprecated   | Indicates that a version is no longer supported. Any calls made to a deprecated version will use the *Maintenance version.*                                       |
| Version name | The version's unique identifier (e.g., `2023-10`). We recommend passing the version name in your calls.                                                           |
| Version type | The type of version:`release-candidate`, `current`, or `maintenance`.                                                                                             |

# Troubleshooting

Have questions about versioning? Have no fear! Keep reading to learn more about common issues below and how to resolve them.

## Unsupported versions

* Any request to a version of the API that has been deprecated will get the **Maintenance version**. If you request a version that does not exist (e.g., `2024-02` instead of `2024-01`), you will get the **Current version.**

## Invalid requests

* You will get an [InvalidVersionException](https://developer.monday.com/api-reference/docs/errors#invalidversionexception) error if your request is not formatted properly (e.g. `2023` instead of `2023-04`). Refer to our [release schedule](https://developer.monday.com/api-reference/docs/api-versioning#release-schedule) to see all version names and ensure they are properly formatted in your call.
* If you make an API call using a field that doesn't exist in a specific version, you will get an error stating that the field does not exist (see below). Make sure you're accessing the updated version by passing the version name in your call!

```json
{
  "errors": [
    {
      "message": "Field 'new_field' doesn't exist on type 'Boards'",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ],
      "path": [
        "query",
        "boards",
        "new_field"
      ],
      "extensions": {
        "code": "undefinedField",
        "typeName": "Boards",
        "fieldName": "new_field"
      }
    }
  ],
  "account_id": 1
}
```
