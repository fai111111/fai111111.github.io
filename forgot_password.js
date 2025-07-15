document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();

            // Basic client-side validation for email format (can be more robust)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === '') {
                alert('Please enter your E-Mail address.');
                emailInput.focus();
                return;
            }

            if (!emailPattern.test(email)) {
                alert('Please enter a valid E-Mail address.');
                emailInput.focus();
                return;
            }

            // In a real application, you would send this email to a server.
            console.log('Sending password reset request for E-Mail:', email);

            // Here you would typically make an AJAX request (e.g., using fetch API)
            // to your backend server to initiate the password reset process.
            // Example of a placeholder for an actual fetch request:
            /*
            fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('If an account with that email exists, a password reset link has been sent to your email.');
                    // Optionally redirect to a confirmation page
                    // window.location.href = '/password-reset-sent';
                } else {
                    // For security, it's often best not to reveal if an email exists or not
                    alert('An error occurred. Please try again or contact support.');
                }
            })
            .catch(error => {
                console.error('Error during password reset request:', error);
                alert('An error occurred. Please try again.');
            });
            */

            // For now, just a success message for demonstration
            alert('Password reset request sent (client-side validation passed). Check your email for instructions.');
            // Clear the email field
            emailInput.value = '';
        });
    }
});