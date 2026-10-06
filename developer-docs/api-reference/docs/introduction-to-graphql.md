---
updatedAt: 2026-09-06T08:33:35.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# GraphQL overview

The monday.com API is built with GraphQL, a flexible query language that allows you to return as much or as little data as you need. It's important to know that GraphQL is an application layer that parses the query you send it and returns (or changes) data accordingly.

Unlike REST APIs, where multiple endpoints return different data, GraphQL always exposes one endpoint and allows you to determine the structure of the returned data. Our API uses the following endpoint: `https://api.monday.com/v2`.

This document will walk through the GraphQL operations and object types to help you understand the essential components of a request. We will also discuss the GraphQL visual interface that enables you to test your queries and mutations, and finally, we cover where you can access the monday.com schema. Let's get started!

> 👍 Pro tip
>
> Check out this <a href="https://graphql.org/learn/" target="_blank">introduction to GraphQL</a> to understand what all you can do with GraphQL!

# Operations

There are two possible operations in GraphQL: **queries** and **mutations**.

## Query

**Queries** perform the READ operation and do not change or alter any data. The result of each query will be formatted in the same way as the query itself. The following example retrieves the ID, title, and type of each column on board 1234567890.

#### **Sample query**

```graphql
query {
  boards {
    columns {
      id
      title
      type
    }
  }
}
```

#### **Sample response**

```json
{
  "columns": [
    {
      "id": "name",
      "title": "Name",
      "type": "name"
    },
    {
      "id": "subitems",
      "title": "Subitems",
      "type": "subtasks"
    },
    {
      "id": "person",
      "title": "Person",
      "type": "people"
    },
    {
      "id": "status",
      "title": "Status",
      "type": "status"
    }
  ]
}
```

## Mutation

**Mutations** are special queries that perform the CUD (Create, Update, Delete) operations to modify your data. Mutations return an instance of the object you just modified, so you can query the data you changed. The following example creates a new item on board 1234567890 and returns the ID and name of the new item.

#### **Sample mutation**

```graphql GraphQL
mutation{
  create_item (board_id: 1234567890, item_name: "New Item"){
    id
    name
  }
}
```

#### **Sample response**

```json
{
  "data": {
    "create_item": {
      "id": "9876543210",
      "name": "New Item"
    }
  },
  "account_id": 12345678
}
```

## Multiple operations in one request

You can also send multiple queries in one request, and they will be executed one after the other. The following query returns the ID and name for boards 1234567890 and 9876543210. The mutation creates a new item and retrieves the item's ID and name on both boards 1234567890 and 9876543210.

#### **Sample query**

```graphql GraphQL
query {
  checkBoard1: boards (ids:1234567890) {
    id
    name
  }
  checkBoard2: boards (ids:9876543210) {
    id
    name
  }
}
```

#### **Sample response**

```json JSON
{
  "data": {
    "checkBoard1": [
      {
        "id": "1234567890",
        "name": "Test Board 1"
      }
    ],
    "checkBoard2": [
      {
        "id": "9876543210",
        "name": "Test Board 2"
      }
    ]
  },
  "account_id": 12345678
}
```

#### **Sample mutation**

```graphql
mutation{
  createItem1: create_item (board_id: 1234567890, item_name:"Test Item 1") {
    id
    name
  }
  createItem2: create_item(board_id: 9876543210, item_name:"Test Item 2") {
    id
    name
  }
}
```

#### **Sample response**

```json
{
  "data": {
    "createItem1": {
      "id": "11223344",
      "name": "Test Item 1"
    },
    "createItem2": {
      "id": "44332211",
      "name": "Test Item 2"
    }
  },
  "account_id": 12345678
}
```

# Object Types

Object types are a collection of fields used to describe the set of possible data you can query using the API. They can also have arguments on the fields to pass parameters when querying data.

## Fields

Fields specify properties or attributes of objects to help define what information to retrieve from a query. Every object in the schema contains fields that can be queried by name to retrieve specific properties of the object.

Take the `boards` object, for example. You can query these <a href="https://developer.monday.com/api-reference/docs/boards#fields" target="-blank">fields</a> to return specific information about your board(s). The following example returns the boards' ID and name and the ID, title, and type of each column on the boards.

```graphql GraphQL
query {
  boards {
    id
    name
    columns {
      id
      title
      type
    }
  }
}
```

## Arguments

You can pass arguments in a query to specify what data to return (i.e., filter the search results) and narrow down the results to only the specific ones you’re after.

Building on the `boards` example above, you can also use these <a href= "https://developer.monday.com/api-reference/docs/boards#arguments" target="-blank">arguments</a> to reduce the number of results returned in your query. The following example returns the ID and name only for boards 1234567890 and 9876543210 and the ID, title, and type of each column on those boards.

```graphql GraphQL
query {
  boards (ids: [1234567890, 9876543210]) {
    id
    name
    columns {
      id
      title
      type
    }
  }
}
```

### Variables

You can use variables to pass dynamic values to your arguments. They are written outside of the query string itself in the variables section and passed to the arguments.

When we start working with variables, we need to do three things:

1. Replace the static value in the query with `$variableName`
2. Declare `$variableName` as one of the variables accepted by the query
3. Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary

```json GraphQL
mutation change_column_value($value: JSON!) {
  change_column_value (board_id: 157244624,item_id: 9539475, column_id: "status", value: $value) {
    id
  }
}

query variables:
{
"value": "{\"index\": 1}"
}
```

# monday.com schema

Our GraphQL schema defines the structure of the available API data and contains all of the available queries and mutations. It is a valuable resource for verifying API responses and extracting useful information from the metadata.

We expose our schema <a href="https://api.monday.com/v2/get_schema" target="_blank">here</a>. By default, it is in introspection JSON format for the [Current](https://developer.monday.com/api-reference/docs/api-versioning#version-types) API version. You can request a different version using the optional `version=<API-Version>` parameter with the version name.

**For example:** `https://api.monday.com/v2/get_schema?version=2024-04`

You can also retrieve the schema definition language (SDL) version using the optional `format=sdl` parameter.

**For example:** `https://api.monday.com/v2/get_schema?format=sdl`

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
