---
updatedAt: 2026-10-06T13:31:28.000Z
agentTools:
  projectIndex: https://developer.monday.com/api-reference/llms.txt
---

# API playground

The API playground is the best place to learn, develop, and test your GraphQL requests against the monday.com platform API. It provides a visual editor with real-time response previews, sample queries, schema exploration, and built-in AI assistance - all without leaving your browser.

<Embed url="https://www.youtube.com/watch?v=IHvlag4iFx0" href="https://www.youtube.com/watch?v=IHvlag4iFx0" typeOfEmbed="youtube" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252FIHvlag4iFx0%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DIHvlag4iFx0%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252FIHvlag4iFx0%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" />

# Access the playground

If you're already logged into a monday.com account, you can access the playground without needing to re-authenticate. If you don't have an account yet, create a free [developer account](https://developer.monday.com/api-reference/docs/developer-sandbox) first.

1. Open the [Developer Center](https://developer.monday.com/api-reference/docs/the-developer-center#access-the-developer-center).
2. Click **API playground** from the left-side menu.
3. Start testing your queries!

<Image align="center" alt="monday platform API playground" src="https://files.readme.io/116e9318c1303e902f66594b365e5bae72c1cf1a1dccc9c6ed9b00a86021996b-Screenshot_2026-04-03_at_15.35.03.png" />

# Layout

The playground is divided into two sections:

* **Left panel** - the query editor where you write your GraphQL requests. Use the **Variables** and **Headers** tabs at the bottom of the editor to pass dynamic values and custom headers.
* **Right panel** - the response viewer that displays the server's response after you execute a query.

# Central toolbar

The toolbar between the two panels contains the core actions you'll use most.

## Execute query

The **Play** button in the center of the toolbar sends your request to the API. The response will appear in the right panel.

> 🚧 Mutations affect live data
>
> If your API call includes a mutation, any changes (creating, updating, or deleting data) will actually happen inside monday.com. Be careful not to modify or delete production boards while testing.

## Prettify

Click the **Prettify** button to auto-format your query. It fixes indentation and line breaks so messy queries become readable again.

## Copy query

The **Copy** button copies your current query to the clipboard so you can paste it into your code, documentation, or a message.

## API version selector

Click the **clock icon** to switch between API versions. You can:

* Try upcoming features through the **release candidate** version.
* Test against **older versions** if your integration still uses them.

The playground defaults to the current stable version.

<Image align="center" alt="monday platform API playground version selector" src="https://files.readme.io/19652ade27af82f678e954c42f92039386f50c3fb7780bd8e66bca79f3e6ff92-Screenshot_2026-04-03_at_15.50.36.png" />

## Sample queries

Click the **book icon** in the central toolbar for a library of pre-built query templates, including common operations like getting column values and creating items. Each sample opens in a **new tab**, so you won't lose any work in progress.

# Ask Dev Sidekick

The **Dev Sidekick** button at the top of the playground opens an integrated [developer AI assistant](https://developer.monday.com/api-reference/docs/developer-ai-assistant) that is aware of your current query, variables, and response. You can ask it to:

* Help write a query or mutation from scratch.
* Debug a failing request - or click **Fix with AI** when an error appears.
* Answer general questions about the API and apps framework.

<Image align="center" src="https://files.readme.io/1a09554db10dce58b0f9573d67b33b5ec6d32017255819b41bc50185a14a4fb3-Screenshot_2026-04-03_at_15.51.53.png" />

Each suggested query includes an **Apply to query** button that loads it directly into the editor.

# Download schema

The button in the **top-right corner** lets you download the monday.com GraphQL schema in different formats. You can use the downloaded schema with tools like <a href="https://graphql-kit.com/graphql-voyager/" target="_blank">Voyager</a> to visualize entity relationships, or to generate typed API clients in different programming languages.

You can also retrieve the schema programmatically. Refer to the [GraphQL overview](https://developer.monday.com/api-reference/docs/introduction-to-graphql#mondaycom-schema) for available endpoints and format options.

# Left sidebar

The left sidebar provides tools for exploring the API and managing your workflow.

## Schema explorer

The **book icon** opens the schema explorer, which lets you browse all available fields, their types, arguments, and whether they are nullable. It's a quick way to understand the shape of any object without leaving the playground.

## History

The **history button** saves every request you execute. You can go back to any previous query at any time - even if you've overwritten it or made mistakes since then.

## Keyboard shortcuts

The **shortcuts menu** lists all available keyboard shortcuts. A particularly useful one is **⌘K** (Mac) / **Ctrl+K** (Windows), which opens an inline autocomplete that lets you preview available fields and attributes directly inside the editor.

## Configuration

The **configuration menu** lets you toggle between **dark mode** and **light mode**.

# Public playground

The public playground offers a subset of the features listed above and requires manual authentication. It's useful if you have an API token but don't have access to the account's UI to log in.

1. Open the public [playground](https://monday.com/developers/v2/try-it-yourself).
2. Retrieve your [API token](https://developer.monday.com/api-reference/docs/authentication#accessing-api-tokens) and paste it into the modal.
3. Start testing your queries!
