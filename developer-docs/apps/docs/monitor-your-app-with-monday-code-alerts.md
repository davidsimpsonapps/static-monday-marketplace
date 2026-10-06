---
updatedAt: 2025-10-23T05:03:42.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Monitor your app with monday code alerts

monday code alerts help you proactively monitor backend applications and catch issues before they affect end-users. In just a few steps, you can configure alerts and view them in a centralized monday.com board with context, timestamps, and regional insights.

Using this board, you can build workflows that notify the right people, assign ownership, and integrate with your tools. Doing so helps keep your app running smoothly and ensures more effective incident response.

monday code alerts provide you with:

* Early warnings for performance issues and runtime limit breaches
* An auto-generated centralized alert board with timestamps and regional insights
* Native integrations to trigger Slack notifications, assign alerts, or integrate with external tools
* Developer-friendly technical context with actionable data

# Types of alerts

monday code currently supports three types of alerts:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Alert Type
      </th>

      <th>
        What It Monitors
      </th>

      <th>
        Use Cases
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        HTTP error rate
      </td>

      <td>
        Percentage of HTTP requests that return error status codes (e.g., 4xx, 5xx) within a specific window
      </td>

      <td>
        • Detect sudden spikes in errors<br /> • Monitor API endpoint reliability<br /> • Track overall app health
      </td>
    </tr>

    <tr>
      <td>
        HTTP latency response
      </td>

      <td>
        Percentage of response times that exceed your latency threshold
      </td>

      <td>
        • Monitor the impact of code changes<br /> • Ensure SLA compliance<br /> • Catch performance degradation early
      </td>
    </tr>

    <tr>
      <td>
        Runtime limit
      </td>

      <td>
        [Daily runtime execution limit](https://developer.monday.com/apps/docs/quotas-and-limits#daily-request-execution-limit) quota
      </td>

      <td>
        • Prevent service blocking<br /> • Monitor resource consumption trends<br /> • Plan capacity for high-traffic periods
      </td>
    </tr>
  </tbody>
</Table>

# How to set up alerts

## Create an alert

1. Open your app in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).
2. Navigate to **Host on monday**.
3. Click **Server-side code**.
4. Select the **Alert policies** tab.
5. Click **Create alert**.

## Configure an alert

1. If you don't have an alert board set up, select a workspace to create one in.

<Image align="center" className="border" width="300px" border={true} src="https://files.readme.io/f0968954b95669abd42a0d1f9536bd6e3d1c66f2f3bfb37f0c08c34822c2eea1-Configure_your_alert.png" />

2. Enter a descriptive name.
3. Select the alert type from the *Metric Type* dropdown.
4. Configure the parameters:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Alert Type
      </th>

      <th>
        Description
      </th>

      <th>
        Suggested Configuration
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        HTTP error rate
      </td>

      <td>
        • **Threshold above (%):** Error rate percentage (e.g., 5% means 5 out of 100 requests are errors)<br /> • **Time window (minutes):** The evaluation period
      </td>

      <td>
        • **Threshold above (%):** 1-5%<br /> • **Time window (minutes):** 10-15 minutes
      </td>
    </tr>

    <tr>
      <td>
        HTTP latency response
      </td>

      <td>
         • **Threshold above (ms):** Maximum acceptable response time<br /> • **Percentile:** What percentile of requests can exceed the threshold<br /> • **Time window (minutes):** The evaluation period
      </td>

      <td>
        • **Threshold above (ms):** 2000-5000ms<br /> • **Percentile:** 95%<br /> • **Time window (minutes):** 10 minutes
      </td>
    </tr>

    <tr>
      <td>
        Runtime limit
      </td>

      <td>
        • **Threshold above (%):** Percentage of your daily runtime execution quota consumed<br /> • This limit is based on your app type and seat count. Read the [documentation](https://developer.monday.com/apps/docs/quotas-and-limits#daily-request-execution-limit) to learn how to calculate your limit.
      </td>

      <td>
        • **Threshold above:** 80% of daily runtime
      </td>
    </tr>
  </tbody>
</Table>

### Maintain alerts

* **Turn alerts on/off:** Use the **Active** toggle.
* **Edit existing alerts:** Click on the alert, make the changes, and click **Save**.
* **Delete an alert:** Click on the alert, select **Delete**.

# Best practices

## Responding to alerts

* Acknowledge the alert quickly and update its status to indicate that you're investigating
* Document your findings in the update section of your alert board
* Identify the root cause of the issue to understand why the alert happened
* Update runbooks to record solutions for the next time
* Adjust alert sensitivity based on false positive patterns

## Tuning thresholds

We recommend starting with higher thresholds to reduce noise. You can monitor for 1-2 weeks to establish a baseline and gradually lower them as you identify normal patterns. Be sure to make seasonal adjustments based on business cycles and traffic patterns.

## Investigation strategies

We recommend using the 80/20 approach to focus on the common sources first.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Alert Type
      </th>

      <th>
        First Steps
      </th>

      <th>
        Common Sources
      </th>

      <th>
        Next Steps
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        HTTP error rate
      </td>

      <td>
        Check the alert board for timing and regional patterns
      </td>

      <td>
        • Recent deployments<br /> • DB bottlenecks<br /> • Third-party APIs
      </td>

      <td>
        Review Developer Center logs for error details
      </td>
    </tr>

    <tr>
      <td>
        HTTP latency
      </td>

      <td>
        Identify affected endpoints using the Developer Center monitoring
      </td>

      <td>
        • Slow queries<br /> • Third-party service slowdowns
      </td>

      <td>
        • Review recent code changes<br /> • Optimize queries
      </td>
    </tr>

    <tr>
      <td>
        Runtime limit
      </td>

      <td>
        Review app usage in the Developer Center analytics
      </td>

      <td>
        • Runaway processes or infinite loops<br /> • High-consumption endpoints
      </td>

      <td>
        • Optimize with caching/queries<br /> • Create scaling strategy
      </td>
    </tr>
  </tbody>
</Table>
