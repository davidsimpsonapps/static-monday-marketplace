---
updatedAt: 2026-09-07T22:14:04.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# AI Column

Learn how to configure and remove AI automations on monday.com columns using the platform API

<Callout icon="📘" theme="info">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

The [AI column](https://support.monday.com/hc/en-us/articles/18640208769682-AI-powered-columns) lets you automate text analysis, categorization, translation, and more using AI. Each column is configured with a specific AI block type that determines what the AI does and which source columns it reads from.

Via the API, you can configure an AI block on any compatible column or remove AI configuration from a column.

# Mutations

**Required scope: `boards:write`**

## configure\_categorize\_ai\_column

Assigns a label or category to an item based on content analysis. The AI selects from the target column's existing labels. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_categorize_ai_column(
    board_id: "1234567890"
    column_id: "status_col"
    source_type: item_name
    additional_instructions: "Use only: Urgent, Normal, Low"
    extra_settings: { run_backfill: true }
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `status` or `dropdown` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `thread`  
        `column`  
        `emails_and_activities`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>additional_instructions</td>
      <td>`String`</td>
      <td>Custom categorization rules. Max 5000 characters.</td>
      <td></td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  The AI assigns labels from the target column's existing options. If `additional_instructions` references labels that don't exist on the column, the automation will be created successfully but won't produce useful results at runtime. Ensure the target column's labels match the intended categories.
</Callout>

***

## configure\_summarize\_ai\_column

Generates a concise summary of the input text. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_summarize_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    source_type: thread
    additional_instructions: "3 bullet points max"
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text` or `long_text` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `thread`  
        `column`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>additional_instructions</td>
      <td>`String`</td>
      <td>Format requirements or focus areas. Max 5000 characters.</td>
      <td></td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## configure\_translate\_ai\_column

Translates text to a target language. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_translate_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    source_type: item_name
    target_language: spanish
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text` or `long_text` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `column`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>target_language</td>
      <td>`AiColumnLanguage!`</td>
      <td>The language to translate text into. See [`AiColumnLanguage`](#aicolumnlanguage) for supported values.</td>
      <td></td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## configure\_improve\_text\_ai\_column

Rewrites or fixes text to improve quality. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_improve_text_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    source_type: column
    source_column_id: "long_text_col"
    tone: professional
    length: shorter
    refinement_type: minimal_changes
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text` or `long_text` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `column`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>tone</td>
      <td>`AiColumnTone`</td>
      <td>Writing style. See [`AiColumnTone`](#aicolumntone) for supported values.</td>
      <td></td>
    </tr>
    <tr>
      <td>length</td>
      <td>`AiColumnImproverLength`</td>
      <td>Output length relative to input.</td>
      <td>
        `same`  
        `shorter`  
        `longer`
      </td>
    </tr>
    <tr>
      <td>refinement_type</td>
      <td>`AiColumnRefinementLevel`</td>
      <td>Type of improvement.</td>
      <td>
        `minimal_changes`  
        `moderate_changes`  
        `high_creativity`
      </td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## configure\_extract\_ai\_column

Extracts structured information from text. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_extract_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    source_type: column
    source_column_id: "long_text_col"
    entity_type: email_address
  ) {
    column_id
  }
}
```

```graphql GraphQL — Custom extraction
mutation {
  configure_extract_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    source_type: item_name
    entity_type: custom
    custom_instructions: "the invoice number"
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text`, `long_text`, `date`, `email`, `phone`, or `link` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `thread`  
        `column`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>entity_type</td>
      <td>`AiColumnEntityType!`</td>
      <td>The type of entity to extract. Use `custom` with `custom_instructions` for free-form extraction. See [`AiColumnEntityType`](#aicolumnentitytype) for all values.</td>
      <td></td>
    </tr>
    <tr>
      <td>custom_instructions</td>
      <td>`String`</td>
      <td>Required when `entity_type` is `custom`. Describes what to extract. Max 5000 characters.</td>
      <td></td>
    </tr>
    <tr>
      <td>additional_instructions</td>
      <td>`String`</td>
      <td>Contextual qualifiers (e.g., "of the boss"). Max 5000 characters.</td>
      <td></td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## configure\_open\_block\_ai\_column

Flexible, general-purpose block for complex or custom prompts. Source columns are referenced inline in the `ai_query` using `{pulse.column_id}` syntax. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_open_block_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    ai_query: "Analyze {pulse.description_col} and rate complexity from 1-5"
  ) {
    column_id
  }
}
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
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text`, `long_text`, `numbers`, `date`, `status`, or `dropdown` column.</td>
    </tr>
    <tr>
      <td>ai_query</td>
      <td>`String!`</td>
      <td>The natural-language instruction. Reference board columns with `{pulse.column_id}`, the item name with `{pulse.name}`, or subitem columns with `{pulse.subitem.column_id}`. Max 3000 characters.</td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  This mutation does not accept `source_type` or `source_column_id` — source columns are parsed from the `ai_query` text using the `{pulse.column_id}` reference syntax.
</Callout>

***

## configure\_write\_me\_ai\_column

Generates new text content from a prompt. Source columns are referenced inline in the `ai_query` using `{pulse.column_id}` syntax. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_write_me_ai_column(
    board_id: "1234567890"
    column_id: "text_col"
    ai_query: "Write a professional follow-up email about {pulse.name}"
    tone: professional
    length: paragraph
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `text`, `long_text`, or `doc` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>ai_query</td>
      <td>`String!`</td>
      <td>Prompt guiding content generation. Reference board columns with `{pulse.column_id}`, the item name with `{pulse.name}`, or subitem columns with `{pulse.subitem.column_id}`. Max 3000 characters.</td>
      <td></td>
    </tr>
    <tr>
      <td>tone</td>
      <td>`AiColumnTone!`</td>
      <td>Writing tone/style. See [`AiColumnTone`](#aicolumntone) for supported values.</td>
      <td></td>
    </tr>
    <tr>
      <td>length</td>
      <td>`AiColumnOutputLength!`</td>
      <td>Approximate desired output length.</td>
      <td>
        `sentence`  
        `paragraph`  
        `brief`  
        `in_depth`
      </td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

<Callout icon="📘" theme="info">
  This mutation does not accept `source_type` or `source_column_id` — source columns are parsed from the `ai_query` text using the `{pulse.column_id}` reference syntax.
</Callout>

***

## configure\_person\_assignment\_ai\_column

Assigns a person to an item based on rules or context. Returns [`AiColumnResult`](#aicolumnresult).

```graphql GraphQL
mutation {
  configure_person_assignment_ai_column(
    board_id: "1234567890"
    column_id: "person_col"
    source_type: thread
    groups: "[{\"id\": 1, \"name\": \"Alice\"}, {\"id\": 2, \"name\": \"Bob\"}]"
  ) {
    column_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>board_id</td>
      <td>`ID!`</td>
      <td>The board containing the column.</td>
      <td></td>
    </tr>
    <tr>
      <td>column_id</td>
      <td>`String!`</td>
      <td>The column to configure with AI. Must be a `people` column.</td>
      <td></td>
    </tr>
    <tr>
      <td>source_type</td>
      <td>`AiColumnSourceType!`</td>
      <td>Where the AI reads input from.</td>
      <td>
        `item_name`  
        `thread`  
        `column`
      </td>
    </tr>
    <tr>
      <td>source_column_id</td>
      <td>`String`</td>
      <td>Required when `source_type` is `column`. The column to read input from.</td>
      <td></td>
    </tr>
    <tr>
      <td>groups</td>
      <td>`String!`</td>
      <td>Stringified JSON array of available people or teams (e.g., `[{"id": 1, "name": "Alice"}]`).</td>
      <td></td>
    </tr>
    <tr>
      <td>extra_settings</td>
      <td>[`AiColumnExtraSettingsInput`](#aicolumnextrasettingsinput)</td>
      <td>Controls whether to apply the AI automation to existing items.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

## remove\_ai\_from\_column

Removes all AI configuration from a column. Returns [`AiColumnRemoveResult`](#aicolumnremoveresult).

```graphql GraphQL
mutation {
  remove_ai_from_column(
    board_id: "1234567890"
    column_id: "text_col"
  ) {
    column_id
    success
  }
}
```

### Arguments

| Argument   | Type      | Description                      |
| :--------- | :-------- | :------------------------------- |
| board\_id  | `ID!`     | The board containing the column. |
| column\_id | `String!` | The column to remove AI from.    |

***

# Other types

## AiColumnResult

Returned by all `configure_*_ai_column` mutations.

| Field      | Type      | Description                     |
| :--------- | :-------- | :------------------------------ |
| column\_id | `String!` | The column that was configured. |

## AiColumnRemoveResult

Returned by `remove_ai_from_column`.

| Field      | Type       | Description                                   |
| :--------- | :--------- | :-------------------------------------------- |
| column\_id | `String!`  | The column that had AI removed.               |
| success    | `Boolean!` | Always `true` — errors throw a GraphQL error. |

## AiColumnExtraSettingsInput

| Field         | Type      | Description                                                                                                                       |
| :------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| run\_backfill | `Boolean` | Whether to immediately apply the AI automation to existing items. When `true`, up to 200 items are processed. Defaults to `true`. |

## AiColumnSourceType

| Enum Value              | Description                                                               |
| :---------------------- | :------------------------------------------------------------------------ |
| `item_name`             | Uses the item's name as input.                                            |
| `thread`                | Uses the item's updates thread as input.                                  |
| `column`                | Uses the value of a specified source column. Requires `source_column_id`. |
| `emails_and_activities` | Uses emails and activity data as input.                                   |

## AiColumnTone

Used by `configure_improve_text_ai_column` and `configure_write_me_ai_column`.

| Enum Value     | Description                       |
| :------------- | :-------------------------------- |
| `empathic`     | Warm and understanding.           |
| `promotional`  | Persuasive and marketing-focused. |
| `confident`    | Assertive and decisive.           |
| `professional` | Formal and business-appropriate.  |
| `natural`      | Conversational and unpretentious. |
| `casual`       | Relaxed and informal.             |
| `friendly`     | Approachable and warm.            |
| `same`         | Preserve the original tone.       |

## AiColumnOutputLength

Used by `configure_write_me_ai_column`.

| Enum Value  | Description                |
| :---------- | :------------------------- |
| `sentence`  | A single sentence.         |
| `paragraph` | A short paragraph.         |
| `brief`     | A brief overview.          |
| `in_depth`  | A detailed, longer output. |

## AiColumnLanguage

Used by `configure_translate_ai_column`. Supported values: `english`, `spanish`, `french`, `german`, `hebrew`, `chinese`, `korean`, `arabic`, `bengali`, `danish`, `dutch`, `hindi`, `indonesian`, `italian`, `japanese`, `norwegian`, `polish`, `portuguese`, `russian`, `swedish`, `thai`, `turkish`, `vietnamese`.

## AiColumnEntityType

Used by `configure_extract_ai_column`.

| Enum Value      | Description                                       |
| :-------------- | :------------------------------------------------ |
| `email_address` | An email address.                                 |
| `first_name`    | A person's first name.                            |
| `last_name`     | A person's last name.                             |
| `phone_number`  | A phone number.                                   |
| `company_name`  | A company name.                                   |
| `domain_name`   | A domain or website.                              |
| `url`           | A URL.                                            |
| `date`          | A date.                                           |
| `time`          | A time.                                           |
| `year`          | A year.                                           |
| `custom`        | A custom entity defined by `custom_instructions`. |

***

# Error codes

Invalid inputs are rejected with a GraphQL error containing a specific `code` in `extensions`.

| Code                             | Meaning                                                                                       |
| :------------------------------- | :-------------------------------------------------------------------------------------------- |
| `INVALID_COLUMN_ID`              | `column_id` does not exist on the board.                                                      |
| `INVALID_COLUMN_TYPE`            | `column_id` type is incompatible with the block.                                              |
| `INVALID_SOURCE_COLUMN_ID`       | `source_column_id` does not exist on the board.                                               |
| `SELF_REFERENCING_COLUMN`        | `source_column_id` is the same as `column_id`.                                                |
| `UNSUPPORTED_SOURCE_COLUMN_TYPE` | Source column type is not supported for this block.                                           |
| `INVALID_COLUMN_REFERENCE`       | A `{pulse.column_id}` reference in `ai_query` points to a non-existent or unsupported column. |
| `EMPTY_QUERY_FIELDS`             | `ai_query` contains no data column references.                                                |
| `QUERY_TOO_LONG`                 | `ai_query` exceeds 3000 characters.                                                           |
| `INSTRUCTIONS_TOO_LONG`          | `additional_instructions` or `custom_instructions` exceeds 5000 characters.                   |
| `INVALID_SOURCE_TYPE`            | `source_type` is not in the allowed set for this block.                                       |
| `MISSING_SOURCE_COLUMN_ID`       | `source_type` is `column` but `source_column_id` was not provided.                            |
| `MISSING_CUSTOM_INSTRUCTIONS`    | `entity_type` is `custom` but `custom_instructions` was not provided.                         |

**Example error response:**

```json
{
  "errors": [
    {
      "message": "Column \"text_col\" is of type \"text\", which is not supported as a target for categorize. Allowed types: status, dropdown",
      "extensions": {
        "code": "INVALID_COLUMN_TYPE"
      }
    }
  ]
}
```
