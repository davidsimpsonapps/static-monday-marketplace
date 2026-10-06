---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Object Relations

Learn how to create, read, and delete relations between objects using the platform API

Object relations allow you to define relationships between objects in monday.com, such as dependencies or aliases between boards and dashboards.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Queries

## object\_relations

Fetch relations for an object.

* Returns [`[ObjectRelation!]`](https://developer.monday.com/api-reference/reference/object-relations-other-types#objectrelation)

### Arguments

| Argument   | Type                                                                                                                       | Description                                                    |
| :--------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| object\_id | `ID!`                                                                                                                      | The unique identifier of the object whose relations to return. |
| kind       | [`RelationKind`](https://developer.monday.com/api-reference/reference/object-relations-other-types#relationkind)           | Optional. Filter by relation kind: `ALIAS` or `DEPENDENCY`.    |
| direction  | [`RelationDirection`](https://developer.monday.com/api-reference/reference/object-relations-other-types#relationdirection) | Optional. `OUTGOING` or `INCOMING`. Default: `OUTGOING`.       |

### Example

```graphql GraphQL
query {
  object_relations(
    object_id: "1234567890"
    direction: OUTGOING
    kind: DEPENDENCY
  ) {
    id
    source_object_id
    target_id
    target_object_type
    kind
  }
}
```

### Fields on ObjectRelation

| Field                | Type                                                                                                             | Description                                                            |
| :------------------- | :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| id                   | `ID`                                                                                                             | The relation’s unique identifier.                                      |
| source\_object\_id   | `ID`                                                                                                             | The object the relation starts from.                                   |
| target\_id           | `ID`                                                                                                             | The related object’s unique identifier.                                |
| target\_object\_type | [`TargetObject`](https://developer.monday.com/api-reference/reference/object-relations-other-types#targetobject) | The type of the target: `BOARD` or `DASHBOARD`.                        |
| kind                 | [`RelationKind`](https://developer.monday.com/api-reference/reference/object-relations-other-types#relationkind) | The relation kind as a lowercase string (for example, `"dependency"`). |

***

# Mutations

## create\_object\_relations

Create relations between objects.

* Returns [`[ObjectRelation!]`](https://developer.monday.com/api-reference/reference/object-relations-other-types#objectrelation)

### Arguments

| Argument           | Type                                                                                                                               | Description                          |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| source\_object\_id | `ID!`                                                                                                                              | The object to attach relations from. |
| relations          | [`[ObjectRelationInput!]!`](https://developer.monday.com/api-reference/reference/object-relations-other-types#objectrelationinput) | One or more relations to create.     |

### Example

```graphql GraphQL
mutation {
  create_object_relations(
    source_object_id: "1234567890"
    relations: [{
      kind: DEPENDENCY
      target_id: "9876543210"
      target_object_type: BOARD
    }]
  ) {
    id
    source_object_id
    target_id
    target_object_type
    kind
  }
}
```

***

## delete\_object\_relation

Delete relation(s). Returns an `Int`: the number of relations deleted.

### Arguments

| Argument           | Type  | Description                                                                                        |
| :----------------- | :---- | :------------------------------------------------------------------------------------------------- |
| source\_object\_id | `ID!` | The object whose relations are being deleted.                                                      |
| relation\_id       | `ID`  | Optional. The specific relation to delete. Omit to delete **all** relations for the source object. |

### Example

```graphql GraphQL
mutation {
  delete_object_relation(
    source_object_id: "1234567890"
    relation_id: "27"
  )
}
```
