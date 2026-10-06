---
updatedAt: 2026-09-06T08:33:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Migrating to version 2025-04

On February 15th, 2026, we will officially start deprecating API versions [`2024-10`](https://developer.monday.com/api-reference/docs/release-notes#2024-10) and [`2025-01`](https://developer.monday.com/api-reference/docs/release-notes#2025-01). After this date, any API calls to these versions will automatically be routed to version [`2025-04`](https://developer.monday.com/api-reference/docs/release-notes#2025-04).

This may cause unexpected behavior and broken functionality, so you must update your API calls to version `2025-04` (or later) before this date.

To help you migrate, we've grouped the relevant changes into three sections:

* **Breaking changes :rotating\_light::** This section covers breaking changes and fixes from version `2025-04`. Both `2024-10` and `2025-01` users need to review this section.
* **Additional breaking changes :rotating\_light::** This section covers breaking changes and fixes from version `2025-01`. It is only relevant for `2024-10` users; `2025-01` users can skip this section.
* **Non-breaking changes :white\_check\_mark::** In addition to the breaking changes, version `2025-04` includes many expanded API capabilities. These additions do not require updates during migration, but we recommend reviewing them to fully understand what the API can do.

***

# Breaking changes (all users) :rotating\_light:

Both `2025-01` and `2024-10` current users need to take the following changes into account:

## Updated complexity budget exhausted error format

The format of the complexity budget exhausted has been updated to help improve consistency across API errors.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/breaking-change-updated-complexity-budget-exhausted-error)

### Who is impacted?

This may be a breaking change for users who:

* Strictly validate responses and do not allow additional fields
* Use snapshot testing and expect fixed response structures
* Manually parse specific response fields

### How to migrate?

* Update any logic that relied on the previous error format
* Review how your client handles GraphQL error extensions, codes, and nested fields
* Update typed error models to reflect the new structure

### Example

```json New complexity budget exhausted error format
{  
    "errors": [  
        {  
            "message": "Complexity budget exhausted",  
            "extensions": {  
                "code": "COMPLEXITY_BUDGET_EXHAUSTED",  
                "complexity": 6182,  
                "complexity_budget_left": 100,  
                "complexity_budget_limit": 5000000,  
                "retry_in_seconds": 60,  
                "status_code": 429  
            }  
        }  
    ]  
}
```

***

## New errors for `create_webhook` mutation

The `create_webhook` mutation now returns `InvalidArgumentException` errors when:

* The board ID is not found
* A subitem board ID is passed

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/hotfix-updated-create_webhook-errors)

### Who is impacted?

This may be a breaking change for users who:

* Pass board IDs without validating their existence
* Create webhooks on subitem boards
* Rely on generic error handling and do not currently differentiate between invalid arguments

### How to migrate?

* Validate board IDs before passing them to the mutation
* Avoid trying to create webhooks on subitem boards
* Update your error handling logic to catch the new errors

### Example

```json New board not found error
{
  "data": {
    "create_webhook": null
  },
  "errors": [
    {
      "message": "Board not found",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ],
      "path": [
        "create_webhook"
      ],
      "extensions": {
        "code": "InvalidArgumentException",
        "status_code": 200,
        "error_data": {
          "board_id": 1186075578
        }
      }
    }
  ]
}
```
```json New subitems board ID error
{
  "data": {
    "create_webhook": null
  },
  "errors": [
    {
      "message": "Creating webhook on subitems board isn't allowed",
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ],
      "path": [
        "create_webhook"
      ],
      "extensions": {
        "code": "InvalidArgumentException",
        "status_code": 200,
        "error_data": {
          "board_id": 118607557
        }
      }
    }
  ]
}
```

***

## Nullable `renewal_date` field for app subscriptions queries

The `renewal_date` field is now optional (changed from String! to String) and will return `null` for inactive subscriptions.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/hotfix-renewal_date-field-type-change-on-app-subscriptions-details-object)

### Who is impacted?

This may be a breaking change for apps that:

* Use strict type systems expecting `renewal_date` to be a string
* Rely on `renewal_date` in sorting, filtering, or display logic without null-handling
* Generate GraphQL types statically and haven’t updated them

### How to migrate?

* Update your schema types so `renewal_date` is nullable
* Add `null` checks to any logic that assumes `renewal_date` is always present
* Regenerate your GraphQL types

***

## Breaking changes to subitems query

We changed the way subitems are returned and fetched via the existing query:

* **Empty result for subitems on a deleted board:** When querying the subitems of a deleted board, the API will now return an empty result.
* **Subitems field concurrency limit:** A new field-level concurrency limit has been introduced when querying the subitems field. If this limit is exceeded, an error will be returned.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/hotfix-changes-to-subitems-queries)

### Who is impacted?

This may be a breaking change for users who previously queried subitems for items that may belong to deleted boards or large volumes of subitems in a single request

### How to migrate?

* Check for empty results when querying subitems from deleted boards, and handle them in your UI or logic
* Use the `page` argument to paginate through your results
* Handle `null` values for subitems in your client code to prevent errors

### Example

```json Response when subitems field level concurrency limit is exceeded
{
  "data": {
    "items": [
      {
        "subitems": null
      }
    ]
  },
  "errors": [
    {
      "message": "Concurrency limit exceeded for the field",
      "locations": [
        {
          "line": 1,
          "column": 25
        }
      ],
      "path": [
        "items",
        0,
        "subitems"
      ],
      "extensions": {
        "code": "FIELD_LIMIT_EXCEEDED",
        "status_code": 429,
        "retry_in_seconds": 15,
        "error_data": {
          "entity": "subitems"
        }
      }
    }
  ]
}
```

***

## Changes to `column_type` property in `ColumnValueException` errors

`ColumnValueException` errors return the `column_type` property to indicate the type of column that caused the error. Previously, this property returned the column type with the word "Column" appended:

> For example: "ColorColumn", "StatusColumn", "DateColumn"

After this update, the column\_type property now returns just the column type without "Column" appended.

> For example: "color", "status", "date"

You can find the full list of supported column types [here](https://developer.monday.com/api-reference/reference/column-types-reference#supported-columns).

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/bug-fix-column-value-exception-error-column_type-update)

### Who is impacted?

This may be a breaking change for users who:

* Parse the `column_type` string in `ColumnValueException` errors
* Use the `column_type` value in their logic
* Assume the old "ColorColumn" / "StatusColumn" format in client-side validation or fallback logic

### How to migrate?

* Update any logic that checks for `column_type` values
* If you're using a mapping layer, update the mappings to use the new type strings

### Example

```json New format of the relevant &#x60;ColumnValueException&#x60; error
{
  "message": "invalid value - label does not exist in column. Please check our API documentation for the correct data structure for this column. https://developer.monday.com/api-reference/docs/change-column-values",
  "locations": [
    {
      "line": 1, 
      "column": 10
    }
    ],
  "path": [
    "change_column_value"
    ],
  "extensions": {
    "code": "ColumnValueException", 
    "status_code": 200, 
    "error_data": {
      "column_type": "color", 
    }
  }
}
```

***

## New unique request ID in all API responses

All API responses now contain a unique request ID to help measure performance, track the full request lifecycle across services, and simplify troubleshooting.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/all-api-responses-now-contain-a-unique-request-id)

### Who is impacted?

This may be a breaking change for users who:

* Strictly validate responses and do not allow additional fields
* Use snapshot testing and expect fixed response structures
* Manually parse specific response fields

### How to migrate?

* Update your response schemas or client types (e.g., GraphQL types, TypeScript interfaces) to allow the new `request_id` field
* Update your snapshots to include this new field (if applicable)
* Ensure that the `extensions` object is either allowed or safely ignored

### Example

```json Valid response with the new &#x60;request_id&#x60; field
{
  "data": {
    "timeline_item": null
  },
  "errors": [
    {
      "message": "User is not allowed to read timelineItem.",
      "locations": [
        {
          "line": 1,
          "column": 2
        }
      ],
      "path": [
        "timeline_item"
      ],
      "extensions": {
        "code": "UNAUTHORIZED"
      }
    }
  ],
  "extensions": {
    "request_id": "152b0dgb-d38c-067c-9f79-dd0c0d7238ed"
  }
}
```

***

## Variables must now be sent as a JSON object

Variables can no longer be sent as a JSON string. They must now be sent as a proper JSON object. Any queries that pass variables as a JSON string will result in an error.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/deprecated-sending-variables-as-a-json-string)

### Who is impacted?

This is a breaking change for all users and all queries where variables were previously sent as strings.

### How to migrate?

Convert JSON string variables to proper JSON objects.

### Example

The example below shows the same query before and after the change:

```json Valid: JSON object format
{
  "query": "query GetBoardItems($boardId: [ID!]) { boards(ids: $boardId) { items_page(limit: 1) { cursor items { id subitems { id name column_values { column { title } text ... on MirrorValue { display_value } ... on BoardRelationValue { linked_item_ids linked_items { name } } } } } } } }",
  "variables": {
    "boardId": 1234567890
  }
}
```
```json Invalid: JSON string format
{
  "query": "query GetBoardItems($boardId: [ID!]) { boards(ids: $boardId) { items_page(limit: 1) { cursor items { id subitems { id name column_values { column { title } text ... on MirrorValue { display_value } ... on BoardRelationValue { linked_item_ids linked_items { name } } } } } } } }",
  "variables": "{\"boardId\":1234567890}"
}
```

***

## Null value field on connect boards, dependency, and subtasks columns

The `value` field for connect boards, dependency, and subtask columns will now return `null` instead of including linked item IDs and their last updated timestamp.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/value-field-now-returns-null-on-connect-boards-dependency-and-subtasks-columns)

### Who is impacted?

This is a breaking change for

### How to migrate

Query the `linked_items` and `linked_item_ids` fields directly to retrieve the missing data.

### Example

```graphql Query using &#x60;linked_items&#x60; and &#x60;linked_item_ids&#x60; fields
query {  
  boards(ids: 1234567890) {  
    items_page {  
      items {  
        column_values(ids: ["connect_boards"]) {  
          value  
          ... on BoardRelationValue {  
            linked_item_ids  
            linked_items {  
              name  
              updated_at  
            }  
          }  
          id  
        }  
      }  
    }  
  }  
}
```

```json Response with &#x60;linked_items&#x60; and &#x60;linked_item_ids&#x60; fields
{
  "data": {
    "boards": [
      {
        "items_page": {
          "items": [
            {
              "column_values": [
                {
                  "value": null,
                  "linked_item_ids": [
                    "9876543210"
                  ],
                  "linked_items": [
                    {
                      "name": "Item 4",
                      "updated_at": "2023-08-29T15:38:11Z"
                    }
                  ],
                  "id": "connect_boards"
                }
              ]
            }
          ]
        }
      }
    ]
  }
}
```

***

# Additional breaking changes (only for `2024-10` users) :rotating\_light:

On top of the changes outlined above, `2024-10` users must take the following breaking changes from `2025-01` into account. `2025-01` users can skip this section.

## New unified error responses that comply with the GraphQL standard

Errors now have a consistent format compliant with the GraphQL specification. They will be returned in the following format:

* HTTP status: Response will be 200 – OK for application-level errors. Other statuses will be returned for transport-layer errors, such as 429 - Too many requests or 400 - Bad request
* JSON response: Body will contain an errors array with further details about each error
* Partial data: Your query may return partial data and throw errors. In that case, you will receive both the data and errors objects. If a field throws an error, it will return null.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/breaking-change-consistent-error-format)

### Who is impacted?

This may be a breaking change for users who:

* Strictly validate responses and do not allow additional fields
* Use snapshot testing and expect fixed response structures
* Manually parse specific response fields

### How to migrate?

* Update any logic that relied on the previous error format
* Review how your client handles GraphQL error extensions, codes, and nested fields
* Update typed error models to reflect the new structure

### Example

```json Updated error format
{
  "data": [],
  "errors": [
    {
      "message": "User unauthorized to perform action",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "me"
      ],
      "extensions": {
        "code": "UserUnauthorizedException",
        "error_data": {},
        "status_code": 403
      }
    }
  ],
  "account_id": 123456
}
```

***

## More spec-compliant GraphQL query validation

We introduced an upgraded GraphQL parser that enforces GraphQL specification query validations that were previously ignored. The API schema did not change.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/upgrading-graphql-query-validation-to-be-more-compliant)

### Who is impacted?

This is a breaking change for all users who send non-GraphQL spec-compliant queries, including those that use a line break inside of a string or send null in a non-nullable field.

### How to migrate?

Utilize the [documented schema](https://developer.monday.com/api-reference/reference/about-the-api-reference) for each object type to formulate GraphQL specification-compliant queries. We also recommend testing your query in the API playground to quickly identify any syntax issues.

<Image align="center" border={true} src="https://files.readme.io/17182505cbf6d1003af2cd07e9e5abe0b691036491ea1088fc596cf18b3fd7ba-image.png" className="border" />

***

## Strict column validation for apps

Column validations are now strictly enforced for apps. Invalid JSON will return a `ColumnValueException` error.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/column-validation-for-apps)

### Who is impacted?

This may be a breaking change for all apps and their column validations.

### How to migrate?

Use a [JSON formatter](https://jsonformatter.org/) to verify your query format.

***

## Account ID no longer included in responses

The `account_id` is no longer returned in all responses by default.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/account-id-no-longer-returned-by-default)

### Who is impacted?

Any user who retrieved the account ID included in the response by default.

### How to migrate?

Query the `account` object to retrieve the ID.

### Example

```json New response without account ID
{
  "data": {
    "boards": [
      {
        "id": "9876543210"
      }
    ]
  }
}
```

***

## New pagination limit for `updates` queries

The `updates` query now returns a maximum of 100 updates per page. To retrieve more than 100, you must paginate through additional pages using the `page` argument.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/new-pagination-limit-for-updates-queries)

### Who is impacted?

This is a breaking change for all users who retrieve more than 100 `updates` per page.

### How to migrate?

Use the `page` argument to request additional pages of updates.

### Example

```graphql Using the page argument to paginate through results
query {  
  updates (page: 5) {  
    id  
    text_body  
  }  
}
```

***

## GraphQL queries must be sent in the request body

GraphQL queries are no longer accepted via URL query parameters. All queries must be sent in the HTTP request body, or the call will fail.

:mega: [Read the changelog](https://developer.monday.com/api-reference/changelog/graphql-queries-now-required-in-request-body)

### Who is impacted?

This is a breaking change for any user sending GraphQL queries via URL query parameters

### How to migrate?

Update your calls to place the query in the request body instead of the URL.

### **Invalid example (will fail)**

> <https://api.monday.com/v2?query=query> \{ me \{ id } }

### **Valid example (correct usage)**

```graphql Correct query usage
query {  
  me {  
    id  
  }  
}
```

***

# Non-breaking changes :white\_check\_mark:

In addition to the breaking changes listed above, version `2025-04` also introduces new non-breaking functionality.\
These additions do not require updates during migration, but we recommend reviewing them to take full advantage of our expanded API capabilities.

* New [`page_break`](https://developer.monday.com/api-reference/changelog/new-page_break-type-on-create_doc_block-mutation) type on `create_doc_block` mutation
* New [`invite_users`](https://developer.monday.com/api-reference/changelog/new-invite_users-mutation) mutation
* New [`end_date`](https://developer.monday.com/api-reference/changelog/new-end_date-field-on-app-subscription-details-object) field on app subscription details object
* New [update user attributes](https://developer.monday.com/api-reference/changelog/new-update-user-attributes-mutation) mutation
* New [max\_units](https://developer.monday.com/api-reference/changelog/new-max_units-field-on-app-subscription-queries) field on app subscription queries
* New [max\_units](https://developer.monday.com/api-reference/changelog/new-max_units-argument-on-set-mock-app-subscription-mutations) argument on set mock app subscription mutations
* New ability to query user profile [custom fields](https://developer.monday.com/api-reference/changelog/new-ability-to-query-user-profile-custom-fields)
* New [`account_roles`](https://developer.monday.com/api-reference/changelog/new-account_roles-object) object
* New ability to [update a user's custom role](https://developer.monday.com/api-reference/changelog/new-ability-to-update-a-users-custom-role)
* New [`platform_api`](https://developer.monday.com/api-reference/changelog/new-platform_api-object-to-query-daily-api-usage) object to query daily API usage
* New [object](https://developer.monday.com/api-reference/changelog/new-object-to-query-app-data) to query app data
