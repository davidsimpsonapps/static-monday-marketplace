---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Notetaker

Learn how to query meetings and recordings using the notetaker API

The notetaker API provides access to meeting recordings, transcripts, summaries, and action items from monday.com's built-in notetaker feature.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

***

# Queries

## `notetaker.meetings`

The top-level `notetaker` field returns a `NotetakerQueries` object. The `meetings` query on that namespace retrieves paginated meetings that have completed recordings.

### Arguments

| Argument  | Type                                                                                                                    | Description                                                                |
| :-------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `limit`   | `Int`                                                                                                                   | Maximum number of meetings to return. Default: `10`. Allowed range: 1–100. |
| `cursor`  | `String`                                                                                                                | Pagination cursor from the previous response's `page_info.cursor`.         |
| `filters` | [`MeetingsFilterInput`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingsfilterinput) | Optional. Filter by meeting IDs, search text, or access level.             |

### Returns

[`MeetingsResponse`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingsresponse) — includes a `meetings` array and `page_info` for cursor-based pagination.

```graphql GraphQL
query {
  notetaker {
    meetings(limit: 10, filters: { access: ALL }) {
      meetings {
        title
        start_time
        end_time
        recording_duration
        summary
        access_type
        meeting_link
        participants { email }
        topics {
          title
          talking_points { content }
        }
        action_items {
          content
          is_completed
          owner
          due_date
        }
      }
      page_info {
        has_next_page
        cursor
      }
    }
  }
}
```

***

## Fields on `Meeting`

| Field                | Type                                                                                                              | Description                                           |
| :------------------- | :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `title`              | `String`                                                                                                          | Meeting title.                                        |
| `start_time`         | `String`                                                                                                          | Meeting start time.                                   |
| `end_time`           | `String`                                                                                                          | Meeting end time.                                     |
| `recording_duration` | `Int`                                                                                                             | Recording length in milliseconds.                     |
| `summary`            | `String`                                                                                                          | Meeting summary (markdown).                           |
| `access_type`        | [`MeetingAccess`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingaccess)       | How the current user relates to the meeting.          |
| `meeting_link`       | `String`                                                                                                          | Link to the meeting.                                  |
| `participants`       | [`[Participant]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#participant)         | People associated with the meeting.                   |
| `topics`             | [`[Topic]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#topic)                     | Discussion topics and talking points.                 |
| `action_items`       | [`[ActionItem]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#actionitem)           | Action items captured from the meeting.               |
| `transcript`         | [`[TranscriptEntry]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#transcriptentry) | Transcript segments with timing and speaker metadata. |

`TalkingPoint` objects under `topics` expose **`content` only** — they do **not** include a `start_time` field (confirmed via API testing).

For field-level details on nested types, see [Other types](https://developer.monday.com/api-reference/reference/notetaker-other-types).
