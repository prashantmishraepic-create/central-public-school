// Admin Login
function adminLogin(event) {
    event.preventDefault();
    
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple demo login validation
    if (adminId && password) {
        document.getElementById('adminLoginPage').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        
        // Initialize charts after dashboard is visible
        setTimeout(initAdminCharts, 100);
    } else {
        alert('Please enter both Admin ID and Password');
    }
}

// Admin Logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('adminLoginPage').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }
}

// Toggle Admin Sidebar
function toggleAdminSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    sidebar.classList.toggle('active');
}

// Show Admin Section
function showAdminSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.menu-link').classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        toggleAdminSidebar();
    }
}

// Show Modal (placeholder)
function showModal(modalId) {
    alert('Modal functionality: ' + modalId + '\nThis would open a form to add/edit records.');
}

// Initialize Admin Charts
function initAdminCharts() {
    const enrollmentCtx = document.getElementById('enrollmentChart');
    if (enrollmentCtx) {
        drawEnrollmentChart(enrollmentCtx);
    }
    
    const distributionCtx = document.getElementById('distributionChart');
    if (distributionCtx) {
        drawDistributionChart(distributionCtx);
    }
}

// Draw Enrollment Chart
function drawEnrollmentChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const enrollment = [320, 340, 355, 365, 380, 395];
    
    // Calculate dimensions
    const padding = 50;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const stepX = chartWidth / (months.length - 1);
    const minValue = 300;
    const maxValue = 400;
    
    // Draw grid
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = maxValue - ((maxValue - minValue) / 5) * i;
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(value), padding - 10, y + 4);
    }
    
    // Draw line with gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
    
    // Fill area under line
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    months.forEach((month, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((enrollment[index] - minValue) / (maxValue - minValue)) * chartHeight;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    months.forEach((month, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((enrollment[index] - minValue) / (maxValue - minValue)) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#6366F1';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw month label
        ctx.fillStyle = '#6B7280';
        ctx.font = '13px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(month, x, height - padding + 25);
        
        // Draw value
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 12px Inter';
        ctx.fillText(enrollment[index], x, y - 15);
    });
    
    ctx.stroke();
}

// Draw Distribution Chart (Pie Chart)
function drawDistributionChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data
    const data = [
        { label: 'Primary', value: 450, color: '#6366F1' },
        { label: 'Middle', value: 520, color: '#8B5CF6' },
        { label: 'Secondary', value: 620, color: '#10B981' },
        { label: 'Sr. Secondary', value: 458, color: '#F59E0B' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate center and radius
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = Math.min(width, height) / 3;
    
    // Draw pie slices
    let currentAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        
        // Draw slice
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 40);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 40);
        
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 13px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, labelX, labelY);
        
        // Draw percentage
        ctx.font = '12px Inter';
        ctx.fillStyle = '#6B7280';
        const percentage = ((item.value / total) * 100).toFixed(1);
        ctx.fillText(percentage + '%', labelX, labelY + 15);
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle (donut effect)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw total in center
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 24px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(total, centerX, centerY);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '14px Inter';
    ctx.fillText('Total Students', centerX, centerY + 20);
}

// Table actions
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for table buttons
    const tableButtons = document.querySelectorAll('.table-btn');
    tableButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('edit') ? 'Edit' : 
                          this.classList.contains('delete') ? 'Delete' : 
                          this.classList.contains('view') ? 'View' : 'Action';
            alert(action + ' functionality would be implemented here');
        });
    });
    
    // Add event listeners for action buttons
    const actionButtons = document.querySelectorAll('.action-btn, .report-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('This would perform: ' + this.textContent);
        });
    });
});

// Mobile responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('adminSidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Search logic would be implemented here
            console.log('Searching for:', searchTerm);
        });
    });
});

// Initialize charts when dashboard becomes visible
const dashboardObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.style.display === 'flex') {
            initAdminCharts();
        }
    });
});

const adminDashboard = document.getElementById('adminDashboard');
if (adminDashboard) {
    dashboardObserver.observe(adminDashboard, {
        attributes: true,
        attributeFilter: ['style']
    });
}
