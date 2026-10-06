---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn about additional types used while reading and updating resource directories via the API

The object types below define additional data structures used across the [resource directory API](https://developer.monday.com/api-reference/reference/resource-directory). They extend the core objects documented in the [main reference](https://developer.monday.com/api-reference/reference/resource-directory) and are used when updating and reading an account's resource directory.

# DirectoryResource

An object containing metadata about a directory's resources.

| Field              | Description                       |
| :----------------- | :-------------------------------- |
| email `String`     | The resource's email.             |
| id `ID!`           | The resource's unique identifier. |
| job\_role `String` | The resource's job role.          |
| location `String`  | The resource's location.          |
| name `String!`     | The directory resource's name.    |
| skills `[String!]` | The resource's skills.            |

# UpdateDirectoryResourceAttributesResponse

An object containing the result of updating a resource directory's attributes.

| Field              | Description                                    |
| :----------------- | :--------------------------------------------- |
| success `Boolean!` | Whether the update was successfully completed. |

<br />
