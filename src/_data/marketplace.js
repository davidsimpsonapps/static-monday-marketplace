const fetch = require('node-fetch');

const { vendorBlockList } = require('./data-filters');


// Format as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getHistoricalInstalls() {
      // ****** START: Get the installs data
    // Get current date
    const today = new Date();
    const sevenDaysAgo  = new Date(today); sevenDaysAgo.setDate(today.getDate() - 7);
    const thirtyDaysAgo = new Date(today); thirtyDaysAgo.setDate(today.getDate() - 30);
    const ninetyDaysAgo = new Date(today); ninetyDaysAgo.setDate(today.getDate() - 90);
    const oneYearAgo    = new Date(today); oneYearAgo.setDate(today.getDate() - 365);

    const allInstallsToday        = require('./json/installs/apps/installs.json');
    const allInstallsSevenDaysAgo = require(`./json/installs/apps/historical/${formatDate(sevenDaysAgo)}.json`);
    const allInstallsThirtyAgo    = require(`./json/installs/apps/historical/${formatDate(thirtyDaysAgo)}.json`);
    const allInstallsNinetyAgo    = require(`./json/installs/apps/historical/${formatDate(ninetyDaysAgo)}.json`);
    // const allInstallsOneYearAgo   = require(`./json/installs/apps/historical/${formatDate(oneYearAgo)}.json`);


    return { allInstallsToday, allInstallsSevenDaysAgo, allInstallsThirtyAgo, allInstallsNinetyAgo, /*allInstallsOneYearAgo*/ };
}

function getInstallsDelta(app, { allInstallsToday, allInstallsSevenDaysAgo, allInstallsThirtyAgo, allInstallsNinetyAgo, allInstallsOneYearAgo }) {
  let installsDelta = {};

  const installsToday = parseInt(allInstallsToday[app.app_id]) ?? null;
  const installsSevenDaysAgo = parseInt(allInstallsSevenDaysAgo[app.app_id]) ?? null;
  const installsThirtyAgo = parseInt(allInstallsThirtyAgo[app.app_id]) ?? null;
  const installsNinetyAgo = parseInt(allInstallsNinetyAgo[app.app_id]) ?? null;  
  // const installsOneYearAgo = parseInt(allInstallsOneYearAgo[app.app_id]) ?? null;  
  console.log(app.name, {installsToday, installsSevenDaysAgo, installsThirtyAgo, installsNinetyAgo, /*installsOneYearAgo*/});

  installsDelta.totalInstalls = installsToday;

  if (installsToday && installsSevenDaysAgo){
    installsDelta.sevenDays = installsToday - installsSevenDaysAgo;
  }
  if (installsToday && installsThirtyAgo){
    installsDelta.thirtyDays = installsToday - installsThirtyAgo;
  }
  if (installsToday && installsNinetyAgo) {
    installsDelta.ninetyDays = installsToday - installsNinetyAgo;
  }
  // if (installsToday && installsOneYearAgo) {
  //   installsDelta.oneYear = installsToday - installsOneYearAgo
  // }
  return installsDelta;
}

module.exports = async function() {
  try {
    const response = await fetch('https://cdn.monday.com/public_marketplace_apps');
    const data = await response.json();
    const apps =  data.marketplace_apps.filter(app => !vendorBlockList.includes(app.marketplace_developer_id));

    const historicalInstalls = getHistoricalInstalls();
    console.log('Installs data:', historicalInstalls);


    // Add "Trending this week" into the `marketplace_category_ids`
    const responseTrendingThisWeek = await fetch('https://monday.com/bigbrain-data-api/feature/dynamic/external/public/cross-tenant?featureName=app_marketplace_trending_this_week&version=&startTime=&endTime=&filters=%7B%22account_id%22%3A%22-1%22%7D&metrics=%5B%5D');

    const dataTrendingThisWeek = await responseTrendingThisWeek.json();
    const topAppsRaw = dataTrendingThisWeek?.data?.[0]?.top_apps ?? '[]';
    let trendingAppIds = [];
    try {
      trendingAppIds = typeof topAppsRaw === 'string'
        ? JSON.parse(topAppsRaw)
        : (Array.isArray(topAppsRaw) ? topAppsRaw : []);
    } catch (e) {
      trendingAppIds = [];
    }

    apps.forEach(app => {
      // Add "Trending this week" into the `marketplace_category_ids`
      if (trendingAppIds.includes(app.id)) {
        console.log(`"${app.name}" is featured this week`);
        app.marketplace_category_ids.push(10000004);//
      }
      // Add historical installs
      app.installsDelta = getInstallsDelta(app, historicalInstalls) ?? {};
    });
    
    return apps;
    
  } catch (error) {
    console.error('Error fetching marketplace apps:', error);
    return [];
  }
}; 