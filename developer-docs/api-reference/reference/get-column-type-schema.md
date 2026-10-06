---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get column type schema

Learn how to read type-specific column settings via the API

Every column type in monday.com has a unique settings schema that defines how the column can be configured — including available properties, their types, constraints, and valid values. The `get_column_type_schema` query lets you retrieve this schema programmatically for any supported column type.

This is especially useful when:

* **Building dynamic integrations** that need to create or configure columns without hardcoding settings for each type
* **Powering AI agents** that need to understand column structure and capabilities to read or write data correctly
* **Validating column settings** before passing them to [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column) or typed create mutations like [`create_status_column`](https://developer.monday.com/api-reference/reference/status)

The returned JSON schema follows the [JSON Schema draft-07](http://json-schema.org/draft-07/schema#) specification. It describes the `settings` object for the column type, including property names, types, enums, array constraints, and required fields.

<Callout icon="👍" theme="okay">
  Each column type's documentation page includes a ready-to-use query for retrieving its schema. See the individual [column type reference pages](https://developer.monday.com/api-reference/reference/column-types-reference) for type-specific examples.
</Callout>

# Queries

## Get column type schema

* Returns a JSON schema object defining the settings structure for a specific column type
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  get_column_type_schema(
    type: board_relation
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "allowCreateReflectionColumn": {
                "type": "boolean",
                "description": "Whether to allow creation of reflection columns"
              },
              "allowMultipleItems": {
                "type": "boolean",
                "description": "Whether to allow selection of multiple items"
              },
              "boardIds": {
                "type": "array",
                "description": "Array of related board IDs",
                "items": {
                  "type": "integer"
                }
              },
              "boardId": {
                "type": "integer",
                "description": "Default board ID for the relation"
              }
            },
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

### Arguments

| Argument | Type                                                                                                 | Description                                    |
| :------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| type     | [`ColumnType!`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype) | The type of column to retrieve the schema for. |

***

# More examples

## Status column

The status column schema reveals the full label configuration structure, including color enums, maximum label count, and which fields are required.

```graphql GraphQL
query {
  get_column_type_schema(
    type: status
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "type": {
                "type": "string",
                "description": "The type of managed column (status)"
              },
              "labels": {
                "type": "array",
                "maxItems": 40,
                "description": "Array of status labels",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "description": "The unique identifier for the label"
                    },
                    "label": {
                      "type": "string",
                      "maxLength": 30,
                      "description": "The display text for the label"
                    },
                    "color": {
                      "oneOf": [
                        {
                          "type": "string",
                          "enum": ["working_orange", "done_green", "stuck_red", "..."],
                          "description": "The color name from StatusColumnColors enum"
                        },
                        {
                          "type": "integer",
                          "description": "The color value from StatusColumnColors enum"
                        }
                      ]
                    },
                    "index": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 39,
                      "description": "The display order of the label"
                    },
                    "is_done": {
                      "type": "boolean",
                      "description": "Whether the label represents a done state"
                    }
                  },
                  "required": ["label", "color", "index"]
                }
              }
            },
            "required": ["labels"]
          }
        }
      }
    }
  }
}
```

## Date column

The date column schema shows available display and formatting options.

```graphql GraphQL
query {
  get_column_type_schema(
    type: date
  )
}
```
```json JSON
{
  "data": {
    "get_column_type_schema": {
      "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "settings": {
            "type": "object",
            "description": "Column specific settings",
            "properties": {
              "show_current_year": {
                "type": "boolean",
                "description": "Whether to show the current year"
              },
              "show_week_day": {
                "type": "boolean",
                "description": "Whether to show the day of the week"
              },
              "show_time_by_default": {
                "type": "boolean",
                "description": "Whether to show time by default"
              },
              "hide_footer": {
                "type": "boolean",
                "description": "Whether to hide the footer"
              },
              "date_format": {
                "type": "string",
                "description": "Date format configuration"
              },
              "time_format": {
                "type": "string",
                "description": "Time format configuration"
              }
            },
            "additionalProperties": false
          }
        }
      }
    }
  }
}
```

***

# Reading the schema

The response is a standard JSON Schema object. Here's how to interpret the key parts:

| Schema Property        | What It Tells You                                                                 |
| :--------------------- | :-------------------------------------------------------------------------------- |
| `properties`           | The available settings fields and their structure                                 |
| `type`                 | The expected data type (`string`, `boolean`, `integer`, `array`, `object`)        |
| `enum`                 | A fixed set of allowed values (e.g., color names, calculation types)              |
| `required`             | Fields that must be provided when creating or configuring the column              |
| `maxItems`             | The maximum number of elements in an array (e.g., 40 labels for status)           |
| `maxLength`            | The maximum character length for a string (e.g., 30 characters for status labels) |
| `additionalProperties` | Whether extra fields beyond those listed are allowed (`false` = strict)           |
| `description`          | A human-readable explanation of what the field does                               |

***

# Supported column types

You can pass any of the following [`ColumnType`](https://developer.monday.com/api-reference/reference/columns-other-types#columntype) values to the `type` argument:

| Column Type Enum | Column Name                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------ |
| `auto_number`    | [Auto Number](https://developer.monday.com/api-reference/reference/auto-number-1)           |
| `board_relation` | [Connect Boards](https://developer.monday.com/api-reference/reference/connect)              |
| `button`         | [Button](https://developer.monday.com/api-reference/reference/button)                       |
| `checkbox`       | [Checkbox](https://developer.monday.com/api-reference/reference/checkbox)                   |
| `color_picker`   | [Color Picker](https://developer.monday.com/api-reference/reference/color-picker)           |
| `country`        | [Country](https://developer.monday.com/api-reference/reference/country)                     |
| `creation_log`   | [Creation Log](https://developer.monday.com/api-reference/reference/creation-log)           |
| `date`           | [Date](https://developer.monday.com/api-reference/reference/date)                           |
| `dependency`     | [Dependency](https://developer.monday.com/api-reference/reference/dependency)               |
| `doc`            | [monday doc](https://developer.monday.com/api-reference/reference/document)                 |
| `dropdown`       | [Dropdown](https://developer.monday.com/api-reference/reference/dropdown)                   |
| `email`          | [Email](https://developer.monday.com/api-reference/reference/email)                         |
| `file`           | [Files](https://developer.monday.com/api-reference/reference/files-1)                       |
| `formula`        | [Formula](https://developer.monday.com/api-reference/reference/formula)                     |
| `hour`           | [Hour](https://developer.monday.com/api-reference/reference/hour)                           |
| `item_id`        | [Item ID](https://developer.monday.com/api-reference/reference/item-id)                     |
| `last_updated`   | [Last Updated](https://developer.monday.com/api-reference/reference/last-updated)           |
| `link`           | [Link](https://developer.monday.com/api-reference/reference/link)                           |
| `location`       | [Location](https://developer.monday.com/api-reference/reference/location)                   |
| `long_text`      | [Long Text](https://developer.monday.com/api-reference/reference/long-text)                 |
| `mirror`         | [Mirror](https://developer.monday.com/api-reference/reference/mirror)                       |
| `name`           | [Name](https://developer.monday.com/api-reference/reference/name)                           |
| `numbers`        | [Numbers](https://developer.monday.com/api-reference/reference/number)                      |
| `people`         | [People](https://developer.monday.com/api-reference/reference/people)                       |
| `phone`          | [Phone](https://developer.monday.com/api-reference/reference/phone)                         |
| `progress`       | [Progress Tracking](https://developer.monday.com/api-reference/reference/progress-tracking) |
| `rating`         | [Rating](https://developer.monday.com/api-reference/reference/rating)                       |
| `status`         | [Status](https://developer.monday.com/api-reference/reference/status)                       |
| `tags`           | [Tags](https://developer.monday.com/api-reference/reference/tags)                           |
| `text`           | [Text](https://developer.monday.com/api-reference/reference/text)                           |
| `time_tracking`  | [Time Tracking](https://developer.monday.com/api-reference/reference/time-tracking)         |
| `timeline`       | [Timeline](https://developer.monday.com/api-reference/reference/timeline)                   |
| `vote`           | [Vote](https://developer.monday.com/api-reference/reference/vote)                           |
| `week`           | [Week](https://developer.monday.com/api-reference/reference/week)                           |
| `world_clock`    | [World Clock](https://developer.monday.com/api-reference/reference/world-clock)             |
