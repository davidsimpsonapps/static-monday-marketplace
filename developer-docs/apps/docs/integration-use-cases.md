---
updatedAt: 2025-10-23T05:19:16.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Choose a use case

Explore potential use cases for integration apps.

A good integration app is flexible and specific. Users must easily understand how to use it and connect it to various workflows.

Start by brainstorming your app's use case. It will help you define the integration's main value. It will also identify which APIs to use and how to map data between the two systems.

# Some ways to define your integration

Start by defining your app's use case, and use that to scope your app's product and technical needs.

**Work use case:** Do people use monday and the other tool for the same work?

* For example, projects and tasks from other work management apps match well with boards and items in monday. If you're system has one of these natural relationships, start there.
* Less obvious relationships could be a design team tracking their work in monday but creating materials in Figma or Adobe.

**Object association:** Will each item in monday map to a single object in the other tool? For example, an item in monday connects to a single lead in a CRM. Or, will it map to multiple objects?

**Direction:** Will the data flow from one system to another only, or sync both ways?

**Data mapping:** What data fields from monday and the third party tool will your integration support?

# Example use cases

To help you get started, we've collected a longlist of potential use cases for you to start with.

1. Connect objects between two systems
2. Trigger a process in another system from an action in monday
3. Enrich monday workflows with third-party data

## Connect objects between two systems

The following examples are data mapping apps, which connect objects relationally between monday and other tools.

### Match items created in monday with issues in JIRA (or vice versa)

The simplest integration creates an item in monday when a corresponding object is created in another tool. For example, **When an issue is created in JIRA, create an item in monday.com** would create a task in monday when an issue is created in JIRA. Your app can also keep this data synced in real-time as changes happen.

### Connect multiple objects with one item in monday (many-to-one mapping)

Multiple systems usually don't hold the same kind of data in the same format. Your integration may need to be flexible enough to connect multiple items in a third-party tool with one item in monday. For example, your app could sync a single [Product Epic](https://support.monday.com/hc/en-us/articles/360009482179-Planning-epics-with-monday-dev) to multiple pull requests in a code hosting tool.

## Trigger a process in another system from an action in monday

These integrations run actions in other systems when things happen in monday. This pattern is useful for teams who track their work in monday but get their work done in other systems. Your integration can also write back to monday when an action takes place.

### When a status changes, schedule a post on Instagram

The status change is a common event to trigger actions from. For example, your integration might schedule a social media post when an item's status changes to "Scheduled".

### Manually sync an item with Salesforce on button click

Integrations don't have to run automatically. You can choose to trigger the data transfer when a customer clicks a button on a board. [Learn more about the Button column.](https://support.monday.com/hc/en-us/articles/360015690319-The-Button-Column)

### Create a text update in monday when a code review starts

If your integration's trigger event lives outside of monday, you can support that too. For example, create a text update with a development task's details in it, when a review in Github is requested.

## Enrich monday workflows with third-party data

### Fill out monday columns with third-party data

This use case is great for enhancing workflows with marketing data or business intelligence. For example, [populate a leads board](https://support.monday.com/hc/en-us/articles/360008648359-Manage-your-leads-with-monday-CRM) with data from a customer intelligence platform, or look up the popularity (or cost) of a potential [marketing campaign](https://monday.com/templates/template/35051/powerful-campaign-planning) by the keywords it uses.

### Add customer activities to the monday CRM

Many systems contain events and data that can give context on a customer's journey with your company. Your app could collect support tickets, webinar registrations, or session recordings from a third-party service and [add them as Activities](https://support.monday.com/hc/en-us/articles/360019213180-Emails-Activities-on-monday-com) in the monday CRM.

### Add context for development tasks to monday dev

R\&D teams use monday to track roadmaps, plan sprints and more. Your integration could create tasks when an alert threshold is reached or incident is reported.
