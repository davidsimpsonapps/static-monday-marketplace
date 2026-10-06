---
updatedAt: 2025-12-02T18:20:26.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Privacy and security

Learn about the privacy and security requirements for listing an app in the marketplace

To receive approval for the app marketplace, your app must meet the following privacy and security requirements:

* [ ] All domains must pass the provided Burp scan. Any errors will be disclosed during the review process and must be addressed before approval is given.
* [ ] Provide supporting evidence and describe how the app stores secrets and specify whether secrets are stored on the code repository (e.g., AWS keys in GitHub).
* [ ] Tokens must be **encrypted**. Provide supporting evidence and describe how the app stores tokens. Elaborate on what security controls are used to protect the monday.com user access token.
* [ ] Provide supporting evidence and share whether or not you're storing user data in the app database, what data is stored (e.g., board data or username), and what the stored user data is for. PII data should be stored in an encrypted format and mentioned in your privacy policy. If using monday code, save the PII data in monday secure storage.
* [ ] Describe all of the scopes used in the app, why each one is needed, and what they're used for. You should only request the scopes that your app **needs**.
* [ ] Provide supporting evidence and describe what data is being logged and for how long logs are retained. If your app uses monday code, provide evidence that the monday logger is enabled.
* [ ] Provide supporting evidence and describe how data is encrypted at rest and what encryption algorithms are used. You can skip this requirement if your app uses monday storage.
* [ ] Provide supporting evidence and describe how your app protects against injection attacks (only relevant for apps using monday storage or an external DB).
* [ ] Provide supporting evidence and describe the input validation the app performs on all user‑supplied data (e.g., *All data is sanitized and HTML is encoded*)
* [ ] Provide supporting evidence that you either own the domain names or have permission from the owner:
  * The support email must match the domain name
  * Create a public JSON file with this payload
  ```
  {
  "apps":[
  {"clientID":}
  ]
  }
  ```
  * Add the JSON file to your domain and share it: `https://your_domain/monday-app-association.json`
* [ ] When monday.com or an end‑user de‑authorizes, deactivates, uninstalls, or otherwise terminates an app, you must do one of the following (not relevant if your app uses monday storage):
  * Permanently delete all end‑user data and any metadata that was collected, transmitted, created, or received by the app within 10 days
  * Obtain express, written consent from the end‑user to retain end‑user data longer than 10 days, provided such consent is clear and explicit (refer to the [developer terms](https://monday.com/l/legal/developer-terms/))
* [ ] Complete the advanced security questionnaire to display on your app listing page (optional but recommended).
* [ ] Ensure cookies are HttpOnly. If not, they must only be used for clients and not part of the authentication process.
* [ ] Tracking cookies (and similar technologies) that track users outside the app's scope must be clearly communicated to users, comply with relevant cookie and other privacy legislation, and require user consent.
* [ ] Implement one of the following three secured authentication flows and answer the relevant questions:

  * **OAuth**
    * Why did you choose OAuth instead of Seamless Authentication?
    * Does the app redirect to any malicious URLs during the OAuth/API token flow?
    * Does the app handle the OAuth flow for users with multiple accounts?
  * **Seamless Authentication using shortTermToken for integration recipes**
    * Is the JWT signed with the app's signing secret to prove that the requests came from monday
  * **Seamless Authentication using monday SDK for views**
    * **If your app has a backend:**
      * Share where it is hosted
      * Provide the full domain name (can't contain "monday" unless it reads "\<app name> for monday")
    * **If your app has a frontend:**
      * Share where it is hosted (Zip file or custom URL)
      * Provide the full domain name (can't contain "monday" unless it reads "\<app name> for monday")
      * Disclose the framework you're using – e.g., NextJS, Vue, React, etc.
* [ ] HTTPS certificates must be valid.
* [ ] HSTS must be enabled for your domains. Provide the shared SSLab link.
* [ ] The application must use TLS 1.2 or higher to encrypt all of its traffic.
* [ ] Conduct a [malware check](https://urlfiltering.paloaltonetworks.com/query/) for your domain and subdomain.
* [ ] List all third‑party domains or products the app uses for both front and backend, and explain why. This information must be included in your privacy policy.
* [ ] Authenticate and authorize all requests. Please provide a screenshot of the authorization section of your code.

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
