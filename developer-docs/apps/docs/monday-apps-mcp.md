---
updatedAt: 2026-03-22T17:36:13.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday apps MCP

The monday apps MCP gives your AI assistant direct access to the monday.com apps framework. You can scaffold new apps, add features, manage versions, and handle deployments through natural language, all without leaving your development environment.

# Tools

| Tool                       | Description                                                                                         |
| :------------------------- | :-------------------------------------------------------------------------------------------------- |
| `get_all_apps`             | Lists all of your development apps                                                                  |
| `create_app`               | Creates a new app with a name and description                                                       |
| `create_app_from_manifest` | Creates a new app from a manifest file                                                              |
| `promote_app`              | Promotes a version to live                                                                          |
| `get_app_features`         | Lists an app version's features                                                                     |
| `create_app_feature`       | Adds any feature to your app (e.g., board view, widget, custom column)                              |
| `get_app_versions`         | Lists all versions of an app                                                                        |
| `get_app_version`          | Retrieves a specific version's metadata (i.e., number, status, associated app ID, feature settings) |
| `get_deployment_status`    | Checks the monday code backend deployment (i.e., status, start/end time, errors, logs)              |
| `set_environment_variable` | Sets environment variables for your app                                                             |
| `search_storage_records`   | Searches the app storage for a term                                                                 |
| `export_storage_data`      | Exports storage as JSON or CSV                                                                      |
| `get_development_context`  | Searches official monday.com apps documentation using AI-powered semantic search                    |

# Supported AI tools

The monday apps MCP works with any MCP-compatible AI assistant or IDE, including:

* AI-native IDEs: [Cursor](https://docs.cursor.com/context/model-context-protocol), [Windsurf](https://docs.codeium.com/windsurf/mcp)
* CLI tools: [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), [Gemini CLI](https://github.com/google-gemini/gemini-cli)
* Standalone assistants: [Claude Desktop](https://modelcontextprotocol.io/quickstart/user)
* IDE extensions: [VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers), [JetBrains](https://www.jetbrains.com/help/idea/model-context-protocol.html)

For a complete list of MCP clients, visit the [MCP official website](https://modelcontextprotocol.io/clients).

# Security and permissions

The monday apps MCP uses your existing API token for authentication. Your AI assistant can only perform actions that your token is authorized to do within the apps framework.

# Getting started

## Prerequisites

* Node.js v20 or higher
* npm v5.2.0 or higher
* A monday.com [API token](https://developer.monday.com/api-reference/docs/authentication)
* A supported AI assistant or IDE

## Add monday apps MCP to your AI assistant

Add the monday.com MCP server to your AI assistant’s MCP configuration:

```json
{
  "mcpServers": {
    "monday-apps-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp",
        "-t",
        "your_monday_API_token", // Replace with your actual API token
        "--mode", 
        "apps" // // Enables apps framework tools; without it, the server runs as the monday platform MCP for workspace automation
      ]
    }
  }
}
```

# Example prompts

Once connected, you can manage your apps using natural language. For example:

* **Create a new app:**\
  "Create a new monday app called 'Customer Health Analyzer' with a board view and a dashboard widget."
* **Manage versions:**\
  "Show all versions of app 12345 and indicate which one is live."\
  "Promote the latest draft version of app 12345 to live."
* **Check deployments:**\
  "Check the deployment status for app version 67890 and show any errors."
* **Configure environment:**\
  "Set an API\_KEY environment variable for app 12345."
* **Work with storage:**\
  "Search app 12345 storage for records containing 'user\_preferences'."\
  "Export all storage data for app 12345 as JSON."

<Callout icon="📘">
  Check out the monday Apps Framework skills for Claude Code on our <Anchor label="GitHub repository" target="_blank" href="https://github.com/mondaycom/agentic-monday-apps-framework/tree/main">GitHub repository</Anchor>.
</Callout>
