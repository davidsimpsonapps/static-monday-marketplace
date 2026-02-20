const fetch = require('node-fetch');
const { mkdir, writeFile } = require('fs/promises');
const { join } = require('path');

const HEALTHCHECK_IDS = [
  'monday-infra-eu-basic',
  'monday-infra-eu-board',
  'monday-infra-eu-board-items',
  'monday-infra-eu-filtered-board-items',
  'monday-infra-eu-secure-storage',
  'monday-infra-eu-storage',
  'monday-infra-us-basic',
  'monday-infra-us-board',
  'monday-infra-us-board-items',
  'monday-infra-us-filtered-board-items',
  'monday-infra-us-secure-storage',
  'monday-infra-us-storage',
];

const OUTPUT_DIR = join(__dirname, 'json/status');
const OUTPUT_FILE = join(OUTPUT_DIR, 'avg-response-times.json');

module.exports = async function () {
  try {
    const url = `https://status.getgorilla.app/api/avg-response-times?healthcheck_ids=${HEALTHCHECK_IDS.join(',')}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const result = data.data || [];

    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(OUTPUT_FILE, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error('Error fetching avg response times:', error);
    return [];
  }
};
