---
updatedAt: 2026-04-30T12:47:19.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Sidekick tools best practices

When building a [Sidekick tool](https://developer.monday.com/apps/docs/sidekick-tool) for your app, keep these best practices in mind.

# Use names instead of IDs

Users talk in names, not numbers. They'll ask to "add an item to the Marketing board," not "create an item on board 456."
Your tool should recognize names and handle the ID lookup internally.

When a name isn't found, turn the moment into clarification:

> "I couldn't find a board named 'Marketing plan.' Would you like me to check similar boards?"

Designing for natural language makes your tool feel conversational and intuitive, reducing friction in every interaction.

# Match monday.com's terminology

Sidekick already understands monday's core objects - boards, items, workdocs, updates, and owners. Use these exact terms in your inputs, descriptions, and responses.

Consistency helps sidekick reason correctly and gives users a sense of familiarity. The closer your vocabulary stays to monday's, the more "native" your tool will feel - and the easier it is for sidekick to know when to call it.

# Use only real-time action blocks for tools

Sidekick can only use automation blocks that run immediately and return results within a few seconds. Blocks that rely on waiting, asynchronous operations, scheduling, or external triggers cannot be used as tools.

To ensure your block is compatible, it must:

* Run its full logic inside the 'execute' step
* Return outputs synchronously
* Not wait for external updates or callbacks
* Complete reliably within a short time
* Always return the same structured output for the same inputs

# Turn errors into guidance

An error shouldn't stop the flow; it should help users move forward.
Instead of technical messages or silent failures, guide them with actionable feedback.

If a required parameter is missing, explain what's needed or ask a clarifying question.
This mirrors human conversation: people don't halt when confused - they ask for context.

If a required parameter is missing, explain what's needed or ask a clarifying question. Often the issue is unclear intent rather than a missing field - one targeted question is usually enough. By designing for recovery, your tool builds trust and keeps momentum.

# Get approvals for sensitive actions

Some actions deserve a pause before execution - sending emails, posting content, adjusting data.
Have your tool summarize the intended action and present a preview for review:

"Here's the email draft to Acme Corp for your approval before sending."

Confirmations reassure users that sidekick won't act on partial intent. They introduce a lightweight human-in-the-loop safeguard that keeps your tool powerful yet predictable. When actions could be irreversible, this step becomes essential.

# Confirm every completed action

When sidekick performs an action through your tool, always return clear confirmation that it worked. Provide a short success message and, whenever possible, a link to where the user can verify the result - for example, a record, post, or document created by your app.

"Your campaign post has been published. View it on LinkedIn. \[link]"

This simple gesture builds confidence and closes the loop between intent and outcome. It helps users trust that what they requested truly happened and gives them an easy way to follow up.

# Support undo or reversal when possible

When feasible, implement an opposite action - remove, revert, or undo.
Even if sidekick doesn't yet expose a dedicated undo interface, this design habit future-proofs your tool and encourages confidence.

Users are more willing to explore new capabilities when they know they can step back safely.

# Keep conversations efficient

The best sidekick tools complete tasks in as few steps as possible.
Handle partial inputs gracefully, infer context when safe, and avoid redundant clarifications.
When intent is vague, ask one or two targeted questions, then act.\
When intent is specific, don't ask users to repeat details - parse what they said and move forward while still requesting approval when necessary.

Example: If a user says "Add this task to the main project board," infer which board they mean from the current context instead of prompting again.

Efficiency communicates intelligence. A streamlined exchange feels seamless - like sidekick and your app are thinking together.

# Write clear sidekick tool descriptions

A sidekick tool's title and description are sidekick's guidebook. They tell the system when and how to use your capability.
Write them as if you're explaining the tool to a new teammate:

What it does
When it should be used
What inputs does it expect
What it returns

For each automation block, you should provide a title, description, and metadata that describe its purpose, expected inputs, constraints, and outputs. For example:
"Creates a new item on a monday board when users ask to add a task or deliverable.
Inputs: board name (required), item name (required), owner (optional).
Returns: a link to the created item."

Concise, intentional descriptions reduce ambiguity and improve sidekick's accuracy in matching requests to your tool.

# Show where data comes from

When your tool retrieves data from outside monday, make its origin explicit.
Include the source and, if relevant, a timestamp to show how recent the information is.

"According to Salesforce (updated 2 hours ago), this opportunity is at the proposal stage."

Citing sources turns your tool's output into verifiable insight rather than opaque data - a small detail that greatly boosts credibility.

# Keep responses concise and relevant

Return only the context that's useful for the next step.
Avoid overwhelming users with raw data, IDs, or metadata unless they're essential for follow-up actions.

A clean, focused response lets sidekick and the user act quickly. Pair a short human-friendly summary with structured data when needed. In short: less noise, more signal.

# Document your sidekick tool thoroughly

Documentation is part of your product surface.
Your descriptions, parameters, and examples are how sidekick - and other developers - learn what your tool does.

Write it clearly, include sample prompts, and explain how your tool behaves in different contexts. Think about different "happy path," "edge case," and "failure" prompt examples that you can test with. The better you document your intent, the more reliably sidekick can represent it.
