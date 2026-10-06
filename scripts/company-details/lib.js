// Shared helpers for maintaining vendor-details.json and partner-details.json.
// See VENDOR_DETAILS.md for the process these scripts support.

const fs = require("fs");
const path = require("path");
const countryjs = require("countryjs");

const ROOT = path.join(__dirname, "..", "..");
const VENDOR_DETAILS = path.join(ROOT, "vendor-details.json");
const PARTNER_DETAILS = path.join(ROOT, "partner-details.json");
const CACHE_DIR = path.join(ROOT, ".cache", "company-details");

const VENDORS_API =
  "https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true";
const PARTNERS_API =
  "https://monday.com/gotopartners/api/partners?sortOrder=DESC&limit=10000000";

const SOURCE_TYPES = [
  "website",
  "imprint",
  "legal",
  "about",
  "contact",
  "linkedin",
  "companies-house",
  "business-register",
  "duns",
  "vat",
  "opencorporates",
  "crunchbase",
  "directory",
  "marketplace",
  "press",
  "whois",
  "other",
];

const SOURCE_TYPE_LABELS = {
  website: "Website",
  imprint: "Imprint",
  legal: "Legal / privacy",
  about: "About",
  contact: "Contact",
  linkedin: "LinkedIn",
  "companies-house": "Companies House",
  "business-register": "Business register",
  duns: "D-U-N-S",
  vat: "VAT",
  opencorporates: "OpenCorporates",
  crunchbase: "Crunchbase",
  directory: "Directory",
  marketplace: "Marketplace listing",
  press: "Press",
  whois: "WHOIS",
  other: "Other",
};

const LOCATION_FLAGS = [
  "offshore-moved",
  "possible-offshore",
  "registered-agent",
];

// Addresses that belong to registered-agent / virtual-office / mailbox
// services rather than to the company itself.
const REGISTERED_AGENT_PATTERNS = [
  /30 N Gould St/i, // Sheridan, WY
  /2810 N Church St/i, // Wilmington, DE
  /1007 N Orange St/i, // Wilmington, DE
  /8 The (Green|GRN)/i, // Dover, DE
  /\b(600|651) N Broad St/i, // Middletown, DE
  /2035 Sunset Lake Road/i, // Newark, DE
  /2105 Vista Oeste/i, // Albuquerque, NM
  /128 City Road/i, // London EC1V
  /\bPMB\b/i,
  /#\s?\d{4,}/,
  /\bSTE\.? \d{5,}/i,
];

const DIRECTORY_HOSTS = [
  "clay.com",
  "cbinsights.com",
  "getlatka.com",
  "craft.co",
  "thecompanycheck.com",
  "startupim.com",
  "wikitia.com",
  "g2.com",
  "trustradius.com",
  "capterra.com",
  "dealroom.co",
  "pitchbook.com",
  "lablab.ai",
  "bitscale.ai",
  "zoominfo.com",
  "rocketreach.co",
];
const PRESS_HOSTS = [
  "techcrunch.com",
  "yourstory.com",
  "entrepreneur.com",
  "cleveland19.com",
  "lejournaldesentreprises.com",
  "inc42.com",
  "businesswire.com",
  "prnewswire.com",
  "calcalistech.com",
  "globes.co.il",
];
const REGISTER_HOSTS = [
  "ariregister.rik.ee",
  "rejestr.io",
  "kvk.nl",
  "abr.business.gov.au",
  "opencorporates.com",
  "northdata.com",
  "handelsregister.de",
  "infogreffe.fr",
  "pappers.fr",
  "registroimprese.it",
  "kbopub.economie.fgov.be",
];

function hostOf(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Registrable domain (good enough for matching): last two labels, or three
// for common second-level ccTLDs like .co.uk / .com.au.
function domainOf(url) {
  const host = hostOf(url.includes("://") ? url : `https://${url}`);
  const parts = host.split(".");
  const sld = parts.slice(-2).join(".");
  return /^(co|com|org|net|ac|gov)\.[a-z]{2}$/.test(sld)
    ? parts.slice(-3).join(".")
    : sld;
}

function hostMatches(host, list) {
  return list.some((h) => host === h || host.endsWith(`.${h}`));
}

// Turn a URL into a typed source object.
function classifySource(url) {
  const host = hostOf(url);
  let p = "";
  try {
    p = new URL(url).pathname.toLowerCase();
  } catch {
    /* ignore */
  }
  const source = { type: "other", url };
  if (host.endsWith("linkedin.com")) source.type = "linkedin";
  else if (host === "find-and-update.company-information.service.gov.uk") {
    source.type = "companies-house";
    const m = p.match(/\/company\/([0-9a-z]{8})/i);
    if (m) source.id = m[1].toUpperCase();
  } else if (host.endsWith("dnb.com")) source.type = "duns";
  else if (host.endsWith("opencorporates.com")) source.type = "opencorporates";
  else if (host.endsWith("crunchbase.com")) source.type = "crunchbase";
  else if (hostMatches(host, REGISTER_HOSTS)) {
    source.type = "business-register";
    const m = p.match(/\/(?:company|krs)\/(\d{6,})/);
    if (m) source.id = m[1];
  } else if (
    host === "marketplace.atlassian.com" ||
    host === "apps.shopify.com" ||
    host === "learn.microsoft.com" ||
    (host === "monday.com" && p.includes("marketplace"))
  )
    source.type = "marketplace";
  else if (hostMatches(host, DIRECTORY_HOSTS)) source.type = "directory";
  else if (hostMatches(host, PRESS_HOSTS) || p.includes("/news") || p.includes("/press"))
    source.type = "press";
  else if (/imprint|impressum|legal-notice|mentions-legales|rechtliches/.test(p))
    source.type = "imprint";
  else if (/privacy|terms|legal|eula|tos|dpa|gizlilik|conditions/.test(p))
    source.type = "legal";
  else if (/contact|kontakt/.test(p)) source.type = "contact";
  else if (/about|team|company|who-we-are|our-story|leadership|officials/.test(p))
    source.type = "about";
  else source.type = "website";
  return source;
}

// ISO 3166-1 alpha-2 check. countryjs (used by the site) lacks a few codes
// such as RS and ME, so fall back to the runtime's own region names.
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
function isValidCountryCode(code) {
  if (typeof code !== "string" || !/^[A-Z]{2}$/.test(code)) return false;
  if (countryjs.name(code)) return true;
  try {
    return regionNames.of(code) !== code;
  } catch {
    return false;
  }
}

// Normalise a company name for fuzzy matching.
function normName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(
      /\b(ltd|limited|llc|l\.l\.c|inc|incorporated|corp|corporation|gmbh|ag|bv|b\.v|nv|oü|ou|ab|as|sp\.? z o\.?o\.?|s\.r\.l|srl|s\.r\.o|pty|pvt|private|llp|the|group|apps?|software|solutions|technologies|technology|consulting|digital|co)\b/g,
      " ",
    )
    .replace(/[^a-z0-9]/g, "");
}

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// IDs from src/_data/data-filters.js vendorBlockList (test/internal accounts).
function blockedVendorIds() {
  const src = fs.readFileSync(path.join(ROOT, "src", "_data", "data-filters.js"), "utf-8");
  return new Set([...src.matchAll(/^\s*(\d+),/gm)].map((m) => Number(m[1])));
}

module.exports = {
  ROOT,
  VENDOR_DETAILS,
  PARTNER_DETAILS,
  CACHE_DIR,
  VENDORS_API,
  PARTNERS_API,
  SOURCE_TYPES,
  SOURCE_TYPE_LABELS,
  LOCATION_FLAGS,
  REGISTERED_AGENT_PATTERNS,
  hostOf,
  domainOf,
  classifySource,
  isValidCountryCode,
  normName,
  readJSON,
  writeJSON,
  fetchJSON,
  blockedVendorIds,
};
