---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Validations

Learn how to read, create, update, and delete validation rules and required field columns using the platform API

On monday.com boards, you can designate [required field columns](https://support.monday.com/hc/en-us/articles/27560733058706-Required-columns) that make specific columns mandatory when adding a new item. Doing so ensures that all new items added to your board will have specific columns populated.

**Supported column types for required:** `status`, `dropdown`, `numbers`, `date`, `timeline`, `people`, `text`, `long_text`, `email`, `phone`, `link`, `rating`, `country`, `location`

**Note:** A column can be marked required but may not support validation rules. For example, `timeline` and `location` are required-capable but do not support any operators for validation rules.

Starting with API version `2026-07`, you can also create **validation rules** that define more advanced constraints on column values. Validation rules support conditional logic ("if column A equals X, then column B must not be empty") and a range of comparison operators, which vary significantly by column type and clause type (plain vs. conditional IF vs. conditional THEN). For a detailed walkthrough, see the [validation rules guide](https://developer.monday.com/api-reference/docs/validation-rules-guide).

> 📘 Validation rules are enforced in both the UI and API
>
> Validation rules are checked when users create or update items through the monday.com interface **and** through the API. API requests that violate validation rules return a `DATA_VALIDATIONS_ERROR` error (422 status code) with details about which columns failed validation. See the [validation rules guide](https://developer.monday.com/api-reference/docs/validation-rules-guide) for error response format.

# Queries

## Get validations

* Requires permission to edit column settings on the board
* :construction: Only available for **Pro and Enterprise** accounts
* Returns an object containing metadata about required field columns and validation rules
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  validations(id: 1234567890) {
    required_column_ids
    rules
  }
}
```
```json JSON
{
  "data": {
    "validations": {
      "required_column_ids": ["status", "text0"],
      "rules": {
        "cd7f1b7b-452e-40d3-886c-346184ffee7e": {
          "then": {
            "operator": "AND",
            "groups": [
              {
                "operator": "ANY_OF",
                "column_id": "color_mm1pt41x",
                "compare_value": [1, 2]
              }
            ]
          }
        },
        "31933592-171a-47ae-93a5-7a1c214fc9a3": {
          "if": {
            "operator": "AND",
            "groups": [
              {
                "operator": "ANY_OF",
                "column_id": "color_mm1pt41x",
                "compare_value": [1]
              }
            ]
          },
          "then": {
            "operator": "AND",
            "groups": [
              {
                "operator": "IS_NOT_EMPTY",
                "column_id": "text_mm1pecmq",
                "compare_value": []
              }
            ]
          }
        }
      }
    }
  }
}
```

### Arguments

| Argument | Type                    | Description                     | Enum Values |
| :------- | :---------------------- | :------------------------------ | :---------- |
| id       | `ID!`                   | The board's unique identifier.  |             |
| type     | `ValidationsEntityType` | The type of entity to validate. | `board`     |

### Fields

| Field                 | Type        | Description                                                                                                                                                                                                     |
| :-------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| required\_column\_ids | `[String!]` | An array of the unique identifiers for the required columns.                                                                                                                                                    |
| rules                 | `JSON`      | A JSON object containing the board's validation rules. Each key is a rule ID (UUID), and each value is a rule object with `then` (always present) and `if` (present only for conditional rules) clause objects. |

# Mutations

* :construction: Only available for **Pro and Enterprise** accounts

## Add required column

Makes an existing column required. This does not create a new column. Returns [`RequiredColumns`](https://developer.monday.com/api-reference/reference/validations-other-types#requiredcolumns).

```graphql GraphQL
mutation {
  add_required_column(
    id:1234567890, 
    column_id: "long_text", 
    type: board
  ) {
    required_column_ids
  }
}
```
```json JSON
{
  "data": {
    "add_required_column": {
      "required_column_ids": [
        "long_text"
      ]
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument   | Type                    | Description                     | Enum Values |
| :--------- | :---------------------- | :------------------------------ | :---------- |
| column\_id | `String!`               | The column's unique identifier. |             |
| id         | `ID!`                   | The board's unique identifier.  |             |
| type       | `ValidationsEntityType` | The type of entity to validate. | `board`     |

## Remove required column

Removes an existing column's required designation. This does not delete the column itself. Returns [`RequiredColumns`](https://developer.monday.com/api-reference/reference/validations-other-types#requiredcolumns).

```graphql GraphQL
mutation {
  remove_required_column(
    id:1234567890, 
    column_id: "long_text", 
    type: board
  ) {
    required_column_ids
  }
}
```
```json JSON
{
  "data": {
    "remove_required_column": {
      "required_column_ids": []
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument   | Type                    | Description                     | Enum Values |
| :--------- | :---------------------- | :------------------------------ | :---------- |
| column\_id | `String!`               | The column's unique identifier. |             |
| id         | `ID!`                   | The board's unique identifier.  |             |
| type       | `ValidationsEntityType` | The type of entity to validate. | `board`     |

***

## Create validation rule

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Creates a new validation rule on a board. A rule defines constraints on column values, optionally gated behind a condition. Returns [`ValidationRule`](https://developer.monday.com/api-reference/reference/validations-other-types#validationrule).

For a detailed guide on building validation rules, see [Validation rules](https://developer.monday.com/api-reference/docs/validation-rules-guide).

**Validation rule** — requires the status column to be one of specific values:

```graphql GraphQL
mutation {
  create_validation_rule(
    id: 1234567890,
    type: board,
    rule: {
      then: {
        operator: AND,
        groups: [{
          operator: ANY_OF,
          column_id: "status",
          compare_value: [1, 2]
        }]
      }
    }
  ) {
    id
    if
    then
  }
}
```
```json JSON
{
  "data": {
    "create_validation_rule": {
      "id": "cd7f1b7b-452e-40d3-886c-346184ffee7e",
      "if": null,
      "then": {
        "operator": "AND",
        "groups": [
          {
            "operator": "ANY_OF",
            "column_id": "status",
            "compare_value": [1, 2]
          }
        ]
      }
    }
  }
}
```

**Conditional rule** — if the status column matches value `1`, then the text column must not be empty:

```graphql GraphQL
mutation {
  create_validation_rule(
    id: 1234567890,
    type: board,
    rule: {
      if: {
        operator: AND,
        groups: [{
          operator: ANY_OF,
          column_id: "status",
          compare_value: [1]
        }]
      },
      then: {
        operator: AND,
        groups: [{
          operator: IS_NOT_EMPTY,
          column_id: "text0"
        }]
      }
    }
  ) {
    id
    if
    then
  }
}
```
```json JSON
{
  "data": {
    "create_validation_rule": {
      "id": "31933592-171a-47ae-93a5-7a1c214fc9a3",
      "if": {
        "operator": "AND",
        "groups": [
          {
            "operator": "ANY_OF",
            "column_id": "status",
            "compare_value": [1]
          }
        ]
      },
      "then": {
        "operator": "AND",
        "groups": [
          {
            "operator": "IS_NOT_EMPTY",
            "column_id": "text0",
            "compare_value": []
          }
        ]
      }
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                                       | Description                                                                   | Enum Values |
| :------- | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :---------- |
| id       | `ID!`                                                                                                                      | The board's unique identifier.                                                |             |
| type     | `ValidationsEntityType`                                                                                                    | The type of entity to validate.                                               | `board`     |
| rule     | [`ValidationRuleInput!`](https://developer.monday.com/api-reference/reference/validations-other-types#validationruleinput) | The rule definition containing `then` (required) and `if` (optional) clauses. |             |

### Constraints

* A validation rule (no `if` clause) must have exactly **one** constraint in the `then` clause.
* A conditional rule must have exactly **one** constraint in the `if` clause, but can have **multiple** constraints in the `then` clause.
* A column can have only one validation rule (without an `if` clause).
* A column cannot have both validation rules and conditional rules.
* Certain operators are only available in conditional rules. See [`RuleOperator`](https://developer.monday.com/api-reference/reference/validations-other-types#ruleoperator) for details.

## Update validation rule

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Updates an existing validation rule. You must provide the full rule definition (both `if` and `then` clauses) — partial updates are not supported. Returns [`ValidationRule`](https://developer.monday.com/api-reference/reference/validations-other-types#validationrule).

```graphql GraphQL
mutation {
  update_validation_rule(
    id: 1234567890,
    type: board,
    rule_id: "cd7f1b7b-452e-40d3-886c-346184ffee7e",
    rule: {
      then: {
        operator: AND,
        groups: [{
          operator: GREATER_THAN_OR_EQUALS,
          column_id: "numbers0",
          compare_value: [5]
        }]
      }
    }
  ) {
    id
    if
    then
  }
}
```
```json JSON
{
  "data": {
    "update_validation_rule": {
      "id": "cd7f1b7b-452e-40d3-886c-346184ffee7e",
      "if": null,
      "then": {
        "operator": "AND",
        "groups": [
          {
            "operator": "GREATER_THAN_OR_EQUALS",
            "column_id": "numbers0",
            "compare_value": [5]
          }
        ]
      }
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                                       | Description                                  | Enum Values |
| :------- | :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- | :---------- |
| id       | `ID!`                                                                                                                      | The board's unique identifier.               |             |
| type     | `ValidationsEntityType`                                                                                                    | The type of entity to validate.              | `board`     |
| rule\_id | `ID!`                                                                                                                      | The unique identifier of the rule to update. |             |
| rule     | [`ValidationRuleInput!`](https://developer.monday.com/api-reference/reference/validations-other-types#validationruleinput) | The full updated rule definition.            |             |

## Delete validation rule

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Deletes an existing validation rule from a board. Returns the deleted [`ValidationRule`](https://developer.monday.com/api-reference/reference/validations-other-types#validationrule).

```graphql GraphQL
mutation {
  delete_validation_rule(
    id: 1234567890,
    type: board,
    rule_id: "cd7f1b7b-452e-40d3-886c-346184ffee7e"
  ) {
    id
    if
    then
  }
}
```
```json JSON
{
  "data": {
    "delete_validation_rule": {
      "id": "cd7f1b7b-452e-40d3-886c-346184ffee7e",
      "if": null,
      "then": {
        "operator": "AND",
        "groups": [
          {
            "operator": "ANY_OF",
            "column_id": "status",
            "compare_value": [1, 2]
          }
        ]
      }
    }
  }
}
```

### Arguments

| Argument | Type                    | Description                                  | Enum Values |
| :------- | :---------------------- | :------------------------------------------- | :---------- |
| id       | `ID!`                   | The board's unique identifier.               |             |
| type     | `ValidationsEntityType` | The type of entity to validate.              | `board`     |
| rule\_id | `ID!`                   | The unique identifier of the rule to delete. |             |
