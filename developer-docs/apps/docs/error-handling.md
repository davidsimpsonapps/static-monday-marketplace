---
updatedAt: 2025-10-23T05:08:24.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Error handling

Report errors so users know something went wrong and how to fix it.

Our framework provides methods to report runtime errors to users. Displaying clear, descriptive error messages when an integration fails makes troubleshooting easier for you and your users.

Your integration has two ways to report errors to monday:

* Sending a severity code in the HTTP response body
* Returning a standard HTTP status code

Users will see reported errors in the *Automation Activity Log*. Depending on the severity, they may also receive notifications or experience disabled automations.

## Severity codes

Severity codes help users understand the type of error and the steps needed to resolve it. We support two severity levels:

* 4000: Medium severity - the automation fails for now, but can run again if addressed
* 6000: High severity - the automation is disabled since it will keep failing

To trigger severity codes, your app must respond with an HTTP status in the 4xx or 5xx range and include a properly structured JSON body.

### When to use severity codes

Use severity levels to reflect whether the automation can potentially succeed in the future.

* Example – Medium Severity (4000): If your automation sends an email based on a column value and the value is invalid (e.g. a malformed email address), return a 4000 severity. The automation can still run in the future if the user corrects the value.
* Example – High Severity (6000): If your automation tries to move an item to a group that no longer exists, return a 6000 severity. Since the group is gone permanently, the automation will always fail and should be disabled.

#### **Response format**

```json Medium severity
// Medium severity 4000

{
"severityCode" : 4000,
"notificationErrorTitle" : "This is the notification title of of 4000",
"notificationErrorDescription" : "This is the notification description of 4000",
"runtimeErrorDescription" : "This is the activity log description of 4000"
}
```
```json High severity
// High severity 6000

{
"severityCode" : 6000,
"notificationErrorTitle" : "This is the notification title of 6000",
"notificationErrorDescription" : "This is the notification description of 6000",
"runtimeErrorDescription" : "This is the activity log description of 6000",
"disableErrorDescription" : "This is the disable message of 6000"
}
```

## HTTP status codes

<br />

If you prefer to communicate errors without severity codes, you can send one of the following status codes in the response. We will then display the corresponding message in the *Activity Log*.

> 🚧
>
> Only severity codes will trigger automation disabling or user notifications.

Supported codes include:

* 401 - UNAUTHORIZED

* 402 - PAYMENT\_REQUIRED

* 403 - FORBIDDEN

* 404 - NOT\_FOUND

* 410 - GONE

* 422 - UNPROCESSABLE\_ENTITY

# What will the user see?

Depending on your error reporting method, users may see one or more of the following:

### Activity log entry

<Image align="center" className="border" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1668792792/Screen_Shot_2022-11-18_at_12.31.06_PM.png" />

### Notification to the Automation creator

<Image align="center" className="border" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1668792766/Screen_Shot_2022-11-18_at_12.31.17_PM.png" />

### Disabled automation with error message

<Image align="center" className="border" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1668792729/Screen_Shot_2022-11-18_at_12.31.29_PM.png" />

# Retry policy

Any non-200 response is considered an error, and our retry policy will apply depending on the endpoint:

| Endpoint                                   | Retry behavior                                  |
| :----------------------------------------- | :---------------------------------------------- |
| Authorization URL                          | User sees your error screen                     |
| Subscribe to custom trigger                | Error displayed in the monday.com UI            |
| Unsubscribe to custom trigger              | Error displayed in the monday.com UI            |
| Custom action run URL                      | Retries for 30 minutes unless 4xx/severity code |
| Remote options URL                         | User sees “Could not load fields”               |
| Remote field definitions (dynamic mapping) | User sees “Could not load fields”               |

<br />

> 📘
>
> Retry logic only applies to endpoints in custom monday apps. Requests through the webhook integration will not be retried.
