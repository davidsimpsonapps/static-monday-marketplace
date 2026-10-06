---
updatedAt: 2026-09-06T08:32:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get User Context (Platform MCP)

Returns information about the currently authenticated user, their account, and their most relevant boards, people, and workspaces using the Platform MCP.

Use this tool to get context about who the current user is before performing personalized operations. The response includes the user's ID, name, and title; account-level information such as plan tier, active member count, and trial status; and lists of the user's favorite and most recently visited boards, workspaces, and dashboards. It also returns the people the user interacts with most frequently.

This tool requires no parameters and should be called at the start of a session to populate user context — for example, to resolve "me" or "my boards" references, to get the current user's ID before sending a notification, or to understand what the account has access to before recommending features.

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
      <td colspan="4">This tool takes no parameters.</td>
    </tr>
  </tbody>
</Table>

# Example

Fetch context for the currently authenticated user:

```json
{}
```

The tool returned the user's ID (`48202303`), name (`Daniel Hai`), and title (`Product Manager`). The account response showed 3,894 active members, no active trial, and active products including `core`, `crm`, `software`, and `service`. The `favorites` list included 4 pinned boards, and `relevantBoards` returned 10 recently visited boards. The `relevantPeople` list returned 10 frequently interacted colleagues with their IDs and names.

***

# Programmatic equivalent

Use the [GraphQL API](https://developer.monday.com/api-reference/reference/users#get-your-own-user-information) to achieve the same result:

```graphql GraphQL
query {
  me {
    id
    name
    title
    email
    is_admin
    is_guest
    account {
      id
      name
      active_members_count
      plan {
        tier
      }
    }
  }
}
```

For full documentation, see [Users](https://developer.monday.com/api-reference/reference/users#get-your-own-user-information).
