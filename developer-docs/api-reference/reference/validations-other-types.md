---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the validations APIs

The monday.com [validations](https://developer.monday.com/api-reference/reference/validations) APIs enable you to create, read, and delete required field columns and validation rules on monday.com boards.

The types below are used by the validations queries and mutations, and are not independently queryable.

# RequiredColumns

An object containing the required columns on a board. Returned by the `add_required_column` and `remove_required_column` mutations.

| Field                 | Type        | Description                                                  |
| :-------------------- | :---------- | :----------------------------------------------------------- |
| required\_column\_ids | `[String!]` | An array of the unique identifiers for the required columns. |

***

# ValidationRule

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An object representing a single validation rule on a board. Returned by the `create_validation_rule`, `update_validation_rule`, and `delete_validation_rule` mutations.

| Field | Type   | Description                                                                                                                                                                           |
| :---- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id    | `ID`   | The unique identifier of the validation rule (UUID format).                                                                                                                           |
| then  | `JSON` | The constraint clause that must be satisfied. Always present. Contains an `operator` (`AND`/`OR`) and a `groups` array of rule constraints.                                           |
| if    | `JSON` | The condition clause that triggers the rule. Returns `null` for validation rules (without a condition). Contains an `operator` (`AND`/`OR`) and a `groups` array of rule constraints. |

***

# ValidationRuleInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An input object used to define a validation rule when creating or updating one.

| Field | Type                                                                                                     | Description                                                                                      |
| :---- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| then  | [`GroupInput!`](https://developer.monday.com/api-reference/reference/validations-other-types#groupinput) | The constraint clause. Defines what conditions must be met. Required.                            |
| if    | [`GroupInput`](https://developer.monday.com/api-reference/reference/validations-other-types#groupinput)  | The condition clause. When provided, the rule only applies when this condition is met. Optional. |

***

# GroupInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An input object representing a group of rule constraints combined by a logical operator. Used in both the `if` and `then` clauses of a validation rule.

| Field    | Type                                                                                                                          | Description                                                     |
| :------- | :---------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| operator | [`GroupOperator`](https://developer.monday.com/api-reference/reference/validations-other-types#groupoperator)                 | The logical operator combining the constraints. Default: `AND`. |
| groups   | [`[RuleConstraintInput!]!`](https://developer.monday.com/api-reference/reference/validations-other-types#ruleconstraintinput) | An array of individual column constraints. Required.            |

***

# RuleConstraintInput

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An input object defining a single constraint on a column value.

| Field              | Type                                                                                                         | Description                                                                                                                                         |
| :----------------- | :----------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| operator           | [`RuleOperator!`](https://developer.monday.com/api-reference/reference/validations-other-types#ruleoperator) | The comparison operator for this constraint. Required.                                                                                              |
| column\_id         | `String!`                                                                                                    | The unique identifier of the column to validate. Required.                                                                                          |
| compare\_value     | `[CompareValue!]`                                                                                            | The value(s) to compare against. The format depends on the column type and operator. Not required for operators like `IS_EMPTY` and `IS_NOT_EMPTY`. |
| compare\_attribute | `String`                                                                                                     | An optional attribute specifying how to interpret the compare value (e.g., `"DATE"` for date columns).                                              |

***

# GroupOperator

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An enum defining how multiple constraints within a group are combined.

| Enum Value | Description                                      |
| :--------- | :----------------------------------------------- |
| `AND`      | All conditions in the group must be met.         |
| `OR`       | At least one condition in the group must be met. |

***

# RuleOperator

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

An enum defining the comparison operators available for rule constraints. **Not all operators are supported for all column types or rule types.** Operator availability varies dramatically:

* **Plain rules** (no `if` clause) support the most limited set
* **Conditional IF clauses** support intermediate operators
* **Conditional THEN clauses** support the broadest set (including `IS_EMPTY`)

See the [validation rules guide](https://developer.monday.com/api-reference/docs/validation-rules-guide#supported-operators-by-column-type) for the complete supported operator matrix by column type and clause type.

| Enum Value               | Description                                            | Clause Context                                                                       |
| :----------------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `ANY_OF`                 | Value matches any of the specified values.             | Plain, IF, THEN; works with `status`, `dropdown`, `rating`                           |
| `NOT_ANY_OF`             | Value does not match any of the specified values.      | Plain, IF, THEN; works with `status`, `dropdown`, `rating`                           |
| `EQUALS`                 | Value equals the specified value.                      | IF clause only (not in plain or THEN); works with `numbers`, `date`                  |
| `NOT_EQUALS`             | Value does not equal the specified value.              | Plain, IF, THEN; works with `numbers`, `date`                                        |
| `IS_EMPTY`               | Value is empty or not set.                             | THEN clause only; works with `status`, `dropdown`, `checkbox`, `people`              |
| `IS_NOT_EMPTY`           | Value is not empty.                                    | IF and THEN clauses only (not in plain rules); supported across many column types    |
| `GREATER_THAN`           | Value is greater than the specified value.             | Plain, IF, THEN; works with `numbers`, `date`                                        |
| `GREATER_THAN_OR_EQUALS` | Value is greater than or equal to the specified value. | Plain, IF, THEN; works with `numbers`, `date`                                        |
| `LOWER_THAN`             | Value is lower than the specified value.               | Plain, IF, THEN; works with `numbers`, `date`                                        |
| `LOWER_THAN_OR_EQUAL`    | Value is lower than or equal to the specified value.   | Plain, IF, THEN; works with `numbers`, `date`                                        |
| `CONTAINS_TEXT`          | Value contains the specified text.                     | Plain, IF, THEN; works with `text`, `long_text`, `email`, `phone`, `link`, `country` |
| `NOT_CONTAINS_TEXT`      | Value does not contain the specified text.             | Plain, IF, THEN; works with `text`, `long_text`, `email`, `phone`, `link`, `country` |
| `STARTS_WITH_TEXT`       | Value starts with the specified text.                  | Plain, IF, THEN; works with `text`, `long_text`, `email`, `phone`, `link`, `country` |
| `BETWEEN`                | Value is between two specified values (inclusive).     | Plain, IF, THEN; works with `date` only (NOT supported on `numbers`)                 |

***

# CompareValue

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

A custom scalar that accepts either a string or number value for comparison. The expected format depends on the column type and operator. **Format is strict** — the API rejects misformatted compare values.

## Format by column type and operator

| Column Type                                              | Operator                                                                                              | Example `compare_value`        | Notes                                                           |
| :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------------- |
| `status`                                                 | `ANY_OF`, `NOT_ANY_OF`                                                                                | `[1, 2]`                       | Use **label indices** (integers), not label names               |
| `dropdown`                                               | `ANY_OF`, `NOT_ANY_OF`                                                                                | `[1, 2]`                       | Use **label indices** (integers), not label names               |
| `rating`                                                 | `ANY_OF`, `NOT_ANY_OF`                                                                                | `[4, 5]`                       | Rating values as integers                                       |
| `numbers`                                                | `NOT_EQUALS`, `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`           | `[5]`                          | Single numeric value                                            |
| `date`                                                   | `BETWEEN`                                                                                             | `["2026-01-01", "2026-12-31"]` | Two date strings in `YYYY-MM-DD`; NO `EXACT` prefix for BETWEEN |
| `date`                                                   | `GREATER_THAN`, `GREATER_THAN_OR_EQUALS`, `LOWER_THAN`, `LOWER_THAN_OR_EQUAL`, `NOT_EQUALS`, `EQUALS` | `["EXACT", "2026-01-01"]`      | **Required:** Prefix with `"EXACT"`, then date in `YYYY-MM-DD`  |
| `text`, `long_text`, `email`, `phone`, `link`, `country` | `CONTAINS_TEXT`, `NOT_CONTAINS_TEXT`, `STARTS_WITH_TEXT`                                              | `["search term"]`              | Single string value                                             |
| Any                                                      | `IS_EMPTY`, `IS_NOT_EMPTY`                                                                            | *(omit)* or `[]`               | No value needed                                                 |
| `timeline`                                               | *(same as date)*                                                                                      | `["EXACT", "2026-01-01"]`      | Timeline columns follow date format rules                       |

## Common mistakes

```graphql
# ❌ WRONG: Using label name instead of index
compare_value: ["Done"]

# ✅ CORRECT: Use label index
compare_value: [1]

# ❌ WRONG: Omitting EXACT prefix on date comparison
compare_value: ["2026-01-01"]

# ✅ CORRECT: Include EXACT prefix (except for BETWEEN)
compare_value: ["EXACT", "2026-01-01"]

# ❌ WRONG: Using EXACT prefix with BETWEEN
compare_value: ["EXACT", "2026-01-01", "EXACT", "2026-12-31"]

# ✅ CORRECT: BETWEEN uses plain dates without EXACT
compare_value: ["2026-01-01", "2026-12-31"]
```

***

# ValidationsEntityType

An enum defining the entity types that support validations.

| Enum Value | Description             |
| :--------- | :---------------------- |
| `board`    | Validations on a board. |
