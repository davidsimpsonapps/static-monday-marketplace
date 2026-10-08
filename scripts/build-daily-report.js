#!/usr/bin/env node
//
// Builds the daily news on /daily/: short articles, written by Claude, about
// what changed for monday.com app developers since the previous day - one
// article per topic (see src/_data/reportTopics.js), so readers can follow
// only the topics they care about.
//
// Writes src/reports/YYYY-MM-DD-<topic>.md (published at
// /reports/YYYY-MM-DD/<topic>/) for every topic with something worth
// reporting. Quiet days produce no articles at all; there is never an
// "everything was fine" entry.
//
// Which facts go into the articles is decided by the rules in this file:
//   - New apps            apps that appeared in marketplace.json
//   - Removed / archived  new entries in removals.json (named, not described)
//   - Install anomalies   new episodes in anomalies.json
//   - Outages             monday.com healthchecks that went unhealthy
//   - Slowdowns           decreased-performance periods longer than 15 minutes
//   - monday incidents    incidents on monday.com's own status page
//                         (status.monday.com) with updates in the window
//   - Incidents           incidents added to / resolved in src/status/incidents.njk
//   - Developer docs      changes to developer-docs/ (see
//                         scripts/crawl-developer-docs.js) - the one thing
//                         Claude filters itself: typo fixes and pages that
//                         don't matter to app developers are dropped
// In a single request, Claude turns them into one article (headline, lede and
// a few paragraphs) per topic. It can only link to URLs that are part of its
// input.
//
// The report runs right after the daily data update (see
// .github/workflows/daily-report.yml) and covers everything since the
// previous data update - roughly 24 hours, but without gaps or overlaps
// between consecutive reports when the update runs late. "What changed" for
// repo files is answered with git: each file at the previous data update
// commit is compared against HEAD (or the last commit before --now), so the
// checkout needs a few days of history. Status data comes from the same
// healthcheck API that powers /status/, for the same time window.
//
// Also writes new-daily-report.json (not committed) for
// scripts/notify-slack-daily-report.js.
//
// Run manually:  node scripts/build-daily-report.js
// Options:       --dry-run    print the report instead of writing files
//                --now=<ISO>  pretend the run happens at this time
//                --skip-ai    don't call Claude; the articles are plain lists
//                             of the selected facts (docs changes left out) -
//                             for testing without an API key
//                --print-input           print the facts sent to Claude and exit
//                --articles-from=<file>  don't call Claude; use articles
//                             written elsewhere ({"articles": [...]} JSON, see
//                             ArticlesSchema) - e.g. to backfill past days

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const matter = require("gray-matter");
const { z } = require("zod");
const Anthropic = require("@anthropic-ai/sdk");
const { betaZodOutputFormat } = require("@anthropic-ai/sdk/helpers/beta/zod");

const { vendorBlockList } = require("../src/_data/data-filters");
const reportTopics = require("../src/_data/reportTopics");

const ROOT = path.join(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "src/reports");
// Not committed (see .gitignore) - read by scripts/notify-slack-daily-report.js
// in the same workflow run, then discarded.
const NEW_REPORT_FILE = path.join(ROOT, "new-daily-report.json");

const MARKETPLACE_FILE = "src/_data/json/marketplace/marketplace.json";
const VENDORS_FILE = "src/_data/json/installs/vendors/vendors.json";
const REMOVALS_FILE = "src/_data/json/marketplace/removals.json";
const ANOMALIES_FILE = "src/_data/json/installs/anomalies.json";
const INCIDENTS_FILE = "src/status/incidents.njk";
const DOCS_DIR = "developer-docs";

const STATUS_HISTORY_URL = "https://status.getgorilla.app/api/healthchecks/history?limit=500";
// Only monday.com's own infrastructure - the same filter /status/ uses.
const STATUS_HEALTHCHECK_PREFIX = "monday-";
const MIN_DEGRADED_MINUTES = 15;
// monday.com's official status page (Atlassian Statuspage) - the last 50
// incidents with all their updates.
const MONDAY_INCIDENTS_URL = "https://status.monday.com/api/v2/incidents.json";
const MAX_UPDATE_CHARS = 400;

// Commit message of the daily data update in .github/workflows/historic_installs.yml
const DATA_UPDATE_COMMIT = "^Auto-update install data";

// Claude budget: at most ~5 cents per day. With Claude Sonnet 5.5 ($2 / $10
// per million input / output tokens) that is ~10k input tokens (2 cents) plus
// 3k output tokens for the article (3 cents). Quiet days don't call Claude.
const MODEL = "claude-sonnet-5-5";
const MAX_INPUT_TOKENS = 10000;
// Includes thinking. Hitting it fails the run instead of publishing a
// half-written report.
const MAX_OUTPUT_TOKENS = 3000;
// Caps on what is sent to Claude, so the request starts out close to the
// token budget. Docs diffs are trimmed further, if needed, after counting
// tokens (see fitToBudget).
const MAX_DESCRIPTION_CHARS = 1500;
const MAX_DIFF_CHARS_PER_FILE = 4000;
const MAX_DIFF_CHARS_TOTAL = 30000;
const OMITTED_DIFF = "[diff omitted to stay within the daily budget - the page changed, but the details aren't available]";

const SITE_URL = require("../src/_data/site.json").url;
const DOCS_URL = "https://developer.monday.com";

// ---- helpers ----

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf-8", maxBuffer: 1024 * 1024 * 1024 });
}

// The file's content at `rev`, or null if it didn't exist there.
function gitShow(rev, file) {
  try {
    return execFileSync("git", ["show", `${rev}:${file}`], {
      cwd: ROOT,
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

function readJsonAt(rev, file) {
  const content = gitShow(rev, file);
  return content == null ? null : JSON.parse(content);
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Escapes text for use inside a Markdown link label or list item.
function md(text) {
  return String(text).replace(/([\\`*_[\]<>|])/g, "\\$1");
}

function formatTime(date) {
  return date.toISOString().slice(11, 16);
}

// ---- data collection ----

// The data update commit before the most recent one, i.e. where the previous
// report left off.
function previousDataUpdate(tip) {
  const [, previous] = git(["log", "-2", "--format=%H %cI", `--grep=${DATA_UPDATE_COMMIT}`, tip])
    .trim()
    .split("\n");
  if (!previous) {
    throw new Error("Couldn't find the previous data update commit - the checkout needs more history.");
  }
  const [base, date] = previous.split(" ");
  return { base, windowStart: new Date(date) };
}

// The last commit before `time`.
function commitBefore(time) {
  const commit = git(["rev-list", "-1", `--before=${time.toISOString()}`, "HEAD"]).trim();
  if (!commit) {
    throw new Error(`No commit found before ${time.toISOString()} - the checkout needs more history.`);
  }
  return commit;
}

// Apps usually appear in the data without categories days before they're
// published, so an app counts as new once it gets its first category - not
// when its id first shows up.
function collectNewApps(base, tip) {
  const before = readJsonAt(base, MARKETPLACE_FILE);
  if (!before) return [];
  const listedBefore = new Set(
    before.marketplace_apps
      .filter((app) => (app.marketplace_category_ids || []).length > 0)
      .map((app) => app.id),
  );
  const vendorsById = new Map(
    (readJsonAt(tip, VENDORS_FILE).marketplace_developers || []).map((v) => [v.id, v]),
  );

  return readJsonAt(tip, MARKETPLACE_FILE)
    .marketplace_apps.filter(
      (app) =>
        !listedBefore.has(app.id) &&
        (app.marketplace_category_ids || []).length > 0 &&
        !vendorBlockList.includes(app.marketplace_developer_id),
    )
    .map((app) => ({
      id: app.id,
      name: app.name,
      vendor: vendorsById.get(app.marketplace_developer_id)?.name || null,
      shortDescription: stripHtml(app.short_description),
      description: stripHtml(app.description).slice(0, MAX_DESCRIPTION_CHARS),
    }));
}

function collectRemovals(base, tip) {
  const key = (e) => `${e.id}:${e.type}:${e.date}`;
  const before = new Set((readJsonAt(base, REMOVALS_FILE)?.events || []).map(key));
  return readJsonAt(tip, REMOVALS_FILE)
    .events.filter(
      (e) => !before.has(key(e)) && !vendorBlockList.includes(e.app?.marketplace_developer_id),
    )
    .map((e) => ({ id: e.id, name: e.name, type: e.type }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// An episode's `id` is the app's id, shared by all of the app's episodes - so
// an episode is identified by app, direction and start.
function collectAnomalies(base, tip) {
  const key = (e) => `${e.app_id}:${e.direction}:${e.startDate}`;
  const before = new Set((readJsonAt(base, ANOMALIES_FILE)?.episodes || []).map(key));
  return readJsonAt(tip, ANOMALIES_FILE).episodes.filter((e) => !before.has(key(e)));
}

function parseIncidents(content) {
  if (content == null) return [];
  return matter(content).data.incidents || [];
}

function collectIncidents(base, tip) {
  const before = new Map(parseIncidents(gitShow(base, INCIDENTS_FILE)).map((i) => [String(i.start), i]));
  const changes = [];
  for (const incident of parseIncidents(gitShow(tip, INCIDENTS_FILE))) {
    const previous = before.get(String(incident.start));
    if (!previous) {
      changes.push({ change: incident.end ? "added-resolved" : "added", incident });
    } else if (!previous.end && incident.end) {
      changes.push({ change: "resolved", incident });
    }
  }
  return changes.map(({ change, incident }, index) => ({
    key: `incident-${index}`,
    change,
    title: stripHtml(incident.title),
    start: String(incident.start),
    end: incident.end ? String(incident.end) : null,
    description: stripHtml(incident.description),
    resolution: incident.resolution ? stripHtml(incident.resolution) : null,
  }));
}

// Turns the healthcheck status history into periods (healthcheck X was in
// status Y from A to B) that overlap the report window.
async function collectStatusPeriods(windowStart, windowEnd) {
  const response = await fetch(STATUS_HISTORY_URL);
  if (!response.ok) throw new Error(`Status history responded with ${response.status}`);
  const events = ((await response.json()).data || [])
    .filter((e) => e.healthcheck_id.startsWith(STATUS_HEALTHCHECK_PREFIX))
    .map((e) => ({ ...e, time: new Date(e.status_change_time) }))
    .sort((a, b) => a.time - b.time);

  if (events.length && events[0].time > windowStart) {
    console.warn("Status history may not reach back to the start of the window - some periods could be missing.");
  }

  const periods = [];
  const open = new Map(); // healthcheck_id -> period still waiting for its end
  for (const event of events) {
    const current = open.get(event.healthcheck_id);
    if (current) {
      current.end = event.time;
      open.delete(event.healthcheck_id);
    }
    if (event.new_status !== "healthy") {
      const period = {
        healthcheckId: event.healthcheck_id,
        service: event.service_display_name,
        check: event.healthcheck_display_name,
        status: event.new_status,
        start: event.time,
        end: null,
      };
      periods.push(period);
      open.set(event.healthcheck_id, period);
    }
  }

  return periods
    .filter((p) => (p.end ?? windowEnd) > windowStart && p.start < windowEnd)
    .map((p) => ({
      ...p,
      ongoing: p.end == null,
      minutes: Math.max(1, Math.round(((p.end ?? windowEnd) - p.start) / 60000)),
    }));
}

// Incidents on status.monday.com with an update during the window, as they
// stood at the end of the window (so past days can be re-run).
async function collectMondayIncidents(windowStart, windowEnd) {
  const response = await fetch(MONDAY_INCIDENTS_URL);
  if (!response.ok) throw new Error(`monday.com status page responded with ${response.status}`);
  const stamp = (time) => `${new Date(time).toISOString().slice(0, 16).replace("T", " ")} UTC`;

  return ((await response.json()).incidents || [])
    .map((incident) => {
      const updates = incident.incident_updates
        .filter((u) => new Date(u.display_at) <= windowEnd)
        .sort((a, b) => new Date(a.display_at) - new Date(b.display_at));
      return { incident, updates };
    })
    .filter(({ updates }) => updates.some((u) => new Date(u.display_at) > windowStart))
    .map(({ incident, updates }) => {
      const affected = new Set();
      for (const u of updates) {
        for (const c of u.affected_components || []) if (c.new_status !== "operational") affected.add(c.name);
      }
      const latest = updates[updates.length - 1];
      return {
        title: incident.name,
        impact: incident.impact,
        status: latest.status,
        started: stamp(incident.started_at || incident.created_at),
        resolved: latest.status === "resolved" ? stamp(latest.display_at) : null,
        affectedComponents: [...affected].sort(),
        updates: updates.map((u) => ({
          time: stamp(u.display_at),
          status: u.status,
          text: stripHtml(u.body).slice(0, MAX_UPDATE_CHARS),
        })),
        url: incident.shortlink,
      };
    });
}

// Healthchecks of one service that failed together are one event for the
// reader ("US: Board API, Storage API were unhealthy 02:12-02:13"), so
// overlapping periods of the same service and status are merged.
function groupPeriods(periods) {
  const groups = [];
  const sorted = [...periods].sort((a, b) => a.start - b.start);
  for (const period of sorted) {
    const periodEnd = period.end ?? Infinity;
    const group = groups.find(
      (g) => g.service === period.service && g.status === period.status && period.start <= g.end,
    );
    if (group) {
      group.checks.add(period.check);
      group.end = Math.max(group.end, periodEnd);
      group.ongoing = group.ongoing || period.ongoing;
    } else {
      groups.push({
        service: period.service,
        status: period.status,
        checks: new Set([period.check]),
        start: period.start,
        end: periodEnd,
        ongoing: period.ongoing,
      });
    }
  }
  return groups;
}

function docsUrl(file) {
  const page = file.replace(new RegExp(`^${DOCS_DIR}/`), "").replace(/\.md$/, "");
  return page === "index" ? DOCS_URL : `${DOCS_URL}/${page}`;
}

function collectDocsChanges(base, tip) {
  // No docs at the base commit means this is the crawler's first run - that's
  // the baseline, not a change.
  if (!git(["ls-tree", base, `${DOCS_DIR}/`]).trim()) return [];

  const changes = git(["diff", "--name-status", "--find-renames", base, tip, "--", `${DOCS_DIR}/`])
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [status, ...files] = line.split("\t");
      const file = files[files.length - 1];
      return { status: status[0], file, previousFile: files.length > 1 ? files[0] : null };
    });

  let total = 0;
  return changes.map((change) => {
    let diff = git(["diff", "--find-renames", base, tip, "--", ...[change.previousFile, change.file].filter(Boolean)]);
    if (diff.length > MAX_DIFF_CHARS_PER_FILE) {
      diff = `${diff.slice(0, MAX_DIFF_CHARS_PER_FILE)}\n[diff truncated - ${diff.length} characters in total]`;
    }
    if (total + diff.length > MAX_DIFF_CHARS_TOTAL) {
      diff = OMITTED_DIFF;
    }
    total += diff.length;
    return {
      key: change.file,
      status: { A: "added", D: "removed", R: "renamed", M: "modified" }[change.status] || "modified",
      url: docsUrl(change.file),
      diff,
    };
  });
}

// ---- Claude ----

// One article per topic. Topic slugs match src/_data/reportTopics.js.
const TOPIC_SLUGS = reportTopics.map((t) => t.slug);

const ArticlesSchema = z.object({
  articles: z.array(
    z.object({
      topic: z.enum(TOPIC_SLUGS).describe("The topic this article covers."),
      headline: z.string().describe("Specific, factual headline in sentence case, at most 90 characters."),
      lede: z
        .string()
        .describe("One or two sentences with the most important news, at most 50 words. Plain text: no links, only `code spans` for API names."),
      body: z.string().describe("The article body in Markdown: short paragraphs, links allowed, no bullet lists. Can be empty when the lede says it all."),
    }),
  ),
});

const SYSTEM_PROMPT = `You write the daily news on apps-for-monday.com, a public site for people who build apps for the monday.com marketplace (app developers, vendors, partners). Each day's news covers what changed since the previous day, as one short article per topic. Readers are busy developers: they want to know what happened and whether it affects them, in as few words as possible. Many of them only follow one topic, so every article must stand on its own.

You receive JSON with the day's facts, grouped by topic. Every fact in it has already been selected as worth reporting - cover all of them, except developer docs changes, which you filter yourself (see below). Don't add facts, causes, numbers or speculation that aren't in the input, and never mention what didn't happen ("no outages", "everything else was quiet").

Write exactly one article for each topic that has facts in the input, and none for topics without facts:
- "developer-docs" (docsChanges): git diffs of monday.com's developer documentation (developer.monday.com), crawled as Markdown once a day. Only report changes that matter to someone building on the platform: new or removed API fields, queries, mutations, arguments, limits, deprecations, new features or guides, changed behavior, changed requirements for marketplace apps. Ignore typo and grammar fixes, rewording that doesn't change meaning, formatting, link or image changes, navigation, crawl noise and pages that aren't about building on the platform. Be specific: name the field, query or limit that changed, using Markdown code spans for API names, and link the docs page. Some diffs are omitted to keep the request small; for those pages, only report that a page was added or removed. If no change is worth reporting, write no developer-docs article at all.
- "incidents" (incidents): entries from the site's list of monday.com platform problems that app developers ran into. "added" means newly reported, "resolved" means marked as fixed, "added-resolved" means recorded and resolved at the same time. Explain what is (or was) broken and who is affected; for resolved ones, how it was resolved. Link to links.incidents.
- "platform-status" (mondayIncidents, outages, slowdowns): mondayIncidents are incidents monday.com itself posted on its official status page, with their updates and the components (by region) that were degraded; lead with these, say what was affected, when (UTC) and whether it is resolved, and link each one to its url. Outages are monday.com infrastructure healthchecks that were unhealthy (failing); slowdowns are periods of decreased performance longer than 15 minutes. Give the time window in UTC, the region and the affected checks in plain words. Link to links.serviceStatus or links.infrastructure.
- "new-apps" (newApps): apps that appeared in the marketplace. Say in a sentence or two what each app does and who it is for, based on its description but without marketing language, superlatives or feature lists. Link the app name to its url on first mention.
- "install-anomalies" (installAnomalies): apps whose weekly install rate doubled or halved. Give the before/after weekly installs. Link the app name.
- "removed-apps" (removedApps): apps that were removed from, or archived in, the marketplace. Name them all, without commentary on individual apps, and don't link them. This article is short: the headline gives the number, the lede or a single paragraph lists the names.

For every article:
- headline: what happened, specific and factual. No clickbait, no puns, no dates.
- lede: the one or two sentences a reader needs if they read nothing else.
- body: short paragraphs - from nothing (when the lede says it all) to about 250 words. No bullet lists, no tables, no sign-off, and don't repeat the headline or lede. Use "###" subheadings only when one article covers several clearly separate changes.
- Only use links from the input (app, docs and links.* URLs), written exactly as given.

Tone: plain, neutral, precise English - a trade publication, not marketing. No hype, no filler, no exclamation marks.`;

// The facts Claude writes the article from - links included, so it can only
// link to pages that exist.
function articleInput(data, windowStart) {
  const describePeriod = (g) => ({
    service: g.service,
    checks: [...g.checks].sort(),
    start: `${formatTime(g.start)} UTC`,
    end: g.ongoing ? "ongoing" : `${formatTime(new Date(g.end))} UTC`,
    durationMinutes: Math.max(1, Math.round(((g.ongoing ? data.windowEnd : new Date(g.end)) - g.start) / 60000)),
  });
  return {
    period: { from: windowStart.toISOString(), to: data.windowEnd.toISOString() },
    newApps: data.newApps.map((app) => ({
      name: app.name,
      vendor: app.vendor,
      url: `/apps/${app.id}/`,
      shortDescription: app.shortDescription,
      description: app.description,
    })),
    removedApps: data.removals.map((app) => ({ name: app.name.trim(), change: app.type })),
    installAnomalies: data.anomalies.map((e) => ({
      name: e.name,
      url: `/apps/${e.id}/`,
      direction: e.direction,
      since: e.startDate,
      weeklyInstallsBefore: e.beforeWeeklyInstalls,
      weeklyInstallsAfter: e.afterWeeklyInstalls,
    })),
    mondayIncidents: data.mondayIncidents,
    outages: data.outages.map(describePeriod),
    slowdowns: data.slowdowns.map(describePeriod),
    incidents: data.incidents.map(({ change, title, start, end, description, resolution }) => ({
      change,
      title,
      started: start,
      resolved: end,
      description,
      resolution,
    })),
    docsChanges: data.docsChanges.map(({ key, status, url, diff }) => ({ page: key, status, url, diff })),
    links: {
      serviceStatus: "/status/",
      infrastructure: "/status/infrastructure/",
      incidents: "/status/incidents/",
    },
  };
}

// Every URL in the input - the only ones the article may link to.
function allowedUrls(input) {
  return new Set([
    ...input.newApps.map((a) => a.url),
    ...input.installAnomalies.map((a) => a.url),
    ...input.mondayIncidents.map((i) => i.url),
    ...input.docsChanges.filter((d) => d.status !== "removed").map((d) => d.url),
    ...Object.values(input.links),
  ]);
}

// Turns links to anything outside the input back into plain text.
function stripUnknownLinks(markdown, allowed) {
  return markdown.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, text, url) => (allowed.has(url) ? match : text));
}

// The topics that have facts in the input. Docs changes only become an
// article if Claude finds one worth reporting.
function topicsWithFacts(input) {
  const has = {
    "developer-docs": input.docsChanges.length > 0,
    incidents: input.incidents.length > 0,
    "platform-status": input.mondayIncidents.length + input.outages.length + input.slowdowns.length > 0,
    "new-apps": input.newApps.length > 0,
    "install-anomalies": input.installAnomalies.length > 0,
    "removed-apps": input.removedApps.length > 0,
  };
  return TOPIC_SLUGS.filter((slug) => has[slug]);
}

async function writeArticles(input) {
  const client = new Anthropic();
  const request = await fitToBudget(client, input);
  const response = await client.beta.messages.parse({
    ...request,
    max_tokens: MAX_OUTPUT_TOKENS,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  });
  console.log(
    `Claude usage: ${response.usage.input_tokens} input, ${response.usage.output_tokens} output tokens.`,
  );

  if (response.stop_reason === "refusal") {
    throw new Error(`Claude declined to write the report: ${response.stop_details?.explanation || "no explanation"}`);
  }
  if (response.stop_reason === "max_tokens" || !response.parsed_output) {
    throw new Error(`Claude returned no usable output (stop_reason: ${response.stop_reason}).`);
  }

  return selectArticles(input, response.parsed_output.articles);
}

// Keeps one article per topic that actually has facts, in topic order, with
// links outside the input turned into plain text.
function selectArticles(input, articles) {
  const expected = topicsWithFacts(input);
  const byTopic = new Map();
  for (const article of articles) {
    if (expected.includes(article.topic) && !byTopic.has(article.topic)) byTopic.set(article.topic, article);
  }
  for (const topic of expected) {
    if (!byTopic.has(topic) && topic !== "developer-docs") {
      console.warn(`Claude wrote no article for "${topic}" - it's missing from today's report.`);
    }
  }

  const allowed = allowedUrls(input);
  return expected
    .filter((topic) => byTopic.has(topic))
    .map((topic) => {
      const article = byTopic.get(topic);
      return {
        ...article,
        lede: stripUnknownLinks(article.lede, allowed),
        body: stripUnknownLinks(article.body, allowed),
      };
    });
}

// Counts the request's input tokens (free) and, while it is over budget,
// replaces the longest docs diff with a placeholder. Fails if the request is
// still too large without any diffs.
async function fitToBudget(client, input) {
  const build = () => ({
    model: MODEL,
    output_config: { effort: "low", format: betaZodOutputFormat(ArticlesSchema) },
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: JSON.stringify(input) }],
  });

  for (;;) {
    const request = build();
    const { input_tokens: tokens } = await client.beta.messages.countTokens(request);
    if (tokens <= MAX_INPUT_TOKENS) return request;

    const longest = input.docsChanges
      .filter((d) => d.diff !== OMITTED_DIFF)
      .sort((a, b) => b.diff.length - a.diff.length)[0];
    if (!longest) {
      throw new Error(`Request is ${tokens} input tokens even without docs diffs (budget: ${MAX_INPUT_TOKENS}).`);
    }
    console.warn(`Request is ${tokens} input tokens - omitting the diff of ${longest.page}.`);
    longest.diff = OMITTED_DIFF;
  }
}

// ---- fallback rendering ----

// Plain list versions of the articles, used with --skip-ai to check what the
// rules selected without calling Claude. Docs changes need Claude's
// filtering, so they are left out.
function listArticles(input, reportDate) {
  const article = (topic, body) => ({ topic, headline: `${topic} ${reportDate}`, lede: "Written without Claude (--skip-ai).", body });
  const articles = [];
  if (input.incidents.length) {
    articles.push(article("incidents", input.incidents.map((i) => `- **${i.change}: ${md(i.title)}**. ${i.description}`).join("\n")));
  }
  const periods = [...input.outages.map((p) => ({ ...p, kind: "outage" })), ...input.slowdowns.map((p) => ({ ...p, kind: "slowdown" }))];
  if (input.mondayIncidents.length || periods.length) {
    articles.push(
      article(
        "platform-status",
        [
          ...input.mondayIncidents.map(
            (i) => `- [${md(i.title)}](${i.url}): ${i.status}, ${i.started} – ${i.resolved || "ongoing"}`,
          ),
          ...periods.map((p) => `- ${p.kind}: ${md(p.service)}, ${p.start} – ${p.end}: ${p.checks.map(md).join(", ")}`),
        ].join("\n"),
      ),
    );
  }
  if (input.newApps.length) {
    articles.push(
      article(
        "new-apps",
        input.newApps
          .map((a) => `- [${md(a.name)}](${a.url})${a.vendor ? ` by ${md(a.vendor)}` : ""}: ${a.shortDescription}`)
          .join("\n"),
      ),
    );
  }
  if (input.installAnomalies.length) {
    articles.push(
      article(
        "install-anomalies",
        input.installAnomalies
          .map((e) => `- [${md(e.name)}](${e.url}): ${e.weeklyInstallsBefore} → ${e.weeklyInstallsAfter} weekly installs`)
          .join("\n"),
      ),
    );
  }
  if (input.removedApps.length) {
    articles.push(article("removed-apps", input.removedApps.map((a) => `- ${md(a.name)}`).join("\n")));
  }
  return articles;
}

// ---- main ----

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const nowArg = args.find((a) => a.startsWith("--now="));
  const windowEnd = nowArg ? new Date(nowArg.slice("--now=".length)) : new Date();
  const reportDate = windowEnd.toISOString().slice(0, 10);

  const tip = commitBefore(windowEnd);
  const { base, windowStart } = previousDataUpdate(tip);
  console.log(
    `Reporting on ${windowStart.toISOString()} - ${windowEnd.toISOString()} ` +
      `(changes ${base.slice(0, 11)}..${tip.slice(0, 11)}).`,
  );

  const periods = await collectStatusPeriods(windowStart, windowEnd);
  const data = {
    windowEnd,
    newApps: collectNewApps(base, tip),
    removals: collectRemovals(base, tip),
    anomalies: collectAnomalies(base, tip),
    mondayIncidents: await collectMondayIncidents(windowStart, windowEnd),
    outages: groupPeriods(periods.filter((p) => p.status === "unhealthy")),
    slowdowns: groupPeriods(
      periods.filter((p) => p.status === "decreased_performance" && p.minutes > MIN_DEGRADED_MINUTES),
    ),
    incidents: collectIncidents(base, tip),
    docsChanges: collectDocsChanges(base, tip),
  };

  console.log(
    `Found ${data.newApps.length} new apps, ${data.removals.length} removals, ${data.anomalies.length} anomalies, ` +
      `${data.mondayIncidents.length} monday incidents, ${data.outages.length} outages, ${data.slowdowns.length} slowdowns, ${data.incidents.length} incident updates, ` +
      `${data.docsChanges.length} changed docs pages.`,
  );

  const input = articleInput(data, windowStart);
  const skipAi = args.includes("--skip-ai");
  const articlesFrom = args.find((a) => a.startsWith("--articles-from="));

  if (args.includes("--print-input")) {
    console.log(JSON.stringify({ topics: topicsWithFacts(input), input }, null, 2));
    return;
  }

  let articles = [];
  if (skipAi) {
    articles = listArticles(input, reportDate);
  } else if (articlesFrom) {
    const file = articlesFrom.slice("--articles-from=".length);
    articles = selectArticles(input, ArticlesSchema.parse(JSON.parse(fs.readFileSync(file, "utf-8"))).articles);
  } else if (topicsWithFacts(input).length) {
    articles = await writeArticles(input);
  }

  // A re-run on the same day replaces that day's articles.
  const previousFiles = fs.existsSync(REPORTS_DIR)
    ? fs.readdirSync(REPORTS_DIR).filter((file) => file.startsWith(`${reportDate}-`) && file.endsWith(".md"))
    : [];

  if (!articles.length) {
    console.log("Nothing worth reporting - no report today.");
    if (fs.existsSync(NEW_REPORT_FILE)) fs.unlinkSync(NEW_REPORT_FILE);
    return;
  }

  const files = articles.map((article) => {
    const frontMatter = [
      "---",
      `title: ${JSON.stringify(article.headline)}`,
      `date: ${reportDate}`,
      `topic: ${article.topic}`,
      `lede: ${JSON.stringify(article.lede)}`,
      "---",
    ].join("\n");
    return {
      ...article,
      file: `${reportDate}-${article.topic}.md`,
      url: `${SITE_URL}/reports/${reportDate}/${article.topic}/`,
      content: `${frontMatter}\n\n${article.body.trim()}\n`,
    };
  });

  if (dryRun) {
    for (const file of files) console.log(`\n===== ${file.file}\n${file.content}`);
    return;
  }

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  for (const file of previousFiles) fs.unlinkSync(path.join(REPORTS_DIR, file));
  for (const file of files) fs.writeFileSync(path.join(REPORTS_DIR, file.file), file.content);
  fs.writeFileSync(
    NEW_REPORT_FILE,
    JSON.stringify(
      {
        date: reportDate,
        articles: files.map(({ topic, headline, url }) => ({ topic, headline, url })),
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`Wrote ${files.length} articles: ${files.map((f) => f.file).join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
