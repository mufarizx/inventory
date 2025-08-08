// Global Variables
let products = [];
let stockHistory = [];
let currentView = 'dashboard';

// Sample Data
const sampleProducts = [
    {
        code: 'PRD001',
        name: 'Laptop ASUS VivoBook',
        category: 'elektronik',
        price: 7500000,
        stock: 25,
        minStock: 5,
        status: 'tersedia'
    },
    {
        code: 'PRD002',
        name: 'Mouse Wireless Logitech',
        category: 'elektronik',
        price: 350000,
        stock: 3,
        minStock: 10,
        status: 'stok-rendah'
    },
    {
        code: 'PRD003',
        name: 'Kemeja Formal Pria',
        category: 'fashion',
        price: 250000,
        stock: 0,
        minStock: 5,
        status: 'habis'
    },
    {
        code: 'PRD004',
        name: 'Vitamin C 1000mg',
        category: 'kesehatan',
        price: 125000,
        stock: 50,
        minStock: 15,
        status: 'tersedia'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load sample data
    products = [...sampleProducts];
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize data
    updateDashboard();
    renderProductsTable();
    renderInventoryTable();
    
    // Initialize forms
    initializeForms();
    
    // Show dashboard by default
    showSection('dashboard');
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentView = sectionName;
    }
}

// Dashboard Functions
function updateDashboard() {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const lowStock = products.filter(product => product.stock <= product.minStock).length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-stock').textContent = totalStock.toLocaleString();
    document.getElementById('low-stock').textContent = lowStock;
    document.getElementById('total-value').textContent = formatCurrency(totalValue);
    
    updateRecentStock();
    updateRecentActivity();
}

function updateRecentStock() {
    const recentStockEl = document.getElementById('recent-stock');
    const recentProducts = products.slice(0, 5);
    
    if (recentProducts.length === 0) {
        recentStockEl.innerHTML = '<p>Belum ada data stok</p>';
        return;
    }
    
    const stockList = recentProducts.map(product => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; padding: 0.5rem; background: #f8f9ff; border-radius: 6px;">
            <span>${product.name}</span>
            <span class="status-badge status-${product.status}">${product.stock} unit</span>
        </div>
    `).join('');
    
    recentStockEl.innerHTML = stockList;
}

function updateRecentActivity() {
    const recentActivityEl = document.getElementById('recent-activity');
    
    if (stockHistory.length === 0) {
        recentActivityEl.innerHTML = '<p>Belum ada aktivitas</p>';
        return;
    }
    
    const recentActivities = stockHistory.slice(-5).reverse();
    const activityList = recentActivities.map(activity => `
        <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: #f8f9ff; border-radius: 6px;">
            <strong>${activity.productName}</strong><br>
            <small>${activity.type}: ${activity.quantity} unit - ${formatDate(activity.date)}</small>
        </div>
    `).join('');
    
    recentActivityEl.innerHTML = activityList;
}

// Product Management
function renderProductsTable() {
    const tableBody = document.getElementById('products-table');
    
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">Belum ada produk</td></tr>';
        return;
    }
    
    const rows = products.map(product => `
        <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${capitalizeFirst(product.category)}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge status-${product.status}">${getStatusText(product.status)}</span></td>
            <td>
                <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;" onclick="editProduct('${product.code}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem; margin-left: 0.25rem; background: #dc3545; border-color: #dc3545; color: white;" onclick="deleteProduct('${product.code}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    tableBody.innerHTML = rows;
}

// Inventory Management
function renderInventoryTable() {
    const tableBody = document.getElementById('inventory-table');
    
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">Belum ada data inventory</td></tr>';
        return;
    }
    
    const rows = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${capitalizeFirst(product.category)}</td>
            <td>${product.stock}</td>
            <td>${product.minStock}</td>
            <td><span class="status-badge status-${product.status}">${getStatusText(product.status)}</span></td>
            <td>${formatDate(new Date())}</td>
            <td>
                <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;" onclick="updateStock('${product.code}')">
                    <i class="fas fa-edit"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
    
    tableBody.innerHTML = rows;
    updateCategoryFilter();
}

function updateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    const categories = [...new Set(products.map(p => p.category))];
    
    categoryFilter.innerHTML = '<option value="">Semua Kategori</option>';
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${capitalizeFirst(category)}</option>`;
    });
}

// Modal Functions
function showAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

function showStockUpdateModal() {
    const modal = document.getElementById('stockUpdateModal');
    const productSelect = document.getElementById('stock-product');
    
    // Populate product dropdown
    productSelect.innerHTML = '<option value="">Pilih Produk</option>';
    products.forEach(product => {
        productSelect.innerHTML += `<option value="${product.code}">${product.name}</option>`;
    });
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function updateStock(productCode) {
    const product = products.find(p => p.code === productCode);
    if (product) {
        const stockSelect = document.getElementById('stock-product');
        stockSelect.value = productCode;
        showStockUpdateModal();
    }
}

// Form Initialization
function initializeForms() {
    // Add Product Form
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addProduct();
    });
    
    // Stock Update Form
    document.getElementById('stockUpdateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processStockUpdate();
    });
    
    // Search and Filter
    document.getElementById('search-input').addEventListener('input', filterInventory);
    document.getElementById('category-filter').addEventListener('change', filterInventory);
    document.getElementById('status-filter').addEventListener('change', filterInventory);
}

function addProduct() {
    const formData = {
        code: document.getElementById('product-code').value,
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseInt(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        minStock: parseInt(document.getElementById('product-min-stock').value)
    };
    
    // Check if product code already exists
    if (products.find(p => p.code === formData.code)) {
        alert('Kode produk sudah ada!');
        return;
    }
    
    // Determine status
    if (formData.stock === 0) {
        formData.status = 'habis';
    } else if (formData.stock <= formData.minStock) {
        formData.status = 'stok-rendah';
    } else {
        formData.status = 'tersedia';
    }
    
    products.push(formData);
    
    // Add to stock history
    stockHistory.push({
        productCode: formData.code,
        productName: formData.name,
        type: 'Stok Awal',
        quantity: formData.stock,
        date: new Date(),
        notes: 'Produk baru ditambahkan'
    });
    
    // Update displays
    updateDashboard();
    renderProductsTable();
    renderInventoryTable();
    
    // Reset form and close modal
    document.getElementById('addProductForm').reset();
    closeModal('addProductModal');
    
    showNotification('Produk berhasil ditambahkan!', 'success');
}

function processStockUpdate() {
    const productCode = document.getElementById('stock-product').value;
    const stockType = document.getElementById('stock-type').value;
    const quantity = parseInt(document.getElementById('stock-quantity').value);
    const notes = document.getElementById('stock-notes').value;
    
    const product = products.find(p => p.code === productCode);
    if (!product) {
        alert('Produk tidak ditemukan!');
        return;
    }
    
    let newStock = product.stock;
    
    switch (stockType) {
        case 'masuk':
            newStock += quantity;
            break;
        case 'keluar':
            newStock = Math.max(0, newStock - quantity);
            break;
        case 'koreksi':
            newStock = quantity;
            break;
    }
    
    product.stock = newStock;
    
    // Update status
    if (product.stock === 0) {
        product.status = 'habis';
    } else if (product.stock <= product.minStock) {
        product.status = 'stok-rendah';
    } else {
        product.status = 'tersedia';
    }
    
    // Add to stock history
    stockHistory.push({
        productCode: productCode,
        productName: product.name,
        type: capitalizeFirst(stockType),
        quantity: quantity,
        date: new Date(),
        notes: notes || `Update stok ${stockType}`
    });
    
    // Update displays
    updateDashboard();
    renderProductsTable();
    renderInventoryTable();
    
    // Reset form and close modal
    document.getElementById('stockUpdateForm').reset();
    closeModal('stockUpdateModal');
    
    showNotification('Stok berhasil diupdate!', 'success');
}

function editProduct(productCode) {
    const product = products.find(p => p.code === productCode);
    if (!product) return;
    
    // Pre-fill the form with existing data
    document.getElementById('product-code').value = product.code;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-min-stock').value = product.minStock;
    
    // Make code field readonly for editing
    document.getElementById('product-code').readOnly = true;
    
    showAddProductModal();
}

function deleteProduct(productCode) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        products = products.filter(p => p.code !== productCode);
        
        updateDashboard();
        renderProductsTable();
        renderInventoryTable();
        
        showNotification('Produk berhasil dihapus!', 'success');
    }
}

// Filter and Search
function filterInventory() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    let filteredProducts = products;
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    if (statusFilter) {
        filteredProducts = filteredProducts.filter(product => product.status === statusFilter);
    }
    
    renderFilteredInventoryTable(filteredProducts);
}

function renderFilteredInventoryTable(filteredProducts) {
    const tableBody = document.getElementById('inventory-table');
    
    if (filteredProducts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">Tidak ada data yang sesuai filter</td></tr>';
        return;
    }
    
    const rows = filteredProducts.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${capitalizeFirst(product.category)}</td>
            <td>${product.stock}</td>
            <td>${product.minStock}</td>
            <td><span class="status-badge status-${product.status}">${getStatusText(product.status)}</span></td>
            <td>${formatDate(new Date())}</td>
            <td>
                <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;" onclick="updateStock('${product.code}')">
                    <i class="fas fa-edit"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
    
    tableBody.innerHTML = rows;
}

// Reports
function generateReport() {
    const reportData = {
        totalProducts: products.length,
        totalStock: products.reduce((sum, product) => sum + product.stock, 0),
        totalValue: products.reduce((sum, product) => sum + (product.price * product.stock), 0),
        lowStockItems: products.filter(product => product.stock <= product.minStock),
        categories: [...new Set(products.map(p => p.category))],
        generatedAt: new Date()
    };
    
    // Create and download CSV report
    const csvContent = generateCSVReport(reportData);
    downloadCSV(csvContent, 'inventory-report.csv');
    
    showNotification('Laporan berhasil diunduh!', 'success');
}

function generateCSVReport(data) {
    let csv = 'Laporan Inventory Trima Laksana ERP\n';
    csv += `Tanggal Generate: ${formatDate(data.generatedAt)}\n\n`;
    csv += `Total Produk: ${data.totalProducts}\n`;
    csv += `Total Stok: ${data.totalStock}\n`;
    csv += `Total Nilai: ${formatCurrency(data.totalValue)}\n`;
    csv += `Item Stok Rendah: ${data.lowStockItems.length}\n\n`;
    
    csv += 'Detail Produk:\n';
    csv += 'Kode,Nama,Kategori,Harga,Stok,Min Stok,Status\n';
    
    products.forEach(product => {
        csv += `${product.code},${product.name},${product.category},${product.price},${product.stock},${product.minStock},${product.status}\n`;
    });
    
    return csv;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getStatusText(status) {
    const statusMap = {
        'tersedia': 'Tersedia',
        'stok-rendah': 'Stok Rendah',
        'habis': 'Habis'
    };
    return statusMap[status] || status;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);