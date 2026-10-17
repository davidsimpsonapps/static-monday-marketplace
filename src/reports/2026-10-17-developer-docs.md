---
title: "New guide covers building monday agents with Make using four new modules"
date: 2026-10-17
topic: developer-docs
lede: "monday.com added a developer guide on connecting Make agents to monday.com through the Bring Your Own Agent integration. It describes four new Make modules, all in beta: two for building agents and two for powering them with monday AI."
---

The agent modules are **Watch Agent Events**, an instant trigger that fires when the agent is triggered in monday.com, and **Send Agent Response**, which replies as the agent on an item or in a chat. The AI modules are **Run monday.com AI**, which runs LLM calls to multiple providers through monday.com, and **Run Platform Agent**, which can take actions on monday.com.

An agent can be triggered by a chat message, an @mention in an update on an item, or an assignment on an item. Saving the Watch Agent Events module creates a webhook and attaches it to the agent. The guide also covers the starter template and setup steps, including creating the agent under Agents → Bring your own agent → Make and using its API key as the Make connection.

A monday.com agent supports only one webhook at a time. Creating a new webhook for the same agent replaces the previous one, and the old webhook stops receiving events.

Read the full guide: [Build monday agents with Make](https://developer.monday.com/api-reference/docs/build-monday-agents-with-make).
