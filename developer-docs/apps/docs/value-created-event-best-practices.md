---
updatedAt: 2025-10-23T05:09:26.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Value-created event best practices

This guide will explain value-created events, the benefits of implementing the feature, and the steps you need to take to use the feature!

You can report value-created events to track the time between when a user installs the app and when they get value from it. The event represents a time when a user does something useful within your app, and you should select it based on the app's logic.

> 📘
>
> Full disclosure, after executing this method, you won't see any changes immediately. To analyze the amount of time it takes users to get value from our apps, we need your help in implementing this feature! We plan on exposing these insights to app developers and adding more telemetry about app usage in the future.

Tracking the time between installation and when the user gets the value-created event provides unique insight that will help you better understand your users and the value they get from your app. In the future, we plan on sharing insights with developers regarding their apps. This feature will ultimately help provide a better user experience, lead to more app usage, and minimize the gap between installation and app usage.

We can also use the feature to measure each app's success after installation and the overall success of all apps in the marketplace. We will use these insights to reduce the friction in the install-to-use flow, ultimately creating a better user and developer experience!

# Selecting a value-created event

You decide what you want to use as the value-created event based on your app's functionality. Events will differ from app to app based on their features, how much they interact with users, and the steps a user must take to use the app. Some example events may track when a user:

* Renders a view (especially if your app doesn't interact with users)
* Creates an item
* Defines something
* Renders a window
* Paints something on a board
* Sees an image

This is not an exhaustive list by any means, but it should give you an idea of the potential values a user could get from your application! In the future, we plan on creating a list of events that you can choose from based on the most frequently defined events.

We recommend calling this every time the user gets the value-created event so we can measure actual usage over time. You can also call this for each feature, like board views, item views, and dashboard widgets. Each of these unique features can generate a value-created event separately.

We also recommend executing this method every time the event occurs - not just the first time and not just for a specific user or account. Doing so allows us to track adoption across the account and accurately gauge the value of each app.

# Making a value-created event

Once you've selected your value-created event, you can call the `monday.execute()` method with the `valueCreatedForUser` type each time the event happens. There are no parameters for this method, and the function will return a promise which resolves when successful. There is no return value. You can find the `valueCreatedForUser` method in the <a href="https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user" target="_blank">SDK</a>.

```javascript
monday.execute('valueCreatedForUser')
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
