// Global chart variable
let chart = null;
let weeklyChart = null;
let monthlyChart = null;

// Load data for a specific app
async function loadAppData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load data for url ${url}:`, error);
        const node = document.querySelector('.chart-container');
        node.innerText = 'No data found.';
        return null;
    }
}

// Render the Chart.js graph
function renderChart(appData) {
    const ctx = document.getElementById('installChart').getContext('2d');
    
    // Sort history by date (newest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Prepare chart data
    const chartData = {
        labels: sortedHistory.map(item => item.date),
        datasets: [{
            label: `No. of installs`,
            data: sortedHistory.map(item => parseInt(item.count)),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
        }]
    };
    
    // Destroy previous chart if exists
    if (chart) chart.destroy();
    
    // Create new chart
    chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    // beginAtZero: true,
                    title: {
                        display: true,
                        text: 'No. of installs'
                    },
                    ticks: {
                        maxTicksLimit: 4,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                },
                crosshair: {
                    line: {
                        color: '#666',
                        width: 1,
                        dashPattern: [5, 5]
                    },
                    sync: {
                        enabled: true
                    },
                    zoom: {
                        enabled: false
                    }
                }
            }
        }
    });
}

// Render the Chart.js graph for weekly install change
function renderWeeklyChart(appData) {
    const ctx = document.getElementById('weeklyInstallChart').getContext('2d');
    // Sort history by date (oldest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    // Calculate weekly change
    const weeklyChange = sortedHistory.map((item, idx, arr) => {
        if (idx < 7) return null; // Not enough data for first 7 days
        const current = parseInt(item.count);
        const prev = parseInt(arr[idx - 7].count);
        return current - prev;
    });
    // Only show weekly change where we have data
    const labels = sortedHistory.map(item => item.date);
    // Destroy previous chart if exists
    if (weeklyChart) weeklyChart.destroy();
    weeklyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weekly installs Δ',
                data: weeklyChange,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Weekly installs Δ'
                    },
                    ticks: {
                        maxTicksLimit: 4,
                        callback: function(value) {
                            return value == null ? '' : value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.parsed.y == null) return 'Not enough data';
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                },
                crosshair: {
                    line: {
                        color: '#666',
                        width: 1,
                        dashPattern: [5, 5]
                    },
                    sync: {
                        enabled: true
                    },
                    zoom: {
                        enabled: false
                    }
                }
            }
        }
    });
}

// Render the Chart.js graph for monthly install change
function renderMonthlyChart(appData) {
    const ctx = document.getElementById('monthlyInstallChart').getContext('2d');
    // Sort history by date (oldest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    // Calculate monthly change (difference from 30 days prior)
    const monthlyChange = sortedHistory.map((item, idx, arr) => {
        if (idx < 30) return null; // Not enough data for first 30 days
        const current = parseInt(item.count);
        const prev = parseInt(arr[idx - 30].count);
        return current - prev;
    });
    const labels = sortedHistory.map(item => item.date);
    if (monthlyChart) monthlyChart.destroy();
    monthlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly installs Δ',
                data: monthlyChange,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Monthly installs Δ'
                    },
                    ticks: {
                        maxTicksLimit: 4,
                        callback: function(value) {
                            return value == null ? '' : value.toLocaleString();
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.parsed.y == null) return 'Not enough data';
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                },
                crosshair: {
                    line: {
                        color: '#666',
                        width: 1,
                        dashPattern: [5, 5]
                    },
                    sync: {
                        enabled: true
                    },
                    zoom: {
                        enabled: false
                    }
                }
            }
        }
    });
}

// Initialize the charts
async function initChart() {
    const url = document.querySelector('[data-url]').getAttribute('data-url');
    const data = await loadAppData(url);
    // console.log('installs.js', { url, data });
    
    if (data) {
        renderChart(data);
        if (document.getElementById('weeklyInstallChart')) {
            renderWeeklyChart(data);
        }
        if (document.getElementById('monthlyInstallChart')) {
            renderMonthlyChart(data);
        }
    }
}

// Start initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChart);
