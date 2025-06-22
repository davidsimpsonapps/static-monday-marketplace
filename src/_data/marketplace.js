const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    const apps =  data.marketplace_apps.filter(app => !vendorBlockList.includes(app.marketplace_developer_id));


    // Add "Trending this week" into the `marketplace_category_ids`
    const responseTrendingThisWeek = await fetch('https://platform-bigbrain-bridge.monday.com/features_external_public?featureName=trending_this_week&identifierType=custom&identifier=top_apps');
    const dataTrendingThisWeek = await responseTrendingThisWeek.json();

    apps.forEach(app => {
      if (dataTrendingThisWeek.includes(app.id)) {
        console.log(`"${app.name}" is featured this week`);
        app.marketplace_category_ids.push(10000004);//
      }
    });
    
    return apps;
    
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 