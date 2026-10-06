---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Form

Learn how to read, create, update, and delete monday.com Workforms via the platform API

monday.com [Workforms](https://support.monday.com/hc/en-us/articles/360000358700-Get-started-with-WorkForms) enables you to create and share custom forms that automatically sync with your monday boards and workflows. You can fully control the form's settings, including questions, appearance, and accessibility settings.

# Queries

## Get form

* You must have **access to the board associated with the form** to run this query
* Returns metadata for a given form
* Can only be queried at the root; cannot be nested within another query

```graphql GraphQL
query {
  form(formToken: "YOUR_FORM_TOKEN") {
    id
    title
    active
    appearance {
      primaryColor
      showProgressBar
    }
    features {
      responseLimit {
        enabled
        limit
      }
    }
    questions {
      id
      title
      type
      required
      visible
    }
  }
}
```
```json JSON
{
  "data": {
    "form": {
      "id": 12345,
      "title": "Customer Feedback Survey",
      "active": true,
      "appearance": {
        "primaryColor": "#2196f3",
        "showProgressBar": false
      },
      "features": {
        "responseLimit": {
          "enabled": true,
          "limit": 500
        }
      },
      "questions": [
        { "id": "q1", "title": "What is your full name?", "type": "Name", "required": true, "visible": true },
        { "id": "q2", "title": "What is your email address?", "type": "Email", "required": true, "visible": true },
        { "id": "q3", "title": "How would you rate your experience?", "type": "Rating", "required": false, "visible": true }
      ]
    }
  }
}
```

### Arguments

| Argument  | Type      | Description                                                |
| :-------- | :-------- | :--------------------------------------------------------- |
| formToken | `String!` | The form's unique string token, located in the form's URL. |

### How to access the form's token

#### **Unshortened URL**

1. Open your form and click **Share form** in the top-right corner.
2. This opens a pop-up with your form's shareable URL.

Sample URL: <https://forms.monday.com/forms/abc123def456ghi789?r=use1>

3. The token is the alphanumeric string that appears right after `/forms/` and before the `?`. In the sample above, the token is `abc123def456ghi789`.

<Image align="center" alt="Full Shareable Form URL" border={true} width="500px" src="https://files.readme.io/c60075cef07d0926cdec81687f821510a6684793e6b674b0d8a470c28e64daf6-Form_Token_1.png" className="border" />

#### **Shortened URL**

1. Open your form and click **Share form** in the top-right corner.
2. This opens a pop-up with your form's shortened URL.

<Image align="center" alt="Shortened Form URL" border={true} width="500px" src="https://files.readme.io/3ef8bbced8082f5e45602b455848830332ceac9be89a337aee1375e14f20feca-Screenshot_2025-11-13_at_12.59.50_PM.png" className="border" />

3. Click **Copy link** and paste it in a new tab.
4. When the form opens, it will display the form's full shareable URL.
5. The token is the alphanumeric string that appears right after `/forms/` and before the `?`.

### Fields

| Field         | Type                                                                                                            | Description                                                              |
| :------------ | :-------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| accessibility | [`FormAccessibility`](https://developer.monday.com/api-reference/reference/forms-other-types#formaccessibility) | The form's accessibility settings.                                       |
| active        | `Boolean!`                                                                                                      | Whether the form is visible and accepting responses.                     |
| appearance    | [`FormAppearance`](https://developer.monday.com/api-reference/reference/forms-other-types#formappearance)       | The form's visual style settings.                                        |
| builtWithAi   | `Boolean!`                                                                                                      | Whether the form was created with monday.com’s AI-assisted form builder. |
| description   | `String`                                                                                                        | The optional form description, displayed below the title.                |
| features      | [`FormFeatures`](https://developer.monday.com/api-reference/reference/forms-other-types#formfeatures)           | The form's toggles and feature settings.                                 |
| id            | `Int!`                                                                                                          | The form's unique board view identifier.                                 |
| isAnonymous   | `Boolean!`                                                                                                      | Whether responses are collected anonymously.                             |
| ownerId       | `Int`                                                                                                           | The user ID of the form's owner/creator.                                 |
| questions     | [`[FormQuestion!]`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestion)        | An array of question objects that make up the form, in display order.    |
| tags          | [`[FormTag!]`](https://developer.monday.com/api-reference/reference/forms-other-types#formtag)                  | Tracking tags for categorization and analytics.                          |
| title         | `String!`                                                                                                       | Title displayed at the top of the form.                                  |
| token         | `String!`                                                                                                       | The form's string-based unique token. Used in API queries and mutations. |
| type          | `String`                                                                                                        | The form's type.                                                         |

# Mutations

Requires **edit access to the form** to perform these mutations.

> ❗️ Breaking change in `2026-10`
>
> The `update_form_tag` mutation was **removed** in API version `2026-10`. If your integration uses `update_form_tag`, you will need to remove it before migrating to `2026-10`. Tags can no longer be updated after creation — delete and recreate the tag instead.

## Create form

Creates a new form. Returns [`DehydratedFormResponse`](https://developer.monday.com/api-reference/reference/forms-other-types#dehydratedformresponse).

```graphql GraphQL
mutation {
  create_form(
    board_kind: public
    destination_folder_id: 1234567890
    destination_folder_name: "Customer Feedback 2025"
    destination_name: "Customer Feedback Q4"
    destination_workspace_id: 9876543210
  ) {
    boardId
		token
  }
}
```
```json JSON
{
  "data": {
    "create_form": {
      "boardId": "1234567890",
      "token": "YOUR_FORM_TOKEN"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Argument
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        board_kind
      </td>

      <td>
        `BoardKind`
      </td>

      <td>
        The type of board.
      </td>

      <td>
        `private`  
        `public`  
        `share`
      </td>
    </tr>

    <tr>
      <td>
        board_owner_ids
      </td>

      <td>
        `[Float!]`
      </td>

      <td>
        The user IDs of the users who will be owners of the board that stores the form responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_owner_team_ids
      </td>

      <td>
        `[Float!]`
      </td>

      <td>
        The team IDs of the teams whose members will be owners of the board that stores the form responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_subscriber_ids
      </td>

      <td>
        `[Float!]`
      </td>

      <td>
        The user IDs of the users who will be subscribed to the board that stores the form responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        board_subscriber_teams_ids
      </td>

      <td>
        `[Float!]`
      </td>

      <td>
        The team IDs of the teams whose members will be subscribed to the board that stores the form responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        destination_folder_id
      </td>

      <td>
        `Float`
      </td>

      <td>
        The unique identifier of the folder to create the form in.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        destination_folder_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The name of the folder to create the form in.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        destination_name
      </td>

      <td>
        `String`
      </td>

      <td>
        The name of the board that will be created to store the form responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        destination_workspace_id
      </td>

      <td>
        `Float!`
      </td>

      <td>
        The unique identifier of the workspace to create the form in.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## Create form question

Creates a new question on a form. Returns [`FormQuestion`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestion).

```graphql GraphQL
mutation {
  create_form_question(
    formToken: "YOUR_FORM_TOKEN"
    question: {
      title: "Phone"
      description: "Enter your phone number."
      type: Phone
      required: true
      settings: {
        prefixAutofilled: false
        prefixPredefined: {
          enabled: true
          prefix: "+1"
        }
      }
    }
  ) {
    id
  }
}
```
```json JSON
{
  "data": {
    "create_form_question": {
      "id": "YOUR_QUESTION_ID"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                                                                                                                   | Description                                                            |
| :-------- | :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`                                                                                                              | The form's unique identifier. You can retrieve it from the form's URL. |
| question  | [`CreationQuestionInput!`](https://developer.monday.com/api-reference/reference/forms-other-types#createquestioninput) | An object containing the question's properties.                        |

## Create form tag

Creates a new tag for a form. Returns [`FormTag`](https://developer.monday.com/api-reference/reference/forms-other-types#formtag).

```graphql GraphQL
mutation {
  create_form_tag(
    formToken: "YOUR_FORM_TOKEN"
    tag: {
      name: "New Tag"
      value: "This is the new tag."
    }
  ) {
    id
  }
}
```
```json JSON
{
  "data": {
    "create_form_tag": {
      "id": "YOUR_TAG_ID"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                  | Description                                                            |
| :-------- | :-------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`             | The form's unique identifier. You can retrieve it from the form's URL. |
| tag       | `CreateFormTagInput!` | The tag's name and value. The name must be unique within the form.     |

## Activate form

Activates an existing form, making it visible to users and allowing new submissions. Returns a Boolean indicating whether the activation was successful.

```graphql GraphQL
mutation {
  activate_form(
    formToken: "YOUR_FORM_TOKEN"
  )
}
```
```json JSON
{
  "data": {
    "activate_form": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type      | Description                                                            |
| :-------- | :-------- | :--------------------------------------------------------------------- |
| formToken | `String!` | The form's unique identifier. You can retrieve it from the form's URL. |

## Update form

Updates a form's title, description, or question order. Returns [`ResponseForm`](https://developer.monday.com/api-reference/reference/forms-other-types#responseform).

```graphql GraphQL
mutation {
  update_form(
    formToken: "YOUR_FORM_TOKEN"
    input: {
      description: "Your updated description."
      title: "Your updated title."
      questions: [
        { id: "Q1" }
        { id: "Q3" }
        { id: "Q2" }
      ]
    }
  ) {
    title
    description
    questions {
      type
    }
  }
}
```
```json JSON
{
  "data": {
    "update_form": {
      "title": "Your updated title.",
      "description": "Your updated description.",
      "questions": [
        {
          "type": "Name"
        },
        {
          "type": "ShortText"
        },
        {
          "type": "LongText"
        }
      ]
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                                                                                                         | Description                                                            |
| :-------- | :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`                                                                                                    | The form's unique identifier. You can retrieve it from the form's URL. |
| input     | [`UpdateFormInput!`](https://developer.monday.com/api-reference/reference/forms-other-types#updateforminput) | An object containing the form's properties to update.                  |

## Update form question

Updates the properties of an existing question. Returns [`FormQuestion`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestion).

```graphql GraphQL
mutation {
  update_form_question(
    formToken: "YOUR_FORM_TOKEN"
    questionId: "Q1"
    question: {
      type: Name
      description: "Enter your name."
      settings: {
        prefill: {
          enabled: false
        }
      }
    }
  ) {
    description
    settings {
      prefill {
        enabled
      }
    }
  }
}
```
```json JSON
{
  "data": {
    "update_form_question": {
      "description": "Enter your name.",
      "settings": {
        "prefill": {
          "enabled": false
        }
      }
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument   | Type                                                                                                                 | Description                                                            |
| :--------- | :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken  | `String!`                                                                                                            | The form's unique identifier. You can retrieve it from the form's URL. |
| question   | [`UpdateQuestionInput!`](https://developer.monday.com/api-reference/reference/forms-other-types#updatequestioninput) | An object containing the question's updated properties.                |
| questionId | `String!`                                                                                                            | The question's unique identifier.                                      |

## Update form settings

Updates a form's features, appearance, and accessibility options. Returns [`ResponseForm`](https://developer.monday.com/api-reference/reference/forms-other-types#responseform).

```graphql GraphQL
mutation {
  update_form_settings(
    formToken: "YOUR_FORM_TOKEN"
    settings: {
      appearance: {
        isAnonymous: true
      }
      accessibility: {
        language: "en"
      }
    }
  ) {
    isAnonymous
    accessibility {
      language
    }
  }
}
```
```json JSON
{
  "data": {
    "update_form_settings": {
      "isAnonymous": true,
      "accessibility": {
        "language": "en"
      }
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                                                                                                                         | Description                                                            |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`                                                                                                                    | The form's unique identifier. You can retrieve it from the form's URL. |
| settings  | [`UpdateFormSettingsInput!`](https://developer.monday.com/api-reference/reference/forms-other-types#updateformsettingsinput) | An object containing all of the form's configuration inputs.           |

## Set form password

Enables password protection and lets you set one. Returns [`ResponseForm`](https://developer.monday.com/api-reference/reference/forms-other-types#responseform).

```graphql GraphQL
mutation {
  set_form_password(
    formToken: "YOUR_FORM_TOKEN"
    input: {
      password: "NEW_PASSWORD"
    }
  ) {
    id
    title
  }
}
```
```json JSON
{
  "data": {
    "set_form_password": {
      "id": 123456789,
      "title": "Contact Information"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                                                                                                                   | Description                                                            |
| :-------- | :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`                                                                                                              | The form's unique identifier. You can retrieve it from the form's URL. |
| input     | [`SetFormPasswordInput!`](https://developer.monday.com/api-reference/reference/forms-other-types#setformpasswordinput) | The form's password. Must be at least one character long.              |

## Shorten form URL

Shortens a form's URL and stores it in the form’s settings. Returns [`FormShortenedLink`](https://developer.monday.com/api-reference/reference/forms-other-types#formshortenedlink) which contains the shortened link object.

```graphql GraphQL
mutation {
  shorten_form_url(
    formToken: "YOUR_FORM_TOKEN"
  ) {
    enabled
    url
  }
}
```
```json JSON
{
  "data": {
    "shorten_form_url": {
      "enabled": true,
      "url": "https://wkf.ms/0oOoOoO"
    }
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type      | Description                                                            |
| :-------- | :-------- | :--------------------------------------------------------------------- |
| formToken | `String!` | The form's unique identifier. You can retrieve it from the form's URL. |

## Deactivate form

Deactivates an existing form, hiding it from users and blocking new submissions. Returns a Boolean indicating whether the deactivation was successful.

```graphql GraphQL
mutation {
  deactivate_form(
    formToken: "YOUR_FORM_TOKEN"
  )
}
```
```json JSON
{
  "data": {
    "deactivate_form": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type      | Description                                                            |
| :-------- | :-------- | :--------------------------------------------------------------------- |
| formToken | `String!` | The form's unique identifier. You can retrieve it from the form's URL. |

## Delete question

Permanently deletes an existing question from a form. Returns a Boolean indicating whether the deletion was successful.

**Note:** Deleting a question is permanent. It can't be retrieved once it is deleted.

```graphql GraphQL
mutation {
  delete_question(
    formToken: "YOUR_FORM_TOKEN"
    questionId: "YOUR_QUESTION_ID"
  )
}
```
```json JSON
{
  "data": {
    "delete_question": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument   | Type      | Description                                                            |
| :--------- | :-------- | :--------------------------------------------------------------------- |
| formToken  | `String!` | The form's unique identifier. You can retrieve it from the form's URL. |
| questionId | `String!` | The question's unique identifier.                                      |

## Delete form tag

Permanently deletes a tag from a form. Returns a Boolean indicating whether the deletion was successful.

```graphql GraphQL
mutation {
  delete_form_tag(
    formToken: "YOUR_FORM_TOKEN"
    tagId: "YOUR_TAG_ID"
    options: {
      deleteAssociatedColumn: true
    }
  )
}
```
```json JSON
{
  "data": {
    "delete_form_tag": true
  },
  "extensions": {
    "request_id": "YOUR_REQUEST_ID"
  }
}
```

### Arguments

| Argument  | Type                                                                                                              | Description                                                            |
| :-------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| formToken | `String!`                                                                                                         | The form's unique identifier. You can retrieve it from the form's URL. |
| options   | [`DeleteFormTagInput`](https://developer.monday.com/api-reference/reference/forms-other-types#deleteformtaginput) | The options for deleting the tag.                                      |
| tagId     | `String!`                                                                                                         | The tag's unique identifier.                                           |
