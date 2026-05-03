// =====================================================================
// register.js
// Controlador del formulario de registro
// Se encarga de:
// 1. Escuchar el submit del formulario
// 2. Validar los datos introducidos por el usuario
// 3. Enviar los datos al backend via fetch
// Las traducciones las gestiona i18n.js — no se necesita nada de idiomas aquí
// =====================================================================


// =====================================================================
// SELECCIÓN DEL FORMULARIO
// document.querySelector → busca el primer elemento que coincida con el selector
// '#register-form' → busca el elemento con id="register-form" en el HTML
// =====================================================================

const registerForm = document.querySelector('#register-form');  // Formulario de registro


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

        const response = await fetch('http://localhost:8080/employees/register', {  // URL del endpoint de registro en el backend
           
            method: 'POST',                                                          // POST → enviamos datos nuevos
            
            headers: { 'Content-Type': 'application/json' },                        // Le decimos al backend que enviamos JSON
            
            body: JSON.stringify({                                                   // JSON.stringify → convierte el objeto JS a texto JSON
               
                employeeId: personalNumber,                                          // employeeId → número personal del trabajador
                
                firstName: name,                                                     // firstName → nombre
                
                surname: surname,                                                    // surname → apellido
                
                email: email,                                                        // email → correo electrónico
                
                password: password,                                                  // password → contraseña
                
                department: { departmentId: department }                             // department → objeto con el id del departamento
           
            })

        });

        if (response.ok) {                                                          // response.ok → true si el servidor respondió con HTTP 200-299

            alert(window.currentLanguageData?.alerts?.registerSuccess); 
                // alert() → muestra una ventana emergente con el mensaje que le pases dentro
                // window → es el objeto global del navegador. Contiene todo lo que existe en la página.
                // Es como una caja grande donde vive todo: variables globales, funciones, etc.
                // window.currentLanguageData → es una variable global que creamos nosotros en i18n.js
                // Contiene todos los textos del idioma que el usuario ha seleccionado
                // Ejemplo: si el usuario eligió español, currentLanguageData tiene todos los textos en español
                // ? → es el operador de encadenamiento opcional (optional chaining)
                // Significa: "si esto existe, sigue adelante. Si no existe, devuelve undefined en vez de dar error"
                // Sin el ?, si currentLanguageData fuera null o undefined, el navegador daría un error y pararía todo
                // Con el ?, simplemente devuelve undefined y el alert muestra una ventana vacía, sin romper nada
                // .alerts → es una sección dentro de currentLanguageData que agrupa todos los mensajes de alerta
                // Ejemplo en el JSON: "alerts": { "registerSuccess": "Registration successful" }
                // .alerts? → mismo concepto: si alerts no existe, devuelve undefined sin romper nada
                // .registerSuccess → es la clave exacta dentro de alerts que contiene el mensaje de registro exitoso
                // El navegador busca esa clave en el idioma actual y devuelve su valor
                // Ejemplo: en inglés devuelve "Registration successful", en español devuelve "Registro exitoso"

            registerForm.reset();                                                   // Mensaje de éxito — lo traduciremos más adelante
        
        } else {

            const error = await response.text();                                     // response.text() → lee el mensaje de error del backend
           
            alert('Error: ' + error);                                                // Muestra el error al usuario
       
        }

    } catch (err) {

        console.error('Error connecting to server:', err);                           // Muestra el error en la consola
        
        alert('Server connection error');                                            // Muestra el error al usuario

    }

});