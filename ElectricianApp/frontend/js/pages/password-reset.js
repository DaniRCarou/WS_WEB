// =====================================================================
// password_reset.js — Password reset controller
// Handles both the email request form and the new password form
// =====================================================================

import { sendResetEmail, resetPassword } from '../api/password-reset.api.js';

// Read token from URL — present when user clicks the reset link in email
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Email request form — shown when user clicks "Forgot password"
const resetForm = document.querySelector('#reset-form');
if (resetForm) {
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('#reset-email').value;
        const result = await sendResetEmail(email);
        if (result.success) {
            alert(window.currentLanguageData?.alerts?.resetEmailSent || "If your email is registered, you will receive a reset link");
        } else {
            alert('Error: ' + result.message);
        }
        document.querySelector('#reset-email').value = '';
    });
}

// New password form — shown when user opens the reset link from email
const newPasswordForm = document.querySelector('#new-password-form');
if (newPasswordForm) {
    newPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.querySelector('#new-password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert(window.currentLanguageData?.alerts?.passwordsDoNotMatch || "Passwords do not match");
            return;
        }

        const result = await resetPassword(newPassword, token);
        if (result.success) {
            alert(window.currentLanguageData?.alerts?.passwordResetSuccess || "Password reset successfully. Please login.");
            window.location.href = 'index.html';
        } else {
            alert(window.currentLanguageData?.alerts?.invalidToken || "This reset link is invalid or has expired");
        }
    });
}