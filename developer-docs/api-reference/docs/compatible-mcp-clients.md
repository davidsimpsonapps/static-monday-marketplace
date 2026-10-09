---
updatedAt: 2026-10-08T17:25:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Compatible MCP clients

Connect monday.com to pre-approved third-party agents through the hosted MCP permission, or approve additional clients as dynamic connectors

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that enables AI assistants to securely connect to external data sources and tools. The monday.com hosted MCP server lets you interact with your monday.com account through natural language — create items, query boards, build dashboards, and more — from your preferred AI platform.

**Server URL:** `https://mcp.monday.com/mcp`

**Transport:** Streamable HTTP

<Callout icon="🚧" theme="warn">
  **SSE transport is deprecated and not supported.** Do not use `https://mcp.monday.com/sse`. Connect with Streamable HTTP at `https://mcp.monday.com/mcp` only.
</Callout>

***

# Featured integrations

The hosted MCP permission enables these pre-approved third-party agents. If your tool is listed here, follow the corresponding setup guide.

| Client                       | Description                                                   | Setup                                                                                                                                                                              |
| :--------------------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude**                   | Anthropic's AI assistant                                      | [Connect monday MCP with Claude](https://support.monday.com/hc/en-us/articles/28515704603666-Connect-monday-MCP-with-Claude)                                                       |
| **ChatGPT**                  | monday connector in OpenAI's ChatGPT                          | [Connect monday MCP with ChatGPT](https://support.monday.com/hc/en-us/articles/29491695661458-Connect-monday-MCP-with-ChatGPT)                                                     |
| **Cursor**                   | AI-first code editor                                          | [Connect monday MCP with Cursor](https://support.monday.com/hc/en-us/articles/28583658774034-Connect-monday-MCP-with-Cursor)                                                       |
| **Microsoft Copilot**        | Managing work with monday.com and Copilot                     | [Copilot integration overview](https://monday.com/blog/product/from-managing-work-with-monday-com-and-microsoft-copilot/)                                                          |
| **Microsoft Copilot Studio** | Build custom copilots with monday data                        | [Connect monday MCP with Microsoft Copilot Studio](https://support.monday.com/hc/en-us/articles/28584426338322-Connect-monday-MCP-with-Microsoft-Copilot-Studio)                   |
| **Gemini CLI**               | Google's agentic coding tool                                  | [Connect monday MCP with Gemini CLI](https://support.monday.com/hc/en-us/articles/30989881853842-Connect-monday-MCP-with-Gemini-CLI)                                               |
| **Gemini Enterprise**        | monday Platform Agent inside Google Cloud's Gemini Enterprise | [Connecting Google Cloud's Gemini Enterprise to monday.com](https://support.monday.com/hc/en-us/articles/34252818614290-Connecting-Google-Cloud-s-Gemini-Enterprise-to-monday-com) |
| **Mistral (le Chat)**        | monday MCP in Mistral's le Chat                               | [Connect monday MCP with Mistral AI's le Chat](https://support.monday.com/hc/en-us/articles/29643990370066-Connect-monday-MCP-with-Mistral-AI-s-le-Chat)                           |
| **Perplexity**               | AI-powered answer engine                                      | Native integration available                                                                                                                                                       |
| **Figma Make**               | AI-powered design and prototyping                             | [Connect monday MCP with Figma Make](https://support.monday.com/hc/en-us/articles/31743772154770-Connect-monday-MCP-with-Figma-Make)                                               |

***

# Connecting from coding tools

Most MCP-compatible coding tools (Cursor, Claude Code, VS Code, Windsurf, etc.) accept a remote MCP server configuration. Add the hosted server URL and authenticate via OAuth when prompted:

```json
{
  "mcpServers": {
    "monday-mcp": {
      "url": "https://mcp.monday.com/mcp"
    }
  }
}
```

For authentication options, API version control, and advanced configuration, see [Integrate with the monday MCP server](https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp).

Any other coding tool connects through [dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors). The account admin approves the connection and its redirect URIs before the connection is created.

***

# Don't see your client?

## For end users

You can connect an MCP client that is not listed above. Start the connection from the client. Your account admin approves the additional connection and its redirect URIs under **monday administration → Connectors → Dynamic Connectors**. See [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors).

## For developers and partners

You can develop and test against the hosted MCP server right away using an [API token](https://developer.monday.com/api-reference/docs/mcp-api-token) or [your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app).

To let other monday.com accounts connect your client, authenticate with [dynamic client registration](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration). Each customer's admin approves the connection and its redirect URIs through [dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors). The clients listed above are the pre-approved third-party agents enabled by the hosted MCP permission.

> 📘 This list is updated periodically as new MCP clients are verified and approved. Company logos and names are trademarks of their respective owners.
