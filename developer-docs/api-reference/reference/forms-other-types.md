---
updatedAt: 2026-09-06T08:35:49.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Other Types

Learn more about the other types used when reading, creating, updating, and deleting forms via the API

The monday.com [`form`](https://developer.monday.com/api-reference/reference/form) API lets you query a form’s configuration, appearance, and behavior. With it, you can programmatically access settings such as accessibility, visual styles, features, questions, and tags.

Each of the object types described below represents a specific aspect of a form. They can be queried as subfields on the [`form`](https://developer.monday.com/api-reference/reference/form) query or provide form metadata in mutations.

# CreateFormTagInput

An object containing the form tag's properties.

> ❗️ Breaking change in `2026-10`
>
> The `value` field on `CreateFormTagInput` was **removed** in API version `2026-10`. Remove `value` from any `create_form_tag` calls before migrating to `2026-10`.

| Field | Type      | Description     |
| :---- | :-------- | :-------------- |
| name  | `String!` | The tag's name. |

***

# CreateQuestionInput

An object containing the form question's properties.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        description `String`
      </td>

      <td>
        The question's description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        options [`[QuestionOptionInput!]`](https://developer.monday.com/api-reference/reference/forms-other-types#questionoptioninput)
      </td>

      <td>

      </td>

      <td>
        label `String!`
      </td>
    </tr>

    <tr>
      <td>
        required `Boolean`
      </td>

      <td>
        Whether the question must be answered to submit the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings [`FormQuestionSettingsInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestionsettingsinput)
      </td>

      <td>
        The question's type-specific settings.
      </td>

      <td>
        checkedByDefault `Boolean`  
        defaultCurrentDate `Boolean`  
        display `FormQuestionSelectDisplay`  
        includeTime `Boolean`  
        locationAutofilled `Boolean`  
        optionsOrder `FormQuestionSelectOrderByOptions`  
        prefill `PrefillSettingsInput`  
        prefixAutofilled `Boolean`  
        prefixPredefined `PhonePrefixPredefinedInput`  
        skipValidation `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        title `String!`
      </td>

      <td>
        The question's title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type [`FormQuestionType!`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestiontype)
      </td>

      <td>
        The question's type. Determines input behavior and validation.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        visible `Boolean`
      </td>

      <td>
        Whether the question is visible to respondents. Hidden questions remain in the form structure but aren't displayed to respondents. The default is `true`.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        show_if_rules `JSON`
      </td>

      <td>
        Conditional logic rules that determine whether the question is displayed, based on responses to other questions. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        existing_column_id `String`
      </td>

      <td>
        The ID of an existing board column to link this question to. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        insert_after_question_id `String`
      </td>

      <td>
        The ID of the question after which this new question should be inserted. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        page_block_id `String`
      </td>

      <td>
        The ID of the page block this question belongs to. Only relevant for `PAGE_BLOCK`-type questions. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## QuestionOptionInput

An array of objects defining labels for choice-based option questions.

| Field             | Description                                                                                       |
| :---------------- | :------------------------------------------------------------------------------------------------ |
| label `String!`   | The option's label to display.                                                                    |
| value `String`    | The option's internal value. **Only available in versions `2026-07` and later.**                  |
| visible `Boolean` | Whether the option is visible to respondents. **Only available in versions `2026-07` and later.** |

***

# DehydratedFormResponse

An object containing the result of creating a new form via the API.

| Field           | Description                                               |
| :-------------- | :-------------------------------------------------------- |
| boardId `ID!`   | The unique identifier of the board connected to the form. |
| token `String!` | The form's unique identifier.                             |

***

# DeleteFormTagInput

Defines the options for deleting a tag from a form via the API.

| Field                            | Description                                      |
| :------------------------------- | :----------------------------------------------- |
| deleteAssociatedColumn `Boolean` | Whether the associated column should be deleted. |

***

# FormAccessibility

An object containing the form's accessibility options.

| Field                | Description                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------- |
| language `String`    | The language code for the form's localization and interface text (e.g., "es", "en", "fr"). |
| logoAltText `String` | The form's logo image alternative text description.                                        |

***

# FormAppearance

An object containing the form’s overall visual appearance (e.g., background, layout, colors, typography).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        background [`FormBackground`](https://developer.monday.com/api-reference/reference/forms-other-types#formbackground)
      </td>

      <td>
        An object containing the form's background appearance configuration.
      </td>

      <td>
        type `FormBackgrounds`  
        value `String`
      </td>
    </tr>

    <tr>
      <td>
        hideBranding `Boolean!`
      </td>

      <td>
        Whether monday.com branding is hidden.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        layout [`FormLayout`](https://developer.monday.com/api-reference/reference/forms-other-types#formlayout)
      </td>

      <td>
        An object containing the form's structure and presentation settings.
      </td>

      <td>
        alignment `FormAlignment`  
        direction `FormDirection`  
        format `FormFormat`
      </td>
    </tr>

    <tr>
      <td>
        logo [`FormLogo`](https://developer.monday.com/api-reference/reference/forms-other-types#formlogo)
      </td>

      <td>
        An object containing the form's logo display configurations.
      </td>

      <td>
        position `FormLogoPosition`  
        size `FormLogoSize`  
        url `String`
      </td>
    </tr>

    <tr>
      <td>
        primaryColor `String`
      </td>

      <td>
        The HEX color code of the primary theme color used in the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        showProgressBar `Boolean!`
      </td>

      <td>
        Whether an indicator showing the form's completion progress bar is displayed.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        submitButton [`FormSubmitButton`](https://developer.monday.com/api-reference/reference/forms-other-types#formsubmitbutton)
      </td>

      <td>
        An object containing the form's submit button configurations.
      </td>

      <td>
        text `String`
      </td>
    </tr>

    <tr>
      <td>
        text [`FormText`](https://developer.monday.com/api-reference/reference/forms-other-types#formtext)
      </td>

      <td>
        An object containing the form's typography and text styling configurations.
      </td>

      <td>
        color `String`  
        font `String`  
        size `FormFontSize`
      </td>
    </tr>
  </tbody>
</Table>

## FormBackground

Configures the form’s background (e.g., color, image, or none).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        type `FormBackgrounds`
      </td>

      <td>
        The form's background type.
      </td>

      <td>
        `Color`  
        `Image`  
        `None`
      </td>
    </tr>

    <tr>
      <td>
        value `String`
      </td>

      <td>
        The form's background value.

        * For `Color`, it's a HEX color code.
        * For `Image`, it's the image's URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## FormLayout

Defines the form's layout, alignment, and format.

> ❗️ Breaking change in `2026-10`
>
> The `format` field and the `FormFormat` enum type were **removed** in API version `2026-10`. Remove references to `format` and `FormFormat` before migrating to `2026-10`.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        alignment `FormAlignment`
      </td>

      <td>
        The form's text and content alignment.
      </td>

      <td>
        `Center`  
        `FullLeft`  
        `FullRight`  
        `Left`  
        `Right`
      </td>
    </tr>

    <tr>
      <td>
        direction `FormDirection`
      </td>

      <td>
        The form's reading direction.
      </td>

      <td>
        `LtR`  
        `Rtl`
      </td>
    </tr>
  </tbody>
</Table>

## FormLogo

Configures the form’s logo (e.g., placement, size, and image URL).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        position `FormLogoPosition`
      </td>

      <td>
        The form's logo placement.
      </td>

      <td>
        `Auto`  
        `Center`  
        `Left`  
        `Right`
      </td>
    </tr>

    <tr>
      <td>
        size `FormLogoSize`
      </td>

      <td>
        The form's logo size.
      </td>

      <td>
        `ExtraLarge` (96px height)  
        `Large` (72px height)  
        `Medium` (40px height)  
        `Small` (32px height)
      </td>
    </tr>

    <tr>
      <td>
        url `String`
      </td>

      <td>
        The URL for the form's logo.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## FormSubmitButton

Defines the form's submit button text.

| Field         | Description                                            |
| :------------ | :----------------------------------------------------- |
| text `String` | The custom text displayed on the form's submit button. |

## FormText

Defines the form's typography configuration.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        color `String`
      </td>

      <td>
        The form's text HEX color code.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        font `String`
      </td>

      <td>
        The form's font family.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        size `FormFontSize`
      </td>

      <td>
        The form's base text size.
      </td>

      <td>
        `Large`  
        `Medium`  
        `Small`
      </td>
    </tr>
  </tbody>
</Table>

***

# FormFeatures

An object containing form-level features like login requirements, response limits, and password protection.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        afterSubmissionView [`FormAfterSubmissionView`](https://developer.monday.com/api-reference/reference/forms-other-types#formaftersubmissionview)
      </td>

      <td>
        An object containing the form's post-submission configuration.
      </td>

      <td>
        allowEditSubmission `Boolean!`  
        allowResubmit `Boolean!`  
        allowViewSubmission `Boolean!`  
        description `String`  
        redirectAfterSubmission [`FormRedirectAfterSubmission`](https://developer.monday.com/api-reference/reference/forms-other-types#formredirectaftersubmission)  
        showSuccessImage `Boolean!`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        closeDate [`FormCloseDate`](https://developer.monday.com/api-reference/reference/forms-other-types#formclosedate)
      </td>

      <td>
        An object containing the form's automatic closure configuration.
      </td>

      <td>
        date `String`  
        enabled `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        draftSubmission [`FormDraftSubmission`](https://developer.monday.com/api-reference/reference/forms-other-types#formdraftsubmission)
      </td>

      <td>
        An object containing the form's draft saving configuration.
      </td>

      <td>
        enabled `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        isInternal `Boolean!`
      </td>

      <td>
        Whether the form is restricted to internal users only.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        monday [`FormMonday`](https://developer.monday.com/api-reference/reference/forms-other-types#formmonday)
      </td>

      <td>
        An object containing the board's settings for response handling.
      </td>

      <td>
        includeNameQuestion `Boolean!`  
        includeUpdateQuestion `Boolean!`  
        itemGroupId `String`  
        syncQuestionAndColumnsTitles `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        password [`FormPassword`](https://developer.monday.com/api-reference/reference/forms-other-types#formpassword)
      </td>

      <td>
        An object containing the form's password protection configuration.
      </td>

      <td>
        enabled `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        preSubmissionView [`FormPreSubmissionView`](https://developer.monday.com/api-reference/reference/forms-other-types#formpresubmissionview)
      </td>

      <td>
        An object containing the form's welcome screen configuration.
      </td>

      <td>
        description `String`  
        enabled `Boolean!`  
        startButton `FormStartButton`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        reCaptchaChallenge `Boolean!`
      </td>

      <td>
        Whether the form has reCAPTCHA verification enabled to prevent spam submissions.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        requireLogin [`FormRequireLogin`](https://developer.monday.com/api-reference/reference/forms-other-types#formrequirelogin)
      </td>

      <td>
        An object containing the form's login requirement settings.
      </td>

      <td>
        enabled `Boolean!`  
        redirectToLogin `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        responseLimit [`FormResponseLimit`](https://developer.monday.com/api-reference/reference/forms-other-types#formresponselimit)
      </td>

      <td>
        An object containing the form's response limitation settings.
      </td>

      <td>
        enabled `Boolean!`  
        limit `Int`
      </td>
    </tr>

    <tr>
      <td>
        shortenedLink [`FormShortenedLink`](https://developer.monday.com/api-reference/reference/forms-other-types#formshortenedlink)
      </td>

      <td>
        An object containing the form's shortened URL configuration.
      </td>

      <td>
        enabled `Boolean!`  
        url `String`
      </td>
    </tr>
  </tbody>
</Table>

## FormAfterSubmissionView

An object containing the form's post-submission settings.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        allowEditSubmission `Boolean!`
      </td>

      <td>
        Whether users can edit their responses after submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        allowResubmit `Boolean!`
      </td>

      <td>
        Whether users can submit multiple responses to the same form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        allowViewSubmission `Boolean!`
      </td>

      <td>
        Whether users can view their answers after submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description `String`
      </td>

      <td>
        The text displayed after form submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        redirectAfterSubmission [`FormRedirectAfterSubmission`](https://developer.monday.com/api-reference/reference/forms-other-types#formredirectaftersubmission)
      </td>

      <td>
        An object containing the redirect configuration after form submission.
      </td>

      <td>
        enabled `Boolean!`  
        redirectUrl `String`
      </td>
    </tr>

    <tr>
      <td>
        showSuccessImage `Boolean!`
      </td>

      <td>
        Whether a success image appears after form submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title `String`
      </td>

      <td>
        The title text displayed after form submission.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### **FormRedirectAfterSubmission**

An object containing the form's post-submission redirect configuration.

| Field                | Description                                                                               |
| :------------------- | :---------------------------------------------------------------------------------------- |
| enabled `Boolean!`   | Whether responders are automatically redirected to a specified URL after form completion. |
| redirectUrl `String` | The URL where users are redirected after successfully completing the form.                |

## FormCloseDate

An object containing the form's automatic closure configuration.

| Field              | Description                                                                       |
| :----------------- | :-------------------------------------------------------------------------------- |
| date `String`      | The ISO 8601 timestamp when the form will automatically stop accepting responses. |
| enabled `Boolean!` | Whether the form automatically closes at a specified date and time.               |

## FormDraftSubmission

An object containing the form's draft saving configuration.

| Field              | Description                                                       |
| :----------------- | :---------------------------------------------------------------- |
| enabled `Boolean!` | Whether users are allowed to save incomplete responses as drafts. |

## FormMonday

An object containing the form's board settings for response handling.

| Field                                   | Description                                                                                              |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| includeNameQuestion `Boolean!`          | Whether a name question is added to the form. Corresponds to the item name column on the board.          |
| includeUpdateQuestion `Boolean!`        | Whether an update field is added to the form. Corresponds to the updates section of the associated item. |
| itemGroupId `String`                    | The board group ID where new items will be created from form responses.                                  |
| syncQuestionAndColumnsTitles `Boolean!` | Whether the form question title syncs with the board column name.                                        |

## FormPassword

An object containing the form's password protection configuration.

| Field              | Description                                             |
| :----------------- | :------------------------------------------------------ |
| enabled `Boolean!` | Whether users must enter a password to access the form. |

## FormPreSubmissionView

An object containing the settings for the optional welcome screen shown before the form begins.

| Field                         | Description                                                                   | Supported Fields |
| :---------------------------- | :---------------------------------------------------------------------------- | :--------------- |
| description `String`          | The text displayed on the welcome screen (e.g., extra context, instructions). |                  |
| enabled `Boolean!`            | Whether a welcome screen is displayed before starting the form.               |                  |
| startButton `FormStartButton` | An object containing the form's welcome screen start button configuration.    | text `String`    |
| title `String`                | The title text displayed on the welcome screen.                               |                  |

## FormRequireLogin

An object containing the form's login requirement settings.

| Field                      | Description                                                                   |
| :------------------------- | :---------------------------------------------------------------------------- |
| enabled `Boolean!`         | Whether the form requires users to log in before submitting responses.        |
| redirectToLogin `Boolean!` | Whether unauthenticated users are automatically redirected to the login page. |

## FormResponseLimit

An object containing the form's response limitation settings.

| Field              | Description                                     |
| :----------------- | :---------------------------------------------- |
| enabled `Boolean!` | Whether the form's response limits are enabled. |
| limit `Int`        | The maximum number of form responses allowed.   |

## FormShortenedLink

An object containing the form's shortened URL configuration.

| Field              | Description                                                                           |
| :----------------- | :------------------------------------------------------------------------------------ |
| enabled `Boolean!` | Whether shortened URLs can be generated.                                              |
| url `String`       | The form's generated, shortened URL. Only available when shortened links are enabled. |

***

# FormQuestion

An array of objects containing the form's question content, in display order.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        description `String`
      </td>

      <td>
        Optional text providing additional context, instructions, or examples for the question.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id `String!`
      </td>

      <td>
        The question's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        options [`[FormQuestionOption!]`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestionoption)
      </td>

      <td>
        The available options for choice-based questions. Each option defines a display label.
      </td>

      <td>
        label `String!`
      </td>
    </tr>

    <tr>
      <td>
        required `Boolean!`
      </td>

      <td>
        Whether the question must be answered to submit the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings [`FormQuestionSettings`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestionsettings)
      </td>

      <td>
        An object containing question type-specific configurations.
      </td>

      <td>
        checkedByDefault `Boolean`  
        defaultCurrentDate `Boolean`  
        display `FormQuestionSelectDisplay`  
        includeTime `Boolean`  
        limit `Int`  
        locationAutofilled `Boolean`  
        optionsOrder `FormQuestionSelectOrderByOptions`  
        prefill `PrefillSettings`  
        prefixAutofilled `Boolean`  
        prefixPredefined `PhonePrefixPredefined`  
        skipValidation `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        show_if_rules `JSON`
      </td>

      <td>
        Conditional logic rules that determine whether the question is displayed, based on responses to other questions. **Only available in versions `2026-07` and later.** The camelCase alias `showIfRules` was removed in `2026-10` — use `show_if_rules` instead.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title `String!`
      </td>

      <td>
        The question's title. Must be at least one character long.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type [`FormQuestionType`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestiontype)
      </td>

      <td>
        The question's type. Determines input behavior and validation.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        visible `Boolean!`
      </td>

      <td>
        Whether the question is visible to responders. Hidden questions remain in the form structure but aren't displayed to responders.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## FormQuestionOption

An array containing the available options for choice-based questions.

| Field           | Description                                                                |
| :-------------- | :------------------------------------------------------------------------- |
| label `String!` | The display text for individual option choices (in select-type questions). |

## FormQuestionSettings

An object containing the form's question type-specific configuration. If a type-specific setting is provided (e.g., includeTime), the form must contain a question of that type, or the mutation won't work.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        checkedByDefault `Boolean`
      </td>

      <td>
        Whether the box should be checked by default. **Only for boolean and checkbox questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        defaultCurrentDate `Boolean`
      </td>

      <td>
        Whether the current date is set as the default value. **Only for date questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        display `FormQuestionSelectDisplay`
      </td>

      <td>
        The display options for select-type questions. **Only for single or multiple select questions.**
      </td>

      <td>
        `Dropdown`  
        `Horizontal`  
        `Vertical`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        includeTime `Boolean`
      </td>

      <td>
        Whether the time selection (hours and minutes) is included with the date selector. If `false`, only the date is included. **Only for date questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        limit `Int`
      </td>

      <td>
        The maximum rating value that can be selected. **Only for rating questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        locationAutofilled `Boolean`
      </td>

      <td>
        Whether the responder's location is automatically detected and filled. Uses the browser's geolocation services. Requires user permission. **Only for location questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        optionsOrder `FormQuestionSelectOrderByOptions`
      </td>

      <td>
        The ordering options for select questions. **Only for single or multiple select questions.**
      </td>

      <td>
        `Alphabetical`  
        `Custom`  
        `Random`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        prefill [`PrefillSettings`](https://developer.monday.com/api-reference/reference/forms-other-types#prefillsettings)
      </td>

      <td>
        The configuration for automatically populating question values.
      </td>

      <td>

      </td>

      <td>
        enabled `Boolean!`  
        lookup `String!`  
        source `FormQuestionPrefillSources`
      </td>
    </tr>

    <tr>
      <td>
        prefixAutofilled `Boolean`
      </td>

      <td>
        Whether the phone country prefix is automatically detected and filled. Uses the responder's geographic location or browser settings. **Only for phone questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        prefixPredefined [`PhonePrefixPredefined`](https://developer.monday.com/api-reference/reference/forms-other-types#phoneprefixpredefined)
      </td>

      <td>
        The configuration for setting a predefined phone country prefix that will be pre-selected for responders. **Only for phone questions.**
      </td>

      <td>

      </td>

      <td>
        enabled `Boolean!`  
        prefix `String`
      </td>
    </tr>

    <tr>
      <td>
        skipValidation `Boolean`
      </td>

      <td>
        Whether URL format validation is skipped, allowing any text input. **Only for link/URL questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### PhonePrefixPredefined

Defines the configuration for pre-selecting a phone country prefix for responders.

| Field              | Description                                                                                                                             |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| enabled `Boolean!` | Whether a pre-defined phone country prefix is enabled for phone number questions. If `true`, the specified prefix will be pre-selected. |
| prefix `String`    | The predefined phone country prefix in capital letters (e.g., "US", "UK").                                                              |

### PrefillSettings

Defines the configuration for auto-populating question values.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        enabled `Boolean!`
      </td>

      <td>
        Whether the question's prefill functionality is enabled. If `true`, the values will be auto-populated from the specified source.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        lookup `String!`
      </td>

      <td>
        The field or parameter name to lookup from the prefill source. For `Account` sources, this is a user property like name or email. For `QueryParam` sources, this is the parameter name that's set in the URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        source `FormQuestionPrefillSources`
      </td>

      <td>
        The sources for prefilling question values.
      </td>

      <td>
        `Account`  
        `QueryParam`
      </td>
    </tr>
  </tbody>
</Table>

***

# FormQuestionType

Supported enum values for `FormQuestionType`.

|         |                 |           |             |              |          |         |
| ------- | --------------- | --------- | ----------- | ------------ | -------- | ------- |
| Boolean | ConnectedBoards | Country   | Date        | DateRange    | Email    | File    |
| Link    | Location        | LongText  | MultiSelect | Name         | Number   | People  |
| Phone   | Rating          | ShortText | Signature   | SingleSelect | Subitems | Updates |

The following values are available in API version `2026-07` and later:

| `HOUR` | `DISPLAY_TEXT` | `PAGE_BLOCK` |
| ------ | -------------- | ------------ |

***

# FormTag

An array of tracking tags for categorization and analytics.

```graphql GraphQL
query {
  form(formToken: "YOUR_FORM_TOKEN") {
    tags {
      id
      name
      value
      columnId
    }
  }
}
```
```json JSON
{
  "data": {
    "form": {
      "tags": [
        {
          "id": "8f2a91c4-6d9a-49c3-bf12-93b4f019d7e1",
          "columnId": "short_textxjwe48lm",
          "value": "ENGLISH",
          "name": "LANGUAGE"
        }
      ]
    }
  },
  "extensions": {
    "request_id": "2d74c9f0-5b21-4e68-a123-8f91bb47e0cd"
  }
}
```

> ❗️ Breaking change in `2026-10`
>
> The `value` field on `FormTag` was **removed** in API version `2026-10`. Remove any queries requesting `value` from form tags before migrating to `2026-10`.

| Field              | Description                                                     |
| :----------------- | :-------------------------------------------------------------- |
| columnId `String!` | The unique identifier of the column the tag is associated with. |
| id `String!`       | The tag's unique identifier.                                    |
| name `String!`     | The tag's name.                                                 |

***

# ResponseForm

An object containing the form's accessibility, appearance, features, questions, and tags.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Subfields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        accessibility [`FormAccessibility`](https://developer.monday.com/api-reference/reference/forms-other-types#formaccessibility)
      </td>

      <td>
        The form's accessibility settings.
      </td>

      <td>
        language `String`  
        logoAltText `String`
      </td>
    </tr>

    <tr>
      <td>
        active `Boolean!`
      </td>

      <td>
        Whether the form is visible and accepting responses.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        appearance [`FormAppearance`](https://developer.monday.com/api-reference/reference/forms-other-types#formappearance)
      </td>

      <td>
        The form's visual style settings.
      </td>

      <td>
        background `FormBackground`  
        hideBranding `Boolean!`  
        layout `FormLayout`  
        logo `FormLogo`  
        primaryColor `String`  
        showProgressBar `Boolean!`  
        submitButton `FormSubmitButton`  
        text `FormText`
      </td>
    </tr>

    <tr>
      <td>
        createWithAi `Boolean!`
      </td>

      <td>
        Whether the form was originally created with monday.com’s AI-assisted form builder.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description `String`
      </td>

      <td>
        The optional form description, displayed below the title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        features [`FormFeatures`](https://developer.monday.com/api-reference/reference/forms-other-types#formfeatures)
      </td>

      <td>
        The form's toggles and feature settings.
      </td>

      <td>
        afterSubmissionView `FormAfterSubmissionView`  
        closeDate `FormCloseDate`  
        draftSubmission `FormDraftSubmission`  
        isInternal `Boolean!`  
        monday `FormMonday`  
        password `FormPassword`  
        preSubmissionView `FormPreSubmissionView`  
        reCaptchaChallenge `Boolean!`  
        requireLogin `FormRequireLogin`  
        responseLimit `FormResponseLimit`  
        shortenedLink `FormShortenedLink`
      </td>
    </tr>

    <tr>
      <td>
        id `Int!`
      </td>

      <td>
        The form's unique board view identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        isAnonymous `Boolean!`
      </td>

      <td>
        Whether responses are collected anonymously.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        ownerId `Int`
      </td>

      <td>
        The user ID of the form's owner/creator.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        questions [`[FormQuestion!]`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestion)
      </td>

      <td>
        An array of question objects that make up the form, in display order.
      </td>

      <td>
        description `String`  
        id `String!`  
        options `[FormQuestionOption!]`  
        required `Boolean!`  
        settings `FormQuestionSettings`  
        show_if_rules `JSON`  
        title `String!`  
        type `FormQuestionType`  
        visible `Boolean!`
      </td>
    </tr>

    <tr>
      <td>
        tags [`[FormTag!]`](https://developer.monday.com/api-reference/reference/forms-other-types#formtag)
      </td>

      <td>
        Tracking tags for categorization and analytics.
      </td>

      <td>
        columnId `String!`  
        id `String!`  
        name `String!`  
        value `String`
      </td>
    </tr>

    <tr>
      <td>
        title `String!`
      </td>

      <td>
        Title displayed at the top of the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        token `String!`
      </td>

      <td>
        The form's string-based unique token. Used in API queries and mutations.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type `String`
      </td>

      <td>
        The form's type.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

***

# SetFormPasswordInput

An object defining the form's password.

| Field    | Type      | Description          |
| :------- | :-------- | :------------------- |
| password | `String!` | The form's password. |

***

# UpdateFormInput

An object defining the form's properties to update.

| Field                             | Description                                                                                                                                               | Supported Fields                                                     |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| description `String`              | The form's updated description.                                                                                                                           |                                                                      |
| questions `[QuestionOrderInput!]` | An ordered array of all question IDs in the form. Must include every existing question ID, and their order determines the display order of the questions. | id `String!`  page\_block\_id `String` (version `2026-07` and later) |
| title `String`                    | The form's updated title. Must be at least one character long.                                                                                            |                                                                      |

***

# UpdateFormSettingsInput

An object defining the form settings inputs to update.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        accessibility [`FormAccessibilityInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formaccessibilityinput)
      </td>

      <td>
        The form's updated accessibility settings.
      </td>

      <td>
        language `String`  
        logoAltText `String`
      </td>
    </tr>

    <tr>
      <td>
        appearance [`FormAppearanceInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formappearanceinput)
      </td>

      <td>
        The form's updated visual style settings.
      </td>

      <td>
        background `FormBackgroundInput`  
        hideBranding `Boolean`  
        layout `FormLayoutInput`  
        logo `FormLogoInput`  
        primaryColor `String`  
        showProgressBar `Boolean`  
        submitButton `FormSubmitButtonInput`  
        text `FormTextInput`  
        is_anonymous `Boolean` (version `2026-07` and later)
      </td>
    </tr>

    <tr>
      <td>
        features [`FormFeaturesInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formfeaturesinput)
      </td>

      <td>
        The form's updated toggles and feature settings.
      </td>

      <td>
        afterSubmissionView `FormAfterSubmissionViewInput`  
        closeDate `FormCloseDateInput`  
        draftSubmission `FormDraftSubmissionInput`  
        monday `FormMondayInput`  
        password `FormPasswordInput`  
        preSubmissionView `FormPreSubmissionViewInput`  
        reCaptchaChallenge `Boolean`  
        requireLogin `FormRequireLoginInput`  
        responseLimit `FormResponseLimitInput`  
        ai_translate `Boolean` (version `2026-07` and later)
      </td>
    </tr>
  </tbody>
</Table>

## FormAccessibilityInput

An object containing the updated input for the form's updated accessibility options.

| Field                | Description                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------- |
| language `String`    | The language code for the form's localization and interface text (e.g., "es", "en", "fr"). |
| logoAltText `String` | The form's logo image alternative text description.                                        |

## FormAppearanceInput

An object containing the updated input for the form’s overall visual appearance (e.g., background, layout, colors, typography).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        background [`FormBackgroundInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formbackgroundinput)
      </td>

      <td>
        An object containing the form's updated background appearance configuration input.
      </td>

      <td>
        type `FormBackgrounds!`  
        value `String`
      </td>
    </tr>

    <tr>
      <td>
        hideBranding `Boolean`
      </td>

      <td>
        Whether monday.com branding is hidden.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        layout [`FormLayoutInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formlayoutinput)
      </td>

      <td>
        An object containing the form's updated structure and presentation settings input.
      </td>

      <td>
        alignment `FormAlignment`  
        direction `FormDirection`  
        format `FormFormat`
      </td>
    </tr>

    <tr>
      <td>
        logo [`FormLogoInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formlogoinput)
      </td>

      <td>
        An object containing the form's updated logo display configuration input.
      </td>

      <td>
        position `FormLogoPosition`  
        size `FormLogoSize`  
        url `String`
      </td>
    </tr>

    <tr>
      <td>
        primaryColor `String`
      </td>

      <td>
        The HEX color code of the primary theme color used in the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        showProgressBar `Boolean`
      </td>

      <td>
        Whether an indicator showing the form's updated completion progress bar is displayed.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        submitButton [`FormSubmitButtonInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formsubmitbuttoninput)
      </td>

      <td>
        An object containing the form's updated submit button configuration input.
      </td>

      <td>
        text `String`
      </td>
    </tr>

    <tr>
      <td>
        text [`FormTextInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formtextinput)
      </td>

      <td>
        An object containing the form's updated typography and text styling configuration input.
      </td>

      <td>
        color `String`  
        font `String`  
        size `FormFontSize`
      </td>
    </tr>
  </tbody>
</Table>

### FormBackgroundInput

Configures the form’s updated background input (e.g., color, image, or none).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        type `FormBackgrounds!`
      </td>

      <td>
        The form's background type.
      </td>

      <td>
        `Color`  
        `Image`  
        `None`
      </td>
    </tr>

    <tr>
      <td>
        value `String`
      </td>

      <td>
        The form's background value.

        * For `Color`, it's a HEX color code.
        * For `Image`, it's the image's URL.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### FormLayoutInput

Defines the form's updated layout, alignment, and format input.

> ❗️ Breaking change in `2026-10`
>
> The `format` field was **removed** in API version `2026-10`. Remove `format` from `FormLayoutInput` inputs before migrating to `2026-10`.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        alignment `FormAlignment`
      </td>

      <td>
        The form's text and content alignment.
      </td>

      <td>
        `Center`  
        `FullLeft`  
        `FullRight`  
        `Left`  
        `Right`
      </td>
    </tr>

    <tr>
      <td>
        direction `FormDirection`
      </td>

      <td>
        The form's reading direction.
      </td>

      <td>
        `LtR`  
        `Rtl`
      </td>
    </tr>
  </tbody>
</Table>

### FormLogoInput

Configures the form’s updated logo input (e.g., placement, size, and image URL).

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        position `FormLogoPosition`
      </td>

      <td>
        The form's logo placement.
      </td>

      <td>
        `Auto`  
        `Center`  
        `Left`  
        `Right`
      </td>
    </tr>

    <tr>
      <td>
        size `FormLogoSize`
      </td>

      <td>
        The form's logo size.
      </td>

      <td>
        `ExtraLarge` (96px height)  
        `Large` (72px height)  
        `Medium` (40px height)  
        `Small` (32px height)
      </td>
    </tr>
  </tbody>
</Table>

### FormSubmitButtonInput

Defines the form's updated submit button text.

| Field         | Description                                            |
| :------------ | :----------------------------------------------------- |
| text `String` | The custom text displayed on the form's submit button. |

### FormTextInput

Defines the form's updated typography configuration.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        color `String`
      </td>

      <td>
        The form's text HEX color code.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        font `String`
      </td>

      <td>
        The form's font family.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        size `FormFontSize`
      </td>

      <td>
        The form's base text size.
      </td>

      <td>
        `Large`  
        `Medium`  
        `Small`
      </td>
    </tr>
  </tbody>
</Table>

## FormFeaturesInput

An object containing the input for form-level features like login requirements, response limits, and password protection.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        afterSubmissionView [`FormAfterSubmissionViewInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formaftersubmissionviewinput)
      </td>

      <td>
        An object containing the form's updated post-submission configuration input.
      </td>

      <td>
        allowEditSubmission `Boolean`  
        allowResubmit `Boolean`  
        allowViewSubmission `Boolean`  
        description `String`  
        redirectAfterSubmission `FormRedirectAfterSubmissionInput`  
        showSuccessImage `Boolean`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        closeDate [`FormCloseDateInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formclosedateinput)
      </td>

      <td>
        An object containing the form's updated automatic closure configuration input.
      </td>

      <td>
        date `String`  
        enabled `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        draftSubmission [`FormDraftSubmissionInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formdraftsubmissioninput)
      </td>

      <td>
        An object containing the form's updated draft saving configuration input.
      </td>

      <td>
        enabled `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        monday [`FormMondayInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formmondayinput)
      </td>

      <td>
        An object containing the updated board's settings input for response handling.
      </td>

      <td>
        includeNameQuestion `Boolean`  
        includeUpdateQuestion `Boolean`  
        itemGroupId `String`  
        syncQuestionAndColumnsTitles `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        password [`FormPasswordInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formpasswordinput)
      </td>

      <td>
        An object containing the form's updated password protection configuration input.
      </td>

      <td>
        enabled `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        preSubmissionView [`FormPreSubmissionViewInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formpresubmissionviewinput)
      </td>

      <td>
        An object containing the form's updated welcome screen configuration input.
      </td>

      <td>
        description `String`  
        enabled `Boolean`  
        startButton `FormStartButtonInput`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        reCaptchaChallenge `Boolean`
      </td>

      <td>
        Whether the form has reCAPTCHA verification enabled to prevent spam submissions.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        requireLogin [`FormRequireLoginInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formrequirelogininput)
      </td>

      <td>
        An object containing the form's updated login requirement settings input.
      </td>

      <td>
        enabled `Boolean`  
        redirectToLogin `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        responseLimit [`FormResponseLimitInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formresponselimitinput)
      </td>

      <td>
        An object containing the form's updated response limitation settings input.
      </td>

      <td>
        enabled `Boolean`  
        limit `Int`
      </td>
    </tr>
  </tbody>
</Table>

### FormAfterSubmissionViewInput

An object containing the form's updated post-submission settings.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        allowEditSubmission `Boolean`
      </td>

      <td>
        Whether users can edit their responses after submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        allowResubmit `Boolean`
      </td>

      <td>
        Whether users can submit multiple responses to the same form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        allowViewSubmission `Boolean`
      </td>

      <td>
        Whether users can view their answers after submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        description `String`
      </td>

      <td>
        The text displayed after form submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        redirectAfterSubmission [`FormRedirectAfterSubmissionInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formredirectaftersubmissioninput)
      </td>

      <td>
        An object containing the redirect configuration after form submission.
      </td>

      <td>
        enabled `Boolean`  
        redirectUrl `String`
      </td>
    </tr>

    <tr>
      <td>
        showSuccessImage `Boolean`
      </td>

      <td>
        Whether a success image appears after form submission.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title `String`
      </td>

      <td>
        The title text displayed after form submission.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

#### **FormRedirectAfterSubmissionInput**

An object containing the form's updated post-submission redirect configuration input.

| Field                | Description                                                                               |
| :------------------- | :---------------------------------------------------------------------------------------- |
| enabled `Boolean`    | Whether responders are automatically redirected to a specified URL after form completion. |
| redirectUrl `String` | The URL where users are redirected after successfully completing the form.                |

### FormCloseDateInput

An object containing the form's updated automatic closure configuration.

| Field             | Description                                                                       |
| :---------------- | :-------------------------------------------------------------------------------- |
| date `String`     | The ISO 8601 timestamp when the form will automatically stop accepting responses. |
| enabled `Boolean` | Whether the form automatically closes at a specified date and time.               |

### FormDraftSubmissionInput

An object containing the form's updated draft saving configuration input.

| Field             | Description                                                       |
| :---------------- | :---------------------------------------------------------------- |
| enabled `Boolean` | Whether users are allowed to save incomplete responses as drafts. |

### FormMondayInput

An object containing the form's updated board settings input for response handling.

| Field                                  | Description                                                                                                                |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| includeNameQuestion `Boolean`          | Whether a name question is added to the form. Corresponds to the item name column on the board.                            |
| includeUpdateQuestion `Boolean`        | Whether an update field is added to the form. Corresponds to the updates section of the associated item.                   |
| itemGroupId `String`                   | The board group ID where new items will be created from form responses.                                                    |
| syncQuestionAndColumnsTitles `Boolean` | Whether the form question title syncs with the board column name.                                                          |
| allow\_create\_item `Boolean`          | Whether submitting the form creates a new item on the connected board. **Only available in versions `2026-07` and later.** |

### FormPasswordInput

An object containing the form's updated password protection configuration input.

| Field             | Description                                                                                                                                                       |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled `Boolean` | Whether users must enter a password to access the form. This can only be used to disable password protection. To enable it, use the `set_form_password` mutation. |

### FormPreSubmissionViewInput

An object containing the updated settings input for the optional welcome screen shown before the form begins.

| Field                              | Description                                                                      | Supported Fields |
| :--------------------------------- | :------------------------------------------------------------------------------- | :--------------- |
| description `String`               | The text displayed on the welcome screen.                                        |                  |
| enabled `Boolean`                  | Whether a welcome screen is displayed before starting the form.                  |                  |
| startButton `FormStartButtonInput` | An object containing the form's welcome screen start button configuration input. | text `String`    |
| title `String`                     | The title text displayed on the welcome screen.                                  |                  |

### FormRequireLoginInput

An object containing the form's updated login requirement settings input.

| Field                     | Description                                                                   |
| :------------------------ | :---------------------------------------------------------------------------- |
| enabled `Boolean`         | Whether the form requires users to log in before submitting responses.        |
| redirectToLogin `Boolean` | Whether unauthenticated users are automatically redirected to the login page. |

### FormResponseLimitInput

An object containing the form's updated response limitation settings input.

| Field             | Description                                     |
| :---------------- | :---------------------------------------------- |
| enabled `Boolean` | Whether the form's response limits are enabled. |
| limit `Int`       | The maximum number of form responses allowed.   |

***

# UpdateFormTagInput

> ❗️ Removed in `2026-10`
>
> The `UpdateFormTagInput` type and the `update_form_tag` mutation were **removed** in API version `2026-10`. Remove any usage before migrating.

An object containing the question's updated tags (removed in `2026-10`).

| Field | Type     | Description              |
| :---- | :------- | :----------------------- |
| value | `String` | The tag's updated value. |

***

# UpdateQuestionInput

An object containing the question's updated properties.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        description `String`
      </td>

      <td>
        The question's updated description.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        required `Boolean`
      </td>

      <td>
        Whether the question must be answered to submit the form.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        settings [`FormQuestionSettingsInput`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestionsettingsinput)
      </td>

      <td>
        The question's updated type-specific settings.
      </td>

      <td>
        checkedByDefault `Boolean`  
        defaultCurrentDate `Boolean`  
        display `FormQuestionSelectDisplay`  
        includeTime `Boolean`  
        locationAutofilled `Boolean`  
        optionsOrder `FormQuestionSelectOrderByOptions`  
        prefill `PrefillSettingsInput`  
        prefixAutofilled `Boolean`  
        prefixPredefined `PhonePrefixPredefinedInput`  
        skipValidation `Boolean`
      </td>
    </tr>

    <tr>
      <td>
        title `String`
      </td>

      <td>
        The question's updated title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        type [`FormQuestionType!`](https://developer.monday.com/api-reference/reference/forms-other-types#formquestiontype)
      </td>

      <td>
        The question's updated type that determines input behavior and validation. You can't pass a new question type—it must match the type of the existing question.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        visible `Boolean`
      </td>

      <td>
        Whether the question is visible to respondents. Hidden questions remain in the form structure but aren't displayed to respondents.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        show_if_rules `JSON`
      </td>

      <td>
        Updated conditional logic rules for this question. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        options [`[QuestionOptionInput!]`](https://developer.monday.com/api-reference/reference/forms-other-types#questionoptioninput)
      </td>

      <td>
        The updated options for choice-based questions. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

## FormQuestionSettingsInput

An object containing the question's updated type-specific configuration. If a type-specific setting is provided (e.g., includeTime), the form must contain a question of that type, or the mutation won't work.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Description
      </th>

      <th>
        Enum Values
      </th>

      <th>
        Supported Fields
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        checkedByDefault `Boolean`
      </td>

      <td>
        Whether the box should be checked by default. **Only for boolean and checkbox questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        defaultCurrentDate `Boolean`
      </td>

      <td>
        Whether the current date is set as the default value. **Only for date questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        display `FormQuestionSelectDisplay`
      </td>

      <td>
        The display options for select-type questions. **Only for single or multiple select questions.**
      </td>

      <td>
        `Dropdown`  
        `Horizontal`  
        `Vertical`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        includeTime `Boolean`
      </td>

      <td>
        Whether the time selection (hours and minutes) is included with the date selector. If `false`, only the date is included. **Only for date questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        locationAutofilled `Boolean`
      </td>

      <td>
        Whether the responder's location is automatically detected and filled. Uses the browser's geolocation services. Requires user permission. **Only for location questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        optionsOrder `FormQuestionSelectOrderByOptions`
      </td>

      <td>
        The ordering options for select questions. **Only for single or multiple select questions.**
      </td>

      <td>
        `Alphabetical`  
        `Custom`  
        `Random`
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        prefill [`PrefillSettingsInput`](https://developer.monday.com/api-reference/reference/forms-other-types#prefillsettingsinput)
      </td>

      <td>
        The configuration for automatically populating question values.
      </td>

      <td>

      </td>

      <td>
        enabled `Boolean!`  
        lookup `String`  
        source `FormQuestionPrefillSources`
      </td>
    </tr>

    <tr>
      <td>
        prefixAutofilled `Boolean`
      </td>

      <td>
        Whether the phone country prefix is automatically detected and filled. Uses the responder's geographic location or browser settings. **Only for phone questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        prefixPredefined [`PhonePrefixPredefinedInput`](https://developer.monday.com/api-reference/reference/forms-other-types#phoneprefixpredefinedinput)
      </td>

      <td>
        The configuration for setting a predefined phone country prefix that will be pre-selected for responders. **Only for phone questions.**
      </td>

      <td>

      </td>

      <td>
        enabled `Boolean!`  
        prefix `String`
      </td>
    </tr>

    <tr>
      <td>
        skipValidation `Boolean`
      </td>

      <td>
        Whether URL format validation is skipped, allowing any text input. **Only for link/URL questions.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        label_limit_count_enabled `Boolean`
      </td>

      <td>
        Whether a character count limit is displayed for text input questions. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        default_answer `String`
      </td>

      <td>
        A default answer pre-filled when the question is displayed. **Only available in versions `2026-07` and later.**
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>

### PhonePrefixPredefinedInput

Defines the configuration for pre-selecting a phone country prefix for responders.

| Field              | Description                                                                                                                             |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| enabled `Boolean!` | Whether a pre-defined phone country prefix is enabled for phone number questions. If `true`, the specified prefix will be pre-selected. |
| prefix `String`    | The predefined phone country prefix in capital letters (e.g., "US", "UK").                                                              |

### PrefillSettingsInput

Defines the configuration for auto-populating question values.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
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
        enabled `Boolean!`
      </td>

      <td>
        Whether the question's prefill functionality is enabled. If `true`, the values will be auto-populated from the specified source.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        lookup `String`
      </td>

      <td>
        The field or parameter name to look up from the prefill source. For `Account` sources, this is a user property like name or email. For `QueryParam` sources, this is the parameter name that's set in the URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        source `FormQuestionPrefillSources`
      </td>

      <td>
        The sources for prefilling question values.
      </td>

      <td>
        `Account`  
        `QueryParam`
      </td>
    </tr>
  </tbody>
</Table>
