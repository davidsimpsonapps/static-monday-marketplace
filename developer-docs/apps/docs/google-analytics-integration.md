---
updatedAt: 2025-10-23T05:28:14.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Google Analytics integration

Learn how to integrate your app listing page with Google Analytics

In addition to our built-in [app](https://developer.monday.com/apps/docs/app-analytics) and [sales](https://developer.monday.com/apps/docs/sales-analytics) analytics, you can integrate your app with [Google Analytics 4](https://support.google.com/analytics/answer/10089681?hl=en) to generate even more data and insights.

# How it works

All you have to do is enter your [GA4 tag ID](https://support.google.com/analytics/answer/9539598) in the Google Analytics tab and click **Save**. This will add your tag to the app listing page on the [public marketplace](https://monday.com/marketplace).

Once added, it can take up to **three hours** to start receiving data.

# Events

Google Analytics provides [select events](https://support.google.com/analytics/answer/9234069?hl=en\&ref_topic=13367566\&sjid=6143978983015612655-NC) by default, or you can configure the following custom tracking events.

## Custom tracking events

### `listing_page_tab_clicked`

This event is triggered when a user clicks one of the tabs on the app listing page.

#### **Attributes**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>

      <th>
        Expected value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `app_id`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>
        Number
      </td>
    </tr>

    <tr>
      <td>
        `tab_type`
      </td>

      <td>
        The tab that was clicked on the app listing page.
      </td>

      <td>
        `overview`\
        `permissions`\
        `pricing`\
        `security`
      </td>
    </tr>
  </tbody>
</Table>

### `listing_page_gallery_browsed`

This event is triggered when a browses the app listing page image gallery.

#### **Attributes**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>

      <th>
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `app_id`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>
        Number
      </td>
    </tr>

    <tr>
      <td>
        `direction`
      </td>

      <td>
        The direction the user looked.
      </td>

      <td>
        `left`\
        `right`
      </td>
    </tr>
  </tbody>
</Table>

### `listing_page_resource_link_clicked`

This event is triggered when a user clicks on one of the resource links.

#### **Attributes**

| Attribute | Description                            | Value  |
| :-------- | :------------------------------------- | :----- |
| `app_id`  | The app's unique identifier.           | Number |
| `url`     | The URL that was clicked.              | String |
| `label`   | The label of the URL that was clicked. | String |

### `listing_page_pricing_period_selected`

This event is triggered when a user selects different pricing periods in the *Pricing* tab.

#### **Attributes**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Attribute
      </th>

      <th>
        Description
      </th>

      <th>
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `app_id`
      </td>

      <td>
        The app's unique identifier.
      </td>

      <td>
        Number
      </td>
    </tr>

    <tr>
      <td>
        `period`
      </td>

      <td>
        The payment period that was selected.
      </td>

      <td>
        `monthly`\
        `yearly`
      </td>
    </tr>
  </tbody>
</Table>

### `listing_page_sign_in_to_install_clicked`

This event is triggered when a user clicks the *Sign in to install* button.

#### **Attributes**

| Attribute | Description                  | Value  |
| :-------- | :--------------------------- | :----- |
| `app_id`  | The app's unique identifier. | Number |
