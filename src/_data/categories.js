const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  try {
    const data = await EleventyFetch(
      "https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-categories",
      { duration: "1d", type: "json" }
    );

    // Filter out categories that shouldn't be displayed
    return (
      data.marketplace_categories
        .filter((category) => category.display && category.showInLeftPane)
        // .filter(category =>
        //   category.display &&
        //   category.type === 'standard' &&
        //   category.app_type === 'app'
        // )
        .filter(
          (category) =>
            ![
              12, // Views by monday
              15, // New apps - not correctly populated
              10000017, // Recently viewed - always empty
              10000016, // Favorites - always empty
              10000020, // For you
              // 10000004, // Trending this week - 🤷‍♂️ Always zero
            ].includes(category.id)
        )
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
