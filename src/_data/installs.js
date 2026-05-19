const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  try {
    const installs = await EleventyFetch('https://monday-apps-ms.monday.com/apps_ms/public/app_analytics/app_installs', { duration: "1d", type: "json" });
    
    // Convert to array of objects with app_id and installs
    return Object.entries(installs).map(([app_id, installs]) => ({
      app_id: parseInt(app_id),
      installs: parseInt(installs)
    }));
  } catch (error) {
    console.error('Error fetching install numbers:', error);
    // Return empty array instead of undefined
    return [];
  }
}; 