// Import Firebase auth functions
import { auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup } from './firebase-config.js';

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

// Attach event listeners for password visibility toggle
document.querySelectorAll('.toggle-password-type').forEach(icon => {
    icon.addEventListener('click', function() {
        const inputId = this.getAttribute('data-target');
        togglePassword(inputId, this);
    });
});

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
    
    // Enable the button only if both validations are true
    signUpButton.disabled = !(emailValid && passwordsValid);
}

// Function to handle sign-up
async function handleSignUp(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById('emailSignIn').value;
    var password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User signed up successfully
        console.log('User signed up:', userCredential.user);

        // Redirect to sign-in page with a query parameter indicating success
        window.location.href = '/signin?signup_success=true';
    } catch (error) {
        // Handle sign-up errors
        console.error('Error signing up:', error.message);
        alert('Error signing up: ' + error.message);
    }
}

async function handleGoogleSignIn() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // User signed in successfully
        console.log('User signed in with Google:', result.user);

        // Get Firebase ID token
        const idToken = await result.user.getIdToken();

        // Send ID token to server with google_signin_success parameter
        await fetch('/signin?google_signin_success=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'idToken': idToken
            })
        });

        // Redirect to dashboard if needed (optional)
        window.location.href = '/dashboard';
    
    } catch (error) {
        console.error('Error signing in with Google:', error.message);
        alert('Error signing in with Google: ' + error.message);
    }
}



// Attach event listeners for real-time validation
document.getElementById('emailSignIn').addEventListener('input', toggleSignUpButton);
document.getElementById('loginPassword').addEventListener('input', toggleSignUpButton);
document.getElementById('confirmPassword').addEventListener('input', toggleSignUpButton);

// Attach event listener for form submission
document.getElementById('signInForm').addEventListener('submit', handleSignUp);

// Initial validation to set button state on page load
document.addEventListener('DOMContentLoaded', toggleSignUpButton);

// Attach event listener for Google sign-in button
document.getElementById('googleSignInButton').addEventListener('click', handleGoogleSignIn);


