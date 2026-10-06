---
updatedAt: 2026-10-02T13:42:32.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Manage Agent (Platform MCP)

Full lifecycle management for monday platform agents — create, read, update, delete, change state, and run — using the Platform MCP.

Use this tool for full lifecycle management of monday platform agents: create, read, update, delete, change state, and run. monday platform agents are user-built work orchestrators — each has a profile (name, role, avatar), a goal, and a markdown execution plan. Agents in the `ACTIVE` state can be triggered automatically. They are **not** local LangChain or MCP agents.

<Callout icon="🚧" theme="warn">
This tool runs against the monday.com **dev (preview) API schema**. The `delete` action is **permanent and irreversible** — when a user refers to an agent by name, always run `action: "get"` first to confirm the correct `agent_id` before deleting.
</Callout>

A single `action` parameter selects the operation. Only pass the fields that apply to the chosen action.

| Action         | Required fields                          | Description                                                                                       |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `create`       | `prompt`                                 | Create an AI-generated agent. The platform generates the profile, goal, and plan from the prompt. |
| `create_blank` | —                                        | Create a manually defined agent (pass `name`, `role`, etc.).                                      |
| `get`          | `agent_id` *(omit to list owned agents)* | Fetch one agent by ID, or list the agents you own.                                                |
| `update`       | `agent_id` + at least one mutable field  | Modify `name`, `role`, `role_description`, `plan`, or `agent_model`.                              |
| `delete`       | `agent_id`                               | Permanently delete an agent (irreversible).                                                       |
| `activate`     | `agent_id`                               | Transition the agent to `ACTIVE`.                                                                 |
| `deactivate`   | `agent_id`                               | Transition the agent to `INACTIVE`.                                                               |
| `run`          | `agent_id`                               | Manually enqueue an agent run (fire-and-forget).                                                  |

<Callout icon="📘" theme="info">
Created agents start in the `INACTIVE` state. Follow up with `action: "activate"` using the returned `agent_id` before the agent can be triggered. Agent state is one of `ACTIVE`, `INACTIVE`, `ARCHIVED`, or `FAILED` (`DELETED` only appears as the return value of `delete`).
</Callout>

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
      <td>One of <code>create</code>, <code>create_blank</code>, <code>get</code>, <code>update</code>, <code>delete</code>, <code>activate</code>, <code>deactivate</code>, <code>run</code>.</td>
    </tr>
    <tr>
      <td>agent_id</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>update</code>, <code>delete</code>, <code>activate</code>, <code>deactivate</code>, <code>run</code>. Use with <code>get</code> to fetch a specific agent; omit it with <code>get</code> to list owned agents.</td>
    </tr>
    <tr>
      <td>prompt</td>
      <td>`string`</td>
      <td>Conditional</td>
      <td>Required for <code>create</code>. Plain-language description of what the agent should do.</td>
    </tr>
    <tr>
      <td>agent_model</td>
      <td>`enum`</td>
      <td>No</td>
      <td>Used with <code>create</code> or <code>update</code>. Omit unless the user explicitly names a valid monday-supported model.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code> or <code>update</code>. Display name of the agent.</td>
    </tr>
    <tr>
      <td>role</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code> or <code>update</code>. Short role title (e.g. "Customer Success Bot").</td>
    </tr>
    <tr>
      <td>role_description</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code> or <code>update</code>. Detailed description of the agent role.</td>
    </tr>
    <tr>
      <td>avatar_url</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code>. HTTPS URL of the avatar. Prefer <code>dapulse-res.cloudinary.com</code> or <code>cdn.monday.com</code>.</td>
    </tr>
    <tr>
      <td>gender</td>
      <td>`enum`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code>. <code>male</code> or <code>female</code> — a hint for the generated avatar/name when profile fields are omitted.</td>
    </tr>
    <tr>
      <td>background_color</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code>. Lowercase hex, e.g. "#9450fd".</td>
    </tr>
    <tr>
      <td>user_prompt</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>create_blank</code>. Stored as metadata; not used for AI generation.</td>
    </tr>
    <tr>
      <td>plan</td>
      <td>`string`</td>
      <td>No</td>
      <td>Used with <code>update</code>. New step-by-step execution plan in markdown.</td>
    </tr>
  </tbody>
</Table>

# Examples

Create an AI-generated agent:

```json
{
  "action": "create",
  "prompt": "Run my daily standup every weekday at 9am."
}
```

Activate it after creation:

```json
{
  "action": "activate",
  "agent_id": "7"
}
```

List the agents you own:

```json
{
  "action": "get"
}
```

# Related tools

* [agent\_catalog](https://developer.monday.com/api-reference/docs/agent-catalog) — browse available trigger types and skills before wiring them to an agent.
* [manage\_agent\_triggers](https://developer.monday.com/api-reference/docs/manage-agent-triggers) — manage which triggers fire this agent automatically.
* [manage\_agent\_skills](https://developer.monday.com/api-reference/docs/manage-agent-skills) — manage which skills this agent can perform.
* [manage\_agent\_knowledge](https://developer.monday.com/api-reference/docs/manage-agent-knowledge) — manage which boards and docs this agent can access.

***

# Programmatic equivalent

This tool maps to the agent mutations and queries on the monday.com dev (preview) API schema (`create_agent`, `create_blank_agent`, `custom_agents`, `update_agent`, `delete_agent`, `activate_agent`, `deactivate_agent`, `run_agent`). There is no stable public GraphQL equivalent yet.
