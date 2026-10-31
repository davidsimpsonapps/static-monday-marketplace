---
updatedAt: 2026-10-29T09:47:41.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn about the other types used reading filtered items data using the platform API

The monday.com [`items_page`](https://developer.monday.com/api-reference/reference/app-features) API enables you to read items on a board using expressive filters.

Each of the object types described below represents a specific aspect of a filter. They can be provided as arguments to define a filtered items query.

# ItemsQuery

An object containing a set of parameters to filter, sort, and control the scope of the query.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        groups `[ItemsQueryGroup!]`
      </td>

      <td>
        The group rules and attributes to filter your queries.
      </td>

      <td>

      </td>

      <td>
        groups `[ItemsQueryGroup!]`\
        operator `ItemsQueryOperator`\
        rules `[ItemsQueryRule!]`
      </td>
    </tr>

    <tr>
      <td>
        ids `[ID!]`
      </td>

      <td>
        The specific item IDs to return. The maximum is 100. 
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryOperator`
      </td>

      <td>
        The conditions between query rules. The default is `and`.
      </td>

      <td>
        `and` `or`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        order\_by [`[ItemsQueryOrderBy!]`](https://developer.monday.com/api-reference/docs/other-types#itemsqueryorderby)
      </td>

      <td>
        The attributes to sort results by.
      </td>

      <td>

      </td>

      <td>
        column\_id `String!`\
        direction `ItemsOrderByDirection`
      </td>
    </tr>

    <tr>
      <td>
        rules [`[ItemsQueryRule!]`](https://developer.monday.com/api-reference/docs/other-types#itemsqueryrule)
      </td>

      <td>
        The rules to filter your queries.
      </td>

      <td>

      </td>

      <td>
        column\_id `ID!`\
        compare\_attribute `String`\
        compare\_value `CompareValue!`\
        operator `ItemsQueryRuleOperator`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryGroup

An object containing the group rules.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        groups `[ItemsQueryGroup!]`
      </td>

      <td>
        The group rules and attributes to filter your queries.
      </td>

      <td>

      </td>

      <td>
        groups `[ItemsQueryGroup!]`\
        operator `ItemsQueryOperator`\
        rules `[ItemsQueryRule!]`
      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryOperator`
      </td>

      <td>
        The conditions between query rules. The default is `and`.
      </td>

      <td>
        `and`\
        `or`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        rules `[ItemsQueryRule!]`
      </td>

      <td>
        The rules to filter your queries.
      </td>

      <td>

      </td>

      <td>
        column\_id `ID!`\
        compare\_attribute `String`\
        compare\_value `CompareValue!`\
        operator `ItemsQueryRuleOperator`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryOrderBy

An object containing the attributes to sort results by.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        column\_id `String!`
      </td>

      <td>
        The unique identifier of the column to filter or sort by.  You can also enter `"__creation_log__"` or `"__last_updated__"` to chronologically sort results by their last updated or creation date (oldest to newest).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        direction `ItemsOrderByDirection`
      </td>

      <td>
        The direction to sort items in. The default is *asc*.
      </td>

      <td>
        `asc`\
        `desc`
      </td>
    </tr>
  </tbody>
</Table>

## ItemsQueryRule

An object containing the rules to filter your queries.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        column\_id `ID!`
      </td>

      <td>
        The unique identifier of the column to filter by.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare\_attribute `String`
      </td>

      <td>
        The comparison attribute. You can find the supported attributes for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference). Most columns don't have a `compare_attribute`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        compare\_value `CompareValue!`
      </td>

      <td>
        The column value to filter by. This can be a `string` or index value depending on the column type. You can find the supported values for each column type in the [column types reference](https://developer.monday.com/api-reference/docs/column-types-reference).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        operator `ItemsQueryRuleOperator`
      </td>

      <td>
        The condition for value comparison. The default is `any_of`. 
      </td>

      <td>
        `any_of`\
        `not_any_of`\
        `is_empty`\
        `is_not_empty`\
        `greater_than`\
        `greater_than_or_equals`\
        `lower_than`\
        `lower_than_or_equal`\
        `between`\
        `not_contains_text`\
        `contains_text`\
        `contains_terms`\
        `starts_with`\
        `ends_with`\
        `within_the_next`\
        `within_the_last`
      </td>
    </tr>
  </tbody>
</Table>

***

# Types for the root items\_page query

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2027-01`](https://developer.monday.com/api-reference/docs/release-notes#2027-01) and later**
</Callout>

The types below describe the input and the result of the root [`items_page`](https://developer.monday.com/api-reference/reference/items-page#get-items-page-at-the-root) query. Descriptions come from the live schema.

***

# ItemsPageInput

*Available in API versions `2027-01` and later.*

Input arguments for the items\_page query.

| Field                    | Type                        | Description                                                                                                                                                                                                                  |
| :----------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `board_id`               | `ID`                        | The board to query. Provide either `board_id` or `data_view_id`, not both.                                                                                                                                                   |
| `data_view_id`           | `ID`                        | The data view UUID to query. Provide either `data_view_id` or `board_id`, not both.                                                                                                                                          |
| `query`                  | [`ItemsQuery`](#itemsquery) | Optional filter and sort configuration.                                                                                                                                                                                      |
| `limit`                  | `Int`                       | Page size (default 25, max 2000). This cap applies to the root `items_page` query. The nested `items_page` under `boards` has a maximum of 500.                                                                              |
| `group_id`               | `String`                    | Optional group ID to scope the query to a specific group.                                                                                                                                                                    |
| `hierarchy_scope_config` | `String`                    | For multi-level boards: controls how filters apply across the item hierarchy. Use `allItems` to evaluate filters against parents and subitems and return matches at every level. Accepted values: `allItems`, `parentItems`. |

***

# ItemsPageResult

*Available in API versions `2027-01` and later.*

Paginated result set returned by the items\_page query.

| Field          | Type                           | Description                                                         |
| :------------- | :----------------------------- | :------------------------------------------------------------------ |
| `cursor`       | `String`                       | Opaque pagination token, null if no more pages.                     |
| `items`        | [`[ItemResult!]`](#itemresult) | The items in this page of results.                                  |
| `linked_items` | [`[ItemResult!]`](#itemresult) | Linked items (relations, dependencies, subitems from other boards). |

***

# ItemResult

*Available in API versions `2027-01` and later.*

A single item returned by the items\_page query.

| Field           | Type                                                                 | Description                                                                                                                                      |
| :-------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | `ID`                                                                 | The unique identifier of the item.                                                                                                               |
| `name`          | `String`                                                             | The name of the item.                                                                                                                            |
| `state`         | `String`                                                             | The state of the item (active, deleted, etc.).                                                                                                   |
| `group`         | [`ItemsPageGroup`](#itemspagegroup)                                  | The group this item belongs to (id, title, color).                                                                                               |
| `board_id`      | `ID`                                                                 | The ID of the board this item belongs to. Populated only for data-view queries.                                                                  |
| `created_at`    | `String`                                                             | ISO 8601 timestamp of when the item was created.                                                                                                 |
| `updated_at`    | `String`                                                             | ISO 8601 timestamp of when the item was last updated.                                                                                            |
| `creator_id`    | `ID`                                                                 | The user ID of the item creator.                                                                                                                 |
| `creator`       | [`User`](https://developer.monday.com/api-reference/reference/users) | The item's creator.                                                                                                                              |
| `column_values` | [`[ItemsPageColumnValue!]`](#itemspagecolumnvalue)                   | Structured column values. Arguments: `ids` (`[ID!]`), `types` (`[ItemsPageColumnTypeFilter!]`), `capabilities` (`[ItemsPageColumnCapability!]`). |
| `subitems`      | [`[ItemResult!]`](#itemresult)                                       | Subitems of this item.                                                                                                                           |
| `parent_item`   | [`ItemResult`](#itemresult)                                          | The parent item when this item is a subitem within the result set. Null for top-level items.                                                     |

***

# ItemsPageGroup

The group an item belongs to.

| Field   | Type     | Description      |
| :------ | :------- | :--------------- |
| `id`    | `ID`     | The group ID.    |
| `title` | `String` | The group title. |
| `color` | `String` | The group color. |

***

# ItemsPageColumnValue

*Available in API versions `2027-01` and later.*

A column value for an item returned by items\_page.

| Field              | Type                                                           | Description                                                                                                                                                                                                                                                         |
| :----------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`               | `ID`                                                           | Column ID. On the data view path this is the target column id.                                                                                                                                                                                                      |
| `source_column_id` | `ID`                                                           | Data views only: the id this column has on the source board the item came from. Null for board queries, and for items whose board the view does not map this column on.                                                                                             |
| `target_column_id` | `ID`                                                           | Data views only: the column's id on the view's target schema. Null for board queries.                                                                                                                                                                               |
| `type`             | `String`                                                       | Column type.                                                                                                                                                                                                                                                        |
| `text`             | `String`                                                       | Stringified text representation.                                                                                                                                                                                                                                    |
| `value`            | `String`                                                       | JSON string value matching old API format.                                                                                                                                                                                                                          |
| `is_leaf`          | `Boolean!`                                                     | Multi-level boards: whether this item is a leaf (has no subitems).                                                                                                                                                                                                  |
| `capabilities`     | [`ItemsPageColumnCapabilities!`](#itemspagecolumncapabilities) | Column capabilities (calculated/rollup metadata on multi-level boards).                                                                                                                                                                                             |
| `column`           | [`ItemsPageColumn!`](#itemspagecolumn)                         | Board-level metadata of this value's column (id, title, type, capabilities, settings). Not recommended: resolving column metadata per value is redundant across items — prefer querying it once per board via `boards { columns { ... } }` and joining client-side. |

Implemented by: [`ItemsPageBatteryValue`](#itemspagebatteryvalue), [`ItemsPageBoardRelationValue`](#itemspageboardrelationvalue), [`ItemsPageBoardValue`](#itemspageboardvalue), [`ItemsPageButtonValue`](#itemspagebuttonvalue), [`ItemsPageCheckboxValue`](#itemspagecheckboxvalue), [`ItemsPageColorPickerValue`](#itemspagecolorpickervalue), [`ItemsPageCountryValue`](#itemspagecountryvalue), [`ItemsPageCreationLogValue`](#itemspagecreationlogvalue), [`ItemsPageDateValue`](#itemspagedatevalue), [`ItemsPageDependencyValue`](#itemspagedependencyvalue), [`ItemsPageDirectDocValue`](#itemspagedirectdocvalue), [`ItemsPageDocValue`](#itemspagedocvalue), [`ItemsPageDropdownValue`](#itemspagedropdownvalue), [`ItemsPageEmailValue`](#itemspageemailvalue), [`ItemsPageFileValue`](#itemspagefilevalue), [`ItemsPageFormulaValue`](#itemspageformulavalue), [`ItemsPageGroupValue`](#itemspagegroupvalue), [`ItemsPageHourValue`](#itemspagehourvalue), [`ItemsPageItemIdValue`](#itemspageitemidvalue), [`ItemsPageLastUpdatedValue`](#itemspagelastupdatedvalue), [`ItemsPageLinkValue`](#itemspagelinkvalue), [`ItemsPageLocationValue`](#itemspagelocationvalue), [`ItemsPageLongTextValue`](#itemspagelongtextvalue), [`ItemsPageMirrorValue`](#itemspagemirrorvalue), [`ItemsPageNumbersValue`](#itemspagenumbersvalue), [`ItemsPagePeopleValue`](#itemspagepeoplevalue), [`ItemsPagePhoneValue`](#itemspagephonevalue), [`ItemsPageProgressValue`](#itemspageprogressvalue), [`ItemsPageRatingValue`](#itemspageratingvalue), [`ItemsPageStatusValue`](#itemspagestatusvalue), [`ItemsPageSubtasksValue`](#itemspagesubtasksvalue), [`ItemsPageTagsValue`](#itemspagetagsvalue), [`ItemsPageTextValue`](#itemspagetextvalue), [`ItemsPageTimeTrackingValue`](#itemspagetimetrackingvalue), [`ItemsPageTimelineValue`](#itemspagetimelinevalue), [`ItemsPageUnknownValue`](#itemspageunknownvalue), [`ItemsPageVoteValue`](#itemspagevotevalue), [`ItemsPageWeekValue`](#itemspageweekvalue), [`ItemsPageWorldClockValue`](#itemspageworldclockvalue).

***

# ItemsPageBatteryValue

The rollup value of a status column on a multi-level board: a distribution of status counts.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field           | Type                                                          | Description                                                    |
| :-------------- | :------------------------------------------------------------ | :------------------------------------------------------------- |
| `battery_value` | [`[ItemsPageBatteryValueItem!]!`](#itemspagebatteryvalueitem) | Per-status counts aggregated across the item and its subitems. |

***

# ItemsPageBoardRelationValue

The value of a board relation column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field             | Type                                              | Description                                        |
| :---------------- | :------------------------------------------------ | :------------------------------------------------- |
| `display_value`   | `String`                                          | Comma-separated display text of linked item names. |
| `linked_items`    | [`[ItemsPageLinkedItem!]!`](#itemspagelinkeditem) | Linked items with id and name.                     |
| `linked_item_ids` | `[ID!]!`                                          | IDs of linked items.                               |

***

# ItemsPageBoardValue

A mirrored board entity (the linked item's board).

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field  | Type     | Description     |
| :----- | :------- | :-------------- |
| `name` | `String` | The board name. |

***

# ItemsPageButtonValue

The value of a button column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageCheckboxValue

The value of a checkbox column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field     | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `checked` | `Boolean` | Whether the checkbox is checked. |

***

# ItemsPageColorPickerValue

The value of a color picker column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageCountryValue

The value of a country column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field                | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `country_short_name` | `String` | ISO 2-letter country code. |
| `country_name`       | `String` | Full country name.         |

***

# ItemsPageCreationLogValue

The value of a creation log column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field        | Type                                                                 | Description                          |
| :----------- | :------------------------------------------------------------------- | :----------------------------------- |
| `created_at` | `String`                                                             | ISO timestamp of item creation.      |
| `creator_id` | `ID`                                                                 | ID of the user who created the item. |
| `creator`    | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who created the item.       |

***

# ItemsPageDateValue

The value of a date column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field  | Type     | Description                |
| :----- | :------- | :------------------------- |
| `date` | `String` | Date portion (YYYY-MM-DD). |
| `time` | `String` | Time portion (HH:MM:SS).   |

***

# ItemsPageDependencyValue

The value of a dependency column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field             | Type                                              | Description                                            |
| :---------------- | :------------------------------------------------ | :----------------------------------------------------- |
| `display_value`   | `String`                                          | Comma-separated display text of dependency item names. |
| `linked_items`    | [`[ItemsPageLinkedItem!]!`](#itemspagelinkeditem) | Dependency items with id and name.                     |
| `linked_item_ids` | `[ID!]!`                                          | IDs of dependency items.                               |

***

# ItemsPageDirectDocValue

The value of a direct doc column (the item page's item-description doc).

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageDocValue

The value of a document column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field  | Type                                              | Description                            |
| :----- | :------------------------------------------------ | :------------------------------------- |
| `file` | [`ItemsPageFileDocValue`](#itemspagefiledocvalue) | The monday doc attached to the column. |

***

# ItemsPageDropdownValue

The value of a dropdown column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field    | Type                                                                | Description                                     |
| :------- | :------------------------------------------------------------------ | :---------------------------------------------- |
| `values` | [`[ItemsPageDropdownValueOption!]!`](#itemspagedropdownvalueoption) | Selected dropdown options with resolved labels. |

***

# ItemsPageEmailValue

The value of an email column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field   | Type     | Description    |
| :------ | :------- | :------------- |
| `email` | `String` | Email address. |

***

# ItemsPageFileValue

The value of a file column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field   | Type                                                   | Description                       |
| :------ | :----------------------------------------------------- | :-------------------------------- |
| `files` | [`[ItemsPageFileValueItem]!`](#itemspagefilevalueitem) | The files attached to the column. |

***

# ItemsPageFormulaValue

The value of a formula column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field           | Type     | Description                                      |
| :-------------- | :------- | :----------------------------------------------- |
| `display_value` | `String` | The computed formula result as a display string. |

***

# ItemsPageGroupValue

A mirrored group entity (the linked item's group).

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field   | Type     | Description      |
| :------ | :------- | :--------------- |
| `title` | `String` | The group title. |
| `color` | `String` | The group color. |

***

# ItemsPageHourValue

The value of an hour column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field    | Type  | Description    |
| :------- | :---- | :------------- |
| `hour`   | `Int` | Hour (0-23).   |
| `minute` | `Int` | Minute (0-59). |

***

# ItemsPageItemIdValue

The value of an item ID column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field     | Type | Description  |
| :-------- | :--- | :----------- |
| `item_id` | `ID` | The item ID. |

***

# ItemsPageLastUpdatedValue

The value of a last updated column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field        | Type                                                                 | Description                               |
| :----------- | :------------------------------------------------------------------- | :---------------------------------------- |
| `updated_at` | `String`                                                             | ISO timestamp of last update.             |
| `updater_id` | `ID`                                                                 | ID of the user who last updated the item. |
| `updater`    | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who last updated the item.       |

***

# ItemsPageLinkValue

The value of a link column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field       | Type     | Description                |
| :---------- | :------- | :------------------------- |
| `url`       | `String` | URL.                       |
| `link_text` | `String` | Display text for the link. |

***

# ItemsPageLocationValue

The value of a location column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field     | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `lat`     | `String` | Latitude.               |
| `lng`     | `String` | Longitude.              |
| `address` | `String` | Human-readable address. |

***

# ItemsPageLongTextValue

The value of a long text column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageMirrorValue

The value of a mirror (connected boards) column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field            | Type                                                  | Description                                      |
| :--------------- | :---------------------------------------------------- | :----------------------------------------------- |
| `display_value`  | `String`                                              | Comma-separated display text of mirrored values. |
| `mirrored_items` | [`[ItemsPageMirroredItem!]!`](#itemspagemirroreditem) | Mirrored column values from linked items.        |

***

# ItemsPageNumbersValue

The value of a numbers column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field    | Type    | Description    |
| :------- | :------ | :------------- |
| `number` | `Float` | Numeric value. |

***

# ItemsPagePeopleValue

The value of a people column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field               | Type                                                  | Description                |
| :------------------ | :---------------------------------------------------- | :------------------------- |
| `persons_and_teams` | [`[ItemsPagePeopleEntity!]!`](#itemspagepeopleentity) | People and teams assigned. |

***

# ItemsPagePhoneValue

The value of a phone column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field                | Type     | Description             |
| :------------------- | :------- | :---------------------- |
| `phone`              | `String` | Phone number.           |
| `country_short_name` | `String` | ISO country short name. |

***

# ItemsPageProgressValue

The value of a progress (battery) column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageRatingValue

The value of a rating column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field    | Type  | Description   |
| :------- | :---- | :------------ |
| `rating` | `Int` | Rating value. |

***

# ItemsPageStatusValue

The value of a status column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field   | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `label` | `String` | Resolved status label text. |
| `index` | `Int`    | Status label index.         |

***

# ItemsPageSubtasksValue

The value of a subtasks (subitems) column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field           | Type                                        | Description                                    |
| :-------------- | :------------------------------------------ | :--------------------------------------------- |
| `display_value` | `String`                                    | Comma-separated display text of subitem names. |
| `subitems`      | [`[ItemsPageSubitem!]!`](#itemspagesubitem) | Subitems with id and name.                     |

***

# ItemsPageTagsValue

The value of a tags column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field     | Type     | Description      |
| :-------- | :------- | :--------------- |
| `tag_ids` | `[ID!]!` | List of tag IDs. |

***

# ItemsPageTextValue

The value of a text column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageTimeTrackingValue

The value of a time tracking column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field        | Type      | Description                                              |
| :----------- | :-------- | :------------------------------------------------------- |
| `duration`   | `Float`   | Total tracked duration in seconds.                       |
| `running`    | `Boolean` | Whether the time tracker is currently running.           |
| `started_at` | `String`  | ISO timestamp of when the running session started.       |
| `updated_at` | `String`  | ISO timestamp of when the column value was last updated. |

***

# ItemsPageTimelineValue

The value of a timeline column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field       | Type     | Description              |
| :---------- | :------- | :----------------------- |
| `from_date` | `String` | Start date (YYYY-MM-DD). |
| `to_date`   | `String` | End date (YYYY-MM-DD).   |

***

# ItemsPageUnknownValue

A column value of an unsupported or unrecognized column type.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

***

# ItemsPageVoteValue

The value of a vote column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field        | Type                                                                    | Description             |
| :----------- | :---------------------------------------------------------------------- | :---------------------- |
| `vote_count` | `Int`                                                                   | Number of votes.        |
| `voter_ids`  | `[ID!]!`                                                                | IDs of users who voted. |
| `voters`     | [`[User]!`](https://developer.monday.com/api-reference/reference/users) | The users who voted.    |

***

# ItemsPageWeekValue

The value of a week column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field        | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `start_date` | `String` | Week start date (YYYY-MM-DD). |
| `end_date`   | `String` | Week end date (YYYY-MM-DD).   |

***

# ItemsPageWorldClockValue

The value of a world clock column.

Implements [`ItemsPageColumnValue`](#itemspagecolumnvalue), so it also has every field of that interface.

Additional fields:

| Field      | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `timezone` | `String` | Timezone string (e.g. `America/New_York`). |

***

# ItemsPageColumn

Board-level metadata of the column this value belongs to.

| Field          | Type                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------- | :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `ID`                                                           | Column ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `title`        | `String`                                                       | The column title.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `type`         | `String`                                                       | The column type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `capabilities` | [`ItemsPageColumnCapabilities!`](#itemspagecolumncapabilities) | Column capabilities (calculated/rollup metadata on multi-level boards).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `settings`     | `JSON!`                                                        | The column's settings object, reshaped to match the legacy items\_page shape. Status columns fold `labels`/`color_mapping`/`labels_positions_v2`/`done_colors`/`labels_colors` into an enriched `labels` array (`{id, label, color, index, is_done, is_deactivated, hex}`); dropdown columns return `labels` as `{id, label, is_deactivated}`; mirror columns return `displayed_linked_columns` as an array of `{board_id, column_ids}`. All other column types pass the raw data-structure settings through unchanged. Columns with no settings return `{}` (matching the legacy API). |

***

# ItemsPageColumnCapabilities

Capabilities of a column (e.g. calculated/rollup metadata on multi-level boards).

| Field        | Type                                                              | Description                                                   |
| :----------- | :---------------------------------------------------------------- | :------------------------------------------------------------ |
| `calculated` | [`ItemsPageCalculatedCapability`](#itemspagecalculatedcapability) | Calculated/rollup capability, present only on rollup columns. |
| `visibility` | `String`                                                          | Visibility capability setting of the column, when present.    |

***

# ItemsPageCalculatedCapability

The calculated (rollup) capability configuration of a column.

| Field             | Type                                                          | Description                                                  |
| :---------------- | :------------------------------------------------------------ | :----------------------------------------------------------- |
| `function`        | [`ItemsPageCalculatedFunction`](#itemspagecalculatedfunction) | The aggregation function applied to child values.            |
| `calculated_type` | `String`                                                      | The resolved value type of the calculation, when applicable. |

***

# ItemsPageBatteryValueItem

A single status-count entry in a battery (status rollup) value.

| Field   | Type  | Description                       |
| :------ | :---- | :-------------------------------- |
| `key`   | `ID`  | The status label index/key.       |
| `count` | `Int` | Number of items with this status. |

***

# ItemsPageDropdownValueOption

A dropdown option selected in a dropdown column.

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `id`    | `ID`     | The dropdown item's unique identifier. |
| `label` | `String` | The dropdown item's label.             |

***

# ItemsPageFileValueItem

A single file attached to a file column: an uploaded asset, an external link, or a monday doc.

One of: [`ItemsPageFileAssetValue`](#itemspagefileassetvalue), [`ItemsPageFileLinkValue`](#itemspagefilelinkvalue), [`ItemsPageFileDocValue`](#itemspagefiledocvalue).

***

# ItemsPageFileAssetValue

An uploaded asset attached to a file column.

| Field        | Type                                                                     | Description                              |
| :----------- | :----------------------------------------------------------------------- | :--------------------------------------- |
| `asset_id`   | `ID`                                                                     | The asset's id.                          |
| `name`       | `String`                                                                 | The file's name.                         |
| `is_image`   | `Boolean`                                                                | Whether the file is an image.            |
| `created_at` | `String`                                                                 | ISO timestamp of the file's creation.    |
| `creator_id` | `ID`                                                                     | The ID of the user who created the file. |
| `creator`    | [`User`](https://developer.monday.com/api-reference/reference/users)     | The user who created the file.           |
| `asset`      | [`Asset`](https://developer.monday.com/api-reference/reference/assets-1) | The asset associated with the file.      |

***

# ItemsPageFileLinkValue

An external link (Google Drive, Dropbox, Box, OneDrive, or generic link) attached to a file column.

| Field        | Type                                                                 | Description                              |
| :----------- | :------------------------------------------------------------------- | :--------------------------------------- |
| `file_id`    | `ID`                                                                 | The file's id.                           |
| `name`       | `String`                                                             | The file's name.                         |
| `kind`       | [`ItemsPageFileLinkValueKind`](#itemspagefilelinkvaluekind)          | The link's kind.                         |
| `url`        | `String`                                                             | The file's url.                          |
| `created_at` | `String`                                                             | ISO timestamp of the file's creation.    |
| `creator_id` | `ID`                                                                 | The ID of the user who created the file. |
| `creator`    | [`User`](https://developer.monday.com/api-reference/reference/users) | The user who created the file.           |

***

# ItemsPageFileDocValue

A monday doc attached to a file column.

| Field        | Type                                                                    | Description                                         |
| :----------- | :---------------------------------------------------------------------- | :-------------------------------------------------- |
| `file_id`    | `ID`                                                                    | The file's unique identifier.                       |
| `object_id`  | `ID`                                                                    | The associated board or object's unique identifier. |
| `url`        | `String`                                                                | The file's url.                                     |
| `created_at` | `String`                                                                | ISO timestamp of the file's creation.               |
| `creator_id` | `ID`                                                                    | The ID of the user who created the file.            |
| `creator`    | [`User`](https://developer.monday.com/api-reference/reference/users)    | The user who created the file.                      |
| `doc`        | [`Document`](https://developer.monday.com/api-reference/reference/docs) | The doc associated with the file.                   |

***

# ItemsPageLinkedItem

A linked item referenced by a relation column.

| Field   | Type                                            | Description                                         |
| :------ | :---------------------------------------------- | :-------------------------------------------------- |
| `id`    | `ID`                                            | The linked item ID.                                 |
| `name`  | `String`                                        | The linked item name.                               |
| `board` | [`ItemsPageLinkedBoard`](#itemspagelinkedboard) | The board the linked item belongs to (id and name). |

***

# ItemsPageLinkedBoard

The board a linked item lives on.

| Field  | Type     | Description     |
| :----- | :------- | :-------------- |
| `id`   | `ID`     | The board ID.   |
| `name` | `String` | The board name. |

***

# ItemsPageMirroredItem

A mirrored item: the mirrored column value plus the linked item/board it came from.

| Field             | Type                                            | Description                                       |
| :---------------- | :---------------------------------------------- | :------------------------------------------------ |
| `mirrored_value`  | [`ItemsPageColumnValue`](#itemspagecolumnvalue) | The mirrored column value from the linked item.   |
| `linked_board_id` | `ID`                                            | The ID of the board the mirrored value came from. |
| `linked_item`     | [`ItemResult`](#itemresult)                     | The linked item the mirrored value came from.     |

***

# ItemsPagePeopleEntity

A person or team entity assigned to a people column.

| Field  | Type     | Description                           |
| :----- | :------- | :------------------------------------ |
| `id`   | `ID`     | Id of the entity: a person or a team. |
| `kind` | `String` | Type of entity.                       |

***

# ItemsPageSubitem

A subitem referenced by a subtasks column.

| Field  | Type     | Description       |
| :----- | :------- | :---------------- |
| `id`   | `ID`     | The subitem ID.   |
| `name` | `String` | The subitem name. |

***

# ItemsPageColumnTypeFilter

Column type values accepted by the column\_values types filter.

| Enum Value       |
| :--------------- |
| `auto_number`    |
| `board_relation` |
| `button`         |
| `checkbox`       |
| `color_picker`   |
| `country`        |
| `creation_log`   |
| `date`           |
| `dependency`     |
| `direct_doc`     |
| `doc`            |
| `dropdown`       |
| `email`          |
| `file`           |
| `formula`        |
| `hour`           |
| `item_id`        |
| `last_updated`   |
| `link`           |
| `location`       |
| `long_text`      |
| `mirror`         |
| `numbers`        |
| `people`         |
| `phone`          |
| `progress`       |
| `rating`         |
| `status`         |
| `subtasks`       |
| `tags`           |
| `text`           |
| `time_tracking`  |
| `timeline`       |
| `unsupported`    |
| `vote`           |
| `week`           |
| `world_clock`    |

***

# ItemsPageColumnCapability

Column capability flags accepted by the column\_values capabilities filter.

| Enum Value   |
| :----------- |
| `CALCULATED` |
| `VISIBILITY` |

***

# ItemsPageCalculatedFunction

Aggregation function used by a calculated (rollup) column on a multi-level board.

| Enum Value   |
| :----------- |
| `COUNT_KEYS` |
| `MAX`        |
| `MIN`        |
| `MIN_MAX`    |
| `NONE`       |
| `SUM`        |

***

# ItemsPageFileLinkValueKind

The type of an external link stored inside a file column.

| Enum Value     |
| :------------- |
| `google_drive` |
| `dropbox`      |
| `box`          |
| `onedrive`     |
| `link`         |
