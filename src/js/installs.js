// Global chart variable
let chart = null;

// Load data for a specific app
async function loadAppData(appId) {
    try {
        const response = await fetch(`/_data/json/installs/apps/${appId}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load data for app ${appId}:`, error);
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
            pointRadius: 4
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
            scales: {
                y: {
                    // beginAtZero: true,
                    title: {
                        display: true,
                        text: 'No. of installs'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
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
                }
            }
        }
    });
}

// Initialize the chart
async function initChart() {
    const appId = document.querySelector('[data-app-id]').getAttribute('data-app-id');
    const data = await loadAppData(appId);
    
    console.log('installs.js', {appId, data});
    
    if (data) {
        renderChart(data);
    }
}

// Start initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChart);
