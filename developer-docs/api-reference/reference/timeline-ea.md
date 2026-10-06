---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Timeline

Learn how to read an item's Email & Activities timeline using the platform API

The [Emails & Activities](https://support.monday.com/hc/en-us/articles/360019213180-Emails-Activities-on-monday-com) app (E\&A) is a useful tool that enables monday.com CRM customers to manage client communication in one centralized location. Each contact is logged and tracked in the app's timeline for easy access to important details and updates. Every <Glossary>item</Glossary> has its own E\&A timeline where activities are logged.

# Queries

## Get timeline

* Returns an array containing metadata about a specific item's E\&A timeline
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  timeline (id: 1234567890) {
    timeline_items_page {
      cursor
      timeline_items {
        id 
        content
      }
    }
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($timelineId: ID!) { timeline (id: $timelineId) { timeline_items_page { cursor timeline_items { id content } } } }`;
const variables = {
  timelineId: 1234567890,
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument           | Type      | Description                                                             |
| :----------------- | :-------- | :---------------------------------------------------------------------- |
| id                 | `ID!`     | The unique identifier of the item to retrieve timeline activities from. |
| skipConnectedItems | `Boolean` | Whether to skip connected items.                                        |

### Fields

| Field                 | Type                                                                                                                  | Description                        |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| timeline\_items\_page | [`TimelineItemsPage!`](https://developer.monday.com/api-reference/reference/timeline-other-types#timeline-items-page) | A paginated set of timeline items. |
