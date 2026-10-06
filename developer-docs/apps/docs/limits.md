---
updatedAt: 2025-10-23T05:19:20.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Limits

When building an app, it is important to be aware of key limitations to avoid errors and optimize your app's performance. This includes both platform and [API](https://developer.monday.com/api-reference/docs/rate-limits) limits.

# Platform

The following table covers key platform limits:

| Usage                                                                | Limit                                    |
| :------------------------------------------------------------------- | :--------------------------------------- |
| Connected boards per board                                           | 200 boards                               |
| Direct connected items per board (excludes mirror to mirror)         | 10,000 items                             |
| Connected boards per dashboard (basic/standard/pro/enterprise plans) | 1/5/20/50 boards                         |
| Dashboard widgets                                                    | 30 widgets                               |
| Items per dashboard widget                                           | 20,000 items (after filters)             |
| Items per dashboard                                                  | 20,000 items per widget (before filters) |
| Linked items per board                                               | 100,000 items                            |
| Items per board                                                      | 10,000 items                             |
| Subitems per item                                                    | 100 subitems                             |
| Columns per board                                                    | 1,000 columns                            |
| Dropdown labels per column                                           | 500 labels                               |

# API

You can find our API limits documentation [here](https://developer.monday.com/api-reference/docs/rate-limits).
