#!/usr/bin/env node
//
// Detects apps whose *rate* of new installs changed sharply week over week -
// i.e. installs gained in the last 7 days vs installs gained in the 7 days
// before that - and persists them to src/_data/json/installs/anomalies.json.
//
// This deliberately ignores the app's total install count. A large app can
// have a huge acceleration in adoption that's invisible as a % of its total
// installs; a small app doubling its (tiny) total isn't interesting unless
// the actual number of installs gained is meaningful. Comparing week-over-
// week deltas catches both, and also catches deceleration/reversal (a jump
// in installs that then stalls back out).
//
// Run with no existing anomalies.json to backfill the full history (walks
// every day of every app's install history). Run again later and it only
// looks at days after `processedThrough`, so it's cheap to run on every
// daily data-update build - each run just checks whether the newest day(s)
// continue an existing episode, close it out, or start a new one.

const fs = require("fs");
const path = require("path");

const { vendorBlockList } = require("../src/_data/data-filters");

const INSTALLS_APPS_DIR = path.join(__dirname, "../src/_data/json/installs/apps");
const ANOMALIES_FILE = path.join(__dirname, "../src/_data/json/installs/anomalies.json");
const MARKETPLACE_FILE = path.join(__dirname, "../src/_data/json/marketplace/marketplace.json");
// Not committed (see .gitignore) - read by scripts/notify-slack-anomalies.js
// in the same workflow run, then discarded.
const NEW_ANOMALIES_FILE = path.join(__dirname, "../new-anomalies.json");

// The larger side of the this-week-vs-last-week comparison must be at least
// this many installs for a change to count - filters out noise like an app
// going from adding 1 install/week to adding 3 install/week.
const MIN_WEEKLY_DELTA = 100;

// This week's install delta at least doubling (or halving) the previous
// week's delta counts as a "100%" change in growth rate.
const JUMP_RATIO = 2;
const DROP_RATIO = 0.5;

function addDays(dateStr, days) {
  const date = new Date(`${dateStr}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

// Compares installs gained in the week ending on `date` against installs
// gained in the week before that. Returns null if there isn't 14 days of
// prior data, or if the change doesn't clear the noise floor.
function directionFor(byDate, date) {
  const count = byDate.get(date);
  const weekAgo = byDate.get(addDays(date, -7));
  const twoWeeksAgo = byDate.get(addDays(date, -14));
  if (weekAgo === undefined || twoWeeksAgo === undefined) return null;

  const thisWeekDelta = count - weekAgo;
  const prevWeekDelta = weekAgo - twoWeeksAgo;
  if (Math.max(Math.abs(thisWeekDelta), Math.abs(prevWeekDelta)) < MIN_WEEKLY_DELTA) return null;

  let direction = null;
  if (prevWeekDelta > 0) {
    const ratio = thisWeekDelta / prevWeekDelta;
    if (ratio >= JUMP_RATIO) direction = "jump";
    else if (ratio <= DROP_RATIO) direction = "drop";
  } else {
    // Previous week was flat or declining - judge by the size of the swing
    // rather than a ratio (which is meaningless around zero/negative).
    if (thisWeekDelta - prevWeekDelta >= MIN_WEEKLY_DELTA) direction = "jump";
    else if (prevWeekDelta - thisWeekDelta >= MIN_WEEKLY_DELTA) direction = "drop";
  }
  if (!direction) return null;

  return { direction, prevWeekDelta, thisWeekDelta };
}

// `id` is the marketplace id (used for /apps/{id}/ links), `app_id` is the
// id the install-analytics feed uses (a different namespace) - both are
// embedded on each episode so anomalies.json is self-describing without
// needing to cross-reference marketplace.json.
function loadAppMetaByAppId() {
  const raw = JSON.parse(fs.readFileSync(MARKETPLACE_FILE, "utf-8"));
  const metaByAppId = new Map();

  for (const app of raw.marketplace_apps || []) {
    metaByAppId.set(app.app_id, {
      id: app.id,
      name: app.name,
      blocked: vendorBlockList.includes(app.marketplace_developer_id),
    });
  }

  return metaByAppId;
}

function loadAnomaliesFile() {
  if (fs.existsSync(ANOMALIES_FILE)) {
    return JSON.parse(fs.readFileSync(ANOMALIES_FILE, "utf-8"));
  }
  return {
    description:
      "Apps whose weekly install rate doubled or halved (installs gained this week vs installs gained the week before), where the larger side of the comparison is at least 100 installs.",
    processedThrough: null,
    episodes: [],
  };
}

function main() {
  const anomalies = loadAnomaliesFile();

  const metaByAppId = loadAppMetaByAppId();

  const episodesByApp = new Map();
  for (const episode of anomalies.episodes) {
    if (!episodesByApp.has(episode.app_id)) episodesByApp.set(episode.app_id, []);
    episodesByApp.get(episode.app_id).push(episode);
  }

  const files = fs
    .readdirSync(INSTALLS_APPS_DIR)
    .filter((file) => /^\d+\.json$/.test(file));

  let latestDateAcrossAll = anomalies.processedThrough;
  const newEpisodes = [];

  for (const file of files) {
    const appId = parseInt(file.replace(/\.json$/, ""), 10);
    const meta = metaByAppId.get(appId) || { id: null, name: null, blocked: false };

    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(INSTALLS_APPS_DIR, file), "utf-8"));
    } catch (error) {
      continue;
    }

    const byDate = new Map();
    for (const { date, count } of data.history || []) {
      byDate.set(date, parseInt(count, 10));
    }
    const dates = [...byDate.keys()].sort();
    if (dates.length === 0) continue;

    const lastDate = dates[dates.length - 1];
    if (!latestDateAcrossAll || lastDate > latestDateAcrossAll) {
      latestDateAcrossAll = lastDate;
    }

    const startFrom = anomalies.processedThrough
      ? dates.find((date) => date > anomalies.processedThrough)
      : dates[0];
    if (startFrom === undefined) continue; // nothing new for this app

    const appEpisodes = episodesByApp.get(appId) || [];
    let streak = appEpisodes.find((episode) => episode.ongoing) || null;
    if (streak) delete streak.ongoing; // re-flagged below if still ongoing

    for (const date of dates.filter((d) => d >= startFrom)) {
      const count = byDate.get(date);
      const found = directionFor(byDate, date);

      if (found) {
        if (streak && streak.direction === found.direction) {
          streak.endDate = date;
          streak.endCount = count;
          streak.afterWeeklyInstalls = found.thisWeekDelta;
        } else {
          streak = {
            id: meta.id,
            app_id: appId,
            name: meta.name,
            direction: found.direction,
            startDate: date,
            startCount: count,
            endDate: date,
            endCount: count,
            beforeWeeklyInstalls: found.prevWeekDelta,
            afterWeeklyInstalls: found.thisWeekDelta,
          };
          appEpisodes.push(streak);
          episodesByApp.set(appId, appEpisodes);
          if (!meta.blocked) newEpisodes.push(streak);
        }
      } else if (streak) {
        streak = null;
      }
    }

    if (streak) streak.ongoing = true;
  }

  const episodes = [...episodesByApp.values()].flat();
  episodes.sort((a, b) => {
    if (a.endDate !== b.endDate) return a.endDate < b.endDate ? 1 : -1;
    return 0;
  });

  const output = {
    description:
      "Apps whose weekly install rate doubled or halved (installs gained this week vs installs gained the week before), where the larger side of the comparison is at least 100 installs.",
    processedThrough: latestDateAcrossAll,
    episodes,
  };

  fs.writeFileSync(ANOMALIES_FILE, JSON.stringify(output, null, 2) + "\n");
  fs.writeFileSync(NEW_ANOMALIES_FILE, JSON.stringify(newEpisodes, null, 2) + "\n");
  console.log(
    `Processed anomalies through ${latestDateAcrossAll}. Total episodes: ${episodes.length}. New this run: ${newEpisodes.length}.`,
  );
}

main();
