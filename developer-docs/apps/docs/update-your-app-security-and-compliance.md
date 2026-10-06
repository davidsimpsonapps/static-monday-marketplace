---
updatedAt: 2025-10-23T05:12:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Security and compliance

App security and compliance are essential for building user trust and confidence. Customers want to understand what data they need to share, how it's stored, and how your app is protected from breaches and attacks.

Many organizations also have strict data and security policies that only allow the use of apps that meet specific standards or comply with particular regulations (e.g., GDPR). By sharing your app's security and compliance practices, you help users make better-informed decisions, eventually reducing the time between discovering your marketplace app and installing it.

To support this, we've created a process that lets you share and update your app's security and compliance details directly in the Developer Center. Our team reviews the information and, once approved, adds it to the *Security & Compliance* section of your app's marketplace listing page.

<Image align="center" className="border" border={true} src="https://files.readme.io/77780a1e817a58aba56dcfb07f1eddfbba89b039f1d240353b27b78ed0e32444-Screenshot_2024-09-23_at_3.31.30_PM.png" />

# When to submit a request

For **new** apps, you should submit your initial request only after your app has been published and you’ve received the publication email. **Existing** apps can submit a request anytime to provide updated answers and information.

All apps must submit an updated questionnaire to qualify for the marketplace [Shield Badge](https://developer.monday.com/apps/docs/shield-badge).

<div style={{ backgroundColor: "#fff8e1", borderLeft: "4px solid #fbc02d", padding: "16px 20px", margin: "24px 0", fontSize: "16px", color: "#f9a825" }}>
  🚧 Submitting this information is optional. If no questionnaire is submitted, your app listing will show the message: "No additional information was provided."
</div>

# Submit a new request

Follow these steps to submit a new request:

1. Open the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center#access-the-developer-center).

2. Select your app from the list and click the **Manage** tab.

3. Select **Listing page**.

4. Navigate to the **Security & Compliance** section.

5. Click **New request**. This option will be grayed out if you already have a request pending.

6. Provide the updated information in each section. Each section is optional, so you only need to complete the ones you want to update.

7. Click **Submit request**.

8. Our team will review your request within 10 business days. You can manually track the request status in the *Listing* tab to know what stage of the process it's in.

# Manage your requests

The *Listing page* tab also lets you view and manage new and existing requests. There, you can access each request's name, requester, submission date, ID, status, and Shield Badge eligibility (if applicable). You can also click on a specific request to open it and see more information.

## Request status

The request status tells you what stage of the process your request is in. Each request will always have one of four status labels:

| Label    | Description                                                                                                                                                                                                      |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pending  | The pending label indicates that your request has been submitted and is pending review. If you have a request pending, you won't be able to create a new one until it is canceled, approved, or rejected.        |
| Approved | The approved label indicates that your request was successfully approved, and the updates took immediate effect. A small green dot next to the label denotes the current live version.                           |
| Canceled | The canceled label indicates that your request was submitted and then canceled by you or another admin.                                                                                                          |
| Rejected | The rejected label indicates that your request did not pass review and that the changes were rejected. You can read comments from our team in the request, make the suggested changes, and submit a new request. |

## Shield Badge

The Shield Badge column indicates whether your app is eligible for the [Shield Badge](https://developer.monday.com/apps/docs/shield-badge), based on the information provided in the questionnaire. You can click into the request to read more information about the eligibilty decision.

## Request versioning

New requests are pre-filled with the live app listing page content by default. If you want to create a new request based on a different version, follow these steps:

1. Locate and open the request you want to version.
2. Click **New request from this version** in the top-right corner. This will create a new request using the content from the requested version.
3. Make your new updates and click **Submit for review**.

<Image align="center" className="border" border={true} src="https://files.readme.io/c373c2759e8611d4bea6b339315aaa625b35d93288c68c15a19edb1ada7c777b-Security_and_compliance_request_versioning.png" />

## Cancel a request

You can cancel pending requests before they're approved or rejected by clicking the **Cancel request** button in the top-right corner of the request. Currently, you can't delete any requests through the UI.

# Request questions

The following section lists all of the questions included in the request. You don't have to answer all of them, but we highly advise answering as many as possible to give users the answers they need!

* Is customer data segregated from the data of other customers (for example, logically or physically)?
* Does this developer have a process for installing application-level updates and security patches for the service (such as software packages and databases)?
* Does the developer have mechanisms to notify monday.com in case of a security breach?
* Does the developer protect all state-changing actions against Cross-Site Request Forgery (CSRF)?
* Does the app perform encoding and sanitization on all user-supplied parameters to protect against Cross-Site Scripting?
* Does the developer protect access to customer data based on the principle of least privilege?
* Does the developer enforce multi-factor authentication on employees access to systems which may process customer data?
* Does the developer ensure application logs do not contain secrets or personally-identifiable information (PII)?
* Does the app protect against mass parameter assignment attacks?
* Does the app restrict redirects and forwards only to approved destinations, or show a warning when redirecting to potentially untrusted content?
* Is the app compliant with the General Data Protection Regulation (GDPR)?
* Is the app certified with System and Organization Controls (SOC 2 or SOC 3)? If yes, you must upload a file.
* Is the app compliant with the Health Insurance Portability and Accountability Act (HIPAA)? If yes, you must upload a file.
* Does the developer have a dedicated security and privacy point of contact for such issues or questions?
* Does the developer periodically perform penetration testing?
* Where does the app store the app data?
* Where does the app store logs data?
* Does the app send any data outside of monday.com? If yes, indicate whether the data is customer-submitted (e.g., board names, item names, doc content) or non-customer-submitted (e.g., account ID, board ID, user ID).
* Is the app certified with the information security standard ISO/IEC 27001:2022? If yes, you must upload a file.
