document.addEventListener('DOMContentLoaded', function() {
    const assets = loadAssets();
    updatePortfolioSummary(assets);
    renderAssetsTable(assets); // Add this line to render the assets table
});

function updatePortfolioSummary(assets) {
    const stats = calculatePortfolioStats(assets);
    
    // Update total value with color coding
    const totalValueEl = document.getElementById('totalValue');
    totalValueEl.textContent = `$${formatNumber(stats.totalValue)}`;
    
    // Update gain/loss with color coding
    const totalGainEl = document.getElementById('totalGain');
    totalGainEl.innerHTML = `$${formatNumber(stats.totalGain)} (<span id="totalGainPercent">${formatNumber(stats.totalGainPercent)}%</span>)`;
    totalGainEl.className = `text-2xl font-bold ${getGainClass(stats.totalGain)}`;
    
    // Update gain percentage with color
    document.getElementById('totalGainPercent').className = getGainClass(stats.totalGain);
    
    // Update asset count with color coding based on performance
    const assetCountEl = document.getElementById('assetCount');
    assetCountEl.textContent = assets.length;
    assetCountEl.className = `text-2xl font-bold ${getGainClass(stats.totalGain)}`;
}

// Add this new function to render the assets table
function renderAssetsTable(assets) {
    const tableBody = document.getElementById('assetsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (assets.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    tableBody.innerHTML = '';
    
    assets.forEach(asset => {
        const value = asset.quantity * asset.currentPrice;
        const costBasis = asset.quantity * asset.buyPrice;
        const gain = value - costBasis;
        const gainPercent = (gain / costBasis) * 100;
        
        const row = document.createElement('tr');
        row.className = 'asset-row';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">${asset.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getTypeColor(asset.type)}-100 text-${getTypeColor(asset.type)}-800 capitalize">
                    ${asset.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                ${formatNumber(asset.quantity)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                $${formatNumber(asset.buyPrice)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                $${formatNumber(asset.currentPrice)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-medium">
                $${formatNumber(value)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap font-medium ${getGainClass(gain)}">
                $${formatNumber(gain)} (${formatNumber(gainPercent)}%)
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="Assets.html" class="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}  gainElement.className = `text-2xl font-bold ${getGainClass(stats.totalGain)}`;
