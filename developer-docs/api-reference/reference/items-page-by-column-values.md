---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Items page by column values

Learn how to read items on monday boards based on predefined column values using the platform API

<Glossary>Items</Glossary> are core objects in the monday.com platform that hold the actual data within the board. To better illustrate the platform, imagine that each board is a table and an item is a single row in that table. Now take one row, fill it with whatever information you'd like, and you now have an item!

# Queries

## Get items page by column values

* **Required scope:`boards:read`**
* Returns an array containing metadata about one or a collection of specific items
* Can only be queried directly at the root; can't be nested within another query

The `items_page_by_column_values` object allows you to combine multiple column values by sending an array. Unless specified otherwise, most column values will be used with an `ANY_OF` operator and only return items with all of the specified column values.

The following code sample returns 50 items from board 1234567890 that have a text column value of "This is a text column" AND a country column value of either the United States or Israel.

```graphql GraphQL
query {
  items_page_by_column_values(
    limit: 50
    board_id: 1234567890
    columns: [
      {
        column_id: "text"
        column_values: ["This is a text column"]
      }
      {
        column_id: "country"
        column_values: ["US", "IL"]
      }
    ]
  ) {
    cursor
    items {
      id
      name
    }
  }
}
```

The query will also return a cursor value that represents the position in the data set after returning 50 items. You can then use that string value to return the next 50 relevant items in the data set using the [`next_items_page`](https://developer.monday.com/api-reference/docs/items_page#cursor-based-pagination-using-next_items_page) object. After returning the next cursor value, you can continue paginating through the entire data set.

```graphql GraphQL
query {
  next_items_page(
    cursor: "MSw5NzI4MDA5MDAsaV9YcmxJb0p1VEdYc1VWeGlxeF9kLDg4MiwzNXw0MTQ1NzU1MTE5"
    limit: 50
  ) {
    cursor
    items {
      id
      name
    }
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The specific board ID to return items for.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        columns
      </td>

      <td>
        [`[ItemsPageByColumnValuesQuery!]`](https://developer.monday.com/api-reference/reference/other-types#items-page-by-column-values-query)
      </td>

      <td>
        One or more columns and their values to search by. You can't use `columns` and `cursor` in the same request. We recommend using `columns` for the initial request and `cursor` for paginated requests.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        cursor
      </td>

      <td>
        `String`
      </td>

      <td>
        An opaque token representing the position in the result set from which to resume fetching items. Use this to paginate through large result sets. You can't use `columns` and `cursor` in the same request. We recommend using `columns` for the initial request and `cursor` for paginated requests.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        hierarchy_scope_config
      </td>

      <td>
        `String`
      </td>

      <td>
        Controls how item hierarchy is handled when filtering results. Use
        `parentItems` (default) to include parent items related to a match,
        or `allItems` to return only items that directly match the filter.
      </td>

      <td>
        `allItems`  
        `parentItems`
      </td>
    </tr>

    <tr>
      <td>
        limit
      </td>

      <td>
        `Int!`
      </td>

      <td>
        The number of items to return. The default is 25, but the maximum is 500.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### Fields

| Field  | Type                                                                     | Description                                                                                                                                                                                                                      |
| :----- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cursor | `String`                                                                 | An opaque cursor that represents the position in the list after the last returned item. When paginating through items, use this cursor to fetch the next set of items. There are no more items to fetch if the cursor is `null`. |
| items  | [`[Item!]!`](https://developer.monday.com/api-reference/reference/items) | The items associated with the cursor.                                                                                                                                                                                            |

## Supported and unsupported columns

This object supports specific column types, while some only have limited support.

### Supported columns

The following columns are supported by `items_page_by_column_values` queries. Unless specified otherwise below, most columns accept either `""` or `null` value to return items with empty column values.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Column Type
      </th>

      <th>
        Notes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Checkbox
      </td>

      <td>
        Pass true (e.g. `["1", "t", "true"]`) or false (e.g. `["false", "f", null]`  value as a string. If you pass multiple values in the query, it will return results only for the **last** value.

        * _For example:_* `column_id: "check", column_values: ["1", "false", "f", "t"]` would return true values only.
      </td>
    </tr>

    <tr>
      <td>
        Country
      </td>

      <td>
        Pass the full name of the country as it appears in the UI as a string. You can also use the uppercase country code.

        * _For example:_* `{column_id: "country", column_values: [null, "United States", "IL"]}`
      </td>
    </tr>

    <tr>
      <td>
        Date
      </td>

      <td>
        Pass just **one** string value in ISO-2 format (YYYY-MM-DD) with or without the hour, but please note that querying by the hour is not supported.

        * _For example:_* `{column_id: "date", column_values: ["2023-08-01"]}`
      </td>
    </tr>

    <tr>
      <td>
        Dropdown
      </td>

      <td>
        Pass just **one** partial or whole string value to match the dropdown label.

        * _For example:_* `{column_id: "dropdown", column_values: ["y Labe"]}` or `{column_id: "dropdown", column_values: ["My Label"]}`
      </td>
    </tr>

    <tr>
      <td>
        Email
      </td>

      <td>
        Pass the display text (label) values as strings. Please note that this column performs an exact match of the **entire** label textual value.

        * _For example:_* `{column_id: "email", column_values: ["test@gmail.com", "test@monday.com", null]}` or `{column_id: "email", column_values: ["Home email", "Work email", ""]}`
      </td>
    </tr>

    <tr>
      <td>
        Hour
      </td>

      <td>
        Pass the 24-hour value with or without the colon or one of these predefined values as a string:

        <li>`MORNING` (6:00-12:00)</li><li>`AFTERNOON`(12:00-16:00)</li><li>`EVENING`(16:00-20:00)</li><li>`NIGHT`(20:00-6:00)</li>
        Please note that specifying an exact hour is only used to match the time to one of the predefined values. It **will not** return just the results with that specific value.**For example:** `{column_id: "hour", column_values: ["12:30", "EVENING", "0500", null]}` (returns all items in the afternoon, evening, or morning time ranges or those with empty values)
      </td>
    </tr>

    <tr>
      <td>
        Link
      </td>

      <td>
        Pass either the link or label value as it appears in the UI as a string. If there is both a link and label, use the label value.

        * _For example:_* `{column_id: "link", column_values: ["https://www.google.com", "Link 1"}`
      </td>
    </tr>

    <tr>
      <td>
        Long Text
      </td>

      <td>
        Pass the entire text value as a string. This column searches for an exact match of the entire text value.

        * _For example:_* `{column_id: "long_text", column_values: ["", "This is the entire value of a long text column. :)"]}`
      </td>
    </tr>

    <tr>
      <td>
        Numbers
      </td>

      <td>
        Pass the number value as a string.

        * _For example:_* `{column_id: "numbers", column_values: ["", "-42"]}`
      </td>
    </tr>

    <tr>
      <td>
        People
      </td>

      <td>
        Pass a user's display name or user ID as a string.

        * _For example:_* `{column_id: "people", column_values: ["565481", "Test user", null]}`
      </td>
    </tr>

    <tr>
      <td>
        Phone
      </td>

      <td>
        Pass an array of country names or codes as strings to return all of the properly formatted numbers corresponding to each country. You can also pass **one** full or partial number without any characters to return all items that contain the provided value.

        * _For example:_* `{column_id: "phone", column_values: ["US", null, "Israel"]}` or `{column_id: "phone", column_values: ["665"]}` (returns all items containing a phone number with 665)
      </td>
    </tr>

    <tr>
      <td>
        Status
      </td>

      <td>
        Pass the label text value as seen in the UI as a string.

        * _For example:_* `{column_id: "status", column_values: ["Done", "Working on it", null]}`
      </td>
    </tr>

    <tr>
      <td>
        Text
      </td>

      <td>
        Pass the entire text value as a string. This column searches for a case-insensitive match of the **entire** text value.

        * _For example:_* `{column_id: "text", column_values: ["This is a text column.", null]}`
      </td>
    </tr>

    <tr>
      <td>
        Timeline
      </td>

      <td>
        Pass just **one** string value in ISO-2 format (YYYY-MM-DD) to return an exact match for the timeline's start date.

        * _For example:_* `{column_id: "timeline", column_values: ["2023-07-01"]}` or `{column_id: "timeline", column_values: [""]}`
      </td>
    </tr>

    <tr>
      <td>
        World Clock
      </td>

      <td>
        Pass the label value as it appears in the UI as a string.

        * _For example:_* `{column_id: "world_clock", column_values: ["", "Central"]}`
      </td>
    </tr>
  </tbody>
</Table>

### Unsupported columns

The following columns are not supported by `items_page_by_column_values` queries. If you query an unsupported column, you will receive an error.

* Auto number
* Color picker
* Connect boards
* Creation log
* File
* Formula
* Item ID
* Last updated
* Location
* Mirror
* Rating
* Tags
* Time tracking
* Vote
