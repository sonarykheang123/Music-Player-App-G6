function onSignUp(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("Google User Info: ", profile);
    alert('Welcome, ' + profile.getName());

    // Handle further sign-up actions (store user info, etc.)
    var id_token = googleUser.getAuthResponse().id_token;
    // You can send this token to your server for validation
}

// Handle standard sign-up with form
function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !email || !password || !confirmPassword) {
        // SweetAlert for missing fields (small size)
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all the required fields.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'small-alert'
            }
        });
    } else if (password !== confirmPassword) {
        // SweetAlert for password mismatch (small size)
        Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match.',
            icon: 'error',
            confirmButtonText: 'Try Again',
            customClass: {
                popup: 'small-alert'
            }
        });
    } else {
        // Store user information in localStorage (for demo purposes, not secure)
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // SweetAlert for success (small size)
        Swal.fire({
            title: 'Success!',
            text: 'Sign-up successful!',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'small-alert'
            }
        }).then(() => {
            window.location.href = '../index.html'; 
        });
        
    }

}