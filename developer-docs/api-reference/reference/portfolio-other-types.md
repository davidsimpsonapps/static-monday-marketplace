---
updatedAt: 2026-11-12T07:24:02.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

The monday.com [`portfolio`](https://developer.monday.com/api-reference/reference/form) API lets you create portfolio solution boards.

Each object type described below represents a specific part of a portfolio solution. You can use these object types to supply metadata in mutations or to define which fields should be returned in your queries.

# AddExistingProjectsToPortfolioResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An object containing the result of starting a bulk add of existing projects to a portfolio.

| Field          | Description                                         |
| :------------- | :-------------------------------------------------- |
| batch\_id `ID` | The unique identifier of the started batch.         |
| total `Int`    | The number of distinct projects queued to be added. |

***

# ConnectProjectResult

An object containing the result of connecting a portfolio and project board via the API.

| Field                        | Description                                                                                                                                              |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message `String`             | A message describing the result of the operation.                                                                                                        |
| portfolio\_item\_id `String` | The unique identifier of the portfolio item that was created (if successful).                                                                            |
| process\_id `ID`             | A unique process identifier returned when using a `callback_url`. Use it to correlate the callback response. Available from version `2026-07` and later. |
| success `Boolean`            | Whether the operation was successful.                                                                                                                    |

***

# ConvertBoardToProjectInput

An object containing the board's properties.

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
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_id `ID!`
      </td>

      <td>
        The unique identifier of the board to convert.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        callback_url `String`
      </td>

      <td>
        The URL to receive async operation results (optional, but recommended).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        column_mappings [`ColumnsMappingInput!`](https://developer.monday.com/api-reference/reference/portfolio-other-types#columnsmappinginput)
      </td>

      <td>
        The mapping of project field keys to existing board column IDs.
      </td>

      <td>
        project_owner `ID!`  
        project_status `ID!`  
        project_timeline `ID!`
      </td>
    </tr>
  </tbody>
</Table>

## ColumnsMappingInput

An object containing the column mapping properties.

| Field                   | Description                                              |
| :---------------------- | :------------------------------------------------------- |
| project\_owner `ID!`    | The column representing the project's owner.             |
| project\_status `ID!`   | The column representing the project's status.            |
| project\_timeline `ID!` | The column representing the project's timeline or dates. |

***

# ConvertBoardToProjectResult

An object containing the result of converting an existing board to a project board via the API.

| Field                | Description                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------ |
| message `String`     | A message describing the result of the operation.                                                 |
| process\_id `String` | The unique identifier that's generated for this process and will be sent to the callback request. |
| projectId `ID`       | The new project board's unique identifier.                                                        |
| success `Boolean`    | Whether the operation was successful.                                                             |

***

# CreatePortfolioResult

An object containing the result of creating a new portfolio board via the API.

| Field                                | Description                                                                                                                                                                                                                                                                                     |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message `String`                     | A message describing the result of the operation.                                                                                                                                                                                                                                               |
| process\_id `ID`                     | A unique process identifier returned when using a `callback_url`. The same value is included in the callback payload so you can correlate the initial request with the completion notification. Returns `null` when no `callback_url` was provided. Available from version `2026-07` and later. |
| solution\_live\_version\_id `String` | The unique identifier of the solution template that was used to create the portfolio. This is **not** the portfolio board ID — use the `callback_url` flow to retrieve the `portfolio_id` directly, or poll workspace boards.                                                                   |
| success `Boolean`                    | Whether the operation was successful.                                                                                                                                                                                                                                                           |

***

# CreateProjectInput

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the new project board's properties.

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
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_kind `BoardKind!`
      </td>

      <td>
        The board's privacy setting. Defaults to `public`.
      </td>

      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        callback_url `String`
      </td>

      <td>
        The callback URL to send the project ID to after asynchronous creation.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        companions `[String!]`
      </td>

      <td>
        A list of companion features to enable. Currently only supports `"resource_planner"`. Can't be used with `template_id`.
      </td>

      <td>
        `"resource_planner"`
      </td>
    </tr>

    <tr>
      <td>
        folder_id `String`
      </td>

      <td>
        The unique identifier of the folder to associate with the project. If used with `workspace_id`, the folder must exist inside the provided workspace.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name `String!`
      </td>

      <td>
        The board's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        template_id `ID`
      </td>

      <td>
        The unique identifier of the template to create the project from. Currently only supported for solution templates. Can't be used with `companions`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        workspace_id `String`
      </td>

      <td>
        The unique identifier of the workspace to associate with the project. If omitted, the project will be created in the default workspace.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# CreateProjectResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the result of creating a project board via the API.

| Field             | Description                                                                                                                                                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error `String`    | An error message when the request fails.                                                                                                                                                                                                                                    |
| message `String`  | A message when the request succeeds.                                                                                                                                                                                                                                        |
| process\_id `ID`  | A unique process identifier to track the request. Only returned when a `callback_url` is provided. This ID will be included in the callback payload for correlating the initial request with the completion notification. Returns `null` if no `callback_url` was provided. |
| success `Boolean` | Whether the operation was successful.                                                                                                                                                                                                                                       |

***

# HaltPortfolioBulkAddBatchResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An object containing the result of halting the bulk add that is running on a portfolio.

| Field            | Description                           |
| :--------------- | :------------------------------------ |
| halted `Boolean` | Whether the running batch was halted. |

***

# PortfolioBulkAddFailedItem

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An object describing a project that a bulk add did not attach to the portfolio.

| Field                                                                                                                                                    | Description                                                                            |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| is\_retryable `Boolean`                                                                                                                                  | Whether adding the project again may succeed.                                          |
| project\_id `ID`                                                                                                                                         | The unique identifier of the project.                                                  |
| project\_name `String`                                                                                                                                   | The name of the project. Returns `null` when the bulk add was started through the API. |
| reason\_code [`PortfolioBulkAddFailureReason`](https://developer.monday.com/api-reference/reference/portfolio-other-types#portfoliobulkaddfailurereason) | Why the project was not added.                                                         |

***

# PortfolioBulkAddFailureReason

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An enum describing why a bulk add did not attach a project to the portfolio.

| Enum Value                           | Description                                                                                |
| :----------------------------------- | :----------------------------------------------------------------------------------------- |
| `ACCOUNT_LIMIT_EXCEEDED`             | The account reached a limit of its plan.                                                   |
| `ACCOUNT_NOT_ELIGIBLE`               | The plan or products of the account do not support adding projects.                        |
| `ALREADY_CONNECTED_TO_PORTFOLIO`     | The project is already connected to a portfolio.                                           |
| `BATCH_HALTED`                       | The bulk add was halted before the project was processed.                                  |
| `CONNECTION_INCOMPLETE`              | An earlier connection of the project did not finish and must be fixed by hand.             |
| `INVALID_PROJECT`                    | The board is not a valid project.                                                          |
| `MULTI_LEVEL_SUBITEMS_NOT_SUPPORTED` | The project uses multi-level subitems, which portfolios do not support.                    |
| `OWNER_REQUIRED`                     | The user is not allowed to add the project, for example because they do not own it.        |
| `PORTFOLIO_ARCHIVED`                 | The portfolio is archived.                                                                 |
| `PORTFOLIO_INVALID_STATE`            | The portfolio is not in a state that allows adding projects.                               |
| `PORTFOLIO_ITEMS_LIMIT_REACHED`      | The portfolio reached its maximum number of items.                                         |
| `PORTFOLIO_NOT_FOUND`                | The portfolio was not found.                                                               |
| `PROJECT_ARCHIVED`                   | The project is archived.                                                                   |
| `PROJECT_NOT_FOUND`                  | The project was not found.                                                                 |
| `STRUCTURES_LIMIT_REACHED`           | Adding the project would exceed the portfolio's structures limit.                          |
| `UNKNOWN`                            | An unexpected error. Check `is_retryable` to know if adding the project again may succeed. |

***

# PortfolioBulkAddResultsResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An object containing the outcome of the last finished bulk add on a portfolio.

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
        Arguments
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        batch_id `ID`
      </td>

      <td>
        The unique identifier of the last finished batch. Compare it with the `batch_id` returned by `add_existing_projects_to_portfolio` to check that the results belong to that bulk add.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        failed `Int`
      </td>

      <td>
        The number of projects that failed or were skipped.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        failed_items [[`PortfolioBulkAddFailedItem!`](https://developer.monday.com/api-reference/reference/portfolio-other-types#portfoliobulkaddfaileditem)]!
      </td>

      <td>
        One page of the projects that were not added, ordered by project ID. Use `failed` for the total. Returns an empty list when every project was added or the page is past the end.
      </td>

      <td>
        `limit` `Int`: The number of projects per page. Default: `100`, minimum: `1`, maximum: `500`. Values above the maximum are treated as the maximum.  
        `page` `Int`: The 1-based page number to return. Default: `1`, minimum: `1`.
      </td>
    </tr>

    <tr>
      <td>
        succeeded `Int`
      </td>

      <td>
        The number of projects that were added.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        total `Int`
      </td>

      <td>
        The number of projects in the batch.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# PortfolioBulkAddState

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An enum describing the state of the bulk add on a portfolio.

| Enum Value | Description                              |
| :--------- | :--------------------------------------- |
| `HALTING`  | The running bulk add is being halted.    |
| `IDLE`     | No bulk add is running on the portfolio. |
| `RUNNING`  | A bulk add is running on the portfolio.  |

***

# PortfolioBulkAddStatusResult

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

An object containing the progress of the bulk add that is currently running on a portfolio.

| Field                                                                                                                             | Description                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| completed `Int`                                                                                                                   | The number of projects in the running batch that were already processed.           |
| is\_submitter `Boolean`                                                                                                           | Whether the calling user started the running batch. Only that user can halt it.    |
| state [`PortfolioBulkAddState`](https://developer.monday.com/api-reference/reference/portfolio-other-types#portfoliobulkaddstate) | The state of the bulk add on the portfolio.                                        |
| total `Int`                                                                                                                       | The number of projects in the running batch. Returns `0` when no batch is running. |

<br />
