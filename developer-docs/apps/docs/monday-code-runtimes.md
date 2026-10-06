---
updatedAt: 2025-10-23T05:19:51.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday code runtimes

Learn how monday code supports other programming languages with runtimes

monday code supports numerous programming languages through <Glossary>runtimes</Glossary>.

Runtimes are configured in a `.mondaycoderc` file in your app's root directory. The file specifies the language and version required to run your application.

Once created, monday code reads the file and sets up the environment based on the configured runtime.

# Supported runtimes

We support the following runtimes\*:

| Language  | Versions                     |
| :-------- | :--------------------------- |
| Python    | `3.10.x`, `3.11.x`, `3.12.x` |
| Java      | `8`, `11`, `17`, `21`        |
| Go        | `1.x.x`                      |
| PHP       | `8.1.x`, `8.2.x`, `8.3.x`    |
| Ruby      | `3.1.x`, `3.2.x`, `3.3.x`    |
| Node.js   | `18.x.x`, `20.x.x`, `22.x.x` |
| .NET Core | `6.x`, `8.x`                 |

\**These are subject to change. Please refer to the[schema](https://github.com/mondaycom/monday-apps-cli/blob/master/src/services/schemas/mondaycoderc-schema.ts) for the most up-to-date list.*

# How it works

## Create a `.mondaycoderc` file

Follow these steps to create a `.mondaycoderc` file:

1. Open your terminal and navigate to your project's **root directory**.

2. Use a text editor or a command-line tool to **create a new file**.

3. Name the file `.mondaycoderc`.

4. Add the required configuration options to the file. They should be in JSON format and must include the following properties:

| Property          | Description                             | Type   |
| :---------------- | :-------------------------------------- | :----- |
| `RUNTIME`         | The name of the programming language    | String |
| `RUNTIME_VERSION` | The version of the programming language | String |

## Validation

The CLI will validate the provided properties based on this [schema](https://github.com/mondaycom/monday-apps-cli/blob/master/src/services/schemas/mondaycoderc-schema.ts). If you provide an invalid or unsupported runtime, you will get an error that clearly states the supported runtimes and your code won't be deployed.

You can ensure the `.mondaycoderc` file is validated to avoid configuration errors.

## Sample configurations

Below are examples of different configurations that you can add to your `.mondaycoderc` file:

```json Python
{
  "RUNTIME": "Python",
  "RUNTIME_VERSION": "3.10.1"
}
```
```json Java
{
  "RUNTIME": "Java",
  "RUNTIME_VERSION": "17"
}
```
```json Go
{
  "RUNTIME": "Go",
  "RUNTIME_VERSION": "1.18.0"
}
```
```json PHP
{
  "RUNTIME": "PHP",
  "RUNTIME_VERSION": "8.1.0"
}
```
```json Ruby
{
  "RUNTIME": "Ruby",
  "RUNTIME_VERSION": "3.1.2"
}
```
```json Node.js
{
  "RUNTIME": "Node.js",
  "RUNTIME_VERSION": "18.13.0"
}
```
```json .NET Core
{
  "RUNTIME": "NETCore",
  "RUNTIME_VERSION": "6.0"
}
```
