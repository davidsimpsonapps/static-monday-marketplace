---
title: "`duplicate_item` gains `group_id` and `item_name` arguments in API version 2027-01"
date: 2026-11-12
topic: developer-docs
lede: "The `duplicate_item` mutation accepts two new optional arguments, `group_id` and `item_name`, in API versions `2027-01` and later. They let you place the copy in a chosen group and name it."
---

`group_id` sets the group the new item is added to. It defaults to the original item's group and is not supported for subitems.

`item_name` sets the new item's name. A name different from the original is used as given. If you pass the original name, or no name, the copy still gets the `(copy)` suffix.

See the [items reference](https://developer.monday.com/api-reference/reference/items) for an example mutation.
