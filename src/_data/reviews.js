const fetch = require('node-fetch');

module.exports = async function() {

  return {};
  try {
    // Get all apps from the marketplace data
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const apps = await response.json();
    
    // Create a map to store reviews for each app
    const reviewsMap = {};
    
    // Fetch reviews for each app
    for (const app of apps.marketplace_apps) {
      try {
        const url = `https://marketplace-ms.monday.com/marketplace_ms/public/app_reviews/${app.app_id}?sortBy=MOST_RECENT&limit=50`;
        console.log(`Getting reviews for: ${app.name} / ${app.app_id}: `, url);
        const reviewsResponse = await fetch(url);
        const reviewsData = await reviewsResponse.json();
        if (reviewsData.reviews) {
          reviewsMap[app.app_id] = reviewsData.reviews;
        }
      } catch (error) {
        console.error(`Error fetching reviews for app ${app.app_id}:`, error);
        reviewsMap[app.app_id] = [];
      }
    }

    console.log(JSON.stringify(reviewsMap,null,2));
    
    return reviewsMap;
  } catch (error) {
    console.error('Error fetching apps:', error);
    return {};
  }
}; 