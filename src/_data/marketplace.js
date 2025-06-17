const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    const vendorBlockList = [
      1, // monday.com
      10000022 // Test Developer
    ];
    return data.marketplace_apps.filter(app => !vendorBlockList.includes(app.marketplace_developer_id));
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 