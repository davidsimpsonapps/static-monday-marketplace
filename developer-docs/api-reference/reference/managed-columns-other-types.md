---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

<br />

The monday.com [`managed_column`](https://developer.monday.com/api-reference/reference/boards) API lets you query a managed column's settings, permissions, creator data, and more.

The object types below provide additional data structures used across the managed column API’s CRUD operations. They extend the core types documented in the main [`managed_column`](https://developer.monday.com/api-reference/reference/managed-columns) reference and are used to create and configure new managed columns, update column details, and retrieve detailed managed column information.

# CreateDropdownColumnSettingsInput

An object containing the settings for a new managed dropdown column, including its labels.

| Field                                                                                                                                 | Description                                                             | Supported Fields |
| :------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- | :--------------- |
| labels [`[CreateDropdownLabelInput!]!`](https://developer.monday.com/api-reference/reference/other-types#create-dropdown-label-input) | An array that specifies the labels for the new managed dropdown column. | label `String!`  |

## CreateDropdownLabelInput

An object containing the properties of a label to be created in a managed dropdown column.

| Field           | Description                                          |
| :-------------- | :--------------------------------------------------- |
| label `String!` | The text on the new managed dropdown column's label. |

***

# CreateStatusColumnSettingsInput

An object containing the settings for a new managed status column, including its labels.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        labels [`[CreateStatusLabelInput!]!`](https://developer.monday.com/api-reference/reference/other-types#create-status-label-input)
      </td>

      <td>
        An array that defines the labels for the new managed status column.
      </td>

      <td>
        color [`StatusColumnColors!`](https://developer.monday.com/api-reference/reference/other-types#status-column-colors)  
        description `String`  
        index `Int!`  
        is_done `Boolean`  
        label `String!`
      </td>
    </tr>
  </tbody>
</Table>

## CreateStatusLabelInput

An object containing the properties of a label to be created in a managed dropdown column.

| Field                       | Description                                                                                               |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| color `StatusColumnColors!` | The color of the label for the new managed status column. See the complete list of available colors here. |
| description `String`        | The description of the new managed status column.                                                         |
| index `Int!`                | The index of the label for the new managed status column.                                                 |
| is\_done `Boolean`          | Whether the label is marked as "Done".                                                                    |
| label `String!`             | The text on the label of the new managed status column.                                                   |

***

# DropdownColumnSettings

An object containing the configuration of a managed dropdown column. One of two possible GraphQL implementation types for a managed column's [`settings`](https://developer.monday.com/api-reference/reference/managed-columns#fields) field.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        labels [`[DropdownLabel!]`](https://developer.monday.com/api-reference/reference/other-types#dropdown-label)
      </td>

      <td>
        An array containing the settings of the managed dropdown column's labels.
      </td>

      <td>
        id `Int`  
        is_deactivated `Boolean`  
        label `String`
      </td>
    </tr>

    <tr>
      <td>
        type `ManagedColumnTypes`
      </td>

      <td>
        The type of managed column: `dropdown` or `status`.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## DropdownLabel

An object containing the text, activation state, and identifier for each label used in a managed dropdown column.

| Field                     | Description                                                   |
| :------------------------ | :------------------------------------------------------------ |
| id `Int`                  | The unique identifier of the managed dropdown column's label. |
| is\_deactivated `Boolean` | Whether the managed dropdown column's label is deactivated.   |
| label `String`            | The text of the managed dropdown column's label.              |

***

# DropdownManagedColumn

An object containing the managed dropdown column.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
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
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who created the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description
      </td>

      <td>
        `String`
      </td>

      <td>
        The managed column's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        revision
      </td>

      <td>
        `Int`
      </td>

      <td>
        The current version of the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        [`DropdownColumnSettings`](https://developer.monday.com/api-reference/reference/other-types#dropdown-column-settings)
      </td>

      <td>
        The managed column's settings.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings_json
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The managed column's settings in JSON.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `ManagedColumnState`
      </td>

      <td>
        The managed column's state.
      </td>

      <td>
        `active`  
        `inactive`
      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The managed column's title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who last updated the managed column.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# DropdownSettingsOverridesInput

An object containing the overridable settings for dropdown columns attached to a managed column.

| Field                     | Description                                                                    |
| :------------------------ | :----------------------------------------------------------------------------- |
| label\_limit\_count `Int` | Whether to limit the number of label selections.                               |
| limit\_select `Boolean`   | The maximum number of label selections. Must be used with `label_limit_count`. |

***

# StatusColumnColors

An enum containing the available colors for managed status column labels. See the full color reference [here](https://vibe.monday.com/?path=/docs/foundations-colors--colors).

| Enum Values      |               |                |
| :--------------- | :------------ | :------------- |
| `american_gray`  | `aquamarine`  | `berry`        |
| `blackish`       | `bright_blue` | `bright_green` |
| `brown`          | `bubble`      | `chili_blue`   |
| `coffee`         | `dark_blue`   | `dark_indigo`  |
| `dark_orange`    | `dark_purple` | `dark_red`     |
| `done_green`     | `egg_yolk`    | `explosive`    |
| `grass_green`    | `indigo`      | `lavender`     |
| `lilac`          | `lipstick`    | `navy`         |
| `orchid`         | `peach`       | `pecan`        |
| `purple`         | `river`       | `royal`        |
| `saladish`       | `sky`         | `sofia_pink`   |
| `steel`          | `stuck_red`   | `sunset`       |
| `tan`            | `teal`        | `winter`       |
| `working_orange` |               |                |

***

# StatusColumnSettings

An object containing the configuration of a managed status column. One of two possible GraphQL implementation types for a managed column's [`settings`](https://developer.monday.com/api-reference/reference/managed-columns#fields) field.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        labels [`[StatusLabel!]`](https://developer.monday.com/api-reference/reference/other-types#status-label)
      </td>

      <td>
        An array containing the settings of the managed status column's labels.
      </td>

      <td>
        color [`StatusColumnColors`](https://developer.monday.com/api-reference/reference/other-types#status-column-colors)  
        description `String`  
        id `Int`  
        index `Int`  
        is_deactivated `Boolean`  
        is_done `Boolean`  
        label `String`
      </td>
    </tr>

    <tr>
      <td>
        type `ManagedColumnTypes`
      </td>

      <td>
        The type of managed column: `dropdown` or `status`.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## StatusLabel

An object containing the properties of each label in a managed status column, including color, text, and activation state.

| Field                                                                                                               | Description                                                               |
| :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ |
| color [`StatusColumnColors`](https://developer.monday.com/api-reference/reference/other-types#status-column-colors) | The status label's color. See the complete list of available colors here. |
| description `String`                                                                                                | The status label's description.                                           |
| id `Int`                                                                                                            | The status label's unique identifier.                                     |
| index `Int`                                                                                                         | The status label's index.                                                 |
| is\_deactivated `Boolean`                                                                                           | Whether the status label is deactivated.                                  |
| is\_done `Boolean`                                                                                                  | Whether the status label is "Done".                                       |
| label `String`                                                                                                      | The status label's text.                                                  |

***

# StatusManagedColumn

An object containing the managed status column.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
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
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's creation date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who created the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description
      </td>

      <td>
        `String`
      </td>

      <td>
        The managed column's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `String`
      </td>

      <td>
        The unique identifier of the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        revision
      </td>

      <td>
        `Int`
      </td>

      <td>
        The current version of the managed column.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings
      </td>

      <td>
        [`StatusColumnSettings`](https://developer.monday.com/api-reference/reference/other-types#status-column-settings)
      </td>

      <td>
        The managed column's settings.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings_json
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The managed column's settings in JSON.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        state
      </td>

      <td>
        `ManagedColumnState`
      </td>

      <td>
        The managed column's state.
      </td>

      <td>
        `active`  
        `inactive`
      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The managed column's title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The managed column's last updated date.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        updated_by
      </td>

      <td>
        `ID`
      </td>

      <td>
        The unique identifier of the user who last updated the managed column.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# UpdateDropdownColumnSettingsInput

An object containing the updated settings for a managed dropdown column, including changes to its labels.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        labels [`[UpdateDropdownLabelInput!]!`](https://developer.monday.com/api-reference/reference/other-types#update-dropdown-label-input)
      </td>

      <td>
        An array that specifies the updated labels for the managed dropdown column.
      </td>

      <td>
        id `Int`  
        is_deactivated `Boolean`  
        label `String!`
      </td>
    </tr>
  </tbody>
</Table>

## UpdateDropdownLabelInput

An object containing the properties of a dropdown label to update in a managed dropdown column.

| Field                     | Description                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------ |
| id `Int`                  | The unique identifier of the existing label to update. Omit it to create a new label. |
| is\_deactivated `Boolean` | Whether the label is deactivated.                                                     |
| label `String!`           | The updated label for the managed dropdown column.                                    |

***

# UpdateStatusColumnSettingsInput

An object containing the updated settings for a managed status column, including changes to its labels.

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
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        labels [`[UpdateStatusLabelInput!]!`](https://developer.monday.com/api-reference/reference/other-types#update-status-label-input)
      </td>

      <td>
        An array that defines the labels for the updated managed status column.
      </td>

      <td>
        color [`StatusColumnColors!`](https://developer.monday.com/api-reference/reference/other-types#status-column-colors)  
        description `String`  
        id `Int`  
        index `Int!`  
        is_done `Boolean`  
        label `String!`
      </td>
    </tr>
  </tbody>
</Table>

## UpdateStatusLabelInput

An object containing the properties of a status label to update in a managed status column.

| Field                                                                                                                | Description                                                                           |
| :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| color [`StatusColumnColors!`](https://developer.monday.com/api-reference/reference/other-types#status-column-colors) | The updated color of the managed status column's label.                               |
| description `String`                                                                                                 | The updated description of the managed status column.                                 |
| id `Int`                                                                                                             | The unique identifier of the existing label to update. Omit it to create a new label. |
| index `Int!`                                                                                                         | The updated index of the new managed status column's label.                           |
| is\_deactivated `Boolean`                                                                                            | Whether the status label is deactivated.                                              |
| is\_done `Boolean`                                                                                                   | Whether the label is marked as "Done".                                                |
| label `String!`                                                                                                      | The updated text for the label of the managed status column.                          |
