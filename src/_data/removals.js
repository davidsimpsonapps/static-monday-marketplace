const fs = require("fs");
const path = require("path");

const { vendorBlockList } = require("./data-filters");

const REMOVALS_FILE = path.join(__dirname, "json/marketplace/removals.json");

// removals.json embeds the app's and vendor's last known full JSON (see
// scripts/update-marketplace-changes.js), so it's readable on its own and
// doesn't depend on that vendor still existing in the live vendor feed. This
// just derives display fields from the embedded JSON and hides apps on the
// vendor block list, which can change after an event was recorded.
module.exports = function () {
  try {
    const removalsData = JSON.parse(fs.readFileSync(REMOVALS_FILE, "utf-8"));

    const events = removalsData.events
      .filter((event) => !vendorBlockList.includes(event.app?.marketplace_developer_id))
      .map((event) => ({
        ...event,
        logoUrl: event.app?.logo_url ?? null,
      }))
      .sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return 0;
      });

    const latestBuildDate = removalsData.processedThrough;
    const latest = events.filter((event) => event.date === latestBuildDate);

    return { events, latest, latestBuildDate };
  } catch (error) {
    console.error("Error loading marketplace removals:", error);
    return { events: [], latest: [], latestBuildDate: null };
  }
};
