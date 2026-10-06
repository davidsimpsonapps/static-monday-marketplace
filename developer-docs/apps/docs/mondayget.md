---
updatedAt: 2025-12-02T20:58:34.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday.get

You can use `monday.get` to retrieve data from the parent monday.com application where your app is currently running. This object can only be used in client-side apps.

# Parameters

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Parameter
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Available types
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        `type`
      </td>

      <td style={{ textAlign: "left" }}>
        The type of requested information
      </td>

      <td style={{ textAlign: "left" }}>
        <ul>
          <li>`'context'`: Information about where this app is currently displayed, depending on the type of feature</li>
          <li>`'settings'`: The application settings as configured by the user that installed the app</li>
          <li>`'itemIds'`: The list of item IDs that are filtered in the current board (or all items if no filters are applied)</li>
          <li>`'sessionToken'`: A JWT token that is decoded with your client secret and can be used as a session token between your app's frontend and backend</li>
          <li>`'filter'`: The state of the search filter</li>
          <li>`'location'`: The URL location within an app</li>
        </ul>
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `params`
      </td>

      <td style={{ textAlign: "left" }}>
        Reserved for future use
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>
  </tbody>
</Table>

# Returns

A `Promise` that will be resolved with the requested data.

# Examples

## Retrieving your session token

Every time your app loads, we will generate a session token signed with your app’s client secret. Use the `sessionToken` type to retrieve the token. Your frontend should use this as the primary access to the current subscription.

```javascript
monday.get('sessionToken')
.then((token) => { 
  // send token to backend
  // On backend, call jwt.verify(token.data, 'MY_CLIENT_SECRET') 
}
```

### Token structure

```json
{
  "exp": "2023-12-01T00:00:00Z",
  "dat": {
    "account_id": 1234567890,
    "user_id": 9876543210
  }
}
```

## Requesting context and settings data

```javascript
monday.get("settings").then(res => ...);
monday.get("context").then(res => ...);
```

### Sample context objects for each feature type

```json AI assistant - Main menu header
{
  "themeConfig": { // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "name": "crm-product-theme", 
    "colors": {
      "light": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#bee3e8",
        "primary-selected-hover-color": "#d4ebef",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "dark": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "black": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      }
    }
  },
  "location": "boardMainMenuHeader",
  "locationContext": { "boardId": 4213911112, "workspaceId": 2581779 },
  "appFeatureId": 10330064,
  "withExternalWidth": false,
  "withHeaderPadding": true,
  "boardId": 4213911112,
  "workspaceId": 2581779,
  "theme": "light", // or "dark" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": { "id": "1233" },
  "user": {
    "id": "28659824",
    "isAdmin": false,
    "isGuest": false,
    "isViewOnly": false,
    "countryCode": "IL",
    "currentLanguage": "en",
    "timeFormat": "12H",
    "timeZoneOffset": 2
  },
  "region": "use1",
  "app": { "id": 10089476, "clientId": "78643ruyagduyg743tyr812uygd74" },
  "appVersion": {
    "id": 10124592,
    "name": "context printer",
    "status": "draft",
    "type": "major",
    "versionData": { "major": 1, "minor": 0, "patch": 0, "type": "major" },
  	"mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
    }, 
  "appFeature": {
    "type": "AppFeatureAiBoardMainMenuHeader",
    "name": "context printer - v1.0.0"
  }
}
```
```json Board menu feature - Board item menu
{
  "themeConfig": { // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "name": "crm-product-theme", 
    "colors": {
      "light": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#bee3e8",
        "primary-selected-hover-color": "#d4ebef",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "dark": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "black": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      }
    }
  },
  "boardId": 4213911112,
  "pulseId": 4213911289,
  "itemId": 4213911289,
  "theme": "light", // or "dark" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": { "id": "1233" },
  "user": {
    "id": "28659824",
    "isAdmin": false,
    "isGuest": false,
    "isViewOnly": false,
    "countryCode": "IL",
    "currentLanguage": "en",
    "timeFormat": "12H",
    "timeZoneOffset": 2
  },
  "region": "use1",
  "app": { "id": 10089476, "clientId": "78643ruyagduyg743tyr812uygd74" },
  "appVersion": {
    "id": 10124592,
    "name": "context printer",
    "status": "draft",
    "type": "major",
    "versionData": { "major": 1, "minor": 0, "patch": 0, "type": "major" },
    "mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
    }, 
  "appFeature": {
    "type": "AppFeatureItemMenuAction",
    "name": "context printer - v1.0.0"
  }
}
```
```json Mobile board view
{
  "method": "get",
  "type": "context",
  "data": {
    "themeConfig": {}, // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "theme": "light", // or "dark" or "black"
    "account": {
      "id": "5"
    },
    "user": {
      "id": "28659824",
      "isAdmin": false,
      "isGuest": false,
      "isViewOnly": false,
      "countryCode": "US",
      "currentLanguage": "en",
      "timeFormat": "12H", // or 24H
      "timeZoneOffset": 2 // timezone offset based on GMT
    },
    "region": "use1", // availability zone ID
    "boardId": 4213911112, // unique board ID
    "boardIds": [ // list of connected boards
      4213911111
    ],
    "boardViewId": 122234064, // unique board view ID
    "viewMode": "mobile", // not available for item views
    "instanceId": 122234064, // unique instance ID for the feature on the board
    "instanceType": "board_view", // app feature type
    "mode": "mobile", 
    "app": {
      "id": 10089476,
      "clientId": "78643ruyagduyg743tyr812uygd74"
    },
    "appVersion": {
      "id": 10124592,
      "name": "Monday SDK Mobile Dev Playground",
      "status": "live",
      "type": "minor",
			"mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app", // used only for monday code apps; specifies the region-based hosting URL for server-side code
      "versionData": {
        "major": 1,
        "minor": 0,
        "patch": 0,
        "number": 31,
        "type": "major",
        "displayNumber": "v31"
      }
    },
    "appFeature": {
      "type": "AppFeatureBoardView",
      "name": "Monday SDK - board view"
    },
    "permissions": {
      "approvedScopes": [
        "me:read",
        "boards:read",
        "boards:write",
        "docs:read",
        "docs:write",
        "workspaces:read",
        "workspaces:write",
        "users:read",
        "users:write",
        "account:read",
        "notifications:write",
        "updates:read",
        "updates:write",
        "assets:read",
        "tags:read",
        "teams:read",
        "teams:write",
        "webhooks:write",
        "webhooks:read"
      ],
      "requiredScopes": [
        "me:read",
        "boards:read",
        "boards:write",
        "docs:read",
        "docs:write",
        "workspaces:read",
        "workspaces:write",
        "users:read",
        "users:write",
        "account:read",
        "notifications:write",
        "updates:read",
        "updates:write",
        "assets:read",
        "tags:read",
        "teams:read",
        "teams:write",
        "webhooks:write",
        "webhooks:read"
      ]
    }
  },
  "requestId": "ABCD"
}
```
```json Custom object
{
  "themeConfig": { // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "name": "crm-product-theme", 
    "colors": {
      "light": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#bee3e8",
        "primary-selected-hover-color": "#d4ebef",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "dark": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "black": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      }
    }
  },
  "boardId": 5562164652,
  "boardIds": [5562164652],
  "workspaceId": 2581779,
  "appFeatureId": 10330058,
  "instanceId": 5562164652,
  "instanceType": "object_view",
  "isFullScreen": false,
  "isPresentingMode": false,
  "objectPermissions": "edit",
  "isFirstLevelControlPinned": true,
  "isSlidePanelOpen": false,
  "boardLoadingState": 10,
  "theme": "light", // or "dark" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": { "id": "1233" },
  "user": {
    "id": "28659824",
    "isAdmin": false,
    "isGuest": false,
    "isViewOnly": false,
    "countryCode": "IL",
    "currentLanguage": "en",
    "timeFormat": "12H",
    "timeZoneOffset": 2
  },
  "region": "use1",
  "app": { "id": 10089476, "clientId": "78643ruyagduyg743tyr812uygd74" },
  "appVersion": {
    "id": 10124592,
    "name": "context printer",
    "status": "draft",
    "type": "major",
    "versionData": { "major": 1, "minor": 0, "patch": 0, "type": "major" },
    "mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
  },
  "appFeature": {
    "type": "AppFeatureObject",
    "name": "context printer - v1.0.0"
  }
}
```
```json Dashboard widget
{
  "themeConfig": { // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "name": "crm-product-theme", 
  	"colors": {
      "light": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#bee3e8",
        "primary-selected-hover-color": "#d4ebef",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "dark": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "black": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      }
    }
  },
  "boardIds": [4213911112], // list of connected boards
  "widgetId": 302536002,
  "viewMode": "widget",
  "editMode": false, // or true
  "instanceId": 302536002,
  "instanceType": "dashboard_widget", // feature type
  "theme": "light", // or "dark" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": { "id": "1233" }, 
  "user": {
    "id": "28659824", 
    "isAdmin": false, // or true
    "isGuest": false, // or true
    "isViewOnly": false, // or true
    "countryCode": "IL",
    "currentLanguage": "en",
    "timeFormat": "12H", // or "24H"
    "timeZoneOffset": 2 // timezone offset based on GMT
  },
  "region": "use1", // availability zone ID
  "app": { "id": 10089476, "clientId": "78643ruyagduyg743tyr812uygd74" }, 
  "appVersion": {
    "id": 10124592, 
    "name": "context printer", 
    "status": "draft", // or "live"
    "type": "major", // or "minor"
    "versionData": { "major": 1, "minor": 0, "patch": 0, "type": "major" },
    "mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
  },
  "appFeature": {
    "type": "AppFeatureDashboardWidget",
    "name": "context printer - v1.0.0"
  }
}
```
```json Doc action
{
  "themeConfig": { // may be "undefined" if the default theme is used, defines the color scheme and styling configuration for the app
    "name": "crm-product-theme", 
    "colors": {
      "light": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#bee3e8",
        "primary-selected-hover-color": "#d4ebef",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "dark": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      },
      "black": {
        "primary-color": "#007f9b",
        "primary-hover-color": "#006278",
        "primary-selected-color": "#004858",
        "primary-selected-hover-color": "#003844",
        "brand-colors": {
          "brand-color": "#007f9b",
          "brand-hover-color": "#006278",
          "text-color-on-brand": "#ffffff"
        }
      }
    }
  },
  "location": "docActionQuickStart",
  "locationContext": {
    "docId": 9230477,
    "objectId": 5562213859,
    "workspaceId": 2581779,
    "additionalSdkMethodsList": ["addMultiBlocksFromHtml", "addMultiBlocks"]
  },
  "appFeatureId": 10330068,
  "withExternalWidth": false,
  "withHeaderPadding": true,
  "docId": 9230477,
  "objectId": 5562213859,
  "workspaceId": 2581779,
  "additionalSdkMethodsList": ["addMultiBlocksFromHtml", "addMultiBlocks"],
  "theme": "light", // or "dark" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": { "id": "1233" },
  "user": {
    "id": "28659824",
    "isAdmin": false,
    "isGuest": false,
    "isViewOnly": false,
    "countryCode": "IL",
    "currentLanguage": "en",
    "timeFormat": "12H",
    "timeZoneOffset": 2
  },
  "region": "use1",
  "app": { "id": 10089476, "clientId": "78643ruyagduyg743tyr812uygd74" },
  "appVersion": {
    "id": 10124592,
    "name": "context printer",
    "status": "draft",
    "type": "major",
    "versionData": { "major": 1, "minor": 0, "patch": 0, "type": "major" },
    "mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
  },
  "appFeature": {
    "type": "AppFeatureAiDocQuickStart",
    "name": "context printer - v1.0.0"
  }
}
```
```json Item view
{
  "theme": "dark", // or "light" or "black"
  "subscription": { // app subscription object for marketplace app
    "plan_id": "5",
    "renewal_date": "2023-07-10T00:00:00+00:00",
    "is_trial": false,
    "billing_period": "monthly",
    "days_left": 14,
    "pricing_version": 5,
    "max_units": 100 // maximum number of seats allowed for seat-based plans, null for feature-based plans
  },
  "account": {
    "id": "654646" // unique account ID
  },
  "user": {
    "id": "65464", // unique user ID
    "isAdmin": false, // or true 
    "isGuest": false, // or true 
    "isViewOnly": false, // or true
    "countryCode": "IL", // user's two-letter country code
    "currentLanguage": "en", // user's default language
    "timeFormat": "24H", // or "12H"
    "timeZoneOffset": 3 // time zone offset based on GMT
  },
  "region": "use1", // availability zone ID
  "productKind": "core",
  "app": {
    "id": 64541082, // unique app ID
    "clientId": "d5be5bbc7re646g76b9988a6ad64d780" // unique client ID
  },
  "appVersion": {
    "id": 6458043, // unique app version ID
    "name": "New App", // name of the app's current version
    "status": "draft", // or "live"
    "type": "major", // or "minor"
    "versionData": {
      "major": 1, // version number
      "minor": 0, // version number
      "patch": 0, // patch number 
      "type": "major" // or "minor"
    },
    "mondayCodeHostingUrl": "https://b325b-service-25854030-b5796b91.us.monday.app" // used only for monday code apps; specifies the region-based hosting URL for server-side code
  },
  "workspaceId": 1350535, // unique workspace ID
  "boardId": 6456619824, // unique board ID
  "boardIds": [
    6454619824 // list of connected boards
  ],
  "itemId": 64564519872, // unique item ID
  "instanceId": 65461164, // unique instance ID for the feature on the board
  "instanceType": "item_view" // feature type
}
```

## Requesting the list of items currently in view on the board

Use the `itemIds` type to return the items that are currently visible on the board. If the user uses the board filter to reduce the records on the board, this method will return a list of items that satisfy this filter.

```javascript
monday.get("itemIds").then(res => console.log(res));
// => [234234, 1114564, 2324234, 6763375, 5726567]
```

## Getting the search term from the board search

Use the `filter` type to return the value that the user entered into the board search.

```javascript
monday.get("filter")
  .then(res => console.log(res))
// => { "method":"get", "type":"filter", "data": { "term":"search this" }, "requestId":"vjt8nqrd8" }
```

## Getting the URL location within an app

The SDK allows you to get a location value inside an app and returns the href, query, and search. You can also use the `monday.listen("location")` <a href="https://developer.monday.com/apps/docs/mondaylisten#listen-to-the-url-location-within-an-app" target="_blank">SDK method</a> to listen to the location value.

```javascript
monday.get("location")
  .then(res => console.log(res))
// => { "method":"get", "type":"location", "data": { "href": "https://monday.monday.com/boards/123456789/views/87654321", "query": { "foo": "bar" }, "search": "app[foo]=bar" }
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
