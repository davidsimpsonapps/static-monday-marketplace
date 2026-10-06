---
updatedAt: 2026-09-08T13:42:21.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# mcli - monday.com GraphQL CLI

A command-line interface for monday.com's GraphQL API with JSON output, LLM-native design, and semantic business-layer operations

MCLI is a command-line interface to monday.com's GraphQL API. It's a single static binary with no dependencies, designed for both human operators and LLM agents.

Source and releases: [github.com/mondaycom/mcli](https://github.com/mondaycom/mcli)

## Key capabilities

* **JSON by default** - all output is structured JSON (use `--pretty` for human-readable formatting)
* **Single binary** - no runtime dependencies; build once, deploy anywhere
* **LLM-native** - no interactive prompts on the read path; self-describing via `mcli skill`
* **Semantic layer** - save domain-named queries/mutations to create a business-level API over boards
* **Dynamic API** - run any monday.com GraphQL operation via `mcli api` without writing GraphQL
* **Escape hatch** - raw `mcli query` / `mcli mutation` access for anything not covered by CLI commands
* **Webhooks & daemon** - background process to receive and poll webhook events
* **Authentication** - token stored securely in OS keychain (macOS Keychain, Linux Secret Service)

## Installation

Requires [Go 1.26+](https://go.dev/dl/).

```sh
# From source (recommended)
go install github.com/mondaycom/mcli/cmd/mcli@latest

# Or clone and build locally
git clone https://github.com/mondaycom/mcli.git
cd mcli
make build    # → bin/mcli
```

Prebuilt binaries for macOS and Linux are also available on the [Releases](https://github.com/mondaycom/mcli/releases) page.

Ensure `$(go env GOPATH)/bin` is on your `PATH` after `go install`.

## Quick start

```sh
# Authenticate (one-time, stores in OS keychain)
mcli auth login --token <your-monday-api-token>

# Verify
mcli me

# List your boards
mcli board list

# Get board structure (add --items for the first page of items with column values)
mcli board get 9832181507
mcli board get 9832181507 --items --items-limit 50

# List items with decoded column values (add --subitems to include each item's subitems)
mcli item list --board 9832181507
mcli item list --board 9832181507 --subitems

# Create an item with typed column shorthands
mcli item create --board 9832181507 --name "Ship feature" \
  --status "Working on it" --due 2026-06-01

# Or with raw column JSON, for any column type
mcli item create --board 9832181507 --name "Ship feature" \
  --col 'status={"label":"Working on it"}' \
  --col 'due_date={"date":"2026-06-01"}'

# Create or update many items in one command (rate-limit friendly)
echo '[{"name":"Ship v1","status":"Done"},{"name":"Write docs","due":"2026-06-10"}]' \
  | mcli item create --board 9832181507 -

# Run a raw GraphQL query
mcli query 'query { me { id name } }'
```

## Command reference

**Authentication:**

* `mcli auth login/logout/status`

**User:**

* `mcli me` - current user info (id, name, email, account, teams)

**Search:**

* `mcli search <query> [-t boards|items|docs] [--limit N]` - cross-entity search

**Workspaces & organization:**

* `mcli workspace list/get/create/update/delete`
* `mcli folder list/create/rename/delete`

**Boards:**

* `mcli board list/get/create/rename/archive/delete`
* `mcli board group list/create/rename/archive/delete`
* `mcli board column list/create/rename/describe/delete`

**Items:**

* `mcli item list/get/create/update/move/archive/delete`
* `mcli item create/update ... --status/--due/--date/--number/--text/--checkbox` - typed column shorthands
* `mcli item create/update --board <id> -` - batch write (rows on stdin)
* `mcli item find --board <id> --column <col> --value <text>` - find by column value
* `mcli item post-update <id> --body <text>` - post a comment
* `mcli item get-updates <id> [--limit N]` - read comments/updates
* `mcli item description <id> [--set <md>|--set-file <path>]` - read/write description

**Documents:**

* `mcli doc read <id>` - export document as markdown
* `mcli doc write <id> --content <md>` - replace document content

**Dynamic API:**

* `mcli api list [--type query|mutation]` - browse \~250 API operations from the schema
* `mcli api describe <operation|type>` - inspect signature and argument types
* `mcli api <operation> [--arg k=v]...` - execute any operation; JSON args auto-coerced

**Schema:**

* `mcli schema status` - report which schema is in use and how old it is
* `mcli schema refresh` - fetch the live schema with your token and cache it

**GraphQL (escape hatch):**

* `mcli query '<graphql>'` - run raw queries (inline, from file, or stdin)
* `mcli mutation '<graphql>'` - run raw mutations
* `mcli query save/list/run/delete` - manage saved queries
* `mcli mutation save/list/run/delete` - manage saved mutations

**Webhooks & events:**

* `mcli daemon start/stop/status` - background webhook receiver
* `mcli webhook create/list/delete/events` - webhook registration
* `mcli notification list/count/ack` - poll for webhook events

**Config:**

* `mcli config set <key> <value>` / `mcli config get <key>`

**Utility:**

* `mcli skill` - print LLM skill document
* `mcli version` - print version

Run `mcli <command> --help` for flags and detailed usage on any command.

## Semantic layer for LLM agents

Save reusable queries and mutations as domain-named operations. LLMs then operate in business terms instead of board IDs and column IDs.

### Pattern

1. Set up boards and columns (one-time)
2. Save domain-named queries/mutations that encode the board structure
3. Agents call `mcli query run <name>` / `mcli mutation run <name>` with business-level variables

### Example

Save a query that lists products from a specific board:

```sh
mcli query save list_products --query 'query($boardId: ID!) {
  boards(ids: [$boardId]) {
    items_page(limit: 100) {
      items { id name column_values { id text } }
    }
  }
}'
```

Run it with variables:

```sh
mcli query run list_products --var boardId=9832181507
```

Agents never need to know board IDs or column IDs — they call domain operations:

```sh
mcli query run list_products --var boardId=products_board
mcli mutation run create_order --var board=orders_board --var name="ORD-99" \
  --var cols='{"customer":"Acme Corp","status":{"label":"Draft"}}'
mcli mutation run update_order_status --var board=orders_board --var item=789 \
  --var cols='{"status":{"label":"Ordered"}}'
```

## E-Commerce demo: products, inventory & orders

This demo shows how an LLM agent (or human) can use mcli's generic commands to:

* Create boards with typed columns
* Define a semantic layer of saved queries/mutations with business-domain names
* Seed data using the structured item commands
* Place an order using only the semantic layer (no board IDs in the "business logic")

### Prerequisites

* `mcli auth login` (or `MONDAY_API_TOKEN` set)
* `jq` in PATH
* Run the full demo: [`./examples/ecommerce-demo.sh`](https://github.com/mondaycom/mcli/blob/master/examples/ecommerce-demo.sh) in the [mcli repo](https://github.com/mondaycom/mcli)

### Phase 1: Create boards

```sh
mcli board create --name "Products"  --kind public --empty   # → {"id":"..."}
mcli board create --name "Inventory" --kind public --empty
mcli board create --name "Orders"    --kind public --empty
```

Each board starts empty (no default columns/items).

### Phase 2: Define columns

**Products** — item name is the product name; add SKU, Description, Price:

```sh
mcli board column create --board $PRODUCTS_BOARD --title "SKU"         --type text
mcli board column create --board $PRODUCTS_BOARD --title "Description" --type long_text
mcli board column create --board $PRODUCTS_BOARD --title "Price"       --type numbers
```

**Inventory** — item name is the SKU for quick lookup:

```sh
mcli board column create --board $INVENTORY_BOARD --title "SKU"      --type text
mcli board column create --board $INVENTORY_BOARD --title "Quantity"  --type numbers
```

**Orders** — item name is the order ID; subitems are order lines:

```sh
mcli board column create --board $ORDERS_BOARD --title "Customer" --type text
mcli board column create --board $ORDERS_BOARD --title "Status"   --type status \
  --defaults '{"labels":{"0":"Draft","1":"Ordered","2":"Shipped","3":"Delivered"}}'
```

### Phase 3: Semantic layer

Saved queries and mutations give business-level names to operations. An LLM can call `mcli mutation run create_order --var ...` without knowing GraphQL:

**Queries**

| Name            | Purpose                              |
| --------------- | ------------------------------------ |
| `list_products` | All products with column values      |
| `get_inventory` | Full inventory snapshot              |
| `list_orders`   | Orders with their line-item subitems |
| `get_order`     | Single order detail by item ID       |

```sh
mcli query save list_products --query \
  'query($boardId: ID!) { boards(ids: [$boardId]) { items_page(limit:100) { items { id name column_values { id text value } } } } }'
```

**Mutations**

| Name                  | Purpose                              |
| --------------------- | ------------------------------------ |
| `create_product`      | Add a product to the catalog         |
| `update_inventory`    | Adjust stock quantity                |
| `create_order`        | Create a new order (starts as Draft) |
| `add_order_line`      | Add a line-item subitem to an order  |
| `update_order_status` | Transition order status              |

```sh
mcli mutation save create_order --query \
  'mutation($board: ID!, $name: String!, $cols: JSON!) { create_item(board_id: $board, item_name: $name, column_values: $cols) { id } }'
```

### Phase 4: Seed data

Using the structured item create command (more ergonomic for setup):

```sh
mcli item create --board $PRODUCTS_BOARD --name "Widget Pro" \
  --col "$PROD_SKU"='"WGT-001"' \
  --col "$PROD_PRICE"='"29.99"'
```

Or using the semantic layer:

```sh
mcli mutation run create_product \
  --var board=$PRODUCTS_BOARD \
  --var name="Widget Pro" \
  --var cols='{"sku":"WGT-001","price":"29.99"}'
```

### Phase 5: Place an order

This is where the semantic layer shines - the agent writes natural JSON in `--var` and mcli handles the encoding automatically. monday.com's JSON scalar expects a stringified JSON value on the wire, but mcli detects variables declared as JSON in the query and re-encodes them transparently. No double-escaping needed.

```sh
# 1. Create order in Draft status
mcli mutation run create_order \
  --var board=$ORDERS_BOARD \
  --var name="ORD-1001" \
  --var cols='{"customer":"Acme Corp","status":{"label":"Draft"}}'

# 2. Add line items
mcli mutation run add_order_line \
  --var parent=$ORDER_ID \
  --var name="Widget Pro x2" \
  --var cols='{}'

mcli mutation run add_order_line \
  --var parent=$ORDER_ID \
  --var name="Doohickey x5" \
  --var cols='{}'

# 3. Confirm the order
mcli mutation run update_order_status \
  --var board=$ORDERS_BOARD \
  --var item=$ORDER_ID \
  --var cols='{"status":{"label":"Ordered"}}'
```

### Phase 6: Verify

```sh
mcli query run list_products --var boardId=$PRODUCTS_BOARD --pretty
mcli query run get_order --var itemId="[$ORDER_ID]" --pretty
```

### Key takeaways

* **Generic commands** (`board create`, `item create`) handle setup
* **Saved queries/mutations** create a domain-specific API layer
* **JSON coercion** - variables declared as JSON in the query are auto-stringified, so `--var cols='{"key":"val"}'` just works without double-encoding
* **LLM agents** can operate entirely through `mcli mutation run <name>` / `mcli query run <name>` without understanding monday.com internals or wire-format quirks
* The semantic layer is **project-local** (`.mcli/` directory) and version-controllable

## Column values

### Reading

Column values are automatically decoded to human-readable form (status labels become strings, dates become ISO format, etc.).

### Writing with typed shorthands

For common column types, use typed flags. Each shorthand targets the board's single column of that type:

| Flag               | Column type | Accepts                                      |
| ------------------ | ----------- | -------------------------------------------- |
| `--status <label>` | status      | a label configured on the column             |
| `--date` / `--due` | date        | `2026-05-10`, `2026-05-10T14:30`, or RFC3339 |
| `--number <n>`     | numbers     | any number; empty string clears              |
| `--text <s>`       | text        | any string; empty string clears              |
| `--checkbox <b>`   | checkbox    | true/false, yes/no, 1/0                      |

```sh
mcli item create --board 123 --name "Task" --status Done --due 2026-05-10 --number 3
mcli item update 456 --board 123 --status "Working on it"
```

If the board has no column of that type, or more than one, the shorthand errors and lists candidates. Shorthands are not available with `--parent` (subitems) — use `--col` there.

### Writing with raw column JSON

Pass monday's raw column-value JSON via `--col <id>=<json>` for any column type:

```sh
mcli item create --board 123 --name "Task" \
  --col 'status={"label":"Done"}' \
  --col 'date={"date":"2026-05-10"}' \
  --col 'people={"personsAndTeams":[{"id":123,"kind":"person"}]}'
```

Use `mcli board column list --board <id>` to discover column IDs, types, and settings.

## Dynamic API (`mcli api`)

Every monday.com API operation is available without writing GraphQL. The schema (\~250 operations) is embedded in the binary and can be refreshed for a specific API version.

```sh
# Browse all operations
mcli api list
mcli api list --type mutation

# Inspect an operation or type
mcli api describe create_notification
mcli api describe Board

# Execute any operation — JSON arguments are auto-coerced
mcli api create_notification \
  --arg user_id=12345 --arg text="Hello" \
  --arg target_id=67890 --arg target_type=Project

# Preview generated GraphQL without executing
mcli api boards --arg limit=5 --dry-run
```

Keep the schema fresh:

```sh
mcli schema status
mcli schema refresh
mcli schema refresh --api-version 2026-08
```

## Webhooks and daemon

mcli includes a background daemon that receives monday.com webhooks and stores them as an inbox for agents to poll.

### Start the daemon

```sh
# Foreground — opens a Cloudflare Quick Tunnel for a public URL
mcli daemon start

# Or supply your own public URL
mcli daemon start --url https://your-server.example.com
```

The daemon:

* Listens for webhook payloads on an HTTP port (default 8420)
* Exposes a Unix socket IPC for CLI commands
* Opens a Cloudflare Quick Tunnel automatically (requires `cloudflared` in PATH)
* Re-registers webhooks when the tunnel URL changes

### Register webhooks

```sh
# Register for item creation events on a board
mcli webhook create --board 9832181507 --event create_item

# List registered webhooks
mcli webhook list

# List supported event types
mcli webhook events

# Remove a webhook
mcli webhook delete <webhook-id>
```

### Poll notifications

```sh
# Check if there are unread events
mcli notification count

# List unread events
mcli notification list --unread

# Filter by board or event type
mcli notification list --board 9832181507 --event change_column_value

# Acknowledge (mark read)
mcli notification ack <event-id>
mcli notification ack --all
```

All notification/webhook commands require the daemon to be running.

## LLM integration

mcli is purpose-built for LLM agents.

```sh
# Load the skill document into your LLM context
mcli skill
```

This outputs a concise, goal-oriented guide. The LLM discovers exact flags via `mcli <command> --help` as needed.

## Authentication

Token resolution (first match wins):

1. `--token <t>` flag
2. `MONDAY_API_TOKEN` environment variable
3. Stored credential in OS keychain (`mcli auth login`)

Credentials are stored securely in the OS keychain (macOS Keychain, Linux Secret Service) or an age-encrypted file. Never stored plaintext.

**Environment overrides** (take precedence over config file):

| Variable             | Purpose            | Default                     |
| -------------------- | ------------------ | --------------------------- |
| `MONDAY_API_TOKEN`   | API token          | —                           |
| `MONDAY_API_URL`     | API endpoint       | `https://api.monday.com/v2` |
| `MONDAY_API_VERSION` | API version header | `2026-07`                   |

## License

MIT

<br />
