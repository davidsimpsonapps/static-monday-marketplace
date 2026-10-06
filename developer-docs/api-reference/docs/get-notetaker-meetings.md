---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get Notetaker Meetings (Platform MCP)

Retrieves notetaker meetings from the monday.com AI Notetaker, with optional filters for access level, summaries, topics, action items, and transcripts using the Platform MCP.

Use this tool to retrieve meetings recorded by the monday.com AI Notetaker. You can filter by access level, specific meeting IDs, or a search term, and control which details are returned using the `include_*` flags. By default, only basic meeting metadata is returned (title, participants, start/end time, meeting link) — set the appropriate flags to include summaries, topics, action items, or full transcripts.

The default access filter is `OWN`, which returns meetings the authenticated user participated in or invited the notetaker bot to. Use `ALL` to retrieve every meeting the user has access to. Results support cursor-based pagination.

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
      <td>ids</td>
      <td>`array`</td>
      <td>No</td>
      <td>Filter by specific meeting IDs. Use to fetch one or more specific meetings in a single call.</td>
    </tr>
    <tr>
      <td>access</td>
      <td>`string`</td>
      <td>No</td>
      <td>Filter meetings by access level. One of `OWN` (default), `SHARED_WITH_ME`, `SHARED_WITH_ACCOUNT`, or `ALL`.</td>
    </tr>
    <tr>
      <td>limit</td>
      <td>`number`</td>
      <td>No</td>
      <td>Maximum number of meetings to return per page. Between 1 and 100. Defaults to 25.</td>
    </tr>
    <tr>
      <td>cursor</td>
      <td>`string`</td>
      <td>No</td>
      <td>Pagination cursor. Pass the `cursor` value from a previous response's `page_info` to fetch the next page.</td>
    </tr>
    <tr>
      <td>search</td>
      <td>`string`</td>
      <td>No</td>
      <td>Search meetings by title, participant name, or email.</td>
    </tr>
    <tr>
      <td>include_summary</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include the AI-generated summary for each meeting. Defaults to `false`.</td>
    </tr>
    <tr>
      <td>include_topics</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include discussion topics and talking points for each meeting. Defaults to `false`.</td>
    </tr>
    <tr>
      <td>include_action_items</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include action items for each meeting. Defaults to `false`.</td>
    </tr>
    <tr>
      <td>include_transcript</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Whether to include the full transcript for each meeting. Transcripts can be very large. Defaults to `false`.</td>
    </tr>
  </tbody>
</Table>

# Example

Retrieve your own meetings with AI-generated summaries and action items:

```json
{
  "access": "OWN",
  "include_summary": true,
  "include_action_items": true,
  "limit": 10
}
```

Calling the tool with no arguments returned 25 meetings from the test account. Each meeting object includes an `id` (UUID), `title`, `start_time`, `end_time`, `recording_duration` (in milliseconds), `access_type`, `meeting_link`, and a `participants` array of email addresses. The response also includes a `pagination` object with `has_next_page` and a `cursor` for fetching additional pages.

***

# Programmatic equivalent

The monday.com AI Notetaker is managed through the monday.com interface or via the MCP. There is no public GraphQL API for retrieving notetaker meetings.
