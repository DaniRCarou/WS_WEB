// =====================================================================
// register.js
// Controlador del formulario de registro
// Se encarga de:
// 1. Escuchar el submit del formulario
// 2. Validar los datos introducidos por el usuario
// 3. Enviar los datos al backend via fetch
// Las traducciones las gestiona i18n.js — no se necesita nada de idiomas aquí
// =====================================================================





// Importa la función que envía los datos de registro al backend
import { registerEmployee } from '../api/register.api.js';







// =====================================================================
// SELECCIÓN DEL FORMULARIO
// document.querySelector → busca el primer elemento que coincida con el selector
// '#register-form' → busca el elemento con id="register-form" en el HTML
// =====================================================================

const registerForm = document.querySelector('#register-form');  // Formulario de registro


// =====================================================================
// OJO PARA VER/OCULTAR CONTRASEÑA
// querySelectorAll → selecciona todos los botones con la clase toggle-password
// forEach → recorre cada botón y le añade un evento click
// =====================================================================
document.querySelectorAll('.toggle-password').forEach(button => {

    button.addEventListener('click', () => {

        // input anterior al botón → el campo de contraseña
        const input = button.previousElementSibling;

        // Si el tipo es password → lo cambia a text (muestra la contraseña)
        // Si el tipo es text → lo cambia a password (la oculta)
        if (input.type === 'password') {

            input.type = 'text';

            const img = button.querySelector('img');

            if (img) img.src = 'assets/icons/eye-off.svg';

            else button.textContent = '👁️‍🗨️';

        } else {

            input.type = 'password';
    
            const img = button.querySelector('img');

            if (img) img.src = 'assets/icons/eye.svg';

            else button.textContent = '👁';

        }

    });

});


// =====================================================================
// ESCUCHA DEL EVENTO SUBMIT
// Se ejecuta cuando el usuario pulsa el botón "Sign Up"
// =====================================================================

registerForm.addEventListener('submit', async function(e) {     // async → permite usar await dentro para esperar la respuesta del backend

    e.preventDefault();                                         // e.preventDefault() → evita que el navegador recargue la página al hacer submit


    // =====================================================================
    // LECTURA DE LOS VALORES DEL FORMULARIO
    // .value → obtiene el texto escrito dentro del input
    // .checked → obtiene true/false del checkbox
    // =====================================================================

    const personalNumber = parseInt(document.querySelector('#register-personal-number').value);  // Número personal → convertido a entero con parseInt
    const name = document.querySelector('#name').value;                                          // Nombre
    const surname = document.querySelector('#surname').value;                                    // Apellido
    const email = document.querySelector('#register-email').value;                               // Email
    const department = parseInt(document.querySelector('#department').value);                    // Departamento → convertido a entero con parseInt
    const password = document.querySelector('#register-password').value;                         // Contraseña
    const passConfirm = document.querySelector('#password-confirmation').value;                  // Confirmación de contraseña
    const isChecked = document.querySelector('#check-point').checked;                            // Checkbox de términos → true o false


    // =====================================================================
    // VALIDACIONES
    // Se comprueban los datos antes de enviarlos al backend
    // Si alguna validación falla → muestra alerta y detiene la ejecución
    // window.currentLanguageData → objeto con los textos del idioma actual, gestionado por i18n.js
    // =====================================================================

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


    // =====================================================================
    // ENVÍO DE DATOS AL BACKEND
    // fetch → envía una petición HTTP al backend
    // POST → enviamos datos nuevos al servidor
    // body → los datos del formulario convertidos a JSON con JSON.stringify
    // =====================================================================

    try {

        const result = await registerEmployee(personalNumber, name, surname, email, password, department);

if (result.success) {
    alert(window.currentLanguageData?.alerts?.registerSuccess);
    registerForm.reset();
} else {
    alert(window.currentLanguageData?.alerts?.registerError + ': ' + result.message);
}

    } catch (err) {

        console.error('Error connecting to server:', err);                              // Muestra el error en la consola
        
        alert(window.currentLanguageData?.alerts?.serverConnectionError);               // Muestra el error al usuario

    }

});