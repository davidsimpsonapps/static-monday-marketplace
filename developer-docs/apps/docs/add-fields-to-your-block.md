---
updatedAt: 2026-01-07T17:42:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Add fields to your block

This guide explains how to create custom text, date, and object fields that will be used later to configure your automation blocks.

# Implementation

## Step 1: Add the app feature

To start, let's add a new **Field for automation block** app feature.

1. Click on your profile picture in the top right corner.
2. Select **Developers**. This will open the *Developer Center* in a new tab.
3. Choose the app you'd like to build your fields in or create a new one.
4. Navigate to the *Features* tab.
5. Click **Create feature** > **Field for automation block** > **Create**.

## Step 2: Configure the field

Once you've added the app feature, you can configure the field:

### a. Basic details

Add a name, description, and key to your field.

* **Field name:** Enter a descriptive name users will see in the workflow builder.
* **Field description:** Enter a brief description to explain what the field does. This is only displayed in the *Developer Center* and will not be exposed to users.
* **Default field key:** Enter a unique identifier for the field. It can only contain numbers, letters, and underscores and must begin with a letter.

### b. Field schema

Define your field's type and schema (if applicable).

* **Schema type:** Choose if your field is a string, number, boolean, credentials, or object.
* **Schema configuration:** If you selected the *Object* schema type, you can supply a static schema or a schema URL. The [Object Field Reference](https://developer.monday.com/apps/docs/object) contains details on how to configure your schema URL.

### c. Configuration

Add remote options to your custom field. If you don't configure remote options, the user will input the value.

* **Remote options URL:** Enter the endpoint that will be called to fetch the field's options. The remote options URL should return an array of options, each with a title and value field:
* **Static options:**
  * **Label:** The option's name.
  * **Value:** The option's value.

Each field type handles remote options differently, so refer to the [Primitive](https://developer.monday.com/apps/docs/primitive-fields), [Object](https://developer.monday.com/apps/docs/object), and [Credentials](https://developer.monday.com/apps/docs/credentials) references for more information.

### d. Field dependencies

Set mandatory and optional dependencies that must happen before calling the endpoint configured in Step 3.

* **Mandatory dependencies**
  * **Field type:** Choose the field type.
  * **Target field key:** Enter the unique identifier for the target field.
* **Optional dependencies**
  * **Field type:** Choose the field type.
  * **Target field key:** Enter the unique identifier for the target field.

# Next steps

Repeat the process to create as many fields as you need. Follow the [building your blocks](https://developer.monday.com/apps/docs/build-a-workflow-block) guide to learn how to add them to your blocks!
