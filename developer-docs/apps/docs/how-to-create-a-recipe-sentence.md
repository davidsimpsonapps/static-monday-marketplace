---
updatedAt: 2026-01-30T14:56:18.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# How to create a recipe sentence

<Callout icon="❗️" theme="error">
  This app feature will be deprecated soon. We recommend building on the [monday workflows infrastructure](https://developer.monday.com/apps/docs/monday-workflows). Learn more about the migration [here](https://developer.monday.com/apps/changelog/automation-infrastructure-migration).
</Callout>

Once you've built your blocks, you can combine them into a recipe sentence. Recipe sentences are templated integrations that make your blocks easy to add to a board.

## Create the recipe in the monday dev center

1. In your app feature, open the **Recipes** tab.
2. Click **Create Recipe** in the top right corner.
3. Select **Trigger**.

## Add a trigger block

1. Click **Choose trigger**.
2. Select a trigger from the leftpane. You can choose a trigger by monday, (such as "When a status changes") or a custom trigger you built.

## Add an action block

1. Click **Choose action**.
2. Select an action from the leftpane. The input fields for the action will appear.
3. For each input field:
   1. Trigger output field key: Choose which output field will pass data into this field.
   2. Dependencies: Select a source for any dependencies

## Save your recipe

1. Click **Create recipe** or **Save recipe**. Your recipe will not be available unless you save it!

<Image align="center" alt="A recipe configured with field mappings." border={true} caption="A recipe configured with field mappings" src="https://files.readme.io/336d94282f2df32fcb15980e8671df84900105be0b75c00cee81a78780d27e15-image.png" width="600px" />

# Next steps

Once you've created your recipe, you can [test it](https://developer.monday.com/apps/docs/how-to-test-your-recipes) on any of your boards!
