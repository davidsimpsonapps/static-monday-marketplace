---
updatedAt: 2026-02-12T21:50:08.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Automation features migration overview

Review frequently asked questions about deprecation of sentence blocks and migration to monday workflows

Starting January 2026, the monday.com platform will begin migrating automations to a unified infrastructure powered by [monday workflows](https://developer.monday.com/apps/docs/monday-workflows).

To ensure your app’s blocks continue to appear in the new Automation Builder and future monday.com products, all apps using the legacy *Integration for sentence builder* feature must migrate to *Automation block* app features before April 30th, 2026.

If you do not migrate:

* Your blocks will not appear in the new Automation Builder
* Existing automations using your blocks may stop working once the legacy infrastructure is discontinued

# Background

With the current infrastructure, apps that want to support both automations and monday workflows must build their integration twice. This double work increases development and maintenance effort and limits where blocks can be reused across the platform.

Moving to monday workflows introduces a single, shared infrastructure for all automation experiences. The goal is for app blocks to be defined once and reused across multiple monday.com products, including the Automation Builder, Workflow Builder, and future automation surfaces.

To enable this, existing *Integration for sentence builder* app feature components are being replaced with modular workflow-based app features.

## High-level changes

The following areas require updates when migrating to the new infrastructure:

* **Fields:** Input and output fields are now explicitly backed by [primitive types](https://developer.monday.com/apps/docs/primitive-fields) (text, number, boolean, date). This enables consistent data mapping and chaining between blocks.
* **Authentication:** The legacy Authorization URL mechanism is deprecated. Authentication is now handled through [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials), which support OAuth, API keys, and custom authentication patterns.

## Breaking changes and deprecated features

Some features from the Integration for Sentence Builder infrastructure are not fully supported or require manual configuration in monday workflows.

These include:

* Authorization URL (deprecated)
* Certain field types without direct equivalents
* Blocks with partial or mismatched field mappings

If your migration fails or shows errors, review the [full list of breaking changes and unsupported features](https://developer.monday.com/apps/docs/breaking-changes-and-deprecated-features) before retrying.

## Feature mapping

| Old Entity               | New Feature                                                                                   |
| :----------------------- | :-------------------------------------------------------------------------------------------- |
| Field type               | [Field for automation block](https://developer.monday.com/apps/docs/add-fields-to-your-block) |
| Field type (credentials) | [Credentials](https://developer.monday.com/apps/docs/manage-user-tokens-and-credentials)      |
| Block                    | [Automation block](https://developer.monday.com/apps/docs/create-an-automation-block)         |
| Recipe                   | [Automation template](https://developer.monday.com/apps/docs/automation-templates)            |

# Who needs to migrate?

You need to migrate if your app:

* Uses an *Integration for sentence builder* app feature
* Defines custom automation blocks or recipes

You do not need to migrate if:

* Your app already uses Integration for monday workflows
* You do not expose automation blocks

# Customer impact

The migration does **not** impact existing automations.

All automations built using the legacy *Integration for sentence builder* will continue running exactly as they do today. The migration only changes how new automations are created and does not impact how existing recipes execute.

As long as your backend continues to support the previous infrastructure, customers will not experience downtime and will not need to take any manual action.

<Callout icon="❗️" theme="error">
  Do not remove your legacy feature or shut down your existing backend during the transition period. Existing automations rely on this infrastructure and must remain supported.
</Callout>

# Timeline

| Milestone                          | Date             |
| ---------------------------------- | ---------------- |
| New Automation Builder rollout     | January 2026     |
| Legacy infrastructure discontinued | April 30th, 2026 |

# How to migrate?

If your app utilizes the *Integration for sentence builder* app feature, migrate it to the new infrastructure using the built-in migration wizard in the Developer Center.

👉 Follow the [Migration guide](https://developer.monday.com/apps/docs/automation-features-migration-guide).

# Get help

Read our [FAQs](https://developer.monday.com/apps/docs/automation-features-migration-faqs) for detailed guidance. If you have additional questions, you can post in our [Developer Community](https://developer-community.monday.com/) or [open a ticket](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962) with our support team.

<br />
