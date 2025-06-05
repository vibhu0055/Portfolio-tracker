document.addEventListener('DOMContentLoaded', function() {
    const assets = loadAssets();
    renderAssets(assets);
    
    // Form submission
    document.getElementById('assetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const assetId = document.getElementById('editId').value;
        const assetData = {
            id: assetId || Date.now().toString(),
            name: document.getElementById('assetName').value,
            type: document.getElementById('assetType').value,
            quantity: parseFloat(document.getElementById('assetQuantity').value),
            buyPrice: parseFloat(document.getElementById('buyPrice').value),
            currentPrice: parseFloat(document.getElementById('currentPrice').value)
        };
        
        let updatedAssets;
        if (assetId) {
            // Update existing asset
            updatedAssets = assets.map(a => a.id === assetId ? assetData : a);
        } else {
            // Add new asset
            updatedAssets = [...assets, assetData];
        }
        
        saveAssets(updatedAssets);
        resetForm();
        renderAssets(updatedAssets);
    });
});

function renderAssets(assets) {
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
                <button onclick="editAsset('${asset.id}')" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button onclick="deleteAsset('${asset.id}')" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function resetForm() {
    document.getElementById('assetForm').reset();
    document.getElementById('editId').value = '';
}

// Global functions for button actions
window.editAsset = function(id) {
    const assets = loadAssets();
    const asset = assets.find(a => a.id === id);
    
    if (asset) {
        document.getElementById('assetName').value = asset.name;
        document.getElementById('assetType').value = asset.type;
        document.getElementById('assetQuantity').value = asset.quantity;
        document.getElementById('buyPrice').value = asset.buyPrice;
        document.getElementById('currentPrice').value = asset.currentPrice;
        document.getElementById('editId').value = asset.id;
        
        // Scroll to form
        document.getElementById('assetForm').scrollIntoView({ behavior: 'smooth' });
    }
};

window.deleteAsset = function(id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        const assets = loadAssets();
        const updatedAssets = assets.filter(a => a.id !== id);
        saveAssets(updatedAssets);
        renderAssets(updatedAssets);
    }
};