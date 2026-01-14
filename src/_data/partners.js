const fetch = require("node-fetch");

const url =
  "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000";

module.exports = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.partners;
  } catch (error) {
    console.error("Error fetching monday.com partners:", error);
    return [];
  }
};
