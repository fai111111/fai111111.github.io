document.addEventListener('DOMContentLoaded', function() {
    const goToLoginButton = document.getElementById('goToLoginButton');

    if (goToLoginButton) {
        goToLoginButton.addEventListener('click', function() {
            // Redirect to the login page (assuming it's named login.html)
            window.location.href = 'index.html'; // Or 'login.html' if you named it that
        });
    }
});
