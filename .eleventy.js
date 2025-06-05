const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = function(eleventyConfig) {
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
    return num.toLocaleString();
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

  // Watch for changes in these folders
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/images");
  eleventyConfig.addWatchTarget("src/js");

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
