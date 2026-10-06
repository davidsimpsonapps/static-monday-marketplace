---
updatedAt: 2026-09-06T08:34:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Bulk Import

Overview of the two bulk item import mutations - ingest_items and backfill_items - and how to choose between them

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-07`](https://developer.monday.com/api-reference/docs/release-notes#2026-07) and later**
</Callout>

The platform API exposes two mutations for importing <Glossary>items</Glossary> in bulk: **`ingest_items`** and **`backfill_items`**. Both follow the same asynchronous workflow - start a job, upload a CSV, poll for status - but they are designed for different scenarios.

Use **`ingest_items`** for recurring imports and imports that should behave like normal board activity. It runs with full platform side effects (automations fire, the Activity Log records every change) and supports upsert/skip logic via `on_match` for regular item imports.

Use **`backfill_items`** only for a planned, one-time initial load where you want to seed a board silently before users or automations start working on the board. It requires account admin permissions, skips automations, and does not write to the Activity Log.

Bulk import also supports create-only hierarchy imports on boards with subitems. On classic subitems boards, the CSV uses a `.subitem` suffix to mark subitem headers and rows. On multi-level subitems boards, the CSV uses level columns from `name.l1` through `name.l5` to represent parent-child hierarchy. See the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide for both file formats.

Bulk import supports Board Relation columns as another supported column type, with additional per-cell and board relation limits. See the guide for the CSV value format.

## Comparison

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th></th>
      <th>`ingest_items` (recommended)</th>
      <th>`backfill_items`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Use for**</td>
      <td>Integrations, recurring imports, any import that should behave like normal board activity</td>
      <td>A single large initial setup import before users or automations start working on the board</td>
    </tr>
    <tr>
      <td>**Who can call it**</td>
      <td>Any user with `boards:write`</td>
      <td>Account admin + `boards:write`</td>
    </tr>
    <tr>
      <td>**Maximum rows per job**</td>
      <td>10,000</td>
      <td>20,000</td>
    </tr>
    <tr>
      <td>**Upsert / skip existing items**</td>
      <td>Yes, via `on_match` for regular item imports</td>
      <td>Not supported - always creates new items</td>
    </tr>
    <tr>
      <td>**Classic subitems hierarchy imports**</td>
      <td>Create-only, using `.subitem` headers in the CSV</td>
      <td>Create-only, using `.subitem` headers in the CSV</td>
    </tr>
    <tr>
      <td>**Multi-level subitems hierarchy imports**</td>
      <td>Create-only, using level columns in the CSV</td>
      <td>Create-only, using level columns in the CSV</td>
    </tr>
    <tr>
      <td>**Automations triggered**</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>**Activity Log**</td>
      <td>Recorded normally</td>
      <td>Not recorded</td>
    </tr>
    <tr>
      <td>**Hourly item budget**</td>
      <td>Counts toward 19,000 items/account/hour</td>
      <td>Does not consume this budget</td>
    </tr>
  </tbody>
</Table>

For a full step-by-step walkthrough including CSV format, classic and multi-level subitems file formats, column type validation, and troubleshooting, see the [Importing items in bulk](https://developer.monday.com/api-reference/docs/importing-items-in-bulk) guide.

<br />
