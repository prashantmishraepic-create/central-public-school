// Student Login
function studentLogin(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('studentPassword').value;
    
    // Simple demo login validation
    if (studentId && password) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('studentDashboard').style.display = 'flex';
        
        // Initialize charts after dashboard is visible
        setTimeout(initCharts, 100);
    } else {
        alert('Please enter both Student ID and Password');
    }
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('loginPage').style.display = 'grid';
        document.getElementById('studentDashboard').style.display = 'none';
    }
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// Show Result Tab
function showResultTab(tabId) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.result-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize Charts
function initCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        drawPerformanceChart(performanceCtx);
    }
    
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        drawAttendanceChart(attendanceCtx);
    }
}

// Draw Performance Chart
function drawPerformanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data
    const subjects = ['Math', 'Science', 'English', 'Hindi', 'SST'];
    const scores = [92, 88, 85, 86, 85];
    const maxScore = 100;
    
    // Calculate dimensions
    const barWidth = width / (subjects.length * 2);
    const spacing = barWidth;
    const chartHeight = height - 60;
    
    // Draw bars
    subjects.forEach((subject, index) => {
        const barHeight = (scores[index] / maxScore) * chartHeight;
        const x = spacing + (index * (barWidth + spacing));
        const y = height - barHeight - 40;
        
        // Draw bar
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw score
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(scores[index], x + barWidth/2, y - 5);
        
        // Draw subject name
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.fillText(subject, x + barWidth/2, height - 20);
    });
    
    // Draw title
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Subject-wise Performance', 10, 20);
}

// Draw Attendance Chart
function drawAttendanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Sample data
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const attendance = [95, 93, 87, 95, 95.5, 93.3];
    
    // Calculate dimensions
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const stepX = chartWidth / (months.length - 1);
    
    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    months.forEach((month, index) => {
        const x = padding + (index * stepX);
        const y = height - padding - ((attendance[index] - 80) / 20) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw month label
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(month, x, height - 15);
        
        // Draw percentage
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 11px Inter';
        ctx.fillText(attendance[index] + '%', x, y - 12);
    });
    
    ctx.stroke();
    
    // Draw title
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'left';
    ctx.fillText('Monthly Attendance Trend', 10, 20);
}

// Mobile responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
            }
        });
    });
});
