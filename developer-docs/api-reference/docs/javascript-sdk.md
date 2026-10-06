---
updatedAt: 2026-09-06T08:31:25.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# JavaScript SDK

A comprehensive guide to the monday.com JavaScript/TypeScript SDK for interacting with the GraphQL API.

The monday.com JavaScript SDK (`@mondaydotcomorg/api`) provides a typed, ergonomic way to interact with the monday.com GraphQL API from Node.js or browser environments. It wraps [`graphql-request`](https://www.npmjs.com/package/graphql-request) and ships with pre-built operations, full TypeScript types generated from the API schema, and automatic API versioning.

A companion package (`@mondaydotcomorg/setup-api`) scaffolds a GraphQL codegen pipeline so you can write custom queries with full type safety.

| Package                                                                                  | Purpose                                 | Latest version |
| ---------------------------------------------------------------------------------------- | --------------------------------------- | -------------- |
| [`@mondaydotcomorg/api`](https://www.npmjs.com/package/@mondaydotcomorg/api)             | API client, types, pre-built operations | 14.0.0         |
| [`@mondaydotcomorg/setup-api`](https://www.npmjs.com/package/@mondaydotcomorg/setup-api) | GraphQL codegen scaffolding CLI         | 2.1.1          |

***

# Installation

```bash
npm install @mondaydotcomorg/api
```

The package works in both **Node.js** (v18+) and **browser** environments.

### Dependencies

The SDK depends on `graphql`, `graphql-request`, `graphql-tag`, and `zod`. These are installed automatically.

***

# ApiClient

`ApiClient` is the main entry point. It requires an API token and optionally accepts an API version and request configuration.

## Creating a client

```typescript
import { ApiClient } from '@mondaydotcomorg/api';

const client = new ApiClient({
  token: '<YOUR_API_TOKEN>',
});
```

### Constructor options

| Option          | Type            | Required | Default                              | Description                                                                                                              |
| --------------- | --------------- | -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `token`         | `string`        | Yes      | —                                    | Your monday.com API token (personal or OAuth). Sent as the `Authorization` header.                                       |
| `apiVersion`    | `string`        | No       | `'2026-01'` (current at SDK release) | API version in `yyyy-mm` format. Valid months: `01`, `04`, `07`, `10`. Also accepts `'dev'`.                             |
| `endpoint`      | `string`        | No       | `'https://api.monday.com/v2'`        | Override the API endpoint URL.                                                                                           |
| `requestConfig` | `RequestConfig` | No       | `{}`                                 | Passed to the underlying `graphql-request` client. Includes `errorPolicy`, `headers`, `fetch`, `requestMiddleware`, etc. |

```typescript
const client = new ApiClient({
  token: '<YOUR_API_TOKEN>',
  apiVersion: '2025-10',
  requestConfig: {
    errorPolicy: 'all',
  },
});
```

> 📘 API version validation
>
> The constructor throws an error if `apiVersion` doesn't match the format `yyyy-mm` with month `01`, `04`, `07`, or `10` (or `'dev'`). For example, `'2025-03'` is rejected.

***

# Freestyle queries

Use `client.request()` to execute any GraphQL query or mutation.

## Basic query

```typescript
const result = await client.request(`
  query {
    boards(ids: [12345]) {
      id
      name
      columns { id title type }
    }
  }
`);

console.log(result.boards);
```

## With variables

```typescript
const result = await client.request(
  `query ($ids: [ID!]!) {
    boards(ids: $ids) {
      id
      name
      items_page(limit: 5) {
        items { id name }
      }
    }
  }`,
  { ids: ["12345", "67890"] }
);
```

## With TypeScript generics

You can pass a type parameter to `request()` to type the response:

```typescript
import { Board } from '@mondaydotcomorg/api';

const { boards } = await client.request<{ boards: Board[] }>(
  `query { boards(ids: [12345]) { id name } }`
);
```

> 👍 Pro tip
>
> The SDK exports all GraphQL types from the monday.com schema (e.g., `Board`, `Item`, `Column`, `User`, `Group`, `ColumnType`, etc.). Import them directly for type-safe responses.

## Request options

The third parameter to `request()` accepts:

| Option            | Type     | Description                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `versionOverride` | `string` | Override the API version for this single request. Same validation rules as the constructor.          |
| `timeoutMs`       | `number` | Request timeout in milliseconds (max 60,000). The request aborts if the API doesn't respond in time. |

```typescript
const result = await client.request(
  `query { me { id name } }`,
  undefined,
  { versionOverride: '2025-10', timeoutMs: 10000 }
);
```

***

# Raw requests

Use `client.rawRequest()` when you need the full response structure including `data`, `errors`, and `extensions`:

```typescript
const response = await client.rawRequest(`query { me { id name } }`);

console.log(response.data);       // { me: { id: '...', name: '...' } }
console.log(response.extensions);  // API metadata (complexity, etc.)
console.log(response.errors);      // Any GraphQL errors (if errorPolicy allows)
```

`rawRequest()` accepts the same parameters as `request()` (query, variables, options).

***

# Pre-built operations

The SDK includes pre-built operations accessible via `client.operations`. These are typed GraphQL documents with dedicated methods — no need to write the query yourself.

## Available operations

| Method                                                            | Type     | Description                                                         |
| ----------------------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| `getMeOp()`                                                       | Query    | Returns the authenticated user's `id`, `name`, and `email`.         |
| `getBoardItemsOp({ ids })`                                        | Query    | Returns items (with column values) for the specified board IDs.     |
| `getBoardGroupsOp({ ids })`                                       | Query    | Returns groups (with `id` and `title`) for the specified board IDs. |
| `createItemOp({ boardId, groupId, itemName })`                    | Mutation | Creates a new item in the specified board and group.                |
| `changeSimpleColumnValueOp({ boardId, itemId, columnId, value })` | Mutation | Sets a column's value using a simple string.                        |
| `changeColumnValueOp({ boardId, itemId, columnId, value })`       | Mutation | Sets a column's value using a JSON value.                           |
| `changeMultipleColumnValuesOp({ boardId, itemId, columnValues })` | Mutation | Sets multiple column values at once using a JSON string.            |

## Examples

### Get the current user

```typescript
const { me } = await client.operations.getMeOp();
console.log(me.name, me.email);
```

### Get board items

```typescript
const { boards } = await client.operations.getBoardItemsOp({
  ids: ["12345"],
});

for (const board of boards) {
  for (const item of board.items_page.items) {
    console.log(item.id, item.name);
    for (const col of item.column_values) {
      console.log(`  ${col.id} (${col.type}): ${col.value}`);
    }
  }
}
```

### Create an item

```typescript
const { create_item } = await client.operations.createItemOp({
  boardId: "12345",
  groupId: "topics",
  itemName: "New task from SDK",
});

console.log("Created item:", create_item.id);
```

### Change a single column value

```typescript
// Simple string value (for text columns)
await client.operations.changeSimpleColumnValueOp({
  boardId: "12345",
  itemId: "67890",
  columnId: "text_column",
  value: "Hello from SDK!",
});

// JSON value (for structured columns like status, date, etc.)
await client.operations.changeColumnValueOp({
  boardId: "12345",
  itemId: "67890",
  columnId: "status_column",
  value: JSON.stringify({ label: "Done" }),
});
```

### Change multiple column values at once

```typescript
await client.operations.changeMultipleColumnValuesOp({
  boardId: "12345",
  itemId: "67890",
  columnValues: JSON.stringify({
    text_column: "Updated text",
    status_column: { label: "Working on it" },
    date_column: { date: "2026-04-01" },
  }),
});
```

> 📘 Column value formats
>
> The `value` parameter for `changeColumnValueOp` and `changeMultipleColumnValuesOp` must be a JSON-stringified value. Each column type expects a specific JSON structure — refer to the [column values documentation](https://developer.monday.com/api-reference/reference/column-values-v2) for details.

***

# File uploads

The SDK supports file uploads through the standard GraphQL `add_file_to_column` mutation. Pass a Node.js `File` or `Blob` object in your variables, and the client automatically switches to a multipart request.

```typescript
import { ApiClient } from '@mondaydotcomorg/api';
import { readFileSync } from 'fs';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

const file = new File(
  [readFileSync('./report.pdf')],
  'report.pdf',
  { type: 'application/pdf' }
);

const result = await client.request(
  `mutation ($file: File!, $itemId: ID!, $columnId: String!) {
    add_file_to_column(file: $file, item_id: $itemId, column_id: $columnId) {
      id
      name
      url
    }
  }`,
  {
    file,
    itemId: '67890',
    columnId: 'files',
  }
);

console.log(result.add_file_to_column);
```

> ⚠️ Important
>
> File uploads use Node's built-in `File` and `Blob` (available in Node 18+). The SDK's file upload middleware detects these objects and converts the request to `multipart/form-data` automatically.

***

# Error handling

## ClientError

When a GraphQL request fails, the SDK throws a `ClientError` (re-exported from `graphql-request`):

```typescript
import { ApiClient, ClientError } from '@mondaydotcomorg/api';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

try {
  await client.request(`query { invalid_field }`);
} catch (error) {
  if (error instanceof ClientError) {
    console.error('GraphQL errors:', error.response.errors);
    // [{ message: 'Cannot query field "invalid_field" on type "Query".', locations: [...] }]
  } else {
    console.error('Network or other error:', error);
  }
}
```

## Error policies

By default, the client throws on any GraphQL error. You can change this with `errorPolicy` in the constructor:

| Policy             | Behavior                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `'none'` (default) | Throws on any error.                                                                           |
| `'ignore'`         | Resolves the promise, ignoring errors entirely.                                                |
| `'all'`            | Returns both data and errors. Use with `rawRequest()` to access partial data alongside errors. |

```typescript
const client = new ApiClient({
  token: '<YOUR_API_TOKEN>',
  requestConfig: { errorPolicy: 'all' },
});

const response = await client.rawRequest(`query { ... }`);
console.log(response.data);    // partial data (if any)
console.log(response.errors);  // error details
```

***

# SeamlessApiClient

`SeamlessApiClient` is designed for **client-side code running inside a monday.com app** (e.g., a board view or item view iframe). It communicates with the monday.com API through the platform's internal `postMessage` bridge — no API token is needed.

```typescript
import { SeamlessApiClient, Board } from '@mondaydotcomorg/api';

const client = new SeamlessApiClient();

const { boards } = await client.request<{ boards: Board[] }>(
  `query { boards(ids: [12345]) { id name } }`
);
```

### SeamlessApiClient constructor

| Option       | Type     | Default                        | Description                      |
| ------------ | -------- | ------------------------------ | -------------------------------- |
| `apiVersion` | `string` | Current version at SDK release | API version to use for requests. |

### SeamlessApiClient.request()

| Parameter   | Type                  | Required           | Description                       |
| ----------- | --------------------- | ------------------ | --------------------------------- |
| `query`     | `string`              | Yes                | GraphQL query or mutation string. |
| `variables` | `Record<string, any>` | No                 | Query variables.                  |
| `version`   | `string`              | No                 | Per-request API version override. |
| `timeout`   | `number`              | No (default 60000) | Request timeout in ms.            |

### Error handling

Errors from `SeamlessApiClient` are instances of `SeamlessApiClientError`:

```typescript
import { SeamlessApiClient, SeamlessApiClientError } from '@mondaydotcomorg/api';

const client = new SeamlessApiClient();

try {
  await client.request(`query { boards { id } }`);
} catch (error) {
  if (error instanceof SeamlessApiClientError) {
    console.error(error.message);
    console.error(error.response.errors);
  }
}
```

> ⚠️ Browser only
>
> `SeamlessApiClient` uses `window.postMessage` and only works inside a monday.com app iframe. For server-side code or standalone scripts, use `ApiClient` with a token.

***

# API versioning

The monday.com API uses quarterly versioning. The SDK automatically sends the `API-Version` header with every request.

## Version format

Versions follow `yyyy-mm` where month is one of `01`, `04`, `07`, `10` (released quarterly). The special value `'dev'` targets the development/preview version.

## Version lifecycle

| Stage               | Description                                        |
| ------------------- | -------------------------------------------------- |
| `current`           | The current stable version.                        |
| `release_candidate` | Next version, available for preview.               |
| `maintenance`       | Previous version, still supported.                 |
| `deprecated`        | No longer supported; will eventually stop working. |
| `dev`               | Unstable preview of upcoming changes.              |

## Controlling the version

```typescript
// Set at client creation (applies to all requests including operations)
const client = new ApiClient({
  token: '<YOUR_API_TOKEN>',
  apiVersion: '2025-10',
});

// Override per-request
const result = await client.request(
  `query { me { id } }`,
  undefined,
  { versionOverride: '2026-01' }
);
```

## Exported constants

```typescript
import { DEFAULT_VERSION, MONDAY_API_ENDPOINT, AvailableVersions } from '@mondaydotcomorg/api';

console.log(DEFAULT_VERSION);        // '2026-01'
console.log(MONDAY_API_ENDPOINT);    // 'https://api.monday.com/v2'
console.log(AvailableVersions);      // { CURRENT_VERSION: '2026-01', CURRENT: 'current', ... }
```

***

# TypeScript types

The SDK exports all types from the monday.com GraphQL schema. These are generated from the API schema that was current when the package was published.

## Commonly used types

| Type              | Description                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Board`           | A monday.com board with all fields.                                                                                       |
| `Item`            | An item (row) on a board.                                                                                                 |
| `Column`          | A column definition on a board.                                                                                           |
| `ColumnValue`     | Base interface for column values. Union type with specific value types like `TextValue`, `StatusValue`, `DateValue`, etc. |
| `ColumnType`      | Enum of all column types (`text`, `status`, `date`, `people`, etc.).                                                      |
| `Group`           | A group of items on a board.                                                                                              |
| `User`            | A monday.com user.                                                                                                        |
| `Workspace`       | A workspace.                                                                                                              |
| `Account`         | Account-level information.                                                                                                |
| `Asset`           | An uploaded file.                                                                                                         |
| `Update`          | An update (comment) on an item.                                                                                           |
| `Tag`             | A tag.                                                                                                                    |
| `Team`            | A team.                                                                                                                   |
| `Folder`          | A folder in a workspace.                                                                                                  |
| `Doc`             | A monday doc.                                                                                                             |
| `AppSubscription` | App monetization subscription details.                                                                                    |

## Enum types

The SDK also exports useful enums:

| Enum                  | Values (examples)                                               |
| --------------------- | --------------------------------------------------------------- |
| `BoardKind`           | `public`, `private`, `share`                                    |
| `ColumnType`          | `text`, `status`, `date`, `numbers`, `people`, `timeline`, etc. |
| `BoardObjectType`     | `board`, `sub_items_board`, `document`                          |
| `BoardSubscriberKind` | `owner`, `subscriber`                                           |
| `WorkspaceKind`       | `open`, `closed`                                                |
| `State`               | `active`, `archived`, `deleted`, `all`                          |
| `FirstDayOfTheWeek`   | `sunday`, `monday`                                              |

## Usage example

```typescript
import { Board, Item, ColumnType, BoardKind } from '@mondaydotcomorg/api';

const processItem = (item: Item) => {
  for (const col of item.column_values) {
    if (col.type === ColumnType.Status) {
      console.log(`Status column ${col.id}:`, col.value);
    }
  }
};
```

***

# GraphQL codegen setup (`@mondaydotcomorg/setup-api`)

For projects that need **custom queries with full type safety**, use the companion setup package to scaffold a GraphQL codegen pipeline.

## Running the setup

Run this command in your project's **root directory**:

```bash
npx @mondaydotcomorg/setup-api
```

> ⚠️ Bash-only
>
> This CLI requires a bash-like environment (macOS Terminal, Linux shell, Git Bash on Windows). It is not compatible with Windows Command Prompt (cmd).

## What the setup creates

| File/folder                   | Purpose                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `codegen.yml`                 | Configuration for [GraphQL Code Generator](https://www.graphql-code-generator.com/).                                                                                            |
| `graphql.config.yml`          | Configuration for the [GraphQL IDE extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql). Provides autocomplete and validation in your editor. |
| `src/queries.graphql.ts`      | Starter file where you write your GraphQL queries and mutations. Comes with example query and mutation.                                                                         |
| `fetch-schema.sh`             | Script that downloads the latest monday.com API schema.                                                                                                                         |
| npm scripts in `package.json` | `fetch:schema`, `codegen`, and `fetch:generate`.                                                                                                                                |

### Installed dev dependencies

The setup installs these packages:

* `@graphql-codegen/cli`
* `@graphql-codegen/typescript`
* `@graphql-codegen/typescript-operations`

## Workflow

After running the setup:

### 1. Write your queries

Edit `src/queries.graphql.ts` to define your GraphQL operations:

```typescript
import gql from 'graphql-tag';

export const getBoards = gql`
  query GetBoards($ids: [ID!]) {
    boards(ids: $ids) {
      id
      name
      columns { id title type }
      groups { id title }
    }
  }
`;

export const createItem = gql`
  mutation CreateItem($boardId: ID!, $groupId: String!, $itemName: String!) {
    create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName) {
      id
      name
    }
  }
`;
```

### 2. Fetch the schema and generate types

```bash
npm run fetch:generate
```

This downloads the latest monday.com API schema and generates TypeScript types in `src/generated/graphql.ts`.

### 3. Use the generated types

```typescript
import { ApiClient } from '@mondaydotcomorg/api';
import { GetBoardsQuery, GetBoardsQueryVariables } from './generated/graphql';
import { getBoards } from './queries.graphql';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

const variables: GetBoardsQueryVariables = { ids: ["12345"] };
const data = await client.request<GetBoardsQuery>(getBoards, variables);

// data.boards is fully typed based on your query's selected fields
```

### Regenerating types after query changes

Whenever you modify your queries:

```bash
npm run codegen
```

To also re-fetch the schema (e.g., after a new API version):

```bash
npm run fetch:generate
```

## IDE support

For the best experience, install the GraphQL extension for your editor. The `graphql.config.yml` created by the setup enables autocomplete, validation, and hover docs for your queries.

**VS Code:** Install the [GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) and [GraphQL: Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax) extensions.

**JetBrains IDEs:** Install the GraphQL plugin from Preferences > Plugins > Marketplace.

***

# Full examples

## Querying boards and items

```typescript
import { ApiClient, Board, ColumnType } from '@mondaydotcomorg/api';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

// Get board structure
const { boards } = await client.request<{ boards: Board[] }>(`
  query {
    boards(ids: [12345]) {
      id
      name
      columns { id title type }
      groups { id title }
    }
  }
`);

// Get items with column values
const { boards: boardsWithItems } = await client.operations.getBoardItemsOp({
  ids: ["12345"],
});

for (const item of boardsWithItems[0].items_page.items) {
  console.log(`Item: ${item.name}`);
  for (const col of item.column_values) {
    console.log(`  ${col.id}: ${col.value}`);
  }
}
```

## Creating items and updating columns

```typescript
import { ApiClient } from '@mondaydotcomorg/api';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

// Create an item
const { create_item } = await client.operations.createItemOp({
  boardId: "12345",
  groupId: "topics",
  itemName: "New feature request",
});

// Update multiple columns on the new item
await client.operations.changeMultipleColumnValuesOp({
  boardId: "12345",
  itemId: create_item.id,
  columnValues: JSON.stringify({
    status: { label: "Working on it" },
    text: "Description of the feature",
    date: { date: "2026-04-15" },
    person: { personsAndTeams: [{ id: 12345678, kind: "person" }] },
  }),
});
```

## Using codegen with the SDK

```typescript
import { ApiClient, ClientError } from '@mondaydotcomorg/api';
import { GetBoardsQuery, GetBoardsQueryVariables, CreateItemMutation, CreateItemMutationVariables } from './generated/graphql';
import { getBoards, createItem } from './queries.graphql';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

// Typed query
const queryVars: GetBoardsQueryVariables = { ids: ["12345"] };
const boardData = await client.request<GetBoardsQuery>(getBoards, queryVars);

// Typed mutation
const mutationVars: CreateItemMutationVariables = {
  boardId: "12345",
  groupId: "topics",
  itemName: "Created with typed SDK!",
};
const itemData = await client.request<CreateItemMutation>(createItem, mutationVars);
```

## Error handling pattern

```typescript
import { ApiClient, ClientError } from '@mondaydotcomorg/api';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

async function safeRequest<T>(query: string, variables?: Record<string, any>): Promise<T | null> {
  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    if (error instanceof ClientError) {
      const gqlErrors = error.response.errors;
      for (const err of gqlErrors) {
        if (err.message.includes('complexity')) {
          console.error('Complexity budget exceeded. Simplify your query.');
        } else if (err.message.includes('Rate limit')) {
          console.error('Rate limited. Implement backoff.');
        } else {
          console.error('GraphQL error:', err.message);
        }
      }
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}
```

## File upload

```typescript
import { ApiClient } from '@mondaydotcomorg/api';
import { readFileSync } from 'fs';

const client = new ApiClient({ token: '<YOUR_API_TOKEN>' });

const fileBuffer = readFileSync('./document.pdf');
const file = new File([fileBuffer], 'document.pdf', { type: 'application/pdf' });

const result = await client.request(
  `mutation ($file: File!, $itemId: ID!, $columnId: String!) {
    add_file_to_column(file: $file, item_id: $itemId, column_id: $columnId) {
      id
      name
      url
    }
  }`,
  { file, itemId: "67890", columnId: "files" }
);
```

***

# Quick reference

## Exports summary

```typescript
// Classes
import { ApiClient, SeamlessApiClient } from '@mondaydotcomorg/api';

// Error types
import { ClientError, SeamlessApiClientError } from '@mondaydotcomorg/api';

// Constants
import { DEFAULT_VERSION, MONDAY_API_ENDPOINT, AvailableVersions } from '@mondaydotcomorg/api';

// Types (examples — hundreds are available)
import { Board, Item, Column, ColumnValue, User, Group, Workspace, Asset, Update, Tag } from '@mondaydotcomorg/api';

// Enums (examples)
import { ColumnType, BoardKind, State, WorkspaceKind, BoardObjectType } from '@mondaydotcomorg/api';
```

## ApiClient method reference

| Method                                      | Signature                                                                                                         | Description                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `request<T>()`                              | `(query: string, variables?: Record<string, any>, options?: RequestOptions) => Promise<T>`                        | Execute a GraphQL query/mutation. Returns typed response data.                        |
| `rawRequest<T>()`                           | `(query: string, variables?: Record<string, any>, options?: RequestOptions) => Promise<GraphQLClientResponse<T>>` | Execute a query and return the full response with `data`, `errors`, and `extensions`. |
| `operations.getMeOp()`                      | `() => Promise<GetMeOpQuery>`                                                                                     | Get the authenticated user.                                                           |
| `operations.getBoardItemsOp()`              | `({ ids: string[] }) => Promise<GetBoardItemsOpQuery>`                                                            | Get items for boards.                                                                 |
| `operations.getBoardGroupsOp()`             | `({ ids: string[] }) => Promise<GetBoardGroupsOpQuery>`                                                           | Get groups for boards.                                                                |
| `operations.createItemOp()`                 | `({ boardId, groupId, itemName }) => Promise<CreateItemOpMutation>`                                               | Create an item.                                                                       |
| `operations.changeSimpleColumnValueOp()`    | `({ boardId, itemId, columnId, value: string }) => Promise`                                                       | Set a column's simple string value.                                                   |
| `operations.changeColumnValueOp()`          | `({ boardId, itemId, columnId, value: JSON }) => Promise`                                                         | Set a column's JSON value.                                                            |
| `operations.changeMultipleColumnValuesOp()` | `({ boardId, itemId, columnValues: JSON }) => Promise`                                                            | Set multiple column values.                                                           |
