---
updatedAt: 2026-09-06T08:34:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Column Types

Browse the full list of monday.com column types, their API support levels, and implementation types for reading and writing column values

monday.com [boards](https://support.monday.com/hc/en-us/articles/115005466609-The-basics-of-columns) support a variety of column types, each designed to store specific kinds of data. The API lets you read, filter, create, update, and clear most column types, though some are read-only or unsupported.

Each column type has a dedicated reference page (linked below) with examples for querying, filtering, and mutating values. The tables on this page show every column type, its [implementation type](https://developer.monday.com/api-reference/docs/column-values-v2#implementations), and the [`ColumnType`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype) enum value used in the API.

***

# Reading column values

Column values are returned through the [`column_values`](https://developer.monday.com/api-reference/docs/column-values-v2) field on <Glossary>items</Glossary>. Each column type maps to a specific GraphQL implementation type (e.g., `StatusValue`, `TextValue`, `DropdownValue`). Use inline [fragments](https://graphql.org/learn/queries/#fragments) to access type-specific fields:

```graphql GraphQL
query {
  items(ids: [1234567890]) {
    column_values {
      ... on StatusValue {
        label
        index
      }
      ... on TextValue {
        text
        value
      }
    }
  }
}
```

All implementations share a common set of fields from the [`ColumnValue`](https://developer.monday.com/api-reference/docs/column-values-v2) interface: `id`, `text`, `type`, and `value`. Type-specific fields (like `label` on `StatusValue` or `url` on `LinkValue`) are only available through inline fragments.

***

# Supported columns

These column types support read operations through `column_values`, and most support write operations through [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) or [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values). See each column's reference page for details on supported operations.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column title
      </th>

      <th style={{ textAlign: "left" }}>
        Implementation
      </th>

      <th style={{ textAlign: "left" }}>
        Column type
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        [Button](https://developer.monday.com/api-reference/docs/button)
      </td>
      <td style={{ textAlign: "left" }}>
        `ButtonValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `button`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Checkbox](https://developer.monday.com/api-reference/docs/checkbox)
      </td>
      <td style={{ textAlign: "left" }}>
        `CheckboxValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `checkbox`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Color picker](https://developer.monday.com/api-reference/docs/color-picker)
      </td>
      <td style={{ textAlign: "left" }}>
        `ColorPickerValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `color_picker`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Connect boards](https://developer.monday.com/api-reference/docs/connect)
      </td>
      <td style={{ textAlign: "left" }}>
        `BoardRelationValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `board_relation`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Country](https://developer.monday.com/api-reference/docs/country)
      </td>
      <td style={{ textAlign: "left" }}>
        `CountryValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `country`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Date](https://developer.monday.com/api-reference/docs/date)
      </td>
      <td style={{ textAlign: "left" }}>
        `DateValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `date`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Dependency](https://developer.monday.com/api-reference/docs/dependency)
      </td>
      <td style={{ textAlign: "left" }}>
        `DependencyValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `dependency`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Dropdown](https://developer.monday.com/api-reference/docs/dropdown)
      </td>
      <td style={{ textAlign: "left" }}>
        `DropdownValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `dropdown`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Email](https://developer.monday.com/api-reference/docs/email)
      </td>
      <td style={{ textAlign: "left" }}>
        `EmailValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `email`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Files](https://developer.monday.com/api-reference/docs/assets)
      </td>
      <td style={{ textAlign: "left" }}>
        `FileValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `file`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Hour](https://developer.monday.com/api-reference/docs/hour)
      </td>
      <td style={{ textAlign: "left" }}>
        `HourValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `hour`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Link](https://developer.monday.com/api-reference/docs/link)
      </td>
      <td style={{ textAlign: "left" }}>
        `LinkValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `link`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Location](https://developer.monday.com/api-reference/docs/location)
      </td>
      <td style={{ textAlign: "left" }}>
        `LocationValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `location`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Long text](https://developer.monday.com/api-reference/docs/long-text)
      </td>
      <td style={{ textAlign: "left" }}>
        `LongTextValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `long_text`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [monday doc](https://developer.monday.com/api-reference/docs/document)
      </td>
      <td style={{ textAlign: "left" }}>
        `DocValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `doc`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Name](https://developer.monday.com/api-reference/docs/item-name)
      </td>
      <td style={{ textAlign: "left" }}>
      </td>
      <td style={{ textAlign: "left" }}>
        `name`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Numbers](https://developer.monday.com/api-reference/docs/number)
      </td>
      <td style={{ textAlign: "left" }}>
        `NumbersValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `numbers`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [People](https://developer.monday.com/api-reference/docs/people)
      </td>
      <td style={{ textAlign: "left" }}>
        `PeopleValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `people`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Phone](https://developer.monday.com/api-reference/docs/phone)
      </td>
      <td style={{ textAlign: "left" }}>
        `PhoneValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `phone`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Rating](https://developer.monday.com/api-reference/docs/rating)
      </td>
      <td style={{ textAlign: "left" }}>
        `RatingValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `rating`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Status](https://developer.monday.com/api-reference/docs/status)
      </td>
      <td style={{ textAlign: "left" }}>
        `StatusValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `status`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Subitems](https://developer.monday.com/api-reference/docs/subitems-column)
      </td>
      <td style={{ textAlign: "left" }}>
        `SubtasksValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `subtasks`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Tags](https://developer.monday.com/api-reference/docs/tags)
      </td>
      <td style={{ textAlign: "left" }}>
        `TagsValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `tags`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Text](https://developer.monday.com/api-reference/docs/text)
      </td>
      <td style={{ textAlign: "left" }}>
        `TextValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `text`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Timeline](https://developer.monday.com/api-reference/docs/timeline)
      </td>
      <td style={{ textAlign: "left" }}>
        `TimelineValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `timeline`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Time tracking](https://developer.monday.com/api-reference/docs/time-tracking-1)
      </td>
      <td style={{ textAlign: "left" }}>
        `TimeTrackingValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `time_tracking`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Vote](https://developer.monday.com/api-reference/docs/vote)
      </td>
      <td style={{ textAlign: "left" }}>
        `VoteValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `vote`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Week](https://developer.monday.com/api-reference/docs/week)
      </td>
      <td style={{ textAlign: "left" }}>
        `WeekValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `week`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [World clock](https://developer.monday.com/api-reference/docs/world-clock)
      </td>
      <td style={{ textAlign: "left" }}>
        `WorldClockValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `world_clock`
      </td>
    </tr>
  </tbody>
</Table>

***

# Read-only columns

These columns return values through the API but cannot be written to. Their data is auto-generated or derived from other columns.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Column title
      </th>

      <th style={{ textAlign: "left" }}>
        Implementation
      </th>

      <th style={{ textAlign: "left" }}>
        Column type
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        [Creation log](https://developer.monday.com/api-reference/docs/creation-log)
      </td>
      <td style={{ textAlign: "left" }}>
        `CreationLogValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `creation_log`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Formula](https://developer.monday.com/api-reference/docs/formula)
      </td>
      <td style={{ textAlign: "left" }}>
        `FormulaValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `formula`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Item ID](https://developer.monday.com/api-reference/docs/item-id)
      </td>
      <td style={{ textAlign: "left" }}>
        `ItemIdValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `item_id`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Last updated](https://developer.monday.com/api-reference/docs/last-updated)
      </td>
      <td style={{ textAlign: "left" }}>
        `LastUpdatedValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `last_updated`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Mirror](https://developer.monday.com/api-reference/docs/mirror)
      </td>
      <td style={{ textAlign: "left" }}>
        `MirrorValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `mirror`
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        [Progress tracking](https://developer.monday.com/api-reference/docs/progress-tracking)
      </td>
      <td style={{ textAlign: "left" }}>
        `ProgressValue`
      </td>
      <td style={{ textAlign: "left" }}>
        `progress`
      </td>
    </tr>
  </tbody>
</Table>

***

# Calculated columns

These columns are computed at render time and are not accessible through the `column_values` API.

| Column title                                                                 | Column type   |
| :--------------------------------------------------------------------------- | :------------ |
| [Auto number](https://developer.monday.com/api-reference/docs/auto-number-1) | `auto_number` |

***

# Deprecated columns

These column types have been deprecated. They remain accessible via the API for backwards compatibility, but you should use the recommended replacement.

| Column title                                                     | Implementation | Column type | Replacement                                                      |
| :--------------------------------------------------------------- | :------------- | :---------- | :--------------------------------------------------------------- |
| [Person](https://developer.monday.com/api-reference/docs/person) | `PersonValue`  | `person`    | [People](https://developer.monday.com/api-reference/docs/people) |
| [Team](https://developer.monday.com/api-reference/docs/team)     | `TeamValue`    | `team`      | [People](https://developer.monday.com/api-reference/docs/people) |

***

# Other column types

The following column types exist in the API schema but have limited or no direct API support for reading and writing values.

| Column title                                                               | Implementation     | Column type   | Notes                                                   |
| :------------------------------------------------------------------------- | :----------------- | :------------ | :------------------------------------------------------ |
| [Integration](https://developer.monday.com/api-reference/docs/integration) | `IntegrationValue` | `integration` | Managed by integrations; values cannot be set directly. |

***

# Creating columns

You can create new columns on a board using the generic [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-column) mutation, which works for any column type. Pass the column type as the `column_type` argument.

For **status** and **dropdown** columns, the API also provides typed mutations with strongly typed settings:

* [`create_status_column`](https://developer.monday.com/api-reference/reference/columns#create-status-column) — create a status column with label and color configuration
* [`create_dropdown_column`](https://developer.monday.com/api-reference/reference/columns#create-dropdown-column) — create a dropdown column with predefined options

***

# Updating column values

You can update column values using one of two mutations:

* [`change_simple_column_value`](https://developer.monday.com/api-reference/reference/columns#change-simple-column-value) — accepts a string value for the column
* [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) — accepts a JSON object to update one or more columns at once

The expected format varies by column type. See each column's reference page for the specific value format and examples.

***

# Filtering by column values

You can filter items by column values using [`items_page`](https://developer.monday.com/api-reference/reference/items-page) with `query_params`. Each column type supports a specific set of filter operators (e.g., `any_of`, `contains_text`, `greater_than`). See each column's reference page for supported operators and compare value formats.

```graphql GraphQL
query {
  boards(ids: [1234567890]) {
    items_page(
      query_params: {
        rules: [
          {
            column_id: "status"
            compare_value: [1]
            operator: any_of
          }
        ]
      }
    ) {
      items {
        id
        name
      }
    }
  }
}
```

***

# Column type schema

You can retrieve the JSON schema for any column type's settings using the [`get_column_type_schema`](https://developer.monday.com/api-reference/reference/get-column-type-schema) query. This returns the structure, validation rules, and available properties for a column's configuration.

```graphql GraphQL
query {
  get_column_type_schema(
    type: status
  )
}
```

The schema is useful for validating column settings programmatically, building dynamic UIs, or understanding the available configuration options for each column type.

<br />
