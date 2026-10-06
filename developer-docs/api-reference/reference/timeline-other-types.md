---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the timeline API

The monday.com [timeline](https://developer.monday.com/api-reference/reference/timeline) API enables you to read Emails & Activities timelines.

The type below is used by the timeline query and is not independently queryable.

# Timeline items page

An object containing a paginated set of timeline items. Utilizes cursor-based pagination to return the remaining pages of items.

### Arguments

| Argument | Type     | Description                                              |
| :------- | :------- | :------------------------------------------------------- |
| cursor   | `String` | The cursor for the next set of timeline items to return. |
| limit    | `Int`    | The number of timeline items to get. The default is 25.  |

### Fields

| Field           | Type                                                                                               | Description                                                                                                                                 |
| :-------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| cursor          | `String`                                                                                           | An opaque token representing the position in a set of results to fetch timeline items from. Use this to paginate through large result sets. |
| timeline\_items | [`[TimelineItem!]!`](https://developer.monday.com/api-reference/reference/timeline-item-ea#fields) | The timeline items in the current page.                                                                                                     |
