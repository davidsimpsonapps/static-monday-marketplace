---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Manage Agent Triggers (Platform MCP)

Lists, adds, or removes the triggers attached to a monday platform agent — triggers define when the agent runs automatically — using the Platform MCP.

Use this tool to manage the triggers attached to a monday platform agent. Triggers define **when** the agent runs automatically.

<Callout icon="🚧" theme="warning">
This tool runs against the monday.com **dev (preview) API schema**. Only triggers that can be added programmatically appear in [agent_catalog](https://developer.monday.com/api-reference/docs/agent-catalog). OAuth / third-party triggers (Slack, Gmail, Salesforce, etc.) require user setup in the monday.com UI and cannot be managed here.
</Callout>

| Action   | Required fields                  | Description                                                                            |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------- |
| `list`   | `agent_id`                       | Returns active triggers with `node_id`, `block_reference_id`, name, and field summary. |
| `add`    | `agent_id`, `block_reference_id` | Attaches a trigger type to the agent.                                                  |
| `remove` | `agent_id`, `node_id`            | Detaches a trigger instance by `node_id` (not `block_reference_id`).                   |

**To add a trigger:** call [agent\_catalog](https://developer.monday.com/api-reference/docs/agent-catalog) `action: "list_triggers"` to find the `block_reference_id`, `field_schemas`, and `required_fields`; collect the required field values from the user; then call `action: "add"`. The `add` response returns only `{ success }` — call `action: "list"` afterward if you need the new instance's `node_id`.

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
      <td>One of <code>list</code>, <code>add</code>, <code>remove</code>.</td>
    </tr>
    <tr>
      <td>agent_id</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>Unique identifier of the agent.</td>
    </tr>
    <tr>
      <td>block_reference_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code>. The trigger type's <code>block_reference_id</code> from <a href="doc:agent-catalog">agent_catalog</a> <code>action: "list_triggers"</code>. Never guess this value.</td>
    </tr>
    <tr>
      <td>field_values</td>
      <td>`object`</td>
      <td>No</td>
      <td>Used with <code>add</code> when the trigger type has required fields. Key/value object whose shape is described by <code>field_schemas</code> in the catalog. Scalar fields use string/number/boolean; selection fields use <code>{'{ "value": "<id>", "label": "<name>" }'}</code>.</td>
    </tr>
    <tr>
      <td>node_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>remove</code>. The <code>node_id</code> of the trigger instance — get it from <code>action: "list"</code>. Each instance has a unique <code>node_id</code>.</td>
    </tr>
  </tbody>
</Table>

# Examples

List the triggers on an agent:

```json
{
  "action": "list",
  "agent_id": "7"
}
```

Add a trigger by its catalog reference:

```json
{
  "action": "add",
  "agent_id": "7",
  "block_reference_id": "status-change-ref",
  "field_values": { "board_id": "42" }
}
```

Remove a trigger instance:

```json
{
  "action": "remove",
  "agent_id": "7",
  "node_id": "node-abc"
}
```

# Related tools

* [agent\_catalog](https://developer.monday.com/api-reference/docs/agent-catalog) — discover available trigger types and their required `field_values`.
* [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills) — manage which skills this agent can perform.
* [manage\_agent](https://developer.monday.com/api-reference/docs/manage-agent) — manage the agent entity itself.

***

# Programmatic equivalent

This tool maps to the `agent_active_triggers` query and `add_trigger_to_agent` / `remove_trigger_from_agent` mutations on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
