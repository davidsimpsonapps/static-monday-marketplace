const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  try {
    const data = await EleventyFetch('https://marketplace-ms.monday.com/marketplace_ms/public/analytics/app_ratings', { duration: "1d", type: "json" });
    
    // Convert the object into an array of rating objects
    const ratings = Object.values(data).map(rating => ({
      app_id: rating.appId,
      rating: rating.rating,
      count: rating.count
    }));

    return ratings;
  } catch (error) {
    console.error('Error fetching app ratings:', error);
    return [];
  }
}; 