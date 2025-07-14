// Global chart variable
let chart = null;
let deltaCharts = [];
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
// Render the Chart.js graph for monthly install change
// Assumes: 
// `<canvas id="installsChart-${days}d"></canvas>`

function updateHeadlines(appData, days  ) {
    // Sort history by date (oldest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate 7d change (difference from 7 days prior)
    const change = sortedHistory.map((item, idx, arr) => {
        if (idx < days) return null;
        const current = parseInt(item.count);
        const prev = parseInt(arr[idx - days].count);
        return current - prev;
    });
    // Find max, min, and current (last non-null)
    let max = -Infinity, min = Infinity, maxIdx = -1, minIdx = -1, current = null, currentIdx = -1;
    for (let i = 0; i < change.length; i++) {
        if (change[i] !== null) {
            if (change[i] > max) { max = change[i]; maxIdx = i; }
            if (change[i] < min) { min = change[i]; minIdx = i; }
            current = change[i];
            currentIdx = i;
        }
    }
    // Update DOM
    const container = document.getElementById(`headlines-${days}d`);
    if (container) {
        const set = (cls, val) => {
            const el = container.querySelector(cls);
            if (el) el.textContent = val;
        };
        const setTitle = (cls, val) => {
            const el = container.querySelector(cls);
            if (el) el.setAttribute("title", val);
        };
        const addClass = (cls, val) => {
            const el = container.querySelector(cls);
            if (el) el.classList.add(val);
        };
        set('.headline-max', max === -Infinity ? '-' : max.toLocaleString());
        setTitle('.headline-max-date', maxIdx !== -1 ? sortedHistory[maxIdx].date : '-');
        set('.headline-min', min === Infinity ? '-' : min.toLocaleString());

        const minDelta = (100* ((min-max)/max)).toFixed(1) ;
        set('.headline-min-delta', min === Infinity ? '-' : minDelta + '%');
        addClass('.headline-min-delta', minDelta >= 0 ?'text-green-600' : 'text-red-600')

        setTitle('.headline-min-date', minIdx !== -1 ? sortedHistory[minIdx].date : '-');
        set('.headline-current', current === null ? '-' : current.toLocaleString());

        const currentDelta = (100* ((current-max)/max)).toFixed(1) ;
        set('.headline-current-delta', current === null ? '-' : currentDelta + '%');
        setTitle('.headline-current-date', currentIdx !== -1 ? sortedHistory[currentIdx].date : '-');
        addClass('.headline-current-delta', currentDelta >= 0 ?  'text-green-600' : 'text-red-600');
    }
    tooltips && tooltips();
}

function renderChartByDeltaInDays(appData, days) {
    const node = document.getElementById(`installsChart-${days}d`);
    if (!node) {
        return 
    }
    const ctx = node.getContext('2d');
    // Sort history by date (oldest first)
    const sortedHistory = [...appData.history].sort((a, b) => new Date(a.date) - new Date(b.date));
    // Calculate monthly change (difference from 30 days prior)
    const change = sortedHistory.map((item, idx, arr) => {
        if (idx < days) return null; // Not enough data for first 30 days
        const current = parseInt(item.count);
        const prev = parseInt(arr[idx - days].count);
        return current - prev;
    });
    const labels = sortedHistory.map(item => item.date);

    if (deltaCharts[`${days}d`]) {
        deltaCharts[`${days}d`].destroy();
    }
    deltaCharts[`${days}d`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${days} day Δ in installs`,
                data: change,
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
    
    updateHeadlines(appData, days);
    
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
                [7,30,90].forEach(days => renderChartByDeltaInDays(data,days))      
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
