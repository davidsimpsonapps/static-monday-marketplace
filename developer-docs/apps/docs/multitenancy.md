---
updatedAt: 2025-10-23T05:09:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Multitenancy best practices

This guide will walk you through best practices for implementing multitenancy, as well as some considerations around the unique IDs in monday.com.

As a monday apps developer, this article will help you understand how monday.com implements multitenancy and its impact on your app’s design.

## Who should read this article?

You should read this guide if:

* Your app stores any user data
* Your app needs to validate stored user data with actual user data in monday.com
* Your app stores API keys in order to make actions on behalf of monday.com users

## Why are these best practices important?

As a developer for the monday apps marketplace, it’s important to understand, implement, and uphold the security practices that safeguard user data.

While storing user data in your database can be useful for decreasing query time (and consequently load time for users), you must follow best practices so as not to expose this user data, consequently violating data security.

For example, if you store user data using non-unique keys (such as board IDs), your app may expose data to the wrong audience. Make sure to always store data using keys that are unique across all of monday.com accounts, such as account and user IDs.

## Introduction to Multitenancy

### What is multitenancy?

Multitenancy, also known as shared hosting, is a type of software architecture in which a single platform (in this case monday.com) serves multiple, independent instances or tenants.

Multitenancy is important because it breaks up monday.com’s users into distinct groups. These distinct groups may then be required to align with different data protection standards.

If you’re storing data from multiple monday.com accounts in a single database, your app is using multitenancy.

### When to use a database?

Using a database for your apps can reduce not only load time, but also give a more seamless experience for your users.

Some instances in which you would want to utilize a database include: storing your users’ authorization tokens, storing settings for a particular monday.com account’s instance of your app, as well as storing your users’ account data.

Essentially, databases allow you to save and sort through data with rapidity and ease. Whether it be a board view, item view, or an integration recipe, databases can help you find, access, and present data quickly and efficiently.

### What does multitenancy mean for you?

As a developer for the monday apps framework, it’s important to keep in mind how you’re storing data, and the uniqueness of monday.com keys and IDs.

This is even more important should you want to save multiple users’ and accounts’ information in the same database. Otherwise, you run the risk of violating data security should you choose to use a key that is not unique (i.e. any IDs other than account and user IDs).

For instance, if the only keys you store are item IDs, there is a chance that multiple boards within the account will have the same item IDs. This means you could be sharing item data across boards, and risking data security!

> ❗️ IMPORTANT
>
> Only **user IDs** and **account IDs** are unique across the entire platform! As such, any primary keys used should only include user IDs and account IDs.

Other than **user IDs** and **account IDs**, other monday.com IDs are unique only in certain contexts.

## Best Practices

As you begin to implement multitenancy in your own apps, here are a few suggestions to help you implement data security and user privacy.

### Rule #1: Use account ID and user ID for identifying all account and user level information.

Make sure any keys you save are related to both an account ID as well as a user ID. For example, if you’re saving an automation ID or board ID in your database, make sure it is associated with an account and/or user ID as well.

This way, in case there are multiple automations or boards in your database with the same ID, you can utilize the relevant account and user IDs to distinguish between them.

### Rule #2: Consider the uniqueness of the IDs and keys your application uses

When deciding which keys to store in your database, make sure you understand what scopes in which they are unique. For example, a column ID is unique on the board-level, but can appear on another board in the same account as well.

Are you using board IDs as your main keys? If so, you run the risk of there being multiple boards with the same board ID across different accounts. If this is the case, you could be sharing board data between accounts.

Make sure you always store account IDs and user IDs as your primary keys!

### Rule #3: Don’t assume Board IDs and Item IDs will be unique

Every item on a monday.com board has an ID that is unique to the account. However, these IDs are not necessarily unique across other monday.com accounts (ie, two different accounts could have boards with the same IDs).

Even if you’re looking up some data based on an item ID, you should always check the user ID and account ID associated with that record to ensure you’re accessing the correct information.

### Rule #4: Add multitenancy protection when accessing your database

Any and all access to your database should also, by default, have multitenancy protection. This way, your app ensures access to the right user data in the right context. In most languages, there are packages that can implement this database protection for you.

For example, the Sequelize ORM for Node.js is great for this. You can learn more about implementing Sequelize scopes [here](https://sequelize.org/master/manual/scopes.html).

If you’re looking for more information on implementing multitenancy in your apps, here are some resources that can help:

* [Multi tenant Architecture on AWS](https://www.clickittech.com/saas/multi-tenant-architecture/#saas-application)
* [Multi tenant Node.js and PostgreSQL](https://www.clickittech.com/saas/multi-tenant-node-js/)
* [Multi tenant package for Ruby on Rails](https://github.com/citusdata/activerecord-multi-tenant)

## Table of IDs and Uniqueness

The following is a table of monday.com IDs you can find in an account, and their corresponding contexts of uniqueness. Please note that the keys are not exhaustive and are subject to change.

| ID             | Description                            | Where is this unique?                                                                                                      |
| :------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Account ID     | The ID of an account.                  | Unique across all monday.com accounts.                                                                                     |
| Action UUID    | The UUID of a block's execution.       | Unique to each action in each automation.                                                                                  |
| App ID         | The ID of a specific app.              | Unique across the account. App IDs can be repeated in different accounts.                                                  |
| Automation ID  | The ID of an automation.               | Unique across the account. Automation IDs can be repeated in different accounts.                                           |
| Board ID       | The ID of a board in an account.       | Unique across the account. Board IDs can be repeated in different accounts.                                                |
| Board view ID  | The ID of the board view.              | Unique across the account. Board view IDs can be repeated in different accounts.                                           |
| Column ID      | The ID of a column on a board.         | Unique to a board. Column IDs can be repeated on multiple boards within the same account.                                  |
| Group ID       | The ID of a group on a board.          | Unique to a board. Group IDs can be repeated on multiple boards within the same account.                                   |
| Integration ID | The ID of an integration.              | Unique across the account. Integration IDs can be repeated in different accounts.                                          |
| Item ID        | The ID of an item on a board.          | Unique across the account. Item IDs can be repeated in different accounts.                                                 |
| Trigger UUID   | The UUID of an automation's execution. | Unique to each automation run. If one action is used multiple times in a recipe, they will all have the same trigger UUID. |
| User ID        | The ID of a specific user.             | Unique across all monday.com accounts. If someone has multiple accounts, their user ID will be different for each.         |

<br />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
