---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Validation Rules

Learn how to create, update, and manage validation rules on monday.com boards to enforce data quality through the API

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

Validation rules let you enforce data quality on monday.com boards by defining constraints on column values. Unlike [required columns](https://support.monday.com/hc/en-us/articles/27560733058706-Required-columns) which simply mark a column as mandatory, validation rules support comparison operators, value ranges, and conditional logic. For an overview of the feature in the monday.com UI, see [Data validations](https://support.monday.com/hc/en-us/articles/29863034416786-Data-validations).

This guide walks you through the validation rules API from basic constraints to conditional rules. By the end, you'll be able to programmatically enforce business rules like "amounts must be at least 5" or "if the status is Done, the description must be filled in."

# Key concepts

## How validation rules work

A validation rule has two parts:

| Part   | Required | Description                                                                                                           |
| :----- | :------- | :-------------------------------------------------------------------------------------------------------------------- |
| `then` | Yes      | The constraint that must be satisfied. Defines what the column value should look like.                                |
| `if`   | No       | A condition that triggers the rule. When provided, the `then` constraint only applies when the `if` condition is met. |

Rules without an `if` clause are **validation rules** — they always apply. Rules with an `if` clause are **conditional rules** — they only apply when the condition is met.

## Enforcement

Validation rules are enforced both in the **monday.com interface** and through the **API**. When you create or update items via mutations like `create_item`, `change_simple_column_value`, or `change_column_values`, the API checks active validation rules and rejects requests that violate them with a `DATA_VALIDATIONS_ERROR` error (422 status code).

The error response includes details about which columns failed validation:

```json JSON
{
  "errors": [
    {
      "message": "data_validation_error",
      "extensions": {
        "code": "DATA_VALIDATIONS_ERROR",
        "status_code": 422,
        "error_data": [
          {
            "itemId": null,
            "columnIds": ["numeric_mm1pddwd"],
            "message": "'Amount' must be at least [5]"
          }
        ]
      }
    }
  ]
}
```

## Relationship to required columns

Validation rules and required columns are separate features that coexist on the same board:

* **Required columns** (`add_required_column` / `remove_required_column`) mark a column as mandatory. The column must have a value, but there's no constraint on *what* that value is.
* **Validation rules** (`create_validation_rule` / `update_validation_rule` / `delete_validation_rule`) define constraints on *what* values are acceptable.

Both appear in the `validations` query response — required columns in `required_column_ids` and rules in `rules`.

# Prerequisites

* [API authentication token](https://developer.monday.com/api-reference/docs/authentication)
* A board ID (find it in the URL: `monday.com/boards/{board_id}`)
* Familiarity with the column IDs on your board (query `boards` → `columns` → `id`)
* Requests must include the `API-Version: 2026-07` header
* **Pro or Enterprise** monday.com account

# Creating your first rule

## Validation rule

Let's create a rule that requires a status column to be one of two specific values (label indices `1` and `2`):

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

The response includes the generated rule ID:

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

**Key things to note:**

* The `then` clause requires an `operator` (`AND` or `OR`) and a `groups` array of constraints
* Each constraint targets a `column_id` with a comparison `operator` and optional `compare_value`
* Validation rules (without an `if` clause) return `null` for the `if` field
* The returned `id` is a UUID you'll use for updates and deletes

## Numeric constraint

Require a numbers column to be at least 5:

```graphql GraphQL
mutation {
  create_validation_rule(
    id: 1234567890,
    type: board,
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
    then
  }
}
```

## Date range constraint

Require a date column to fall within a specific range:

```graphql GraphQL
mutation {
  create_validation_rule(
    id: 1234567890,
    type: board,
    rule: {
      then: {
        operator: AND,
        groups: [{
          operator: BETWEEN,
          column_id: "date0",
          compare_value: ["2026-01-01", "2026-12-31"]
        }]
      }
    }
  ) {
    id
    then
  }
}
```

## Text constraint

Require a text column to contain a specific substring:

```graphql GraphQL
mutation {
  create_validation_rule(
    id: 1234567890,
    type: board,
    rule: {
      then: {
        operator: AND,
        groups: [{
          operator: CONTAINS_TEXT,
          column_id: "text0",
          compare_value: ["REQ-"]
        }]
      }
    }
  ) {
    id
    then
  }
}
```

# Conditional rules

Conditional rules use an `if` clause to gate when the `then` constraint applies. This lets you build logic like "if the status is Done, then the description must be filled in."

## Basic conditional rule

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

> 👍 **IS\_NOT\_EMPTY in conditional rules**
>
> The `IS_NOT_EMPTY` operator is only available inside conditional rules (rules with an `if` clause). It cannot be used in standalone validation rules. You can use it in both the `if` and `then` clauses — for example, to trigger a rule when one column is not empty, or to require a column to have a value when a condition is met.

## Multiple then constraints

Conditional rules can enforce multiple constraints at once. If a condition is met, require both a numbers column and a date column to be filled:

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
          column_id: "priority",
          compare_value: [1]
        }]
      },
      then: {
        operator: AND,
        groups: [
          {
            operator: IS_NOT_EMPTY,
            column_id: "numbers0"
          },
          {
            operator: IS_NOT_EMPTY,
            column_id: "date0"
          }
        ]
      }
    }
  ) {
    id
    if
    then
  }
}
```

# Updating and deleting rules

## Update a rule

Use `update_validation_rule` with the rule's ID. You must provide the full rule definition — partial updates are not supported:

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
          compare_value: [10]
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

## Delete a rule

```graphql GraphQL
mutation {
  delete_validation_rule(
    id: 1234567890,
    type: board,
    rule_id: "cd7f1b7b-452e-40d3-886c-346184ffee7e"
  ) {
    id
  }
}
```

The mutation returns the deleted rule's data.

# Reading validation rules

Query the `validations` endpoint to see all validation rules and required columns on a board:

```graphql GraphQL
query {
  validations(id: 1234567890) {
    required_column_ids
    rules
  }
}
```

The `rules` field returns a JSON object where each key is a rule ID and each value is the rule definition:

```json JSON
{
  "data": {
    "validations": {
      "required_column_ids": null,
      "rules": {
        "80d2c9d3-c93d-40be-9d34-b611241345b5": {
          "then": {
            "operator": "AND",
            "groups": [{
              "operator": "GREATER_THAN_OR_EQUALS",
              "column_id": "numbers0",
              "compare_value": [5]
            }]
          }
        },
        "31933592-171a-47ae-93a5-7a1c214fc9a3": {
          "if": {
            "operator": "AND",
            "groups": [{
              "operator": "ANY_OF",
              "column_id": "status",
              "compare_value": [1]
            }]
          },
          "then": {
            "operator": "AND",
            "groups": [{
              "operator": "IS_NOT_EMPTY",
              "column_id": "text0",
              "compare_value": []
            }]
          }
        }
      }
    }
  }
}
```

> 📘 NOTE
>
> In the query response, conditional rules include both `if` and `then` keys. Validation rules (without a condition) only have a `then` key (the `if` key is absent, not `null`). This differs from the mutation response where `if` is explicitly `null`.

# Supported operators by column type

Operator support varies significantly by **clause type** (plain rules vs. conditional IF vs. conditional THEN). Not all operators work with all column types. Review the tables below for your specific use case.

## Plain validation rules (no `if` clause)

Plain rules support the most limited operator set. A column can have only ONE plain rule with ONE constraint:

| Column Type                                                                                                                                        | Supported Operators                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `status`                                                                                                                                           | `ANY_OF`, `NOT_ANY_OF`                                                                                 |
| `dropdown`                                                                                                                                         | `ANY_OF`, `NOT_ANY_OF`                                                                                 |
| `rating`                                                                                                                                           | `ANY_OF`, `NOT_ANY_OF`                                                                                 |
| `numbers`                                                                                                                                          | `NOT_EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`            |
| `date`                                                                                                                                             | `NOT_EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `BETWEEN` |
| `text`                                                                                                                                             | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `long_text`                                                                                                                                        | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `email`                                                                                                                                            | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `phone`                                                                                                                                            | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `link`                                                                                                                                             | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `country`                                                                                                                                          | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `checkbox`, `people`, `timeline`, `location`, `week`, `hour`, `tags`, `file`, `world_clock`, `vote`, `color_picker`, `time_tracking`, `dependency` | *(no operators supported)*                                                                             |

## Conditional rules: IF clause

The `if` clause triggers the rule. It supports a subset of operators:

| Column Type                                                                                          | Supported Operators                                                                                                              |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                             | `ANY_OF`, `NOT_ANY_OF`, `IS_NOT_EMPTY`                                                                                           |
| `dropdown`                                                                                           | `ANY_OF`, `NOT_ANY_OF`, `IS_NOT_EMPTY`                                                                                           |
| `rating`                                                                                             | `ANY_OF`, `NOT_ANY_OF`, `IS_NOT_EMPTY`                                                                                           |
| `numbers`                                                                                            | `EQUALS`, `NOT_EQUALS`, `IS_NOT_EMPTY`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`            |
| `date`                                                                                               | `EQUALS`, `NOT_EQUALS`, `IS_NOT_EMPTY`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `BETWEEN` |
| `text`                                                                                               | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `long_text`                                                                                          | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `email`                                                                                              | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `phone`                                                                                              | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `link`                                                                                               | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `country`                                                                                            | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                                         |
| `checkbox`                                                                                           | `IS_NOT_EMPTY`                                                                                                                   |
| `people`                                                                                             | `IS_NOT_EMPTY`                                                                                                                   |
| `timeline`                                                                                           | `IS_NOT_EMPTY`                                                                                                                   |
| `location`                                                                                           | `IS_NOT_EMPTY`                                                                                                                   |
| `week`, `hour`, `tags`, `file`, `world_clock`, `vote`, `color_picker`, `time_tracking`, `dependency` | *(no operators supported)*                                                                                                       |

## Conditional rules: THEN clause

The `then` clause enforces the constraint when the condition is met. It has broader operator support:

| Column Type                                                                                          | Supported Operators                                                                                                    |
| :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                             | `ANY_OF`, `NOT_ANY_OF`, `IS_EMPTY`, `IS_NOT_EMPTY`                                                                     |
| `dropdown`                                                                                           | `ANY_OF`, `NOT_ANY_OF`, `IS_EMPTY`, `IS_NOT_EMPTY`                                                                     |
| `rating`                                                                                             | `ANY_OF`, `NOT_ANY_OF`, `IS_NOT_EMPTY`                                                                                 |
| `numbers`                                                                                            | `EQUALS`, `NOT_EQUALS`, `IS_NOT_EMPTY`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`  |
| `date`                                                                                               | `NOT_EQUALS`, `IS_NOT_EMPTY`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `BETWEEN` |
| `text`                                                                                               | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `long_text`                                                                                          | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `email`                                                                                              | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `phone`                                                                                              | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `link`                                                                                               | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `country`                                                                                            | `IS_NOT_EMPTY`, `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                               |
| `checkbox`                                                                                           | `IS_EMPTY`, `IS_NOT_EMPTY`                                                                                             |
| `people`                                                                                             | `IS_EMPTY`, `IS_NOT_EMPTY`                                                                                             |
| `timeline`                                                                                           | `IS_NOT_EMPTY`                                                                                                         |
| `location`                                                                                           | `IS_NOT_EMPTY`                                                                                                         |
| `week`, `hour`, `tags`, `file`, `world_clock`, `vote`, `color_picker`, `time_tracking`, `dependency` | *(no operators supported)*                                                                                             |

> 📘 **BETWEEN on numbers**
>
> The `BETWEEN` operator is NOT supported on `numbers` columns in any clause. It is only supported on `date` columns.

# Constraints and limitations

| Constraint                           | Description                                                                                                                                                                                                     |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One plain rule per column            | A column can have **at most one** validation rule without an `if` clause. Attempting to add a second plain rule fails with "A column can have only one non-conditional rule".                                   |
| One constraint per plain rule        | Validation rules (without an `if` clause) must have **exactly one** constraint in the `then` clause. Multiple constraints are not allowed.                                                                      |
| Multiple constraints per conditional | Conditional rules (with an `if` clause) can have **multiple** constraints in the `then` clause, combined with `AND` or `OR`. The `if` clause must have **exactly one** constraint.                              |
| No mixing rule types                 | A column cannot have both a plain validation rule AND a conditional rule. Attempting to add both fails with "A column cannot have both conditional and non-conditional rules".                                  |
| Pro/Enterprise only                  | Validation rules require a Pro or Enterprise plan. Free/Standard accounts get `UserUnauthorizedException` with failure reason mentioning "data\_validation\_rules" or "required\_columns".                      |
| Enforced in UI and API               | Rules are enforced in both the monday.com UI and via the API. API requests that violate rules return a `DATA_VALIDATIONS_ERROR` (422 status code) with details about which columns failed.                      |
| Required-capable vs rule-capable     | A column can be marked required but may not support any validation rules (e.g., `timeline`, `location`). See [Required columns](#required-columns) and [Operator support](#supported-operators-by-column-type). |

# Compare value formats

The `compare_value` array format varies by column type and operator. Follow these rules precisely — the API is strict about format:

## Label-based operators (status, dropdown, rating)

Use **label indices** (integers), not label names:

```graphql
# ✅ DO: Use label index
compare_value: [1, 2]

# ❌ DON'T: Use label name
compare_value: ["Done", "In Progress"]
```

## Numeric values

Use a single number for comparison, two numbers for `BETWEEN` (not supported on numbers):

| Operator                                                                                              | compare\_value | Notes                |
| :---------------------------------------------------------------------------------------------------- | :------------- | :------------------- |
| `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `EQUALS`, `NOT_EQUALS` | `[5]`          | Single numeric value |

## Date and timeline values

**Critical:** Date comparisons require a specific format depending on the operator:

| Operator                                                                                    | compare\_value                 | Notes                                                              |
| :------------------------------------------------------------------------------------------ | :----------------------------- | :----------------------------------------------------------------- |
| `BETWEEN`                                                                                   | `["2026-01-01", "2026-12-31"]` | Two date strings in `YYYY-MM-DD`, no `EXACT` prefix                |
| `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `NOT_EQUALS` | `["EXACT", "2026-01-01"]`      | **Required:** Prefix with `"EXACT"`, then the date in `YYYY-MM-DD` |
| `EQUALS`                                                                                    | `["EXACT", "2026-01-01"]`      | Same as other comparisons — prefix with `"EXACT"`                  |

**Timeline columns** follow the same format as date columns.

## Text-based operators

Use a single string value:

| Operator                                                 | compare\_value    | Notes               |
| :------------------------------------------------------- | :---------------- | :------------------ |
| `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT` | `["search term"]` | Single string value |

## Empty/non-empty operators

Omit `compare_value` or pass an empty array:

| Operator                   | compare\_value   |
| :------------------------- | :--------------- |
| `IS_EMPTY`, `IS_NOT_EMPTY` | *(omit)* or `[]` |

# Required columns

Required columns mark a field as mandatory but do **not** enforce constraints on the column value. A column can be marked required but still allow any value.

## Column types that support required

The following 14 column types can be marked as required using `add_required_column`:

* `status`, `dropdown`, `numbers`, `date`, `timeline`, `people`, `text`, `long_text`, `email`, `phone`, `link`, `rating`, `country`, `location`

## Column types that DO NOT support required

The following column types cannot be marked as required (API returns "Column ids are unsupported due to their types"):

* `checkbox`, `week`, `hour`, `tags`, `file`, `world_clock`, `vote`, `color_picker`, `time_tracking`, `dependency`, `button`, `formula`, `mirror`, `lookup`, `auto_number`, `integration`, `doc`, `progress`, `subtasks`, `vote`

## Required-capable but rule-incapable columns

Some columns can be marked required but do **not** support any validation rules:

* `timeline` — can be required, but rejects all operators in plain, IF, and THEN clauses
* `location` — can be required, but rejects all operators in plain, IF, and THEN clauses

# Error handling

## Data validation errors

When an API mutation violates a validation rule, the response includes a `422` status code and a `DATA_VALIDATIONS_ERROR` code:

```json
{
  "errors": [
    {
      "message": "data_validation_error",
      "extensions": {
        "code": "DATA_VALIDATIONS_ERROR",
        "status_code": 422,
        "error_data": [
          {
            "itemId": null,
            "columnIds": ["numeric_mm1pddwd"],
            "message": "'Amount' must be at least [5]"
          },
          {
            "itemId": null,
            "columnIds": ["text_mm1pecmq"],
            "message": "'Description' must not be empty"
          }
        ]
      }
    }
  ]
}
```

**Important:** The `error_data` field is an **array**, not a single object. Multiple columns can fail validation in a single request — iterate through the array to handle all failures.

## Plan gating errors

Accounts without Pro/Enterprise plan receive `UserUnauthorizedException`:

```json
{
  "errors": [
    {
      "message": "UserUnauthorizedException",
      "extensions": {
        "error_data": {
          "failure_reason": "ms-authorization.permissions.data_validation_rules.not_available"
        }
      }
    }
  ]
}
```

## Null validations query

The `validations` query returns `null` for `rules` in two scenarios:

1. **No rules configured** on the board
2. **Feature unavailable** (Free/Standard tier, feature restricted to Pro/Enterprise)

Since these are indistinguishable, your code cannot determine if `null` means "no rules" or "account lacks access". You may need to check the account plan separately.

# Next steps

* **[Validations reference](https://developer.monday.com/api-reference/reference/validations)** — Full query and mutation documentation
* **[Validations other types](https://developer.monday.com/api-reference/reference/validations-other-types)** — Input types, enums, and operator details
* **[Columns reference](https://developer.monday.com/api-reference/reference/columns)** — Column types and IDs

If you have questions, post them in the [monday developer community](https://community.monday.com/c/developers/8).
