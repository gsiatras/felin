// Import the necessary functions from the Firebase SDK
import { initializeApp  } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVPetmGpj0XRBmwBwj_CyW-1jdlE0qtFg",
  authDomain: "felin-76b01.firebaseapp.com",
  projectId: "felin-76b01",
  storageBucket: "felin-76b01.appspot.com",
  messagingSenderId: "454995825987",
  appId: "1:454995825987:web:7c8060d9045304f72e0bf6",
  measurementId: "G-C1QE4QE9P5",
  databaseURL: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Auth service
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
// Export auth instance and createUserWithEmailAndPassword function
export { auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup, signInWithEmailAndPassword};


