---
updatedAt: 2025-10-23T05:03:16.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Manage monday code in the Developer Center

monday code has its own section in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center) where you can easily manage environment variables, secrets, and alerts, monitor your app’s performance, and access logs.

## Server-side code

The *Server-side code* tab in the left-side menu includes the following views for server-side code:

### General tab

Displays helpful commands along with your app’s version and live URLs:

* **Version URL:** A URL tied to a specific version of your app. It updates each time you create a new version.
* **Live URL:** A static URL generated once at least one live version is deployed. You can use this URL to set up [webhooks](https://developer.monday.com/apps/docs/webhooks-1).

### Environment variables tab

Manage, create, and delete environment variables

### Secrets tab

Create new app secrets.

**Note:** You **can't retrieve secrets after creation**, so store them securely when first generated.

### Alert policies tab

Set up and manage real-time alerts for HTTP error rates or latency responses. When thresholds are exceeded, an item is created on your designated alert board. You can integrate your board with tools like Slack or PagerDuty to receive notifications where you'd like!

<Image align="center" className="border" width="600px" border={true} src="https://files.readme.io/8fea9f7-monday_code_alert_policy.png" />

## Client-side code

The *Client-side code* tab in the left-side menu provides useful commands and your app’s version-specific URL for client-side code deployed to monday.com.

## Monitoring

The *Monitoring* tab offers valuable insights into your app’s performance, including:

* Hits
* Latency
* Errors (5xx)
* Error rate (5xx)
* Hits by status
* Hits by path
* Latency by path

You can adjust the time range and interval to review specific periods of activity.

<Image align="center" className="border" width="600px" border={true} src="https://files.readme.io/53530b1-monday_code_monitoring.png" />

## Logs

The *Logs* tab centralizes your app’s HTTP and console logs into one easy-to-access location. You can:

* Filter logs by predefined or custom time ranges
* Search console messages using keywords

<Image align="center" className="border" width="600px" border={true} src="https://files.readme.io/1078685-monday_code_logs.png" />
