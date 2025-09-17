// ===== LOGIN PAGE FUNCTIONALITY =====

// Global Variables
let isPasswordVisible = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
    setupEventListeners();
    animatePageElements();
    updateTimeOfDay();
});

// Initialize Login Page
function initializeLoginPage() {
    // Check if user is already logged in (for demo purposes)
    const isLoggedIn = localStorage.getItem('fitbuddy_logged_in');
    if (isLoggedIn === 'true' && window.location.pathname.includes('dashboard.html')) {
        // User is logged in and on dashboard - this is correct
        return;
    } else if (isLoggedIn === 'true' && !window.location.pathname.includes('dashboard.html')) {
        // User is logged in but not on dashboard - redirect
        // window.location.href = 'dashboard.html';
        // return;
    }
    
    // Add floating shapes animation
    createFloatingShapes();
    
    // Set focus on username field
    const usernameField = document.getElementById('username');
    if (usernameField) {
        setTimeout(() => {
            usernameField.focus();
        }, 1000);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Login form found, adding event listener');
        loginForm.addEventListener('submit', handleLogin);
        
        // Also add click handler to submit button as backup
        const submitBtn = loginForm.querySelector('.btn-login');
        if (submitBtn) {
            console.log('Submit button found, adding click handler');
            submitBtn.addEventListener('click', function(e) {
                console.log('Submit button clicked');
                if (e.target.type !== 'button') {
                    e.preventDefault();
                    handleLogin(e);
                }
            });
        }
    } else {
        console.error('Login form not found!');
    }
    
    // Password toggle functionality
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePassword);
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
    
    // Form input validation on blur
    const formInputs = document.querySelectorAll('#loginForm input[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
    
    // Remember me functionality
    const rememberCheckbox = document.getElementById('rememberMe');
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', handleRememberMe);
        // Load saved preference
        const remembered = localStorage.getItem('fitbuddy_remember');
        if (remembered === 'true') {
            rememberCheckbox.checked = true;
            const savedUsername = localStorage.getItem('fitbuddy_username');
            if (savedUsername) {
                document.getElementById('username').value = savedUsername;
            }
        }
    }
    
    // Create account link
    const createAccountLink = document.querySelector('.create-account');
    if (createAccountLink) {
        createAccountLink.addEventListener('click', handleCreateAccount);
    }
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle Login Form Submission
function handleLogin(e) {
    e.preventDefault();
    console.log('Login form submitted'); // Debug log
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    
    console.log('Username:', username, 'Password length:', password.length); // Debug log
    
    // Clear previous validation states
    clearAllValidation();
    
    // Basic validation
    if (!username || username.length < 2) {
        showErrorAlert('Please enter a valid username (at least 2 characters)');
        return;
    }
    
    if (!password || password.length < 4) {
        showErrorAlert('Please enter a valid password (at least 4 characters)');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-login');
    showLoadingState(submitBtn);
    
    // Simulate loading delay and then proceed
    setTimeout(() => {
        try {
            // Simple demo login - any username with 4+ char password works
            const isValidLogin = password.length >= 4;
            
            if (isValidLogin) {
                console.log('Login successful, redirecting...'); // Debug log
                
                // Save login state
                localStorage.setItem('fitbuddy_logged_in', 'true');
                localStorage.setItem('fitbuddy_username', username);
                
                if (rememberMe) {
                    localStorage.setItem('fitbuddy_remember', 'true');
                } else {
                    localStorage.removeItem('fitbuddy_remember');
                }
                
                // Show success message and redirect
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Welcome to FitBuddy!',
                        text: 'Login successful! Redirecting to your dashboard...',
                        icon: 'success',
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        background: '#ffffff',
                        customClass: {
                            popup: 'swal-custom-popup swal-success',
                            title: 'swal-custom-title',
                            timerProgressBar: 'swal-custom-progress'
                        },
                        willClose: () => {
                            // Redirect to dashboard
                            console.log('Redirecting to dashboard.html'); // Debug log
                            window.location.href = './dashboard.html';
                        }
                    });
                } else {
                    // Fallback if SweetAlert2 is not loaded
                    console.log('SweetAlert2 not available, redirecting directly');
                    alert('Login successful! Redirecting to dashboard...');
                    window.location.href = './dashboard.html';
                }
                
                // Additional fallback - redirect after 2 seconds regardless
                setTimeout(() => {
                    console.log('Fallback redirect executing');
                    window.location.href = './dashboard.html';
                }, 2000);
                
            } else {
                console.log('Login failed'); // Debug log
                showErrorAlert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            showErrorAlert('An unexpected error occurred. Please try again.');
        } finally {
            hideLoadingState(submitBtn);
        }
    }, 1000); // 1 second delay for demo purposes
}

// Validate Credentials (Demo Function)
async function validateCredentials(username, password) {
    // Demo credentials - in real app, this would be an API call
    const validCredentials = [
        { username: 'admin', password: 'admin123' },
        { username: 'john', password: 'password' },
        { username: 'user', password: '123456' },
        { username: 'demo', password: 'demo' },
        { username: 'fitbuddy', password: 'wellness' }
    ];
    
    // Simulate network delay
    await delay(1000);
    
    // For demo, accept any username with password length > 3
    if (password.length >= 4) {
        return true;
    }
    
    return validCredentials.some(cred => 
        cred.username.toLowerCase() === username.toLowerCase() && 
        cred.password === password
    );
}

// Form Validation
function validateForm() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let isValid = true;
    
    // Validate username
    if (!username.value.trim()) {
        setValidationState(username, false, 'Username is required');
        isValid = false;
    } else if (username.value.trim().length < 2) {
        setValidationState(username, false, 'Username must be at least 2 characters');
        isValid = false;
    } else {
        setValidationState(username, true);
    }
    
    // Validate password
    if (!password.value.trim()) {
        setValidationState(password, false, 'Password is required');
        isValid = false;
    } else if (password.value.trim().length < 4) {
        setValidationState(password, false, 'Password must be at least 4 characters');
        isValid = false;
    } else {
        setValidationState(password, true);
    }
    
    return isValid;
}

// Individual Input Validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    if (input.id === 'username') {
        if (!value) {
            setValidationState(input, false, 'Username is required');
        } else if (value.length < 2) {
            setValidationState(input, false, 'Username must be at least 2 characters');
        } else {
            setValidationState(input, true);
        }
    } else if (input.id === 'password') {
        if (!value) {
            setValidationState(input, false, 'Password is required');
        } else if (value.length < 4) {
            setValidationState(input, false, 'Password must be at least 4 characters');
        } else {
            setValidationState(input, true);
        }
    }
}

// Set Validation State
function setValidationState(input, isValid, message = '') {
    const inputGroup = input.closest('.input-group-custom');
    const feedback = inputGroup.querySelector('.invalid-feedback');
    
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (feedback) feedback.style.display = 'none';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedback) {
            feedback.textContent = message;
            feedback.style.display = 'block';
        }
    }
    
    // Update icon color
    const icon = inputGroup.querySelector('.input-icon i');
    if (icon) {
        icon.style.color = isValid ? 'var(--primary-green)' : '#dc3545';
    }
}

// Clear Validation
function clearValidation(e) {
    const input = e.target;
    input.classList.remove('is-invalid', 'is-valid');
    const inputGroup = input.closest('.input-group-custom');
    const feedback = inputGroup.querySelector('.invalid-feedback');
    if (feedback) feedback.style.display = 'none';
    
    // Reset icon color
    const icon = inputGroup.querySelector('.input-icon i');
    if (icon) {
        icon.style.color = '';
    }
}

// Clear All Validation
function clearAllValidation() {
    const inputs = document.querySelectorAll('#loginForm input');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
        const inputGroup = input.closest('.input-group-custom');
        const feedback = inputGroup.querySelector('.invalid-feedback');
        if (feedback) feedback.style.display = 'none';
        
        const icon = inputGroup.querySelector('.input-icon i');
        if (icon) {
            icon.style.color = '';
        }
    });
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    isPasswordVisible = !isPasswordVisible;
    
    if (isPasswordVisible) {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
    
    // Maintain focus
    passwordInput.focus();
}

// Handle Social Login
function handleSocialLogin(e) {
    e.preventDefault();
    const provider = e.currentTarget.classList.contains('google-btn') ? 'Google' : 
                    e.currentTarget.classList.contains('facebook-btn') ? 'Facebook' : 'Apple';
    
    Swal.fire({
        title: `${provider} Login`,
        text: `${provider} login integration would be implemented here.`,
        icon: 'info',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#3b82f6',
        background: '#ffffff',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
        }
    });
}

// Handle Remember Me
function handleRememberMe(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
        localStorage.setItem('fitbuddy_remember', 'true');
    } else {
        localStorage.removeItem('fitbuddy_remember');
        localStorage.removeItem('fitbuddy_username');
    }
}

// Handle Create Account
function handleCreateAccount(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Create Account',
        text: 'Account creation feature would be implemented here.',
        icon: 'info',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#10b981',
        background: '#ffffff',
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            confirmButton: 'swal-custom-button'
        }
    });
}

// Handle Forgot Password
function handleForgotPassword(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Reset Password',
        input: 'email',
        inputLabel: 'Enter your email address',
        inputPlaceholder: 'your.email@example.com',
        showCancelButton: true,
        confirmButtonText: 'Send Reset Link',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter your email address';
            }
            if (!isValidEmail(value)) {
                return 'Please enter a valid email address';
            }
        },
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            input: 'swal-custom-input',
            confirmButton: 'swal-custom-button',
            cancelButton: 'swal-custom-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Reset Link Sent!',
                text: `Password reset instructions have been sent to ${result.value}`,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-custom-button'
                }
            });
        }
    });
}

// Success Alert
function showSuccessAlert() {
    return Swal.fire({
        title: 'Welcome to FitBuddy!',
        text: 'Login successful! Redirecting to your dashboard...',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        customClass: {
            popup: 'swal-custom-popup swal-success',
            title: 'swal-custom-title',
            timerProgressBar: 'swal-custom-progress'
        }
    });
}

// Error Alert
function showErrorAlert(message = 'Invalid username or password. Please try again.') {
    if (typeof Swal !== 'undefined') {
        return Swal.fire({
            title: 'Login Failed',
            text: message,
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#dc3545',
            background: '#ffffff',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                confirmButton: 'swal-custom-button'
            }
        });
    } else {
        // Fallback if SweetAlert2 is not loaded
        alert('Login Failed: ' + message);
        return Promise.resolve();
    }
}

// Loading States
function showLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
    const originalText = button.querySelector('.btn-text').textContent;
    button.querySelector('.btn-text').textContent = 'Signing In...';
    button.dataset.originalText = originalText;
}

function hideLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
    const originalText = button.dataset.originalText || 'Sign In';
    button.querySelector('.btn-text').textContent = originalText;
}

// Animate Page Elements
function animatePageElements() {
    // Add entrance animations to form elements
    const formElements = document.querySelectorAll('.input-group-custom, .form-options, .btn-login, .social-login, .signup-link');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, (index + 1) * 100);
    });
}

// Create Additional Floating Shapes
function createFloatingShapes() {
    const floatingContainer = document.querySelector('.floating-shapes');
    if (!floatingContainer) return;
    
    // Create additional shapes for more dynamic background
    for (let i = 5; i <= 8; i++) {
        const shape = document.createElement('div');
        shape.className = `shape shape-${i}`;
        shape.style.width = `${Math.random() * 80 + 40}px`;
        shape.style.height = shape.style.width;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 6}s`;
        shape.style.animationDuration = `${Math.random() * 4 + 4}s`;
        floatingContainer.appendChild(shape);
    }
}

// Update Time of Day
function updateTimeOfDay() {
    const timeElements = document.querySelectorAll('#timeOfDay');
    if (timeElements.length === 0) return;
    
    const hour = new Date().getHours();
    let timeOfDay = 'Morning';
    
    if (hour >= 12 && hour < 17) {
        timeOfDay = 'Afternoon';
    } else if (hour >= 17) {
        timeOfDay = 'Evening';
    }
    
    timeElements.forEach(element => {
        element.textContent = timeOfDay;
    });
}

// Handle Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // Enter key in form fields
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form && form.id === 'loginForm') {
            e.preventDefault();
            handleLogin(e);
        }
    }
    
    // Tab key improvements
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('form-control')) {
            // Clear validation on tab navigation
            setTimeout(() => {
                clearValidation({ target: focusedElement });
            }, 100);
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        const form = document.getElementById('loginForm');
        if (form) {
            form.reset();
            clearAllValidation();
        }
    }
}

// Utility Functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Input Enhancement
function enhanceInputExperience() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        // Placeholder animation
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Auto-complete enhancements
        if (input.type === 'text' && input.id === 'username') {
            input.setAttribute('autocomplete', 'username');
        }
        if (input.type === 'password') {
            input.setAttribute('autocomplete', 'current-password');
        }
    });
}

// Custom Cursor Effects (Optional)
function initCursorEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .social-btn, a, .task-item, .mood-emoji');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce validation
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Apply debounced validation to inputs
    const inputs = document.querySelectorAll('#loginForm input');
    inputs.forEach(input => {
        const debouncedValidation = debounce(validateInput, 300);
        input.removeEventListener('input', validateInput);
        input.addEventListener('input', debouncedValidation);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        enhanceInputExperience();
        initCursorEffects();
        optimizePerformance();
    }, 100);
});

// Quick Login Function for Testing
function quickLogin() {
    console.log('Quick login initiated');
    
    // Set test credentials
    localStorage.setItem('fitbuddy_logged_in', 'true');
    localStorage.setItem('fitbuddy_username', 'TestUser');
    
    console.log('Credentials set, redirecting...');
    
    // Direct redirect without SweetAlert
    alert('Quick login successful! Redirecting to dashboard...');
    
    // Try multiple redirect approaches
    setTimeout(() => {
        try {
            window.location = './dashboard.html';
        } catch (e1) {
            try {
                window.location.href = './dashboard.html';
            } catch (e2) {
                try {
                    document.location = './dashboard.html';
                } catch (e3) {
                    console.error('All redirect methods failed:', e1, e2, e3);
                    alert('Please manually navigate to dashboard.html');
                }
            }
        }
    }, 500);
}

// Make quickLogin globally available
window.quickLogin = quickLogin;

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateCredentials,
        isValidEmail,
        validateForm,
        quickLogin
    };
}
