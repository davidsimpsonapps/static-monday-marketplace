---
updatedAt: 2026-09-06T08:34:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# AI

Learn how to run a prompt against a monday-hosted AI model directly from the platform API using the run_prompt mutation

monday.com's AI features let you run prompts against monday-hosted AI models without managing your own model provider or API keys. The `run_prompt` mutation is a **simplified, GraphQL-native** entry point to monday.com's AI gateway: send a prompt, optionally tune the model and generation settings, and get the generated text back in the same request as the rest of your integration.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

<Callout icon="👍" theme="okay">
  `run_prompt` is a simplified version of the [Models API](https://developer.monday.com/api-reference/docs/models-api-overview). It covers single-turn text completions. For more advanced use cases — multi-turn conversations, streaming, tool/function calling, or richer request and response control — use the [Models API](https://developer.monday.com/api-reference/docs/models-api-overview) instead.
</Callout>

# Requirements

Before you can use `run_prompt`, make sure the following are in place:

* **External AI gateway access permission** must be enabled for the account. Without it, the mutation returns a permission error.
* **Apps:** if you call `run_prompt` through an app (with an app token), the app must request the `AI:Consume` scope.
* **AI token consumption:** like the [Models API](https://developer.monday.com/api-reference/docs/models-api-overview), usage draws down **monday AI tokens**. The same metering and consumption rules apply. See [Pricing and metering](https://developer.monday.com/api-reference/docs/models-api-overview#pricing-and-metering) for details.

***

# Mutations

**Required scope (apps): `AI:Consume`**

## Run a prompt

Runs a single prompt against a monday-hosted AI model and returns the generated text. Returns a [`RunPromptResult`](https://developer.monday.com/api-reference/reference/ai-other-types#runpromptresult).

```graphql GraphQL
mutation {
  run_prompt(
    prompt: "Summarize the benefits of regular exercise in two sentences."
    config: {
      model: MONDAY_STANDARD
      system_prompt: "You are a concise assistant."
      temperature: 0.7
      max_tokens: 200
    }
  ) {
    content
  }
}
```

The minimal form only requires a `prompt`:

```graphql GraphQL
mutation {
  run_prompt(prompt: "Say hello in exactly three words.") {
    content
  }
}
```

```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `
  mutation {
    run_prompt(
      prompt: "Summarize the benefits of regular exercise in two sentences."
      config: { model: MONDAY_STANDARD, temperature: 0.7, max_tokens: 200 }
    ) {
      content
    }
  }
`;
const response = await mondayApiClient.request(query);
```

### Arguments

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>prompt</td>
      <td>`String!`</td>
      <td>The user prompt to send to the model. Must not be empty.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>[`RunPromptConfigInput`](https://developer.monday.com/api-reference/reference/ai-other-types#runpromptconfiginput)</td>
      <td>Optional configuration for the completion (model, system prompt, temperature, and max tokens). If omitted, model defaults are used.</td>
    </tr>
  </tbody>
</Table>

### Fields

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>content</td>
      <td>`String`</td>
      <td>The generated text content from the model.</td>
    </tr>
  </tbody>
</Table>
