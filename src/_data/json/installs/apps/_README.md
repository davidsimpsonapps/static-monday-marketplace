This is a daily archive of installs for each app the latest data is in `./installs.json` and historical data is in `./historical/[YYYY-MM-DD].json`

The raw data is an an object of the following shape:

```
{
    "[app.app_id]": "[no of installs]",
    ...
}
```

It uses `app.app_id` rather than `app.id`.

For each app in the object, we extract a separate file `[app.app_id].json`

```
{
    "appId": "[app.app_id]",
    "history": [
        {
            "date": "2024-12-28",
            "count": "13270"
        },
        ...
    ]    
}
```