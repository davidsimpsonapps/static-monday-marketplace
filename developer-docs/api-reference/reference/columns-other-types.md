---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the columns APIs

The monday.com [columns](https://developer.monday.com/api-reference/reference/columns) APIs enable you to create, read, update, and delete columns.

The types below are used by the columns queries and mutations, and are not independently queryable.

# ColumnCapabilities

An object containing the column's capability settings.

| Field      | Type                                                                                                                    | Description                       |
| :--------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| calculated | [`CalculatedCapability`](https://developer.monday.com/api-reference/reference/columns-other-types#calculatedcapability) | The column's capability settings. |

## CalculatedCapability

An object containing a column's calculated capability settings.

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
        calculated_type
      </td>

      <td>
        [`ColumnType`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype)
      </td>

      <td>
        The type of calculated value.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        function
      </td>

      <td>
        `CalculatedFunction!`
      </td>

      <td>
        The function to calculate the parent values.
      </td>

      <td>
        `COUNT_KEYS`  
        `MAX`  
        `MIN`  
        `MIN_MAX`  
        `NONE`  
        `SUM`
      </td>
    </tr>
  </tbody>
</Table>

***

# ColumnCapabilitiesInput

An object containing the input configuration for a column's capabilities.

| Field      | Type                                                                                                                              | Description                                                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| calculated | [`CalculatedCapabilityInput`](https://developer.monday.com/api-reference/reference/columns-other-types#calculatedcapabilityinput) | The input for configuring a column's calculated capability settings. |

## CalculatedCapabilityInput

An object containing the input settings for a column's calculated capabilities.

| Field      | Type                                                                                                                              | Description                                                          |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| calculated | [`CalculatedCapabilityInput`](https://developer.monday.com/api-reference/reference/columns-other-types#calculatedcapabilityinput) | The input for configuring a column's calculated capability settings. |

### CalculatedFunction

An enum containing the functions used to calculate column values within column capabilities.

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
        function
      </td>

      <td>
        [`CalculatedFunction!`](https://developer.monday.com/api-reference/reference/columns-other-types#calculated-function)
      </td>

      <td>
        The function to count the values. If not provided, the default column type function will apply.
      </td>

      <td>
        `COUNT_KEYS` (label count)  
        `MAX` (maximum value)  
        `MIN` (minimum value)  
        `MIN_MAX` (both minimum and maximum values)  
        `NONE`  
        `SUM` (sum of all values)
      </td>
    </tr>
  </tbody>
</Table>

***

# ColumnMappingInput

An object containing the mapping between source and target columns across boards.

| Field  | Type  | Description                            |
| :----- | :---- | :------------------------------------- |
| source | `ID!` | The source column's unique identifier. |
| target | `ID`  | The target column's unique identifier. |

***

# ColumnType

An enum containing the available column types that can be filtered, read, or updated in queries and mutations.

|                  |                  |                |
| :--------------- | :--------------- | :------------- |
| `auto_number`    | `board_relation` | `button`       |
| `checkbox`       | `color_picker`   | `country`      |
| `creation_log`   | `date`           | `dependency`   |
| `doc`            | `dropdown`       | `email`        |
| `file`           | `formula`        | `hour`         |
| `item_assignees` | `item_id`        | `last_updated` |
| `link`           | `location`       | `long_text`    |
| `mirror`         | `name`           | `numbers`      |
| `people`         | `phone`          | `progress`     |
| `rating`         | `status`         | `subtasks`     |
| `tags`           | `team`           | `text`         |
| `timeline`       | `time_tracking`  | `vote`         |
| `week`           | `world_clock`    | `unsupported`  |
