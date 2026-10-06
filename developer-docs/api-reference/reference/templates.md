---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Templates

Learn how to install a template as a background job and poll its installation status using the platform API

monday.com [templates](https://support.monday.com/hc/en-us/articles/360002187419-Use-a-template-from-the-Template-Center) let you create ready-made <Glossary>boards</Glossary> (and multi-board solutions) from a predefined structure. The `use_template` mutation installs a template as a **background job** and immediately returns a `process_id`. Because an installation can take anywhere from a few seconds to several minutes, you poll [`template_installation_status`](#queries) with that `process_id` to track progress and retrieve the created board IDs.

<Callout icon="🚧" theme="warn">
  **Only available in API versions [`2026-10`](https://developer.monday.com/api-reference/docs/release-notes#2026-10) and later**
</Callout>

# How to find a template ID

There is currently no public query to list installable templates. To get a `template_id`:

* **From the monday.com UI:** Open the template in the Template Center and copy the numeric ID from the page URL. This is the `AppFeature` ID you pass as `template_id`.
* **As an authorized partner:** Use the internal `app_features` query if you have access. A public discovery API is not yet available.

***

# Queries

## Get template installation status

* **Required scope:** none beyond a valid API token
* Returns a [`TemplateInstallationStatusResult`](https://developer.monday.com/api-reference/reference/templates-other-types#templateinstallationstatusresult) describing the current state of a template installation, or `null` if the `process_id` is unknown, expired, or belongs to a different account
* Can be queried directly at the root

```graphql GraphQL
query {
  template_installation_status(process_id: "c072acaf68e0be9fd0e451f0884383b6") {
    process_id
    status
    is_complete
    is_failed
    board_ids
    board_ids_map {
      source_board_id
      created_board_id
    }
  }
}
```

### Arguments

| Argument    | Type  | Description                                        | Enum Values |
| :---------- | :---- | :------------------------------------------------- | :---------- |
| process\_id | `ID!` | The value returned by the `use_template` mutation. |             |

### Fields

| Field           | Type                                                                                                                                   | Description                                                                         | Enum Values                                 |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------ |
| board\_ids      | `[ID]!`                                                                                                                                | The IDs of the boards created so far. Populated incrementally during `IN_PROGRESS`. |                                             |
| board\_ids\_map | [`[BoardIdMapping]!`](https://developer.monday.com/api-reference/reference/templates-other-types#boardidmapping)                       | Maps each template (source) board ID to the newly created board ID.                 | `source_board_id` `created_board_id`        |
| is\_complete    | `Boolean!`                                                                                                                             | Shorthand for `status == COMPLETE`.                                                 |                                             |
| is\_failed      | `Boolean!`                                                                                                                             | Shorthand for `status == FAILED`.                                                   |                                             |
| process\_id     | `ID!`                                                                                                                                  | Echo of the input `process_id`.                                                     |                                             |
| status          | [`TemplateInstallationStatus!`](https://developer.monday.com/api-reference/reference/templates-other-types#templateinstallationstatus) | The lifecycle status of the installation.                                           | `PENDING` `IN_PROGRESS` `COMPLETE` `FAILED` |

***

# Mutations

## Use template

**Required scope: `workspaces:write`**

Installs a template as a background job. Returns a [`Template`](https://developer.monday.com/api-reference/reference/templates-other-types#template) containing a `process_id`. Pass that `process_id` to [`template_installation_status`](#queries) to poll for completion and retrieve the created board IDs.

```graphql GraphQL
mutation {
  use_template(template_id: 1234567890, destination_workspace_id: 9876543210) {
    process_id
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
      <th>Enum Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>template_id</td>
      <td>`Int!`</td>
      <td>The `AppFeature` ID of the template to install.</td>
      <td></td>
    </tr>
    <tr>
      <td>board_kind</td>
      <td>`BoardKind`</td>
      <td>The visibility kind of the created board(s).</td>
      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>
    <tr>
      <td>board_owner_ids</td>
      <td>`[Int]`</td>
      <td>User IDs to set as owners of the created board(s).</td>
      <td></td>
    </tr>
    <tr>
      <td>board_owner_team_ids</td>
      <td>`[Int]`</td>
      <td>Team IDs to set as owners of the created board(s).</td>
      <td></td>
    </tr>
    <tr>
      <td>board_subscriber_ids</td>
      <td>`[Int]`</td>
      <td>User IDs to subscribe to the created board(s).</td>
      <td></td>
    </tr>
    <tr>
      <td>board_subscriber_teams_ids</td>
      <td>`[Int]`</td>
      <td>Team IDs to subscribe to the created board(s).</td>
      <td></td>
    </tr>
    <tr>
      <td>callback_url_on_complete</td>
      <td>`String`</td>
      <td>A webhook URL that monday.com calls with the created board/workspace IDs when the installation completes.</td>
      <td></td>
    </tr>
    <tr>
      <td>destination_folder_id</td>
      <td>`Int`</td>
      <td>The ID of the folder to install the template into.</td>
      <td></td>
    </tr>
    <tr>
      <td>destination_folder_name</td>
      <td>`String`</td>
      <td>The name of the folder to create for a multi-board template.</td>
      <td></td>
    </tr>
    <tr>
      <td>destination_name</td>
      <td>`String`</td>
      <td>The name for the created instance.</td>
      <td></td>
    </tr>
    <tr>
      <td>destination_workspace_id</td>
      <td>`Int`</td>
      <td>The ID of the workspace to install the template into. Defaults to the Main Workspace.</td>
      <td></td>
    </tr>
    <tr>
      <td>skip_target_folder_creation</td>
      <td>`Boolean`</td>
      <td>When `true`, skips folder creation for multi-entity templates.</td>
      <td></td>
    </tr>
    <tr>
      <td>solution_extra_options</td>
      <td>`JSON`</td>
      <td>Additional installation options for the template.</td>
      <td></td>
    </tr>
  </tbody>
</Table>

***

# Polling pattern

The installation runs asynchronously, so the recommended flow is:

1. Call `use_template` and store the returned `process_id`.
2. Poll `template_installation_status` with that `process_id` every **2–5 seconds**.
3. Stop polling when `is_complete` is `true`, `is_failed` is `true`, or the result is `null` (the record expired).

```graphql GraphQL
# Step 1: start the installation
mutation {
  use_template(template_id: 1234567890, destination_workspace_id: 9876543210) {
    process_id
  }
}

# Step 2: poll until done (every ~3 seconds)
query {
  template_installation_status(process_id: "c072acaf68e0be9fd0e451f0884383b6") {
    status
    is_complete
    is_failed
    board_ids
    board_ids_map {
      source_board_id
      created_board_id
    }
  }
}
```

A successful `COMPLETE` response looks like this:

```json
{
  "data": {
    "template_installation_status": {
      "status": "COMPLETE",
      "is_complete": true,
      "is_failed": false,
      "board_ids": ["1234567890", "1234567891", "1234567892"],
      "board_ids_map": [
        { "source_board_id": "9876543210", "created_board_id": "1234567890" },
        { "source_board_id": "9876543211", "created_board_id": "1234567891" },
        { "source_board_id": "9876543212", "created_board_id": "1234567892" }
      ]
    }
  }
}
```

<Callout icon="👍" theme="okay">
  Poll every 2–5 seconds. Polling more than once per second can hit the rate limit (60 requests per minute per account by default).
</Callout>

***

# Important caveats

* **Board content is not ready during `IN_PROGRESS`.** `board_ids` is populated incrementally as boards are created, but during `IN_PROGRESS` they exist as empty shells — no items, broken mirror columns, no automations. It is safe to store the IDs early, but **do not read from or write to board content until `status == COMPLETE`**.
* **Records expire after 1 hour.** Polling `template_installation_status` more than 1 hour after the `use_template` call returns `null`.
* **Timeout safety net.** A stuck `IN_PROGRESS` record is converted to `FAILED` after 30 minutes to prevent indefinite polling.
* **Cross-account security.** Querying a `process_id` that belongs to a different account returns `null` (indistinguishable from an expired or invalid `process_id`).
* **Rate limiting.** Polling is capped at 60 requests per minute per account by default.

***

# Error cases

The `use_template` mutation can return the following errors:

| Error                                         | Description                                                                      |
| :-------------------------------------------- | :------------------------------------------------------------------------------- |
| `ManagedTemplateMaxInstancesForTemplateError` | The account reached the per-template instance limit.                             |
| `ManagedTemplateMaxInstancesForAccountError`  | The account reached the global template instance limit.                          |
| `USER_UNAUTHORIZED` (HTTP `403`)              | The user lacks access to the requested template or the `workspaces:write` scope. |
