---
updatedAt: 2026-09-23T16:40:02.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the features APIs

The monday.com [features](https://developer.monday.com/api-reference/reference/app-features) APIs enable you to create, read, and update app features from monday.com apps.

The types below are used by the feature queries and mutations, and are not independently queryable.

# AppFeatureTypeE

A list of valid app feature type enum values.

|                                           |                             |                               |
| :---------------------------------------- | :-------------------------- | :---------------------------- |
| `ADMIN_VIEW`                              | `AI`                        | `AI_AGENT`                    |
| `AI_AGENT_SKILL`                          | `AI_BOARD_MAIN_MENU_HEADER` | `AI_DOC_CONTEXTUAL_MENU`      |
| `AI_DOC_QUICK_START`                      | `AI_DOC_SLASH_COMMAND`      | `AI_DOC_TOP_BAR`              |
| `AI_EMAILS_AND_ACTIVITIES_HEADER_ACTIONS` | `AI_FORMULA`                | `AI_IC_ASSISTANT_HELP_CENTER` |
| `AI_ITEM_EMAILS_AND_ACTIVITIES_ACTIONS`   | `AI_ITEM_UPDATE_ACTIONS`    | `APP_WIZARD`                  |
| `BLOCK`                                   | `BOARD_COLUMN_ACTION`       | `BOARD_COLUMN_EXTENSION`      |
| `BOARD_HEADER_ACTION`                     | `BOARD_VIEW`                | `COLUMN`                      |
| `COLUMN_TEMPLATE`                         | `CREDENTIALS`               | `DATA_ENTITY`                 |
| `DASHBOARD_WIDGET`                        | `DIALOG`                    | `DIGITAL_WORKER`              |
| `DOC_ACTIONS`                             | `FIELD_TYPE`                | `GROUP_MENU_ACTION`           |
| `GROWTH_CONFIG`                           | `INTEGRATION`               | `ITEM_BATCH_ACTION`           |
| `ITEM_MENU_ACTION`                        | `ITEM_VIEW`                 | `MCP_SERVER`                  |
| `MODAL`                                   | `NOTIFICATION_KIND`         | `NOTIFICATION_SETTING_KIND`   |
| `OBJECT`                                  | `OAUTH`                     | `PACKAGED_BLOCK`              |
| `PRODUCT`                                 | `PRODUCT_VIEW`              | `SOLUTION`                    |
| `SUB_WORKFLOW`                            | `SURFACE_VIEW`              | `SYNCABLE_RESOURCE`           |
| `TOPBAR`                                  | `WORKFLOW_TEMPLATE`         | `WORKSPACE_VIEW`              |

***

# UpdateAppFeatureInput

An object containing the app feature's updated input.

| Field      | Type                                                                                                                         | Description                                                                                                                                                                           |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data       | `JSON`                                                                                                                       | The app feature data to update. Structure is dynamic per feature type. Any iconUrl/logoUrl/thumbnailUrl (including nested under headerConfig) must be an HTTPS URL or Vibe icon name. |
| deployment | [`AppFeatureReleaseInput`](https://developer.monday.com/api-reference/reference/features-other-types#appfeaturereleaseinput) | The app feature's deployment data to update.                                                                                                                                          |

## AppFeatureReleaseInput

An object containing the app feature's updated deployment data.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        data
      </td>

      <td>
        [`AppFeatureReleaseDataInput`](https://developer.monday.com/api-reference/reference/features-other-types#appfeaturereleasedatainput)
      </td>

      <td>
        The app feature release's data.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        kind
      </td>

      <td>
        `AppFeatureReleaseKind`
      </td>

      <td>
        The app feature release's hosting type. The app release category will be determined by this value.
      </td>

      <td>
        `CLIENT_SIDE_CODE` <br />
        `EXTERNAL_HOSTING` <br />
        `SERVER_SIDE_CODE`
      </td>
    </tr>
  </tbody>
</Table>

### AppFeatureReleaseDataInput

An object containing the app feature release's data.

| Field | Type     | Description                    |
| :---- | :------- | :----------------------------- |
| url   | `String` | The app feature release's URL. |
