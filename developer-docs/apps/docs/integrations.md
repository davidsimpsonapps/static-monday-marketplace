---
updatedAt: 2026-01-30T15:00:23.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Integrations

Integration app features let users automate work in monday.com and seamlessly connect to external platforms like Slack, Salesforce, or Google Sheets. They do so by connecting **integration blocks** to create sophisticated data flows.

Building an integration is simple: you’ll build a <Glossary>block</Glossary> that automatically executes <Glossary>action</Glossary>s on behalf of the user after certain <Glossary>trigger</Glossary>s occur. You can create them through our easy-to-use API which connects your app with monday.com.

# Start with a guide

The following articles will quickly help you understand how integrations work and get hands-on practice with building your first one:

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
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    flex-direction: column;
    height: 100%;
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

  a:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    border-radius: 8px;
  }
</style>
<div class="container">
  <div class="row">
  <a href="https://developer.monday.com/apps/docs/concepts">
    <div class="box">
      <div class="textWrapper">
        <h2>Concepts</h2>
        <p class="subtitle">Just curious? Learn how integrations automate data flows between monday and other systems – or monday and itself.</p>
      </div>
    </div>
  </a>
  <a href="https://developer.monday.com/apps/docs/quickstart-integration">
    <div class="box">
      <div class="textWrapper">
        <h2>Build a workflow block</h2>
        <p class="subtitle">Want to start building? With our quickstart, you'll create a simple integration that auto-capitalizes column content.</p>
      </div>
    </div>
  </a>
    </div>
</div>
`}</HTMLBlock>

***

# Dive into our app features

If you prefer to review technical details first, start with our app feature reference.

monday.com offers two app features to build integrations: **monday workflows** or the **sentence builder** (soon to be [deprecated](https://developer.monday.com/apps/docs/automation-features-migration-overview)). Both have similar APIs.

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
