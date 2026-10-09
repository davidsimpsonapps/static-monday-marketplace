---
updatedAt: 2026-10-08T17:25:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Platform MCP overview

Connect AI agents to monday.com data through the hosted Platform MCP server

The [Platform MCP](https://github.com/mondaycom/mcp) is monday.com's hosted MCP (Model Context Protocol) server, maintained by the monday.com AI team. It lets AI agents read and write monday.com data — creating items, updating columns, querying boards, and more — through a standardized protocol supported by all major AI platforms.

Connect using the hosted server. No local setup is required:

```json
{
  "mcpServers": {
    "monday-mcp": {
      "url": "https://mcp.monday.com/mcp"
    }
  }
}
```

> 🚧 MCP tool calls are executed as GraphQL API requests and count toward your account's [daily API call limit](https://developer.monday.com/api-reference/docs/rate-limits#daily-call-limit).

# Explore the docs

<Cards>
  <Card title="Compatible MCP clients" href="https://developer.monday.com/api-reference/docs/compatible-mcp-clients">
    Connect from Claude, ChatGPT, Cursor, Copilot, Gemini, and other supported AI platforms.
  </Card>

  <Card title="Integrate with the monday MCP server" href="https://developer.monday.com/api-reference/docs/integrate-with-monday-mcp">
    Choose an auth path — API token, your own OAuth app, or dynamic client registration.
  </Card>

  <Card title="Dynamic connectors" href="https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors">
    Admins approve additional MCP connections and redirect URIs beyond the pre-approved third-party agents.
  </Card>

  <Card title="Platform MCP tools" href="https://developer.monday.com/api-reference/docs/platform-mcp-tools">
    Full reference for all 60+ tools, organized by category, with equivalent GraphQL APIs.
  </Card>

  <Card title="Platform MCP security" href="https://developer.monday.com/api-reference/docs/monday-mcp-security-overview">
    Security architecture, authentication, tenant isolation, and OWASP MCP Top 10 alignment.
  </Card>
</Cards>

# More resources

* [MCP home page](https://monday.com/w/mcp)
* [Get started with monday MCP](https://support.monday.com/hc/en-us/articles/28515034903314-Get-started-with-monday-MCP)
* [Ready-to-use monday MCP prompts](https://support.monday.com/hc/en-us/articles/28608471371410-Ready-to-use-monday-MCP-prompts)

> 📘 Building monday.com apps? Use the separate [Apps MCP](https://developer.monday.com/api-reference/docs/apps-mcp) to scaffold features, deploy code, and promote versions. Both servers can run side by side.
