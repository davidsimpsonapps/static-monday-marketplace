---
updatedAt: 2026-09-06T08:33:47.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Get help

Learn how to get help through our dedicated support channels

<HTMLBlock>{`
<style>
  .ai-assistant-banner {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #6161FF 0%, #181B34 100%);
    border-radius: 12px;
    padding: 28px 32px;
    margin: 8px 0 24px 0;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 24px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    text-decoration: none;
  }
  .ai-assistant-banner:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(24, 27, 52, 0.4);
  }
  .ai-assistant-banner:active {
    transform: translateY(0);
  }
  .ai-assistant-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: rgba(97, 97, 255, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ai-assistant-icon svg {
    width: 24px;
    height: 24px;
    fill: #fff;
  }
  .ai-assistant-content {
    flex: 1;
  }
  .ai-assistant-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    opacity: 0.85;
    margin-bottom: 4px;
  }
  .ai-assistant-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  .ai-assistant-desc {
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
  }
  .ai-assistant-arrow {
    flex-shrink: 0;
    font-size: 24px;
    opacity: 0.8;
  }
</style>
<div class="ai-assistant-banner" onclick="window.Kapa.open()" role="button" tabindex="0" onkeydown="if(event.key==='Enter')window.Kapa.open()">
  <div class="ai-assistant-icon">
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.14984 2.81681C7.51277 2.45389 8.00499 2.25 8.51825 2.25H16.8148C17.328 2.25 17.8203 2.45389 18.1832 2.81681C18.5461 3.17974 18.75 3.67197 18.75 4.18522V10.1113C18.75 10.6246 18.5461 11.1168 18.1832 11.4797C17.8203 11.8426 17.328 12.0465 16.8148 12.0465H16.399C16.395 12.0465 16.393 12.0472 16.3917 12.0478C16.3899 12.0485 16.3876 12.0499 16.3853 12.0522C16.3835 12.054 16.3823 12.0557 16.3815 12.0572C16.3812 12.0577 16.381 12.0582 16.3808 12.0587C16.3802 12.0599 16.3796 12.0619 16.3796 12.066C16.3796 13.3401 14.9058 14.0484 13.9109 13.2525L13.417 12.8574V13.9658C13.417 14.4791 13.2131 14.9713 12.8502 15.3342C12.4872 15.6971 11.995 15.901 11.4818 15.901H7.88093C7.69686 15.901 7.51826 15.9637 7.37453 16.0787L6.08911 17.107C5.09421 17.9029 3.62044 17.1946 3.62044 15.9205C3.62044 15.9164 3.61976 15.9144 3.61922 15.9132C3.61846 15.9114 3.61704 15.909 3.61474 15.9067C3.61243 15.9044 3.6101 15.903 3.60832 15.9023C3.60703 15.9017 3.60504 15.901 3.60097 15.901H3.18522C2.67197 15.901 2.17974 15.6971 1.81681 15.3342C1.45389 14.9713 1.25 14.4791 1.25 13.9658V8.03972C1.25 7.52647 1.45389 7.03424 1.81681 6.67131C2.17974 6.30839 2.67197 6.1045 3.18522 6.1045H6.58303V4.18522C6.58303 3.67197 6.78692 3.17974 7.14984 2.81681ZM8.08303 6.1045H11.4818C11.995 6.1045 12.4872 6.30839 12.8502 6.67131C13.2131 7.03424 13.417 7.52647 13.417 8.03972V10.9364L14.8479 12.0812C14.8511 12.0838 14.8534 12.0852 14.8547 12.086L14.8565 12.0869C14.8579 12.0869 14.8623 12.0865 14.8685 12.0835C14.8748 12.0806 14.8778 12.0773 14.8787 12.0763L14.8791 12.0743C14.8793 12.0728 14.8796 12.0701 14.8796 12.066C14.8796 11.2268 15.5598 10.5465 16.399 10.5465H16.8148C16.9302 10.5465 17.0409 10.5007 17.1225 10.4191C17.2041 10.3374 17.25 10.2267 17.25 10.1113V4.18522C17.25 4.06979 17.2041 3.95909 17.1225 3.87747C17.0409 3.79585 16.9302 3.75 16.8148 3.75H8.51825C8.40282 3.75 8.29212 3.79585 8.2105 3.87747C8.12888 3.95909 8.08303 4.06979 8.08303 4.18522V6.1045ZM11.917 11.269V8.03972C11.917 7.92429 11.8711 7.81359 11.7895 7.73197C11.7079 7.65035 11.5972 7.6045 11.4818 7.6045H3.18522C3.06979 7.6045 2.95909 7.65035 2.87747 7.73197C2.79585 7.81359 2.75 7.92429 2.75 8.03972V13.9658C2.75 14.0812 2.79585 14.1919 2.87747 14.2736C2.95909 14.3552 3.06979 14.401 3.18522 14.401H3.60097C4.44015 14.401 5.12044 15.0813 5.12044 15.9205C5.12044 15.9246 5.12073 15.9273 5.12095 15.9288L5.12135 15.9308C5.12221 15.9318 5.12525 15.9351 5.13147 15.938C5.1377 15.941 5.14213 15.9414 5.14348 15.9414L5.14528 15.9405C5.14657 15.9397 5.14886 15.9383 5.15206 15.9357L6.43748 14.9074C6.84719 14.5796 7.35625 14.401 7.88093 14.401H11.4818C11.5972 14.401 11.7079 14.3552 11.7895 14.2736C11.8711 14.1919 11.917 14.0812 11.917 13.9658V11.3231C11.9163 11.3051 11.9163 11.2871 11.917 11.269Z" />
    </svg>
  </div>
  <div class="ai-assistant-content">
    <div class="ai-assistant-label">Stop! Before you scroll...</div>
    <div class="ai-assistant-title">Still reading documentation? That's so old school.</div>
    <div class="ai-assistant-desc">Ask our AI assistant any question about the monday API and get an instant answer.</div>
  </div>
  <div class="ai-assistant-arrow">→</div>
</div>
`}</HTMLBlock>

Need help? We've got you covered! Whether you're just looking for guidance or troubleshooting an issue, here's how to get the help you need!

# Ask the AI bot

Our AI bot is the fastest way to find an answer! It integrates with our API and apps framework documentation to help you find what you need quickly and efficiently. It scans the documentation to provide answers, code samples, and direct links to helpful resources. At the end, you can also rate the quality of each answer to help us improve the responses.

You can access it from multiple locations:

1. The **Need help** button in the bottom right corner of the documentation
2. The **Ask AI** button in the top right corner of the Developer Center

# Open a support ticket

If you've consulted our resources and still have questions or an urgent issue, you can [open a ticket ](https://support.monday.com/hc/en-us/requests/new?ticket_form_id=13855862562962) with our support team. Our support team can help with technical and non-technical questions related to app development, the API, and monetization.

When to open a ticket:

* Urgent technical issues (e.g., API outages, account-specific errors)
* Questions not answered in documentation or the developer community

# Developers' community

The monday.com [developers' community](https://developer-community.monday.com/) is a great place to ask and answer technical questions, stay up-to-date on the latest and greatest releases, and interact with developers around the world. You can ask new questions or utilize the search feature to review relevant resources and previous threads.

When to use the community:

* General API and app development questions
* Feature requests and feedback
* Non-urgent troubleshooting with peer support

## Categories

It is divided into five main categories to help organize posts and discussions:

| Category                                                                | Description                                                      |
| :---------------------------------------------------------------------- | :--------------------------------------------------------------- |
| [Community](https://developer-community.monday.com/community)           | Ask questions, solve problems, and network with other developers |
| [Requests](https://developer-community.monday.com/ideas)                | Shape the roadmap with feature requests                          |
| [New Releases](https://community.monday.com/c/developers/dev-guides/70) | Stay informed on new product updates                             |
| [Events](https://developer-community.monday.com/events?tab=upcoming)    | Join exclusive events to learn and grow                          |
| [Testing groups](https://developer-community.monday.com/groups)         | Be the first to try our latest apps and features                 |

**Please note** that while members of the monday.com team manage the community, not every topic is guaranteed to get a response from our team.

# Provide feedback about the development process

We want to hear from you!

We're always looking to improve our products and processes. Using this [form](https://forms.monday.com/forms/1a84dad3fab3b4bb4b02b615e3043a78?r=use1), you can share your feedback about your development experience, the API, or our documentation. These insights help shape our roadmap and identify issues.
