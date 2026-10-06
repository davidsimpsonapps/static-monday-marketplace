---
updatedAt: 2026-01-30T15:18:44.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Security scanning

The monday code security scanning feature analyzes your code and its dependencies during deployment to identify known vulnerabilities and common security issues. The scan provides actionable output that helps you mitigate security risks in your deployment.

# Introduction

Security scanning helps you identify vulnerabilities early and provides suggestions to improve your app’s security without disrupting the existing deployment flow.

Each scan provides a clear CLI summary and a structured JSON report that you can save locally for future reference. These results help you understand important security risks and take the necessary actions.

# Running a security scan

To run a security scan, deploy your code with scanning enabled and generate a report via the CLI.

## Prerequisites

* The latest version of the [monday-apps CLI](https://www.npmjs.com/package/@mondaycom/apps-cli?activeTab=readme)

## Step 1: Deploy code with scanning enabled

1. Create a new deployment or locate an existing one.
2. Deploy your app using the [CLI](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush). Include the `-s` short flag to enable the security scan for this deployment.

```shell Terminal
$ mapps code:push -s 
```

## Step 2: Security scan execution

After deploying your code, the deployment runs as usual. The security scan examines your deployment’s bundled artifacts without executing your code.

## Step 3: View and save report

After the scan completes, a summary is printed to your terminal. A JSON report containing the full results is automatically generated and stored with the deployment. The filename follows this pattern:

```
"security-s-scan-{appVersionId}-{timestamp}.json"
```

### View the report for any deployment

You can use [`mapps code:report`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codereport) to view the human-readable version of the scan results for a specific deployment.

Without flags, this displays the results of the most recent deployment. Provide the app version ID to view a specific past deployment.

```shell Terminal
$ mapps code:report -i <appVersionId>
```

### Save the report to a directory

You can export the human-readable version of an existing report using:

```shell Terminal
$ mapps code:report -o -d /path/to/directory
```

# Reference

## Relevant CLI commands

* [`mapps code:push`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)
* [`mapps code:report`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codereport)

## JSON report fields

| Field       | Description                                                               |
| :---------- | :------------------------------------------------------------------------ |
| `version`   | Security report schema version                                            |
| `timestamp` | When the scan was generated (UTC and ISO-8601)                            |
| `summary`   | A high-level count of findings by severity                                |
| `findings`  | An array of individual issues from Trivy, OpenGrep OSS, and similar tools |

### `summary` object

| Field             | Description                                       |
| :---------------- | :------------------------------------------------ |
| `summary.total`   | The total number of findings                      |
| `summary.error`   | The number of high-severity/critical issues       |
| `summary.warning` | The number of medium-severity issues              |
| `summary.note`    | The number of low-severity/informational findings |

### `findings` object

| Field                       | Description                                                                                                                                         |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `findings.tool`             | The scanner that reported the issue                                                                                                                 |
| `findings.ruleId`           | ID of the rule or CVE that triggered the finding                                                                                                    |
| `findings.severity`         | The severity level: "warning", "error", or "note"                                                                                                   |
| `findings.file`             | The file where the issue was detected                                                                                                               |
| `findings.line`             | The line number in the file associated with the issue                                                                                               |
| `findings.message`          | Summary from the scanner, typically including package details, installed version, vulnerability ID, severity, available fixes, and a reference link |
| `findings.shortDescription` | A one-line description of the issue                                                                                                                 |
| `findings.fullDescription`  | A longer explanation of the issue, its impact, and context                                                                                          |
| `findings.helpUri`          | A URL with more details about the issue or rule                                                                                                     |
| `findings.help`             | Human-readable help text summarizing severity, affected components, fixed versions, vulnerability details, and any remediation hints                |
| `findings.precision`        | Confidence level of the finding, indicating how likely it is to be a true issue (higher = fewer false positives)                                    |

### Example

```json
{ 
  "version": "1.0",
  "timestamp": "2025-11-25T16:51:16.440360Z",
  "summary": { 
    "total": 35, 
    "error": 12,
    "warning": 15, 
    "note": 8 
  },
  "findings": [ 
    {
      "tool": "Trivy", 
      "ruleId": "CVE-2025-27789", 
      "severity": "warning", 
      "file": "package-lock.json", 
      "line": 2879, 
      "message": "Package: @babel/helpers\nInstalled Version: 7.10.1\nVulnerability CVE-2025-27789\nSeverity: MEDIUM\nFixed Version: 7.26.10, 8.0.0-alpha.17\nLink: [CVE-2025-27789](https://avd.aquasec.com/nvd/cve-2025-27789)",
      "shortDescription": "Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups",
      "fullDescription": "Babel is a compiler for writing next generation JavaScript. When using versions of Babel prior to 7.26.10 and 8.0.0-alpha.17 to compile regular expression named capturing groups, Babel will generate a polyfill for the `.replace` method that has quadratic complexity on some specific replacement pattern strings...", 
      "helpUri": "https://avd.aquasec.com/nvd/cve-2025-27789", 
      "help": "Vulnerability CVE-2025-27789\nSeverity: MEDIUM\nPackage: @babel/helpers\nFixed Version: 7.26.10, 8.0.0-alpha.17\nLink: [CVE-2025-27789](https://avd.aquasec.com/nvd/cve-2025-27789)\nBabel is a compiler for writing next generation JavaScript...", 
      "precision": "very-high"
    }
    // more findings...
  ]
}
```

<br />
