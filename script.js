document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const container = document.getElementById('mainContainer');
    const signUpButton = document.getElementById('signUpBtn');
    const signInButton = document.getElementById('signInBtn');
    const signupForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const panelContent = document.getElementById('panelContent');
    const successModal = document.getElementById('successModal');

    // Initialize
    let isSignUpMode = false;

    // Panel switching functionality
    signUpButton.addEventListener('click', () => {
        switchToSignUp();
    });

    signInButton.addEventListener('click', () => {
        switchToSignIn();
    });

    function switchToSignUp() {
        if (!isSignUpMode) {
            container.classList.add('right-panel-active');
            
            setTimeout(() => {
                document.querySelector('.welcome-content').classList.add('hidden');
                document.querySelector('.new-here-content').classList.remove('hidden');
            }, 400);

            document.getElementById('signinForm').classList.remove('active');
            document.getElementById('signupForm').classList.add('active');
            
            isSignUpMode = true;
        }
    }

    function switchToSignIn() {
        if (isSignUpMode) {
            container.classList.remove('right-panel-active');
            
            setTimeout(() => {
                document.querySelector('.new-here-content').classList.add('hidden');
                document.querySelector('.welcome-content').classList.remove('hidden');
            }, 400);

            document.getElementById('signupForm').classList.remove('active');
            document.getElementById('signinForm').classList.add('active');
            
            isSignUpMode = false;
        }
    }

    // Password visibility toggle
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.parentElement.querySelector('.password-toggle');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    // Enhanced form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    function validatePassword(password) {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return {
            isValid: minLength && hasUpper && hasLower && hasNumber,
            strength: calculatePasswordStrength(password),
            requirements: {
                minLength,
                hasUpper,
                hasLower,
                hasNumber,
                hasSpecial
            }
        };
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 10;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 20;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    }

    function updatePasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        const strengthFill = strengthIndicator.querySelector('.strength-fill');
        const strengthText = strengthIndicator.querySelector('.strength-text');
        
        const validation = validatePassword(password);
        const strength = validation.strength;
        
        strengthFill.style.width = strength + '%';
        
        if (strength < 30) {
            strengthFill.style.background = 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
            strengthText.textContent = 'Weak password';
        } else if (strength < 60) {
            strengthFill.style.background = 'linear-gradient(90deg, #ffa726, #ffcc02)';
            strengthText.textContent = 'Moderate password';
        } else if (strength < 80) {
            strengthFill.style.background = 'linear-gradient(90deg, #66bb6a, #81c784)';
            strengthText.textContent = 'Strong password';
        } else {
            strengthFill.style.background = 'linear-gradient(90deg, #4caf50, #00ff87)';
            strengthText.textContent = 'Very strong password';
        }
    }

    // Password strength monitoring
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }

    function showError(formType, message) {
        const errorElement = document.getElementById(formType + 'Error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 6000);
    }

    function hideError(formType) {
        const errorElement = document.getElementById(formType + 'Error');
        errorElement.classList.remove('show');
    }

    function showSuccessModal(title, message) {
        document.getElementById('successTitle').textContent = title;
        document.getElementById('successMessage').textContent = message;
        successModal.classList.add('show');
    }

    window.closeSuccessModal = function() {
        successModal.classList.remove('show');
    };

    // Enhanced login form handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;
        const submitBtn = this.querySelector('.luxury-submit');

        hideError('signin');

        if (!validateEmail(email)) {
            showError('signin', 'Please enter a valid email address');
            return;
        }

        if (!password) {
            showError('signin', 'Password is required');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                submitBtn.classList.remove('success');
                showSuccessModal('Welcome Back!', 'You have successfully signed in to your account.');
                
                setTimeout(() => {
                    this.reset();
                    closeSuccessModal();
                }, 3000);
            }, 1000);
        }, 2000);
    });

    // Enhanced signup form handler
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('phoneNumber').value;
        const birthDate = document.getElementById('birthDate').value;
        const gender = document.getElementById('gender').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const profession = document.getElementById('profession').value;
        const termsAccepted = document.getElementById('termsCheck').checked;
        const submitBtn = this.querySelector('.luxury-submit');

        hideError('signup');

        // Comprehensive validation
        if (!firstName.trim()) {
            showError('signup', 'First name is required');
            return;
        }

        if (!lastName.trim()) {
            showError('signup', 'Last name is required');
            return;
        }

        if (!validateEmail(email)) {
            showError('signup', 'Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone)) {
            showError('signup', 'Please enter a valid phone number');
            return;
        }

        if (!birthDate) {
            showError('signup', 'Date of birth is required');
            return;
        }

        // Age validation (must be at least 13)
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        if (age < 13) {
            showError('signup', 'You must be at least 13 years old to create an account');
            return;
        }

        if (!gender) {
            showError('signup', 'Please select your gender');
            return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            showError('signup', 'Password must be at least 8 characters with uppercase, lowercase, and number');
            return;
        }

        if (password !== confirmPassword) {
            showError('signup', 'Passwords do not match');
            return;
        }

        if (!profession) {
            showError('signup', 'Please select your profession');
            return;
        }

        if (!termsAccepted) {
            showError('signup', 'Please accept the terms and conditions to continue');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            setTimeout(() => {
                submitBtn.classList.remove('success');
                showSuccessModal(
                    'Account Created Successfully!', 
                    `Welcome to our elite community, ${firstName}! Your premium account has been created and you can now access all exclusive features.`
                );
                
                setTimeout(() => {
                    this.reset();
                    updatePasswordStrength('');
                    switchToSignIn();
                    closeSuccessModal();
                }, 4000);
            }, 1000);
        }, 3000);
    });

    // Enhanced input focus effects with floating labels
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        // Handle focus and blur for floating labels
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value && this.type !== 'date') {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value || input.type === 'date') {
            input.parentElement.classList.add('focused');
        }

        // Real-time validation feedback
        input.addEventListener('input', function() {
            const inputGroup = this.parentElement;
            inputGroup.classList.remove('error');
            
            if (this.type === 'email' && this.value) {
                if (validateEmail(this.value)) {
                    inputGroup.classList.add('valid');
                } else {
                    inputGroup.classList.remove('valid');
                }
            }
            
            if (this.type === 'tel' && this.value) {
                if (validatePhone(this.value)) {
                    inputGroup.classList.add('valid');
                } else {
                    inputGroup.classList.remove('valid');
                }
            }
        });
    });

    // Social login handlers
    const socialButtons = document.querySelectorAll('.premium-social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Apple';
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showSuccessModal(
                    `${platform} Integration`, 
                    `${platform} sign-in would be integrated here. This would connect to ${platform}'s OAuth system.`
                );
            }, 150);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (isSignUpMode) {
                switchToSignIn();
            } else {
                switchToSignUp();
            }
        }

        if (e.key === 'Escape') {
            if (successModal.classList.contains('show')) {
                closeSuccessModal();
            } else if (isSignUpMode) {
                switchToSignIn();
            }
        }
    });

    // Add elegant ripple effect to buttons
    function addElegantRipple(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(232, 180, 160, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: elegantRipple 0.8s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    }

    // Apply ripple to all buttons
    document.querySelectorAll('button').forEach(addElegantRipple);

    // Add elegant ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes elegantRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
        
        .luxury-input.valid {
            border-color: #4caf50 !important;
        }
        
        .luxury-input.valid .input-icon {
            color: #4caf50 !important;
        }
        
        .luxury-input.error {
            border-color: #ff6b6b !important;
        }
        
        .luxury-input.error .input-icon {
            color: #ff6b6b !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize password strength indicator
    updatePasswordStrength('');
});
