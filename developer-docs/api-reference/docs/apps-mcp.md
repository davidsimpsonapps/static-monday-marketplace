---
updatedAt: 2026-09-06T08:33:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Apps MCP

Manage monday.com apps with AI — scaffold features, deploy code, and promote versions through the Apps MCP server

The [Apps MCP](https://developer.monday.com/apps/docs/monday-apps-mcp) is an MCP server purpose-built for the [monday apps framework](https://developer.monday.com/apps/docs/intro). It does **not** interact with boards or items — it manages apps, versions, features, deployments, and environment variables.

It is a separate server from the [Platform MCP](https://developer.monday.com/api-reference/docs/mondaycom-mcp), which lets AI agents read and write monday.com data.

**Common use cases:**

* Scaffolding a new monday.com app with features (board views, widgets, integrations)
* Checking deployment status, promoting versions, and managing app storage
* Searching official monday.com apps documentation from inside an AI assistant

# Configuration

The Apps MCP runs locally via `npx` and authenticates with a [personal API token](https://developer.monday.com/api-reference/docs/authentication):

```json
{
  "mcpServers": {
    "monday-apps-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp",
        "-t", "your_monday_api_token",
        "--mode", "apps"
      ]
    }
  }
}
```

> 📘 The `--mode apps` flag is what switches the server from Platform MCP mode to Apps MCP mode.

See the [Apps MCP documentation](https://developer.monday.com/apps/docs/monday-apps-mcp) for the full tool reference.

# Using both MCPs together

Most developers building monday.com apps connect **both** the Platform MCP and the Apps MCP to their IDE (Cursor, Claude Code, etc.). With both active, an AI agent can:

1. Read board schemas and item data to understand the account context (Platform MCP)
2. Scaffold, deploy, and promote app versions (Apps MCP)
3. Set environment variables and check deployment logs (Apps MCP)
4. Test the app's behavior by querying live data (Platform MCP)

This combination lets an agent automate a large portion of the app-building workflow end to end.

# Common questions

**What's the difference between the Platform MCP and the Apps MCP?**
The [Platform MCP](https://developer.monday.com/api-reference/docs/mondaycom-mcp) lets agents interact with monday.com data (boards, items, users). The Apps MCP lets agents manage monday.com apps (create features, deploy code, promote versions). They serve different purposes and can run side by side.

**Do I need both MCPs?**
Only if you're building monday.com apps. If you just want an AI assistant to manage your work in monday, the Platform MCP (or a [native integration](https://developer.monday.com/api-reference/docs/compatible-mcp-clients)) is all you need.
