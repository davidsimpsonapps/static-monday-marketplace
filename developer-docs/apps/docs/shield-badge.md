---
updatedAt: 2025-10-23T05:12:56.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Shield Badge

<div style={{ backgroundColor: "#fff8e1", borderLeft: "4px solid #fbc02d", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#f9a825" }}>
  🚧 This program is in beta and may change based on feedback and improvements.
</div>

Apps that meet specific data protection requirements are awarded the Shield Badge in the app marketplace. This badge appears as a shield icon on your app's marketplace listing page.

The Shield Badge beta program was launched in October 2024 to highlight marketplace apps that meet elevated data protection requirements, beyond the [standard requirements](https://developer.monday.com/apps/docs/privacy-and-security) for all marketplace apps. It’s designed to increase transparency and build trust with enterprise customers, who often have higher security and compliance requirements.

It is currently in beta and will continue to evolve based on customer feedback. Our goal is to make the program as clear and impactful as possible so it brings real value to your app and builds trust with our mutual customers.

<Image align="center" className="border" width="500px" border={true} src="https://files.readme.io/f2df64a4b8f4000b5e055c8c9b62c19e7014f6f67da51526e4290554fb40f43f-Shield_Badge.png" />

# Eligibility

All marketplace apps are eligible for the badge if they meet the requirements outlined below. Each app is evaluated individually, so if you have multiple apps, they must each meet the requirements to qualify.

Apps can qualify for the badge through one of three routes\*. If your app can qualify through multiple routes, you only need to complete the requirements of one route to receive the badge.

\**These routes are subject to change*.

<Image alt="This flowchart explains the three routes available for Shield Badge eligibility." align="center" border={true} src="https://files.readme.io/008131e8616e3f71d2f7107141eed269d8eba9b03a135b4fc14a670f57b29099-Shield_Badge_Eligibility.png">
  This flowchart explains the three routes available for Shield Badge eligibility.
</Image>

## Route 1: Compliance and certifications

Apps that meet stringent compliance and security standards can qualify by obtaining recognized certifications.

| Category                              | Requirement                                                                                                                |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| Security and compliance questionnaire | New submission required (read more [here](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance)) |
| Compliance and certifications         | The app has a valid SOC 2 report and an ISO/IEC 27001:2022 certification and attests to GDPR compliance                    |
| Hosting                               | No restrictions—can be hosted anywhere                                                                                     |

## Route 2: Frontend-only apps

Apps that exclusively have frontend features and are fully hosted within monday.com’s infrastructure qualify under this category.

| Category                              | Requirement                                                                                                                                                                                                       |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security and compliance questionnaire | New submission required (read more [here](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance))                                                                                        |
| App type                              | Includes only frontend app features                                                                                                                                                                               |
| Hosting                               | All frontend features must be fully hosted on monday.com's infrastructure ([uploaded via the Developer Center or CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom)) |
| Customer data handling                | Must not share customer-submitted data outside of monday.com's infrastructure (e.g., board or item data)                                                                                                          |

## Route 3: Fullstack or backend-only apps

Fullstack or backend-only apps that are fully hosted within monday.com’s infrastructure qualify under this category.

| Category                              | Requirement                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security and compliance questionnaire | New submission required (read more [here](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance))                                                                                                                                                                                                                                                       |
| App type                              | Includes backend features and optionally fronted features                                                                                                                                                                                                                                                                                                                        |
| Hosting                               | • All frontend features must be fully hosted on monday.com's infrastructure ([uploaded via the Developer Center or CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom)) <br /> • All backend features must be fully hosted on [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code)                |
| monday code                           | • The [multi-region feature](https://developer.monday.com/apps/docs/multi-region-feature) must be enabled and the backend features must be deployed to all regions  <br /> • [Network allowlist](https://developer.monday.com/apps/docs/manage-your-apps-outbound-communication) must be activated, blocking all outgoing communication except from allowed IP addresses/domains |
| Customer data handling                | Must not share customer-submitted data outside of monday.com's infrastructure (e.g., board or item data)                                                                                                                                                                                                                                                                         |
| Storage API usage                     | If [monday’s key-value storage](https://developer.monday.com/apps/docs/monday-code-javascript-sdk#storage) is used to store data, you must use the [`storage:remove-data`](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-storageremove-data) CLI command to delete any remaining data post-app uninstall                                               |

# How to apply

If your app meets the requirements outlined above, follow these steps to apply for your badge:

1. Complete a new [security and compliance questionnaire](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#submit-a-new-request). For apps qualifying through route 1, be sure to upload your valid SOC 2 report and ISO/IEC 27001:2022 certification.
2. Our team will review your questionnaire submission within 10 business days and evaluate it against the Shield Badge eligibility criteria. You can track the [status](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#request-status) of your submission in the Developer Center.
3. Once your request has been reviewed and the status updated, the [Shield Badge](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#shield-badge) column will reflect your app’s badge eligibility. If your questionnaire is approved and your app meets the eligibility criteria, the badge will appear on your app within seven business days.

# Evaluation

Eligibility is based solely on the information provided in your [questionnaire](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#submit-a-new-request). Our team evaluates eligibility each time a new or updated questionnaire is submitted. Even if your app qualifies, it will not receive the badge without a new or updated questionnaire submission.

# Badge maintenance

All apps are subject to an annual badge maintenance reassessment unless you submit an updated questionnaire during that period.

You must resubmit the questionnaire if your app’s data handling, infrastructure, or compliance changes. Your badge status will be re-evaluated based on the updated information.

# Frequently asked questions

### Is my app eligible for a badge?

Apps can currently qualify for the badge through one of three eligibility routes\*:

* Route #1: The app has a valid SOC 2 report and an ISO/IEC 27001:2022 certification and attests to GDPR compliance, regardless of where it is hosted.
* Route #2: The app is frontend-only (has only frontend features), fully hosted on monday.com infrastructure ([uploaded via the Developer Center or CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom)), and does not share any customer-submitted data outside of monday.com.
* Route #3: The app is full-stack (has both frontend and backend features) or a backend-only (has only backend features). The frontend features, if they exist, are fully hosted on monday’s infrastructure ([uploaded via the Developer Center or CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom)), and the backend features are fully hosted on [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code). The monday code [multi-region feature](https://developer.monday.com/apps/docs/multi-region-feature) is enabled, and the app is deployed to all regions (US, EU, AU). The monday code [network allowlist feature](https://developer.monday.com/apps/docs/manage-your-apps-outbound-communication) is enabled, blocking all outgoing communication except of allowed IP addresses/domains. No customer-submitted data is shared outside of monday’s infra through the frontend and backend features.\
  Additionally, if monday’s [key-value storage](https://developer.monday.com/apps/docs/mondaystorage) is used by the app to store data, the developer must use the storage:remove-data CLI command to delete the remaining data post-app uninstall.

*\*These routes are subject to change.*

### My app received a badge in the past, but no longer meets the current requirements. What should I do?

If your app previously received a Shield Badge but no longer qualifies under the updated requirements, you have 30 business days to make the necessary changes and resubmit an updated security and compliance questionnaire form in the Developer Center. Otherwise, the badge will be removed.

### How do you validate that my app is SOC 2 and ISO/IEC 27001:2022 certified?

When submitting the security and compliance questionnaire via the Developer Center, you must upload a valid SOC 2 report and an ISO/IEC 27001:2022 certificate.

### I submitted the security and compliance questionnaire for my app before October 2024. Why didn’t I get the badge?

Submissions made before the launch of the Shield Badge program are not reviewed automatically. Please resubmit your app’s security and compliance questionnaire and ensure that you have completed all the required questions.\
New questions or requirements may be added to the badge program over time. We’ll give you 30 days to review the changes and resubmit the questionnaire if necessary.

### I never submitted the security and compliance questionnaire. Is my app eligible for a badge?

No. Submitting the questionnaire is required for badge eligibility. Even if you’re not pursuing the badge, completing the questionnaire is highly recommended to build transparency and trust with customers.

### One of my apps has a badge. Are my other apps automatically eligible?

No. Badge eligibility is strictly evaluated per app. Each app must independently meet the criteria and go through its own review process, regardless of the status of your other apps.

### How long does the badge review process take?

The initial review process begins once you submit the security and compliance questionnaire for your app. It can take up to 10 business days to complete the initial review. You can track the [status](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#request-status) of your questionnaire submission in the Developer Center.

Once your questionnaire submission is approved and your app meets the Shield Badge criteria, it will be granted the badge. It will appear on the app's listing page within seven business days. If the badge does not appear after seven days, you can contact our support team using this [form](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962).

### My app is hosted partially or fully on third-party infrastructure (non-monday.com’s infrastructure). Can it still qualify for the badge?

Your app can still qualify if it meets all the following conditions:

* It is SOC 2 audited
* It is ISO/IEC 27001:2022 certified
* It attests to GDPR compliance

When re-submitting the security and compliance questionnaire via the Developer Center, make sure to answer these specific questions:

* Is the app GDPR compliant?
* Is the app certified with a SOC 2 valid report?
* Is the app certified with ISO/IEC 27001:2022?

### My app is fully hosted on monday’s infrastructure, but it sends logs to an external service. Can it still qualify for the badge?

It depends on the type of data your logs include:

* **Not eligible** if logs contain customer data, such as board names, item names, doc content, column values, or any other content entered by the customer into their monday account.
* **Eligible** if logs include only technical metadata or monday-generated identifiers (e.g., account ID, user ID, item ID, board ID), and do not include customer data.

monday.com is considered a data processor for customer data. For your app to qualify, customer data must not leave monday.com’s infrastructure under any circumstances.

Metadata and system identifiers (such as timestamps, status codes, and IDs) are typically not considered customer data and can be sent to external systems.

If you are unsure whether the data qualifies as customer data, please contact our team using this [form](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962).

### My app collects customer names, email addresses, or IP addresses for support or security purposes. Can it still qualify for the badge?

Yes - your app may still qualify for the badge, subject to having a privacy policy in place that governs such data. Data such as customer names, email addresses, or IP addresses used to interact with customers or secure your app is typically considered controlled data.

To remain eligible for the badge, customer data - such as board content, docs, or column values - must never leave monday.com’s infrastructure.

### Can users filter by Shield Badge in the marketplace?

Not at this time.

### What if I update my app in a way that could affect its badge eligibility?

If you make any change that could impact how your app handles data, infrastructure, or compliance, such as modifying where features are hosted or enabling new integrations, you must resubmit the security and compliance questionnaire for our review. Based on the updated information, badge status will be reevaluated.

### My app meets more than one eligibility route. Do I need to qualify under all of them?

No. Qualifying under just one route is enough.

### How often is badge eligibility reviewed?

Every time you resubmit the security and compliance questionnaire. If you haven’t resubmitted in over a year, your app will be proactively revalidated for qualification.

### After submitting the questionnaire, will I receive an email or notification that the [request’s status](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#request-status) has changed?

You will see a banner in the Developer Center indicating whether the Shield Badge application was approved. You can also see the decision in the [Shield Badge](https://developer.monday.com/apps/docs/update-your-app-security-and-compliance#shield-badge) column, but you will not receive an email regarding the updated request status.

### Do we send any notification when the badge has been applied?

Not at the moment.

### Are apps that integrate with third-party platforms (non-monday.com) eligible for a badge?

* Yes, if the app is SOC 2 audited, ISO/IEC 27001:2022 certified, and GDPR compliant.
* Yes, if the app is fully hosted on monday.com’s infrastructure and does not send customer data externally.
* No, if the app sends customer data to other platforms.

### Can I appeal if my badge application or renewal is rejected?

Yes. Please contact our support team using this [form](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962).
