---
updatedAt: 2026-09-06T08:31:48.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Portfolio Agent Skills

Learn how to use the monday.com Portfolio API with AI agents through ready-to-use multi-step workflows

The monday.com [Portfolio API](https://developer.monday.com/api-reference/docs/portfolio) provides mutations and queries for managing portfolios and projects programmatically. When building AI agents that interact with portfolios, many operations require multi-step workflows — for example, creating a portfolio doesn't return a board ID directly, so your agent needs to poll for it.

This guide collects implementation patterns for common portfolio operations. Each skill covers a specific use case with ready-to-use GraphQL queries, step-by-step instructions, and notes on API behavior that isn't obvious from the schema alone.

# Skills

## Creating and managing portfolios

* [Create a New Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-create-portfolio) — Create a portfolio board and retrieve its ID through polling
* [Connect a Project to a Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-connect-project-to-portfolio) — Link an existing project board to a portfolio, with optional async callback delivery
* [List All Projects in a Portfolio](https://developer.monday.com/api-reference/docs/portfolio-skill-list-portfolio-projects) — Retrieve project metadata and resolve tasks board IDs
* [Duplicate a Project](https://developer.monday.com/api-reference/docs/portfolio-skill-duplicate-project) — Duplicate the tasks board using `duplicate_board`
* [Archive / Delete a Project](https://developer.monday.com/api-reference/docs/portfolio-skill-archive-delete-project) — Archive or permanently delete project boards

## Reading and updating project data

* [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) — Read health, stage, priority, and timeline from the portfolio board
* [Update Project Status](https://developer.monday.com/api-reference/docs/portfolio-skill-update-project-status) — Change health, stage, priority, or timeline values
* [Get Tasks Assigned to a Person Across Projects](https://developer.monday.com/api-reference/docs/portfolio-skill-get-tasks-by-person) — Iterate over tasks boards to find items by assignee

# Key concepts

Before diving into the skills, it helps to understand the board structure behind every portfolio project.

When you create a project in a portfolio, monday.com provisions **two boards** with the same name:

| Board               | Groups                      | Contains                                        |
| :------------------ | :-------------------------- | :---------------------------------------------- |
| **Tasks board**     | Planning, Execution, Launch | Individual tasks, dependencies, assignees       |
| **Portfolio board** | Projects                    | Portfolio-level metadata, health (RAG), mirrors |

Most operations require knowing which board to target. The [Get Project Status / Health](https://developer.monday.com/api-reference/docs/portfolio-skill-get-project-status) skill explains how to identify each board type programmatically.

> 📘 **Enterprise only**
>
> Portfolio solutions are only available on Enterprise plans. All mutations require the `boards:write` scope.

# Next steps

* **[Portfolio API reference](https://developer.monday.com/api-reference/docs/portfolio)** — Full schema documentation for portfolio mutations
* **[Querying board items](https://developer.monday.com/api-reference/docs/querying-board-items)** — Pagination patterns used throughout these skills
* **[Optimizing API usage](https://developer.monday.com/api-reference/docs/optimizing-api-usage)** — Best practices for reducing complexity cost

If you have questions, post them in the [monday developer community](https://community.monday.com/c/developers/8).
