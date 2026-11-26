// Adds a red count to the "Service status" tab on the status pages when one or
// more monday.com healthchecks are unhealthy. Uses the same checks as the
// banner on /status/ (healthcheck ids starting with "monday-").
(async function () {
  const tab = document.querySelector('.tabs a[href="/status/"]');
  if (!tab) return;
  try {
    const response = await fetch("https://status.getgorilla.app/api/healthchecks");
    if (!response.ok) return;
    const data = await response.json();
    const unhealthy = (data.data || []).filter(
      (c) => c.healthcheck_id.startsWith("monday-") && c.current_status === "unhealthy",
    ).length;
    if (!unhealthy) return;
    const badge = document.createElement("span");
    badge.className =
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800";
    badge.title = `${unhealthy} service${unhealthy > 1 ? "s" : ""} currently unhealthy`;
    badge.textContent = unhealthy;
    tab.append(" ", badge);
  } catch (err) {
    console.error("Failed to load healthchecks for the status tab:", err);
  }
})();
