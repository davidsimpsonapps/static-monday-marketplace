---
updatedAt: 2026-09-06T08:34:10.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# AI Other Types

Learn more about the input, result, and enum types used when running prompts against AI models via the API

The monday.com [`AI`](https://developer.monday.com/api-reference/reference/ai) API lets you run a prompt against a monday-hosted AI model with the [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation. The types below are used as the input, result, and enum types for that mutation.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

# RunPromptConfigInput

Optional configuration passed to the `config` argument of the [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation. All fields are optional.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>model</td>
      <td>[`AiModel`](https://developer.monday.com/api-reference/reference/ai-other-types#aimodel)</td>
      <td>The AI model tier to use for the completion. If omitted, a default model is used.</td>
      <td>
        `MONDAY_FAST`  
        `MONDAY_STANDARD`  
        `MONDAY_POWERFUL`
      </td>
    </tr>
    <tr>
      <td>system_prompt</td>
      <td>`String`</td>
      <td>An optional system prompt that sets context or instructions for the model.</td>
      <td></td>
    </tr>
    <tr>
      <td>temperature</td>
      <td>`Float`</td>
      <td>Sampling temperature between `0` and `1`. Lower values make output more deterministic; higher values make it more random.</td>
      <td></td>
    </tr>
    <tr>
      <td>max_tokens</td>
      <td>`Int`</td>
      <td>The maximum number of tokens to generate. Must be a positive integer. Output is truncated when the limit is reached.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

# RunPromptResult

The return type of the [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation.

| Field   | Type     | Description                                |
| :------ | :------- | :----------------------------------------- |
| content | `String` | The generated text content from the model. |

***

# AiModel

The available AI model tiers, used on the `model` field of [`RunPromptConfigInput`](https://developer.monday.com/api-reference/reference/ai-other-types#runpromptconfiginput).

| Enum Value        | Description                |
| :---------------- | :------------------------- |
| `MONDAY_FAST`     | The monday Fast model.     |
| `MONDAY_STANDARD` | The monday Standard model. |
| `MONDAY_POWERFUL` | The monday Powerful model. |
