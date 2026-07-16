const fs = require("fs");
const path = require("path");

const { vendorBlockList } = require("./data-filters");

const ANOMALIES_FILE = path.join(__dirname, "json/installs/anomalies.json");
const MARKETPLACE_FILE = path.join(__dirname, "json/marketplace/marketplace.json");

// anomalies.json already embeds `id`/`app_id`/`name` for each episode (see
// scripts/update-anomalies.js), so it's readable on its own. This just adds
// the current logo/vendor for display, and hides apps on the vendor block
// list - both of which can change after an episode was recorded.
function loadDisplayMetaByAppId() {
  const raw = JSON.parse(fs.readFileSync(MARKETPLACE_FILE, "utf-8"));
  const metaByAppId = new Map();

  for (const app of raw.marketplace_apps || []) {
    metaByAppId.set(app.app_id, {
      logoUrl: app.logo_url,
      vendorId: app.marketplace_developer_id,
      blocked: vendorBlockList.includes(app.marketplace_developer_id),
    });
  }

  return metaByAppId;
}

module.exports = function () {
  try {
    const anomaliesData = JSON.parse(fs.readFileSync(ANOMALIES_FILE, "utf-8"));
    const metaByAppId = loadDisplayMetaByAppId();

    const episodes = anomaliesData.episodes
      .filter((episode) => !metaByAppId.get(episode.app_id)?.blocked)
      .map((episode) => {
        const meta = metaByAppId.get(episode.app_id);
        const rateLabel =
          episode.beforeWeeklyInstalls > 0
            ? `${(episode.afterWeeklyInstalls / episode.beforeWeeklyInstalls).toFixed(1)}x`
            : episode.direction === "jump"
              ? "new"
              : "stalled";

        return {
          ...episode,
          logoUrl: meta?.logoUrl ?? null,
          vendorId: meta?.vendorId ?? null,
          rateLabel,
          swingMagnitude: Math.abs(episode.afterWeeklyInstalls - episode.beforeWeeklyInstalls),
        };
      })
      .sort((a, b) => {
        if (a.endDate !== b.endDate) return a.endDate < b.endDate ? 1 : -1;
        return b.swingMagnitude - a.swingMagnitude;
      });

    const latestBuildDate = anomaliesData.processedThrough;
    const latest = episodes.filter((episode) => episode.endDate === latestBuildDate);

    return { episodes, latest, latestBuildDate };
  } catch (error) {
    console.error("Error loading install anomalies:", error);
    return { episodes: [], latest: [], latestBuildDate: null };
  }
};
