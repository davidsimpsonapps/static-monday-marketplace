#!/usr/bin/env node
//
// Posts today's daily headlines, one line per article with a link (written by
// scripts/build-daily-report.js to new-daily-report.json) to Slack, with a
// link to the full report. No report today means no message. See
// scripts/notify-slack-anomalies.js for webhook setup instructions - this
// reuses the same SLACK_WEBHOOK_URL secret.

const fs = require("fs");
const path = require("path");

const NEW_REPORT_FILE = path.join(__dirname, "../new-daily-report.json");

// Slack's mrkdwn treats &, < and > as control characters
function slackEscape(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function main() {
  if (!fs.existsSync(NEW_REPORT_FILE)) {
    console.log("No daily report today - skipping Slack notification.");
    return;
  }

  const { date, articles } = JSON.parse(fs.readFileSync(NEW_REPORT_FILE, "utf-8"));
  const topicLabels = new Map(require("../src/_data/reportTopics").map((t) => [t.slug, t.label]));

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("A daily report was published, but SLACK_WEBHOOK_URL is not set.");
  }

  const message = {
    text: [
      `:newspaper: *Daily ${date}*`,
      ...articles.map((a) => `• ${topicLabels.get(a.topic) || a.topic}: <${a.url}|${slackEscape(a.headline)}>`),
    ].join("\n"),
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

  console.log(`Posted daily report ${date} to Slack.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
