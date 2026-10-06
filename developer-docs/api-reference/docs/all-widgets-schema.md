---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# All Widgets Schema (Platform MCP)

Returns the complete JSON Schema definitions for all available widget types in monday.com, including required fields, data types, and configuration options using the Platform MCP.

Use this tool to retrieve the full JSON Schema 7 definitions for every widget type available on monday.com dashboards. The schema is the authoritative reference for building the `settings` object you pass to `create_widget` — it describes required fields, optional fields, data types, allowed enum values, and detailed descriptions for each widget type.

This tool takes no parameters. Call it once at the start of any workflow that involves creating or validating widgets.

The response includes schemas for all supported widget types: `APP_FEATURE`, `BATTERY`, `CALENDAR`, `CHART`, `GANTT`, `LISTVIEW`, and `NUMBER`. Each schema entry contains a `type`, a `description`, and a `schema` object that follows JSON Schema 7 conventions — including `required` arrays, `properties` with typed fields, `enum` constraints, and inline `examples` to illustrate common configurations.

<Callout icon="🚧" theme="warn">
**Always call this tool before `create_widget`.** The settings structure varies significantly between widget types. Using the wrong shape for `settings` will cause the widget creation to fail.
</Callout>

# Parameters

This tool takes no parameters.

# Example

Call the tool with an empty input:

```json
{}
```

The response is a large JSON object with a top-level key per widget type (e.g., `CHART`, `NUMBER`, `BATTERY`). Each entry includes:

* **`type`** — the widget kind identifier
* **`description`** — a plain-language explanation of what the widget does
* **`schema`** — a JSON Schema 7 object with `required`, `properties`, and `examples`

For instance, the `NUMBER` widget schema specifies that `counter_data` is required and must include `calculation_type`, `column_ids_per_board`, and `counter_type`. The `CHART` widget schema requires `graph_type`, `x_axis_columns`, and `y_axis_columns`, and lists every supported chart type as an enum.

**Do not include the full schema output in your prompts or documentation.** The schema is large; use it as a reference to extract the specific fields you need for the widget type you are creating.

***

# Programmatic equivalent

There is no direct GraphQL API equivalent for this operation. `all_widgets_schema` is an MCP-specific helper tool that exposes the internal widget configuration schemas. To understand widget settings when using the GraphQL API directly, refer to the [Widgets](https://developer.monday.com/api-reference/reference/widgets) reference page.
