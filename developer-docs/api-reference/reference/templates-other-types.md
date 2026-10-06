---
updatedAt: 2026-09-06T08:36:53.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Templates Other Types

Learn more about the other types used when installing templates and polling installation status via the API

The monday.com [`templates`](https://developer.monday.com/api-reference/reference/templates) API lets you install a template as a background job and poll its installation status. The types below are used as return types across the template query and mutation.

# Template

The return type of the [`use_template`](https://developer.monday.com/api-reference/reference/templates#use-template) mutation.

| Field       | Type     | Description                                                                                          |
| :---------- | :------- | :--------------------------------------------------------------------------------------------------- |
| process\_id | `String` | An opaque handle for the background installation. Pass it to `template_installation_status` to poll. |

***

# TemplateInstallationStatusResult

The return type of the [`template_installation_status`](https://developer.monday.com/api-reference/reference/templates#get-template-installation-status) query.

| Field           | Type                                                                                                                                   | Description                                                                         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| board\_ids      | `[ID]!`                                                                                                                                | The IDs of the boards created so far. Populated incrementally during `IN_PROGRESS`. |
| board\_ids\_map | [`[BoardIdMapping]!`](https://developer.monday.com/api-reference/reference/templates-other-types#boardidmapping)                       | Maps each template (source) board ID to the newly created board ID.                 |
| is\_complete    | `Boolean!`                                                                                                                             | Shorthand for `status == COMPLETE`.                                                 |
| is\_failed      | `Boolean!`                                                                                                                             | Shorthand for `status == FAILED`.                                                   |
| process\_id     | `ID!`                                                                                                                                  | Echo of the input `process_id`.                                                     |
| status          | [`TemplateInstallationStatus!`](https://developer.monday.com/api-reference/reference/templates-other-types#templateinstallationstatus) | The lifecycle status of the installation.                                           |

***

# BoardIdMapping

Maps a template's original board to the board that was created from it.

| Field              | Type  | Description                       |
| :----------------- | :---- | :-------------------------------- |
| created\_board\_id | `ID!` | The newly created board's ID.     |
| source\_board\_id  | `ID!` | The template's original board ID. |

***

# TemplateInstallationStatus

The lifecycle status of a template installation, returned on the `status` field of [`TemplateInstallationStatusResult`](https://developer.monday.com/api-reference/reference/templates-other-types#templateinstallationstatusresult).

| Enum Value    | Description                                                                   |
| :------------ | :---------------------------------------------------------------------------- |
| `PENDING`     | The job is queued but has not started yet.                                    |
| `IN_PROGRESS` | The metadata phase is running — boards are being created as empty shells.     |
| `COMPLETE`    | All boards are fully ready, including items, automations, and mirror columns. |
| `FAILED`      | The installation failed; any partially created boards were rolled back.       |
