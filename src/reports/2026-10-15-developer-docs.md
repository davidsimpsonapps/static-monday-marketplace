---
title: "Models API aliases now resolve to Claude 5.5; new models added; `create_board` gets template arguments"
date: 2026-10-15
topic: developer-docs
lede: "The `monday-fast`, `monday-standard` and `monday-powerful` aliases in the Models API now map to Claude 5.5 models. The supported models list adds OpenAI and Anthropic IDs, and `create_board` gains two template arguments."
---

### Models API alias changes

Per the [supported models page](https://developer.monday.com/api-reference/docs/models-api-supported-models), `monday-fast` now resolves to `claude-haiku-5-5`, `monday-standard` to `claude-sonnet-5-5` and `monday-powerful` to `claude-opus-5-5`. They previously pointed to `claude-haiku-4-5`, `claude-sonnet-4-6` and `claude-opus-4-6`. The [getting started guide](https://developer.monday.com/api-reference/docs/getting-started-with-the-models-api) lists the same mapping.

Because `monday-standard` is the default when `model` is omitted on `/chat/completions`, requests without a model now use `claude-sonnet-5-5`. The docs recommend setting `model` explicitly in production so default changes do not alter app behavior.

### New supported models

The list of directly usable models adds `gpt-6-astra`, `gpt-6.1-sol`, `gpt-6-luna`, `claude-fable-5`, `claude-opus-5-5`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-sonnet-5-5`, `claude-sonnet-5` and `claude-haiku-5-5`.

### `create_board` arguments

The [release notes](https://developer.monday.com/api-reference/docs/release-notes) add `use_dataset_template` and `use_mls_template` arguments on `create_board`. Setting either to `true` creates the board from the dataset template or the MLS template. Both default to `false`.
