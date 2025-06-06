const fetch = require('node-fetch');

module.exports = async function() {
  try {
    const response = await fetch('https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-categories');
    const data = await response.json();
    
    // Filter out categories that shouldn't be displayed
    return data.marketplace_categories.filter(category => 
      category.display && 
      category.type === 'standard' && 
      category.app_type === 'app'
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}; 