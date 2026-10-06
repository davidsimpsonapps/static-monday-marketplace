---
updatedAt: 2026-09-06T08:32:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Create Item (Platform MCP)

Creates a new item on a board, optionally with column values, as a sub-item under a parent, or as a duplicate of an existing item using the Platform MCP.

Use this tool to add items to a monday.com board. You can create a brand-new item with initial column values, create a sub-item beneath an existing parent item, or duplicate an existing item and override specific column values. The item is added to the top group of the board unless you specify a `groupId`.

<Callout icon="🚧" theme="warn">
**Precondition:** Call `get_board_info` before creating items on an unfamiliar board to retrieve the correct column IDs, column types, group IDs, and status label names. Using incorrect column IDs or value formats will result in errors.
</Callout>

The `columnValues` parameter is a JSON string. Column value formats differ by type — for status columns use `{"label": "Done"}`, for date columns use `{"date": "2024-05-10"}`, for text use a plain string.

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
      <td>The ID of the board to create the item on.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>The display name of the new item.</td>
    </tr>
    <tr>
      <td>columnValues</td>
      <td>`string`</td>
      <td>Yes</td>
      <td>A JSON string of initial column values. Keys are column IDs, values are type-specific. Examples: `{"text_col": "hello"}`, `{"status_col": {"label": "Done"}}`, `{"date_col": {"date": "2024-05-10"}}`, `{"email_col": "user@example.com"}`.</td>
    </tr>
    <tr>
      <td>groupId</td>
      <td>`string`</td>
      <td>No</td>
      <td>The ID of the group to add the item to. Defaults to the board's top group if not specified.</td>
    </tr>
    <tr>
      <td>parentItemId</td>
      <td>`number`</td>
      <td>No</td>
      <td>The ID of a parent item to create this as a sub-item under.</td>
    </tr>
    <tr>
      <td>duplicateFromItemId</td>
      <td>`number`</td>
      <td>No</td>
      <td>The ID of an existing item to duplicate as the base. Only provide when duplicating an item.</td>
    </tr>
  </tbody>
</Table>

# Example

Create an item with a status column value on board `18412502536`:

```json
{
  "boardId": 18412502536,
  "name": "Design homepage mockup",
  "columnValues": "{\"color_mm37gbqg\": {\"label\": \"Working on it\"}}"
}
```

The tool returned item ID `11971936030`, the item name, a direct URL, and the board ID.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/items#create-an-item) to achieve the same result:

```graphql GraphQL
mutation {
  create_item(
    board_id: 18412502536
    item_name: "Design homepage mockup"
    column_values: "{\"color_mm37gbqg\": {\"label\": \"Working on it\"}}"
  ) {
    id
    name
    url
  }
}
```

For full documentation, see [Items — Create an Item](https://developer.monday.com/api-reference/reference/items#create-an-item).
