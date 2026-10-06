---
updatedAt: 2026-02-02T22:43:22.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Automation templates

**Automation templates** define a single automation flow that connects **one** trigger block to **one** action block. They allow you to expose a managed automation to monday users, who only need to configure the required inputs rather than building the automation from scratch. This creates a guided and consistent automation experience.

The template controls:

* Which trigger and action are used
* How their fields are mapped

# Supported blocks

Automation templates support blocks from two sources:

## monday native blocks

monday.com provides a set of built-in automation blocks, known as *monday native blocks*.

Common examples include:

* When an item is created
* When a status changes
* Change column value
* Create an item

## App automation blocks

Automation blocks exposed by your app and registered in the Automation Builder.

For more details, see [Create an automation block](https://developer.monday.com/apps/docs/create-an-automation-block).

> ❗️ Managed template
>
> All automation templates are currently **managed**. This means that changes made by the template creator are automatically applied to all automations created from that template after it goes live.
>
> Because these updates affect existing user automations, we recommend making changes carefully. Users are not notified when a template update alters their running automations.

# Implementation

1. Open your app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center).
2. Navigate to **Build** > **Features** in the left-side menu.
3. Click **Create feature**.
4. Search for *Automation Template* and select it.
5. Configure the feature name and description.
6. Set the template display order. Templates with lower numbers appear first in the Automation Center.
7. Select one trigger and one action block.
8. Configure field mappings, if required:
   1. If an action input is configured to receive its value from the trigger output, you must specify which trigger output field key is used.
   2. This mapping is defined in the automation block configuration.
9. Click **Save changes**.
10. Publish a new app version.
11. Once live, the automation template will appear in the Automation Center.
