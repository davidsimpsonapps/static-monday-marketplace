---
updatedAt: 2026-11-04T11:49:50.000Z
agentTools:
  siteIndex: https://developer.monday.com/llms.txt
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Migrating the User entity: 2026-04 → 2026-10

Upgrade your monday.com integration to the new User entity shape introduced in API version 2026-07, and prepare for the legacy field removals scheduled for 2026-10.

Starting with API version **`2026-07`**, the `User` type and `Query.users` gain new fields, types, enums, and arguments; a new top-level `user_configs` query; and enforced pagination on `users`. Several legacy fields on `User` are deprecated and are scheduled for removal in **`2026-10`** (confirm availability with introspection or release notes for the version you call).

This guide walks you through migrating an integration from the `2026-04` (or earlier) shape of the `User` entity to the `2026-10` shape.

<Callout icon="🚧" theme="warn">
  All prerequisite requests must include the `API-Version: 2026-07` header (or later) to see the new fields, types, and query arguments described below.
</Callout>

# Quick checklist

Before you migrate, grep your codebase for:

* `photo_original`, `photo_thumb`, `photo_thumb_small`, `photo_tiny`, `photo_small`
* `is_guest`, `is_admin`, `is_view_only`, `is_pending`, `enabled`
* `is_verified`, `join_date`
* `encrypt_api_token`, `sign_up_product_kind`
* `users(kind: ...)`, `users(newest_first: ...)`, `users(non_active: ...)`
* `users { ... }` calls with **no `limit` argument** (silent pagination cap of 200)
* `users(emails: ...)` where any element could be `null`
* Reads of `User.birthday` that parse it as a `Date`
* Reads of `User.created_at` that parse it as a `Date` (no time component)
* Reads of `User.utc_hours_diff` that assume it's an integer

Each hit has a replacement in the sections below.

***

# :rotating\_light: Breaking changes

## 1. Photo fields → `photo_url` nested object

The five flat photo fields are deprecated. Replace with the nested `PhotoUrl` object.

**Before (`2026-04`):**

```graphql
query {
  me {
    photo_original
    photo_small
    photo_thumb
    photo_thumb_small
    photo_tiny
  }
}
```

**After (`2026-07`+):**

```graphql
query {
  me {
    photo_url {
      original
      small
      thumb
      thumb_small
      tiny
    }
  }
}
```

`photo_url` is nullable ([`PhotoUrl`](https://developer.monday.com/api-reference/reference/users-other-types#photourl)). Each size is also nullable (`String`). Handle the case where the user has no uploaded photo.

## 2. Kind boolean flags → `kind` string

The `is_guest`, `is_admin`, and `is_view_only` booleans are deprecated. Use the `kind` string field instead.

**Before:**

```graphql
query { users { id is_admin is_guest is_view_only } }
```

**After:**

```graphql
query { users { id kind } }
```

Value mapping:

| Before (boolean true) | After (`kind` value)  |
| :-------------------- | :-------------------- |
| `is_admin: true`      | `kind == "admin"`     |
| `is_guest: true`      | `kind == "guest"`     |
| `is_view_only: true`  | `kind == "view_only"` |

Other `kind` values you may see: `member`, `agent_member`, `portal`, and several `*_api_user` variants (see the full [`UserKindFilter`](https://developer.monday.com/api-reference/reference/users-other-types#userkindfilter) enum).

## 3. Status booleans → `status` enum

`is_pending` and `enabled` are replaced by the [`status: UserStatus!`](https://developer.monday.com/api-reference/reference/users-other-types#userstatus) field.

**Before:**

```graphql
query { users { id enabled is_pending } }
```

**After:**

```graphql
query { users { id status } }
```

| Before                               | After                |
| :----------------------------------- | :------------------- |
| `enabled: true`, `is_pending: false` | `status == ACTIVE`   |
| `enabled: false`                     | `status == INACTIVE` |
| `is_pending: true`                   | `status == PENDING`  |

## 4. `is_verified` → `is_email_confirmed`

Same semantics, new name, and the type tightens from `Boolean` to `Boolean!`.

**Before:**

```graphql
query { me { is_verified } }
```

**After:**

```graphql
query { me { is_email_confirmed } }
```

## 5. `join_date` → `became_active_at`

`join_date` was a `Date` (`YYYY-MM-DD`). `became_active_at` is an `ISO8601DateTime` with full timestamp precision.

**Before:**

```graphql
query { me { join_date } }     # "2023-09-02"
```

**After:**

```graphql
query { me { became_active_at } }  # "2023-09-02T13:22:48.000Z"
```

If your code parses `join_date` as `YYYY-MM-DD`, slice the first 10 characters of `became_active_at` or parse with a full ISO 8601 parser.

## 6. `Query.users` argument rename: `kind` → `user_kind`

<Callout icon="ℹ️" theme="info">
  **Deprecation, not removal.** The legacy `kind`, `newest_first`, and `non_active` arguments (sections 6, 7, and 8) are **deprecated** on `Query.users` starting in `2026-07` and are still deprecated — not removed — in `2026-10`. They continue to work at runtime, so existing queries will not fail schema validation. The schema carries `@deprecated` annotations with replacement reasons, visible via `args(includeDeprecated: true)` or in IDE tooling. A firm removal version has not been announced; migrate off them now so you're ready when one is.
</Callout>

The legacy `kind: UserKind` argument (enum values `all`, `guests`, `non_guests`, `non_pending`) is **deprecated in `2026-07`** with `deprecationReason: "Use user_kind instead."`. Replace with [`user_kind: UserKindFilterInput`](https://developer.monday.com/api-reference/reference/users-other-types#userkindfilterinput).

**Before:**

```graphql
query { users(kind: non_guests, limit: 200) { id name } }
```

**After:**

```graphql
query {
  users(
    user_kind: { not_in: [GUEST] }
    limit: 200
  ) { id name }
}
```

Migration mapping:

| Legacy `kind` value | New `user_kind`                                           |
| :------------------ | :-------------------------------------------------------- |
| `all`               | omit the argument                                         |
| `guests`            | `{ in: [GUEST] }`                                         |
| `non_guests`        | `{ not_in: [GUEST] }`                                     |
| `non_pending`       | *(no direct equivalent — use `status: [ACTIVE]` instead)* |

`UserKindFilter` supports both individual kinds (`ADMIN`, `MEMBER`, `GUEST`, `VIEW_ONLY`, `AGENT_MEMBER`, `PORTAL`) and the `BASIC` group (= admin + member + guest + view\_only), plus API-user kinds. Use `not_in` to exclude values from an expanded `in` set.

## 7. `Query.users` argument: `newest_first` → `sort`

`newest_first` is **deprecated in `2026-07`** with `deprecationReason: "Use sort instead."`. It still works at runtime.

**Before:**

```graphql
query { users(newest_first: true, limit: 50) { id created_at } }
```

**After:**

```graphql
query {
  users(
    sort: [{ field: CREATED_AT, direction: DESC }]
    limit: 50
  ) { id created_at }
}
```

`sort` takes a list of [`UsersSortInput`](https://developer.monday.com/api-reference/reference/users-other-types#userssortinput), so multi-field sorts are supported (`CREATED_AT` is currently the only field).

## 8. `Query.users` argument: `non_active` → `status`

`non_active` is **deprecated in `2026-07`** with `deprecationReason: "Use status instead."`. It still works at runtime.

**Before:**

```graphql
query { users(non_active: true) { id } }      # all non-active users
query { users(non_active: false) { id } }     # (default) active + pending
```

**After:**

```graphql
query { users(status: [INACTIVE]) { id } }
query { users(status: [ACTIVE, PENDING]) { id } }   # (default if omitted)
```

If `status` is omitted, the server defaults to `[ACTIVE, PENDING]` (same as the old `non_active: false` behavior).

## 9. Pagination is now enforced

|                                   | Before `2026-07`       | `2026-07` and later                                           |
| :-------------------------------- | :--------------------- | :------------------------------------------------------------ |
| `users { ... }` (no `limit`)      | returned **all** users | returns **200** users                                         |
| `users(limit: N)` with `N > 1000` | allowed                | **error:** *Limit exceeds the maximum allowed value of 1000.* |

If your code assumed a single call returned the full roster, add explicit pagination:

**Before:**

```graphql
query { users { id email } }
```

**After:**

```graphql
query GetAllUsers($page: Int!) {
  users(
    limit: 1000
    page: $page
    sort: [{ field: CREATED_AT, direction: ASC }]
  ) {
    id
    email
  }
}
```

Loop over `page = 1, 2, 3, …` until the returned array has fewer than `limit` items.

## 10. `Query.users(emails:)` non-null elements

`[String]` → `[String!]`. Ensure you don't pass `null` elements inside the `emails` array — validate input client-side before sending.

## 11. `User` scalar type changes (2026-07)

| Field            | `2026-04` type | `2026-07`+ type    |
| :--------------- | :------------- | :----------------- |
| `birthday`       | `Date`         | `String`           |
| `created_at`     | `Date`         | `ISO8601DateTime!` |
| `utc_hours_diff` | `Int`          | `Float`            |

* `birthday` now ships as a `String`. Treat it as a freeform string; the value is still `YYYY-MM-DD` but the schema no longer guarantees that.
* `created_at` now includes a time component (`2023-09-02T13:22:48.000Z`). If you parse with a `Date`-only parser, truncate to 10 characters first.
* `utc_hours_diff` is a `Float`. Fractional hours (for example, `5.5`, `-3.5`) can now appear.

***

# :white\_check\_mark: Non-breaking additions

You can adopt these at your own pace. They are only available from `2026-07` onward.

## New `User` fields

Safe to add to existing queries once you set the `API-Version: 2026-07` (or later) header.

```graphql
query {
  me {
    id
    account_id              # new
    status                  # new: UserStatus enum
    invitation_method       # new: InvitationMethod enum
    serial_number           # new: Int, nullable
    is_deleted              # new: Boolean!
    became_active_at        # new: ISO8601DateTime
    bb_visitor_id           # new: ID!
    is_email_confirmed      # new: Boolean!
    photo_url { original thumb }
    user_config { kind role_id visibility }
  }
}
```

## New `user_configs` query

```graphql
query {
  user_configs {
    kind
    role_id
    visibility
  }
}
```

Requires `users:read` and user authorization. Returns every user config for the account, sorted by `role_id` ascending. Optional filters: `kinds: [String]`, `visibility: String`.

***

# Migration by version

| You are on           | Minimum target | Do this                                                                                                                                                                                 |
| :------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2025-10` or earlier | `2026-07`      | Everything above plus the [`2026-04` migration](https://developer.monday.com/api-reference/docs/migrating-to-version-2025-04).                                                                                                      |
| `2026-04`            | `2026-07`      | Apply sections 1–11 when you bump the `API-Version` header.                                                                                                                             |
| `2026-07`            | `2026-10`      | No new breaking changes for the user entity itself. Double-check that you've already removed the legacy fields listed in sections 1–5 — they are planned for hard removal in `2026-10`. |

# Testing your migration

1. Set the version header: `API-Version: 2026-07` (or `2026-10`).
2. Run your existing queries. The deprecated `kind`, `newest_first`, and `non_active` arguments still work, so queries using them won't fail — but codegen and IDE tooling will surface `@deprecated` warnings once you regenerate against the new schema. Migrate them per sections 6–8.
3. Add an explicit `limit` + `page` loop wherever you previously called `users { ... }` with no limit — the silent 200-row cap is the most common surprise in `2026-07`.
4. For clients generated from introspection, regenerate against `https://api.monday.com/v2/get_schema?version=2026-07`. If your tooling supports it, pass `includeDeprecated: true` so the deprecated args show up in the dump — the default endpoint omits them.
5. Confirm every hit from the [Quick checklist](#quick-checklist) is addressed before you roll out.
