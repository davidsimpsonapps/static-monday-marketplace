#!/usr/bin/env node

/**
 * Crawls the monday.com developer docs (https://developer.monday.com) and
 * stores every page as Markdown in:
 *   developer-docs/{path}.md
 *
 * The docs are hosted on ReadMe, which serves a Markdown version of each page
 * when ".md" is appended to its URL. Page URLs come from the sitemap.
 * Changelog entries (/api-reference/changelog/*) are skipped, since we only
 * track the docs themselves.
 *
 * Files for pages that disappeared from the sitemap are deleted, so the git
 * history of developer-docs/ reflects added, changed and removed pages.
 *
 * The folder lives outside src/ on purpose: Eleventy renders .md files under
 * src/ as pages, and the docs contain syntax that Nunjucks would choke on.
 *
 * Run manually:  node scripts/crawl-developer-docs.js
 * Or via npm:    npm run crawl:developer-docs
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://developer.monday.com';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const OUT_DIR = path.join(__dirname, '../developer-docs');

// Changelog entries (/api-reference/changelog/*, /apps/changelog/*)
const EXCLUDE = [/^\/[^/]+\/changelog(\/|$)/];

// The site rate-limits bursts (HTTP 429), so crawl slowly: ~600 pages take a
// few minutes, which is fine for a daily job.
const CONCURRENCY = 2;
const DELAY_MS = 300;
const RETRIES = 5;
const TIMEOUT_MS = 30000;
const MAX_RATE_LIMIT_WAIT_MS = 120000;

// Abort (and skip deleting stale files) if too many pages fail, so a partial
// outage doesn't show up as mass deletions in the git history.
const MAX_FAILURE_RATE = 0.05;

const USER_AGENT =
  'static-monday-marketplace docs crawler (+https://github.com/davidsimpsonapps/static-monday-marketplace)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class NotFoundError extends Error {}

// How long to wait after a 429, from Retry-After (seconds) or
// X-RateLimit-Reset (unix timestamp), falling back to 30s.
function rateLimitWaitMs(res) {
  const retryAfter = Number(res.headers.get('retry-after'));
  const reset = Number(res.headers.get('x-ratelimit-reset'));
  let ms = 30000;
  if (retryAfter > 0) ms = retryAfter * 1000;
  else if (reset > 0) ms = reset * 1000 - Date.now() + 1000;
  return Math.min(Math.max(ms, 1000), MAX_RATE_LIMIT_WAIT_MS);
}

async function fetchText(url) {
  let lastError;
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.status === 404) throw new NotFoundError('HTTP 404');
      if (res.status === 429) {
        lastError = new Error('HTTP 429');
        await sleep(rateLimitWaitMs(res));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type') || '';
      return { text: await res.text(), contentType };
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      lastError = err;
      if (attempt < RETRIES) await sleep(1000 * 2 ** attempt);
    }
  }
  throw lastError;
}

async function getPagePaths() {
  const { text } = await fetchText(SITEMAP_URL);
  const paths = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname.replace(/\/+$/, '') || '/')
    .filter((p) => !EXCLUDE.some((re) => re.test(p)));
  return [...new Set(paths)].sort();
}

// "/" → "index.md", "/apps/docs/intro" → "apps/docs/intro.md"
function toFilePath(pagePath) {
  return pagePath === '/' ? 'index.md' : `${pagePath.slice(1)}.md`;
}

async function crawlPage(pagePath) {
  const url = pagePath === '/' ? `${BASE_URL}/.md` : `${BASE_URL}${pagePath}.md`;
  const { text, contentType } = await fetchText(url);
  if (/text\/html/.test(contentType) || /^\s*<!doctype html/i.test(text)) {
    throw new Error(`Expected Markdown, got ${contentType}`);
  }
  return text.replace(/\s*$/, '\n');
}

function listMarkdownFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdownFiles(full, base);
    return entry.name.endsWith('.md') ? [path.relative(base, full)] : [];
  });
}

function removeEmptyDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyDirs(path.join(dir, entry.name));
  }
  if (dir !== OUT_DIR && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

async function main() {
  console.log(`Fetching sitemap ${SITEMAP_URL}…`);
  const pagePaths = await getPagePaths();
  console.log(`Found ${pagePaths.length} pages`);

  const written = new Set();
  const failed = [];
  let added = 0;
  let changed = 0;
  let notFound = 0;

  const queue = [...pagePaths];
  async function worker() {
    while (queue.length) {
      const pagePath = queue.shift();
      const relFile = toFilePath(pagePath);
      const outFile = path.join(OUT_DIR, relFile);
      try {
        const markdown = await crawlPage(pagePath);
        const previous = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : null;
        if (previous !== markdown) {
          fs.mkdirSync(path.dirname(outFile), { recursive: true });
          fs.writeFileSync(outFile, markdown);
          if (previous === null) added++;
          else changed++;
        }
        written.add(relFile);
      } catch (err) {
        if (err instanceof NotFoundError) {
          // Listed in the sitemap but gone; treat it like a removed page.
          console.warn(`  Not found ${pagePath} (stale sitemap entry)`);
          notFound++;
          continue;
        }
        console.warn(`  Failed ${pagePath}: ${err.message}`);
        failed.push(pagePath);
      } finally {
        await sleep(DELAY_MS);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  if (failed.length / pagePaths.length > MAX_FAILURE_RATE) {
    throw new Error(`${failed.length}/${pagePaths.length} pages failed — not removing stale files`);
  }

  // Keep files of pages that failed this run; only remove pages that are gone
  // from the sitemap.
  const keep = new Set([...written, ...failed.map(toFilePath)]);
  let removed = 0;
  for (const relFile of listMarkdownFiles(OUT_DIR)) {
    if (!keep.has(relFile)) {
      fs.unlinkSync(path.join(OUT_DIR, relFile));
      removed++;
    }
  }
  removeEmptyDirs(OUT_DIR);

  console.log(
    `Done: ${added} added, ${changed} changed, ${removed} removed, ` +
      `${written.size - added - changed} unchanged, ${notFound} not found, ${failed.length} failed`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
