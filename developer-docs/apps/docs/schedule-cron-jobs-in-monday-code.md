---
updatedAt: 2026-07-08T07:51:39.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Schedule cron jobs in monday code

The **monday code scheduler** lets you schedule <Glossary>cron</Glossary> jobs that automatically execute on a defined schedule (e.g., every week at 10 AM). To get started, create an endpoint in your backend, configure the job, and the scheduler will handle the execution for you. This is ideal for recurring automations, such as syncing data nightly or generating reports every Friday at 5:00 PM.

# Concepts

The monday code scheduler is a key tool that enables you to create apps with scheduled recurring actions, or to schedule internal jobs (e.g., generating a report).

Each app can have up to **five scheduled jobs per region**:

* Single-region apps: **up to 5 jobs total**
* Multi-region apps (US, EU, AU): **up to 15 jobs total (5 per region, excluding IL)**

<Callout icon="❗️">
  The scheduler is not supported in the new IL region. 
</Callout>

The scheduler is region-specific, so you must specify the region in which it should run when creating a new job. Scheduled jobs **do not automatically replicate** across regions. You must manually configure each job per region, if needed.

# Requirements

* monday apps CLI version [4.7.0](https://www.npmjs.com/package/@mondaycom/apps-cli/v/4.7.0)

# Implementation

## How to create a scheduled job

1. Implement the job logic in your code.
2. Create an endpoint with the `/mndy-cronjob` prefix to trigger the logic. It should be a POST route, as this is the HTTP method used by the cronjob invocation mechanism.
3. [Deploy](https://developer.monday.com/apps/docs/deploy-your-app) your app.
4. Create a new scheduled job using the `mapps scheduler:create` CLI command. When developing your scheduled job endpoint, ensure the route is defined as `/mndy-cronjob/my-endpoint` in your code. In the CLI, however, you only need to pass `my-endpoint`.

```shell Terminal
$ mapps scheduler:create -a APP_ID -s "0 * * * *" -e "my-endpoint" -n "My-scheduled-job" -d "This job will execute hourly." -z us
```

## How to test a scheduled job

### Option 1: Using a temp public endpoint

1. Add a regular public endpoint to your deployment. This endpoint should mimic the internal logic of the job you want to test. Be sure to secure it with some form of authorization so only you can call it to test the scheduled job logic.
2. Once the endpoint works as expected, convert the test endpoint into a scheduled job by:
   1. Adding the `/mndy-cronjob` prefix.
   2. Deploying it to the latest draft version.
   3. Promoting the updated version to live.

### Option 2: Force push deployment for manual testing

1. Add a new scheduled job endpoint to your code. To avoid unintended runs, configure the schedule to a future time (e.g., December 31st, 2050).
2. Force push the code to an existing live app version. This ensures the new scheduled job endpoint is available for automatic invocation.
3. Use `mapps scheduler:run` to manually invoke the job.
4. Once it works as expected, run `mapps scheduler:update` to reconfigure the desired schedule.

## How to manage scheduled jobs

| Task         | Command                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Create       | [`mapps scheduler:create`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulercreate) |
| List         | [`mapps scheduler:list`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerlist)     |
| Update       | [`mapps scheduler:update`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerupdate) |
| Delete       | [`mapps scheduler:delete`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerdelete) |
| Manually run | [`mapps scheduler:run`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerrun)       |

### Monitoring

Scheduled job invocations are monitored like any other public monday code endpoint. They produce HTTP logs and request metrics that are available in the [Logging](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#logs) and [Monitoring](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#monitoring) sections of the Developer Center. Any logs written in your job logic will appear as console logs.

# Troubleshooting

## Errors

Scheduled jobs can be created on any app version, but **can only be invoked on a live version**. If you create a job but don't yet have a live version where the endpoint is available, invocation attempts will result in 404 errors in the [Monitoring](https://developer.monday.com/apps/docs/manage-monday-code-in-the-developer-center#monitoring) section. Successful invocations will start only when a version is promoted to live.
