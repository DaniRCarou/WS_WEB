
/*  
 Este módulo se encarga de:
 1. MANEJAR EL DOM: 
    - Leer y actualizar elementos de la página.
    - Cambiar estilos o clases según la interacción del usuario.
    - No realiza cálculos de negocio ni acceso directo a la base de datos.
 2. GESTIÓN DE EVENTOS: 
    - Escucha interacciones del usuario (click, submit, input).
    - Llama a funciones de otros módulos según corresponda.
 3. COMUNICACIÓN CON LA API: 
    - Envia datos de login al backend mediante fetch.
    - Procesa la respuesta y actualiza la UI.

 Flujo principal: UI → login.js → API → login.js → UI
 */




 

 // ------------------------------------------------ CONTROLADOR DEL DOM --------------------------------------------------------------------


// =====================================================================================================================
// CONTROLADOR DEL FORMULARIO DE LOGIN
// - Escucha submit del usuario
// - Envía datos a la API y procesa la respuesta
// =====================================================================================================================

import { loginEmployee } from '../api/auth.api.js';                     // Importamos la función de la API. Importa la función loginEmployee desde auth.api.js. Como login.js está directamente en js, para acceder a ese archivo, debo utilizar una ruta relativa: './' → empieza desde la carpeta donde está login.js, es decir, js/. api/ → entra en la carpeta api dentro de js/. auth.api.js → el archivo dentro de api.
                                                                        // loginEmployee: Función que reside en auth.api.js, encargada de enviar los datos al backend y devolver la respuesta.
                                                                        // login.js no sabe cómo se hace la autenticación; solo llama a esta función y maneja el resultado para la UI.

import { showView } from '../main.js';                                              // importamos showView

const loginForm = document.querySelector('#login-form');                            // Selecciona el elemento del DOM con id="login-form" y lo guarda en la variable



// Al cargar la página comprobamos si el trabajador marcó "Remember me" en el login anterior
// localStorage.getItem('employeeId') → lee el número personal guardado
// Si no hay nada guardado devuelve null
const savedId = localStorage.getItem('employeeId');

// Si existe un número personal guardado → lo ponemos en el input automáticamente
// Así el trabajador no tiene que escribirlo de nuevo
if (savedId) {

    // .value → propiedad de los inputs que contiene el texto escrito dentro
    // Es como textContent pero para inputs
    document.querySelector('#login-personal-number').value = savedId;

}





loginForm.addEventListener('submit', async function(e) {                            // Agrega un listener que escucha eventos del formulario. 'submit' → Escucha el evento de enviar el formulario. async function(e) → Función asíncrona que se ejecuta al enviar el formulario. e → Objeto del evento, contiene información sobre el submit.

    e.preventDefault();                                                             // Evita que el navegador recargue la página al hacer submit. Esto es fundamental en apps SPA modernas.

    const personalNumber = document.querySelector('#login-personal-number').value;  // Selecciona el input donde el usuario escribe el número personal y lo guarda en la variable. .value → Obtiene el valor escrito por el usuario.
                                                                                    // Lee el valor del input en ese momento — da igual si lo escribió el trabajador o lo rellenó el código desde localStorage. Se guarda en una constante para enviársela al backend en loginEmployee(personalNumber, password)

    const password = document.querySelector('#password').value;
   
    const result = await loginEmployee(personalNumber, password);                   // Llamamos a la función de la API. Llama a la función loginEmployee que definimos en auth.api.js. await → Espera la respuesta de la API antes de continuar. result → Guarda el objeto devuelto por la función { success: true/false, message: ... }.
                                                                                    // Aquí login.js solo procesa la respuesta y decide qué mostrar al usuario

    const isChecked = document.querySelector('#remember-checkbox').checked;         // Checkbox de términos → true o false. 
                                                                                    // En realidad no importa demasiado en este caso — el checkbox se podría leer dentro o fuera del if. Pero la razón por la que está fuera es organización: primero se recogen todos los datos del formulario — número personal, contraseña, checkbox — y luego se procesa el resultado. 
                                                                                    // Es como un camarero que anota todo el pedido antes de ir a la cocina, no va y vuelve varias veces.


    if (result.success) {                                                           // result es la respuesta procesada del backend, normalmente algo como esto: { "success": true, "message": "Login OK" }. Definido en loginApi.js


        // Si el trabajador marcó "Remember me" → guarda el número personal en localStorage
        // localStorage persiste aunque se cierre el navegador o se apague el ordenador
        if (isChecked) {

            localStorage.setItem('employeeId', personalNumber);

        } else {

            // Si no marcó "Remember me" → borra los datos del login anterior si los hubiera
            // Así la próxima vez que abra la página el input aparece vacío
            localStorage.removeItem('employeeId');

        }



        // sessionStorage → memoria temporal del navegador. Funciona como una caja donde puedes
        // guardar datos mientras el usuario tiene la pestaña abierta. Cuando cierra la pestaña,
        // se borra todo automáticamente.
        // setItem('employeeId', personalNumber) → guarda el número personal del empleado
        // con la clave 'employeeId' para que worker.js pueda leerlo después con:
        // sessionStorage.getItem('employeeId')
        sessionStorage.setItem('employeeId', personalNumber);

        sessionStorage.setItem('firstName', result.firstName);

        alert(window.currentLanguageData?.alerts?.loginSuccess || "Successful login");

        showView('worker-view');                                                    // navegación SPA correcta

        document.getElementById('user-name').textContent = result.firstName;        // .textContent → es el texto que va dentro de ese span. El span pasa de estar vacío a contener "Daniel". result.firstName → es el nombre que devolvió el backend cuando hice login. Por ejemplo: "Daniel".

    } else {

        alert((window.currentLanguageData?.alerts?.loginError || "Login failed") + ": " + result.message);

    }

});
