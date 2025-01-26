function login(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username && !password) {
        Swal.fire({
            title: 'Warning!',
            text: 'Please write something.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    } else if (!username || !password) {
        Swal.fire({
            title: 'Error!',
            text: 'Please enter both username and password.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        // Login successful, redirect to the homepage
        Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = '../index.html'; // Redirect to homepage after success
        });
    }
}

// Add the event listener to the login form
document.querySelector('.login-container form').addEventListener('submit', login);
