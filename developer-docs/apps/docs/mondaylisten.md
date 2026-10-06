---
updatedAt: 2026-07-01T12:59:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday.listen

You can use `monday.listen` to create a listener that allows subscribing to certain types of client-side events.

# Parameters

| Parameter   | Description                                                                              |
| :---------- | :--------------------------------------------------------------------------------------- |
| typeOrTypes | The type, or array of types, of events to subscribe to.                                  |
| callback    | A callback function that is fired when the listener is triggered by a client-side event. |
| params      | Reserved for future use.                                                                 |

# Events

You can subscribe to the following types of events:

| Type     | Description                                                                                                                                                                                                                                                                                       |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| context  | Fired when one of the parameters in the context changes.                                                                                                                                                                                                                                          |
| settings | Fired when a setting value is changed by the user.                                                                                                                                                                                                                                                |
| itemIds  | Fired when the board filter changes, which impacts the list of items currently in view. *Note:* The returned list may be incomplete. Use `monday.listen('filter')` and query the API with `items_page(query_params: ...)` to fetch all matching item IDs.                                         |
| events   | Fired when an interaction takes place with the board/dashboard. We support the following events: `new_items`, `change_column_values`, `board_communication`, `new_zoom_meeting_started_by_me`, `post_resolved`. **Please note** that `change_column_values` will not trigger for the name column. |
| filter   | Fired when the board filter changes. The payload includes the filter `rules` and `operator` (and may also include a free-text search `term`, depending on the UI state).                                                                                                                          |
| location | Fired when the location value changes.                                                                                                                                                                                                                                                            |

# Returns

Returns a function to unsubscribe from the listener.

```javascript
const unsubscribe = monday.listen("context", callback);

unsubscribe(); // cancels the listener
```

# Examples

### Add settings to your views and widgets

Every view or widget in monday.com has a set of fields that lets a user customize that view or widget. Our apps framework allows you to add these fields to your custom views and widgets, and then your app can access the values that the user has configured via our SDK.

For example, the Timeline allows users to choose which columns are displayed, and the Chart lets users change the X axis and chart type. You can use any of the 12 fields we support.

To do this, first add a settings field to your feature to get the color value as an input. Then, we'll use the monday SDK to retrieve this setting's value and use it in our view or widget.

Here's a snippet that listens for changes and calls a callback when the settings field is changed by the user:

```javascript
monday.listen("settings", res => {
  console.log(res.data);
  // {"fieldName": "fieldValue", "fieldName2": "fieldValue2"...}
});
```

### Subscribe to changes in settings and context

```javascript
const callback = res => console.log(res);
monday.listen(['settings', 'context'], callback);
```

### Listen to changes in your app's context

```javascript
monday.listen("context", res => {
  console.log(res.data);
  // do Something
})
```

### Subscribe to interaction-based events on the board

```javascript
const callback = res => console.log(res);
const unsubscribe = monday.listen("events", callback);

// When an item/s are created on the board:
// => { type: "new_items", itemIds: [5543, 5544, 5545], boardId: 3425 }

// When a column value changes for one of the items:
// => { type: "change_column_value", itemId: 12342, value: {...} }
```

### Remove the event listener

The function returns the unsubscribe function. You can call it when you want to cancel the subscription.

```javascript
const unsubscribe = monday.listen("events", (evt) => {
  console.log(evt);
});

unsubscribe();
```

### Retrieve the board filter in your app

You can retrieve the current board filter definition in your app. With this approach, you can retrieve the filter configuration the user has applied to the board.

You can use either `monday.listen("filter")` or `monday.get("filter")`. The `filter` payload includes an `operator` and a list of `rules`. Each rule represents one filter condition; the full filter is the combination of those rules according to the operator.

```javascript
monday.listen("filter", (res) => {
  console.log(res.data);
  // Example shape:
  // {
  //   term: "hello world", // optional
  //   operator: "and",     // e.g. "and" | "or"
  //   rules: [
  //     // each rule represents a single filter condition
  //   ]
  // }
});
```

### Filter your app's data based on the board filter

The SDK lets your app check if the user has filtered any items on their boards. With this approach, you can add flexibility to your app and create a unified experience for your users.

By using `monday.listen("itemIds", callback)`, you can get a list of item IDs that are currently displayed on the board.

```javascript
monday.listen("itemIds", (res) => {
  console.log(res.data);
  // [12345, 12346, 12347]
});
```

### Fetch all filtered item IDs via the API

`monday.listen("itemIds")` may not return the full set of filtered item IDs. Instead, listen to `filter` to get the filter rules and operator, then pass them into a GraphQL query using `items_page(query_params: ...)`. Use the returned `cursor` to paginate until there are no more results.

This example uses `SeamlessApiClient` from `@mondaydotcomorg/api` — the recommended way to query the monday.com API from app features.

```javascript
import { SeamlessApiClient } from "@mondaydotcomorg/api";

const seamlessApiClient = new SeamlessApiClient();

monday.listen("filter", async ({ data: filter }) => {
  const { operator, rules } = filter;

  // Pass the filter definition into items_page as query_params
  const query = `
    query ($boardIds: [ID!], $cursor: String, $queryParams: ItemsQueryParams) {
      boards(ids: $boardIds) {
        items_page(limit: 500, cursor: $cursor, query_params: $queryParams) {
          cursor
          items { id }
        }
      }
    }
  `;

  let cursor = null;
  const allIds = [];

  do {
    const { boards } = await seamlessApiClient.request(query, {
      boardIds: [String(contextData.boardId)],
      cursor,
      queryParams: { operator, rules },
    });

    const page = boards[0].items_page;
    allIds.push(...page.items.map((i) => i.id));
    cursor = page.cursor;
  } while (cursor);

  console.log("All filtered item IDs:", allIds);
});
```

### Listen to the URL location within an app

The SDK allows you to listen to an app's location when a user modifies it. You can also use the `monday.get("location")` <a href="https://developer.monday.com/apps/docs/mondayget#getting-the-url-location-within-an-app" target="_blank">SDK method</a> to get the location.

```javascript
// assume the browser URL is https://monday.test.com/boards/123456789/views/87654321?app[id]=987&foo=bar
monday.listen("location", ({ data }) => {
  console.log("Current URL:", data.href); // https://monday.test.com/boards/123456789/views/87654321
  console.log("Current query:", data.query); // { id: "987" }
  console.log("Current query (stringified):", data.search); // "app[id]=987"
});
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
