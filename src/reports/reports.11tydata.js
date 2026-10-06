// Directory data for the daily news articles written by
// scripts/build-daily-report.js - one file per day and topic, named
// YYYY-MM-DD-<topic>.md. The `reports` collections are defined in .eleventy.js.
// (page.fileSlug and filePathStem can't be used: Eleventy strips the leading
// date from both.)
const url = (data) => `/reports/${data.page.inputPath.split("/").pop().slice(0, 10)}/${data.topic}/`;

module.exports = {
  layout: "report.njk",
  // Reports are plain Markdown - don't run Nunjucks over them, since app
  // descriptions and docs summaries can contain {{ }} (e.g. GraphQL snippets).
  templateEngineOverride: "md",
  eleventyComputed: {
    // Hand-written samples (`sample: true`) are for local development only.
    permalink: (data) => (data.sample && process.env.NODE_ENV === "production" ? false : url(data)),
    canonical: url,
    description: (data) => data.lede,
  },
};
