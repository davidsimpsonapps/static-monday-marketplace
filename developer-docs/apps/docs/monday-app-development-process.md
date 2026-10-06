---
updatedAt: 2026-06-04T13:18:41.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Quality and Duplication Policy**

At monday.com, our goal is to foster a robust, innovative, and high-quality ecosystem that delivers maximum value to our users. To ensure the marketplace remains a curated space of distinct, impactful solutions, we are updating our submission review criteria.

Moving forward, the app review team will no longer accept submissions that duplicate existing ecosystem functionality or integrations.

<br />

**New Rejection Criteria:**\
To maintain our high standards, apps falling into the following categories will be rejected during the review process:

1. **Redundant Third-Party Integrations** We will no longer approve apps whose primary purpose is to integrate monday.com with a third-party product that already has an active integration in the marketplace. This includes, but is not limited to, new apps targeting:

Google tools (e.g., Drive, Calendar, Gmail)

Microsoft tools (e.g., Teams, Outlook, Excel)

WhatsApp

Shopify

Zendesk

Calendly

Zoom

Telegram

Any other existing integration currently available in the marketplace

2. **Functional Duplication** ("Clone" Apps) We will no longer accept apps that copy the core functionality of an existing marketplace app.

Note on Value Add: Making slight UI tweaks, minor feature additions, or superficial changes to an existing app's concept will not be considered "new value." Your app must introduce a substantially unique solution or serve an entirely different workflow to be approved.

**What This Means for Developers:**

Before you begin developing a new app, we strongly recommend that you thoroughly search the monday.com marketplace to ensure your concept does not conflict with these new guidelines.

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases, as proper technical scoping prevents changes later.

<Callout icon="🚧" theme="warn">
  New apps built primarily using no-code platforms or AI-generated “vibe code” are not eligible for marketplace approval.
</Callout>

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * [ ] Trigger event types identified
  * [ ] Action operations defined
  * [ ] Required input fields mapped
  * [ ] Output data structure planned
  * [ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * [ ] UI components identified
  * [ ] Data flow architecture planned
  * [ ] User interaction patterns defined
  * [ ] Performance requirements set
  * [ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

# Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
