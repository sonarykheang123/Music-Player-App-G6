function login(event) {
    event.preventDefault(); // Prevents form from reloading the page

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
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = '../index.html'; 
        });
    }
}
