---
updatedAt: 2026-09-06T08:32:11.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Change Item Column Values (Platform MCP)

Updates one or more column values on an existing monday.com item in a single call using the Platform MCP.

Use this tool to update the column values of an existing item. You can change multiple columns in a single call by providing a JSON object that maps column IDs to their new values. The value format is type-specific: status columns use `{"label": "Done"}`, date columns use `{"date": "2024-05-10"}`, text columns use a plain string, and so on.

If the status or dropdown label you're setting doesn't exist on the column yet, set `createLabelsIfMissing: true` to have the tool create it automatically. This requires permission to modify the board structure.

<Callout icon="🚧" theme="warn">
For board-relation linking tasks, call `link_board_items_workflow` before using this tool.
</Callout>

# Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>boardId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the board that contains the item.</td>
    </tr>
    <tr>
      <td>itemId</td>
      <td>`number`</td>
      <td>Yes</td>
      <td>The ID of the item to update.</td>
    </tr>
    <tr>
      <td>columnValues</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>A JSON string of column values to update. Keys are column IDs, values are type-specific. Examples: `{"text_col": "New value"}`, `{"status_col": {"label": "Done"}}`, `{"date_col": {"date": "2024-06-01"}}`, `{"email_col": "user@example.com"}`, `{"phone_col": "+1-800-555-0100"}`.</td>
    </tr>
    <tr>
      <td>createLabelsIfMissing</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>If `true`, creates new Status or Dropdown labels that don't already exist. Requires board structure modification permission. Defaults to `false`.</td>
    </tr>
  </tbody>
</Table>

# Example

Update the Status column on item `11971936030` to "Done":

```json
{
  "boardId": 18412502536,
  "itemId": 11971936030,
  "columnValues": "{\"color_mm37gbqg\": {\"label\": \"Done\"}}"
}
```

The tool returned a success message confirming item `11971936030` ("Design homepage mockup") was updated, along with the item URL.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/items) to achieve the same result:

```graphql GraphQL
mutation {
  change_multiple_column_values(
    board_id: 18412502536
    item_id: 11971936030
    column_values: "{\"color_mm37gbqg\": {\"label\": \"Done\"}}"
  ) {
    id
    name
    column_values {
      id
      text
    }
  }
}
```

For full documentation, see [Items](https://developer.monday.com/api-reference/reference/items).
