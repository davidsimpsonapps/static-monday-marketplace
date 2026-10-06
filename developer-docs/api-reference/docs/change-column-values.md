---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Changing column values

Every monday.com board has one or more columns, each of which holds a particular piece of information. Each column has a certain type, and different column types expect a different set of parameters to update their values.

You will most likely need to change item column values in two scenarios: when updating the value of an item using the `change_column_value()` mutation, or when setting the initial values of an item using the `create_item()` mutation.

## JSON vs. Strings Formatting

To update a column value, you should send either a JSON-formatted string or simple string in your mutation.

While all of the columns supported by our API will accept `JSON` formatting, not all of these columns will accept `String` formatting as well.

When sending data to a particular column, use a JSON-formatted string (if you’re using Javascript, you can use `JSON.stringify()` to convert a JSON object into a string).

## Changing a Single Column Value

To change a single column value, utilize either the `change_simple_column_value()` or the `change_column_value()` methods.

Depending on which column type's value you're attempting to change, it will necessitate a different method to use. Some columns will only accept `JSON` values, while others will accept both `Strings` and `JSON` values.

## Changing Multiple Column Values

In addition to changing a simple column's values, you are also able to change multiple columns' values using the `change_multiple_column_values()` mutation. This mutation allows you to update multiple column values of a specific Item (row).

Each column is of a certain type, and different column types expect a different set of parameters to update their values.

The `column_values` argument requires a JSON string (key-value pairs). The JSON string should have column IDs as keys, and the values you want to set as the values. For the values, you can use either a `String` value, or mix `String` and `JSON` values.

Here is an example of a `column_values` argument with a Text and a Status column using `String`:\
\{"text0": "New text", "status2": "Done"}.

Here is the same example of a `column_values` argument with a Text and a Status column using a combined `String` and `JSON` value:\
\{"text5": "New text", "status3": \{"label": "Done"}}.

In the second example, you can see that the Status column is sent a `JSON` value of \{"label": "Done"}, instead of the `String` value "Done" sent in the first example.

> 📘 NOTE
>
> Status columns also accept a `JSON` value with `"index"` (the label's numeric ID) instead of `"label"`. For example: \{"status3": \{"index": 1}}. Using the index is more reliable since label text can be changed by board admins. See the [status column reference](https://developer.monday.com/api-reference/docs/status) for details.

## Setting Column Values upon Item Creation

Much like setting column values with the `change_column_value()`, the `change_simple_column_value()`, and the `change_multiple_column_values()`, setting column values upon item creation involves sending `JSON` values.

## Removing Column Values

To remove a column value (i.e. delete an existing column value), send either an empty string for Text and Number columns, or send an empty object for columns that accept JSON values.

**Raw JSON (use this in your column values variables):** `JSON.stringify({});`

**JSON string (use this in the GraphiQL editor):** `"{}"`

```graphql GraphQL
mutation {
  change_simple_column_value(item_id: 123456789, board_id: 11223344, column_id: "text", value: "") {
    id
  }
}
```

```graphql GraphQL
mutation {
  change_column_value(item_id: 123456789, board_id: 11223344, column_id: "email", value: "{}") {
    id
  }
}
```

> 📘 NOTE
>
> Removing the column value of a **File column** requires explicitly setting the `clear_all` flag as this action cannot be undone.
>
> **Raw JSON (use this in your column values variables):**\
> `JSON.stringify({
>   "clear_all": true
> });`
>
> **JSON string (use this in the GraphiQL editor):** `"{\"clear_all\":true}"`

## Do you have questions?

Join our [developer community](https://community.monday.com/c/developers/8)! You can share your questions and learn from fellow users and monday.com product experts.

Don’t forget to search before opening a new topic!
