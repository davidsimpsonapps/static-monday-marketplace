---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types used by the object relations API

The monday.com [object relations](https://developer.monday.com/api-reference/reference/object-relations) API lets you create, read, and delete relationships between objects such as boards and dashboards.

The types below are used by the object relations queries and mutations, and are not independently queryable.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# ObjectRelation

| Field                | Type                            | Description                             |
| :------------------- | :------------------------------ | :-------------------------------------- |
| id                   | `ID`                            | The relation’s unique identifier.       |
| source\_object\_id   | `ID`                            | The object the relation starts from.    |
| target\_id           | `ID`                            | The related object’s unique identifier. |
| target\_object\_type | [`TargetObject`](#targetobject) | The type of the target object.          |
| kind                 | [`RelationKind`](#relationkind) | The relation kind.                      |

***

# ObjectRelationInput

| Field                | Type                             | Description                                      |
| :------------------- | :------------------------------- | :----------------------------------------------- |
| kind                 | [`RelationKind!`](#relationkind) | Required. The relation kind to create.           |
| target\_id           | `ID!`                            | Required. The target object’s unique identifier. |
| target\_object\_type | [`TargetObject`](#targetobject)  | Optional. Default: `BOARD`.                      |

***

# RelationDirection

An enum used with the `object_relations` query to choose which side of the relation to traverse.

| Enum Value | Description                                     |
| :--------- | :---------------------------------------------- |
| `OUTGOING` | Relations where the given object is the source. |
| `INCOMING` | Relations where the given object is the target. |

***

# RelationKind

An enum describing the kind of relationship between objects.

| Enum Value   | Description                          |
| :----------- | :----------------------------------- |
| `ALIAS`      | Alias relation between objects.      |
| `DEPENDENCY` | Dependency relation between objects. |

***

# TargetObject

An enum identifying what type of object a relation points to.

| Enum Value  | Description         |
| :---------- | :------------------ |
| `BOARD`     | A board object.     |
| `DASHBOARD` | A dashboard object. |
