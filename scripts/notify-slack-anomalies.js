#!/usr/bin/env node
//
// Posts newly-detected install anomalies (written by scripts/update-anomalies.js
// to new-anomalies.json) to a Slack channel via an Incoming Webhook. The
// webhook URL is read from the SLACK_WEBHOOK_URL environment variable, which
// in CI comes from a GitHub Actions secret - never hardcode it here.

///////////// Setup
//
// The Slack app is setup here: https://api.slack.com/apps/A0BJU4BJS80
//
// secrets.SLACK_WEBHOOK_URL isn't set by any code — it has to be added manually in the GitHub repo's settings:
//
// Create the Slack webhook first: in Slack, go to https://api.slack.com/apps → create an app (or use an existing one) → enable "Incoming Webhooks" → "Add New Webhook to Workspace" → pick the channel → Slack gives you a URL like https://hooks.slack.com/services/T000/B000/xxxxxxxx.
//
// Add it as a repo secret on GitHub:
//
// Go to the repo on github.com → Settings → Secrets and variables → Actions
// Under the Secrets tab, click New repository secret
// Name: SLACK_WEBHOOK_URL
// Value: paste the webhook URL from step 1
// Save
// Or via the gh CLI: gh secret set SLACK_WEBHOOK_URL --body "https://hooks.slack.com/services/..."
//
// Once that secret exists, ${{ secrets.SLACK_WEBHOOK_URL }} in the workflow resolves to it at runtime and gets injected into the SLACK_WEBHOOK_URL env var for the notify-slack-anomalies.js step. It's never printed in logs (GitHub automatically redacts secret values), and it can't be read back once saved — only replaced.

const fs = require("fs");
const path = require("path");

const NEW_ANOMALIES_FILE = path.join(__dirname, "../new-anomalies.json");
const SITE_URL = require("../src/_data/site.json").url;

function directionEmoji(direction) {
  return direction === "jump"
    ? ":small_red_triangle:"
    : ":small_red_triangle_down:";
}

function rateLabel(episode) {
  if (episode.beforeWeeklyInstalls > 0) {
    return `${(episode.afterWeeklyInstalls / episode.beforeWeeklyInstalls).toFixed(1)}x`;
  }
  return episode.direction === "jump" ? "new" : "stalled";
}

function formatEpisode(episode) {
  const name = episode.id
    ? `<${SITE_URL}/apps/${episode.id}/#installs-7d|${episode.name}>`
    : episode.name || `Unknown app (${episode.app_id})`;

  return (
    `${directionEmoji(episode.direction)} *${name}* - ${rateLabel(episode)} ` +
    `(${episode.beforeWeeklyInstalls} → ${episode.afterWeeklyInstalls} installs/week) ` +
    `since ${episode.startDate}`
  );
}

async function main() {
  if (!fs.existsSync(NEW_ANOMALIES_FILE)) {
    console.log("No new-anomalies.json found - nothing to notify.");
    return;
  }

  const newEpisodes = JSON.parse(fs.readFileSync(NEW_ANOMALIES_FILE, "utf-8"));
  if (newEpisodes.length === 0) {
    console.log("No new anomalies this run - skipping Slack notification.");
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error(
      `${newEpisodes.length} new anomal${newEpisodes.length === 1 ? "y" : "ies"} to report, but SLACK_WEBHOOK_URL is not set.`,
    );
  }

  const lines = newEpisodes.map(formatEpisode);
  const message = {
    text:
      `*${newEpisodes.length} new install anomal${newEpisodes.length === 1 ? "y" : "ies"} detected*\n` +
      lines.join("\n"),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(
      `Slack webhook responded with ${response.status}: ${await response.text()}`,
    );
  }

  console.log(`Posted ${newEpisodes.length} new anomalies to Slack.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
