// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQKbl1RSZABOtpb2BhVErbEG6_WBV9w_M",
    authDomain: "sig-up-ae29a.firebaseapp.com",
    projectId: "sig-up-ae29a",
    storageBucket: "sig-up-ae29a.appspot.com",
    messagingSenderId: "949922451901",
    appId: "1:949922451901:web:2119cfbdfa62d53fb842d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-up function
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!email || !password || !confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all the required fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (password !== confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match.',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        return;
    }

    // Firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Account created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '../index.html';
            });

            // Store user info (for demo purposes, not secure)
            localStorage.setItem('email', email);
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });
}

// Event listener for the sign-up button
document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', signUp);
    }
});

// Google Sign-In Function
function onSignUp(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("Google User Info: ", profile);

    Swal.fire({
        title: 'Welcome!',
        text: `Hello, ${profile.getName()}!`,
        icon: 'success',
        confirmButtonText: 'OK'
    });

    const id_token = googleUser.getAuthResponse().id_token;
    console.log("Google ID Token:", id_token);
}
