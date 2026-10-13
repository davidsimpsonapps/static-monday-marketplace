---
title: "API adds update_teams_board_role and update_users_board_role mutations in 2026-10"
date: 2026-10-13
topic: developer-docs
lede: "The monday.com API now documents two mutations, `update_teams_board_role` and `update_users_board_role`, for changing the board role of teams and users already subscribed to a board. Both are available in API version `2026-10` and later."
---

`update_teams_board_role` takes `board_id`, `team_ids` and `role_name`. It accepts up to 50 teams per call. Teams not already subscribed to the board are not granted access; they are returned in `failed_teams` with an error. Use `add_teams_to_board` first to subscribe a team.

The mutation returns `UpdateTeamsBoardRoleResponse`, with `successful_team_ids` and `failed_teams` (`team_id` and `error`). A matching `update_users_board_role` mutation returns `UpdateUsersBoardRoleResponse`, with `successful_user_ids` and `failed_users`.

For teams, `role_name` accepts `contributor`, `editor` and `viewer`. `assigned_contributor` is not yet supported, and the `member` value of `BoardBasicRoleName`, which is for agent users only, is rejected by `update_teams_board_role`.

Both mutations are also listed in the [release notes](https://developer.monday.com/api-reference/docs/release-notes).
