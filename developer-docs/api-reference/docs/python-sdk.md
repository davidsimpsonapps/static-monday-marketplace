---
updatedAt: 2026-09-06T08:31:25.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Python SDK

A comprehensive guide to the monday.com Python SDK for interacting with the GraphQL API.

The monday.com Python SDK (`monday-api-python-sdk`) provides a module-based way to interact with the monday.com GraphQL API from Python applications. It wraps the [`requests`](https://pypi.org/project/requests/) library and ships with pre-built operations organized into dedicated modules, automatic response deserialization via [`dacite`](https://pypi.org/project/dacite/), built-in retry logic, and automatic API versioning.

| Package                                                                    | Purpose                                                 | Latest version |
| -------------------------------------------------------------------------- | ------------------------------------------------------- | -------------- |
| [`monday-api-python-sdk`](https://pypi.org/project/monday-api-python-sdk/) | API client, typed response models, pre-built operations | 1.6.5          |

***

# Installation

```bash
pip install monday-api-python-sdk
```

The package supports **Python 3.7+**.

### Dependencies

The SDK depends on `requests` and `dacite`. These are installed automatically.

***

# MondayClient

`MondayClient` is the main entry point. It requires an API token and optionally accepts custom headers and configuration.

## Creating a client

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")
```

### Constructor parameters

| Parameter            | Type   | Required | Default                      | Description                                                                                                 |
| -------------------- | ------ | -------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `token`              | `str`  | Yes      | —                            | Your monday.com API token (personal or OAuth). Sent as the `Authorization` header.                          |
| `headers`            | `dict` | No       | `{"API-Version": "2026-01"}` | Custom headers to send with every request. The `API-Version` header is set automatically if not overridden. |
| `debug_mode`         | `bool` | No       | `False`                      | When `True`, prints the raw query and response for every API call. Useful during development.               |
| `max_retry_attempts` | `int`  | No       | `4`                          | Maximum number of retries for failed requests (rate limits, complexity exceptions, server errors).          |

```python
client = MondayClient(
    token="<YOUR_API_TOKEN>",
    debug_mode=True,
    max_retry_attempts=6,
)
```

## Client modules

The client organizes operations into modules, each responsible for a specific area of the API:

| Module                 | Access              | Description                                                                    |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------ |
| `client.boards`        | `BoardModule`       | Query boards, fetch items, get columns.                                        |
| `client.items`         | `ItemModule`        | Create, update, delete, and archive items. Change column values. Upload files. |
| `client.updates`       | `UpdateModule`      | Create, delete, and fetch updates (comments) on items and boards.              |
| `client.activity_logs` | `ActivityLogModule` | Fetch activity logs from boards with optional date filtering.                  |
| `client.docs`          | `DocsModule`        | Fetch monday doc content and blocks.                                           |
| `client.custom`        | `CustomModule`      | Execute any arbitrary GraphQL query.                                           |

***

# Board operations

The `client.boards` module provides methods for querying boards and their items.

## Fetch boards

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.boards.fetch_boards(limit=10)

for board in response.data.boards:
    print(f"{board.id}: {board.name}")
```

### Parameters

| Parameter    | Type            | Default | Description                                               |
| ------------ | --------------- | ------- | --------------------------------------------------------- |
| `limit`      | `int`           | `50`    | Number of boards to return.                               |
| `page`       | `int`           | `None`  | Page number for pagination.                               |
| `ids`        | `list[int]`     | `None`  | Filter by specific board IDs.                             |
| `board_kind` | `BoardKind`     | `None`  | Filter by board type (`public`, `private`, `share`).      |
| `state`      | `BoardState`    | `None`  | Filter by state (`active`, `archived`, `deleted`, `all`). |
| `order_by`   | `BoardsOrderBy` | `None`  | Sort order (`created_at` or `used_at`).                   |

## Fetch a board by ID

```python
response = client.boards.fetch_boards_by_id(board_id=12345)
board = response.data.boards[0]
print(board.name)
```

## Fetch all items from a board

This method automatically paginates through all items using cursor-based pagination, respecting complexity limits with automatic sleep between pages.

```python
items = client.boards.fetch_all_items_by_board_id(board_id=12345)

for item in items:
    print(f"{item.name} (updated: {item.updated_at})")
    for col in item.column_values:
        print(f"  {col.column.id}: {col.text}")
```

### Parameters

| Parameter      | Type         | Default | Description                              |
| -------------- | ------------ | ------- | ---------------------------------------- |
| `board_id`     | `int \| str` | —       | The board ID to fetch items from.        |
| `query_params` | `dict`       | `None`  | Optional query parameters for filtering. |
| `limit`        | `int`        | `500`   | Number of items per page.                |

## Fetch items by update date

Useful for incremental syncing — only fetch items modified within a date range.

```python
items = client.boards.fetch_item_by_board_id_by_update_date(
    board_id=12345,
    updated_after="2026-01-01T00:00:00Z",
    updated_before="2026-04-01T00:00:00Z",
)
```

## Fetch columns

```python
response = client.boards.fetch_columns_by_board_id(board_id=12345)

for col in response.data.boards[0].columns:
    print(f"{col.id} ({col.type}): {col.title}")
```

***

# Item operations

The `client.items` module provides methods for creating, querying, updating, and managing items.

## Create an item

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.items.create_item(
    board_id=12345,
    group_id="topics",
    item_name="New task from Python SDK",
)

print(f"Created item: {response.data.create_item.id}")
```

### With column values

```python
column_values = {
    "status": "Working on it",
    "date_column": "2026-04-15",
    "text_column": "Important task",
}

response = client.items.create_item(
    board_id=12345,
    group_id="topics",
    item_name="Task with columns",
    column_values=column_values,
    create_labels_if_missing=True,
)
```

> 📘 Column value formats
>
> For simple text and status columns, pass the value as a string. For structured columns, pass a dictionary matching the column's expected JSON format. Refer to the [column values documentation](https://developer.monday.com/api-reference/reference/column-values-v2) for details on each column type.

## Create a subitem

```python
response = client.items.create_subitem(
    parent_item_id=67890,
    subitem_name="Subtask from SDK",
    column_values={"status": "Done"},
)
```

## Change column values

### Simple text value

```python
client.items.change_simple_column_value(
    board_id=12345,
    item_id=67890,
    column_id="text_column",
    value="Updated via SDK",
)
```

### Status column

```python
client.items.change_status_column_value(
    board_id=12345,
    item_id=67890,
    column_id="status",
    value="Done",
)
```

### Date column

```python
from datetime import datetime

client.items.change_date_column_value(
    board_id=12345,
    item_id=67890,
    column_id="date_column",
    timestamp=datetime(2026, 4, 15, 10, 30, 0),
)
```

### Custom column value (JSON)

For column types that require a JSON structure (checkbox, dropdown, etc.):

```python
client.items.change_custom_column_value(
    board_id=12345,
    item_id=67890,
    column_id="checkbox_column",
    value={"checked": True},
)
```

### Multiple column values at once

```python
client.items.change_multiple_column_values(
    board_id=12345,
    item_id=67890,
    column_values={
        "status": {"label": "Working on it"},
        "text_column": "Updated text",
        "date_column": {"date": "2026-04-15"},
    },
    create_labels_if_missing=True,
)
```

## Fetch items

### By column value

```python
response = client.items.fetch_items_by_column_value(
    board_id=12345,
    column_id="status",
    value="Done",
    limit=50,
)
```

### By item ID

```python
items = client.items.fetch_items_by_id(ids=[67890, 67891])

for item in items:
    print(f"{item.id}: {item.name}")
```

## Move, archive, and delete items

```python
client.items.move_item_to_group(item_id=67890, group_id="new_group")

client.items.archive_item_by_id(item_id=67890)

client.items.delete_item_by_id(item_id=67890)
```

***

# File uploads

The SDK supports file uploads to file columns using a dedicated multipart upload endpoint.

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

result = client.items.upload_file_to_column(
    item_id=67890,
    column_id="files",
    file_path="./report.pdf",
)

print(result)
```

### Parameters

| Parameter   | Type         | Required | Description                                                                               |
| ----------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| `item_id`   | `int \| str` | Yes      | The item to upload the file to.                                                           |
| `column_id` | `str`        | Yes      | The ID of the file column.                                                                |
| `file_path` | `str`        | Yes      | Path to the file on disk.                                                                 |
| `mimetype`  | `str`        | No       | MIME type (e.g., `'application/pdf'`). Auto-detected from file extension if not provided. |

> ⚠️ Important
>
> File uploads use a separate API endpoint (`https://api.monday.com/v2/file`) and the multipart request format. The SDK handles this automatically — just provide the file path.

***

# Update operations

The `client.updates` module handles comments (updates) on items and boards.

## Create an update

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.updates.create_update(
    item_id=67890,
    update_value="Task completed ahead of schedule!",
)
```

## Fetch updates for an item

```python
response = client.updates.fetch_updates_for_item(item_id=67890, limit=50)

for update in response.data.items[0].updates:
    print(f"{update.creator.name}: {update.text_body}")
```

## Fetch board updates with date filtering

```python
updates = client.updates.fetch_board_updates(
    board_ids="12345",
    updated_after="2026-01-01T00:00:00Z",
    updated_before="2026-04-01T00:00:00Z",
)

for update in updates:
    print(f"[{update.updated_at}] {update.text_body}")
```

> 📘 Date filtering
>
> The `from_date` and `to_date` parameters in board update queries require API version `2026-01` or later. The SDK defaults to `2026-01` and also applies client-side date filtering as an additional safety net.

## Delete an update

```python
client.updates.delete_update(item_id=67890)
```

***

# Activity log operations

The `client.activity_logs` module fetches board activity with optional date filtering and event type filtering.

## Fetch all activity logs

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

logs = client.activity_logs.fetch_all_activity_logs_from_board(
    board_ids=12345,
    from_date="2026-01-01T00:00:00Z",
    to_date="2026-04-01T00:00:00Z",
)

for log in logs:
    print(f"[{log.event}] {log.data}")
```

### Filter by event type

```python
logs = client.activity_logs.fetch_all_activity_logs_from_board(
    board_ids=12345,
    events_filter=["create_pulse", "update_column_value"],
)
```

***

# Doc operations

The `client.docs` module fetches monday doc content with automatic pagination of blocks.

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

doc = client.docs.get_document_with_blocks(doc_id="35809248")

if doc:
    print(f"Document: {doc.name}")
    for block in doc.blocks:
        print(f"  [{block.type}] {block.content}")
```

***

# Custom queries

Use `client.custom` to execute any GraphQL query or mutation not covered by the built-in modules.

## Basic query

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.custom.execute_custom_query("""
    query {
        boards(ids: [12345]) {
            id
            name
            columns { id title type }
        }
    }
""")

for board in response.data.boards:
    print(board.name)
```

## Mutation

```python
response = client.custom.execute_custom_query("""
    mutation {
        create_item(
            board_id: 12345,
            group_id: "topics",
            item_name: "Created via custom query"
        ) {
            id
        }
    }
""")
```

> 📘 When to use custom queries
>
> Use custom queries when you need to access API features not yet covered by the SDK's built-in modules, or when you need fine-grained control over the GraphQL query structure and returned fields.

***

# Error handling

## Exception types

The SDK defines two exception classes:

| Exception          | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| `MondayError`      | Base exception class for all SDK errors.                                                           |
| `MondayQueryError` | Raised when the API returns GraphQL errors. Contains the `original_errors` list from the response. |

## Automatic retries

The SDK automatically retries all failed requests up to `max_retry_attempts` times (default: 4). After all retries are exhausted, it raises a standard `Exception` with a descriptive message.

| Scenario                  | Behavior                                          |
| ------------------------- | ------------------------------------------------- |
| **Rate limit (HTTP 429)** | Sleeps for 30 seconds, then retries.              |
| **Complexity exception**  | Sleeps for 2 seconds, then retries.               |
| **GraphQL errors**        | Retries up to `max_retry_attempts` times.         |
| **HTTP errors**           | Retries up to `max_retry_attempts` times.         |
| **504 Gateway Timeout**   | Retries, then raises a descriptive timeout error. |

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

try:
    response = client.custom.execute_custom_query("""
        query { invalid_field }
    """)
except Exception as e:
    print(f"API error: {e}")
```

> 📘 Retry behavior
>
> Since the SDK retries all errors (including GraphQL query errors), set `max_retry_attempts=1` if you want to fail fast on invalid queries rather than retrying them.

Configure the maximum retries via the `max_retry_attempts` parameter on `MondayClient`.

## Debug mode

Enable `debug_mode` to print raw queries and responses:

```python
client = MondayClient(
    token="<YOUR_API_TOKEN>",
    debug_mode=True,
)
```

***

# Response types

The SDK deserializes all API responses into Python dataclass objects using `dacite`. This provides attribute-based access and IDE autocompletion.

## MondayApiResponse

Every module method that calls the API returns a `MondayApiResponse`:

```python
from monday_sdk import MondayClient, MondayApiResponse

client = MondayClient(token="<YOUR_API_TOKEN>")
response: MondayApiResponse = client.boards.fetch_boards(limit=5)

print(response.data.boards[0].name)
print(response.account_id)
```

## Available types

| Type                | Description                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `MondayApiResponse` | The full API response, containing `data` and `account_id`.                                 |
| `Data`              | Core response data, including `boards`, `items`, `complexity`, and `docs`.                 |
| `Board`             | A monday.com board with `items_page`, `updates`, `activity_logs`, `columns`, and `groups`. |
| `Item`              | An item on a board, with `column_values`, `subitems`, and `parent_item`.                   |
| `Column`            | A column definition (`id`, `title`, `type`).                                               |
| `ColumnValue`       | A column's value (`value`, `text`, `display_value`, `column`).                             |
| `Group`             | A group within a board (`id`, `title`).                                                    |
| `User`              | A user (`id`, `name`).                                                                     |
| `Update`            | An update/comment (`id`, `text_body`, `creator`, `created_at`, `updated_at`).              |
| `ActivityLog`       | An activity log entry (`id`, `event`, `data`, `created_at`, `user_id`).                    |
| `ItemsPage`         | A paginated collection of items with a `cursor` for pagination.                            |
| `Complexity`        | Query complexity info (`query`, `after`).                                                  |
| `Document`          | A monday doc with `blocks`, metadata, and `workspace`.                                     |
| `DocumentBlock`     | A block within a document (`type`, `content`, `position`).                                 |

## Enum types

| Enum            | Values                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BoardKind`     | `PUBLIC`, `PRIVATE`, `SHARE`                                                                                                                                  |
| `BoardState`    | `ALL`, `ACTIVE`, `ARCHIVED`, `DELETED`                                                                                                                        |
| `BoardsOrderBy` | `CREATED_AT`, `USED_AT`                                                                                                                                       |
| `ColumnType`    | `STATUS`, `TEXT`, `DATE`, `NUMBERS`, `PEOPLE`, `TIMELINE`, `CHECKBOX`, `DROPDOWN`, `FILE`, `LINK`, `LONG_TEXT`, `PHONE`, `EMAIL`, `RATING`, `TAGS`, and more. |
| `Operator`      | `GREATER_THAN_OR_EQUALS`, `LESS_THAN_OR_EQUALS`                                                                                                               |

### Import example

```python
from monday_sdk import (
    MondayClient,
    MondayApiResponse,
    Board,
    Item,
    Column,
    ColumnValue,
    Update,
    ActivityLog,
)
from monday_sdk.types import BoardKind, BoardState, BoardsOrderBy, Operator
from monday_sdk.types.monday_enums import ColumnType
```

***

# API versioning

The monday.com API uses quarterly versioning. The SDK automatically sends the `API-Version` header with every request.

## Default version

The SDK defaults to `2026-01`. This is set in the package's `constants.py` and applied via the default headers.

## Version format

Versions follow `yyyy-mm` where month is one of `01`, `04`, `07`, `10` (released quarterly).

## Version lifecycle

| Stage               | Description                                        |
| ------------------- | -------------------------------------------------- |
| `current`           | The current stable version.                        |
| `release_candidate` | Next version, available for preview.               |
| `maintenance`       | Previous version, still supported.                 |
| `deprecated`        | No longer supported; will eventually stop working. |

## Overriding the version

To use a different API version, pass custom headers:

```python
client = MondayClient(
    token="<YOUR_API_TOKEN>",
    headers={"API-Version": "2025-10"},
)
```

***

# Full examples

## Querying boards and items

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.boards.fetch_boards(limit=5)
for board in response.data.boards:
    print(f"Board: {board.name} (ID: {board.id})")

items = client.boards.fetch_all_items_by_board_id(board_id=12345)
for item in items:
    print(f"  Item: {item.name}")
    for col in item.column_values:
        print(f"    {col.column.id}: {col.text}")
```

## Creating items and updating columns

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

response = client.items.create_item(
    board_id=12345,
    group_id="topics",
    item_name="New feature request",
    column_values={
        "status": "Working on it",
        "text_column": "Description of the feature",
        "date_column": "2026-04-15",
    },
    create_labels_if_missing=True,
)

item_id = response.data.create_item.id

client.items.change_multiple_column_values(
    board_id=12345,
    item_id=item_id,
    column_values={
        "status": {"label": "Done"},
        "text_column": "Feature completed",
    },
)
```

## Incremental sync pattern

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

items = client.boards.fetch_item_by_board_id_by_update_date(
    board_id=12345,
    updated_after="2026-04-01T00:00:00Z",
    updated_before="2026-04-03T00:00:00Z",
)

for item in items:
    print(f"Modified: {item.name} at {item.updated_at}")
```

## Error handling pattern

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

def safe_fetch_items(board_id):
    try:
        return client.boards.fetch_all_items_by_board_id(board_id=board_id)
    except Exception as e:
        error_msg = str(e)
        if "504" in error_msg:
            print("API timeout after retries. Try simplifying your query.")
        elif "429" in error_msg:
            print("Rate limited after retries. Wait and try again.")
        else:
            print(f"API error: {error_msg}")
        return []
```

## File upload

```python
from monday_sdk import MondayClient

client = MondayClient(token="<YOUR_API_TOKEN>")

result = client.items.upload_file_to_column(
    item_id=67890,
    column_id="files",
    file_path="./document.pdf",
    mimetype="application/pdf",
)

print(f"Uploaded: {result}")
```

***

# Quick reference

## Module method reference

### BoardModule (`client.boards`)

| Method                                                                                  | Description                                |
| --------------------------------------------------------------------------------------- | ------------------------------------------ |
| `fetch_boards(limit, page, ids, board_kind, state, order_by)`                           | Query boards with optional filters.        |
| `fetch_boards_by_id(board_id)`                                                          | Fetch a single board by ID.                |
| `fetch_all_items_by_board_id(board_id, query_params, limit)`                            | Fetch all items with automatic pagination. |
| `fetch_item_by_board_id_by_update_date(board_id, updated_after, updated_before, limit)` | Fetch items modified within a date range.  |
| `fetch_columns_by_board_id(board_id)`                                                   | Fetch column definitions for a board.      |

### ItemModule (`client.items`)

| Method                                                                                      | Description                                           |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `create_item(board_id, group_id, item_name, column_values, create_labels_if_missing)`       | Create a new item.                                    |
| `create_subitem(parent_item_id, subitem_name, column_values, create_labels_if_missing)`     | Create a subitem.                                     |
| `fetch_items_by_column_value(board_id, column_id, value, limit, cursor)`                    | Search items by column value.                         |
| `fetch_items_by_id(ids)`                                                                    | Fetch items by their IDs.                             |
| `change_simple_column_value(board_id, item_id, column_id, value)`                           | Set a text column's value.                            |
| `change_status_column_value(board_id, item_id, column_id, value)`                           | Set a status column's label.                          |
| `change_date_column_value(board_id, item_id, column_id, timestamp)`                         | Set a date column's value (pass a `datetime` object). |
| `change_custom_column_value(board_id, item_id, column_id, value)`                           | Set any column's value using a JSON dict.             |
| `change_multiple_column_values(board_id, item_id, column_values, create_labels_if_missing)` | Set multiple column values at once.                   |
| `move_item_to_group(item_id, group_id)`                                                     | Move an item to a different group.                    |
| `archive_item_by_id(item_id)`                                                               | Archive an item.                                      |
| `delete_item_by_id(item_id)`                                                                | Permanently delete an item.                           |
| `upload_file_to_column(item_id, column_id, file_path, mimetype)`                            | Upload a file to a file column.                       |

### UpdateModule (`client.updates`)

| Method                                                                | Description                                         |
| --------------------------------------------------------------------- | --------------------------------------------------- |
| `create_update(item_id, update_value)`                                | Create an update (comment) on an item.              |
| `delete_update(item_id)`                                              | Delete an update.                                   |
| `fetch_updates(limit, page)`                                          | Fetch updates with pagination.                      |
| `fetch_updates_for_item(item_id, limit)`                              | Fetch updates for a specific item.                  |
| `fetch_board_updates(board_ids, updated_after, updated_before)`       | Fetch all updates from a board with date filtering. |
| `fetch_board_updates_page(board_id, limit, page, from_date, to_date)` | Fetch a single page of board updates.               |

### ActivityLogModule (`client.activity_logs`)

| Method                                                                                    | Description                                                                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `fetch_activity_logs_from_board(board_ids, page, limit, from_date, to_date)`              | Fetch a page of activity logs.                                                  |
| `fetch_all_activity_logs_from_board(board_ids, from_date, to_date, limit, events_filter)` | Fetch all activity logs with automatic pagination and optional event filtering. |

### DocsModule (`client.docs`)

| Method                             | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `get_document_with_blocks(doc_id)` | Fetch a document with all blocks (auto-paginates). |

### CustomModule (`client.custom`)

| Method                               | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `execute_custom_query(custom_query)` | Execute any arbitrary GraphQL query or mutation. |
