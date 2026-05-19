const EleventyFetch = require("@11ty/eleventy-fetch");

const url =
  "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000";

module.exports = async function () {
  try {
    const data = await EleventyFetch(url, { duration: "1d", type: "json" });
    const partners = data.partners;

    partners.forEach((p) => {
      ["profilePictureUrl", "logoUrl"].forEach((i) => {
        if (p[i].startsWith("assets")) {
          p[i] = `https://partners.mondayprograms.com/${p[i]}`;
        }
        p.employees.forEach((e) => {
          if (e.imageUrl.startsWith("assets")) {
            e.imageUrl = `https://partners.mondayprograms.com/${e.imageUrl}`;
          }
        });
      });
    });

    return partners;
  } catch (error) {
    console.error("Error fetching monday.com partners:", error);
    return [];
  }
};
