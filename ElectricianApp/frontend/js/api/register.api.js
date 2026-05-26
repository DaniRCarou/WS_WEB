// =====================================================================
// register.api.js — Registration API
// Handles communication with the backend for employee registration
// =====================================================================

export async function registerEmployee(employeeId, firstName, surname, email, password, department) {
    const data = { employeeId, firstName, surname, email, password, department: { departmentId: department } };
    try {
        const response = await fetch('http://localhost:8080/employees/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
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