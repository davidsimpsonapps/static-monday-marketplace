---
updatedAt: 2026-09-06T08:33:59.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other types

Learn about other types supported by the get app lifecycle subscriptions API

The monday.com [get app lifecycle subscriptions](https://developer.monday.com/api-reference/reference/app-lifecycle-subscriptions) API enables you to read an app's feature-level lifecycle event subscriptions.

The types below are used by the get app lifecycle subscriptions query and are not independently queryable.

# UpdateLifecycleSubscriptionsInput

<Callout icon="🚧" theme="warn">
  **Only available in versions [`2026-04`](https://developer.monday.com/api-reference/docs/release-notes#2026-04) and later**
</Callout>

An object containing the entity's lifecycle event configuration input.

| Field             | Type                                                                                                                                         | Description                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| lifecycle\_events | [`[LifecycleEventInput!]`](https://developer.monday.com/api-reference/reference/app-lifecycle-subscriptions-other-types#lifecycleeventinput) | An object containing the input for a single lifecycle event subscription. |

## LifecycleEventInput

An object containing the input for a single lifecycle event subscription.

| Field        | Type      | Description                                                                                                                                                         |
| :----------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| event\_type  | `String!` | The lifecycle event type. View the full list of supported event types [here](https://developer.monday.com/api-reference/reference/get-app-lifecycle-subscriptions). |
| is\_sync     | `Boolean` | Whether the app’s handling of the event is synchronous. Default is `false`.                                                                                         |
| webhook\_url | `String!` | The HTTPS URL to receive notifications. Maximum of 2,048 characters.                                                                                                |
