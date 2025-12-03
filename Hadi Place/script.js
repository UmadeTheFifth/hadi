// Authentication state
let isLoggedIn = false;
let currentUser = null;

// Get elements
const authOverlay = document.getElementById('authOverlay');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const userDisplay = document.getElementById('userDisplay');
const userName = document.getElementById('userName');
const bookBtn = document.getElementById('bookBtn');
const loginAlert = document.getElementById('loginAlert');

// Book appointment button
bookBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        // Replace with your actual Google Form URL
        window.open('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform', '_blank');
    } else {
        loginAlert.style.display = 'block';
        setTimeout(() => {
            authOverlay.classList.add('active');
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }, 500);
    }
});

// Open login modal
loginBtn.addEventListener('click', () => {
    authOverlay.classList.add('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Open signup modal
signupBtn.addEventListener('click', () => {
    authOverlay.classList.add('active');
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    authOverlay.classList.remove('active');
});

// Close modal on overlay click
authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) {
        authOverlay.classList.remove('active');
    }
});

// Switch between forms
switchToSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

switchToLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Handle login
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login (in real app, verify with backend)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        isLoggedIn = true;
        currentUser = user;
        updateUI();
        authOverlay.classList.remove('active');
        alert('Login successful!');
    } else {
        alert('Invalid email or password');
    }
});

// Handle signup
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Save user (in real app, send to backend)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        alert('User already exists');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    isLoggedIn = true;
    currentUser = { name, email };
    updateUI();
    authOverlay.classList.remove('active');
    alert('Signup successful!');
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    currentUser = null;
    updateUI();
    alert('Logged out successfully');
});

// Update UI based on login state
function updateUI() {
    if (isLoggedIn && currentUser) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        userDisplay.style.display = 'block';
        userName.textContent = currentUser.name;
        loginAlert.style.display = 'none';
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        userDisplay.style.display = 'none';
    }
}

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'opacity 1s ease';
        container.style.opacity = '1';
    }, 100);

    // Check login state on page load
    updateUI();
});

// Article item hover effects
const articleItems = document.querySelectorAll('.article-item');
articleItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Update item hover effects
const updateItems = document.querySelectorAll('.update-item');
updateItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f0f0f0';
        this.style.transition = 'background-color 0.3s ease';
    });
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#f9f9f9';
    });
});