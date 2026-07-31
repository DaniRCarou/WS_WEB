// =====================================================================
// login.js — Login form controller
// Handles user authentication and session management
// =====================================================================

import { loginEmployee } from '../api/auth.api.js';
import { showView } from '../main.js';



const loginForm = document.querySelector('#login-form');

// Restore saved personal number if "Remember me" was checked previously
const savedId = localStorage.getItem('employeeId');
if (savedId) {
    document.querySelector('#login-personal-number').value = savedId;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector('.login-form__button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';   

    const personalNumber = parseInt(document.querySelector('#login-personal-number').value);
    const password = document.querySelector('#password').value;
    const isChecked = document.querySelector('#remember-checkbox').checked;

    const result = await loginEmployee(personalNumber, password);

    if (result.success) {

        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';

        if (isChecked) {
            localStorage.setItem('employeeId', personalNumber);
        } else {
            localStorage.removeItem('employeeId');
        }

        sessionStorage.setItem('employeeId', parseInt(personalNumber));
        sessionStorage.setItem('firstName', result.firstName);

        alert(window.currentLanguageData?.alerts?.loginSuccess || "Successful login");
        showView('worker-view');
        document.getElementById('user-name').textContent = result.firstName;

    } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
        alert((window.currentLanguageData?.alerts?.loginError || "Login failed"));
    }
});