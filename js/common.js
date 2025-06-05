// Shared functionality between pages
const STORAGE_KEY = 'portfolioAssets';

// Format number with 2-6 decimal places
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(num);
}

// Get color class based on gain
function getGainClass(gain) {
    if (gain > 0) return 'text-green-600';
    if (gain < 0) return 'text-red-600';
    return 'text-gray-600';
}

// Get color for asset type badge
function getTypeColor(type) {
    const colors = {
        stock: 'blue',
        crypto: 'purple',
        other: 'gray'
    };
    return colors[type] || 'gray';
}

// Calculate portfolio statistics
function calculatePortfolioStats(assets) {
    const totalValue = assets.reduce((sum, asset) => sum + (asset.quantity * asset.currentPrice), 0);
    const totalCost = assets.reduce((sum, asset) => sum + (asset.quantity * asset.buyPrice), 0);
    const totalGain = totalValue - totalCost;
    const totalGainPercent = totalCost !== 0 ? (totalGain / totalCost) * 100 : 0;
    
    return {
        totalValue,
        totalCost,
        totalGain,
        totalGainPercent
    };
}

// Save assets to local storage
function saveAssets(assets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
}

// Load assets from local storage
function loadAssets() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}