---
updatedAt: 2026-11-12T07:30:07.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Portfolio

Learn how to create and update portfolio solutions boards using the platform API

The monday.com [portfolio solution](https://support.monday.com/hc/en-us/articles/13337066797202-The-portfolio-solution) provides a structure for managing projects at both high and granular levels. A solution is made up of two board types:

* **Portfolio board:** Connects multiple project boards to give a consolidated, interactive overview of all projects.
* **Project board:** Used for managing individual project details. Updates sync automatically to the portfolio board.

:construction: Portfolio solutions are only available on **Enterprise plans**.

<Callout icon="📘" theme="info">
  **Building with AI agents?**

  See the [Portfolio Agent Skills](https://developer.monday.com/api-reference/docs/portfolio-agent-skills) guide for multi-step workflows and implementation patterns.
</Callout>

# Queries

**Required scope: `boards:read`**

## Get portfolio bulk add status

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

Returns the progress of the bulk add that is currently running on a portfolio. Returns [`PortfolioBulkAddStatusResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#portfoliobulkaddstatusresult). Start a bulk add with [`add_existing_projects_to_portfolio`](#add-existing-projects-to-portfolio).

```graphql GraphQL
query {
  portfolio_bulk_add_status(portfolio_id: 9876543210) {
    state
    total
    completed
    is_submitter
  }
}
```

### Arguments

| Argument      | Type  | Description                                                             |
| :------------ | :---- | :---------------------------------------------------------------------- |
| portfolio\_id | `ID!` | The unique identifier of the portfolio to get the bulk add progress of. |

## Get portfolio bulk add results

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

Returns the outcome of the last finished bulk add on a portfolio. Returns [`PortfolioBulkAddResultsResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#portfoliobulkaddresultsresult).

```graphql GraphQL
query {
  portfolio_bulk_add_results(portfolio_id: 9876543210) {
    batch_id
    total
    succeeded
    failed
    failed_items(page: 1, limit: 100) {
      project_id
      project_name
      reason_code
      is_retryable
    }
  }
}
```

### Arguments

| Argument      | Type  | Description                                                                 |
| :------------ | :---- | :-------------------------------------------------------------------------- |
| portfolio\_id | `ID!` | The unique identifier of the portfolio to get the last bulk add outcome of. |

# Mutations

* 🚧 Only available for Enterprise plans
* **Required scope:`boards:write`**

## Create portfolio board

Creates a new portfolio board. Returns [`CreatePortfolioResult`](https://developer.monday.com/api-reference/reference/other-types#create-portfolio-result).

```graphql GraphQL
mutation {
  create_portfolio(
    boardName: "New Portfolio Board"
    boardPrivacy: "private"
    destinationWorkspaceId: 12345
    callback_url: "https://your-domain.com/webhook/portfolio-created"
  ) {
    success
    message
    process_id
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
        Accepted Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        boardName
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new portfolio board's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        boardPrivacy
      </td>

      <td>
        `String!`
      </td>

      <td>
        The new portfolio board's privacy settings.
      </td>

      <td>
        `"private"`  
        `"share"`
      </td>
    </tr>

    <tr>
      <td>
        callback_url
      </td>

      <td>
        `String`
      </td>

      <td>
        An HTTPS URL to receive the new `portfolio_id` asynchronously. When provided, the mutation returns immediately with a `process_id`; the callback receives `{ is_success, process_id, portfolio_id }` once the portfolio board is created. Available from version `2026-07` and later.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        destinationWorkspaceId
      </td>

      <td>
        `Int`
      </td>

      <td>
        The unique identifier of the workspace to create the portfolio board in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Create project board

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

Creates a new project board. Returns [`CreateProjectResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#createprojectresult).

```graphql GraphQL
mutation {
  create_project(
    input: {
      name: "Q1 2026 Marketing Campaign"
      board_kind: public
      workspace_id: "123456"
      folder_id: "9876543210"
      companions: ["resource_planner"]
      callback_url: "https://your-domain.com/webhook/project-created"
    }
  ) {
    success
    message
    process_id
    error
  }
}
```

### Arguments

| Argument | Type                                                                                                                   | Description                                              |
| :------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| input    | [`CreateProjectInput!`](https://developer.monday.com/api-reference/reference/portfolio-other-types#createprojectinput) | An object containing the new project board's properties. |

## Convert board to project

Converts an existing board into a project board. Returns [`ConvertBoardToProjectResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#convertboardtoprojectresult).

```graphql GraphQL
mutation {
  convert_board_to_project(
    input: {
      board_id: 1234567890
      column_mappings: {
        project_status: "status_column_id"
        project_owner: "person_column_id"
        project_timeline: "date_column_id"
      }
      callback_url: "https://your-callback-url.com"
    }
  )  {
    success
    message
    process_id
    projectId
  } 
}
```

### Arguments

| Argument | Type                                                                                                                                   | Description                                              |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| input    | [`ConvertBoardToProjectInput!`](https://developer.monday.com/api-reference/reference/portfolio-other-types#convertboardtoprojectinput) | The unique identifier of the portfolio board to connect. |

## Connect project to portfolio

Connects an existing project board to a portfolio board by creating a linked item in the portfolio. Returns [`ConnectProjectResult`](https://developer.monday.com/api-reference/reference/other-types#connect-project-result).

<Callout icon="🚧" theme="warning">
This mutation has an additional rate limit of **40** mutations per minute.
</Callout>

```graphql GraphQL
mutation {
  connect_project_to_portfolio(
    projectBoardId: 1234567890
    portfolioBoardId: 9876543210
  ) {
    portfolio_item_id
    process_id
    message
    success
  }
}
```

### Arguments

| Argument         | Type     | Description                                                                                                                                                                                                                                                                       |
| :--------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| portfolioBoardId | `ID!`    | The unique identifier of the portfolio board to connect.                                                                                                                                                                                                                          |
| projectBoardId   | `ID!`    | The unique identifier of the project board to connect.                                                                                                                                                                                                                            |
| callback\_url    | `String` | An HTTPS URL to receive the operation result asynchronously. When provided, the mutation returns immediately with a `process_id`; the callback receives `{ is_success, process_id, portfolio_item_id }` once the operation completes. Available from version `2026-07` and later. |

## Add existing projects to portfolio

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

Starts adding existing projects to a portfolio in the background. Returns [`AddExistingProjectsToPortfolioResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#addexistingprojectstoportfolioresult).

* You need permission to add items to the portfolio.
* Only one bulk add can run on a portfolio at a time.
* The whole request is refused when the projects would exceed the portfolio's structures limit.

Track the progress with [`portfolio_bulk_add_status`](#get-portfolio-bulk-add-status), read the outcome with [`portfolio_bulk_add_results`](#get-portfolio-bulk-add-results), and stop the bulk add with [`halt_portfolio_bulk_add_batch`](#halt-portfolio-bulk-add).

To follow a bulk add end to end:

1. Call this mutation and keep the returned `batch_id`.
2. Query `portfolio_bulk_add_status` to see the progress. A `state` of `IDLE` means no bulk add is running on the portfolio.
3. Query `portfolio_bulk_add_results` and compare its `batch_id` with the one from step 1 to check that the results belong to your bulk add.

```graphql GraphQL
mutation {
  add_existing_projects_to_portfolio(
    portfolio_id: 9876543210
    project_ids: [1234567890, 1234567891]
  ) {
    batch_id
    total
  }
}
```

### Arguments

| Argument      | Type     | Description                                                                                                   |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------ |
| portfolio\_id | `ID!`    | The unique identifier of the portfolio to add the projects to.                                                |
| project\_ids  | `[ID!]!` | The unique identifiers of the projects to add to the portfolio. Duplicate IDs are added once. Maximum: 5,000. |

## Halt portfolio bulk add

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2027-04`](https://developer.monday.com/api-reference/docs/release-notes#2027-04) and later**
</Callout>

Halts the bulk add that is running on a portfolio. Only the user who started the bulk add can halt it, and projects that were already added stay in the portfolio. Returns [`HaltPortfolioBulkAddBatchResult`](https://developer.monday.com/api-reference/reference/portfolio-other-types#haltportfoliobulkaddbatchresult).

```graphql GraphQL
mutation {
  halt_portfolio_bulk_add_batch(portfolio_id: 9876543210) {
    halted
  }
}
```

### Arguments

| Argument      | Type  | Description                                                            |
| :------------ | :---- | :--------------------------------------------------------------------- |
| portfolio\_id | `ID!` | The unique identifier of the portfolio whose running bulk add to halt. |
