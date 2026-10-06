---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Manage Agent Knowledge (Platform MCP)

Lists, grants, updates, or revokes a monday platform agent's access to boards and docs using the Platform MCP.

Use this tool to list, grant, update, or revoke a monday platform agent's access to boards and docs. An agent's "knowledge" is the set of monday.com boards and docs it can read from or write to during a run.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**.
</Callout>

| Action   | Required fields                                            | Description                                                                                  |
| -------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `list`   | `agent_id`                                                 | Returns all resources the agent has access to, including permission level and resource type. |
| `add`    | `agent_id`, `resource_id`, `scope_type`, `permission_type` | Grants access to a board or doc.                                                             |
| `update` | `agent_id`, `resource_id`, `scope_type`, `permission_type` | Changes the permission level on an existing resource.                                        |
| `remove` | `agent_id`, `resource_id`, `scope_type`                    | Revokes the agent's access to a board or doc.                                                |

For `update` and `remove`, call `action: "list"` first to confirm the `resource_id` exists.

# Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>action</td>
      <td>`enum`</td>
      <td>Yes</td>
      <td>One of <code>list</code>, <code>add</code>, <code>update</code>, <code>remove</code>.</td>
    </tr>
    <tr>
      <td>agent_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Unique identifier of the agent.</td>
    </tr>
    <tr>
      <td>resource_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code>, <code>update</code>, <code>remove</code>. The ID of the board or doc to grant/update/revoke access to.</td>
    </tr>
    <tr>
      <td>scope_type</td>
      <td>`enum`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code>, <code>update</code>, <code>remove</code>. The resource type: <code>BOARD</code> or <code>DOC</code>.</td>
    </tr>
    <tr>
      <td>permission_type</td>
      <td>`enum`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code> and <code>update</code>. <code>READ</code> (agent can read) or <code>READ_WRITE</code> (agent can read and write).</td>
    </tr>
  </tbody>
</Table>

# Examples

Grant an agent read access to a board:

```json
{
  "action": "add",
  "agent_id": "7",
  "resource_id": "42",
  "scope_type": "BOARD",
  "permission_type": "READ"
}
```

Upgrade that access to read-write:

```json
{
  "action": "update",
  "agent_id": "7",
  "resource_id": "42",
  "scope_type": "BOARD",
  "permission_type": "READ_WRITE"
}
```

# Related tools

* [manage\_agent](https://developer.monday.com/api-reference/docs/manage-agent) — manage the agent entity itself.
* [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers) — manage which triggers fire this agent automatically.
* [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills) — manage which skills this agent can perform.

***

# Programmatic equivalent

This tool maps to the `agent_knowledge` query and `add_agent_resource_access` / `update_agent_resource_access` / `remove_agent_resource_access` mutations on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
