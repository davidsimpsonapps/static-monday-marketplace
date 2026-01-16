const fetch = require("node-fetch");

const url =
  "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000";

module.exports = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const partners = data.partners;

    const people = [];

    partners.forEach((p) => {
      // fix all the profile pics
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

      // get partner details
      const { name, slug, profilePictureUrl, productExpertise, countryCode } =
        p;

      // get every person into the people array
      p.employees.forEach((e) => {
        e.partner = {
          name,
          slug,
          profilePictureUrl,
          productExpertise,
          countryCode,
        };

        people.push(e);
      });
    });

    return people;
  } catch (error) {
    console.error("Error fetching monday.com partners:", error);
    return [];
  }
};
