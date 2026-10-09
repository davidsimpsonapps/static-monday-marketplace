---
updatedAt: 2026-10-08T17:25:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Platform MCP security

Understand the security architecture, controls, and shared responsibilities   of the monday.com MCP Server — including authentication, tenant isolation,   AI-layer risks, and OWASP MCP Top 10 alignment

The **monday.com Model Context Protocol (MCP) Server** lets AI agents and copilots — such as Microsoft Copilot, Claude, ChatGPT, Cursor, or custom agents — access and act on monday.com data through a standardized protocol. This page describes monday.com's security architecture, controls, and shared responsibilities, so your security, risk, and compliance teams can evaluate the service.

The Model Context Protocol is the industry standard for connecting AI models to external data and tools. It is supported by all major AI providers, including Anthropic (Claude), OpenAI (ChatGPT), Google (Gemini), and Microsoft (Copilot/Azure). For protocol details, see the [official MCP documentation](https://modelcontextprotocol.io/).

<Callout icon="📘" theme="info">
  **The monday.com MCP Server is a wrapper around the monday.com Platform API.** Every capability exposed through MCP is backed by the same API that powers monday.com apps, integrations, and the web client. Authentication, authorization, rate limits, and data handling all follow the same security standards as the monday.com platform.
</Callout>

***

# Architecture and tenancy

## Multi-tenant design with per-user isolation

The monday.com MCP Server is **multi-tenant** with **strict per-user isolation**:

* **No shared state between tenants.** Each user's requests are routed to isolated execution contexts.
* **Session isolation.** One user's session cannot access another user's data or context.
* **Platform-aligned authorization.** MCP operations execute on behalf of the authenticated user and respect that user's monday.com permissions (boards, workspaces, items). There is no elevated or shared service account that bypasses user-level access control.

Data is accessible only in the same manner as when a user interacts with monday.com directly or through the standard API.

***

# Authentication and authorization

## OAuth 2.0 and user-context flows

* **Grant type:** OAuth 2.0 Authorization Code Grant, with monday.com as the identity provider.
* **Industry standard:** OAuth 2.0 is the established framework for delegated authorization, and monday.com uses the same flow for MCP as for all other third-party integrations with the Platform API.
* **User-context enforcement:** All MCP tool calls execute in the context of the authenticated user and are subject to that user's monday.com permissions.

## Token handling

* Access tokens are issued and managed through monday.com's standard OAuth flow.
* Customers and AI clients (for example, Copilot Studio or Cursor) are responsible for secure token storage, refresh handling, and revocation, in accordance with their own security policies.
* **The MCP Server does not store or log customer OAuth tokens.**

## Account approval for additional connections

The hosted MCP permission enables a set of pre-approved third-party agents. Dynamic connectors let an account admin approve additional connections and their redirect URIs before monday.com issues tokens. Approval allows that connection for the account. It does not grant a user access to the hosted MCP server, and it does not expand their monday.com permissions. See [Dynamic connectors](https://developer.monday.com/api-reference/docs/mcp-dynamic-connectors).

During early access, revoking a dynamic connector approval takes effect at the next token refresh. An existing access token can keep working until it expires, for up to 24 hours after revocation.

***

# Security inherited from the monday.com Platform API

Because MCP is a wrapper over the monday.com API, it inherits all core platform security controls:

| Control                | Description                                                    |
| :--------------------- | :------------------------------------------------------------- |
| **Authentication**     | All calls require a valid monday.com access token.             |
| **Authorization**      | Operations are scoped to the authenticated user's permissions. |
| **Transport security** | All communication occurs over TLS (HTTPS).                     |
| **Rate limiting**      | Platform-level rate limits apply identically to MCP traffic.   |
| **Input validation**   | The Platform API validates structured inputs before execution. |

Platform infrastructure security, encryption in transit, and operational controls apply to MCP traffic in the same way as to direct API or web application usage.

***

# AI-related risks: prompt injection and content manipulation

## Scope of the MCP Server

The MCP Server is a structured intermediary between AI agents and the monday.com API. It:

* Accepts structured tool invocations from the AI client.
* Transforms them into one or more authenticated Platform API calls.
* Returns processed responses to the agent.

The MCP Server does not run arbitrary code or execute free-form instructions from prompts.

## Responsibility boundaries

| Risk                                     | Responsible layer                                                             |
| :--------------------------------------- | :---------------------------------------------------------------------------- |
| **Prompt injection**                     | The AI client or agent must implement guardrails and input validation.        |
| **Content manipulation in model output** | The AI client or agent must validate and constrain how returned data is used. |
| **Blocking unauthorized API actions**    | Enforced by the monday.com Platform API through user-scoped permissions.      |

Prompt injection and related LLM-layer risks are addressed at the AI client or application layer — not within the MCP Server itself.

## Industry alignment

The MCP Server provides:

* OAuth 2.0–based authentication.
* User-scoped authorization.
* Per-user session logical isolation.
* Standard API validation, rate limiting, and transport security.

AI-layer risk controls must be implemented by the integrating organization.

***

# Auditing and logging

* **Internal logging.** monday.com maintains logging and monitoring (including infrastructure-layer telemetry) for operational security, troubleshooting, and incident response.
* **Customer-facing logs.** Self-service export of detailed MCP or API audit logs is not currently available. Organizations with specific compliance requirements should engage their monday.com representative to discuss current capabilities and roadmap considerations.

***

# OWASP MCP Top 10 — alignment overview

The following table maps monday.com's MCP Server posture against the [OWASP MCP Top 10](https://genai.owasp.org/) risk categories.

| OWASP MCP Top 10                                        | monday.com MCP posture                                                                                                                                                          |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **MCP01 — Token mismanagement & secret exposure**       | Tokens are issued and validated via monday.com OAuth. The MCP Server does not store or log customer tokens. Secure token lifecycle management is the customer's responsibility. |
| **MCP02 — Privilege escalation via scope creep**        | All actions remain user-scoped; no privilege elevation beyond the user's existing permissions.                                                                                  |
| **MCP03 — Tool poisoning**                              | MCP tools are defined and controlled by monday.com and are not customer-modifiable.                                                                                             |
| **MCP04 — Supply chain & dependency tampering**         | The MCP Server is fully managed by monday.com; build and dependency security are centrally controlled.                                                                          |
| **MCP05 — Command injection & execution**               | MCP tools map to structured Platform API calls; no free-form command execution is performed by the server.                                                                      |
| **MCP06 — Prompt injection**                            | Mitigations belong to the AI client/agent layer. See [AI-related risks](#ai-related-risks-prompt-injection-and-content-manipulation).                                           |
| **MCP07 — Insufficient authentication & authorization** | OAuth 2.0 Authorization Code Grant with enforced user-scoped permissions.                                                                                                       |
| **MCP08 — Lack of audit & telemetry**                   | Internal monitoring is in place; customer self-service audit exports are not currently provided.                                                                                |
| **MCP09 — Shadow MCP servers**                          | The official MCP endpoint is monday.com–hosted. Governance of third-party or self-hosted MCP servers is the customer's responsibility.                                          |
| **MCP10 — Context injection & over-sharing**            | Per-user isolation prevents cross-user or cross-tenant context leakage.                                                                                                         |

***

# Customer responsibilities

Organizations connecting to the MCP Server directly — rather than through a native client integration such as Copilot, Claude, or ChatGPT — should:

1. **Secure OAuth tokens.** Apply appropriate secret management and lifecycle controls (storage, rotation, revocation).
2. **Implement AI safeguards.** Enforce prompt validation, output filtering, and guardrails within the AI client or application layer.
3. **Control access.** Restrict which users and systems are permitted to connect to the MCP endpoint. Review additional connections and their redirect URIs under **monday administration → Connectors → Dynamic Connectors** before approving them.
4. **Apply least privilege.** Use monday.com's permission model to limit access to only necessary resources — for example, restrict MCP usage to specific workspaces or boards.
5. **Monitor activity.** Maintain logging and monitoring within the AI systems that interact with MCP.

***

# Summary

* The **monday.com MCP Server** is a wrapper over the monday.com Platform API.
* It inherits the platform's authentication, authorization, validation, rate limiting, and transport security controls.
* The architecture is **multi-tenant with strict per-user isolation**.
* **OAuth 2.0 Authorization Code Grant** governs authentication.
* AI-layer threats such as prompt injection are outside the MCP Server's scope and must be mitigated by the AI client.
* The design aligns with the OWASP MCP Top 10 within defined responsibility boundaries.

For additional platform security information, see the [monday.com Developer Documentation](https://developer.monday.com/) or contact your monday.com representative.
