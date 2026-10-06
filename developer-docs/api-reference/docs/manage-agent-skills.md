---
updatedAt: 2026-09-06T08:33:00.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Manage Agent Skills (Platform MCP)

Creates skills in the account catalog and attaches or detaches them from a monday platform agent using the Platform MCP.

Use this tool to manage the full skill lifecycle for monday platform agents: create new skills in the account-wide catalog, attach skills to an agent, or detach them. Skills extend what an agent can do (e.g. sending emails, querying databases, posting to Slack).

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. There is no action to list the skills currently attached to a specific agent — the platform does not yet expose that query. To browse all skills in the account catalog, use [agent_catalog](https://developer.monday.com/api-reference/docs/agent-catalog) `action: "list_skills"`.
</Callout>

| Action   | Required fields        | Description                                                                                             |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `create` | `name`, `content`      | Creates a new custom skill in the account-wide catalog (available to all agents). No `agent_id` needed. |
| `add`    | `agent_id`, `skill_id` | Attaches an existing skill to the agent.                                                                |
| `remove` | `agent_id`, `skill_id` | Detaches a skill from the agent.                                                                        |

**To create a new skill and attach it:** call `action: "create"` with `name` and `content`, note the returned `id`, then call `action: "add"` with the `agent_id` and that `id`.

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
      <td>One of <code>create</code>, <code>add</code>, <code>remove</code>.</td>
    </tr>
    <tr>
      <td>agent_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code> and <code>remove</code>. Not used for <code>create</code> (an account-level operation).</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>create</code>. Display name of the new skill.</td>
    </tr>
    <tr>
      <td>content</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>create</code>. Markdown instructions defining what the skill does and how to execute it — this is the skill's runtime behavior.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create</code>. Short description shown in the catalog.</td>
    </tr>
    <tr>
      <td>skill_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>add</code> and <code>remove</code>. The skill ID from <a href="doc:agent-catalog">agent_catalog</a> <code>action: "list_skills"</code>, or the ID returned by <code>action: "create"</code>. Never guess a skill ID.</td>
    </tr>
  </tbody>
</Table>

# Examples

Create a custom skill in the catalog:

```json
{
  "action": "create",
  "name": "Send Slack Message",
  "content": "## Instructions\nPost a message to a Slack channel.",
  "description": "Sends a message to Slack"
}
```

Attach an existing skill to an agent:

```json
{
  "action": "add",
  "agent_id": "7",
  "skill_id": "skill-abc-123"
}
```

# Related tools

* [agent\_catalog](https://developer.monday.com/api-reference/docs/agent-catalog) — browse existing skills to find a `skill_id`.
* [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers) — manage which triggers fire this agent automatically.
* [manage\_agent](https://developer.monday.com/api-reference/docs/manage-agent) — manage the agent entity itself.

***

# Programmatic equivalent

This tool maps to the `create_agent_skill`, `add_skill_to_agent`, and `remove_skill_from_agent` mutations on the monday.com dev (preview) API schema. There is no stable public GraphQL equivalent yet.
