const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = function(eleventyConfig) {

  // Add currentTimestamp filter for sitemap
  eleventyConfig.addFilter("currentTimestamp", function() {
    return new Date().toISOString();
  });

  // Add dateToISO filter for sitemap
  eleventyConfig.addFilter("dateToISO", function(date) {
    return new Date(date).toISOString();
  });

  // Add custom filter to find app by ID
  eleventyConfig.addFilter("findAppById", function(apps, id) {
    return apps.find(app => app.id === parseInt(id));
  });

  // Add custom filter to find vendor by ID
  eleventyConfig.addFilter("findVendorById", function(vendors, id) {
    return vendors.find(vendor => vendor.id === parseInt(id));
  });

  // Add custom filter to find category by ID
  eleventyConfig.addFilter("findCategoryById", function(categories, id) {
    return categories.find(category => category.id === parseInt(id));
  });

  // Add custom filter to find install numbers for an app
  eleventyConfig.addFilter("findInstallsById", function(installs, id) {
    if (!installs || !Array.isArray(installs)) return 0;
    const install = installs.find(install => install.app_id === parseInt(id));
    return install ? install.installs : 0;
  });

  // Add custom filter to format numbers with commas
  eleventyConfig.addFilter("numberFormat", function(num) {
    return parseInt(num).toLocaleString();
  });

  // Ratings need formatting as some of the data is dirty
  eleventyConfig.addFilter("formatRating", function(num) {
    num = parseFloat(num);
    return num.toFixed(1) < 5 ? num.toFixed(1) : Math.round(num).toString();
  });

  // Add 
  eleventyConfig.addFilter("averageInstallsPerMonth", function(installs, startDate) {


      const start = new Date(startDate);
      const end = new Date();
      
      // Validate dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          throw new Error('Invalid date input');
      }
      
      // Ensure `installs` is a number
      const installsCount = parseInt(installs, 10);
      if (isNaN(installsCount)) {
          // throw new Error('Installs must be a number');
          return 0;
      }
      
      // Calculate total months (inclusive)
      const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                     (end.getMonth() - start.getMonth()) + 1;
      
      // Avoid division by zero
      if (months <= 0) {
          return 0;
      }

      const monthly = installsCount / months;
      
      // Return average installs per month
      return monthly < 1 ? monthly.toFixed(1) : parseInt(monthly).toLocaleString();

  });


  // Add custom filter to format dates
  eleventyConfig.addFilter("formatDate", function(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("removeAquisitionSource", function(apps, source) {
    return apps.filter(app => app.acquisition_source !== source);
  });
  eleventyConfig.addFilter("removeAppsByIds", function(apps, ids) {
    return apps.filter(app => !ids.includes(app.id.toString()));
  });

  eleventyConfig.addFilter("hostFromUrl", function(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.host;
    } catch (error) {
      return url;
    }
  });

  // Add custom filter to filter apps by category
  eleventyConfig.addFilter("filterByCategory", function(apps, categoryId) {
    if (!Array.isArray(apps)) return [];
    return apps.filter(app => 
      app.marketplace_category_ids && 
      app.marketplace_category_ids.includes(parseInt(categoryId))
    );
  });

  // Add custom filter to sort apps by install count
  eleventyConfig.addFilter("sortByInstalls", function(apps, installs) {
    if (!Array.isArray(apps)) return [];
    if (!installs || !Array.isArray(installs)) return apps;
    
    return [...apps].sort((a, b) => {
      const aInstalls = installs.find(i => i.app_id === a.id)?.installs || 0;
      const bInstalls = installs.find(i => i.app_id === b.id)?.installs || 0;
      return bInstalls - aInstalls;
    });
  });

  // Add custom filter to sort apps by creation date
  eleventyConfig.addFilter("sortByCreatedAt", function(apps) {
    return apps.sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return bDate - aDate;
    });
  });

  // Add custom filter to sort arrays by property
  eleventyConfig.addFilter("sortBy", function(array, property) {
    return array.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  });

  // Add custom filter to filter apps by vendor
  eleventyConfig.addFilter("filterByVendor", function(apps, vendorId) {
    return apps.filter(app => app.marketplace_developer_id === parseInt(vendorId));
  });

  // Add custom filter to sort vendors by app count
  eleventyConfig.addFilter("sortVendorsByAppCount", function(vendors, marketplace) {
    return vendors
      .map(vendor => {
        const appCount = marketplace.filter(app => app.marketplace_developer_id === parseInt(vendor.id)).length;
        return { ...vendor, appCount };
      })
      .filter(vendor => vendor.appCount > 0)
      .sort((a, b) => b.appCount - a.appCount);
  });

  // Add custom filter to get app count for a vendor
  eleventyConfig.addFilter("getVendorAppCount", function(vendor, marketplace) {
    return marketplace.filter(app => app.marketplace_developer_id === parseInt(vendor.id)).length;
  });

  // Add custom filter to sort vendors by install count
  eleventyConfig.addFilter("sortVendorsByInstalls", function(vendors) {
    return vendors
      .filter(vendor => vendor.installs > 0)
      .sort((a, b) => b.installs - a.installs);
  });

  // Create a collection of app pages
  eleventyConfig.addCollection("appPages", function(collection) {
    return collection.getAll()[0].data.marketplace.map(app => ({
      url: `/apps/${app.id}/`,
      data: { app }
    }));
  });

  // Custom filter to stringify objects
  eleventyConfig.addFilter("stringify", function(value) {
    return JSON.stringify(value, null, 2);
  });

  // Add custom filter to find ratings by app ID
  eleventyConfig.addFilter("findRatingById", function(ratings, appId) {
    if (!ratings) return null;
    return ratings.find(rating => rating.app_id === parseInt(appId));
  });

  // Add custom filter to get compliance questions by type
  eleventyConfig.addFilter("getComplianceQuestionsByType", function(complianceQuestions, type) {
    if (!complianceQuestions || !complianceQuestions.byType) return [];
    return complianceQuestions.byType[type] || [];
  });

  // Add custom filter to concatenate arrays
  eleventyConfig.addFilter("concat", function(array, value) {
    return array.concat(value);
  });

  // Add custom filter function
  eleventyConfig.addFilter("filter", function(array, callback) {
    return array.filter(callback);
  });

  // Add isHostedOnMonday filter
  eleventyConfig.addFilter("isHostedOnMonday", function(app) {
    if (!app.compliance_answers) return false;
    
    const dataHostedOnMonday = Object.values(app.compliance_answers).some(answer => 
      answer.dataHostingProvider === 'monday'
    );

    const logHostedOnMonday = Object.values(app.compliance_answers).some(answer => 
      answer.logHostingProvider === 'monday'
    );

    return dataHostedOnMonday && logHostedOnMonday;
  });

  // Process CSS with PostCSS
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent) {
      return async () => {
        let output = await postcss([
          tailwindcss,
          autoprefixer
        ]).process(inputContent);
        return output.css;
      };
    }
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/_data/json");
  eleventyConfig.addPassthroughCopy("src/d54ac31dd1524dc1934ba92fe211d1c6.txt");

  // Watch for changes in these folders
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/images");
  eleventyConfig.addWatchTarget("src/js");
  eleventyConfig.addWatchTarget("src/_data/json");
  eleventyConfig.addWatchTarget("src/d54ac31dd1524dc1934ba92fe211d1c6.txt");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
