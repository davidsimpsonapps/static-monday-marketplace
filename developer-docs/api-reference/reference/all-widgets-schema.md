---
updatedAt: 2026-09-06T08:35:36.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# All widgets schema

Learn how to read type-specific widget configuration settings via the API

When creating widgets via the API, you must know the widget's type-specific configuration settings.

# Queries

## Get all widgets schema

* Returns a JSON object defining the structure of a widget configuration
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  all_widgets_schema {
    widget_type
    schema
  }
}
```
```json JSON
{
  "data": {
    "all_widgets_schema": [
      {
        "widget_type": "BATTERY",
        "schema": {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "BatteryOverviewSection Widget Settings",
          "description": "Configuration schema for the BatteryOverviewSection widget - a progress visualization that displays completion status across multiple boards and status columns. The widget calculates and shows progress toward completion (based on 'done_text') as a battery-style progress bar, similar to a sprint burndown chart but for any workflow with status tracking.",
          "type": "object",
          "properties": {
            "done_text": {
              "description": "Defines what status label(s) represent completion/done state for progress calculation. The widget counts items with this status as 'completed' when calculating overall progress percentage. Can be a simple string (e.g., 'Done', 'Complete') or a character-indexed object for complex text patterns. Supports internationalization with values like 'Listo' (Spanish), 'Fait' (French), 'Erledigt' (German), 'Feito' (Portuguese).",
              "oneOf": [
                {
                  "type": "string",
                  "examples": [
                    "Done",
                    "Listo",
                    "Fait",
                    "Erledigt",
                    "Feito",
                    "Complete",
                    "Finished"
                  ]
                },
                {
                  "type": "object",
                  "description": "Character-by-character representation of done text, used for complex text processing or when text needs to be constructed dynamically. Each key is a zero-based index, each value is a single character.",
                  "patternProperties": {
                    "^[0-9]+$": {
                      "type": "string",
                      "maxLength": 1
                    }
                  },
                  "additionalProperties": false,
                  "examples": [
                    {
                      "0": "D",
                      "1": "o",
                      "2": "n",
                      "3": "e"
                    }
                  ]
                }
              ],
              "default": "Done"
            },
            "battery_data": {
              "type": "object",
              "description": "Core configuration that defines which boards and columns to track for progress calculation. This is the primary data source for the battery widget's progress visualization.",
              "properties": {
                "status_column_ids_per_board": {
                  "type": "object",
                  "description": "Maps board IDs to arrays of status column IDs that should be included in progress tracking. The widget will examine items in these columns and count how many have the 'done_text' status versus total items. Board IDs must be strings (even though they're numeric), and column IDs are typically 'status', 'task_status', or custom column identifiers. Multiple columns per board are supported for complex workflows.",
                  "patternProperties": {
                    "^[0-9]+$": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "description": "Status column identifier (e.g., 'status', 'task_status', 'activity_status', 'status2')"
                      },
                      "uniqueItems": true,
                      "examples": [
                        [
                          "status"
                        ],
                        [
                          "status",
                          "status2"
                        ],
                        [
                          "task_status"
                        ],
                        [
                          "activity_status"
                        ]
                      ]
                    }
                  },
                  "additionalProperties": false
                },
                "numeric_column_ids_per_board": {
                  "type": "object",
                  "description": "Optional mapping for numeric columns that can provide additional weighting or estimation data for progress calculation (e.g., story points, task estimation, effort). If specified, the widget may use these values to create weighted progress calculations instead of simple item counts. Common values include 'numbers', 'task_estimation', 'story_points'.",
                  "patternProperties": {
                    "^[0-9]+$": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "description": "Numeric column identifier (e.g., 'numbers', 'task_estimation', 'story_points')"
                      },
                      "uniqueItems": true,
                      "examples": [
                        [
                          "numbers"
                        ],
                        [
                          "task_estimation"
                        ],
                        [
                          "numbers5"
                        ],
                        [
                          "story_points"
                        ]
                      ]
                    }
                  },
                  "additionalProperties": false
                }
              },
              "required": [
                "status_column_ids_per_board"
              ],
              "additionalProperties": false
            },
            "groups_data": {
              "type": "object",
              "description": "Advanced filtering configuration that allows progress tracking to be limited to specific groups within boards. When specified, only items within the listed groups will be included in progress calculation. Useful for tracking progress of specific phases, teams, or categories within a larger board structure.",
              "properties": {
                "group_ids_per_board": {
                  "type": "object",
                  "description": "Maps board IDs to arrays of group IDs that should be included in progress tracking. If a board is listed here, ONLY items in the specified groups will be counted. Group IDs are typically string identifiers like 'planned', 'topics', 'in_progress', etc. Empty arrays mean no groups are filtered for that board.",
                  "patternProperties": {
                    "^[0-9]+$": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "description": "Group identifier within the board (e.g., 'planned', 'topics', 'in_progress', 'backlog')"
                      },
                      "uniqueItems": true,
                      "examples": [
                        [
                          "planned",
                          "topics",
                          "group_2"
                        ],
                        [
                          "new_group",
                          "topics",
                          "group_title",
                          "we"
                        ],
                        [
                          "planned80018",
                          "planned",
                          "topics"
                        ]
                      ]
                    }
                  },
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "required": [
            "battery_data"
          ],
          "additionalProperties": false,
          "examples": [
            {
              "done_text": "Done",
              "battery_data": {
                "status_column_ids_per_board": {
                  "115360472": [
                    "status"
                  ]
                }
              }
            },
            {
              "done_text": "Done",
              "battery_data": {
                "status_column_ids_per_board": {
                  "115392647": [
                    "status"
                  ]
                },
                "numeric_column_ids_per_board": {
                  "115392647": [
                    "numbers"
                  ]
                }
              }
            },
            {
              "done_text": {
                "0": "D",
                "1": "o",
                "2": "n",
                "3": "e"
              },
              "battery_data": {
                "status_column_ids_per_board": {
                  "117278016": [
                    "status"
                  ]
                }
              },
              "groups_data": {
                "group_ids_per_board": {
                  "117278016": [
                    "planned",
                    "topics"
                  ]
                }
              }
            }
          ]
        }
      },
      {
        "widget_type": "CHART",
        "schema": {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "https://monday.com/schemas/widgets/chart-widget-settings",
          "title": "Chart Widget Settings",
          "description": "Complete configuration for chart widgets in monday.com dashboards. This schema defines all possible settings for creating interactive data visualizations from board data, including axis mappings, chart types, filtering, and display options.",
          "type": "object",
          "required": [
            "graph_type",
            "x_axis_columns",
            "y_axis_columns"
          ],
          "properties": {
            "graph_type": {
              "type": "string",
              "description": "The type of chart visualization to render. Choose based on your data story: **PIE/DONUT** (pie, donut) - Show proportional breakdowns and percentages of a whole, ideal for status distributions. **COLUMN/BAR** (column, bar) - Compare quantities across categories, great for person assignments or priority counts. **LINE/AREA** (line, area, smooth_line) - Display trends over time with group_by: month/week/day, perfect for progress tracking. **STACKED CHARTS** (stackedBar, stackedArea, stackedColumn, stackedLine) - Multi-dimensional analysis with z_axis for category breakdowns, requires z_axis_columns for stacking dimension. **PERCENT STACKED** (stackedAreaPercent, stackedBarPercent, stackedColumnPercent, stackedLinePercent) - Show relative proportions within each category as 100% stacks. **BUBBLES** - Scatter plot for multi-variable correlation analysis. Use x_axis_group_by: 'color' for status columns, 'multiple-person' for person columns, 'group' for board groups. Combine with filters for focused insights.",
              "enum": [
                "pie",
                "donut",
                "column",
                "bar",
                "area",
                "line",
                "smooth_line",
                "bubbles",
                "stacked_bar",
                "stacked_bar_percent",
                "stacked_column",
                "stacked_column_percent",
                "stacked_area",
                "stacked_area_percent",
                "stacked_line",
                "stacked_line_percent",
                "stackedBar",
                "stackedArea",
                "stackedAreaPercent",
                "stackedLine",
                "stackedLinePercent"
              ]
            },
            "x_axis_columns": {
              "type": "object",
              "description": "Maps board IDs to arrays of column IDs for the X-axis (horizontal axis). Choose columns that represent your categories: **status** - for workflow stages, **person** - for assignee analysis, **priority** - for urgency levels, **group** - for board group breakdowns, **board** - for cross-board comparisons. Format: {'board_id': ['column_id']}. Most charts use single column arrays.",
              "additionalProperties": {
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "Column ID from the board, or special identifiers like 'group', 'board', 'name', 'person', 'owner', etc."
                }
              }
            },
            "y_axis_columns": {
              "type": "object",
              "description": "Maps board IDs to arrays of measurement types for the Y-axis (vertical axis - what you're measuring). Choose: **default-label-count** - count items (most common for status/person charts), **numbers** - sum of all numeric column values across the board, **numbers5/numbers7** - specific numeric column values (use the actual column ID), **formula** - calculated values. Use count for 'how many items', use numeric columns for 'total values'. Format: {board_id: [measurement_type]}. Example: {123: [default-label-count], 456: [budget_column, hours_column]}.",
              "additionalProperties": {
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "Either a numeric column ID from the board (numbers, numbers7, formula) or the special identifier 'default-label-count' for counting X-axis occurrences"
                }
              }
            },
            "z_axis_columns": {
              "type": "object",
              "description": "Maps board IDs to arrays of column IDs for the Z-axis (stacking/grouping dimension). **REQUIRED for stacked charts** (stackedBar, stackedArea, etc.). Choose categorical columns to stack by: **status** - stack by workflow stages, **priority** - stack by urgency levels, **person** - stack by assignees, **status_1** - secondary status column. Creates layered visualizations showing sub-categories within each X-axis group. Format: {'board_id': ['stacking_column_id']}.",
              "additionalProperties": {
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "Column ID for stacking/grouping dimension in multi-dimensional charts"
                }
              }
            },
            "x_axis_group_by": {
              "type": "string",
              "description": "Defines how X-axis data should be grouped and displayed. **CHOOSE BASED ON YOUR X-AXIS COLUMN**: **'color'** - for status/priority columns (shows status colors), **'multiple-person'** - for person columns (handles multiple assignees), **'group'** - for board group breakdowns, **'board'** - for cross-board analysis, **'name'** - for item-level analysis. Most common: 'color' for status charts, 'multiple-person' for team charts.",
              "enum": [
                "color",
                "group",
                "multiple-person",
                "board",
                "name"
              ]
            },
            "y_axis_group_by": {
              "type": "string",
              "description": "Defines how Y-axis values should be calculated and aggregated. 'default-label-count' counts items, 'numeric' sums numeric values, 'numbers' aggregates number column values, 'formula' uses formula column calculations.",
              "enum": [
                "default-label-count",
                "numeric",
                "numbers",
                "formula"
              ]
            },
            "calc_function_type": {
              "type": "string",
              "description": "Mathematical function to apply when aggregating numeric data across multiple items or time periods. Used when y_axis_group_by is 'numeric' or 'formula' to determine how numeric values should be calculated.",
              "enum": [
                "sum",
                "average",
                "min",
                "max",
                "count"
              ]
            },
            "z_axis_group_by": {
              "type": "string",
              "description": "Defines the grouping mechanism for the Z-axis in stacked charts. Usually corresponds to the column type used for stacking (e.g., 'priority', 'status')."
            },
            "sort_by": {
              "type": "string",
              "description": "Sorting order for chart data. Determines how categories are ordered in the visualization for better readability and analysis.",
              "enum": [
                "X_AXIS_ASCENDING",
                "X_AXIS_DESCENDING",
                "Y_AXIS_ASCENDING",
                "Y_AXIS_DESCENDING"
              ]
            },
            "group_by": {
              "type": "string",
              "description": "Time-based grouping for temporal data analysis. **USE WITH LINE/AREA CHARTS** for trend visualization: **'month'** - monthly trends (most common), **'week'** - weekly progress, **'day'** - daily activity, **'quarter'** - quarterly analysis, **'year'** - yearly overview. Aggregates data points over time periods to show patterns and trends.",
              "enum": [
                "month",
                "week",
                "day",
                "quarter",
                "year"
              ]
            }
          },
          "additionalProperties": false,
          "examples": [
            {
              "graph_type": "pie",
              "x_axis_columns": {
                "123456": [
                  "status"
                ]
              },
              "y_axis_columns": {
                "123456": [
                  "default-label-count"
                ]
              },
              "x_axis_group_by": "color",
              "y_axis_group_by": "default-label-count"
            },
            {
              "graph_type": "column",
              "x_axis_columns": {
                "123456": [
                  "person"
                ],
                "789012": [
                  "person"
                ]
              },
              "y_axis_columns": {
                "123456": [
                  "numbers"
                ],
                "789012": [
                  "numbers7"
                ]
              },
              "x_axis_group_by": "multiple-person",
              "y_axis_group_by": "numeric",
              "sort_by": "Y_AXIS_DESCENDING"
            },
            {
              "graph_type": "line",
              "x_axis_columns": {
                "123456": [
                  "status"
                ]
              },
              "y_axis_columns": {
                "123456": [
                  "default-label-count"
                ]
              },
              "x_axis_group_by": "color",
              "y_axis_group_by": "default-label-count",
              "group_by": "month"
            }
          ]
        }
      },
      {
        "widget_type": "NUMBER",
        "schema": {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "https://monday.com/schemas/widgets/counter-widget-settings",
          "title": "Counter Widget Settings",
          "description": "Input settings for counter widgets, including counter data, prefix/suffix, and number format",
          "type": "object",
          "required": [
            "counter_data"
          ],
          "properties": {
            "counter_data": {
              "type": "object",
              "description": "Counter data configuration for the widget",
              "required": [
                "calculation_type",
                "column_ids_per_board",
                "counter_type"
              ],
              "properties": {
                "calculation_type": {
                  "type": "string",
                  "description": "Type of calculation. \"columns\" when referencing number column(s), \"count\" to count items",
                  "enum": [
                    "columns",
                    "count"
                  ]
                },
                "column_ids_per_board": {
                  "type": "object",
                  "description": "Mapping of board IDs to column IDs. Example: { \"123\": [\"numbers\"] }",
                  "additionalProperties": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "counter_type": {
                  "type": "string",
                  "description": "Operation performed on all the number columns. Example: \"sum\", \"average\", \"median\", \"min\", \"max\"",
                  "enum": [
                    "sum",
                    "average",
                    "median",
                    "min",
                    "max"
                  ]
                },
                "counter_unit": {
                  "type": "object",
                  "description": "Unit display settings for the counter",
                  "properties": {
                    "symbol": {
                      "type": "string",
                      "description": "Symbol for the unit. Example: \"$\""
                    },
                    "direction": {
                      "type": "string",
                      "description": "Direction of the symbol. One of: \"left\", \"right\". Example: \"left\"",
                      "enum": [
                        "left",
                        "right"
                      ]
                    },
                    "custom_unit": {
                      "type": "string",
                      "description": "Custom unit string. Example: \"USD\""
                    }
                  },
                  "additionalProperties": false
                },
                "should_count_items": {
                  "type": "boolean",
                  "description": "Whether to count items. Example: true"
                },
                "should_count_subitems": {
                  "type": "boolean",
                  "description": "Whether to count subitems. Example: false"
                }
              },
              "additionalProperties": false
            },
            "prefix": {
              "type": "string",
              "description": "Text prefix to show before the value. Example: \"Total\""
            },
            "suffix": {
              "type": "string",
              "description": "Text suffix to show after the value. Example: \"items\""
            },
            "number_format": {
              "type": "string",
              "description": "Format for displaying the number. One of: \"number\", \"percentage\", \"currency\". Example: \"currency\"",
              "enum": [
                "number",
                "percentage",
                "currency"
              ]
            }
          },
          "additionalProperties": false
        }
      }
    ]
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Fields

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
        schema
      </td>

      <td>
        `JSON`
      </td>

      <td>
        The type-specific JSON schema.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        widget_type
      </td>

      <td>
        [`ExternalWidget`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets-other-types#externalwidget)
      </td>

      <td>
        The widget's type.
      </td>

      <td>
        `BATTERY`  
        `CHART`  
        `NUMBER`
      </td>
    </tr>
  </tbody>
</Table>
