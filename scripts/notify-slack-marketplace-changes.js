#!/usr/bin/env node
//
// Posts newly-detected marketplace additions/removals/archivals (written by
// scripts/update-marketplace-changes.js to new-marketplace-changes.json) to
// Slack via an Incoming Webhook. See scripts/notify-slack-anomalies.js for
// webhook setup instructions - this reuses the same SLACK_WEBHOOK_URL secret.

const fs = require("fs");
const path = require("path");

const NEW_CHANGES_FILE = path.join(__dirname, "../new-marketplace-changes.json");
const SITE_URL = require("../src/_data/site.json").url;

function appLink(entry) {
  return `<${SITE_URL}/apps/${entry.id}/|${entry.name || `Unknown app (${entry.app_id})`}>`;
}

function formatSection(emoji, verb, entries) {
  if (entries.length === 0) return [];
  return [
    `${emoji} *${entries.length} app${entries.length === 1 ? "" : "s"} ${verb}*`,
    ...entries.map((entry) => `${emoji} ${appLink(entry)} (${entry.date})`),
  ];
}

async function main() {
  if (!fs.existsSync(NEW_CHANGES_FILE)) {
    console.log("No new-marketplace-changes.json found - nothing to notify.");
    return;
  }

  const { added = [], removed = [], archived = [] } = JSON.parse(
    fs.readFileSync(NEW_CHANGES_FILE, "utf-8"),
  );
  const total = added.length + removed.length + archived.length;
  if (total === 0) {
    console.log("No new marketplace changes this run - skipping Slack notification.");
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error(
      `${total} marketplace change${total === 1 ? "" : "s"} to report, but SLACK_WEBHOOK_URL is not set.`,
    );
  }

  const lines = [
    ...formatSection(":new:", "added to the marketplace", added),
    ...formatSection(":wastebasket:", "removed from the marketplace", removed),
    ...formatSection(":package:", "archived", archived),
  ];

  const message = {
    text: `*${total} marketplace change${total === 1 ? "" : "s"} detected*\n${lines.join("\n")}`,
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

  console.log(`Posted ${total} marketplace changes to Slack.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
