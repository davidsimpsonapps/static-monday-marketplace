---
updatedAt: 2026-01-30T14:59:12.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Basic concepts

Integrations in monday are automated data flows between monday and a third-party system. You will build one or more **blocks** which users can combine to make sophisticated data flows.

<Image align="center" alt="This integration runs when a customer fills out a Contact Us form. " border={true} caption="Example: this integration runs when a customer fills out a Contact Us form." src="https://files.readme.io/e9811d42cb61c44a52b60f40ca479f498732d091ea2bd60464f66ca873f22cad-SCR-20250410-mixb.png" width="600px" />

***

# Anatomy of an integration

Each integration is made up of **blocks** connected in sequence:

* Trigger block: The starting point that listens for a specific event (e.g., form submission).
* Action blocks: Tasks that run in response to the trigger, executing actions on behalf of the user.

Each block passes data forward upon execution using output fields, which become input fields for the next block.

<Image align="center" alt="Integration with annotations showing blocks and fields in sequence. " border={true} caption="Annotated diagram showing blocks and data flow." src="https://files.readme.io/477ebe215caa8d21a2d643680491af2aa6f70495d5797b2d04a8678fd2f4360f-SCR-20250410-mmit-5.png" />

***

# Choose an integration app feature

Integrations are a general category that represents two different <Glossary>app feature</Glossary>s: monday workflows and sentence builder. Both features work the same under the hood, but they appear in different parts of the platform.

<HTMLBlock>{`
<style>
  .container {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
    width: 100%;
  }

  .box {
    border-radius: 8px;
    border: solid 1px;
    border-color: #d0d4e4;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;
  }

  .imageContainer {
    width: 100%;
    overflow: hidden;
    padding: 8px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .imageContainer img {
    object-fit: cover;
  }

  .textWrapper {
    padding: 12px 16px 20px 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .textWrapper > h2 {
    font-weight: 700;
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 20px;
  }

  .row > a[href] {
    text-decoration: none;
    color: inherit;
    display: flex;
    min-width: 150px;
    flex: 150px;
    max-width: 350px;
  }

  .tag {
    display: flex;
    justify-content: end;
    margin-top: auto;
  }

  .tag > div {
    border-radius: 4px;
    padding: 2px 6px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }

  .tag-new {
    background-color: #cce5ff;
    width: 45px;
  }

  .tag-deprecated {
    background-color: #fde2e2;
    color: #7a1f1f;
  }

  a:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    border-radius: 8px;
  }
</style>

<div class="container">
  <div class="row">
    <a href="https://developer.monday.com/apps/docs/workflow-builder">
      <div class="box">
        <div class="imageContainer">
          <img
            src="https://dapulse-res.cloudinary.com/image/upload/v1701702462/automations-framework/workflow-block-card.png"
            alt="Workflows illustration"
          />
        </div>
        <div class="textWrapper">
          <h2>monday workflows</h2>
          <p>
            For flexibility: Tools for power users to orchestrate sophisticated
            sequences of actions.
          </p>
          <div class="tag">
            <div class="tag-new">New</div>
          </div>
        </div>
      </div>
    </a>

    <a href="https://developer.monday.com/apps/docs/sentences">
      <div class="box">
        <div class="imageContainer">
          <img
            src="https://dapulse-res.cloudinary.com/image/upload/v1701702268/automations-framework/integraions-templates-card.png"
            alt="Sentences illustration"
          />
        </div>
        <div class="textWrapper">
          <h2>Sentence builder</h2>
          <p>
            For simplicity: Basic two-step templates that are quick and intuitive
            to set up.
          </p>
          <p style="font-size: 13px; color: #6b7280; margin-top: 8px;">
            This feature is being deprecated. New development should use monday
            workflows.
          </p>
          <div class="tag">
            <div class="tag-deprecated">Deprecated</div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
`}</HTMLBlock>

<Callout icon="💡" theme="default">
  ### Tip: Set up an integration before building your own

  We recommend spending a few minutes creating automations and integrations in the monday UI before you develop your own. Read a [knowledgebase article](https://support.monday.com/hc/en-us/articles/11065311570066-Get-started-with-monday-workflows) or complete the [automations course](https://monday.com/helpcenter/syllabus/an-introduction-to-automations) in the monday academy.
</Callout>

***

# Advanced topics & further reading

You can also familiarize yourself with how the app framework handles the following concepts:

* [Authentication](https://developer.monday.com/apps/docs/integration-authorization)
* [Error handling](https://developer.monday.com/apps/docs/error-handling)
* [Pagination](developer.monday.com/apps/docs/pagination-for-remote-options)
