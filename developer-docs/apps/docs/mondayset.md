---
updatedAt: 2025-10-23T05:05:06.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday.set

You can use `monday.set` to set up data inside your application. This can only be used in client-side apps.

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
        The type of data that can be set
      </td>

      <td style={{ textAlign: "left" }}>
        <li>`'settings'`: The application settings as configured by the user that installed the app</li><li>`'location'`: The URL location within an app</li>
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        `params`
      </td>

      <td style={{ textAlign: "left" }}>
        Optional parameters for the action
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>
  </tbody>
</Table>

# Returns

A `Promise` that will be `resolved` to the set method response.

# Examples

### Set application settings data

You can update the app's settings by sending an object containing the ID of each settings field and its values. Using this method, you can preconfigure default values for when users first open the app, helping them find value faster.

```javascript
monday.set("settings", {"text":"the new updated value", "numbers": 10}).then(res => ...);
```

In the *Developer Center*, you can configure each field's ID when setting up your board view or widget. There, you can also find the structure of each setting type (e.g., number, color).

<Image align="center" className="border" border={true} src="https://files.readme.io/2b0c947-View_settings.png" />

### Application settings object set for a board view

```json Board view settings example
{
  "text": "textual value",
  "color": "#037f4c", 
  "date": "2022-08-25"
  "checkbox1": false
  "textarea": "line1\nline2\n.....\nline n"
}
```

### Set the query params in an app's URL

```javascript
monday.set("location", { query: { foo: 'bar' } });
// returns the following object { https://test.monday.com/boards/123456789/views/87654321?app[foo]=bar }
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
