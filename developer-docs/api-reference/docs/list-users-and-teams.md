---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# List Users and Teams (Platform MCP)

Fetches user profiles and team data from the account, with several targeting modes for looking up specific users or teams efficiently using the Platform MCP.

Use this tool to look up users or teams by ID, name, or relationship to the current user. The response includes user profiles (name, title, admin status, team memberships) and team details (name, owners, optional member lists). You can target a specific user by ID, search by name, get information about the current user, or list specific teams.

<Callout icon="🚧" theme="warn">
**MANDATORY BEST PRACTICES — always follow this parameter priority order:**

1. `getMe` — use whenever the request refers to the current user. This parameter is **standalone** and conflicts with all others.
2. `userIds` — use whenever you have specific user IDs in context. Preferred over name search.
3. `name` — use for fuzzy name matching on **users only**. This is a **standalone** parameter and cannot be combined with others. **Do not use `name` to search for teams** — use `teamIds` instead.
4. `teamIds` + `teamsOnly` — use when you have specific team IDs. Never fetch all teams if specific IDs are available.
5. No parameters — **last resort only.** Avoid broad queries that return the full user/team list.
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
      <td>getMe</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Returns the current user's profile including team memberships. **Top priority** — use whenever the request refers to "me" or "my teams". Conflicts with all other parameters.</td>
    </tr>
    <tr>
      <td>userIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of specific user IDs to fetch (max 500). Always use when user IDs are available in context. Returns user profiles including team memberships.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>`string`</td>
      <td>No</td>
      <td>Fuzzy name search for **users only**. Standalone — cannot be combined with other parameters. Do not use to search for teams.</td>
    </tr>
    <tr>
      <td>teamIds</td>
      <td>`array`</td>
      <td>No</td>
      <td>Array of specific team IDs to fetch (max 500). Always use when team IDs are known. Returns team details with owners and optional member data.</td>
    </tr>
    <tr>
      <td>includeTeams</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Fetches all teams in the account alongside users. **Avoid** — only use as a last resort. To get a specific user's teams, fetch that user by `userIds` instead.</td>
    </tr>
    <tr>
      <td>teamsOnly</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Returns only teams, no users. Combine with `teamIds` for targeted team lookup, or with `includeTeamMembers` for full member details.</td>
    </tr>
    <tr>
      <td>includeTeamMembers</td>
      <td>`boolean`</td>
      <td>No</td>
      <td>Set to `true` only when you need full member details for teams beyond names and IDs.</td>
    </tr>
  </tbody>
</Table>

# Example

**Get the current user:**

```json
{
  "getMe": true
}
```

The tool returned the current user's ID (`48202303`), name (`Daniel Hai`), title (`Product Manager`), and flags for admin and guest status.

**Look up specific users by ID:**

```json
{
  "userIds": ["48202303", "66347492"]
}
```

**Search for a user by name:**

```json
{
  "name": "Daniel"
}
```

**Fetch specific teams:**

```json
{
  "teamIds": ["12345", "67890"],
  "teamsOnly": true
}
```

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/users) to achieve the same result:

```graphql GraphQL
query {
  users(ids: [48202303]) {
    id
    name
    title
    email
    is_admin
    is_guest
    enabled
    teams {
      id
      name
    }
  }
}
```

To fetch teams, use the `teams` query:

```graphql GraphQL
query {
  teams(ids: [12345]) {
    id
    name
    picture_url
    owners {
      id
      name
    }
    users {
      id
      name
    }
  }
}
```

For full documentation, see [Users](https://developer.monday.com/api-reference/reference/users) and [Teams](https://developer.monday.com/api-reference/reference/teams).
