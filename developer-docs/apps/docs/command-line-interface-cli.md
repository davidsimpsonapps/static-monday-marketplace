---
updatedAt: 2026-01-06T16:00:50.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Command line interface (CLI)

The monday CLI enables you to interact with the apps framework using a set of predefined commands to execute various operations. This document explains how to install the CLI and guides you through the supported commands. Alternatively, you can also access the CLI directly [here](https://www.npmjs.com/package/@mondaycom/apps-cli?activeTab=readme).

# Installation

To start using the CLI, you must first install it using the following command:

```shell Terminal
$ npm install -g @mondaycom/apps-cli
```

After installing the CLI, use the [`mapps init`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-init) command to add your [API token](https://developer.monday.com/api-reference/docs/authentication#accessing-api-tokens):

```shell Terminal
$ mapps init -t <SECRET_TOKEN>
```

# Commands

* [`mapps api:generate`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-apigenerate)
* [`mapps app-features:build`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-app-featuresbuild)
* [`mapps app-features:create`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-app-featurescreate)
* [`mapps app-features:list`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-app-featureslist)
* [`mapps app-version:builds`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-app-versionbuilds)
* [`mapps app-version:list`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-app-versionlist)
* [`mapps app:create`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-appcreate)
* [`mapps app:deploy`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-appdeploy)
* [`mapps app:list`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-applist)
* [`mapps app:promote`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-apppromote)
* [`mapps app:scaffold [DESTINATION] [PROJECT]`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-appscaffold-destination-project)
* [`mapps autocomplete [SHELL]`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-autocomplete-shell)
* [`mapps code:env`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codeenv)
* [`mapps code:logs`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codelogs)
* [`mapps code:push`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)
* [`mapps code:report`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codereport)
* [`mapps code:secret`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codesecret)
* [`mapps code:status`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codestatus)
* [`mapps database:connection-string`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-databaseconnection-string)
* [`mapps help [COMMANDS]`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-help-commands)
* [`mapps init`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-init)
* [`mapps manifest:export`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-manifestexport)
* [`mapps manifest:import`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-manifestimport)
* [`mapps scheduler:create`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulercreate)
* [`mapps scheduler:delete`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerdelete)
* [`mapps scheduler:list`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerlist)
* [`mapps scheduler:run`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerrun)
* [`mapps scheduler:update`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-schedulerupdate)
* [`mapps storage:export`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-storageexport)
* [`mapps storage:remove-data`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-storageremove-data)
* [`mapps storage:search`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-storagesearch)
* [`mapps tunnel:create`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-tunnelcreate)

## Global flags

The following global flags are optional and can be used on any command.

| Global flag       | Description                           |
| :---------------- | :------------------------------------ |
| `--print-command` | Prints the command that was executed. |
| `--verbose`       | Prints advanced logs.                 |

## `mapps api:generate`

The `mapps api:generate` command prepares your environment for custom query development by creating all necessary files and scripts. Make sure to run it from your root directory!

### Example

```shell Terminal
$ mapps api:generate
```

## `mapps app-features:build`

The `mapps app-features:build` command creates a new app feature build. **Please note** that it currently only supports custom URL or monday code build types.

### Flags

| Short Flag | Long Flag        | Description                                          |
| :--------- | :--------------- | :--------------------------------------------------- |
| `-a`       | `--appId`        | The app's unique identifier.                         |
| `-d`       | `--appFeatureId` | The app feature's unique identifier.                 |
| `-i`       | `--appVersionId` | The app version's unique identifier.                 |
| `-t`       | `--buildType`    | The build type: `custom_url` or `monday_code`.       |
| `-u`       | `--customUrl`    | The custom URL for your app's build (if applicable). |

### Example

```shell Terminal
$ mapps app-features:build 
// or
$ mapps app-features:build -a 123456789 -i 987654321 -d 17654321 -t custom_url -u https://www.test.com
// or 
$ mapps app-features:build -a 123456789 -i 987654321 -d 17654321 -t monday_code -u /triggers
```

## `mapps app-features:create`

The `mapps app-features:create` command creates a new app feature.

### Flags

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Short Flag
      </th>

      <th>
        Long Flag
      </th>

      <th>
        Description
      </th>

      <th>
        Accepted values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `-a`
      </td>

      <td>
        `--appId`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        `-i`
      </td>

      <td>
        `--appVersionId`
      </td>

      <td>
        The app version's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        `-n`
      </td>

      <td>
        `--featureName`
      </td>

      <td>
        The feature's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        `-t`
      </td>

      <td>
        `--featureType`
      </td>

      <td>
        The feature's type.
      </td>

      <td>
        * AppFeatureBoardView
        * AppFeatureAiBoardMainMenuHeader
        * AppFeatureDashboardWidget
        * AppFeatureItemMenuAction
        * AppFeatureItemBatchAction
        * AppFeatureGroupMenuAction
        * AppFeatureObject
        * AppFeatureWorkspaceView
        * AppFeatureItemView
        * AppFeatureAiDocQuickStart
        * AppFeatureAiDocTopBar
        * AppFeatureAiDocSlashCommand
        * AppFeatureDocActions
        * AppFeatureIntegration
        * AppFeatureProductView
      </td>
    </tr>
  </tbody>
</Table>

## `mapps app-features:list`

The `mapps app-features:list` command lists all features for a specific app version.

### Flags

| Short Flag | Long Flag        | Description                          |
| :--------- | :--------------- | :----------------------------------- |
| `-a`       | `-appId`         | The app's unique identifier.         |
| `-i`       | `--appVersionId` | The app version's unique identifier. |

### Example

```shell Terminal
$ mapps app-features:list 
// or 
$ mapps app-features:list -a 123456789 -i 987654321
```

## `mapps app-version:builds`

The `mapps app-version:builds` command lists all builds for a specific app version.

### Flags

| Short Flag | Long Flag        | Description                      |
| :--------- | :--------------- | :------------------------------- |
| `-i`       | `--appVersionId` | The version's unique identifier. |

```shell Terminal
$ mapps app-version:builds -t 987654321
```

## `mapps app-version:list`

The `mapps app-version:list` command lists all versions for a particular app.

### Flags

| Short Flag | Long Flag | Description                  |
| :--------- | :-------- | :--------------------------- |
| `-i`       | `--appId` | The app's unique identifier. |

### Example

```shell Terminal
$ mapps app-version:list -i 1234567890
```

## `mapps app:create`

The `mapps app:create` command creates an app.

### Flags

| Short Flag | Long Flag     | Description                         |
| :--------- | :------------ | :---------------------------------- |
| `-d`       | `--targetDir` | The directory to create the app in. |
| `-n`       | `--name`      | The new app's name.                 |

### Example

```shell Terminal
$ mapps app:create -n NEW_APP_NAME
```

## `mapps app:deploy`

The `mapps app:deploy` command deploys an app using a manifest file.

### Flags

| Short Flag | Long Flag         | Description                                                                    |
| :--------- | :---------------- | :----------------------------------------------------------------------------- |
| `-a`       | `--appId`         | The app's unique identifier.                                                   |
| `-d`       | `--directoryPath` | The project's directory path. If excluded, the working directory will be used. |
| `-f`       | `--force`         | Force push to the latest version (draft or live).                              |
| `-v`       | `--appVersionId`  | The version's unique identifier.                                               |
| `-z`       | `--region`        | The region to use: `us`, `au`, `eu`, or `il`.                                  |

### Example

```shell Terminal
$ mapps app:deploy 
```

## `mapps app:list`

The `mapps app:list` command lists all apps for a specific user.

### Example

```shell Terminal
$ mapps app:list
```

## `mapps app:promote`

The `mapps app:promote` command promotes an app's draft version to live.

### Flags

| Short Flag | Long Flag        | Description                         |
| :--------- | :--------------- | :---------------------------------- |
| `-a`       | `--appId`        | The app's unique identifier.        |
| `-i`       | `--appVersionId` | The app version's unique identifier |

### Example

```shell Terminal
$ mapps app:promote -i <APP_VERSION_ID> -a <APP_ID>
```

## `mapps app:scaffold [DESTINATION] [PROJECT]`

The `mapps app:scaffold [DESTINATION] [PROJECT]` command scaffolds a monday app from a template, installs dependencies, and starts the project automatically.

### Arguments

| Argument    | Description                                           |
| :---------- | :---------------------------------------------------- |
| DESTINATION | The destination directory for the scaffolded project. |
| PROJECT     | The name of the template project to scaffold.         |

### Flags

| Short Flag | Long Flag         | Description                                                | Notes          |
| :--------- | :---------------- | :--------------------------------------------------------- | :------------- |
| `-c`       | `--command`       | The npm script command to run after installation.          | Default: start |
| `-s`       | `--signingSecret` | The monday.com signing secret used for .env configuration. |                |

### Example

```shell Terminal
$ mapps app:scaffold ./my-app slack-node --signingSecret YOUR_SECRET
```

## `mapps autocomplete [SHELL]`

The `mapps autocomplete [SHELL]` command displays the autocomplete installation instructions.

### Arguments

| Argument | Description                                     |
| :------- | :---------------------------------------------- |
| SHELL    | The shell type: `zsh`, `bash`, or `powershell`. |

### Flags

| Short Flag | Long Flag         | Description                                            |
| :--------- | :---------------- | :----------------------------------------------------- |
| `-r`       | `--refresh-cache` | Refreshes the cache (ignores displaying instructions). |

### Example

```shell Terminal
$ mapps autocomplete bash
```

## `mapps code:env`

The `mapps code:env` command manages environment variables for your app hosted on monday code.

### Flags

| Short Flag | Long Flag  | Description                                          |
| :--------- | :--------- | :--------------------------------------------------- |
| `-i`       | `--appId`  | The app's ID.                                        |
| `-k`       | `--key`    | The variable key (required for `set` and `delete`).  |
| `-m`       | `--mode`   | The management mode: `list-keys`, `set`, or`delete`. |
| `-v`       | `--value`  | The variable value (required for `set`).             |
| `-z`       | `--region` | The region to use: `us`, `au`, `eu`, or `il`.        |

### Example

```shell Terminal
$ mapps code:env -m set -k <KEY> -v <VALUE>
```

## `mapps code:logs`

The `mapps code:logs` command streams logs.

### Flags

| Short Flag | Long Flag             | Description                                                                        |
| :--------- | :-------------------- | :--------------------------------------------------------------------------------- |
| `-e`       | `--logsEndDate`       | The log's end date (e.g. MM/DD/YYYY HH:mm). Only supported for `history` events.   |
| `-f`       | `--logsStartDate`     | The log's start date (e.g. MM/DD/YYYY HH:mm). Only supported for `history` events. |
| `-i`       | `--appVersionId`      | The app's version ID.                                                              |
| `-r`       | `--logSearchFromText` | The regex text to search the logs for. Only supported for `live` events.           |
| `-s`       | `--eventSource`       | The log's source: `live` (live events) or `history` (past events).                 |
| `-t`       | `--logsType`          | The log's type: `http` (http events) or `console` (stdout).                        |
| `-z`       | `--region`            | The region to use: `us`, `au`, `eu`, or `il`.                                      |

### Example

```shell Terminal
$ mapps code:logs -i <APP_VERSION_ID> -t <LOGS_TYPE>
```

## `mapps code:push`

The `mapps code:push` command pushes your project to be hosted on monday.com's infrastructure.

### Flags

| Short Flag | Long Flag         | Description                                                                    | Notes                                                                                                                                  |
| :--------- | :---------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `-a`       | `--appId`         | The app's ID.                                                                  |                                                                                                                                        |
| `-c`       | `--client-side`   | Pushes client-side code to monday.com (4.6.0 and above).                       | Uploads code to our CDN for faster load times and reduced latency (recommended). The directory must include a root-level `index.html`. |
| `-d`       | `--directoryPath` | The project's directory path. If excluded, the working directory will be used. | When using a bundler, ensure the directory path is the build directory (e.g.,"./dist").                                                |
| `-f`       | `--force`         | Force push to the latest version (draft or live).                              |                                                                                                                                        |
| `-i`       | `--appVersionId`  | The app's version ID.                                                          |                                                                                                                                        |
| `-s`       | `--security-scan` | Run a security scan to find dependency vulnerabilities during code deployment. |                                                                                                                                        |
| `-z`       | `--region`        | The region to use: `us`, `au`, `eu`, or `il`.                                  |                                                                                                                                        |

### Example

```shell Terminal
$ mapps code:push -d <PROJECT BUILD DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH>
```

## `mapps code:report`

The `mapps code:report` command gets a security scan report for a monday code deployment.

### Flags

| Short Flag | Long Flag        | Description                                   | Notes                        |
| :--------- | :--------------- | :-------------------------------------------- | :--------------------------- |
| `-d`       | `--outputDir`    | The directory to save the report to.          | Required with the `-o` flag. |
| `-i`       | `--appVersionId` | The app's version ID.                         |                              |
| `-o`       | `--output`       | Saves the full report as a JSON file.         |                              |
| `-z`       | `--region`       | The region to use: `us`, `au`, `eu`, or `il`. |                              |

### Example

```shell Terminal
$ mapps code:report -i APP_VERSION_ID -o -d /path/to/directory
```

## `mapps code:secret`

The `mapps code:secret` command manages secret variables for your app hosted on monday-code. It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag  | Description                                           | Notes                            |
| :--------- | :--------- | :---------------------------------------------------- | :------------------------------- |
| `-i`       | `-appId`   | The app's ID.                                         |                                  |
| `-k`       | `--key`    | The variable key.                                     | Required for `set` and `delete`. |
| `-m`       | `--mode`   | The management mode: `list-keys`, `set`, or `delete`. |                                  |
| `-v`       | `--value`  | The variable value.                                   | Required for `set`.              |
| `-z`       | `--region` | The region to use: `us`, `au`, `eu`, or `il`.         |                                  |

### Example

```shell Terminal
$ mapps code:secret -m set -k <KEY> -v <VALUE>
```

## `mapps code:status`

The `mapps code:status` command provides the status of a specific project hosted on monday-code. It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag        | Description                                   |
| :--------- | :--------------- | :-------------------------------------------- |
| `-i`       | `--appVersionId` | The app's version ID.                         |
| `-z`       | `--region`       | The region to use: `us`, `au`, `eu`, or `il`. |

### Example

```shell Terminal
$ mapps code:status -i <APP_VERSION_ID>
```

## `mapps database:connection-string`

The `mapps database:connection-string` command gets the connection string for your app database.

### Flags

| Short Flag | Long Flag | Description   |
| :--------- | :-------- | :------------ |
| `-a`       | `--appId` | The app's ID. |

### Example

```shell Terminal
$ mapps database:connection-string -a APP_ID
```

## `mapps help [COMMANDS]`

The `mapps help [COMMANDS]` command displays help for mapps.

### Arguments

| Argument   | Description                   |
| :--------- | :---------------------------- |
| `COMMANDS` | The command to show help for. |

### Flags

| Short Flag | Long Flag           | Description                                 |
| :--------- | :------------------ | :------------------------------------------ |
| `-n`       | `--nested-commands` | Includes all nested commands in the output. |

### Example

```shell Terminal
$ mapps help [COMMANDS] [-n]
```

## `mapps init`

The `mapps init` command initializes the mapps config file (i.e., ".mappsrc"). You can use this command to add your [API token](https://developer.monday.com/api-reference/docs/authentication#accessing-api-tokens) to access the CLI.

### Flags

| Short Flag | Long Flag | Description                                                                                                                                                          |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-l`       | `--local` | Creates the configuration file locally in the current working directory of the project. Use this if you are using different access tokens for each of your projects. |
| `-t`       | `--token` | The [API access token](https://developer.monday.com/api-reference/docs/authentication#accessing-api-tokens).                                                         |

### Example

```shell Terminal
$ mapps init -t <SECRET_TOKEN>
```

## `mapps manifest:export`

The `mapps manifest:export` command exports an app manifest.

### Flags

| Short Flag | Long Flag        | Description                                    |
| :--------- | :--------------- | :--------------------------------------------- |
| `-a`       | `--appId`        | The app's ID.                                  |
| `-i`       | `--appVersionId` | The app's version ID.                          |
| `-p`       | `--manifestPath` | The path to export your app manifest files to. |

### Example

```shell Terminal
$ mapps manifest:export -p ./exports
```

## `mapps manifest:import`

The `mapps manifest:import` command imports a manifest with optional template variables.

### Flags

| Short Flag | Long Flag                 | Description                                         | Notes                        |
| :--------- | :------------------------ | :-------------------------------------------------- | :--------------------------- |
| `-a`       | `--appId`                 | The app's ID.                                       | Creates a new draft version. |
| `-i`       | `--appVersionId`          | The app's version ID to override.                   |                              |
| `-m`       | `--allowMissingVariables` | Allows missing variables.                           |                              |
| `-n`       | `--newApp`                | Creates a new app.                                  |                              |
| `-p`       | `--manifestPath`          | The path to your app manifest file on your machine. |                              |

### Example

```shell Terminal
$ mapps manifest:import --manifestPath ./manifest.json
```

## `mapps scheduler:create`

The `mapps scheduler:create` command creates a new [scheduled cron job](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code). It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag              | Description                                                                      | Notes                                                                                                                     |
| :--------- | :--------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `-a`       | `--appId`              | The app's ID.                                                                    |                                                                                                                           |
| `-b`       | `--minBackoffDuration` | The minimum backoff duration between retries.                                    | The value should be in seconds. Optional. If omitted, the default will be 10 minutes.                                     |
| `-d`       | `--description`        | The scheduled job's description.                                                 |                                                                                                                           |
| `-n`       | `--name`               | The scheduled job's name. This is the unique identifier of the job for this app. | There is no whitespace allowed. This should be unique to the job, but the names of deleted jobs can be reused.            |
| `-r`       | `--maxRetries`         | The maximum number of retries for failed jobs.                                   | Optional.                                                                                                                 |
| `-s`       | `--schedule`           | The scheduled job's cron expression.                                             | Relative to UTC. Use a cron expression generator to ensure proper format (e.g., [Cronhub](https://crontab.cronhub.io/) ). |
| `-t`       | `--timeout`            | The job execution timeout.                                                       | The value should be in seconds. Optional.                                                                                 |
| `-u`       | `--targetUrl`          | The job's target URL path.                                                       | This must start with "/". It will be relative to /mndy-cronjob.                                                           |
| `-z`       | `--region`             | The region to use: `us`, `au`, or `eu`.                                          |                                                                                                                           |

### Example

```shell Terminal
$ mapps scheduler:create -a APP_ID -s "0 * * * *" -u "/my-endpoint" -n "My-scheduled-job" -d "This job will execute hourly." -r 3
```

## `mapps scheduler:delete`

The `mapps scheduler:delete` command deletes a [scheduled cron job](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code). It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag  | Description                             |
| :--------- | :--------- | :-------------------------------------- |
| `-a`       | `--appId`  | The app's unique identifier.            |
| `-n`       | `--name`   | Scheduled job name                      |
| `-z`       | `--region` | The region to use: `us`, `au`, or `eu`. |

### Example

```shell Terminal
$ mapps scheduler:delete -a APP_ID -n "my-job"
```

## `mapps scheduler:list`

The `mapps scheduler:list` command lists all [scheduled cron jobs](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code). It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag | Description                  |
| :--------- | :-------- | :--------------------------- |
| `-a`       | `--appId` | The app's unique identifier. |

### Example

```shell Terminal
$ mapps scheduler:list -a APP_ID
```

## `mapps scheduler:run`

The `mapps scheduler:run` command runs a [scheduled cron job](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code). This can be used to invoke a scheduled job on demand, rather than waiting for the next scheduled iteration. It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag  | Description                             |
| :--------- | :--------- | :-------------------------------------- |
| `-a`       | `--appId`  | The app's unique identifier.            |
| `-n`       | `--name`   | Scheduled job name                      |
| `-z`       | `--region` | The region to use: `us`, `au`, or `eu`. |

### Example

```shell Terminal
$ mapps scheduler:run -a APP_ID -n "my-job"
```

## `mapps scheduler:update`

The `mapps scheduler:update` command updates a [scheduled cron job](https://developer.monday.com/apps/docs/schedule-cron-jobs-in-monday-code). It is only available for [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) apps.

### Flags

| Short Flag | Long Flag              | Description                                                                      | Notes                                                                                                                    |
| :--------- | :--------------------- | :------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `-a`       | `--appId`              | The app's unique identifier.                                                     |                                                                                                                          |
| `-b`       | `--minBackoffDuration` | The minimum backoff duration between retries.                                    | The value should be in seconds. Optional. If omitted, the default will be 10 minutes.                                    |
| `-d`       | `--description`        | The scheduled job's description.                                                 |                                                                                                                          |
| `-n`       | `--name`               | The scheduled job's name. This is the unique identifier of the job for this app. | There is no whitespace allowed. This should be unique to the job, but the names of deleted jobs can be reused.           |
| `-r`       | `--maxRetries`         | The maximum number of retries for failed jobs.                                   | Optional.                                                                                                                |
| `-s`       | `--schedule`           | The scheduled job's cron expression.                                             | Relative to UTC. Use a cron expression generator to ensure proper format (e.g., [Cronhub](https://crontab.cronhub.io/)). |
| `-t`       | `--timeout`            | The job execution timeout.                                                       | The value should be in seconds. Optional.                                                                                |
| `-u`       | `--targetUrl`          | The job's target URL path.                                                       | This must start with "/". It will be relative to /mndy-cronjob.                                                          |
| `-z`       | `--region`             | The region to use: `us`, `au`, or `eu`.                                          |                                                                                                                          |

### Example

```shell Terminal
$ mapps scheduler:update -a APP_ID -n "my-job" -d "This job will execute automatically." -r 3 -b 10 -t 60
```

## `mapps storage:export`

The `mapps storage:export` command exports all keys and values stored on monday for a specific customer account.

| Short Flag | Long Flag           | Description                                                             |
| :--------- | :------------------ | :---------------------------------------------------------------------- |
| `-a`       | `--appId`           | The app to retrieve the key for.                                        |
| `-c`       | `--clientAccountId` | The client account number.                                              |
| `-d`       | `--fileDirectory`   | The file path. Optional. If not used, it will take your current folder. |
| `-f`       | `--fileFormat`      | The file format: CSV or JSON. Optional, the default is JSON.            |

### Example

```shell Terminal
$ mapps storage:export 
// or
$ mapps storage:export -a 12345678790 -c 9876543210 
```

## `mapps storage:remove-data`

The `mapps storage:remove-data` command removes all storage data for a specific customer account.

| Short Flag | Long Flag           | Description                |
| :--------- | :------------------ | :------------------------- |
| `-a`       | `--appId`           | The app's ID.              |
| `-c`       | `--clientAccountId` | The client account number. |
| `-f`       | `--force`           | Skip the confirmation step |

### Example

```shell Terminal
$ mapps storage:remove-data -a 1234567890 -c 9876543210
```

## `mapps storage:search`

The `mapps storage:search` command searches keys and values stored on monday for a specific customer account.

| Short Flag | Long Flag           | Description                      |
| :--------- | :------------------ | :------------------------------- |
| `-a`       | `--appId`           | The app to retrieve the key for. |
| `-c`       | `--clientAccountId` | The client account number.       |
| `-t`       | `--term`            | The term to search for.          |

### Example

```shell Terminal
$ mapps storage:search 
// or 
$ mapps storage:search -a 1234567890 -c 9876543210 -t keyword
```

## `mapps tunnel:create`

The `mapps tunnel:create` command creates a networking tunnel to publicly expose code running on the local machine.

### Flags

| Short Flag | Long Flag | Description                                                         |
| :--------- | :-------- | :------------------------------------------------------------------ |
| `-a`       | `--appId` | The unique identifier of the app to get a unique tunnel domain for. |
| `-p`       | `--port`  | The port to forward tunnel traffic to. The default is *8080*.       |

### Example

```shell Terminal
$ mapps tunnel:create -p 3000 -a 123456789
```

<br />
