---
updatedAt: 2026-09-06T08:36:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# Me

Learn how to use API tokens to read user data through the platform API

All monday.com [users](https://developer.monday.com/api-reference/docs/users) have a unique set of user details and different roles within an account. The `me` query returns the user associated with the API token being used, making it useful for identifying the current user's identity, permissions, and profile information.

# Queries

## Get me

* **Required scope: `me:read`**
* Returns an object containing metadata about the user whose API key is being used
* Can only be queried directly at the root; can't be nested within another query

```graphql GraphQL
query {
  me {
    is_guest
    created_at
    name
    id
  }
}
```
```javascript JavaScript
const GET_ME = "query { me { is_guest created_at name id } }";
const seamlessApiClient = new SeamlessApiClient("2025-04");

const response = await seamlessApiClient.request(GET_ME);
```

### Fields

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
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
        account
      </td>

      <td>
        [`Account!`](https://developer.monday.com/api-reference/reference/account#fields)
      </td>

      <td>
        The user's account.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        birthday
      </td>

      <td>
        `Date`
      </td>

      <td>
        The user's date of birth. Returned as _YYYY-MM-DD_.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        country_code
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's country code.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        created_at
      </td>

      <td>
        `Date`
      </td>

      <td>
        The user's creation date. Returned as _YYYY-MM-DD_.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        current_language
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's language.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        custom_field_metas
      </td>

      <td>
        `[CustomFieldMetas]`
      </td>

      <td>
        The user profile custom fields metadata.
      </td>

      <td>
        description `String`  
        editable `Boolean`  
        field_type `String`  
        flagged `Boolean`  
        icon `String`  
        id `String`  
        position `String`  
        title `String`
      </td>
    </tr>

    <tr>
      <td>
        custom_field_values
      </td>

      <td>
        `[CustomFieldValue]`
      </td>

      <td>
        The user profile custom field values.
      </td>

      <td>
        custom_field_meta_id `String`  
        value `String`
      </td>
    </tr>

    <tr>
      <td>
        department
      </td>

      <td>
        [`Department`](https://developer.monday.com/api-reference/reference/departments)
      </td>

      <td>
        The department(s) the user is a member of. **Only available in versions `2026-04` and later.**
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        email
      </td>

      <td>
        `String!`
      </td>

      <td>
        The user's email.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        enabled
      </td>

      <td>
        `Boolean!`
      </td>

      <td>
        Whether the user is enabled.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        id
      </td>

      <td>
        `ID!`
      </td>

      <td>
        The user's unique identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_admin
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is an admin.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_guest
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is a guest.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_pending
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user hasn't confirmed their email yet.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_verified
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user verified their email.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        is_view_only
      </td>

      <td>
        `Boolean`
      </td>

      <td>
        Whether the user is a viewer.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        join_date
      </td>

      <td>
        `Date`
      </td>

      <td>
        The date the user joined the account. Returned as _YYYY-MM-DD_.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        last_activity
      </td>

      <td>
        `Date`
      </td>

      <td>
        The last date and time the user was active. Returned as _YYYY-MM-DDT00:00:00_.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        location
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's location.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        mobile_phone
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's mobile phone number.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        name
      </td>

      <td>
        `String!`
      </td>

      <td>
        The user's name.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        out_of_office
      </td>

      <td>
        `OutOfOffice`
      </td>

      <td>
        The user's out-of-office status.
      </td>

      <td>
        active `Boolean`  
        disable_notifications `Boolean`  
        end_date `Date`  
        start_date `Date`  
        type `String`
      </td>
    </tr>

    <tr>
      <td>
        phone
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's phone number.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_original
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in its original size.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_small
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in a small size (150x150 px).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_thumb
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in thumbnail size (100x100 px).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_thumb_small
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in a small thumbnail size (50x50 px).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        photo_tiny
      </td>

      <td>
        `String`
      </td>

      <td>
        Returns the URL of the user's uploaded photo in tiny size (30x30 px).
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        sign_up_product_kind
      </td>

      <td>
        `String`
      </td>

      <td>
        The product the user first signed up to.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        teams
      </td>

      <td>
        [`[Team]`](https://developer.monday.com/api-reference/reference/teams#fields)
      </td>

      <td>
        The user's teams.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        time_zone_identifier
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's timezone identifier.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        title
      </td>

      <td>
        `String`
      </td>

      <td>
        The user's title.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        url
      </td>

      <td>
        `String!`
      </td>

      <td>
        The user's profile URL.
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        utc_hours_diff
      </td>

      <td>
        `Int`
      </td>

      <td>
        The user's UTC hours difference.
      </td>

      <td>

      </td>
    </tr>
  </tbody>
</Table>
