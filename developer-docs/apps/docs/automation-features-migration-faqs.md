---
updatedAt: 2026-02-12T21:48:20.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# FAQs

This FAQ addresses common questions about migrating from the legacy *Integration for sentence builder* feature to the new [workflows-based automation infrastructure](https://developer.monday.com/apps/docs/automation-features-migration-overview).

# Strategic

## Why is this migration required?

monday.com is consolidating all automation experiences on a single, workflows-based infrastructure.

This infrastructure powers:

* The new Automation Builder
* monday workflows
* Sidekick
* Future app framework experiences (e.g., app manifest, active version feature)

Legacy *Integration for sentence builder* features are not compatible with the new infrastructure and cannot appear in the new automation builders. Migrating ensures your app remains available wherever customers build automations going forward.

## Will this impact marketplace visibility or revenue?

The migration does not impact your marketplace listing, pricing, or billing. However, apps compatible with the new automation builders will organically have broader exposure as they become the default way customers create automations.

## What happens if we don’t migrate by the deadline?

If your app is not migrated by the deadline, it will no longer appear in the new Automation Builder when customers create automations from scratch once the legacy builder is fully replaced.

Existing automations will continue running for a limited time. However, migration is required to ensure long-term support.

We will provide advance notice before making any changes to legacy execution support.

# Migration process

## How much work should we expect?

For most apps, the [migration wizard](https://developer.monday.com/apps/docs/automation-features-migration-guide) automatically handles most structural changes.

You should plan to:

* Review the automatically generated blocks, fields, templates, and credentials
* Test the migrated features in the new Automation Builder or monday workflows
* Apply manual adjustments if your app uses custom authentication or relies on legacy field formats
* Update your backend to replace deprecated API usage and align with the new infrastructure (read more [here](https://developer.monday.com/apps/docs/automation-features-migration-guide#deprecated-api-payload-mode))

Updating deprecated API usage is not a blocker for completing the migration. The *Uses deprecated API* flag will remain until this work is completed.

## What happens if the migration wizard doesn’t fully succeed for my app?

The migration wizard is designed to:

* Automatically handle common migration scenarios
* Clearly flag any items that could not be migrated and require manual review

If parts of the migration fail:

* You’ll see exactly which components need attention or need to be retried
* Retrying the migration will only affect the components that previously failed

If you’re blocked, our technical support team is available to help (open a ticket [here](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962)). You are not expected to debug this alone.

## The wizard completed successfully. Am I ready to go?

Yes — for now.

Once the wizard completes successfully and you’ve tested your app in the new Automation Builder and/or Workflow Builder, you can publish the new app version to live. It should work as expected.

That said, we strongly recommend the following next steps:

* Update your backend to fully support the new automation infrastructure rather than relying on our temporary conversion layer between deprecated APIs and the new ones.
* Once completed, you can disable the *Uses deprecated API* flag. Learn more [here](https://developer.monday.com/apps/docs/automation-features-migration-guide#deprecated-api-payload-mode).
* If this is a private app that you actively use, rebuild your existing running automations using the newly created blocks or templates.

Completing these steps will allow you to fully adopt the new infrastructure and eventually stop maintaining legacy backend logic and the legacy automation feature in the *Developer Center*.

While these actions are not required to complete the migration today, they will significantly reduce long-term maintenance and ensure a smoother transition moving forward.

## Will we need to support two infrastructures at the same time?

Yes — temporarily.

During the transition, the legacy infrastructure will continue powering existing automations, while the new infrastructure will power newly created automations and workflows.

Parallel support for both infrastructures is expected during the migration period. We will communicate well in advance before retiring any legacy infrastructure.

## Is there a risk in migrating early?

No. Migrating early will not:

* Affect your app’s listing, pricing, or billing
* Negatively impact existing customers
* Force customers to immediately switch to the new Automation Builder

In fact, migrating earlier gives you more time to test, iterate, and ensure your app is fully compatible as the new automation builders roll out to more customers.

## My blocks aren’t exposed in the “start from scratch” flow. Do I still need to migrate my app?

Yes. While this may not impact you by the end of April, legacy recipes will eventually be deprecated, and over time, running automations will also need to move to the new infrastructure.

Migrating early:

* Helps you avoid a last-minute rush
* Gives you time to learn and adapt to the new infrastructure
* Ensures your app is ready for future automation, workflow, and AI capabilities

Even if everything continues to work today, migrating now is the safest and most future-proof path.

## Does this migration change authentication?

Yes, but it simplifies authentication overall.

The legacy `authorization_url` is not supported on the new infrastructure. Instead, apps should use the Credentials feature, which:

* Centralizes OAuth, API keys, and custom auth schemes
* Simplifies audits, rotation, and maintenance
* Reduces custom auth logic in your backend

If your app uses the `authorization_url`, you’ll need to manually configure Credentials as part of the migration.

:point\_right: Read more about the Authorization URL migration [here](https://developer.monday.com/apps/docs/authorization-url-migration-guide).

# Customer impact

## Will customers notice changes immediately?

In most cases, no. Customers will only notice changes if:

* They create new automations using the new Automation Builder or monday workflows
* Your migrated features become available in those builders after you publish

There are no UI or behavior changes for existing automations.

## Will users see both legacy recipes and new templates in the Automation Store?

Once recipes are successfully migrated using the wizard, legacy recipes are automatically hidden from the Automation Store. Users will then only see the new automation templates.

This behavior is controlled by a flag that can also be managed manually in the *Recipes* tab of the legacy *Integration for sentence builder* feature. If you rebuilt templates manually and want to hide the legacy ones, you can enable this checkbox there.

### How templates are displayed in the new infrastructure

In the new infrastructure, templates are grouped under the app name in the Automation Store, rather than under individual automation features as in the legacy experience.

If legacy recipes are not hidden, users will see both:

* A separate card for each legacy feature (opening recipes in the legacy builder)
* A single card under the app name displaying the new templates in the new builder

## Where can I get more help?

* Read more in the [migration guide](https://developer.monday.com/apps/docs/automation-features-migration-guide)
* [Open a ticket](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962) with our technical support team
* Feedback and discussion: Join the discussion in our [monday developer community](https://developer-community.monday.com/groups/appfeature-migration-21)
