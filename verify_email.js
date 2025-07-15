document.addEventListener('DOMContentLoaded', function() {
    const verifyEmailForm = document.getElementById('verifyEmailForm');
    const resendCodeLink = document.getElementById('resendCodeLink');

    if (verifyEmailForm) {
        verifyEmailForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const verificationCodeInput = document.getElementById('verificationCode');
            const code = verificationCodeInput.value.trim();

            // Basic client-side validation
            if (code === '') {
                alert('Please enter the verification code.');
                verificationCodeInput.focus();
                return;
            }

            // In a real application, you would send this code to a server for verification.
            console.log('Verifying code:', code);

            // Example of a placeholder for an actual fetch request to your backend:
            /*
            fetch('/api/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Email verified successfully!');
                    // Redirect to the next step, e.g., create new password or dashboard
                    window.location.href = '/new-password-setup'; // Or wherever you go next
                } else {
                    alert('Verification failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error during email verification:', error);
                alert('An error occurred during verification. Please try again.');
            });
            */

            // For now, just a success message for demonstration
            alert('Verification code submitted (client-side validation passed). In a real app, this would be verified by a server.');
            // Clear the field
            // verificationCodeInput.value = '';
        });
    }

    if (resendCodeLink) {
        resendCodeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            alert('Resend code functionality triggered. In a real app, this would send a new code to your email.');
            // In a real app, you would make an AJAX call to your backend
            // to request a new verification code be sent.
            /*
            fetch('/api/resend-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmailPreviouslyEntered }), // You'd need the user's email here
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('A new code has been sent to your email.');
                } else {
                    alert('Failed to resend code. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error resending code:', error);
                alert('An error occurred while trying to resend the code.');
            });
            */
        });
    }
});