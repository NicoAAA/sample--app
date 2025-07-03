document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const alertBox = document.getElementById('loginAlert');

    // Enviar datos al backend usando fetch
    const response = await fetch('/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    if (response.redirected) {
        window.location.href = response.url;
    } else {
        alertBox.classList.remove('d-none');
    }
});