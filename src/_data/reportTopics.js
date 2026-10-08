// Topics of the daily reports (/daily/). scripts/build-daily-report.js tags
// each report with the topics it covers, and every topic gets a filter page at
// /daily/<slug>/. `dot` is the Tailwind class of the topic's colour marker.
module.exports = [
  { slug: "developer-docs", label: "Developer docs", dot: "bg-indigo-500" },
  { slug: "community", label: "Community", dot: "bg-sky-500" },
  { slug: "incidents", label: "Incidents", dot: "bg-orange-500" },
  { slug: "platform-status", label: "Platform status", dot: "bg-red-500" },
  { slug: "new-apps", label: "New apps", dot: "bg-emerald-500" },
  { slug: "install-anomalies", label: "Install anomalies", dot: "bg-amber-500" },
  { slug: "removed-apps", label: "Removed apps", dot: "bg-gray-400" },
];
