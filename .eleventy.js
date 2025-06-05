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

  // Create a collection of app pages
  eleventyConfig.addCollection("appPages", function(collection) {
    const apps = collection.getAll()[0].data.marketplace;
    return apps.map(app => ({
      url: `/apps/${app.id}/`,
      data: {
        appId: app.id,
        app: app
      }
    }));
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
