import { handleSignIn, handleGoogleSignIn, handleFacebookSignIn } from './firebase_utils.js';

// Function to toggle password visibility
function togglePassword(inputId, iconElement) {
    const passwordInput = document.getElementById(inputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconElement.classList.add('show');
    } else {
        passwordInput.type = 'password';
        iconElement.classList.remove('show');
    }
}


// Function to validate email format
function validateEmail() {
    var email = document.getElementById('emailSignIn').value.trim();
    var emailError = document.getElementById('emailError');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        emailError.textContent = ''; // Clear error if input is empty
        return false;
    }

    var isValid = emailPattern.test(email);

    if (!isValid) {
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailError.textContent = '';
    }

    // Enable or disable the password toggle button based on email validity
    const passwordToggle = document.querySelector('.toggle-password-type');
    if (passwordToggle) {
        passwordToggle.style.pointerEvents = isValid ? 'auto' : 'none';
    }

    return isValid;
}

// Attach event listeners for real-time validation
document.getElementById('emailSignIn').addEventListener('input', validateEmail);
document.getElementById('loginPassword').addEventListener('input', () => {});

// Attach event listener for form submission
document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById('emailSignIn').value;
    var password = document.getElementById('loginPassword').value;

    await handleSignIn(email, password);
});

// Attach event listener for Google sign-in button
document.getElementById('googleSignInButton').addEventListener('click', handleGoogleSignIn);
document.getElementById('facebookSignInButton').addEventListener('click', handleFacebookSignIn);

// Initial validation to set button state on page load
document.addEventListener('DOMContentLoaded', () => {
    validateEmail(); // Initial call to set button state on page load
});

// Attach event listeners for password visibility toggle
document.querySelectorAll('.toggle-password-type').forEach(icon => {
    icon.addEventListener('click', function() {
        const inputId = this.getAttribute('data-target');
        togglePassword(inputId, this);
    });
});