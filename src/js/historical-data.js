// Global chart variable
let chart = null;
let weeklyChart = null;
let monthlyChart = null;
let ratingsRatingChart = null;
let ratingsCountChart = null;
let categoryCharts = [];
let trendingChart = null;



const defaultScales = {
    y: {
        // beginAtZero: true,
        title: {
            display: false,
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
            display: false,
        },
        ticks: {
            maxTicksLimit: 6,
            maxRotation: 45,
            minRotation: 45
        }
    }
};

const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: 'index'
    },
    scales: defaultScales,
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

// Load data for a specific app
async function loadAppData(url, selector) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load data for url ${url}:`, error);
        const node = document.querySelector(selector);
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
        options: defaultOptions
    });
}

// Render the Chart.js graph for weekly install change
function renderWeeklyChart(appData) {
    const node = document.getElementById('weeklyInstallChart');
    if (!node) {
        return
    }
    const ctx = node.getContext('2d');
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
        options: defaultOptions
    });
}

// Render the Chart.js graph for monthly install change
function renderMonthlyChart(appData) {
    const node = document.getElementById('monthlyInstallChart');
    if (!node) {
        return 
    }
    const ctx = node.getContext('2d');
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
        options: defaultOptions
    });
}

function renderRatingsChart(ratingsData) {
    // Only proceed if ratingsData is valid and has a history array
    if (ratingsData && Array.isArray(ratingsData.history)) {
        // Sort history by date ascending
        const sortedRatings = [...ratingsData.history].sort((a, b) => new Date(a.date) - new Date(b.date));

        // Prepare data for average rating chart
        const ratingLabels = sortedRatings.map(item => item.date);
        const ratingAverages = sortedRatings.map(item => item.rating ? parseFloat(item.rating) : null);
        
        // Prepare data for ratings count chart
        const ratingCounts = sortedRatings.map(item => item.count ? parseInt(item.count) : 0);

        // Render ratings average chart
        const ratingChartCtx = document.getElementById('ratingsRatingChart').getContext('2d');

        if (ratingsRatingChart) ratingsRatingChart.destroy();    
        const ratingsOptions = { ...defaultOptions };

        // ratingsOptions.scales.y.min = 1;
        // ratingsOptions.scales.y.max = 5;
        // ratingsOptions.scales.y.ticks.maxTicksLimit = 5
        
        // Create new chart
        ratingsRatingChart = new Chart(ratingChartCtx, {
            type: 'line',
            data: {
                labels: ratingLabels,
                datasets: [{
                    label: 'Average rating',
                    data: ratingAverages,
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgba(255, 205, 86, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: ratingsOptions
        });

        // Render ratings count chart
        const countChartCtx = document.getElementById('ratingsCountChart').getContext('2d');
        if (ratingsCountChart) ratingsCountChart.destroy();
    
        // Create new chart
        ratingsCountChart = new Chart(countChartCtx, {
            type: 'line',
            data: {
                labels: ratingLabels,
                datasets: [{
                    label: 'Number of ratings',
                    data: ratingCounts,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: defaultOptions
        });
    }
}

function renderCategoriesCharts(categoriesData) {
    const categories = [
        1, // Featured
        14, // Editor's choice
    ]

    categories.forEach((c) => {
        const history = categoriesData.history.map(i => {
            return {
                date: i.date,
                count: i.marketplace_category_ids.includes(c) ? 1 : 0
            }
        })

        const sortedData = history.sort((a, b) => new Date(a.date) - new Date(b.date));


        // console.log(`Category ${c} `, sortedData);

        let categoryChart = categoryCharts[c] ?? null;
        if (categoryChart) categoryChart.destroy();

        const node = document.querySelector(`canvas[data-category-id="${c}"]`);
        // console.log(node);
        if (!node) {
            return
        }

        const chartCtx = node.getContext('2d');
        const labels = sortedData.map(item => item.date)
        const data = sortedData.map(item => item.count ? parseInt(item.count) : 0)

        const options = { ...defaultOptions };

        options.scales.y.min = 0;
        options.scales.y.max = 1;
        options.scales.y.ticks.maxTicksLimit = 2
        
        // Create new chart
        categoryChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Is app in this category?',
                    data,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: options
        });
    });
}



// Render the Chart.js graph
function renderTrendingChart(appData) {
    const ctx = document.getElementById('trendingChart').getContext('2d');
    
    // Sort history by date (newest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Prepare chart data
    const chartData = {
        labels: sortedHistory.map(item => item.date),
        datasets: [{
            label: `Is "Trending this week"?`,
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
    if (trendingChart) trendingChart.destroy();
    
    // Create new chart
    trendingChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: defaultOptions
    });
}


// Initialize the charts
async function initChart() {

    const installsUrlNode = document.querySelector('[data-installs-url]');
    if (installsUrlNode) {
        const installsUrl = installsUrlNode.getAttribute('data-installs-url');
        if (installsUrl) {
            const data = await loadAppData(installsUrl, '.chart-container:first');            
            if (data) {
                renderChart(data);
                renderWeeklyChart(data);
                renderMonthlyChart(data);            
            }
        }
    }

    const ratingsUrlNode = document.querySelector('[data-ratings-url]');
    if(ratingsUrlNode){
        const ratingsUrl = ratingsUrlNode.getAttribute('data-ratings-url');
        if (ratingsUrl) {
            const ratingsData = await loadAppData(ratingsUrl, '#ratings-body');
            ratingsData && renderRatingsChart(ratingsData);
        }
    }

    const categoriesUrlNode = document.querySelector('[data-categories-url]');
    if (categoriesUrlNode) {
        const categoriesUrl = categoriesUrlNode.getAttribute('data-categories-url');
        if (categoriesUrl) {
            const categoriesData = await loadAppData(categoriesUrl, '#categories-body');
            categoriesData && renderCategoriesCharts(categoriesData);
        }
    }
    const trendingUrlNode =  document.querySelector('[data-trending-url]');
    if (trendingUrlNode) {
        const trendingUrl = trendingUrlNode.getAttribute('data-trending-url');
        if (trendingUrl) {
            const trendingData = await loadAppData(trendingUrl, '#trending-body');
            trendingData && renderTrendingChart(trendingData); // #trendingCountChart
        }
    }
}

// Start initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChart);
