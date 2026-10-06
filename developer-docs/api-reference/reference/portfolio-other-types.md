---
updatedAt: 2026-09-06T08:36:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

The monday.com [`portfolio`](https://developer.monday.com/api-reference/reference/form) API lets you create portfolio solution boards.

Each object type described below represents a specific part of a portfolio solution. You can use these object types to supply metadata in mutations or to define which fields should be returned in your queries.

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

<br />
