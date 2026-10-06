---
updatedAt: 2025-12-19T15:37:50.000Z
agentTools:
  projectIndex: https://developer.monday.com/apps/llms.txt
---

# Ratings and reviews

Marketplace ratings and reviews are key indicators of your app’s quality and reliability. They help users make informed decisions while also creating a direct feedback loop that you can use to improve your app.

Higher ratings can help attract new customers and build trust with existing ones. They reflect your app’s popularity and quality. Over time, top-rated apps will be considered when awarding labels and badges, influencing search results, creating premium marketplace categories, and appearing in app recommendations.

To increase your score, focus on delivering a great user experience and building strong relationships with your customers.

# Concepts

When discussing ratings and reviews, it's important to understand the difference between the terms:

* **Rating:** A numeric value between 1 and 5 stars; submitted by a single app user
* **Review:** An optional written opinion, submitted alongside a rating
* **App rating:** The average of all submitted ratings

## Scale

Users can submit ratings between 1 and 5 stars, where 1 is the lowest and 5 is the highest. They can also leave an optional text review. Individual ratings and reviews are publicly visible in the app marketplace.

## Calculations

Ratings from users on paid monday.com accounts are factored into the app rating. Those from non-paying monday.com accounts are also included, but are always hidden from the marketplace. Ratings submitted from trial accounts and deleted reviews are not taken into consideration.

## Visibility

Once your app has received at least five ratings, they are combined to form an app rating (the average score displayed on your app listing page). This minimum threshold helps prevent disproportionate impact from a small number of submissions and ensures the rating reflects overall user sentiment.

<Image align="center" border={true} width="500px" src="https://files.readme.io/ac869f1225428c7184711d37fda4d1ec7a6b2a30974d3926965029aff8860ccf-Screenshot_2024-12-03_at_4.18.01_PM.png" className="border" />

## Eligibility

Any current or past user on any account where the app is installed can submit a rating. Multiple users from a single account can submit individual ratings and reviews; however, each user is limited to one rating per app per account.

Ratings can be updated at any time, and any updates will overwrite the previous submission.

# Viewing ratings

## App developers

You can access review information in the [Reviews](https://developer.monday.com/apps/docs/reviews) tab. There, you will see your app rating, along with a breakdown of individual ratings and reviews.

<Image align="center" border={true} width="700px" src="https://files.readme.io/199731c8f7d386e28e4f77dc87bc946ae8921d02af37aebe34533ff600372a50-Reviews_tab.png" className="border" />

## Customers

Customers can see an app's ratings and reviews on your app's marketplace listing page. They can also see your average app rating across all apps on the [Partner Page](https://developer.monday.com/apps/docs/partner-page).

<Image align="center" border={true} width="700px" src="https://files.readme.io/62d2b104be53602cf53206b4dace3f5c4b406f5e08fda9da1513c4afae83bccc-App_listing_page_reviews_.png" className="border" />

# Getting ratings

Ratings are integral to your app’s success, but they only matter if users leave them. We've developed several methods to encourage users to leave ratings.

## Send the user a custom URL

One of the best ways to prompt users to rate your app is through a [custom URL](https://developer.monday.com/apps/docs/promote-your-app#installed-apps-page). The URL will direct users directly to your app with the rating pop-up open, allowing them to quickly and easily leave a rating and review.

This method requires you to create the embeddable URL manually. Once created, you can embed the URL in customer emails to encourage them to leave ratings. Customers must be logged in to monday on their device, or it will redirect them to the monday homepage.

`<account_slug>.monday.com/apps/installed_apps/<app_id>?openRatingDialog=true`

## Prompt the user in your app

You can also open the rating pop-up in your app using an SDK method. After a user completes a key flow in your app or has used it for a while, you can ask them to rate you in the marketplace.

`monday.execute('openAppRatingPopup');`

## Default behaviour

In addition to developer-initiated prompts, monday.com also automatically collects ratings by prompting users when they open the *Installed Apps* page. The pop-up only appears once, even if users close out of it without rating the app. You do not need to implement anything in your app for this method.
