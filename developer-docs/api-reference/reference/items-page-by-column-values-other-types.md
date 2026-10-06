---
updatedAt: 2026-09-06T08:36:01.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the items page by column values API

The monday.com [items page by column values](https://developer.monday.com/api-reference/reference/items-page-by-column-values) APIs enable you to read items based on predefined column values.

The type below is used by the items page by column values query and is not independently queryable.

# ItemsPageByColumnValuesQuery

An object containing the fields used to filter items by specific column values.

| Field          | Type        | Description                                            |
| :------------- | :---------- | :----------------------------------------------------- |
| column\_id     | `String!`   | The IDs of the specific columns to return results for. |
| column\_values | `[String]!` | The column values to filter items by.                  |
