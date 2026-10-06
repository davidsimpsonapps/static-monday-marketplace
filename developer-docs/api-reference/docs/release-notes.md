---
updatedAt: 2026-10-02T12:59:57.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Release notes

# Actively supported versions

This document lists the actively supported API versions in reverse chronological order, allowing you to quickly view the latest features, fixes, and changes.

Versions earlier than `2025-04` are deprecated and no longer supported, but we’ve kept them in a [Deprecated versions](https://developer.monday.com/api-reference/docs/release-notes#deprecated-versions) section at the bottom for migration and troubleshooting reference.

## `2027-01`

<Callout icon="🚧" theme="warn">
  **Release candidate.** `2027-01` may still change before it becomes the current version on January 15, 2027.
</Callout>

### Non-breaking changes

* **External agents:**
  * New `subscribe_users_to_agent` and `unsubscribe_users_from_agent` mutations — subscribe up to 200 users to an agent with an owner or member role, or unsubscribe up to 200 users from it
  * New [`agents`](https://developer.monday.com/api-reference/reference/agents#get-agents) query — retrieve agents and filter their user or team subscribers by type and role
  * New `subscribers` field on the `Agent` type — lists the users and teams subscribed to an agent and their owner or member role
  * New `EXTERNAL_AGENT_MEMBER` and `EXTERNAL_AGENT_DETACHED_MEMBER` values on `BaseRoleName` — assign external-agent roles with `update_users_role`
* **Typed item pages:**
  * New root-level `items_page` query, separate from the nested `boards { items_page }` field — query a board or data view by ID with filters, hierarchy options, and cursor pagination
  * New typed item results and column values — return groups, linked items, subitems, parent items, metadata, capabilities, and structured values through inline fragments
* New [`include_project_board_link`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput) input on [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export) — add a trailing `Project Board` column with the first linked project board ID to CSV exports, or a blank value when no project is linked; the column is only added on accounts where this capability is enabled
* New `DATA_VIEW` source for [`aggregate`](https://developer.monday.com/api-reference/reference/aggregate) — aggregate from a data view ID as well as a table ID

## `2026-10`

### Breaking changes

* The User entity migration that started in `2026-07` completes in `2026-10`. See the [User entity migration guide](https://developer.monday.com/api-reference/docs/migrating-user-entity-to-2026-10).
  * The following legacy `User` fields are removed: `photo_original`, `photo_thumb`, `photo_thumb_small`, `photo_tiny`, `photo_small`, `is_guest`, `is_admin`, `is_view_only`, `is_pending`, `enabled`, `is_verified`, `join_date`, `encrypt_api_token`, and `sign_up_product_kind`
  * The `kind`, `newest_first`, and `non_active` arguments on `Query.users` remain deprecated; use `user_kind`, `sort`, and `status` instead
* **Workforms:**
  * The `update_form_tag` mutation is removed. Delete and recreate the tag as a replacement. See the [Form](https://developer.monday.com/api-reference/reference/form) reference
  * The `FormFormat` enum type and the `format` field on `FormLayout` and `FormLayoutInput` are removed. Remove references to `format` and `FormFormat` before migrating
  * The `value` field on `FormTag` and `CreateFormTagInput` is removed. Remove any queries or inputs that use `value` on form tags before migrating
  * The `UpdateFormTagInput` input type is removed (used only by the now-removed `update_form_tag` mutation)
  * `FormQuestion.showIfRules` (camelCase) is removed. Use `show_if_rules` (snake\_case) instead

### Non-breaking changes

* **Search:**
  * New `search.users` field on the `SearchNamespace` — search for users by name or email. Returns [`SearchUserResults`](https://developer.monday.com/api-reference/reference/search-other-types#searchuserresults) with indexed data and optional live data resolution
  * New `search.updates` field on the `SearchNamespace` — search for updates by body, board, creator, and date range. Returns [`SearchUpdateResults`](https://developer.monday.com/api-reference/reference/search-other-types#searchupdateresults) with indexed data and optional live data resolution
  * New `search.timeline_items` field on the `SearchNamespace` — search Emails & Activities timeline items by title, summary, and content, filtered by board, workspace, item, [`TimelineItemKind`](https://developer.monday.com/api-reference/reference/search-other-types#timelineitemkind), [`TimelineItemProductKind`](https://developer.monday.com/api-reference/reference/search-other-types#timelineitemproductkind), and date range. Returns [`SearchTimelineItemResults`](https://developer.monday.com/api-reference/reference/search-other-types#searchtimelineitemresults) with indexed data and optional live data resolution
  * New `search.overviews` field on the `SearchNamespace` — search dashboards by name, workspace, kind, and creator. Returns `SearchOverviewResults` with indexed data and optional live data resolution
  * New `ids` argument on `search.docs` — filters results to up to 512 document IDs; indexed document results now include matched highlights
* **Apps:**
  * New [`promote_app`](https://developer.monday.com/api-reference/reference/app#promote-app) mutation to asynchronously promote a draft app version to live
  * New [`DeveloperAppVersion`](https://developer.monday.com/api-reference/reference/app-other-types#developerappversion) type and [`AppVersionStatus`](https://developer.monday.com/api-reference/reference/app-other-types#appversionstatus) enum for tracking app version promotion status
  * New [`versions`](https://developer.monday.com/api-reference/reference/app#fields) field on `App` — returns `[DeveloperAppVersion!]` for polling version promotion status
  * New `MCP_SERVER` value on `AppFeatureTypeE` — identifies apps that expose an MCP server feature
  * New `retrieval_only` argument on [`ask_developer_docs`](https://developer.monday.com/api-reference/reference/ask-developer-docs) — returns relevant documentation without an AI-generated summary
* **Workforms:**
  * New `show_if_rules` (snake\_case) field on `FormQuestion` — replaces the removed `showIfRules` camelCase alias
* **AI:**
  * New [`run_prompt`](https://developer.monday.com/api-reference/reference/ai#run-a-prompt) mutation — runs a single prompt against a monday-hosted AI model and returns the generated text. Accepts an optional [`RunPromptConfigInput`](https://developer.monday.com/api-reference/reference/ai-other-types#runpromptconfiginput) (model, system prompt, temperature, max tokens) and returns a [`RunPromptResult`](https://developer.monday.com/api-reference/reference/ai-other-types#runpromptresult). Requires the External AI gateway access permission (and the `AI:Consume` scope for apps). A simplified alternative to the [Models API](https://developer.monday.com/api-reference/docs/models-api-overview); see the [AI](https://developer.monday.com/api-reference/reference/ai) reference
  * New AI column mutations — configure a column to categorize, summarize, translate, improve text, extract, run an open prompt, write content, or assign people, or remove AI from a column. See the [AI Column](https://developer.monday.com/api-reference/reference/ai-column) reference
* New `aggregate_history` and `items_history` queries — retrieve aggregated board data or item data at a specific historical date for point-in-time analysis. When the query references a date column, timestamps before that board's date-column history began are rejected
* **Activity logs:**
  * New `correlation_ids` and `entities` arguments on `User.activity_logs` — filter user-scoped activity log events by correlation IDs or related entities
  * New `correlation_id`, `triggering_flow_id`, and `triggering_flow_type` fields on activity-log events — correlate events with logical sessions and triggering flows. See the [Activity logs](https://developer.monday.com/api-reference/docs/activity-logs) guide
* **Users:**
  * New `CRM_USER_AGENT_MEMBER` and `SERVICE_AI_AGENT_MEMBER` values on `UserKindFilter` — filter `Query.users` by agent kind via `user_kind`
* New `search_in`, `start_time_from`, and `start_time_to` arguments on [`notetaker.meetings`](https://developer.monday.com/api-reference/reference/notetaker) — `search_in` works only alongside `search`; `start_time_from` and `start_time_to` apply only to ranked search, and results include relevance scores and matched content slices
* New `sub_type` field on object schema column inputs and output — configure and inspect mirror and lookup column subtypes
* New `kind_names` argument on `notifications` — may be ignored unless an account feature flag is enabled; check `kind_name` on results; notification results also expose `kind` and `kind_name`
* New `consumption` field on [`platform_api.daily_limit`](https://developer.monday.com/api-reference/reference/platform-api) — reports the account's consumed daily API limit
* **Templates:**
  * New [`template_installation_status`](https://developer.monday.com/api-reference/reference/templates#get-template-installation-status) query — polls the status of an async template installation by `process_id` and returns the created board IDs. Returns [`TemplateInstallationStatusResult`](https://developer.monday.com/api-reference/reference/templates-other-types#templateinstallationstatusresult)
  * [`use_template`](https://developer.monday.com/api-reference/reference/templates#use-template) installs a template as a background job and returns a `process_id` to poll with `template_installation_status` (see the [Templates](https://developer.monday.com/api-reference/reference/templates) reference)
* **Boards:**
  * New [`change_board_kind`](https://developer.monday.com/api-reference/reference/boards#change-board-kind) mutation — changes a board's privacy kind (public, private, or shareable)
  * New `board_automations` query and `delete_board_automation` mutation — list account or board automations with pagination and delete an automation
  * New `member` value on `BoardBasicRoleName` — the default board role; can only be used for agent users
  * New `would_create_mls_rollup_cycle` query — checks whether connecting two items would create a multi-level board rollup cycle
* **Board views:**
  * New [`duplicate_view`](https://developer.monday.com/api-reference/reference/board-views#duplicate-view) and [`restore_view`](https://developer.monday.com/api-reference/reference/board-views#restore-view) mutations on board views
  * New `context` and `conditional_formatting_settings` arguments on view mutations — `conditional_formatting_settings` replaces all existing conditions when supplied, and `context` sets the view's entity scope (currently only `BOARD`, the default)
* **Board exports:**
  * New [`create_board_export`](https://developer.monday.com/api-reference/reference/boards#create-board-export) mutation — exports a board's items to a CSV file. Returns [`ExportResult`](https://developer.monday.com/api-reference/reference/boards-other-types#exportresult), a union of [`ExportFile`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfile) (the export finished during the request, so the download URL is ready) and [`ExportAsyncJob`](https://developer.monday.com/api-reference/reference/boards-other-types#exportasyncjob) (the export is still running, so poll for it). The server chooses the branch from board size and current load, so select both and switch on `__typename`. Accepts `time_zone` to format date values, and an optional [`CreateBoardExportOptionsInput`](https://developer.monday.com/api-reference/reference/boards-other-types#createboardexportoptionsinput) covering subitems, header format, per-column-type value formatting, and `columns_order` to select and order the exported columns. Requires the `boards:read` scope and is only available for **Enterprise plans**
  * New [`export_job_status`](https://developer.monday.com/api-reference/reference/boards#get-export-job-status) query — polls an asynchronous board export by `job_id`. Returns [`ExportJobStatusInfo`](https://developer.monday.com/api-reference/reference/boards-other-types#exportjobstatusinfo) with an [`ExportJobStatus`](https://developer.monday.com/api-reference/reference/boards-other-types#exportjobstatus), the download URL once the export completes, and an [`ExportFailureReason`](https://developer.monday.com/api-reference/reference/boards-other-types#exportfailurereason) if it fails. Requires the `boards:read` scope and is only available for **Enterprise plans**
* New [Availability APIs](https://developer.monday.com/api-reference/reference/availability) to manage work schedules, company time off, resource assignments, and personal time off (PTO). Includes `work_schedules`, `time_offs`, `resources_availability`, `account_availability_defaults`, and `user_pto` queries plus matching create, update, delete, assign, and unassign mutations. See the [Availability](https://developer.monday.com/api-reference/reference/availability) reference

## `2026-07`

### Breaking changes

These changes typically cause **GraphQL validation or execution errors** when an integration has not been updated (wrong arguments, invalid input, or over-limit).

* The `User` type and `Query.users` are overhauled in `2026-07` with new fields, types, enums, query arguments, and enforced pagination. See the [User entity migration guide](https://developer.monday.com/api-reference/docs/migrating-user-entity-to-2026-10) for full details and code examples.
  * `Query.users` `emails` argument: element type is now non-null (`[String!]`). Requests that include `null` inside the `emails` array fail validation
  * `Query.users` `limit`: values above **1000** are rejected with an error (maximum `limit` is 1000)
* `connection_board_ids` query: the argument was renamed from `connectionId` to `connection_id` (snake\_case) and is now required (`ID!`). The return type also changed from `[Int!]` to `[ID!]!`. Update your calls to use `connection_id` before migrating. See [Connect Boards column](https://developer.monday.com/api-reference/reference/connect#get-connected-board-ids)
* `Board.columns`: the `capabilities` argument no longer has a default value. Callers that previously relied on the implicit default must now pass the argument explicitly

### Non-breaking changes

* New [`search.workspaces`](https://developer.monday.com/api-reference/reference/search#searchworkspaces-arguments) field on the `SearchNamespace` — search for workspaces by name, kind, and description. Returns [`SearchWorkspaceResults`](https://developer.monday.com/api-reference/reference/search-other-types#searchworkspaceresults) with indexed data and optional live data resolution
* New [`job_status`](https://developer.monday.com/api-reference/reference/ingest-items-api-reference#job_status-query) query — polls a general-purpose async job by external ID; returns [`AsyncJobStatus`](https://developer.monday.com/api-reference/reference/bulk-import-other-types#asyncjobstatus)
* New `cross_product_collaborative` argument on [`set_board_permission`](https://developer.monday.com/api-reference/reference/boards#set-board-permission) mutation — enables cross-product collaboration permissions when set to `true`
* **Developer Tools:**
  * New `mcli` GraphQL CLI — a single-binary command-line interface for monday.com's GraphQL API with JSON output, semantic business-layer operations, webhook support, and LLM-native design. See the [mcli CLI guide](https://developer.monday.com/api-reference/docs/mcli-cli-guide).
* **Portfolio:**
  * New `callback_url` argument on [`create_portfolio`](https://developer.monday.com/api-reference/reference/portfolio#create-portfolio) mutation — pass an HTTPS URL to receive the new `portfolio_id` asynchronously; the mutation returns immediately with a `process_id`, and monday.com POSTs `{ is_success, process_id, portfolio_id }` to your endpoint when the portfolio board is created
  * New `process_id` field on `CreatePortfolioResult` type — returned when using `callback_url`; use for correlating async operations with completion callbacks
* **Workforms:**
  * New `HOUR`, `DISPLAY_TEXT`, and `PAGE_BLOCK` values on [`FormQuestionType`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestiontype) enum
  * New optional fields on [`CreateQuestionInput`](https://developer.monday.com/api-reference/reference/forms-other-types#createquestioninput): `show_if_rules`, `existing_column_id`, `insert_after_question_id`, `page_block_id`
  * New `ai_translate` field on `FormFeaturesInput`, `allow_create_item` on `FormMondayInput`, `type` on `FormLayoutInput`, `is_anonymous` on `UpdateFormSettingsInput`, `label_limit_count_enabled` and `default_answer` on `FormQuestionSettingsInput`, `value` and `visible` on `QuestionOptionInput`, `show_if_rules` and `options` on `UpdateQuestionInput`, `page_block_id` on `QuestionOrderInput`
  * New `show_if_rules` field on `FormQuestion` (the camelCase alias `showIfRules` is removed in `2026-10`)
* New [`create_validation_rule`](https://developer.monday.com/api-reference/reference/validations#create-validation-rule), [`update_validation_rule`](https://developer.monday.com/api-reference/reference/validations#update-validation-rule), and [`delete_validation_rule`](https://developer.monday.com/api-reference/reference/validations#delete-validation-rule) mutations for board validation rules (see [Validation rules guide](https://developer.monday.com/api-reference/docs/validation-rules-guide))
* New [`create_doc_blocks`](https://developer.monday.com/api-reference/docs/blocks#create-doc-blocks) mutation with structured `CreateBlockInput` for rich document blocks (see [Document blocks V2](https://developer.monday.com/api-reference/reference/document-blocks-v2))
* New [`inferred_metadata`](https://developer.monday.com/api-reference/docs/boards#fields) and [`manual_metadata`](https://developer.monday.com/api-reference/docs/boards#fields) fields on the `Board` type
* The `User` type and `Query.users` gain new fields, types, enums, input types, and arguments. Several legacy fields and arguments are deprecated (scheduled for removal in `2026-10`), and a few scalar types change behavior silently. See the [User entity migration guide](https://developer.monday.com/api-reference/docs/migrating-user-entity-to-2026-10) for full details and code examples.
  * New [`activity_logs`](https://developer.monday.com/api-reference/changelog/new-user-activity-logs) field on the `User` type for querying user-scoped activity log events with cursor-based pagination
  * New fields on the [`User`](https://developer.monday.com/api-reference/reference/users#fields) type: `account_id`, `status`, `invitation_method`, `serial_number`, `is_deleted`, `photo_url`, `became_active_at`, `bb_visitor_id`, `is_email_confirmed`, and `user_config`
  * New [`user_configs`](https://developer.monday.com/api-reference/reference/users#get-user-configs) query to retrieve per-kind user configuration for the account
  * New [`PhotoUrl`](https://developer.monday.com/api-reference/reference/users-other-types#photourl) and [`UserConfig`](https://developer.monday.com/api-reference/reference/users-other-types#userconfig) types on `User`
  * New [`UserStatus`](https://developer.monday.com/api-reference/reference/users-other-types#userstatus), [`InvitationMethod`](https://developer.monday.com/api-reference/reference/users-other-types#invitationmethod), [`UserKindFilter`](https://developer.monday.com/api-reference/reference/users-other-types#userkindfilter), [`UsersSortField`](https://developer.monday.com/api-reference/reference/users-other-types#userssortfield), and [`UsersSortDirection`](https://developer.monday.com/api-reference/reference/users-other-types#userssortdirection) enums
  * New [`UserKindFilterInput`](https://developer.monday.com/api-reference/reference/users-other-types#userkindfilterinput) and [`UsersSortInput`](https://developer.monday.com/api-reference/reference/users-other-types#userssortinput) input types
  * New [`user_kind`](https://developer.monday.com/api-reference/reference/users#arguments), [`sort`](https://developer.monday.com/api-reference/reference/users#arguments), [`status`](https://developer.monday.com/api-reference/reference/users#arguments), and [`visibility`](https://developer.monday.com/api-reference/reference/users#arguments) arguments on `Query.users`
  * The `kind`, `newest_first`, and `non_active` arguments on `Query.users` are deprecated; no removal is scheduled yet. Use `user_kind`, `sort`, and `status` instead
  * The following `User` fields are deprecated and scheduled for removal in `2026-10`: `photo_original`, `photo_thumb`, `photo_thumb_small`, `photo_tiny`, `photo_small`, `is_guest`, `is_admin`, `is_view_only`, `is_pending`, `enabled`, `is_verified`, `join_date`, `encrypt_api_token`, and `sign_up_product_kind`
  * **Dangerous change:** `Query.users` without `limit` now returns only **200** users by default (previously unbounded). Jobs that relied on one call returning the full account roster will silently under-fetch — use explicit `limit` and `page`
  * **Dangerous change:** `User.created_at` scalar type changed from `Date` to `ISO8601DateTime!` (includes a time component; non-null in the schema). Clients that treat the value as date-only may mis-parse or drop information
  * **Dangerous change:** `User.birthday` type changed from `Date` to `String` (no longer a dedicated `Date` scalar)
  * **Dangerous change:** `User.utc_hours_diff` type changed from `Int` to `Float` (fractional hour offsets are possible). Logic that assumes an integer may produce incorrect results even though the query succeeds

## `2026-04`

### Breaking changes

* The `value_string`, `value_int`, `value_float`, and `value_boolean` fields on `AggregateGroupByResult` have been [replaced by a unified `value` field of type `JSON`](https://developer.monday.com/api-reference/changelog/aggregategroupbyresult-typed-value-fields-replaced-with-unified-value-field)

### Non-breaking changes

* New `create_project` [mutation](https://developer.monday.com/api-reference/changelog/new-create_project-mutation)
* New `set_item_description_content` [mutation](https://developer.monday.com/api-reference/changelog/new-set_item_description_content-mutation)
* New `create_marketplace_app_discount` [mutation](https://developer.monday.com/api-reference/changelog/new-create_marketplace_app_discount-mutation)
* New [feature-level lifecycle event subscriptions](https://developer.monday.com/api-reference/changelog/new-feature-level-lifecycle-event-subscriptions-apis) APIs
* New APIs to [manage departments](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-departments)
* New ability to [update an item's nickname](https://developer.monday.com/api-reference/changelog/new-ability-to-update-an-items-nickname)
* New `search` [query](https://developer.monday.com/api-reference/reference/search) for cross-entity search across items, boards, and documents
* New `articles` [query and mutations](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-knowledge-base-articles) for Knowledge Base article CRUD and publishing
* New `article_blocks` [query](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-knowledge-base-articles) for paginated article content blocks
* New `knowledge_base_search` [query](https://developer.monday.com/api-reference/changelog/new-knowledge_base_search-query) for AI-powered knowledge base search
* New `doc_version_history` [query](https://developer.monday.com/api-reference/changelog/new-document-version-history-apis) to retrieve document version snapshots
* New `doc_version_diff` [query](https://developer.monday.com/api-reference/changelog/new-document-version-history-apis) to compare document versions
* New `notetaker` [query namespace](https://developer.monday.com/api-reference/changelog/new-notetaker-meetings-api) for meeting recordings, transcripts, summaries, and action items
* New `object_relations` [query and mutations](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-object-relations) for managing relations (aliases and dependencies) between objects
* New `relations` [argument](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-object-relations) on `create_object` mutation
* New `relations` [field](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-object-relations) on `Object` type
* New `allowed_sequences_to_enroll` query and `enroll_items_to_sequence` mutation for [email sequences](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-email-sequences)
* New `tool_events` query for MCP tool execution events in automations
* New `ask_developer_docs` [query](https://developer.monday.com/api-reference/changelog/new-ask_developer_docs-query) for AI-powered developer documentation answers
* New `prompt` [argument](https://developer.monday.com/api-reference/reference/boards#create-board) on `create_board` mutation to generate board structure via AI
* New `query_params` [argument](https://developer.monday.com/api-reference/changelog/new-query_params-filter-on-workspaces-query) on `workspaces` query to filter by account product kind
* New `created_from_board_id` and `folder` [fields](https://developer.monday.com/api-reference/changelog/new-fields-on-the-board-type) on `Board` type
* New `department` [field](https://developer.monday.com/api-reference/changelog/new-apis-to-manage-departments) on `User` type
* New `attribution_entity_ref` and `attribution_entity_type` [fields](https://developer.monday.com/api-reference/changelog/new-ai-agent-attribution-on-reactions-and-assignees) on `Like` type for reaction attribution
* New `app_feature_slug` [field](https://developer.monday.com/api-reference/changelog/new-fields-on-folder-and-appfeaturetype) on `Folder` type
* New `APP_FEATURE` and `LISTVIEW` [values](https://developer.monday.com/api-reference/changelog/new-dashboard-widget-types-app_feature-and-listview) on `ExternalWidget` enum

## `2026-01`

### Non-breaking changes

* New [`aggregate`](https://developer.monday.com/api-reference/changelog/new-aggregate-object) object
* New [`max_units`](https://developer.monday.com/api-reference/changelog/new-max_units-field#/) field
* New [`updated_at`](https://developer.monday.com/api-reference/changelog/new-updated_at-field#/) field
* New [`width`](https://developer.monday.com/api-reference/changelog/new-width-argument-on-update_column-mutation#/) argument on `update_column` mutation
* New [`created_at`](https://developer.monday.com/api-reference/changelog/new-created_at-field-on-account#/) field on `account`
* New [`membership_kind`](https://developer.monday.com/api-reference/changelog/new-membership_kind-argument-on-workspaces#/versions) argument on `workspaces`
* New [`is_trial_expired` and `is_during_trial`](https://developer.monday.com/api-reference/changelog/new-is_trial_expired-and-is_during_trial-fields-on-account) fields on `account`
* New [mutations](https://developer.monday.com/api-reference/changelog/new-mutations-to-create-status-and-dropdown-columns-attached-to-managed-columns) to create status and dropdown columns attached to managed columns
* New [Resource Directory APIs](https://developer.monday.com/api-reference/changelog/new-resource-directory-apis)
* New [`tier`](https://developer.monday.com/api-reference/changelog/new-tier-field-available-on-account-products-queries) field available on account `products` queries

## `2025-10`

### Breaking changes

* Updated [complexity error format](https://developer.monday.com/api-reference/changelog/updated-complexity-error-format)

### Non-breaking changes

* New [`update_doc_name`](https://developer.monday.com/api-reference/changelog/new-update_doc_name-mutation) mutation
* New [`duplicate_doc`](https://developer.monday.com/api-reference/changelog/new-duplicate_doc-mutation) mutation
* New [`delete_doc`](https://developer.monday.com/api-reference/changelog/new-delete_doc-mutation) mutation
* New [`change_item_position`](https://developer.monday.com/api-reference/changelog/new-change_item_position-mutation) mutation
* New ability to [change a workspace's account product](https://developer.monday.com/api-reference/changelog/new-ability-to-change-a-workspaces-account-product)
* New [`set_board_permissions`](https://developer.monday.com/api-reference/changelog/new-set_board_permissions-mutation) mutation
* New [`update_board_hierarchy`](https://developer.monday.com/api-reference/changelog/new-update_board_hierarchy-mutation) mutation
* New [`update_folder`](https://developer.monday.com/api-reference/changelog/new-update_folder-mutation-arguments) mutation arguments
* New [`views`](https://developer.monday.com/api-reference/changelog/new-views-fields) fields
* New [`replies`](https://developer.monday.com/api-reference/changelog/new-replies-arguments) arguments
* New [`create_update`](https://developer.monday.com/api-reference/changelog/new-create_update-arguments) arguments
* Filter for [board level updates](https://developer.monday.com/api-reference/changelog/filter-for-board-level-updates-in-the-updates-field) in the `updates` field
* New [`create_portfolio`](https://developer.monday.com/api-reference/changelog/new-create_portfolio-mutation) mutation
* New ability to read [Workforms](https://developer.monday.com/api-reference/changelog/new-ability-to-read-workforms)
* New [`connect_project_to_portfolio`](https://developer.monday.com/api-reference/changelog/new-connect_project_to_portfolio-mutation) mutation
* New ability to [create, update, and delete Workforms](https://developer.monday.com/api-reference/changelog/new-ability-to-create-update-and-delete-workforms)
* New mutations to create, update, and delete dashboards
* New [`mute_board_settings`](https://developer.monday.com/api-reference/changelog/new-mute_board_settings-object) object
* New [CRUD capabilities](https://developer.monday.com/api-reference/changelog/new-crud-capabilities-for-managing-favorites) for managing favorites
* New [`create_widget`](https://developer.monday.com/api-reference/changelog/new-create_widget-mutation) mutation
* New [`convert_board_to_project`](https://developer.monday.com/api-reference/changelog/new-convert_board_to_project-mutation) mutation
* Improved [API complexity calculation](https://developer.monday.com/api-reference/changelog/improved-api-complexity-calculation)
* New mutations to [create, update, and delete board views](https://developer.monday.com/api-reference/changelog/new-mutations-to-create-update-and-delete-board-views)
* New [`add_content_to_doc_from_markdown`](https://developer.monday.com/api-reference/changelog/new-add_content_to_doc_from_markdown-mutation) mutation
* New [`import_doc_from_html`](https://developer.monday.com/api-reference/changelog/new-import_doc_from_html-mutation) mutation
* New [`get_column_type_schema`](https://developer.monday.com/api-reference/changelog/new-get_column_type_schema-object) object
* New ability to [create mirror and connect board columns](https://developer.monday.com/api-reference/changelog/new-ability-to-create-mirror-and-connect-board-columns)
* New [`update_mute_board_settings`](https://developer.monday.com/api-reference/changelog/new-update_mute_board_settings-mutation) mutation
* New [`notifications_settings`](https://developer.monday.com/api-reference/changelog/new-notifications_settings-object) object
* New ability to [create, read, update, and delete monday.com objects](https://developer.monday.com/api-reference/changelog/new-ability-to-create-read-update-and-delete-mondaycom-objects)
* New mutations to create and update app features
* New ability to [create, read, and delete required field columns](https://developer.monday.com/api-reference/changelog/new-ability-to-create-read-and-delete-required-field-columns)
* New [`columns`](https://developer.monday.com/api-reference/changelog/new-columns-fields) fields
* New API support for [multi-level boards](https://developer.monday.com/api-reference/changelog/new-api-support-for-multi-level-boards)
* New [`update_column`](https://developer.monday.com/api-reference/changelog/new-update_column-mutation) mutation
* New [`delete_widget`](https://developer.monday.com/api-reference/reference/dashboards-and-widgets#delete-widget) mutation
* New [`app`](https://developer.monday.com/api-reference/changelog/new-app-fields) fields
* New mutations to [create and update apps](https://developer.monday.com/api-reference/changelog/new-mutations-to-create-and-update-apps)
* New mutations to [create status and dropdown columns](https://developer.monday.com/api-reference/changelog/new-mutations-to-create-status-and-dropdown-columns)
* New [`item_nickname`](https://developer.monday.com/api-reference/changelog/new-item_nickname-argument-on-create_board-mutation) argument on `create_board` mutation
* New mutations to [update dropdown and status columns](https://developer.monday.com/api-reference/changelog/new-mutations-to-update-dropdown-and-status-columns)
* New [`export_markdown_from_doc`](https://developer.monday.com/api-reference/changelog/new-export_markdown_from_doc-object) object
* Deprecating [`settings_str`](https://developer.monday.com/api-reference/changelog/deprecating-settings_str-field-on-columns) field on `columns`

***

## `2025-07`

### Hotfixes

* **April 28th, 2025:** For column value exception errors, the `column_type` property no longer returns "Column" appended to the column type. Read more [about the column value exception error change](https://developer.monday.com/api-reference/changelog/bug-fix-column-value-exception-error-column_type-update).
* **May 19th, 2025:** All API responses now contain a unique request ID. Read more [about unique request IDs](https://developer.monday.com/api-reference/changelog/all-api-responses-now-contain-a-unique-request-id).

### Breaking changes

* Updated [complexity budget exhausted error](https://developer.monday.com/api-reference/changelog/breaking-change-updated-complexity-budget-exhausted-error)
* Updated [unauthorized user error code](https://developer.monday.com/api-reference/changelog/breaking-change-updated-user-unauthorized-error-code)

### Non-breaking changes

* New argument to create [empty boards](https://developer.monday.com/api-reference/changelog/new-argument-to-create-empty-boards)
* New argument to specify product for [workspace creation](https://developer.monday.com/api-reference/changelog/new-argument-to-specify-product-for-workspace-creation)
* New [field](https://developer.monday.com/api-reference/changelog/new-field-to-retrieve-assets-on-reply-object) to retrieve assets on `Reply` object
* New [item description](https://developer.monday.com/api-reference/changelog/new-item-description-field) field
* New [CRUD capabilities](https://developer.monday.com/api-reference/changelog/new-crud-capabilities-for-managed-columns) for managed columns
* New [`mentions_list`](https://developer.monday.com/api-reference/changelog/new-mentions_list-argument-in-create_update-mutations) argument in `create_update` mutations
* New [arguments](https://developer.monday.com/api-reference/changelog/new-arguments-to-filter-updates-by-date) to filter `updates` by date
* New [fields](https://developer.monday.com/api-reference/changelog/new-fields-for-boards-queries) for `boards` queries
* New [`access_level`](https://developer.monday.com/api-reference/changelog/new-access_level-field-on-views-queries) field for board view queries
* New ability to read [audit logs](https://developer.monday.com/api-reference/changelog/new-ability-to-read-audit-logs-via-the-api) via the API
* New [`audit_event_catalogue`](https://developer.monday.com/api-reference/changelog/new-audit_event_catalogue-object-to-retrieve-a-list-of-supported-audit-log-events) object to retrieve a list of supported audit log events

***

## `2025-04`

### Hotfixes

* **February 18th, 2025**: The complexity budget exhausted error format has changed. Read more [about the updated complexity budget exhausted error](https://developer.monday.com/api-reference/changelog/hotfix-updated-complexity-budget-exhausted-error).
* **February 24th, 2025**: The `create_webhook` mutation now returns descriptive errors. Read more [about descriptive create\_webhook errors](https://developer.monday.com/api-reference/changelog/hotfix-updated-create_webhook-errors).
* **February 24th, 2025**: The `renewal_date` field is no longer required when querying app subscription details. Read more [about the renewal\_date field change](https://developer.monday.com/api-reference/changelog/hotfix-renewal_date-field-type-change-on-app-subscriptions-details-object).
* **February 27th, 2025:** We've introduced changes to the `subitems` query to help increase performance and return consistent results. Read more [about the subitems query changes](https://developer.monday.com/api-reference/changelog/hotfix-changes-to-subitems-queries).
* **April 28th, 2025:** For column value exception errors, the `column_type` property no longer returns "Column" appended to the column type. Read more [about the column value exception error change](https://developer.monday.com/api-reference/changelog/bug-fix-column-value-exception-error-column_type-update).
* **May 19th, 2025:** All API responses now contain a unique request ID. Read more [about unique request IDs](https://developer.monday.com/api-reference/changelog/all-api-responses-now-contain-a-unique-request-id).

### Breaking changes

* Deprecated: Sending variables as a [JSON string](https://developer.monday.com/api-reference/changelog/deprecated-sending-variables-as-a-json-string)
* Value field now [returns null](https://developer.monday.com/api-reference/changelog/value-field-now-returns-null-on-connect-boards-dependency-and-subtasks-columns) on connect boards, dependency, and subtasks columns

### Non-breaking changes

* New [`page_break`](https://developer.monday.com/api-reference/changelog/new-page_break-type-on-create_doc_block-mutation) type on `create_doc_block` mutation
* New [`invite_users`](https://developer.monday.com/api-reference/changelog/new-invite_users-mutation) mutation
* New [`end_date`](https://developer.monday.com/api-reference/changelog/new-end_date-field-on-app-subscription-details-object) field on app subscription details object
* New [update user attributes](https://developer.monday.com/api-reference/changelog/new-update-user-attributes-mutation) mutation
* New [max\_units](https://developer.monday.com/api-reference/changelog/new-max_units-field-on-app-subscription-queries) field on app subscription queries
* New [max\_units](https://developer.monday.com/api-reference/changelog/new-max_units-argument-on-set-mock-app-subscription-mutations) argument on set mock app subscription mutations
* New ability to query user profile [custom fields](https://developer.monday.com/api-reference/changelog/new-ability-to-query-user-profile-custom-fields)
* New [`account_roles`](https://developer.monday.com/api-reference/changelog/new-account_roles-object) object
* New ability to [update a user's custom role](https://developer.monday.com/api-reference/changelog/new-ability-to-update-a-users-custom-role)
* New [`platform_api`](https://developer.monday.com/api-reference/changelog/new-platform_api-object-to-query-daily-api-usage) object to query daily API usage
* New [object](https://developer.monday.com/api-reference/changelog/new-object-to-query-app-data) to query app data

***

# Deprecated versions

This section covers API versions that are deprecated and no longer supported. They are documented here for historical and migration reference only. Review our API versioning policy for upcoming deprecation timelines.

## `2025-01`

### Hotfixes

* **February 18th, 2025**: The complexity budget exhausted error format has changed. Read more [about the updated complexity budget exhausted error](https://developer.monday.com/api-reference/changelog/hotfix-updated-complexity-budget-exhausted-error).
* **February 24th, 2025**: The `create_webhook` mutation now returns descriptive errors. Read more [about descriptive create\_webhook errors](https://developer.monday.com/api-reference/changelog/hotfix-updated-create_webhook-errors).
* **February 24th, 2025**: The `renewal_date` field is no longer required when querying app subscription details. Read more [about the renewal\_date field change](https://developer.monday.com/api-reference/changelog/hotfix-renewal_date-field-type-change-on-app-subscriptions-details-object).
* **February 27th, 2025:** We've introduced changes to the `subitems` query to help increase performance and return consistent results. Read more [about the subitems query changes](https://developer.monday.com/api-reference/changelog/hotfix-changes-to-subitems-queries).
* **April 28th, 2025:** For column value exception errors, the `column_type` property no longer returns "Column" appended to the column type. Read more [about the column value exception error change](https://developer.monday.com/api-reference/changelog/bug-fix-column-value-exception-error-column_type-update).
* **May 19th, 2025:** All API responses now contain a unique request ID. Read more [about unique request IDs](https://developer.monday.com/api-reference/changelog/all-api-responses-now-contain-a-unique-request-id).

### Breaking changes

* New [unified error responses](https://developer.monday.com/api-reference/changelog/breaking-change-consistent-error-format) that comply with the GraphQL standard
* More spec-compliant [GraphQL query validation](https://developer.monday.com/api-reference/changelog/upgrading-graphql-query-validation-to-be-more-compliant)
* [Column validation](https://developer.monday.com/api-reference/changelog/column-validation-for-apps) for apps
* [Account ID](https://developer.monday.com/api-reference/changelog/account-id-no-longer-returned-by-default) no longer returned by default
* New [pagination limit](https://developer.monday.com/api-reference/changelog/new-pagination-limit-for-updates-queries) for `updates` queries
* GraphQL queries now [required in request body](https://developer.monday.com/api-reference/changelog/graphql-queries-now-required-in-request-body)

### Non-breaking changes

* New [create and delete team](https://developer.monday.com/api-reference/changelog/new-create-and-delete-teams-mutations) mutations
* New [`app_subscriptions`](https://developer.monday.com/api-reference/changelog/new-app_subscriptions-object) object
* New [`updates`](https://developer.monday.com/api-reference/changelog/new-updates-queries-fields) fields
* New ability to [read the formula column](https://developer.monday.com/api-reference/changelog/new-ability-to-read-the-formula-column)
* New [`deactivate_users`](https://developer.monday.com/api-reference/changelog/new-deactivate_users-mutation) mutation
* New [`update_users_role`](https://developer.monday.com/api-reference/changelog/new-update_users_role-mutation) mutation
* New [`assign_team_owners`](https://developer.monday.com/api-reference/changelog/new-assign_team_owners-mutation) mutation
* New [`remove_team_owners`](https://developer.monday.com/api-reference/changelog/new-remove_team_owners-mutation) mutation
* New [`update_email_domain`](https://developer.monday.com/api-reference/changelog/new-update_email_domain-mutation) mutation
* New [`timeline`](https://developer.monday.com/api-reference/changelog/new-timeline-object) object
* New [`activate_users`](https://developer.monday.com/api-reference/changelog/new-activate_users-mutation) mutation
* New [`timeline_item`](https://developer.monday.com/api-reference/changelog/new-timeline_item-fields) fields

***

## `2024-10`

### Hotfixes

* **October 22nd, 2024**: The `item_id` argument on the `pin_to_top` and `unpin_from_top` mutations has changed from type `Int` to `ID` and is no longer required. Read more [about the item\_id argument change](https://developer.monday.com/api-reference/changelog/hotfix-item_id-argument-changed-on-pin_to_top-and-unpin_from_top-mutations).
* **November 6th, 2024**: We made version `2024-10`backward compatible to resolve parsing errors. Read more [about the GraphQL parsing error fix](https://developer.monday.com/api-reference/changelog/hot-fix-errors-with-graphql-parsing).
* **November 19th, 2024**: Updates should be returned in reverse chronological order instead of chronological order. Read more [about update ordering](https://developer.monday.com/api-reference/changelog/hotfix-updates-returned-in-reverse-chronological-order).
* **February 24th, 2025**: The `create_webhook` mutation now returns descriptive errors. Read more [about descriptive create\_webhook errors](https://developer.monday.com/api-reference/changelog/hotfix-updated-create_webhook-errors).
* **February 27th, 2025:** We've introduced changes to the `subitems` query to help increase performance and return consistent results. Read more [about the subitems query changes](https://developer.monday.com/api-reference/changelog/hotfix-changes-to-subitems-queries).
* **April 28th, 2025:** For column value exception errors, the `column_type` property no longer returns "Column" appended to the column type. Read more [about the column value exception error change](https://developer.monday.com/api-reference/changelog/bug-fix-column-value-exception-error-column_type-update).
* **May 19th, 2025:** All API responses now contain a unique request ID. Read more [about unique request IDs](https://developer.monday.com/api-reference/changelog/all-api-responses-now-contain-a-unique-request-id).

### Non-breaking changes

* New [`marketplace_app_discounts`](https://developer.monday.com/api-reference/changelog/new-marketplace_app_discounts-object) object
* New [`grant_marketplace_app_discounts` and `delete_marketplace_app_discounts`](https://developer.monday.com/api-reference/changelog/new-mutations-to-grant-and-delete-discounts) mutations
* New [`errors`](https://developer.monday.com/api-reference/changelog/new-errors-object-in-api-errors) object in API errors
* New descriptive [field limit exceeded](https://developer.monday.com/api-reference/changelog/new-descriptive-field-limit-exceeded-error) error
* New descriptive [JSON parse](https://developer.monday.com/api-reference/changelog/new-descriptive-json-parse-error) error
* New Emails & Activities [`timeline_items`](https://developer.monday.com/api-reference/changelog/new-timeline-items-query-and-mutations) object
* New Emails & Activities [`custom_activity`](https://developer.monday.com/api-reference/changelog/new-custom-activity-object) object
* New [`updates`](https://developer.monday.com/api-reference/changelog/new-updates-object-queries-and-mutations) object queries and mutations
* New [`team_owners` and `team_subscribers`](https://developer.monday.com/api-reference/changelog/new-team_owners-and-team_subscribers-fields-on-boards-queries) fields on `boards` queries

***

## `2024-07`

### Hotfixes

* **April 1st, 2024**: You can now filter the date column with multiple exact dates. Check out the full announcement [about multiple-date column filtering](https://developer.monday.com/api-reference/changelog/date-column-filtering-with-multiple-exact-dates).
* **May 1st, 2024**: Changes to the `ComplexityException` error structure and error code were reverted. Read more [about the ComplexityException error rollback](https://developer.monday.com/api-reference/changelog/bug-fix-changes-to-complexityexception-error-reverted).
* **May 9th, 2024**: The addition of the `data` object to error codes has been rolled back until version `2025-01`. Read more [about the data object rollback](https://developer.monday.com/api-reference/changelog/rollback-data-object-in-error-codes).
* **May 14th, 2024**: Changes to the `ComplexityException` error message were reverted. Read more [about reverted ComplexityException error messages](https://developer.monday.com/api-reference/changelog/hotfix-complexity-exception-errors).
* **June 19th, 2024**: New descriptive JSON parse error added to all API versions. Read more [about descriptive JSON parse errors](https://developer.monday.com/api-reference/changelog/new-descriptive-json-parse-error).
* **June 20th, 2024**: You can now use the `add_teams_to_board` mutation to subscribe everyone in an account to a board. Check out the full announcement [about subscribing everyone on a team to a board](https://developer.monday.com/api-reference/changelog/bug-fix-subscribe-everyone-on-a-team-to-a-board).

### Non-breaking changes

* New [`active_members_count`](https://developer.monday.com/api-reference/changelog/new-active_members_count-field-on-account-queries) field on `account` queries
* New [`apps_monetization_info`](https://developer.monday.com/api-reference/changelog/new-apps_monetization_info-object) object

## `2024-04`

### Hotfixes

* **March 26th, 2024**: Mutations with the `column_values` argument now accept both string and integer IDs. Check out the full announcement [about string and integer column values](https://developer.monday.com/api-reference/changelog/column-values-argument-now-accepts-string-values).
* **April 1st, 2024**: You can now filter the date column with multiple exact dates. Check out the full announcement [about multiple-date column filtering](https://developer.monday.com/api-reference/changelog/date-column-filtering-with-multiple-exact-dates).
* **May 1st, 2024**: Changes to the `ComplexityException` error structure, error code, and error message were reverted. Read more [about the reverted ComplexityException changes](https://developer.monday.com/api-reference/changelog/bug-fix-changes-to-complexityexception-error-reverted).
* **May 14th, 2024**: Changes to the `ComplexityException` error message were reverted. Read more [about reverted ComplexityException error messages](https://developer.monday.com/api-reference/changelog/hotfix-complexity-exception-errors).
* **June 19th, 2024**: New descriptive JSON parse error added to all API versions. Read more [about descriptive JSON parse errors](https://developer.monday.com/api-reference/changelog/new-descriptive-json-parse-error).
* **June 20th, 2024**: You can now use the `add_teams_to_board` mutation to subscribe everyone in an account to a board. Check out the full announcement [about subscribing everyone on a team to a board](https://developer.monday.com/api-reference/changelog/bug-fix-subscribe-everyone-on-a-team-to-a-board).

### Breaking changes

* New [`kind`](https://developer.monday.com/api-reference/changelog/new-kind-field-enum-values-on-version-and-versions-queries) field accepted enum values on `version` and `versions` queries
* Updated [field types](https://developer.monday.com/api-reference/changelog/breaking-changes-updates-to-app-installs-queries) on `app_installs` queries

### Non-breaking changes

* New [`voters`](https://developer.monday.com/api-reference/changelog/new-voters-field-on-votevalue) field on `VoteValue`
* New [`url`](https://developer.monday.com/api-reference/changelog/new-url-field-on-boards-and-items) field on `boards` and `items` queries
* New `group_color` argument for `create_group` mutation
* New [`display_value`](https://developer.monday.com/api-reference/changelog/new-field-on-version-and-versions-queries) field on `version` and `versions` queries
* New [`account_id` argument and `permissions` field](https://developer.monday.com/api-reference/changelog/new-field-and-argument-on-app_installs-queries) on `app_installs` queries
* New [`position_relative_method` and `relative_to` arguments](https://developer.monday.com/api-reference/changelog/new-create_item-mutation-arguments) on `create_item` mutation
* New [`is_default_workspace`](https://developer.monday.com/api-reference/changelog/new-is_default_workspace-field) field on `workspaces` queries
* New [date column filtering](https://developer.monday.com/api-reference/changelog/date-column-filtering-with-multiple-exact-dates) with multiple exact dates
* [Create a doc column](https://developer.monday.com/api-reference/changelog/new-create-a-doc-column-mutation) using the `create_column` mutation
* New [`app_subscription_operations`](https://developer.monday.com/api-reference/changelog/new-app_subscription_operations-query-and-mutation) queries and mutations

## `2024-01`

### Hotfixes

* **March 26th, 2024**: Mutations with the `column_values` argument now accept both string and integer IDs. Check out the full announcement [about string and integer column values](https://developer.monday.com/api-reference/changelog/column-values-argument-now-accepts-string-values).
* **May 1st, 2024**: Changes to the `ComplexityException` error structure, error code, and error message were reverted. Read more [about the reverted ComplexityException changes](https://developer.monday.com/api-reference/changelog/bug-fix-changes-to-complexityexception-error-reverted).
* **May 14th, 2024**: Changes to the `ComplexityException` error message were reverted. Read more [about reverted ComplexityException error messages](https://developer.monday.com/api-reference/changelog/hotfix-complexity-exception-errors).
* **June 19th, 2024**: New descriptive JSON parse error added to all API versions. Read more [about descriptive JSON parse errors](https://developer.monday.com/api-reference/changelog/new-descriptive-json-parse-error).
* **June 20th, 2024**: You can now use the `add_teams_to_board` mutation to subscribe everyone in an account to a board. Check out the full announcement [about subscribing everyone on a team to a board](https://developer.monday.com/api-reference/changelog/bug-fix-subscribe-everyone-on-a-team-to-a-board).

### Breaking changes

* Typo fix in the [`UserUnauthorizedException`](https://developer.monday.com/api-reference/changelog/typo-fix-in-the-userunauthorizedexception-error-code) error code
* New [`DeleteLastGroupException`](https://developer.monday.com/api-reference/changelog/new-deletelastgroupexception-error) error

### Non-breaking changes

* New [`app_installs`](https://developer.monday.com/api-reference/docs/app-installs) object to retrieve app installation data
* New [`pricing_version`](https://developer.monday.com/api-reference/changelog/new-pricing_version-field-on-app-subscription-queries) field on app subscription queries
* New [`team_owners_subscribers`](https://developer.monday.com/api-reference/changelog/new-team_owners_subscribers-field-on-workspaces-queries) field on workspaces queries
* New [`delete_teams_from_board`](https://developer.monday.com/api-reference/changelog/new-delete_teams_from_board-mutation) mutation
* New [`kind`](https://developer.monday.com/api-reference/changelog/new-kind-argument-on-add_teams_to_board-mutation) argument on `add_teams_to_board`
* New [`add_users_to_team` and `remove_users_from_team`](https://developer.monday.com/api-reference/changelog/new-mutations-to-add-or-remove-users-from-a-team) mutations
* New [`update_workspace`](https://developer.monday.com/api-reference/docs/workspaces#update-a-workspace) mutation

## `2023-10`

### Hotfixes

* **December 3rd, 2023:** We aligned the empty value results for the `text` field when querying through `column_values` V2 to the behavior seen in version `2023-07`.  Check out the full announcement [about aligned empty text-field results](https://developer.monday.com/api-reference/changelog/2023-10-hotfix-aligning-empty-column-value-results-for-text-field).
* **March 26th, 2024**: Mutations with the `column_values` argument now accept both string and integer IDs. Check out the full announcement [about string and integer column values](https://developer.monday.com/api-reference/changelog/column-values-argument-now-accepts-string-values).
* **June 19th, 2024**: New descriptive JSON parse error added to all API versions. Read more [about descriptive JSON parse errors](https://developer.monday.com/api-reference/changelog/new-descriptive-json-parse-error).
* **June 20th, 2024**: You can now use the `add_teams_to_board` mutation to subscribe everyone in an account to a board. Check out the full announcement [about subscribing everyone on a team to a board](https://developer.monday.com/api-reference/changelog/bug-fix-subscribe-everyone-on-a-team-to-a-board).

### Breaking changes

* Removed the deprecated [`items`](https://developer.monday.com/api-reference/changelog/removing-the-deprecated-items-field-on-boards-queries-replace-with-items-page) field on `boards` queries, replaced it with `items_page`

* Removed the deprecated [`items`](https://developer.monday.com/api-reference/changelog/breaking-change-removed-the-deprecated-items-field-on-groups-queries-replaced-with-items_page) field on `groups` queries, replaced it with `items_page`

* New [column values](https://developer.monday.com/api-reference/changelog/new-column-values-fields-and-typed-column-values) fields and typed column values

* Removed the deprecated [`items_by_column_values` and `items_by_multiple_column_values`](https://developer.monday.com/api-reference/changelog/deprecating-items_by_column_values-and-items_by_multiple_column_values) objects, replaced them with `items_page_by_column_values`

* The [`column_type`](https://developer.monday.com/api-reference/changelog/required-column_type-argument-for-create_column-mutation) field on the `create_column` mutation is now required

* Empty parentheses are [no longer supported](https://developer.monday.com/api-reference/changelog/empty-parentheses-no-longer-supported)

* Quotation marks for strings are [now required](https://developer.monday.com/api-reference/changelog/quotation-marks-for-strings-required)

* Removed the deprecated [`pos`](https://developer.monday.com/api-reference/changelog/removing-deprecated-pos-fields) fields on boards and columns queries

* Column type strings have changed. The [`type` field](https://developer.monday.com/api-reference/changelog/type-change-for-type-field-on-columns-queries) on `columns` queries has changed from `String!` to `ColumnType!`

* Deprecated the [`newest_first`](https://developer.monday.com/api-reference/changelog/deprecating-the-newest_first-argument) argument on `boards` queries

* Many of the [ID arguments and fields](https://developer.monday.com/api-reference/changelog/type-change-for-id-arguments-and-fields) have changed from `Int` to `ID` type

* `Text` field returns [empty results](https://developer.monday.com/api-reference/changelog/text-field-empty-value-for-mirror-dependency-and-connect-boards-columns) for mirror, dependency, and connect boards columns when querying through `column_values` or the specific `MirrorValue`,  `DependencyValue` and `BoardRelationValue` types. Use the `display_value` field instead.

### Non-breaking changes

* New [`next_items_page`](https://developer.monday.com/api-reference/docs/items_page#cursor-based-pagination-using-next_items_page) object for cursor-based pagination

* New [`move_item_to_board`](https://developer.monday.com/api-reference/changelog/new-move_item_to_board-mutation) mutation

* New [`linked_items`](https://developer.monday.com/api-reference/changelog/new-linked_items-field) field on `items` queries

* New [`edit_update` and `delete_update`](https://developer.monday.com/api-reference/changelog/new-edit_update-and-delete-update-webhooks) webhooks

* The `value` argument in the [`change_simple_column_value`](https://developer.monday.com/api-reference/changelog/nullable-value-argument-in-change-simple-column-value-mutation) mutation is now nullable

* The complexity of the [`text`](https://developer.monday.com/api-reference/changelog/increased-complexity-for-text-field) field for mirror, link, and dependency columns increased

* New [`ids`](https://developer.monday.com/api-reference/changelog/new-ids-argument-on-updates-queries) argument on `updates` queries
