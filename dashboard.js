// ===== DASHBOARD FUNCTIONALITY =====

// Global Variables
let currentUser = null;
let isDarkMode = false;
let tasksCompleted = 3;
let totalTasks = 5;
let currentMood = 'okay';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    loadUserData();
    updateTimeBasedGreeting();
    animateDashboardElements();
    initializeProgressBars();
});

// Initialize Dashboard
function initializeDashboard() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('fitbuddy_logged_in');
    if (isLoggedIn !== 'true') {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
        return;
    }
    
    // Load user preferences
    loadUserPreferences();
    
    // Initialize components
    initializeThemeToggle();
    initializeProgressBars();
    initializeCalorieChart();
    
    // Show welcome message
    setTimeout(() => {
        showWelcomeToast();
    }, 1000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    // Logout functionality
    const logoutBtn = document.querySelector('a[onclick="logout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Task toggles
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(task => {
        task.addEventListener('click', function(e) {
            if (e.target.closest('.task-checkbox') || e.target === this) {
                toggleTask(this);
            }
        });
    });
    
    // Mood selection
    const moodEmojis = document.querySelectorAll('.mood-emoji');
    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            selectMood(this);
        });
    });
    
    // Save reflection button
    const saveReflectionBtn = document.querySelector('[onclick="saveReflection()"]');
    if (saveReflectionBtn) {
        saveReflectionBtn.addEventListener('click', saveReflection);
    }
    
    // Add meal button
    const addMealBtn = document.querySelector('[onclick="addMeal()"]');
    if (addMealBtn) {
        addMealBtn.addEventListener('click', addMeal);
    }
    
    // Achievement badges
    const achievementBadges = document.querySelectorAll('.achievement-badge');
    achievementBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            showBadgeDetails(this);
        });
    });
    
    // Leaderboard interactions
    const leaderboardItems = document.querySelectorAll('.leaderboard-item');
    leaderboardItems.forEach(item => {
        item.addEventListener('click', function() {
            showUserProfile(this);
        });
    });
    
    // Card hover effects
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleDashboardKeyboard);
    
    // Auto-save functionality for journal
    const reflectionTextarea = document.getElementById('reflectionText');
    if (reflectionTextarea) {
        let saveTimeout;
        reflectionTextarea.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                autoSaveReflection();
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Load User Data
function loadUserData() {
    const username = localStorage.getItem('fitbuddy_username') || 'User';
    currentUser = {
        name: username,
        firstName: username.split(' ')[0] || username
    };
    
    // Update username displays
    const usernameElements = document.querySelectorAll('#userName, #navUsername');
    usernameElements.forEach(el => {
        if (el.id === 'userName') {
            el.textContent = currentUser.firstName;
        } else {
            el.textContent = currentUser.name;
        }
    });
    
    // Load saved mood
    const savedMood = localStorage.getItem('fitbuddy_current_mood');
    if (savedMood) {
        currentMood = savedMood;
        const moodEmoji = document.querySelector(`[data-mood="${savedMood}"]`);
        if (moodEmoji) {
            selectMood(moodEmoji);
        }
    }
    
    // Load saved reflection
    const savedReflection = localStorage.getItem('fitbuddy_reflection');
    if (savedReflection) {
        const reflectionTextarea = document.getElementById('reflectionText');
        if (reflectionTextarea) {
            reflectionTextarea.value = savedReflection;
        }
    }
    
    // Load task progress
    const savedProgress = localStorage.getItem('fitbuddy_task_progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        tasksCompleted = progress.completed;
        totalTasks = progress.total;
        updateProgressDisplay();
    }
}

// Load User Preferences
function loadUserPreferences() {
    // Load theme preference
    const savedTheme = localStorage.getItem('fitbuddy_theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }
}

// Theme Toggle
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('fitbuddy_theme', isDarkMode ? 'dark' : 'light');
    
    // Show theme change notification
    showToast(
        `Switched to ${isDarkMode ? 'dark' : 'light'} mode`,
        'success',
        isDarkMode ? '🌙' : '☀️'
    );
    
    // Animate theme transition
    document.documentElement.style.setProperty('--transition-medium', '0.3s ease');
    setTimeout(() => {
        document.documentElement.style.removeProperty('--transition-medium');
    }, 300);
}

// Initialize Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.checked = isDarkMode;
    }
}

// Task Management
function toggleTask(taskElement) {
    const isCompleted = taskElement.classList.contains('completed');
    const taskTitle = taskElement.querySelector('h4').textContent;
    
    if (isCompleted) {
        // Mark as incomplete
        taskElement.classList.remove('completed');
        tasksCompleted = Math.max(0, tasksCompleted - 1);
        showToast(`Task "${taskTitle}" marked as incomplete`, 'info', '📝');
    } else {
        // Mark as complete
        taskElement.classList.add('completed');
        tasksCompleted = Math.min(totalTasks, tasksCompleted + 1);
        showToast(`Task "${taskTitle}" completed!`, 'success', '✅');
        
        // Add completion animation
        animateTaskCompletion(taskElement);
    }
    
    updateProgressDisplay();
    saveTaskProgress();
    
    // Check for achievement unlocks
    if (tasksCompleted === totalTasks) {
        unlockAchievement('Daily Champion', 'Complete all daily tasks');
    }
}

// Animate Task Completion
function animateTaskCompletion(taskElement) {
    const checkbox = taskElement.querySelector('.task-checkbox');
    checkbox.style.transform = 'scale(1.2)';
    checkbox.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        checkbox.style.transform = 'scale(1)';
    }, 300);
    
    // Confetti effect
    createConfettiEffect(checkbox);
}

// Create Confetti Effect
function createConfettiEffect(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#10b981', '#3b82f6', '#f97316', '#34d399', '#60a5fa'];
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = rect.left + rect.width/2 + 'px';
        confetti.style.top = rect.top + rect.height/2 + 'px';
        confetti.style.width = '4px';
        confetti.style.height = '4px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = rect.left + rect.width/2;
        let y = rect.top + rect.height/2;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02 + 0.5; // gravity
            opacity -= 0.02;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(confetti);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Update Progress Display
function updateProgressDisplay() {
    const progressPercentage = Math.round((tasksCompleted / totalTasks) * 100);
    
    // Update progress bars
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        if (fill.closest('.roadmap-card')) {
            fill.style.width = progressPercentage + '%';
        }
    });
    
    // Update progress text
    const progressTexts = document.querySelectorAll('.progress-text');
    progressTexts.forEach(text => {
        text.textContent = `${tasksCompleted}/${totalTasks} completed`;
    });
    
    const progressPercentages = document.querySelectorAll('.progress-percentage');
    progressPercentages.forEach(percentage => {
        percentage.textContent = progressPercentage + '%';
    });
}

// Save Task Progress
function saveTaskProgress() {
    const progress = {
        completed: tasksCompleted,
        total: totalTasks,
        timestamp: Date.now()
    };
    localStorage.setItem('fitbuddy_task_progress', JSON.stringify(progress));
}

// Mood Selection
function selectMood(moodElement) {
    // Remove active class from all mood emojis
    document.querySelectorAll('.mood-emoji').forEach(emoji => {
        emoji.classList.remove('active');
    });
    
    // Add active class to selected mood
    moodElement.classList.add('active');
    
    // Update current mood
    currentMood = moodElement.getAttribute('data-mood');
    
    // Save mood
    localStorage.setItem('fitbuddy_current_mood', currentMood);
    
    // Show feedback
    const moodText = moodElement.querySelector('span').textContent;
    showToast(`Mood updated to ${moodText}`, 'success', moodElement.querySelector('i').outerHTML);
    
    // Add animation
    moodElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        moodElement.style.transform = 'scale(1)';
    }, 200);
}

// Save Reflection
function saveReflection() {
    const reflectionTextarea = document.getElementById('reflectionText');
    const reflectionText = reflectionTextarea.value.trim();
    
    if (!reflectionText) {
        showToast('Please write something in your journal first', 'warning', '📝');
        reflectionTextarea.focus();
        return;
    }
    
    // Save reflection
    localStorage.setItem('fitbuddy_reflection', reflectionText);
    
    // Save with timestamp for history
    const reflectionHistory = JSON.parse(localStorage.getItem('fitbuddy_reflection_history') || '[]');
    reflectionHistory.push({
        text: reflectionText,
        mood: currentMood,
        date: new Date().toISOString(),
        timestamp: Date.now()
    });
    
    // Keep only last 30 entries
    if (reflectionHistory.length > 30) {
        reflectionHistory.splice(0, reflectionHistory.length - 30);
    }
    
    localStorage.setItem('fitbuddy_reflection_history', JSON.stringify(reflectionHistory));
    
    showToast('Journal entry saved successfully!', 'success', '💾');
    
    // Animate save button
    const saveBtn = document.querySelector('[onclick="saveReflection()"]');
    if (saveBtn) {
        saveBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            saveBtn.style.transform = 'scale(1)';
        }, 150);
    }
}

// Auto Save Reflection
function autoSaveReflection() {
    const reflectionTextarea = document.getElementById('reflectionText');
    const reflectionText = reflectionTextarea.value.trim();
    
    if (reflectionText) {
        localStorage.setItem('fitbuddy_reflection', reflectionText);
        showToast('Journal auto-saved', 'info', '💾');
    }
}

// Add Meal
function addMeal() {
    // Show meal input dialog
    Swal.fire({
        title: 'Add Meal',
        html: `
            <div class="meal-input-form">
                <div class="form-group">
                    <label>Meal Type</label>
                    <select id="mealType" class="form-control">
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Food Item</label>
                    <input type="text" id="foodItem" class="form-control" placeholder="e.g., Grilled Chicken Salad">
                </div>
                <div class="form-group">
                    <label>Calories</label>
                    <input type="number" id="calories" class="form-control" placeholder="e.g., 350">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add Meal',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button',
            cancelButton: 'swal-custom-cancel'
        },
        preConfirm: () => {
            const mealType = document.getElementById('mealType').value;
            const foodItem = document.getElementById('foodItem').value.trim();
            const calories = parseInt(document.getElementById('calories').value);
            
            if (!foodItem) {
                Swal.showValidationMessage('Please enter a food item');
                return false;
            }
            
            if (!calories || calories <= 0) {
                Swal.showValidationMessage('Please enter valid calories');
                return false;
            }
            
            return { mealType, foodItem, calories };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { mealType, foodItem, calories } = result.value;
            
            // Update calorie display (simplified)
            const consumedElement = document.querySelector('.consumed');
            if (consumedElement) {
                const currentCalories = parseInt(consumedElement.textContent.replace(',', ''));
                const newCalories = currentCalories + calories;
                consumedElement.textContent = newCalories.toLocaleString();
                
                // Update progress bar
                const targetCalories = 2200;
                const progressPercentage = Math.min(100, (newCalories / targetCalories) * 100);
                const calorieCircle = document.querySelector('.circle');
                if (calorieCircle) {
                    calorieCircle.setAttribute('stroke-dasharray', `${progressPercentage}, 100`);
                }
            }
            
            showToast(`Added ${foodItem} (${calories} calories)`, 'success', '🍽️');
        }
    });
}

// Show Badge Details
function showBadgeDetails(badgeElement) {
    const badgeName = badgeElement.querySelector('span').textContent;
    const isEarned = badgeElement.classList.contains('earned');
    
    if (isEarned) {
        Swal.fire({
            title: `🏆 ${badgeName}`,
            text: 'Congratulations! You have earned this achievement.',
            icon: 'success',
            confirmButtonText: 'Awesome!',
            confirmButtonColor: '#10b981',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                confirmButton: 'swal-custom-button'
            }
        });
    } else {
        Swal.fire({
            title: `🔒 ${badgeName}`,
            text: 'Keep working towards your goals to unlock this achievement!',
            icon: 'info',
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#3b82f6',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                confirmButton: 'swal-custom-button'
            }
        });
    }
}

// Show User Profile
function showUserProfile(leaderboardItem) {
    const username = leaderboardItem.querySelector('.username').textContent;
    const points = leaderboardItem.querySelector('.points').textContent;
    const rank = leaderboardItem.querySelector('.rank').textContent;
    
    Swal.fire({
        title: `👤 ${username}`,
        html: `
            <div class="user-profile-popup">
                <p><strong>Rank:</strong> #${rank}</p>
                <p><strong>Points:</strong> ${points}</p>
                <p><strong>Status:</strong> Active in 30-Day Fitness Challenge</p>
            </div>
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#3b82f6',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
        }
    });
}

// Unlock Achievement
function unlockAchievement(achievementName, description) {
    // Add to unlocked achievements
    const unlockedAchievements = JSON.parse(localStorage.getItem('fitbuddy_unlocked_achievements') || '[]');
    if (!unlockedAchievements.includes(achievementName)) {
        unlockedAchievements.push(achievementName);
        localStorage.setItem('fitbuddy_unlocked_achievements', JSON.stringify(unlockedAchievements));
        
        // Show achievement popup
        Swal.fire({
            title: '🎉 Achievement Unlocked!',
            html: `
                <div class="achievement-popup">
                    <h3>${achievementName}</h3>
                    <p>${description}</p>
                </div>
            `,
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                popup: 'swal-custom-popup achievement-unlock',
                title: 'swal-custom-title',
                timerProgressBar: 'swal-custom-progress'
            }
        });
        
        // Update badge in UI
        setTimeout(() => {
            const badges = document.querySelectorAll('.achievement-badge');
            badges.forEach(badge => {
                if (badge.querySelector('span').textContent === achievementName) {
                    badge.classList.add('earned');
                    badge.style.animation = 'bounceIn 0.6s ease';
                }
            });
        }, 500);
    }
}

// Update Time-Based Greeting
function updateTimeBasedGreeting() {
    const timeOfDayElements = document.querySelectorAll('#timeOfDay');
    const hour = new Date().getHours();
    let timeOfDay = 'Morning';
    
    if (hour >= 12 && hour < 17) {
        timeOfDay = 'Afternoon';
    } else if (hour >= 17) {
        timeOfDay = 'Evening';
    }
    
    timeOfDayElements.forEach(element => {
        element.textContent = timeOfDay;
    });
}

// Initialize Progress Bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .macro-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
        }, 500);
    });
}

// Initialize Calorie Chart
function initializeCalorieChart() {
    const circle = document.querySelector('.circle');
    if (circle) {
        const currentDash = circle.getAttribute('stroke-dasharray');
        circle.setAttribute('stroke-dasharray', '0, 100');
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dasharray 1s ease-out';
            circle.setAttribute('stroke-dasharray', currentDash);
        }, 800);
    }
}

// Animate Dashboard Elements
function animateDashboardElements() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (index + 1) * 150);
    });
}

// Handle Dashboard Keyboard Shortcuts
function handleDashboardKeyboard(e) {
    // Ctrl/Cmd + D for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
    
    // Ctrl/Cmd + S for save reflection
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveReflection();
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        // Close any open SweetAlert modals
        if (Swal.isVisible()) {
            Swal.close();
        }
    }
    
    // Number keys for mood selection (1-4)
    if (e.key >= '1' && e.key <= '4') {
        const moodIndex = parseInt(e.key) - 1;
        const moodEmojis = document.querySelectorAll('.mood-emoji');
        if (moodEmojis[moodIndex]) {
            selectMood(moodEmojis[moodIndex]);
        }
    }
}

// Toast Notifications
function showToast(message, type = 'info', emoji = '') {
    const bgColors = {
        success: 'linear-gradient(135deg, #10b981, #34d399)',
        error: 'linear-gradient(135deg, #ef4444, #f87171)',
        warning: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        info: 'linear-gradient(135deg, #3b82f6, #60a5fa)'
    };
    
    Toastify({
        text: emoji ? `${emoji} ${message}` : message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: bgColors[type] || bgColors.info,
            borderRadius: '12px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500',
            fontSize: '14px',
            padding: '16px 20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            border: 'none'
        },
        onClick: function() {
            this.hideToast();
        }
    }).showToast();
}

// Welcome Toast
function showWelcomeToast() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    let emoji = '🌅';
    
    if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
        emoji = '☀️';
    } else if (hour >= 17) {
        greeting = 'Good evening';
        emoji = '🌅';
    }
    
    showToast(`${greeting}, ${currentUser.firstName}! Welcome back to FitBuddy`, 'success', emoji);
}

// Logout Function
function handleLogout(e) {
    e.preventDefault();
    
    Swal.fire({
        title: 'Confirm Logout',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6b7280',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button',
            cancelButton: 'swal-custom-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear login state
            localStorage.removeItem('fitbuddy_logged_in');
            
            // Show goodbye message
            Swal.fire({
                title: 'Goodbye!',
                text: 'Thanks for using FitBuddy. See you soon!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    timerProgressBar: 'swal-custom-progress'
                }
            }).then(() => {
                window.location.href = 'index.html';
            });
        }
    });
}

// Make functions globally available
window.toggleTask = toggleTask;
window.selectMood = selectMood;
window.saveReflection = saveReflection;
window.addMeal = addMeal;
window.logout = handleLogout;

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Dashboard loaded in:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);

// Service Worker Registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, continue normally
        });
    });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTask,
        selectMood,
        saveReflection,
        updateProgressDisplay
    };
}