const fetch = require("node-fetch");

const url =
  "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000";

module.exports = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
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
