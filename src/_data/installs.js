const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://monday-apps-ms.monday.com/apps_ms/public/app_analytics/app_installs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const installs = await response.json();
    
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