#!/usr/bin/env node
// Registrant country/state/organisation from WHOIS, as a last-resort hint for
// a company's country. Ignores privacy/proxy services whose own address shows
// up as the "registrant" (e.g. Domains By Proxy in Tempe, Arizona).
// Needs the system `whois` command.
//
//   node scripts/company-details/whois.js example.com another.io

const { execFileSync } = require("child_process");
const L = require("./lib");

const PRIVACY = /redacted|privacy|proxy|withheld|domains by|not disclosed|data protected|gdpr masked|contact privacy|whoisguard|identity protect/i;
const PRIVACY_PLACES = [/Tempe/i, /Lewes/i, /Reykjavik/i, /Kirkland/i, /Scottsdale/i, /Panama/i];

for (const arg of process.argv.slice(2)) {
  const domain = L.domainOf(arg);
  let out = "";
  try {
    out = execFileSync("whois", [domain], { timeout: 20000, encoding: "utf-8" });
  } catch (e) {
    out = e.stdout || "";
  }
  const fields = {};
  for (const line of out.split("\n")) {
    const m = line.match(/^\s*(Registrant (?:Organization|Country|State\/Province|City)|org-name|country)\s*:\s*(.+)$/i);
    if (m && !PRIVACY.test(m[2]) && !fields[m[1]]) fields[m[1]] = m[2].trim();
  }
  const where = Object.values(fields).join(" ");
  const privacyPlace = PRIVACY_PLACES.some((re) => re.test(where));
  console.log(
    `${domain} | ${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("; ") || "nothing public"}${privacyPlace ? "  (looks like a privacy service; ignore)" : ""}`,
  );
}
