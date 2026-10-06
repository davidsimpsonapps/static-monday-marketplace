---
updatedAt: 2026-10-01T09:07:30.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Quotas and limits

Review the resource limits for your monday code instances

monday code limits are designed to maintain system stability while ensuring fair resource allocation for all users. These limits help you manage your app's resource consumption, contributing to optimal performance across the platform.

| Category                      | Limit/specification                             |
| :---------------------------- | :---------------------------------------------- |
| CPU allocation                | 1 virtual CPU                                   |
| Memory allocation             | 512 MiB RAM                                     |
| Concurrent requests           | Up to 80 concurrent requests per instance       |
| Request timeout               | 300 seconds                                     |
| Scaling limit                 | Maximum of 10 instances per region (EU, US, AU) |
| Storage API concurrency limit | 12 requests per second (per JWT token)          |
| Secrets API concurrency limit | 7 requests per second                           |
| Daily runtime execution limit | See the section below\*                         |

# Daily runtime execution limit\*

The daily runtime execution limit restricts the total number of runtime execution minutes your app can consume in a 24-hour sliding window.

## Calculating the daily runtime execution limit

The limit is dynamic and depends on several factors, including the type of app (e.g., private, public, marketplace) and the total number of seats the app is installed on across all accounts. In the case of multi-region deployments, the limit is applied to the combined usage across all regions where your app is deployed.

Runtime execution minutes are calculated based on the actual time your code spends processing requests, not the time that instances are idle. Each request consumes execution time according to how long your code takes to process it. When multiple requests run concurrently within the same instance, their execution times are accumulated in parallel.

### Marketplace apps

All monday code apps listed in the [marketplace](https://developer.monday.com/apps/docs/install-and-share-your-apps#app-marketplace) are subject to the following limits:

| Seats         | Minutes             |
| :------------ | :------------------ |
| First 100     | 1,200 minutes total |
| 101 and above | 12 minutes per seat |

**Example:** If a marketplace app is installed on 50 accounts, each with 500 seats (totaling 25,000 seats), the first 100 seats would allocate 1,200 minutes. The remaining 24,900 would each add 12 minutes, totaling 298,800 minutes. The app’s total daily request execution limit would be 300,000 minutes.

> 1,200 (first 100 seats) + 298,800 (24,900 \* 12) = 300,000 minutes per day

### Public apps

All monday code [public apps](https://developer.monday.com/apps/docs/install-and-share-your-apps#public-apps) (not listed in the marketplace) are subject to the following limits:

| Seats         | Minutes            |
| :------------ | :----------------- |
| First 100     | 600 minutes total  |
| 101 and above | 6 minutes per seat |

**Example**: If a public app is installed on 500 seats, the first 100 seats would allocate 600 minutes. The remaining 400 would each add 6 minutes, totaling 2,400 minutes. The app's total daily request execution limit would be 3,000 minutes.

> 600 (first 100 seats) + 2,400 (400\*6) = 3,000 minutes per day

### Private apps

All monday code [private apps](https://developer.monday.com/apps/docs/install-and-share-your-apps#private-apps) are subject to the following limits:

| Seats         | Minutes              |
| :------------ | :------------------- |
| First 100     | 450 minutes total    |
| 101 and above | 4.5 minutes per seat |

**Example:** If a private app has 125 seats, the first 100 seats would allocate 450 minutes. The remaining 25 seats would each add 4.5 minutes, totaling 112.50 minutes. The app’s total daily request execution limt would be 562.50 minutes.

> 450 (first 100 seats) + 112.50 (25\*4.5) =  562.50 minutes per day

## In practice

### Scenario 1: Can you run 10 instances 24/7?

Not necessarily. You may have 10 instances running continuously, but execution minutes are only consumed when those instances are actively processing requests.

For example, if your daily execution limit is 14,400 minutes and your app processes requests sporadically, you're unlikely to hit the limit. However, if you're processing a high volume of concurrent requests continuously, you could hit the limit much sooner.

### Scenario 2: Multi-region deployment

For multi-region deployments, the daily execution limit is shared across all regions your app is deployed to. If your calculated limit is 14,400 minutes, this applies globally to your entire app, not separately per region. Even if you scale up to 10 instances in each of the three regions (US, EU, and AU), the combined execution minutes across all of them must still stay within the total daily limit.

### Scenario 3: High concurrency impact

High concurrency can drastically accelerate your app's execution minute consumption. For example, if you have 80 concurrent requests, each running for one second, you’ll consume 80 seconds (1.33 minutes) of execution time in just one second of wall clock time. This compounding impact means that apps with heavy concurrent loads can hit their limits much faster than expected.

# Connected app limit

You can connect unlimited marketplace apps and up to 10 private apps to monday code.

<Callout icon="📘" theme="info">
  Need to scale your app? <Anchor label="Contact our support team" target="_blank" href="https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962">Contact our support team</Anchor> to request higher monday app limits.
</Callout>
