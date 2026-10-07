---
updatedAt: 2026-10-06T13:31:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Making your first request

# Setting up a monday.com account

The first step is to sign up and create a trial <a href="https://auth.monday.com/users/sign_up_new?source=web_main&origin=hp_fullbg_page_header#soft_signup_from_step" target="_blank">account</a>. For building and testing apps or API integrations, use a [developer account](https://developer.monday.com/api-reference/docs/developer-sandbox) ([sign up](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step)). If you already have a monday.com account, skip to the next step!

# Enable Developer mode

*Developer mode* is a valuable tool that makes developing with monday easier by exposing template IDs, column IDs, doc IDs, and more. It allows you to easily retrieve these IDs, which many methods in our API require. Follow these steps to enable it:

1. Click on your profile picture in the top right corner of your monday account.
2. Select **monday.labs**.
3. Type *Developer mode* in the search bar.
4. Click **Activate** and close the modal.
5. Wait for the page to refresh.
6. Refresh the page and reopen your profile menu.

<img src="https://res.cloudinary.com/monday-platform-dev/image/upload/v1686676981/Dev_Mode.gif" />

# Authenticating with the API

After setting up your monday.com account, you must authenticate with an Access Token. To learn about how your apps should authenticate with our API, check out our <a href="https://developer.monday.com/api-reference/docs/authentication" target="_blank">authentication documentation</a>.

# Using the API

After authenticating your app, you're ready to start using the API! If you’re new to monday.com, it’s best to start by learning the basics of the platform in our <a href="https://support.monday.com/hc/en-us/articles/115005305649-How-to-get-started-with-monday-com" target="_blank">Help Center</a>.

If you are already familiar with the monday.com building blocks, you can explore our GraphQL schema <a href="https://api.monday.com/v2/get_schema" target="_blank">here</a> or in our <a href="https://monday.com/developers/v2/try-it-yourself" target="_blank">API playground</a>.

GraphQL APIs use a single endpoint for all operations (unlike REST APIs). Our API endpoint is:\
`https://api.monday.com/v2`

Requests to the API should follow these rules:

* POST request with a JSON-formatted body
* Access token must be sent in the `Authorization` header. Learn more here: [Authentication](https://developer.monday.com/api-reference/docs/authentication)
* All queries (including mutations) should be sent with the `query` key in your JSON body
* Optional variables should use the `variables` key
* `Content-Type` header must be `application/json` unless you're uploading [Files](https://developer.monday.com/api-reference/docs/files)
* `API-Version` header should be used to call a specific [API version](https://developer.monday.com/api-reference/docs/api-versioning#using-the-api-version-header-in-an-http-request)

Your JSON request body should look like this:

```json GraphQL
{
   "query": "query {...}", 
   "variables": { "var1": "value1", "var2": "value2", ... }
}
```

## Examples

Below are some examples of how to access the monday.com API using different languages:

```curl cURL
curl --location 'https://api.monday.com/v2/' \
--header 'Authorization:YOUR_API_KEY_HERE' \
--header 'API-Version: 2023-07' \
--header 'Content-Type: application/json' \
--data '{"query":"query { boards (ids: 1234567890) {name}}"}'
```
```curl cURL (Windows)
curl -X POST -H "Content-Type:application/json" -H "Authorization:YOUR_API_KEY_HERE" -H "API-Version:2023-07" -d "{\"query\":\"query{boards(ids:1234567890){name}}\"}" "https://api.monday.com/v2/"
```
```javascript
fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'YOUR_API_KEY_HERE',
    'API-Version' : '2023-04'
   },
   body: JSON.stringify({
     'query' : 'query{boards (limit:1) {id name} }'
   })
  });
```
```php
<?php
$token = 'YOUR_TOKEN_HERE';
$apiUrl = 'https://api.monday.com/v2';
$headers = ['Content-Type: application/json', 'Authorization: ' . $token, 'API-version' : 2023-04];

$query = 'query { boards (limit:1) {id name} }';
$data = @file_get_contents($apiUrl, false, stream_context_create([
  'http' => [
    'method' => 'POST',
    'header' => $headers,
    'content' => json_encode(['query' => $query]),
  ]
]));
$responseContent = json_decode($data, true);

echo json_encode($responseContent);
?>
```
```python
import requests
import json

apiKey = "YOUR_API_KEY_HERE"
apiUrl = "https://api.monday.com/v2"
headers = {"Authorization" : apiKey, "API-Version" : "2023-04"}

query2 = 'query { boards (limit:1) {id name} }'
data = {'query' : query2}

r = requests.post(url=apiUrl, json=data, headers=headers)
```

Below is an example of what the data returned looks

```json GraphQL
{
  "data": {
    "boards": [
      {
        "id": "12345678",
        "name": "My Amazing CRM Board"
      }
    ]
  },
  "account_id": 98765
}
```
