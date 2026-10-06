---
updatedAt: 2026-09-03T12:37:52.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Compatible MCP clients

Connect monday.com to AI assistants and tools through the hosted MCP server — and learn how to get your own MCP client registered

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that enables AI assistants to securely connect to external data sources and tools. The monday.com hosted MCP server lets you interact with your monday.com account through natural language — create items, query boards, build dashboards, and more — from your preferred AI platform.

**Server URL:** `https://mcp.monday.com/mcp`

**Transport:** Streamable HTTP

<Callout icon="🚧" theme="warn">
  **SSE transport is deprecated and not supported.** Do not use `https://mcp.monday.com/sse`. Connect with Streamable HTTP at `https://mcp.monday.com/mcp` only.
</Callout>

***

# Featured integrations

The monday MCP server works with these leading platforms. If your tool is listed here, follow the corresponding setup guide — no additional configuration is required.

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

***

# Don't see your client?

## For end users

If you're using an MCP client that isn't listed above, check with the app developer to see if they support the monday MCP server. They may need to register their integration with monday.com before it can connect on your behalf.

## For developers and partners

Building an MCP client or embedding the monday MCP server in your product? You can develop and test against the hosted MCP server right away using an [API token](https://developer.monday.com/api-reference/docs/mcp-api-token) or [your own OAuth app](https://developer.monday.com/api-reference/docs/control-mcp-access-with-oauth-app).

**To make your integration publicly available to monday.com users, you must register it** by submitting the [MCP integration registration form](https://forms.monday.com/forms/c2aedf208f6c156932392e3a786d4d41?r=use1). See [Make your MCP integration publicly available](https://developer.monday.com/api-reference/docs/mcp-dynamic-client-registration) for the full walkthrough.

> 📘 This list is updated periodically as new MCP clients are verified and approved. Company logos and names are trademarks of their respective owners.
