---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the batch extend trial period API

The monday.com [batch extend trial period](https://developer.monday.com/api-reference/reference/batch-extend-trial-period) API enables you to grant trial extensions to app users.

The types below are used by the batch extend trial period mutation and are not independently queryable.

# BatchExtendTrialPeriod

An object containing the result of batch extending trial periods.

| Field   | Type                                                                                                      | Description                                                                                                                                                                      |
| :------ | :-------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| details | [`[ExtendTrialPeriod!]`](https://developer.monday.com/api-reference/docs/other-types#extend-trial-period) | The details of the batch operation.                                                                                                                                              |
| reason  | `String`                                                                                                  | The reason the operation resulted in an error. **Please note** that this will return an empty string if the operation is successful.                                             |
| success | `Boolean!`                                                                                                | The result of the batch operation. **Please note** that when providing extensions to multiple account slugs, this will return `false` whenever even one of the operations fails. |

## ExtendTrialPeriod

An object containing details about a single operation from the batch.

| Field         | Type       | Description                                                                                                                        |
| :------------ | :--------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| account\_slug | `String!`  | The individual account slug.                                                                                                       |
| reason        | `String`   | The reason the single operation resulted in an error. **Please note** that this will return `null` if the operation is successful. |
| success       | `Boolean!` | The result of the single operation.                                                                                                |
