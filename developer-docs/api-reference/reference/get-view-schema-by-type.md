---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get view schema by type

Learn how to read type-specific board view configuration settings via the API

When creating and updating board views via the API, you must know the view's type-specific configuration settings.

# Queries

## Get view schema by type

* Returns a JSON object defining the type-specific structure of a board view configuration
* Can only be queried at the root; can't be nested within another object

```graphql GraphQL
query {
  get_view_schema_by_type(
    type: TABLE
    mutationType: CREATE
  ) 
}
```
```json JSON
{
  "data": {
    "get_view_schema_by_type": {
      "schema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "columns": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "column_properties": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "column_id": {
                      "type": "string",
                      "description": "The ID of the column"
                    },
                    "visible": {
                      "type": "boolean",
                      "description": "Whether the column is visible"
                    }
                  },
                  "required": [
                    "column_id",
                    "visible"
                  ]
                },
                "description": "Configuration for main board columns"
              },
              "subitems_column_properties": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "column_id": {
                      "type": "string",
                      "description": "The ID of the column"
                    },
                    "visible": {
                      "type": "boolean",
                      "description": "Whether the column is visible"
                    }
                  },
                  "required": [
                    "column_id",
                    "visible"
                  ]
                },
                "description": "Configuration for subitems columns"
              },
              "floating_columns_count": {
                "type": "number",
                "description": "Number of floating columns to display"
              }
            }
          },
          "group_by": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "conditions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "columnId": {
                      "type": "string",
                      "description": "ID of the column to group by"
                    },
                    "config": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "sortSettings": {
                          "type": "object",
                          "description": "Sort settings for the column"
                        }
                      },
                      "description": "Configuration for the group by column"
                    }
                  },
                  "required": [
                    "columnId"
                  ]
                },
                "description": "Conditions for grouping items by column"
              }
            }
          }
        }
      }
    }
  },
  "extensions": {
    "request_id": "eb261ec3-94c5-03c3-c27d-418c62gb31ce"
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
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        mutationType
      </td>

      <td>
        `ViewMutationKind!`
      </td>

      <td>
        The type of mutation to retrieve the schema for.
      </td>

      <td>
        `CREATE`  
        `UPDATE`
      </td>
    </tr>

    <tr>
      <td>
        type
      </td>

      <td>
        `ViewKind!`
      </td>

      <td>
        The type of view to retrieve the schema for. Each type has different properties and validation rules.
      </td>

      <td>
        `APP`  
        `DASHBOARD`  
        `FORM`  
        `TABLE`
      </td>
    </tr>
  </tbody>
</Table>
