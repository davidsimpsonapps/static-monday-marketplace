const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true');
    const data = await response.json();
    return data.marketplace_developers;
  } catch (error) {
    console.error('Error fetching marketplace vendors:', error);
    return [];
  }
}; 