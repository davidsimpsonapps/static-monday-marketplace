---
updatedAt: 2026-02-02T22:40:29.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Breaking changes and deprecated features

This document lists features from the legacy Integration for Sentence Builder infrastructure that are not fully supported or require manual configuration when migrating to the monday workflows infrastructure.

You should use this reference if:

* Your migration fails or shows errors
* Blocks or recipes do not behave as expected after migration
* You need to understand which features require manual updates

Most issues described below can be resolved through manual configuration or by using supported alternatives in monday workflows.

# Authorization URL (deprecated)

Status: **Not supported**

The Authorization URL feature is not supported in monday workflows. If your app used the Authorization URL for authentication, you must manually migrate to a supported authentication mechanism.

See the [Authorization URL Migration Guide](https://developer.monday.com/apps/docs/authorization-url-migration-guide) for detailed migration paths and examples.

# Unsupported field types

Some field types from the legacy infrastructure are not automatically migrated because they lack direct equivalents in monday workflows.

* Blocks using these field types will fail during migration.
* Fields marked *Requires manual configuration* must be recreated or remapped.
* Some legacy fields have been obsoleted and require alternative configuration patterns.

| Field Type                     | Status                        | New Equivalent                            |
| :----------------------------- | :---------------------------- | :---------------------------------------- |
| Is Top Group                   | Requires manual configuration | Primitive boolean                         |
| Column Type                    | Not supported                 | —                                         |
| General Column Value           | Requires manual configuration | Column Value                              |
| Message                        | Requires manual configuration | Primitive string                          |
| Name                           | Requires manual configuration | Primitive string                          |
| Date Column Value              | Requires manual configuration | Primitive date                            |
| Duration                       | Requires manual configuration | Duration (but it has different behaviour) |
| Button Column Value            | Requires manual configuration | Primitive boolean                         |
| Item Mapping                   | Requires manual configuration | Item Values                               |
| Update Reply                   | Requires manual configuration | Primitive string                          |
| Email                          | Not supported                 | —                                         |
| Slack Channel                  | Not supported                 | —                                         |
| Gmail Message                  | Not supported                 | —                                         |
| Email Conditions               | Not supported                 | —                                         |
| Mailchimp Contact List         | Not supported                 | —                                         |
| Linkage Boards                 | Requires manual configuration | Connect boards                            |
| Linkage Columns                | Not supported                 | —                                         |
| Number Comparison Operator     | Requires manual configuration | Number operation                          |
| Board Name                     | Requires manual configuration | Primitive string                          |
| Should Apply on Existing Items | Not supported                 | —                                         |
| Execution Source               | Not supported                 | —                                         |

# Block migration considerations

Some monday platform blocks have partial compatibility between the old and new infrastructures.

## Blocks with partial field mapping

These blocks may migrate but behave differently because:

* Inbound fields may not map directly
* Outbound fields may be missing or renamed
* New infrastructure capabilities differ from the legacy model

## Affected blocks

| Block Name                            | Issue                                                        |
| :------------------------------------ | :----------------------------------------------------------- |
| Item created                          | Trigger mismatch in outbound fields                          |
| When item moves to board              | Trigger mismatch in outbound fields                          |
| When any column changes               | Trigger mismatch in outbound fields                          |
| When item moves to group              | Trigger mismatch in outbound fields                          |
| When button clicked                   | Trigger mismatch in outbound fields                          |
| When date arrives                     | Outbound fields mismatch                                     |
| Create board from template            | Missing block in new infrastructure                          |
| Board name changed                    | Missing block in new infrastructure                          |
| When status changes to something      | Trigger mismatch in outbound fields                          |
| When subitem created                  | Missing outbound fields                                      |
| Assign person behavior                | Split into two blocks: *Add assignee* and *Replace assignee* |
| Create project from template          | Missing block in new infrastructure                          |
| Every day if date has passed (7 days) | Missing outbound fields                                      |
| When item name changes                | Missing outbound fields                                      |
| When person assigned                  | Missing outbound fields                                      |
| Status changes                        | Missing block in new infrastructure                          |
| When email changes                    | Missing outbound fields                                      |
| When update created                   | Missing outbound fields                                      |
| When form is submitted                | Missing outbound fields                                      |
| When column changes                   | Missing outbound fields                                      |
| When status changes from X to Y       | Trigger mismatch in outbound fields                          |
| When subitem status changes           | Missing outbound fields                                      |

## Impact on your app

### Custom app blocks

* Should migrate without issues
* Backend URLs and logic remain unchanged

### Blocks using unsupported field types

* Will fail during migration
* Require manual configuration before retrying

## Impact on recipes

Recipes define how trigger outbound fields connect to action inbound fields. Migration may fail when unsupported or partially supported field types are involved.

### Common recipe migration errors

* Trigger uses an unsupported outbound field
* Action expects data from an unsupported outbound field
* Field mappings cannot be translated to the new infrastructure

### What to do

* Review errors in the migration summary
* Identify which field mappings caused the failure
* Recreate the recipe manually using supported field types
