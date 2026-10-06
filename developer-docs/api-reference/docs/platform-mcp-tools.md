---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Platform MCP tools

Complete reference for all tools available in the monday.com Platform MCP server, organized by category, with links to individual tool pages and equivalent GraphQL APIs.

The monday.com [Platform MCP](https://github.com/mondaycom/mcp) exposes more than 60 tools that let AI agents read and write monday.com data. Most tools map to one or more operations in the monday.com GraphQL API, so anything you do through the MCP you can also do programmatically. Some newer tools (workflows, automations, agents, and asset uploads) run against the monday.com dev (preview) API schema and are subject to change.

Use this page to browse all available tools by category, then follow the links to individual reference pages for parameters, examples, and the equivalent API calls.

***

# Boards & Items

Core tools for creating, reading, and updating boards, groups, columns, and items — the fundamental building blocks of monday.com.

| Tool                                                          | Description                                            | GraphQL API                                                                                                                 |
| :------------------------------------------------------------ | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [create\_board](https://developer.monday.com/api-reference/docs/create-board)                             | Create a new board in a workspace                      | [`create_board`](https://developer.monday.com/api-reference/reference/boards#create-a-board)                                |
| [get\_board\_info](https://developer.monday.com/api-reference/docs/get-board-info)                        | Get board metadata, columns, groups, views, and owners | [`boards`](https://developer.monday.com/api-reference/reference/boards#get-boards)                                          |
| [get\_board\_items\_page](https://developer.monday.com/api-reference/docs/get-board-items)                | Paginate through all items on a board                  | [`items_page`](https://developer.monday.com/api-reference/reference/items-page)                                             |
| [get\_board\_activity](https://developer.monday.com/api-reference/docs/get-board-activity)                | Retrieve activity logs for a board                     | [`boards { activity_logs }`](https://developer.monday.com/api-reference/reference/activity-logs)                            |
| [board\_insights](https://developer.monday.com/api-reference/docs/board-insights)                         | Aggregate, filter, and group board data                | [`items_by_column_values`](https://developer.monday.com/api-reference/reference/items#get-items-by-column-values)           |
| [create\_group](https://developer.monday.com/api-reference/docs/create-group)                             | Create a new group inside a board                      | [`create_group`](https://developer.monday.com/api-reference/reference/groups#create-a-group)                                |
| [create\_column](https://developer.monday.com/api-reference/docs/create-column)                           | Add a new column to a board                            | [`create_column`](https://developer.monday.com/api-reference/reference/columns#create-a-column)                             |
| [get\_column\_type\_info](https://developer.monday.com/api-reference/docs/get-column-type-info)           | Get schema and settings for a column type              | [Column types reference](https://developer.monday.com/api-reference/reference/column-types-reference)                       |
| [create\_item](https://developer.monday.com/api-reference/docs/create-item)                               | Create an item, subitem, or duplicate an existing item | [`create_item`](https://developer.monday.com/api-reference/reference/items#create-an-item)                                  |
| [change\_item\_column\_values](https://developer.monday.com/api-reference/docs/change-item-column-values) | Update one or more column values on an item            | [`change_multiple_column_values`](https://developer.monday.com/api-reference/reference/items#change-multiple-column-values) |

***

# Workspaces & Organization

Tools for managing workspaces, folders, and the position of objects within the monday.com hierarchy.

| Tool                                      | Description                                               | GraphQL API                                                                                              |
| :---------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| [create\_workspace](https://developer.monday.com/api-reference/docs/create-workspace) | Create a new workspace                                    | [`create_workspace`](https://developer.monday.com/api-reference/reference/workspaces#create-a-workspace) |
| [update\_workspace](https://developer.monday.com/api-reference/docs/update-workspace) | Update an existing workspace's name, kind, or description | [`update_workspace`](https://developer.monday.com/api-reference/reference/workspaces#update-a-workspace) |
| [list\_workspaces](https://developer.monday.com/api-reference/docs/list-workspaces)   | List all workspaces available to the user                 | [`workspaces`](https://developer.monday.com/api-reference/reference/workspaces#get-workspaces)           |
| [workspace\_info](https://developer.monday.com/api-reference/docs/workspace-info)     | Get boards, docs, and folders within a workspace          | [`workspaces`](https://developer.monday.com/api-reference/reference/workspaces#get-workspaces)           |
| [create\_folder](https://developer.monday.com/api-reference/docs/create-folder)       | Create a new folder in a workspace                        | [`create_folder`](https://developer.monday.com/api-reference/reference/folders#create-a-folder)          |
| [update\_folder](https://developer.monday.com/api-reference/docs/update-folder)       | Rename, recolor, or move a folder                         | [`update_folder`](https://developer.monday.com/api-reference/reference/folders#update-a-folder)          |
| [move\_object](https://developer.monday.com/api-reference/docs/move-object)           | Move a board, folder, or overview to a new location       | [`move_to_folder`](https://developer.monday.com/api-reference/reference/folders)                         |

***

# Docs

Tools for creating, updating, and reading monday.com WorkDocs.

| Tool                          | Description                                                | GraphQL API                                                                            |
| :---------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| [create\_doc](https://developer.monday.com/api-reference/docs/create-doc) | Create a new WorkDoc in a workspace or attached to an item | [`create_doc`](https://developer.monday.com/api-reference/reference/docs#create-a-doc) |
| [update\_doc](https://developer.monday.com/api-reference/docs/update-doc) | Update content and blocks in an existing doc               | [`add_blocks_to_document`](https://developer.monday.com/api-reference/reference/docs)  |
| [read\_docs](https://developer.monday.com/api-reference/docs/read-docs)   | Fetch documents by ID, object ID, or workspace             | [`docs`](https://developer.monday.com/api-reference/reference/docs#get-docs)           |

***

# Dashboards & Widgets

Tools for building data visualization dashboards and adding widgets to them.

| Tool                                           | Description                                                     | GraphQL API                                                                                                      |
| :--------------------------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [create\_dashboard](https://developer.monday.com/api-reference/docs/create-dashboard)      | Create a new dashboard aggregating data from one or more boards | [`create_board`](https://developer.monday.com/api-reference/reference/boards#create-a-board) (type: `dashboard`) |
| [create\_widget](https://developer.monday.com/api-reference/docs/create-widget)            | Add a widget to a dashboard or board view                       | [`create_widget`](https://developer.monday.com/api-reference/reference/widgets)                                  |
| [all\_widgets\_schema](https://developer.monday.com/api-reference/docs/all-widgets-schema) | Fetch JSON Schema definitions for all available widget types    | —                                                                                                                |

***

# Views

Tools for creating and updating board views (tabs), including table views with column visibility and group-by settings.

| Tool                                         | Description                                                   | GraphQL API                                                                             |
| :------------------------------------------- | :------------------------------------------------------------ | :-------------------------------------------------------------------------------------- |
| [create\_view](https://developer.monday.com/api-reference/docs/create-view)              | Create a board view (tab) with optional filters and sorting   | [`create_view`](https://developer.monday.com/api-reference/reference/board-views)       |
| [update\_view](https://developer.monday.com/api-reference/docs/update-view)              | Update a view's name, filters, or sort order                  | [`update_view`](https://developer.monday.com/api-reference/reference/board-views)       |
| [create\_view\_table](https://developer.monday.com/api-reference/docs/create-view-table) | Create a table view with column visibility/order and group-by | [`create_view_table`](https://developer.monday.com/api-reference/reference/board-views) |
| [update\_view\_table](https://developer.monday.com/api-reference/docs/update-view-table) | Update a table view's settings, filters, sort, or tags        | [`update_view_table`](https://developer.monday.com/api-reference/reference/board-views) |

***

# Forms

Tools for creating and managing monday.com WorkForms, including questions and submissions.

| Tool                                                   | Description                                   | GraphQL API |
| :----------------------------------------------------- | :-------------------------------------------- | :---------- |
| [create\_form](https://developer.monday.com/api-reference/docs/create-form)                        | Create a new WorkForm with a backing board    | —           |
| [get\_form](https://developer.monday.com/api-reference/docs/get-form)                              | Retrieve a WorkForm by its token              | —           |
| [update\_form](https://developer.monday.com/api-reference/docs/update-form)                        | Update form settings, password, or tags       | —           |
| [form\_questions\_editor](https://developer.monday.com/api-reference/docs/form-questions-editor)   | Create, update, or delete questions on a form | —           |
| [create\_form\_submission](https://developer.monday.com/api-reference/docs/create-form-submission) | Submit a response to a WorkForm               | —           |

***

# Users & Teams

Tools for looking up users and teams in the monday.com account.

| Tool                                                | Description                                                     | GraphQL API                                                                                                                                            |
| :-------------------------------------------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [get\_user\_context](https://developer.monday.com/api-reference/docs/get-user-context)          | Get the current user, account info, and their boards/workspaces | [`me`](https://developer.monday.com/api-reference/reference/users#get-your-own-user-information)                                                       |
| [list\_users\_and\_teams](https://developer.monday.com/api-reference/docs/list-users-and-teams) | Fetch users and/or teams by ID or name                          | [`users`](https://developer.monday.com/api-reference/reference/users#get-users), [`teams`](https://developer.monday.com/api-reference/reference/teams) |

***

# Updates & Notifications

Tools for posting comments on items and sending notifications to users.

| Tool                                            | Description                                               | GraphQL API                                                                                                       |
| :---------------------------------------------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| [create\_update](https://developer.monday.com/api-reference/docs/create-update)             | Post a comment or reply on an item                        | [`create_update`](https://developer.monday.com/api-reference/reference/updates#create-an-update)                  |
| [get\_updates](https://developer.monday.com/api-reference/docs/get-updates)                 | Retrieve updates (comments) from an item or board         | [`updates`](https://developer.monday.com/api-reference/reference/updates#get-updates)                             |
| [create\_notification](https://developer.monday.com/api-reference/docs/create-notification) | Send a bell notification (and optionally email) to a user | [`create_notification`](https://developer.monday.com/api-reference/reference/notifications#create-a-notification) |

***

# Search & Assets

Tools for searching across the account and accessing uploaded files.

| Tool                                                 | Description                                                      | GraphQL API                                                                                                                                  |
| :--------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [search](https://developer.monday.com/api-reference/docs/mcp-search)                             | Search for boards, documents, forms, and folders                 | [`boards`](https://developer.monday.com/api-reference/reference/boards), [`docs`](https://developer.monday.com/api-reference/reference/docs) |
| [get\_assets](https://developer.monday.com/api-reference/docs/get-assets)                        | Retrieve file metadata and download URLs by asset ID             | [`assets`](https://developer.monday.com/api-reference/reference/assets)                                                                      |
| [get\_asset\_upload\_url](https://developer.monday.com/api-reference/docs/get-asset-upload-url)  | Get a presigned URL to upload a file (step 1 of 2)               | `create_upload` (dev)                                                                                                                        |
| [finalize\_asset\_upload](https://developer.monday.com/api-reference/docs/finalize-asset-upload) | Complete an upload and attach the asset to an item (step 2 of 2) | `complete_upload` (dev)                                                                                                                      |

***

# Workflows & Automations

Tools for building cross-board, workspace-level workflows and managing per-board automations. Workflows and automations are different products: workflows are standalone objects scoped to a workspace; automations are per-board trigger/action rules.

| Tool                                          | Description                                                    | GraphQL API              |
| :-------------------------------------------- | :------------------------------------------------------------- | :----------------------- |
| [list\_automations](https://developer.monday.com/api-reference/docs/list-automations)     | List automations on a board with their state and config        | `board_automations`      |
| [manage\_automations](https://developer.monday.com/api-reference/docs/manage-automations) | Activate, deactivate, or delete an automation                  | `*_live_workflow` (dev)  |
| [create\_automation](https://developer.monday.com/api-reference/docs/create-automation)   | Create a board automation from a natural-language description  | —                        |
| [plan\_workflow](https://developer.monday.com/api-reference/docs/plan-workflow)           | Plan workflows for a process and return an implementation plan | —                        |
| [create\_workflow](https://developer.monday.com/api-reference/docs/create-workflow)       | Create a new empty workflow in a workspace                     | `create_workflow` (dev)  |
| [update\_workflow](https://developer.monday.com/api-reference/docs/update-workflow)       | Update a workflow draft from a natural-language prompt         | —                        |
| [publish\_workflow](https://developer.monday.com/api-reference/docs/publish-workflow)     | Publish a workflow draft to the live version                   | `publish_workflow` (dev) |

***

# AI Agents

Tools for managing monday.com platform agents — user-built work orchestrators — and their triggers, skills, and knowledge.

| Tool                                                   | Description                                                                  | GraphQL API |
| :----------------------------------------------------- | :--------------------------------------------------------------------------- | :---------- |
| [manage\_agent](https://developer.monday.com/api-reference/docs/manage-agent)                      | Full agent lifecycle: create, get, update, delete, activate, deactivate, run | dev         |
| [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers)   | List, add, or remove the triggers that fire an agent                         | dev         |
| [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills)       | Create skills and attach/detach them from an agent                           | dev         |
| [manage\_agent\_knowledge](https://developer.monday.com/api-reference/docs/manage-agent-knowledge) | Grant, update, or revoke an agent's access to boards and docs                | dev         |
| [agent\_catalog](https://developer.monday.com/api-reference/docs/agent-catalog)                    | Browse available trigger types and skills                                    | dev         |

***

# Meetings

Tools for accessing AI notetaker meeting summaries, topics, and action items.

| Tool                                                   | Description                                                 | GraphQL API |
| :----------------------------------------------------- | :---------------------------------------------------------- | :---------- |
| [get\_notetaker\_meetings](https://developer.monday.com/api-reference/docs/get-notetaker-meetings) | Retrieve notetaker meetings with summaries and action items | —           |

***

# Sprints (monday-dev)

Tools for working with sprint boards in monday-dev accounts.

| Tool                                                        | Description                                                    | GraphQL API                                                                     |
| :---------------------------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| [get\_monday\_dev\_sprints\_boards](https://developer.monday.com/api-reference/docs/get-sprints-boards) | Discover sprint boards and their associated task boards        | [`boards`](https://developer.monday.com/api-reference/reference/boards)         |
| [get\_sprints\_metadata](https://developer.monday.com/api-reference/docs/get-sprints-metadata)          | Get sprint names, dates, goals, and status for a sprints board | [`items_page`](https://developer.monday.com/api-reference/reference/items-page) |
| [get\_sprint\_summary](https://developer.monday.com/api-reference/docs/get-sprint-summary)              | Get a full summary and analysis of a sprint's performance      | [`items_page`](https://developer.monday.com/api-reference/reference/items-page) |

***

# API & Schema

Low-level tools that expose the monday.com GraphQL API directly for advanced and developer use cases.

| Tool                                           | Description                                                      | GraphQL API                                                                |
| :--------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| [all\_monday\_api](https://developer.monday.com/api-reference/docs/all-monday-api)         | Execute any GraphQL query or mutation against the monday.com API | [Full API reference](https://developer.monday.com/api-reference/reference) |
| [get\_graphql\_schema](https://developer.monday.com/api-reference/docs/get-graphql-schema) | Fetch the monday.com GraphQL schema (queries and mutations)      | [Introspection](https://developer.monday.com/api-reference/reference)      |
| [get\_type\_details](https://developer.monday.com/api-reference/docs/get-type-details)     | Get fields, arguments, and metadata for a specific GraphQL type  | [Introspection](https://developer.monday.com/api-reference/reference)      |

***

# UI Components

Internal tools that render visual components in the monday.com MCP chat interface. These tools are called automatically by the MCP server — they are not invoked directly.

| Tool                              | Description                                      |
| :-------------------------------- | :----------------------------------------------- |
| [show\_table](https://developer.monday.com/api-reference/docs/show-table)     | Renders an interactive table view of board items |
| [show\_chart](https://developer.monday.com/api-reference/docs/show-chart)     | Renders a pie or bar chart visualization         |
| [show\_battery](https://developer.monday.com/api-reference/docs/show-battery) | Renders a battery/progress indicator             |
| [show\_assign](https://developer.monday.com/api-reference/docs/show-assign)   | Renders a smart assignment interface             |
