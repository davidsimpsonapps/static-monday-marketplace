---
updatedAt: 2026-09-06T08:36:28.000Z
agentTools:
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
