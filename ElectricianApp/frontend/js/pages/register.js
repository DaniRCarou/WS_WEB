// =====================================================================
// register.js — Registration form controller
// Handles input validation and employee registration
// =====================================================================

import { registerEmployee } from '../api/register.api.js';
import { showView } from '../main.js';


const registerForm = document.querySelector('#register-form');
const department = document.querySelector('#department');
const minusButton = document.querySelector('.minus-button');
const plusButton = document.querySelector('.plus-button');



plusButton.addEventListener('click', () => {

const currentValue = parseInt(department.value);

if(currentValue < 4) {

    department.value = currentValue + 1;

}

});



minusButton.addEventListener('click', () => {

const currentValue = parseInt(department.value);

if(currentValue > 1) {

    department.value = currentValue - 1;

}

});



// Toggle password visibility for all password inputs
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            const img = button.querySelector('img');
            if (img) img.src = 'assets/icons/eye.svg';
        } else {
            input.type = 'password';
            const img = button.querySelector('img');
            if (img) img.src = 'assets/icons/eye-off.svg';
        }
    });
});

registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const personalNumber = parseInt(document.querySelector('#register-personal-number').value);
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#register-email').value;
    const departmentFinalValue = parseInt(document.querySelector('#department').value);
    const password = document.querySelector('#register-password').value;
    const passConfirm = document.querySelector('#password-confirmation').value;
    const isChecked = document.querySelector('#check-point').checked;

    if (!personalNumber || isNaN(personalNumber)) {
        alert(window.currentLanguageData?.alerts?.invalidPersonalNumber);
        return;
    }
    if (name.trim().length === 0) {
        alert(window.currentLanguageData?.alerts?.invalidName);
        return;
    }
    if (surname.trim().length === 0) {
        alert(window.currentLanguageData?.alerts?.invalidSurname);
        return;
    }
    if (email.trim().length === 0 || !email.includes('@') || !email.includes('.')) {
        alert(window.currentLanguageData?.alerts?.invalidEmail);
        return;
    }
    if (!password || password.includes(' ') || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password) || password.length < 8) {
        alert(window.currentLanguageData?.alerts?.invalidPassword);
        return;
    }
    if (passConfirm !== password) {
        alert(window.currentLanguageData?.alerts?.passwordsDoNotMatch);
        return;
    }
    if (!isChecked) {
        alert(window.currentLanguageData?.alerts?.termsNotAccepted);
        return;
    }

    try {
        const result = await registerEmployee(personalNumber, name, surname, email, password, departmentFinalValue);
        if (result.success) {
            alert(window.currentLanguageData?.alerts?.registerSuccess);
            registerForm.reset();
            showView('login-view');
        } else {
            alert(window.currentLanguageData?.alerts?.registerError + ': ' + result.message);
        }
    } catch (err) {
        console.error('Error connecting to server:', err);
        alert(window.currentLanguageData?.alerts?.serverConnectionError);
    }
});