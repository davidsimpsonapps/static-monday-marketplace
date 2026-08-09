#!/usr/bin/env node
//
// Detects apps that were added to, removed from, or archived within the
// monday.com marketplace, by walking the daily snapshots in
// src/archive/json/marketplace/historical/ (written earlier in the same
// workflow run - see .github/workflows/historic_installs.yml) and diffing
// each day against the day before it.
//
// "Archived" mirrors the site's own definition (see appsWithoutCategories in
// .eleventy.js): an app that's still present in the marketplace feed but has
// no marketplace_category_ids, meaning it no longer shows up anywhere apps
// are browsed. "Removed" means the id disappeared from the feed entirely.
//
// Removed and archived apps are persisted - together with their last known
// full app JSON and their vendor's last known full JSON (from
// src/archive/json/installs/vendors/historical/, the same day as the app
// snapshot) - to src/_data/json/marketplace/removals.json, intended to back
// a "removals" page. Keeping the vendor JSON alongside the app JSON means the
// page doesn't depend on that vendor still existing in the live vendor feed.
// Added apps are Slack-only; there's nothing to archive, the app just shows
// up in marketplace.json going forward.
//
// Run with no existing removals.json to backfill the full history (walks
// every consecutive pair of snapshots). Run again later and it only looks at
// days after `processedThrough`, so it's cheap to run on every daily
// data-update build. Note that a first-time backfill will also flag every
// historical event as "new" for scripts/notify-slack-marketplace-changes.js -
// run this script (and commit removals.json) before wiring the Slack step in.

const fs = require("fs");
const path = require("path");

const { vendorBlockList } = require("../src/_data/data-filters");

const HISTORICAL_DIR = path.join(__dirname, "../src/archive/json/marketplace/historical");
const VENDORS_HISTORICAL_DIR = path.join(__dirname, "../src/archive/json/installs/vendors/historical");
const REMOVALS_FILE = path.join(__dirname, "../src/_data/json/marketplace/removals.json");
// Not committed (see .gitignore) - read by scripts/notify-slack-marketplace-changes.js
// in the same workflow run, then discarded.
const NEW_CHANGES_FILE = path.join(__dirname, "../new-marketplace-changes.json");

function hasCategories(app) {
  return (app.marketplace_category_ids || []).length > 0;
}

function loadSnapshot(date) {
  const raw = JSON.parse(fs.readFileSync(path.join(HISTORICAL_DIR, `${date}.json`), "utf-8"));
  const byId = new Map();
  for (const app of raw.marketplace_apps || []) {
    if (app.id != null) byId.set(app.id, app);
  }
  return byId;
}

function loadVendorSnapshot(date) {
  const filePath = path.join(VENDORS_HISTORICAL_DIR, `${date}.json`);
  const byId = new Map();
  if (!fs.existsSync(filePath)) return byId;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  for (const vendor of raw.marketplace_developers || []) {
    if (vendor.id != null) byId.set(vendor.id, vendor);
  }
  return byId;
}

function loadRemovalsFile() {
  if (fs.existsSync(REMOVALS_FILE)) {
    return JSON.parse(fs.readFileSync(REMOVALS_FILE, "utf-8"));
  }
  return {
    description:
      "Apps removed from, or archived out of, the monday.com marketplace. 'archived' means the app is still present in marketplace.json but has no categories (matches appsWithoutCategories in .eleventy.js); 'removed' means it disappeared from marketplace.json entirely. Each entry keeps the last known full app JSON, and the last known full JSON for its vendor, from the day the change was detected (for removals, that's the day before it disappeared).",
    processedThrough: null,
    events: [],
  };
}

function buildEvent(type, id, app, vendor, date) {
  return {
    id,
    app_id: app.app_id,
    name: app.name,
    type,
    date,
    blocked: vendorBlockList.includes(app.marketplace_developer_id),
    app,
    vendor: vendor ?? null,
  };
}

function diffDay(previous, current, previousVendors, currentVendors, currentDate) {
  const added = [];
  const removed = [];
  const archived = [];

  for (const [id, app] of current) {
    const prevApp = previous.get(id);
    if (!prevApp) {
      added.push({
        id,
        app_id: app.app_id,
        name: app.name,
        date: currentDate,
        blocked: vendorBlockList.includes(app.marketplace_developer_id),
      });
    } else if (hasCategories(prevApp) && !hasCategories(app)) {
      const vendor = currentVendors.get(app.marketplace_developer_id);
      archived.push(buildEvent("archived", id, app, vendor, currentDate));
    }
  }

  for (const [id, app] of previous) {
    if (!current.has(id)) {
      const vendor = previousVendors.get(app.marketplace_developer_id);
      removed.push(buildEvent("removed", id, app, vendor, currentDate));
    }
  }

  return { added, removed, archived };
}

function main() {
  const dates = fs
    .readdirSync(HISTORICAL_DIR)
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .map((file) => file.replace(/\.json$/, ""))
    .sort();

  const removalsFile = loadRemovalsFile();
  const seen = new Set(removalsFile.events.map((e) => `${e.id}:${e.type}:${e.date}`));

  const startFrom = removalsFile.processedThrough
    ? dates.findIndex((date) => date > removalsFile.processedThrough)
    : 1; // first date has no "previous" to diff against

  const allAdded = [];
  const allRemoved = [];
  const allArchived = [];
  let latestDateProcessed = removalsFile.processedThrough;

  if (startFrom !== -1) {
    for (let i = Math.max(startFrom, 1); i < dates.length; i++) {
      const previous = loadSnapshot(dates[i - 1]);
      const current = loadSnapshot(dates[i]);
      const previousVendors = loadVendorSnapshot(dates[i - 1]);
      const currentVendors = loadVendorSnapshot(dates[i]);
      const { added, removed, archived } = diffDay(
        previous,
        current,
        previousVendors,
        currentVendors,
        dates[i],
      );

      allAdded.push(...added);
      allRemoved.push(...removed);
      allArchived.push(...archived);
      latestDateProcessed = dates[i];
    }
  }

  const newRemovalEvents = [...allRemoved, ...allArchived].filter(
    (e) => !seen.has(`${e.id}:${e.type}:${e.date}`),
  );
  for (const { blocked, ...event } of newRemovalEvents) {
    removalsFile.events.push(event);
    seen.add(`${event.id}:${event.type}:${event.date}`);
  }
  removalsFile.events.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  removalsFile.processedThrough = latestDateProcessed;

  fs.writeFileSync(REMOVALS_FILE, JSON.stringify(removalsFile, null, 2) + "\n");
  fs.writeFileSync(
    NEW_CHANGES_FILE,
    JSON.stringify(
      {
        added: allAdded.filter((e) => !e.blocked).map(({ blocked, ...rest }) => rest),
        removed: allRemoved.filter((e) => !e.blocked).map(({ blocked, app, vendor, ...rest }) => rest),
        archived: allArchived.filter((e) => !e.blocked).map(({ blocked, app, vendor, ...rest }) => rest),
      },
      null,
      2,
    ) + "\n",
  );

  console.log(
    `Processed marketplace changes through ${latestDateProcessed}. ` +
      `Total removals/archives on file: ${removalsFile.events.length}. ` +
      `This run: ${allAdded.length} added, ${allRemoved.length} removed, ${allArchived.length} archived.`,
  );
}

main();
