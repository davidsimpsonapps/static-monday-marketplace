---
updatedAt: 2025-10-23T06:14:05.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# monday.execute

<HTMLBlock>{`
<style>
.markdown-body img {
  display: block;
  width: 600px !important;
}
</style>
`}</HTMLBlock>

You can use `monday.execute` to invoke an action on the parent monday client.

# Parameters

| Parameter | Description                             |
| :-------- | :-------------------------------------- |
| type      | The action to perform                   |
| params    | The optional parameters for the action. |

# Actions

## addDocBlock

The `addDocBlock` method adds a new block to a workdoc. Check out our [API documentation](https://developer.monday.com/api-reference/docs/blocks) to learn more about document blocks.

### Parameters

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">Parameter</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Required</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>type</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>String</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The block type: <code>normal text</code>, <code>large title</code>, <code>medium title</code>, <code>small title</code>, <code>bulleted list</code>, <code>numbered list</code>, <code>quote</code>, <code>check list</code>, or <code>code</code>.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>afterBlockId</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>String</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Used to specify where in the doc the new block should go. Provide the block&#39;s ID that will be above the new block. Without this parameter, the new block will appear at the top of the doc.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>content</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Object</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The block&#39;s content in <a href="https://quilljs.com/docs/delta/" target="_blank" rel="_nofollow">Delta format</a>.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

Each block's content is defined by a content JSON object containing multiple attributes, one of which is `deltaFormat`. Creating new blocks requires familiarity with the Delta format. We recommend using Quill's <a href="https://github.com/quilljs/delta/" target="_blank" rel="_nofollow">Delta library</a> to format your content.

#### **Example**

```javascript
const addToDoc = () => {
    const { focusedBlocks } = context;
    const afterBlockId = focusedBlocks[0].id;
    const data = {
      type: "normal text",
      content: {
        deltaFormat: [
          {
            insert: newText
          }
        ]
      },
      afterBlockId
    };


    monday.execute("addDocBlock", data);
    monday.execute("closeDocModal");
  };
```

***

## addMultiBlocks

The `addMultiBlocks` method adds multiple blocks to a workdoc. Check out our [API documentation](https://developer.monday.com/api-reference/docs/blocks) to learn more about document blocks.

### Parameters

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">Parameter</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Required</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>afterBlockId</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>String</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Used to specify where in the doc the new block should go. Provide the block&#39;s ID that will be above the new block. Without this parameter, the new block will appear at the top of the doc.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>blocks</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Block[]</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The block&#39;s content in <a href="https://quilljs.com/docs/delta/" target="_blank" rel="_nofollow">Delta format</a>. We support the following block types: <code>normal text</code>, <code>large title</code>, <code>medium title</code>, <code>small title</code>, <code>bulleted list</code>, <code>numbered list</code>, <code>quote</code>, <code>check list</code>, or <code>code</code>.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>parentBlockId</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>String</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The parent block&#39;s unique identifier. Please note that you currently can only use this to add a block to a table.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>No</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

Each block's content is defined by a content JSON object containing multiple attributes, one of which is `deltaFormat`. Creating updating blocks requires familiarity with the Delta format. We recommend using [Quill's Delta library](https://github.com/quilljs/delta/) to format your content.

#### **Example**

```javascript
const contentForBlockOne = {
  deltaFormat: [
    {
      "alignment" : center
    	"insert" : "Block one heading"
    	"attributes" : {
    		"bold" : true
    }
  ]
};

const contentForBlockTwo = {
  deltaFormat: [
    {
      "alignment" : left
      "insert" : "Block two heading",
      "attributes" : {
        "underline" : true
      }
    }
  ]
};

monday.execute("addMultiBlocks", {
  afterBlockId: "7f8c145-989f-48bb-b7f8-dc8f91690g42",
  blocks: [
    {
      type: "large title",
      content: contentForBlockOne
    },
    {
      type: "medium title",
      content: contentForBlockTwo
    }
  ]
})
```

***

## addMultiBlocksFromHtml

The `addMultiBlocksFromHtml` method adds multiple blocks to the beginning of a workdoc using HTML. It is only available for the [doc quickstart AI feature](https://developer.monday.com/apps/docs/ai-assistant#doc-quickstart-ai-assistant).

### Parameters

| Parameter | Type                     | Description                             | Required |
| :-------- | :----------------------- | :-------------------------------------- | :------- |
| html      | HTML stringified element | The HTML elements to add to the blocks. | Yes      |

#### **Example**

```javascript
const html = '<h1>Marketing Brief</h1>\n<h2>Campaign purpose</h2>\n<span>List a purpose</span></html>';

monday.execute("addMultiBlocksFromHtml", {html: html}).then((res) => {});

```

***

## attachExtensionsToColumn

The `attachExtensionsToColumn` method attaches the [board column extension](https://developer.monday.com/apps/docs/board-column-extension) app feature to a column.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("attachExtensionsToColumn");
```

***

## closeAppFeatureModal

The `closeAppFeatureModal` method closes the modal window.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("closeAppFeatureModal").then((res) => {
  console.log(res.data);
});
```

***

## closeDialog

The `closeDialog` method closes the AI assistant's dialog.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("closeDialog");
```

***

## closeDocModal

The `closeDocModal` method closes the document block modal. The modal will close when the user clicks outside of it if you don't call this method.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("closeDocModal");
```

***

## closeSettings

The `closeSettings` method closes a view settings window.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("closeSettings").then((res) => {
  console.log(res.data);
  // note that method will close view settings, unless settings were already closed
});
```

***

## confirm

The `confirm` method opens a confirmation dialog for the user.

### Parameters

| Parameter           | Type    | Description                           | Required | Default Value |
| :------------------ | :------ | :------------------------------------ | :------- | :------------ |
| message             | String  | The message to display in the dialog. | Yes      |               |
| confirmButton       | String  | The confirmation button's text.       | No       | "OK"          |
| cancelButton        | String  | The cancel button's text.             | No       | "Cancel"      |
| excludeCancelButton | Boolean | Either to exclude the cancel button.  | No       | false         |

#### **Example**

```javascript
monday.execute("confirm", {
   message: "Are you sure?",
   confirmButton: "Let's go!",
   cancelButton: "No way",
   excludeCancelButton: false
}).then((res) => {
    console.log(res.data);
    // {"confirm": true}
});
```

Here's what the confirmation dialog will look like:

<Image align="center" alt="" border={true} caption="" src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/fee408c2-e978-42fa-9992-5f16b5fc4e14_ScreenShot2020-06-29at23.02.15.png" />

***

## detachExtensionsToColumn

The `detachExtensionsToColumn` method detaches the [board column extension](https://developer.monday.com/apps/docs/board-column-extension) app feature from a column.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("detachExtensionsToColumn");
```

***

## moveToNextSelectedTextualBlock

The `moveToNextSelectedTextualBlock` method opens the app on the next block when multiple are selected. This is only available after calling the <a href="https://developer.monday.com/apps/docs/mondayexecute#open-app-on-the-selected-block" target="_blank">`openAppOnFirstTextualBlock`</a> function and is only used on the <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-command-ai-assistant" target="_blank">doc command AI feature</a>.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("moveToNextSelectedTextualBlock").then((res) => {});
```

***

## moveToPrevSelectedTextualBlock

The `moveToPrevSelectedTextualBlock` method opens the app on the previous block when multiple are selected. This is only available after calling the <a href="https://developer.monday.com/apps/docs/mondayexecute#open-app-on-the-selected-block" target="_blank">`openAppOnFirstTextualBlock`</a> function and is only used on the <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-command-ai-assistant" target="_blank">doc command AI feature</a>.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("moveToPrevSelectedTextualBlock").then((res) => {});
```

***

## notice

The `notice` method displays a message at the top of the user's page. It is very useful for success, error, and general messages.

### Parameters

| Parameter | Type    | Description                                                                               | Required | Default Value |
| :-------- | :------ | :---------------------------------------------------------------------------------------- | :------- | :------------ |
| message   | String  | The message to display.                                                                   | Yes      |               |
| type      | String  | The type of message to display. Can be "success" (green), "error" (red) or "info" (blue). | No       | "info"        |
| timeout   | Integer | The number of milliseconds to show the message.                                           | No       | 5000          |

#### Example

```javascript
monday.execute("notice", {
   message: "I'm a success message",
   type: "success", // or "error" (red), or "info" (blue)
   timeout: 10000,
});
```

This is what the success message will look like:

<Image align="center" alt="" border={true} caption="" src="https://dapulse-res.cloudinary.com/image/upload/v1665689843/success3.png" />

***

## openAppFeatureModal

The `openAppFeatureModal` method opens a modal window as an iFrame that points to a site of your choice. The modal can render a page in your app by passing a `urlPath` or `urlParams` argument. It can also show an external site with the `url` argument (like a documentation page on your website).

### Parameters

| Parameter             | Type    | Description                                                                                                                                     | Required | Default Value |
| :-------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :------------ |
| url                   | String  | The URL of the page displayed in the modal.                                                                                                     | No       |               |
| urlPath               | String  | Subdirectory or path of the URL to open. Please ensure you pass a relative URL, not an absolute URL.                                            | No       |               |
| urlParams             | Object  | Query parameters for the URL.                                                                                                                   | No       |               |
| width                 | String  | The modal's width.                                                                                                                              | No       | "0px"         |
| height                | String  | The modal's height.                                                                                                                             | No       | "0px"         |
| returnToPreviousModal | Boolean | When opening a modal from within another modal, set this param to `true` to return the user to the original modal after closing the nested one. | No       |               |

#### **Example**

```javascript
monday.execute("openAppFeatureModal", {
  urlPath: "/settings/profile",
  urlParams: { tab: "notifications" },
  width: "600px",
  height: "400px",
  returnToPreviousModal: true
}).then((res) => {
  // only triggered when a user closes the dialog
  console.log('Dialog closed. ', res.data);
  // note that `res.data.closed` is always true
});
```

Opening and closing a modal will look like this:

<Image align="center" alt="" border={true} caption="" src="https://dapulse-res.cloudinary.com/image/upload/v1665617580/openclosemodal2.gif" width="" />

***

## openAppOnFirstTextualSelectedBlock

The `openAppOnFirstTextualSelectedBlock` method opens the app modal on the first selected block when multiple are open. It is only available on the <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-toolbar-ai-assistant" target="_blank">doc toolbar AI feature</a>.

### Parameters

This method does not have any parameters.

#### **Example**

```javascript
monday.execute("openAppOnFirstTextualSelectedBlock").then((res) => {});
```

***

## openAppRatingPopup

The `openAppRatingPopup` method opens a rating dialog that enables users to rate a marketplace app. You can call this once in 24 hours per user and only on iframes of marketplace apps. It can't be called on a user who has already rated the app.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute('openAppRatingPopup');
```

<Image align="center" alt="" border={true} caption="" src="https://files.readme.io/6216623-Open_app_rating_popup.png" />

***

## openCreateItemDialog

The `openCreateItemDialog` method opens a modal from which you can create a new item on a specific board. Though this method accepts two parameters, we recommend only using one at a time or none.

### Parameters

| Parameter | Type             | Description                                                                                                                                      | Required |
| :-------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| boardId   | Integer          | The ID of the board to create the item on. If omitted, the item will be created on the current board (using the context).                        | No       |
| boardIds  | List of integers | The IDs of the boards on which the user can choose to create the item. Please note that the first board ID listed will be the default selection. | No       |

#### **Example with boardId**

```javascript
monday.execute("openCreateItemDialog", {boardId:1234567890});
```

#### **Example with boardIds**

```javascript
monday.execute("openCreateItemDialog", {boardIds:[1234567890,0987654321]});
```

***

## openFilesDialog

The `openFilesDialog` method opens a modal with the preview of an asset.

### Parameters

| Parameter | Type    | Description                                  | Required |
| :-------- | :------ | :------------------------------------------- | :------- |
| boardId   | Integer | The ID of the board.                         | Yes      |
| itemId    | Integer | The ID of the item that contains an asset.   | Yes      |
| columnId  | String  | The ID of the column that contains an asset. | Yes      |
| assetId   | Integer | The ID of the asset to open.                 | Yes      |

#### **Example**

```javascript
monday.execute("openFilesDialog", {
  boardId: 12345,
  itemId: 23456,
  columnId: 'files',
  assetId: 34567
})
```

***

## openItemCard

The `openItemCard ` method opens a modal with information from the selected item. Users can also create an update or delete the item from the modal.

### Parameters

| Parameter | Type    | Description                                                             | Required | Default Value |
| :-------- | :------ | :---------------------------------------------------------------------- | :------- | :------------ |
| itemId    | Integer | The ID of the item to open.                                             | Yes      |               |
| kind      | String  | The view on which to open the item card - can be "updates" / "columns". | No       | "columns"     |

#### **Example**

```javascript
monday.execute("openItemCard", { itemId: item.id });
```

Here's what the open item card will look like:

<Image align="center" alt="" border={true} caption="" src="https://dapulse-res.cloudinary.com/image/upload/v1664895358/openItemCard.gif" />

***

## openLinkInTab

The `openLinkInTab` method opens a link in a new tab for views (board views, item views, etc.).

### Parameters

| Parameter | Type   | Description                            | Required |
| :-------- | :----- | :------------------------------------- | :------- |
| url       | String | The URL you wish to open in a new tab. | Yes      |

#### Example

```javascript
monday.execute("openLinkInTab", { url: "https://www.exampleurl.com" });
```

***

## openPlanSelection

The `openPlanSelection` method opens the plan selection page or billing tab so users can upgrade or pay for your app. It cannot be tested, and it only works for live marketplace apps.

Users can update their subscriptions when the tab opens by subscribing, upgrading, downgrading, or canceling. For example, users may want to use a feature not available on their plan. You can show them the billing tab so they can upgrade to the next plan tier.

### Parameters

| Parameter         | Type    | Description                                                                                                                                                                                                      | Required |
| :---------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| isInPlanSelection | Boolean | <li>If `true`, the plan selection page will open. This is the default option. You should use this when you want the user to pay for the app first.</li><li>If `false`, the app's billing section will open.</li> | No       |
| selectedPlanId    | String  | The ID of the specific plan to open the page on. `isInPlanSelection` must be `true` when using this parameter.                                                                                                   | No       |

#### **Example**

```javascript
monday.execute('openPlanSelection', {isInPlanSelection: true, selectedPlanId: "123456"});
```

***

## openSettings

The `openSettings` method opens a view settings window.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("openSettings").then((res) => {
  console.log(res.data);
  // note that method will open view settings, unless settings were already opened
});
```

This is what opening and closing settings looks like:

<Image align="center" alt="" border={true} src="https://dapulse-res.cloudinary.com/image/upload/v1664913166/openclosesettings.gif" />

***

## replaceHighlightText

The `replaceHighlightText` method replaces the highlighted text with text of your choosing at the beginning of the block. It is only available for the <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-command-ai-assistant" target="_blank">doc command AI feature</a>.

### Parameters

| Parameter | Type   | Description                      | Required |
| :-------- | :----- | :------------------------------- | :------- |
| text      | String | The text to insert in the block. | Yes      |

#### **Example**

```javascript
monday.execute("replaceHighlightText", { text: "This will replace the highlted text" });
```

***

## triggerFilesUpload

The `triggerFilesUpload` method opens a modal to let the current user upload a file to a specific file column. It returns a promise, and the promise is rejected in case of an error.

**Required scope: `boards:write`**

After the file is successfully uploaded, the `change_column_value` event will be triggered. Check out how to subscribe to these events [here](https://developer.monday.com/apps/docs/mondaylisten#subscribe-to-interaction-based-events-on-the-board)!

### Parameters

| Parameter | Type    | Description                                      | Required | Default Value |
| :-------- | :------ | :----------------------------------------------- | :------- | :------------ |
| boardId   | Integer | The ID of the board.                             | Yes      |               |
| itemId    | Integer | The ID of the item that contains an asset.       | Yes      |               |
| columnId  | String  | The ID of the file column to upload the file to. | Yes      |               |

#### **Example**

```javascript
monday.execute("triggerFilesUpload", {
  boardId: 12345,
  itemId: 23456,
  columnId: 'files'
})
```

***

## updateDocBlock

The `updateDocBlock` method updates a block's content. Check out our <a href="https://developer.monday.com/api-reference/docs/blocks" target="_blank">API documentation</a> to learn more about document blocks.

### Parameters

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr>
  <th style="border: 1px solid #ddd; padding: 8px;">Parameter</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Type</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
  <th style="border: 1px solid #ddd; padding: 8px;">Required</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>id</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>String</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The block&#39;s unique identifier.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
</td>
</tr>
<tr>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>content</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>JSON</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>The block&#39;s content you want to update in <a href="https://quilljs.com/docs/delta/" target="_blank" rel="_nofollow">Delta format</a>.</p>
</td>
  <td style="border: 1px solid #ddd; padding: 8px;"><p>Yes</p>
</td>
</tr>
</tbody>
</table>
`}</HTMLBlock>

Each block's content is defined by a content JSON object containing multiple attributes, one of which is `deltaFormat`. Creating updating blocks requires familiarity with the Delta format. We recommend using Quill's <a href="https://github.com/quilljs/delta/" target="_blank" rel="_nofollow">Delta library</a> to format your content.

#### **Example**

```javascript
const updateBlock = async () => {
    const { focusedBlocks, placement } = context;
    const { id } = focusedBlocks[0];
    const content = {
      deltaFormat: [
        {
          insert: "this is a random text"
        }
      ]
  	};

    const res = await monday.execute("updateDocBlock", { id, content });
    await monday.execute("closeDocModal");

  };
```

***

## updatePostContentAction

The `updatePostContentAction` method creates or changes the content of an item's update. It is only available for the <a href="https://developer.monday.com/apps/docs/ai-assistant#doc-header-ai-assistant" target="_blank">update AI feature</a>.

### Parameters

| Parameter         | Type   | Description                       | Required |
| :---------------- | :----- | :-------------------------------- | :------- |
| suggestedRephrase | String | The content to add to the update. | Yes      |

#### **Example**

```javascript
monday.execute("updatePostContentAction", { suggestedRephrase: "Some text"})
```

***

## valueCreatedForUser

The `valueCreatedForUser` method notifies the monday platform that a user gained a first value in an app. You can find more information about this method in our <a href="https://developer.monday.com/apps/docs/value-created-event-best-practices" target="_blank">documentation</a>.

### Parameters

This method doesn't have any parameters.

#### **Example**

```javascript
monday.execute("valueCreatedForUser");
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
