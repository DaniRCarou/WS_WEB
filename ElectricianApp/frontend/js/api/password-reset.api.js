// =====================================================================
// passwordReset.api.js — Password Reset API
// Handles communication with the backend for password reset flow
// =====================================================================

// Sends a password reset email to the given address
export async function sendResetEmail(email) {
    try {
        const response = await fetch(`https://employee-portal.up.railway.app/password-reset/send?email=${encodeURIComponent(email)}`, {
            method: 'POST'
        });
        if (response.ok) {
            return { success: true };
        } else {
            const error = await response.text();
            return { success: false, message: error };
        }
    } catch (err) {
        console.error("Error connecting to server:", err);
        return { success: false, message: "Server connection error" };
    }
}

// Resets the employee's password using the token from the reset link
export async function resetPassword(password, token) {
    try {
        const response = await fetch(`https://employee-portal-drc.onrender.com/password-reset/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`, {
            method: 'POST'
        });
        if (response.ok) {
            return { success: true };
        } else {
            const error = await response.text();
            return { success: false, message: error };
        }
    } catch (err) {
        console.error("Error connecting to server:", err);
        return { success: false, message: "Server connection error" };
    }
}