// Enhanced card flip functionality
const card = document.getElementById("flipCard");
const container = document.getElementById("cardContainer");
let isFlipped = false;

// Fixed flip functions - ADDED MISSING CLOSING BRACES
function flipToSignup() {
    if (!isFlipped) {
        card.classList.add("flipped");
        isFlipped = true;
        // Add bounce effect
        card.style.animation = "flipBounce 0.6s ease-out";
        setTimeout(() => {
            card.style.animation = "";
        }, 600);
    }
} // FIXED: Added missing closing brace

function flipToLogin() {
    if (isFlipped) {
        card.classList.remove("flipped");
        isFlipped = false;
        // Add bounce effect
        card.style.animation = "flipBounce 0.6s ease-out";
        setTimeout(() => {
            card.style.animation = "";
        }, 600);
    }
} // FIXED: Added missing closing brace

// Enhanced password validation
function validatePasswords() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorElement = document.getElementById("passwordError");
    
    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match!";
        errorElement.classList.add("show");
        return false;
    } else if (password.length < 8) {
        errorElement.textContent = "Password must be at least 8 characters long!";
        errorElement.classList.add("show");
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errorElement.textContent = "Password must contain uppercase, lowercase, and number!";
        errorElement.classList.add("show");
        return false;
    } else {
        errorElement.textContent = "";
        errorElement.classList.remove("show");
        return true;
    }
} // FIXED: Added missing closing brace

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener("input", validatePasswords);
        confirmPasswordInput.addEventListener("input", validatePasswords);
    }
});

// Enhanced form handling with better animations - FIXED: Wrapped in DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    
    // Login form handler
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const button = this.querySelector("button");
            const buttonText = button.querySelector("span");
            const ripple = button.querySelector(".btn-ripple");
            
            // Loading animation
            buttonText.textContent = "Signing In...";
            button.classList.add("loading");
            ripple.style.animation = "ripple 1s infinite";
            
            // Simulate API call
            setTimeout(() => {
                // Success animation
                button.classList.remove("loading");
                button.classList.add("success");
                buttonText.textContent = "Welcome Back!";
                ripple.style.animation = "";
                
                // Create success particles
                createSuccessParticles();
                
                setTimeout(() => {
                    alert("Login successful!");
                    button.classList.remove("success");
                    buttonText.textContent = "Sign In";
                }, 2000);
            }, 2000);
        });
    }
    
    // Signup form handler
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            if (!validatePasswords()) {
                // Shake animation for error
                card.style.animation = "shake 0.5s ease-in-out";
                setTimeout(() => {
                    card.style.animation = "";
                }, 500);
                return;
            }
            
            const button = this.querySelector("button");
            const buttonText = button.querySelector("span");
            const ripple = button.querySelector(".btn-ripple");
            
            // Loading animation
            buttonText.textContent = "Creating Account...";
            button.classList.add("loading");
            ripple.style.animation = "ripple 1s infinite";
            
            // Simulate API call
            setTimeout(() => {
                // Success animation
                button.classList.remove("loading");
                button.classList.add("success");
                buttonText.textContent = "Account Created!";
                ripple.style.animation = "";
                
                // Create success particles
                createSuccessParticles();
                
                setTimeout(() => {
                    alert("Account created successfully!");
                    button.classList.remove("success");
                    buttonText.textContent = "Create Account";
                }, 2000);
            }, 2500);
        });
    }
});

// Enhanced interactive effects
card.addEventListener("mouseenter", function() {
    this.style.transform = this.classList.contains("flipped")
        ? "rotateY(180deg) translateY(-20px) scale(1.05) rotateX(5deg)"
        : "translateY(-20px) scale(1.05) rotateX(5deg)";
});

card.addEventListener("mouseleave", function() {
    this.style.transform = this.classList.contains("flipped")
        ? "rotateY(180deg) translateY(-10px)"
        : "translateY(0)";
});

// Enhanced input animations
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll("input");
    
    inputs.forEach(input => {
        const inputGroup = input.parentElement;
        const highlight = inputGroup.querySelector(".input-highlight");
        
        input.addEventListener("focus", function() {
            inputGroup.classList.add("focused");
            if (highlight) highlight.style.transform = "scaleX(1)";
        });
        
        input.addEventListener("blur", function() {
            if (!this.value) {
                inputGroup.classList.remove("focused");
            }
            if (highlight) highlight.style.transform = "scaleX(0)";
        });
        
        // Check if input has value on load
        if (input.value) {
            inputGroup.classList.add("focused");
        }
    });
});

// Floating background animations
document.addEventListener("DOMContentLoaded", function() {
    const shapes = document.querySelectorAll(".shape");
    const particles = document.querySelectorAll(".particle");
    const floatingIcons = document.querySelectorAll(".floating-icon");
    
    // Enhanced shape animations
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 2}s`;
        
        shape.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.3) rotate(90deg)";
            this.style.opacity = "0.3";
        });
        
        shape.addEventListener("mouseleave", function() {
            this.style.transform = "";
            this.style.opacity = "0.15";
        });
    });
    
    // Floating icons animation
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 1.5}s`;
    });
});

// Success particles effect
function createSuccessParticles() {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'success-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Keyboard shortcuts
document.addEventListener("keydown", function(e) {
    if (e.key === "Tab" && e.ctrlKey) {
        e.preventDefault();
        if (isFlipped) {
            flipToLogin();
        } else {
            flipToSignup();
        }
    }
    
    if (e.key === "Escape") {
        if (isFlipped) {
            flipToLogin();
        }
    }
});

// Social button interactions
document.addEventListener("DOMContentLoaded", function() {
    const socialButtons = document.querySelectorAll(".social-btn");
    
    socialButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            this.style.animation = "socialClick 0.3s ease";
            setTimeout(() => {
                this.style.animation = "";
            }, 300);
        });
    });
});
