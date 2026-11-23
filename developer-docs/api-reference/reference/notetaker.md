---
updatedAt: 2026-11-20T08:41:43.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
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

To read speaker and turn-taking statistics, select `dynamics` on a meeting. This example works in versions `2027-01` and later.

```graphql GraphQL
query {
  notetaker {
    meetings(limit: 1, filters: { access: ALL }) {
      meetings {
        title
        dynamics {
          total_talk_time_seconds
          turn_switches_per_minute
          interruption_count
          longest_monologue {
            speaker
            duration_seconds
            start_time_seconds
          }
          silent_attendees
          speaker_stats {
            speaker
            talk_time_seconds
            talk_time_percentage
            questions_asked
          }
        }
      }
    }
  }
}
```

***

## Fields on `Meeting`

| Field                | Type                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`              | `String`                                                                                                              | Meeting title.                                                                                                                                                                                                                                                                                                                                                                      |
| `start_time`         | `String`                                                                                                              | Meeting start time.                                                                                                                                                                                                                                                                                                                                                                 |
| `end_time`           | `String`                                                                                                              | Meeting end time.                                                                                                                                                                                                                                                                                                                                                                   |
| `recording_duration` | `Int`                                                                                                                 | Recording length in milliseconds.                                                                                                                                                                                                                                                                                                                                                   |
| `recording`          | [`MeetingRecording`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingrecording)     | A temporary download link for the meeting recording: video for bot and desktop recordings, audio for mobile recordings and phone calls. `null` when the meeting has no recording. Only a limited number of recordings can be requested per query, so request `recording` for a few meetings at a time or use a smaller `limit`. **Only available in versions `2027-01` and later.** |
| `summary`            | `String`                                                                                                              | Meeting summary (markdown).                                                                                                                                                                                                                                                                                                                                                         |
| `access_type`        | [`MeetingAccess`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingaccess)           | How the current user relates to the meeting.                                                                                                                                                                                                                                                                                                                                        |
| `meeting_link`       | `String`                                                                                                              | Link to the meeting.                                                                                                                                                                                                                                                                                                                                                                |
| `series_id`          | `ID`                                                                                                                  | ID of the recurring calendar series the meeting belongs to. `null` for one-off meetings and meetings without a calendar event. **Only available in versions `2027-01` and later.**                                                                                                                                                                                                  |
| `participants`       | [`[Participant]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#participant)             | People associated with the meeting.                                                                                                                                                                                                                                                                                                                                                 |
| `topics`             | [`[Topic]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#topic)                         | Discussion topics and talking points.                                                                                                                                                                                                                                                                                                                                               |
| `action_items`       | [`[ActionItem]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#actionitem)               | Action items captured from the meeting.                                                                                                                                                                                                                                                                                                                                             |
| `transcript`         | [`[TranscriptEntry]`](https://developer.monday.com/api-reference/reference/notetaker-other-types#transcriptentry)     | Transcript segments with timing and speaker metadata.                                                                                                                                                                                                                                                                                                                               |
| `dynamics`           | [`MeetingDynamics`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingdynamics)       | Speaker and turn-taking statistics computed from the transcript. `null` when the meeting has no transcript or the statistics have not been computed yet. **Only available in versions `2027-01` and later.**                                                                                                                                                                        |
| `workspaces`         | [`[MeetingWorkspace!]!`](https://developer.monday.com/api-reference/reference/notetaker-other-types#meetingworkspace) | The workspaces this meeting is linked to that the current user can open. **Only available in versions `2027-01` and later.**                                                                                                                                                                                                                                                        |

### Example: request a meeting recording

`recording` is available only in versions `2027-01` and later, so send this query with the `API-Version: 2027-01` header. Download the file with an HTTP GET of `url`, and request a new link if the download returns `403` or `expires_at` has passed.

```graphql GraphQL
query {
  notetaker {
    meetings(limit: 1) {
      meetings {
        title
        recording {
          url
          media_type
          expires_at
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "notetaker": {
      "meetings": {
        "meetings": [
          {
            "title": "Weekly sync",
            "recording": {
              "url": "https://<signed-download-url>",
              "media_type": "VIDEO",
              "expires_at": "<link expiry time>"
            }
          }
        ]
      }
    }
  }
}
```

`TalkingPoint` objects under `topics` expose **`content` only** — they do **not** include a `start_time` field (confirmed via API testing).

For field-level details on nested types, see [Other types](https://developer.monday.com/api-reference/reference/notetaker-other-types).
