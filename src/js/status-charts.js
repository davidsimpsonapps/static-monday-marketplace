const HEALTHCHECKS_URL = 'https://status.getgorilla.app/api/healthchecks';
const HISTORY_URL = 'https://status.getgorilla.app/api/healthchecks/history?limit=1000';

const ENDPOINT_TYPES = [
  { suffix: 'basic', label: 'Basic Health' },
  { suffix: 'board', label: 'Board GraphQL API' },
  { suffix: 'board-items', label: 'Board Items GraphQL API' },
  { suffix: 'filtered-board-items', label: 'Filtered Board Items GraphQL API' },
  { suffix: 'secure-storage', label: 'Secure Storage' },
  { suffix: 'storage', label: 'Storage' },
];

const STATUS_CONFIG = {
  healthy: {
    label: 'Healthy',
    borderClass: 'border-green-500',
    bgClass: 'bg-green-50',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    bannerBg: 'bg-green-50',
    bannerBorder: 'border-green-200',
    bannerText: 'text-green-800',
    dot: '●',
  },
  decreased_performance: {
    label: 'Degraded',
    borderClass: 'border-yellow-500',
    bgClass: 'bg-yellow-50',
    badgeBg: 'bg-yellow-100',
    badgeText: 'text-yellow-800',
    bannerBg: 'bg-yellow-50',
    bannerBorder: 'border-yellow-200',
    bannerText: 'text-yellow-800',
    dot: '●',
  },
  unhealthy: {
    label: 'Unhealthy',
    borderClass: 'border-red-500',
    bgClass: 'bg-red-50',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    bannerBg: 'bg-red-50',
    bannerBorder: 'border-red-200',
    bannerText: 'text-red-800',
    dot: '●',
  },
};

function statusConfig(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG.healthy;
}

function formatDateTime(iso) {
  if (!iso) return '—';
  return iso.replace('T', ' ').substring(0, 16) + ' UTC';
}

// ---- Current healthchecks ----

async function loadHealthchecks() {
  if (!document.getElementById('status-banner')) return;
  try {
    const response = await fetch(HEALTHCHECKS_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const checks = (data.data || []).filter(c => c.healthcheck_id.startsWith('monday-'));
    renderBanner(checks, data.last_check_time);
    renderStatusGrid(checks);
  } catch (err) {
    console.error('Failed to load healthchecks:', err);
    document.getElementById('status-banner').innerHTML =
      '<p class="text-red-600 text-sm">Failed to load current status.</p>';
    document.getElementById('status-grid').innerHTML = '';
  }
}

function renderBanner(checks, lastCheckTime) {
  const unhealthy = checks.filter(c => c.current_status === 'unhealthy');
  const degraded = checks.filter(c => c.current_status === 'decreased_performance');

  let cfg, message;
  if (unhealthy.length > 0) {
    cfg = STATUS_CONFIG.unhealthy;
    message = `${unhealthy.length} service${unhealthy.length > 1 ? 's' : ''} currently unhealthy`;
  } else if (degraded.length > 0) {
    cfg = STATUS_CONFIG.decreased_performance;
    message = `${degraded.length} service${degraded.length > 1 ? 's' : ''} experiencing degraded performance`;
  } else {
    cfg = STATUS_CONFIG.healthy;
    message = 'All systems operational';
  }

  const checkedAt = lastCheckTime
    ? `<span class="text-xs ml-auto opacity-70">Checked: ${formatDateTime(lastCheckTime)}</span>`
    : '';

  document.getElementById('status-banner').innerHTML = `
    <div class="rounded-lg p-4 border ${cfg.bannerBg} ${cfg.bannerBorder} flex items-center gap-3">
      <span class="${cfg.bannerText} text-xl leading-none">${cfg.dot}</span>
      <span class="font-semibold ${cfg.bannerText}">${message}</span>
      ${checkedAt}
    </div>
  `;
}

function renderStatusGrid(checks) {
  if (!checks.length) {
    document.getElementById('status-grid').innerHTML =
      '<p class="text-gray-500 col-span-3 text-sm">No status data available.</p>';
    return;
  }

  const cards = checks.map(check => {
    const cfg = statusConfig(check.current_status);
    return `
      <div class="border-l-4 ${cfg.borderClass} ${cfg.bgClass} rounded-r-lg p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <div class="text-sm font-medium text-gray-900">${check.healthcheck_display_name}</div>
            <div class="text-xs text-gray-500 mt-0.5">${check.service_display_name}</div>
          </div>
          <span class="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg.badgeBg} ${cfg.badgeText}">
            ${cfg.label}
          </span>
        </div>
        <div class="text-xs text-gray-400 mt-2">Updated: ${formatDateTime(check.last_updated)}</div>
      </div>
    `;
  }).join('');

  document.getElementById('status-grid').innerHTML = cards;
}

// ---- Status history ----

async function loadHistory() {
  if (!document.getElementById('status-history')) return;
  try {
    const response = await fetch(HISTORY_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const events = (data.data || []).filter(e => e.healthcheck_id.startsWith('monday-'));
    renderHistory(events);
  } catch (err) {
    console.error('Failed to load history:', err);
    document.getElementById('status-history').innerHTML =
      '<p class="text-red-600 text-sm">Failed to load status history.</p>';
  }
}

function renderHistory(events) {
  if (!events.length) {
    document.getElementById('status-history').innerHTML =
      '<p class="text-gray-500 text-sm">No history data available.</p>';
    return;
  }

  const rows = events.map(event => {
    const prevCfg = statusConfig(event.previous_status);
    const newCfg = statusConfig(event.new_status);
    return `
      <tr class="border-b border-gray-100 hover:bg-gray-50">
        <td class="py-2 pr-4 text-xs text-gray-500 whitespace-nowrap">${formatDateTime(event.status_change_time)}</td>
        <td class="py-2 pr-4 text-sm text-gray-700">${event.service_display_name}</td>
        <td class="py-2 pr-4 text-sm text-gray-700">${event.healthcheck_display_name}</td>
        <td class="py-2 text-sm whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${prevCfg.badgeBg} ${prevCfg.badgeText}">${prevCfg.label}</span>
          <span class="mx-1 text-gray-400">→</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${newCfg.badgeBg} ${newCfg.badgeText}">${newCfg.label}</span>
        </td>
      </tr>
    `;
  }).join('');

  document.getElementById('status-history').innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b-2 border-gray-200">
            <th class="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
            <th class="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
            <th class="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check</th>
            <th class="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Change</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ---- Response time charts ----

function buildCharts(data) {
  if (!data || !data.length) return;

  const dates = data.map(d => d.date);

  ENDPOINT_TYPES.forEach(({ suffix }) => {
    const canvas = document.getElementById(`chart-${suffix}`);
    if (!canvas) return;

    const euId = `monday-infra-eu-${suffix}`;
    const usId = `monday-infra-us-${suffix}`;
    const euData = data.map(d => d.healthchecks[euId] ?? null);
    const usData = data.map(d => d.healthchecks[usId] ?? null);

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'EU',
            data: euData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
            fill: false,
          },
          {
            label: 'US',
            data: usData,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            ticks: {
              maxTicksLimit: 4,
              callback: v => `${Math.round(v).toLocaleString()}ms`,
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 8,
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${Math.round(ctx.parsed.y).toLocaleString()}ms`,
            },
          },
        },
      },
    });
  });
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', async function () {
  loadHealthchecks();
  loadHistory();

  const scriptEl = document.querySelector('[data-avg-response-times-url]');
  if (scriptEl) {
    try {
      const url = scriptEl.getAttribute('data-avg-response-times-url');
      const response = await fetch(url);
      const data = await response.json();
      buildCharts(data);
    } catch (e) {
      console.error('Failed to load avg response times data:', e);
    }
  }
});
