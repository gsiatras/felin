import { handleSignUp, handleGoogleSignIn, handleFacebookSignIn } from './firebase_utils.js';

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

    return isValid;
}

// Function to validate password match
function validatePasswords() {
    var password = document.getElementById('loginPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var passwordMismatchMessage = document.getElementById('passwordMismatchMessage');
    var isValid = password === confirmPassword;

    if (!isValid) {
        passwordMismatchMessage.textContent = 'Passwords do not match.';
    } else {
        passwordMismatchMessage.textContent = '';
    }

    return isValid;
}

// Function to enable or disable the Sign Up button
function toggleSignUpButton() {
    var signUpButton = document.querySelector('.geex-content__authentication__form-submit');
    var emailValid = validateEmail();
    var passwordsValid = validatePasswords();
    var termsChecked = document.getElementById('agreeTerms').checked;
    
    // Enable the button only if all validations are true and terms are checked
    signUpButton.disabled = !(emailValid && passwordsValid && termsChecked);
}

// Function to handle form submission
document.getElementById('signInForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    
    var termsChecked = document.getElementById('agreeTerms').checked;

    if (!termsChecked) {
        // Display error message if terms are not checked
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions.';
        return; // Stop form submission
    }

    // Clear the error message if terms are agreed
    document.getElementById('termsError').textContent = '';

    var email = document.getElementById('emailSignIn').value;
    var password = document.getElementById('loginPassword').value;

    await handleSignUp(email, password);
});

// Attach event listeners for real-time validation
document.getElementById('emailSignIn').addEventListener('input', toggleSignUpButton);
document.getElementById('loginPassword').addEventListener('input', toggleSignUpButton);
document.getElementById('confirmPassword').addEventListener('input', toggleSignUpButton);
document.getElementById('agreeTerms').addEventListener('change', toggleSignUpButton); // Add this listener


// Initial validation to set button state on page load
document.addEventListener('DOMContentLoaded', toggleSignUpButton);

// Attach event listener for Google sign-in button
document.getElementById('googleSignInButton').addEventListener('click', handleGoogleSignIn);
document.getElementById('facebookSignInButton').addEventListener('click', handleFacebookSignIn);

// Attach event listeners for password visibility toggle
document.querySelectorAll('.toggle-password-type').forEach(icon => {
    icon.addEventListener('click', function() {
        const inputId = this.getAttribute('data-target');
        togglePassword(inputId, this);
    });
});
