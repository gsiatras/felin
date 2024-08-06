// Import Firebase auth functions
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from './firebase-config.js';

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

    // Enable or disable the password toggle button based on email validity
    const passwordToggle = document.querySelector('.toggle-password-type');
    if (passwordToggle) {
        passwordToggle.style.pointerEvents = isValid ? 'auto' : 'none';
    }

    return isValid;
}

// Function to handle sign-in
async function handleSignIn(event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById('emailSignIn').value;
    var password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User signed in successfully
        console.log('User signed in:', userCredential.user);

        // Redirect to dashboard or home page
        window.location.href = '/dashboard';
    } catch (error) {
        // Handle sign-in errors
        console.error('Error signing in:', error.message);
        alert('Error signing in: ' + error.message);
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
document.getElementById('emailSignIn').addEventListener('input', validateEmail);
document.getElementById('loginPassword').addEventListener('input', () => {});

// Attach event listener for form submission
document.getElementById('signInForm').addEventListener('submit', handleSignIn);

// Attach event listener for Google sign-in button
document.getElementById('googleSignInButton').addEventListener('click', handleGoogleSignIn);

// Initial validation to set button state on page load
document.addEventListener('DOMContentLoaded', () => {
    validateEmail(); // Initial call to set button state on page load
});
