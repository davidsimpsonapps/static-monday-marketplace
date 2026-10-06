---
updatedAt: 2026-09-06T08:37:17.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the timeline item APIs

The monday.com [timeline item](https://developer.monday.com/api-reference/reference/timeline-item-ea) APIs enable you to create, read, and delete timeline items.

The type below is used by a timeline item mutation and is not independently queryable.

# TimelineItemTimeRange

An object containing the start and end time of the new timeline item.

| Field            | Type               | Description                              |
| :--------------- | :----------------- | :--------------------------------------- |
| end\_timestamp   | `ISO8601DateTime!` | The end time of the new timeline item.   |
| start\_timestamp | `ISO8601DateTime!` | The start time of the new timeline item. |
