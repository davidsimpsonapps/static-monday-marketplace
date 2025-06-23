const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');


// Format as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    const apps =  data.marketplace_apps.filter(app => !vendorBlockList.includes(app.marketplace_developer_id));


    // ****** START: Get the installs data
    // Get current date
    const today = new Date();

    // Calculate 7 days ago
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Calculate 30 days ago
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const allInstallsToday = require('./json/installs/apps/installs.json');
    const allInstallsSevenDaysAgo = require(`./json/installs/apps/historical/${formatDate(sevenDaysAgo)}.json`);
    const allInstallsThirtyAgo = require(`./json/installs/apps/historical/${formatDate(thirtyDaysAgo)}.json`);


    // console.log('Installs data:', {allInstallsToday, allInstallsSevenDaysAgo, allInstallsThirtyAgo});

    // ****** END: Get the installs data

    // Add "Trending this week" into the `marketplace_category_ids`
    const responseTrendingThisWeek = await fetch('https://platform-bigbrain-bridge.monday.com/features_external_public?featureName=trending_this_week&identifierType=custom&identifier=top_apps');
    const dataTrendingThisWeek = await responseTrendingThisWeek.json();

    apps.forEach(app => {
      // Add "Trending this week" into the `marketplace_category_ids`
      if (dataTrendingThisWeek.includes(app.id)) {
        console.log(`"${app.name}" is featured this week`);
        app.marketplace_category_ids.push(10000004);//
      }

      // Add `installsDelta`:
      if (allInstallsToday && allInstallsSevenDaysAgo && allInstallsThirtyAgo) {

        const installsToday = parseInt(allInstallsToday[app.app_id]) ?? null;
        const installsSevenDaysAgo = parseInt(allInstallsSevenDaysAgo[app.app_id]) ?? null;
        const installsThirtyAgo = parseInt(allInstallsThirtyAgo[app.app_id]) ?? null;

        

        console.log(app.name, {installsToday, installsSevenDaysAgo, installsThirtyAgo});

        app.installsDelta = {}

        if (installsToday && installsSevenDaysAgo){
          app.installsDelta.sevenDays = installsToday - installsSevenDaysAgo;
        }
        if (installsToday && installsThirtyAgo){
          app.installsDelta.thirtyDays = installsToday - installsThirtyAgo;
        }
      }

    });
    
    return apps;
    
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 