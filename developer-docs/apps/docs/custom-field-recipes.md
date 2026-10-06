---
updatedAt: 2026-01-30T14:56:51.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Custom fields

Technical reference for using custom fields in your recipe sentences

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

Custom fields give you more control over how users configure your blocks. They are reusable, so you can build one field and use them across multiple triggers and actions.

<Image align="center" border={true} src="https://files.readme.io/911d41fd3a1ec3e7eddd9e31ff30728f0cde263667ad25ff6f2c8c0c4ed2dba1-Field_type_editor.png" className="border" />

# Remote options URL

Many custom fields can return options dynamically. For example, a project list may fetch the most recent projects for the logged-in user.

The Remote Options URL is the endpoint on your app that returns the options or configuration for the field. It will be called when the user first adds the recipe and configures it.

# Dependencies

Custom fields can also be configured with dependencies to force users to configure another field first. For example, a project management integration may ask the user to select a project before selecting a task within it.

Dependencies are non-nullable in the sentence infrastructure.

If you choose to utilize a dependency, the payload to your remote options URL will contain the dependency's contents:

```javascript
{ 
    "payload": {
        "boardId": 12345678, 
        "automationId": 123456, 
        "dependencyData": {
             "boardId": 12345678 // dependency field configured by user
         },
        "recipeId": 123456,
        "integrationId": 123456 
    }
}
```

In the example mentioned above, the dependent custom field URL payload will contain the ID of the custom field it's dependent on (i.e., the POST request for the remote options URL that loads a list of items will contain the board ID on which the items are located).

# Types of custom field

### Text

The **Text** type allows you to create a field type with a predefined field key for repeated use.

> For example: If your blocks all use a "projectId," you can utilize this key for all other trigger and action blocks instead of re-configuring it each time

Text columns allow you to select whether your text custom field type has numbers only. This will force users to only add numeric characters.

### List

The **List** type allows you to generate an array of options for selection. For example, a list of Github repositories to choose from. You can return the options dynamically, rely on another field as a dependency, and paginate through large datasets.

Learn more in the [list field reference.](https://developer.monday.com/apps/docs/list)

### Dynamic mapping

The **Dynamic mapping** type allows you to define a custom object containing a set of subfields, to map onto an item in monday. For example, mapping data from a Jira issue into a monday.com board.

Your app will return a set of fields supported by your object, and monday will determine the mapping logic accordingly. You can return a static list of fields or generate them dynamically based on dependencies.

Check out our [dynamic mapping article](https://developer.monday.com/apps/docs/dynamic-mapping) to learn more about this field type.

### Credentials

The **Credentials** type allows you to store and manage a set of profiles in an integration recipe. Your app will returns a list of credentials to select from, and implement a mechanism to add and delete new profiles.

Read more about in our [credentials field article](https://developer.monday.com/apps/docs/credentials).

## Input and Output fields

Input and output fields transfer data between blocks and allow users to configure them.

### Trigger fields

When building custom triggers, you can configure the input and output fields yourself.

The trigger's input fields can come from either the context of your integration recipe or from your recipe sentence (i.e., what the user chooses when using your integration recipe). The output fields of your trigger are what will be mapped into your action’s input fields.

If you’re using a built-in trigger, you can learn more about that trigger’s output fields by hovering your mouse over the information icon. For [custom triggers](https://developer.monday.com/apps/docs/triggers-recipes), you can configure the output fields yourself. The output fields should contain the data you will need to utilize in your action block.

> For example: Say you’re looking to create a monday.com item every time you receive a ticket in Zendesk. The output fields of your trigger need to include the board Id of your monday.com board where this recipe lives so your new item can be created on the correct board.

### Action fields

Your action block only allows you to customize input fields since the output of this block is the action itself. The trigger's input fields need to include all of the data needed to complete your action.

If you plan to use dynamic mapping into a monday.com item, the input field of your mapped item needs to be the output field of your trigger block, not the custom entity you’ve created. This is because the monday apps framework will do all of the mapping for you!

Check out our article on [custom actions](https://developer.monday.com/apps/docs/actions-recipes) to learn more!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎
