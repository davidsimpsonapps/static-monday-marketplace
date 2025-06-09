const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    return data.marketplace_apps.filter(app => app.marketplace_developer_id !== 1);
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 