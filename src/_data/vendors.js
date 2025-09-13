const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');

module.exports = async function() {
  try {
    const response = await fetch('https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true');
    const data = await response.json();
    // added vendor.installs, so that vendors that have no apps that are not installed are not shown
    return data.marketplace_developers.filter(vendor => !vendorBlockList.includes(vendor.id) && vendor.installs);
  } catch (error) {
    console.error('Error fetching marketplace vendors:', error);
    return [];
  }
}; 