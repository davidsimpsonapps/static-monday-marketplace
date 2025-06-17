const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    return data.marketplace_apps.filter(app => !vendorBlockList.includes(app.marketplace_developer_id));
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 