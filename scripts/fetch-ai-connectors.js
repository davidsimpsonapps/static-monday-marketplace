#!/usr/bin/env node

/**
 * Fetches daily AI Connector install counts from the monday.com bigbrain API
 * and appends them to per-app history files in:
 *   src/_data/json/installs/ai-connectors/{marketplaceId}.json
 *
 * Run manually:  node scripts/fetch-ai-connectors.js
 * Or via npm:    npm run fetch:ai-connectors
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_URL =
  'https://monday.com/bigbrain-data-api/feature/dynamic/external/public/cross-tenant' +
  '?featureName=marketplace_ai_connectors_usage&version=&startTime=&endTime=' +
  '&filters=%7B%22identifier%22%3A%2210%22%7D&metrics=%5B%5D';

// Maps internal app_id (API response key) → marketplace metadata
const AI_CONNECTORS = {
  '10401658': { marketplaceId: 10000806, name: 'monday mcp' },
  '10913702': { marketplaceId: 10001076, name: 'Microsoft 365 Copilot' },
  '10924490': { marketplaceId: 10001080, name: 'ChatGPT' },
  '10924498': { marketplaceId: 10001081, name: 'Claude' },
  '10924537': { marketplaceId: 10001082, name: 'Cursor' },
  '10929474': { marketplaceId: 10001083, name: 'Gemini CLI' },
  '10929596': { marketplaceId: 10001084, name: 'Figma Make' },
  '10929609': { marketplaceId: 10001085, name: 'Le Chat' },
  '11094326': { marketplaceId: 10001133, name: 'Perplexity' },
};

const DATA_DIR = path.join(__dirname, '../src/_data/json/installs/ai-connectors');

async function main() {
  console.log('Fetching AI connector data…');
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API returned ${res.status}`);

  const json = await res.json();
  const entry = json.data?.[0];
  if (!entry) throw new Error('Unexpected API response shape');

  const date = new Date().toISOString().slice(0, 10);
  const counts = entry.data;

  console.log(`Data date: ${date}`);
  console.log(`Apps in response: ${Object.keys(counts).join(', ')}`);

  for (const [appIdStr, count] of Object.entries(counts)) {
    const meta = AI_CONNECTORS[appIdStr];
    if (!meta) {
      console.warn(`  Unknown app_id ${appIdStr} — skipping`);
      continue;
    }

    const filePath = path.join(DATA_DIR, `${meta.marketplaceId}.json`);
    let doc;

    if (fs.existsSync(filePath)) {
      doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      doc = { appId: meta.marketplaceId, name: meta.name, history: [] };
    }

    // Replace or append the entry for this date
    const idx = doc.history.findIndex(h => h.date === date);
    const newEntry = { date, count: String(count) };
    if (idx >= 0) {
      doc.history[idx] = newEntry;
      console.log(`  ${meta.name}: updated ${date} → ${count}`);
    } else {
      doc.history.push(newEntry);
      console.log(`  ${meta.name}: appended ${date} → ${count}`);
    }

    fs.writeFileSync(filePath, JSON.stringify(doc, null, 2));
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
