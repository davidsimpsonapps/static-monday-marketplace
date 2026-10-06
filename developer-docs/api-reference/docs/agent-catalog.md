---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Agent Catalog (Platform MCP)

Browses the account-wide catalog of available trigger types and skills for monday platform agents using the Platform MCP.

Use this read-only tool to browse the account-wide catalog of available trigger types and skills for monday platform agents. No `agent_id` is required. Call it to discover what's available **before** wiring anything to a specific agent.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. Only triggers that can be added programmatically appear here. OAuth / third-party triggers (Slack, Gmail, Salesforce, etc.) require user setup in the monday.com UI and will not appear.
</Callout>

| Action          | Description                                                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list_triggers` | Returns available trigger types. Each entry has `block_reference_id` (required for [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers) `action: "add"`), `name`, `description`, `field_schemas` (describes the `field_values` shape), and `required_fields`. |
| `list_skills`   | Returns available skills with `id`, `name`, and `description`. Use the `id` with [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills) `action: "add"` — never guess a skill ID.                                                                                   |

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
      <td><code>list_triggers</code> or <code>list_skills</code>.</td>
    </tr>
    <tr>
      <td>block_reference_ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>Used with <code>list_triggers</code>. Fetch specific trigger types by <code>block_reference_id</code>. Omit to return all trigger types.</td>
    </tr>
  </tbody>
</Table>

# Examples

List all available trigger types:

```json
{
  "action": "list_triggers"
}
```

List all available skills:

```json
{
  "action": "list_skills"
}
```

# Related tools

* [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers) — use a `block_reference_id` from `list_triggers` to attach a trigger to an agent.
* [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills) — use a skill `id` from `list_skills`, or author a new skill, then attach it to an agent.
* [manage\_agent](https://developer.monday.com/api-reference/docs/manage-agent) — manage the agent entity itself.

***

# Programmatic equivalent

This tool maps to the `agent_triggers_catalog` and `agent_skills_catalog` queries on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
