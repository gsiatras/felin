import { auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup, signInWithEmailAndPassword, facebookProvider } from './firebase-config.js';


// Function to handle sign up
export async function handleSignUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User signed up successfully
        console.log('User signed up:', userCredential.user);
        window.location.href = '/signin?signup_success=true';
    } catch (error) {
        // Handle sign-up errors
        console.error('Error signing up:', error.message);
        alert('Error signing up: ' + error.message);
    }
}

// Function to handle Google sign-in
export async function handleGoogleSignIn() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // User signed in successfully
        //console.log('User signed in with Google:', result.user);

        // Get Firebase ID token
        const idToken = await result.user.getIdToken();

        // Send ID token to server with google_signin_success parameter
        await fetch('/signin?signin_success=true', {
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


// Function to handle Facebook sign-in
export async function handleFacebookSignIn() {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        // User signed in successfully
        //console.log('User signed in with Google:', result.user);

        // Get Firebase ID token
        const idToken = await result.user.getIdToken();

        // Send ID token to server with google_signin_success parameter
        await fetch('/signin?signin_success=true', {
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
        console.error('Error signing in with Facebook:', error.message);
        alert('Error signing in with Facebook: ' + error.message);
    }
}

export async function handleSignIn(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        // User signed in successfully
        //console.log('User signed in:', userCredential.user);
        // Get Firebase ID token
        const idToken = await result.user.getIdToken();

        // Send ID token to server with google_signin_success parameter
        await fetch('/signin?signin_success=true', {
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
        // Handle sign-in errors
        console.error('Error signing in:', error.message);
        alert('Error signing in: ' + error.message);
    }
}
