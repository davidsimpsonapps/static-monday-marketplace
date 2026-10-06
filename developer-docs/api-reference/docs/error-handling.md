---
updatedAt: 2026-09-06T08:31:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Error handling

If your API request cannot be completed successfully, you will receive an error message.

# Error format

Errors returned by the API have the following characteristics:

* **HTTP status:** Response will be `200 – OK` for application-level errors. Other statuses will be returned for transport-layer errors, such as `500 - Internal server error`, `429 - Too many requests` or `400 - Bad request`
* **JSON response:** Body will contain an `errors` array with further details about each error
* **Partial data:** Requests will return partial data, so the `data` object may also contain some information. For example, if you query three fields, you may receive two fields and one error.
* **`Retry-After` header:** Errors will include the `Retry-After` header to indicate how long you need to wait before making another request
* **[Rate limit headers](https://developer.monday.com/api-reference/docs/rate-limits#rate-limit-headers):** Every response includes `RateLimit-Policy` and `RateLimit` headers that report the current state of your rate limits, so you can monitor your remaining quota proactively
* Each API response includes a `request_id` in the extensions object that can be used for troubleshooting.

### Sample format

Here's an example of an application-level error:

```json Error only
{
  "data" : [],
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
```json Partial data
{
  "data": {
    "me": {
      "id": "4012689",
      "photo_thumb": null
    },
    "complexity": {
      "query": 12
    }
  },
  "errors": [
    {
      "message": "Photo unavailable.",
      "locations": [
        {
          "line": 4,
          "column": 5
        }
      ],
      "path": [
        "me",
        "photo_thumb"
       ],
      "extensions": {
        "code": "ASSET_UNAVAILABLE"
      }
    }
  ],
  "account_id": 18888528
}
```

# Errors by status code

## 2xx errors

Errors with a 2xx status code indicate that monday.com is not accepting the requested action due to a platform restriction, limitation, or rule. These errors occur for various reasons, including passing invalid values, missing permissions, or reaching character limits.

Here are **some** of the most common errors:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Error code
      </th>

      <th>
        HTTP status code
      </th>

      <th>
        Description
      </th>

      <th>
        Resolution
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `API_TEMPORARILY_BLOCKED`
      </td>

      <td>
        200
      </td>

      <td>
        There is an issue with the API and usage has temporarily been blocked
      </td>

      <td>
        Check the [status page](https://status.monday.com/) for updates and retry your call once the issue has been resolved.
      </td>
    </tr>

    <tr>
      <td>
        `ColumnValueException`
      </td>

      <td>
        200
      </td>

      <td>
        Incorrect column value formatting
      </td>

      <td>
        * Ensure the [column](https://developer.monday.com/api-reference/reference/column-types-reference) is supported by our API and not calculated in the client.
        * Verify that the column value conforms with each [column's data structure](https://developer.monday.com/api-reference/reference/column-types-reference).
        * Check that the [connect boards column](https://developer.monday.com/api-reference/reference/connect) you're referencing is connected to a board via the monday.com UI.
        * For [connect boards columns](https://developer.monday.com/api-reference/reference/connect), use `{"item_ids": ["123"]}` — not `linkedPulseIds` or `linkedPulseId`, which appear in some error payloads but are not valid write keys.
        * Use [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/columns#change-multiple-column-values) for connect boards columns, not [`change_column_value`](https://developer.monday.com/api-reference/reference/columns#change-a-column-value).
      </td>
    </tr>

    <tr>
      <td>
        `CorrectedValueException`
      </td>

      <td>
        200
      </td>

      <td>
        The query is of the wrong type
      </td>

      <td>
        If you try to update a column with simple values (`String` values), ensure the column supports this type of value format.
      </td>
    </tr>

    <tr>
      <td>
        `CreateBoardException`
      </td>

      <td>
        200
      </td>

      <td>
        Error in your create board mutation
      </td>

      <td>
        * If you’re creating a board from a template, ensure the template ID is a valid monday template or a board that has template status. To learn more about making a board a template, check out our resource on board templates [here](https://support.monday.com/hc/en-us/articles/360001362625-Does-monday-com-offer-templates-).
        * If you’re duplicating a board, ensure the board ID exists.
      </td>
    </tr>

    <tr>
      <td>
        `InvalidArgumentException`
      </td>

      <td>
        200
      </td>

      <td>
        The argument being passed in the query is invalid, you've hit a pagination limit, you're querying a subitem board ID, or a board ID is not found
      </td>

      <td>
        * Check your argument for typos.
        * Verify that the argument exists for the object you are querying.
        * Make your result window smaller.
        * For [`move_item_to_board`](https://developer.monday.com/api-reference/reference/items#move-item-to-board), ensure `columns_mapping` is an array of `{ source, target }` objects — see the [format reference](https://developer.monday.com/api-reference/reference/items#move-item-to-board).
      </td>
    </tr>

    <tr>
      <td>
        `InvalidBoardIdException`
      </td>

      <td>
        200
      </td>

      <td>
        The board ID being passed in the query is invalid
      </td>

      <td>
        Verify that the board ID exists and that you have access to it. 
      </td>
    </tr>

    <tr>
      <td>
        `InvalidColumnIdException`
      </td>

      <td>
        200
      </td>

      <td>
        The column ID being passed in the query is invalid
      </td>

      <td>
        Verify that the column ID exists and that you have access to it. 
      </td>
    </tr>

    <tr>
      <td>
        `InvalidUserIdException`
      </td>

      <td>
        200
      </td>

      <td>
        The user ID being passed in the query is invalid
      </td>

      <td>
        Verify that the user ID exists and that the user is assigned to your board. 
      </td>
    </tr>

    <tr>
      <td>
        `InvalidVersionException`
      </td>

      <td>
        200
      </td>

      <td>
        The requested API version is invalid
      </td>

      <td>
        Ensure that your request follows the proper [format](https://developer.monday.com/api-reference/docs/api-versioning#selecting-a-version). 
      </td>
    </tr>

    <tr>
      <td>
        `ItemNameTooLongException`
      </td>

      <td>
        200
      </td>

      <td>
        The item name has exceeded the allotted number of characters
      </td>

      <td>
        Ensure the item name is 1-255 characters in length. 
      </td>
    </tr>

    <tr>
      <td>
        `ItemsLimitationException`
      </td>

      <td>
        200
      </td>

      <td>
        You have exceeded the limit of 10,000 items per board
      </td>

      <td>
        Reduce the number of items on the board. 
      </td>
    </tr>

    <tr>
      <td>
        `missingRequiredPermissions`
      </td>

      <td>
        200
      </td>

      <td>
        The operation has exceeded the OAuth permission scopes granted for the app
      </td>

      <td>
        Review your app's [permission scopes](https://developer.monday.com/apps/docs/oauth#permission-scopes) to ensure the correct ones are requested.
      </td>
    </tr>

    <tr>
      <td>
        `Parse error on...`
      </td>

      <td>
        200
      </td>

      <td>
        Incorrect query string formatting
      </td>

      <td>
        * Verify that all strings are valid in your query. 
        * Close all parentheses, brackets, and curly brackets. 
      </td>
    </tr>

    <tr>
      <td>
        `ResourceNotFoundException`
      </td>

      <td>
        200
      </td>

      <td>
        The ID being passed in your query is invalid
      </td>

      <td>
        * Verify that the ID of the item, group, or board you're querying exists.
        * **Column not found:** The column ID may be wrong, or the column was deleted while an automation or integration still references it. Check the board in the UI and update or remove automations that reference the missing column.
      </td>
    </tr>
  </tbody>
</Table>

## 4xx client errors

Errors with a 4xx status code indicate that something went wrong on the client's (your) side. These errors occur for various reasons, including a lack of access to the requested information, excessive use of the API, or providing incorrect input.

Here are **some** of the most common errors:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Error
      </th>

      <th>
        HTTP status code
      </th>

      <th>
        Description
      </th>

      <th>
        Resolution
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `Bad request`
      </td>

      <td>
        400
      </td>

      <td>
        The structure of your query string was passed incorrectly
      </td>

      <td>
        * Pass your query string with the `query` key.
        * Send your request as a POST request with a JSON body. 
        * Avoid unterminated strings in your query.
      </td>
    </tr>

    <tr>
      <td>
        `JsonParseException`
      </td>

      <td>
        400
      </td>

      <td>
        Issues interpreting the provided JSON
      </td>

      <td>
        Verify all JSON is valid using a JSON validator (e.g., [JSON lint](https://jsonlint.com/) )
      </td>
    </tr>

    <tr>
      <td>
        `Unauthorized`
      </td>

      <td>
        401
      </td>

      <td>
        You don't have permission to access the data
      </td>

      <td>
        * Input a valid API key.
        * Pass the key in the `Authorization` header. 
      </td>
    </tr>

    <tr>
      <td>
        `Your ip is restricted`
      </td>

      <td>
        401
      </td>

      <td>
        An account admin has restricted access to the system from specific IP addresses
      </td>

      <td>
        Confirm that your IP address is not restricted by your account admin.
      </td>
    </tr>

    <tr>
      <td>
        `UserUnauthorizedException`
      </td>

      <td>
        403
      </td>

      <td>
        The user doesn't have the required permission to perform the action in question
      </td>

      <td>
        Verify that the user has permission to access or edit the given resource.
      </td>
    </tr>

    <tr>
      <td>
        `USER_ACCESS_DENIED`
      </td>

      <td>
        403
      </td>

      <td>
        The user is unauthorized to use the API
      </td>

      <td>
        Verify that the user is active, not view-only, and has a confirmed email address.
      </td>
    </tr>

    <tr>
      <td>
        `ResourceNotFoundException`
      </td>

      <td>
        404
      </td>

      <td>
        The ID being passed in the query is invalid
      </td>

      <td>
        Verify that the ID of the user you are querying exists and is assigned to your board.
      </td>
    </tr>

    <tr>
      <td>
        `DeleteLastGroupException`
      </td>

      <td>
        409
      </td>

      <td>
        The last group on a board is being deleted or archived
      </td>

      <td>
        Verify that you have at least one group on the board. 
      </td>
    </tr>

    <tr>
      <td>
        `IDEMPOTENCY_CONFLICT`
      </td>

      <td>
        409
      </td>

      <td>
        A request with this idempotency key is currently being processed
      </td>

      <td>
        Retry after the duration specified in the `Retry-After` response header. See <a href="https://developer.monday.com/api-reference/docs/idempotency">Idempotency</a> for details.
      </td>
    </tr>

    <tr>
      <td>
        `RecordInvalidException`
      </td>

      <td>
        422
      </td>

      <td>
        Indicates one of the following:

        * A board has exceeded 400 individual subscribers or 100 team subscribers
        * A user or team has subscribed to more than 10,000 boards
      </td>

      <td>
        * Learn how to [optimize board subscribers](tps://support.monday.com/hc/en-us/articles/14667682024594https://support.monday.com/hc/en-us/articles/14667682024594). 
        * Unsubscribe from, delete, or archive irrelevant boards. 
      </td>
    </tr>

    <tr>
      <td>
        `Resource is currently locked, please try again later`
      </td>

      <td>
        423
      </td>

      <td>
        The board is temporarily locked because another process is performing a concurrent update (e.g., column update, automation). During this time, write operations are blocked to ensure data consistency.
      </td>

      <td>
        * Retry the request after a short delay. 
        * Avoid concurrent updates to the same board from multiple sources.
      </td>
    </tr>

    <tr>
      <td>
        `maxConcurrencyExceeded`
      </td>

      <td>
        429
      </td>

      <td>
        You exceeded the maximum number of queries allowed at once
      </td>

      <td>
        * Reduce the number of queries sent at once.
        * Use a retry mechanism in your code. 
      </td>
    </tr>

    <tr>
      <td>
        `Rate Limit Exceeded`
      </td>

      <td>
        429
      </td>

      <td>
        You made more than 5,000 requests in one minute
      </td>

      <td>
        Reduce the number of requests sent in one minute. 
      </td>
    </tr>

    <tr>
      <td>
        `COMPLEXITY_BUDGET_EXHAUSTED`
      </td>

      <td>
        429
      </td>

      <td>
        You have reached the complexity limit
      </td>

      <td>
        * Utilize the `limits` and `page` arguments. 
        * Only request the information you need. 
        * Read more about [rate limits](https://developer.monday.com/api-reference/docs/rate-limits). 
      </td>
    </tr>

    <tr>
      <td>
        `IP_RATE_LIMIT_EXCEEDED`
      </td>

      <td>
        429
      </td>

      <td>
        You have reached the [IP limit](https://developer.monday.com/api-reference/docs/rate-limits#ip-limit)
      </td>

      <td>
        * Wait for the specified period in the error response before retrying your call. 
        * Learn about [optimizing your API usage](https://developer.monday.com/api-reference/docs/optimizing-api-usage#optimize-your-calls). 
      </td>
    </tr>
  </tbody>
</Table>

## 5xx server errors

Errors with a 5xx status code indicate that something went wrong on the server's (monday's) side.

Here are **some** of the most common errors:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Error
      </th>

      <th>
        HTTP status code
      </th>

      <th>
        Description
      </th>

      <th>
        Resolution
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `Internal Server Error`
      </td>

      <td>
        500
      </td>

      <td>
        Indicates that something went wrong. Common causes are:

        * Invalid arguments, such as board or item IDs that don't exist
        * Malformatted JSON column values
      </td>

      <td>
        * Retry your request after a short period.
        * Double-check your request's format. 
        * Ensure your API token has the right permissions. 
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
