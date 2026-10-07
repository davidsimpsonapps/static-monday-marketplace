---
updatedAt: 2026-10-07T10:20:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Agent API key capabilities

Learn which monday.com platform API operations an agent API key can perform, and which ones it cannot

An **agent API key** is the `api_token` you receive when you [connect a custom external agent](https://developer.monday.com/api-reference/docs/build-an-external-agent). Calls you make with that token run as the agent, not as the user who connected it.

<Callout icon="🚧" theme="warn">
  Agents are still in active development, and new capabilities are added on a daily basis. This page is an outline of core API capabilities agents can perform today. It is not an exhaustive breakdown of all APIs agents can use.
</Callout>

***

# How an agent token differs from a user token

|                | User token                             | Agent API key                                                                       |
| :------------- | :------------------------------------- | :---------------------------------------------------------------------------------- |
| Identity       | A monday.com user                      | The agent. `me.kind` is `external_agent_member` or `external_agent_detached_member` |
| Default access | The boards and docs that user can open | None. The agent starts with no boards or docs                                       |
| Attribution    | The user                               | The agent                                                                           |

Confirm the token with `me`:

```graphql GraphQL
query {
  me {
    id
    name
    email
    kind
  }
}
```

Agent emails look like `agent-<id>@agent.monday.com`.

***

# Grant access before you query

The person who created the agent does not pass their own board and doc access to the agent. Give the agent access in one of these ways:

1. **Create the resource with the agent token.** The agent can use boards and public docs it creates.
2. **Grant knowledge access** with [`add_agent_resource_access`](https://developer.monday.com/api-reference/reference/agents#add-resource-access-to-an-agent) from a user token. Send `API-Version: dev`. Set `scope_type` to `BOARD` or `DOC`, and pass the agent id from the agent email or the connect response.

`create_board` requires a `workspace_id`.

***

# Supported operations

These operations succeed when the agent already has access to the resource.

## Boards, groups, and columns

* List and get boards
* Create a board in a workspace, and duplicate a board
* Create, duplicate, list, and get groups
* Add a column
* Create a folder in a workspace
* Read board activity logs
* [Aggregate](https://developer.monday.com/api-reference/reference/aggregate) board data, including `COUNT_ITEMS`, column filters, and `group_by` (status groups return hex colors such as `#00c875`)

## Items and updates

* Create an <Glossary>item</Glossary>, including column values, and create a subitem
* Get an item, and list items on a board or in a group
* Move an item between groups, and duplicate an item
* Read and update column values (`change_multiple_column_values`, `change_simple_column_value`)
* Search items by column values (`items_page_by_column_values`, and `items_page` with `query_params`)
* Create an update, and list updates including replies
* Delete an item (`delete_item`)

## People and account

* List and get users
* List and get teams, and list team members
* Add board subscribers, and list board or item subscribers
* Create a notification
* Create or get a tag
* Read `account`, `workspaces`, and `complexity`

## Docs

On public <Glossary>docs</Glossary> the agent can access:

* List docs and read blocks
* Create a doc in a workspace (`create_doc` with `kind: public`)
* Update the doc name (`update_doc_name`)
* Add markdown (`add_content_to_doc_from_markdown`)
* Duplicate a doc (`duplicate_doc`)

***

# Unsupported operations

| Operation                                                              | What happens                                                                         |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Create a webhook or trigger (`create_webhook`)                         | Agents cannot create triggers right now                                              |
| Archive an item or a board (`archive_item`, `archive_board`)           | Unauthorized, including on boards the agent created. Deleting an item still works    |
| Remove board subscribers (`delete_subscribers_from_board`)             | Unauthorized. Adding subscribers works                                               |
| Upload a file (`add_file_to_update`, `add_file_to_column`)             | Unauthorized                                                                         |
| Delete a doc (`delete_doc`)                                            | Fails, including on docs the agent created                                           |
| Create a private doc (`create_doc` with `kind: private`)               | The mutation returns an error, and the private doc can still appear in the workspace |
| Invite users or manage account roles (`invite_users`, `account_roles`) | Unauthorized                                                                         |
| Run another agent (`run_agent`) or monday AI chat                      | Not available with an agent API key                                                  |

***

# Related

* [Build an external agent](https://developer.monday.com/api-reference/docs/build-an-external-agent)
* [Agents API reference](https://developer.monday.com/api-reference/reference/agents)
