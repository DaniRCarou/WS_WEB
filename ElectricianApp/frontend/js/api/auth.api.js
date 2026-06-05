// =====================================================================
// auth.api.js — Authentication API
// Handles communication with the backend for employee login
// =====================================================================

export async function loginEmployee(personalNumber, password) {
    const data = { personalNumber, password };
    try {
        const response = await fetch('https://employee-portal.up.railway.app/employees/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const employee = await response.json();
            return { success: true, firstName: employee.firstName };
        } else {
            const error = await response.text();
            return { success: false, message: error };
        }
    } catch (err) {
        console.error("Error connecting to server:", err);
        return { success: false, message: "Server connection error" };
    }
}