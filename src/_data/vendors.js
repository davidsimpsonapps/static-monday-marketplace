const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');

module.exports = async function() {
  try {
    const response = await fetch('https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true');
    const data = await response.json();
    return data.marketplace_developers.filter(app => !vendorBlockList.includes(app.id));
  } catch (error) {
    console.error('Error fetching marketplace vendors:', error);
    return [];
  }
}; 