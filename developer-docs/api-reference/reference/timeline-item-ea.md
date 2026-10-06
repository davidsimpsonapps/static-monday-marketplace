---
updatedAt: 2026-09-06T08:37:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Timeline item

Learn how to read, create, and delete timeline items from the Email & Activities app using the platform API

The [Emails & Activities](https://support.monday.com/hc/en-us/articles/360019213180-Emails-Activities-on-monday-com) app (E\&A) is a useful tool that enables monday.com CRM customers to manage client communication in one centralized location. Each contact is logged and tracked in the app's timeline for easy access to important details and updates.

# Queries

## Get timeline item

* Returns an array containing metadata about newly created items in the E\&A timeline
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  timeline_item(
    id: 1234567890
	) {
    board {
      id
    }
    item {
      name
    }
    id
    user {
      id
      name
    }
    title
    type
    content
    created_at
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `query ($timelineId: ID!) { timeline_item (id: $timelineId) { title type content created_at } }`;
const variables = {
  timelineId: 1234567890,
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type  | Description                                           |
| :------- | :---- | :---------------------------------------------------- |
| id       | `ID!` | The unique identifier of the timeline item to return. |

### Fields

| Field                | Type                                                                   | Description                                                                                                                           |
| :------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| board                | [`Board`](https://developer.monday.com/api-reference/reference/boards) | The board on which the timeline item is located.                                                                                      |
| content              | `String`                                                               | The timeline item's content.                                                                                                          |
| created\_at          | `Date!`                                                                | The timeline item's creation date.                                                                                                    |
| custom\_activity\_id | `String`                                                               | The unique identifier of the timeline item's [custom activity](https://developer.monday.com/api-reference/reference/custom-activity). |
| id                   | `ID`                                                                   | The timeline item's unique identifier.                                                                                                |
| item                 | [`Item`](https://developer.monday.com/api-reference/reference/items)   | The item that the timeline item is on.                                                                                                |
| title                | `String`                                                               | The title of the timeline item.                                                                                                       |
| type                 | `String`                                                               | The type of timeline item. Always returns `"activity"`.                                                                               |
| user                 | [`User`](https://developer.monday.com/api-reference/reference/users)   | The user who created the timeline item.                                                                                               |

# Mutations

## Create timeline item

Creates a new timeline item in the E\&A app. Returns [`TimelineItem`](https://developer.monday.com/api-reference/reference/timeline-item-ea#fields).

Currently, the only way to retrieve a timeline’s ID is to query it back. It can't be accessed through the UI.

<Callout icon="🚧" theme="warn">
  Timeline items created via the API won't trigger automations that run when a new E&A timeline item is created.
</Callout>

```graphql GraphQL
mutation {
	create_timeline_item (
    item_id: 9876543210,
    custom_activity_id: "8ca12626-7aeb-3ca7-7z1a-8ebdda488cd2",
    title: "Migrated Email",
    summary: "internal company email",
    content: "From: saarar@monday.com <br> To: asi@monday.com [Asi Monday], yoni@monday.com [Yoni Monday] <br> Subject: Deploy our first alpha version <br><br>Hey guys, <br>We are ready to deploy our first alpha version and enable<br>our clients to migrate into E&A!<br><br>Best regards,<br> Saar",
    timestamp: "2024-06-06T18:00:30Z",
    time_range: {
     start_timestamp: "2024-05-06T18:00:30Z", 
     end_timestamp: "2024-05-06T19:00:30Z"
    }
 ) {
  id
 }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($item_id: ID!, $custom_activity_id: String!, $title: String!, $summary: String!, $timestamp: ISO8601DateTime!, $time_range: TimelineItemTimeRange!, $content: String!) { create_timeline_item (item_id: $item_id, custom_activity_id: $custom_activity_id, title: $title, summary: $summary, content: $content, time_range: $time_range, timestamp: $timestamp ) {
  id
 }
}`;
const variables = {
  item_id: 9876543210,
  custom_activity_id: "8ca12626-7aeb-3ca7-7z1a-8ebdda488cd2",
  title: "Migrated Email",
  summary: "internal company email",
  content: "From: saarar@monday.com <br> To: asi@monday.com [Asi Monday], yoni@monday.com [Yoni Monday] <br> Subject: Deploy our first alpha version <br><br>Hey guys, <br>We are ready to deploy our first alpha version and enable<br>our clients to migrate into E&A!<br><br>Best regards,<br> Saar",
	timestamp: "2024-06-06T18:00:30Z",
  time_range: {
    start_timestamp: "2024-05-06T18:00:30Z", 
    end_timestamp: "2024-05-06T19:00:30Z"
   }
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument             | Type                                                                                                                            | Description                                                                                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content              | `String`                                                                                                                        | The new timeline item's content.                                                                                                                                                     |
| custom\_activity\_id | `String!`                                                                                                                       | The ID of the new timeline item's [custom activity](https://developer.monday.com/api-reference/reference/custom-activity).                                                           |
| item\_id             | `ID!`                                                                                                                           | The ID of the item to create the new timeline item on.                                                                                                                               |
| location             | `String`                                                                                                                        | The location to add to the new timeline item. This input isn't verified as a [location](https://developer.monday.com/api-reference/reference/location#update-the-location-column).   |
| phone                | `String`                                                                                                                        | The phone number to add to the new timeline item. This input isn't verified as a [phone number](https://developer.monday.com/api-reference/reference/phone#phone-number-validation). |
| summary              | `String`                                                                                                                        | The new timeline item's summary. The maximum is 255 characters.                                                                                                                      |
| timestamp            | `ISO8601DateTime!`                                                                                                              | The new timeline item's creation time.                                                                                                                                               |
| time\_range          | [`TimelineItemTimeRange`](https://developer.monday.com/api-reference/reference/timeline-item-other-types#timelineitemtimerange) | The start and end time of the new timeline item.                                                                                                                                     |
| title                | `String!`                                                                                                                       | The new timeline item's title. The maximum is 255 characters.                                                                                                                        |
| url                  | `String`                                                                                                                        | The URL to add to the new timeline item.                                                                                                                                             |

## Delete timeline item

Deletes a timeline item in the E\&A app. Returns [`TimelineItem`](https://developer.monday.com/api-reference/reference/timeline-item-ea#fields).

```graphql GraphQL
mutation {
  delete_timeline_item (id: "1234567890") {
    id
  }
}
```
```javascript JavaScript
import { ApiClient } from "@mondaydotcomorg/api";
const mondayApiClient = new ApiClient({ token: myToken });

const query = `mutation ($timelineId: String!) {
  delete_timeline_item (id: $timelineId) {
    id
  }
}`;
const variables = {
  timelineId: "1234567890",
};
const response = await mondayApiClient.request(query, variables);
```

### Arguments

| Argument | Type      | Description                                           |
| :------- | :-------- | :---------------------------------------------------- |
| id       | `String!` | The unique identifier of the timeline item to delete. |

# Error Handling

Refer to the [API error handling](https://developer.monday.com/api-reference/docs/error-handling#/) for a list of common error types, retry strategies, and troubleshooting examples.

When calling `timeline_item`, `create_timeline_item`, or `delete_timeline_item`, you may occasionally see standard GraphQL or HTTP errors. Here are the most common categories to check:

| Error Type                       | Description                                                                                 | Next Steps                                                                                                                              |
| :------------------------------- | :------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Permission or collaborator error | The caller doesn’t have access to the Emails & Activities app or the board/item.            | Use a token tied to an account with access to the E\&A app and the relevant board/item.                                                 |
| Validation error                 | The query or mutation contains invalid arguments, missing fields, or is nested incorrectly. | Ensure required arguments (i.e., `id`, `item_id`, `custom_activity_id`) are present and properly formatted. Keep `summary` ≤ 255 chars. |
| Not found                        | The specified timeline item or item ID doesn’t exist or isn’t visible.                      | Confirm the IDs are correct and that the timeline item exists on the target item.                                                       |
| Rate-limit error                 | Too many requests in a short period.                                                        | Wait and retry after the duration specified in the Retry-After header (if provided).                                                    |
| Server or network error          | Temporary outage or connectivity issue.                                                     | Retry with backoff; if it persists, contact monday.com support with the `request_id`.                                                   |
