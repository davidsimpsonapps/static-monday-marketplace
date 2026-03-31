const fetch = require("node-fetch");

const HEALTHCHECK_IDS = [
  "monday-infra-eu-basic",
  "monday-infra-eu-board",
  "monday-infra-eu-board-items",
  "monday-infra-eu-filtered-board-items",
  "monday-infra-eu-secure-storage",
  "monday-infra-eu-storage",
  "monday-infra-us-basic",
  "monday-infra-us-board",
  "monday-infra-us-board-items",
  "monday-infra-us-filtered-board-items",
  "monday-infra-us-secure-storage",
  "monday-infra-us-storage",
];

module.exports = async function () {
  try {
    // this call to get the healthcheck data is really heavy work,
    // so must be cached daily rather than called directly
    const url = `https://status.getgorilla.app/api/avg-response-times?healthcheck_ids=${HEALTHCHECK_IDS.join(",")}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching avg response times:", error);
    return [];
  }
};
