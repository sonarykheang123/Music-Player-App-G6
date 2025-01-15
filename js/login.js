function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Store user credentials in localStorage (not secure for real apps)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // SweetAlert for login success with smaller alert
        Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'small-alert' // Apply custom class for smaller size
            }
        }).then(() => {
            // Optionally, redirect to another page
            // window.location.href = 'home.html';  // Uncomment to redirect
        });
    } else {
        // SweetAlert for missing fields with smaller alert
        Swal.fire({
            title: 'Error!',
            text: 'Please enter both username and password.',
            icon: 'error',
            confirmButtonText: 'Try Again',
            customClass: {
                popup: 'small-alert' // Apply custom class for smaller size
            }
        });
    }
}
